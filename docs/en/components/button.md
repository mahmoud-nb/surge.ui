# Button

Flexible button component with multiple variants, sizes and states. Supports keyboard interactions and loading states.

## Examples with icons

### Icons

<div class="component-demo">
  <div class="demo-section">
    <h4>Buttons with icons</h4>
    <div class="demo-buttons">
      <SuButton variant="primary" :icon="PlusIcon" iconDisplay="left">Add</SuButton>
      <SuButton variant="secondary" :icon="ArrowRightIcon" iconDisplay="right">Next</SuButton>
      <SuButton variant="outline" :icon="HeartIcon" iconDisplay="only" aria-label="Like" />
      <SuButton variant="ghost" :icon="TrashIcon" iconDisplay="only" aria-label="Delete" />
    </div>
  </div>
</div>

```vue
<script setup>
import { PlusIcon, ArrowRightIcon, HeartIcon, TrashIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <!-- Icon before text -->
  <SuButton variant="primary" :icon="PlusIcon" iconDisplay="left">
    Add
  </SuButton>
  
  <!-- Icon after text -->
  <SuButton variant="secondary" :icon="ArrowRightIcon" iconDisplay="right">
    Next
  </SuButton>
  
  <!-- Icon only (requires aria-label) -->
  <SuButton variant="outline" :icon="HeartIcon" iconDisplay="only" aria-label="Like" />
  <SuButton variant="ghost" :icon="TrashIcon" iconDisplay="only" aria-label="Delete" />
</template>
```

### Variants

<div class="component-demo">
  <div class="demo-section">
    <h4>Available variants</h4>
    <div class="demo-buttons">
      <SuButton variant="primary">Primary</SuButton>
      <SuButton variant="secondary">Secondary</SuButton>
      <SuButton variant="outline">Outline</SuButton>
      <SuButton variant="ghost">Ghost</SuButton>
    </div>
  </div>
</div>

```vue
<template>
  <SuButton variant="primary">Primary</SuButton>
  <SuButton variant="secondary">Secondary</SuButton>
  <SuButton variant="outline">Outline</SuButton>
  <SuButton variant="ghost">Ghost</SuButton>
</template>
```

### Sizes

<div class="component-demo">
  <div class="demo-section">
    <h4>Available sizes</h4>
    <div class="demo-buttons">
      <SuButton size="sm">Small</SuButton>
      <SuButton size="md">Medium</SuButton>
      <SuButton size="lg">Large</SuButton>
    </div>
  </div>
</div>

```vue
<template>
  <SuButton size="sm">Small</SuButton>
  <SuButton size="md">Medium</SuButton>
  <SuButton size="lg">Large</SuButton>
</template>
```

### States

<div class="component-demo">
  <div class="demo-section">
    <h4>Button states</h4>
    <div class="demo-buttons">
      <SuButton>Normal</SuButton>
      <SuButton :disabled="true">Disabled</SuButton>
      <SuButton :loading="true">Loading</SuButton>
    </div>
  </div>
</div>

```vue
<template>
  <SuButton>Normal</SuButton>
  <SuButton :disabled="true">Disabled</SuButton>
  <SuButton :loading="true">Loading</SuButton>
</template>
```

### Full width

<div class="component-demo">
  <div class="demo-section">
    <h4>Full width button</h4>
    <div class="demo-buttons-vertical">
      <SuButton :block="true">Full width button</SuButton>
      <SuButton variant="outline" :block="true">Outline full width</SuButton>
    </div>
  </div>
</div>

```vue
<template>
  <SuButton :block="true">Full width button</SuButton>
  <SuButton variant="outline" :block="true">Outline full width</SuButton>
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Native type. Use `'submit'` to submit a form |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'custom'` | `'primary'` | Visual variant: solid primary, soft secondary, neutral outline (subtle border and highlight), transparent ghost |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size: 32/36/40px on mobile, 28/32/36px from 640px |
| `radius` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `undefined` | Border radius. Defaults to the control radius (`--su-radius-control`, 10px) |
| `disabled` | `boolean` | `false` | Disable the button |
| `loading` | `boolean` | `false` | Show loading spinner |
| `block` | `boolean` | `false` | Take full available width |
| `icon` | `Component` | `undefined` | Icon to display |
| `iconDisplay` | `'left' \| 'right' \| 'only'` | `'left'` | Icon position |
| `ariaLabel` | `string` | `undefined` | Accessible label for screen readers |
| `ariaDescribedBy` | `string` | `undefined` | ID of element describing the button |
| `ariaExpanded` | `boolean` | `undefined` | Indicates if controlled element is expanded |
| `ariaPressed` | `boolean` | `undefined` | Indicates pressed state of toggle button |
| `role` | `string` | `undefined` | Custom ARIA role |
| `tabIndex` | `number` | `0` | Tab order |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `@click` | `(event: MouseEvent) => void` | Emitted when button is clicked |
| `@focus` | `(event: FocusEvent) => void` | Emitted when button receives focus |
| `@blur` | `(event: FocusEvent) => void` | Emitted when button loses focus |
| `@keydown` | `(event: KeyboardEvent) => void` | Emitted when key is pressed |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Button content |

