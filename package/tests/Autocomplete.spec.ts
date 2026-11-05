import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import Autocomplete from '@/components/molecules/Autocomplete.vue'
import { clearAnnouncements } from '@/composables/useAnnouncer'

let wrapper: VueWrapper | undefined

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  clearAnnouncements()
  vi.useRealTimers()
  document.body.innerHTML = ''
})

const cities = ['Paris', 'Pau', 'Évreux', 'Lyon', { label: 'Perpignan', disabled: true }]

const mountAutocomplete = (props: Record<string, unknown> = {}) => {
  wrapper = mount(Autocomplete, {
    props: {
      options: cities,
      modelValue: '',
      ariaLabel: 'Ville',
      'onUpdate:modelValue': (value: string) => wrapper?.setProps({ modelValue: value }),
      ...props
    },
    attachTo: document.body
  })
  return wrapper
}

const input = () => wrapper!.find('input')
const optionLabels = () => wrapper!.findAll('[role="option"]').map((option) => option.text())

const type = async (text: string) => {
  await input().setValue(text)
  await nextTick()
}

describe('SuAutocomplete', () => {
  it('est un combobox relié à sa liste', () => {
    mountAutocomplete()
    expect(input().attributes('role')).toBe('combobox')
    expect(input().attributes('aria-autocomplete')).toBe('list')
    expect(input().attributes('aria-expanded')).toBe('false')
    expect(wrapper!.find(`#${input().attributes('aria-controls')}`).attributes('role')).toBe('listbox')
  })

  it('filtre sans tenir compte des accents ni de la casse', async () => {
    mountAutocomplete()
    await type('ev')
    expect(input().attributes('aria-expanded')).toBe('true')
    expect(optionLabels()).toEqual(['Évreux'])
    await type('pa')
    expect(optionLabels()).toEqual(['Paris', 'Pau'])
  })

  it('parcourt la liste aux flèches et choisit avec Entrée', async () => {
    mountAutocomplete()
    await type('p')
    await input().trigger('keydown', { key: 'ArrowDown' })
    const active = input().attributes('aria-activedescendant')
    expect(document.getElementById(active!)?.textContent?.trim()).toBe('Paris')

    await input().trigger('keydown', { key: 'Enter' })
    expect(wrapper!.props('modelValue')).toBe('Paris')
    expect(wrapper!.emitted('select')?.[0]?.[0]).toMatchObject({ label: 'Paris' })
    expect(input().attributes('aria-expanded')).toBe('false')
  })

  it('saute les suggestions désactivées', async () => {
    mountAutocomplete()
    await type('p')
    await input().trigger('keydown', { key: 'ArrowUp' })
    const active = input().attributes('aria-activedescendant')
    expect(document.getElementById(active!)?.textContent?.trim()).toBe('Pau')
  })

  it('garde la saisie libre et indique l’absence de suggestion', async () => {
    mountAutocomplete()
    await type('Bordeaux')
    expect(optionLabels()).toEqual([])
    expect(wrapper!.find('.su-autocomplete__status').text()).toBe('Aucune suggestion')
    expect(wrapper!.props('modelValue')).toBe('Bordeaux')
  })

  it('Échap ferme la liste, puis efface avec clearable', async () => {
    mountAutocomplete({ clearable: true })
    await type('Ly')
    await input().trigger('keydown', { key: 'Escape' })
    expect(input().attributes('aria-expanded')).toBe('false')
    expect(wrapper!.props('modelValue')).toBe('Ly')
    await input().trigger('keydown', { key: 'Escape' })
    expect(wrapper!.props('modelValue')).toBe('')
  })

  it('n’ouvre la liste qu’après minChars caractères', async () => {
    mountAutocomplete({ minChars: 2 })
    await type('P')
    expect(input().attributes('aria-expanded')).toBe('false')
    await type('Pa')
    expect(input().attributes('aria-expanded')).toBe('true')
  })

  it('n’applique pas de filtre local avec filter=false', async () => {
    mountAutocomplete({ filter: false, options: ['Résultat serveur'] })
    await type('xyz')
    expect(optionLabels()).toEqual(['Résultat serveur'])
  })

  it('annonce le nombre de suggestions', async () => {
    vi.useFakeTimers()
    mountAutocomplete()
    await type('pa')
    vi.advanceTimersByTime(1000)
    expect(document.querySelector('[data-su-announcer="polite"]')?.textContent).toBe('2 suggestions')
  })
})
