# SuSlider

Composant SuSlider pour la sélection de valeurs numériques avec support du dual-range automatique, orientation verticale/horizontale, tooltips, marques personnalisées et accessibilité complète selon les normes W3C.


## Utilisation simple

Le composant `SuSlider` peut être utilisé de manière autonome sans le wrapper `SuFormField`.

### Slider de base

<div class="component-demo">
  <div class="demo-section">
    <h4>Slider simple</h4>
    <div class="demo-inputs">
      <SuSlider 
        :min="0"
        :max="100"
        :value="50"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const volume = ref(50)
</script>

<template>
  <SuSlider 
    :min="0"
    :max="100"
    v-model="volume"
  />
</template>
```

### Dual-range (plage de valeurs)

<div class="component-demo">
  <div class="demo-section">
    <h4>Sélection d'une plage</h4>
    <div class="demo-inputs">
      <SuSlider 
        :min="0"
        :max="1000"
        :step="10"
        :value="[200, 800]"
        :showValue="true"
        :formatValue="(value) => value + '€'"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const priceRange = ref([200, 800])
const formatPrice = (value) => `${value}€`
</script>

<template>
  <SuSlider 
    :min="0"
    :max="1000"
    :step="10"
    :showValue="true"
    :formatValue="formatPrice"
    v-model="priceRange"
  />
</template>
```

## Utilisation avec SuFormField

Pour une meilleure structuration des formulaires, utilisez `SuSlider` avec le composant `SuFormField`.

### Slider avec label et message

<div class="component-demo">
  <div class="demo-section">
    <h4>Slider dans un formulaire</h4>
    <div class="demo-inputs">
      <SuFormField 
        label="Volume"
        message="Ajustez le volume"
      >
        <SuSlider 
          :min="0"
          :max="100"
          :value="50"
          :showValue="true"
        />
      </SuFormField>
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const volume = ref(50)
</script>

<template>
  <SuFormField 
    label="Volume"
    message="Ajustez le volume"
  >
    <SuSlider 
      :min="0"
      :max="100"
      :showValue="true"
      v-model="volume"
    />
  </SuFormField>
</template>
```

### Dual-range avec validation

<div class="component-demo">
  <div class="demo-section">
    <h4>Fourchette de prix avec validation</h4>
    <div class="demo-inputs">
      <SuFormField 
        label="Fourchette de prix"
        state="success"
        message="Budget défini avec succès"
        required
      >
        <SuSlider 
          :min="0"
          :max="1000"
          :step="10"
          :value="[200, 800]"
          :showValue="true"
          :showLabels="true"
          :formatValue="(value) => value + '€'"
        />
      </SuFormField>
    </div>
  </div>
</div>

```vue
<script setup>
import { ref, computed } from 'vue'

const priceRange = ref([200, 800])

const formatPrice = (value) => `${value}€`

const budgetState = computed(() => {
  const [min, max] = priceRange.value
  if (max - min < 100) return 'error'
  if (max - min > 500) return 'success'
  return 'default'
})

const budgetMessage = computed(() => {
  const [min, max] = priceRange.value
  if (max - min < 100) return 'La plage doit être d\'au moins 100€'
  if (max - min > 500) return 'Budget défini avec succès'
  return 'Définissez votre budget'
})
</script>

<template>
  <SuFormField 
    label="Fourchette de prix"
    :state="budgetState"
    :message="budgetMessage"
    required
  >
    <SuSlider 
      :min="0"
      :max="1000"
      :step="10"
      :showValue="true"
      :showLabels="true"
      :formatValue="formatPrice"
      v-model="priceRange"
    />
  </SuFormField>
