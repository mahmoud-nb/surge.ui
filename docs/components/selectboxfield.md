# SelectBoxField

Composant SelectBoxField personnalisé avec support de la sélection multiple, recherche intégrée, groupes d'options et accessibilité complète selon les normes W3C.

## Exemples d'utilisation

### SelectBoxField de base

<div class="component-demo">
  <div class="demo-section">
    <h4>SelectBox simple</h4>
    <div class="demo-inputs">
      <SuSelectBoxField 
        :options="[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
          { value: 'option4', label: 'Option 4', disabled: true }
        ]"
        label="Sélection simple"
        placeholder="Choisissez une option..."
      />
    </div>
  </div>
</div>

```vue
<script setup>
const selectedValue = ref('')
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4', disabled: true }
]
</script>

<template>
  <SuSelectBoxField 
    :options="options"
    label="Sélection simple"
    placeholder="Choisissez une option..."
    v-model:value="selectedValue"
  />
</template>
```

### Sélection multiple

<div class="component-demo">
  <div class="demo-section">
    <h4>Sélection multiple avec tags</h4>
    <div class="demo-inputs">
      <SuSelectBoxField 
        :options="[
          { value: 'js', label: 'JavaScript' },
          { value: 'ts', label: 'TypeScript' },
          { value: 'vue', label: 'Vue.js' },
          { value: 'react', label: 'React' },
          { value: 'angular', label: 'Angular' }
        ]"
        :multiple="true"
        :clearable="true"
        label="Technologies"
        placeholder="Sélectionnez vos technologies..."
        helpText="Vous pouvez sélectionner plusieurs options"
      />
    </div>
  </div>
</div>

```vue
<script setup>
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
  <SuSelectBoxField 
    :options="technologies"
    :multiple="true"
    :clearable="true"
    label="Technologies"
    placeholder="Sélectionnez vos technologies..."
    helpText="Vous pouvez sélectionner plusieurs options"
    v-model:value="selectedTechnologies"
  />
</template>
```

### Recherche intégrée

<div class="component-demo">
  <div class="demo-section">
    <h4>SelectBox avec recherche</h4>
    <div class="demo-inputs">
      <SuSelectBoxField 
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
        label="Pays"
        placeholder="Rechercher un pays..."
        searchPlaceholder="Tapez pour rechercher..."
      />
    </div>
  </div>
</div>

```vue
<script setup>
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
  <SuSelectBoxField 
    :options="countries"
    :searchable="true"
    :clearable="true"
    label="Pays"
    placeholder="Rechercher un pays..."
    searchPlaceholder="Tapez pour rechercher..."
    v-model:value="selectedCountry"
  />
</template>
```

### Options avec icônes et descriptions

<div class="component-demo">
  <div class="demo-section">
    <h4>Options enrichies</h4>
    <div class="demo-inputs">
      <SuSelectBoxField 
        :options="[
          { 
            value: 'basic', 
            label: 'Plan Basic', 
            description: 'Fonctionnalités de base pour débuter',
            icon: 'StarIcon'
          },
          { 
            value: 'pro', 
            label: 'Plan Pro', 
            description: 'Fonctionnalités avancées pour les professionnels',
            icon: 'BuildingOfficeIcon'
          },
          { 
            value: 'enterprise', 
            label: 'Plan Enterprise', 
            description: 'Solution complète pour les grandes entreprises',
            icon: 'GlobeAltIcon'
          }
        ]"
        :searchable="true"
        label="Plan d'abonnement"
        placeholder="Choisissez votre plan..."
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { StarIcon, BuildingOfficeIcon, GlobeAltIcon } from '@heroicons/vue/24/outline'

const selectedPlan = ref('')
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
  <SuSelectBoxField 
    :options="plans"
    :searchable="true"
    label="Plan d'abonnement"
    placeholder="Choisissez votre plan..."
    v-model:value="selectedPlan"
  />
