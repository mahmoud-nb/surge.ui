# Slider

Slider component for selecting numeric values with automatic dual-range support, vertical/horizontal orientation, tooltips, custom marks, and full W3C accessibility compliance.

## Installation

```vue
import { SuSlider } from '@/components'
```

## Simple Usage

The `SuSlider` component can be used standalone without the `SuFormField` wrapper.

### Basic Slider

```vue
<script setup>
import { ref } from 'vue'

const volume = ref(50)
</script>

<template>
  <SuSlider 
    :min="0"
    :max="100"
    v-model="volume"
  />
</template>
```

### Dual-range (Value Range)

```vue
<script setup>
import { ref } from 'vue'

const priceRange = ref([200, 800])
const formatPrice = (value) => `${value}€`
</script>

<template>
  <SuSlider 
    :min="0"
    :max="1000"
    :step="10"
    :showValue="true"
    :formatValue="formatPrice"
    v-model="priceRange"
  />
</template>
```

## Usage with SuFormField

For better form structuring, use `SuSlider` with the `SuFormField` component.

### Slider with Label and Message

```vue
<script setup>
import { ref } from 'vue'

const volume = ref(50)
</script>

<template>
  <SuFormField 
    label="Volume"
    message="Adjust the volume"
  >
    <SuSlider 
      :min="0"
      :max="100"
      :showValue="true"
      v-model="volume"
    />
  </SuFormField>
</template>
```

### Dual-range with Validation

```vue
<script setup>
import { ref, computed } from 'vue'

const priceRange = ref([200, 800])
const formatPrice = (value) => `${value}€`

const budgetState = computed(() => {
  const [min, max] = priceRange.value
  if (max - min < 100) return 'error'
  if (max - min > 500) return 'success'
  return 'default'
})

const budgetMessage = computed(() => {
  const [min, max] = priceRange.value
  if (max - min < 100) return 'Range must be at least €100'
  if (max - min > 500) return 'Budget defined successfully'
  return 'Set your budget'
})
</script>

<template>
  <SuFormField 
    label="Price Range"
    :state="budgetState"
    :message="budgetMessage"
    required
  >
    <SuSlider 
      :min="0"
      :max="1000"
      :step="10"
      :showValue="true"
      :showLabels="true"
      :formatValue="formatPrice"
      v-model="priceRange"
    />
  </SuFormField>
</template>
```

### With Tooltips

```vue
<script setup>
import { ref } from 'vue'

const volume = ref(60)
const range = ref([30, 70])
</script>

<template>
  <SuFormField 
    label="Volume with tooltip"
    message="Hover the cursor to see the value"
  >
    <SuSlider 
      :min="0"
      :max="100"
      tooltip="top"
      v-model="volume"
    />
  </SuFormField>
  
  <SuFormField 
    label="Range with tooltips"
    message="Tooltips at bottom"
  >
    <SuSlider 
      :min="0"
      :max="100"
      tooltip="bottom"
      v-model="range"
    />
  </SuFormField>
</template>
```

### Validation States

```vue
<template>
  <SuFormField 
    label="Default state"
    message="Normal help message"
    state="default"
  >
    <SuSlider :min="0" :max="100" :value="50" />
  </SuFormField>
  
  <SuFormField 
    label="Error state"
    message="Value must be greater than 30"
    state="error"
    required
  >
    <SuSlider :min="0" :max="100" :value="20" />
  </SuFormField>
  
  <SuFormField 
    label="Success state"
    message="Value validated successfully"
    state="success"
  >
    <SuSlider :min="0" :max="100" :value="80" />
  </SuFormField>
  
  <SuFormField 
    label="Warning state"
    message="Warning, value near maximum"
    state="warning"
  >
    <SuSlider :min="0" :max="100" :value="95" />
  </SuFormField>
</template>
```

## Usage with SuSliderField

For simplicity, you can also use the `SuSliderField` component which combines `SuFormField` and `SuSlider` into a single component:

```vue
<script setup>
import { ref } from 'vue'

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

This approach is equivalent to:

```vue
<SuFormField 
  label="Volume"
  message="Adjust the volume"
>
  <SuSlider 
    :min="0"
    :max="100"
    :showValue="true"
    v-model="volume"
  />
