<script setup lang="ts">
import { computed, useId, useSlots, watch } from 'vue'
import { ChevronDownIcon, ChevronUpDownIcon, ChevronUpIcon } from '@heroicons/vue/24/outline'
import Checkbox from '../atoms/Checkbox.vue'
import Skeleton from '../atoms/Skeleton.vue'
import Pagination from '../molecules/Pagination.vue'
import type { DataTableColumn, DataTableProps, DataTableSort } from '@/types'
import { useLocale } from '@/composables/useLocale'
import { useAnnouncer } from '@/composables/useAnnouncer'

// ============================================================
// DATA TABLE — tableau de données sur un vrai <table> : titre
// (<caption>), en-têtes de colonnes (scope="col") et de lignes
// (première colonne, scope="row").
// - Tri : bouton dans l'en-tête, aria-sort sur la colonne triée,
//   changement annoncé ; croissant → décroissant → sans tri.
// - Sélection : cases à cocher nommées par la ligne, case « tout
//   sélectionner » (état mixte) sur les lignes affichées.
// - Pagination locale (pageSize) ou serveur (manual + total).
// - Zone de défilement focusable et nommée par le titre.
// ============================================================

const props = withDefaults(defineProps<DataTableProps>(), {
  columns: () => [],
  rows: () => [],
  rowKey: 'id',
  captionHidden: false,
  selectable: false,
  manual: false,
  loading: false,
  striped: false,
  size: 'md',
  stickyHeader: false
})

const sort = defineModel<DataTableSort | null>('sort', { default: null })
const page = defineModel<number>('page', { default: 1 })
const selected = defineModel<(string | number)[]>('selected', { default: () => [] })

type Row = Record<string, any>

const { t, locale } = useLocale()
const { announce } = useAnnouncer()
const slots = useSlots()

const captionId = `data-table-caption-${useId()}`
const hasCaption = computed(() => !!(props.caption || slots.caption))
const emptyText = computed(() => props.emptyText ?? t('dataTable.empty'))

const keyOf = (row: Row): string | number =>
  typeof props.rowKey === 'function' ? props.rowKey(row) : row[props.rowKey]

// ### Tri

const collator = computed(() => {
  try {
    return new Intl.Collator(props.locale ?? locale.value.code, { numeric: true, sensitivity: 'base' })
  } catch {
    return new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })
  }
})

const isEmpty = (value: unknown) => value === null || value === undefined || value === ''

const compareValues = (a: unknown, b: unknown): number => {
  if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime()
  if (typeof a === 'number' && typeof b === 'number') return a - b
  if (typeof a === 'boolean' && typeof b === 'boolean') return Number(a) - Number(b)
  return collator.value.compare(String(a), String(b))
}

const sortedRows = computed<Row[]>(() => {
  const current = sort.value
  if (props.manual || !current) return props.rows
  const column = props.columns.find((item) => item.key === current.key)
  if (!column) return props.rows
  const factor = current.direction === 'asc' ? 1 : -1

  // Tri stable ; les cellules vides restent à la fin dans les deux sens
  return props.rows
    .map((row, index) => ({ row, index }))
    .sort((x, y) => {
      if (column.sortFn) return column.sortFn(x.row, y.row) * factor || x.index - y.index
      const a = x.row[column.key]
      const b = y.row[column.key]
      if (isEmpty(a) || isEmpty(b)) {
        if (isEmpty(a) && isEmpty(b)) return x.index - y.index
        return isEmpty(a) ? 1 : -1
      }
      return compareValues(a, b) * factor || x.index - y.index
    })
    .map((entry) => entry.row)
})

const toggleSort = (column: DataTableColumn) => {
  const current = sort.value
  let next: DataTableSort | null
  if (!current || current.key !== column.key) next = { key: column.key, direction: 'asc' }
  else if (current.direction === 'asc') next = { key: column.key, direction: 'desc' }
  else next = null

  sort.value = next
  if (props.pageSize) page.value = 1
  announce(next
    ? t(next.direction === 'asc' ? 'dataTable.sortAscending' : 'dataTable.sortDescending', { column: column.label })
    : t('dataTable.sortCleared'))
}

