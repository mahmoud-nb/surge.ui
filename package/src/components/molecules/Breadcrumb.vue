<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { ChevronRightIcon, EllipsisHorizontalIcon } from '@heroicons/vue/24/outline'
import type { BreadcrumbItem, BreadcrumbProps } from '@/types'
import { useLocale } from '@/composables/useLocale'

// ============================================================
// BREADCRUMB — fil d'Ariane (motif APG) : <nav> nommée, liste ordonnée,
// dernier élément marqué aria-current="page", séparateurs masqués aux
// lecteurs d'écran. Un chemin long se replie derrière un bouton « … ».
// ============================================================

const props = withDefaults(defineProps<BreadcrumbProps>(), {
  items: () => [],
  separator: 'chevron',
  size: 'md'
})

defineSlots<{
  /** Rendu d'un élément (ex. RouterLink) */
  item?: (props: { item: BreadcrumbItem; index: number; current: boolean }) => unknown
  /** Séparateur personnalisé */
  separator?: () => unknown
}>()

const { t } = useLocale()
const label = computed(() => props.ariaLabel ?? t('breadcrumb.label'))
const expandText = computed(() => props.expandLabel ?? t('breadcrumb.expand'))

const expanded = ref(false)
const listRef = ref<HTMLOListElement>()

interface Entry {
  key: string
  index: number
  item?: BreadcrumbItem
}

const lastIndex = computed(() => props.items.length - 1)

// Repli : premier élément, « … », puis les (maxItems - 1) derniers
const entries = computed<Entry[]>(() => {
  const all: Entry[] = props.items.map((item, index) => ({ key: `item-${index}`, index, item }))
  const max = props.maxItems
  if (expanded.value || !max || max < 2 || all.length <= max) return all
  return [all[0], { key: 'ellipsis', index: -1 }, ...all.slice(all.length - (max - 1))]
})

const classes = computed(() => [
  'su-breadcrumb',
  `su-breadcrumb--${props.size}`,
  `su-breadcrumb--${props.separator}`
])

// Après dépliage, le focus va au premier élément révélé (le bouton a disparu)
const expand = async () => {
  expanded.value = true
  await nextTick()
  const revealed = listRef.value?.querySelector<HTMLElement>('[data-index="1"]')
  const target = revealed?.matches('a, button, [tabindex]')
    ? revealed
    : revealed?.querySelector<HTMLElement>('a, button, [tabindex]')
  ;(target ?? listRef.value?.querySelector<HTMLElement>('a'))?.focus()
}
</script>

<template>
  <nav
    :class="classes"
    :aria-label="label"
  >
    <ol
      ref="listRef"
      class="su-breadcrumb__list"
    >
      <li
        v-for="(entry, position) in entries"
        :key="entry.key"
        class="su-breadcrumb__item"
        :data-index="entry.item ? entry.index : undefined"
      >
        <span
          v-if="position > 0"
          class="su-breadcrumb__separator"
          aria-hidden="true"
        >
          <slot name="separator">
            <ChevronRightIcon
              v-if="separator === 'chevron'"
              class="su-breadcrumb__chevron"
            />
            <template v-else>{{ separator === 'slash' ? '/' : '·' }}</template>
          </slot>
        </span>

        <button
          v-if="!entry.item"
          type="button"
          class="su-breadcrumb__ellipsis"
          :aria-label="expandText"
          @click="expand"
        >
          <EllipsisHorizontalIcon
            class="su-breadcrumb__icon"
            aria-hidden="true"
          />
        </button>

        <slot
          v-else
          name="item"
          :item="entry.item"
          :index="entry.index"
          :current="entry.index === lastIndex"
        >
          <component
            :is="entry.item.href ? 'a' : 'span'"
            :href="entry.item.href"
            :target="entry.item.href ? entry.item.target : undefined"
            :rel="entry.item.href && entry.item.target === '_blank' ? 'noopener noreferrer' : undefined"
            :class="['su-breadcrumb__link', { 'su-breadcrumb__link--current': entry.index === lastIndex }]"
            :aria-current="entry.index === lastIndex ? 'page' : undefined"
          >
            <component
              :is="entry.item.icon"
              v-if="entry.item.icon"
              class="su-breadcrumb__icon"
              aria-hidden="true"
            />
            <span :class="['su-breadcrumb__label', { 'su-breadcrumb__label--hidden': entry.item.icon && entry.item.iconOnly }]">
              {{ entry.item.label }}
            </span>
          </component>
        </slot>
      </li>
    </ol>
  </nav>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// BREADCRUMB — liens discrets, page courante appuyée
// Sélecteurs préfixés par .su-breadcrumb : la page hôte stylise
// souvent ol, li et a (documentation, CMS).
// ============================================================

.su-breadcrumb {
  font-size: var(--su-font-size-base);
  line-height: 1.4;

  @include up('sm') {
    font-size: var(--su-font-size-sm);
  }

  &--sm {
    font-size: var(--su-font-size-sm);

    @include up('sm') {
      font-size: var(--su-font-size-xs);
    }
  }

  &--lg {
    font-size: var(--su-font-size-base);

    @include up('sm') {
      font-size: var(--su-font-size-base);
    }
  }

  .su-breadcrumb__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.25rem 0.375rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .su-breadcrumb__item {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    min-width: 0;
    margin: 0;
  }

  .su-breadcrumb__link {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    min-width: 0;
    border-radius: var(--su-radius-sm);
    color: var(--su-text-tertiary);
    font-weight: var(--su-font-weight-normal);
    text-decoration: none;

    @include transition(color);

    &[href]:hover {
      color: var(--su-text-primary);
    }

    &:focus-visible {
      @include focus-ring;
    }

    &--current {
      color: var(--su-text-primary);
      font-weight: var(--su-font-weight-medium);
    }
  }
}

.su-breadcrumb__label {
  @include truncate;

  &--hidden {
    @include sr-only;
  }
}

.su-breadcrumb__separator {
  display: inline-flex;
  align-items: center;
  color: var(--su-text-tertiary);
  opacity: 0.8;
  user-select: none;
}

.su-breadcrumb__chevron {
  width: 0.875em;
  height: 0.875em;

  [dir='rtl'] & {
    scale: -1 1;
  }
}

.su-breadcrumb__icon {
  flex-shrink: 0;
  width: 1em;
  height: 1em;
}

.su-breadcrumb__ellipsis {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  border: 0;
  border-radius: var(--su-radius-md);
  background: transparent;
  color: var(--su-text-tertiary);
  cursor: pointer;

  @include transition(background-color, color);
  @include touch-target-overlay;

  &:hover {
    background-color: var(--su-bg-accent);
    color: var(--su-text-primary);
  }

  &:focus-visible {
    @include focus-ring($offset: 0);
  }
}
</style>
