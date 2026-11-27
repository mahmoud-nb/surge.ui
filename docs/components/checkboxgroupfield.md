# CheckboxGroup

Composant CheckboxGroup pour la sélection multiple avec deux styles d'affichage : classique ou en cartes. Support complet de l'accessibilité selon les normes W3C.

## Exemples d'utilisation

### CheckboxGroup de base

<div class="component-demo">
  <div class="demo-section">
    <h4>Style par défaut</h4>
    <div class="demo-inputs">
      <SuCheckboxGroupField 
        :options="[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
          { value: 'option4', label: 'Option 4', disabled: true }
        ]"
        label="Sélection multiple"
      />
    </div>
  </div>
</div>

```vue
<script setup>
const selectedValues = ref([])
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4', disabled: true }
]
</script>

<template>
  <SuCheckboxGroupField 
    :options="options"
    label="Sélection multiple"
    v-model:value="selectedValues"
  />
</template>
```

### Style carte

<div class="component-demo">
  <div class="demo-section">
    <h4>Cartes en bloc</h4>
    <div class="demo-inputs">
      <SuCheckboxGroupField 
        :options="[
          { 
            value: 'js', 
            label: 'JavaScript', 
            description: 'Langage de programmation web'
          },
          { 
            value: 'ts', 
            label: 'TypeScript', 
            description: 'JavaScript avec typage statique'
          },
          { 
            value: 'vue', 
            label: 'Vue.js', 
            description: 'Framework JavaScript progressif'
          }
        ]"
        displayType="block-card"
        label="Technologies"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuCheckboxGroupField 
    :options="[
      { 
        value: 'js', 
        label: 'JavaScript', 
        description: 'Langage de programmation web'
      },
      { 
        value: 'ts', 
        label: 'TypeScript', 
        description: 'JavaScript avec typage statique'
      },
      { 
        value: 'vue', 
        label: 'Vue.js', 
        description: 'Framework JavaScript progressif'
      }
    ]"
    displayType="block-card"
    label="Technologies"
    v-model:value="selectedTechnologies"
  />
</template>
```

### Cartes en ligne

<div class="component-demo">
  <div class="demo-section">
    <h4>Cartes inline</h4>
    <div class="demo-inputs">
      <SuCheckboxGroupField 
        :options="[
          { value: 'email', label: 'Email', description: 'Notifications par email' },
          { value: 'sms', label: 'SMS', description: 'Notifications par SMS' },
          { value: 'push', label: 'Push', description: 'Notifications push' }
        ]"
        displayType="inline-card"
        direction="horizontal"
        label="Notifications"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuCheckboxGroupField 
    :options="[
      { value: 'email', label: 'Email', description: 'Notifications par email' },
      { value: 'sms', label: 'SMS', description: 'Notifications par SMS' },
      { value: 'push', label: 'Push', description: 'Notifications push' }
    ]"
    displayType="inline-card"
    direction="horizontal"
    label="Notifications"
    v-model:value="notifications"
  />
</template>
```

### Avec icônes

<div class="component-demo">
  <div class="demo-section">
    <h4>Options avec icônes</h4>
    <div class="demo-inputs">
      <SuCheckboxGroupField 
        :options="[
          { value: 'read', label: 'Lecture', icon: 'StarIcon' },
          { value: 'write', label: 'Écriture', icon: 'BuildingOfficeIcon' },
          { value: 'admin', label: 'Administration', icon: 'GlobeAltIcon' }
        ]"
        displayType="block-card"
        label="Permissions"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { StarIcon, BuildingOfficeIcon, GlobeAltIcon } from '@heroicons/vue/24/outline'

const permissions = ref([])
const permissionOptions = [
  { value: 'read', label: 'Lecture', icon: StarIcon },
  { value: 'write', label: 'Écriture', icon: BuildingOfficeIcon },
  { value: 'admin', label: 'Administration', icon: GlobeAltIcon }
]
</script>

<template>
  <SuCheckboxGroupField 
    :options="permissionOptions"
    displayType="card"
    label="Permissions"
    v-model:value="permissions"
  />
