# Nuxt

SurgeUI integrates with Nuxt 3 and 4 through a plugin. A `@surgeui/nuxt` module (auto-imports, CSS, theme without flash) is planned; this guide describes the manual integration.

## Plugin

```ts
// plugins/surgeui.ts
import SurgeUI, { locales } from '@surgeui/ds-vue'
import { NuxtLink } from '#components'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(SurgeUI, {
    locale: locales.en,
    // `to` links rendered by NuxtLink (page prefetching)
    linkComponent: NuxtLink
  })
})
```

Without `linkComponent`, `to` links use RouterLink, which Nuxt also registers: navigation still happens without a reload, without NuxtLink's prefetching.

## Styles

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: ['@surgeui/ds-vue/style.css']
})
```

With Tailwind CSS 4, import the layered stylesheet in your main CSS instead (see [With Tailwind CSS](/en/guide/installation#with-tailwind-css)):

```css
/* assets/css/main.css */
@layer theme, base, surgeui, components, utilities;
@import "tailwindcss";
@import "@surgeui/ds-vue/style.layer.css";
@import "@surgeui/ds-vue/tailwind.css";
```

## Global component types

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  typescript: {
    tsConfig: {
      compilerOptions: { types: ['@surgeui/ds-vue/global'] }
    }
  }
})
```

## Theme without flash

[useTheme](/en/composables/usetheme) reads `localStorage` and `prefers-color-scheme` in the browser: the server-rendered page first shows in light mode. A short script in `<head>` sets `data-theme` and `data-theme-mode` before the first paint:

```ts
// nuxt.config.ts
const themeScript = `(() => {
  try {
    const config = JSON.parse(localStorage.getItem('su-theme-config') || '{}')
    const mode = config.themeMode === 'dark' || config.themeMode === 'light'
      ? config.themeMode
      : ['system', 'auto'].includes(config.themeMode) && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', config.theme || 'default')
    document.documentElement.setAttribute('data-theme-mode', mode)
  } catch {}
})()`

export default defineNuxtConfig({
  app: {
    head: { script: [{ innerHTML: themeScript, tagPosition: 'head' }] }
  }
})
```

Without useTheme, the `.dark` class of `@nuxtjs/color-mode` (option `classSuffix: ''`) is enough: SurgeUI switches to dark when `<html>` has `.dark` and no `data-theme-mode`.

## Language

During server-side rendering, `locale: 'auto'` cannot read `<html lang>`: pass the locale explicitly. With `@nuxtjs/i18n`:

```ts
// plugins/surgeui.ts
import { computed } from 'vue'
import SurgeUI, { matchLocale } from '@surgeui/ds-vue'

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = nuxtApp.$i18n
  nuxtApp.vueApp.use(SurgeUI, {
    locale: computed(() => matchLocale(i18n.locale.value))
  })
})
```

## Toasts and confirmations

Place `SuToaster` and `SuConfirmDialog` once, in `app.vue`:

```vue
<!-- app.vue -->
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <SuToaster />
  <SuConfirmDialog />
</template>
```

## Server-side rendering

| Item | Behavior with SSR |
|------|-------------------|
| Components | Rendered on the server. Dialogs stay in place, then move to `<body>` after mounting, with no hydration mismatch |
| `useTheme` | Reads `localStorage` and `matchMedia` in the browser only: use the `<head>` script above |
| `locale: 'auto'` | English on the server: pass the locale explicitly |
| `useBreakpoint` | Default values on the server, real ones after mounting |
