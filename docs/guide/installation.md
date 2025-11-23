# Installation

## 📚 Ressources

- **Documentation** : Guide complet avec exemples
- **[Storybook](/storybook/)** : Exemples interactifs et playground des composants

## Prérequis

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

### Import global

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

### Import sélectif

```vue
<script setup>
import { SuButton } from '@surgeui/ds-vue'
import '@surgeui/ds-vue/style.css'
</script>

<template>
  <SuButton variant="primary">
    Mon bouton
  </SuButton>
</template>
```

### Configuration avec options

```js
// main.js
import { createApp } from 'vue'
import SurgeUpDS from '@surgeui/ds-vue'

const app = createApp(App)

// Personnaliser le préfixe des composants
app.use(SurgeUpDS, {
  prefix: 'My', // Les composants seront MyButton, MyInput, etc.
  
  // ...... # D'autres options sont en cours de construction # ......
  // Configuration globale des boutons
  buttonRadius: 'lg',     // Rayon large par défaut
  buttonVariant: 'outline', // Variante outline par défaut
  buttonSize: 'lg',       // Taille large par défaut
  
  // Configuration globale des liens
  linkVariant: 'primary', // Variante primary par défaut
  linkSize: 'lg',         // Taille large par défaut
  linkUnderline: 'never'  // Jamais souligné par défaut
})
```

###### options

| Options     | Description          |
|-------------|----------------------|
| `prefix`    | Components prefix    |

## TypeScript

Le design system inclut des types TypeScript complets. Aucune configuration supplémentaire n'est nécessaire.

```vue
<script setup lang="ts">
import { SuButton } from '@surgeui/ds-vue'
import type { ButtonVariant } from '@surgeui/ds-vue'

const variant: ButtonVariant = 'primary'
</script>
```