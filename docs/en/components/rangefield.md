# RangeField

Range/Slider Field component for selecting numeric values with support for dual-range, vertical/horizontal orientation, ticks and complete accessibility according to W3C standards.

## Usage examples

### Basic Range

<div class="component-demo">
  <div class="demo-section">
    <h4>Simple slider</h4>
    <div class="demo-inputs">
      <SuRangeField 
        label="Volume"
        :min="0"
        :max="100"
        :value="50"
        :showValue="true"
        message="Adjust the volume"
      />
    </div>
  </div>
</div>

```vue
<script setup>
const volume = ref(50)
</script>

<template>
  <SuRangeField 
    label="Volume"
    :min="0"
    :max="100"
    :showValue="true"
    message="Adjust the volume"
    v-model="volume"
  />
</template>
```

### Dual-range (value range)

<div class="component-demo">
  <div class="demo-section">
    <h4>Range selection</h4>
    <div class="demo-inputs">
      <SuRangeField 
        label="Price range"
        :min="0"
        :max="1000"
        :step="10"
        :dual="true"
        :value="[200, 800]"
        :showValue="true"
        :showLabels="true"
        :formatValue="(value) => value + '$'"
        message="Set your budget"
      />
    </div>
  </div>
</div>

```vue
<script setup>
const priceRange = ref([200, 800])

const formatPrice = (value) => `$${value}`
</script>

<template>
  <SuRangeField 
    label="Price range"
    :min="0"
    :max="1000"
    :step="10"
    :dual="true"
    :showValue="true"
    :showLabels="true"
    :formatValue="formatPrice"
    message="Set your budget"
    v-model="priceRange"
  />
</template>
```

### With ticks and labels

<div class="component-demo">
  <div class="demo-section">
    <h4>Slider with ticks</h4>
    <div class="demo-inputs">
      <SuRangeField 
        label="Rating"
        :min="0"
        :max="10"
        :step="1"
        :value="7"
        :showValue="true"
        :showTicks="true"
        :showLabels="true"
        message="Rate from 0 to 10"
      />
    </div>
  </div>
</div>

```vue
<script setup>
const rating = ref(7)
</script>

<template>
  <SuRangeField 
    label="Rating"
    :min="0"
    :max="10"
    :step="1"
    :showValue="true"
    :showTicks="true"
    :showLabels="true"
    message="Rate from 0 to 10"
    v-model="rating"
  />
</template>
```

### Vertical orientation

<div class="component-demo">
  <div class="demo-section">
    <h4>Vertical slider</h4>
    <div class="demo-inputs">
      <SuRangeField 
        label="Vertical volume"
        :min="0"
        :max="100"
        :value="75"
        orientation="vertical"
        :showValue="true"
        :showLabels="true"
        message="Vertical volume control"
      />
    </div>
  </div>
</div>

```vue
<script setup>
const verticalVolume = ref(75)
</script>

<template>
  <SuRangeField 
    label="Vertical volume"
    :min="0"
    :max="100"
    orientation="vertical"
    :showValue="true"
    :showLabels="true"
    message="Vertical volume control"
    v-model="verticalVolume"
  />
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number \| [number, number]` | `min` or `[min, max]` | Slider value |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step increment |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Slider size |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | Visual state |
| `disabled` | `boolean` | `false` | Disable the slider |
| `readonly` | `boolean` | `false` | Read-only slider |
| `required` | `boolean` | `false` | Required field |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Slider orientation |
| `dual` | `boolean` | `false` | Dual-range mode (min/max) |
| `showValue` | `boolean` | `true` | Show current value |
| `showTicks` | `boolean` | `false` | Show tick marks |
| `showLabels` | `boolean` | `false` | Show min/max labels |
| `formatValue` | `(value: number) => string` | `undefined` | Value formatting function |
| `label` | `string` | `undefined` | Slider label |
| `message` | `string` | `undefined` | Displayed message |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `@update:modelValue` | `(value: number \| [number, number]) => void` | Emitted when value changes (v-model) |
| `@change` | `(value: number \| [number, number]) => void` | Emitted on change |
| `@input` | `(value: number \| [number, number]) => void` | Emitted during dragging |
| `@focus` | `(event: FocusEvent) => void` | Emitted on focus |
| `@blur` | `(event: FocusEvent) => void` | Emitted on blur |
| `@keydown` | `(event: KeyboardEvent) => void` | Emitted on key press |

## Accessibility

The Range component follows WCAG 2.1 AA standards and W3C best practices:

### ✅ Accessibility features

- **ARIA role**: `role="slider"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- **Keyboard navigation**: Support for arrow keys, Page Up/Down, Home/End
- **ARIA orientation**: `aria-orientation` for screen readers
- **Voice announcements**: Messages for screen readers on value changes
- **Associated labels**: Each slider has a properly associated label
- **State messages**: Messages with `aria-live` for screen readers
- **Color contrast**: WCAG AA compliant contrast ratios (4.5:1 minimum)
- **Visible focus**: Clear and contrasted focus indicators
- **Minimum sizes**: 44px minimum thumbs for touch accessibility
- **Dark mode**: Automatically adapted contrast
- **High contrast**: Support for `prefers-contrast: high`
- **Reduced motion**: Respects `prefers-reduced-motion`

### 🎯 Best practices

```vue
<!-- Range with validation and accessibility -->
<SuRangeField 
  label="Difficulty level"
  :min="1"
  :max="10"
  :required="true"
  :showValue="true"
  :showTicks="true"
  :state="hasError ? 'error' : 'default'"
  :message="hasError ? 'Please select a level' : 'Choose your level'"
  ariaLabel="Difficulty level selector"
  v-model="difficulty"
/>

<!-- Dual-range with formatting -->
<SuRangeField 
  label="Price range"
  :min="0"
  :max="5000"
  :step="50"
  :dual="true"
  :showValue="true"
  :showLabels="true"
  :formatValue="(value) => `$${value}`"
  message="Set your budget"
  v-model="priceRange"
/>
```

## Keyboard navigation

| Key | Action |
|-----|--------|
| `Tab` | Navigate to/from slider |
| `Arrows` | Adjust value by step |
| `Page Up` | Increase by 10% of range |
| `Page Down` | Decrease by 10% of range |
| `Home` | Go to minimum value |
| `End` | Go to maximum value |