</template>
```

### Limitation de sélections

<div class="component-demo">
  <div class="demo-section">
    <h4>Maximum 2 sélections</h4>
    <div class="demo-inputs">
      <SuCheckboxGroupField 
        :options="[
          { value: 'skill1', label: 'JavaScript' },
          { value: 'skill2', label: 'Python' },
          { value: 'skill3', label: 'Java' },
          { value: 'skill4', label: 'C#' },
          { value: 'skill5', label: 'PHP' }
        ]"
        :maxSelections="2"
        label="Compétences principales"
        message="Sélectionnez maximum 2 compétences"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuCheckboxGroupField 
    :options="skillOptions"
    :maxSelections="2"
    label="Compétences principales"
    message="Sélectionnez maximum 2 compétences"
    v-model:value="selectedSkills"
  />
</template>
```

### Tailles

<div class="component-demo">
  <div class="demo-section">
    <h4>Tailles disponibles</h4>
    <div class="demo-inputs">
      <SuCheckboxGroupField 
        :options="[
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' }
        ]"
        size="sm"
        label="Small"
      />
      <SuCheckboxGroupField 
        :options="[
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' }
        ]"
        size="md"
        label="Medium"
      />
      <SuCheckboxGroupField 
        :options="[
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' }
        ]"
        size="lg"
        label="Large"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuCheckboxGroupField size="sm" label="Small" />
  <SuCheckboxGroupField size="md" label="Medium" />
  <SuCheckboxGroupField size="lg" label="Large" />
</template>
```

### États et validation

<div class="component-demo">
  <div class="demo-section">
    <h4>États de validation</h4>
    <div class="demo-inputs">
      <SuCheckboxGroupField 
        :options="[
          { value: 'terms', label: 'J\'accepte les conditions d\'utilisation' },
          { value: 'privacy', label: 'J\'accepte la politique de confidentialité' }
        ]"
        label="Acceptation"
        message="Veuillez accepter les conditions"
        :required="true"
      />
      <SuCheckboxGroupField 
        :options="[
          { value: 'newsletter', label: 'Newsletter' },
          { value: 'promotions', label: 'Promotions' }
        ]"
        state="success"
        label="Communications"
        message="Préférences sauvegardées !"
        :value="['newsletter']"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuCheckboxGroupField 
    :options="acceptanceOptions"
    :required="true"
    label="Acceptation"
    message="Veuillez accepter les conditions"
    v-model:value="acceptance"
  />
  
  <SuCheckboxGroupField 
    :options="communicationOptions"
    state="success"
    label="Communications"
    message="Préférences sauvegardées !"
    v-model:value="communications"
  />
</template>
```

### Direction horizontale

<div class="component-demo">
  <div class="demo-section">
    <h4>Disposition horizontale</h4>
    <div class="demo-inputs">
      <SuCheckboxGroupField 
        :options="[
          { value: 'monday', label: 'Lundi' },
          { value: 'tuesday', label: 'Mardi' },
          { value: 'wednesday', label: 'Mercredi' },
          { value: 'thursday', label: 'Jeudi' },
          { value: 'friday', label: 'Vendredi' }
        ]"
        direction="horizontal"
        label="Jours de travail"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuCheckboxGroupField 
    :options="dayOptions"
    direction="horizontal"
    label="Jours de travail"
    v-model:value="workDays"
  />
</template>
```

### Scroll avec hauteur limitée

<div class="component-demo">
  <div class="demo-section">
    <h4>Liste avec scroll vertical</h4>
    <div class="demo-inputs">
      <SuCheckboxGroupField 
        :options="[
          { value: 'skill1', label: 'JavaScript' },
          { value: 'skill2', label: 'TypeScript' },
          { value: 'skill3', label: 'Vue.js' },
          { value: 'skill4', label: 'React' },
          { value: 'skill5', label: 'Angular' },
          { value: 'skill6', label: 'Node.js' },
          { value: 'skill7', label: 'Python' },
          { value: 'skill8', label: 'Java' },
          { value: 'skill9', label: 'C#' },
          { value: 'skill10', label: 'PHP' }
        ]"
        maxHeight="150px"
        label="Compétences (avec scroll)"
        message="Liste avec hauteur limitée et scroll automatique"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuCheckboxGroupField 
    :options="longSkillsList"
    maxHeight="150px"
    label="Compétences (avec scroll)"
    message="Liste avec hauteur limitée et scroll automatique"
    v-model:value="selectedSkills"
  />
</template>
```

