# Installation

## 📚 Resources

- **Documentation**: Complete guide with examples
- **[Storybook](/storybook/)**: Interactive examples and component playground

## Prerequisites

- Vue.js 3.3+
- Node.js 16+

## Installation via npm

```bash
npm install @surgeui/ds-vue
```

## Installation via yarn

```bash
yarn add @surgeui/ds-vue
```

## Installation via pnpm

```bash
pnpm add @surgeui/ds-vue
```

## Configuration

### Global import

```js
// main.js
import { createApp } from 'vue'
import SurgeUpDS from '@surgeui/ds-vue'
import '@surgeui/ds-vue/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(SurgeUpDS)
app.mount('#app')
```

### Selective import

```vue
<script setup>
import { SuButton } from '@surgeui/ds-vue'
import '@surgeui/ds-vue/style.css'
</script>

<template>
  <SuButton variant="primary">
    My button
  </SuButton>
</template>
```

### Configuration with options

```js
// main.js
import { createApp } from 'vue'
import SurgeUpDS from '@surgeui/ds-vue'

const app = createApp(App)

// Customize component prefix
app.use(SurgeUpDS, {
  prefix: 'My', // Components will be MyButton, MyInput, etc.
  
  // ...... # Other options are currently being developed. # ......
  // Global button configuration
  buttonRadius: 'lg',     // Large radius by default
  buttonVariant: 'outline', // Outline variant by default
  buttonSize: 'lg',       // Large size by default
  
  // Global link configuration
  linkVariant: 'primary', // Primary variant by default
  linkSize: 'lg',         // Large size by default
  linkUnderline: 'never'  // Never underlined by default
})
```

###### options

| Options     | Description          |
|-------------|----------------------|
| `prefix`    | Préfix du composants |

## TypeScript

The design system includes complete TypeScript types. No additional configuration is needed.

```vue
<script setup lang="ts">
import { SuButton } from '@surgeui/ds-vue'
import type { ButtonVariant } from '@surgeui/ds-vue'

const variant: ButtonVariant = 'primary'
</script>
```