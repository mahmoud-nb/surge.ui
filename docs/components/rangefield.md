# RangeField

Composant Range/Slider Field pour la sélection de valeurs numériques avec support du dual-range, orientation verticale/horizontale, graduations et accessibilité complète selon les normes W3C.

## Exemples d'utilisation

### RangeField de base

<div class="component-demo">
  <div class="demo-section">
    <h4>Slider simple</h4>
    <div class="demo-inputs">
      <SuRangeField 
        label="Volume"
        :min="0"
        :max="100"
        :value="50"
        :showValue="true"
        message="Ajustez le volume"
      />
    </div>
  </div>
</div>

```vue
<script setup>
const volume = ref(50)
</script>

<template>
  <SuRangeField 
    label="Volume"
    :min="0"
    :max="100"
    :showValue="true"
    message="Ajustez le volume"
    v-model="volume"
  />
</template>
```

### Dual-range (plage de valeurs)

<div class="component-demo">
  <div class="demo-section">
    <h4>Sélection d'une plage</h4>
    <div class="demo-inputs">
      <SuRangeField 
        label="Fourchette de prix"
        :min="0"
        :max="1000"
        :step="10"
        :dual="true"
        :value="[200, 800]"
        :showValue="true"
        :showLabels="true"
        :formatValue="(value) => value + '€'"
        message="Définissez votre budget"
      />
    </div>
  </div>
</div>

```vue
<script setup>
const priceRange = ref([200, 800])

const formatPrice = (value) => `${value}€`
</script>

<template>
  <SuRangeField 
    label="Fourchette de prix"
    :min="0"
    :max="1000"
    :step="10"
    :dual="true"
    :showValue="true"
    :showLabels="true"
    :formatValue="formatPrice"
    message="Définissez votre budget"
    v-model="priceRange"
  />
</template>
```

### Avec graduations et labels

<div class="component-demo">
  <div class="demo-section">
    <h4>Slider avec graduations</h4>
    <div class="demo-inputs">
      <SuRangeField 
        label="Note"
        :min="0"
        :max="10"
        :step="1"
        :value="7"
        :showValue="true"
        :showTicks="true"
        :showLabels="true"
        message="Donnez une note de 0 à 10"
      />
    </div>
  </div>
</div>

```vue
<script setup>
const rating = ref(7)
</script>

<template>
  <SuRangeField 
    label="Note"
    :min="0"
    :max="10"
    :step="1"
    :showValue="true"
    :showTicks="true"
    :showLabels="true"
    message="Donnez une note de 0 à 10"
    v-model="rating"
  />
</template>
```

### Orientation verticale

<div class="component-demo">
  <div class="demo-section">
    <h4>Slider vertical</h4>
    <div class="demo-inputs">
      <SuRangeField 
        label="Volume vertical"
        :min="0"
        :max="100"
        :value="75"
        orientation="vertical"
        :showValue="true"
        :showLabels="true"
        message="Contrôle vertical du volume"
      />
    </div>
  </div>
</div>

```vue
<script setup>
const verticalVolume = ref(75)
</script>

<template>
  <SuRangeField 
    label="Volume vertical"
    :min="0"
    :max="100"
    orientation="vertical"
    :showValue="true"
    :showLabels="true"
    message="Contrôle vertical du volume"
    v-model="verticalVolume"
  />
</template>
```

### Formatage personnalisé

<div class="component-demo">
  <div class="demo-section">
    <h4>Formatage des valeurs</h4>
    <div class="demo-inputs">
      <SuRangeField 
        label="Pourcentage"
        :min="0"
        :max="1"
        :step="0.01"
        :value="0.65"
        :showValue="true"
        :formatValue="(value) => Math.round(value * 100) + '%'"
        message="Sélectionnez un pourcentage"
      />
    </div>
  </div>
</div>

