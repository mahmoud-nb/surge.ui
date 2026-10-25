/* eslint-disable vue/one-component-per-file -- composants de test définis sur place */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import { useListNavigation, type ListNavigationOptions } from '@/composables/useListNavigation'
import { useTypeahead } from '@/composables/useTypeahead'

interface Fruit { label: string; disabled?: boolean }

const fruits: Fruit[] = [
  { label: 'Pomme' },
  { label: 'Banane' },
  { label: 'Cerise', disabled: true },
  { label: 'Poire' }
]

const key = (k: string, init: Record<string, unknown> = {}) =>
  new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true, ...init })

let wrapper: VueWrapper | undefined

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  document.body.innerHTML = ''
})

/** Navigation montée dans un composant (le typeahead se nettoie au démontage) */
const setup = (options: Partial<ListNavigationOptions<Fruit>> = {}) => {
  let nav!: ReturnType<typeof useListNavigation<Fruit>>
  wrapper = mount(defineComponent({
    setup() {
      nav = useListNavigation<Fruit>({
        items: fruits,
        isDisabled: (fruit) => !!fruit.disabled,
        typeahead: { getLabel: (fruit) => fruit.label },
        ...options
      })
      return () => h('div')
    }
  }))
  return nav
}

describe('useListNavigation (mode virtual)', () => {
  it('flèches : saute les éléments désactivés et s’arrête aux bords', () => {
    const nav = setup()
    nav.handleKeydown(key('ArrowDown'))
    expect(nav.activeIndex.value).toBe(0)
    nav.handleKeydown(key('ArrowDown'))
    nav.handleKeydown(key('ArrowDown'))
    expect(nav.activeIndex.value).toBe(3)
    nav.handleKeydown(key('ArrowDown'))
    expect(nav.activeIndex.value).toBe(3)
  })

  it('loop : repart du début après la fin', () => {
    const nav = setup({ loop: true })
    nav.setActiveIndex(3)
    nav.handleKeydown(key('ArrowDown'))
    expect(nav.activeIndex.value).toBe(0)
    nav.handleKeydown(key('ArrowUp'))
    expect(nav.activeIndex.value).toBe(3)
  })

  it('Début / Fin', () => {
    const nav = setup()
    nav.handleKeydown(key('End'))
    expect(nav.activeIndex.value).toBe(3)
    nav.handleKeydown(key('Home'))
    expect(nav.activeIndex.value).toBe(0)
  })

  it('annule les touches traitées seulement', () => {
    const nav = setup()
    const handled = key('ArrowDown')
    const ignored = key('Enter')
    expect(nav.handleKeydown(handled)).toBe(true)
    expect(handled.defaultPrevented).toBe(true)
    expect(nav.handleKeydown(ignored)).toBe(false)
    expect(ignored.defaultPrevented).toBe(false)
  })

  it('orientation horizontale : gauche / droite, inversées en RTL', () => {
    const nav = setup({ orientation: 'horizontal' })
    expect(nav.handleKeydown(key('ArrowDown'))).toBe(false)

    const ltr = document.createElement('div')
    document.body.appendChild(ltr)
    ltr.dispatchEvent(key('ArrowRight'))
    nav.handleKeydown(Object.defineProperty(key('ArrowRight'), 'target', { value: ltr }))
    expect(nav.activeIndex.value).toBe(0)

    const rtl = document.createElement('div')
    rtl.setAttribute('dir', 'rtl')
    rtl.style.direction = 'rtl'
    document.body.appendChild(rtl)
    nav.setActiveIndex(1)
    nav.handleKeydown(Object.defineProperty(key('ArrowRight'), 'target', { value: rtl }))
    expect(nav.activeIndex.value).toBe(0)
  })

  it('saisie rapide : préfixe, puis lettre répétée', () => {
    const nav = setup()
    nav.handleKeydown(key('p'))
    expect(nav.activeIndex.value).toBe(0)
    nav.handleKeydown(key('p'))
    expect(nav.activeIndex.value).toBe(3)
  })

  it('la saisie rapide ignore les champs éditables', () => {
    const nav = setup()
    const input = document.createElement('input')
    const event = Object.defineProperty(key('p'), 'target', { value: input })
    expect(nav.handleKeydown(event)).toBe(false)
    expect(nav.activeIndex.value).toBe(-1)
  })

  it('onActiveChange est appelé à chaque changement', () => {
    const onActiveChange = vi.fn()
    const nav = setup({ onActiveChange })
    nav.handleKeydown(key('ArrowDown'))
    nav.handleKeydown(key('ArrowDown'))
    expect(onActiveChange.mock.calls.map(([index]) => index)).toEqual([0, 1])
  })
})

describe('useListNavigation (mode roving)', () => {
  it('déplace le focus DOM et repart de l’élément focalisé', async () => {
    const buttons = ref<HTMLButtonElement[]>([])
    wrapper = mount(defineComponent({
      setup() {
        const nav = useListNavigation<Fruit>({
          items: fruits,
          isDisabled: (fruit) => !!fruit.disabled,
          mode: 'roving',
          getElement: (index) => buttons.value[index]
        })
        return () => h('div', { onKeydown: nav.handleKeydown }, fruits.map((fruit, index) =>
          h('button', { ref: (el: unknown) => { buttons.value[index] = el as HTMLButtonElement } }, fruit.label)))
      }
    }), { attachTo: document.body })

    // Focus placé à la souris sur « Banane », puis flèche bas : « Cerise » (désactivée) est sautée
    buttons.value[1].focus()
    await wrapper.findAll('button')[1].trigger('keydown', { key: 'ArrowDown' })
    expect(document.activeElement).toBe(buttons.value[3])
  })
})

describe('useTypeahead', () => {
  it('cherche à partir de l’élément actif et boucle', () => {
    const typeahead = useTypeahead({ items: fruits, getLabel: (fruit) => fruit.label, isDisabled: (fruit) => !!fruit.disabled })
    expect(typeahead.search('p', 3)).toBe(0)
    typeahead.reset()
    expect(typeahead.search('c', -1)).toBe(-1)
    typeahead.reset()
  })
})
