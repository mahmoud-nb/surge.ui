import { ref, computed } from 'vue'
import type { SurgeuiTheme } from '@/plugin/theme'
import { flattenThemeToCSS, camelToKebab } from '@/plugin/theme'

/**
 * Composable pour gérer les variables CSS custom du système de thème
 * 
 * Permet de:
 * - Appliquer des variables CSS custom au DOM
 * - Définir des variables individuelles
 * - Réinitialiser les variables
 * - Fusionner avec des thèmes existants
 */
export function useCustomTheme() {
  // État réactif du thème custom
  const customTheme = ref<SurgeuiTheme>({})

  /**
   * Vérifie si le DOM est accessible
   */
  const isDOMAvailable = (): boolean => {
    return typeof document !== 'undefined'
  }

  /**
   * Applique un thème custom entier en variables CSS
   */
  const applyCustomTheme = (theme: SurgeuiTheme): void => {
    if (!isDOMAvailable()) return

    customTheme.value = theme
    const cssVariables = flattenThemeToCSS(theme)

    Object.entries(cssVariables).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value)
    })
  }

  /**
   * Définit une seule variable CSS custom
   * Convertit les noms camelCase en kebab-case
   * Exemple: textPrimary → --su-custom-text-primary
   */
  const setCustomVariable = (property: string, value: string): void => {
    if (!isDOMAvailable()) return

    const kebabProperty = camelToKebab(property)
    const cssVariable = `--su-custom-${kebabProperty}`

    // Met à jour le DOM
    document.documentElement.style.setProperty(cssVariable, value)

    // Met à jour l'état réactif
    const keys = property.split(/(?=[A-Z])/).map((part) => part.toLowerCase())
    let current: any = customTheme.value
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {}
      }
      current = current[keys[i]]
    }
    current[keys[keys.length - 1]] = value
  }

  /**
   * Retourne le thème custom actuel
   */
  const getCustomTheme = (): SurgeuiTheme => {
    return customTheme.value
  }

  /**
   * Réinitialise toutes les variables custom au DOM
   */
  const resetCustomTheme = (): void => {
    if (!isDOMAvailable()) return

    // Récupère les variables CSS custom appliquées
    const style = document.documentElement.style
    const cssVariablesToRemove: string[] = []

    for (let i = 0; i < style.length; i++) {
      const propertyName = style[i]
      if (propertyName.startsWith('--su-custom-')) {
        cssVariablesToRemove.push(propertyName)
      }
    }

    // Supprime toutes les variables custom
    cssVariablesToRemove.forEach((property) => {
      document.documentElement.style.removeProperty(property)
    })

    // Réinitialise l'état
    customTheme.value = {}
  }

  /**
   * Fusionne deux thèmes (base + override)
   */
  const mergeWithTheme = (baseTheme: SurgeuiTheme, overrideTheme: SurgeuiTheme): SurgeuiTheme => {
    const merge = (base: any, override: any): any => {
      const result = { ...base }

      for (const [key, value] of Object.entries(override)) {
        if (value === null || value === undefined) {
          result[key] = value
          continue
        }

        if (typeof value === 'object' && !Array.isArray(value) && typeof result[key] === 'object' && !Array.isArray(result[key])) {
          result[key] = merge(result[key], value)
        } else {
          result[key] = value
        }
      }

      return result
    }

    return merge(baseTheme, overrideTheme)
  }

  return {
    customTheme: computed(() => customTheme.value),
    applyCustomTheme,
    setCustomVariable,
    getCustomTheme,
    resetCustomTheme,
    mergeWithTheme
  }
}