</SuFormField>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number \| [number, number]` | `min` | Slider value (single number or array for dual-range) |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Increment step |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Slider size |
| `disabled` | `boolean` | `false` | Disable the slider |
| `readonly` | `boolean` | `false` | Read-only slider |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Slider orientation |
| `tooltip` | `'none' \| 'top' \| 'bottom'` | `'none'` | Tooltip position on hover |
| `marks` | `number[]` | `[]` | Marks to display on slider |
| `showValue` | `boolean` | `true` | Show current value |
| `showTicks` | `boolean` | `false` | Show tick marks |
| `showLabels` | `boolean` | `false` | Show min/max labels |
| `formatValue` | `(value: number) => string` | `undefined` | Value formatting function |
| `dir` | `'ltr' \| 'rtl' \| 'auto'` | `'auto'` | Text direction |

### Accessibility Attributes

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ariaLabel` | `string` | `undefined` | Accessible label |
| `ariaDescribedBy` | `string` | `undefined` | Description element ID |
| `ariaInvalid` | `boolean` | `undefined` | Indicates invalid value |
| `ariaRequired` | `boolean` | `undefined` | Indicates required field |
| `ariaValueText` | `string` | `undefined` | Textual value description |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `@update:modelValue` | `(value: number \| [number, number]) => void` | Emitted on value change (v-model) |
| `@change` | `(value: number \| [number, number]) => void` | Emitted on change |
| `@input` | `(value: number \| [number, number]) => void` | Emitted during sliding |
| `@focus` | `(event: FocusEvent) => void` | Emitted on focus |
| `@blur` | `(event: FocusEvent) => void` | Emitted on blur |
| `@keydown` | `(event: KeyboardEvent) => void` | Emitted on key press |

### Slots

| Slot | Description |
|------|-------------|
| `before` | Content displayed before the slider |
| `after` | Content displayed after the slider |

### Exposed Methods

| Method | Type | Description |
|---------|------|-------------|
| `focus()` | `() => void` | Focus the slider |
| `sliderRef` | `Ref<HTMLDivElement>` | Container reference |
| `thumb1Ref` | `Ref<HTMLDivElement>` | First thumb reference |
| `thumb2Ref` | `Ref<HTMLDivElement>` | Second thumb reference (dual) |

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Navigate to/from slider |
| `Arrows` | Adjust value by step |
| `Page Up` | Increase by 10% of range |
| `Page Down` | Decrease by 10% of range |
| `Home` | Go to minimum value |
| `End` | Go to maximum value |

## Advanced Features

### 🎯 Smart Dual-range

In dual-range mode (array value), the component automatically handles:
- **Thumb Collision**: Min/max values cannot cross
- **Smart Selection**: Click on track selects the nearest thumb
- **Keyboard Navigation**: Each thumb is independently focusable

### 💬 Interactive Tooltips

Tooltips provide immediate visual feedback:
- **Hover Display**: Smooth appearance on hover
- **Focus Display**: Visible during keyboard navigation
- **Drag Display**: Stays visible during sliding
- **Custom Formatting**: Uses the `formatValue` function

### 📊 Custom Marks

Marks allow highlighting important values:
- **Precise Positioning**: Automatic position calculation
- **Formatted Labels**: Display with `formatValue` function
- **Automatic Filtering**: Only valid marks are displayed
- **Adaptive Styling**: Adapts to orientation and direction

### 🎨 Flexible Formatting

The `formatValue` function allows:
- **Custom Units**: €, %, °C, km, etc.
- **Complex Formatting**: Stars, progress bars, etc.
- **Localization**: Adaptation to different languages

## Advanced Usage Examples

### Search Filters

```vue
<script setup>
import { ref } from 'vue'

const filters = ref({
  price: [100, 500],
  distance: 20,
  rating: 4
})

const formatPrice = (value) => `${value}`
const formatDistance = (value) => `${value} km`
const formatRating = (value) => '★'.repeat(Math.floor(value)) + (value % 1 ? '☆' : '')
</script>

<template>
  <div class="filters">
    <h3>Search Filters</h3>
    
    <SuFormField 
      label="Price Range"
      message="Set your budget"
    >
      <SuSlider 
        :min="0"
        :max="1000"
        :step="10"
        tooltip="top"
        :showLabels="true"
        :marks="[0, 250, 500, 750, 1000]"
        :formatValue="formatPrice"
        v-model="filters.price"
      />
    </SuFormField>
    
    <SuFormField 
      label="Maximum Distance"
      message="Search radius"
    >
      <SuSlider 
        :min="0"
        :max="50"
        :step="5"
        tooltip="bottom"
        :showTicks="true"
        :showLabels="true"
        :formatValue="formatDistance"
        v-model="filters.distance"
      />
    </SuFormField>
    
    <SuFormField 
      label="Minimum Rating"
      message="Desired minimum rating"
    >
      <SuSlider 
        :min="1"
        :max="5"
        :step="0.5"
        tooltip="top"
        :marks="[1, 2, 3, 4, 5]"
        :formatValue="formatRating"
        v-model="filters.rating"
      />
    </SuFormField>
  </div>
</template>
```

