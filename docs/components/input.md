# Input

Composant input flexible avec support complet des types HTML, préfixes/suffixes, alignement de texte, direction RTL/LTR et accessibilité selon les normes W3C.

## Description

`SuInput` est un composant de champ de saisie enrichi qui étend les capacités de l'élément HTML `<input>` natif. Il offre un support avancé pour les préfixes/suffixes textuels et iconographiques, l'alignement du texte, et la gestion complète de l'accessibilité.

## Exemples d'utilisation

### Usage basique

<div class="component-demo">
  <div class="demo-section">
    <h4>champs de texte simple</h4>
    <div class="demo-inputs">
      <SuInput type="text" name="input-name" placeholder="Entrez du texte" />
    </div>
  </div>
</div>

```vue
<template>
  <SuInput type="text" name="input-name" placeholder="Entrez du texte" />
</template>
```

### Avec FormField

<div class="component-demo">
  <div class="demo-section">
    <h4>Types d'input supportés</h4>
    <div class="demo-inputs">
      <SuFormField label="Nom d'utilisateur" field-id="inputId">
        <template #default="slotProps">
          <SuInput :id="slotProps.fieldId" placeholder="Entrez votre nom" />
        </template>
      </SuFormField>
    </div>
  </div>
</div>

```vue
<template>
  <SuFormField label="Nom d'utilisateur" field-id="inputId">
    <SuInput id="inputId" placeholder="Entrez votre nom" />
  </SuFormField>
  <!-- or -->
  <SuFormField label="Nom d'utilisateur" field-id="inputId">
    <template #default="{ fieldId }">
      <SuInput :id="fieldId" placeholder="Entrez votre nom" />
    </template>
  </SuFormField>
</template>
```
En savoir plus sur l’utilisation de [SuFormField](/components/formfield).


### Types d'input

<div class="component-demo">
  <div class="demo-section">
    <h4>Types d'input supportés</h4>
    <div class="demo-inputs">
      <SuFormField label="Texte" >
        <SuInput type="text" placeholder="Entrez du texte" />
      </SuFormField>
      <SuFormField label="email" >
        <SuInput type="email" placeholder="nom@exemple.com" />
      </SuFormField>
      <SuFormField label="password" >
        <SuInput type="password" placeholder="••••••••" />
      </SuFormField>
      <SuFormField label="number" >
        <SuInput type="number" placeholder="123" />
      </SuFormField>
      <SuFormField label="Tél" >
        <SuInput type="tel" placeholder="+33 1 23 45 67 89" />
      </SuFormField>
      <SuFormField label="Url" >
        <SuInput type="url" placeholder="https://exemple.com" />
      </SuFormField>
      <SuFormField label="Recherche" >
        <SuInput type="search" placeholder="Rechercher..." />
      </SuFormField>
      <SuFormField label="Date" >
        <SuInput type="date" />
      </SuFormField>
    </div>
  </div>
</div>

```vue
<template>
  <SuFormField label="Texte" >
    <SuInput type="text" placeholder="Entrez du texte" />
  </SuFormField>
  <SuFormField label="email" >
    <SuInput type="email" placeholder="nom@exemple.com" />
  </SuFormField>
  <SuFormField label="password" >
    <SuInput type="password" placeholder="••••••••" />
  </SuFormField>
  <SuFormField label="number" >
    <SuInput type="number" placeholder="123" />
  </SuFormField>
  <SuFormField label="Tél" >
    <SuInput type="tel" placeholder="+33 1 23 45 67 89" />
  </SuFormField>
  <SuFormField label="Url" >
    <SuInput type="url" placeholder="https://exemple.com" />
  </SuFormField>
  <SuFormField label="Recherche" >
    <SuInput type="search" placeholder="Rechercher..." />
  </SuFormField>
  <SuFormField label="Date" >
    <SuInput type="date" />
  </SuFormField>
</template>
```

### Préfixes et suffixes

