# InputField

Composant InputField flexible avec support complet des types HTML, préfixes/suffixes, alignement de texte, direction RTL/LTR et accessibilité selon les normes W3C.

## Exemples d'utilisation

### Types d'input

<div class="component-demo">
  <div class="demo-section">
    <h4>Types d'input supportés</h4>
    <div class="demo-inputs">
      <SuInputField type="text" label="Texte" placeholder="Entrez du texte" />
      <SuInputField type="email" label="Email" placeholder="nom@exemple.com" />
      <SuInputField type="password" label="Mot de passe" placeholder="••••••••" />
      <SuInputField type="number" label="Nombre" placeholder="123" />
      <SuInputField type="tel" label="Téléphone" placeholder="+33 1 23 45 67 89" />
      <SuInputField type="url" label="URL" placeholder="https://exemple.com" />
      <SuInputField type="search" label="Recherche" placeholder="Rechercher..." />
      <SuInputField type="date" label="Date" />
    </div>
  </div>
</div>

```vue
<template>
  <SuInputField type="text" label="Texte" placeholder="Entrez du texte" />
  <SuInputField type="email" label="Email" placeholder="nom@exemple.com" />
  <SuInputField type="password" label="Mot de passe" placeholder="••••••••" />
  <SuInputField type="number" label="Nombre" placeholder="123" />
  <SuInputField type="tel" label="Téléphone" placeholder="+33 1 23 45 67 89" />
  <SuInputField type="url" label="URL" placeholder="https://exemple.com" />
  <SuInputField type="search" label="Recherche" placeholder="Rechercher..." />
  <SuInputField type="date" label="Date" />
</template>
```

### Préfixes et suffixes

<div class="component-demo">
  <div class="demo-section">
    <h4>Préfixes et suffixes texte</h4>
    <div class="demo-inputs">
      <SuInputField label="Prix" placeholder="0.00" suffix="€" type="number" />
      <SuInputField label="Email" placeholder="nom" suffix="@entreprise.com" />
      <SuInputField label="Site web" placeholder="monsite" prefix="https://" suffix=".com" />
      <SuInputField label="Téléphone" placeholder="123456789" prefix="+33" />
    </div>
  </div>
</div>

```vue
<template>
  <SuInputField label="Prix" placeholder="0.00" suffix="€" type="number" />
  <SuInputField label="Email" placeholder="nom" suffix="@entreprise.com" />
  <SuInputField label="Site web" placeholder="monsite" prefix="https://" suffix=".com" />
  <SuInputField label="Téléphone" placeholder="123456789" prefix="+33" />
</template>
```

### Préfixes et suffixes avec icônes

<div class="component-demo">
  <div class="demo-section">
    <h4>Préfixes et suffixes avec icônes</h4>
    <div class="demo-inputs">
      <SuInputField label="Recherche" placeholder="Rechercher..." :prefixIcon="MagnifyingGlassIcon" />
      <SuInputField label="Email" placeholder="votre@email.com" :prefixIcon="AtSymbolIcon" />
      <SuInputField label="Mot de passe" placeholder="••••••••" type="password" :prefixIcon="LockClosedIcon" />
      <SuInputField label="Utilisateur" placeholder="Nom d'utilisateur" :prefixIcon="UserIcon" />
    </div>
  </div>
</div>

```vue
<script setup>
import { 
  MagnifyingGlassIcon, 
  AtSymbolIcon, 
  LockClosedIcon, 
  UserIcon 
} from '@heroicons/vue/24/outline'
</script>

<template>
  <SuInputField label="Recherche" placeholder="Rechercher..." :prefixIcon="MagnifyingGlassIcon" />
  <SuInputField label="Email" placeholder="votre@email.com" :prefixIcon="AtSymbolIcon" />
  <SuInputField label="Mot de passe" placeholder="••••••••" type="password" :prefixIcon="LockClosedIcon" />
  <SuInputField label="Utilisateur" placeholder="Nom d'utilisateur" :prefixIcon="UserIcon" />
</template>
```

