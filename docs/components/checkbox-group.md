# SuCheckboxGroup

Composant CheckboxGroup pour la sélection multiple avec deux styles d'affichage : classique ou en cartes. Support complet de l'accessibilité selon les normes W3C.

## Description

`SuCheckboxGroup` est un composant de sélection multiple enrichi qui permet de choisir plusieurs options simultanément. Il offre différents styles d'affichage (classique, cartes inline, cartes bloc), supporte les icônes et descriptions, la limitation du nombre de sélections, et respecte toutes les normes d'accessibilité.

## Exemples d'utilisation

### Utilisation simple (sans SuFormField)

<div class="component-demo">
  <div class="demo-section">
    <h4>CheckboxGroup de base</h4>
    <div class="demo-inputs">
      <SuCheckboxGroup 
        :options="[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
          { value: 'option4', label: 'Option 4', disabled: true }
        ]"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const selectedValues = ref([])
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4', disabled: true }
]
</script>

<template>
  <SuCheckboxGroup 
    :options="options"
    v-model="selectedValues"
  />
</template>
```

### Style carte en bloc

<div class="component-demo">
  <div class="demo-section">
    <h4>Cartes empilées</h4>
    <div class="demo-inputs">
      <SuCheckboxGroup 
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
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const selectedTechnologies = ref([])
</script>

<template>
  <SuCheckboxGroup 
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
    v-model="selectedTechnologies"
  />
</template>
```

### Cartes en ligne

<div class="component-demo">
  <div class="demo-section">
    <h4>Cartes horizontales</h4>
    <div class="demo-inputs">
      <SuCheckboxGroup 
        :options="[
          { value: 'email', label: 'Email', description: 'Notifications par email' },
          { value: 'sms', label: 'SMS', description: 'Notifications par SMS' },
          { value: 'push', label: 'Push', description: 'Notifications push' }
        ]"
        displayType="inline-card"
        direction="horizontal"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const notifications = ref([])
</script>

<template>
  <SuCheckboxGroup 
    :options="[
      { value: 'email', label: 'Email', description: 'Notifications par email' },
      { value: 'sms', label: 'SMS', description: 'Notifications par SMS' },
      { value: 'push', label: 'Push', description: 'Notifications push' }
    ]"
    displayType="inline-card"
    direction="horizontal"
    v-model="notifications"
  />
</template>
```

### Avec icônes

<div class="component-demo">
  <div class="demo-section">
    <h4>Options avec icônes</h4>
    <div class="demo-inputs">
      <SuCheckboxGroup 
        :options="[
          { value: 'read', label: 'Lecture', icon: 'BookOpenIcon' },
          { value: 'write', label: 'Écriture', icon: 'PencilIcon' },
          { value: 'admin', label: 'Administration', icon: 'ShieldCheckIcon' }
        ]"
        displayType="block-card"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { BookOpenIcon, PencilIcon, ShieldCheckIcon } from '@heroicons/vue/24/outline'

const permissions = ref([])
const permissionOptions = [
  { value: 'read', label: 'Lecture', icon: BookOpenIcon },
  { value: 'write', label: 'Écriture', icon: PencilIcon },
  { value: 'admin', label: 'Administration', icon: ShieldCheckIcon }
]
</script>

<template>
  <SuCheckboxGroup 
    :options="permissionOptions"
    displayType="block-card"
    v-model="permissions"
  />
</template>
```

### Limitation de sélections

<div class="component-demo">
  <div class="demo-section">
    <h4>Maximum 2 sélections</h4>
    <div class="demo-inputs">
      <SuCheckboxGroup 
        :options="[
          { value: 'skill1', label: 'JavaScript' },
          { value: 'skill2', label: 'Python' },
          { value: 'skill3', label: 'Java' },
          { value: 'skill4', label: 'C#' },
          { value: 'skill5', label: 'PHP' }
        ]"
        :maxSelections="2"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const selectedSkills = ref([])
</script>

<template>
  <SuCheckboxGroup 
    :options="skillOptions"
    :maxSelections="2"
    v-model="selectedSkills"
  />
