# Nuxt

SurgeUI s'intègre à Nuxt 3 et 4 par un plugin. Un module `@surgeui/nuxt` (imports automatiques, CSS, thème sans flash) est prévu ; ce guide décrit l'intégration manuelle.

## Plugin

```ts
// plugins/surgeui.ts
import SurgeUI, { locales } from '@surgeui/ds-vue'
import { NuxtLink } from '#components'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(SurgeUI, {
    locale: locales.fr,
    // Liens `to` rendus par NuxtLink (préchargement des pages)
    linkComponent: NuxtLink
  })
})
```

Sans `linkComponent`, les liens `to` utilisent RouterLink, que Nuxt enregistre aussi : la navigation reste sans rechargement, sans le préchargement de NuxtLink.

## Styles

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: ['@surgeui/ds-vue/style.css']
})
```

Avec Tailwind CSS 4, importez plutôt la feuille en couche dans votre CSS principal (voir [Avec Tailwind CSS](/guide/installation#avec-tailwind-css)) :

```css
/* assets/css/main.css */
@layer theme, base, surgeui, components, utilities;
@import "tailwindcss";
@import "@surgeui/ds-vue/style.layer.css";
@import "@surgeui/ds-vue/tailwind.css";
```

## Types des composants globaux

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

## Thème sans flash

[useTheme](/composables/usetheme) lit `localStorage` et `prefers-color-scheme` dans le navigateur : la page rendue par le serveur s'affiche d'abord en clair. Un court script dans `<head>` pose `data-theme` et `data-theme-mode` avant le premier affichage :

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

Sans useTheme, la classe `.dark` de `@nuxtjs/color-mode` (option `classSuffix: ''`) suffit : SurgeUI passe en sombre quand `<html>` porte `.dark` et pas de `data-theme-mode`.

## Langue

En rendu serveur, `locale: 'auto'` ne peut pas lire `<html lang>` : passez la locale explicitement. Avec `@nuxtjs/i18n` :

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

## Toasts et confirmations

Placez `SuToaster` et `SuConfirmDialog` une fois, dans `app.vue` :

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

## Rendu serveur

| Élément | Comportement en SSR |
|---------|---------------------|
| Composants | Rendus côté serveur. Les dialogs restent à leur place puis rejoignent `<body>` après le montage, sans écart d'hydratation |
| `useTheme` | Lit `localStorage` et `matchMedia` dans le navigateur seulement : utilisez le script de `<head>` ci-dessus |
| `locale: 'auto'` | Anglais côté serveur : passez la locale explicitement |
| `useBreakpoint` | Valeurs par défaut côté serveur, réelles après le montage |
