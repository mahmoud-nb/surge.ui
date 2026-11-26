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
| `prefix` | Component prefix (`Su` by default) |
| `theme` | Theme customization |
| `locale` | Language of default texts: a provided locale (`locales.en`), partial messages, a ref, or `'auto'` to follow `<html lang>` |
| `linkComponent` | Component for `to` links: NuxtLink or your own. Default: RouterLink when registered, otherwise `<a href>` |

### Component language

Default component texts (accessible labels, messages, screen reader announcements) are in French. Pass another locale to the plugin (`locales.fr`, `locales.en` or `locales.ar`):

```ts
import SurgeUI, { locales } from '@surgeui/ds-vue'

app.use(SurgeUI, { locale: locales.en })
```

With `locale: 'auto'`, the language follows the `lang` attribute of `<html>`, including when it changes without a page reload. A language with no provided translation falls back to English:

```ts
app.use(SurgeUI, { locale: 'auto' })
```

::: warning Server-side rendering
During server-side rendering (Nuxt, Vite SSR), `document` does not exist: `'auto'` gives English on the server, then the page language on the client. Pass the locale explicitly instead, based on the request language.
:::

See [useLocale](/en/composables/uselocale) to customize messages, plug in vue-i18n or switch language at runtime.

### Router links

The `to` prop of SuButton, SuLink, SuBreadcrumb (items), SuDropdown (options), SuCommandPalette (commands) and SuTabs (navigation tabs) navigates without reloading the page. The link is rendered by RouterLink when registered (Vue Router, Nuxt), otherwise by a plain `<a href>`. The `linkComponent` option sets another component:

```ts
import SurgeUI from '@surgeui/ds-vue'
import { NuxtLink } from '#components'

app.use(SurgeUI, { linkComponent: NuxtLink })
```

The component receives `to` and the link attributes (classes, `aria-*`, `target`). For your own components, `useLinkComponent()` returns the same component (`linkFor(to)`) and `navigate(to)`.

## With Tailwind CSS

`style.css` is not in any CSS layer (`@layer`). An unlayered rule beats every layered rule, so Tailwind 4 utilities set on a component (`class="w-full"`) would be ignored whenever SurgeUI sets the same property.

Import `style.layer.css` instead: the same stylesheet inside the `surgeui` layer. Place that layer between Tailwind's base and its utilities:

```css
/* main.css — Tailwind 4 */
@layer theme, base, surgeui, components, utilities;
@import "tailwindcss";
@import "@surgeui/ds-vue/style.layer.css";
```

Utilities then win over component styles, and component styles win over Tailwind's base (preflight).

Tailwind 3 and UnoCSS do not use CSS layers: keep `style.css`, imported after the base and before the utilities. With equal specificity, the last rule wins:

```css
/* main.css — Tailwind 3 with postcss-import */
@import "tailwindcss/base";
@import "@surgeui/ds-vue/style.css";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

::: tip
`SuDialog`, `SuCommandPalette` and `SuConfirmDialog` render their `<dialog>` in `<body>`: utilities set on their containers (`space-y-*`, `divide-*`…) do not reach them. See the [`teleport`](/en/components/dialog#rendering-in-body) prop.
:::

### Tailwind preset

`@surgeui/ds-vue/tailwind.css` (Tailwind 4) turns SurgeUI colors, radii and shadows into utilities, so your pages use the same color source as the components:

```css
@layer theme, base, surgeui, components, utilities;
@import "tailwindcss";
@import "@surgeui/ds-vue/style.layer.css";
@import "@surgeui/ds-vue/tailwind.css";
```

```vue
<section class="rounded-su-container border border-su-border bg-su-surface p-6 shadow-su-popover">
  <h2 class="text-su-text">Projects</h2>
  <p class="text-su-muted">12 active projects</p>
  <span class="text-su-success-fg bg-su-success-bg">Up to date</span>
</section>
```

| Group | Utilities (`bg-`, `text-`, `border-`…) |
|-------|----------------------------------------|
| Actions | `su-primary`, `su-primary-hover`, `su-primary-active`, `su-on-primary`, `su-secondary`, `su-secondary-hover`, `su-on-secondary`, `su-primary-50` to `su-primary-950` |
| Backgrounds | `su-canvas`, `su-surface`, `su-surface-elevated`, `su-overlay`, `su-hover`, `su-active`, `su-selected`, `su-accent`, `su-muted-surface` |
| Text | `su-text`, `su-muted`, `su-subtle`, `su-text-disabled`, `su-text-inverse`, `su-link`, `su-link-hover` |
| Borders | `su-border`, `su-border-subtle`, `su-border-strong`, `su-border-focus`, `su-ring` |
| States | `su-success`, `su-warning`, `su-error`, `su-info`, with `-bg` (tinted background) and `-fg` (text on that background) |
| Radii, shadows | `rounded-su-control`, `rounded-su-container`, `shadow-su-control`, `shadow-su-popover` |

Values stay the theme variables: the chosen theme, dark mode and high contrast also apply to these utilities.

## Dark mode

With [useTheme](/en/composables/usetheme), the theme and mode are set on `<html>` (`data-theme`, `data-theme-mode`). Without it, Tailwind's `.dark` class is enough: SurgeUI switches to dark when `<html>` has `.dark` and no `data-theme-mode`. See [theme fallbacks](/en/theme/#without-attributes-or-with-the-dark-class).

## TypeScript

The design system includes complete TypeScript types for imports.

```vue
<script setup lang="ts">
import { Button as SuButton } from '@surgeui/ds-vue'
import type { ButtonVariant } from '@surgeui/ds-vue'

const variant: ButtonVariant = 'primary'
</script>
```

### Global components

With `app.use(SurgeUI)`, `<SuButton>`, `<SuDialog>`… are registered globally. For Volar and vue-tsc to check their props, events and slots in templates, add the global types to the `types` list of your tsconfig:

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["@surgeui/ds-vue/global"]
  }
}
```

These types cover the default `Su` prefix. With another prefix, declare them yourself:

```ts
// surgeui.d.ts
import type { SurgeGlobalComponents } from '@surgeui/ds-vue'

declare module 'vue' {
  interface GlobalComponents extends SurgeGlobalComponents<'My'> {}
}

export {}
```