import type { InjectionKey } from 'vue'
import type { DialogDisplay, LinkSize, LinkUnderline, LinkVariant } from '@/types'

/**
 * Tokens sémantiques pour la personnalisation complète du thème
 * Correspond à la définition des tokens SCSS dans package/src/styles/tokens/
 */
export interface SurgeuiTheme {
  // === Texte ===
  textPrimary?: string
  textSecondary?: string
  textTertiary?: string
  textDisabled?: string
  textInverse?: string

  // === Liens ===
  linkDefault?: string
  linkHover?: string
  linkVisited?: string
  linkMuted?: string

  // === Backgrounds ===
  bgCanvas?: string
  bgSurface?: string
  bgSurfaceElevated?: string
  bgOverlay?: string
  bgDisabled?: string
  bgHover?: string
  bgActive?: string
  bgSelected?: string

  // === Borders ===
  borderDefault?: string
  borderSubtle?: string
  borderStrong?: string
  borderFocus?: string
  borderDisabled?: string

  // === États ===
  stateSuccess?: string
  stateSuccessBg?: string
  stateWarning?: string
  stateWarningBg?: string
  stateError?: string
  stateErrorBg?: string
  stateInfo?: string
  stateInfoBg?: string

  // === Actions Primaires ===
  primaryDefault?: string
  primaryHover?: string
  primaryActive?: string
  primaryDisabled?: string
  primaryText?: string

  // === Actions Secondaires ===
  secondaryDefault?: string
  secondaryHover?: string
  secondaryActive?: string
  secondaryDisabled?: string
  secondaryText?: string

  // === Shadows ===
  shadowColor?: string

  // === Configuration spécifique (héritage de l'ancienne structure) ===
  linkVariant?: Exclude<LinkVariant, 'custom'>
  linkSize?: Exclude<LinkSize, 'default'>
  linkUnderline?: Exclude<LinkUnderline, 'default'>
  dialogDisplay?: Exclude<DialogDisplay, 'center'>
}

export const ThemeSymbol: InjectionKey<SurgeuiTheme> = Symbol('SurgeuiTheme')

/**
 * Convertit une string camelCase en kebab-case
 */
export function camelToKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

/**
 * Convertit un objet de thème en variables CSS `--su-custom-*`
 * Génère des variables pour les propriétés simples et les objets imbriqués
 * 
 * Exemples:
 * - textPrimaryColor → --su-custom-text-primary-color
 * - button: { bg: '#fff' } → --su-custom-button-bg
 * - link: { hoverColor: '#000' } → --su-custom-link-hover-color
 */
export function flattenThemeToCSS(obj: any): Record<string, string> {
  const result: Record<string, string> = {}

  const flatten = (current: any, path: string[] = []) => {
    if (current === null || current === undefined) {
      return
    }

    // Si c'est une valeur primitive ou un tableau, c'est une feuille
    if (typeof current !== 'object' || Array.isArray(current)) {
      const varName = `--su-custom-${path.map(camelToKebab).join('-')}`
      result[varName] = String(current)
      return
    }

    // Si c'est un objet, on récurse sur ses propriétés
    for (const [key, value] of Object.entries(current)) {
      flatten(value, [...path, key])
    }
  }

  flatten(obj)
  return result
}