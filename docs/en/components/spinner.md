**SuSpinner**
=============

A modern and accessible spinner component for displaying loading states in your Vue.js applications. This component offers multiple design variants and follows accessibility best practices.

**Usage Examples**
------------------

### Classic Spinner

<div class="component-demo">
  <SuSpinner 
    type="classic" 
    size="40" 
    color="#3b82f6" 
    label="Chargement en cours..." 
  />
</div>

```vue
<template>
  <SuSpinner 
    type="classic" 
    size="40" 
    color="#3b82f6" 
    label="Loading..." 
  />
</template>
```

### Modern Spinner

<div class="component-demo">
  <SuSpinner 
    type="modern" 
    size="48" 
    thickness="4" 
    color="#8b5cf6" 
    speed="1.5" 
  />
</div>

```vue
<template>
  <SuSpinner 
    type="modern" 
    size="48" 
    thickness="4" 
    color="#8b5cf6" 
    speed="1.5" 
  />
</template>
```

### Dots Spinner

```vue
<template>
  <SuSpinner 
    type="dots" 
    size="32" 
    color="#10b981" 
    label="Processing data..." 
  />
</template>
```

### Pulse Spinner

```vue
<template>
  <SuSpinner 
    type="pulse" 
    size="36" 
    color="#f59e0b" 
    speed="1.2" 
  />
</template>
```

### Bars Spinner

```vue
<template>
  <SuSpinner 
    type="bars" 
    size="40" 
    color="#ef4444" 
    label="Updating..." 
  />
</template>
```

### Size Variations

```vue
<template>
  <div class="spinner-group">
    <SuSpinner size="16" />
    <SuSpinner size="24" />
    <SuSpinner size="32" />
    <SuSpinner size="48" />
    <SuSpinner size="64" />
  </div>
</template>
```

<style>
.spinner-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>

### Different Colors

```vue
<template>
  <div class="spinner-colors">
    <SuSpinner color="#3b82f6" />
    <SuSpinner color="#ef4444" />
    <SuSpinner color="#10b981" />
    <SuSpinner color="#f59e0b" />
    <SuSpinner color="#8b5cf6" />
  </div>
</template>
```

**API**
-------

### **Props**

|    Prop      |    Type            |    Default    |    Description                |
|--------------|--------------------|---------------|-------------------------------|
| `type`       | `'classic' / 'modern' / 'dots' / 'pulse' / 'bars'` | `'modern'` | Type of spinner to display  |
| `size`       | `number / string`  | `12`          | Spinner size in pixels or CSS unit |
| `color`      | `string`           | `currentColor`| Spinner color (accepts any CSS color value)  |
| `thickness`  | `number`           | `2`           | Stroke thickness for classic and modern types  |
| `speed`      | `number`           | `1`           | Animation speed in seconds   |
| `label`      | `string`           | `'Loading...'`| Accessibility text for screen readers    |
| `fill`       | `string`           | `'none'`      | Background color for SVG spinners    |


### **Accessibility Attributes**

|    Attribute      |    Value               |    Description                     |
|-------------------|------------------------|------------------------------------|
| `role`            | `"status"`             | Indicates the component represents a dynamic status |
| `aria-live`       | `"polite"`             | Defines the priority level for announcements |
| `aria-hidden`     | `"true"` (on SVG)      | Hides decorative elements from screen readers |
| `focusable`       | `"false"` (on SVG)     | Prevents focus on SVG elements |

### **HTML Validation Attributes**

|    Attribute       |    Element               |    Description                     |
|--------------------|--------------------------|------------------------------------|
| `class`            | `su-spinner`             | Main component class               |
| `class`            | `su-spinner--{type}`     | Modifier class for spinner type  |
| `style`            | Root element | Dynamic styles for size and color   |
| `viewBox`          | SVG          | Defines the viewport for SVG spinners      |
| `stroke-width`     | SVG elements | Controls stroke thickness    |
| `stroke-dasharray` | SVG elements | Creates dash effect for animation  |


**Accessibility**
-----------------

