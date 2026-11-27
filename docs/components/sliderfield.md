# SliderField

Composant SliderField pour la sélection de valeurs numériques avec support du dual-range automatique, orientation verticale/horizontale, tooltips, marques personnalisées et accessibilité complète selon les normes W3C.

## Exemples d'utilisation

### SliderField de base

<div class="component-demo">
  <div class="demo-section">
    <h4>Slider simple</h4>
    <div class="demo-inputs">
      <SuSliderField 
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

### Dual-range (plage de valeurs)

<div class="component-demo">
  <div class="demo-section">
    <h4>Sélection d'une plage</h4>
    <div class="demo-inputs">
      <SuSliderField 
        label="Fourchette de prix"
        :min="0"
        :max="1000"
        :step="10"
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
  <SuSliderField 
    label="Fourchette de prix"
    :min="0"
    :max="1000"
    :step="10"
    :value="priceRange"
    :showValue="true"
    :showLabels="true"
    :formatValue="formatPrice"
    message="Définissez votre budget"
    v-model="priceRange"
  />
</template>
```


### Avec tooltips

<div class="component-demo">
  <div class="demo-section">
    <h4>Tooltips au survol</h4>
    <div class="demo-inputs">
      <SuSliderField 
        label="Volume avec tooltip"
        :min="0"
        :max="100"
        :value="60"
        tooltip="top"
        :showValue="false"
        message="Survolez le curseur pour voir la valeur"
      />
      <SuSliderField 
        label="Plage avec tooltips"
        :min="0"
        :max="100"
        :value="[30, 70]"
        tooltip="bottom"
        :showValue="false"
        message="Tooltips en bas"
      />
    </div>
  </div>
</div>

```vue
<script setup>
const volume = ref(60)
const range = ref([30, 70])
</script>

<template>
  <!-- Tooltip en haut -->
  <SuSliderField 
    label="Volume avec tooltip"
    :min="0"
    :max="100"
    tooltip="top"
    :showValue="false"
    v-model="volume"
  />
  
  <!-- Tooltip en bas pour dual-range -->
  <SuSliderField 
    label="Plage avec tooltips"
    :min="0"
    :max="100"
    tooltip="bottom"
    :showValue="false"
    v-model="range"
  />
</template>
```
### Avec marques personnalisées

<div class="component-demo">
  <div class="demo-section">
    <h4>Marques sur le slider</h4>
    <div class="demo-inputs">
      <SuSliderField 
        label="Niveau de difficulté"
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
    </div>
  </div>
</div>

```vue
<script setup>
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
  <SuSliderField 
    label="Niveau de difficulté"
    :min="0"
    :max="100"
    :marks="[0, 25, 50, 75, 100]"
    tooltip="top"
    :formatValue="formatDifficulty"
    v-model="difficulty"
  />
</template>
```


### Avec graduations et labels

<div class="component-demo">
  <div class="demo-section">
    <h4>Slider avec graduations</h4>
    <div class="demo-inputs">
      <SuSliderField 
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
  <SuSliderField 
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
      <SuSliderField 
        label="Volume vertical"
        :min="0"
        :max="100"
        :value="75"
        orientation="vertical"
        tooltip="top"
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
  <SuSliderField 
    label="Volume vertical"
    :min="0"
    :max="100"
    orientation="vertical"
    tooltip="top"
    :showLabels="true"
    message="Contrôle vertical du volume"
    v-model="verticalVolume"
  />
</template>
```

### Avec slots before et after

<div class="component-demo">
  <div class="demo-section">
    <h4>Slider avec contenu personnalisé</h4>
    <div class="demo-inputs">
      <SuSliderField 
        label="Volume avec contrôles"
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
      </SuSliderField>
    </div>
  </div>
</div>

```vue
<script setup>
const volume = ref(60)
</script>

<template>
  <SuSliderField 
    label="Volume avec contrôles"
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
</template>
```

### Support RTL

<div class="component-demo">
  <div class="demo-section">
    <h4>Support des langues RTL</h4>
    <div class="demo-inputs" dir="rtl">
      <SuSliderField 
        label="مستوى الصوت (RTL)"
        :min="0"
        :max="100"
        :value="70"
        dir="rtl"
        tooltip="top"
        :showLabels="true"
        :formatValue="(value) => value + '%'"
      />
    </div>
  </div>
</div>

```vue
<script setup>
const volume = ref(70)
</script>

<template>
  <SuSliderField 
    label="مستوى الصوت (RTL)"
    :min="0"
    :max="100"
    dir="rtl"
    tooltip="top"
    :showLabels="true"
    :formatValue="(value) => value + '%'"
    v-model="volume"
  />
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `number \| [number, number]` | `min` | Valeur du slider (nombre simple ou tableau pour dual-range) |
| `min` | `number` | `0` | Valeur minimale |
| `max` | `number` | `100` | Valeur maximale |
| `step` | `number` | `1` | Pas d'incrémentation |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du slider |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | État visuel |
| `disabled` | `boolean` | `false` | Désactive le slider |
| `readonly` | `boolean` | `false` | Slider en lecture seule |
| `required` | `boolean` | `false` | Champ requis |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientation du slider |
| `tooltip` | `'none' \| 'top' \| 'bottom'` | `'none'` | Position du tooltip au survol |
| `marks` | `number[]` | `[]` | Marques à afficher sur le slider |
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
<SuSliderField :value="50" />

<!-- Mode dual-range (détecté automatiquement) -->
<SuSliderField :value="[20, 80]" />
```

