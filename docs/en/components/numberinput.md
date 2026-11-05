<script setup>
import { ref } from 'vue'

const quantity = ref(1)
const price = ref(12.5)
const guests = ref(2)
</script>

# NumberInput

A numeric field: input in the language's format ("1,234.5" in English), − / + buttons, bounds, step and display format (currency, unit, percent).

## Usage

### Basic usage

<div class="component-demo">
  <div class="demo-section">
    <div style="max-width: 12rem">
      <SuNumberInput v-model="quantity" :min="0" :max="99" aria-label="Quantity" />
    </div>
    <p>Value: {{ quantity }}</p>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const quantity = ref(1)
</script>

<template>
  <SuNumberInput v-model="quantity" :min="0" :max="99" aria-label="Quantity" />
</template>
```

### Display format

`formatOptions` takes `Intl.NumberFormat` options. The format applies when leaving the field; while typing, the number is shown without symbols.

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons-vertical" style="max-width: 12rem">
      <SuNumberInput v-model="price" :min="0" :step="0.5" :format-options="{ style: 'currency', currency: 'EUR' }" aria-label="Price" />
      <SuNumberInput :model-value="72.4" :step="0.1" :format-options="{ style: 'unit', unit: 'kilogram' }" aria-label="Weight" />
    </div>
  </div>
</div>

```vue
<SuNumberInput v-model="price" :min="0" :step="0.5" :format-options="{ style: 'currency', currency: 'EUR' }" aria-label="Price" />
<SuNumberInput v-model="weight" :step="0.1" :format-options="{ style: 'unit', unit: 'kilogram' }" aria-label="Weight" />
```

### Without buttons

<div class="component-demo">
  <div class="demo-section">
    <div style="max-width: 12rem">
      <SuNumberInput :controls="false" :min="1900" :max="2100" placeholder="Year" aria-label="Year" />
    </div>
  </div>
</div>

```vue
<SuNumberInput v-model="year" :controls="false" :min="1900" :max="2100" placeholder="Year" aria-label="Year" />
```

### With a label: NumberInputField

`SuNumberInputField` adds the label, message and validation state (FormField pattern). A `SuNumberInput` placed in a `SuFormField` also links itself.

<div class="component-demo">
  <div class="demo-section">
    <div style="max-width: 16rem">
      <SuNumberInputField v-model="guests" label="Guests" message="Between 1 and 9 people" :min="1" :max="9" required />
    </div>
  </div>
</div>

```vue
<SuNumberInputField v-model="guests" label="Guests" message="Between 1 and 9 people" :min="1" :max="9" required />
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `number \| null` | `null` | Value (v-model), `null` when the field is empty |
| `min` / `max` | `number` | - | Bounds |
| `step` | `number` | `1` | Arrow and button step |
| `largeStep` | `number` | `10 × step` | Page Up / Page Down step |
| `precision` | `number` | decimals of the step and format | Kept decimals |
| `formatOptions` | `Intl.NumberFormatOptions` | - | Display format (currency, unit, percent…) |
| `locale` | `string` | component locale | Format language |
| `controls` | `boolean` | `true` | − / + buttons |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | Validation state |
| `disabled` / `readonly` / `required` | `boolean` | `false` | Field states |
| `name` / `placeholder` | `string` | - | Field attributes |
| `incrementLabel` / `decrementLabel` | `string` | `'Increase'` / `'Decrease'` (locale) | Button names |

`SuNumberInputField` also takes `label`, `message` and `requiredText`.

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `number \| null` | New (committed) value |
| `change` | `number \| null` | Value changed by the user |
| `focus` / `blur` | `FocusEvent` | Field focus |

### Exposed methods

| Method | Description |
|--------|-------------|
| `focus()` | Focuses the field |
| `increment()` / `decrement()` | Adds or removes one step |

## Accessibility

- `role="spinbutton"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax` and `aria-valuetext` (formatted value, e.g. "€12.50").
- Keyboard: `↑` / `↓` ± step, `Page Up` / `Page Down` ± large step, `Home` / `End` = min / max, `Enter` commits.
- Input is committed when leaving the field or with `Enter`: clamped and rounded; unreadable text restores the previous value.
- The − / + buttons are out of the tab order (the keyboard is enough) but remain usable by screen readers; they are marked `aria-disabled` at the bounds.
- On mobile, the numeric keyboard opens (`inputmode`) when values are positive.
