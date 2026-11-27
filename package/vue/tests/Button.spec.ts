import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '@/components/atoms/Button.vue'

describe('SuButton', () => {
  it('est de type "button" par défaut pour ne pas soumettre un formulaire', () => {
    const wrapper = mount(Button, { slots: { default: 'Valider' } })
    expect(wrapper.attributes('type')).toBe('button')
  })

  it('accepte type="submit"', () => {
    const wrapper = mount(Button, { props: { type: 'submit' } })
    expect(wrapper.attributes('type')).toBe('submit')
  })

  it("n'émet pas click quand il est désactivé ou en chargement", async () => {
    const disabled = mount(Button, { props: { disabled: true } })
    await disabled.trigger('click')
    expect(disabled.emitted('click')).toBeUndefined()

    const loading = mount(Button, { props: { loading: true } })
    await loading.trigger('click')
    expect(loading.emitted('click')).toBeUndefined()
    expect(loading.attributes('aria-busy')).toBe('true')
  })

  it('garde le contenu pendant le chargement (largeur stable)', () => {
    const wrapper = mount(Button, { props: { loading: true }, slots: { default: 'Envoyer' } })
    expect(wrapper.find('.su-button__content').text()).toBe('Envoyer')
    expect(wrapper.find('.su-button__spinner').exists()).toBe(true)
  })
})
