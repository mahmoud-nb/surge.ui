<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useAttrs, watch, type HTMLAttributes, type StyleValue } from 'vue'
import { MinusIcon, PlusIcon } from '@heroicons/vue/24/outline'
import type { NumberInputProps } from '@/types'
import { useFormField } from '@/composables/useFormField'
import { useLocale } from '@/composables/useLocale'

// ============================================================
// NUMBER INPUT — champ numérique (motif APG « spinbutton »).
// - Saisie dans le format de la langue (« 1 234,5 » en français),
//   validée à la sortie du champ ou avec Entrée : bornée, arrondie,
//   puis affichée avec formatOptions (devise, unité…).
// - Flèches haut/bas : ± step ; Page préc./suiv. : ± largeStep ;
//   Début / Fin : min / max.
// - Boutons − / + hors de l'ordre de tabulation (le clavier suffit),
//   maintien pour répéter.
// ============================================================

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<NumberInputProps>(), {
  step: 1,
  controls: true,
  size: 'md',
  state: 'default',
  disabled: false,
  readonly: false,
  required: false
})

const modelValue = defineModel<number | null>({ default: null })

const emit = defineEmits<{
  change: [value: number | null]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const {
  id: controlId,
  state: fieldState,
  size: fieldSize,
  disabled: fieldDisabled,
  required: fieldRequired,
  describedBy,
  labelledBy
} = useFormField(props, { idPrefix: 'number-input' })

const { t, locale } = useLocale()
const incrementText = computed(() => props.incrementLabel ?? t('numberInput.increment'))
const decrementText = computed(() => props.decrementLabel ?? t('numberInput.decrement'))

// class/style décorent le conteneur, le reste va sur l'input
const attrs = useAttrs()
const containerAttrs = computed(() => ({
  class: attrs.class as HTMLAttributes['class'],
  style: attrs.style as StyleValue
}))
const inputAttrs = computed(() => {
  const { class: _class, style: _style, id: _id, ...rest } = attrs
  return rest
})

const inputRef = ref<HTMLInputElement>()

// ### Format et lecture des nombres

const code = computed(() => props.locale ?? locale.value.code)

const createFormatter = (options: Intl.NumberFormatOptions) => {
  try {
    return new Intl.NumberFormat(code.value, options)
  } catch {
    return new Intl.NumberFormat(code.value)
  }
}

const decimalsOf = (value: number) => {
  const [, exponent] = String(value).split('e-')
  if (exponent) return Number(exponent)
  return String(value).split('.')[1]?.length ?? 0
}

// Affichage hors focus : formatOptions (devise, unité, pourcentage…)
const displayFormatter = computed(() => createFormatter({
  ...(props.precision !== undefined ? { maximumFractionDigits: props.precision } : {}),
  ...props.formatOptions
}))

// Décimales conservées : précision explicite, sinon celles du pas et du format
const fractionDigits = computed(() => props.precision ?? Math.max(
  decimalsOf(props.step),
  displayFormatter.value.resolvedOptions().maximumFractionDigits ?? 0
))

// Saisie : nombre nu, sans séparateur de milliers ni symbole
const editFormatter = computed(() => createFormatter({ useGrouping: false, maximumFractionDigits: fractionDigits.value }))

const separators = computed(() => {
  const parts = createFormatter({}).formatToParts(12345.6)
  return {
    group: parts.find((part) => part.type === 'group')?.value ?? ',',
    decimal: parts.find((part) => part.type === 'decimal')?.value ?? '.'
  }
})

/** Texte saisi → nombre (null si vide, NaN si illisible) */
const parse = (input: string): number | null => {
  let text = input.trim()
  if (!text) return null
  const { group, decimal } = separators.value
  text = text.replace(/[\s\u00a0\u202f]/g, '')
  if (group.trim()) text = text.split(group).join('')
  if (decimal !== '.') text = text.replace(decimal, '.')
  // Symboles de devise, d'unité ou de pourcentage ignorés
  text = text.replace(/[^\d.\-+eE]/g, '')
  const value = Number(text)
  return text && Number.isFinite(value) ? value : NaN
}

const format = (value: number | null, editing: boolean) =>
  value === null || !Number.isFinite(value) ? '' : (editing ? editFormatter : displayFormatter).value.format(value)

const normalize = (value: number) => {
  let next = value
  if (props.min !== undefined) next = Math.max(props.min, next)
  if (props.max !== undefined) next = Math.min(props.max, next)
  return Number(next.toFixed(Math.min(20, fractionDigits.value)))
}

// ### État

const focused = ref(false)
const text = ref(format(modelValue.value, false))

watch([modelValue, displayFormatter], () => {
  if (!focused.value) text.value = format(modelValue.value, false)
})

const canEdit = computed(() => !fieldDisabled.value && !props.readonly)
const atMin = computed(() => props.min !== undefined && modelValue.value !== null && modelValue.value <= props.min)
const atMax = computed(() => props.max !== undefined && modelValue.value !== null && modelValue.value >= props.max)

const setValue = (value: number | null) => {
  const next = value === null ? null : normalize(value)
  const changed = next !== modelValue.value
  modelValue.value = next
  text.value = format(next, focused.value)
  if (changed) emit('change', next)
}

/** Valide le texte saisi ; un texte illisible rend la valeur précédente */
const commit = () => {
  const parsed = parse(text.value)
  if (Number.isNaN(parsed)) {
    text.value = format(modelValue.value, focused.value)
    return
  }
  setValue(parsed)
}

const stepBy = (delta: number) => {
  if (!canEdit.value) return
  const parsed = parse(text.value)
  const base = parsed === null || Number.isNaN(parsed) ? modelValue.value : parsed
  // Champ vide : on part de 0, ramené dans les bornes
  setValue(base === null ? 0 : base + delta)
}

// ### Clavier

const handleKeydown = (event: KeyboardEvent) => {
  const largeStep = props.largeStep ?? props.step * 10
  switch (event.key) {
    case 'ArrowUp':
      stepBy(props.step)
      break
    case 'ArrowDown':
      stepBy(-props.step)
      break
    case 'PageUp':
      stepBy(largeStep)
      break
    case 'PageDown':
      stepBy(-largeStep)
      break
    case 'Home':
      if (props.min === undefined || !canEdit.value) return
      setValue(props.min)
      break
    case 'End':
      if (props.max === undefined || !canEdit.value) return
      setValue(props.max)
      break
    case 'Enter':
      // Valide sans empêcher l'envoi du formulaire
      commit()
      return
    default:
      return
  }
  event.preventDefault()
}

const handleInput = (event: Event) => {
  text.value = (event.target as HTMLInputElement).value
}

const handleFocus = (event: FocusEvent) => {
  focused.value = true
  text.value = format(modelValue.value, true)
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  commit()
  focused.value = false
  text.value = format(modelValue.value, false)
  emit('blur', event)
}

// ### Boutons : appui maintenu = répétition

let holdTimer: ReturnType<typeof setTimeout> | undefined
let holdInterval: ReturnType<typeof setInterval> | undefined

const stopHold = () => {
  clearTimeout(holdTimer)
  clearInterval(holdInterval)
}

const startHold = (direction: 1 | -1, event: PointerEvent) => {
  if (event.button !== 0 || !canEdit.value) return
  // Le focus reste (ou va) dans le champ
  event.preventDefault()
  inputRef.value?.focus()
  stepBy(direction * props.step)
  stopHold()
  holdTimer = setTimeout(() => {
    holdInterval = setInterval(() => stepBy(direction * props.step), 60)
  }, 400)
}

// Activation sans pointeur (curseur virtuel d'un lecteur d'écran)
const handleButtonClick = (direction: 1 | -1, event: MouseEvent) => {
  if (event.detail === 0) stepBy(direction * props.step)
}

onBeforeUnmount(stopHold)

// ### Classes et ARIA

const classes = computed(() => [
  'su-number-input',
  `su-number-input--${fieldSize.value}`,
  `su-number-input--${fieldState.value}`,
  {
    'su-number-input--controls': props.controls,
    'su-number-input--readonly': props.readonly
  }
])

const inputMode = computed(() => {
  if (props.min !== undefined && props.min >= 0) return fractionDigits.value > 0 ? 'decimal' : 'numeric'
  return 'text'
})

const ariaAttributes = computed(() => {
  const result: Record<string, string | number | undefined> = {
    role: 'spinbutton',
    'aria-valuenow': modelValue.value ?? undefined,
    'aria-valuemin': props.min,
    'aria-valuemax': props.max,
    'aria-valuetext': modelValue.value !== null ? displayFormatter.value.format(modelValue.value) : undefined
  }
  if (props.ariaLabel) result['aria-label'] = props.ariaLabel
  if (labelledBy.value) result['aria-labelledby'] = labelledBy.value
  if (describedBy.value) result['aria-describedby'] = describedBy.value
  if (fieldState.value === 'error' || props.ariaInvalid) result['aria-invalid'] = 'true'
  return result
})

defineExpose({
  inputRef,
  focus: () => inputRef.value?.focus(),
  increment: () => stepBy(props.step),
  decrement: () => stepBy(-props.step)
})
</script>

<template>
  <div
    :class="[classes, containerAttrs.class]"
    :style="containerAttrs.style"
  >
    <button
      v-if="controls"
      type="button"
      tabindex="-1"
      class="su-number-input__button"
      :aria-label="decrementText"
      :aria-controls="controlId"
      :aria-disabled="atMin || !canEdit ? 'true' : undefined"
      @pointerdown="startHold(-1, $event)"
      @pointerup="stopHold"
      @pointerleave="stopHold"
      @pointercancel="stopHold"
      @click="handleButtonClick(-1, $event)"
    >
      <MinusIcon
        class="su-number-input__icon"
        aria-hidden="true"
      />
    </button>

    <input
      :id="controlId"
      ref="inputRef"
      class="su-number-input__element"
      type="text"
      autocomplete="off"
      autocorrect="off"
      spellcheck="false"
      :inputmode="inputMode"
      :name="name"
      :placeholder="placeholder"
      :value="text"
      :disabled="fieldDisabled"
      :readonly="readonly"
      :required="fieldRequired"
      v-bind="{ ...inputAttrs, ...ariaAttributes }"
      @input="handleInput"
      @keydown="handleKeydown"
      @focus="handleFocus"
      @blur="handleBlur"
    >

    <button
      v-if="controls"
      type="button"
      tabindex="-1"
      class="su-number-input__button"
      :aria-label="incrementText"
      :aria-controls="controlId"
      :aria-disabled="atMax || !canEdit ? 'true' : undefined"
      @pointerdown="startHold(1, $event)"
      @pointerup="stopHold"
      @pointerleave="stopHold"
      @pointercancel="stopHold"
      @click="handleButtonClick(1, $event)"
    >
      <PlusIcon
        class="su-number-input__icon"
        aria-hidden="true"
      />
    </button>
  </div>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// NUMBER INPUT — surface de contrôle comme SuInput ; boutons carrés
// de part et d'autre, chiffres tabulaires centrés
// ============================================================

.su-number-input {
  --_su-number-height: var(--su-control-height-md);

  display: flex;
  align-items: stretch;
  width: 100%;
  min-height: var(--_su-number-height);
  color: var(--su-text-primary);
  font-size: var(--su-font-size-base);

  @include control-surface;

  @include up('sm') {
    --_su-number-height: var(--su-control-height-md-compact);

    font-size: var(--su-font-size-sm);
  }

  &--sm {
    --_su-number-height: var(--su-control-height-sm);

    @include up('sm') {
      --_su-number-height: var(--su-control-height-sm-compact);
    }
  }

  &--lg {
    --_su-number-height: var(--su-control-height-lg);

    @include up('sm') {
      --_su-number-height: var(--su-control-height-lg-compact);
    }
  }

  @each $state in ('error', 'success', 'warning') {
    &--#{$state} {
      border-color: with-alpha(state-#{$state}, 48%);

      &:focus-within {
        @include focus-ring-field(var(--su-state-#{$state}));
      }
    }
  }

  &--readonly {
    background-color: var(--su-bg-muted);
  }
}

.su-number-input__element {
  flex: 1;
  min-width: 0;
  margin: 0;
  padding: 0 0.75rem;
  border: 0;
  outline: none;
  background: transparent;
  color: inherit;
  font: inherit;
  font-variant-numeric: tabular-nums;
  line-height: 1.5;

  &::placeholder {
    color: var(--su-text-tertiary);
  }

  .su-number-input--controls & {
    padding-inline: 0.25rem;
    text-align: center;
  }
}

.su-number-input__button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: var(--_su-number-height);
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: inherit;
  background: transparent;
  color: var(--su-text-secondary);
  cursor: pointer;
  touch-action: manipulation;
  user-select: none;

  @include transition(background-color, color);
  @include touch-target-overlay;

  &:hover:not([aria-disabled='true']) {
    background-color: var(--su-bg-accent);
    color: var(--su-text-primary);
  }

  &[aria-disabled='true'] {
    opacity: var(--su-opacity-disabled);
    cursor: not-allowed;
  }
}

.su-number-input__icon {
  @include button-icon;
}
</style>
