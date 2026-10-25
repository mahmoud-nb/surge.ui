# useLocale

Langue des textes par défaut des composants : libellés accessibles (« Effacer la sélection », « Fermer »…), placeholders, messages d'erreur et annonces aux lecteurs d'écran. Le français est la locale par défaut ; l'anglais est fourni.

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

En français, 0 et 1 prennent la forme `one` ; en anglais, seulement 1.

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
| `locales.fr`, `locales.en` | Locales fournies |

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
| `textarea` | Textarea | `remaining`, `overLimit` |
| `selectBox` | SelectBox | `placeholder`, `searchPlaceholder`, `noOptions`, `noResults`, `clear`, `removeTag`, `selectedCount`, `selected`, `deselected`, `removed`, `cleared`, `maxReached` |
| `checkboxGroup` | CheckboxGroup | `maxReached` |
| `slider` | Slider | `min`, `max` |
| `fileUpload` | FileUpload | `placeholder`, `drop`, `browse`, `loading`, `loadingHint`, `tooLarge`, `invalidType`, `maxFiles`, `added`, `removed`, `cleared`, `selectedCount`, `preview`, `remove`, `progress`, `maxSize` |
| `otpInput` | OtpInput | `label`, `progress`, `character` |
| `password` | Password | `strength` |
| `gridLayout` | GridLayout | `viewToggle`, `grid`, `list` |
| `holyGrailLayout` | HolyGrailLayout | `skipLink`, `nav`, `aside` |

Les valeurs par défaut indiquées dans les pages des composants sont celles de la locale française.
