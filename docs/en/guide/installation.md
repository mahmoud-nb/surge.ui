# Installation

## Prerequisites

- Vue.js 3.5+

## Installation

::: code-group

```bash [npm]
npm install @surgeui/ds-vue
```

```bash [yarn]
yarn add @surgeui/ds-vue
```

```bash [pnpm]
pnpm add @surgeui/ds-vue
```

:::

## Configuration

### Global import

```ts
// main.ts
import { createApp } from 'vue'
import SurgeUI from '@surgeui/ds-vue'
import '@surgeui/ds-vue/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(SurgeUI)
app.mount('#app')
```

### Selective import

```vue
<script setup lang="ts">
import '@surgeui/ds-vue/style.css'
import { Button as SuButton } from '@surgeui/ds-vue'
import type { ButtonProps } from '@surgeui/ds-vue/types'
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
import SurgeUI from '@surgeui/ds-vue'

const app = createApp(App)

// Customize component prefix
app.use(SurgeUI, {
  prefix: 'My', // Components will be MyButton, MyInput, etc.
  
  // custom text color
  textPrimaryColor: '#213222',
  textSecondaryColor: '#454344',
  textTeriaryColor: '#676965',

  // Custom Button style
  button: {
    bg: '#101010',
    color: '#FFFFFF',
    border: 'none',
    hoverBackground: '#383838',
    hoverShadow: '0 0'
  }

  // custom link style
  link?: {
    color: '#2563eb',
    hoverColor: '#1e40af',
    hoverBackground: 'none',
    activeColor: '#1e3a8a',
  }

  // Other options are currently under development.
})
```

###### options

| Option | Description |
|--------|-------------|
| `prefix` | Component prefix (`Su` by default) |
| `theme` | Theme customization |
| `locale` | Language of default texts: a provided locale (`locales.en`), partial messages or a ref |

### Component language

Default component texts (accessible labels, messages, screen reader announcements) are in French. Pass another locale to the plugin:

```ts
import SurgeUI, { locales } from '@surgeui/ds-vue'

app.use(SurgeUI, { locale: locales.en })
```

See [useLocale](/en/composables/uselocale) to customize messages or switch language at runtime.

## TypeScript

The design system includes complete TypeScript types. No additional configuration is needed.

```vue
<script setup lang="ts">
import { Button as SuButton } from '@surgeui/ds-vue'
import type { ButtonVariant } from '@surgeui/ds-vue'

const variant: ButtonVariant = 'primary'
</script>
```