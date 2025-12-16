# RadioGroup

Composant RadioGroup pour la sélection unique avec deux styles d'affichage : classique ou en cartes. Support complet de l'accessibilité selon les normes W3C.

## Description

`SuRadioGroup` est un composant de sélection unique enrichi qui permet de choisir une seule option parmi plusieurs. Il offre différents styles d'affichage (classique, cartes inline, cartes bloc), supporte les icônes et descriptions, et respecte toutes les normes d'accessibilité.

## Exemples d'utilisation

### Utilisation simple (sans SuFormField)

<div class="component-demo">
  <div class="demo-section">
    <h4>RadioGroup de base</h4>
    <div class="demo-inputs">
      <SuRadioGroup 
        :options="[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
          { value: 'option4', label: 'Option 4', disabled: true }
        ]"
        name="basic-radio"
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
  <SuRadioGroup 
    :options="options"
    name="basic-radio"
    v-model="selectedValue"
  />
</template>
```

### Style carte en bloc

<div class="component-demo">
  <div class="demo-section">
    <h4>Cartes empilées</h4>
    <div class="demo-inputs">
      <SuRadioGroup 
        :options="[
          { 
            value: 'basic', 
            label: 'Plan Basic', 
            description: 'Fonctionnalités de base pour débuter'
          },
          { 
            value: 'pro', 
            label: 'Plan Pro', 
            description: 'Fonctionnalités avancées pour les professionnels'
          },
          { 
            value: 'enterprise', 
            label: 'Plan Enterprise', 
            description: 'Solution complète pour les grandes entreprises'
          }
        ]"
        displayType="block-card"
        name="plan-radio"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const selectedPlan = ref('')
</script>

<template>
  <SuRadioGroup 
    :options="[
      { 
        value: 'basic', 
        label: 'Plan Basic', 
        description: 'Fonctionnalités de base pour débuter'
      },
      { 
        value: 'pro', 
        label: 'Plan Pro', 
        description: 'Fonctionnalités avancées pour les professionnels'
      },
      { 
        value: 'enterprise', 
        label: 'Plan Enterprise', 
        description: 'Solution complète pour les grandes entreprises'
      }
    ]"
    displayType="block-card"
    name="plan-radio"
    v-model="selectedPlan"
  />
</template>
```

### Cartes en ligne

<div class="component-demo">
  <div class="demo-section">
    <h4>Cartes horizontales</h4>
    <div class="demo-inputs">
      <SuRadioGroup 
        :options="[
          { value: 'small', label: 'Small', description: 'Jusqu\'à 5 utilisateurs' },
          { value: 'medium', label: 'Medium', description: 'Jusqu\'à 25 utilisateurs' },
          { value: 'large', label: 'Large', description: 'Utilisateurs illimités' }
        ]"
        displayType="inline-card"
        direction="horizontal"
        name="team-size-radio"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const teamSize = ref('')
</script>

<template>
  <SuRadioGroup 
    :options="[
      { value: 'small', label: 'Small', description: 'Jusqu\'à 5 utilisateurs' },
      { value: 'medium', label: 'Medium', description: 'Jusqu\'à 25 utilisateurs' },
      { value: 'large', label: 'Large', description: 'Utilisateurs illimités' }
    ]"
    displayType="inline-card"
    direction="horizontal"
    name="team-size-radio"
    v-model="teamSize"
  />
</template>
```

### Avec icônes

<div class="component-demo">
  <div class="demo-section">
    <h4>Options avec icônes</h4>
    <div class="demo-inputs">
      <SuRadioGroup 
        :options="[
          { value: 'user', label: 'Particulier', icon: 'UserIcon' },
          { value: 'business', label: 'Entreprise', icon: 'BuildingOfficeIcon' },
          { value: 'organization', label: 'Organisation', icon: 'GlobeAltIcon' }
        ]"
        displayType="block-card"
        name="account-type-radio"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { UserIcon, BuildingOfficeIcon, GlobeAltIcon } from '@heroicons/vue/24/outline'

const accountType = ref('')
const accountOptions = [
  { value: 'user', label: 'Particulier', icon: UserIcon },
  { value: 'business', label: 'Entreprise', icon: BuildingOfficeIcon },
  { value: 'organization', label: 'Organisation', icon: GlobeAltIcon }
]
</script>

<template>
  <SuRadioGroup 
    :options="accountOptions"
    displayType="block-card"
    name="account-type-radio"
    v-model="accountType"
  />
</template>
```