const ariaSort = (column: DataTableColumn) => {
  if (sort.value?.key !== column.key) return undefined
  return sort.value.direction === 'asc' ? 'ascending' : 'descending'
}

const sortIcon = (column: DataTableColumn) => {
  if (sort.value?.key !== column.key) return ChevronUpDownIcon
  return sort.value.direction === 'asc' ? ChevronUpIcon : ChevronDownIcon
}

// ### Pagination

const totalRows = computed(() => (props.manual ? props.total ?? props.rows.length : sortedRows.value.length))
const pageCount = computed(() => (props.pageSize ? Math.max(1, Math.ceil(totalRows.value / props.pageSize)) : 1))

watch(pageCount, (count) => {
  if (page.value > count) page.value = count
})

const visibleRows = computed<Row[]>(() => {
  if (!props.pageSize || props.manual) return sortedRows.value
  const start = (page.value - 1) * props.pageSize
  return sortedRows.value.slice(start, start + props.pageSize)
})

// ### Sélection (sur les lignes affichées)

const selectedSet = computed(() => new Set(selected.value))
const visibleKeys = computed(() => visibleRows.value.map(keyOf))
const selectedVisible = computed(() => visibleKeys.value.filter((key) => selectedSet.value.has(key)).length)
const allSelected = computed(() => visibleKeys.value.length > 0 && selectedVisible.value === visibleKeys.value.length)
const someSelected = computed(() => selectedVisible.value > 0 && !allSelected.value)

const toggleAll = (checked: boolean) => {
  const keys = visibleKeys.value
  selected.value = checked
    ? [...new Set([...selected.value, ...keys])]
    : selected.value.filter((key) => !keys.includes(key))
}

const toggleRow = (row: Row, checked: boolean) => {
  const key = keyOf(row)
  selected.value = checked ? [...selected.value, key] : selected.value.filter((item) => item !== key)
}

const rowLabelOf = (row: Row) => props.rowLabel?.(row) ?? String(row[props.columns[0]?.key] ?? keyOf(row))

// ### Affichage

const display = (column: DataTableColumn, row: Row) => {
  const value = row[column.key]
  if (column.format) return column.format(value, row)
  return isEmpty(value) ? '' : String(value)
}

const columnCount = computed(() => props.columns.length + (props.selectable ? 1 : 0))
const skeletonRows = computed(() => Math.min(props.pageSize ?? 5, 10))

const classes = computed(() => [
  'su-data-table',
  `su-data-table--${props.size}`,
  {
    'su-data-table--striped': props.striped,
    'su-data-table--sticky': props.stickyHeader
  }
])

const cellClasses = (column: DataTableColumn) => [
  'su-data-table__cell',
  `su-data-table__cell--${column.align ?? 'start'}`
]
</script>

