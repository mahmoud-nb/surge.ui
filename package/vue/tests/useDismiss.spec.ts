import { afterEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick, ref, type Ref } from 'vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import { useDismiss, type DismissReason } from '@/composables/useDismiss'

const wrappers: VueWrapper[] = []

afterEach(() => {
  wrappers.splice(0).forEach((wrapper) => wrapper.unmount())
  document.body.innerHTML = ''
})

/** Couche de test : un bouton déclencheur et un panneau */
const layer = (open: Ref<boolean>, onDismiss: (reason: DismissReason) => void, options: Record<string, unknown> = {}) => {
  const Layer = defineComponent({
    setup() {
      const trigger = ref<HTMLElement>()
      const panel = ref<HTMLElement>()
      useDismiss([trigger, panel], { enabled: open, onDismiss, ...options })
      return () => h('div', [
        h('button', { ref: trigger, class: 'trigger' }, 'Ouvrir'),
        h('div', { ref: panel, class: 'panel' }, [h('button', { class: 'inside' }, 'Dedans')])
      ])
    }
  })
  const wrapper = mount(Layer, { attachTo: document.body })
  wrappers.push(wrapper)
  return wrapper
}

const escape = (target: EventTarget = document.body) => {
  const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })
  target.dispatchEvent(event)
  return event
}

const pointerDown = (target: EventTarget) =>
  target.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }))

describe('useDismiss', () => {
  it('ferme avec Échap et annule l’action par défaut (dialog parent)', () => {
    const onDismiss = vi.fn()
    layer(ref(true), onDismiss)

    const event = escape()
    expect(onDismiss).toHaveBeenCalledWith('escape', expect.any(Event))
    expect(event.defaultPrevented).toBe(true)
  })

  it('ne réagit pas quand la couche est fermée', () => {
    const onDismiss = vi.fn()
    layer(ref(false), onDismiss)

    escape()
    expect(onDismiss).not.toHaveBeenCalled()
  })

  it('ferme à l’appui extérieur, pas sur le déclencheur ni dans le panneau', () => {
    const onDismiss = vi.fn()
    const wrapper = layer(ref(true), onDismiss)

    pointerDown(wrapper.find('.trigger').element)
    pointerDown(wrapper.find('.inside').element)
    expect(onDismiss).not.toHaveBeenCalled()

    pointerDown(document.body)
    expect(onDismiss).toHaveBeenCalledWith('outside', expect.any(Event))
  })

  it('Échap ne ferme que la couche du dessus', async () => {
    const outerDismiss = vi.fn()
    const innerDismiss = vi.fn()
    const innerOpen = ref(false)
    layer(ref(true), outerDismiss)
    layer(innerOpen, innerDismiss)

    innerOpen.value = true
    await nextTick()
    escape()
    expect(innerDismiss).toHaveBeenCalledTimes(1)
    expect(outerDismiss).not.toHaveBeenCalled()
  })

  it('un appui dans une couche ouverte au-dessus ne ferme pas celle du dessous', async () => {
    const outerDismiss = vi.fn()
    const innerDismiss = vi.fn()
    const innerOpen = ref(false)
    layer(ref(true), outerDismiss)
    const inner = layer(innerOpen, innerDismiss)
    innerOpen.value = true
    await nextTick()

    // Le panneau interne est hors du DOM de la couche externe (comme téléporté)
    pointerDown(inner.find('.inside').element)
    expect(outerDismiss).not.toHaveBeenCalled()
    expect(innerDismiss).not.toHaveBeenCalled()

    pointerDown(document.body)
    expect(innerDismiss).toHaveBeenCalledTimes(1)
    expect(outerDismiss).toHaveBeenCalledTimes(1)
  })

  it('options escape / outside désactivables', () => {
    const onDismiss = vi.fn()
    layer(ref(true), onDismiss, { escape: false, outside: () => false })

    escape()
    pointerDown(document.body)
    expect(onDismiss).not.toHaveBeenCalled()
  })

  it('ferme quand le focus quitte les éléments (focusOutside)', () => {
    const onDismiss = vi.fn()
    const wrapper = layer(ref(true), onDismiss, { focusOutside: true })
    const outside = document.createElement('button')
    document.body.appendChild(outside)

    ;(wrapper.find('.inside').element as HTMLElement).focus()
    expect(onDismiss).not.toHaveBeenCalled()
    outside.focus()
    expect(onDismiss).toHaveBeenCalledWith('focus-outside', expect.any(Event))
  })
})