</template>
```

### Options groupées

<div class="component-demo">
  <div class="demo-section">
    <h4>Options organisées en groupes</h4>
    <div class="demo-inputs">
      <SuSelectBoxField 
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
        label="Produits alimentaires"
        placeholder="Sélectionnez des produits..."
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuSelectBoxField 
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
    label="Produits alimentaires"
    placeholder="Sélectionnez des produits..."
    v-model:value="selectedProducts"
  />
</template>
```

### Tailles

<div class="component-demo">
  <div class="demo-section">
    <h4>Tailles disponibles</h4>
    <div class="demo-inputs" style="display: flex; flex-direction: column; gap: 24px;">
      <SuSelectBoxField 
        :options="[
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' },
          { value: 'lg', label: 'Large' }
        ]"
        size="sm"
        label="Small"
        placeholder="Petit SelectBox"
      />
      <SuSelectBoxField 
        :options="[
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' },
          { value: 'lg', label: 'Large' }
        ]"
        size="md"
        label="Medium"
        placeholder="SelectBox moyen"
      />
      <SuSelectBoxField 
        :options="[
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' },
          { value: 'lg', label: 'Large' }
        ]"
        size="lg"
        label="Large"
        placeholder="Grand SelectBox"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuSelectBoxField size="sm" label="Small" placeholder="Petit SelectBox" />
  <SuSelectBoxField size="md" label="Medium" placeholder="SelectBox moyen" />
  <SuSelectBoxField size="lg" label="Large" placeholder="Grand SelectBox" />
</template>
```

### États et validation

<div class="component-demo">
  <div class="demo-section">
    <h4>États de validation</h4>
    <div class="demo-inputs" style="display: flex; flex-direction: column; gap: 24px;">
      <SuSelectBoxField 
        :options="[
          { value: 'valid', label: 'Option valide' },
          { value: 'invalid', label: 'Option invalide' }
        ]"
        label="État par défaut"
        placeholder="Sélectionnez une option"
        message="Texte d'aide pour guider l'utilisateur"
      />
      <SuSelectBoxField 
        :options="[
          { value: 'valid', label: 'Option valide' },
          { value: 'invalid', label: 'Option invalide' }
        ]"
        state="error"
        label="État d'erreur"
        placeholder="Sélectionnez une option"
        message="Cette sélection contient une erreur"
        value="invalid"
      />
      <SuSelectBoxField 
        :options="[
          { value: 'valid', label: 'Option valide' },
          { value: 'invalid', label: 'Option invalide' }
        ]"
        state="success"
        label="État de succès"
        placeholder="Sélectionnez une option"
        message="Sélection valide !"
        value="valid"
      />
      <SuSelectBoxField 
        :options="[
          { value: 'valid', label: 'Option valide' },
          { value: 'invalid', label: 'Option invalide' }
        ]"
        state="warning"
        label="État d'avertissement"
        placeholder="Sélectionnez une option"
        message="Attention à cette sélection"
        value="invalid"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuSelectBoxField 
    state="default"
    label="État par défaut"
    message="Texte d'aide pour guider l'utilisateur"
  />
  <SuSelectBoxField 
    state="error"
    label="État d'erreur"
    message="Cette sélection contient une erreur"
  />
  <SuSelectBoxField 
    state="success"
    label="État de succès"
    message="Sélection valide !"
  />
  <SuSelectBoxField 
    state="warning"
    label="État d'avertissement"
    message="Attention à cette sélection"
  />
</template>
```

### Support RTL et alignement

<div class="component-demo">
  <div class="demo-section">
    <h4>Support des langues RTL</h4>
    <div class="demo-inputs" dir="rtl" style="display: flex; flex-direction: column; gap: 24px;">
      <SuSelectBoxField 
        :options="[
          { value: 'ar', label: 'العربية' },
          { value: 'he', label: 'עברית' },
          { value: 'fa', label: 'فارسی' }
        ]"
        dir="rtl"
        label="اللغة (RTL)"
        placeholder="اختر لغة..."
      />
      <SuSelectBoxField 
        :options="[
          { value: 'left', label: 'Aligné à gauche' },
          { value: 'center', label: 'Centré' },
          { value: 'right', label: 'Aligné à droite' }
        ]"
        textAlign="center"
        label="Alignement centré"
        placeholder="Texte centré"
      />
    </div>
  </div>
