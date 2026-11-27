import { afterEach, describe, expect, it } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import NumberInput from '@/components/atoms/NumberInput.vue'
import NumberInputField from '@/components/molecules/NumberInputField.vue'

let wrapper: VueWrapper | undefined

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  document.body.innerHTML = ''
})

const mountNumber = (props: Record<string, unknown> = {}) => {
  wrapper = mount(NumberInput, {
    props: {
      modelValue: null,
      'onUpdate:modelValue': (value: number | null) => wrapper?.setProps({ modelValue: value }),
      ariaLabel: 'Quantité',
      ...props
    },
    attachTo: document.body
  })
  return wrapper
}

const input = () => wrapper!.find('input')
// Espaces insécables (séparateurs français) ramenés à des espaces simples
const plain = (text: string) => text.replace(/[\u00a0\u202f]/g, ' ')

describe('SuNumberInput', () => {
  it('est un spinbutton avec ses bornes', () => {
    mountNumber({ modelValue: 5, min: 0, max: 10 })
    expect(input().attributes('role')).toBe('spinbutton')
    expect(input().attributes('aria-valuenow')).toBe('5')
    expect(input().attributes('aria-valuemin')).toBe('0')
    expect(input().attributes('aria-valuemax')).toBe('10')
  })

  it('lit la saisie au format français à la sortie du champ', async () => {
    mountNumber()
    await input().trigger('focus')
    await input().setValue('1 234,5')
    await input().trigger('blur')
    expect(wrapper!.props('modelValue')).toBe(1234.5)
    expect(wrapper!.emitted('change')?.[0]).toEqual([1234.5])
    expect(plain((input().element as HTMLInputElement).value)).toBe('1 234,5')
  })

  it('rend la valeur précédente quand la saisie est illisible', async () => {
    mountNumber({ modelValue: 3 })
    await input().trigger('focus')
    await input().setValue('abc')
    await input().trigger('blur')
    expect(wrapper!.props('modelValue')).toBe(3)
    expect((input().element as HTMLInputElement).value).toBe('3')
  })

  it('borne et arrondit la valeur', async () => {
    mountNumber({ min: 0, max: 10, step: 0.5 })
    await input().trigger('focus')
    await input().setValue('12')
    await input().trigger('blur')
    expect(wrapper!.props('modelValue')).toBe(10)
  })

  it('suit les touches flèches, page et début / fin', async () => {
    mountNumber({ modelValue: 5, min: 0, max: 100, step: 2 })
    await input().trigger('focus')
    await input().trigger('keydown', { key: 'ArrowUp' })
    expect(wrapper!.props('modelValue')).toBe(7)
    await input().trigger('keydown', { key: 'ArrowDown' })
    expect(wrapper!.props('modelValue')).toBe(5)
    await input().trigger('keydown', { key: 'PageUp' })
    expect(wrapper!.props('modelValue')).toBe(25)
    await input().trigger('keydown', { key: 'End' })
    expect(wrapper!.props('modelValue')).toBe(100)
    await input().trigger('keydown', { key: 'Home' })
    expect(wrapper!.props('modelValue')).toBe(0)
  })

  it('évite les erreurs d’arrondi des décimales', async () => {
    mountNumber({ modelValue: 0.1, step: 0.2 })
    await input().trigger('keydown', { key: 'ArrowUp' })
    expect(wrapper!.props('modelValue')).toBe(0.3)
  })

  it('affiche le format demandé hors du champ et le lit dans aria-valuetext', () => {
    mountNumber({ modelValue: 12.5, formatOptions: { style: 'currency', currency: 'EUR' } })
    expect(plain((input().element as HTMLInputElement).value)).toBe('12,50 €')
    expect(plain(input().attributes('aria-valuetext')!)).toBe('12,50 €')
  })

  it('garde les boutons hors tabulation et les désactive aux bornes', async () => {
    mountNumber({ modelValue: 10, max: 10 })
    const [decrement, increment] = wrapper!.findAll('button')
    expect(decrement.attributes('tabindex')).toBe('-1')
    expect(decrement.attributes('aria-label')).toBe('Diminuer')
    expect(increment.attributes('aria-disabled')).toBe('true')

    // Activation sans pointeur (curseur virtuel) : click avec detail = 0
    decrement.element.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 0 }))
    await wrapper!.vm.$nextTick()
    expect(wrapper!.props('modelValue')).toBe(9)
  })

  it('ne change pas en lecture seule', async () => {
    mountNumber({ modelValue: 1, readonly: true })
    await input().trigger('keydown', { key: 'ArrowUp' })
    expect(wrapper!.props('modelValue')).toBe(1)
  })
})

describe('SuNumberInputField', () => {
  it('relie le label et le message au champ', () => {
    wrapper = mount(NumberInputField, {
      props: { label: 'Quantité', message: 'Entre 1 et 10', min: 1, max: 10 },
      attachTo: document.body
    })
    const field = wrapper.find('input')
    expect(wrapper.find(`label[for="${field.attributes('id')}"]`).text()).toContain('Quantité')
    expect(document.getElementById(field.attributes('aria-describedby')!)?.textContent).toContain('Entre 1 et 10')
  })
})
