# SelectBox

Composant SelectBox personnalisé avec support de la sélection multiple, recherche intégrée, groupes d'options et accessibilité complète selon les normes W3C.

## Description

`SuSelectBox` est un composant de sélection enrichi qui étend les capacités d'un élément `<select>` natif. Il offre des fonctionnalités avancées telles que la recherche, la sélection multiple avec tags, les options avec icônes et descriptions, et une accessibilité complète au clavier.

## Exemples d'utilisation

### Utilisation simple (sans SuFormField)

<div class="component-demo">
  <div class="demo-section">
    <h4>SelectBox de base</h4>
    <div class="demo-inputs">
      <SuSelectBox 
        :options="[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
          { value: 'option4', label: 'Option 4', disabled: true }
        ]"
        placeholder="Choisissez une option..."
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const selectedValue = ref('')
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4', disabled: true }
]
</script>

<template>
  <SuSelectBox 
    :options="options"
    placeholder="Choisissez une option..."
    v-model="selectedValue"
  />
</template>
```

### Sélection multiple

<div class="component-demo">
  <div class="demo-section">
    <h4>Sélection multiple avec tags</h4>
    <div class="demo-inputs">
      <SuSelectBox 
        :options="[
          { value: 'js', label: 'JavaScript' },
          { value: 'ts', label: 'TypeScript' },
          { value: 'vue', label: 'Vue.js' },
          { value: 'react', label: 'React' },
          { value: 'angular', label: 'Angular' }
        ]"
        :multiple="true"
        :clearable="true"
        placeholder="Sélectionnez vos technologies..."
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const selectedTechnologies = ref([])
const technologies = [
  { value: 'js', label: 'JavaScript' },
  { value: 'ts', label: 'TypeScript' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular' }
]
</script>

<template>
  <SuSelectBox 
    :options="technologies"
    :multiple="true"
    :clearable="true"
    placeholder="Sélectionnez vos technologies..."
    v-model="selectedTechnologies"
  />
</template>
```

### Recherche intégrée

<div class="component-demo">
  <div class="demo-section">
    <h4>SelectBox avec recherche</h4>
    <div class="demo-inputs">
      <SuSelectBox 
        :options="[
          { value: 'fr', label: 'France' },
          { value: 'us', label: 'États-Unis' },
          { value: 'de', label: 'Allemagne' },
          { value: 'es', label: 'Espagne' },
          { value: 'it', label: 'Italie' },
          { value: 'uk', label: 'Royaume-Uni' },
          { value: 'ca', label: 'Canada' },
          { value: 'jp', label: 'Japon' }
        ]"
        :searchable="true"
        :clearable="true"
        placeholder="Rechercher un pays..."
        searchPlaceholder="Tapez pour rechercher..."
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const selectedCountry = ref('')
const countries = [
  { value: 'fr', label: 'France' },
  { value: 'us', label: 'États-Unis' },
  { value: 'de', label: 'Allemagne' },
  { value: 'es', label: 'Espagne' },
  { value: 'it', label: 'Italie' },
  { value: 'uk', label: 'Royaume-Uni' },
  { value: 'ca', label: 'Canada' },
  { value: 'jp', label: 'Japon' }
]
</script>

<template>
  <SuSelectBox 
    :options="countries"
    :searchable="true"
    :clearable="true"
    placeholder="Rechercher un pays..."
    searchPlaceholder="Tapez pour rechercher..."
    v-model="selectedCountry"
  />
</template>
```

### Tailles

<div class="component-demo">
  <div class="demo-section">
    <h4>Tailles disponibles</h4>
    <div class="demo-inputs">
      <SuSelectBox 
        :options="[
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' },
          { value: 'lg', label: 'Large' }
        ]"
        size="sm"
        placeholder="Petit SelectBox"
      />
      <SuSelectBox 
        :options="[
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' },
          { value: 'lg', label: 'Large' }
        ]"
        size="md"
        placeholder="SelectBox moyen"
      />
      <SuSelectBox 
        :options="[
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' },
          { value: 'lg', label: 'Large' }
        ]"
        size="lg"
        placeholder="Grand SelectBox"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuSelectBox 
    :options="options"
    size="sm" 
    placeholder="Petit SelectBox" 
  />
  
  <SuSelectBox 
    :options="options"
    size="md" 
    placeholder="SelectBox moyen" 
  />
  
  <SuSelectBox 
    :options="options"
    size="lg" 
    placeholder="Grand SelectBox" 
  />
</template>
```

