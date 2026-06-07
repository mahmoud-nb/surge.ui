import { computed, readonly, type Ref } from 'vue'
import { toValue } from 'vue'
import type { CurrencyDisplay } from '@/types'

// ============================================================
// TYPES
// ============================================================

export interface UsePriceOptions {
  /** Montant numérique. Accepte un ref, un getter, ou un nombre statique. */
  amount: number | Ref<number> | (() => number)
  /** Code devise ISO 4217 (ex: 'EUR', 'USD', 'GBP'). Défaut: 'EUR' */
  currency?: string
  /** Locale BCP 47 (ex: 'fr-FR', 'en-US'). Défaut: 'fr-FR' */
  locale?: string
  /** Affichage de la devise. Défaut: 'symbol' */
  currencyDisplay?: CurrencyDisplay
  /** Nombre minimum de chiffres décimaux. Défaut: 2 */
  minimumFractionDigits?: number
  /** Nombre maximum de chiffres décimaux. Défaut: 2 */
  maximumFractionDigits?: number
  /**
   * Formatter personnalisé. Quand fourni, remplace Intl.NumberFormat.
   * Utile pour des formats spéciaux ("Gratuit", "Sur devis", etc.)
   */
  formatValue?: (amount: number, currency: string, locale: string) => string
}

export interface UsePriceReturn {
  /** Prix formaté complet (ex: "1 299,99 €") */
  formatted: Readonly<Ref<string>>
  /** Partie entière uniquement (ex: "1 299") */
  integerPart: Readonly<Ref<string>>
  /** Partie décimale sans séparateur (ex: "99") */
  decimalPart: Readonly<Ref<string>>
  /** Séparateur décimal de la locale (ex: "," pour fr-FR) */
  decimalSeparator: Readonly<Ref<string>>
  /** Symbole de la devise (ex: "€", "$", "£") */
  currencySymbol: Readonly<Ref<string>>
  /** true si le symbole est positionné avant le montant */
  isSymbolPrefix: Readonly<Ref<boolean>>
  /** Texte accessible pour les lecteurs d'écran (ex: "1 299,99 euros") */
  ariaLabel: Readonly<Ref<string>>
  /** Montant numérique brut résolu */
  rawAmount: Readonly<Ref<number>>
}

// ============================================================
// CACHE FORMATTERS
// ============================================================

/**
 * Cache des instances Intl.NumberFormat pour éviter de recréer
 * des formatters à chaque mise à jour réactive.
 */
const formatterCache = new Map<string, Intl.NumberFormat>()

function getCacheKey(
  locale: string,
  currency: string,
  currencyDisplay: string,
  minFrac: number,
  maxFrac: number,
  style: string = 'currency'
): string {
  return `${style}|${locale}|${currency}|${currencyDisplay}|${minFrac}|${maxFrac}`
}

// ============================================================
// FONCTIONS PURES (HELPERS)
// ============================================================

/**
 * Crée ou récupère du cache un Intl.NumberFormat pour le formatage de devise.
 */
function createCurrencyFormatter(
  locale: string,
  currency: string,
  currencyDisplay: string,
  minFrac: number,
  maxFrac: number
): Intl.NumberFormat {
  const key = getCacheKey(locale, currency, currencyDisplay, minFrac, maxFrac)
  let formatter = formatterCache.get(key)

  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      currencyDisplay: currencyDisplay as Intl.NumberFormatOptions['currencyDisplay'],
      minimumFractionDigits: minFrac,
      maximumFractionDigits: maxFrac,
    })
    formatterCache.set(key, formatter)
  }

  return formatter
}

/**
 * Crée un formatter pour l'ariaLabel avec le nom complet de la devise.
 */
function createAriaFormatter(locale: string, currency: string): Intl.NumberFormat {
  const key = getCacheKey(locale, currency, 'name', 2, 2, 'currency-name')
  let formatter = formatterCache.get(key)

  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      currencyDisplay: 'name',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    formatterCache.set(key, formatter)
  }

  return formatter
}

/**
 * Extrait le symbole de la devise en formatant 0 et en retirant les chiffres.
 */
function extractCurrencySymbol(formatter: Intl.NumberFormat): string {
  // Utiliser formatToParts pour une extraction fiable
  const parts = formatter.formatToParts(0)
  const currencyPart = parts.find(p => p.type === 'currency')
  return currencyPart?.value ?? ''
}

/**
 * Détecte si le symbole de devise est positionné avant le montant.
 */
function detectSymbolPosition(formatter: Intl.NumberFormat): boolean {
  const parts = formatter.formatToParts(1)
  const currencyIndex = parts.findIndex(p => p.type === 'currency')
  const integerIndex = parts.findIndex(p => p.type === 'integer')
  return currencyIndex < integerIndex
}

/**
 * Extrait le séparateur décimal de la locale.
 */
function extractDecimalSeparator(locale: string): string {
  const formatter = new Intl.NumberFormat(locale, { style: 'decimal' })
  const parts = formatter.formatToParts(1.1)
  const decimalPart = parts.find(p => p.type === 'decimal')
  return decimalPart?.value ?? '.'
}

/**
 * Sépare un montant formaté en partie entière et décimale.
 * Utilise formatToParts pour un découpage fiable quel que soit la locale.
 */