<template>
  <div :class="classes">
    <div
      class="su-data-table__scroll"
      role="region"
      tabindex="0"
      :aria-labelledby="hasCaption ? captionId : undefined"
      :style="maxHeight ? { maxHeight } : undefined"
    >
      <table
        class="su-data-table__table"
        :aria-busy="loading ? 'true' : undefined"
      >
        <caption
          v-if="hasCaption"
          :id="captionId"
          :class="['su-data-table__caption', { 'su-data-table__caption--hidden': captionHidden }]"
        >
          <slot name="caption">
            {{ caption }}
          </slot>
        </caption>

        <thead class="su-data-table__head">
          <tr class="su-data-table__row">
            <th
              v-if="selectable"
              scope="col"
              class="su-data-table__cell su-data-table__cell--select"
            >
              <Checkbox
                :model-value="allSelected"
                :indeterminate="someSelected"
                :disabled="loading || !visibleRows.length"
                :aria-label="t('dataTable.selectAll')"
                size="sm"
                @update:model-value="toggleAll"
              />
            </th>
            <th
              v-for="column in columns"
              :key="column.key"
              scope="col"
              :class="cellClasses(column)"
              :style="column.width ? { width: column.width } : undefined"
              :aria-sort="column.sortable ? ariaSort(column) : undefined"
            >
              <button
                v-if="column.sortable && !loading"
                type="button"
                class="su-data-table__sort"
                @click="toggleSort(column)"
              >
                <slot
                  :name="`header-${column.key}`"
                  :column="column"
                >
                  <span :class="{ 'su-data-table__label--hidden': column.hideLabel }">{{ column.label }}</span>
                </slot>
                <component
                  :is="sortIcon(column)"
                  :class="['su-data-table__sort-icon', { 'su-data-table__sort-icon--active': sort?.key === column.key }]"
                  aria-hidden="true"
                />
              </button>
              <slot
                v-else
                :name="`header-${column.key}`"
                :column="column"
              >
                <span :class="{ 'su-data-table__label--hidden': column.hideLabel }">{{ column.label }}</span>
              </slot>
            </th>
          </tr>
        </thead>

        <tbody class="su-data-table__body">
          <template v-if="loading">
            <tr
              v-for="line in skeletonRows"
              :key="`loading-${line}`"
              class="su-data-table__row"
            >
              <td
                v-for="cell in columnCount"
                :key="cell"
                class="su-data-table__cell"
              >
                <span
                  v-if="line === 1 && cell === 1"
                  class="su-data-table__label--hidden"
                >{{ t('common.loading') }}</span>
                <Skeleton :width="cell === 1 && selectable ? '1rem' : '70%'" />
              </td>
            </tr>
          </template>

          <tr
            v-else-if="!visibleRows.length"
            class="su-data-table__row"
          >
            <td
              :colspan="columnCount"
              class="su-data-table__cell su-data-table__empty"
            >
              <slot name="empty">
                {{ emptyText }}
              </slot>
            </td>
          </tr>

          <template v-else>
            <tr
              v-for="(row, rowIndex) in visibleRows"
              :key="keyOf(row)"
              :class="['su-data-table__row', { 'su-data-table__row--selected': selectedSet.has(keyOf(row)) }]"
            >
              <td
                v-if="selectable"
                class="su-data-table__cell su-data-table__cell--select"
              >
                <Checkbox
                  :model-value="selectedSet.has(keyOf(row))"
                  :aria-label="t('dataTable.selectRow', { label: rowLabelOf(row) })"
                  size="sm"
                  @update:model-value="toggleRow(row, $event)"
                />
              </td>
              <component
                :is="columnIndex === 0 ? 'th' : 'td'"
                v-for="(column, columnIndex) in columns"
                :key="column.key"
                :scope="columnIndex === 0 ? 'row' : undefined"
                :class="cellClasses(column)"
              >
                <slot
                  :name="`cell-${column.key}`"
                  :row="row"
                  :value="row[column.key]"
                  :index="rowIndex"
                >
                  {{ display(column, row) }}
                </slot>
              </component>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <Pagination
      v-if="pageSize && pageCount > 1"
      v-model="page"
      class="su-data-table__pagination"
      :page-count="pageCount"
      :disabled="loading"
      size="sm"
    />
  </div>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// DATA TABLE — cadre arrondi, en-tête atténué, lignes séparées par
// un trait. Sélecteurs préfixés par .su-data-table : la page hôte
// stylise souvent table, th, td et tr:nth-child (documentation, CMS).
// ============================================================