</template>
```

### Avec tooltips

<div class="component-demo">
  <div class="demo-section">
    <h4>Tooltips au survol</h4>
    <div class="demo-inputs">
      <SuFormField 
        label="Volume avec tooltip"
        message="Survolez le curseur pour voir la valeur"
      >
        <SuSlider 
          :min="0"
          :max="100"
          :value="60"
          tooltip="top"
        />
      </SuFormField>
      <SuFormField 
        label="Plage avec tooltips"
        message="Tooltips en bas"
      >
        <SuSlider 
          :min="0"
          :max="100"
          :value="[30, 70]"
          tooltip="bottom"
        />
      </SuFormField>
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const volume = ref(60)
const range = ref([30, 70])
</script>

<template>
  <SuFormField 
    label="Volume avec tooltip"
    message="Survolez le curseur pour voir la valeur"
  >
    <SuSlider 
      :min="0"
      :max="100"
      tooltip="top"
      v-model="volume"
    />
  </SuFormField>
  
  <SuFormField 
    label="Plage avec tooltips"
    message="Tooltips en bas"
  >
    <SuSlider 
      :min="0"
      :max="100"
      tooltip="bottom"
      v-model="range"
    />
  </SuFormField>
</template>
```

### Avec marques personnalisées

<div class="component-demo">
  <div class="demo-section">
    <h4>Marques sur le slider</h4>
    <div class="demo-inputs">
      <SuFormField 
        label="Niveau de difficulté"
      >
        <SuSlider 
          :min="0"
          :max="100"
          :value="60"
          :marks="[0, 25, 50, 75, 100]"
          tooltip="top"
          :formatValue="(value) => {
            if (value === 0) return 'Facile'
            if (value === 25) return 'Moyen'
            if (value === 50) return 'Difficile'
            if (value === 75) return 'Expert'
            if (value === 100) return 'Maître'
            return value.toString()
          }"
        />
      </SuFormField>
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const difficulty = ref(60)

const formatDifficulty = (value) => {
  if (value === 0) return 'Facile'
  if (value === 25) return 'Moyen'
  if (value === 50) return 'Difficile'
  if (value === 75) return 'Expert'
  if (value === 100) return 'Maître'
  return value.toString()
}
</script>

<template>
  <SuFormField 
    label="Niveau de difficulté"
  >
    <SuSlider 
      :min="0"
      :max="100"
      :marks="[0, 25, 50, 75, 100]"
      tooltip="top"
      :formatValue="formatDifficulty"
      v-model="difficulty"
    />
  </SuFormField>
</template>
```

### Avec graduations et labels

<div class="component-demo">
  <div class="demo-section">
    <h4>Slider avec graduations</h4>
    <div class="demo-inputs">
      <SuFormField 
        label="Note"
        message="Donnez une note de 0 à 10"
      >
        <SuSlider 
          :min="0"
          :max="10"
          :step="1"
          :value="7"
          :showValue="true"
          :showTicks="true"
          :showLabels="true"
        />
      </SuFormField>
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const rating = ref(7)
</script>

<template>
  <SuFormField 
    label="Note"
    message="Donnez une note de 0 à 10"
  >
    <SuSlider 
      :min="0"
      :max="10"
      :step="1"
      :showValue="true"
      :showTicks="true"
      :showLabels="true"
      v-model="rating"
    />
  </SuFormField>
</template>
```

### Orientation verticale

<div class="component-demo">
  <div class="demo-section">
    <h4>Slider vertical</h4>
    <div class="demo-inputs">
      <SuFormField 
        label="Volume vertical"
        message="Contrôle vertical du volume"
      >
        <SuSlider 
          :min="0"
          :max="100"
          :value="75"
          orientation="vertical"
          tooltip="top"
          :showLabels="true"
        />
      </SuFormField>
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const verticalVolume = ref(75)
</script>

<template>
  <SuFormField 
    label="Volume vertical"
    message="Contrôle vertical du volume"
  >
    <SuSlider 
      :min="0"
      :max="100"
      orientation="vertical"
      tooltip="top"
      :showLabels="true"
      v-model="verticalVolume"
    />
  </SuFormField>
