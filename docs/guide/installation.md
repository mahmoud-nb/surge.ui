# Installation

## Prérequis

- Vue.js 3.5+

## Installation 

::: tip Nouveau nom
Depuis la 4.0.0, le paquet s'appelle `@surgeui/vue` (anciennement `@surgeui/ds-vue`). Voir la [migration vers la 4.0](/guide/migration).
:::

::: code-group

```bash [npm]
npm install @surgeui/vue
```

```bash [yarn]
yarn add @surgeui/vue
```

```bash [pnpm]
pnpm add @surgeui/vue
```

:::

## Configuration

### Import global

```ts
// main.ts
import { createApp } from 'vue'
import SurgeUI from '@surgeui/vue'
import '@surgeui/vue/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(SurgeUI)
app.mount('#app')
```

### Import sélectif

```vue
<script setup lang="ts">
import '@surgeui/vue/style.css'
import { Button as SuButton } from '@surgeui/vue'
import type { ButtonProps } from '@surgeui/vue/types'
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
import SurgeUI from '@surgeui/vue'

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
| `linkComponent` | Composant des liens `to` : NuxtLink ou un composant maison. Par défaut : RouterLink s'il est enregistré, sinon `<a href>` |

### Langue des composants

Les textes par défaut des composants (libellés accessibles, messages, annonces aux lecteurs d'écran) sont en français. Passez une autre locale au plugin (`locales.fr`, `locales.en` ou `locales.ar`) :

```ts
import SurgeUI, { locales } from '@surgeui/vue'

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

### Liens du routeur

La prop `to` de SuButton, SuLink, SuBreadcrumb (éléments), SuDropdown (options), SuCommandPalette (commandes) et SuTabs (onglets de navigation) navigue sans recharger la page. Le lien est rendu par RouterLink s'il est enregistré (Vue Router, Nuxt), sinon par un simple `<a href>`. L'option `linkComponent` impose un autre composant :

```ts
import SurgeUI from '@surgeui/vue'
import { NuxtLink } from '#components'

app.use(SurgeUI, { linkComponent: NuxtLink })
```

Le composant reçoit `to` et les attributs du lien (classes, `aria-*`, `target`). Pour vos propres composants, `useLinkComponent()` renvoie le même composant (`linkFor(to)`) et `navigate(to)`.

## Avec Tailwind CSS

`style.css` n'est dans aucune couche CSS (`@layer`). Or une règle hors couche l'emporte sur toutes les règles en couche : les utilitaires de Tailwind 4 posés sur un composant (`class="w-full"`) seraient ignorés dès que SurgeUI fixe la même propriété.

Importez plutôt `style.layer.css`, la même feuille dans la couche `surgeui`, et placez cette couche entre la base de Tailwind et ses utilitaires :

```css
/* main.css — Tailwind 4 */
@layer theme, base, surgeui, components, utilities;
@import "tailwindcss";
@import "@surgeui/vue/style.layer.css";
```

Les utilitaires l'emportent alors sur les styles des composants, et les styles des composants sur la base de Tailwind (preflight).

Tailwind 3 et UnoCSS n'utilisent pas de couches CSS : gardez `style.css`, importé après la base et avant les utilitaires. À spécificité égale, la dernière règle l'emporte :

```css
/* main.css — Tailwind 3 avec postcss-import */
@import "tailwindcss/base";
@import "@surgeui/vue/style.css";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

::: tip
`SuDialog`, `SuCommandPalette` et `SuConfirmDialog` rendent leur `<dialog>` dans `<body>` : les utilitaires posés sur leurs conteneurs (`space-y-*`, `divide-*`…) ne les atteignent pas. Voir la prop [`teleport`](/components/dialog#rendu-dans-body).
:::

### Préréglage Tailwind

`@surgeui/vue/tailwind.css` (Tailwind 4) transforme les couleurs, rayons et ombres de SurgeUI en utilitaires, pour styliser vos pages avec la même source de couleurs que les composants :

```css
@layer theme, base, surgeui, components, utilities;
@import "tailwindcss";
@import "@surgeui/vue/style.layer.css";
@import "@surgeui/vue/tailwind.css";
```

```vue
<section class="rounded-su-container border border-su-border bg-su-surface p-6 shadow-su-popover">
  <h2 class="text-su-text">Projets</h2>
  <p class="text-su-muted">12 projets actifs</p>
  <span class="text-su-success-fg bg-su-success-bg">À jour</span>
</section>
```

| Groupe | Utilitaires (`bg-`, `text-`, `border-`…) |
|--------|------------------------------------------|
| Actions | `su-primary`, `su-primary-hover`, `su-primary-active`, `su-on-primary`, `su-secondary`, `su-secondary-hover`, `su-on-secondary`, `su-primary-50` à `su-primary-950` |
| Fonds | `su-canvas`, `su-surface`, `su-surface-elevated`, `su-overlay`, `su-hover`, `su-active`, `su-selected`, `su-accent`, `su-muted-surface` |
| Texte | `su-text`, `su-muted`, `su-subtle`, `su-text-disabled`, `su-text-inverse`, `su-link`, `su-link-hover` |
| Bordures | `su-border`, `su-border-subtle`, `su-border-strong`, `su-border-focus`, `su-ring` |
| États | `su-success`, `su-warning`, `su-error`, `su-info`, avec `-bg` (fond teinté) et `-fg` (texte sur ce fond) |
| Rayons, ombres | `rounded-su-control`, `rounded-su-container`, `shadow-su-control`, `shadow-su-popover` |

Les valeurs restent les variables du thème : le thème choisi, le mode sombre et le contraste élevé s'appliquent aussi à ces utilitaires.

## Mode sombre

Avec [useTheme](/composables/usetheme), le thème et le mode sont posés sur `<html>` (`data-theme`, `data-theme-mode`). Sans lui, la classe `.dark` de Tailwind suffit : SurgeUI passe en sombre quand `<html>` porte `.dark` et pas de `data-theme-mode`. Voir [les replis du thème](/theme/#sans-attributs-ou-avec-la-classe-dark).

## TypeScript

Le design system inclut des types TypeScript complets pour les imports.

```vue
<script setup lang="ts">
import { Button as SuButton } from '@surgeui/vue'
import type { ButtonVariant } from '@surgeui/vue'

const variant: ButtonVariant = 'primary'
</script>
```

### Composants globaux

Avec `app.use(SurgeUI)`, `<SuButton>`, `<SuDialog>`… sont enregistrés globalement. Pour que Volar et vue-tsc vérifient leurs props, événements et slots dans les templates, ajoutez les types globaux à la liste `types` de votre tsconfig :

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["@surgeui/vue/global"]
  }
}
```

Ces types couvrent le préfixe par défaut `Su`. Avec un autre préfixe, déclarez-les vous-même :

```ts
// surgeui.d.ts
import type { SurgeGlobalComponents } from '@surgeui/vue'

declare module 'vue' {
  interface GlobalComponents extends SurgeGlobalComponents<'My'> {}
}

export {}
```