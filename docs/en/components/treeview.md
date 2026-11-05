<script setup>
import { ref } from 'vue'
import { DocumentIcon, FolderIcon } from '@heroicons/vue/24/outline'

const files = [
  {
    id: 'src', label: 'src', icon: FolderIcon,
    children: [
      { id: 'components', label: 'components', icon: FolderIcon, children: [
        { id: 'button', label: 'Button.vue', icon: DocumentIcon },
        { id: 'dialog', label: 'Dialog.vue', icon: DocumentIcon }
      ] },
      { id: 'index', label: 'index.ts', icon: DocumentIcon }
    ]
  },
  { id: 'docs', label: 'docs', icon: FolderIcon, children: [{ id: 'guide', label: 'guide.md', icon: DocumentIcon }] },
  { id: 'package', label: 'package.json', icon: DocumentIcon }
]
const expanded = ref(['src'])
const selected = ref('index')
</script>

# TreeView

A tree: files, categories, org charts. Items expand, can be browsed with the keyboard and can be selected.

## Usage

### Basic usage

<div class="component-demo">
  <div class="demo-section">
    <div style="max-width: 18rem">
      <SuTreeView v-model:expanded="expanded" v-model:selected="selected" :items="files" aria-label="Project files" />
    </div>
    <p>Selected: {{ selected ?? '—' }}</p>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DocumentIcon, FolderIcon } from '@heroicons/vue/24/outline'

const files = [
  { id: 'src', label: 'src', icon: FolderIcon, children: [
    { id: 'index', label: 'index.ts', icon: DocumentIcon }
  ] },
  { id: 'package', label: 'package.json', icon: DocumentIcon }
]
const expanded = ref(['src'])
const selected = ref(null)
</script>

<template>
  <SuTreeView v-model:expanded="expanded" v-model:selected="selected" :items="files" aria-label="Project files" />
</template>
```

### Navigation tree

With `:selectable="false"`, no item is marked as selected: `Enter` expands, and the `select` event is used to navigate.

```vue
<SuTreeView :items="sections" :selectable="false" aria-label="Table of contents" @select="(item) => router.push(item.id)" />
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `TreeItem[]` | `[]` | Items |
| `selectable` | `boolean` | `true` | An item can be selected (`aria-selected`) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `ariaLabel` / `ariaLabelledBy` | `string` | - | Tree name (required) |

### TreeItem

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string \| number` | Unique identifier |
| `label` | `string` | Label |
| `children` | `TreeItem[]` | Children |
| `icon` | `Component` | Icon |
| `disabled` | `boolean` | Inactive item (focusable, not selectable) |

### v-model and events

| Name | Payload | Description |
|------|---------|-------------|
| `v-model:expanded` | `(string \| number)[]` | Expanded items |
| `v-model:selected` | `string \| number \| null` | Selected item |
| `select` | `TreeItem` | Item activated (click, `Enter`, `Space`) |

## Accessibility

- `role="tree"`, `treeitem` and `group`; level (`aria-level`), position (`aria-posinset` / `aria-setsize`) and expanded state (`aria-expanded`) are announced.
- Each item is named by its own label only (`aria-labelledby`), without its children's text.
- A single tab stop: the focused item, otherwise the selected item, otherwise the first one.
- Keyboard: `↑` / `↓` visible items, `→` expands then moves to the first child, `←` collapses then moves to the parent (reversed in RTL), `Home` / `End`, typeahead, `*` expands siblings, `Enter` / `Space` selects.