### États

<div class="component-demo">
  <div class="demo-section">
    <h4>États visuels</h4>
    <div class="demo-inputs">
      <SuSelectBox 
        :options="options"
        placeholder="État par défaut"
      />
      <SuSelectBox 
        :options="options"
        state="error"
        value="invalid"
      />
      <SuSelectBox 
        :options="options"
        state="success"
        value="valid"
      />
      <SuSelectBox 
        :options="options"
        state="warning"
        value="warning"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuSelectBox 
    :options="options"
    placeholder="État par défaut"
  />
  
  <SuSelectBox 
    :options="options"
    state="error"
    value="invalid"
  />
  
  <SuSelectBox 
    :options="options"
    state="success"
    value="valid"
  />
  
  <SuSelectBox 
    :options="options"
    state="warning"
    value="warning"
  />
</template>
```

## Utilisation avec SuFormField

Le composant `SuSelectBox` peut être utilisé avec `SuFormField` pour bénéficier d'une structure de formulaire complète avec label, message et gestion des états.

### Usage basique avec SuFormField

```vue
<template>
  <SuFormField 
    label="Pays" 
    message="Sélectionnez votre pays de résidence"
  >
    <template #default="slotProps">
      <SuSelectBox 
        :options="countries"
        placeholder="Choisissez un pays..."
        v-bind="slotProps"
        v-model="selectedCountry"
      />
    </template>
  </SuFormField>
</template>
```

### Avec destructuration des slot props

```vue
<template>
  <SuFormField 
    label="Catégorie"
    :required="true"
    message="Champ obligatoire"
  >
    <template #default="{ fieldId, messageId, state, disabled }">
      <SuSelectBox 
        :options="categories"
        :id="fieldId"
        :aria-describedby="messageId"
        :state="state"
        :disabled="disabled"
        placeholder="Sélectionnez une catégorie..."
        v-model="category"
      />
    </template>
  </SuFormField>
</template>
```

### Validation avec états

<div class="component-demo">
  <div class="demo-section">
    <h4>SelectBox avec validation</h4>
    <div class="demo-inputs">
      <SuFormField 
        label="Type d'utilisateur"
        :required="true"
        state="error"
        message="Veuillez sélectionner un type d'utilisateur"
      >
        <template #default="slotProps">
          <SuSelectBox 
            :options="[
              { value: 'individual', label: 'Particulier' },
              { value: 'business', label: 'Entreprise' },
              { value: 'organization', label: 'Organisation' }
            ]"
            placeholder="Sélectionnez votre type..."
            v-bind="slotProps"
          />
        </template>
      </SuFormField>
    </div>
  </div>
</div>

```vue
<script setup>
import { ref, computed } from 'vue'

const userType = ref('')
const userTypeError = ref('')

const validateUserType = () => {
  if (!userType.value) {
    userTypeError.value = 'Veuillez sélectionner un type d\'utilisateur'
  } else {
    userTypeError.value = ''
  }
}

const userTypeState = computed(() => {
  if (!userType.value) return 'default'
  return userTypeError.value ? 'error' : 'success'
})
</script>

<template>
  <SuFormField 
    label="Type d'utilisateur"
    :required="true"
    :state="userTypeState"
    :message="userTypeError || 'Sélectionnez le type qui vous correspond'"
  >
    <template #default="slotProps">
      <SuSelectBox 
        :options="userTypes"
        placeholder="Sélectionnez votre type..."
        v-bind="slotProps"
        v-model="userType"
        @blur="validateUserType"
      />
    </template>
  </SuFormField>
</template>
```

### Sélection multiple avec FormField

```vue
<template>
  <SuFormField 
    label="Compétences"
    message="Sélectionnez jusqu'à 5 compétences"
    :required="true"
  >
    <template #default="slotProps">
      <SuSelectBox 
        :options="skillOptions"
        :multiple="true"
        :searchable="true"
        :clearable="true"
        :maxSelectedItems="5"
        placeholder="Sélectionnez vos compétences..."
        v-bind="slotProps"
        v-model="skills"
      />
    </template>
  </SuFormField>
