import { afterEach, describe, expect, it } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import Stepper from '@/components/molecules/Stepper.vue'

let wrapper: VueWrapper | undefined

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
})

const steps = [
  { label: 'Panier' },
  { label: 'Livraison' },
  { label: 'Paiement' },
  { label: 'Confirmation' }
]

const mountStepper = (props: Record<string, unknown> = {}) => {
  wrapper = mount(Stepper, {
    props: {
      steps,
      modelValue: 2,
      'onUpdate:modelValue': (value: number) => wrapper?.setProps({ modelValue: value }),
      ...props
    }
  })
  return wrapper
}

describe('SuStepper', () => {
  it('rend une liste ordonnée nommée avec l’étape courante', () => {
    mountStepper()
    expect(wrapper!.find('ol').attributes('aria-label')).toBe('Étapes')
    const items = wrapper!.findAll('li')
    expect(items).toHaveLength(4)
    expect(items[2].attributes('aria-current')).toBe('step')
    expect(items[0].classes()).toContain('su-stepper__step--complete')
    expect(items[3].classes()).toContain('su-stepper__step--upcoming')
  })

  it('lit le statut des étapes terminées ou en erreur', () => {
    mountStepper({ steps: [{ label: 'Panier' }, { label: 'Livraison', error: true }, ...steps.slice(2)] })
    const labels = wrapper!.findAll('.su-stepper__label').map((label) => label.text())
    expect(labels[0]).toBe('Panier, terminée')
    expect(labels[1]).toBe('Livraison, à corriger')
    expect(labels[3]).toBe('Confirmation')
  })

  it('sans clickable, aucune étape n’est un bouton', () => {
    mountStepper()
    expect(wrapper!.find('button').exists()).toBe(false)
  })

  it('avec clickable, revient aux étapes franchies seulement', async () => {
    mountStepper({ clickable: true })
    const buttons = wrapper!.findAll('button')
    expect(buttons).toHaveLength(2)
    await buttons[0].trigger('click')
    expect(wrapper!.props('modelValue')).toBe(0)
    expect(wrapper!.emitted('change')?.[0]).toEqual([0])
  })

  it('non linéaire : les étapes suivantes sont aussi cliquables', () => {
    mountStepper({ clickable: true, linear: false })
    expect(wrapper!.findAll('button')).toHaveLength(3)
  })
})