<div class="component-demo">
  <div class="demo-section">
    <h4>Préfixes et suffixes texte</h4>
    <div class="demo-inputs">
      <SuFormField label="Prix" >
        <SuInput placeholder="0.00" suffix="€" text-align="right" type="number" />
      </SuFormField>
      <SuFormField label="Email" >
        <SuInput placeholder="nom" suffix="@entreprise.com" />
      </SuFormField>
      <SuFormField label="Site web" >
        <SuInput placeholder="monsite" prefix="https://" suffix=".com" />
      </SuFormField>
      <SuFormField label="Téléphone" >
        <SuInput placeholder="123456789" prefix="+33" />
      </SuFormField>
    </div>
  </div>
</div>

```vue
<template>
  <SuFormField label="Prix" >
    <SuInput placeholder="0.00" suffix="€" text-align="right" type="number" />
  </SuFormField>
  <SuFormField label="Email" >
    <SuInput placeholder="nom" suffix="@entreprise.com" />
  </SuFormField>
  <SuFormField label="Site web" >
    <SuInput placeholder="monsite" prefix="https://" suffix=".com" />
  </SuFormField>
  <SuFormField label="Téléphone" >
    <SuInput placeholder="123456789" prefix="+33" />
  </SuFormField>
</template>
```

### Préfixes et suffixes avec icônes

<div class="component-demo">
  <div class="demo-section">
    <h4>Préfixes et suffixes avec icônes</h4>
    <div class="demo-inputs">
      <SuFormField label="Recherche" >
        <SuInput placeholder="Rechercher..." :prefixIcon="MagnifyingGlassIcon" />
      </SuFormField>
      <SuFormField label="Email" >
        <SuInput placeholder="votre@email.com" :prefixIcon="AtSymbolIcon" />
      </SuFormField>
      <SuFormField label="Mot de passe" >
        <SuInput placeholder="••••••••" type="password" :prefixIcon="LockClosedIcon" />
      </SuFormField>
      <SuFormField label="Utilisateur" >
        <SuInput placeholder="Nom d'utilisateur" :prefixIcon="UserIcon" />
      </SuFormField>
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
  <SuFormField label="Recherche" >
    <SuInput placeholder="Rechercher..." :prefixIcon="MagnifyingGlassIcon" />
  </SuFormField>
  <SuFormField label="Email" >
    <SuInput placeholder="votre@email.com" :prefixIcon="AtSymbolIcon" />
  </SuFormField>
  <SuFormField label="Mot de passe" >
    <SuInput placeholder="••••••••" type="password" :prefixIcon="LockClosedIcon" />
  </SuFormField>
  <SuFormField label="Utilisateur" >
    <SuInput placeholder="Nom d'utilisateur" :prefixIcon="UserIcon" />
  </SuFormField>
</template>
```

### Tailles

<div class="component-demo">
  <div class="demo-section">
    <h4>Tailles disponibles</h4>
    <div class="demo-inputs">
      <SuFormField label="Small" >
        <SuInput size="sm" placeholder="Petit input" />
      </SuFormField>
      <SuFormField label="Medium" >
        <SuInput size="md" placeholder="Input moyen" />
      </SuFormField>
      <SuFormField label="Large" >
        <SuInput size="lg" placeholder="Grand input" />
      </SuFormField>
    </div>
  </div>
</div>

```vue
<template>
  <SuFormField label="Small" >
    <SuInput size="sm" placeholder="Petit input" />
  </SuFormField>
  <SuFormField label="Medium" >
    <SuInput size="md" placeholder="Input moyen" />
  </SuFormField>
  <SuFormField label="Large" >
    <SuInput size="lg" placeholder="Grand input" />
  </SuFormField>
