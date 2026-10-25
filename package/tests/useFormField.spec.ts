import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import FormField from '@/components/atoms/FormField.vue'
import Input from '@/components/atoms/Input.vue'
import SelectBox from '@/components/atoms/SelectBox.vue'
import RadioGroup from '@/components/atoms/RadioGroup.vue'
import Switch from '@/components/atoms/Switch.vue'
import { mergeIds, useFormField } from '@/composables/useFormField'

let wrapper: VueWrapper | undefined

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
})

// Un atome placé directement dans le slot de SuFormField, sans slotProps
const inField = (control: unknown, fieldProps: Record<string, unknown> = {}, controlProps: Record<string, unknown> = {}) =>
  mount(FormField, {
    props: { label: 'Libellé', message: 'Aide', ...fieldProps },
    slots: { default: () => h(control as never, controlProps) },
    attachTo: document.body
  })

describe('mergeIds', () => {
  it('joint les ids sans doublons ni vides', () => {
    expect(mergeIds('a', undefined, 'b a', '', null, 'c')).toBe('a b c')
    expect(mergeIds(undefined, '')).toBeUndefined()
  })
})

describe('useFormField dans SuFormField', () => {
  it('relie un SuInput au label et au message sans slotProps', () => {
    wrapper = inField(Input)

    const input = wrapper.find('input')
    const label = wrapper.find('label')
    expect(label.attributes('for')).toBe(input.attributes('id'))
    expect(wrapper.find(`[id="${input.attributes('aria-describedby')}"]`).text()).toBe('Aide')
  })

  it('hérite des états du champ : erreur, requis, désactivé', () => {
    wrapper = inField(Input, { state: 'error', required: true, disabled: true })

    const input = wrapper.find('input')
    expect(input.attributes('aria-invalid')).toBe('true')
    expect(input.attributes('aria-required')).toBe('true')
    expect(input.attributes('disabled')).toBeDefined()
    expect(wrapper.find('.su-input').classes()).toContain('su-input--error')
  })

  it('une valeur explicite du contrôle reste prioritaire', () => {
    wrapper = inField(Input, { state: 'error', size: 'lg' }, { state: 'success', size: 'sm' })

    const container = wrapper.find('.su-input')
    expect(container.classes()).toContain('su-input--success')
    expect(container.classes()).toContain('su-input--sm')
  })

  it('ajoute le message au aria-describedby du contrôle sans doublon', () => {
    wrapper = inField(Input, {}, { ariaDescribedBy: 'aide-externe' })

    const ids = wrapper.find('input').attributes('aria-describedby')?.split(' ')
    expect(ids).toContain('aide-externe')
    expect(ids?.filter((id) => id.endsWith('-message'))).toHaveLength(1)
  })

  it('nomme une SelectBox (combobox non ciblable par for) via aria-labelledby', () => {
    wrapper = inField(SelectBox, {}, { options: [{ value: 'a', label: 'A' }] })

    const combobox = wrapper.find('[role="combobox"]')
    const label = wrapper.find('label')
    expect(combobox.attributes('aria-labelledby')).toBe(label.attributes('id'))
  })

  it('le clic sur le label donne le focus à la SelectBox', async () => {
    wrapper = inField(SelectBox, {}, { options: [{ value: 'a', label: 'A' }] })

    await wrapper.find('label').trigger('click')
    expect(document.activeElement).toBe(wrapper.find('[role="combobox"]').element)
  })

  it('nomme un groupe de boutons radio par le label du champ', () => {
    wrapper = inField(RadioGroup, {}, { options: [{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }] })

    const group = wrapper.find('[role="radiogroup"]')
    expect(group.attributes('aria-labelledby')).toBe(wrapper.find('label').attributes('id'))
  })

  it('le label cible directement un SuSwitch (bouton)', () => {
    wrapper = inField(Switch)

    expect(wrapper.find('label').attributes('for')).toBe(wrapper.find('[role="switch"]').attributes('id'))
  })
})

describe('useFormField hors SuFormField', () => {
  it('ne génère pas d’id sans préfixe, et garde les props', () => {
    wrapper = mount(Input, { props: { state: 'error' } })

    const input = wrapper.find('input')
    expect(input.attributes('id')).toBeUndefined()
    expect(input.attributes('aria-invalid')).toBe('true')
  })

  it('sert aussi à un contrôle maison', () => {
    const Custom = defineComponent({
      props: {
        state: { type: String, default: 'default' },
        size: { type: String, default: 'md' },
        disabled: Boolean,
        required: Boolean
      },
      setup(props) {
        const { id, describedBy, required } = useFormField(props as never, { idPrefix: 'custom' })
        return () => h('input', {
          id: id.value,
          'aria-describedby': describedBy.value,
          'aria-required': required.value ? 'true' : undefined
        })
      }
    })
    wrapper = inField(Custom, { required: true })

    const input = wrapper.find('input')
    expect(wrapper.find('label').attributes('for')).toBe(input.attributes('id'))
    expect(input.attributes('aria-required')).toBe('true')
    expect(input.attributes('aria-describedby')).toMatch(/-message$/)
  })
})
