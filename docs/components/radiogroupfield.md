# RadioGroupField

Composant RadioGroupField pour la sélection unique avec deux styles d'affichage : classique ou en cartes. Support complet de l'accessibilité selon les normes W3C.

## Exemples d'utilisation

### RadioGroupField de base

<div class="component-demo">
  <div class="demo-section">
    <h4>Style par défaut</h4>
    <div class="demo-inputs">
      <SuRadioGroupField 
        :options="[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
          { value: 'option4', label: 'Option 4', disabled: true }
        ]"
        label="Sélection unique"
        name="basic-radio"
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
  <SuRadioGroupField 
    :options="options"
    label="Sélection unique"
    name="basic-radio"
    v-model:value="selectedValue"
  />
</template>
```

### Style carte

<div class="component-demo">
  <div class="demo-section">
    <h4>Cartes en bloc</h4>
    <div class="demo-inputs">
      <SuRadioGroupField 
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
        label="Plan d'abonnement"
        name="plan-radio"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuRadioGroupField 
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
    label="Plan d'abonnement"
    name="plan-radio"
    v-model:value="selectedPlan"
  />
</template>
```

### Cartes en ligne

<div class="component-demo">
  <div class="demo-section">
    <h4>Cartes inline</h4>
    <div class="demo-inputs">
      <SuRadioGroupField 
        :options="[
          { value: 'small', label: 'Small', description: 'Jusqu\'à 5 utilisateurs' },
          { value: 'medium', label: 'Medium', description: 'Jusqu\'à 25 utilisateurs' },
          { value: 'large', label: 'Large', description: 'Utilisateurs illimités' }
        ]"
        displayType="inline-card"
        direction="horizontal"
        label="Taille d'équipe"
        name="team-size-radio"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuRadioGroupField 
    :options="[
      { value: 'small', label: 'Small', description: 'Jusqu\'à 5 utilisateurs' },
      { value: 'medium', label: 'Medium', description: 'Jusqu\'à 25 utilisateurs' },
      { value: 'large', label: 'Large', description: 'Utilisateurs illimités' }
    ]"
    displayType="inline-card"
    direction="horizontal"
    label="Taille d'équipe"
    name="team-size-radio"
    v-model:value="teamSize"
  />
</template>
```

### Avec icônes

<div class="component-demo">
  <div class="demo-section">
    <h4>Options avec icônes</h4>
    <div class="demo-inputs">
      <SuRadioGroupField 
        :options="[
          { value: 'user', label: 'Particulier', icon: 'UserIcon' },
          { value: 'business', label: 'Entreprise', icon: 'BuildingOfficeIcon' },
          { value: 'organization', label: 'Organisation', icon: 'GlobeAltIcon' }
        ]"
        displayType="block-card"
        label="Type de compte"
        name="account-type-radio"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { UserIcon, BuildingOfficeIcon, GlobeAltIcon } from '@heroicons/vue/24/outline'

const accountType = ref('')
const accountOptions = [
  { value: 'user', label: 'Particulier', icon: UserIcon },
  { value: 'business', label: 'Entreprise', icon: BuildingOfficeIcon },
  { value: 'organization', label: 'Organisation', icon: GlobeAltIcon }
]
</script>

<template>
  <SuRadioGroupField 
    :options="accountOptions"
    displayType="block-card"
    label="Type de compte"
    name="account-type-radio"
    v-model:value="accountType"
  />
</template>
```

### Tailles

<div class="component-demo">
  <div class="demo-section">
    <h4>Tailles disponibles</h4>
    <div class="demo-inputs">
      <SuRadioGroupField 
        :options="[
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' }
        ]"
        size="sm"
        label="Small"
        name="size-sm-radio"
      />
      <SuRadioGroupField 
        :options="[
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' }
        ]"
        size="md"
        label="Medium"
        name="size-md-radio"
      />
      <SuRadioGroupField 
        :options="[
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' }
        ]"
        size="lg"
        label="Large"
        name="size-lg-radio"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuRadioGroupField size="sm" label="Small" name="size-sm" />
  <SuRadioGroupField size="md" label="Medium" name="size-md" />
  <SuRadioGroupField size="lg" label="Large" name="size-lg" />