### Tailles

<div class="component-demo">
  <div class="demo-section">
    <h4>Tailles disponibles</h4>
    <div class="demo-inputs">
      <SuInputField size="sm" label="Small" placeholder="Petit input" />
      <SuInputField size="md" label="Medium" placeholder="Input moyen" />
      <SuInputField size="lg" label="Large" placeholder="Grand input" />
    </div>
  </div>
</div>

```vue
<template>
  <SuInputField size="sm" label="Small" placeholder="Petit input" />
  <SuInputField size="md" label="Medium" placeholder="Input moyen" />
  <SuInputField size="lg" label="Large" placeholder="Grand input" />
</template>
```

### États et validation

<div class="component-demo">
  <div class="demo-section">
    <h4>États de validation</h4>
    <div class="demo-inputs">
      <SuInputField 
        label="État par défaut" 
        placeholder="Entrez du texte"
        message="Texte d'aide pour guider l'utilisateur"
      />
      <SuInputField 
        state="error"
        label="État d'erreur" 
        placeholder="Entrez du texte"
        message="Ce champ contient une erreur"
        value="valeur incorrecte"
      />
      <SuInputField 
        state="success"
        label="État de succès" 
        placeholder="Entrez du texte"
        message="Valeur valide !"
        value="valeur correcte"
      />
      <SuInputField 
        state="warning"
        label="État d'avertissement" 
        placeholder="Entrez du texte"
        message="Attention à cette valeur"
        value="attention"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuInputField 
    label="État par défaut" 
    placeholder="Entrez du texte"
    message="Texte d'aide pour guider l'utilisateur"
  />
  <SuInputField 
    state="error"
    label="État d'erreur" 
    placeholder="Entrez du texte"
    message="Ce champ contient une erreur"
  />
  <SuInputField 
    state="success"
    label="État de succès" 
    placeholder="Entrez du texte"
    message="Valeur valide !"
  />
  <SuInputField 
    state="warning"
    label="État d'avertissement" 
    placeholder="Entrez du texte"
    message="Attention à cette valeur"
  />
</template>
```

### Alignement du texte

<div class="component-demo">
  <div class="demo-section">
    <h4>Alignement du texte</h4>
    <div class="demo-inputs">
      <SuInputField label="Alignement à gauche" textAlign="left" value="Aligné à gauche" />
      <SuInputField label="Alignement centré" textAlign="center" value="Centré" />
      <SuInputField label="Alignement à droite" textAlign="right" value="Aligné à droite" />
    </div>
  </div>
</div>

```vue
<template>
  <SuInputField label="Alignement à gauche" textAlign="left" value="Aligné à gauche" />
  <SuInputField label="Alignement centré" textAlign="center" value="Centré" />
  <SuInputField label="Alignement à droite" textAlign="right" value="Aligné à droite" />
</template>
```

### Support RTL (droite à gauche)

<div class="component-demo">
  <div class="demo-section">
    <h4>Support des langues RTL</h4>
    <div class="demo-inputs" dir="rtl">
      <SuInputField 
        label="Texte arabe (RTL)"
        placeholder="أدخل النص هنا"
        value="النص العربي"
      />
      <SuInputField 
        label="Texte hébreu (RTL)"
        placeholder="הכנס טקסט כאן"
        value="טקסט עברי"
      />
      <SuInputField 
        label="Prix (RTL avec suffixe)"
        placeholder="0.00"
        suffix="$"
        type="number"
      />
    </div>
  </div>
</div>

```vue
<template>
  <div dir="rtl">
    <SuInputField 
      label="Texte arabe (RTL)"
      placeholder="أدخل النص هنا"
      value="النص العربي"
    />
    <SuInputField 
      label="Texte hébreu (RTL)"
      placeholder="הכנס טקסט כאן"
      value="טקסט עברי"
    />
    <SuInputField 
      label="Prix (RTL avec suffixe)"
      placeholder="0.00"
      suffix="$"
      type="number"
    />
  </div>