</template>
```

### Label et message personnalisés

```vue
<script setup>
import { UserIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <SuFormField 
    label="Rôle" 
    :required="true"
    message="Sélectionnez votre rôle dans l'organisation"
  >
    <template #label="{ label, required, htmlFor }">
      <label 
        :for="htmlFor" 
        class="flex items-center gap-2 font-bold text-gray-900"
      >
        <UserIcon class="w-4 h-4" />
        {{ label }}
        <span v-if="required" class="text-red-500">*</span>
      </label>
    </template>
    
    <template #default="slotProps">
      <SuSelectBox 
        :options="roles"
        placeholder="Choisissez un rôle..."
        v-bind="slotProps"
        v-model="role"
      />
    </template>
    
    <template #message="{ state }">
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <InformationCircleIcon class="w-4 h-4" />
        <span v-if="state === 'error'">⚠️ Veuillez sélectionner un rôle</span>
        <span v-else>Sélectionnez le rôle qui correspond à votre fonction</span>
      </div>
    </template>
  </SuFormField>
</template>
```

### Options avec icônes et descriptions

```vue
<script setup>
import { StarIcon, BuildingOfficeIcon, GlobeAltIcon } from '@heroicons/vue/24/outline'

const plans = [
  { 
    value: 'basic', 
    label: 'Plan Basic', 
    description: 'Fonctionnalités de base pour débuter',
    icon: StarIcon 
  },
  { 
    value: 'pro', 
    label: 'Plan Pro', 
    description: 'Fonctionnalités avancées pour les professionnels',
    icon: BuildingOfficeIcon 
  },
  { 
    value: 'enterprise', 
    label: 'Plan Enterprise', 
    description: 'Solution complète pour les grandes entreprises',
    icon: GlobeAltIcon 
  }
]
</script>

<template>
  <SuFormField 
    label="Plan d'abonnement"
    message="Choisissez le plan adapté à vos besoins"
  >
    <template #default="slotProps">
      <SuSelectBox 
        :options="plans"
        :searchable="true"
        placeholder="Choisissez votre plan..."
        v-bind="slotProps"
        v-model="selectedPlan"
      />
    </template>
  </SuFormField>
</template>
```

### Options groupées

```vue
<template>
  <SuFormField 
    label="Produits alimentaires"
    message="Sélectionnez vos produits préférés"
  >
    <template #default="slotProps">
      <SuSelectBox 
        :groups="[
          {
            label: 'Fruits',
            options: [
              { value: 'apple', label: 'Pomme' },
              { value: 'banana', label: 'Banane' },
              { value: 'orange', label: 'Orange' }
            ]
          },
          {
            label: 'Légumes',
            options: [
              { value: 'carrot', label: 'Carotte' },
              { value: 'broccoli', label: 'Brocoli' },
              { value: 'spinach', label: 'Épinard' }
            ]
          }
        ]"
        :searchable="true"
        :multiple="true"
        placeholder="Sélectionnez des produits..."
        v-bind="slotProps"
        v-model="selectedProducts"
      />
    </template>
  </SuFormField>
