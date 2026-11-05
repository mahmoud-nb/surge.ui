<script setup>
import { ref } from 'vue'

const filters = ref(['Paris', 'Under $500', 'Free shipping'])
</script>

# Tag

A label for an active filter, a keyword or a selected value. It can have an icon and a remove button.

For a simple indicator (status, count), use [Badge](/en/components/badge).

## Usage

### Variants

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons">
      <SuTag label="Neutral" />
      <SuTag label="Primary" variant="primary" />
      <SuTag label="Approved" variant="success" />
      <SuTag label="Pending" variant="warning" />
      <SuTag label="Rejected" variant="error" />
      <SuTag label="Draft" variant="info" />
    </div>
  </div>
</div>

```vue
<SuTag label="Approved" variant="success" />
```

### Removable

The remove button is named "Remove {label}" and emits `remove`.

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons">
      <SuTag v-for="filter in filters" :key="filter" :label="filter" removable @remove="filters = filters.filter((f) => f !== filter)" />
      <span v-if="!filters.length">No filters</span>
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const filters = ref(['Paris', 'Under $500', 'Free shipping'])
const remove = (filter) => (filters.value = filters.value.filter((f) => f !== filter))
</script>

<template>
  <SuTag v-for="filter in filters" :key="filter" :label="filter" removable @remove="remove(filter)" />
</template>
```

### Sizes

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons" style="align-items: center">
      <SuTag size="sm" label="Small" removable />
      <SuTag size="md" label="Medium" removable />
      <SuTag size="lg" label="Large" removable />
    </div>
  </div>
</div>

```vue
<SuTag size="sm" label="Small" removable />
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label (or default slot) |
| `variant` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | Variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `icon` | `Component` | - | Icon before the label |
| `removable` | `boolean` | `false` | Remove button |
| `removeLabel` | `string` | `'Remove {label}'` (locale) | Remove button name |
| `disabled` | `boolean` | `false` | Disables the tag |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `remove` | `MouseEvent` | Remove button clicked |

## Accessibility

- The remove button is a real `<button>`, named with the tag label (read from the slot when the `label` prop is missing).
- After a removal, move focus somewhere sensible (next tag, filter field): the removed button takes focus with it.
- State tints use the `--su-state-*-fg` tokens, readable on their soft background.
