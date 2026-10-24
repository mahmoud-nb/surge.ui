/**
 * Composable pour générer des IDs uniques
 *
 * Dans un composant, préférer `useId()` de Vue (3.5+) : il produit le même ID
 * côté serveur et côté client. Ce compteur reste disponible hors composant ;
 * il est déterministe (pas d'horodatage) pour limiter les écarts d'hydratation.
 */

let idCounter = 0

export function useUniqueId(prefix: string = 'su'): string {
  return `${prefix}-${++idCounter}`
}
