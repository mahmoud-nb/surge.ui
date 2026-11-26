import { afterEach, describe, expect, it } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import Slider from '@/components/atoms/Slider.vue'
import Toaster from '@/components/organisms/Toaster.vue'
import FloatButton from '@/components/molecules/FloatButton.vue'

let wrapper: VueWrapper | undefined
afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  document.body.innerHTML = ''
})

// Curseur dans un conteneur RTL ; la valeur est relue après chaque action
const mountSlider = (dir: 'ltr' | 'rtl') => {
  const Host = defineComponent({
    data: () => ({ value: 50 }),
    render() {
      return h('div', { dir, style: `direction: ${dir}` }, [
        h(Slider, { modelValue: this.value, 'onUpdate:modelValue': (v: number) => (this.value = v), min: 0, max: 100, step: 10 })
      ])
    }
  })
  wrapper = mount(Host, { attachTo: document.body })
  return wrapper
}

const value = () => (wrapper!.vm as unknown as { value: number }).value

describe('SuSlider en RTL', () => {
  it('LTR : flèche droite augmente la valeur', async () => {
    mountSlider('ltr')
    await wrapper!.find('[role="slider"]').trigger('keydown', { key: 'ArrowRight' })
    expect(value()).toBe(60)
  })

  it('RTL : flèche droite diminue la valeur, flèche gauche l’augmente', async () => {
    mountSlider('rtl')
    const thumb = wrapper!.find('[role="slider"]')
    await thumb.trigger('keydown', { key: 'ArrowRight' })
    expect(value()).toBe(40)
    await thumb.trigger('keydown', { key: 'ArrowLeft' })
    await thumb.trigger('keydown', { key: 'ArrowLeft' })
    expect(value()).toBe(60)
  })

  it('RTL : un clic près du bord droit donne une petite valeur', async () => {
    mountSlider('rtl')
    const track = wrapper!.find('.su-slider-track')
    track.element.getBoundingClientRect = () =>
      ({ left: 0, right: 200, top: 0, bottom: 10, width: 200, height: 10, x: 0, y: 0, toJSON: () => ({}) }) as DOMRect
    await wrapper!.find('.su-slider-slider').trigger('click', { clientX: 180, clientY: 5 })
    expect(value()).toBe(10)
  })

  it('positionne la poignée en début de ligne (inset-inline-start)', () => {
    mountSlider('rtl')
    const style = wrapper!.find('[role="slider"]').attributes('style')
    expect(style).toContain('inset-inline-start: 50%')
  })
})

describe('Positions logiques', () => {
  it('SuToaster : right est un alias de end (ancienne classe conservée)', () => {
    wrapper = mount(Toaster, { props: { position: 'bottom-right' } })
    expect(wrapper.classes()).toContain('su-toaster--bottom-end')
    expect(wrapper.classes()).toContain('su-toaster--bottom-right')
  })

  it('SuFloatButton : placé en fin de ligne par défaut', () => {
    wrapper = mount(FloatButton, { props: { label: 'Aide' }, attachTo: document.body })
    const container = document.querySelector('.su-float-button-container') as HTMLElement
    expect(container.classList.contains('su-float-button-container--end')).toBe(true)
    expect(container.getAttribute('style')).toContain('inset-inline-end')
  })
})
