import { afterEach, describe, expect, it } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import GridLayout from '@/components/templates/GridLayout.vue'

// Les colonnes dépendent de container queries (non évaluées ici) :
// on teste la structure, la sémantique et les valeurs calculées.

let wrapper: VueWrapper | undefined

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
})

const toggleButtons = (w: VueWrapper) => w.findAll('.su-grid-layout__view-option')

describe('SuGridLayout', () => {
  it('complète les colonnes par largeur (mobile first)', () => {
    wrapper = mount(GridLayout, { props: { columns: { base: 2, lg: 4 } } })

    const style = wrapper.attributes('style')
    expect(style).toContain('--su-grid-layout-columns-base: 2')
    expect(style).toContain('--su-grid-layout-columns-md: 2')
    expect(style).toContain('--su-grid-layout-columns-lg: 4')
    expect(style).toContain('--su-grid-layout-columns-xl: 4')
  })

  it('accepte un nombre fixe de colonnes', () => {
    wrapper = mount(GridLayout, { props: { columns: 3 } })

    expect(wrapper.attributes('style')).toContain('--su-grid-layout-columns-sm: 3')
  })

  it('minItemWidth remplace les colonnes (auto-fill)', () => {
    wrapper = mount(GridLayout, { props: { minItemWidth: '14rem' } })

    expect(wrapper.classes()).toContain('su-grid-layout--fluid')
    expect(wrapper.attributes('style')).toContain('--su-grid-layout-min-item-width: 14rem')
    expect(wrapper.attributes('style')).not.toContain('--su-grid-layout-columns-base')
  })

  it('pose les modificateurs d’écart, d’alignement et d’affichage', () => {
    wrapper = mount(GridLayout, { props: { gap: 'lg', align: 'start' } })

    expect(wrapper.classes()).toEqual(expect.arrayContaining([
      'su-grid-layout--grid',
      'su-grid-layout--gap-lg',
      'su-grid-layout--align-start'
    ]))
  })

  it('sans sélecteur ni en-tête : seules les cellules sont rendues', () => {
    wrapper = mount(GridLayout, { slots: { default: '<div>A</div><div>B</div>' } })

    expect(wrapper.find('.su-grid-layout__header').exists()).toBe(false)
    expect(wrapper.findAll('.su-grid-layout__items > *')).toHaveLength(2)
  })

  it('le sélecteur est un groupe nommé de boutons bascule, libellés en français', () => {
    wrapper = mount(GridLayout, { props: { viewToggle: true } })

    const group = wrapper.find('[role="group"]')
    expect(group.attributes('aria-label')).toBe('Affichage')

    const [grid, list] = toggleButtons(wrapper)
    expect(grid.text()).toBe('Grille')
    expect(grid.attributes('type')).toBe('button')
    expect(grid.attributes('aria-pressed')).toBe('true')
    expect(list.text()).toBe('Liste')
    expect(list.attributes('aria-pressed')).toBe('false')
  })

  it('les libellés du sélecteur sont personnalisables', () => {
    wrapper = mount(GridLayout, {
      props: { viewToggle: true, viewToggleLabel: 'Display', gridLabel: 'Grid', listLabel: 'List' }
    })

    expect(wrapper.find('[role="group"]').attributes('aria-label')).toBe('Display')
    expect(toggleButtons(wrapper).map(b => b.text())).toEqual(['Grid', 'List'])
  })

  it('bascule en liste au clic et émet update:view', async () => {
    wrapper = mount(GridLayout, { props: { viewToggle: true } })

    await toggleButtons(wrapper)[1].trigger('click')

    expect(wrapper.emitted('update:view')).toEqual([['list']])
    expect(wrapper.classes()).toContain('su-grid-layout--list')
    expect(toggleButtons(wrapper)[1].attributes('aria-pressed')).toBe('true')
  })

  it('suit l’affichage contrôlé par v-model:view', async () => {
    wrapper = mount(GridLayout, {
      props: {
        view: 'list',
        viewToggle: true,
        'onUpdate:view': (value: 'grid' | 'list') => wrapper?.setProps({ view: value })
      }
    })
    expect(wrapper.classes()).toContain('su-grid-layout--list')

    await toggleButtons(wrapper)[0].trigger('click')
    expect(wrapper.props('view')).toBe('grid')
    expect(wrapper.classes()).toContain('su-grid-layout--grid')
  })

  it('transmet l’affichage aux cellules par le slot', () => {
    wrapper = mount(GridLayout, {
      props: { view: 'list' },
      slots: { default: '<template #default="{ view }"><span>{{ view }}</span></template>' }
    })

    expect(wrapper.find('.su-grid-layout__items span').text()).toBe('list')
  })

  it('rend une liste avec itemsTag="ul"', () => {
    wrapper = mount(GridLayout, {
      props: { itemsTag: 'ul' },
      slots: { default: '<li>A</li><li>B</li>' }
    })

    const items = wrapper.find('.su-grid-layout__items')
    expect(items.element.tagName).toBe('UL')
    expect(items.attributes('role')).toBe('list')
    expect(items.findAll('li')).toHaveLength(2)
  })

  it('l’en-tête accueille le slot header à côté du sélecteur', () => {
    wrapper = mount(GridLayout, {
      props: { viewToggle: true },
      slots: { header: '<h2>Produits</h2>' }
    })

    const header = wrapper.find('.su-grid-layout__header')
    expect(header.find('h2').text()).toBe('Produits')
    expect(header.find('[role="group"]').exists()).toBe(true)
  })
})
