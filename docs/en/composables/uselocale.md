# useLocale

Language of the components' default texts: accessible labels ("Clear selection", "Close"…), placeholders, error messages and screen reader announcements. French is the default locale; English and Arabic are provided (`locales.fr`, `locales.en`, `locales.ar`).

An explicit component prop always wins over the locale.

## Choosing the language

```ts
// main.ts
import { createApp } from 'vue'
import SurgeUI, { locales } from '@surgeui/vue'

createApp(App)
  .use(SurgeUI, { locale: locales.en })
  .mount('#app')
```

The Arabic locale uses the `ar` code: Latin digits in recent engines, week starting on Saturday. For Arabic-Indic digits (٠١٢٣) or a country's conventions, keep its messages and change its code:

```ts
app.use(SurgeUI, { locale: defineLocale(locales.ar, { code: 'ar-EG' }) })
```

## Following the page language

With `locale: 'auto'`, the language follows the `lang` attribute of `<html>`, including when it changes without a page reload (language switcher, router):

```ts
app.use(SurgeUI, { locale: 'auto' })
```

The language is matched to the closest provided locale: `fr-CA` gives the French messages, `ar-EG` the Arabic ones. The full code is kept for formats (dates, numbers, first day of the week). A language with no provided translation (`de`, `es`…) gives English.

::: warning Server-side rendering
`document` does not exist on the server: `'auto'` gives English there. With SSR, pass the locale explicitly, based on the request language.
:::

`matchLocale(lang)` does this matching for your own language sources, and `createDocumentLocale()` returns the reactive locale used by `'auto'`.

## With vue-i18n

Components follow the vue-i18n language:

```ts
// main.ts
import { computed } from 'vue'
import { createI18n } from 'vue-i18n'
import SurgeUI, { matchLocale } from '@surgeui/vue'

const i18n = createI18n({ legacy: false, locale: 'en', messages })

app.use(i18n)
app.use(SurgeUI, {
  locale: computed(() => matchLocale(i18n.global.locale.value))
})
```

## Switching language at runtime

`provideLocale` accepts a ref or a getter: every component in the subtree follows.

```vue
<script setup>
import { ref } from 'vue'
import { provideLocale, locales } from '@surgeui/vue'

const lang = ref('en')
provideLocale(() => locales[lang.value])
</script>

<template>
  <SuButton @click="lang = lang === 'fr' ? 'en' : 'fr'">FR / EN</SuButton>
  <RouterView />
</template>
```

The plugin's `locale` option accepts a ref too.

## Customizing messages

`defineLocale` completes a locale with partial messages; the others stay those of the base.

```ts
import SurgeUI, { defineLocale, locales } from '@surgeui/vue'

const myEnglish = defineLocale(locales.en, {
  messages: {
    selectBox: { placeholder: 'Pick one…' },
    holyGrailLayout: { skipLink: 'Skip navigation' }
  }
})

app.use(SurgeUI, { locale: myEnglish })
```

For another language, start from a complete locale and give a BCP 47 `code` (`de`, `es`, `fr-CA`…): it drives plural rules and formats.

```ts
const de = defineLocale(locales.en, {
  code: 'de',
  messages: {
    common: { loading: 'Wird geladen…', close: 'Schließen' }
    // …
  }
})
```

## Messages with parameters and plurals

A message holds `{name}` parameters, or an object of plural forms picked with `Intl.PluralRules` from `{count}`:

```ts
{
  removeTag: 'Remove {label}',
  selectedCount: { one: '{count} item selected', other: '{count} items selected' }
}
```

In English only 1 takes the `one` form; in French, 0 and 1 do. Arabic uses all six forms: `zero`, `one`, `two`, `few` (3 to 10), `many` (11 to 99) and `other` (100 and above).

## In your components

```vue
<script setup>
import { computed } from 'vue'
import { useLocale } from '@surgeui/vue'

const props = defineProps({ clearLabel: String })
const { t, formatBytes } = useLocale()

const label = computed(() => props.clearLabel ?? t('selectBox.clear'))
const count = computed(() => t('fileUpload.selectedCount', { count: 3 })) // "3 files selected"
const size = formatBytes(1536) // "1.5 kB" (en), "1,5 ko" (fr)
</script>
```