```vue
<script setup>
const percentage = ref(0.65)

const formatPercentage = (value) => {
  return Math.round(value * 100) + '%'
}
</script>

<template>
  <SuRangeField 
    label="Pourcentage"
    :min="0"
    :max="1"
    :step="0.01"
    :showValue="true"
    :formatValue="formatPercentage"
    message="Sélectionnez un pourcentage"
    v-model="percentage"
  />
</template>
```

### Tailles

<div class="component-demo">
  <div class="demo-section">
    <h4>Tailles disponibles</h4>
    <div class="demo-inputs">
      <SuRangeField 
        size="sm"
        label="Small"
        :min="0"
        :max="100"
        :value="25"
        :showValue="true"
      />
      <SuRangeField 
        size="md"
        label="Medium"
        :min="0"
        :max="100"
        :value="50"
        :showValue="true"
      />
      <SuRangeField 
        size="lg"
        label="Large"
        :min="0"
        :max="100"
        :value="75"
        :showValue="true"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuRangeField size="sm" label="Small" :min="0" :max="100" :value="25" />
  <SuRangeField size="md" label="Medium" :min="0" :max="100" :value="50" />
  <SuRangeField size="lg" label="Large" :min="0" :max="100" :value="75" />
</template>
```

### États et validation

<div class="component-demo">
  <div class="demo-section">
    <h4>États de validation</h4>
    <div class="demo-inputs">
      <SuRangeField 
        label="État par défaut"
        :min="0"
        :max="100"
        :value="50"
        :showValue="true"
        message="Ajustez la valeur"
      />
      <SuRangeField 
        state="error"
        label="État d'erreur"
        :min="0"
        :max="100"
        :value="90"
        :showValue="true"
        message="Valeur trop élevée"
      />
      <SuRangeField 
        state="success"
        label="État de succès"
        :min="0"
        :max="100"
        :value="75"
        :showValue="true"
        message="Valeur optimale !"
      />
      <SuRangeField 
        state="warning"
        label="État d'avertissement"
        :min="0"
        :max="100"
        :value="85"
        :showValue="true"
        message="Valeur proche de la limite"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuRangeField 
    state="default"
    label="État par défaut"
    message="Ajustez la valeur"
  />
  <SuRangeField 
    state="error"
    label="État d'erreur"
    message="Valeur trop élevée"
  />
  <SuRangeField 
    state="success"
    label="État de succès"
    message="Valeur optimale !"
  />
  <SuRangeField 
    state="warning"
    label="État d'avertissement"
    message="Valeur proche de la limite"
  />
</template>
```

### États disabled et readonly

