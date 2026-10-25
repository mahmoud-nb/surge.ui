import { afterEach, describe, expect, it } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import Tabs from '@/components/organisms/Tabs.vue'
import Accordion from '@/components/organisms/Accordion.vue'

let wrapper: VueWrapper | undefined

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
})

describe('SuTabs', () => {
  const tabs = [
    { label: 'Profil', content: 'Contenu profil' },
    { label: 'Sécurité', content: 'Contenu sécurité' },
    { label: 'Factures', content: 'Contenu factures' }
  ]

  it('relie onglets et panneaux (aria-controls / aria-labelledby)', () => {
    wrapper = mount(Tabs, { props: { tabs } })

    const tab = wrapper.findAll('[role="tab"]')[0]
    const panel = wrapper.find(`[id="${tab.attributes('aria-controls')}"]`)
    expect(panel.attributes('role')).toBe('tabpanel')
    expect(panel.attributes('aria-labelledby')).toBe(tab.attributes('id'))
  })

  it('ne laisse que l’onglet actif dans l’ordre de tabulation', () => {
    wrapper = mount(Tabs, { props: { tabs, modelValue: 1 } })

    const tabIndexes = wrapper.findAll('[role="tab"]').map(tab => tab.attributes('tabindex'))
    expect(tabIndexes).toEqual(['-1', '0', '-1'])
  })

  it('navigue avec les flèches, Début et Fin', async () => {
    wrapper = mount(Tabs, { props: { tabs }, attachTo: document.body })
    const list = wrapper.find('[role="tablist"]')
    const selected = () => wrapper!.findAll('[role="tab"]').map(tab => tab.attributes('aria-selected'))

    await list.trigger('keydown', { key: 'ArrowRight' })
    expect(selected()).toEqual(['false', 'true', 'false'])

    await list.trigger('keydown', { key: 'End' })
    expect(selected()).toEqual(['false', 'false', 'true'])

    // Boucle : après le dernier onglet, on revient au premier
    await list.trigger('keydown', { key: 'ArrowRight' })
    expect(selected()).toEqual(['true', 'false', 'false'])

    await list.trigger('keydown', { key: 'ArrowLeft' })
    expect(selected()).toEqual(['false', 'false', 'true'])
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([2])
  })
})

describe('SuAccordion', () => {
  const items = [
    { id: 'a', title: 'Livraison', content: 'Sous 48 h' },
    { id: 'b', title: 'Retours', content: '30 jours' },
    { id: 'c', title: 'Garantie', content: '2 ans', disabled: true }
  ]

  const headers = () => wrapper!.findAll('.su-accordion-item__header')

  it('relie chaque en-tête à son panneau', () => {
    wrapper = mount(Accordion, { props: { items } })

    const header = headers()[0]
    const panel = wrapper.find(`[id="${header.attributes('aria-controls')}"]`)
    expect(panel.attributes('role')).toBe('region')
    expect(panel.attributes('aria-labelledby')).toBe(header.attributes('id'))
  })

  it('n’ouvre qu’un élément à la fois en mode simple', async () => {
    wrapper = mount(Accordion, { props: { items } })

    await headers()[0].trigger('click')
    await headers()[1].trigger('click')

    expect(headers().map(h => h.attributes('aria-expanded'))).toEqual(['false', 'true', 'false'])
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([['b']])
  })

  it('garde plusieurs éléments ouverts en mode multiple', async () => {
    wrapper = mount(Accordion, { props: { items, multiple: true } })

    await headers()[0].trigger('click')
    await headers()[1].trigger('click')

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([['a', 'b']])
  })

  it('déplace le focus entre les en-têtes actifs avec les flèches', async () => {
    wrapper = mount(Accordion, { props: { items }, attachTo: document.body })

    const first = headers()[0]
    ;(first.element as HTMLElement).focus()
    await first.trigger('keydown', { key: 'ArrowDown' })
    expect(document.activeElement).toBe(headers()[1].element)

    // L'en-tête désactivé est sauté : on revient au premier
    await headers()[1].trigger('keydown', { key: 'ArrowDown' })
    expect(document.activeElement).toBe(first.element)
  })
})
