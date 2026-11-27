<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import type { CalendarProps } from '@/types'
import { useLocale } from '@/composables/useLocale'
import { useAnnouncer } from '@/composables/useAnnouncer'
import {
  addDays,
  addMonths,
  clampDate,
  getFirstDayOfWeek,
  getMonthGrid,
  isOutOfRange,
  isSameDay,
  isValidDate,
  startOfDay,
  toDateKey
} from '@/utils/date'

// ============================================================
// CALENDAR — grille d'un mois (motif APG « date picker »).
// - role="grid" nommé par le mois ; chaque jour est une cellule
//   focusable (un seul arrêt de tabulation) nommée par la date
//   complète, aria-selected, aria-current="date" pour aujourd'hui.
// - Flèches : ±1 jour / ±1 semaine (RTL inversé) ; Début / Fin :
//   début / fin de semaine ; Page préc. / suiv. : ±1 mois (Maj : ±1 an) ;
//   Entrée / Espace : choisir.
// - Le mois et l'année du titre sont des boutons : ils ouvrent la grille
//   des 12 mois ou une page de 12 années (mêmes touches, 3 colonnes).
//   Choisir une année mène aux mois, choisir un mois revient aux jours ;
//   Échap revient au mois affiché avant, sans rien changer.
// - Les boutons précédent / suivant gardent le focus et annoncent la
//   nouvelle période (mois, année ou page d'années).
// ============================================================

type CalendarView = 'days' | 'months' | 'years'

interface PickerCell {
  key: string
  text: string
  label?: string
  /** Mois (0-11) dans la vue mois, année dans la vue années */
  value: number
  selected: boolean
  disabled: boolean
  current: boolean
  focused: boolean
}

/** Années par page de la vue années (4 rangées de 3) */
const YEARS_PER_PAGE = 12
/** Colonnes des vues mois et années */
const PICKER_COLUMNS = 3

const props = defineProps<CalendarProps>()

const modelValue = defineModel<Date | null>({ default: null })

const emit = defineEmits<{
  select: [date: Date]
}>()

const { t, locale } = useLocale()
const { announce } = useAnnouncer()

const code = computed(() => props.locale ?? locale.value.code)
const firstDay = computed(() => props.weekStartsOn ?? getFirstDayOfWeek(code.value))

const view = ref<CalendarView>('days')
const gridRef = ref<HTMLTableElement>()
const today = startOfDay(new Date())

const safeModel = computed(() => (isValidDate(modelValue.value) ? startOfDay(modelValue.value) : null))
const minDay = computed(() => (isValidDate(props.min) ? startOfDay(props.min) : undefined))
const maxDay = computed(() => (isValidDate(props.max) ? startOfDay(props.max) : undefined))

// Jour actif (arrêt de tabulation) : la date choisie, sinon aujourd'hui.
// Il porte aussi le mois et l'année affichés par les autres vues.
const focusedDate = ref<Date>(clampDate(safeModel.value ?? today, props.min, props.max))
const month = computed(() => new Date(focusedDate.value.getFullYear(), focusedDate.value.getMonth(), 1))
const focusedYear = computed(() => focusedDate.value.getFullYear())
const pageStart = computed(() => Math.floor(focusedYear.value / YEARS_PER_PAGE) * YEARS_PER_PAGE)

watch(safeModel, (value) => {
  if (value && !isSameDay(value, focusedDate.value)) focusedDate.value = value
})

const weeks = computed(() => getMonthGrid(month.value, firstDay.value))

/** Premier jour d'un mois, y compris avant l'an 100 */
const monthStart = (year: number, monthIndex = 0) => {
  const date = new Date(2000, monthIndex, 1)
  date.setFullYear(year)
  return date
}

// ### Textes localisés

const formatter = (options: Intl.DateTimeFormatOptions) => {
  try {
    return new Intl.DateTimeFormat(code.value, options)
  } catch {
    return new Intl.DateTimeFormat(undefined, options)
  }
}

const capitalize = (text: string) => text.charAt(0).toLocaleUpperCase(code.value) + text.slice(1)

const monthYearFormatter = computed(() => formatter({ month: 'long', year: 'numeric' }))
const yearFormatter = computed(() => formatter({ year: 'numeric' }))
const monthFormatter = computed(() => formatter({ month: 'long' }))
const shortMonthFormatter = computed(() => formatter({ month: 'short' }))
const dayFormatter = computed(() => formatter({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }))