function splitFormattedParts(
  formatter: Intl.NumberFormat,
  amount: number
): { integer: string; decimal: string } {
  const parts = formatter.formatToParts(amount)

  let integer = ''
  let decimal = ''
  let pastDecimal = false

  for (const part of parts) {
    if (part.type === 'decimal') {
      pastDecimal = true
      continue
    }
    if (part.type === 'currency' || part.type === 'literal') {
      // On ignore le symbole de devise et les littéraux (espaces autour du symbole)
      // sauf les groupes de milliers (literal entre integer)
      if (!pastDecimal && part.type === 'literal') {
        // Les séparateurs de milliers sont des littéraux entre les groupes d'entiers
        const prevIsInteger = parts[parts.indexOf(part) - 1]?.type === 'integer'
        const nextIsInteger = parts[parts.indexOf(part) + 1]?.type === 'integer'
        if (prevIsInteger && nextIsInteger) {
          integer += part.value
          continue
        }
      }
      continue
    }
    if (part.type === 'integer' || part.type === 'group') {
      integer += part.value
    }
    if (part.type === 'fraction') {
      decimal += part.value
    }
    if (part.type === 'minusSign') {
      integer = part.value + integer
    }
  }

  return { integer: integer.trim(), decimal }
}

/**
 * Vérifie si un montant est valide pour le formatage.
 */
function isValidAmount(amount: number): boolean {
  return typeof amount === 'number' && isFinite(amount) && !isNaN(amount)
}

// ============================================================
// COMPOSABLE
// ============================================================

/**
 * Composable pour le formatage réactif des prix.
 *
 * Utilise `Intl.NumberFormat` pour un formatage correct selon
 * la locale et la devise. Expose les différentes parties du prix
 * pour un rendu flexible dans les composants.
 *
 * Compatible SSR — `Intl.NumberFormat` est disponible dans Node.js.
 *
 * @example
 * ```ts
 * const { formatted, integerPart, decimalPart, currencySymbol } = usePrice({
 *   amount: 1299.99,
 *   currency: 'EUR',
 *   locale: 'fr-FR',
 * })
 *
 * formatted.value      // "1 299,99 €"
 * integerPart.value    // "1 299"
 * decimalPart.value    // "99"
 * currencySymbol.value // "€"
 * ```
 *
 * @example
 * ```ts
 * // Avec un ref réactif
 * const amount = ref(49.99)
 * const { formatted } = usePrice({ amount })
 *
 * amount.value = 29.99
 * formatted.value // "29,99 €"
 * ```
 *
 * @example
 * ```ts
 * // Avec formatter personnalisé
 * const { formatted } = usePrice({
 *   amount: 0,
 *   formatValue: (amt) => amt === 0 ? 'Gratuit' : `${amt} €`,
 * })
 *
 * formatted.value // "Gratuit"
 * ```
 */
export function usePrice(options: UsePriceOptions): UsePriceReturn {
  // Valeurs par défaut
  const currency = options.currency ?? 'EUR'
  const locale = options.locale ?? 'fr-FR'
  const currencyDisplay = options.currencyDisplay ?? 'symbol'
  const minFrac = options.minimumFractionDigits ?? 2
  const maxFrac = options.maximumFractionDigits ?? 2

  // ========================================
  // Résolution réactive du montant
  // ========================================

  const resolvedAmount = computed(() => toValue(options.amount))

  // ========================================
  // Formatter mémoïsé
  // ========================================

  const formatter = computed(() =>
    createCurrencyFormatter(locale, currency, currencyDisplay, minFrac, maxFrac)
  )

  const ariaFormatter = computed(() =>
    createAriaFormatter(locale, currency)
  )

  // ========================================
  // Valeurs dérivées
  // ========================================

  const formatted = computed(() => {
    const amount = resolvedAmount.value

    if (!isValidAmount(amount)) {
      return '--'
    }

    if (options.formatValue) {
      return options.formatValue(amount, currency, locale)
    }

    return formatter.value.format(amount)
  })

  const parts = computed(() => {
    const amount = resolvedAmount.value

    if (!isValidAmount(amount)) {
      return { integer: '--', decimal: '' }
    }

    return splitFormattedParts(formatter.value, amount)
  })

  const integerPart = computed(() => parts.value.integer)
  const decimalPart = computed(() => parts.value.decimal)

  const decimalSeparator = computed(() =>
    extractDecimalSeparator(locale)
  )

  const currencySymbol = computed(() =>
    extractCurrencySymbol(formatter.value)
  )

  const isSymbolPrefix = computed(() =>
    detectSymbolPosition(formatter.value)
  )

  const ariaLabel = computed(() => {
    const amount = resolvedAmount.value

    if (!isValidAmount(amount)) {
      return 'prix indisponible'
    }

    return ariaFormatter.value.format(amount)
  })

  // ========================================
  // API publique
  // ========================================

  return {
    /** Prix formaté complet (ex: "1 299,99 €") */
    formatted: readonly(formatted),

    /** Partie entière (ex: "1 299") */
    integerPart: readonly(integerPart),

    /** Partie décimale sans séparateur (ex: "99") */
    decimalPart: readonly(decimalPart),

    /** Séparateur décimal de la locale (ex: ",") */
    decimalSeparator: readonly(decimalSeparator),

    /** Symbole de la devise (ex: "€") */
    currencySymbol: readonly(currencySymbol),

    /** true si le symbole est positionné avant le montant */
    isSymbolPrefix: readonly(isSymbolPrefix),

    /** Texte accessible pour lecteurs d'écran */
    ariaLabel: readonly(ariaLabel),

    /** Montant numérique brut résolu */
    rawAmount: readonly(resolvedAmount),
  }
}