</template>
```

### Tailles

<div class="component-demo">
  <div class="demo-section">
    <h4>Tailles disponibles</h4>
    <div class="demo-inputs">
      <SuCheckboxGroup 
        :options="[
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' }
        ]"
        size="sm"
      />
      <SuCheckboxGroup 
        :options="[
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' }
        ]"
        size="md"
      />
      <SuCheckboxGroup 
        :options="[
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' }
        ]"
        size="lg"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuCheckboxGroup 
    :options="options"
    size="sm" 
  />
  
  <SuCheckboxGroup 
    :options="options"
    size="md" 
  />
  
  <SuCheckboxGroup 
    :options="options"
    size="lg" 
  />
</template>
```

### États

<div class="component-demo">
  <div class="demo-section">
    <h4>États visuels</h4>
    <div class="demo-inputs">
      <SuCheckboxGroup 
        :options="options"
      />
      <SuCheckboxGroup 
        :options="options"
        state="error"
      />
      <SuCheckboxGroup 
        :options="options"
        state="success"
        :value="['option1']"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuCheckboxGroup 
    :options="options"
  />
  
  <SuCheckboxGroup 
    :options="options"
    state="error"
  />
  
  <SuCheckboxGroup 
    :options="options"
    state="success"
    :value="['option1']"
  />
</template>
```

### Direction horizontale

<div class="component-demo">
  <div class="demo-section">
    <h4>Disposition horizontale</h4>
    <div class="demo-inputs">
      <SuCheckboxGroup 
        :options="[
          { value: 'monday', label: 'Lun' },
          { value: 'tuesday', label: 'Mar' },
          { value: 'wednesday', label: 'Mer' },
          { value: 'thursday', label: 'Jeu' },
          { value: 'friday', label: 'Ven' }
        ]"
        direction="horizontal"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuCheckboxGroup 
    :options="[
      { value: 'monday', label: 'Lun' },
      { value: 'tuesday', label: 'Mar' },
      { value: 'wednesday', label: 'Mer' },
      { value: 'thursday', label: 'Jeu' },
      { value: 'friday', label: 'Ven' }
    ]"
    direction="horizontal"
    v-model="workDays"
  />
</template>
```

## Utilisation avec SuFormField

Le composant `SuCheckboxGroup` peut être utilisé avec `SuFormField` pour bénéficier d'une structure de formulaire complète avec label, message et gestion des états.

### Usage basique avec SuFormField

```vue
<template>
  <SuFormField 
    label="Notifications" 
    message="Sélectionnez vos préférences de notification"
  >
    <template #default="slotProps">
      <SuCheckboxGroup 
        :options="notificationOptions"
        v-bind="slotProps"
        v-model="notifications"
      />
    </template>
  </SuFormField>
</template>
```

### Avec destructuration des slot props

```vue
<template>
  <SuFormField 
    label="Compétences"
    :required="true"
    message="Sélectionnez vos compétences"
  >
    <template #default="{ fieldId, messageId, state, disabled }">
      <SuCheckboxGroup 
        :options="skills"
        :id="fieldId"
        :aria-describedby="messageId"
        :state="state"
        :disabled="disabled"
        v-model="selectedSkills"
      />
    </template>
  </SuFormField>
</template>
```

### Validation avec états

<div class="component-demo">
  <div class="demo-section">
    <h4>CheckboxGroup avec validation</h4>
    <div class="demo-inputs">
      <SuFormField 
        label="Conditions d'utilisation"
        :required="true"
        state="error"
        message="Veuillez accepter au moins une condition"
      >
        <template #default="slotProps">
          <SuCheckboxGroup 
            :options="[
              { value: 'terms', label: 'J\'accepte les conditions' },
              { value: 'privacy', label: 'J\'accepte la politique de confidentialité' }
            ]"
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

const acceptedTerms = ref([])
const termsError = ref('')

const validateTerms = () => {
  if (acceptedTerms.value.length === 0) {
    termsError.value = 'Veuillez accepter au moins une condition'
  } else {
    termsError.value = ''
  }
}

const termsState = computed(() => {
  if (acceptedTerms.value.length === 0) return 'default'
  return termsError.value ? 'error' : 'success'
})
</script>

