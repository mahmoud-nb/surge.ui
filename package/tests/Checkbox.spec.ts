import { afterEach, describe, expect, it } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import { h } from 'vue'
import Checkbox from '@/components/atoms/Checkbox.vue'
import FormField from '@/components/atoms/FormField.vue'

let wrapper: VueWrapper | undefined

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
})

const mountCheckbox = (props: Record<string, unknown> = {}) => {
  wrapper = mount(Checkbox, {
    props: {
      label: 'Accepter les conditions',
      modelValue: false,
      'onUpdate:modelValue': (value: boolean) => wrapper?.setProps({ modelValue: value }),
      'onUpdate:indeterminate': (value: boolean) => wrapper?.setProps({ indeterminate: value }),
      ...props
    },
    attachTo: document.body
  })
  return wrapper
}

const input = () => wrapper!.find('input').element as HTMLInputElement

describe('SuCheckbox', () => {
  it('rend un input natif nommé par son libellé', () => {
    mountCheckbox()
    const label = wrapper!.find('label')
    expect(label.find('input[type="checkbox"]').exists()).toBe(true)
    expect(label.text()).toContain('Accepter les conditions')
  })

  it('coche et décoche avec v-model', async () => {
    mountCheckbox()
    await wrapper!.find('input').setValue(true)
    expect(wrapper!.props('modelValue')).toBe(true)
    expect(wrapper!.emitted('change')?.[0]).toEqual([true])
    expect(wrapper!.find('.su-checkbox__mark').exists()).toBe(true)
  })

  it('pose l’état mixte sur l’input et le lève au clic', async () => {
    mountCheckbox({ indeterminate: true })
    expect(input().indeterminate).toBe(true)
    expect(wrapper!.find('.su-checkbox__dash').exists()).toBe(true)

    await wrapper!.find('input').setValue(true)
    expect(wrapper!.props('indeterminate')).toBe(false)
    expect(wrapper!.props('modelValue')).toBe(true)
    expect(input().indeterminate).toBe(false)
  })

  it('relie la description par aria-describedby', () => {
    mountCheckbox({ description: 'Obligatoire pour continuer' })
    const describedBy = input().getAttribute('aria-describedby')
    expect(describedBy).toBeTruthy()
    expect(document.getElementById(describedBy!)?.textContent).toContain('Obligatoire pour continuer')
  })

  it('hérite de l’état et du message du SuFormField', () => {
    wrapper = mount(FormField, {
      props: { label: 'Conditions', message: 'Case requise', state: 'error', required: true },
      slots: { default: () => h(Checkbox, { label: 'J’accepte' }) },
      attachTo: document.body
    })
    const field = wrapper.find('input')
    expect(field.attributes('aria-invalid')).toBe('true')
    expect(field.attributes('required')).toBeDefined()
    expect(wrapper.find(`label[for="${field.attributes('id')}"]`).exists()).toBe(true)
    const message = document.getElementById(field.attributes('aria-describedby')!.split(' ')[0])
    expect(message?.textContent).toContain('Case requise')
  })

  it('ne change pas quand il est désactivé', () => {
    mountCheckbox({ disabled: true })
    expect(input().disabled).toBe(true)
    expect(wrapper!.classes()).toContain('su-checkbox--disabled')
  })
})
