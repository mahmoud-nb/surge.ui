# useLocale

Language of the components' default texts: accessible labels ("Clear selection", "Close"…), placeholders, error messages and screen reader announcements. French is the default locale; English is provided.

An explicit component prop always wins over the locale.

## Choosing the language

```ts
// main.ts
import { createApp } from 'vue'
import SurgeUI, { locales } from '@surgeui/ds-vue'

createApp(App)
  .use(SurgeUI, { locale: locales.en })
  .mount('#app')
```

## Switching language at runtime

`provideLocale` accepts a ref or a getter: every component in the subtree follows.

```vue
<script setup>
import { ref } from 'vue'
import { provideLocale, locales } from '@surgeui/ds-vue'

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
import SurgeUI, { defineLocale, locales } from '@surgeui/ds-vue'

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

In English only 1 takes the `one` form; in French, 0 and 1 do.

## In your components

```vue
<script setup>
import { computed } from 'vue'
import { useLocale } from '@surgeui/ds-vue'

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
| `locales.fr`, `locales.en` | Provided locales |

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
| `textarea` | Textarea | `remaining`, `overLimit` |
| `selectBox` | SelectBox | `placeholder`, `searchPlaceholder`, `noOptions`, `noResults`, `clear`, `removeTag`, `selectedCount`, `selected`, `deselected`, `removed`, `cleared`, `maxReached` |
| `checkboxGroup` | CheckboxGroup | `maxReached` |
| `slider` | Slider | `min`, `max` |
| `fileUpload` | FileUpload | `placeholder`, `drop`, `browse`, `loading`, `loadingHint`, `tooLarge`, `invalidType`, `maxFiles`, `added`, `removed`, `cleared`, `selectedCount`, `preview`, `remove`, `progress`, `maxSize` |
| `otpInput` | OtpInput | `label`, `progress`, `character` |
| `password` | Password | `strength` |
| `gridLayout` | GridLayout | `viewToggle`, `grid`, `list` |
| `holyGrailLayout` | HolyGrailLayout | `skipLink`, `nav`, `aside` |

Default values shown on component pages are those of the French locale.
