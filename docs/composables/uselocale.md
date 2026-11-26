# useLocale

Langue des textes par défaut des composants : libellés accessibles (« Effacer la sélection », « Fermer »…), placeholders, messages d'erreur et annonces aux lecteurs d'écran. Le français est la locale par défaut ; l'anglais et l'arabe sont fournis (`locales.fr`, `locales.en`, `locales.ar`).

Une prop explicite d'un composant reste toujours prioritaire sur la locale.

## Choisir la langue

```ts
// main.ts
import { createApp } from 'vue'
import SurgeUI, { locales } from '@surgeui/ds-vue'

createApp(App)
  .use(SurgeUI, { locale: locales.en })
  .mount('#app')
```

La locale arabe utilise le code `ar` : chiffres latins dans les moteurs récents, semaine à partir du samedi. Pour les chiffres arabes-indiens (٠١٢٣) ou les conventions d'un pays, gardez ses messages et changez son code :

```ts
app.use(SurgeUI, { locale: defineLocale(locales.ar, { code: 'ar-EG' }) })
```

## Suivre la langue de la page

Avec `locale: 'auto'`, la langue suit l'attribut `lang` de `<html>`, y compris quand il change sans recharger la page (sélecteur de langue, routeur) :

```ts
app.use(SurgeUI, { locale: 'auto' })
```

La langue est rapprochée de la locale fournie la plus proche : `fr-CA` donne les messages français, `ar-EG` les messages arabes. Le code complet est gardé pour les formats (dates, nombres, premier jour de la semaine). Une langue sans traduction fournie (`de`, `es`…) donne l'anglais.

::: warning Rendu serveur
`document` n'existe pas côté serveur : `'auto'` y donne l'anglais. En SSR, passez la locale explicitement, tirée de la langue de la requête.
:::

`matchLocale(lang)` fait ce rapprochement pour vos propres sources de langue, et `createDocumentLocale()` renvoie la locale réactive utilisée par `'auto'`.

## Avec vue-i18n

Les composants suivent la langue de vue-i18n :

```ts
// main.ts
import { computed } from 'vue'
import { createI18n } from 'vue-i18n'
import SurgeUI, { matchLocale } from '@surgeui/ds-vue'

const i18n = createI18n({ legacy: false, locale: 'fr', messages })

app.use(i18n)
app.use(SurgeUI, {
  locale: computed(() => matchLocale(i18n.global.locale.value))
})
```

## Changer de langue à la volée

`provideLocale` accepte une ref ou un getter : tous les composants du sous-arbre suivent.

```vue
<script setup>
import { ref } from 'vue'
import { provideLocale, locales } from '@surgeui/ds-vue'

const lang = ref('fr')
provideLocale(() => locales[lang.value])
</script>

<template>
  <SuButton @click="lang = lang === 'fr' ? 'en' : 'fr'">FR / EN</SuButton>
  <RouterView />
</template>
```

L'option `locale` du plugin accepte aussi une ref.

## Personnaliser des messages

`defineLocale` complète une locale avec des messages partiels ; les autres restent ceux de la base.

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

Pour une autre langue, partez d'une locale complète et fournissez un `code` BCP 47 (`de`, `es`, `fr-CA`…) : il sert aux règles de pluriel et aux formats.

```ts
const de = defineLocale(locales.en, {
  code: 'de',
  messages: {
    common: { loading: 'Wird geladen…', close: 'Schließen' }
    // …
  }
})
```

## Messages avec paramètres et pluriels

Un message contient des paramètres `{nom}`, ou un objet de formes plurielles choisies avec `Intl.PluralRules` selon `{count}` :

```ts
{
  removeTag: 'Retirer {label}',
  selectedCount: { one: '{count} élément sélectionné', other: '{count} éléments sélectionnés' }
}
```

En français, 0 et 1 prennent la forme `one` ; en anglais, seulement 1. L'arabe utilise les six formes : `zero`, `one`, `two`, `few` (3 à 10), `many` (11 à 99) et `other` (100 et plus).

## Dans vos composants

```vue
<script setup>
import { computed } from 'vue'
import { useLocale } from '@surgeui/ds-vue'

const props = defineProps({ clearLabel: String })
const { t, formatBytes } = useLocale()

const label = computed(() => props.clearLabel ?? t('selectBox.clear'))
const count = computed(() => t('fileUpload.selectedCount', { count: 3 })) // « 3 fichiers sélectionnés »
const size = formatBytes(1536) // « 1,5 ko » (fr), « 1.5 kB » (en)
</script>
```

## API

### useLocale()

| Retour | Type | Description |
|--------|------|-------------|
| `locale` | `ComputedRef<SurgeLocale>` | Locale courante |
| `t` | `(key, params?) => string` | Message traduit ; la clé est typée (`espace.message`) |
| `formatBytes` | `(bytes: number) => string` | Taille de fichier dans la langue courante |

### Fonctions

| Fonction | Description |
|----------|-------------|
| `provideLocale(locale)` | Fournit une locale (complète, partielle, ref ou getter) au sous-arbre ; elle complète celle du parent |
| `defineLocale(base, overrides)` | Crée une locale à partir d'une base et de messages partiels |
| `formatMessage(message, params?, code?)` | Met en forme un message (pluriel, paramètres) |
| `matchLocale(lang, fallback?)` | Locale fournie la plus proche d'une langue BCP 47 (`fr-CA` → français, code `fr-CA` gardé) ; `fallback` (anglais par défaut) pour une langue sans traduction |
| `createDocumentLocale(fallback?)` | Locale réactive qui suit `<html lang>` : `{ locale, stop }` |
| `locales.fr`, `locales.en`, `locales.ar` | Locales fournies |

### Espaces de messages

| Espace | Composants | Clés |
|--------|------------|------|
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

Les valeurs par défaut indiquées dans les pages des composants sont celles de la locale française. Les démos des pages anglaises de cette documentation utilisent `locales.en`.