const monthLabel = computed(() => capitalize(monthYearFormatter.value.format(month.value)))
const yearLabel = computed(() => yearFormatter.value.format(month.value))
const rangeLabel = computed(() => {
  const start = monthStart(pageStart.value)
  const end = monthStart(pageStart.value + YEARS_PER_PAGE - 1)
  const format = yearFormatter.value as Intl.DateTimeFormat & { formatRange?: (from: Date, to: Date) => string }
  return format.formatRange ? format.formatRange(start, end) : `${format.format(start)} – ${format.format(end)}`
})

/** Nom de la grille affichée, annoncé au changement de période */
const title = computed(() => {
  if (view.value === 'months') return yearLabel.value
  if (view.value === 'years') return rangeLabel.value
  return monthLabel.value
})

// Boutons du mois et de l'année, dans l'ordre de la langue (« Novembre 2026 », « 2026年 11月 »)
const headingParts = computed(() => {
  const types = monthYearFormatter.value.formatToParts(month.value).map((part) => part.type)
  const monthFirst = types.indexOf('year') === -1 || types.indexOf('month') < types.indexOf('year')
  const monthText = capitalize(monthFormatter.value.format(month.value))
  const monthPart = { view: 'months' as const, text: monthText, label: t('calendar.chooseMonth', { month: monthText }) }
  const yearPart = { view: 'years' as const, text: yearLabel.value, label: t('calendar.chooseYear', { year: yearLabel.value }) }
  return monthFirst ? [monthPart, yearPart] : [yearPart, monthPart]
})

const previousText = computed(() => {
  if (view.value === 'months') return t('calendar.previousYear')
  if (view.value === 'years') return t('calendar.previousYears')
  return props.previousMonthLabel ?? t('calendar.previousMonth')
})

const nextText = computed(() => {
  if (view.value === 'months') return t('calendar.nextYear')
  if (view.value === 'years') return t('calendar.nextYears')
  return props.nextMonthLabel ?? t('calendar.nextMonth')
})

// 1er janvier 2023 : un dimanche
const weekdays = computed(() => {
  const narrow = formatter({ weekday: 'narrow' })
  const long = formatter({ weekday: 'long' })
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(2023, 0, 1 + ((firstDay.value + index) % 7))
    return { narrow: narrow.format(date), long: long.format(date) }
  })
})

// ### Disponibilité

const isDisabled = (date: Date) => isOutOfRange(date, props.min, props.max) || !!props.isDateDisabled?.(date)

// Un mois ou une année est indisponible quand il est entièrement hors bornes
const isMonthDisabled = (year: number, monthIndex: number) => {
  const first = monthStart(year, monthIndex)
  const last = addDays(addMonths(first, 1), -1)
  return (!!maxDay.value && first > maxDay.value) || (!!minDay.value && last < minDay.value)
}

const isYearDisabled = (year: number) =>
  (!!minDay.value && year < minDay.value.getFullYear()) || (!!maxDay.value && year > maxDay.value.getFullYear())

const canGoPrevious = computed(() => {
  const min = minDay.value
  if (!min) return true
  if (view.value === 'months') return focusedYear.value > min.getFullYear()
  if (view.value === 'years') return pageStart.value > min.getFullYear()
  return month.value > new Date(min.getFullYear(), min.getMonth(), 1)
})

const canGoNext = computed(() => {
  const max = maxDay.value
  if (!max) return true
  if (view.value === 'months') return focusedYear.value < max.getFullYear()
  if (view.value === 'years') return pageStart.value + YEARS_PER_PAGE - 1 < max.getFullYear()
  return month.value < new Date(max.getFullYear(), max.getMonth(), 1)
})

// ### Vues mois et années

const pickerCells = computed<PickerCell[]>(() => {
  const model = safeModel.value

  if (view.value === 'months') {
    const year = focusedYear.value
    return Array.from({ length: 12 }, (_, index) => {
      const date = monthStart(year, index)
      return {
        key: toDateKey(date).slice(0, -3),
        text: capitalize(shortMonthFormatter.value.format(date)),
        label: monthYearFormatter.value.format(date),
        value: index,
        selected: !!model && model.getFullYear() === year && model.getMonth() === index,
        disabled: isMonthDisabled(year, index),
        current: today.getFullYear() === year && today.getMonth() === index,
        focused: focusedDate.value.getMonth() === index
      }
    })
  }

  return Array.from({ length: YEARS_PER_PAGE }, (_, index) => {
    const year = pageStart.value + index
    return {
      key: String(year),
      text: yearFormatter.value.format(monthStart(year)),
      value: year,
      selected: model?.getFullYear() === year,
      disabled: isYearDisabled(year),
      current: today.getFullYear() === year,
      focused: focusedYear.value === year
    }
  })
})