## Tooltips

Les tooltips affichent la valeur formatée au survol ou au focus des curseurs :

### 🎯 Positions disponibles

- `tooltip="none"` : Pas de tooltip (défaut)
- `tooltip="top"` : Tooltip au-dessus du curseur
- `tooltip="bottom"` : Tooltip en dessous du curseur

```vue
<!-- Tooltip en haut -->
<SuSliderField tooltip="top" :value="50" />

<!-- Tooltip en bas -->
<SuSliderField tooltip="bottom" :value="[20, 80]" />

<!-- Pas de tooltip, affichage statique -->
<SuSliderField tooltip="none" :showValue="true" :value="50" />
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
const temperature = ref(22)

const formatTemp = (value) => `${value}°C`
</script>

<template>
  <SuSliderField 
    label="Température"
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
  <SuSliderField 
    label="Luminosité"
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
<SuSliderField 
  label="مستوى الصوت"
  dir="rtl"
  :min="0"
  :max="100"
  :value="70"
  tooltip="top"
/>

<!-- Auto-détection -->
<SuSliderField 
  label="Volume"
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
<!-- Slider avec validation et accessibilité -->
<SuSliderField 
  label="Niveau de difficulté"
  :min="1"
  :max="10"
  :required="true"
  tooltip="top"
  :showTicks="true"
  :state="hasError ? 'error' : 'default'"
  :message="hasError ? 'Veuillez sélectionner un niveau' : 'Choisissez votre niveau'"
  ariaLabel="Sélecteur de niveau de difficulté"
  v-model="difficulty"
/>

<!-- Dual-range avec formatage -->
<SuSliderField 
  label="Fourchette de prix"
  :min="0"
  :max="5000"
  :step="50"
  :value="[500, 2000]"
  tooltip="top"
  :showLabels="true"
  :formatValue="(value) => `${value}€`"
  message="Définissez votre budget"
  v-model="priceRange"
/>

<!-- Slider vertical avec graduations -->
<SuSliderField 
  label="Température"
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
    
    <SuSliderField 
      label="Fourchette de prix"
      :min="0"
      :max="1000"
      :step="10"
      tooltip="top"
      :showLabels="true"
      :marks="[0, 250, 500, 750, 1000]"
      :formatValue="formatPrice"
      message="Définissez votre budget"
      v-model="filters.price"
    />
    
    <SuSliderField 
      label="Distance maximale"
      :min="0"
      :max="50"
      :step="5"
      tooltip="bottom"
      :showTicks="true"
      :showLabels="true"
      :formatValue="formatDistance"
      message="Rayon de recherche"
      v-model="filters.distance"
    />
    
    <SuSliderField 
      label="Note minimale"
      :min="1"
      :max="5"
      :step="0.5"
      tooltip="top"
      :marks="[1, 2, 3, 4, 5]"
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
      <SuSliderField 
        label="Volume"
        :min="0"
        :max="100"
        tooltip="top"
        :formatValue="formatPercent"
        v-model="audioControls.volume"
      >
        <template #before>
          <span>🔇</span>
        </template>
        <template #after>
          <span>🔊</span>
        </template>
      </SuSlider>
      
      <SuSliderField 
        label="Balance"
        :min="-100"
        :max="100"
        :step="5"
        tooltip="top"
        :showTicks="true"
        :marks="[-100, -50, 0, 50, 100]"
        :formatValue="formatBalance"
        v-model="audioControls.balance"
      />
      
      <SuSliderField 
        label="Graves"
        :min="-12"
        :max="12"
        :step="1"
        tooltip="bottom"
        :showTicks="true"
        :formatValue="formatEQ"
        v-model="audioControls.bass"
      />
      
      <SuSliderField 
        label="Aigus"
        :min="-12"
        :max="12"
        :step="1"
        tooltip="bottom"
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
    
    <SuSliderField 
      label="Température cible"
      :min="-10"
      :max="40"
      :step="1"
      tooltip="top"
      :showTicks="true"
      :showLabels="true"
      :marks="[0, 10, 18, 24, 30, 40]"
      :state="getTemperatureState(temperature)"
      :formatValue="formatTemperature"
      :message="temperature >= 18 && temperature <= 24 ? 'Température confortable' : 'Température hors zone de confort'"
      v-model="temperature"
    >
      <template #before>
        <div class="temperature-info">
          <span :style="{ color: temperatureZone.color, fontWeight: '600' }">
            Zone : {{ temperatureZone.name }}
          </span>
        </div>
      </template>
    </SuSlider>
  </div>
</template>

<style scoped>
.temperature-info {
  text-align: center;
  margin-bottom: 0.5rem;
}
</style>
```