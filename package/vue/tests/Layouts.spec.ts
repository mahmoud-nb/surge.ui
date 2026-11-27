import { afterEach, describe, expect, it } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import HolyGrailLayout from '@/components/templates/HolyGrailLayout.vue'
import SidebarLayout from '@/components/templates/SidebarLayout.vue'
import SplitLayout from '@/components/templates/SplitLayout.vue'
import MasonryLayout from '@/components/templates/MasonryLayout.vue'
import HeroLayout from '@/components/templates/HeroLayout.vue'
import FullScreenLayout from '@/components/templates/FullScreenLayout.vue'

// Les colonnes dépendent de container queries (non évaluées ici) :
// on teste la structure, la sémantique et les valeurs calculées.

let wrapper: VueWrapper | undefined

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
})

describe('SuHolyGrailLayout', () => {
  const slots = {
    header: 'En-tête',
    nav: 'Menu',
    default: 'Contenu',
    aside: 'Complément',
    footer: 'Pied'
  }

  it('rend les régions sémantiques nommées', () => {
    wrapper = mount(HolyGrailLayout, { slots })

    expect(wrapper.find('header').text()).toBe('En-tête')
    expect(wrapper.find('nav').attributes('aria-label')).toBe('Navigation principale')
    expect(wrapper.find('main').text()).toBe('Contenu')
    expect(wrapper.find('aside').attributes('aria-label')).toBe('Informations complémentaires')
    expect(wrapper.find('footer').text()).toBe('Pied')
  })

  it('le lien d’évitement donne le focus au contenu principal', async () => {
    wrapper = mount(HolyGrailLayout, { slots, attachTo: document.body })

    const skip = wrapper.find('.su-holy-grail-layout__skip-link')
    const main = wrapper.find('main')
    expect(skip.attributes('href')).toBe(`#${main.attributes('id')}`)

    await skip.trigger('click')
    expect(document.activeElement).toBe(main.element)
  })

  it('sans landmarks : de simples div et pas de lien d’évitement', () => {
    wrapper = mount(HolyGrailLayout, { props: { landmarks: false }, slots })

    expect(wrapper.find('main').exists()).toBe(false)
    expect(wrapper.find('nav').exists()).toBe(false)
    expect(wrapper.find('.su-holy-grail-layout__skip-link').exists()).toBe(false)
  })

  it('signale les colonnes présentes pour adapter la grille', () => {
    wrapper = mount(HolyGrailLayout, { slots: { default: 'Contenu', nav: 'Menu' } })

    expect(wrapper.classes()).toContain('su-holy-grail-layout--has-nav')
    expect(wrapper.classes()).not.toContain('su-holy-grail-layout--has-aside')
  })
})

describe('SuSidebarLayout', () => {
  it('place la barre avant ou après le contenu dans le DOM selon sa position', () => {
    const slots = { sidebar: 'Barre', default: 'Contenu' }
    const zones = (w: VueWrapper) => w.findAll('.su-sidebar-layout__inner > *').map(z => z.text())

    wrapper = mount(SidebarLayout, { slots })
    expect(zones(wrapper)).toEqual(['Barre', 'Contenu'])
    wrapper.unmount()

    wrapper = mount(SidebarLayout, { props: { sidebarPosition: 'end' }, slots })
    expect(zones(wrapper)).toEqual(['Contenu', 'Barre'])
  })

  it('nomme la barre latérale et expose sa largeur', () => {
    wrapper = mount(SidebarLayout, {
      props: { sidebarTag: 'nav', sidebarLabel: 'Documentation', sidebarWidth: '20rem' },
      slots: { sidebar: 'Menu', default: 'Page' }
    })

    expect(wrapper.find('nav').attributes('aria-label')).toBe('Documentation')
    expect(wrapper.attributes('style')).toContain('--su-sidebar-layout-width: 20rem')
  })
})

describe('SuSplitLayout', () => {
  it('convertit le ratio en colonnes, inversées avec reverse', () => {
    wrapper = mount(SplitLayout, { props: { ratio: '2:1' } })
    expect(wrapper.attributes('style')).toContain('minmax(0, 2fr) minmax(0, 1fr)')

    wrapper.unmount()
    wrapper = mount(SplitLayout, { props: { ratio: '2:1', reverse: true } })
    expect(wrapper.attributes('style')).toContain('minmax(0, 1fr) minmax(0, 2fr)')
  })

  it('garde start avant end dans le DOM, même inversé', () => {
    wrapper = mount(SplitLayout, {
      props: { reverse: true },
      slots: { start: 'Visuel', end: 'Texte' }
    })

    expect(wrapper.findAll('.su-split-layout__pane').map(p => p.text())).toEqual(['Visuel', 'Texte'])
  })
})

describe('SuMasonryLayout', () => {
  it('complète les colonnes par largeur (mobile first)', () => {
    wrapper = mount(MasonryLayout, { props: { columns: { base: 1, md: 3 } } })

    const style = wrapper.attributes('style')
    expect(style).toContain('--su-masonry-columns-base: 1')
    expect(style).toContain('--su-masonry-columns-sm: 1')
    expect(style).toContain('--su-masonry-columns-md: 3')
    expect(style).toContain('--su-masonry-columns-xl: 3')
  })

  it('columnWidth remplace les colonnes fixes', () => {
    wrapper = mount(MasonryLayout, { props: { columnWidth: '14rem' } })

    expect(wrapper.classes()).toContain('su-masonry-layout--fluid')
    expect(wrapper.attributes('style')).toContain('--su-masonry-column-width: 14rem')
    expect(wrapper.attributes('style')).not.toContain('--su-masonry-columns-base')
  })
})

describe('SuHeroLayout', () => {
  it('nomme l’accroche par son titre', () => {
    wrapper = mount(HeroLayout, {
      props: { titleTag: 'h2' },
      slots: { title: 'Lancez votre produit', actions: '<button>Commencer</button>' }
    })

    const title = wrapper.find('h2')
    expect(title.text()).toBe('Lancez votre produit')
    expect(wrapper.find('section').attributes('aria-labelledby')).toBe(title.attributes('id'))
  })
})

describe('SuFullScreenLayout', () => {
  it('est une zone défilante focalisable, nommée si label est fourni', () => {
    wrapper = mount(FullScreenLayout, { props: { label: 'Présentation' } })

    expect(wrapper.attributes('tabindex')).toBe('0')
    expect(wrapper.attributes('role')).toBe('region')
    expect(wrapper.attributes('aria-label')).toBe('Présentation')
  })
})
