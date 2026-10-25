import { afterEach, describe, expect, it } from 'vitest'
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils'
import Dropdown from '@/components/molecules/Dropdown.vue'
import Popover from '@/components/molecules/Popover.vue'

let wrapper: VueWrapper | undefined

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  document.body.innerHTML = ''
})

const options = [
  { value: 'edit', label: 'Modifier' },
  { value: 'duplicate', label: 'Dupliquer' },
  { separator: true },
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