</template>
```

### Champ désactivé

```vue
<template>
  <SuFormField 
    label="Option désactivée"
    :disabled="true"
    message="Ce champ n'est pas modifiable actuellement"
  >
    <template #default="slotProps">
      <SuSelectBox 
        :options="options"
        value="selected"
        v-bind="slotProps"
      />
    </template>
  </SuFormField>
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SelectOption[]` | `[]` | Liste des options disponibles |
| `groups` | `SelectGroup[]` | `[]` | Options organisées en groupes |
| `modelValue` | `string \| number \| (string \| number)[]` | `undefined` | Valeur sélectionnée (v-model) |
| `multiple` | `boolean` | `false` | Sélection multiple |
| `searchable` | `boolean` | `false` | Recherche intégrée |
| `clearable` | `boolean` | `false` | Bouton d'effacement |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du SelectBox |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | État visuel |
| `disabled` | `boolean` | `false` | Désactive le SelectBox |
| `readonly` | `boolean` | `false` | SelectBox en lecture seule |
| `required` | `boolean` | `false` | Champ requis |
| `placeholder` | `string` | `'Sélectionnez...'` | Texte de placeholder |
| `searchPlaceholder` | `string` | `'Rechercher...'` | Placeholder de recherche |
| `noOptionsText` | `string` | `'Aucune option disponible'` | Texte sans options |
| `noResultsText` | `string` | `'Aucun résultat trouvé'` | Texte sans résultats |
| `maxHeight` | `string` | `'200px'` | Hauteur max du dropdown |
| `textAlign` | `'left' \| 'center' \| 'right'` | `'left'` | Alignement du texte |
| `loading` | `boolean` | `false` | État de chargement |
| `closeOnSelect` | `boolean` | `true` | Fermer après sélection |
| `maxSelectedItems` | `number` | `undefined` | Limite de sélection multiple |

### Props d'accessibilité (héritées de SuFormField)

Lorsque utilisé avec `SuFormField`, le composant reçoit automatiquement :

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | ID unique du champ (fieldId) |
| `aria-describedby` | `string` | ID du message associé (messageId) |
| `state` | `string` | État de validation |
| `disabled` | `boolean` | État désactivé |

### Types d'options

#### SelectOption
```typescript
interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
  group?: string
  icon?: Component
  description?: string
}
```

#### SelectGroup
```typescript
interface SelectGroup {
  label: string
  options: SelectOption[]
}
```

### Events

| Event | Type | Description |
|-------|------|-------------|
| `@update:modelValue` | `(value: string \| number \| (string \| number)[]) => void` | Émis lors du changement de valeur (v-model) |
| `@change` | `(value: string \| number \| (string \| number)[]) => void` | Émis lors du changement |
| `@open` | `() => void` | Émis à l'ouverture du dropdown |
| `@close` | `() => void` | Émis à la fermeture du dropdown |
| `@search` | `(query: string) => void` | Émis lors de la recherche |
| `@focus` | `(event: FocusEvent) => void` | Émis lors du focus |
| `@blur` | `(event: FocusEvent) => void` | Émis lors de la perte de focus |

### Méthodes exposées

| Méthode | Type | Description |
|---------|------|-------------|
| `focus()` | `() => void` | Donne le focus au SelectBox |
| `open()` | `() => void` | Ouvre le dropdown |
| `close()` | `() => void` | Ferme le dropdown |
| `clear()` | `() => void` | Efface la sélection |
| `selectRef` | `Ref<HTMLDivElement>` | Référence au conteneur |

## Accessibilité

Le composant SelectBox respecte les normes WCAG 2.1 AA et les bonnes pratiques W3C :

### ✅ Fonctionnalités d'accessibilité

- **Navigation au clavier** : Support complet (flèches, Entrée, Espace, Échap, Home/End)
- **Attributs ARIA** : `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-multiselectable`
- **Focus trap** : Gestion du focus dans le dropdown
- **Annonces vocales** : Messages pour les lecteurs d'écran
- **Labels associés** : Via les props de SuFormField (fieldId)
- **Messages d'état** : Via aria-describedby (messageId)
- **Contraste des couleurs** : Ratios conformes WCAG AA (4.5:1)
- **Focus visible** : Indicateurs clairs et contrastés
- **Support RTL** : Langues de droite à gauche
- **Mode sombre** : Contraste adapté
- **Réduction d'animation** : Respect de `prefers-reduced-motion`

### 🎯 Bonnes pratiques d'utilisation

```vue
<!-- ✅ BON : Utilisation avec SuFormField pour l'accessibilité complète -->
<SuFormField 
  label="Pays"
  :required="true"
  :state="countryError ? 'error' : 'default'"
  :message="countryError || 'Sélectionnez votre pays de résidence'"
>
  <template #default="slotProps">
    <SuSelectBox 
      :options="countries"
      :searchable="true"
      placeholder="Rechercher un pays..."
      v-bind="slotProps"
      v-model="country"
    />
  </template>
</SuFormField>

<!-- ✅ BON : Utilisation standalone avec attributs ARIA manuels -->
<SuSelectBox 
  :options="options"
  id="country-select"
  aria-label="Sélection du pays"
  aria-describedby="country-help"
  v-model="country"
/>
<span id="country-help">Sélectionnez votre pays de résidence</span>

<!-- ❌ MAUVAIS : Sans label ni description -->
<SuSelectBox 
  :options="options"
  v-model="value"
/>
```

## Navigation au clavier

| Touche | Action |
|--------|--------|
| `Tab` | Naviguer vers/depuis le SelectBox |
| `Entrée` / `Espace` | Ouvrir/fermer le dropdown, sélectionner l'option |
| `Flèche bas` | Ouvrir le dropdown ou option suivante |
| `Flèche haut` | Option précédente |
| `Home` | Première option |
| `End` | Dernière option |
| `Échap` | Fermer le dropdown |
| `A-Z` | Recherche rapide par première lettre |

## Exemples d'usage avancés

### Formulaire complet avec validation

```vue
<script setup>
import { ref, computed } from 'vue'

