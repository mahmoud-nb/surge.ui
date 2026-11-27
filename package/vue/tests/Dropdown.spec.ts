import { afterEach, describe, expect, it } from 'vitest'
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils'
import Dropdown from '@/components/molecules/Dropdown.vue'
import Popover from '@/components/molecules/Popover.vue'
import { EllipsisHorizontalIcon } from '@heroicons/vue/24/outline'

let wrapper: VueWrapper | undefined

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  document.body.innerHTML = ''
})

const options = [
  { value: 'edit', label: 'Modifier' },
  { value: 'duplicate', label: 'Dupliquer' },
  { type: 'separator' as const },
  { value: 'archive', label: 'Archiver', disabled: true },
  { value: 'delete', label: 'Supprimer' }
]

const mountDropdown = () => {
  wrapper = mount(Dropdown, { props: { label: 'Actions', options }, attachTo: document.body })
  return wrapper
}

const trigger = () => wrapper!.find('.su-dropdown-trigger')
const items = () => wrapper!.findAll('[role="menuitem"]')
const focused = () => (document.activeElement as HTMLElement | null)?.textContent?.trim()
const keydown = async (key: string, target = document.activeElement as Element) => {
  target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }))
  await flushPromises()
}

describe('SuDropdown (bouton de menu)', () => {
  it('Flèche bas sur le bouton ouvre le menu sur le premier item', async () => {
    mountDropdown()
    ;(trigger().element as HTMLElement).focus()
    await keydown('ArrowDown')

    expect(trigger().attributes('aria-expanded')).toBe('true')
    expect(focused()).toBe('Modifier')
    expect(wrapper!.find('[role="menu"]').attributes('aria-labelledby')).toBe(trigger().attributes('id'))
  })

  it('Flèche haut ouvre le menu sur le dernier item', async () => {
    mountDropdown()
    ;(trigger().element as HTMLElement).focus()
    await keydown('ArrowUp')
    expect(focused()).toBe('Supprimer')
  })

  it('un seul item tabulable : tous ont tabindex=-1', async () => {
    mountDropdown()
    await trigger().trigger('click')
    await flushPromises()
    expect(items().map((item) => item.attributes('tabindex'))).toEqual(['-1', '-1', '-1', '-1'])
  })

  it('flèches en boucle, items désactivés sautés', async () => {
    mountDropdown()
    ;(trigger().element as HTMLElement).focus()
    await keydown('ArrowDown')
    await keydown('ArrowDown')
    expect(focused()).toBe('Dupliquer')
    await keydown('ArrowDown')
    expect(focused()).toBe('Supprimer')
    await keydown('ArrowDown')
    expect(focused()).toBe('Modifier')
  })

  it('saisie rapide par libellé', async () => {
    mountDropdown()
    ;(trigger().element as HTMLElement).focus()
    await keydown('ArrowDown')
    await keydown('s')
    expect(focused()).toBe('Supprimer')
  })

  it('Échap ferme et rend le focus au bouton', async () => {
    mountDropdown()
    ;(trigger().element as HTMLElement).focus()
    await keydown('ArrowDown')
    await keydown('Escape')

    expect(trigger().attributes('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(trigger().element)
  })

  it('choisir un item émet select, ferme et rend le focus', async () => {
    mountDropdown()
    await trigger().trigger('click')
    await flushPromises()
    await items()[1].trigger('click')

    expect(wrapper!.emitted('select')?.[0]).toEqual([options[1]])
    expect(trigger().attributes('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(trigger().element)
  })

  it('se ferme à l’appui extérieur', async () => {
    mountDropdown()
    await trigger().trigger('click')
    document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }))
    await flushPromises()
    expect(trigger().attributes('aria-expanded')).toBe('false')
  })
})

describe('SuPopover modal', () => {
  it('piège le focus, puis le rend au déclencheur avec Échap', async () => {
    wrapper = mount(Popover, {
      props: { modal: true },
      slots: {
        trigger: '<button type="button" class="open">Ouvrir</button>',
        default: '<button type="button" class="first">Premier</button><button type="button" class="last">Dernier</button>'
      },
      attachTo: document.body
    })

    const open = wrapper.find('.open').element as HTMLElement
    open.focus()
    await wrapper.find('.open').trigger('click')
    await flushPromises()
    expect(document.activeElement).toBe(wrapper.find('.first').element)

    // Tab depuis le dernier bouton : retour au premier élément du popover
    ;(wrapper.find('.last').element as HTMLElement).focus()
    await keydown('Tab')
    expect(document.activeElement?.closest('.su-popover__content')).not.toBeNull()

    await keydown('Escape')
    expect(document.activeElement).toBe(open)
  })
})

describe('SuDropdown — attributs et séparateurs', () => {
  it("pose id et data-* sur le déclencheur seulement, class et style sur le conteneur", () => {
    wrapper = mount(Dropdown, {
      props: { label: 'Actions', options },
      attrs: { id: 'actions', 'data-testid': 'menu-actions', class: 'barre', style: 'margin: 4px' }
    })

    expect(wrapper.findAll('#actions')).toHaveLength(1)
    expect(trigger().attributes('id')).toBe('actions')
    expect(trigger().attributes('data-testid')).toBe('menu-actions')
    expect(wrapper.classes()).toContain('barre')
    expect(wrapper.attributes('style')).toContain('margin: 4px')
    expect(wrapper.attributes('id')).toBeUndefined()
  })

  it("trace un séparateur avec { type: 'separator' } et avant une option avec separatorBefore", async () => {
    wrapper = mount(Dropdown, {
      props: {
        label: 'Actions',
        options: [
          { value: 'edit', label: 'Modifier' },
          { type: 'separator' },
          { value: 'share', label: 'Partager' },
          { value: 'delete', label: 'Supprimer', separatorBefore: true }
        ]
      },
      attachTo: document.body
    })
    await trigger().trigger('click')

    const menu = wrapper.find('[role="menu"]')
    const roles = menu.findAll('[role]').map(el => el.attributes('role'))
    expect(roles).toEqual(['menuitem', 'separator', 'menuitem', 'separator', 'menuitem'])
    expect(items().map(item => item.text())).toEqual(['Modifier', 'Partager', 'Supprimer'])
  })
})

describe('SuDropdown — nom, déclencheur personnalisé, options cochées', () => {
  it('icône seule : label devient le nom accessible du bouton', () => {
    wrapper = mount(Dropdown, {
      props: { label: 'Plus d’actions', icon: EllipsisHorizontalIcon, iconDisplay: 'only', options }
    })
    expect(trigger().attributes('aria-label')).toBe('Plus d’actions')
    expect(trigger().text()).not.toContain('Plus d’actions')
  })

  it('ariaLabel reste prioritaire sur label', () => {
    wrapper = mount(Dropdown, {
      props: { label: 'Actions', ariaLabel: 'Actions du projet', icon: EllipsisHorizontalIcon, iconDisplay: 'only', options }
    })
    expect(trigger().attributes('aria-label')).toBe('Actions du projet')
  })

  it('slot trigger : le bouton fourni ouvre le menu et récupère le focus', async () => {
    wrapper = mount(Dropdown, {
      props: { options },
      slots: {
        trigger: `<template #trigger="{ props, isOpen }">
          <button class="mon-avatar" v-bind="props">Profil {{ isOpen ? 'ouvert' : 'fermé' }}</button>
        </template>`
      },
      attachTo: document.body
    })
    const custom = wrapper.find('.mon-avatar')
    expect(wrapper.find('.su-dropdown-trigger').exists()).toBe(false)
    expect(custom.attributes('aria-haspopup')).toBe('menu')
    expect(custom.attributes('aria-expanded')).toBe('false')

    ;(custom.element as HTMLElement).focus()
    await keydown('ArrowDown')
    expect(custom.attributes('aria-expanded')).toBe('true')
    expect(custom.text()).toBe('Profil ouvert')
    expect(wrapper.find('[role="menu"]').attributes('aria-labelledby')).toBe(custom.attributes('id'))
    expect(focused()).toBe('Modifier')

    await keydown('Escape')
    expect(document.activeElement).toBe(custom.element)
    expect(custom.attributes('aria-expanded')).toBe('false')
  })

  it('options cochables : menuitemcheckbox / menuitemradio et aria-checked', async () => {
    wrapper = mount(Dropdown, {
      props: {
        label: 'Affichage',
        options: [
          { value: 'grid', label: 'Grille', type: 'radio', checked: true },
          { value: 'list', label: 'Liste', type: 'radio', checked: false },
          { type: 'separator' },
          { value: 'archived', label: 'Afficher les archives', type: 'checkbox', checked: true },
          { value: 'export', label: 'Exporter' }
        ]
      },
      attachTo: document.body
    })
    await trigger().trigger('click')

    const entries = wrapper.findAll('.su-dropdown-option')
    expect(entries.map((entry) => entry.attributes('role'))).toEqual(['menuitemradio', 'menuitemradio', 'menuitemcheckbox', 'menuitem'])
    expect(entries.map((entry) => entry.attributes('aria-checked'))).toEqual(['true', 'false', 'true', undefined])
    // Coche pour les options cochées, place réservée pour toutes (libellés alignés)
    expect(wrapper.findAll('.su-dropdown-option-check')).toHaveLength(4)
    expect(wrapper.findAll('.su-dropdown-option-dot')).toHaveLength(1)
    expect(wrapper.findAll('.su-dropdown-option-check-icon')).toHaveLength(1)

    await entries[1].trigger('click')
    expect(wrapper.emitted('select')?.at(-1)?.[0]).toMatchObject({ value: 'list', type: 'radio' })
  })
})
