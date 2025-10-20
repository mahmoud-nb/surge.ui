# SliderField

SliderField component for selecting numeric values with automatic dual-range support, vertical/horizontal orientation, tooltips, custom marks and complete accessibility according to W3C standards.

## Usage examples

### Basic SliderField

<div class="component-demo">
  <div class="demo-section">
    <h4>Simple slider</h4>
    <div class="demo-inputs">
      <SuSliderField 
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
  <SuSliderField 
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
      <SuSliderField 
        label="Price range"
        :min="0"
        :max="1000"
        :step="10"
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
  <SuSliderField 
    label="Price range"
    :min="0"
    :max="1000"
    :step="10"
    :value="priceRange"
    :showValue="true"
    :showLabels="true"
    :formatValue="formatPrice"
    message="Set your budget"
    v-model="priceRange"
  />
</template>
```

### With tooltips

<div class="component-demo">
  <div class="demo-section">
    <h4>Tooltips on hover</h4>
    <div class="demo-inputs">
      <SuSliderField 
        label="Volume with tooltip"
        :min="0"
        :max="100"
        :value="60"
        tooltip="top"
        :showValue="false"
        message="Hover the cursor to see the value"
      />
      <SuSliderField 
        label="Range with tooltips"
        :min="0"
        :max="100"
        :value="[30, 70]"
        tooltip="bottom"
        :showValue="false"
        message="Bottom tooltips"
      />
    </div>
  </div>
</div>

```vue
<script setup>
const volume = ref(60)
const range = ref([30, 70])
</script>

<template>
  <!-- Top tooltip -->
  <SuSliderField 
    label="Volume with tooltip"
    :min="0"
    :max="100"
    tooltip="top"
    :showValue="false"
    v-model="volume"
  />
  
  <!-- Bottom tooltip for dual-range -->
  <SuSliderField 
    label="Range with tooltips"
    :min="0"
    :max="100"
    tooltip="bottom"
    :showValue="false"
    v-model="range"
  />
</template>
```

### With custom marks

<div class="component-demo">
  <div class="demo-section">
    <h4>Marks on slider</h4>
    <div class="demo-inputs">
      <SuSliderField 
        label="Difficulty level"
        :min="0"
        :max="100"
        :value="60"
        :marks="[0, 25, 50, 75, 100]"
        tooltip="top"
        :formatValue="(value) => {
          if (value === 0) return 'Easy'
          if (value === 25) return 'Medium'
          if (value === 50) return 'Hard'
          if (value === 75) return 'Expert'
          if (value === 100) return 'Master'
          return value.toString()
        }"
      />
    </div>
  </div>
</div>

```vue
<script setup>
const difficulty = ref(60)

const formatDifficulty = (value) => {
  if (value === 0) return 'Easy'
  if (value === 25) return 'Medium'
  if (value === 50) return 'Hard'
  if (value === 75) return 'Expert'
  if (value === 100) return 'Master'
  return value.toString()
}
</script>

<template>
  <SuSliderField 
    label="Difficulty level"
    :min="0"
    :max="100"
    :marks="[0, 25, 50, 75, 100]"
    tooltip="top"
    :formatValue="formatDifficulty"
    v-model="difficulty"
  />
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number \| [number, number]` | `min` | Slider value (single number or array for dual-range) |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step increment |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Slider size |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | Visual state |
| `disabled` | `boolean` | `false` | Disable the slider |
| `readonly` | `boolean` | `false` | Read-only slider |
| `required` | `boolean` | `false` | Required field |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Slider orientation |
| `tooltip` | `'none' \| 'top' \| 'bottom'` | `'none'` | Tooltip position on hover |
| `marks` | `number[]` | `[]` | Marks to display on slider |
| `showValue` | `boolean` | `true` | Show current value |
| `showTicks` | `boolean` | `false` | Show tick marks |
| `showLabels` | `boolean` | `false` | Show min/max labels |
| `formatValue` | `(value: number) => string` | `undefined` | Value formatting function |
| `dir` | `'ltr' \| 'rtl' \| 'auto'` | `'auto'` | Text direction |
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

### Slots

| Slot | Description |
|------|-------------|
| `before` | Content displayed before the slider |
| `after` | Content displayed after the slider |

## Automatic dual-range detection

The component automatically detects if it should work in dual-range mode by checking if the value is an array:

```vue
<!-- Single mode -->
<SuSliderField :value="50" />