## Accessibility

The Button component follows WCAG 2.1 AA standards:

### ✅ Accessibility features

- **Keyboard navigation**: Support for Enter and Space keys
- **Visible focus**: Clear and contrasted focus indicator
- **Minimum sizes**: Respects minimum touch target sizes (44px)
- **Contrast**: WCAG AA compliant contrast ratios (4.5:1 minimum)
- **ARIA states**: Complete support for ARIA attributes
- **Screen readers**: Accessible labels and descriptions
- **Reduced motion**: Respects `prefers-reduced-motion`
- **Dark mode**: Adapted contrast in dark mode
- **High contrast**: Support for `prefers-contrast: high`
- **Accessible icons**: Icons marked with `aria-hidden="true"`

### 🎯 Best practices

```vue
<!-- Button with icon only (REQUIRED: aria-label) -->
<SuButton :icon="TrashIcon" iconDisplay="only" aria-label="Delete item" />

<!-- Button with icon and text -->
<SuButton :icon="PlusIcon" iconDisplay="left">Add item</SuButton>

<!-- Button with accessible label -->
<SuButton aria-label="Delete item">
  <TrashIcon />
</SuButton>

<!-- Button with description -->
<SuButton aria-describedby="save-help">
  Save
</SuButton>
<div id="save-help">Auto-saves every 30 seconds</div>

<!-- Toggle button -->
<SuButton 
  :aria-pressed="isActive"
  @click="toggle"
>
  {{ isActive ? 'Active' : 'Inactive' }}
</SuButton>
```

## Usage examples

### Using with Heroicons

The most common Heroicons are available globally:

```vue
<template>
  <!-- Icon before text -->
  <SuButton 
    variant="primary" 
    :icon="PlusIcon"
    iconDisplay="left"
  >
    Add
  </SuButton>
  
  <!-- Icon after text -->
  <SuButton 
    variant="secondary" 
    :icon="ArrowRightIcon"
    iconDisplay="right"
  >
    Continue
  </SuButton>
  
  <!-- Icon only with accessible labels -->
  <SuButton 
    variant="ghost" 
    :icon="HeartIcon"
    iconDisplay="only"
    aria-label="Like this post"
  />
  
  <SuButton 
    variant="outline" 
    :icon="ShareIcon"
    iconDisplay="only"
    aria-label="Share"
  />
  
  <SuButton 
    variant="primary" 
    :icon="ArrowDownTrayIcon"
    iconDisplay="only"
    aria-label="Download file"
  />
</template>
```

### Custom icon import

To use other Heroicons:

```vue
<script setup>
import { CogIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <SuButton :icon="CogIcon" iconDisplay="left">
    Settings
  </SuButton>
</template>
```

### Button with click handler

```vue
<script setup>
const handleClick = () => {
  console.log('Button clicked!')
}
</script>

<template>
  <SuButton @click="handleClick">
    Click me
  </SuButton>
</template>
```

### Form submission button

```vue
<script setup>
import { ref } from 'vue'

const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  try {
    // Submission logic
    await submitForm()
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <!-- Form fields -->
    <SuButton 
      type="submit" 
      :loading="isSubmitting"
      :disabled="isSubmitting"
      :aria-label="isSubmitting ? 'Submitting...' : 'Submit form'"
    >
      {{ isSubmitting ? 'Submitting...' : 'Submit' }}
    </SuButton>
  </form>
</template>
```

## Global configuration

You can configure default button values when installing the design system:

```js
// main.js
import { createApp } from 'vue'
import SurgeUpDS from '@surgeui/ds-vue'
import '@surgeui/ds-vue/style.css'

const app = createApp(App)

// Configure default values
app.use(SurgeUpDS, {
  buttonRadius: 'lg',     // All buttons will have large radius by default
  buttonVariant: 'outline', // All buttons will be outline by default
  buttonSize: 'lg'        // All buttons will be large by default
})
```

### Usage with global configuration

```vue
<template>
  <!-- These buttons will use globally configured values -->
  <SuButton>Button with global config</SuButton>
  <SuButton variant="default" size="default" radius="default">Same thing explicitly</SuButton>
  
  <!-- These buttons override global configuration -->
  <SuButton variant="primary">Specific variant</SuButton>
  <SuButton size="sm">Specific size</SuButton>
  <SuButton radius="none">Specific radius</SuButton>
</template>
```

### Available configuration options

| Option | Type | Description |
|--------|------|-------------|
| `buttonRadius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | Default border radius |
| `buttonVariant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | Default variant |
| `buttonSize` | `'sm' \| 'md' \| 'lg'` | Default size |