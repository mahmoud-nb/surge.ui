# Installation

## Prérequis

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

### Import global

```ts
// main.ts
import { createApp } from 'vue'
import SurgeUpDS from '@surgeui/ds-vue'
import '@surgeui/ds-vue/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(SurgeUpDS)
app.mount('#app')
```

### Import sélectif

```vue
<script setup lang="ts">
import '@surgeui/ds-vue/style.css'
import { Button as SuButton } from '@surgeui/ds-vue'
import type { ButtonProps } from '@surgeui/ds-vue/types'
</script>

<template>
  <SuButton variant="primary">
    Mon bouton
  </SuButton>
</template>
```

### Configuration avec options

```ts
// main.ts
import { createApp } from 'vue'
import SurgeUpDS from '@surgeui/ds-vue'

const app = createApp(App)

// Personnaliser le préfixe des composants
app.use(SurgeUpDS, {
  prefix: 'My', // Les composants seront MyButton, MyInput, etc.
  
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
| `prefix` | Préfixe des composants (`Su` par défaut) |
| `theme` | Personnalisation du thème |
| `locale` | Langue des textes par défaut : locale fournie (`locales.en`), messages partiels ou ref |

### Langue des composants

Les textes par défaut des composants (libellés accessibles, messages, annonces aux lecteurs d'écran) sont en français. Passez une autre locale au plugin :

```ts
import SurgeUI, { locales } from '@surgeui/ds-vue'

app.use(SurgeUI, { locale: locales.en })
```

Voir [useLocale](/composables/uselocale) pour personnaliser des messages ou changer de langue à la volée.

## TypeScript

Le design system inclut des types TypeScript complets. Aucune configuration supplémentaire n'est nécessaire.

```vue
<script setup lang="ts">
import { Button as SuButton } from '@surgeui/ds-vue'
import type { ButtonVariant } from '@surgeui/ds-vue'

const variant: ButtonVariant = 'primary'
</script>
```