## API

### useLocale()

| Return | Type | Description |
|--------|------|-------------|
| `locale` | `ComputedRef<SurgeLocale>` | Current locale |
| `t` | `(key, params?) => string` | Translated message; the key is typed (`namespace.message`) |
| `formatBytes` | `(bytes: number) => string` | File size in the current language |

### Functions

| Function | Description |
|----------|-------------|
| `provideLocale(locale)` | Provides a locale (complete, partial, ref or getter) to the subtree; it completes the parent's |
| `defineLocale(base, overrides)` | Creates a locale from a base and partial messages |
| `formatMessage(message, params?, code?)` | Formats a message (plural, parameters) |
| `matchLocale(lang, fallback?)` | Closest provided locale for a BCP 47 language (`fr-CA` → French, `fr-CA` code kept); `fallback` (English by default) for a language with no translation |
| `createDocumentLocale(fallback?)` | Reactive locale following `<html lang>`: `{ locale, stop }` |
| `locales.fr`, `locales.en`, `locales.ar` | Provided locales |

### Message namespaces

| Namespace | Components | Keys |
|-----------|------------|------|
| `common` | Button, Avatar, Dropdown, Dialog, Popover | `loading`, `close` |
| `formField` | FormField | `required` |
| `alert` | Alert | `dismiss` |
| `avatar` | Avatar | `alt`, `anonymous`, `initials`, `placeholder`, `status`, `statusOnline`, `statusOffline`, `statusBusy`, `statusAway`, `notifications` |
| `image` | Image | `loading`, `error`, `errorText` |
| `link` | Link | `external` |
| `progress` | Progress | `indeterminate` |
| `spinner` | Spinner | `label` |
| `price` | Price | `unavailable` |
| `textarea` | Textarea | `remaining`, `overLimit` |
| `selectBox` | SelectBox | `placeholder`, `searchPlaceholder`, `noOptions`, `noResults`, `clear`, `removeTag`, `selectedCount`, `selected`, `deselected`, `removed`, `cleared`, `maxReached` |
| `checkboxGroup` | CheckboxGroup | `maxReached` |
| `slider` | Slider | `min`, `max` |
| `fileUpload` | FileUpload | `placeholder`, `drop`, `browse`, `loading`, `loadingHint`, `tooLarge`, `invalidType`, `maxFiles`, `added`, `removed`, `cleared`, `selectedCount`, `preview`, `remove`, `progress`, `maxSize` |
| `otpInput` | OtpInput | `label`, `progress`, `character` |
| `password` | Password | `strength` |
| `toast` | Toast, Toaster | `region`, `dismiss` |
| `breadcrumb` | Breadcrumb | `label`, `expand` |
| `pagination` | Pagination | `label`, `page`, `previous`, `next`, `first`, `last` |
| `tag` | Tag | `remove` |
| `numberInput` | NumberInput | `increment`, `decrement` |
| `stepper` | Stepper | `label`, `complete`, `error` |
| `confirm` | ConfirmDialog, useConfirm | `title`, `confirm`, `cancel` |
| `autocomplete` | Autocomplete | `noResults`, `loading`, `results`, `clear` |
| `dataTable` | DataTable | `selectAll`, `selectRow`, `sortAscending`, `sortDescending`, `sortCleared`, `empty` |
| `calendar` | Calendar | `previousMonth`, `nextMonth`, `previousYear`, `nextYear`, `previousYears`, `nextYears`, `chooseMonth`, `chooseYear` |
| `datePicker` | DatePicker | `open`, `openSelected`, `dialog`, `day`, `month`, `year` |
| `commandPalette` | CommandPalette | `label`, `placeholder`, `empty`, `results` |
| `gridLayout` | GridLayout | `viewToggle`, `grid`, `list` |
| `holyGrailLayout` | HolyGrailLayout | `skipLink`, `nav`, `aside` |

Default values shown on component pages are those of the French locale, except values marked "(locale)", which are the English ones. The demos on the English pages of this documentation use `locales.en`.