</template>
```

### Avec slots before et after

<div class="component-demo">
  <div class="demo-section">
    <h4>Slider avec contenu personnalisé</h4>
    <div class="demo-inputs">
      <SuFormField 
        label="Volume avec contrôles"
      >
        <SuSlider 
          :min="0"
          :max="100"
          :value="60"
          tooltip="top"
        >
          <template #before>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
              <span style="font-size: 1.5rem;">🔇</span>
              <span style="font-size: 0.875rem; color: #6b7280;">Silencieux</span>
            </div>
          </template>
          <template #after>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
              <span style="font-size: 0.875rem; color: #6b7280;">Fort</span>
              <span style="font-size: 1.5rem;">🔊</span>
            </div>
          </template>
        </SuSlider>
      </SuFormField>
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const volume = ref(60)
</script>

<template>
  <SuFormField 
    label="Volume avec contrôles"
  >
    <SuSlider 
      :min="0"
      :max="100"
      tooltip="top"
      v-model="volume"
    >
      <template #before>
        <div class="volume-icons">
          <span>🔇</span>
          <span>Silencieux</span>
        </div>
      </template>
      <template #after>
        <div class="volume-icons">
          <span>Fort</span>
          <span>🔊</span>
        </div>
      </template>
    </SuSlider>
  </SuFormField>
</template>
```

### États de validation

<div class="component-demo">
  <div class="demo-section">
    <h4>États de formulaire</h4>
    <div class="demo-inputs">
      <SuFormField 
        label="État par défaut"
        message="Message d'aide normal"
        state="default"
      >
        <SuSlider :min="0" :max="100" :value="50" />
      </SuFormField>
      <SuFormField 
        label="État d'erreur"
        message="La valeur doit être supérieure à 30"
        state="error"
        required
      >
        <SuSlider :min="0" :max="100" :value="20" />
      </SuFormField>
      <SuFormField 
        label="État de succès"
        message="Valeur validée avec succès"
        state="success"
      >
        <SuSlider :min="0" :max="100" :value="80" />
      </SuFormField>
      <SuFormField 
        label="État d'avertissement"
        message="Attention, valeur proche du maximum"
        state="warning"
      >
        <SuSlider :min="0" :max="100" :value="95" />
      </SuFormField>
    </div>
  </div>
</div>

```vue
<template>
  <SuFormField 
    label="État par défaut"
    message="Message d'aide normal"
    state="default"
  >
    <SuSlider :min="0" :max="100" :value="50" />
  </SuFormField>
  
  <SuFormField 
    label="État d'erreur"
    message="La valeur doit être supérieure à 30"
    state="error"
    required
  >
    <SuSlider :min="0" :max="100" :value="20" />
  </SuFormField>
  
  <SuFormField 
    label="État de succès"
    message="Valeur validée avec succès"
    state="success"
  >
    <SuSlider :min="0" :max="100" :value="80" />
  </SuFormField>
  
  <SuFormField 
    label="État d'avertissement"
    message="Attention, valeur proche du maximum"
    state="warning"
  >
    <SuSlider :min="0" :max="100" :value="95" />
  </SuFormField>
</template>
```

### Support RTL

<div class="component-demo">
  <div class="demo-section">
    <h4>Support des langues RTL</h4>
    <div class="demo-inputs" dir="rtl">
      <SuFormField 
        label="مستوى الصوت (RTL)"
        dir="rtl"
      >
        <SuSlider 
          :min="0"
          :max="100"
          :value="70"
          dir="rtl"
          tooltip="top"
          :showLabels="true"
          :formatValue="(value) => value + '%'"
        />
      </SuFormField>
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const volume = ref(70)
</script>

<template>
  <SuFormField 
    label="مستوى الصوت (RTL)"
    dir="rtl"
  >
    <SuSlider 
      :min="0"
      :max="100"
      dir="rtl"
      tooltip="top"
      :showLabels="true"
      :formatValue="(value) => value + '%'"
      v-model="volume"
    />
  </SuFormField>
</template>
```

## Utilisation avec SuSliderField

Pour plus de simplicité, vous pouvez également utiliser le composant `SuSliderField` qui regroupe `SuFormField` et `SuSlider` en un seul composant :

```vue
<script setup>
import { ref } from 'vue'

