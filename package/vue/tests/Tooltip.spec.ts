import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import Tooltip from '@/components/molecules/Tooltip.vue'

let wrapper: VueWrapper | undefined

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  vi.useRealTimers()
  document.body.innerHTML = ''
})

const mountTooltip = (props: Record<string, unknown> = {}) => {
  wrapper = mount(Tooltip, {
    props: {
      content: 'Copier le lien',
      modelValue: false,
      'onUpdate:modelValue': (value: boolean) => wrapper?.setProps({ modelValue: value }),
      ...props
    },
    slots: { default: '<button type="button" aria-describedby="hint">Copier</button><span id="hint">Raccourci Ctrl+C</span>' },
    attachTo: document.body
  })
  return wrapper
}

const pointer = (type: string) => new PointerEvent(type, { pointerType: 'mouse', bubbles: type !== 'pointerenter' && type !== 'pointerleave' })

describe('SuTooltip', () => {
  it('décrit le déclencheur par aria-describedby, en gardant ses ids', () => {
    mountTooltip()
    const tooltip = wrapper!.find('[role="tooltip"]')
    const describedBy = wrapper!.find('button').attributes('aria-describedby')!.split(' ')
    expect(describedBy).toContain('hint')
    expect(describedBy).toContain(tooltip.attributes('id'))
    expect(tooltip.text()).toBe('Copier le lien')
  })

  it('s’ouvre au survol après le délai et se ferme en sortant', async () => {
    mountTooltip({ openDelay: 300, closeDelay: 100 })
    const root = wrapper!.find('.su-tooltip').element

    root.dispatchEvent(pointer('pointerenter'))
    vi.advanceTimersByTime(299)
    await nextTick()
    expect(wrapper!.props('modelValue')).toBe(false)
    vi.advanceTimersByTime(1)
    await nextTick()
    expect(wrapper!.props('modelValue')).toBe(true)

    root.dispatchEvent(pointer('pointerleave'))
    vi.advanceTimersByTime(100)
    await nextTick()
    expect(wrapper!.props('modelValue')).toBe(false)
  })

  it('ignore le toucher', () => {
    mountTooltip({ openDelay: 0 })
    wrapper!.find('.su-tooltip').element.dispatchEvent(new PointerEvent('pointerenter', { pointerType: 'touch' }))
    vi.runAllTimers()
    expect(wrapper!.props('modelValue')).toBe(false)
  })

  it('se ferme avec Échap', async () => {
    mountTooltip({ modelValue: true })
    await nextTick()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await nextTick()
    expect(wrapper!.props('modelValue')).toBe(false)
  })

  it('reste fermé quand il est désactivé ou vide', () => {
    mountTooltip({ disabled: true, openDelay: 0 })
    wrapper!.find('.su-tooltip').element.dispatchEvent(pointer('pointerenter'))
    vi.runAllTimers()
    expect(wrapper!.props('modelValue')).toBe(false)
  })

  it('retire son id du déclencheur au démontage', () => {
    mountTooltip()
    const button = wrapper!.find('button').element
    wrapper!.unmount()
    wrapper = undefined
    expect(button.getAttribute('aria-describedby')).toBe('hint')
  })
})
