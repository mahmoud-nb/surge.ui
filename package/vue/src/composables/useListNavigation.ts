import { nextTick, ref, toValue, type MaybeRefOrGetter } from 'vue'
import { useTypeahead } from './useTypeahead'

// ============================================================
// NAVIGATION CLAVIER DANS UNE LISTE
//
// Flèches, Début / Fin et saisie rapide, en sautant les éléments
// désactivés. Deux modes :
// - `virtual` : le focus reste sur le contrôle (combobox, champ de
//   recherche) ; l'élément actif est annoncé par aria-activedescendant ;
// - `roving` : le focus se déplace d'élément en élément (onglets, menu,
//   en-têtes d'accordéon), un seul étant dans l'ordre de tabulation.
// En horizontal, les flèches suivent le sens de lecture (RTL inversé).
// ============================================================

export type ListOrientation = 'vertical' | 'horizontal' | 'both'

export interface ListNavigationOptions<T> {
  items: MaybeRefOrGetter<readonly T[]>
  /** Éléments sautés par la navigation */
  isDisabled?: (item: T, index: number) => boolean
  /** Flèches actives : haut/bas, gauche/droite, ou les quatre (défaut : vertical) */
  orientation?: ListOrientation
  /** Boucle de la fin au début (défaut : false) */
  loop?: boolean
  /** Début / Fin vont au premier / dernier élément (défaut : true) */
  homeEnd?: boolean
  /** `roving` déplace le focus DOM ; `virtual` le laisse en place (défaut) */
  mode?: 'roving' | 'virtual'
  /** Élément DOM d'un index (mode roving) */
  getElement?: (index: number) => HTMLElement | null | undefined
  /** Saisie rapide : texte de chaque élément */
  typeahead?: { getLabel: (item: T) => string; timeout?: number } | false
  /** Appelé quand l'élément actif change (activation automatique des onglets…) */
  onActiveChange?: (index: number) => void
}

export function useListNavigation<T>(options: ListNavigationOptions<T>) {
  const {
    isDisabled,
    orientation = 'vertical',
    loop = false,
    homeEnd = true,
    mode = 'virtual',
    getElement,
    onActiveChange
  } = options

  const activeIndex = ref(-1)
  const items = () => toValue(options.items)
  const disabled = (index: number) => {
    const item = items()[index]
    return item === undefined || !!isDisabled?.(item, index)
  }

  const typeahead = options.typeahead
    ? useTypeahead({ items: options.items, getLabel: options.typeahead.getLabel, isDisabled, timeout: options.typeahead.timeout })
    : null

  /** Premier élément actif à partir de `start` dans le sens `step` (-1 si aucun) */
  const findEnabled = (start: number, step: 1 | -1) => {
    const list = items()
    for (let i = start; i >= 0 && i < list.length; i += step) {
      if (!disabled(i)) return i
    }
    return -1
  }

  const setActiveIndex = (index: number, { focus = mode === 'roving' } = {}) => {
    if (index === activeIndex.value && !focus) return
    activeIndex.value = index
    if (index >= 0) onActiveChange?.(index)
    if (focus && index >= 0) nextTick(() => getElement?.(index)?.focus())
  }

  const first = () => {
    const index = findEnabled(0, 1)
    if (index !== -1) setActiveIndex(index)
    return index
  }

  const last = () => {
    const index = findEnabled(items().length - 1, -1)
    if (index !== -1) setActiveIndex(index)
    return index
  }

  const move = (step: 1 | -1) => {
    const current = activeIndex.value
    if (current === -1) return step === 1 ? first() : last()

    let next = findEnabled(current + step, step)
    if (next === -1 && loop) next = step === 1 ? findEnabled(0, 1) : findEnabled(items().length - 1, -1)
    if (next !== -1) setActiveIndex(next)
    return next
  }

  const next = () => move(1)
  const previous = () => move(-1)

  /** Mode roving : l'élément focalisé devient l'élément actif */
  const syncFromTarget = (target: EventTarget | null) => {
    if (mode !== 'roving' || !getElement || !(target instanceof Node)) return
    const list = items()
    for (let i = 0; i < list.length; i++) {
      const element = getElement(i)
      if (element && (element === target || element.contains(target))) {
        activeIndex.value = i
        return
      }
    }
  }

  const isRtl = (target: EventTarget | null) =>
    target instanceof Element && getComputedStyle(target).direction === 'rtl'

  const isEditable = (target: EventTarget | null) =>
    target instanceof HTMLElement &&
    (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))

  /**
   * Traite une touche ; renvoie true si elle a servi à la navigation
   * (l'événement est alors annulé).
   */
  const handleKeydown = (event: KeyboardEvent): boolean => {
    if (event.defaultPrevented) return false
    syncFromTarget(event.target)

    const vertical = orientation !== 'horizontal'
    const horizontal = orientation !== 'vertical'
    const rtl = horizontal && isRtl(event.target)
    let handled = true

    switch (event.key) {
      case 'ArrowDown':
        if (!vertical) handled = false
        else next()
        break
      case 'ArrowUp':
        if (!vertical) handled = false
        else previous()
        break
      case 'ArrowRight':
        if (!horizontal) handled = false
        else if (rtl) previous()
        else next()
        break
      case 'ArrowLeft':
        if (!horizontal) handled = false
        else if (rtl) next()
        else previous()
        break
      case 'Home':
        if (!homeEnd || isEditable(event.target)) handled = false
        else first()
        break
      case 'End':
        if (!homeEnd || isEditable(event.target)) handled = false
        else last()
        break
      default:
        handled = handleTypeahead(event)
    }

    if (handled) event.preventDefault()
    return handled
  }

  /** Saisie rapide sur une touche imprimable (hors champ éditable) */
  const handleTypeahead = (event: KeyboardEvent): boolean => {
    if (!typeahead || isEditable(event.target)) return false
    if (event.key.length !== 1 || event.ctrlKey || event.metaKey || event.altKey) return false
    // Espace n'appartient à la saisie que si un préfixe est en cours
    if (event.key === ' ' && !typeahead.isTyping()) return false
    const index = typeahead.search(event.key, activeIndex.value)
    if (index !== -1) setActiveIndex(index)
    return true
  }

  /** Recherche par préfixe (sans événement clavier) */
  const searchTypeahead = (char: string) => {
    if (!typeahead) return -1
    const index = typeahead.search(char, activeIndex.value)
    if (index !== -1) setActiveIndex(index)
    return index
  }

  const reset = () => {
    activeIndex.value = -1
    typeahead?.reset()
  }

  return {
    activeIndex,
    setActiveIndex,
    first,
    last,
    next,
    previous,
    findEnabled,
    handleKeydown,
    searchTypeahead,
    isTyping: () => typeahead?.isTyping() ?? false,
    reset
  }
}
