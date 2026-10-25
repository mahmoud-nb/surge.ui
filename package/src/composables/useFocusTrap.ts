import {
  onBeforeUnmount,
  readonly,
  ref,
  toValue,
  watch,
  nextTick,
  type MaybeRefOrGetter
} from 'vue'

// ============================================================
// PIÈGE À FOCUS
//
// Garde la tabulation dans un conteneur (panneau, popover modal, menu
// mobile) et rend le focus à l'élément d'origine à la sortie.
// Les pièges s'empilent : seul le dernier activé agit, le précédent
// reprend la main quand il se désactive.
//
// Inutile pour SuDialog : un <dialog> ouvert avec showModal() piège
// déjà le focus nativement.
// ============================================================

type ElementTarget = MaybeRefOrGetter<HTMLElement | null | undefined>

export interface FocusTrapOptions {
  /** Active le piège tant que la valeur est vraie (sinon : activate() / deactivate()) */
  active?: MaybeRefOrGetter<boolean>
  /**
   * Élément qui reçoit le focus à l'activation (par défaut : le premier
   * élément focalisable, sinon le conteneur). `false` : le focus ne bouge pas.
   */
  initialFocus?: (() => HTMLElement | null | undefined) | false
  /**
   * Rend le focus à la désactivation : `true` (élément focalisé avant
   * l'activation), ou un élément précis. Le focus n'est rendu que s'il est
   * encore dans le conteneur (l'utilisateur n'a pas cliqué ailleurs).
   */
  returnFocus?: boolean | (() => HTMLElement | null | undefined)
}

const FOCUSABLE = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  'audio[controls]',
  'video[controls]',
  'summary',
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]'
].join(',')

/** Éléments atteignables par Tab dans un conteneur, dans l'ordre du DOM */
export function getTabbableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((element) => {
    if (element.tabIndex < 0) return false
    if (element.closest('[inert], [hidden]')) return false
    // checkVisibility : écarte les éléments en display:none ou visibility:hidden
    const visible = typeof element.checkVisibility === 'function'
      ? element.checkVisibility({ visibilityProperty: true })
      : true
    return visible
  })
}

interface TrapInstance {
  container: () => HTMLElement | null | undefined
}

// Pile des pièges actifs (côté client uniquement : rien ne s'active en SSR)
const stack: TrapInstance[] = []
const isTop = (trap: TrapInstance) => stack[stack.length - 1] === trap

let listening = false

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key !== 'Tab' || event.defaultPrevented) return
  const trap = stack[stack.length - 1]
  const container = trap?.container()
  if (!container) return

  const tabbables = getTabbableElements(container)
  if (!tabbables.length) {
    event.preventDefault()
    container.focus()
    return
  }

  const first = tabbables[0]
  const last = tabbables[tabbables.length - 1]
  const current = document.activeElement as HTMLElement | null
  const inside = !!current && container.contains(current)

  if (event.shiftKey && (!inside || current === first || current === container)) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && (!inside || current === last)) {
    event.preventDefault()
    first.focus()
  }
}

// Focus parti hors du piège (clic, focus programmatique) : on le ramène
const handleFocusIn = (event: FocusEvent) => {
  const trap = stack[stack.length - 1]
  const container = trap?.container()
  const target = event.target as Node | null
  if (!container || !target || container.contains(target)) return
  const [first] = getTabbableElements(container)
  ;(first ?? container).focus()
}

const startListening = () => {
  if (listening) return
  document.addEventListener('keydown', handleKeydown, true)
  document.addEventListener('focusin', handleFocusIn, true)
  listening = true
}

const stopListening = () => {
  if (!listening || stack.length) return
  document.removeEventListener('keydown', handleKeydown, true)
  document.removeEventListener('focusin', handleFocusIn, true)
  listening = false
}

/**
 * Piège à focus sans cycle de vie Vue (utilisable hors composant).
 * @returns activate / deactivate / isActive
 */
export function createFocusTrap(target: ElementTarget, options: Omit<FocusTrapOptions, 'active'> = {}) {
  const { initialFocus, returnFocus = true } = options
  const trap: TrapInstance = { container: () => toValue(target) }
  let previouslyFocused: HTMLElement | null = null
  let active = false

  const activate = () => {
    if (active || typeof document === 'undefined') return
    const container = trap.container()
    if (!container) return

    active = true
    previouslyFocused = document.activeElement as HTMLElement | null
    stack.push(trap)
    startListening()

    if (initialFocus === false) return
    const element = initialFocus?.() ?? getTabbableElements(container)[0]
    if (element) {
      element.focus()
    } else {
      // Conteneur sans élément focalisable : il reçoit le focus lui-même
      if (!container.hasAttribute('tabindex')) container.setAttribute('tabindex', '-1')
      container.focus()
    }
  }

  const deactivate = () => {
    if (!active) return
    active = false
    const container = trap.container()
    const wasTop = isTop(trap)
    const index = stack.indexOf(trap)
    if (index !== -1) stack.splice(index, 1)
    stopListening()

    if (!returnFocus || !wasTop) return
    const current = document.activeElement
    const focusStillInside = !current || current === document.body || (container?.contains(current) ?? true)
    if (!focusStillInside) return

    const destination = typeof returnFocus === 'function' ? returnFocus() : previouslyFocused
    if (destination?.isConnected) destination.focus()
  }

  return { activate, deactivate, isActive: () => active }
}

/**
 * Piège à focus lié au cycle de vie du composant.
 *
 * @example
 * const panelRef = ref<HTMLElement>()
 * useFocusTrap(panelRef, { active: isOpen })
 */
export function useFocusTrap(target: ElementTarget, options: FocusTrapOptions = {}) {
  const { active: activeOption, ...trapOptions } = options
  const trap = createFocusTrap(target, trapOptions)
  const active = ref(false)

  const activate = () => {
    trap.activate()
    active.value = trap.isActive()
  }

  const deactivate = () => {
    trap.deactivate()
    active.value = false
  }

  if (activeOption !== undefined) {
    watch(
      () => toValue(activeOption),
      async (value) => {
        if (value) {
          // Le conteneur est souvent rendu par la même mise à jour (v-if)
          await nextTick()
          activate()
        } else {
          deactivate()
        }
      },
      { immediate: true }
    )
  }

  onBeforeUnmount(deactivate)

  return { active: readonly(active), activate, deactivate }
}