</template>
```

### États et validation

<div class="component-demo">
  <div class="demo-section">
    <h4>États de validation</h4>
    <div class="demo-inputs">
      <SuRadioGroupField 
        :options="[
          { value: 'valid', label: 'Option valide' },
          { value: 'invalid', label: 'Option invalide' }
        ]"
        label="État par défaut"
        name="default-state-radio"
        message="Sélectionnez une option"
      />
      <SuRadioGroupField 
        :options="[
          { value: 'valid', label: 'Option valide' },
          { value: 'invalid', label: 'Option invalide' }
        ]"
        state="error"
        label="État d'erreur"
        name="error-state-radio"
        message="Veuillez faire une sélection"
        :required="true"
      />
      <SuRadioGroupField 
        :options="[
          { value: 'valid', label: 'Option valide' },
          { value: 'invalid', label: 'Option invalide' }
        ]"
        state="success"
        label="État de succès"
        name="success-state-radio"
        message="Sélection valide !"
        value="valid"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuRadioGroupField 
    state="default"
    label="État par défaut"
    message="Sélectionnez une option"
  />
  <SuRadioGroupField 
    state="error"
    label="État d'erreur"
    message="Veuillez faire une sélection"
    :required="true"
  />
  <SuRadioGroupField 
    state="success"
    label="État de succès"
    message="Sélection valide !"
  />
</template>
```

### Direction horizontale

<div class="component-demo">
  <div class="demo-section">
    <h4>Disposition horizontale</h4>
    <div class="demo-inputs">
      <SuRadioGroupField 
        :options="[
          { value: 'yes', label: 'Oui' },
          { value: 'no', label: 'Non' },
          { value: 'maybe', label: 'Peut-être' }
        ]"
        direction="horizontal"
        label="Acceptez-vous les conditions ?"
        name="horizontal-radio"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuRadioGroupField 
    :options="options"
    direction="horizontal"
    label="Acceptez-vous les conditions ?"
    name="horizontal-radio"
    v-model:value="acceptance"
  />
</template>
```

### Scroll avec hauteur limitée

<div class="component-demo">
  <div class="demo-section">
    <h4>Liste avec scroll vertical</h4>
    <div class="demo-inputs">
      <SuRadioGroupField 
        :options="[
          { value: 'country1', label: 'France' },
          { value: 'country2', label: 'Allemagne' },
          { value: 'country3', label: 'Espagne' },
          { value: 'country4', label: 'Italie' },
          { value: 'country5', label: 'Portugal' },
          { value: 'country6', label: 'Belgique' },
          { value: 'country7', label: 'Pays-Bas' },
          { value: 'country8', label: 'Suisse' },
          { value: 'country9', label: 'Autriche' },
          { value: 'country10', label: 'Luxembourg' }
        ]"
        maxHeight="180px"
        label="Pays (avec scroll)"
        name="countries-scroll"
        message="Liste avec hauteur limitée et scroll automatique"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuRadioGroupField 
    :options="longCountriesList"
    maxHeight="180px"
    label="Pays (avec scroll)"
    name="countries-scroll"
    message="Liste avec hauteur limitée et scroll automatique"
    v-model:value="selectedCountry"
  />
</template>
```

### Avec slots personnalisés

<div class="component-demo">
  <div class="demo-section">
    <h4>Slots before et after</h4>
    <div class="demo-inputs">
      <SuRadioGroupField 
        :options="[
          { value: 'basic', label: 'Plan Basic', description: '9€/mois' },
          { value: 'pro', label: 'Plan Pro', description: '19€/mois' },
          { value: 'enterprise', label: 'Plan Enterprise', description: '49€/mois' }
        ]"
        displayType="block-card"
        label="Choisissez votre plan"
        name="plan-with-slots"
      >
        <template #before>
          <div style="padding: 0.75rem; background-color: #dbeafe; border-radius: 0.375rem; margin-bottom: 0.75rem;">
            <p style="margin: 0; font-size: 0.875rem; color: #1e40af;">
              🎯 Choisissez le plan qui correspond le mieux à vos besoins.
            </p>
          </div>
        </template>
        <template #after>
          <div style="text-align: center; margin-top: 0.75rem;">
            <a href="#" style="font-size: 0.875rem; color: #3b82f6; text-decoration: underline;">
              Comparer tous les plans en détail →
            </a>
          </div>
        </template>
      </SuRadioGroupField>
    </div>
  </div>
</div>

