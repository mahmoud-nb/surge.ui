import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import InputField from '@/components/molecules/InputField.vue'
import SwitchField from '@/components/molecules/SwitchField.vue'
import CheckboxGroupField from '@/components/molecules/CheckboxGroupField.vue'

// Les champs « Field » enveloppent un atome dans FormField : on vérifie que
// v-model traverse bien l'enveloppe et que label et message sont reliés.

describe('SuInputField', () => {
  it('propage la saisie via v-model', async () => {
    const wrapper = mount(InputField, {
      props: {
        label: 'Nom',
        modelValue: 'Ada',
        'onUpdate:modelValue': (value: string | number) => wrapper.setProps({ modelValue: value })
      }
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('Ada')

    await input.setValue('Grace')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['Grace'])
    expect(wrapper.props('modelValue')).toBe('Grace')
  })

  it('relie le label et le message au champ', () => {
    const wrapper = mount(InputField, {
      props: { label: 'E-mail', message: 'Adresse professionnelle' }
    })

    const input = wrapper.find('input')
    const label = wrapper.find('label')
    expect(label.attributes('for')).toBe(input.attributes('id'))

    const describedBy = input.attributes('aria-describedby') ?? ''
    const message = wrapper.find(`[id="${describedBy}"]`)
    expect(message.exists()).toBe(true)
    expect(message.text()).toContain('Adresse professionnelle')
  })
})

describe('SuSwitchField', () => {
  it('bascule au clic et expose aria-checked', async () => {
    const wrapper = mount(SwitchField, {
      props: {
        label: 'Notifications',
        modelValue: false,
        'onUpdate:modelValue': (value: boolean) => wrapper.setProps({ modelValue: value })
      }
    })

    const control = wrapper.find('[role="switch"]')
    expect(control.attributes('aria-checked')).toBe('false')

    await control.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([true])
    expect(control.attributes('aria-checked')).toBe('true')
  })

  it('reste inchangé quand il est désactivé', async () => {
    const wrapper = mount(SwitchField, { props: { label: 'Wi-Fi', disabled: true } })

    await wrapper.find('[role="switch"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('est nommé par son label', () => {
    const wrapper = mount(SwitchField, { props: { label: 'Mode sombre' } })

    const control = wrapper.find('[role="switch"]')
    expect(wrapper.find('label').attributes('for')).toBe(control.attributes('id'))
  })
})

describe('SuCheckboxGroupField', () => {
  const options = [
    { value: 'vue', label: 'Vue' },
    { value: 'react', label: 'React' },
    { value: 'svelte', label: 'Svelte', disabled: true }
  ]

  it('ajoute et retire des valeurs via v-model', async () => {
    const wrapper = mount(CheckboxGroupField, {
      props: {
        label: 'Frameworks',
        options,
        modelValue: ['vue'],
        'onUpdate:modelValue': (value: (string | number)[]) => wrapper.setProps({ modelValue: value })
      }
    })

    const inputs = wrapper.findAll('input[type="checkbox"]')
    expect((inputs[0].element as HTMLInputElement).checked).toBe(true)

    await inputs[1].setValue(true)
    expect(wrapper.props('modelValue')).toEqual(['vue', 'react'])

    await inputs[0].setValue(false)
    expect(wrapper.props('modelValue')).toEqual(['react'])
  })

  it('désactive les options marquées disabled', () => {
    const wrapper = mount(CheckboxGroupField, { props: { label: 'Frameworks', options } })

    const inputs = wrapper.findAll('input[type="checkbox"]')
    expect(inputs[2].attributes('disabled')).toBeDefined()
  })
})
