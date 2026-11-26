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
import SurgeUI from '@surgeui/ds-vue'
import '@surgeui/ds-vue/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(SurgeUI)
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
import SurgeUI from '@surgeui/ds-vue'

const app = createApp(App)

// Personnaliser le préfixe des composants
app.use(SurgeUI, {
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
  },

  // custom link style
  link: {
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
| `locale` | Langue des textes par défaut : locale fournie (`locales.en`), messages partiels, ref, ou `'auto'` pour suivre `<html lang>` |

### Langue des composants

Les textes par défaut des composants (libellés accessibles, messages, annonces aux lecteurs d'écran) sont en français. Passez une autre locale au plugin (`locales.fr`, `locales.en` ou `locales.ar`) :

```ts
import SurgeUI, { locales } from '@surgeui/ds-vue'

app.use(SurgeUI, { locale: locales.en })
```

Avec `locale: 'auto'`, la langue suit l'attribut `lang` de `<html>`, y compris quand il change sans recharger la page. Une langue sans traduction fournie donne l'anglais :

```ts
app.use(SurgeUI, { locale: 'auto' })
```

::: warning Rendu serveur
En rendu serveur (Nuxt, Vite SSR), `document` n'existe pas : `'auto'` donne l'anglais côté serveur, puis la langue de la page côté client. Passez plutôt la locale explicitement, tirée de la langue de la requête.
:::

Voir [useLocale](/composables/uselocale) pour personnaliser des messages, brancher vue-i18n ou changer de langue à la volée.

## Avec Tailwind CSS

`style.css` n'est dans aucune couche CSS (`@layer`). Or une règle hors couche l'emporte sur toutes les règles en couche : les utilitaires de Tailwind 4 posés sur un composant (`class="w-full"`) seraient ignorés dès que SurgeUI fixe la même propriété.

Importez plutôt `style.layer.css`, la même feuille dans la couche `surgeui`, et placez cette couche entre la base de Tailwind et ses utilitaires :

```css
/* main.css — Tailwind 4 */
@layer theme, base, surgeui, components, utilities;
@import "tailwindcss";
@import "@surgeui/ds-vue/style.layer.css";
```

Les utilitaires l'emportent alors sur les styles des composants, et les styles des composants sur la base de Tailwind (preflight).

Tailwind 3 et UnoCSS n'utilisent pas de couches CSS : gardez `style.css`, importé après la base et avant les utilitaires. À spécificité égale, la dernière règle l'emporte :

```css
/* main.css — Tailwind 3 avec postcss-import */
@import "tailwindcss/base";
@import "@surgeui/ds-vue/style.css";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

::: tip
`SuDialog`, `SuCommandPalette` et `SuConfirmDialog` rendent leur `<dialog>` dans `<body>` : les utilitaires posés sur leurs conteneurs (`space-y-*`, `divide-*`…) ne les atteignent pas. Voir la prop [`teleport`](/components/dialog#rendu-dans-body).
:::

## Mode sombre

Avec [useTheme](/composables/usetheme), le thème et le mode sont posés sur `<html>` (`data-theme`, `data-theme-mode`). Sans lui, la classe `.dark` de Tailwind suffit : SurgeUI passe en sombre quand `<html>` porte `.dark` et pas de `data-theme-mode`. Voir [les replis du thème](/theme/#sans-attributs-ou-avec-la-classe-dark).

## TypeScript

Le design system inclut des types TypeScript complets pour les imports.

```vue
<script setup lang="ts">
import { Button as SuButton } from '@surgeui/ds-vue'
import type { ButtonVariant } from '@surgeui/ds-vue'

const variant: ButtonVariant = 'primary'
</script>
```

### Composants globaux

Avec `app.use(SurgeUI)`, `<SuButton>`, `<SuDialog>`… sont enregistrés globalement. Pour que Volar et vue-tsc vérifient leurs props, événements et slots dans les templates, ajoutez les types globaux à la liste `types` de votre tsconfig :

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["@surgeui/ds-vue/global"]
  }
}
```

Ces types couvrent le préfixe par défaut `Su`. Avec un autre préfixe, déclarez-les vous-même :

```ts
// surgeui.d.ts
import type { SurgeGlobalComponents } from '@surgeui/ds-vue'

declare module 'vue' {
  interface GlobalComponents extends SurgeGlobalComponents<'My'> {}
}

export {}
```