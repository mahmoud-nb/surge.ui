import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils'
import { defineComponent, h, ref } from 'vue'
import { HomeIcon, InboxIcon } from '@heroicons/vue/24/outline'
import SkipLink from '@/components/atoms/SkipLink.vue'
import ThemeToggle from '@/components/molecules/ThemeToggle.vue'
import PageHeader from '@/components/molecules/PageHeader.vue'
import NavMenu from '@/components/organisms/NavMenu.vue'
import AppShell from '@/components/templates/AppShell.vue'
import type { NavMenuEntry } from '@/types'
import { expectNoAxeViolations } from './axe'

// Structure d'application (4.0) : SkipLink, ThemeToggle, PageHeader,
// NavMenu, AppShell — comportement et audit axe-core

let wrapper: VueWrapper | undefined

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  document.body.innerHTML = ''
})

// Routeur minimal : route courante réactive et résolution des chemins
const createRouter = (path: string) => {
  const currentRoute = ref({ path })
  return {
    currentRoute,
    resolve: (to: string | { path: string }) => {
      const target = typeof to === 'string' ? to : to.path
      return { path: target, href: target }
    },
    push: (to: string) => {
      currentRoute.value = { path: to }
    }
  }
}

describe('SuSkipLink', () => {
  it('mène au contenu principal et lui donne le focus', async () => {
    const main = document.createElement('main')
    main.id = 'contenu'
    document.body.append(main)
    wrapper = mount(SkipLink, { props: { target: 'contenu' }, attachTo: document.body })

    const link = wrapper.find('a')
    expect(link.attributes('href')).toBe('#contenu')
    expect(link.text()).toBe('Aller au contenu principal')

    await link.trigger('click')
    expect(main.getAttribute('tabindex')).toBe('-1')
    expect(document.activeElement).toBe(main)
  })

  it('passe l’audit axe', async () => {
    wrapper = mount(SkipLink, { props: { label: 'Aller au tableau' }, attachTo: document.body })
    await expectNoAxeViolations()
  })
})

describe('SuThemeToggle', () => {
  it('bouton « Mode sombre » : aria-pressed suit le mode', async () => {
    wrapper = mount(ThemeToggle, { attachTo: document.body })
    await flushPromises()

    const button = wrapper.find('button')
    expect(button.attributes('aria-label')).toBe('Mode sombre')
    const before = button.attributes('aria-pressed')
    await button.trigger('click')
    expect(button.attributes('aria-pressed')).not.toBe(before)
    expect(wrapper.emitted('change')).toHaveLength(1)
    await expectNoAxeViolations()
  })

  it('variante segmentée : un groupe nommé de trois boutons', async () => {
    wrapper = mount(ThemeToggle, { props: { variant: 'segmented' }, attachTo: document.body })
    await flushPromises()

    const group = wrapper.find('[role="group"]')
    expect(group.attributes('aria-label')).toBe('Apparence')
    const buttons = wrapper.findAll('button')
    expect(buttons.map((button) => button.text())).toEqual(['Clair', 'Sombre', 'Système'])

    // L'état du thème est partagé par l'application : point de départ connu
    await buttons[0].trigger('click')
    expect(buttons.map((button) => button.attributes('aria-pressed'))).toEqual(['true', 'false', 'false'])

    await buttons[1].trigger('click')
    expect(buttons.map((button) => button.attributes('aria-pressed'))).toEqual(['false', 'true', 'false'])
    expect(wrapper.emitted('change')?.at(-1)).toEqual(['dark'])

    // Option déjà choisie : pas de nouvel événement
    const count = wrapper.emitted('change')!.length
    await buttons[1].trigger('click')
    expect(wrapper.emitted('change')).toHaveLength(count)

    await buttons[2].trigger('click')
    expect(buttons[2].attributes('aria-pressed')).toBe('true')
    await expectNoAxeViolations()
  })
})