const pickerRows = computed(() =>
  Array.from({ length: Math.ceil(pickerCells.value.length / PICKER_COLUMNS) }, (_, row) =>
    pickerCells.value.slice(row * PICKER_COLUMNS, (row + 1) * PICKER_COLUMNS)
  )
)

const pickerAttribute = computed(() => (view.value === 'months' ? 'data-month' : 'data-year'))

// ### Navigation

const focusCell = async () => {
  await nextTick()
  gridRef.value?.querySelector<HTMLElement>('td[tabindex="0"]')?.focus()
}

const moveTo = (date: Date) => {
  focusedDate.value = clampDate(date, props.min, props.max)
  focusCell()
}

// Jour actif au moment de quitter la vue des jours : Échap y revient
let origin: Date | null = null

const showView = (next: CalendarView) => {
  if (view.value === 'days' && next !== 'days') origin = focusedDate.value
  view.value = next
  focusCell()
}

/** Mois parcourus par les boutons précédent / suivant */
const pageStep = computed(() => {
  if (view.value === 'months') return 12
  if (view.value === 'years') return 12 * YEARS_PER_PAGE
  return 1
})

const changePage = async (direction: 1 | -1) => {
  focusedDate.value = clampDate(addMonths(focusedDate.value, direction * pageStep.value), props.min, props.max)
  await nextTick()
  announce(title.value)
}

const isRtl = () => !!gridRef.value && getComputedStyle(gridRef.value).direction === 'rtl'

const select = (date: Date) => {
  if (isDisabled(date)) return
  focusedDate.value = date
  modelValue.value = date
  emit('select', date)
}

const handleKeydown = (event: KeyboardEvent) => {
  const date = focusedDate.value
  const rtl = isRtl()
  const offsetInWeek = (date.getDay() - firstDay.value + 7) % 7
  let next: Date

  switch (event.key) {
    case 'ArrowLeft':
      next = addDays(date, rtl ? 1 : -1)
      break
    case 'ArrowRight':
      next = addDays(date, rtl ? -1 : 1)
      break
    case 'ArrowUp':
      next = addDays(date, -7)
      break
    case 'ArrowDown':
      next = addDays(date, 7)
      break
    case 'Home':
      next = addDays(date, -offsetInWeek)
      break
    case 'End':
      next = addDays(date, 6 - offsetInWeek)
      break
    case 'PageUp':
      next = addMonths(date, event.shiftKey ? -12 : -1)
      break
    case 'PageDown':
      next = addMonths(date, event.shiftKey ? 12 : 1)
      break
    case 'Enter':
    case ' ':
      event.preventDefault()
      select(date)
      return
    default:
      return
  }

  event.preventDefault()
  moveTo(next)
}

const handleCellClick = (date: Date) => {
  focusedDate.value = date
  select(date)
}

// Choisir une année mène aux mois, choisir un mois revient aux jours
const pick = (cell: PickerCell) => {
  if (cell.disabled) return
  const months = view.value === 'months'
    ? cell.value - focusedDate.value.getMonth()
    : (cell.value - focusedYear.value) * 12
  focusedDate.value = clampDate(addMonths(focusedDate.value, months), props.min, props.max)
  showView(view.value === 'months' ? 'days' : 'months')
}

const handlePickerKeydown = (event: KeyboardEvent) => {
  // Échap revient au mois affiché avant ; preventDefault empêche aussi la fermeture d'un DatePicker
  if (event.key === 'Escape') {
    event.preventDefault()
    if (origin) focusedDate.value = origin
    showView('days')
    return
  }

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    const cell = pickerCells.value.find((item) => item.focused)
    if (cell) pick(cell)
    return
  }

  const rtl = isRtl()
  const index = view.value === 'months' ? focusedDate.value.getMonth() : focusedYear.value - pageStart.value
  const column = index % PICKER_COLUMNS
  // En cases ; Page préc. / suiv. : une année (vue mois) ou une page (vue années)
  const steps: Record<string, number> = {
    ArrowLeft: rtl ? 1 : -1,
    ArrowRight: rtl ? -1 : 1,
    ArrowUp: -PICKER_COLUMNS,
    ArrowDown: PICKER_COLUMNS,
    Home: -column,
    End: PICKER_COLUMNS - 1 - column,
    PageUp: -12,
    PageDown: 12
  }
  const step = steps[event.key]
  if (step === undefined) return

  event.preventDefault()
  moveTo(addMonths(focusedDate.value, step * (view.value === 'months' ? 1 : 12)))
}

