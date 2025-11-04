# Spinner

Un composant de spinner moderne et accessible pour afficher des états de chargement dans vos applications Vue.js. Ce composant offre plusieurs variantes de design et respecte les meilleures pratiques d'accessibilité.

## Exemples d'utilisation

### Spinner Classique

<div class="component-demo">
  <SuSpinner 
    type="classic" 
    size="40" 
    color="#3b82f6" 
    label="Chargement en cours..." 
  />
</div>

```vue
<template>
  <SuSpinner 
    type="classic" 
    size="40" 
    color="#3b82f6" 
    label="Chargement en cours..." 
  />
</template>
```

### Spinner Moderne

<div class="component-demo">
  <SuSpinner 
    type="modern" 
    size="48" 
    thickness="4" 
    color="#8b5cf6" 
    speed="1.5" 
  />
</div>

```vue
<template>
  <SuSpinner 
    type="modern" 
    size="48" 
    thickness="4" 
    color="#8b5cf6" 
    speed="1.5" 
  />
</template>
```

### Spinner à Points

```vue
<template>
  <SuSpinner 
    type="dots" 
    size="32" 
    color="#10b981" 
    label="Traitement des données..." 
  />
</template>
```

## API

### Props

|    Prop      |    Type            |    Default    |    Description                |
|--------------|--------------------|---------------|-------------------------------|
| `type`       | `'classic' / 'modern' / 'dots' / 'pulse' / 'bars'` | `'modern'` | Type de spinner à afficher  |
| `size`       | `number / string`  | `12`          | Taille du spinner en pixels ou unité CSS |
| `color`      | `string`           | `currentColor`| Couleur du spinner (accepte n'importe quelle valeur CSS)  |
| `thickness`  | `number`           | `2`           | Épaisseur du trait pour les types classic et modern  |
| `speed`      | `number`           | `1`           | Vitesse de l'animation en secondes  |
| `label`      | `string`           | `'Loading...'`| Texte accessibilité pour les lecteurs d'écran    |
| `fill`       | `string`           | `'none'`      | Couleur de fond pour les spinners SVG   |

### Attributs d'accessibilité

|    Attribute      |    Valeur              |    Description                     |
|-------------------|------------------------|------------------------------------|
| `role`            | `"status"`             | Indique que le composant représente un statut dynamique |
| `aria-live`       | `"polite"`             | Définit le niveau de priorité des annonces |
| `aria-hidden`     | `"true"` (sur SVG)      | Masque les éléments décoratifs des lecteurs d'écran |
| `focusable`       | `"false"` (sur SVG)     | Empêche la focalisation sur les éléments SVG |

### Attributs de validation HTML

|    Attribute       |    Élément               |    Description                     |
|--------------------|--------------------------|------------------------------------|
| `class`            | `su-spinner`             | Classe principale du composant               |
| `class`            | `su-spinner--{type}`     | Classe modificateur pour le type de spinner  |
| `style`            | Root element | Styles dynamiques pour la taille et la couleur  |
| `viewBox`          | SVG          | Définit le viewport pour les spinners SVG      |
| `stroke-width`     | Éléments SVG | Contrôle l'épaisseur du trait    |
| `stroke-dasharray` | Éléments SVG | Éléments SVG	Crée l'effet de dash pour l'animation  |

## Accessibilité

Le composant SuSpinner respecte les normes WCAG 2.1 AA et les bonnes pratiques W3C en matière d'accessibilité. Il a été conçu pour être utilisable par toutes les personnes, y compris celles utilisant des technologies d'assistance.

### Fonctionnalités d'accessibilité

- Announces dynamiques : Le composant utilise role="status" et aria-live="polite" pour informer les utilisateurs de lecteurs d'écran du changement de statut sans interrompre leur flux de lecture.

- Labels accessibles : Le texte fourni via la prop label est masqué visuellement mais accessible aux lecteurs d'écran, garantissant que tous les utilisateurs comprennent l'état de chargement.

- Réduction des animations : Le composant détecte automatiquement les préférences prefers-reduced-motion et adapte ou désactive les animations en conséquence, protégeant les utilisateurs sensibles aux mouvements.

- Contraste des couleurs : La couleur par défaut currentColor s'adapte au contexte, et les couleurs personnalisées doivent respecter un ratio de contraste minimal de 4.5:1.

- Éléments décoratifs masqués : Les éléments purement décoratifs comme les SVG sont masqués des arbres d'accessibilité pour éviter le bruit inutile.

## Exemples d'usage avancés

**Intégration dans un bouton de chargement**

```vue
<template>
  <button 
    class="submit-button" 
    :disabled="isLoading"
    @click="handleSubmit"
  >
    <SuSpinner 
      v-if="isLoading" 
      type="dots" 
      size="16" 
      color="white" 
    />
    <span v-else>{{ buttonText }}</span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isLoading = ref(false)
const buttonText = ref('Soumettre')

const handleSubmit = async () => {
  isLoading.value = true
  // Simulation d'une requête API
  await new Promise(resolve => setTimeout(resolve, 2000))
  isLoading.value = false
  buttonText.value = 'Soumis !'
}
</script>
```

**Page de chargement complète**

Ces exemples avancés montrent comment le composant SuSpinner peut être intégré dans différentes situations réelles tout en maintenant une excellente accessibilité et une expérience utilisateur cohérente.

```vue
<template>
  <div class="loading-page" v-if="loading">
    <div class="loading-content">
      <SuSpinner 
        type="modern" 
        size="64" 
        color="#3b82f6" 
        thickness="3"
        speed="1.5"
      />
      <h2>Chargement de votre contenu</h2>
      <p>Veuillez patienter pendant que nous préparons votre expérience.</p>
      
      <div class="loading-details">
        <SuSpinner 
          type="dots" 
          size="16" 
          color="#6b7280" 
        />
        <span>Chargement des données utilisateur...</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-content {
  text-align: center;
  max-width: 400px;
  padding: 2rem;
}

.loading-content h2 {
  margin: 1.5rem 0 0.5rem;
  color: #1f2937;
}

.loading-content p {
  color: #6b7280;
  margin-bottom: 2rem;
}

.loading-details {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
}
</style>
```

**Spinner avec état de progression**

```vue
<template>
  <div class="progress-spinner">
    <SuSpinner 
      type="classic" 
      :size="80" 
      :thickness="4" 
      :color="progressColor" 
    />
    <div class="progress-text">
      {{ progress }}%
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const progress = ref(0)

// Simulation de progression
setInterval(() => {
  if (progress.value < 100) {
    progress.value += 10
  }
}, 500)

const progressColor = computed(() => {
  if (progress.value < 30) return '#ef4444'
  if (progress.value < 70) return '#f59e0b'
  return '#10b981'
})
</script>

<style scoped>
.progress-spinner {
  position: relative;
  display: inline-block;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}
</style>
```

**Spinner responsive avec conteneur**

```vue
<template>
  <div class="responsive-container">
    <div class="card">
      <SuSpinner 
        type="modern" 
        :size="spinnerSize" 
        color="var(--primary-color)" 
      />
      <p>Contenu en chargement...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const spinnerSize = computed(() => {
  if (typeof window !== 'undefined') {
    return window.innerWidth < 768 ? '32' : '48'
  }
  return '48'
})
</script>

<style scoped>
.responsive-container {
  container-type: inline-size;
}

.card {
  padding: 2rem;
  text-align: center;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

@container (max-width: 400px) {
  .card {
    padding: 1rem;
  }
}
</style>
```
