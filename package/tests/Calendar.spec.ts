import { afterEach, describe, expect, it } from 'vitest'
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils'
import Calendar from '@/components/molecules/Calendar.vue'
import DatePicker from '@/components/molecules/DatePicker.vue'
import { addMonths, getFirstDayOfWeek, getMonthGrid, parseDateInput, toDateKey } from '@/utils/date'
import { clearAnnouncements } from '@/composables/useAnnouncer'

let wrapper: VueWrapper | undefined

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  clearAnnouncements()
  document.body.innerHTML = ''
})

describe('utilitaires de dates', () => {
  it('ramène au dernier jour du mois en ajoutant des mois', () => {
    expect(toDateKey(addMonths(new Date(2026, 0, 31), 1))).toBe('2026-02-28')
  })

  it('aligne la grille sur le premier jour de la semaine', () => {
    // 1er novembre 2026 : un dimanche
    const mondayFirst = getMonthGrid(new Date(2026, 10, 1), 1)
    expect(mondayFirst[0].slice(0, 6)).toEqual([null, null, null, null, null, null])
    expect(mondayFirst[0][6]?.getDate()).toBe(1)
    const sundayFirst = getMonthGrid(new Date(2026, 10, 1), 0)
    expect(sundayFirst[0][0]?.getDate()).toBe(1)
  })

  it('choisit le premier jour de la semaine selon la langue', () => {
    expect(getFirstDayOfWeek('fr')).toBe(1)
    expect(getFirstDayOfWeek('en-US')).toBe(0)
  })

  it('lit une date saisie dans l’ordre de la langue', () => {
    expect(toDateKey(parseDateInput('05/11/2026', 'fr')!)).toBe('2026-11-05')
    expect(toDateKey(parseDateInput('11/5/2026', 'en-US')!)).toBe('2026-11-05')
    expect(toDateKey(parseDateInput('5.11.26', 'fr')!)).toBe('2026-11-05')
    expect(parseDateInput('31/02/2026', 'fr')).toBeUndefined()
    expect(parseDateInput('', 'fr')).toBeNull()
  })
})

const mountCalendar = (props: Record<string, unknown> = {}) => {
  wrapper = mount(Calendar, {
    props: {
      modelValue: new Date(2026, 10, 5),
      'onUpdate:modelValue': (value: Date) => wrapper?.setProps({ modelValue: value }),
      ...props
    },
    attachTo: document.body
  })
  return wrapper
}

const cell = (key: string) => wrapper!.find(`[data-date="${key}"]`)

