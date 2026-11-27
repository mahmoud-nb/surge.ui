import type { LayoutBreakpoint, LayoutColumns } from '@/types'

/**
 * Utilitaires des layouts (templates)
 */

const BREAKPOINTS: ('base' | LayoutBreakpoint)[] = ['base', 'sm', 'md', 'lg', 'xl']

/**
 * Variables CSS du nombre de colonnes, une par largeur de conteneur.
 * Mobile first : un point de rupture non défini hérite du précédent.
 * @example columnVars({ base: 1, md: 3 }, '--su-grid-layout-columns')
 * // { '--su-grid-layout-columns-base': 1, '…-sm': 1, '…-md': 3, '…-lg': 3, '…-xl': 3 }
 */
export function columnVars(columns: LayoutColumns, prefix: string): Record<string, number> {
  const config = typeof columns === 'number' ? { base: columns } : columns
  let current = 1
  return Object.fromEntries(BREAKPOINTS.map((bp) => {
    const value = config[bp]
    if (typeof value === 'number' && value > 0) current = Math.floor(value)
    return [`${prefix}-${bp}`, current]
  }))
}
