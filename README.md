# SurgeUI Design System

An accessible **Vue 3** component library: components, layouts and composables built with the Composition API and TypeScript.

[![npm](https://img.shields.io/npm/v/@surgeui/vue)](https://www.npmjs.com/package/@surgeui/vue)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue 3](https://img.shields.io/badge/Vue-3.5+-4FC08D.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6.svg)](https://www.typescriptlang.org/)

## 📖 Documentation and examples

- **[Documentation](https://surgeui.com/)** - Guides and component API (French and English)
- **[Storybook](https://surgeui.com/storybook/)** - Interactive examples and accessibility checks
- **[npm package](https://www.npmjs.com/package/@surgeui/vue)** - Installation and usage: see the [library README](./package/vue/README.md)
- **[CHANGELOG](./CHANGELOG.md)** - Release notes, including the breaking changes of 3.0

## ✨ Features

- 🧩 **85+ components** - Display, actions, forms, data (DataTable, TreeView, Timeline), app structure (AppShell, NavMenu, CommandPalette) and 9 mobile-first layouts
- ♿ **Accessible** - WAI-ARIA patterns, full keyboard support, screen reader announcements
- 🎨 **Themable** - 4 built-in themes × light / dark mode, CSS custom properties
- 🌍 **Translatable** - Default texts in French, English and Arabic, or following `<html lang>`
- 🔧 **TypeScript** - Typed props, emits and composables
- 🔄 **RTL & LTR** - Right-to-left support (Arabic, Hebrew, Persian), including keyboard navigation
- 📦 **Lightweight when needed** - `createSurgeUI()`, an unplugin-vue-components resolver and one stylesheet per component

## 🚀 Quick start

```bash
npm install @surgeui/vue
```

```ts
// main.ts
import { createApp } from 'vue'
import SurgeUI from '@surgeui/vue'
import '@surgeui/vue/style.css'
import App from './App.vue'

createApp(App).use(SurgeUI).mount('#app')
```

Components are then available with the `Su` prefix: `<SuButton>`, `<SuInputField>`, `<SuDialog>`… Requires Vue **3.5+**. To ship only the components you use, see [Importing only what you use](https://surgeui.com/en/guide/installation#importing-only-what-you-use).

## 🗂️ Repository

npm workspaces monorepo:

| Folder | Package | Content |
|--------|---------|---------|
| `package/vue/` | `@surgeui/vue` | Component library (published on npm), Storybook, tests |
| `docs/` | `@surgeui/ds-docs` | VitePress documentation (French + `/en`) |

## 🛠️ Development

Requires Node.js **20+**.

```bash
npm install            # Install both workspaces
npm run storybook      # Storybook on port 6006
npm run dev            # Build the library, then start the docs dev server
npm test               # Unit tests (Vitest)
npm run lint           # ESLint + Stylelint
npm run build          # Build the library and the docs
```

### Releases

Commits follow [Conventional Commits](https://www.conventionalcommits.org/) (`npm run commit`).

```bash
npm run release:dry                   # Preview the next version and changelog
npm run release                       # Bump versions, update CHANGELOG, tag vX.Y.Z
npm install --package-lock-only       # Sync the lockfile
git push --follow-tags origin main    # The tag triggers npm publication (GitHub Actions)
```

`npm run release:publish` builds and publishes the library manually if needed.

## 📄 License

MIT - see [LICENSE](./package/LICENSE.md).
