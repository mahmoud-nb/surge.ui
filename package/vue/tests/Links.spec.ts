import { afterEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import { flushPromises, mount, type VueWrapper } from '@vue/test-utils'
import SurgeUI from '@/index'
import Button from '@/components/atoms/Button.vue'
import Link from '@/components/atoms/Link.vue'
import Breadcrumb from '@/components/molecules/Breadcrumb.vue'
import Dropdown from '@/components/molecules/Dropdown.vue'
import CommandPalette from '@/components/organisms/CommandPalette.vue'

// Doublures de RouterLink et NuxtLink : un <a> marqué, avec `to` en prop
const fakeLink = (marker: string) =>
  defineComponent({
    props: { to: { type: [String, Object], required: true } },
    setup(props, { slots }) {
      return () => h('a', { href: typeof props.to === 'string' ? props.to : '#', [marker]: '' }, slots.default?.())
    }
  })
const RouterLink = fakeLink('data-router-link')
const NuxtLink = fakeLink('data-nuxt-link')

let wrapper: VueWrapper | undefined
afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  document.body.innerHTML = ''
})

describe('SuButton avec to ou href', () => {
  it('sans routeur, `to` donne un <a href> stylé en bouton', () => {
    wrapper = mount(Button, { props: { to: '/projets' }, slots: { default: 'Projets' } })
    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe('/projets')
    expect(wrapper.classes()).toContain('su-button')
    expect(wrapper.attributes('type')).toBeUndefined()
  })

  it('rend RouterLink quand il est enregistré', () => {
    wrapper = mount(Button, { props: { to: { name: 'projets' } }, global: { components: { RouterLink } } })
    expect(wrapper.findComponent(RouterLink).props('to')).toEqual({ name: 'projets' })
  })

  it('préfère le linkComponent du plugin à RouterLink', () => {
    wrapper = mount(Button, {
      props: { to: '/projets' },
      global: { plugins: [[SurgeUI, { linkComponent: NuxtLink }]], components: { RouterLink } }
    })
    expect(wrapper.find('[data-nuxt-link]').exists()).toBe(true)
    expect(wrapper.find('[data-router-link]').exists()).toBe(false)
  })

  it('désactivé, le lien perd sa destination', () => {
    wrapper = mount(Button, { props: { to: '/projets', disabled: true }, global: { components: { RouterLink } } })
    expect(wrapper.findComponent(RouterLink).exists()).toBe(false)
    expect(wrapper.attributes('href')).toBeUndefined()
    expect(wrapper.attributes('role')).toBe('link')
    expect(wrapper.attributes('aria-disabled')).toBe('true')
  })

  it('href externe : rel noopener noreferrer avec target _blank', () => {
    wrapper = mount(Button, { props: { href: 'https://example.com', target: '_blank' } })
    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('rel')).toBe('noopener noreferrer')
  })

  it('sans to ni href, reste un <button type="button">', () => {
    wrapper = mount(Button)
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.attributes('type')).toBe('button')
  })
})

describe('SuLink avec to', () => {
  it('sans routeur, `to` donne un <a href> (plus de balise router-link inconnue)', () => {
    wrapper = mount(Link, { props: { to: '/aide' }, slots: { default: 'Aide' } })
    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe('/aide')
  })

  it('désactivé, un lien du routeur ne navigue pas', () => {
    wrapper = mount(Link, { props: { to: '/aide', disabled: true }, global: { components: { RouterLink } } })
    expect(wrapper.findComponent(RouterLink).exists()).toBe(false)
    expect(wrapper.attributes('href')).toBeUndefined()
  })
})

describe('SuBreadcrumb avec to', () => {
  it('rend les maillons `to` avec RouterLink, le dernier en aria-current', () => {
    wrapper = mount(Breadcrumb, {
      props: { items: [{ label: 'Accueil', to: '/' }, { label: 'Projets', to: '/projets' }, { label: 'Operia' }] },
      global: { components: { RouterLink } }
    })
    const links = wrapper.findAllComponents(RouterLink)
    expect(links.map((link) => link.props('to'))).toEqual(['/', '/projets'])
    expect(wrapper.find('[aria-current="page"]').text()).toBe('Operia')
  })
})

describe('SuDropdown avec to', () => {
  it('rend une option `to` avec RouterLink ; désactivée, un bouton', async () => {
    wrapper = mount(Dropdown, {
      props: {
        label: 'Compte',
        options: [
          { value: 'profil', label: 'Profil', to: '/profil' },
          { value: 'factures', label: 'Factures', to: '/factures', disabled: true },
          { value: 'quitter', label: 'Quitter' }
        ]
      },
      global: { components: { RouterLink } },
      attachTo: document.body
    })
    await wrapper.find('.su-dropdown-trigger').trigger('click')

    const items = wrapper.findAll('[role="menuitem"]')
    expect(items[0].attributes('data-router-link')).toBe('')
    expect(items[1].element.tagName).toBe('BUTTON')
    expect(items[1].attributes('type')).toBe('button')
    expect(items[2].attributes('type')).toBe('button')
  })
})

describe('SuCommandPalette avec to', () => {
  const commands = [{ id: 'projets', label: 'Projets', to: '/projets' }]

  it('navigue avec le routeur à la sélection', async () => {
    const push = vi.fn()
    wrapper = mount(CommandPalette, {
      props: { commands, open: true, teleport: false },
      global: { config: { globalProperties: { $router: { push } } } },
      attachTo: document.body
    })
    await flushPromises()
    await wrapper.find('input').trigger('keydown', { key: 'Enter' })
    await flushPromises()
    expect(push).toHaveBeenCalledWith('/projets')
  })

  it('sans routeur, change de page', async () => {
    const assign = vi.fn()
    vi.stubGlobal('location', { ...window.location, assign })
    wrapper = mount(CommandPalette, { props: { commands, open: true, teleport: false }, attachTo: document.body })
    await flushPromises()
    await wrapper.find('input').trigger('keydown', { key: 'Enter' })
    await flushPromises()
    expect(assign).toHaveBeenCalledWith('/projets')
    vi.unstubAllGlobals()
  })
})