const volume = ref(50)
</script>

<template>
  <SuSliderField 
    label="Volume"
    :min="0"
    :max="100"
    :showValue="true"
    message="Ajustez le volume"
    v-model="volume"
  />
</template>
```

Cette approche est équivalente à :

```vue
<SuFormField 
  label="Volume"
  message="Ajustez le volume"
>
  <SuSlider 
    :min="0"
    :max="100"
    :showValue="true"
    v-model="volume"
  />
</SuFormField>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number \| [number, number]` | `min` | Valeur du slider (nombre simple ou tableau pour dual-range) |
| `min` | `number` | `0` | Valeur minimale |
| `max` | `number` | `100` | Valeur maximale |
| `step` | `number` | `1` | Pas d'incrémentation |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du slider |
| `disabled` | `boolean` | `false` | Désactive le slider |
| `readonly` | `boolean` | `false` | Slider en lecture seule |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientation du slider |
| `tooltip` | `'none' \| 'top' \| 'bottom'` | `'none'` | Position du tooltip au survol |
| `marks` | `number[]` | `[]` | Marques à afficher sur le slider |
| `showValue` | `boolean` | `true` | Afficher la valeur courante |
| `showTicks` | `boolean` | `false` | Afficher les graduations |
| `showLabels` | `boolean` | `false` | Afficher les labels min/max |
| `formatValue` | `(value: number) => string` | `undefined` | Fonction de formatage des valeurs |
| `dir` | `'ltr' \| 'rtl' \| 'auto'` | `'auto'` | Direction du texte |

### Attributs d'accessibilité

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ariaLabel` | `string` | `undefined` | Label accessible |
| `ariaDescribedBy` | `string` | `undefined` | ID de l'élément de description |
| `ariaInvalid` | `boolean` | `undefined` | Indique si la valeur est invalide |
| `ariaRequired` | `boolean` | `undefined` | Indique si le champ est requis |
| `ariaValueText` | `string` | `undefined` | Description textuelle de la valeur |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `@update:modelValue` | `(value: number \| [number, number]) => void` | Émis lors du changement de valeur (v-model) |
| `@change` | `(value: number \| [number, number]) => void` | Émis lors du changement |
| `@input` | `(value: number \| [number, number]) => void` | Émis pendant le glissement |
| `@focus` | `(event: FocusEvent) => void` | Émis lors du focus |
| `@blur` | `(event: FocusEvent) => void` | Émis lors de la perte de focus |
| `@keydown` | `(event: KeyboardEvent) => void` | Émis lors de l'appui sur une touche |

### Slots

| Slot | Description |
|------|-------------|
| `before` | Contenu affiché avant le slider |
| `after` | Contenu affiché après le slider |

### Méthodes exposées

| Méthode | Type | Description |
|---------|------|-------------|
| `focus()` | `() => void` | Donne le focus au slider |
| `sliderRef` | `Ref<HTMLDivElement>` | Référence au conteneur |
| `thumb1Ref` | `Ref<HTMLDivElement>` | Référence au premier thumb |
| `thumb2Ref` | `Ref<HTMLDivElement>` | Référence au second thumb (dual) |

## Détection automatique du dual-range

Le composant détecte automatiquement s'il doit fonctionner en mode dual-range en vérifiant si la valeur est un tableau :

```vue
<!-- Mode simple -->
<SuSlider :value="50" />

<!-- Mode dual-range (détecté automatiquement) -->
<SuSlider :value="[20, 80]" />
```

## Tooltips

Les tooltips affichent la valeur formatée au survol ou au focus des curseurs :

### 🎯 Positions disponibles

- `tooltip="none"` : Pas de tooltip (défaut)
- `tooltip="top"` : Tooltip au-dessus du curseur
- `tooltip="bottom"` : Tooltip en dessous du curseur

```vue
<!-- Tooltip en haut -->
<SuSlider tooltip="top" :value="50" />

<!-- Tooltip en bas -->
<SuSlider tooltip="bottom" :value="[20, 80]" />

<!-- Pas de tooltip, affichage statique -->
<SuSlider tooltip="none" :showValue="true" :value="50" />
```

