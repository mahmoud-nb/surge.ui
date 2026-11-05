import { afterEach, describe, expect, it } from 'vitest'
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils'
import TreeView from '@/components/molecules/TreeView.vue'

let wrapper: VueWrapper | undefined

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  document.body.innerHTML = ''
})

const items = [
  {
    id: 'src',
    label: 'src',
    children: [
      { id: 'components', label: 'components', children: [{ id: 'button', label: 'Button.vue' }] },
      { id: 'index', label: 'index.ts' }
    ]
  },
  { id: 'docs', label: 'docs' },
  { id: 'readme', label: 'README.md' }
]

const mountTree = (props: Record<string, unknown> = {}) => {
  wrapper = mount(TreeView, {
    props: {
      items,
      ariaLabel: 'Fichiers',
      expanded: [],
      selected: null,
      'onUpdate:expanded': (value: unknown) => wrapper?.setProps({ expanded: value }),
      'onUpdate:selected': (value: unknown) => wrapper?.setProps({ selected: value }),
      ...props
    },
    attachTo: document.body
  })
  return wrapper
}

const item = (id: string) => wrapper!.find(`[data-tree-id="${id}"]`)
const tree = () => wrapper!.find('[role="tree"]')
const focusedId = () => (document.activeElement as HTMLElement | null)?.dataset.treeId

const press = async (key: string) => {
  await tree().trigger('keydown', { key })
  await flushPromises()
}

describe('SuTreeView', () => {
  it('expose les rôles, niveaux et positions', () => {
    mountTree({ expanded: ['src'] })
    expect(tree().attributes('aria-label')).toBe('Fichiers')
    const src = item('src')
    expect(src.attributes('role')).toBe('treeitem')
    expect(src.attributes('aria-expanded')).toBe('true')
    expect(src.attributes('aria-level')).toBe('1')
    expect(src.attributes('aria-posinset')).toBe('1')
    expect(src.attributes('aria-setsize')).toBe('3')
    expect(item('index').attributes('aria-level')).toBe('2')
    expect(item('readme').attributes('aria-expanded')).toBeUndefined()
    expect(wrapper!.find('[role="group"]').exists()).toBe(true)
    // Nom : le libellé seul, pas le texte des enfants
    expect(document.getElementById(src.attributes('aria-labelledby')!)?.textContent).toBe('src')
  })

  it('n’a qu’un arrêt de tabulation', () => {
    mountTree({ expanded: ['src'] })
    expect(wrapper!.findAll('[tabindex="0"]')).toHaveLength(1)
    expect(item('src').attributes('tabindex')).toBe('0')
  })

  it('déplie, entre dans les enfants et remonte au parent', async () => {
    mountTree()
    ;(item('src').element as HTMLElement).focus()

    await press('ArrowRight')
    expect(wrapper!.props('expanded')).toEqual(['src'])
    await press('ArrowRight')
    expect(focusedId()).toBe('components')
    await press('ArrowDown')
    expect(focusedId()).toBe('index')
    await press('ArrowLeft')
    expect(focusedId()).toBe('src')
    await press('ArrowLeft')
    expect(wrapper!.props('expanded')).toEqual([])
  })

  it('va au début, à la fin et par saisie rapide', async () => {
    mountTree()
    ;(item('src').element as HTMLElement).focus()
    await press('End')
    expect(focusedId()).toBe('readme')
    await press('Home')
    expect(focusedId()).toBe('src')
    await press('d')
    expect(focusedId()).toBe('docs')
  })

  it('choisit avec Entrée et au clic', async () => {
    mountTree()
    ;(item('docs').element as HTMLElement).focus()
    await press('Enter')
    expect(wrapper!.props('selected')).toBe('docs')
    expect(item('docs').attributes('aria-selected')).toBe('true')

    await item('readme').find('.su-tree__row').trigger('click')
    expect(wrapper!.props('selected')).toBe('readme')
    expect(wrapper!.emitted('select')).toHaveLength(2)
  })

  it('* déplie tous les frères', async () => {
    mountTree({ items: [items[0], { id: 'lib', label: 'lib', children: [{ id: 'a', label: 'a' }] }] })
    ;(item('src').element as HTMLElement).focus()
    await press('*')
    expect(wrapper!.props('expanded')).toEqual(['src', 'lib'])
  })

  it('sans sélection : pas d’aria-selected, Entrée déplie', async () => {
    mountTree({ selectable: false })
    expect(item('src').attributes('aria-selected')).toBeUndefined()
    ;(item('src').element as HTMLElement).focus()
    await press('Enter')
    expect(wrapper!.props('expanded')).toEqual(['src'])
  })
})
