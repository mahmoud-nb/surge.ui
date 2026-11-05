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

A free-text field with suggestions: the input stays free, picking a suggestion replaces it. Suggestions can be filtered locally or come from a server.

To pick from a closed list, use [SelectBox](/en/components/selectbox) (with `searchable`).

## Usage

### Basic usage

The filter ignores accents and case: "ev" finds "Évreux".

<div class="component-demo">
  <div class="demo-section">
    <div style="max-width: 18rem">
      <SuFormField label="City">
        <SuAutocomplete v-model="city" :options="cities" placeholder="City…" clearable @select="selected = $event.label" />
      </SuFormField>
    </div>
    <p>Input: “{{ city }}” · picked: {{ selected || '—' }}</p>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const cities = ['Paris', 'Marseille', 'Lyon', 'Évreux']
const city = ref('')
</script>

<template>
  <SuFormField label="City">
    <SuAutocomplete v-model="city" :options="cities" placeholder="City…" clearable @select="onSelect" />
  </SuFormField>
</template>
```

### Detailed suggestions

A suggestion can have a value, a description, an icon, or be disabled.

<div class="component-demo">
  <div class="demo-section">
    <div style="max-width: 18rem">
      <SuAutocomplete v-model="region" :options="regions" open-on-focus aria-label="City" />
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
  aria-label="City"
/>
```

### Server suggestions

With `:filter="false"`, options are shown as given; `loading` shows the searching state.

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

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | `''` | Typed text (v-model) |
| `options` | `(string \| AutocompleteOption)[]` | `[]` | Suggestions |
| `filter` | `boolean \| (option, query) => boolean` | `true` | Local filter; `false` for pre-filtered suggestions |
| `minChars` | `number` | `0` | Characters typed before the list opens |
| `openOnFocus` | `boolean` | `false` | Opens the list on focus |
| `loading` | `boolean` | `false` | Search in progress |
| `clearable` | `boolean` | `false` | Button and `Escape` to clear |
| `maxHeight` | `string` | `'16rem'` | Maximum list height |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | Validation state |
| `disabled` / `readonly` / `required` | `boolean` | `false` | Field states |
| `name` / `placeholder` | `string` | - | Field attributes |
| `noResultsText` / `loadingText` / `clearLabel` | `string` | locale | Texts |

### AutocompleteOption

| Property | Type | Description |
|----------|------|-------------|
| `label` | `string` | Text shown and inserted in the field |
| `value` | `string \| number` | Associated value (received with `select`) |
| `description` | `string` | Secondary text |
| `icon` | `Component` | Icon |
| `disabled` | `boolean` | Suggestion that cannot be picked |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | Text changed (typing or picking) |
| `select` | `AutocompleteOption` | Suggestion picked |
| `focus` / `blur` | `FocusEvent` | Field focus |

### Slots

| Slot | Props | Description |
|------|-------|-------------|
| `option` | `{ option, query, active }` | Suggestion rendering |

## Accessibility

- `role="combobox"` with `aria-autocomplete="list"`, `aria-expanded` and `aria-controls` pointing to the list (`role="listbox"`).
- Focus stays in the field; the active suggestion is conveyed by `aria-activedescendant`.
- Keyboard: `↓` / `↑` open and browse the list (disabled suggestions are skipped), `Alt + ↓` opens without activating, `Enter` picks, `Escape` closes then clears (`clearable`), `Tab` closes and keeps the text.
- The number of suggestions is announced after a typing pause ("3 suggestions", "No suggestions").
- In a `SuFormField`, the field and the list are named by the label.
