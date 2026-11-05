<script setup>
import { ref } from 'vue'

const date = ref(new Date())
const booking = ref(null)
const today = new Date()
const min = new Date(today.getFullYear(), today.getMonth(), today.getDate())
const max = new Date(today.getFullYear(), today.getMonth() + 2, 0)
const isWeekend = (d) => d.getDay() === 0 || d.getDay() === 6
</script>

# Calendar

A month grid to pick a day, usable on its own or inside a [DatePicker](/en/components/datepicker). The first day of the week and the names follow the language.

## Usage

### Basic usage

<div class="component-demo">
  <div class="demo-section">
    <SuCalendar v-model="date" />
    <p>{{ date ? date.toLocaleDateString('en-US', { dateStyle: 'full' }) : '—' }}</p>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const date = ref(new Date())
</script>

<template>
  <SuCalendar v-model="date" />
</template>
```

### Bounds and excluded days

`min` and `max` limit selection and navigation; `isDateDisabled` excludes days (weekends, holidays).

<div class="component-demo">
  <div class="demo-section">
    <SuCalendar v-model="booking" :min="min" :max="max" :is-date-disabled="isWeekend" />
  </div>
</div>

```vue
<SuCalendar
  v-model="booking"
  :min="new Date()"
  :max="endOfNextMonth"
  :is-date-disabled="(date) => date.getDay() === 0 || date.getDay() === 6"
/>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `Date \| null` | `null` | Selected day (v-model) |
| `min` / `max` | `Date` | - | First and last selectable days |
| `isDateDisabled` | `(date: Date) => boolean` | - | Days that cannot be picked |
| `locale` | `string` | component locale | Language of month and day names |
| `weekStartsOn` | `number` | from the language | First day of the week (0 = Sunday) |
| `previousMonthLabel` / `nextMonthLabel` | `string` | `'Previous month'` / `'Next month'` (locale) | Button names |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `Date` | Selected day (v-model) |
| `select` | `Date` | Day picked by the user |

### Exposed methods

| Method | Description |
|--------|-------------|
| `focus()` | Focuses the active day |

## Accessibility

- `role="grid"` named by the month; weekday headers read in full ("Monday").
- A single tab stop: the selected day, otherwise today. Each day is named with the full date ("Thursday, November 5, 2026"), with `aria-selected` and `aria-current="date"` for today.
- Keyboard: arrows ±1 day / ±1 week (reversed in RTL), `Home` / `End` start / end of week, `Page Up` / `Page Down` ±1 month, `Shift` + `Page` ±1 year, `Enter` / `Space` to pick.
- Excluded days stay focusable (`aria-disabled`) but cannot be picked.
- The month buttons keep focus and announce the new month.