```vue
<template>
  <SuRadioGroupField 
    :options="planOptions"
    displayType="block-card"
    label="Choisissez votre plan"
    name="subscription-plan"
    v-model:value="selectedPlan"
  >
    <template #before>
      <div class="plan-info">
        🎯 Choisissez le plan qui correspond le mieux à vos besoins.
      </div>
    </template>
    <template #after>
      <div class="plan-comparison">
        <a href="/plans/compare">Comparer tous les plans en détail →</a>
      </div>
    </template>
  </SuRadioGroupField>
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `RadioOption[]` | `[]` | Liste des options radio |
| `v-model` | `string \| number` | `undefined` | Valeur sélectionnée |
| `name` | `string` | `undefined` | Nom du groupe radio (généré automatiquement si non fourni) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille des éléments |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | État visuel |
| `disabled` | `boolean` | `false` | Désactive tout le groupe |
| `required` | `boolean` | `false` | Champ requis |
| `displayType` | `'default' \| 'inline-card' \| 'block-card'` | `'default'` | Type d'affichage |
| `direction` | `'horizontal' \| 'vertical'` | `'vertical'` | Direction du groupe |
| `maxHeight` | `string` | `null` | Hauteur maximale avec scroll automatique |
| `label` | `string` | `undefined` | Label du groupe |
| `message` | `string` | `undefined` | Message affiché (style déterminé par le state) |
| `fieldId` | `string` | - | Id du contrôle, relié au label (sinon généré) |
| `requiredText` | `string` | - | Texte de l’astérisque « requis » pour les lecteurs d’écran (sinon traduit) |

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
| `@update:value` | `(value: string \| number) => void` | Émis lors du changement de valeur |
| `@change` | `(value: string \| number) => void` | Émis lors du changement |
| `@focus` | `(event: FocusEvent) => void` | Émis lors du focus |
| `@blur` | `(event: FocusEvent) => void` | Émis lors de la perte de focus |

## Accessibilité

Le composant RadioGroup respecte les normes WCAG 2.1 AA :

### ✅ Fonctionnalités d'accessibilité

- **Fieldset et Legend** : Structure sémantique correcte avec `<fieldset>` et `<legend>`
- **Attributs ARIA** : `role="radiogroup"`, `aria-required`, `aria-invalid`
- **Navigation au clavier** : Support des touches fléchées, Tab, Espace
- **Labels associés** : Chaque radio a un label correctement associé
- **Messages d'état** : Messages avec `aria-live` pour les lecteurs d'écran
- **Focus visible** : Indicateurs de focus clairs et contrastés
- **Contraste des couleurs** : Ratios conformes WCAG AA
- **Groupement logique** : Options regroupées sémantiquement

### 🎯 Bonnes pratiques

```vue
<!-- RadioGroup avec validation -->
<SuRadioGroupField 
  :options="options"
  :required="true"
  label="Méthode de paiement"
  name="payment-method"
  :state="hasError ? 'error' : 'default'"
  :message="hasError ? 'Veuillez sélectionner une méthode de paiement' : undefined"
  v-model:value="paymentMethod"
/>

<!-- RadioGroup avec cartes et descriptions -->
<SuRadioGroupField 
  :options="planOptions"
  displayType="block-card"
  label="Plan d'abonnement"
  name="subscription-plan"
  message="Choisissez le plan qui correspond à vos besoins"
  v-model:value="selectedPlan"
/>
```

## Navigation au clavier

| Touche | Action |
|--------|--------|
| `Tab` | Naviguer vers/depuis le groupe |
| `Flèches` | Naviguer entre les options du groupe |
| `Espace` | Sélectionner l'option focalisée |

## Exemples d'usage avancés

### Formulaire de configuration

```vue
<script setup>
import { ref } from 'vue'
import { CogIcon, UserIcon, ShieldCheckIcon } from '@heroicons/vue/24/outline'

const theme = ref('light')
const privacy = ref('public')
const notifications = ref('all')

const themeOptions = [
  { value: 'light', label: 'Clair', description: 'Interface claire' },
  { value: 'dark', label: 'Sombre', description: 'Interface sombre' },
  { value: 'auto', label: 'Automatique', description: 'Suit les préférences système' }
]

const privacyOptions = [
  { value: 'public', label: 'Public', icon: UserIcon },
  { value: 'private', label: 'Privé', icon: ShieldCheckIcon }
]
</script>

<template>
  <form class="space-y-6">
    <SuRadioGroupField 
      :options="themeOptions"
      displayType="block-card"
      label="Thème"
      name="theme"
      v-model:value="theme"
    />
    
    <SuRadioGroupField 
      :options="privacyOptions"
      displayType="inline-card"
      direction="horizontal"
      label="Confidentialité"
      name="privacy"
      v-model:value="privacy"
    />
  </form>
</template>
```