### Audio/Video Controls

```vue
<script setup>
import { ref } from 'vue'

const audioControls = ref({
  volume: 60,
  balance: 0,
  bass: 0,
  treble: 0
})

const formatPercent = (value) => `${value}%`
const formatBalance = (value) => {
  if (value === 0) return 'Center'
  return value > 0 ? `Right ${value}%` : `Left ${Math.abs(value)}%`
}
const formatEQ = (value) => value > 0 ? `+${value}dB` : `${value}dB`
</script>

<template>
  <div class="audio-controls">
    <h3>Audio Controls</h3>
    
    <div class="controls-grid">
      <SuFormField 
        label="Volume"
      >
        <SuSlider 
          :min="0"
          :max="100"
          tooltip="top"
          :formatValue="formatPercent"
          v-model="audioControls.volume"
        >
          <template #before>
            <span>🔇</span>
          </template>
          <template #after>
            <span>🔊</span>
          </template>
        </SuSlider>
      </SuFormField>
      
      <SuFormField 
        label="Balance"
      >
        <SuSlider 
          :min="-100"
          :max="100"
          :step="5"
          tooltip="top"
          :showTicks="true"
          :marks="[-100, -50, 0, 50, 100]"
          :formatValue="formatBalance"
          v-model="audioControls.balance"
        />
      </SuFormField>
      
      <SuFormField 
        label="Bass"
      >
        <SuSlider 
          :min="-12"
          :max="12"
          :step="1"
          tooltip="bottom"
          :showTicks="true"
          :formatValue="formatEQ"
          v-model="audioControls.bass"
        />
      </SuFormField>
      
      <SuFormField 
        label="Treble"
      >
        <SuSlider 
          :min="-12"
          :max="12"
          :step="1"
          tooltip="bottom"
          :showTicks="true"
          :formatValue="formatEQ"
          v-model="audioControls.treble"
        />
      </SuFormField>
    </div>
  </div>
</template>

<style scoped>
.controls-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}
</style>
```

### Temperature Slider with Zones

```vue
<script setup>
import { ref, computed } from 'vue'

const temperature = ref(20)

const temperatureZone = computed(() => {
  if (temperature.value < 10) return { name: 'Cold', color: '#3b82f6' }
  if (temperature.value < 25) return { name: 'Mild', color: '#10b981' }
  if (temperature.value < 35) return { name: 'Hot', color: '#f59e0b' }
  return { name: 'Very Hot', color: '#ef4444' }
})

const formatTemperature = (value) => `${value}°C`

const getTemperatureState = (temp) => {
  if (temp < 5 || temp > 35) return 'warning'
  if (temp >= 18 && temp <= 24) return 'success'
  return 'default'
}
</script>

<template>
  <div class="temperature-control">
    <h3>Temperature Control</h3>
    
    <SuFormField 
      label="Target Temperature"
      :state="getTemperatureState(temperature)"
      :message="temperature >= 18 && temperature <= 24 ? 'Comfortable temperature' : 'Temperature outside comfort zone'"
    >
      <SuSlider 
        :min="-10"
        :max="40"
        :step="1"
        tooltip="top"
        :showTicks="true"
        :showLabels="true"
        :marks="[0, 10, 18, 24, 30, 40]"
        :formatValue="formatTemperature"
        v-model="temperature"
      >
        <template #before>
          <div class="temperature-info">
            <span :style="{ color: temperatureZone.color, fontWeight: '600' }">
              Zone: {{ temperatureZone.name }}
            </span>
          </div>
        </template>
      </SuSlider>
    </SuFormField>
  </div>
</template>

<style scoped>
.temperature-info {
  text-align: center;
  margin-bottom: 0.5rem;
}
</style>
```

### Brightness Control with Presets

