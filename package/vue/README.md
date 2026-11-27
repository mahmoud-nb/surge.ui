# SurgeUI Vue Design System

An accessible **Vue 3** component library: components, layouts and composables built with the Composition API and TypeScript, themable through CSS custom properties.

[![npm](https://img.shields.io/npm/v/@surgeui/vue)](https://www.npmjs.com/package/@surgeui/vue)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue 3](https://img.shields.io/badge/Vue-3.5+-4FC08D.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6.svg)](https://www.typescriptlang.org/)

> Published as `@surgeui/ds-vue` up to 3.x. Its 4.0.0 version is a deprecated relay to this package, and later versions are only published as `@surgeui/vue`. See [Migrating to 4.0](https://surgeui.com/en/guide/migration).

## ✨ Features

- 🧩 **85+ components** - Display, actions, forms, data (DataTable, TreeView, Timeline), app structure (AppShell, NavMenu, CommandPalette) and 9 mobile-first layouts
- ♿ **Accessible** - WAI-ARIA patterns (combobox, menu button, tabs, accordion, dialog), full keyboard support, screen reader announcements
- 🎨 **Themable** - 4 built-in themes × light / dark mode, CSS custom properties (`--su-*`)
- 🌍 **Translatable** - Default texts in French, English and Arabic (or following `<html lang>`), customizable messages
- 🔧 **TypeScript** - Typed props, emits and composables
- 📱 **Responsive** - Mobile first; layouts adapt to their **container** width (container queries)
- 🔄 **RTL & LTR** - Right-to-left support (Arabic, Hebrew, Persian), including keyboard navigation
- 📦 **Lightweight when needed** - `createSurgeUI()`, an unplugin-vue-components resolver and one stylesheet per component

## Quick Start

### Requirements

- Vue **3.5+**

### Installation

```bash
npm install @surgeui/vue
```

### Global installation (recommended)

Registers every component with the `Su` prefix (`SuButton`, `SuInputField`, …):

```ts
// main.ts
import { createApp } from 'vue'
import SurgeUI from '@surgeui/vue'
import '@surgeui/vue/style.css'
import App from './App.vue'

createApp(App)
  .use(SurgeUI)
  .mount('#app')
```

```vue
<template>
  <SuButton variant="primary">My first button</SuButton>
</template>
```

### Selective import

Components are exported **without** the prefix:

```vue
<script setup lang="ts">
import '@surgeui/vue/style.css'
import { Button as SuButton, InputField as SuInputField } from '@surgeui/vue'
import type { ButtonProps } from '@surgeui/vue'
</script>

<template>
  <SuInputField label="Email" type="email" />
  <SuButton variant="primary">Subscribe</SuButton>
</template>
```

### Importing only what you use

`app.use(SurgeUI)` registers every component. `createSurgeUI()` installs the same plugin (locale, links, toasts, confirmations) and registers only the components you pass; the others stay out of the bundle:

```ts
import { createSurgeUI, Button, Dialog } from '@surgeui/vue'

app.use(createSurgeUI({ locale: 'auto', components: { Button, Dialog } }))
```

With [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components), the bundled resolver imports components where templates use them, and their CSS with `importStyle` (`@surgeui/vue/css/base.css` plus one stylesheet per component, instead of `style.css`):

```ts
// vite.config.ts
import Components from 'unplugin-vue-components/vite'
import { SurgeUIResolver } from '@surgeui/vue/resolver'

export default defineConfig({
  plugins: [vue(), Components({ resolvers: [SurgeUIResolver({ importStyle: true })] })]
})
```

See [Importing only what you use](https://surgeui.com/en/guide/installation#importing-only-what-you-use).

### Plugin options

```ts
import SurgeUI, { locales } from '@surgeui/vue'

app.use(SurgeUI, {
  prefix: 'Su',           // Component prefix: SuButton, SuDialog…
  locale: locales.en,     // Default texts language (French by default)
  theme: {                // Theme overrides (see Customization)
    primaryDefault: '#2563eb'
  }
})
```

## 🧩 What's inside

| Category | Components |
|----------|------------|
| Display | Heading, Panel, Divider, Kbd, VisuallyHidden, Icon, Image, Avatar, AvatarGroup, Badge, Tag, Card, Alert, Toast, Toaster, Tooltip, Popover, Dialog, ConfirmDialog, Tabs, Accordion, Progress, Spinner, Skeleton, EmptyState, Price, Stat, Timeline, PageHeader, CodeBlock, Prose, DataTable, TreeView |
| Actions | Button, ButtonGroup, Link, LinkGroup, Toggle, ToggleGroup, Dropdown, FloatButton, Breadcrumb, Pagination, Stepper, CommandPalette, NavMenu, ThemeToggle, SkipLink, CopyButton |
| Forms | Input, Textarea, NumberInput, Password, Autocomplete, SelectBox, DatePicker, Calendar, Checkbox, RadioGroup, CheckboxGroup, Switch, Slider, FileUpload, OtpInput, Rating, FormField, FormFieldGroup, and a `*Field` version of each control (label + message) |
| Layouts | AppShell, SingleColumnLayout, SidebarLayout, SplitLayout, HolyGrailLayout, MagazineLayout, GridLayout, MasonryLayout, HeroLayout, FullScreenLayout |

### Composables

| Composable | Purpose |
|------------|---------|
| `useTheme` | Theme and light / dark mode, system preference, persistence |
| `useCustomTheme` | Runtime CSS variable overrides |
| `useBreakpoint` | Reactive breakpoints |
| `usePrice` | Localized price formatting |
| `useLocale` | Default component texts in French, English or Arabic (`provideLocale`, `defineLocale`, `locale: 'auto'`) |
| `useToast` | Toast notifications, rendered by `SuToaster` |
| `useConfirm` | Promise-based confirmations, rendered by `SuConfirmDialog` |
| `useClipboard` | Copy to the clipboard, with an announcement |
| `useLinkComponent` | Router links (`to`) with RouterLink, NuxtLink or your own component |
| `useFormField` | Links a custom control to `SuFormField` (id, label, message, states) |
| `useAnnouncer` | Screen reader announcements through persistent live regions |
| `useFocusTrap` | Stacked focus traps for panels and modal popovers |
| `useDismiss` | Layered dismissal: Escape, pointer down outside, focus loss |
| `useListNavigation` / `useTypeahead` | Arrow keys, Home / End and typeahead for lists, menus and tabs |
| `useFloatingPosition` | Positions a floating element against its trigger (flip, shift, arrow) |

## 📝 Forms

A control placed in `SuFormField` links itself to the field: label, help message, `aria-describedby`, error state, `required` and `disabled`. No slot props needed:

```vue
<SuFormField label="Country" message="Country of residence" state="error" required>
  <SuSelectBox :options="countries" v-model="country" />
</SuFormField>
```

The `*Field` components (`SuInputField`, `SuSelectBoxField`…) bundle the field and the control in one component.

## 🎨 Themes and dark mode

Four themes (`default`, `ocean`, `forest`, `sunset`), each in light and dark mode. They are applied through the `data-theme` and `data-theme-mode` attributes on the root element; `useTheme` sets them for you, follows the system preference and remembers the user's choice:

```vue
<script setup>
import { useTheme } from '@surgeui/vue'

const { setTheme, setThemeMode, toggleMode, isDarkMode } = useTheme()
</script>

<template>
  <SuButton @click="toggleMode">{{ isDarkMode ? 'Light' : 'Dark' }} mode</SuButton>
  <SuButton @click="setTheme('ocean')">Ocean theme</SuButton>
</template>
```

`setThemeMode` accepts `'light'`, `'dark'` or `'system'`. Without `useTheme`, set the attributes yourself:

```html
<html data-theme="default" data-theme-mode="dark">
```

## 🎨 Customization

### Theme configuration

Theme properties passed to the plugin become CSS variables with the `--su-custom-` prefix, which override the default tokens:

```ts
app.use(SurgeUI, {
  theme: {
    textPrimary: '#1f2937',      // → --su-custom-text-primary
    bgSurface: '#f9fafb',        // → --su-custom-bg-surface
    primaryDefault: '#3b82f6',   // → --su-custom-primary-default
    primaryHover: '#2563eb',
    stateError: '#ef4444'
  }
})
```

### CSS variables

You can also define the variables directly, globally or on a section of the page:

```css
:root {
  --su-custom-primary-default: #3b82f6;
  --su-custom-primary-hover: #2563eb;
  --su-custom-primary-text: #ffffff;
}

/* Values for the dark mode */
[data-theme-mode='dark'] {
  --su-custom-bg-canvas: #111827;
  --su-custom-bg-surface: #1f2937;
}

/* A section with its own colors */
.promo {
  --su-custom-primary-default: #db2777;
}
```

Priority: `--su-custom-*` variables (CSS or plugin `theme` option) → theme tokens.

### Available theme keys

- **Text** - `textPrimary`, `textSecondary`, `textTertiary`, `textDisabled`, `textInverse`
- **Links** - `linkDefault`, `linkHover`, `linkVisited`, `linkMuted`
- **Backgrounds** - `bgCanvas`, `bgSurface`, `bgSurfaceElevated`, `bgOverlay`, `bgDisabled`, `bgHover`, `bgActive`, `bgSelected`
- **Borders** - `borderDefault`, `borderSubtle`, `borderStrong`, `borderFocus`, `borderDisabled`
- **Primary actions** - `primaryDefault`, `primaryHover`, `primaryActive`, `primaryDisabled`, `primaryText`
- **Secondary actions** - `secondaryDefault`, `secondaryHover`, `secondaryActive`, `secondaryDisabled`, `secondaryText`
- **States** - `stateSuccess`, `stateWarning`, `stateError`, `stateInfo` and their `…Bg` variants
- **Shadow** - `shadowColor`

## 🌍 Languages

Default component texts (accessible labels, placeholders, error messages, announcements) are in French; English and Arabic are provided (`locales.en`, `locales.ar`). With `locale: 'auto'`, the language follows `<html lang>`. An explicit prop always wins.

```ts
import SurgeUI, { defineLocale, locales } from '@surgeui/vue'

app.use(SurgeUI, {
  locale: defineLocale(locales.en, {
    messages: { selectBox: { placeholder: 'Pick one…' } }
  })
})
```

The `locale` option also accepts a ref, and `provideLocale()` switches the language of a subtree at runtime.

## 🖼️ Icons

Components accept any Vue component as an icon; the examples use [Heroicons](https://heroicons.com/):

```vue
<script setup>
import { HeartIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <SuButton variant="primary" :icon="HeartIcon" icon-display="left">I like it</SuButton>
</template>
```

## ♿ Accessibility

Components are built to meet **WCAG 2.1 AA**:

- **WAI-ARIA patterns** - combobox + listbox (SelectBox), menu button (Dropdown), tabs, accordion, modal dialog (native `<dialog>`)
- **Keyboard** - arrow keys, Home / End, typeahead, Escape; RTL-aware arrows
- **Focus** - visible focus rings, focus returned to the trigger, focus trap for modal popovers
- **Forms** - labels, messages and states linked automatically to the control
- **Screen readers** - persistent live regions for announcements, named landmarks (HolyGrailLayout, with skip link)
- **Preferences** - `prefers-reduced-motion`, `prefers-contrast: more`, minimum touch targets

## ⬆️ Upgrading to 4.0

- The package is renamed `@surgeui/vue`: replace `@surgeui/ds-vue` in your dependencies and imports (subpaths unchanged).
- Removed deprecated APIs: `useTheme().toggleTheme()` (use `toggleMode()`), `setTheme('light' | 'dark')` and the `DeprecatedThemeName` type (use `setTheme('default')` + `setThemeMode()`), `accessibility.trapFocus()` (use `createFocusTrap()` / `useFocusTrap()`), `accessibility.announceToScreenReader()` (use `announce()` / `useAnnouncer()`), the Dropdown option `separator: true` (use `{ type: 'separator' }` or `separatorBefore: true`) and the `SuDialog` `zIndex` prop.

See [Migrating to 4.0](https://surgeui.com/en/guide/migration).

## ⬆️ Upgrading to 3.0

Version 3.0 contains breaking changes:

- `SuButton` has `type="button"` by default: pass `type="submit"` to submit a form.
- `SuSwitch` renders a `<button>` instead of a `<div>`.
- `SuDialog` uses the native `<dialog>` element: the `zIndex` prop has no effect and the backdrop is `::backdrop`.
- Vue **3.5+** is required.
- `accessibility.announceToScreenReader()` and `accessibility.trapFocus()` are deprecated in favor of `announce()` / `useAnnouncer()` and `useFocusTrap()`.

See the [CHANGELOG](https://github.com/mahmoud-nb/surge.ui/blob/main/CHANGELOG.md) for the full list.

## 📖 Documentation

- [Documentation](https://surgeui.com/) - Guides, component API, live examples (French and English)
- [Storybook](https://surgeui.com/storybook/) - Interactive examples and accessibility checks
- [GitHub Repository](https://github.com/mahmoud-nb/surge.ui)
- For AI coding assistants: [`AGENTS.md`](./AGENTS.md) (shipped in the package), [llms.txt](https://surgeui.com/llms.txt) and [llms-full.txt](https://surgeui.com/llms-full.txt)

## 🤝 Contributing

Contributions are welcome! See the [Contributing Guide](https://github.com/mahmoud-nb/surge.ui/blob/main/package/CONTRIBUTING.md).

## 📄 License

MIT - see the [LICENSE](https://github.com/mahmoud-nb/surge.ui/blob/main/package/LICENSE.md) file.

---

Made with ❤️ by the SurgeUI team
