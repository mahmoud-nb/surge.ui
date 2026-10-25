import {
  computed,
  inject,
  provide,
  toValue,
  type ComputedRef,
  type InjectionKey,
  type MaybeRefOrGetter
} from 'vue'
import { fr } from '@/locales/fr'
import type {
  LocaleMessage,
  MessageKey,
  MessageParams,
  SurgeLocale,
  SurgeLocaleInput,
  SurgeMessages
} from '@/locales/types'

// ============================================================
// LOCALE DES COMPOSANTS
//
// Les textes par défaut (libellés, annonces) viennent de la locale
// fournie par le plugin ou par `provideLocale`, le français sinon.
// Une prop explicite d'un composant reste toujours prioritaire.
// ============================================================

export const LocaleKey: InjectionKey<ComputedRef<SurgeLocale>> = Symbol('SurgeLocale')

/**
 * Complète une locale de base avec des messages partiels.
 * @example defineLocale(en, { messages: { selectBox: { placeholder: 'Pick one…' } } })
 */
export function defineLocale(base: SurgeLocale, overrides?: SurgeLocaleInput | SurgeLocale): SurgeLocale {
  if (!overrides) return base

  const messages = { ...base.messages } as Record<string, Record<string, LocaleMessage>>
  const partial = (overrides.messages ?? {}) as Record<string, Record<string, LocaleMessage> | undefined>
  for (const [namespace, values] of Object.entries(partial)) {
    if (values) messages[namespace] = { ...messages[namespace], ...values }
  }

  return { code: overrides.code ?? base.code, messages: messages as unknown as SurgeMessages }
}

const pluralRules = new Map<string, Intl.PluralRules>()

const getPluralRules = (code: string) => {
  let rules = pluralRules.get(code)
  if (!rules) {
    try {
      rules = new Intl.PluralRules(code)
    } catch {
      rules = new Intl.PluralRules('fr')
    }
    pluralRules.set(code, rules)
  }
  return rules
}

/** Met en forme un message : forme plurielle selon `count`, puis paramètres `{nom}` */
export function formatMessage(message: LocaleMessage, params: MessageParams = {}, code = 'fr'): string {
  let template: string
  if (typeof message === 'string') {
    template = message
  } else {
    const count = Number(params.count ?? 0)
    const category = getPluralRules(code).select(count)
    template = message[category] ?? message.other
  }

  return template.replace(/\{(\w+)\}/g, (match, name: string) => {
    const value = params[name]
    return value === undefined ? match : String(value)
  })
}

const lookup = (locale: SurgeLocale, key: MessageKey): LocaleMessage | undefined => {
  const [namespace, name] = key.split('.') as [keyof SurgeMessages, string]
  return (locale.messages[namespace] as Record<string, LocaleMessage> | undefined)?.[name]
}

/**
 * Fournit une locale à un sous-arbre de composants. Les messages partiels
 * complètent la locale du parent (ou le français).
 *
 * @example
 * // Dans le composant racine : la langue suit l'état de l'application
 * provideLocale(() => (lang.value === 'en' ? en : fr))
 */
export function provideLocale(locale: MaybeRefOrGetter<SurgeLocale | SurgeLocaleInput>) {
  const parent = inject(LocaleKey, null)
  const resolved = computed(() => defineLocale(parent?.value ?? fr, toValue(locale)))
  provide(LocaleKey, resolved)
  return resolved
}

const BYTE_UNITS = ['byte', 'kilobyte', 'megabyte', 'gigabyte'] as const

/**
 * Accès aux textes de la locale courante.
 *
 * @example
 * const { t } = useLocale()
 * const label = computed(() => props.clearLabel ?? t('selectBox.clear'))
 * t('fileUpload.selectedCount', { count: 3 }) // « 3 fichiers sélectionnés »
 */
export function useLocale() {
  const injected = inject(LocaleKey, null)
  const locale = computed(() => injected?.value ?? fr)

  /** Message traduit (pluriel selon `count`, paramètres `{nom}`) */
  const t = (key: MessageKey, params?: MessageParams): string => {
    const message = lookup(locale.value, key) ?? lookup(fr, key)
    return message === undefined ? key : formatMessage(message, params, locale.value.code)
  }

  /** Taille de fichier dans la langue courante (« 1,5 Mo », « 1.5 MB ») */
  const formatBytes = (bytes: number): string => {
    let value = Math.max(0, bytes)
    let unit = 0
    while (value >= 1024 && unit < BYTE_UNITS.length - 1) {
      value /= 1024
      unit++
    }
    try {
      return new Intl.NumberFormat(locale.value.code, {
        style: 'unit',
        unit: BYTE_UNITS[unit],
        unitDisplay: 'short',
        maximumFractionDigits: unit === 0 ? 0 : 1
      }).format(value)
    } catch {
      return `${Math.round(value * 10) / 10} ${['B', 'KB', 'MB', 'GB'][unit]}`
    }
  }

  return { locale, t, formatBytes }
}