const formData = ref({
  userType: '',
  skills: [],
  country: ''
})

const errors = ref({})

const validateForm = () => {
  errors.value = {}
  
  if (!formData.value.userType) {
    errors.value.userType = 'Type d\'utilisateur requis'
  }
  
  if (formData.value.skills.length === 0) {
    errors.value.skills = 'Sélectionnez au moins une compétence'
  }
  
  if (!formData.value.country) {
    errors.value.country = 'Pays requis'
  }
  
  return Object.keys(errors.value).length === 0
}
</script>

<template>
  <form @submit.prevent="validateForm">
    <SuFormField 
      label="Type d'utilisateur"
      :required="true"
      :state="errors.userType ? 'error' : 'default'"
      :message="errors.userType || 'Sélectionnez votre type'"
    >
      <template #default="slotProps">
        <SuSelectBox 
          :options="userTypes"
          placeholder="Choisissez un type..."
          v-bind="slotProps"
          v-model="formData.userType"
        />
      </template>
    </SuFormField>
    
    <SuFormField 
      label="Compétences"
      :required="true"
      :state="errors.skills ? 'error' : 'default'"
      :message="errors.skills || 'Maximum 5 compétences'"
    >
      <template #default="slotProps">
        <SuSelectBox 
          :options="skillOptions"
          :multiple="true"
          :searchable="true"
          :maxSelectedItems="5"
          placeholder="Sélectionnez vos compétences..."
          v-bind="slotProps"
          v-model="formData.skills"
        />
      </template>
    </SuFormField>
    
    <SuFormField 
      label="Pays"
      :required="true"
      :state="errors.country ? 'error' : 'default'"
      :message="errors.country || 'Pays de résidence'"
    >
      <template #default="slotProps">
        <SuSelectBox 
          :options="countries"
          :searchable="true"
          placeholder="Rechercher un pays..."
          v-bind="slotProps"
          v-model="formData.country"
        />
      </template>
    </SuFormField>
    
    <button type="submit">Soumettre</button>
  </form>
</template>
```

### Chargement dynamique avec recherche

```vue
<script setup>
import { ref, watch } from 'vue'

const searchQuery = ref('')
const options = ref([])
const loading = ref(false)
const selectedValue = ref('')

const searchOptions = async (query) => {
  if (query.length < 3) return
  
  loading.value = true
  try {
    const response = await fetch(`/api/search?q=${query}`)
    options.value = await response.json()
  } finally {
    loading.value = false
  }
}

watch(searchQuery, (newQuery) => {
  searchOptions(newQuery)
})
</script>

<template>
  <SuFormField 
    label="Recherche dynamique"
    message="Tapez au moins 3 caractères pour rechercher"
  >
    <template #default="slotProps">
      <SuSelectBox 
        :options="options"
        :searchable="true"
        :loading="loading"
        placeholder="Commencez à taper..."
        searchPlaceholder="Minimum 3 caractères..."
        v-bind="slotProps"
        @search="searchQuery = $event"
        v-model="selectedValue"
      />
    </template>
  </SuFormField>
</template>
```

## Composant SuSelectBoxField

Pour une utilisation encore plus simple, vous pouvez utiliser le composant `SuSelectBoxField` qui combine automatiquement `SuFormField` et `SuSelectBox` :

```vue
<template>
  <!-- Au lieu de -->
  <SuFormField label="Pays" message="Sélectionnez votre pays">
    <template #default="slotProps">
      <SuSelectBox 
        :options="countries"
        v-bind="slotProps"
        v-model="country"
      />
    </template>
  </SuFormField>
  
  <!-- Vous pouvez simplement écrire -->
  <SuSelectBoxField 
    :options="countries"
    label="Pays"
    message="Sélectionnez votre pays"
    v-model="country"
  />
</template>
```

Le composant `SelectBoxField` accepte toutes les props de `SuFormField` et `SuSelectBox` combinées, offrant une syntaxe plus concise tout en conservant toutes les fonctionnalités.

Voir la documentation complète de [SelectBoxField](./SuSelectBoxField.md) pour plus de détails.