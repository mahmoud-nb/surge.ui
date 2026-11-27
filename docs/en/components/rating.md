<script setup>
import { ref } from 'vue'

const rating = ref(3)
const review = ref(0)
</script>

# Rating

Star rating: keyboard and pointer input, or read-only display (decimal values allowed).

## Usage

### Input

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons">
      <SuRating v-model="rating" />
      <span>{{ rating }} / 5</span>
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const rating = ref(3)
</script>

<template>
  <SuRating v-model="rating" />
</template>
```

With the keyboard: <kbd>Tab</kbd> enters the group, arrow keys change the rating. With `clearable`, choosing the current rating again resets it to zero.

### Read only

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons-vertical">
      <SuRating :model-value="4.5" readonly />
      <SuRating :model-value="3.2" readonly size="sm" />
    </div>
  </div>
</div>

```vue
<SuRating :model-value="4.5" readonly />
```

### In a form

<div class="component-demo">
  <div class="demo-section">
    <SuFormField label="How was the delivery?" message="Optional">
      <SuRating v-model="review" clearable name="review" />
    </SuFormField>
  </div>
</div>

```vue
<SuFormField label="How was the delivery?" message="Optional">
  <SuRating v-model="review" clearable name="review" />
</SuFormField>
```

The stars are real radio buttons: with `name`, the rating is submitted with the form.

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `number` | `0` | Rating (0: none) |
| `max` | `number` | `5` | Number of stars |
| `readonly` | `boolean` | `false` | Read only (decimal values allowed) |
| `clearable` | `boolean` | `false` | Choosing the rating again resets it to zero |
| `name` | `string` | generated id | Radio button name |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `state` | `'default' \| 'success' \| 'warning' \| 'error'` | `'default'` | State (`error`: `aria-invalid`) |
| `disabled` | `boolean` | `false` | Disabled |
| `required` | `boolean` | `false` | Required |
| `ariaLabel` | `string` | `'Rating'` | Group name outside `SuFormField` |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `number` | Chosen rating |
| `change` | `number` | Chosen rating |

## Accessibility

- Input: group of native radio buttons (`role="radiogroup"`), each star named ("3 stars out of 5"); the rating is announced as a checked option.
- Named by the `SuFormField` label (`aria-labelledby`), otherwise "Rating"; message tied with `aria-describedby`.
- Read only: an image named "Rated 4.5 out of 5"; the stars are decorative.
- The hover preview does not change the rating; it goes away when the pointer leaves the stars.