defineExpose({
  /** Donne le focus à la case active */
  focus: focusCell
})
</script>

<template>
  <div class="su-calendar">
    <div class="su-calendar__header">
      <button
        type="button"
        class="su-calendar__nav"
        :aria-label="previousText"
        :disabled="!canGoPrevious"
        @click="changePage(-1)"
      >
        <ChevronLeftIcon
          class="su-calendar__nav-icon"
          aria-hidden="true"
        />
      </button>
      <div class="su-calendar__heading">
        <template v-if="view === 'days'">
          <button
            v-for="part in headingParts"
            :key="part.view"
            type="button"
            class="su-calendar__heading-button"
            :aria-label="part.label"
            @click="showView(part.view)"
          >
            {{ part.text }}
          </button>
        </template>
        <button
          v-else-if="view === 'months'"
          type="button"
          class="su-calendar__heading-button"
          :aria-label="t('calendar.chooseYear', { year: yearLabel })"
          @click="showView('years')"
        >
          {{ yearLabel }}
        </button>
        <span
          v-else
          class="su-calendar__title"
        >
          {{ rangeLabel }}
        </span>
      </div>
      <button
        type="button"
        class="su-calendar__nav"
        :aria-label="nextText"
        :disabled="!canGoNext"
        @click="changePage(1)"
      >
        <ChevronRightIcon
          class="su-calendar__nav-icon"
          aria-hidden="true"
        />
      </button>
    </div>

    <table
      v-if="view === 'days'"
      key="days"
      ref="gridRef"
      role="grid"
      class="su-calendar__grid"
      :aria-label="monthLabel"
      @keydown="handleKeydown"
    >
      <thead>
        <tr>
          <th
            v-for="weekday in weekdays"
            :key="weekday.long"
            scope="col"
            class="su-calendar__weekday"
            :aria-label="weekday.long"
          >
            {{ weekday.narrow }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(week, weekIndex) in weeks"
          :key="weekIndex"
        >
          <template
            v-for="(day, dayIndex) in week"
            :key="day ? toDateKey(day) : `empty-${weekIndex}-${dayIndex}`"
          >
            <td
              v-if="day"
              :data-date="toDateKey(day)"
              :tabindex="isSameDay(day, focusedDate) ? 0 : -1"
              :aria-label="dayFormatter.format(day)"
              :aria-selected="isSameDay(day, safeModel) ? 'true' : 'false'"
              :aria-disabled="isDisabled(day) ? 'true' : undefined"
              :aria-current="isSameDay(day, today) ? 'date' : undefined"
              class="su-calendar__day"
              @click="handleCellClick(day)"
            >
              {{ day.getDate() }}
            </td>
            <td
              v-else
              class="su-calendar__empty"
            />
          </template>
        </tr>
      </tbody>
    </table>

    <table
      v-else
      :key="view"
      ref="gridRef"
      role="grid"
      class="su-calendar__grid su-calendar__grid--picker"
      :aria-label="title"
      @keydown="handlePickerKeydown"
    >
      <tbody>
        <tr
          v-for="(row, rowIndex) in pickerRows"
          :key="rowIndex"
        >
          <td
            v-for="cell in row"
            :key="cell.key"
            :[pickerAttribute]="cell.key"
            :tabindex="cell.focused ? 0 : -1"
            :aria-label="cell.label"
            :aria-selected="cell.selected ? 'true' : 'false'"
            :aria-disabled="cell.disabled ? 'true' : undefined"
            :aria-current="cell.current ? 'date' : undefined"
            class="su-calendar__cell"
            @click="pick(cell)"
          >
            {{ cell.text }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// CALENDAR — cases de 36px (32px dès `sm`), choix en couleur
// primaire, période courante soulignée d'un point. Vues mois et
// années : 3 colonnes sur la largeur de la grille des jours.
// Sélecteurs de tableau préfixés : la page hôte stylise souvent
// table, th et td (documentation, CMS).
// ============================================================

.su-calendar {
  --_su-calendar-cell: 2.25rem;

  display: inline-flex;
  flex-direction: column;
  gap: 0.5rem;
  color: var(--su-text-primary);
  font-size: var(--su-font-size-sm);

  @include up('sm') {
    --_su-calendar-cell: 2rem;
  }

  .su-calendar__grid {
    display: table;
    width: auto;
    margin: 0;
    overflow: visible;
    border: 0;
    border-collapse: separate;
    border-spacing: 0 0.125rem;
  }

  // Même largeur que les 7 colonnes des jours, espacement compris
  .su-calendar__grid--picker {
    width: calc(var(--_su-calendar-cell) * 7 + 0.5rem);
    margin: 0 -0.25rem;
    table-layout: fixed;
    border-spacing: 0.25rem;
  }

  .su-calendar__grid tr {
    border: 0;
    background: none;
  }

  .su-calendar__weekday,
  .su-calendar__day,
  .su-calendar__empty,
  .su-calendar__cell {
    width: var(--_su-calendar-cell);
    height: var(--_su-calendar-cell);
    padding: 0;
    border: 0;
    background: none;
    text-align: center;
    vertical-align: middle;
  }

  .su-calendar__cell {
    width: auto;
    height: calc(var(--_su-calendar-cell) * 1.375);
  }

  .su-calendar__weekday {
    height: 1.75rem;
    color: var(--su-text-tertiary);
    font-size: var(--su-font-size-xs);
    font-weight: var(--su-font-weight-medium);
  }

  .su-calendar__day,
  .su-calendar__cell {
    position: relative;
    border-radius: var(--su-radius-md);
    font-variant-numeric: tabular-nums;
    cursor: pointer;
    outline: none;

    @include transition(background-color, color);

    &:hover:not([aria-selected='true'], [aria-disabled='true']) {
      background-color: var(--su-bg-accent);
    }

    &:focus-visible {
      @include focus-ring($offset: 0);
    }

    // Aujourd'hui (ou le mois, l'année en cours) : point sous le texte
    &[aria-current='date']::after {
      content: '';
      position: absolute;
      bottom: 0.25rem;
      left: 50%;
      width: 0.25rem;
      height: 0.25rem;
      border-radius: var(--su-radius-full);
      background-color: currentcolor;
      translate: -50% 0;
    }

    &[aria-selected='true'] {
      background-color: var(--su-primary-default);
      color: var(--su-primary-text);
      font-weight: var(--su-font-weight-semibold);
    }

    &[aria-disabled='true'] {
      color: var(--su-text-disabled);
      text-decoration: line-through;
      cursor: not-allowed;
    }

    @include high-contrast {
      &[aria-selected='true'] {
        outline: 2px solid currentcolor;
        outline-offset: -2px;
      }
    }
  }
}

.su-calendar__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.su-calendar__heading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.125rem;
  min-width: 0;
}

// Padding réduit : « Septembre 2026 » tient sur 7 colonnes de 32px
.su-calendar__heading-button,
.su-calendar__title {
  height: 2rem;
  padding: 0 0.375rem;
  font-weight: var(--su-font-weight-semibold);
  line-height: 2rem;
  white-space: nowrap;
}

.su-calendar__heading-button {
  margin: 0;
  border: 0;
  border-radius: var(--su-radius-md);
  background: transparent;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;

  @include transition(background-color);

  &:hover {
    background-color: var(--su-bg-accent);
  }

  &:focus-visible {
    @include focus-ring($offset: 0);
  }
}

.su-calendar__title {
  font-variant-numeric: tabular-nums;
}

.su-calendar__nav {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: 0;
  border-radius: var(--su-radius-md);
  background: transparent;
  color: var(--su-text-secondary);
  cursor: pointer;

  @include transition(background-color, color);
  @include touch-target-overlay;

  &:hover:not(:disabled) {
    background-color: var(--su-bg-accent);
    color: var(--su-text-primary);
  }

  &:focus-visible {
    @include focus-ring($offset: 0);
  }

  &:disabled {
    @include disabled-state;
  }
}

.su-calendar__nav-icon {
  width: 1rem;
  height: 1rem;

  [dir='rtl'] & {
    scale: -1 1;
  }
}
</style>
