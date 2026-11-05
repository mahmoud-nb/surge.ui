<script setup>
import { ref } from 'vue'

const columns = [
  { key: 'name', label: 'Customer', sortable: true },
  { key: 'city', label: 'City', sortable: true },
  { key: 'orders', label: 'Orders', sortable: true, align: 'end' },
  { key: 'status', label: 'Status' }
]
const rows = [
  { id: 1, name: 'Émile A.', city: 'Paris', orders: 12, status: 'Active' },
  { id: 2, name: 'Adèle H.', city: 'Nantes', orders: 37, status: 'Paused' },
  { id: 3, name: 'Bruno O.', city: 'Évreux', orders: 4, status: 'Active' },
  { id: 4, name: 'Chloé V.', city: 'Marseille', orders: 111, status: 'Cancelled' },
  { id: 5, name: 'Damien C.', city: 'Bordeaux', orders: 8, status: 'Active' },
  { id: 6, name: 'Inès J.', city: 'Lyon', orders: 45, status: 'Paused' },
  { id: 7, name: 'Léa Q.', city: 'Lille', orders: 82, status: 'Active' }
]
const sort = ref(null)
const page = ref(1)
const selected = ref([])
const variant = (status) => (status === 'Active' ? 'success' : status === 'Paused' ? 'warning' : 'default')
</script>

# DataTable

A data table with sorting, row selection, pagination, loading and empty states, built on an accessible native `<table>`.

## Usage

### Sorting, selection and pagination

<div class="component-demo">
  <div class="demo-section">
    <SuDataTable v-model:sort="sort" v-model:page="page" v-model:selected="selected" :columns="columns" :rows="rows" caption="Customers" selectable :page-size="5">
      <template #cell-status="{ value }">
        <SuTag :label="value" :variant="variant(value)" size="sm" />
      </template>
    </SuDataTable>
    <p>Selection: {{ selected.length ? selected.join(', ') : 'none' }}</p>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const columns = [
  { key: 'name', label: 'Customer', sortable: true },
  { key: 'city', label: 'City', sortable: true },
  { key: 'orders', label: 'Orders', sortable: true, align: 'end' },
  { key: 'status', label: 'Status' }
]
const rows = ref([/* { id, name, city, orders, status } */])
const sort = ref(null)
const page = ref(1)
const selected = ref([])
</script>

<template>
  <SuDataTable
    v-model:sort="sort"
    v-model:page="page"
    v-model:selected="selected"
    :columns="columns"
    :rows="rows"
    caption="Customers"
    selectable
    :page-size="5"
  >
    <template #cell-status="{ value }">
      <SuTag :label="value" size="sm" />
    </template>
  </SuDataTable>
</template>
```

### Format, alignment and actions column

`format` changes the display without changing the sorted value; `hideLabel` visually hides a header (actions column) that is still read.

```js
const columns = [
  { key: 'revenue', label: 'Revenue', sortable: true, align: 'end',
    format: (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value) },
  { key: 'since', label: 'Customer since', sortable: true,
    format: (value) => value.toLocaleDateString('en-US') },
  { key: 'actions', label: 'Actions', hideLabel: true, align: 'end' }
]
```

### Server-side sorting and pagination

With `manual`, rows are shown as received: the table emits `update:sort` and `update:page`, the server returns the sorted page and `total` sets the page count.

```vue
<SuDataTable
  v-model:sort="sort"
  v-model:page="page"
  :columns="columns"
  :rows="pageRows"
  :total="total"
  :page-size="20"
  :loading="loading"
  manual
  caption="Orders"
  @update:sort="fetchPage"
  @update:page="fetchPage"
/>
```

### Loading and empty state

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons-vertical">
      <SuDataTable :columns="columns" :rows="rows" caption="Loading" caption-hidden loading :page-size="3" />
      <SuDataTable :columns="columns" :rows="[]" caption="No customers" caption-hidden empty-text="No customers match the filters." />
    </div>
  </div>
</div>

```vue
<SuDataTable :columns="columns" :rows="rows" :loading="loading" />
<SuDataTable :columns="columns" :rows="[]" empty-text="No customers match the filters." />
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `DataTableColumn[]` | `[]` | Columns |
| `rows` | `Record<string, any>[]` | `[]` | Rows |
| `rowKey` | `string \| (row) => string \| number` | `'id'` | Row identifier |
| `caption` | `string` | - | Table title, region name (or `caption` slot) |
| `captionHidden` | `boolean` | `false` | Title read but visually hidden |
| `selectable` | `boolean` | `false` | Selection checkboxes |
| `rowLabel` | `(row) => string` | first column | Row name for its checkbox |
| `pageSize` | `number` | - | Rows per page (pagination) |
| `manual` | `boolean` | `false` | Sorting and pagination done by the server |
| `total` | `number` | - | Total rows in `manual` mode |
| `loading` | `boolean` | `false` | Loading: skeletons and `aria-busy` |
| `emptyText` | `string` | `'No data'` (locale) | Empty state text (or `empty` slot) |
| `striped` | `boolean` | `false` | Alternating rows |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Density |
| `stickyHeader` | `boolean` | `false` | Sticky header (with `maxHeight`) |
| `maxHeight` | `string` | - | Maximum height (scrolling) |
| `locale` | `string` | component locale | Alphabetical sort language |

### DataTableColumn

| Property | Type | Description |
|----------|------|-------------|
| `key` | `string` | Row property |
| `label` | `string` | Header |
| `sortable` | `boolean` | Sortable column |
| `align` | `'start' \| 'center' \| 'end'` | Alignment (`end`: tabular figures) |
| `width` | `string` | Width |
| `format` | `(value, row) => string` | Displayed text |
| `sortFn` | `(a, b) => number` | Custom comparison |
| `hideLabel` | `boolean` | Visually hidden header |

### v-model

| Model | Type | Description |
|-------|------|-------------|
| `v-model:sort` | `{ key, direction: 'asc' \| 'desc' } \| null` | Current sort |
| `v-model:page` | `number` | Current page |
| `v-model:selected` | `(string \| number)[]` | Checked row ids |

### Slots

| Slot | Props | Description |
|------|-------|-------------|
| `cell-{key}` | `{ row, value, index }` | Cell content |
| `header-{key}` | `{ column }` | Header content |
| `caption` | - | Rich title |
| `empty` | - | Empty state (e.g. `SuEmptyState`) |

## Accessibility

- Native `<table>`: `<caption>`, column headers (`scope="col"`) and row headers (first column, `scope="row"`).
- Sorting: button in the header, `aria-sort` on the sorted column, announcement "Sorted by City, ascending". Language-aware alphabetical order (accents, numbers inside text), empty cells always last.
- Selection: each checkbox is named after its row ("Select Émile A."); the "Select all" checkbox carries the mixed state and acts on the displayed rows.
- The scroll area is focusable (keyboard scrolling) and named by the title.
- Loading: `aria-busy="true"` and a "Loading…" text read inside the table.