.su-data-table {
  --_su-table-cell-y: 0.625rem;
  --_su-table-cell-x: 0.875rem;

  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 0;
  font-size: var(--su-font-size-sm);
  color: var(--su-text-primary);

  &--sm {
    --_su-table-cell-y: 0.375rem;
    --_su-table-cell-x: 0.625rem;

    font-size: var(--su-font-size-xs);
  }

  &--lg {
    --_su-table-cell-y: 0.875rem;
    --_su-table-cell-x: 1rem;

    font-size: var(--su-font-size-base);
  }

  .su-data-table__scroll {
    overflow: auto;
    border: 1px solid var(--su-border-alpha);
    border-radius: var(--su-radius-container);
    background-color: var(--su-bg-surface);
    background-clip: padding-box;
    outline: none;

    &:focus-visible {
      @include focus-ring;
    }

    @include high-contrast {
      border-width: 2px;
    }
  }

  .su-data-table__table {
    display: table;
    width: 100%;
    margin: 0;
    overflow: visible;
    border: 0;
    border-collapse: separate;
    border-spacing: 0;
  }

  .su-data-table__caption {
    padding: var(--_su-table-cell-y) var(--_su-table-cell-x);
    border-bottom: 1px solid var(--su-border-alpha);
    font-weight: var(--su-font-weight-semibold);
    text-align: start;
    caption-side: top;

    &--hidden {
      @include sr-only;
    }
  }

  .su-data-table__body .su-data-table__row,
  .su-data-table__head .su-data-table__row {
    border: 0;
    background-color: transparent;
  }

  .su-data-table__cell {
    padding: var(--_su-table-cell-y) var(--_su-table-cell-x);
    border: 0;
    border-top: 1px solid var(--su-border-alpha);
    font-weight: var(--su-font-weight-normal);
    line-height: var(--su-line-height-normal);
    text-align: start;
    vertical-align: middle;

    &--center {
      text-align: center;
    }

    &--end {
      text-align: end;
      font-variant-numeric: tabular-nums;
    }

    &--select {
      width: 1px;
      padding-inline-end: 0;

      // Case centrée verticalement dans la ligne
      .su-checkbox {
        display: flex;
        vertical-align: middle;
      }
    }
  }

  .su-data-table__head .su-data-table__cell {
    border-top: 0;
    background-color: var(--su-bg-muted);
    color: var(--su-text-secondary);
    font-size: var(--su-font-size-xs);
    font-weight: var(--su-font-weight-medium);
    white-space: nowrap;
  }

  // En-tête collant : fond opaque (surface + voile atténué)
  &--sticky .su-data-table__head .su-data-table__cell {
    position: sticky;
    top: 0;
    z-index: 1;
    background: linear-gradient(var(--su-bg-muted), var(--su-bg-muted)), var(--su-bg-surface);
    box-shadow: inset 0 -1px 0 var(--su-border-alpha);
  }

  &--striped .su-data-table__body .su-data-table__row:nth-child(2n) {
    background-color: var(--su-bg-muted);
  }

  .su-data-table__body .su-data-table__row:hover {
    background-color: var(--su-bg-accent);
  }

  .su-data-table__body .su-data-table__row--selected,
  .su-data-table__body .su-data-table__row--selected:hover {
    background-color: with-alpha(primary-default, 6%);
  }

  .su-data-table__empty {
    padding-block: 2rem;
    color: var(--su-text-tertiary);
    text-align: center;
  }
}

.su-data-table__sort {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  margin: -0.125rem -0.25rem;
  padding: 0.125rem 0.25rem;
  border: 0;
  border-radius: var(--su-radius-sm);
  background: none;
  color: inherit;
  font: inherit;
  cursor: pointer;

  @include transition(color, background-color);

  &:hover {
    background-color: var(--su-bg-accent);
    color: var(--su-text-primary);
  }

  &:focus-visible {
    @include focus-ring($offset: 0);
  }

  .su-data-table__cell--end & {
    flex-direction: row-reverse;
  }
}

.su-data-table__sort-icon {
  flex-shrink: 0;
  width: 0.875rem;
  height: 0.875rem;
  opacity: 0.5;

  &--active {
    color: var(--su-text-primary);
    opacity: 1;
  }
}

.su-data-table__label--hidden {
  @include sr-only;
}

.su-data-table__pagination {
  align-self: flex-end;
}
</style>
