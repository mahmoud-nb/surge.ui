<script setup>
import { ref } from 'vue'
import { MapPinIcon } from '@heroicons/vue/24/outline'

const cities = ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Montpellier', 'Strasbourg', 'Bordeaux', 'Lille', 'Rennes', 'Saint-Étienne', 'Évreux']
const city = ref('')
const selected = ref('')
const region = ref('')
const regions = [
  { label: 'Paris', value: 75, description: 'Île-de-France', icon: MapPinIcon },
  { label: 'Lyon', value: 69, description: 'Auvergne-Rhône-Alpes', icon: MapPinIcon },
  { label: 'Marseille', value: 13, description: 'Provence-Alpes-Côte d\'Azur', icon: MapPinIcon }
]
</script>

# Autocomplete

Champ texte à saisie libre avec suggestions : la saisie reste libre, choisir une suggestion la remplace. Les suggestions peuvent être filtrées localement ou venir d'un serveur.

Pour choisir parmi une liste fermée, utilisez [SelectBox](/components/selectbox) (avec `searchable`).

## Exemples d'utilisation

### Utilisation de base

Le filtre ignore les accents et la casse : « ev » trouve « Évreux ».

<div class="component-demo">
  <div class="demo-section">
    <div style="max-width: 18rem">
      <SuFormField label="Ville">
        <SuAutocomplete v-model="city" :options="cities" placeholder="Ville…" clearable @select="selected = $event.label" />
      </SuFormField>
    </div>
    <p>Saisie : « {{ city }} » · choisie : {{ selected || '—' }}</p>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const cities = ['Paris', 'Marseille', 'Lyon', 'Évreux']
const city = ref('')
</script>

<template>
  <SuFormField label="Ville">
    <SuAutocomplete v-model="city" :options="cities" placeholder="Ville…" clearable @select="onSelect" />
  </SuFormField>
</template>
```

### Suggestions détaillées

Une suggestion peut avoir une valeur, une description, une icône, ou être désactivée.

<div class="component-demo">
  <div class="demo-section">
    <div style="max-width: 18rem">
      <SuAutocomplete v-model="region" :options="regions" open-on-focus aria-label="Ville" />
    </div>
  </div>
</div>

```vue
<SuAutocomplete
  v-model="query"
  :options="[
    { label: 'Paris', value: 75, description: 'Île-de-France', icon: MapPinIcon },
    { label: 'Lyon', value: 69, description: 'Auvergne-Rhône-Alpes', icon: MapPinIcon }
  ]"
  open-on-focus
  aria-label="Ville"
/>
```

### Suggestions serveur

Avec `:filter="false"`, les options sont affichées telles quelles ; `loading` affiche l'état de recherche.

```vue
<script setup>
import { ref, watch } from 'vue'

const query = ref('')
const results = ref([])
const loading = ref(false)

watch(query, async (text) => {
  if (text.trim().length < 2) return (results.value = [])
  loading.value = true
  results.value = await api.searchCities(text)
  loading.value = false
})
</script>

<template>
  <SuAutocomplete v-model="query" :options="results" :filter="false" :loading="loading" :min-chars="2" />
</template>
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `modelValue` | `string` | `''` | Texte saisi (v-model) |
| `options` | `(string \| AutocompleteOption)[]` | `[]` | Suggestions |
| `filter` | `boolean \| (option, query) => boolean` | `true` | Filtre local ; `false` pour des suggestions déjà filtrées |
| `minChars` | `number` | `0` | Caractères saisis avant d'ouvrir la liste |
| `openOnFocus` | `boolean` | `false` | Ouvre la liste au focus |
| `loading` | `boolean` | `false` | Recherche en cours |
| `clearable` | `boolean` | `false` | Bouton et `Échap` pour effacer |
| `maxHeight` | `string` | `'16rem'` | Hauteur maximale de la liste |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | État de validation |
| `disabled` / `readonly` / `required` | `boolean` | `false` | États du champ |
| `name` / `placeholder` | `string` | - | Attributs du champ |
| `noResultsText` / `loadingText` / `clearLabel` | `string` | locale | Textes |

### AutocompleteOption

| Propriété | Type | Description |
|-----------|------|-------------|
| `label` | `string` | Texte affiché et inséré dans le champ |
| `value` | `string \| number` | Valeur associée (reçue avec `select`) |
| `description` | `string` | Texte secondaire |
| `icon` | `Component` | Icône |
| `disabled` | `boolean` | Suggestion non sélectionnable |

### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `update:modelValue` | `string` | Texte modifié (saisie ou choix) |
| `select` | `AutocompleteOption` | Suggestion choisie |
| `focus` / `blur` | `FocusEvent` | Focus du champ |

### Slots

| Slot | Props | Description |
|------|-------|-------------|
| `option` | `{ option, query, active }` | Rendu d'une suggestion |

## Accessibilité

- `role="combobox"` avec `aria-autocomplete="list"`, `aria-expanded` et `aria-controls` vers la liste (`role="listbox"`).
- Le focus reste dans le champ ; la suggestion active est indiquée par `aria-activedescendant`.
- Clavier : `↓` / `↑` ouvrent la liste et la parcourent (les suggestions désactivées sont sautées), `Alt + ↓` ouvre sans activer, `Entrée` choisit, `Échap` ferme puis efface (`clearable`), `Tab` ferme en gardant le texte.
- Le nombre de suggestions est annoncé après une pause de saisie (« 3 suggestions », « Aucune suggestion »).
- Dans un `SuFormField`, le champ et la liste sont nommés par le label.