</div>

```vue
<template>
  <!-- Support RTL -->
  <SuSelectBoxField 
    :options="rtlOptions"
    dir="rtl"
    label="اللغة (RTL)"
    placeholder="اختر لغة..."
  />
  
  <!-- Alignement personnalisé -->
  <SuSelectBoxField 
    :options="options"
    textAlign="center"
    label="Alignement centré"
    placeholder="Texte centré"
  />
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SelectOption[]` | `[]` | Liste des options disponibles |
| `groups` | `SelectGroup[]` | `[]` | Options organisées en groupes |
| `value` | `string \| number \| (string \| number)[]` | `undefined` | Valeur sélectionnée |
| `multiple` | `boolean` | `false` | Sélection multiple |
| `searchable` | `boolean` | `false` | Recherche intégrée |
| `clearable` | `boolean` | `false` | Bouton d'effacement |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du SelectBox |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | État visuel |
| `disabled` | `boolean` | `false` | Désactive le SelectBox |
| `readonly` | `boolean` | `false` | SelectBox en lecture seule |
| `required` | `boolean` | `false` | Champ requis |
| `placeholder` | `string` | `'Sélectionnez une option...'` | Texte de placeholder |
| `searchPlaceholder` | `string` | `'Rechercher...'` | Placeholder de recherche |
| `noOptionsText` | `string` | `'Aucune option disponible'` | Texte sans options |
| `noResultsText` | `string` | `'Aucun résultat trouvé'` | Texte sans résultats |
| `maxHeight` | `string` | `'200px'` | Hauteur max du dropdown |
| `textAlign` | `'left' \| 'center' \| 'right'` | `'left'` | Alignement du texte |
| `dir` | `'ltr' \| 'rtl' \| 'auto'` | `'auto'` | Direction du texte |
| `loading` | `boolean` | `false` | État de chargement |
| `closeOnSelect` | `boolean` | `true` | Fermer après sélection |
| `maxSelectedItems` | `number` | `undefined` | Limite de sélection multiple |
| `label` | `string` | `undefined` | Label du SelectBox |
| `message` | `string` | `undefined` | Message affiché (style déterminé par le state) |

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
| `@update:value` | `(value: string \| number \| (string \| number)[]) => void` | Émis lors du changement de valeur |
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
| `selectRef` | `Ref<HTMLDivElement>` | Référence au conteneur |
| `inputRef` | `Ref<HTMLInputElement>` | Référence au trigger |

## Accessibilité

Le composant SelectBox respecte les normes WCAG 2.1 AA et les bonnes pratiques W3C :

### ✅ Fonctionnalités d'accessibilité

- **Navigation au clavier** : Support complet des touches fléchées, Entrée, Espace, Échap, Home/End
- **Attributs ARIA** : `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-multiselectable`
- **Focus trap** : Gestion du focus dans le dropdown ouvert
- **Annonces vocales** : Messages pour les lecteurs d'écran lors des sélections
- **Labels associés** : Chaque SelectBox a un label correctement associé
- **Messages d'état** : Messages d'erreur/succès/avertissement avec `aria-live`
- **Contraste des couleurs** : Ratios conformes WCAG AA (4.5:1 minimum)
- **Focus visible** : Indicateurs de focus clairs et contrastés
- **Support RTL** : Gestion complète des langues de droite à gauche
- **Mode sombre** : Contraste adapté automatiquement
- **Contraste élevé** : Support de `prefers-contrast: high`
- **Réduction d'animation** : Respect de `prefers-reduced-motion`

### 🎯 Bonnes pratiques