## Marques personnalisées

Les marques permettent d'afficher des valeurs spécifiques sur le slider :

### 📍 Fonctionnalités des marques

- **Positionnement automatique** : Calcul de la position en pourcentage
- **Filtrage intelligent** : Seules les marques dans la plage min/max sont affichées
- **Formatage** : Utilise la fonction `formatValue` si fournie
- **Support RTL** : Positionnement adapté à la direction

```vue
<script setup>
import { ref } from 'vue'

const temperature = ref(22)
const formatTemp = (value) => `${value}°C`
</script>

<template>
  <SuSlider 
    :min="0"
    :max="40"
    :marks="[0, 10, 18, 24, 30, 40]"
    :formatValue="formatTemp"
    tooltip="top"
    v-model="temperature"
  />
</template>
```

## Slots before et after

Les slots permettent d'ajouter du contenu personnalisé autour du slider :

### 🎨 Cas d'usage

- **Icônes** : Indicateurs visuels (🔇 🔊)
- **Labels** : Descriptions textuelles
- **Boutons** : Actions rapides (reset, presets)
- **Informations** : Contexte supplémentaire

```vue
<template>
  <SuSlider 
    :min="0"
    :max="100"
    v-model="brightness"
  >
    <template #before>
      <div class="slider-controls">
        <span>🌙</span>
        <span>Sombre</span>
      </div>
    </template>
    <template #after>
      <div class="slider-controls">
        <span>Lumineux</span>
        <span>☀️</span>
      </div>
    </template>
  </SuSlider>
</template>
```

## Support RTL

Le composant gère automatiquement les langues de droite à gauche :

### 🌐 Fonctionnalités RTL

- **Inversion automatique** : Les pourcentages sont inversés
- **Calcul adapté** : Position des curseurs ajustée
- **Marques et ticks** : Positionnement correct
- **Navigation clavier** : Flèches adaptées à la direction

```vue
<!-- Support RTL -->
<SuSlider 
  dir="rtl"
  :min="0"
  :max="100"
  :value="70"
  tooltip="top"
/>

<!-- Auto-détection -->
<SuSlider 
  dir="auto"
  :value="50"
/>
```

## Accessibilité

Le composant Slider respecte les normes WCAG 2.1 AA et les bonnes pratiques W3C :

### ✅ Fonctionnalités d'accessibilité

- **Rôle ARIA** : `role="slider"` avec `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- **Navigation au clavier** : Support des touches fléchées, Page Up/Down, Home/End
- **Orientation ARIA** : `aria-orientation` pour les lecteurs d'écran
- **Annonces vocales** : Messages pour les lecteurs d'écran lors des changements
- **Labels associés** : Chaque slider a un label correctement associé via SuFormField
- **Messages d'état** : Messages avec `aria-live` pour les lecteurs d'écran
- **Contraste des couleurs** : Ratios conformes WCAG AA (4.5:1 minimum)
- **Focus visible** : Indicateurs de focus clairs et contrastés
- **Tailles minimales** : Thumbs de 44px minimum pour l'accessibilité tactile
- **Mode sombre** : Contraste adapté automatiquement
- **Contraste élevé** : Support de `prefers-contrast: high`
- **Réduction d'animation** : Respect de `prefers-reduced-motion`

### 🎯 Bonnes pratiques

```vue
<!-- Slider avec validation et accessibilité -->
<SuFormField 
  label="Niveau de difficulté"
  :required="true"
  :state="hasError ? 'error' : 'default'"
  :message="hasError ? 'Veuillez sélectionner un niveau' : 'Choisissez votre niveau'"
>
  <SuSlider 
    :min="1"
    :max="10"
    tooltip="top"
    :showTicks="true"
    ariaLabel="Sélecteur de niveau de difficulté"
    v-model="difficulty"
  />
</SuFormField>

<!-- Dual-range avec formatage -->
<SuFormField 
  label="Fourchette de prix"
  message="Définissez votre budget"