The SuSpinner component complies with WCAG 2.1 AA standards and W3C best practices for accessibility. It's designed to be usable by all people, including those using assistive technologies.

### **Accessibility Features**

*   **Dynamic Announcements**: The component uses `role="status"` and `aria-live="polite"` to inform screen reader users of status changes without interrupting their reading flow.
    
*   **Accessible Labels**: The text provided via the `label` prop is visually hidden but accessible to screen readers, ensuring all users understand the loading state.
    
*   **Reduced Motion Support**: The component automatically detects `prefers-reduced-motion` preferences and adapts or disables animations accordingly, protecting users sensitive to motion.
    
*   **Color Contrast**: The default `currentColor` adapts to context, and custom colors should maintain a minimum contrast ratio of 4.5:1.
    
*   **Hidden Decorative Elements**: Purely decorative elements like SVGs are hidden from accessibility trees to avoid unnecessary noise.
    

**Advanced Usage Examples**
---------------------------

### Loading Button Integration

```vue
<template>
  <button 
    class="submit-button" 
    :disabled="isLoading"
    @click="handleSubmit"
  >
    <SuSpinner 
      v-if="isLoading" 
      type="dots" 
      size="16" 
      color="white" 
    />
    <span v-else>{{ buttonText }}</span>
  </button>
</template>
```

<script setup lang="ts">
import { ref } from 'vue'

const isLoading = ref(false)
const buttonText = ref('Submit')

const handleSubmit = async () => {
  isLoading.value = true
  // Simulate API request
  await new Promise(resolve => setTimeout(resolve, 2000))
  isLoading.value = false
  buttonText.value = 'Submitted!'
}
</script>

<style scoped>
.submit-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>

### Full Page Loading

```vue
<template>
  <div class="loading-page" v-if="loading">
    <div class="loading-content">
      <SuSpinner 
        type="modern" 
        size="64" 
        color="#3b82f6" 
        thickness="3"
        speed="1.5"
      />
      <h2>Loading your content</h2>
      <p>Please wait while we prepare your experience.</p>
      
      <div class="loading-details">
        <SuSpinner 
          type="dots" 
          size="16" 
          color="#6b7280" 
        />
        <span>Loading user data...</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-content {
  text-align: center;
  max-width: 400px;
  padding: 2rem;
}

.loading-content h2 {
  margin: 1.5rem 0 0.5rem;
  color: #1f2937;
}

.loading-content p {
  color: #6b7280;
  margin-bottom: 2rem;
}

.loading-details {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
}
</style>
```

### Progress Spinner

```vue
<template>
  <div class="progress-spinner">
    <SuSpinner 
      type="classic" 
      :size="80" 
      :thickness="4" 
      :color="progressColor" 
    />
    <div class="progress-text">
      {{ progress }}%
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const progress = ref(0)

// Progress simulation
setInterval(() => {
  if (progress.value < 100) {
    progress.value += 10
  }
}, 500)

const progressColor = computed(() => {
  if (progress.value < 30) return '#ef4444'
  if (progress.value < 70) return '#f59e0b'
  return '#10b981'
})
</script>

<style scoped>
.progress-spinner {
  position: relative;
  display: inline-block;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(\-50%, -50%);
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}
</style>
```

### Responsive Spinner with Container

```vue
<template>
  <div class="responsive-container">
    <div class="card">
      <SuSpinner 
        type="modern" 
        :size="spinnerSize" 
        color="var(--primary-color)" 
      />
      <p>Loading content...</p>
    </div>
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue'

const spinnerSize = computed(() => {
  if (typeof window !== 'undefined') {
    return window.innerWidth < 768 ? '32' : '48'
  }
  return '48'
})
</script>

<style scoped>
.responsive-container {
  container-type: inline-size;
}

.card {
  padding: 2rem;
  text-align: center;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

@container (max-width: 400px) {
  .card {
    padding: 1rem;
  }
}
</style>
```

These advanced examples demonstrate how the SuSpinner component can be integrated into various real-world scenarios while maintaining excellent accessibility and a consistent user experience.