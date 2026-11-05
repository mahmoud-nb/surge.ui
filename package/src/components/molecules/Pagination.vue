<script setup lang="ts">
import { computed } from 'vue'
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline'
import type { PaginationProps } from '@/types'
import { useLocale } from '@/composables/useLocale'
import { getPaginationItems } from '@/utils/pagination'

// ============================================================
// PAGINATION — <nav> nommée, page courante en aria-current="page".
// Aux extrémités, précédent / suivant restent focusables
// (aria-disabled plutôt que disabled) : le focus n'est pas perdu quand
// on atteint la première ou la dernière page.
// ============================================================

const props = withDefaults(defineProps<PaginationProps>(), {
  pageSize: 10,
  siblings: 1,
  boundaries: 1,
  showEdges: false,
  size: 'md',
  disabled: false
})

const page = defineModel<number>({ default: 1 })

const emit = defineEmits<{
  change: [page: number]
}>()

const { t } = useLocale()
const label = computed(() => props.ariaLabel ?? t('pagination.label'))
const previousText = computed(() => props.previousLabel ?? t('pagination.previous'))
const nextText = computed(() => props.nextLabel ?? t('pagination.next'))
const firstText = computed(() => props.firstLabel ?? t('pagination.first'))
const lastText = computed(() => props.lastLabel ?? t('pagination.last'))
const pageText = (value: number) => props.pageLabel?.(value) ?? t('pagination.page', { page: value })

const count = computed(() => {
  const pages = props.pageCount ?? Math.ceil((props.total ?? 0) / Math.max(1, props.pageSize))
  return Math.max(1, Math.floor(pages) || 1)
})

const current = computed(() => Math.min(Math.max(1, Math.round(page.value) || 1), count.value))
const isFirst = computed(() => current.value <= 1)
const isLast = computed(() => current.value >= count.value)

const items = computed(() => getPaginationItems({
  page: current.value,
  count: count.value,
  siblings: props.siblings,
  boundaries: props.boundaries
}))

const classes = computed(() => [
  'su-pagination',
  `su-pagination--${props.size}`,
  { 'su-pagination--disabled': props.disabled }
])

const goTo = (target: number) => {
  if (props.disabled) return
  const next = Math.min(Math.max(1, target), count.value)
  if (next === current.value) return
  page.value = next
  emit('change', next)
}

const ariaDisabled = (inactive: boolean) => (inactive || props.disabled ? 'true' : undefined)
</script>

<template>
  <nav
    :class="classes"
    :aria-label="label"
  >
    <ul class="su-pagination__list">
      <li
        v-if="showEdges"
        class="su-pagination__item"
      >
        <button
          type="button"
          class="su-pagination__button su-pagination__button--nav"
          :aria-label="firstText"
          :aria-disabled="ariaDisabled(isFirst)"
          @click="goTo(1)"
        >
          <ChevronDoubleLeftIcon
            class="su-pagination__icon"
            aria-hidden="true"
          />
        </button>
      </li>
      <li class="su-pagination__item">
        <button
          type="button"
          class="su-pagination__button su-pagination__button--nav"
          :aria-label="previousText"
          :aria-disabled="ariaDisabled(isFirst)"
          @click="goTo(current - 1)"
        >
          <ChevronLeftIcon
            class="su-pagination__icon"
            aria-hidden="true"
          />
        </button>
      </li>

      <template
        v-for="item in items"
        :key="typeof item === 'number' ? `page-${item}` : item"
      >
        <li
          v-if="typeof item !== 'number'"
          class="su-pagination__item su-pagination__ellipsis"
          aria-hidden="true"
        >
          …
        </li>
        <li
          v-else
          class="su-pagination__item"
        >
          <button
            type="button"
            :class="['su-pagination__button', { 'su-pagination__button--current': item === current }]"
            :aria-label="pageText(item)"
            :aria-current="item === current ? 'page' : undefined"
            :aria-disabled="ariaDisabled(false)"
            @click="goTo(item)"
          >
            {{ item }}
          </button>
        </li>
      </template>

      <li class="su-pagination__item">
        <button
          type="button"
          class="su-pagination__button su-pagination__button--nav"
          :aria-label="nextText"
          :aria-disabled="ariaDisabled(isLast)"
          @click="goTo(current + 1)"
        >
          <ChevronRightIcon
            class="su-pagination__icon"
            aria-hidden="true"
          />
        </button>
      </li>
      <li
        v-if="showEdges"
        class="su-pagination__item"
      >
        <button
          type="button"
          class="su-pagination__button su-pagination__button--nav"
          :aria-label="lastText"
          :aria-disabled="ariaDisabled(isLast)"
          @click="goTo(count)"
        >
          <ChevronDoubleRightIcon
            class="su-pagination__icon"
            aria-hidden="true"
          />
        </button>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// PAGINATION — boutons carrés « ghost », page courante en « outline ».
// Tailles : hauteurs des contrôles (compactes dès `sm`).
// ============================================================

.su-pagination {
  --_su-pagination-size: var(--su-control-height-md);

  font-size: var(--su-font-size-base);

  @include up('sm') {
    --_su-pagination-size: var(--su-control-height-md-compact);

    font-size: var(--su-font-size-sm);
  }

  &--sm {
    --_su-pagination-size: var(--su-control-height-sm);

    font-size: var(--su-font-size-sm);

    @include up('sm') {
      --_su-pagination-size: var(--su-control-height-sm-compact);
    }
  }

  &--lg {
    --_su-pagination-size: var(--su-control-height-lg);

    font-size: var(--su-font-size-base);

    @include up('sm') {
      --_su-pagination-size: var(--su-control-height-lg-compact);
    }
  }

  // Préfixés : la page hôte stylise souvent ul et li (documentation, CMS)
  .su-pagination__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.25rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .su-pagination__item {
    display: inline-flex;
    margin: 0;
  }
}

.su-pagination__button {
  @include button-base;
  @include button-variant('ghost');

  min-width: var(--_su-pagination-size);
  height: var(--_su-pagination-size);
  padding: 0 0.5rem;
  font-size: inherit;
  font-variant-numeric: tabular-nums;

  &--current {
    @include button-variant('outline');
  }

  &--nav {
    padding: 0;
  }

  &[aria-disabled='true'] {
    @include button-disabled;
  }
}

.su-pagination__icon {
  @include button-icon;

  [dir='rtl'] & {
    scale: -1 1;
  }
}

.su-pagination__ellipsis {
  justify-content: center;
  min-width: var(--_su-pagination-size);
  color: var(--su-text-tertiary);
  user-select: none;
}
</style>
