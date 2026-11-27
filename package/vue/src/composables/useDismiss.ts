import { onBeforeUnmount, toValue, watch, type MaybeRefOrGetter } from 'vue'

// ============================================================
// FERMETURE DES ÉLÉMENTS SUPERPOSÉS (popover, menu, liste…)
//
// Chaque élément ouvert forme une couche. Les couches s'empilent dans
// l'ordre d'ouverture :
// - Échap ne ferme que la couche du dessus (et empêche la fermeture
//   native d'un <dialog> parent) ;
// - un appui à l'extérieur ferme chaque couche dont il sort, sachant
//   qu'un appui dans une couche ouverte au-dessus (sous-menu, liste
//   déroulante, même téléportée) ne compte pas comme extérieur.
// ============================================================

type ElementTarget = MaybeRefOrGetter<HTMLElement | null | undefined>

export type DismissReason = 'escape' | 'outside' | 'focus-outside'

export interface DismissOptions {
  /** La couche est active (élément ouvert) */
  enabled: MaybeRefOrGetter<boolean>
  /** Appelé quand la couche doit se fermer */
  onDismiss: (reason: DismissReason, event: Event) => void
  /** Fermeture avec Échap (défaut : true) */
  escape?: MaybeRefOrGetter<boolean>
  /** Fermeture à l'appui (pointerdown) hors des éléments (défaut : true) */
  outside?: MaybeRefOrGetter<boolean>
  /** Fermeture quand le focus quitte les éléments (défaut : false) */
  focusOutside?: MaybeRefOrGetter<boolean>
}

interface Layer {
  elements: () => HTMLElement[]
  options: DismissOptions
}

const layers: Layer[] = []
let listening = false

const contains = (layer: Layer, target: Node) => layer.elements().some((element) => element.contains(target))

/** La cible est dans la couche ou dans une couche ouverte au-dessus d'elle */
const isInsideOrAbove = (index: number, target: Node) =>
  layers.slice(index).some((layer) => contains(layer, target))

const enabledOption = (value: MaybeRefOrGetter<boolean> | undefined, fallback: boolean) =>
  value === undefined ? fallback : toValue(value)

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key !== 'Escape' || event.defaultPrevented) return
  const top = layers[layers.length - 1]
  if (!top || !enabledOption(top.options.escape, true)) return
  // Annule aussi la fermeture native d'un <dialog> parent
  event.preventDefault()
  top.options.onDismiss('escape', event)
}

const handlePointerDown = (event: PointerEvent) => {
  const target = event.target as Node | null
  if (!target) return
  // Du dessus vers le dessous : une fermeture peut retirer des couches
  const toDismiss = layers
    .map((layer, index) => ({ layer, index }))
    .filter(({ layer, index }) => enabledOption(layer.options.outside, true) && !isInsideOrAbove(index, target))
    .reverse()
  toDismiss.forEach(({ layer }) => layer.options.onDismiss('outside', event))
}

const handleFocusIn = (event: FocusEvent) => {
  const target = event.target as Node | null
  if (!target) return
  const toDismiss = layers
    .map((layer, index) => ({ layer, index }))
    .filter(({ layer, index }) => enabledOption(layer.options.focusOutside, false) && !isInsideOrAbove(index, target))
    .reverse()
  toDismiss.forEach(({ layer }) => layer.options.onDismiss('focus-outside', event))
}

const startListening = () => {
  if (listening) return
  // Échap en phase de bouillonnement : un composant qui gère Échap
  // lui-même (et arrête la propagation) reste prioritaire
  document.addEventListener('keydown', handleKeydown)
  // Appui en phase de capture : avant qu'un composant n'arrête l'événement
  document.addEventListener('pointerdown', handlePointerDown, true)
  document.addEventListener('focusin', handleFocusIn)
  listening = true
}

const stopListening = () => {
  if (!listening || layers.length) return
  document.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('pointerdown', handlePointerDown, true)
  document.removeEventListener('focusin', handleFocusIn)
  listening = false
}

/**
 * Ferme un élément superposé avec Échap, un appui à l'extérieur ou la
 * perte du focus. Les éléments listés (déclencheur, panneau…) forment
 * « l'intérieur ».
 *
 * @example
 * useDismiss([triggerRef, panelRef], {
 *   enabled: isOpen,
 *   onDismiss: (reason) => close({ returnFocus: reason === 'escape' })
 * })
 */
export function useDismiss(targets: ElementTarget | ElementTarget[], options: DismissOptions) {
  const list = Array.isArray(targets) ? targets : [targets]
  const layer: Layer = {
    elements: () => list.map((target) => toValue(target)).filter((element): element is HTMLElement => !!element),
    options
  }

  const add = () => {
    if (typeof document === 'undefined' || layers.includes(layer)) return
    layers.push(layer)
    startListening()
  }

  const remove = () => {
    const index = layers.indexOf(layer)
    if (index === -1) return
    layers.splice(index, 1)
    stopListening()
  }

  watch(
    () => toValue(options.enabled),
    (enabled) => (enabled ? add() : remove()),
    { immediate: true }
  )

  onBeforeUnmount(remove)

  return {
    /** La couche est celle du dessus (seule à réagir à Échap) */
    isTopLayer: () => layers[layers.length - 1] === layer
  }
}
