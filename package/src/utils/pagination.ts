// ============================================================
// PAGINATION — calcul des pages affichées
//
// Toujours le même nombre d'éléments pour un total donné (la barre ne
// change pas de largeur d'une page à l'autre) : une ellipse ne remplace
// jamais une seule page, qui est alors affichée.
// ============================================================

export type PaginationItem = number | 'ellipsis-start' | 'ellipsis-end'

export interface PaginationRangeOptions {
  page: number
  count: number
  /** Pages de part et d'autre de la page courante */
  siblings?: number
  /** Pages toujours affichées au début et à la fin */
  boundaries?: number
}

const range = (start: number, end: number): number[] =>
  end < start ? [] : Array.from({ length: end - start + 1 }, (_, index) => start + index)

/**
 * Pages et ellipses à afficher.
 * @example getPaginationItems({ page: 5, count: 10 }) // [1, 'ellipsis-start', 4, 5, 6, 'ellipsis-end', 10]
 */
export function getPaginationItems({ page, count, siblings = 1, boundaries = 1 }: PaginationRangeOptions): PaginationItem[] {
  const total = Math.max(0, Math.floor(count))
  if (!total) return []

  const current = Math.min(Math.max(1, Math.round(page)), total)
  const sib = Math.max(0, Math.floor(siblings))
  const bound = Math.max(0, Math.floor(boundaries))

  // Assez peu de pages pour toutes les afficher
  if (total <= bound * 2 + sib * 2 + 3) return range(1, total)

  const startPages = range(1, bound)
  const endPages = range(total - bound + 1, total)

  // Fenêtre autour de la page courante, de largeur constante
  const windowStart = Math.max(Math.min(current - sib, total - bound - sib * 2 - 1), bound + 2)
  const windowEnd = Math.min(Math.max(current + sib, bound + sib * 2 + 2), total - bound - 1)

  return [
    ...startPages,
    windowStart > bound + 2 ? 'ellipsis-start' : bound + 1,
    ...range(windowStart, windowEnd),
    windowEnd < total - bound - 1 ? 'ellipsis-end' : total - bound,
    ...endPages
  ]
}
