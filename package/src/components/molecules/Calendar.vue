<script setup lang="ts">
import { computed, nextTick, ref, useId, watch } from 'vue'
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
// - Les boutons de mois gardent le focus et annoncent le nouveau mois.
// ============================================================

const props = defineProps<CalendarProps>()

const modelValue = defineModel<Date | null>({ default: null })

const emit = defineEmits<{
  select: [date: Date]
}>()

const { t, locale } = useLocale()
const { announce } = useAnnouncer()
const previousText = computed(() => props.previousMonthLabel ?? t('calendar.previousMonth'))
const nextText = computed(() => props.nextMonthLabel ?? t('calendar.nextMonth'))

const code = computed(() => props.locale ?? locale.value.code)
const firstDay = computed(() => props.weekStartsOn ?? getFirstDayOfWeek(code.value))

const titleId = `calendar-title-${useId()}`
const gridRef = ref<HTMLTableElement>()
const today = startOfDay(new Date())

const safeModel = computed(() => (isValidDate(modelValue.value) ? startOfDay(modelValue.value) : null))

// Jour actif (arrêt de tabulation) : la date choisie, sinon aujourd'hui
const focusedDate = ref<Date>(clampDate(safeModel.value ?? today, props.min, props.max))
const month = computed(() => new Date(focusedDate.value.getFullYear(), focusedDate.value.getMonth(), 1))

watch(safeModel, (value) => {
  if (value && !isSameDay(value, focusedDate.value)) focusedDate.value = value
})

const weeks = computed(() => getMonthGrid(month.value, firstDay.value))

// ### Textes localisés

const formatter = (options: Intl.DateTimeFormatOptions) => {
  try {
    return new Intl.DateTimeFormat(code.value, options)
  } catch {
    return new Intl.DateTimeFormat(undefined, options)
  }
}

const capitalize = (text: string) => text.charAt(0).toLocaleUpperCase(code.value) + text.slice(1)

const monthLabel = computed(() => capitalize(formatter({ month: 'long', year: 'numeric' }).format(month.value)))
const dayFormatter = computed(() => formatter({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }))

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

const canGoPrevious = computed(() => !props.min || month.value > new Date(props.min.getFullYear(), props.min.getMonth(), 1))
const canGoNext = computed(() => !props.max || month.value < new Date(props.max.getFullYear(), props.max.getMonth(), 1))

// ### Navigation

const focusCell = async () => {
  await nextTick()
  gridRef.value?.querySelector<HTMLElement>(`[data-date="${toDateKey(focusedDate.value)}"]`)?.focus()
}

const moveTo = (date: Date) => {
  focusedDate.value = clampDate(date, props.min, props.max)
  focusCell()
}

const changeMonth = async (step: number) => {
  focusedDate.value = clampDate(addMonths(focusedDate.value, step), props.min, props.max)
  await nextTick()
  announce(monthLabel.value)
}

const select = (date: Date) => {
  if (isDisabled(date)) return
  focusedDate.value = date
  modelValue.value = date
  emit('select', date)
}

const handleKeydown = (event: KeyboardEvent) => {
  const date = focusedDate.value
  const rtl = !!gridRef.value && getComputedStyle(gridRef.value).direction === 'rtl'
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

defineExpose({
  /** Donne le focus au jour actif */
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
        @click="changeMonth(-1)"
      >
        <ChevronLeftIcon
          class="su-calendar__nav-icon"
          aria-hidden="true"
        />
      </button>
      <div
        :id="titleId"
        class="su-calendar__title"
      >
        {{ monthLabel }}
      </div>
      <button
        type="button"
        class="su-calendar__nav"
        :aria-label="nextText"
        :disabled="!canGoNext"
        @click="changeMonth(1)"
      >
        <ChevronRightIcon
          class="su-calendar__nav-icon"
          aria-hidden="true"
        />
      </button>
    </div>

    <table
      ref="gridRef"
      role="grid"
      class="su-calendar__grid"
      :aria-labelledby="titleId"
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
              :class="[
                'su-calendar__day',
                {
                  'su-calendar__day--selected': isSameDay(day, safeModel),
                  'su-calendar__day--today': isSameDay(day, today),
                  'su-calendar__day--disabled': isDisabled(day)
                }
              ]"
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
  </div>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// CALENDAR — cases rondes de 36px (32px dès `sm`), jour choisi en
// couleur primaire, aujourd'hui souligné d'un point.
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

  .su-calendar__grid tr {
    border: 0;
    background: none;
  }

  .su-calendar__weekday,
  .su-calendar__day,
  .su-calendar__empty {
    width: var(--_su-calendar-cell);
    height: var(--_su-calendar-cell);
    padding: 0;
    border: 0;
    background: none;
    text-align: center;
    vertical-align: middle;
  }

  .su-calendar__weekday {
    height: 1.75rem;
    color: var(--su-text-tertiary);
    font-size: var(--su-font-size-xs);
    font-weight: var(--su-font-weight-medium);
  }

  .su-calendar__day {
    position: relative;
    border-radius: var(--su-radius-md);
    font-variant-numeric: tabular-nums;
    cursor: pointer;
    outline: none;

    @include transition(background-color, color);

    &:hover:not(.su-calendar__day--selected, .su-calendar__day--disabled) {
      background-color: var(--su-bg-accent);
    }

    &:focus-visible {
      @include focus-ring($offset: 0);
    }

    // Aujourd'hui : point sous le chiffre
    &--today::after {
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

    &--selected {
      background-color: var(--su-primary-default);
      color: var(--su-primary-text);
      font-weight: var(--su-font-weight-semibold);
    }

    &--disabled {
      color: var(--su-text-disabled);
      text-decoration: line-through;
      cursor: not-allowed;
    }

    @include high-contrast {
      &--selected {
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

.su-calendar__title {
  font-weight: var(--su-font-weight-semibold);
}

.su-calendar__nav {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
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