<template>
  <SuFormField 
    label="Conditions d'utilisation"
    :required="true"
    :state="termsState"
    :message="termsError || 'Veuillez accepter les conditions'"
  >
    <template #default="slotProps">
      <SuCheckboxGroup 
        :options="termsOptions"
        v-bind="slotProps"
        v-model="acceptedTerms"
        @change="validateTerms"
      />
    </template>
  </SuFormField>
</template>
```

### Limitation de sélections avec FormField

```vue
<script setup>
import { ref, computed } from 'vue'

const selectedSkills = ref([])
const maxSkills = 3

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
  <SuFormField 
    label="Compétences techniques"
    :state="remainingSelections.value === 0 ? 'warning' : 'default'"
    :message="message"
    :required="true"
  >
    <template #default="slotProps">
      <SuCheckboxGroup 
        :options="skillOptions"
        :maxSelections="maxSkills"
        v-bind="slotProps"
        v-model="selectedSkills"
      />
    </template>
  </SuFormField>
</template>
```

### Cartes avec FormField

```vue
<template>
  <SuFormField 
    label="Technologies"
    message="Sélectionnez les technologies que vous maîtrisez"
  >
    <template #default="slotProps">
      <SuCheckboxGroup 
        :options="[
          { value: 'js', label: 'JavaScript', description: 'Langage web' },
          { value: 'ts', label: 'TypeScript', description: 'JS avec typage' },
          { value: 'vue', label: 'Vue.js', description: 'Framework progressif' }
        ]"
        displayType="block-card"
        v-bind="slotProps"
        v-model="technologies"
      />
    </template>
  </SuFormField>
