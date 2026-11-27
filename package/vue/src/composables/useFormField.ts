import {
  computed,
  inject,
  onBeforeUnmount,
  provide,
  useAttrs,
  useId,
  type ComputedRef,
  type InjectionKey,
  type Ref
} from 'vue'
import type { Size, State } from '@/types'

// ============================================================
// CONTEXTE DE CHAMP DE FORMULAIRE
//
// SuFormField fournit à son contrôle l'id, le label, le message et les
// états du champ. Un contrôle placé dans le slot (SuInput, SuSelectBox,
// un contrôle maison…) s'y relie seul : plus besoin de v-bind="slotProps".
// ============================================================

/** Contrôle enregistré auprès du champ */
export interface FormFieldControl {
  /**
   * `false` pour un contrôle qu'un <label for> ne sait pas cibler
   * (combobox en div, groupe de cases) : le clic sur le label lui donne
   * alors le focus, et il est nommé par aria-labelledby.
   */
  labelable: boolean
  focus?: () => void
}

export interface FormFieldContext {
  /** Id du contrôle (cible du label) */
  id: Readonly<Ref<string>>
  /** Id du label, s'il y en a un */
  labelId: Readonly<Ref<string | undefined>>
  /** Id du message, s'il y en a un */
  messageId: Readonly<Ref<string | undefined>>
  state: Readonly<Ref<State>>
  size: Readonly<Ref<Size>>
  required: Readonly<Ref<boolean>>
  disabled: Readonly<Ref<boolean>>
  /** Enregistre le contrôle ; renvoie la fonction de désenregistrement */
  registerControl: (control: FormFieldControl) => () => void
}

export const FormFieldKey: InjectionKey<FormFieldContext> = Symbol('SurgeFormField')

/** Fournit le contexte aux descendants (utilisé par SuFormField) */
export function provideFormField(context: FormFieldContext): FormFieldContext {
  provide(FormFieldKey, context)
  return context
}

/** Joint des listes d'ids (aria-describedby…) sans doublons ni vides */
export function mergeIds(...ids: (string | undefined | null | false)[]): string | undefined {
  const unique = [...new Set(ids.flatMap((id) => (id ? id.split(/\s+/) : [])).filter(Boolean))]
  return unique.length ? unique.join(' ') : undefined
}

/** Props d'un contrôle que le champ peut compléter */
export interface FormFieldControlProps {
  state?: State
  size?: Size
  disabled?: boolean
  required?: boolean
  ariaLabelledBy?: string
  ariaDescribedBy?: string
}

export interface UseFormFieldOptions {
  /** Le contrôle est-il ciblable par <label for> ? (défaut : true) */
  labelable?: boolean
  /** Donne le focus au contrôle (clic sur le label d'un contrôle non ciblable) */
  focus?: () => void
  /** Préfixe de l'id généré hors champ ; sans préfixe, pas d'id généré */
  idPrefix?: string
}

export interface UseFormFieldReturn {
  /** Contexte du champ parent, ou null hors SuFormField */
  field: FormFieldContext | null
  /** Id du contrôle : attribut id, sinon celui du champ, sinon généré (avec idPrefix) */
  id: ComputedRef<string | undefined>
  state: ComputedRef<State>
  size: ComputedRef<Size>
  disabled: ComputedRef<boolean>
  required: ComputedRef<boolean>
  /** aria-describedby : celui du contrôle + message du champ */
  describedBy: ComputedRef<string | undefined>
  /** aria-labelledby : celui du contrôle, sinon le label du champ (contrôle non ciblable) */
  labelledBy: ComputedRef<string | undefined>
}

/**
 * Relie un contrôle au SuFormField qui l'entoure.
 *
 * Priorité : valeur explicite du contrôle > valeur du champ > défaut.
 * `state` et `size` du contrôle comptent comme explicites quand ils
 * diffèrent de leur défaut (`default`, `md`) ; `disabled` et `required`
 * s'additionnent (un champ désactivé désactive son contrôle).
 *
 * @example
 * const props = withDefaults(defineProps<MyControlProps>(), { state: 'default', size: 'md' })
 * const { id, state, describedBy } = useFormField(props, { idPrefix: 'my-control' })
 */
export function useFormField(
  props: FormFieldControlProps,
  options: UseFormFieldOptions = {}
): UseFormFieldReturn {
  const { labelable = true, focus, idPrefix } = options
  const field = inject(FormFieldKey, null)
  const attrs = useAttrs()
  const generatedId = idPrefix ? `${idPrefix}-${useId()}` : undefined

  if (field) {
    const unregister = field.registerControl({ labelable, focus })
    onBeforeUnmount(unregister)
  }

  const id = computed(() => (attrs.id as string | undefined) || field?.id.value || generatedId)

  const state = computed<State>(() =>
    props.state && props.state !== 'default' ? props.state : field?.state.value ?? props.state ?? 'default'
  )

  const size = computed<Size>(() =>
    props.size && props.size !== 'md' ? props.size : field?.size.value ?? props.size ?? 'md'
  )

  const disabled = computed(() => !!props.disabled || !!field?.disabled.value)
  const required = computed(() => !!props.required || !!field?.required.value)

  const describedBy = computed(() => mergeIds(props.ariaDescribedBy, field?.messageId.value))

  const labelledBy = computed(() =>
    props.ariaLabelledBy || (labelable ? undefined : field?.labelId.value)
  )

  return { field, id, state, size, disabled, required, describedBy, labelledBy }
}