</template>
```

### États de validation

<div class="component-demo">
  <div class="demo-section">
    <h4>États de validation</h4>
    <div class="demo-inputs">
      <SuFormField 
        label="État par défaut" 
        message="Texte d'aide pour guider l'utilisateur"
      >
        <SuInput placeholder="Entrez du texte" />
      </SuFormField>
      <SuFormField 
        state="error"
        label="État d'erreur" 
        message="Ce champ contient une erreur"
      >
        <SuInput value="valeur incorrecte" />
      </SuFormField>
      <SuFormField 
        state="success"
        label="État de succès" 
        message="Valeur valide !"
      >
        <SuInput value="valeur correcte" />
      </SuFormField>
      <SuFormField 
        state="warning"
        label="État d'avertissement" 
        message="Attention à cette valeur"
      >
        <SuInput value="attention" />
      </SuFormField>
    </div>
  </div>
</div>

```vue
<template>
  <SuFormField 
    label="État par défaut" 
    message="Texte d'aide pour guider l'utilisateur"
  >
    <SuInput placeholder="Entrez du texte" />
  </SuFormField>
  
  <SuFormField 
    state="error"
    label="État d'erreur" 
    message="Ce champ contient une erreur"
  >
    <SuInput value="valeur incorrecte" />
  </SuFormField>
  
  <SuFormField 
    state="success"
    label="État de succès" 
    message="Valeur valide !"
  >
    <SuInput value="valeur correcte" />
  </SuFormField>
  
  <SuFormField 
    state="warning"
    label="État d'avertissement" 
    message="Attention à cette valeur"
  >
    <SuInput value="attention" />
  </SuFormField>
</template>
```

### Alignement du texte

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-inputs">
      <SuFormField label="Alignement à gauche" >
        <SuInput textAlign="left" value="Aligné à gauche" />
      </SuFormField>
      <SuFormField label="Alignement centré" >
        <SuInput textAlign="center" value="Centré" />
      </SuFormField>
      <SuFormField label="Alignement à droite" >
        <SuInput textAlign="right" value="Aligné à droite" />
      </SuFormField>
    </div>
  </div>
</div>

```vue
<template>
  <SuFormField label="Alignement à gauche" >
    <SuInput textAlign="left" value="Aligné à gauche" />
  </SuFormField>
  <SuFormField label="Alignement centré" >
    <SuInput textAlign="center" value="Centré" />
  </SuFormField>
  <SuFormField label="Alignement à droite" >
    <SuInput textAlign="right" value="Aligné à droite" />
  </SuFormField>
</template>
```

### Support RTL (droite à gauche)

<div class="component-demo">
  <div class="demo-section">
    <h4>Support des langues RTL</h4>
    <div class="demo-inputs" dir="rtl">
      <SuFormField label="Texte arabe (RTL)" >
        <SuInput 
          placeholder="أدخل النص هنا"
          value="النص العربي"
        />
      </SuFormField>
      <SuFormField label="Texte hébreu (RTL)">
        <SuInput 
          placeholder="הכנס טקסט כאן"
          value="טקסט עברי"
        />
      </SuFormField>
      <SuFormField label="Prix (RTL avec suffixe)" >
        <SuInput 
          placeholder="0.00"
          suffix="€"
          type="number"
        />
      </SuFormField>
    </div>
  </div>
</div>

```vue
<template>
  <div dir="rtl">
    <SuFormField label="Texte arabe (RTL)" >
      <SuInput 
        placeholder="أدخل النص هنا"
        value="النص العربي"
      />
    </SuFormField>
    <SuFormField label="Texte hébreu (RTL)">
      <SuInput 
        placeholder="הכנס טקסט כאן"
        value="טקסט עברי"
      />
    </SuFormField>
    <SuFormField label="Prix (RTL avec suffixe)" >
      <SuInput 
        placeholder="0.00"
        suffix="$"
        type="number"
      />
    </SuFormField>
  </div>