### Tailles

<div class="component-demo">
  <div class="demo-section">
    <h4>Tailles disponibles</h4>
    <div class="demo-inputs">
      <SuRadioGroup 
        :options="[
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' }
        ]"
        size="sm"
        name="size-sm-radio"
      />
      <SuRadioGroup 
        :options="[
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' }
        ]"
        size="md"
        name="size-md-radio"
      />
      <SuRadioGroup 
        :options="[
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' }
        ]"
        size="lg"
        name="size-lg-radio"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuRadioGroup 
    :options="options"
    size="sm" 
    name="size-sm" 
  />
  
  <SuRadioGroup 
    :options="options"
    size="md" 
    name="size-md" 
  />
  
  <SuRadioGroup 
    :options="options"
    size="lg" 
    name="size-lg" 
  />
</template>
```

### États

<div class="component-demo">
  <div class="demo-section">
    <h4>États visuels</h4>
    <div class="demo-inputs">
      <SuRadioGroup 
        :options="options"
        name="default-state"
      />
      <SuRadioGroup 
        :options="options"
        state="error"
        name="error-state"
      />
      <SuRadioGroup 
        :options="options"
        state="success"
        value="option1"
        name="success-state"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuRadioGroup 
    :options="options"
    name="default"
  />
  
  <SuRadioGroup 
    :options="options"
    state="error"
    name="error"
  />
  
  <SuRadioGroup 
    :options="options"
    state="success"
    value="option1"
    name="success"
  />
</template>
```

### Direction horizontale

<div class="component-demo">
  <div class="demo-section">
    <h4>Disposition horizontale</h4>
    <div class="demo-inputs">
      <SuRadioGroup 
        :options="[
          { value: 'yes', label: 'Oui' },
          { value: 'no', label: 'Non' },
          { value: 'maybe', label: 'Peut-être' }
        ]"
        direction="horizontal"
        name="horizontal-radio"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuRadioGroup 
    :options="[
      { value: 'yes', label: 'Oui' },
      { value: 'no', label: 'Non' },
      { value: 'maybe', label: 'Peut-être' }
    ]"
    direction="horizontal"
    name="horizontal-radio"
    v-model="acceptance"
  />
</template>
```

## Utilisation avec SuFormField

Le composant `SuRadioGroup` peut être utilisé avec `SuFormField` pour bénéficier d'une structure de formulaire complète avec label, message et gestion des états.

### Usage basique avec SuFormField

```vue
<template>
  <SuFormField 
    label="Méthode de paiement" 
    message="Sélectionnez votre méthode de paiement préférée"
  >
    <template #default="slotProps">
      <SuRadioGroup 
        :options="paymentMethods"
        name="payment-method"
        v-bind="slotProps"
        v-model="selectedPayment"
      />
    </template>
  </SuFormField>
</template>
```

### Avec destructuration des slot props

```vue
<template>
  <SuFormField 
    label="Plan d'abonnement"
    :required="true"
    message="Choisissez votre plan"
  >
    <template #default="{ fieldId, messageId, state, disabled }">
      <SuRadioGroup 
        :options="plans"
        :id="fieldId"
        :aria-describedby="messageId"
        :state="state"
        :disabled="disabled"
        displayType="block-card"
        name="subscription-plan"
        v-model="selectedPlan"
      />
    </template>
  </SuFormField>
