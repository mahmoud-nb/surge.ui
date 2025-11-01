/**
 * Composable pour générer des IDs uniques
 */

let idCounter = 0

export function useUniqueId(prefix: string = 'su'): string {
  return `${prefix}-${++idCounter}-${Date.now().toString(36)}`
}