### Avec slots personnalisés

<div class="component-demo">
  <div class="demo-section">
    <h4>Slots before et after</h4>
    <div class="demo-inputs">
      <SuCheckboxGroupField 
        :options="[
          { value: 'feature1', label: 'Fonctionnalité 1' },
          { value: 'feature2', label: 'Fonctionnalité 2' },
          { value: 'feature3', label: 'Fonctionnalité 3' }
        ]"
        label="Fonctionnalités"
      >
        <template #before>
          <div style="padding: 0.75rem; background-color: #f3f4f6; border-radius: 0.375rem; margin-bottom: 0.75rem;">
            <p style="margin: 0; font-size: 0.875rem; color: #6b7280;">
              💡 Sélectionnez les fonctionnalités que vous souhaitez activer pour votre compte.
            </p>
          </div>
        </template>
        <template #after>
          <div style="display: flex; gap: 0.5rem; margin-top: 0.75rem;">
            <button type="button" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; background: #e5e7eb; border: none; border-radius: 0.25rem; cursor: pointer;">
              Tout sélectionner
            </button>
            <button type="button" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; background: #e5e7eb; border: none; border-radius: 0.25rem; cursor: pointer;">
              Tout désélectionner
            </button>
          </div>
        </template>
      </SuCheckboxGroupField>
    </div>
  </div>
</div>

```vue
<template>
  <SuCheckboxGroupField 
    :options="featureOptions"
    label="Fonctionnalités"
    v-model:value="selectedFeatures"
  >
    <template #before>
      <div class="info-box">
        💡 Sélectionnez les fonctionnalités que vous souhaitez activer.
      </div>
    </template>
    <template #after>
      <div class="actions">
        <button @click="selectAll">Tout sélectionner</button>
        <button @click="selectNone">Tout désélectionner</button>
      </div>
    </template>
  </SuCheckboxGroupField>
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `CheckboxOption[]` | `[]` | Liste des options checkbox |
| `v-model` | `(string \| number)[]` | `[]` | Valeurs sélectionnées |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille des éléments |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | État visuel |
| `disabled` | `boolean` | `false` | Désactive tout le groupe |
| `required` | `boolean` | `false` | Au moins une sélection requise |
| `displayType` | `'default' \| 'inline-card' \| 'block-card'` | `'default'` | Type d'affichage |
| `direction` | `'horizontal' \| 'vertical'` | `'vertical'` | Direction du groupe |
| `maxSelections` | `number` | `undefined` | Nombre maximum de sélections |
| `maxHeight` | `string` | `null` | Hauteur maximale avec scroll automatique |
| `label` | `string` | `undefined` | Label du groupe |
| `message` | `string` | `undefined` | Message affiché (style déterminé par le state) |
| `name` | `string` | - | Nom du champ, pour la soumission native du formulaire |
| `fieldId` | `string` | - | Id du contrôle, relié au label (sinon généré) |
| `requiredText` | `string` | - | Texte de l’astérisque « requis » pour les lecteurs d’écran (sinon traduit) |

### Types d'options

#### CheckboxOption
```typescript
interface CheckboxOption {
  value: string | number
  label: string
  description?: string
  disabled?: boolean
  icon?: Component
}
```

### Events

| Event | Type | Description |
|-------|------|-------------|
| `@update:value` | `(value: (string \| number)[]) => void` | Émis lors du changement de valeur |
| `@change` | `(value: (string \| number)[]) => void` | Émis lors du changement |
| `@focus` | `(event: FocusEvent) => void` | Émis lors du focus |
| `@blur` | `(event: FocusEvent) => void` | Émis lors de la perte de focus |

### Slots

| Slot | Description |
|------|-------------|
| `before` | Contenu affiché entre le label et la liste des options |
| `after` | Contenu affiché entre la liste des options et le message |

## Accessibilité

Le composant CheckboxGroup respecte les normes WCAG 2.1 AA :

### ✅ Fonctionnalités d'accessibilité

- **Fieldset et Legend** : Structure sémantique correcte avec `<fieldset>` et `<legend>`
- **Attributs ARIA** : `role="group"`, `aria-required`, `aria-invalid`
- **Navigation au clavier** : Support de Tab et Espace
- **Labels associés** : Chaque checkbox a un label correctement associé
- **Messages d'état** : Messages avec `aria-live` pour les lecteurs d'écran
- **Annonces vocales** : Feedback vocal lors des sélections/désélections
- **Focus visible** : Indicateurs de focus clairs et contrastés
- **Contraste des couleurs** : Ratios conformes WCAG AA
- **Groupement logique** : Options regroupées sémantiquement

### 🎯 Bonnes pratiques

```vue
<!-- CheckboxGroup avec validation -->
<SuCheckboxGroupField 
  :options="options"
  :required="true"
  label="Conditions d'utilisation"
  :state="hasError ? 'error' : 'default'"
  :message="hasError ? 'Veuillez accepter au moins une condition' : undefined"
  v-model:value="acceptedTerms"
