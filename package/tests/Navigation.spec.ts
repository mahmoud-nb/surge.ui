import { afterEach, describe, expect, it } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import Breadcrumb from '@/components/molecules/Breadcrumb.vue'
import Pagination from '@/components/molecules/Pagination.vue'
import Skeleton from '@/components/atoms/Skeleton.vue'
import { getPaginationItems } from '@/utils/pagination'

let wrapper: VueWrapper | undefined

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  document.body.innerHTML = ''
})

const items = [
  { label: 'Accueil', href: '/' },
  { label: 'Projets', href: '/projets' },
  { label: 'SurgeUI', href: '/projets/surgeui' },
  { label: 'Composants', href: '/projets/surgeui/composants' },
  { label: 'Pagination' }
]

describe('SuBreadcrumb', () => {
  it('rend une navigation nommée avec la page courante', () => {
    wrapper = mount(Breadcrumb, { props: { items } })
    expect(wrapper.find('nav').attributes('aria-label')).toBe('Fil d\'Ariane')
    expect(wrapper.findAll('li')).toHaveLength(5)
    const current = wrapper.find('[aria-current="page"]')
    expect(current.text()).toBe('Pagination')
    expect(current.element.tagName).toBe('SPAN')
    expect(wrapper.findAll('.su-breadcrumb__separator').every((separator) => separator.attributes('aria-hidden') === 'true')).toBe(true)
  })

  it('replie le milieu du chemin et le déplie au clic', async () => {
    wrapper = mount(Breadcrumb, { props: { items, maxItems: 3 }, attachTo: document.body })
    expect(wrapper.findAll('.su-breadcrumb__link').map((link) => link.text())).toEqual(['Accueil', 'Composants', 'Pagination'])

    const ellipsis = wrapper.find('.su-breadcrumb__ellipsis')
    expect(ellipsis.attributes('aria-label')).toBe('Afficher le chemin complet')
    await ellipsis.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.findAll('.su-breadcrumb__link')).toHaveLength(5)
    expect(document.activeElement?.textContent?.trim()).toBe('Projets')
  })
})

describe('getPaginationItems', () => {
  it('affiche toutes les pages quand il y en a peu', () => {
    expect(getPaginationItems({ page: 1, count: 7 })).toEqual([1, 2, 3, 4, 5, 6, 7])
  })

  it('garde une largeur constante avec des ellipses', () => {
    expect(getPaginationItems({ page: 1, count: 10 })).toEqual([1, 2, 3, 4, 5, 'ellipsis-end', 10])
    expect(getPaginationItems({ page: 5, count: 10 })).toEqual([1, 'ellipsis-start', 4, 5, 6, 'ellipsis-end', 10])
    expect(getPaginationItems({ page: 10, count: 10 })).toEqual([1, 'ellipsis-start', 6, 7, 8, 9, 10])
  })

  it('respecte siblings et boundaries', () => {
    expect(getPaginationItems({ page: 10, count: 20, siblings: 2, boundaries: 2 }))
      .toEqual([1, 2, 'ellipsis-start', 8, 9, 10, 11, 12, 'ellipsis-end', 19, 20])
    expect(getPaginationItems({ page: 0, count: 0 })).toEqual([])
  })
})

describe('SuPagination', () => {
  const mountPagination = (props: Record<string, unknown> = {}) => {
    wrapper = mount(Pagination, {
      props: {
        total: 95,
        modelValue: 1,
        'onUpdate:modelValue': (value: number) => wrapper?.setProps({ modelValue: value }),
        ...props
      }
    })
    return wrapper
  }

  it('calcule le nombre de pages et marque la page courante', () => {
    mountPagination({ modelValue: 3 })
    const current = wrapper!.find('[aria-current="page"]')
    expect(current.text()).toBe('3')
    expect(current.attributes('aria-label')).toBe('Page 3')
    expect(wrapper!.find('[aria-label="Page 10"]').exists()).toBe(true)
    expect(wrapper!.find('[aria-label="Page 11"]').exists()).toBe(false)
  })

  it('change de page et émet change', async () => {
    mountPagination()
    await wrapper!.find('[aria-label="Page suivante"]').trigger('click')
    expect(wrapper!.props('modelValue')).toBe(2)
    expect(wrapper!.emitted('change')?.[0]).toEqual([2])
  })

  it('laisse les boutons d’extrémité focusables mais inactifs', async () => {
    mountPagination({ showEdges: true })
    const previous = wrapper!.find('[aria-label="Page précédente"]')
    expect(previous.attributes('aria-disabled')).toBe('true')
    expect(previous.attributes('disabled')).toBeUndefined()
    await previous.trigger('click')
    expect(wrapper!.emitted('change')).toBeUndefined()

    await wrapper!.find('[aria-label="Dernière page"]').trigger('click')
    expect(wrapper!.props('modelValue')).toBe(10)
    expect(wrapper!.find('[aria-label="Page suivante"]').attributes('aria-disabled')).toBe('true')
  })

  it('masque les ellipses aux lecteurs d’écran', () => {
    mountPagination({ modelValue: 5 })
    const ellipses = wrapper!.findAll('.su-pagination__ellipsis')
    expect(ellipses).toHaveLength(2)
    expect(ellipses.every((ellipsis) => ellipsis.attributes('aria-hidden') === 'true')).toBe(true)
  })
})

describe('SuSkeleton', () => {
  it('est décoratif et rend plusieurs lignes', () => {
    wrapper = mount(Skeleton, { props: { lines: 3 } })
    expect(wrapper.attributes('aria-hidden')).toBe('true')
    expect(wrapper.findAll('.su-skeleton__line')).toHaveLength(3)
  })

  it('donne au cercle une hauteur égale à sa largeur', () => {
    wrapper = mount(Skeleton, { props: { variant: 'circle', width: '3rem' } })
    expect(wrapper.attributes('style')).toContain('width: 3rem')
    expect(wrapper.attributes('style')).toContain('height: 3rem')
  })
})