```vue
<script setup>
import { ref } from 'vue'

const brightness = ref(50)

const presets = [
  { label: 'Night', value: 10, icon: '🌙' },
  { label: 'Reading', value: 40, icon: '📖' },
  { label: 'Work', value: 70, icon: '💼' },
  { label: 'Max', value: 100, icon: '☀️' }
]

const setPreset = (value) => {
  brightness.value = value
}
</script>

<template>
  <div class="brightness-control">
    <h3>Screen Brightness</h3>
    
    <SuFormField 
      label="Brightness Level"
      :message="`Current: ${brightness}%`"
    >
      <SuSlider 
        :min="0"
        :max="100"
        :step="1"
        tooltip="top"
        :formatValue="(value) => `${value}%`"
        v-model="brightness"
      >
        <template #after>
          <div class="presets">
            <button
              v-for="preset in presets"
              :key="preset.value"
              @click="setPreset(preset.value)"
              :class="{ active: brightness === preset.value }"
              type="button"
            >
              <span>{{ preset.icon }}</span>
              <span>{{ preset.label }}</span>
            </button>
          </div>
        </template>
      </SuSlider>
    </SuFormField>
  </div>
</template>

<style scoped>
.presets {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.presets button {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.presets button:hover {
  background: #f9fafb;
  border-color: #3b82f6;
}

.presets button.active {
  background: #eff6ff;
  border-color: #3b82f6;
  color: #3b82f6;
}
</style>
```

## Accessibility

The Slider component follows WCAG 2.1 AA standards and W3C best practices:

### ✅ Accessibility Features

- **ARIA Role**: `role="slider"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- **Keyboard Navigation**: Support for arrow keys, Page Up/Down, Home/End
- **ARIA Orientation**: `aria-orientation` for screen readers
- **Voice Announcements**: Messages for screen readers on changes
- **Associated Labels**: Each slider properly associated via SuFormField
- **State Messages**: Messages with `aria-live` for screen readers
- **Color Contrast**: Ratios compliant with WCAG AA (4.5:1 minimum)
- **Visible Focus**: Clear and contrasted focus indicators
- **Minimum Sizes**: 44px thumbs minimum for touch accessibility
- **Dark Mode**: Automatically adapted contrast
- **High Contrast**: Support for `prefers-contrast: high`
- **Reduced Motion**: Respect for `prefers-reduced-motion`

### 🎯 Best Practices

```vue
<!-- Slider with validation and accessibility -->
<SuFormField 
  label="Difficulty Level"
  :required="true"
  :state="hasError ? 'error' : 'default'"
  :message="hasError ? 'Please select a level' : 'Choose your level'"
>
  <SuSlider 
    :min="1"
    :max="10"
    tooltip="top"
    :showTicks="true"
    ariaLabel="Difficulty level selector"
    v-model="difficulty"
  />
</SuFormField>

<!-- Dual-range with formatting -->
<SuFormField 
  label="Price Range"
  message="Set your budget"
>
  <SuSlider 
    :min="0"
    :max="5000"
    :step="50"
    :value="[500, 2000]"
    tooltip="top"
    :showLabels="true"
    :formatValue="(value) => `${value}`"
    v-model="priceRange"
  />
</SuFormField>

<!-- Vertical slider with graduations -->
<SuFormField 
  label="Temperature"
>
  <SuSlider 
    :min="-10"
    :max="40"
    :step="1"
    orientation="vertical"
    tooltip="top"
    :showTicks="true"
    :showLabels="true"
    :formatValue="(value) => `${value}°C`"
    v-model="temperature"
  />
</SuFormField>
```

## Migration Guide

If you're migrating from `SuSliderField` to the separated components:

### Before (SuSliderField)

```vue
<SuSliderField 
  label="Volume"
  :min="0"
  :max="100"
  :showValue="true"
  message="Adjust the volume"
  v-model="volume"
/>
```

### After (SuFormField + SuSlider)

```vue
<SuFormField 
  label="Volume"
  message="Adjust the volume"
>
  <SuSlider 
    :min="0"
    :max="100"
    :showValue="true"
    v-model="volume"
  />
</SuFormField>
```

### Benefits of Separation

- **Flexibility**: Use SuSlider standalone when no label is needed
- **Consistency**: Same structure for all form fields
- **Reusability**: SuFormField works with any input component
- **Maintainability**: Easier to update individual components
- **Customization**: More control over layout and styling

### When to Use Each Approach

**Use `SuSlider` alone** when:
- You don't need a label or help message
- You're building a custom layout
- The slider is part of a more complex UI

**Use `SuFormField + SuSlider`** when:
- You need labels and help messages
- You want consistent form styling
- You need validation states
- You're building standard forms

**Use `SuSliderField`** when:
- You want the simplest API
- You're doing quick prototyping
- You don't need advanced customization