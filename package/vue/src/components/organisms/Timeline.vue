<script setup lang="ts">
import { computed, useId } from 'vue'
import type { TimelineItem, TimelineProps } from '@/types'
import { useLocale } from '@/composables/useLocale'

// ============================================================
// TIMELINE — fil d'activité : événements datés (titre, auteur,
// heure, description, icône), regroupés par jour sous un titre
// (« Aujourd'hui », « Hier », puis la date complète).
// - Listes ordonnées, dates en <time datetime> (ISO)
// - Libellés de jour et heures dans la langue courante (Intl)
// - L'ordre des événements est celui de `items`
// ============================================================

const props = withDefaults(defineProps<TimelineProps>(), {
  groupByDay: true,
  headingLevel: 3
})

defineSlots<{
  /** Contenu d'un événement (titre, méta, description) */
  item?(props: { item: TimelineItem; time: string; datetime: string }): any
}>()

const { locale } = useLocale()
const baseId = `su-timeline-${useId()}`

const toDate = (value: Date | string | number) => (value instanceof Date ? value : new Date(value))
const isValid = (date: Date) => !Number.isNaN(date.getTime())
const dayKey = (date: Date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
const capitalize = (text: string) => text.charAt(0).toLocaleUpperCase(locale.value.code) + text.slice(1)

const reference = computed(() => (props.now !== undefined ? toDate(props.now) : new Date()))

const format = (date: Date, options: Intl.DateTimeFormatOptions) => {
  try {
    return new Intl.DateTimeFormat(locale.value.code, options).format(date)
  } catch {
    return date.toLocaleString()
  }
}

/** « Aujourd'hui », « Hier », « Demain », sinon la date complète */
const dayLabel = (date: Date) => {
  const startOf = (value: Date) => new Date(value.getFullYear(), value.getMonth(), value.getDate()).getTime()
  const days = Math.round((startOf(date) - startOf(reference.value)) / 86_400_000)
  if (Math.abs(days) <= 1) {
    try {
      return capitalize(new Intl.RelativeTimeFormat(locale.value.code, { numeric: 'auto' }).format(days, 'day'))
    } catch {
      // Intl.RelativeTimeFormat indisponible : date complète
    }
  }
  return capitalize(format(date, { dateStyle: 'full' }))
}

interface Entry {
  key: string | number
  item: TimelineItem
  time: string
  datetime: string
}
interface Group {
  key: string
  label?: string
  entries: Entry[]
}

const groups = computed<Group[]>(() => {
  const result: Group[] = []
  const byKey = new Map<string, Group>()
  props.items.forEach((item, index) => {
    const date = toDate(item.date)
    const valid = isValid(date)
    const entry: Entry = {
      key: item.id ?? index,
      item,
      // Groupé par jour : l'heure suffit ; sinon date et heure
      time: valid ? format(date, props.groupByDay ? { timeStyle: 'short' } : { dateStyle: 'medium', timeStyle: 'short' }) : '',
      datetime: valid ? date.toISOString() : ''
    }
    const key = props.groupByDay && valid ? dayKey(date) : 'all'
    let group = byKey.get(key)
    if (!group) {
      group = { key, label: props.groupByDay && valid ? dayLabel(date) : undefined, entries: [] }
      byKey.set(key, group)
      result.push(group)
    }
    group.entries.push(entry)
  })
  return result
})
</script>

<template>
  <div class="su-timeline">
    <div
      v-for="group in groups"
      :key="group.key"
      class="su-timeline__group"
    >
      <component
        :is="`h${headingLevel}`"
        v-if="group.label"
        :id="`${baseId}-${group.key}`"
        class="su-timeline__day"
      >
        {{ group.label }}
      </component>

      <ol
        class="su-timeline__list"
        :aria-labelledby="group.label ? `${baseId}-${group.key}` : undefined"
      >
        <li
          v-for="entry in group.entries"
          :key="entry.key"
          :class="['su-timeline__item', `su-timeline__item--${entry.item.variant ?? 'default'}`]"
        >
          <span
            class="su-timeline__marker"
            aria-hidden="true"
          >
            <component
              :is="entry.item.icon"
              v-if="entry.item.icon"
              class="su-timeline__icon"
            />
            <span
              v-else
              class="su-timeline__dot"
            />
          </span>

          <div class="su-timeline__content">
            <slot
              name="item"
              :item="entry.item"
              :time="entry.time"
              :datetime="entry.datetime"
            >
              <p class="su-timeline__title">
                {{ entry.item.title }}
              </p>
              <p
                v-if="entry.item.author || entry.time"
                class="su-timeline__meta"
              >
                <span v-if="entry.item.author">{{ entry.item.author }}</span>
                <span
                  v-if="entry.item.author && entry.time"
                  aria-hidden="true"
                > · </span>
                <time
                  v-if="entry.time"
                  :datetime="entry.datetime"
                >{{ entry.time }}</time>
              </p>
              <p
                v-if="entry.item.description"
                class="su-timeline__description"
              >
                {{ entry.item.description }}
              </p>
            </slot>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// TIMELINE — pastilles reliées par un trait vertical (début de
// ligne, côté droit en RTL), contenu à côté
// ============================================================

.su-timeline {
  --su-timeline-marker: 1.75rem;

  display: flex;
  flex-direction: column;
  gap: $spacing-6;

  // Sélecteurs imbriqués : résistent aux styles de contenu de la page (h3, ol, li, p)
  .su-timeline__day {
    margin: 0 0 $spacing-3;
    padding: 0;
    border: 0;
    color: var(--su-text-secondary);
    font-size: var(--su-font-size-sm);
    font-weight: var(--su-font-weight-semibold);
    line-height: 1.4;
    letter-spacing: normal;
  }

  .su-timeline__list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .su-timeline__item {
    position: relative;
    display: flex;
    gap: $spacing-3;
    margin: 0;
    padding-block-end: $spacing-5;

    // Trait qui relie la pastille à la suivante
    &:not(:last-child)::before {
      position: absolute;
      inset-block: calc(var(--su-timeline-marker) + 0.25rem) 0.25rem;
      inset-inline-start: calc(var(--su-timeline-marker) / 2 - 0.5px);
      inline-size: 1px;
      background-color: var(--su-border-default);
      content: '';
    }

    &:last-child {
      padding-block-end: 0;
    }
  }

  .su-timeline__marker {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    inline-size: var(--su-timeline-marker);
    block-size: var(--su-timeline-marker);
    border-radius: 50%;
    background-color: var(--su-bg-muted);
    color: var(--su-text-secondary);
  }

  .su-timeline__icon {
    inline-size: 0.875rem;
    block-size: 0.875rem;
  }

  .su-timeline__dot {
    inline-size: 0.5rem;
    block-size: 0.5rem;
    border-radius: 50%;
    background-color: currentcolor;
  }

  .su-timeline__item--primary .su-timeline__marker {
    background-color: with-alpha(primary-default, 12%);
    color: var(--su-primary-default);
  }

  @each $state in (success, warning, error) {
    .su-timeline__item--#{$state} .su-timeline__marker {
      background-color: with-alpha(state-#{$state}, 14%);
      color: var(--su-state-#{$state}-fg);
    }
  }

  .su-timeline__content {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 0.125rem;
    min-inline-size: 0;
    padding-block-start: 0.25rem;
  }

  .su-timeline__title {
    margin: 0;
    color: var(--su-text-primary);
    font-size: var(--su-font-size-sm);
    font-weight: var(--su-font-weight-medium);
    line-height: 1.4;
  }

  .su-timeline__meta {
    margin: 0;
    color: var(--su-text-tertiary);
    font-size: var(--su-font-size-xs);
    line-height: 1.4;
  }

  .su-timeline__description {
    margin: $spacing-1 0 0;
    color: var(--su-text-secondary);
    font-size: var(--su-font-size-sm);
    line-height: 1.5;
  }
}
</style>