<!-- Dual-range mode (automatically detected) -->
<SuSliderField :value="[20, 80]" />
```

## Tooltips

Tooltips display the formatted value on hover or focus of the thumbs:

### 🎯 Available positions

- `tooltip="none"` : No tooltip (default)
- `tooltip="top"` : Tooltip above the thumb
- `tooltip="bottom"` : Tooltip below the thumb

```vue
<!-- Top tooltip -->
<SuSliderField tooltip="top" :value="50" />

<!-- Bottom tooltip -->
<SuSliderField tooltip="bottom" :value="[20, 80]" />

<!-- No tooltip, static display -->
<SuSliderField tooltip="none" :showValue="true" :value="50" />
```

## Custom marks

Marks allow displaying specific values on the slider:

### 📍 Mark features

- **Automatic positioning** : Percentage position calculation
- **Smart filtering** : Only marks within min/max range are displayed
- **Formatting** : Uses `formatValue` function if provided
- **RTL support** : Position adapted to direction

```vue
<script setup>
const temperature = ref(22)

const formatTemp = (value) => `${value}°C`
</script>

<template>
  <SuSliderField 
    label="Temperature"
    :min="0"
    :max="40"
    :marks="[0, 10, 18, 24, 30, 40]"
    :formatValue="formatTemp"
    tooltip="top"
    v-model="temperature"
  />
</template>
```

## Before and after slots

Slots allow adding custom content around the slider:

### 🎨 Use cases

- **Icons** : Visual indicators (🔇 🔊)
- **Labels** : Text descriptions
- **Buttons** : Quick actions (reset, presets)
- **Information** : Additional context

```vue
<template>
  <SuSliderField 
    label="Brightness"
    :min="0"
    :max="100"
    v-model="brightness"
  >
    <template #before>
      <div class="slider-controls">
        <span>🌙</span>
        <span>Dark</span>
      </div>
    </template>
    <template #after>
      <div class="slider-controls">
        <span>Bright</span>
        <span>☀️</span>
      </div>
    </template>
  </SuSlider>
</template>
```

## RTL Support

The component automatically handles right-to-left languages:

### 🌐 RTL features

- **Automatic inversion** : Percentages are inverted
- **Adapted calculation** : Thumb position adjusted
- **Marks and ticks** : Correct positioning
- **Keyboard navigation** : Arrows adapted to direction

```vue
<!-- RTL support -->
<SuSliderField 
  label="مستوى الصوت"
  dir="rtl"
  :min="0"
  :max="100"
  :value="70"
  tooltip="top"
/>

<!-- Auto-detection -->
<SuSliderField 
  label="Volume"
  dir="auto"
  :value="50"
/>
```

## Accessibility

The Slider component follows WCAG 2.1 AA standards and W3C best practices:

### ✅ Accessibility features

- **ARIA role** : `role="slider"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- **Keyboard navigation** : Support for arrow keys, Page Up/Down, Home/End
- **ARIA orientation** : `aria-orientation` for screen readers
- **Voice announcements** : Messages for screen readers on value changes
- **Associated labels** : Each slider has a properly associated label
- **State messages** : Messages with `aria-live` for screen readers
- **Color contrast** : WCAG AA compliant contrast ratios (4.5:1 minimum)
- **Visible focus** : Clear and contrasted focus indicators
- **Minimum sizes** : 44px minimum thumbs for touch accessibility
- **Dark mode** : Automatically adapted contrast
- **High contrast** : Support for `prefers-contrast: high`
- **Reduced motion** : Respects `prefers-reduced-motion`

## Keyboard navigation

| Key | Action |
|-----|--------|
| `Tab` | Navigate to/from slider |
| `Arrows` | Adjust value by step |
| `Page Up` | Increase by 10% of range |
| `Page Down` | Decrease by 10% of range |
| `Home` | Go to minimum value |
| `End` | Go to maximum value |