</template>
```

### États disabled et readonly

<div class="component-demo">
  <div class="demo-section">
    <h4>États spéciaux</h4>
    <div class="demo-inputs">
      <SuFormField label="Input désactivé" :disabled="true">
        <SuInput 
          :disabled="true"
          value="Valeur désactivée"
        />
      </SuFormField>
      <SuFormField label="Input en lecture seule">
        <SuInput 
          :readonly="true"
          value="Valeur en lecture seule"
        />
      </SuFormField>
      <SuFormField label="Champ requis" :required="true">
        <SuInput 
          :required="true"
          placeholder="Ce champ est obligatoire"
        />
      </SuFormField>
    </div>
  </div>
</div>

```vue
<template>
  <SuFormField label="Input désactivé" :disabled="true">
    <SuInput 
      :disabled="true"
      value="Valeur désactivée"
    />
  </SuFormField>
  <SuFormField label="Input en lecture seule">
    <SuInput 
      :readonly="true"
      value="Valeur en lecture seule"
    />
  </SuFormField>
  <SuFormField label="Champ requis" :required="true">
    <SuInput 
      :required="true"
      placeholder="Ce champ est obligatoire"
    />
  </SuFormField>
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
| `modelValue` | `string \| number` | `undefined` | Valeur v-model |
| `prefix` | `string` | `undefined` | Préfixe texte |
| `suffix` | `string` | `undefined` | Suffixe texte |
| `prefixIcon` | `Component` | `undefined` | Icône de préfixe (composant Heroicons) |
| `suffixIcon` | `Component` | `undefined` | Icône de suffixe (composant Heroicons) |
| `textAlign` | `'left' \| 'center' \| 'right'` | `'left'` | Alignement du texte |

### Attributs d'accessibilité

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ariaLabel` | `string` | `undefined` | Label accessible pour lecteurs d'écran |
| `ariaDescribedBy` | `string` | `undefined` | ID de l'élément de description |
| `ariaInvalid` | `boolean` | `undefined` | Indique si la valeur est invalide |
| `ariaRequired` | `boolean` | `undefined` | Indique si le champ est requis |

### Attributs de validation HTML

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autocomplete` | `string` | `undefined` | Attribut autocomplete HTML |
| `min` | `number \| string` | `undefined` | Valeur minimale (type number, date, etc.) |
| `max` | `number \| string` | `undefined` | Valeur maximale (type number, date, etc.) |
| `step` | `number \| string` | `undefined` | Pas pour les nombres |
| `minLength` | `number` | `undefined` | Longueur minimale du texte |
| `maxLength` | `number` | `undefined` | Longueur maximale du texte |
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
| `blur()` | `() => void` | Retire le focus de l'input |
| `inputRef` | `Ref<HTMLInputElement>` | Référence à l'élément input natif |

## Accessibilité

Le composant Input respecte les normes WCAG 2.1 AA et les bonnes pratiques W3C :

### ✅ Fonctionnalités d'accessibilité

- **Attributs ARIA** : Support complet des attributs ARIA (`aria-label`, `aria-describedby`, `aria-invalid`, etc.)
- **Contraste des couleurs** : Ratios de contraste conformes WCAG AA (4.5:1 minimum)
- **Focus visible** : Indicateur de focus clair et contrasté avec outline
- **Tailles minimales** : Respecte les tailles minimales de cible tactile (44x44px minimum)
- **Support RTL** : Gestion automatique des langues de droite à gauche
- **Mode sombre** : Contraste adapté en mode sombre
- **Contraste élevé** : Support de `prefers-contrast: high`
- **Réduction d'animation** : Respect de `prefers-reduced-motion`
- **États clairs** : États visuels distincts pour erreur, succès, avertissement

### 🎯 Bonnes pratiques