describe('SuPageHeader', () => {
  it('titre h1, description, fil d’Ariane et actions', async () => {
    wrapper = mount(PageHeader, {
      props: {
        title: 'Projets',
        description: 'Tous les projets de l’équipe.',
        breadcrumb: [{ label: 'Accueil', href: '/' }, { label: 'Projets' }]
      },
      slots: { actions: '<button type="button">Nouveau projet</button>' },
      attachTo: document.body
    })

    expect(wrapper.find('h1').text()).toBe('Projets')
    expect(wrapper.find('.su-page-header__description').text()).toBe('Tous les projets de l’équipe.')
    expect(wrapper.find('nav').exists()).toBe(true)
    expect(wrapper.find('.su-page-header__actions button').text()).toBe('Nouveau projet')
    await expectNoAxeViolations()
  })

  it('niveau de titre et lien de retour', () => {
    wrapper = mount(PageHeader, { props: { title: 'Réglages', level: 2, back: '/projets' } })

    expect(wrapper.find('h2').text()).toBe('Réglages')
    const back = wrapper.find('.su-page-header__back')
    expect(back.attributes('href')).toBe('/projets')
    expect(back.text()).toBe('Retour')
  })
})

describe('SuNavMenu', () => {
  const items: NavMenuEntry[] = [
    { label: 'Tableau de bord', value: 'home', href: '/', icon: HomeIcon },
    { label: 'Messages', value: 'inbox', href: '/messages', icon: InboxIcon, badge: 3, badgeLabel: '3 messages non lus' },
    {
      type: 'group',
      label: 'Gestion',
      items: [
        {
          label: 'Projets',
          items: [
            { label: 'Actifs', value: 'active', href: '/projets/actifs' },
            { label: 'Archivés', value: 'archived', href: '/projets/archives' }
          ]
        },
        { label: 'Facturation', value: 'billing', href: '/facturation', disabled: true }
      ]
    }
  ]

  it('repère <nav> nommé, groupes titrés et compteurs lus', async () => {
    wrapper = mount(NavMenu, { props: { items }, attachTo: document.body })

    expect(wrapper.find('nav').attributes('aria-label')).toBe('Navigation principale')
    const groupList = wrapper.find('ul[aria-labelledby]')
    expect(wrapper.find(`#${groupList.attributes('aria-labelledby')}`).text()).toBe('Gestion')
    expect(wrapper.find('.sr-only').text()).toBe('3 messages non lus')
    await expectNoAxeViolations()
  })

  it('masque le compteur visuel (badgeLabel) sans avertissement Vue', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    wrapper = mount(NavMenu, { props: { items } })
    const badge = wrapper.find('.su-nav-menu__badge')
    expect(badge.attributes('aria-hidden')).toBe('true')
    expect(warn.mock.calls.filter(([message]) => String(message).includes('[Vue warn]'))).toEqual([])
    warn.mockRestore()
  })

  it('v-model : élément actif (aria-current) et parent déplié', async () => {
    wrapper = mount(NavMenu, {
      props: { items, modelValue: 'archived', 'onUpdate:modelValue': (value: string | number) => wrapper?.setProps({ modelValue: value }) }
    })

    const current = wrapper.find('[aria-current="page"]')
    expect(current.text()).toBe('Archivés')
    const parent = wrapper.find('.su-nav-menu__link--parent')
    expect(parent.attributes('aria-expanded')).toBe('true')

    await wrapper.findAll('a').find((link) => link.text().startsWith('Messages'))!.trigger('click')
    expect(wrapper.find('[aria-current="page"]').text()).toContain('Messages')
    expect(wrapper.emitted('select')?.[0][0]).toMatchObject({ value: 'inbox' })
  })

  it('déplie et replie les sous-éléments', async () => {
    wrapper = mount(NavMenu, { props: { items } })

    const parent = wrapper.find('.su-nav-menu__link--parent')
    const sublist = wrapper.find(`#${parent.attributes('aria-controls')}`)
    expect(parent.attributes('aria-expanded')).toBe('false')
    expect((sublist.element as HTMLElement).style.display).toBe('none')

    await parent.trigger('click')
    expect(parent.attributes('aria-expanded')).toBe('true')
    expect((sublist.element as HTMLElement).style.display).toBe('')
  })

  it('élément désactivé : pas de lien ni de sélection', async () => {
    wrapper = mount(NavMenu, { props: { items } })

    const disabled = wrapper.find('[aria-disabled="true"]')
    expect(disabled.text()).toBe('Facturation')
    expect(disabled.attributes('href')).toBeUndefined()
    await disabled.trigger('click')
    expect(wrapper.emitted('select')).toBeUndefined()
  })

  it('route courante : chemin exact, ou préfixe', async () => {
    const router = createRouter('/projets/actifs/42')
    const mountWith = (match: 'exact' | 'prefix') =>
      mount(NavMenu, {
        props: { items: [{ label: 'Projets', to: '/projets/actifs' }, { label: 'Accueil', to: '/' }], match },
        global: { config: { globalProperties: { $router: router } } }
      })

    wrapper = mountWith('exact')
    expect(wrapper.find('[aria-current="page"]').exists()).toBe(false)
    wrapper.unmount()

    wrapper = mountWith('prefix')
    expect(wrapper.find('[aria-current="page"]').text()).toBe('Projets')

    router.push('/')
    await flushPromises()
    expect(wrapper.find('[aria-current="page"]').text()).toBe('Accueil')
  })

  it('réduit : libellés toujours lus, un parent déplie le menu', async () => {
    wrapper = mount(NavMenu, {
      props: { items, collapsed: true, 'onUpdate:collapsed': (value: boolean) => wrapper?.setProps({ collapsed: value }) },
      attachTo: document.body
    })

    expect(wrapper.classes()).toContain('su-nav-menu--collapsed')
    expect(wrapper.find('a').text()).toBe('Tableau de bord')
    await expectNoAxeViolations()

    await wrapper.find('.su-nav-menu__link--parent').trigger('click')
    expect(wrapper.emitted('update:collapsed')?.[0]).toEqual([false])
    expect(wrapper.find('.su-nav-menu__link--parent').attributes('aria-expanded')).toBe('true')
  })
})

