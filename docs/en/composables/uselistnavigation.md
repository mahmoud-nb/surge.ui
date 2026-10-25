# useListNavigation

Keyboard navigation in a list: arrows, Home / End and typeahead, skipping disabled items. SelectBox, Dropdown, Tabs and Accordion use it: the keyboard behaves the same everywhere.

## Two modes

| Mode | Focus | Use |
|------|-------|-----|
| `virtual` (default) | Stays on the control; the active item is announced through `aria-activedescendant` | Combobox, list filtered by a search field |
| `roving` | Moves from item to item; only one is in the tab order (`tabindex="-1"` on the others) | Menu, tabs, toolbar, accordion headers |

## Roving mode: a menu

```vue
<script setup>
import { ref } from 'vue'
import { useListNavigation } from '@surgeui/ds-vue'

const actions = [
  { label: 'Edit' },
  { label: 'Duplicate' },
  { label: 'Archive', disabled: true },
  { label: 'Delete' }
]
const itemRefs = ref([])

const nav = useListNavigation({
  items: actions,
  isDisabled: (action) => action.disabled,
  mode: 'roving',
  loop: true,
  getElement: (index) => itemRefs.value[index],
  typeahead: { getLabel: (action) => action.label }
})
</script>

<template>
  <div role="menu" @keydown="nav.handleKeydown">
    <button
      v-for="(action, i) in actions"
      :key="action.label"
      :ref="(el) => (itemRefs[i] = el)"
      role="menuitem"
      tabindex="-1"
      :aria-disabled="action.disabled || undefined"
    >
      {{ action.label }}
    </button>
  </div>
</template>
```

In roving mode, navigation starts from the focused item (mouse included): `handleKeydown` finds it through `getElement`.

## Virtual mode: a combobox

```ts
const nav = useListNavigation({
  items: filteredOptions,
  isDisabled: (option) => option.disabled,
  typeahead: { getLabel: (option) => option.label }
})

// On the field: aria-activedescendant follows the active option
const activeId = computed(() => nav.activeIndex.value >= 0 ? `option-${nav.activeIndex.value}` : undefined)
```

## Orientation and reading direction

`orientation: 'horizontal'` enables left / right, `'both'` all four arrows. Horizontally, arrows follow the reading direction: in a `dir="rtl"` container, the right arrow goes back.

## Typeahead

With `typeahead`, letters typed in a row form a prefix ("ap" → "Apple"); the same letter repeated cycles through the items starting with it. Typing is ignored in an editable field, and Space only belongs to it while a prefix is in progress (otherwise it stays the activation key).

`useTypeahead` is also exported on its own: `search(char, fromIndex)` returns the found index.

## API

```ts
useListNavigation(options)
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `items` | `MaybeRefOrGetter<T[]>` | — | List items |
| `isDisabled` | `(item, index) => boolean` | — | Skipped items |
| `orientation` | `'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | Active arrows |
| `loop` | `boolean` | `false` | Loop from end to start |
| `homeEnd` | `boolean` | `true` | Home / End (ignored in an editable field) |
| `mode` | `'virtual' \| 'roving'` | `'virtual'` | See above |
| `getElement` | `(index) => HTMLElement` | — | DOM element of an index (roving mode) |
| `typeahead` | `{ getLabel, timeout? } \| false` | `false` | Typeahead |
| `onActiveChange` | `(index) => void` | — | Called when the active item changes (automatic tab activation…) |

### Return

| Property | Type | Description |
|----------|------|-------------|
| `activeIndex` | `Ref<number>` | Active index (`-1`: none) |
| `handleKeydown` | `(event) => boolean` | Handles a key; `true` if it was used (the event is then canceled) |
| `setActiveIndex` | `(index, { focus? }) => void` | Changes the active item (DOM focus in roving mode) |
| `first` / `last` / `next` / `previous` | `() => number` | Moves; return the reached index or `-1` |
| `findEnabled` | `(start, step) => number` | First enabled item in a direction |
| `searchTypeahead` | `(char) => number` | Typeahead without a keyboard event |
| `isTyping` | `() => boolean` | A prefix is in progress |
| `reset` | `() => void` | Resets the index to `-1` and clears the prefix |
