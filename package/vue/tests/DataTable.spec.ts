import { afterEach, describe, expect, it } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import DataTable from '@/components/organisms/DataTable.vue'
import { clearAnnouncements } from '@/composables/useAnnouncer'

let wrapper: VueWrapper | undefined

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  clearAnnouncements()
  document.body.innerHTML = ''
})

const columns = [
  { key: 'name', label: 'Nom', sortable: true },
  { key: 'city', label: 'Ville', sortable: true },
  { key: 'orders', label: 'Commandes', sortable: true, align: 'end' as const }
]

const rows = [
  { id: 1, name: 'Émile', city: 'Lyon', orders: 12 },
  { id: 2, name: 'adèle', city: '', orders: 3 },
  { id: 3, name: 'Bruno', city: 'Paris', orders: 120 },
  { id: 4, name: 'Chloé', city: 'Nantes', orders: 20 }
]

const mountTable = (props: Record<string, unknown> = {}) => {
  wrapper = mount(DataTable, {
    props: {
      columns,
      rows,
      caption: 'Clients',
      sort: null,
      'onUpdate:sort': (value: unknown) => wrapper?.setProps({ sort: value }),
      'onUpdate:page': (value: number) => wrapper?.setProps({ page: value }),
      'onUpdate:selected': (value: unknown) => wrapper?.setProps({ selected: value }),
      ...props
    },
    attachTo: document.body
  })
  return wrapper
}

const names = () => wrapper!.findAll('tbody tr').map((row) => row.find('th').text())
const header = (label: string) => wrapper!.findAll('thead th').find((th) => th.text().includes(label))!

describe('SuDataTable', () => {
  it('rend un vrai tableau titré avec en-têtes de colonnes et de lignes', () => {
    mountTable()
    expect(wrapper!.find('caption').text()).toBe('Clients')
    expect(wrapper!.findAll('thead th').every((th) => th.attributes('scope') === 'col')).toBe(true)
    expect(wrapper!.find('tbody th').attributes('scope')).toBe('row')
    const region = wrapper!.find('[role="region"]')
    expect(region.attributes('tabindex')).toBe('0')
    expect(document.getElementById(region.attributes('aria-labelledby')!)?.textContent?.trim()).toBe('Clients')
  })

  it('trie par ordre alphabétique (accents, casse) puis inverse, puis retire le tri', async () => {
    mountTable()
    await header('Nom').find('button').trigger('click')
    expect(names()).toEqual(['adèle', 'Bruno', 'Chloé', 'Émile'])
    expect(header('Nom').attributes('aria-sort')).toBe('ascending')

    await header('Nom').find('button').trigger('click')
    expect(names()).toEqual(['Émile', 'Chloé', 'Bruno', 'adèle'])
    expect(header('Nom').attributes('aria-sort')).toBe('descending')

    await header('Nom').find('button').trigger('click')
    expect(names()).toEqual(['Émile', 'adèle', 'Bruno', 'Chloé'])
    expect(header('Nom').attributes('aria-sort')).toBeUndefined()
  })

  it('trie les nombres numériquement et garde les cellules vides à la fin', async () => {
    mountTable()
    await header('Commandes').find('button').trigger('click')
    expect(names()).toEqual(['adèle', 'Émile', 'Chloé', 'Bruno'])

    await header('Ville').find('button').trigger('click')
    expect(names().at(-1)).toBe('adèle')
    await header('Ville').find('button').trigger('click')
    expect(names().at(-1)).toBe('adèle')
  })

  it('annonce le tri', async () => {
    mountTable()
    await header('Ville').find('button').trigger('click')
    await new Promise((resolve) => setTimeout(resolve, 250))
    expect(document.querySelector('[data-su-announcer="polite"]')?.textContent).toBe('Trié par Ville, ordre croissant')
  })

  it('sélectionne des lignes nommées et toutes les lignes affichées', async () => {
    mountTable({ selectable: true, selected: [] })
    const rowBoxes = wrapper!.findAll('tbody input[type="checkbox"]')
    expect(rowBoxes[0].attributes('aria-label')).toBe('Sélectionner Émile')

    await rowBoxes[1].setValue(true)
    expect(wrapper!.props('selected')).toEqual([2])
    const all = wrapper!.find('thead input[type="checkbox"]')
    expect((all.element as HTMLInputElement).indeterminate).toBe(true)

    await all.setValue(true)
    expect(wrapper!.props('selected')).toEqual([2, 1, 3, 4])
    await all.setValue(false)
    expect(wrapper!.props('selected')).toEqual([])
  })

  it('pagine localement', async () => {
    mountTable({ pageSize: 3, page: 1 })
    expect(names()).toEqual(['Émile', 'adèle', 'Bruno'])
    await wrapper!.find('[aria-label="Page 2"]').trigger('click')
    expect(names()).toEqual(['Chloé'])
  })

  it('en mode manual, n’applique ni tri ni découpage', async () => {
    mountTable({ manual: true, pageSize: 2, total: 40, page: 1 })
    expect(names()).toHaveLength(4)
    expect(wrapper!.find('[aria-label="Page 20"]').exists()).toBe(true)
    await header('Nom').find('button').trigger('click')
    expect(wrapper!.props('sort')).toEqual({ key: 'name', direction: 'asc' })
    expect(names()[0]).toBe('Émile')
  })

  it('affiche l’état vide et le chargement', async () => {
    mountTable({ rows: [] })
    expect(wrapper!.find('.su-data-table__empty').text()).toBe('Aucune donnée')

    await wrapper!.setProps({ loading: true })
    expect(wrapper!.find('table').attributes('aria-busy')).toBe('true')
    expect(wrapper!.findAll('.su-skeleton').length).toBeGreaterThan(0)
  })

  it('formate les cellules et accepte un slot par colonne', () => {
    wrapper = mount(DataTable, {
      props: { columns: [{ key: 'name', label: 'Nom' }, { key: 'orders', label: 'Commandes', format: (value: number) => `${value} cmd` }], rows },
      slots: { 'cell-name': '<template #cell-name="{ value }"><strong>{{ value }}</strong></template>' }
    })
    expect(wrapper.find('tbody strong').text()).toBe('Émile')
    expect(wrapper.find('tbody td').text()).toBe('12 cmd')
  })
})
