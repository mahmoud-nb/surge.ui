import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils'
import CommandPalette from '@/components/organisms/CommandPalette.vue'

let wrapper: VueWrapper | undefined

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  document.body.innerHTML = ''
})

const onNewProject = vi.fn()

const commands = [
  { id: 'home', label: 'Aller à l’accueil', group: 'Navigation' },
  { id: 'settings', label: 'Paramètres', group: 'Navigation', keywords: ['préférences', 'compte'] },
  { id: 'new', label: 'Nouveau projet', group: 'Actions', shortcut: ['Ctrl', 'N'], onSelect: onNewProject },
  { id: 'theme', label: 'Changer de thème', group: 'Actions', description: 'Clair, sombre ou système' },
  { id: 'archive', label: 'Archiver', group: 'Actions', disabled: true }
]

const mountPalette = (props: Record<string, unknown> = {}) => {
  wrapper = mount(CommandPalette, {
    props: {
      commands,
      open: false,
      'onUpdate:open': (value: boolean) => wrapper?.setProps({ open: value }),
      ...props
    },
    attachTo: document.body
  })
  return wrapper
}

const input = () => wrapper!.find('input')
const optionLabels = () => wrapper!.findAll('[role="option"] .su-command-palette__label').map((label) => label.text())
const activeLabel = () => document.getElementById(input().attributes('aria-activedescendant')!)?.querySelector('.su-command-palette__label')?.textContent

describe('SuCommandPalette', () => {
  it('s’ouvre avec Ctrl + K', async () => {
    mountPalette()
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))
    await flushPromises()
    expect(wrapper!.props('open')).toBe(true)
    expect((wrapper!.find('dialog').element as HTMLDialogElement).open).toBe(true)
  })

  it('affiche les commandes groupées dans une liste nommée', async () => {
    mountPalette({ open: true })
    await flushPromises()
    expect(input().attributes('role')).toBe('combobox')
    const listbox = wrapper!.find('[role="listbox"]')
    expect(listbox.attributes('id')).toBe(input().attributes('aria-controls'))
    const groups = wrapper!.findAll('[role="group"]')
    expect(groups).toHaveLength(2)
    expect(document.getElementById(groups[0].attributes('aria-labelledby')!)?.textContent?.trim()).toBe('Navigation')
    expect(activeLabel()).toBe('Aller à l’accueil')
  })

  it('classe les résultats : début du libellé, libellé, puis mots-clés', async () => {
    mountPalette({ open: true })
    await flushPromises()
    await input().setValue('pr')
    expect(optionLabels()).toEqual(['Nouveau projet', 'Paramètres'])
    await input().setValue('compte')
    expect(optionLabels()).toEqual(['Paramètres'])
    await input().setValue('xyz')
    expect(wrapper!.find('.su-command-palette__empty').text()).toBe('Aucun résultat')
  })

  it('parcourt aux flèches en sautant les commandes désactivées', async () => {
    mountPalette({ open: true })
    await flushPromises()
    await input().setValue('a')
    await input().trigger('keydown', { key: 'ArrowUp' })
    expect(activeLabel()).not.toBe('Archiver')
  })

  it('exécute la commande avec Entrée et se ferme', async () => {
    mountPalette({ open: true })
    await flushPromises()
    await input().setValue('nouveau')
    await input().trigger('keydown', { key: 'Enter' })
    await flushPromises()
    expect(wrapper!.props('open')).toBe(false)
    expect(wrapper!.emitted('select')?.[0]?.[0]).toMatchObject({ id: 'new' })
    expect(onNewProject).toHaveBeenCalledOnce()
  })
})