</template>
```

### États disabled et readonly

<div class="component-demo">
  <div class="demo-section">
    <h4>États spéciaux</h4>
    <div class="demo-inputs">
      <SuInputField 
        label="Input désactivé"
        :disabled="true"
        value="Valeur désactivée"
      />
      <SuInputField 
        label="Input en lecture seule"
        :readonly="true"
        helpText="Cette valeur ne peut pas être modifiée"
        value="Valeur en lecture seule"
      />
      <SuInputField 
        label="Champ requis"
        :required="true"
        placeholder="Ce champ est obligatoire"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuInputField 
    label="Input désactivé"
    :disabled="true"
    value="Valeur désactivée"
  />
  <SuInputField 
    label="Input en lecture seule"
    :readonly="true"
    helpText="Cette valeur ne peut pas être modifiée"
    value="Valeur en lecture seule"
  />
  <SuInputField 
    label="Champ requis"
    :required="true"
    placeholder="Ce champ est obligatoire"
  />
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `InputType` | `'text'` | Type d'input HTML |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille de l'input |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | État visuel de l'input |
| `disabled` | `boolean` | `false` | Désactive l'input |
| `readonly` | `boolean` | `false` | Input en lecture seule |
| `required` | `boolean` | `false` | Champ requis |
| `placeholder` | `string` | `undefined` | Texte de placeholder |
| `value` | `string \| number` | `undefined` | Valeur de l'input |
| `prefix` | `string` | `undefined` | Préfixe texte |
| `suffix` | `string` | `undefined` | Suffixe texte |
| `prefixIcon` | `Component` | `undefined` | Icône de préfixe |
| `suffixIcon` | `Component` | `undefined` | Icône de suffixe |
| `textAlign` | `'left' \| 'center' \| 'right'` | `'left'` | Alignement du texte |
| `label` | `string` | `undefined` | Label de l'input |
| `message` | `string` | `undefined` | Message additionnel |

### Attributs d'accessibilité

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ariaLabel` | `string` | `undefined` | Label accessible |
| `ariaDescribedBy` | `string` | `undefined` | ID de l'élément de description |
| `ariaInvalid` | `boolean` | `undefined` | Indique si la valeur est invalide |
| `ariaRequired` | `boolean` | `undefined` | Indique si le champ est requis |

### Attributs de validation HTML

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autocomplete` | `string` | `undefined` | Attribut autocomplete HTML |
| `min` | `number \| string` | `undefined` | Valeur minimale |
| `max` | `number \| string` | `undefined` | Valeur maximale |
| `step` | `number \| string` | `undefined` | Pas pour les nombres |
| `minLength` | `number` | `undefined` | Longueur minimale |
| `maxLength` | `number` | `undefined` | Longueur maximale |
| `pattern` | `string` | `undefined` | Expression régulière de validation |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `@update:modelValue` | `(value: string \| number) => void` | Émis lors du changement de valeur (v-model) |
| `@input` | `(event: Event) => void` | Émis lors de la saisie |
| `@change` | `(event: Event) => void` | Émis lors du changement |
| `@focus` | `(event: FocusEvent) => void` | Émis lors du focus |
| `@blur` | `(event: FocusEvent) => void` | Émis lors de la perte de focus |
| `@keydown` | `(event: KeyboardEvent) => void` | Émis lors de l'appui sur une touche |
| `@keyup` | `(event: KeyboardEvent) => void` | Émis lors du relâchement d'une touche |

### Méthodes exposées

| Méthode | Type | Description |
|---------|------|-------------|
| `focus()` | `() => void` | Donne le focus à l'input |
| `select()` | `() => void` | Sélectionne le texte de l'input |
| `inputRef` | `Ref<HTMLInputElement>` | Référence à l'élément input |

## Accessibilité

Le composant Input respecte les normes WCAG 2.1 AA et les bonnes pratiques W3C :

### ✅ Fonctionnalités d'accessibilité

- **Labels associés** : Chaque input a un label correctement associé via `for`/`id`
- **Attributs ARIA** : Support complet des attributs ARIA (`aria-label`, `aria-describedby`, `aria-invalid`, etc.)
- **Messages d'état** : Messages d'erreur/succès/avertissement avec `aria-live`
- **Contraste des couleurs** : Ratios de contraste conformes WCAG AA (4.5:1 minimum)
- **Focus visible** : Indicateur de focus clair et contrasté
- **Tailles minimales** : Respecte les tailles minimales de cible tactile
- **Support RTL** : Gestion complète des langues de droite à gauche
- **Mode sombre** : Contraste adapté en mode sombre
- **Contraste élevé** : Support de `prefers-contrast: high`
- **Réduction d'animation** : Respect de `prefers-reduced-motion`

### 🎯 Bonnes pratiques

```vue
<!-- Input avec validation et accessibilité -->
<SuInputField 
  type="email"
  label="Adresse email"
  :required="true"
  placeholder="nom@exemple.com"
  message="Utilisé pour la connexion et les notifications"
  autocomplete="email"
  v-model="email"