</template>
```

### Validation avec états

<div class="component-demo">
  <div class="demo-section">
    <h4>RadioGroup avec validation</h4>
    <div class="demo-inputs">
      <SuFormField 
        label="Type de compte"
        :required="true"
        state="error"
        message="Veuillez sélectionner un type de compte"
      >
        <template #default="slotProps">
          <SuRadioGroup 
            :options="[
              { value: 'individual', label: 'Particulier' },
              { value: 'business', label: 'Entreprise' },
              { value: 'organization', label: 'Organisation' }
            ]"
            name="account-type"
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

const accountType = ref('')
const accountTypeError = ref('')

const validateAccountType = () => {
  if (!accountType.value) {
    accountTypeError.value = 'Veuillez sélectionner un type de compte'
  } else {
    accountTypeError.value = ''
  }
}

const accountTypeState = computed(() => {
  if (!accountType.value) return 'default'
  return accountTypeError.value ? 'error' : 'success'
})
</script>

<template>
  <SuFormField 
    label="Type de compte"
    :required="true"
    :state="accountTypeState"
    :message="accountTypeError || 'Sélectionnez le type qui vous correspond'"
  >
    <template #default="slotProps">
      <SuRadioGroup 
        :options="accountTypes"
        name="account-type"
        v-bind="slotProps"
        v-model="accountType"
        @change="validateAccountType"
      />
    </template>
  </SuFormField>
</template>
```

### Cartes avec FormField

```vue
<template>
  <SuFormField 
    label="Taille d'équipe"
    message="Sélectionnez la taille de votre équipe"
    :required="true"
  >
    <template #default="slotProps">
      <SuRadioGroup 
        :options="[
          { value: 'small', label: 'Small', description: 'Jusqu\'à 5 utilisateurs' },
          { value: 'medium', label: 'Medium', description: 'Jusqu\'à 25 utilisateurs' },
          { value: 'large', label: 'Large', description: 'Utilisateurs illimités' }
        ]"
        displayType="inline-card"
        direction="horizontal"
        name="team-size"
        v-bind="slotProps"
        v-model="teamSize"
      />
    </template>
  </SuFormField>
</template>
```

### Label et message personnalisés

```vue
<script setup>
import { CreditCardIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <SuFormField 
    label="Méthode de paiement" 
    :required="true"
    message="Sélectionnez votre méthode"
  >
    <template #label="{ label, required, htmlFor }">
      <label 
        :for="htmlFor" 
        class="flex items-center gap-2 font-bold text-gray-900"
      >
        <CreditCardIcon class="w-4 h-4" />
        {{ label }}
        <span v-if="required" class="text-red-500">*</span>
      </label>
    </template>
    
    <template #default="slotProps">
      <SuRadioGroup 
        :options="paymentMethods"
        displayType="block-card"
        name="payment-method"
        v-bind="slotProps"
        v-model="payment"
      />
    </template>
    
    <template #message="{ state }">
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <InformationCircleIcon class="w-4 h-4" />
        <span v-if="state === 'error'">⚠️ Veuillez sélectionner une méthode</span>
        <span v-else>Choisissez comment vous souhaitez payer</span>
      </div>
    </template>
  </SuFormField>
</template>
```

### Avec icônes et descriptions

```vue
<script setup>
import { StarIcon, BuildingOfficeIcon, GlobeAltIcon } from '@heroicons/vue/24/outline'

const plans = [
  { 
    value: 'basic', 
    label: 'Plan Basic', 
    description: 'Fonctionnalités de base - 9€/mois',
    icon: StarIcon 
  },
  { 
    value: 'pro', 
    label: 'Plan Pro', 
    description: 'Fonctionnalités avancées - 19€/mois',
    icon: BuildingOfficeIcon 
  },
  { 
    value: 'enterprise', 
    label: 'Plan Enterprise', 
    description: 'Solution complète - 49€/mois',
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
      <SuRadioGroup 
        :options="plans"
        displayType="block-card"
        name="subscription-plan"
        v-bind="slotProps"
        v-model="selectedPlan"
      />
    </template>
  </SuFormField>
</template>
```

### Scroll avec hauteur limitée

```vue
<template>
  <SuFormField 
    label="Pays"
    message="Liste avec hauteur limitée et scroll automatique"
  >
    <template #default="slotProps">
      <SuRadioGroup 
        :options="longCountriesList"
        maxHeight="180px"
        name="country"
        v-bind="slotProps"
        v-model="selectedCountry"
      />
    </template>
  </SuFormField>
</template>
```

