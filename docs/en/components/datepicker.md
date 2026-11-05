<script setup>
import { ref } from 'vue'

const departure = ref(null)
const birth = ref(new Date(1990, 4, 17))
const today = new Date()
</script>

# DatePicker

A date field: type the date in the language's format ("mm/dd/yyyy" in US English) or pick it in a calendar.

## Usage

### In a FormField

<div class="component-demo">
  <div class="demo-section">
    <div style="max-width: 16rem">
      <SuFormField label="Departure date" message="Type mm/dd/yyyy or open the calendar">
        <SuDatePicker v-model="departure" :min="today" />
      </SuFormField>
    </div>
    <p>Value: {{ departure ? departure.toLocaleDateString('en-US') : 'empty' }}</p>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const departure = ref(null)
</script>

<template>
  <SuFormField label="Departure date" message="Type mm/dd/yyyy or open the calendar">
    <SuDatePicker v-model="departure" :min="new Date()" />
  </SuFormField>
</template>
```

### Initial value and maximum date

<div class="component-demo">
  <div class="demo-section">
    <div style="max-width: 16rem">
      <SuFormField label="Date of birth" required>
        <SuDatePicker v-model="birth" :max="today" />
      </SuFormField>
    </div>
  </div>
</div>

```vue
<SuDatePicker v-model="birth" :max="new Date()" />
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `Date \| null` | `null` | Date (v-model) |
| `min` / `max` | `Date` | - | Accepted dates |
| `isDateDisabled` | `(date: Date) => boolean` | - | Refused days |
| `locale` | `string` | component locale | Format and calendar language |
| `weekStartsOn` | `number` | from the language | First day of the week |
| `placeholder` | `string` | expected format (`dd/mm/yyyy`, `mm/dd/yyyy`…) | Placeholder |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | Validation state |
| `disabled` / `readonly` / `required` | `boolean` | `false` | Field states (`readonly` hides the calendar) |
| `name` | `string` | - | Field name |
| `openLabel` | `string` | `'Choose a date'` (locale) | Calendar button name |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `Date \| null` | New (committed) date |
| `change` | `Date \| null` | Date changed by the user |
| `focus` / `blur` | `FocusEvent` | Field focus |

### Exposed methods

| Method | Description |
|--------|-------------|
| `focus()` | Focuses the field |
| `open()` / `close()` | Opens or closes the calendar |

## Accessibility

- The text field stays the main path: the date is committed when leaving the field or with `Enter`. An unreadable, non-existent (02/31) or out-of-range date restores the previous value.
- The button is named with the selected date ("Change date, November 5, 2026") and announces a dialog (`aria-haspopup="dialog"`, `aria-expanded`).
- Calendar in a `role="dialog"`: focus on the active day when opening, `Tab` trapped, `Escape` or an outside press closes; picking a day closes and returns focus to the button. `Alt` + `↓` opens the calendar from the field.
- The month and year in the calendar title open month and year selection (handy for a date of birth); `Escape` first goes back to the days, then closes the calendar.
- Calendar keyboard: see [Calendar](/en/components/calendar).