/>

<!-- CheckboxGroup avec limitation -->
<SuCheckboxGroupField 
  :options="skillOptions"
  :maxSelections="3"
  label="Compétences"
  message="Sélectionnez jusqu'à 3 compétences"
  v-model:value="selectedSkills"
/>
```

## Navigation au clavier

| Touche | Action |
|--------|--------|
| `Tab` | Naviguer entre les checkboxes |
| `Espace` | Cocher/décocher la checkbox focalisée |

## Exemples d'usage avancés

### Formulaire de préférences

```vue
<script setup>
import { ref } from 'vue'
import { BellIcon, MailIcon, DevicePhoneMobileIcon } from '@heroicons/vue/24/outline'

const notifications = ref(['email'])
const features = ref([])
const permissions = ref([])

const notificationOptions = [
  { value: 'email', label: 'Email', icon: MailIcon, description: 'Recevoir des emails' },
  { value: 'push', label: 'Push', icon: BellIcon, description: 'Notifications push' },
  { value: 'sms', label: 'SMS', icon: DevicePhoneMobileIcon, description: 'Messages SMS' }
]

const featureOptions = [
  { value: 'dark-mode', label: 'Mode sombre' },
  { value: 'auto-save', label: 'Sauvegarde automatique' },
  { value: 'shortcuts', label: 'Raccourcis clavier' }
]
</script>

<template>
  <form class="space-y-6">
    <SuCheckboxGroupField 
      :options="notificationOptions"
      displayType="block-card"
      label="Notifications"
      message="Choisissez vos préférences de notification"
      v-model:value="notifications"
    />
    
    <SuCheckboxGroupField 
      :options="featureOptions"
      direction="horizontal"
      label="Fonctionnalités"
      v-model:value="features"
    />
  </form>
</template>
```

### Sélection avec limite

```vue
<script setup>
import { ref, computed } from 'vue'

const selectedSkills = ref([])
const maxSkills = 3

const skillOptions = [
  { value: 'js', label: 'JavaScript' },
  { value: 'ts', label: 'TypeScript' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'react', label: 'React' },
  { value: 'node', label: 'Node.js' }
]

const remainingSelections = computed(() => {
  return Math.max(0, maxSkills - selectedSkills.value.length)
})

const message = computed(() => {
  if (remainingSelections.value === 0) {
    return 'Limite atteinte'
  }
  return `Vous pouvez encore sélectionner ${remainingSelections.value} compétence(s)`
})
</script>

<template>
  <SuCheckboxGroupField 
    :options="skillOptions"
    :maxSelections="maxSkills"
    :state="remainingSelections === 0 ? 'warning' : 'default'"
    label="Compétences techniques"
    :message="message"
    v-model:value="selectedSkills"
  />
</template>
```