describe('SuCalendar', () => {
  it('est une grille nommée par le mois, jours nommés par la date complète', () => {
    mountCalendar()
    const grid = wrapper!.find('[role="grid"]')
    expect(grid.attributes('aria-label')).toBe('Novembre 2026')
    const selected = cell('2026-11-05')
    expect(selected.attributes('aria-label')).toBe('jeudi 5 novembre 2026')
    expect(selected.attributes('aria-selected')).toBe('true')
    expect(selected.attributes('tabindex')).toBe('0')
    expect(wrapper!.findAll('[tabindex="0"]')).toHaveLength(1)
  })

  it('se parcourt au clavier, y compris d’un mois à l’autre', async () => {
    mountCalendar()
    const grid = wrapper!.find('[role="grid"]')
    await grid.trigger('keydown', { key: 'ArrowRight' })
    await flushPromises()
    expect(document.activeElement?.getAttribute('data-date')).toBe('2026-11-06')

    await grid.trigger('keydown', { key: 'ArrowDown' })
    await flushPromises()
    expect(document.activeElement?.getAttribute('data-date')).toBe('2026-11-13')

    await grid.trigger('keydown', { key: 'PageDown' })
    await flushPromises()
    expect(document.activeElement?.getAttribute('data-date')).toBe('2026-12-13')
    expect(grid.attributes('aria-label')).toBe('Décembre 2026')

    await grid.trigger('keydown', { key: 'Home' })
    await flushPromises()
    expect(document.activeElement?.getAttribute('data-date')).toBe('2026-12-07')
  })

  it('choisit le jour actif avec Entrée', async () => {
    mountCalendar()
    const grid = wrapper!.find('[role="grid"]')
    await grid.trigger('keydown', { key: 'ArrowLeft' })
    await grid.trigger('keydown', { key: 'Enter' })
    expect(toDateKey(wrapper!.props('modelValue') as Date)).toBe('2026-11-04')
    expect(wrapper!.emitted('select')).toHaveLength(1)
  })

  it('refuse les jours hors bornes et désactive la navigation', async () => {
    mountCalendar({ min: new Date(2026, 10, 3), max: new Date(2026, 10, 20) })
    expect(cell('2026-11-02').attributes('aria-disabled')).toBe('true')
    await cell('2026-11-02').trigger('click')
    expect(toDateKey(wrapper!.props('modelValue') as Date)).toBe('2026-11-05')
    const [previous, next] = wrapper!.findAll('.su-calendar__nav')
    expect(previous.attributes('disabled')).toBeDefined()
    expect(next.attributes('disabled')).toBeDefined()
  })

  it('annonce le mois choisi avec les boutons', async () => {
    mountCalendar()
    await wrapper!.findAll('.su-calendar__nav')[1].trigger('click')
    await new Promise((resolve) => setTimeout(resolve, 250))
    expect(document.querySelector('[data-su-announcer="polite"]')?.textContent).toBe('Décembre 2026')
  })

  it('choisit l’année puis le mois depuis le titre, sans changer la date', async () => {
    mountCalendar()
    const yearButton = wrapper!.findAll('.su-calendar__heading-button')[1]
    expect(yearButton.text()).toBe('2026')
    expect(yearButton.attributes('aria-label')).toBe('2026, choisir l’année')
    await yearButton.trigger('click')
    await flushPromises()

    expect(wrapper!.find('[role="grid"]').attributes('aria-label')).toBe('2016–2027')
    expect(wrapper!.findAll('[data-year]')).toHaveLength(12)
    expect(document.activeElement?.getAttribute('data-year')).toBe('2026')
    expect(wrapper!.find('[data-year="2026"]').attributes('aria-selected')).toBe('true')

    // Page préc. : 12 ans plus tôt ; ↑ : une rangée de 3 années
    await wrapper!.find('[role="grid"]').trigger('keydown', { key: 'PageUp' })
    await flushPromises()
    expect(document.activeElement?.getAttribute('data-year')).toBe('2014')
    await wrapper!.find('[role="grid"]').trigger('keydown', { key: 'ArrowUp' })
    await flushPromises()
    expect(document.activeElement?.getAttribute('data-year')).toBe('2011')
    await wrapper!.find('[role="grid"]').trigger('keydown', { key: 'Enter' })
    await flushPromises()

    expect(wrapper!.find('[role="grid"]').attributes('aria-label')).toBe('2011')
    expect(document.activeElement?.getAttribute('data-month')).toBe('2011-11')
    expect(document.activeElement?.getAttribute('aria-label')).toBe('novembre 2011')

    await wrapper!.find('[data-month="2011-05"]').trigger('click')
    await flushPromises()
    expect(wrapper!.find('[role="grid"]').attributes('aria-label')).toBe('Mai 2011')
    expect(document.activeElement?.getAttribute('data-date')).toBe('2011-05-05')
    expect(toDateKey(wrapper!.props('modelValue') as Date)).toBe('2026-11-05')
    expect(wrapper!.emitted('select')).toBeUndefined()
  })

  it('ouvre les mois depuis le titre ; Échap revient au mois affiché avant', async () => {
    mountCalendar()
    const monthButton = wrapper!.findAll('.su-calendar__heading-button')[0]
    expect(monthButton.attributes('aria-label')).toBe('Novembre, choisir le mois')
    await monthButton.trigger('click')
    await flushPromises()
    expect(document.activeElement?.getAttribute('data-month')).toBe('2026-11')

    await wrapper!.find('[role="grid"]').trigger('keydown', { key: 'ArrowRight' })
    await flushPromises()
    expect(document.activeElement?.getAttribute('data-month')).toBe('2026-12')

    const escape = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })
    document.activeElement!.dispatchEvent(escape)
    await flushPromises()
    expect(escape.defaultPrevented).toBe(true)
    expect(wrapper!.find('[role="grid"]').attributes('aria-label')).toBe('Novembre 2026')
    expect(document.activeElement?.getAttribute('data-date')).toBe('2026-11-05')
  })

  it('désactive les mois et les années hors bornes', async () => {
    mountCalendar({ min: new Date(2026, 2, 15), max: new Date(2027, 5, 1) })
    await wrapper!.findAll('.su-calendar__heading-button')[0].trigger('click')
    await flushPromises()
    expect(wrapper!.find('[data-month="2026-02"]').attributes('aria-disabled')).toBe('true')
    expect(wrapper!.find('[data-month="2026-03"]').attributes('aria-disabled')).toBeUndefined()
    let [previous, next] = wrapper!.findAll('.su-calendar__nav')
    expect(previous.attributes('aria-label')).toBe('Année précédente')
    expect(previous.attributes('disabled')).toBeDefined()
    expect(next.attributes('disabled')).toBeUndefined()

    await wrapper!.find('.su-calendar__heading-button').trigger('click')
    await flushPromises()
    expect(wrapper!.find('[data-year="2025"]').attributes('aria-disabled')).toBe('true')
    expect(wrapper!.find('[data-year="2027"]').attributes('aria-disabled')).toBeUndefined()
    expect(wrapper!.find('[data-year="2016"]').attributes('aria-disabled')).toBe('true')
    ;[previous, next] = wrapper!.findAll('.su-calendar__nav')
    expect(next.attributes('aria-label')).toBe('Années suivantes')
    expect(previous.attributes('disabled')).toBeDefined()
    expect(next.attributes('disabled')).toBeDefined()

    await wrapper!.find('[data-year="2016"]').trigger('click')
    expect(wrapper!.find('[data-year="2016"]').exists()).toBe(true)
  })

  it('annonce la page d’années avec les boutons', async () => {
    mountCalendar()
    await wrapper!.findAll('.su-calendar__heading-button')[1].trigger('click')
    await flushPromises()
    await wrapper!.findAll('.su-calendar__nav')[0].trigger('click')
    await new Promise((resolve) => setTimeout(resolve, 250))
    expect(document.querySelector('[data-su-announcer="polite"]')?.textContent).toBe('2004–2015')
  })
})