<div class="component-demo">
  <div class="demo-section">
    <h4>États spéciaux</h4>
    <div class="demo-inputs">
      <SuRangeField 
        label="Slider désactivé"
        :disabled="true"
        :min="0"
        :max="100"
        :value="50"
        :showValue="true"
        message="Ce slider est désactivé"
      />
      <SuRangeField 
        label="Slider en lecture seule"
        :readonly="true"
        :min="0"
        :max="100"
        :value="75"
        :showValue="true"
        message="Cette valeur ne peut pas être modifiée"
      />
      <SuRangeField 
        label="Niveau requis"
        :required="true"
        :min="1"
        :max="10"
        :value="5"
        :showValue="true"
        :showTicks="true"
        message="Sélectionnez un niveau"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuRangeField 
    label="Slider désactivé"
    :disabled="true"
    :value="50"
    message="Ce slider est désactivé"
  />
  <SuRangeField 
    label="Slider en lecture seule"
    :readonly="true"
    :value="75"
    message="Cette valeur ne peut pas être modifiée"
  />
  <SuRangeField 
    label="Niveau requis"
    :required="true"
    :min="1"
    :max="10"
    :value="5"
    message="Sélectionnez un niveau"
  />
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number \| [number, number]` | `min` ou `[min, max]` | Valeur du slider |
| `min` | `number` | `0` | Valeur minimale |
| `max` | `number` | `100` | Valeur maximale |
| `step` | `number` | `1` | Pas d'incrémentation |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du slider |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | État visuel |
| `disabled` | `boolean` | `false` | Désactive le slider |
| `readonly` | `boolean` | `false` | Slider en lecture seule |
| `required` | `boolean` | `false` | Champ requis |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientation du slider |
| `dual` | `boolean` | `false` | Mode dual-range (min/max) |
| `showValue` | `boolean` | `true` | Afficher la valeur courante |
| `showTicks` | `boolean` | `false` | Afficher les graduations |
| `showLabels` | `boolean` | `false` | Afficher les labels min/max |
| `formatValue` | `(value: number) => string` | `undefined` | Fonction de formatage des valeurs |
| `label` | `string` | `undefined` | Label du slider |
| `message` | `string` | `undefined` | Message affiché (style déterminé par le state) |

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

### Méthodes exposées

| Méthode | Type | Description |
|---------|------|-------------|
| `focus()` | `() => void` | Donne le focus au slider |
| `rangeRef` | `Ref<HTMLDivElement>` | Référence au conteneur |
| `thumb1Ref` | `Ref<HTMLDivElement>` | Référence au premier thumb |
| `thumb2Ref` | `Ref<HTMLDivElement>` | Référence au second thumb (dual) |

## Accessibilité

Le composant Range respecte les normes WCAG 2.1 AA et les bonnes pratiques W3C :

### ✅ Fonctionnalités d'accessibilité

- **Rôle ARIA** : `role="slider"` avec `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- **Navigation au clavier** : Support des touches fléchées, Page Up/Down, Home/End
- **Orientation ARIA** : `aria-orientation` pour les lecteurs d'écran
- **Annonces vocales** : Messages pour les lecteurs d'écran lors des changements
- **Labels associés** : Chaque slider a un label correctement associé
- **Messages d'état** : Messages avec `aria-live` pour les lecteurs d'écran
- **Contraste des couleurs** : Ratios conformes WCAG AA (4.5:1 minimum)
- **Focus visible** : Indicateurs de focus clairs et contrastés
- **Tailles minimales** : Thumbs de 44px minimum pour l'accessibilité tactile
- **Mode sombre** : Contraste adapté automatiquement
- **Contraste élevé** : Support de `prefers-contrast: high`
- **Réduction d'animation** : Respect de `prefers-reduced-motion`

### 🎯 Bonnes pratiques

```vue
<!-- Range avec validation et accessibilité -->
<SuRangeField 
  label="Niveau de difficulté"
  :min="1"
  :max="10"
  :required="true"
  :showValue="true"
  :showTicks="true"
  :state="hasError ? 'error' : 'default'"
  :message="hasError ? 'Veuillez sélectionner un niveau' : 'Choisissez votre niveau'"
  ariaLabel="Sélecteur de niveau de difficulté"
  v-model="difficulty"
/>

<!-- Dual-range avec formatage -->
<SuRangeField 
  label="Fourchette de prix"
  :min="0"
  :max="5000"
  :step="50"
  :dual="true"
  :showValue="true"
  :showLabels="true"
  :formatValue="(value) => `${value}€`"
  message="Définissez votre budget"
  v-model="priceRange"
/>

<!-- Range vertical avec graduations -->
<SuRangeField 
  label="Température"
  :min="-10"
  :max="40"
  :step="1"
  orientation="vertical"
  :showValue="true"
  :showTicks="true"
  :showLabels="true"
  :formatValue="(value) => `${value}°C`"
  v-model="temperature"
/>
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

En mode dual-range, le composant gère automatiquement :
- **Collision des thumbs** : Les valeurs min/max ne peuvent pas se croiser
- **Sélection intelligente** : Clic sur la track sélectionne le thumb le plus proche
- **Navigation clavier** : Chaque thumb est focusable indépendamment

### 📊 Graduations adaptatives

Les graduations s'adaptent automatiquement :
- **Nombre optimal** : Maximum 21 graduations pour éviter l'encombrement
- **Espacement intelligent** : Calcul automatique de l'espacement
- **Alignement précis** : Positionnement exact sur les valeurs

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
    
    <SuRangeField 
      label="Fourchette de prix"
      :min="0"
      :max="1000"
      :step="10"
      :dual="true"
      :showValue="true"
      :showLabels="true"
      :formatValue="formatPrice"
      message="Définissez votre budget"
      v-model="filters.price"
    />
    
    <SuRangeField 
      label="Distance maximale"
      :min="0"
      :max="50"
      :step="5"
      :showValue="true"
      :showTicks="true"
      :showLabels="true"
      :formatValue="formatDistance"
      message="Rayon de recherche"
      v-model="filters.distance"
    />
    
    <SuRangeField 
      label="Note minimale"
      :min="1"
      :max="5"
      :step="0.5"
      :showValue="true"
      :showTicks="true"
      :formatValue="formatRating"
      message="Note minimum souhaitée"
      v-model="filters.rating"
    />
  </div>
</template>
```