</template>
```

### Label et message personnalisés

```vue
<script setup>
import { BellIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <SuFormField 
    label="Notifications" 
    :required="true"
    message="Sélectionnez vos préférences"
  >
    <template #label="{ label, required, htmlFor }">
      <label 
        :for="htmlFor" 
        class="flex items-center gap-2 font-bold text-gray-900"
      >
        <BellIcon class="w-4 h-4" />
        {{ label }}
        <span v-if="required" class="text-red-500">*</span>
      </label>
    </template>
    
    <template #default="slotProps">
      <SuCheckboxGroup 
        :options="notificationOptions"
        displayType="inline-card"
        direction="horizontal"
        v-bind="slotProps"
        v-model="notifications"
      />
    </template>
    
    <template #message="{ state }">
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <InformationCircleIcon class="w-4 h-4" />
        <span v-if="state === 'error'">⚠️ Veuillez sélectionner au moins une option</span>
        <span v-else>Choisissez comment vous souhaitez être notifié</span>
      </div>
    </template>
  </SuFormField>
</template>
```

### Avec icônes et descriptions

```vue
<script setup>
import { BookOpenIcon, PencilIcon, ShieldCheckIcon } from '@heroicons/vue/24/outline'

const permissions = [
  { 
    value: 'read', 
    label: 'Lecture', 
    description: 'Consulter les documents',
    icon: BookOpenIcon 
  },
  { 
    value: 'write', 
    label: 'Écriture', 
    description: 'Créer et modifier',
    icon: PencilIcon 
  },
  { 
    value: 'admin', 
    label: 'Administration', 
    description: 'Accès complet',
    icon: ShieldCheckIcon 
  }
]
</script>

<template>
  <SuFormField 
    label="Permissions"
    message="Sélectionnez les permissions à accorder"
  >
    <template #default="slotProps">
      <SuCheckboxGroup 
        :options="permissions"
        displayType="block-card"
        v-bind="slotProps"
        v-model="selectedPermissions"
      />
    </template>
  </SuFormField>
</template>
```

### Scroll avec hauteur limitée

```vue
<template>
  <SuFormField 
    label="Compétences"
    message="Liste avec hauteur limitée et scroll automatique"
  >
    <template #default="slotProps">
      <SuCheckboxGroup 
        :options="longSkillsList"
        maxHeight="180px"
        v-bind="slotProps"
        v-model="selectedSkills"
      />
    </template>
  </SuFormField>
</template>
```

### Avec slots before et after

```vue
<script setup>
const selectAll = () => {
  selectedFeatures.value = featureOptions.map(opt => opt.value)
}

const selectNone = () => {
  selectedFeatures.value = []
}
</script>

<template>
  <SuFormField 
    label="Fonctionnalités"
    message="Configurez vos fonctionnalités"
  >
    <template #default="slotProps">
      <SuCheckboxGroup 
        :options="featureOptions"
        v-bind="slotProps"
        v-model="selectedFeatures"
      >
        <template #before>
          <div class="info-banner">
            💡 Sélectionnez les fonctionnalités que vous souhaitez activer.
          </div>
        </template>
        <template #after>
          <div class="actions">
            <button type="button" @click="selectAll">Tout sélectionner</button>
            <button type="button" @click="selectNone">Tout désélectionner</button>
          </div>
        </template>
      </SuCheckboxGroup>
    </template>
  </SuFormField>
</template>
```

### Champ désactivé

```vue
<template>
  <SuFormField 
    label="Options désactivées"
    :disabled="true"
    message="Ce champ n'est pas modifiable actuellement"
  >
    <template #default="slotProps">
      <SuCheckboxGroup 
        :options="options"
        :value="['option1', 'option2']"
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
| `options` | `CheckboxOption[]` | `[]` | Liste des options checkbox |
| `modelValue` | `(string \| number)[]` | `[]` | Valeurs sélectionnées (v-model) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille des éléments |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | État visuel |
| `disabled` | `boolean` | `false` | Désactive tout le groupe |
| `required` | `boolean` | `false` | Au moins une sélection requise |
| `displayType` | `'default' \| 'inline-card' \| 'block-card'` | `'default'` | Type d'affichage |
| `direction` | `'horizontal' \| 'vertical'` | `'vertical'` | Direction du groupe |
| `maxSelections` | `number` | `undefined` | Nombre maximum de sélections |
| `maxHeight` | `string` | `null` | Hauteur maximale avec scroll |

### Props d'accessibilité (héritées de SuFormField)

Lorsque utilisé avec `SuFormField`, le composant reçoit automatiquement :

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | ID unique du champ (fieldId) |
| `aria-describedby` | `string` | ID du message associé (messageId) |
| `state` | `string` | État de validation |
| `disabled` | `boolean` | État désactivé |

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
| `@update:modelValue` | `(value: (string \| number)[]) => void` | Émis lors du changement de valeur (v-model) |
| `@change` | `(value: (string \| number)[]) => void` | Émis lors du changement |
| `@focus` | `(event: FocusEvent) => void` | Émis lors du focus |
| `@blur` | `(event: FocusEvent) => void` | Émis lors de la perte de focus |

### Slots

| Slot | Description |
|------|-------------|
| `before` | Contenu affiché avant les options |
| `after` | Contenu affiché après les options |

## Accessibilité

Le composant CheckboxGroup respecte les normes WCAG 2.1 AA et les bonnes pratiques W3C :

### ✅ Fonctionnalités d'accessibilité

- **Fieldset et Legend** : Structure sémantique avec `<fieldset>` et `<legend>`
- **Attributs ARIA** : `role="group"`, `aria-required`, `aria-invalid`
- **Navigation au clavier** : Tab et Espace
- **Labels associés** : Chaque checkbox a un label correctement associé
- **Messages d'état** : Via aria-describedby (messageId) avec `aria-live`
- **Annonces vocales** : Feedback lors des sélections/désélections
- **Focus visible** : Indicateurs clairs et contrastés
- **Contraste des couleurs** : Ratios conformes WCAG AA (4.5:1)
- **Groupement logique** : Options regroupées sémantiquement

### 🎯 Bonnes pratiques d'utilisation

```vue
<!-- ✅ BON : Utilisation avec SuFormField pour l'accessibilité complète -->
<SuFormField 
  label="Conditions d'utilisation"
  :required="true"
  :state="termsError ? 'error' : 'default'"
  :message="termsError || 'Veuillez accepter les conditions'"
>
  <template #default="slotProps">
    <SuCheckboxGroup 
      :options="termsOptions"
      v-bind="slotProps"
      v-model="acceptedTerms"
    />
  </template>
</SuFormField>

<!-- ✅ BON : Utilisation standalone avec fieldset et legend -->
<fieldset>
  <legend>Notifications</legend>
  <SuCheckboxGroup 
    :options="notificationOptions"
    aria-required="true"
    v-model="notifications"
  />
</fieldset>

<!-- ❌ MAUVAIS : Sans label ni contexte -->
<SuCheckboxGroup 
  :options="options"
  v-model="values"
/>
```

## Navigation au clavier

| Touche | Action |
|--------|--------|
| `Tab` | Naviguer entre les checkboxes |
| `Shift + Tab` | Navigation inverse |
| `Espace` | Cocher/décocher la checkbox focalisée |

## Exemples d'usage avancés

### Formulaire de préférences complet

```vue
<script setup>
import { ref } from 'vue'
import { BellIcon, EnvelopeIcon, DevicePhoneMobileIcon } from '@heroicons/vue/24/outline'

const formData = ref({
  notifications: ['email'],
  features: [],
  permissions: []
})

const notificationOptions = [
  { value: 'email', label: 'Email', icon: EnvelopeIcon, description: 'Recevoir des emails' },
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
  <form>
    <h2>Préférences</h2>
    
    <SuFormField 
      label="Notifications"
      message="Choisissez vos préférences de notification"
    >
      <template #default="slotProps">
        <SuCheckboxGroup 
          :options="notificationOptions"
          displayType="block-card"
          v-bind="slotProps"
          v-model="formData.notifications"
        />
      </template>
    </SuFormField>
    
    <SuFormField 
      label="Fonctionnalités"
      message="Activez les fonctionnalités souhaitées"
    >
      <template #default="slotProps">
        <SuCheckboxGroup 
          :options="featureOptions"
          direction="horizontal"
          v-bind="slotProps"
          v-model="formData.features"
        />
      </template>
    </SuFormField>
    
    <button type="submit">Enregistrer</button>
  </form>
</template>
```

### Sélection avec limite et compteur

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
  { value: 'node', label: 'Node.js' },
  { value: 'python', label: 'Python' }
]