### Avec slots before et after

```vue
<template>
  <SuFormField 
    label="Choisissez votre plan"
    message="Plans disponibles"
  >
    <template #default="slotProps">
      <SuRadioGroup 
        :options="planOptions"
        displayType="block-card"
        name="plan"
        v-bind="slotProps"
        v-model="plan"
      >
        <template #before>
          <div class="info-banner">
            🎯 Choisissez le plan qui correspond le mieux à vos besoins.
          </div>
        </template>
        <template #after>
          <div class="text-center mt-3">
            <a href="#" class="text-blue-600">Comparer tous les plans →</a>
          </div>
        </template>
      </SuRadioGroup>
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
      <SuRadioGroup 
        :options="options"
        value="option1"
        name="disabled"
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
| `options` | `RadioOption[]` | `[]` | Liste des options radio |
| `modelValue` | `string \| number` | `undefined` | Valeur sélectionnée (v-model) |
| `name` | `string` | `undefined` | Nom du groupe radio (généré automatiquement si non fourni) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille des éléments |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | État visuel |
| `disabled` | `boolean` | `false` | Désactive tout le groupe |
| `required` | `boolean` | `false` | Champ requis |
| `displayType` | `'default' \| 'inline-card' \| 'block-card'` | `'default'` | Type d'affichage |
| `direction` | `'horizontal' \| 'vertical'` | `'vertical'` | Direction du groupe |
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

#### RadioOption
```typescript
interface RadioOption {
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
| `@update:modelValue` | `(value: string \| number) => void` | Émis lors du changement de valeur (v-model) |
| `@change` | `(value: string \| number) => void` | Émis lors du changement |
| `@focus` | `(event: FocusEvent) => void` | Émis lors du focus |
| `@blur` | `(event: FocusEvent) => void` | Émis lors de la perte de focus |

### Slots

| Slot | Description |
|------|-------------|
| `before` | Contenu affiché avant les options |
| `after` | Contenu affiché après les options |

## Accessibilité

Le composant RadioGroup respecte les normes WCAG 2.1 AA et les bonnes pratiques W3C :

### ✅ Fonctionnalités d'accessibilité

- **Fieldset et Legend** : Structure sémantique avec `<fieldset>` et `<legend>`
- **Attributs ARIA** : `role="radiogroup"`, `aria-required`, `aria-invalid`
- **Navigation au clavier** : Touches fléchées, Tab, Espace
- **Labels associés** : Chaque radio a un label correctement associé
- **Messages d'état** : Via aria-describedby (messageId) avec `aria-live`
- **Focus visible** : Indicateurs clairs et contrastés
- **Contraste des couleurs** : Ratios conformes WCAG AA (4.5:1)
- **Groupement logique** : Options regroupées sémantiquement

### 🎯 Bonnes pratiques d'utilisation

```vue
<!-- ✅ BON : Utilisation avec SuFormField pour l'accessibilité complète -->
<SuFormField 
  label="Méthode de paiement"
  :required="true"
  :state="paymentError ? 'error' : 'default'"
  :message="paymentError || 'Sélectionnez votre méthode de paiement'"
>
  <template #default="slotProps">
    <SuRadioGroup 
      :options="paymentMethods"
      name="payment"
      v-bind="slotProps"
      v-model="payment"
    />
  </template>
</SuFormField>

<!-- ✅ BON : Utilisation standalone avec fieldset et legend -->
<fieldset>
  <legend>Méthode de paiement</legend>
  <SuRadioGroup 
    :options="paymentMethods"
    name="payment"
    aria-required="true"
    v-model="payment"
  />
</fieldset>

<!-- ❌ MAUVAIS : Sans label ni contexte -->
<SuRadioGroup 
  :options="options"
  name="selection"
  v-model="value"
/>
```

## Navigation au clavier

| Touche | Action |
|--------|--------|
| `Tab` | Naviguer vers/depuis le groupe |
| `Flèches ↑/↓` | Naviguer entre les options (vertical) |
| `Flèches ←/→` | Naviguer entre les options (horizontal) |
| `Espace` | Sélectionner l'option focalisée |

## Exemples d'usage avancés

### Formulaire de configuration complet

```vue
<script setup>
import { ref } from 'vue'
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/vue/24/outline'

const formData = ref({
  theme: 'light',
  privacy: 'public',
  notifications: 'all'
})

const errors = ref({})

const themeOptions = [
  { value: 'light', label: 'Clair', description: 'Interface claire', icon: SunIcon },
  { value: 'dark', label: 'Sombre', description: 'Interface sombre', icon: MoonIcon },
  { value: 'auto', label: 'Auto', description: 'Suit le système', icon: ComputerDesktopIcon }
]

const privacyOptions = [
  { value: 'public', label: 'Public', description: 'Visible par tous' },
  { value: 'private', label: 'Privé', description: 'Visible par vous uniquement' }
]
</script>

<template>
  <form>
    <h2>Paramètres</h2>
    
    <SuFormField 
      label="Thème"
      message="Choisissez l'apparence de l'interface"
    >
      <template #default="slotProps">
        <SuRadioGroup 
          :options="themeOptions"
          displayType="block-card"
          name="theme"
          v-bind="slotProps"
          v-model="formData.theme"
        />
      </template>
    </SuFormField>
    
    <SuFormField 
      label="Confidentialité"
      message="Qui peut voir votre profil ?"
      :required="true"
    >
      <template #default="slotProps">
        <SuRadioGroup 
          :options="privacyOptions"
          displayType="inline-card"
          direction="horizontal"
          name="privacy"
          v-bind="slotProps"
          v-model="formData.privacy"
        />
      </template>
    </SuFormField>
    
    <button type="submit">Enregistrer</button>
  </form>
</template>
```

### Sélecteur de plan avec prix

```vue
<script setup>
import { ref, computed } from 'vue'

const selectedPlan = ref('')

const plans = [
  { 
    value: 'starter', 
    label: 'Starter', 
    description: '5€/mois - Parfait pour débuter'
  },
  { 
    value: 'professional', 
    label: 'Professional', 
    description: '15€/mois - Pour les professionnels'
  },
  { 
    value: 'business', 
    label: 'Business', 
    description: '45€/mois - Solution complète'
  }
]

const totalPrice = computed(() => {
  const prices = { starter: 5, professional: 15, business: 45 }
  return selectedPlan.value ? prices[selectedPlan.value] : 0
})
</script>

<template>
  <div>
    <SuFormField 
      label="Choisissez votre plan"
      :required="true"
    >
      <template #default="slotProps">
        <SuRadioGroup 
          :options="plans"
          displayType="block-card"
          name="plan"
          v-bind="slotProps"
          v-model="selectedPlan"
        >
          <template #after>
            <div v-if="selectedPlan" class="text-right mt-4">
              <strong>Total : {{ totalPrice }}€/mois</strong>
            </div>
          </template>
        </SuRadioGroup>
      </template>
    </SuFormField>
  </div>
</template>
```

## Composant SuRadioGroupField

Pour une utilisation encore plus simple, vous pouvez utiliser le composant `SuRadioGroupField` qui combine automatiquement `SuFormField` et `SuRadioGroup` :

```vue
<template>
  <!-- Au lieu de -->
  <SuFormField label="Méthode de paiement" message="Sélectionnez une méthode">
    <template #default="slotProps">
      <SuRadioGroup 
        :options="methods"
        name="payment"
        v-bind="slotProps"
        v-model="payment"
      />
    </template>
  </SuFormField>
  
  <!-- Vous pouvez simplement écrire -->
  <SuRadioGroupField 
    :options="methods"
    label="Méthode de paiement"
    message="Sélectionnez une méthode"
    name="payment"
    v-model="payment"
  />
</template>
```

Le composant `SuRadioGroupField` accepte toutes les props de `SuFormField` et `SuRadioGroup` combinées, offrant une syntaxe plus concise tout en conservant toutes les fonctionnalités.

Voir la [documentation complète de SuRadioGroupField](./SuRadioGroupField.md) pour plus de détails.