### Contrôles audio/vidéo

```vue
<script setup>
import { ref } from 'vue'

const audioControls = ref({
  volume: 60,
  balance: 0,
  bass: 0,
  treble: 0
})

const formatPercent = (value) => `${value}%`
const formatBalance = (value) => {
  if (value === 0) return 'Centre'
  return value > 0 ? `Droite ${value}%` : `Gauche ${Math.abs(value)}%`
}
const formatEQ = (value) => value > 0 ? `+${value}dB` : `${value}dB`
</script>

<template>
  <div class="audio-controls">
    <h3>Contrôles audio</h3>
    
    <div class="controls-grid">
      <SuRangeField 
        label="Volume"
        :min="0"
        :max="100"
        :showValue="true"
        :formatValue="formatPercent"
        v-model="audioControls.volume"
      />
      
      <SuRangeField 
        label="Balance"
        :min="-100"
        :max="100"
        :step="5"
        :showValue="true"
        :showTicks="true"
        :formatValue="formatBalance"
        v-model="audioControls.balance"
      />
      
      <SuRangeField 
        label="Graves"
        :min="-12"
        :max="12"
        :step="1"
        :showValue="true"
        :showTicks="true"
        :formatValue="formatEQ"
        v-model="audioControls.bass"
      />
      
      <SuRangeField 
        label="Aigus"
        :min="-12"
        :max="12"
        :step="1"
        :showValue="true"
        :showTicks="true"
        :formatValue="formatEQ"
        v-model="audioControls.treble"
      />
    </div>
  </div>
</template>

<style scoped>
.controls-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}
</style>
```

### Slider de température avec zones

```vue
<script setup>
import { ref, computed } from 'vue'

const temperature = ref(20)

const temperatureZone = computed(() => {
  if (temperature.value < 10) return { name: 'Froid', color: '#3b82f6' }
  if (temperature.value < 25) return { name: 'Tempéré', color: '#10b981' }
  if (temperature.value < 35) return { name: 'Chaud', color: '#f59e0b' }
  return { name: 'Très chaud', color: '#ef4444' }
})

const formatTemperature = (value) => `${value}°C`

const getTemperatureState = (temp) => {
  if (temp < 5 || temp > 35) return 'warning'
  if (temp >= 18 && temp <= 24) return 'success'
  return 'default'
}
</script>

<template>
  <div class="temperature-control">
    <h3>Contrôle de température</h3>
    
    <div class="temperature-info">
      <div class="temperature-zone" :style="{ color: temperatureZone.color }">
        Zone : {{ temperatureZone.name }}
      </div>
    </div>
    
    <SuRangeField 
      label="Température cible"
      :min="-10"
      :max="40"
      :step="1"
      :showValue="true"
      :showTicks="true"
      :showLabels="true"
      :state="getTemperatureState(temperature)"
      :formatValue="formatTemperature"
      :message="temperature >= 18 && temperature <= 24 ? 'Température confortable' : 'Température hors zone de confort'"
      v-model="temperature"
    />
  </div>
</template>

<style scoped>
.temperature-info {
  margin-bottom: 1rem;
  text-align: center;
}

.temperature-zone {
  font-weight: 600;
  font-size: 1.125rem;
}
</style>
```