describe('SuAppShell', () => {
  const Shell = defineComponent({
    props: { collapsible: Boolean },
    setup(props) {
      const collapsed = ref(false)
      const open = ref(false)
      return () =>
        h(
          AppShell,
          {
            collapsible: props.collapsible,
            collapsed: collapsed.value,
            'onUpdate:collapsed': (value: boolean) => (collapsed.value = value),
            open: open.value,
            'onUpdate:open': (value: boolean) => (open.value = value)
          },
          {
            brand: () => h('strong', 'Surge'),
            header: () => h('button', { type: 'button' }, 'Compte'),
            sidebar: ({ collapsed: isCollapsed }: { collapsed: boolean }) =>
              h(NavMenu, { items: [{ label: 'Accueil', href: '#accueil', icon: HomeIcon }], collapsed: isCollapsed }),
            default: () => h('h1', 'Tableau de bord'),
            footer: () => 'Pied de page'
          }
        )
    }
  })

  it('repères, lien d’évitement et contenu principal', async () => {
    wrapper = mount(Shell, { attachTo: document.body })

    const main = wrapper.find('main')
    expect(wrapper.find('.su-skip-link').attributes('href')).toBe(`#${main.attributes('id')}`)
    expect(main.attributes('tabindex')).toBe('-1')
    expect(wrapper.find('header .su-app-shell__menu-button').attributes('aria-label')).toBe('Ouvrir le menu')
    expect(wrapper.find('footer').text()).toBe('Pied de page')
    expect(wrapper.find('.su-app-shell__sidebar nav').exists()).toBe(true)
    await expectNoAxeViolations()
  })

  it('ouvre la navigation dans un tiroir, fermé par un lien suivi', async () => {
    wrapper = mount(Shell, { attachTo: document.body })

    const menuButton = wrapper.find('.su-app-shell__menu-button')
    await menuButton.trigger('click')
    await flushPromises()

    const dialog = document.querySelector('dialog') as HTMLDialogElement
    expect(dialog.open).toBe(true)
    expect(dialog.getAttribute('aria-label')).toBe('Menu')
    expect(menuButton.attributes('aria-expanded')).toBe('true')

    dialog.querySelector<HTMLAnchorElement>('.su-app-shell__drawer-body a')!.click()
    await flushPromises()
    expect(menuButton.attributes('aria-expanded')).toBe('false')
  })

  it('réduit la barre latérale en icônes', async () => {
    wrapper = mount(Shell, { props: { collapsible: true }, attachTo: document.body })

    const collapse = wrapper.find('.su-app-shell__collapse')
    expect(collapse.attributes('aria-pressed')).toBe('false')
    await collapse.trigger('click')

    const shell = wrapper.find('.su-app-shell')
    expect(shell.classes()).toContain('su-app-shell--collapsed')
    expect((shell.element as HTMLElement).style.getPropertyValue('--su-app-shell-sidebar-width')).toBe('4.5rem')
    expect(collapse.attributes('aria-pressed')).toBe('true')
    expect(wrapper.find('.su-app-shell__sidebar .su-nav-menu').classes()).toContain('su-nav-menu--collapsed')
  })
})