const remainingSelections = computed(() => {
  return Math.max(0, maxSkills - selectedSkills.value.length)
})

const state = computed(() => {
  if (selectedSkills.value.length === 0) return 'default'
  if (remainingSelections.value === 0) return 'warning'
  return 'success'
})

const message = computed(() => {
  if (selectedSkills.value.length === 0) {
    return 'Sélectionnez jusqu\'à 3 compétences'
  }
  if (remainingSelections.value === 0) {
    return 'Limite atteinte - Désélectionnez une compétence pour en choisir une autre'
  }
  return `Vous pouvez encore sélectionner ${remainingSelections.value} compétence(s)`
})
</script>

<template>
  <SuFormField 
    label="Compétences techniques"
    :required="true"
    :state="state"
    :message="message"
  >
    <template #default="slotProps">
      <SuCheckboxGroup 
        :options="skillOptions"
        :maxSelections="maxSkills"
        v-bind="slotProps"
        v-model="selectedSkills"
      />
    </template>
  </SuFormField>
</template>
```

## Composant SuCheckboxGroupField

Pour une utilisation encore plus simple, vous pouvez utiliser le composant `SuCheckboxGroupField` qui combine automatiquement `SuFormField` et `SuCheckboxGroup` :

```vue
<template>
  <!-- Au lieu de -->
  <SuFormField label="Notifications" message="Sélectionnez vos préférences">
    <template #default="slotProps">
      <SuCheckboxGroup 
        :options="options"
        v-bind="slotProps"
        v-model="notifications"
      />
    </template>
  </SuFormField>
  
  <!-- Vous pouvez simplement écrire -->
  <SuCheckboxGroupField 
    :options="options"
    label="Notifications"
    message="Sélectionnez vos préférences"
    v-model="notifications"
  />
</template>
```

Le composant `SuCheckboxGroupField` accepte toutes les props de `SuFormField` et `SuCheckboxGroup` combinées, offrant une syntaxe plus concise tout en conservant toutes les fonctionnalités.

Voir la [documentation complète de SuRadioGroupField](./SuRadioGroupField.md) pour plus de détails.