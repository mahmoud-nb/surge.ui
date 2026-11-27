# Installation

## Prerequisites

- Vue.js 3.5+

## Installation

::: tip New name
Since 4.0.0, the package is named `@surgeui/vue` (formerly `@surgeui/ds-vue`). See [Migrating to 4.0](/en/guide/migration).
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

::: warning pnpm: minimum release age
pnpm can refuse a version published less than `minimumReleaseAge` minutes ago (24 hours by default in pnpm 11). For a new SurgeUI release, wait for that delay or add an exception limited to that version, and remove it afterwards:

```yaml
# pnpm-workspace.yaml
minimumReleaseAgeExclude:
  - '@surgeui/vue@4.2.0' # exact version: pnpm 10.19+
```
:::

## Configuration

### Global import

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

### Selective import

```vue
<script setup lang="ts">
import { Button as SuButton } from '@surgeui/vue'
import type { ButtonProps } from '@surgeui/vue/types'
</script>

<template>
  <SuButton variant="primary">
    My button
  </SuButton>
</template>
```

`app.use(SurgeUI)` registers every component: all their JavaScript ends up in the bundle, used or not. To ship only the components you use, see [Importing only what you use](#importing-only-what-you-use).

### Configuration with options

```ts
// main.ts
import { createApp } from 'vue'
import SurgeUI, { locales } from '@surgeui/vue'

const app = createApp(App)

app.use(SurgeUI, {
  prefix: 'My', // MyButton, MyInput…
  locale: locales.en,
  // Theme tokens (camelCase), applied in both modes
  theme: {
    primaryDefault: '#4f46e5',
    primaryHover: '#4338ca',
    textPrimary: '#1f2937'
  }
})
```

###### options

| Option | Description |
|--------|-------------|
| `prefix` | Component prefix (`Su` by default) |
| `theme` | Theme tokens to override, in camelCase (`primaryDefault`, `bgSurface`, `textPrimary`…): set as `--su-custom-*` on `<html>`, for light and dark mode alike. For per-mode values, override the `--su-*` variables in CSS ([Themes](/en/theme/)) |
| `locale` | Language of default texts: a provided locale (`locales.en`), partial messages, a ref, or `'auto'` to follow `<html lang>` |
| `linkComponent` | Component for `to` links: NuxtLink or your own. Default: RouterLink when registered, otherwise `<a href>` |
| `components` | Components to register, by name without prefix: `{ Button, Dialog }`. Default: all of them (none with `createSurgeUI`) |

::: tip Older examples
The `textPrimaryColor`, `button` and `link` options passed at the root (older examples on this page) are ignored: they belong in `theme`. `theme.button` (`bg`, `color`, `border`, `hoverBg`, `hoverShadow`) styles `variant="custom"` buttons, `theme.link` (`color`, `hoverColor`, `hoverBg`) styles `variant="custom"` links.
:::

### Component language

Default component texts (accessible labels, messages, screen reader announcements) are in French. Pass another locale to the plugin (`locales.fr`, `locales.en` or `locales.ar`):

```ts
import SurgeUI, { locales } from '@surgeui/vue'

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
import SurgeUI from '@surgeui/vue'
import { NuxtLink } from '#components'

app.use(SurgeUI, { linkComponent: NuxtLink })
```

The component receives `to` and the link attributes (classes, `aria-*`, `target`). For your own components, `useLinkComponent()` returns the same component (`linkFor(to)`) and `navigate(to)`.

## Importing only what you use

`app.use(SurgeUI)` and `style.css` bring the whole library: about 97 kB of JavaScript and 35 kB of CSS (gzip). To ship only the components you use:

### JavaScript

`createSurgeUI()` installs the same plugin (locale, links, toasts, confirmations, theme) without registering every component. Register the ones you need, or import them where they are used:

```ts
// main.ts
import { createApp } from 'vue'
import { createSurgeUI, Button, Dialog } from '@surgeui/vue'

createApp(App)
  .use(createSurgeUI({ locale: 'auto', components: { Button, Dialog } }))
  .mount('#app')
```

With [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components), the bundled resolver imports each component where it is used (`<SuButton>` in a template): no list to maintain.

```ts
// vite.config.ts
import Components from 'unplugin-vue-components/vite'
import { SurgeUIResolver } from '@surgeui/vue/resolver'

export default defineConfig({
  plugins: [vue(), Components({ resolvers: [SurgeUIResolver()] })]
})
```

```ts
// main.ts: the plugin is still useful for the locale, links and toasts
app.use(createSurgeUI({ locale: 'auto' }))
```

### CSS

`@surgeui/vue/css/` holds the base (tokens, themes, contrast, utilities) and one stylesheet per component. With the resolver, `importStyle` imports them along with each component, instead of `style.css`:

```ts
Components({ resolvers: [SurgeUIResolver({ importStyle: true })] })
// Tailwind 4: the same stylesheets in the surgeui layer
Components({ resolvers: [SurgeUIResolver({ importStyle: 'layer' })] })
```

Without the resolver, import the base, then the stylesheets of the components you use. A stylesheet only holds its own component: `css/manifest.json` lists, for each one, the stylesheets to load in order (Dialog: `Spinner.css`, `Button.css`, `Dialog.css`).

```css
@import "@surgeui/vue/css/base.css";
@import "@surgeui/vue/css/Spinner.css";
@import "@surgeui/vue/css/Button.css";
@import "@surgeui/vue/css/Dialog.css";
```

| Import | CSS (gzip) |
|--------|-----------:|
| `style.css` (everything) | 35 kB |
| `css/base.css` | 5.6 kB |
| Base + Button (and Spinner) | 7.3 kB |
| Base + Dialog (and Button, Spinner) | 8.2 kB |

::: warning One source only
Do not import `style.css` on top of the per-component stylesheets: the rules would be duplicated.
:::

## With Tailwind CSS

`style.css` is not in any CSS layer (`@layer`). An unlayered rule beats every layered rule, so Tailwind 4 utilities set on a component (`class="w-full"`) would be ignored whenever SurgeUI sets the same property.

Import `style.layer.css` instead: the same stylesheet inside the `surgeui` layer. Place that layer between Tailwind's base and its utilities:

```css
/* main.css — Tailwind 4 */
@layer theme, base, surgeui, components, utilities;
@import "tailwindcss";
@import "@surgeui/vue/style.layer.css";
```

Utilities then win over component styles, and component styles win over Tailwind's base (preflight).

Tailwind 3 and UnoCSS do not use CSS layers: keep `style.css`, imported after the base and before the utilities. With equal specificity, the last rule wins:

```css
/* main.css — Tailwind 3 with postcss-import */
@import "tailwindcss/base";
@import "@surgeui/vue/style.css";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

::: tip
`SuDialog`, `SuCommandPalette` and `SuConfirmDialog` render their `<dialog>` in `<body>`: utilities set on their containers (`space-y-*`, `divide-*`…) do not reach them. See the [`teleport`](/en/components/dialog#rendering-in-body) prop.
:::

### Tailwind preset

`@surgeui/vue/tailwind.css` (Tailwind 4) turns SurgeUI colors, radii and shadows into utilities, so your pages use the same color source as the components:

```css
@layer theme, base, surgeui, components, utilities;
@import "tailwindcss";
@import "@surgeui/vue/style.layer.css";
@import "@surgeui/vue/tailwind.css";
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
import { Button as SuButton } from '@surgeui/vue'
import type { ButtonVariant } from '@surgeui/vue'

const variant: ButtonVariant = 'primary'
</script>
```

### Global components

With `app.use(SurgeUI)`, `<SuButton>`, `<SuDialog>`… are registered globally. For Volar and vue-tsc to check their props, events and slots in templates, add the global types to the `types` list of your tsconfig:

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["@surgeui/vue/global"]
  }
}
```

These types cover the default `Su` prefix. With another prefix, declare them yourself:

```ts
// surgeui.d.ts
import type { SurgeGlobalComponents } from '@surgeui/vue'

declare module 'vue' {
  interface GlobalComponents extends SurgeGlobalComponents<'My'> {}
}

export {}
```