>
  <SuSlider 
    :min="0"
    :max="5000"
    :step="50"
    :value="[500, 2000]"
    tooltip="top"
    :showLabels="true"
    :formatValue="(value) => `${value}€`"
    v-model="priceRange"
  />
</SuFormField>

<!-- Slider vertical avec graduations -->
<SuFormField 
  label="Température"
>
  <SuSlider 
    :min="-10"
    :max="40"
    :step="1"
    orientation="vertical"
    tooltip="top"
    :showTicks="true"
    :showLabels="true"
    :formatValue="(value) => `${value}°C`"
    v-model="temperature"
  />
</SuFormField>
```

## Navigation au clavier

| Touche | Action |
|--------|--------|
| `Tab` | Naviguer vers/depuis le slider |
| `Flèches` | Ajuster la valeur par pas |
| `Page Up` | Augmenter de 10% de la plage |
| `Page Down` | Diminuer de 10% de la plage |
| `Home` | Aller à la valeur minimale |
| `End` | Aller à la valeur maximale |

## Fonctionnalités avancées

### 🎯 Dual-range intelligent

En mode dual-range (valeur tableau), le composant gère automatiquement :
- **Collision des thumbs** : Les valeurs min/max ne peuvent pas se croiser
- **Sélection intelligente** : Clic sur la track sélectionne le thumb le plus proche
- **Navigation clavier** : Chaque thumb est focusable indépendamment

### 💬 Tooltips interactifs

Les tooltips offrent un feedback visuel immédiat :
- **Affichage au survol** : Apparition fluide au hover
- **Affichage au focus** : Visible lors de la navigation clavier
- **Affichage pendant le drag** : Reste visible pendant le glissement
- **Formatage personnalisé** : Utilise la fonction `formatValue`

### 📊 Marques personnalisées

Les marques permettent de mettre en évidence des valeurs importantes :
- **Positionnement précis** : Calcul automatique de la position
- **Labels formatés** : Affichage avec la fonction `formatValue`
- **Filtrage automatique** : Seules les marques valides sont affichées
- **Style adaptatif** : S'adapte à l'orientation et à la direction

### 🎨 Formatage flexible

La fonction `formatValue` permet :
- **Unités personnalisées** : €, %, °C, km, etc.
- **Formatage complexe** : Étoiles, barres de progression, etc.
- **Localisation** : Adaptation aux différentes langues

## Exemples d'usage avancés

### Filtres de recherche

```vue
<script setup>
import { ref } from 'vue'

const filters = ref({
  price: [100, 500],
  distance: 20,
  rating: 4
})

const formatPrice = (value) => `${value}€`
const formatDistance = (value) => `${value} km`
const formatRating = (value) => '★'.repeat(Math.floor(value)) + (value % 1 ? '☆' : '')
</script>

<template>
  <div class="filters">
    <h3>Filtres de recherche</h3>
    
    <SuFormField 
      label="Fourchette de prix"
      message="Définissez votre budget"
    >
      <SuSlider 
        :min="0"
        :max="1000"
        :step="10"
        tooltip="top"
        :showLabels="true"
        :marks="[0, 250, 500, 750, 1000]"
        :formatValue="formatPrice"
        v-model="filters.price"
      />
    </SuFormField>
    
    <SuFormField 
      label="Distance maximale"
      message="Rayon de recherche"
    >
      <SuSlider 
        :min="0"
        :max="50"
        :step="5"
        tooltip="bottom"
        :showTicks="true"
        :showLabels="true"
        :formatValue="formatDistance"
        v-model="filters.distance"
      />
    </SuFormField>
    
    <SuFormField 
      label="Note minimale"
      message="Note minimum souhaitée"
    >
      <SuSlider 
        :min="1"
        :max="5"
        :step="0.5"
        tooltip="top"
        :marks="[1, 2, 3, 4, 5]"
        :formatValue="formatRating"
        v-model="filters.rating"
      />
    </SuFormField>
  </div>
</template>
```