```vue
<!-- Input avec validation et accessibilité -->
<SuInput 
  type="email"
  placeholder="nom@exemple.com"
  :required="true"
  autocomplete="email"
  ariaLabel="Adresse email"
  ariaDescribedBy="email-help"
  v-model="email"
/>

<!-- Input avec gestion d'erreur -->
<SuInput 
  type="password"
  placeholder="••••••••"
  :required="true"
  :state="hasError ? 'error' : 'default'"
  :ariaInvalid="hasError"
  :minLength="8"
  autocomplete="new-password"
  v-model="password"
/>

<!-- Input avec préfixe et validation numérique -->
<SuInput 
  type="number"
  :required="true"
  :min="0"
  :max="120"
  placeholder="Âge"
  ariaLabel="Votre âge en années"
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
- `color` - Sélecteur de couleur
- `file` - Sélection de fichier

## Exemples d'usage avancés

### Input de recherche avec icône

```vue
<script setup>
import { ref } from 'vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

const searchQuery = ref('')

const handleSearch = () => {
  console.log('Recherche:', searchQuery.value)
}
</script>

<template>
  <SuInput 
    type="search"
    placeholder="Rechercher..."
    :prefixIcon="MagnifyingGlassIcon"
    v-model="searchQuery"
    @keyup.enter="handleSearch"
  />
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
    const numericValue = value.replace(/[^\d.,]/g, '')
    price.value = numericValue
  }
})
</script>

<template>
  <SuInput 
    type="number"
    suffix="€"
    placeholder="0.00"
    :step="0.01"
    :min="0"
    textAlign="right"
    v-model="formattedPrice"
  />
</template>
```

### Input avec validation en temps réel

```vue
<script setup>
import { ref, computed } from 'vue'
import { AtSymbolIcon } from '@heroicons/vue/24/outline'

const email = ref('')

const emailState = computed(() => {
  if (!email.value) return 'default'
  const isValid = /\S+@\S+\.\S+/.test(email.value)
  return isValid ? 'success' : 'error'
})
</script>

<template>
  <SuInput 
    type="email"
    :prefixIcon="AtSymbolIcon"
    placeholder="nom@exemple.com"
    :state="emailState"
    autocomplete="email"
    v-model="email"
  />
</template>
```

### Input de téléphone international

```vue
<script setup>
import { ref } from 'vue'

const phoneNumber = ref('')
const countryCode = ref('+33')
</script>

<template>
  <SuInput 
    type="tel"
    :prefix="countryCode"
    placeholder="6 12 34 56 78"
    autocomplete="tel"
    v-model="phoneNumber"
  />
</template>
```

### Input avec actions de suffixe

```vue
<script setup>
import { ref } from 'vue'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

const password = ref('')
const showPassword = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="relative">
    <SuInput 
      :type="showPassword ? 'text' : 'password'"
      placeholder="••••••••"
      autocomplete="current-password"
      v-model="password"
    />
    <button 
      type="button"
      class="absolute right-3 top-1/2 -translate-y-1/2"
      @click="togglePasswordVisibility"
      aria-label="Afficher/masquer le mot de passe"
    >
      <component :is="showPassword ? EyeSlashIcon : EyeIcon" class="w-5 h-5" />
    </button>
  </div>
</template>
```

## Utilisation avec SuFormField

Pour une expérience complète avec label, message et validation, utilisez `SuInput` avec `SuFormField` :

```vue
<template>
  <SuFormField 
    label="Email"
    :required="true"
    :state="emailError ? 'error' : 'default'"
    :message="emailError || 'Utilisé pour la connexion'"
  >
    <SuInput 
      type="email"
      placeholder="nom@exemple.com"
      :prefixIcon="AtSymbolIcon"
      autocomplete="email"
      v-model="email"
    />
  </SuFormField>
</template>
```

## Notes d'implémentation

- Le composant gère automatiquement la direction du texte (LTR/RTL) en fonction du contexte
- Les préfixes et suffixes sont positionnés de manière responsive
- Les icônes sont automatiquement dimensionnées selon la taille de l'input
- Le focus ring est toujours visible pour l'accessibilité au clavier
- Les états de validation sont communiqués visuellement et via ARIA