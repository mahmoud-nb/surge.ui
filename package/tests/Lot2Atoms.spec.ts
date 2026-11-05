import { afterEach, describe, expect, it } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import Divider from '@/components/atoms/Divider.vue'
import Kbd from '@/components/atoms/Kbd.vue'
import VisuallyHidden from '@/components/atoms/VisuallyHidden.vue'
import Tag from '@/components/atoms/Tag.vue'
import EmptyState from '@/components/molecules/EmptyState.vue'

let wrapper: VueWrapper | undefined

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
})

describe('SuDivider', () => {
  it('est un séparateur, orienté en vertical', () => {
    wrapper = mount(Divider)
    expect(wrapper.attributes('role')).toBe('separator')
    expect(wrapper.attributes('aria-orientation')).toBeUndefined()

    wrapper.unmount()
    wrapper = mount(Divider, { props: { orientation: 'vertical' } })
    expect(wrapper.attributes('aria-orientation')).toBe('vertical')
  })

  it('laisse lire son texte et masque ses traits', () => {
    wrapper = mount(Divider, { props: { label: 'ou' } })
    expect(wrapper.attributes('role')).toBeUndefined()
    expect(wrapper.text()).toBe('ou')
    expect(wrapper.findAll('.su-divider__line').every((line) => line.attributes('aria-hidden') === 'true')).toBe(true)
  })

  it('peut être purement décoratif', () => {
    wrapper = mount(Divider, { props: { decorative: true } })
    expect(wrapper.attributes('role')).toBeUndefined()
    expect(wrapper.attributes('aria-hidden')).toBe('true')
  })
})

describe('SuKbd', () => {
  it('imbrique les touches d’un raccourci', () => {
    wrapper = mount(Kbd, { props: { keys: ['Ctrl', 'K'] } })
    expect(wrapper.element.tagName).toBe('KBD')
    expect(wrapper.findAll('kbd.su-kbd__key').map((key) => key.text())).toEqual(['Ctrl', 'K'])
    expect(wrapper.text()).toBe('Ctrl+K')
  })

  it('affiche une touche seule depuis le slot', () => {
    wrapper = mount(Kbd, { slots: { default: 'Échap' } })
    expect(wrapper.find('.su-kbd__key').exists()).toBe(false)
    expect(wrapper.text()).toBe('Échap')
  })
})

describe('SuVisuallyHidden', () => {
  it('rend l’élément demandé', () => {
    wrapper = mount(VisuallyHidden, { props: { as: 'a', focusable: true }, attrs: { href: '#main' }, slots: { default: 'Aller au contenu' } })
    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.classes()).toContain('su-visually-hidden--focusable')
  })
})

describe('SuTag', () => {
  it('nomme le bouton de retrait avec le libellé et émet remove', async () => {
    wrapper = mount(Tag, { props: { label: 'Vue', removable: true } })
    const button = wrapper.find('.su-tag__remove')
    expect(button.attributes('aria-label')).toBe('Retirer Vue')
    await button.trigger('click')
    expect(wrapper.emitted('remove')).toHaveLength(1)
  })

  it('lit le libellé dans le slot', async () => {
    wrapper = mount(Tag, { props: { removable: true }, slots: { default: 'TypeScript' } })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.su-tag__remove').attributes('aria-label')).toBe('Retirer TypeScript')
  })

  it('n’émet rien quand il est désactivé', async () => {
    wrapper = mount(Tag, { props: { label: 'Vue', removable: true, disabled: true } })
    await wrapper.find('.su-tag__remove').trigger('click')
    expect(wrapper.emitted('remove')).toBeUndefined()
  })
})

describe('SuEmptyState', () => {
  it('rend un vrai titre du niveau demandé et les actions', () => {
    wrapper = mount(EmptyState, {
      props: { title: 'Aucun projet', description: 'Créez votre premier projet.', headingLevel: 2 },
      slots: { default: '<button>Créer</button>' }
    })
    expect(wrapper.find('h2').text()).toBe('Aucun projet')
    expect(wrapper.find('.su-empty-state__actions button').exists()).toBe(true)
  })
})