```vue
<!-- SelectBox avec validation et accessibilité -->
<SuSelectBoxField 
  :options="options"
  :required="true"
  label="Catégorie"
  placeholder="Sélectionnez une catégorie..."
  :state="hasError ? 'error' : 'default'"
  :message="hasError ? 'Veuillez sélectionner une catégorie' : 'Choisissez la catégorie qui correspond le mieux'"
  v-model:value="category"
/>

<!-- SelectBox multiple avec limite -->
<SuSelectBoxField 
  :options="skills"
  :multiple="true"
  :maxSelectedItems="5"
  :searchable="true"
  :clearable="true"
  label="Compétences"
  placeholder="Sélectionnez vos compétences..."
  message="Maximum 5 compétences"
  v-model:value="selectedSkills"
/>

<!-- SelectBox avec groupes et recherche -->
<SuSelectBoxField 
  :groups="categorizedOptions"
  :searchable="true"
  label="Produit"
  placeholder="Rechercher un produit..."
  searchPlaceholder="Tapez pour filtrer..."
  ariaLabel="Sélecteur de produits par catégorie"
  v-model:value="selectedProduct"
/>
```

## Navigation au clavier

| Touche | Action |
|--------|--------|
| `Tab` | Naviguer vers/depuis le SelectBox |
| `Entrée` / `Espace` | Ouvrir/fermer le dropdown, sélectionner l'option focalisée |
| `Flèche bas` | Ouvrir le dropdown ou naviguer vers l'option suivante |
| `Flèche haut` | Naviguer vers l'option précédente |
| `Home` | Aller à la première option |
| `End` | Aller à la dernière option |
| `Échap` | Fermer le dropdown |
| `A-Z` | Recherche rapide par première lettre (si pas de recherche intégrée) |

## Exemples d'usage avancés

### Formulaire de profil utilisateur

```vue
<script setup>
import { ref } from 'vue'
import { UserIcon, BuildingOfficeIcon, GlobeAltIcon } from '@heroicons/vue/24/outline'

const userType = ref('')
const skills = ref([])
const country = ref('')

const userTypes = [
  { value: 'individual', label: 'Particulier', icon: UserIcon },
  { value: 'business', label: 'Entreprise', icon: BuildingOfficeIcon },
  { value: 'organization', label: 'Organisation', icon: GlobeAltIcon }
]

const skillOptions = [
  { value: 'js', label: 'JavaScript', group: 'Frontend' },
  { value: 'ts', label: 'TypeScript', group: 'Frontend' },
  { value: 'vue', label: 'Vue.js', group: 'Frontend' },
  { value: 'node', label: 'Node.js', group: 'Backend' },
  { value: 'python', label: 'Python', group: 'Backend' },
  { value: 'docker', label: 'Docker', group: 'DevOps' }
]

const countries = [
  { value: 'fr', label: 'France' },
  { value: 'us', label: 'États-Unis' },
  { value: 'de', label: 'Allemagne' }
]
</script>

<template>
  <form class="space-y-6">
    <SuSelectBoxField 
      :options="userTypes"
      :required="true"
      label="Type d'utilisateur"
      placeholder="Sélectionnez votre type..."
      v-model:value="userType"
    />
    
    <SuSelectBoxField 
      :options="skillOptions"
      :multiple="true"
      :searchable="true"
      :clearable="true"
      :maxSelectedItems="3"
      label="Compétences"
      placeholder="Sélectionnez vos compétences..."
      helpText="Maximum 3 compétences"
      v-model:value="skills"
    />
    
    <SuSelectBoxField 
      :options="countries"
      :searchable="true"
      :clearable="true"
      label="Pays"
      placeholder="Rechercher votre pays..."
      v-model:value="country"
    />
  </form>
</template>
```

### SelectBox avec chargement dynamique

```vue
<script setup>
import { ref, watch } from 'vue'

const searchQuery = ref('')
const options = ref([])
const loading = ref(false)
const selectedValue = ref('')

const searchOptions = async (query) => {
  loading.value = true
  try {
    // Simulation d'une API
    const response = await fetch(`/api/search?q=${query}`)
    options.value = await response.json()
  } finally {
    loading.value = false
  }
}

watch(searchQuery, (newQuery) => {
  if (newQuery.length > 2) {
    searchOptions(newQuery)
  }
})
</script>

<template>
  <SuSelectBoxField 
    :options="options"
    :searchable="true"
    :loading="loading"
    label="Recherche dynamique"
    placeholder="Tapez pour rechercher..."
    searchPlaceholder="Minimum 3 caractères..."
    @search="searchQuery = $event"
    v-model:value="selectedValue"
  />
</template>
```