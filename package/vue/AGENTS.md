# SurgeUI — guide for AI coding assistants

`@surgeui/vue` is an accessible, themable Vue 3 component library. This file is shipped with the npm package so that coding assistants use the API of the installed version instead of guessing. Full documentation: https://surgeui.com/llms.txt (index) and https://surgeui.com/llms-full.txt (everything, English); each page also exists in Markdown, e.g. https://surgeui.com/en/components/button.md.

## Setup

```ts
// main.ts
import { createApp } from 'vue'
import SurgeUI, { locales } from '@surgeui/vue'
import '@surgeui/vue/style.css'
import App from './App.vue'

createApp(App)
  .use(SurgeUI, {
    locale: locales.en,      // default texts: French unless set; 'auto' follows <html lang>
    // prefix: 'Su',         // global component prefix (default 'Su')
    // linkComponent: NuxtLink // component used for `to` links (default: RouterLink when registered)
  })
  .mount('#app')
```

- Requires Vue 3.5+. Install with `npm install @surgeui/vue`.
- Import one stylesheet once: `@surgeui/vue/style.css`. With Tailwind CSS 4, import `@surgeui/vue/style.layer.css` and `@surgeui/vue/tailwind.css` after `@layer theme, base, surgeui, components, utilities;` and `@import "tailwindcss";`.
- Typed templates: add `"types": ["@surgeui/vue/global"]` to `compilerOptions` in tsconfig.json. Run `vue-tsc` to catch wrong props.
- Nuxt: register the plugin in `plugins/surgeui.ts` with `linkComponent: NuxtLink`, add the stylesheet to `css` in nuxt.config.ts (see https://surgeui.com/en/guide/nuxt.md).
- Former package name: `@surgeui/ds-vue` (up to 3.x, deprecated). Always use `@surgeui/vue`.

## Rules

1. **Names.** Components are registered globally with the `Su` prefix: `<SuButton>`, `<SuInputField>`, `<SuDataTable>`. Named imports have no prefix: `import { Button, InputField } from '@surgeui/vue'`. Do not invent components: use the catalog below.
2. **Forms.** Controls use `v-model`. For a label, a help or error message and a validation state, use a `*Field` component (`<SuInputField label="Email" message="…" state="error" required>`) or wrap a control in `<SuFormField label="…">`. States: `'default' | 'error' | 'success' | 'warning'`. Sizes: `'sm' | 'md' | 'lg'`.
3. **Links and icons.** Router links use the `to` prop (`<SuButton to="/settings">`), plain links `href`. Icons are Vue components passed as props (`:icon="PlusIcon"` from `@heroicons/vue/24/outline`). An icon-only button needs a name: `icon-display="only"` with `aria-label`.
4. **Overlays and feedback.** `SuDialog` opens with `v-model` and needs a `title` (or `aria-label`). Toasts: `const toast = useToast(); toast.success('Saved')`, with `<SuToaster />` placed once in the app. Confirmations: `const { confirm } = useConfirm(); if (await confirm({ title: 'Delete?', tone: 'danger' })) …`, with `<SuConfirmDialog />` placed once. Screen reader announcements: `useAnnouncer().announce('3 results')`; never add your own `aria-live` regions.
5. **Theming.** Style with the `--su-*` CSS custom properties (`var(--su-text-primary)`, `var(--su-bg-surface)`, `var(--su-primary-default)`); do not hard-code colors. Switch theme and mode with `useTheme()`: `setTheme('ocean')`, `setThemeMode('dark' | 'light' | 'system')`, `toggleMode()`. Themes: `default`, `ocean`, `forest`, `sunset`.
6. **Texts and direction.** Default texts come from the locale (`fr`, `en`, `ar`); text props such as `closeLabel` override them. Right-to-left works with `dir="rtl"` on `<html>` or a container, with no extra setup.
7. **Layout.** Page structure: `SuAppShell` (sidebar, top bar, drawer on mobile) with `SuNavMenu` and `SuPageHeader`; page layouts: `SuSidebarLayout`, `SuGridLayout`, `SuHolyGrailLayout`…; written content: `SuProse` (or the `su-prose` class).
8. **Accessibility.** Keep visible labels, one `h1` per page (`SuPageHeader` renders `h1` by default; set `level` otherwise), and the keyboard behavior the components provide (do not replace their buttons or links with `div`s).

## Removed in 4.0 (do not use)

| Removed | Use instead |
|---------|-------------|
| `useTheme().toggleTheme()` | `toggleMode()` |
| `setTheme('light')`, `setTheme('dark')`, type `DeprecatedThemeName` | `setTheme('default')` and `setThemeMode('light' \| 'dark')` |
| `accessibility.trapFocus()` | `createFocusTrap()` or `useFocusTrap()` |
| `accessibility.announceToScreenReader()` | `announce()` or `useAnnouncer()` |
| `SuDropdown` option `separator: true` | `{ type: 'separator' }` or `separatorBefore: true` |
| `SuDialog` prop `zIndex` | none (the dialog uses the browser top layer) |

## Component catalog

Each component has a Markdown page: `https://surgeui.com/en/components/<name in lowercase>.md` (for example `datatable.md`), with its props, events, slots and accessibility notes.

### Display

- **Heading**: semantic headings (h1–h6)
- **Panel**: surface container with border and optional shadow
- **Card**: content card with header, media, body and footer
- **Divider**: separator line, with optional text
- **Kbd**: keyboard key or shortcut
- **VisuallyHidden**: content for screen readers only
- **Icon**: SVG icon
- **Image**: image with ratios, sources and lazy loading
- **Avatar**, **AvatarGroup**: avatar with initials, status and badge; group with overflow
- **Badge**: small status label; `dot` and `pulse` variants
- **Tag**: removable label (filter, keyword)
- **Price**: formatted price (currency, locale)
- **Dialog**: modal or drawer (`display`: center, left, right, top, bottom, full)
- **ConfirmDialog**: renders `useConfirm()` requests
- **Popover**: anchored floating panel
- **Tooltip**: short description on hover and keyboard focus
- **Alert**: inline message (success, warning, error, info)
- **Toast**, **Toaster**: short-lived notifications from `useToast()`
- **Tabs**: tabs (underline, contained, pills), router navigation
- **Accordion**, **AccordionItem**: collapsible sections
- **Progress**, **Spinner**, **Skeleton**: progress, loading and placeholder states
- **EmptyState**: empty area with explanation and actions
- **Stepper**: progress through a multi-step flow
- **DataTable**: sorting, selection, pagination
- **TreeView**: keyboard-navigable tree
- **PageHeader**: page header with breadcrumb or back link, title, description, actions
- **Stat**: metric card with formatted value, colored change and small chart slot
- **Timeline**: activity feed grouped by day
- **CodeBlock**: captioned code block with copy button
- **Prose**: typography for written content (Markdown, CMS)

### Actions and navigation

- **Button**, **ButtonGroup**: variants `primary`, `secondary`, `outline`, `ghost`; `loading`, `icon`, `to`
- **Link**, **LinkGroup**: links with icons and separators
- **FloatButton**: floating action button
- **Toggle**, **ToggleGroup**: pressed / not pressed buttons, exclusive or multiple
- **Dropdown**: menu button with items, links and separators
- **Breadcrumb**: breadcrumb trail
- **Pagination**: pages of a list
- **CommandPalette**: command search (Ctrl + K)
- **NavMenu**: side navigation with groups, counters, active item and collapsed mode
- **ThemeToggle**: light / dark toggle, or light, dark, system choice
- **SkipLink**: skip link to the main content
- **CopyButton**: copy to clipboard, result announced

### Forms

- **Input**, **InputField**: text field with prefix, suffix and icons
- **Textarea**, **TextareaField**: text area with counter and auto-resize
- **NumberInput**, **NumberInputField**: numeric field with buttons, bounds and format
- **Password**, **PasswordField**: password with strength meter
- **SelectBox**, **SelectBoxField**: single or multiple select with search and groups
- **Autocomplete**: free text with suggestions
- **DatePicker**, **Calendar**: date field and month grid
- **RadioGroup**, **RadioGroupField**: single choice
- **Checkbox**, **CheckboxGroup**, **CheckboxGroupField**: checkbox (with mixed state) and multiple choice
- **Switch**, **SwitchField**: on/off switch
- **Slider**, **SliderField**: numeric value or range
- **OtpInput**, **OtpInputField**: one-time code
- **Rating**: star rating (input or read only)
- **FileUpload**, **FileUploadField**: file upload with drag and drop
- **FormField**: label, message and state around any control
- **FormFieldGroup**: groups fields with spacing and direction

### Layouts

- **AppShell**: application shell (sidebar, top bar, drawer, skip link)
- **SingleColumnLayout**, **SidebarLayout**, **SplitLayout**, **HolyGrailLayout**, **MagazineLayout**, **GridLayout**, **MasonryLayout**, **HeroLayout**, **FullScreenLayout**: mobile-first page layouts that adapt to their container width

## Composables

`useTheme`, `useCustomTheme`, `useLocale` / `provideLocale` / `defineLocale`, `useToast`, `useConfirm`, `useAnnouncer` / `announce`, `useClipboard`, `useFocusTrap` / `createFocusTrap`, `useDismiss`, `useListNavigation` / `useTypeahead`, `useFormField`, `useFloatingPosition`, `useBreakpoint`, `usePrice`, `useLinkComponent`. Pages: `https://surgeui.com/en/composables/<name in lowercase>.md`.
