import { afterEach, describe, expect, it } from 'vitest'
import { createFocusTrap, getTabbableElements } from '@/composables/useFocusTrap'
import { trapFocus } from '@/utils/accessibility'

const traps: { deactivate: () => void }[] = []

afterEach(() => {
  traps.splice(0).forEach((trap) => trap.deactivate())
  document.body.innerHTML = ''
})

/** Conteneur avec des boutons, ajouté au document */
const panel = (labels: string[], extra = '') => {
  const container = document.createElement('div')
  container.innerHTML = labels.map((label) => `<button type="button">${label}</button>`).join('') + extra
  document.body.appendChild(container)
  return container
}

const trap = (container: HTMLElement, options = {}) => {
  const instance = createFocusTrap(container, options)
  traps.push(instance)
  return instance
}

const tab = (shiftKey = false) => {
  const event = new KeyboardEvent('keydown', { key: 'Tab', shiftKey, bubbles: true, cancelable: true })
  ;(document.activeElement ?? document.body).dispatchEvent(event)
  return event
}

const buttons = (container: HTMLElement) => Array.from(container.querySelectorAll('button'))

describe('getTabbableElements', () => {
  it('écarte les éléments désactivés, cachés et hors tabulation', () => {
    const container = panel(['A'], '<button disabled>B</button><span tabindex="-1">C</span><div hidden><button>D</button></div><a href="#">E</a>')
    expect(getTabbableElements(container).map((el) => el.textContent)).toEqual(['A', 'E'])
  })
})

describe('createFocusTrap', () => {
  it('donne le focus au premier élément à l’activation', () => {
    const container = panel(['Un', 'Deux'])
    trap(container).activate()
    expect(document.activeElement).toBe(buttons(container)[0])
  })

  it('respecte initialFocus', () => {
    const container = panel(['Un', 'Deux'])
    trap(container, { initialFocus: () => buttons(container)[1] }).activate()
    expect(document.activeElement).toBe(buttons(container)[1])
  })

  it('boucle de la fin au début avec Tab, et inversement avec Maj+Tab', () => {
    const container = panel(['Un', 'Deux', 'Trois'])
    const [first, , last] = buttons(container)
    trap(container).activate()

    last.focus()
    expect(tab().defaultPrevented).toBe(true)
    expect(document.activeElement).toBe(first)

    tab(true)
    expect(document.activeElement).toBe(last)
  })

  it('laisse Tab natif entre deux éléments intérieurs', () => {
    const container = panel(['Un', 'Deux', 'Trois'])
    trap(container).activate()
    expect(tab().defaultPrevented).toBe(false)
  })

  it('ramène le focus quand il sort du conteneur', () => {
    const outside = panel(['Dehors'])
    const container = panel(['Dedans'])
    trap(container).activate()

    buttons(outside)[0].focus()
    expect(document.activeElement).toBe(buttons(container)[0])
  })

  it('rend le focus à l’élément d’origine à la désactivation', () => {
    const origin = panel(['Déclencheur'])
    buttons(origin)[0].focus()
    const container = panel(['Dedans'])
    const instance = trap(container)

    instance.activate()
    expect(document.activeElement).toBe(buttons(container)[0])
    instance.deactivate()
    expect(document.activeElement).toBe(buttons(origin)[0])
  })

  it('n’agit que pour le piège du dessus, le précédent reprend ensuite', () => {
    const outer = panel(['Externe 1', 'Externe 2'])
    const inner = panel(['Interne 1', 'Interne 2'])
    const outerTrap = trap(outer)
    const innerTrap = trap(inner)

    outerTrap.activate()
    innerTrap.activate()
    buttons(inner)[1].focus()
    tab()
    expect(document.activeElement).toBe(buttons(inner)[0])

    innerTrap.deactivate()
    // Focus rendu au premier bouton externe (focalisé avant le piège interne)
    expect(document.activeElement).toBe(buttons(outer)[0])
    buttons(outer)[1].focus()
    tab()
    expect(document.activeElement).toBe(buttons(outer)[0])
  })

  it('donne le focus au conteneur s’il n’a aucun élément focalisable', () => {
    const container = panel([], '<p>Texte</p>')
    trap(container).activate()
    expect(document.activeElement).toBe(container)
    expect(container.getAttribute('tabindex')).toBe('-1')
  })

  it('trapFocus (obsolète) passe par le même piège', () => {
    const container = panel(['Un', 'Deux'])
    const release = trapFocus(container)
    traps.push({ deactivate: release })

    expect(document.activeElement).toBe(buttons(container)[0])
    buttons(container)[1].focus()
    tab()
    expect(document.activeElement).toBe(buttons(container)[0])
  })
})