describe('SuDatePicker', () => {
  const mountPicker = (props: Record<string, unknown> = {}) => {
    wrapper = mount(DatePicker, {
      props: {
        modelValue: null,
        ariaLabel: 'Date de départ',
        'onUpdate:modelValue': (value: Date | null) => wrapper?.setProps({ modelValue: value }),
        ...props
      },
      attachTo: document.body
    })
    return wrapper
  }

  it('affiche le format attendu et lit la saisie', async () => {
    mountPicker()
    const input = wrapper!.find('input')
    expect(input.attributes('placeholder')).toBe('jj/mm/aaaa')
    await input.setValue('05/11/2026')
    await input.trigger('blur')
    expect(toDateKey(wrapper!.props('modelValue') as Date)).toBe('2026-11-05')
    expect(wrapper!.find('.su-date-picker__button').attributes('aria-label')).toBe('Changer la date, 5 novembre 2026')
  })

  it('rend la valeur précédente pour une date inexistante ou hors bornes', async () => {
    mountPicker({ modelValue: new Date(2026, 10, 5), max: new Date(2026, 11, 31) })
    const input = wrapper!.find('input')
    await input.setValue('31/02/2026')
    await input.trigger('blur')
    expect((input.element as HTMLInputElement).value).toBe('05/11/2026')
    await input.setValue('10/01/2027')
    await input.trigger('blur')
    expect(toDateKey(wrapper!.props('modelValue') as Date)).toBe('2026-11-05')
  })

  it('ouvre le calendrier dans un dialog et ferme au choix d’un jour', async () => {
    mountPicker({ modelValue: new Date(2026, 10, 5) })
    const button = wrapper!.find('.su-date-picker__button')
    expect(button.attributes('aria-haspopup')).toBe('dialog')
    await button.trigger('click')
    await flushPromises()

    const dialog = wrapper!.find('[role="dialog"]')
    expect(dialog.attributes('aria-label')).toBe('Calendrier')
    expect(button.attributes('aria-expanded')).toBe('true')

    await wrapper!.find('[data-date="2026-11-12"]').trigger('click')
    await flushPromises()
    expect(toDateKey(wrapper!.props('modelValue') as Date)).toBe('2026-11-12')
    expect(wrapper!.find('[role="dialog"]').exists()).toBe(false)
    expect(document.activeElement).toBe(button.element)
  })

  it('se ferme avec Échap', async () => {
    mountPicker()
    await wrapper!.find('.su-date-picker__button').trigger('click')
    await flushPromises()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await flushPromises()
    expect(wrapper!.find('[role="dialog"]').exists()).toBe(false)
  })

  it('Échap quitte d’abord la vue des années sans fermer le calendrier', async () => {
    mountPicker({ modelValue: new Date(2026, 10, 5) })
    await wrapper!.find('.su-date-picker__button').trigger('click')
    await flushPromises()
    await wrapper!.findAll('.su-calendar__heading-button')[1].trigger('click')
    await flushPromises()
    expect(document.activeElement?.getAttribute('data-year')).toBe('2026')

    const escape = () =>
      document.activeElement!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }))
    escape()
    await flushPromises()
    expect(wrapper!.find('[role="dialog"]').exists()).toBe(true)
    expect(document.activeElement?.getAttribute('data-date')).toBe('2026-11-05')

    escape()
    await flushPromises()
    expect(wrapper!.find('[role="dialog"]').exists()).toBe(false)
  })
})