/>

<!-- Input avec gestion d'erreur -->
<SuInputField 
  type="password"
  label="Mot de passe"
  :required="true"
  :state="hasError ? 'error' : 'default'"
  :message="hasError ? 'Le mot de passe doit contenir au moins 8 caractères' : undefined"
  :minLength="8"
  autocomplete="new-password"
  v-model="password"
/>

<!-- Input avec préfixe et validation numérique -->
<SuInputField 
  type="number"
  label="Âge"
  :required="true"
  :min="0"
  :max="120"
  message="Votre âge en années"
  v-model="age"
/>
```

## Types supportés

Le composant Input supporte tous les types d'input HTML5 :

- `text` - Texte libre
- `email` - Adresse email avec validation
- `password` - Mot de passe masqué
- `number` - Nombre avec contrôles
- `tel` - Numéro de téléphone
- `url` - URL avec validation
- `search` - Champ de recherche
- `date` - Sélecteur de date
- `time` - Sélecteur d'heure
- `datetime-local` - Date et heure locales
- `month` - Sélecteur de mois
- `week` - Sélecteur de semaine

## Exemples d'usage avancés

### Formulaire de connexion

```vue
<script setup>
import { ref } from 'vue'
import { AtSymbolIcon, LockClosedIcon } from '@heroicons/vue/24/outline'

const email = ref('')
const password = ref('')
const errors = ref({})

const validateForm = () => {
  errors.value = {}
  if (!email.value) errors.value.email = 'Email requis'
  if (!password.value) errors.value.password = 'Mot de passe requis'
  if (password.value && password.value.length < 8) {
    errors.value.password = 'Le mot de passe doit contenir au moins 8 caractères'
  }
}
</script>

<template>
  <form @submit.prevent="validateForm">
    <SuInputField 
      type="email"
      label="Email"
      :required="true"
      :prefixIcon="AtSymbolIcon"
      placeholder="nom@exemple.com"
      :state="errors.email ? 'error' : 'default'"
      :message="errors.email"
      autocomplete="email"
      v-model:value="email"
    />
    
    <SuInputField 
      type="password"
      label="Mot de passe"
      :required="true"
      :prefixIcon="LockClosedIcon"
      placeholder="••••••••"
      :state="errors.password ? 'error' : 'default'"
      :message="errors.password"
      :minLength="8"
      autocomplete="current-password"
      v-model="password"
    />
  </form>
</template>
```

### Champ de prix avec formatage

```vue
<script setup>
import { ref, computed } from 'vue'

const price = ref('')

const formattedPrice = computed({
  get: () => price.value,
  set: (value) => {
    // Formatage automatique du prix
    const numericValue = value.replace(/[^\d.,]/g, '')
    price.value = numericValue
  }
})
</script>

<template>
  <SuInputField 
    type="number"
    label="Prix"
    suffix="€"
    placeholder="0.00"
    :step="0.01"
    :min="0"
    textAlign="right"
    helpText="Prix en euros, TVA incluse"
    v-model="formattedPrice"
  />
</template>
```