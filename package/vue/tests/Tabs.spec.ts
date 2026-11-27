import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import { flushPromises, mount, type VueWrapper } from '@vue/test-utils'
import Tabs from '@/components/organisms/Tabs.vue'

let wrapper: VueWrapper | undefined
afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  document.body.innerHTML = ''
  window.history.replaceState(null, '', '/')
})

const selected = () => wrapper!.findAll('[role="tab"]').map((tab) => tab.attributes('aria-selected'))

describe('SuTabs — onglets par identifiant', () => {
  const tabs = [
    { label: 'Profil', value: 'profil' },
    { label: 'Sécurité', value: 'securite' },
    { label: 'Factures', value: 'factures' }
  ]

  it('le v-model porte la value de l’onglet', async () => {
    wrapper = mount(Tabs, { props: { tabs, modelValue: 'securite' } })
    expect(selected()).toEqual(['false', 'true', 'false'])

    await wrapper.findAll('[role="tab"]')[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['factures'])

    await wrapper.setProps({ modelValue: 'profil' })
    expect(selected()).toEqual(['true', 'false', 'false'])
  })

  it('panneau unique : le slot par défaut est le contenu de l’onglet actif', async () => {
    wrapper = mount(Tabs, {
      props: { tabs, modelValue: 'profil' },
      slots: { default: ({ value }: { value: string }) => h('p', `Contenu ${value}`) }
    })
    const panels = wrapper.findAll('[role="tabpanel"]')
    expect(panels).toHaveLength(1)
    expect(panels[0].text()).toBe('Contenu profil')

    const tabEls = wrapper.findAll('[role="tab"]')
    expect(tabEls[0].attributes('aria-controls')).toBe(panels[0].attributes('id'))
    expect(tabEls[1].attributes('aria-controls')).toBeUndefined()
    expect(panels[0].attributes('aria-labelledby')).toBe(tabEls[0].attributes('id'))

    await wrapper.setProps({ modelValue: 'factures' })
    expect(wrapper.find('[role="tabpanel"]').text()).toBe('Contenu factures')
  })
})

describe('SuTabs — navigation', () => {
  const navTabs = [
    { label: 'Profil', to: '/compte/profil' },
    { label: 'Sécurité', to: '/compte/securite' }
  ]

  it('sans routeur : une <nav> de liens, l’onglet du chemin courant en aria-current', async () => {
    window.history.replaceState(null, '', '/compte/securite')
    wrapper = mount(Tabs, { props: { tabs: navTabs, label: 'Compte' }, attachTo: document.body })
    await flushPromises()

    expect(wrapper.find('nav').attributes('aria-label')).toBe('Compte')
    expect(wrapper.find('[role="tablist"]').exists()).toBe(false)
    const links = wrapper.findAll('nav a')
    expect(links.map((link) => link.attributes('href'))).toEqual(['/compte/profil', '/compte/securite'])
    expect(links.map((link) => link.attributes('aria-current'))).toEqual([undefined, 'page'])
    expect(links[1].classes()).toContain('su-tab--active')
  })

  it('avec RouterLink : l’onglet actif suit la route', async () => {
    // Doublure de RouterLink : aria-current="page" sur la route exacte
    const route = ref('/compte/profil')
    const RouterLink = defineComponent({
      props: { to: { type: String, required: true } },
      setup(props, { slots }) {
        return () => h('a', { href: props.to, 'aria-current': route.value === props.to ? 'page' : null }, slots.default?.())
      }
    })

    wrapper = mount(Tabs, { props: { tabs: navTabs }, global: { components: { RouterLink } }, attachTo: document.body })
    await flushPromises()
    const active = () => wrapper!.findAll('nav a').map((link) => link.classes().includes('su-tab--active'))
    expect(active()).toEqual([true, false])

    route.value = '/compte/securite'
    await flushPromises()
    expect(active()).toEqual([false, true])
  })

  it('le contenu libre (RouterView) s’affiche sous la navigation', () => {
    wrapper = mount(Tabs, { props: { tabs: navTabs }, slots: { default: '<p>Page</p>' } })
    expect(wrapper.find('.su-tabs-content').text()).toBe('Page')
    expect(wrapper.find('[role="tabpanel"]').exists()).toBe(false)
  })
})

describe('SuTabs — sans contenu', () => {
  it('aucun panneau vide ni aria-controls quand les onglets n’ont pas de contenu', () => {
    wrapper = mount(Tabs, { props: { tabs: [{ label: 'Tous' }, { label: 'Actifs' }, { label: 'Archivés' }] } })
    expect(wrapper.findAll('[role="tabpanel"]')).toHaveLength(0)
    expect(wrapper.findAll('[role="tab"]').map((tab) => tab.attributes('aria-controls'))).toEqual([undefined, undefined, undefined])
  })

  it('un panneau par onglet dès qu’un onglet a un contenu ou avec le slot panel', () => {
    wrapper = mount(Tabs, { props: { tabs: [{ label: 'A', content: 'Texte A' }, { label: 'B' }] } })
    expect(wrapper.findAll('[role="tabpanel"]')).toHaveLength(2)
    wrapper.unmount()

    wrapper = mount(Tabs, {
      props: { tabs: [{ label: 'A' }, { label: 'B' }] },
      slots: { panel: '<template #panel="{ tab }"><p>{{ tab.label }}</p></template>' }
    })
    const panels = wrapper.findAll('[role="tabpanel"]')
    expect(panels).toHaveLength(2)
    expect(wrapper.find('[role="tab"]').attributes('aria-controls')).toBe(panels[0].attributes('id'))
  })
})
