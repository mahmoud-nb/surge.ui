# Button

Composant bouton flexible avec plusieurs variantes, tailles et états. Supporte les interactions au clavier et les états de chargement.

## Exemples avec icônes

### Icônes

<div class="component-demo">
  <div class="demo-section">
    <h4>Boutons avec icônes</h4>
    <div class="demo-buttons">
      <SuButton variant="primary" :icon="'PlusIcon'" iconDisplay="left">Ajouter</SuButton>
      <SuButton variant="secondary" :icon="'ArrowRightIcon'" iconDisplay="right">Suivant</SuButton>
      <SuButton variant="outline" :icon="'HeartIcon'" iconDisplay="only" aria-label="Aimer" />
      <SuButton variant="ghost" :icon="'TrashIcon'" iconDisplay="only" aria-label="Supprimer" />
    </div>
  </div>
</div>

```vue
<script setup>
import { PlusIcon, ArrowRightIcon, HeartIcon, TrashIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <!-- Icône avant le texte -->
  <SuButton variant="primary" :icon="PlusIcon" iconDisplay="left">
    Ajouter
  </SuButton>
  
  <!-- Icône après le texte -->
  <SuButton variant="secondary" :icon="ArrowRightIcon" iconDisplay="right">
    Suivant
  </SuButton>
  
  <!-- Icône seule (nécessite aria-label) -->
  <SuButton variant="outline" :icon="HeartIcon" iconDisplay="only" aria-label="Aimer" />
  <SuButton variant="ghost" :icon="TrashIcon" iconDisplay="only" aria-label="Supprimer" />
</template>
```

### Variantes

<div class="component-demo">
  <div class="demo-section">
    <h4>Variantes disponibles</h4>
    <div class="demo-buttons">
      <SuButton variant="primary">Primary</SuButton>
      <SuButton variant="secondary">Secondary</SuButton>
      <SuButton variant="outline">Outline</SuButton>
      <SuButton variant="ghost">Ghost</SuButton>
    </div>
  </div>
</div>

```vue
<template>
  <SuButton variant="primary">Primary</SuButton>
  <SuButton variant="secondary">Secondary</SuButton>
  <SuButton variant="outline">Outline</SuButton>
  <SuButton variant="ghost">Ghost</SuButton>
</template>
```

### Tailles

<div class="component-demo">
  <div class="demo-section">
    <h4>Tailles disponibles</h4>
    <div class="demo-buttons">
      <SuButton size="sm">Small</SuButton>
      <SuButton size="md">Medium</SuButton>
      <SuButton size="lg">Large</SuButton>
    </div>
  </div>
</div>

```vue
<template>
  <SuButton size="sm">Small</SuButton>
  <SuButton size="md">Medium</SuButton>
  <SuButton size="lg">Large</SuButton>
</template>
```

### États

<div class="component-demo">
  <div class="demo-section">
    <h4>États du bouton</h4>
    <div class="demo-buttons">
      <SuButton>Normal</SuButton>
      <SuButton :disabled="true">Disabled</SuButton>
      <SuButton :loading="true">Loading</SuButton>
    </div>
  </div>
</div>

```vue
<template>
  <SuButton>Normal</SuButton>
  <SuButton :disabled="true">Disabled</SuButton>
  <SuButton :loading="true">Loading</SuButton>
</template>
```

### Rayons de bordure

<div class="component-demo">
  <div class="demo-section">
    <h4>Rayons de bordure disponibles</h4>
    <div class="demo-buttons">
      <SuButton radius="none">None</SuButton>
      <SuButton radius="sm">Small</SuButton>
      <SuButton radius="md">Medium</SuButton>
      <SuButton radius="lg">Large</SuButton>
      <SuButton radius="xl">Extra Large</SuButton>
      <SuButton radius="max">Max</SuButton>
    </div>
  </div>
</div>

```vue
<template>
  <SuButton radius="none">None</SuButton>
  <SuButton radius="sm">Small</SuButton>
  <SuButton radius="md">Medium</SuButton>
  <SuButton radius="lg">Large</SuButton>
  <SuButton radius="xl">Extra Large</SuButton>
  <SuButton radius="max">Max</SuButton>
</template>
```

### Pleine largeur

<div class="component-demo">
  <div class="demo-section">
    <h4>Bouton pleine largeur</h4>
    <div class="demo-buttons-vertical">
      <SuButton :block="true">Bouton pleine largeur</SuButton>
      <SuButton variant="outline" :block="true">Outline pleine largeur</SuButton>
    </div>
  </div>
</div>

```vue
<template>
  <SuButton :block="true">Bouton pleine largeur</SuButton>
  <SuButton variant="outline" :block="true">Outline pleine largeur</SuButton>
</template>
```

### Accessibilité

<div class="component-demo">
  <div class="demo-section">
    <h4>Props d'accessibilité</h4>
    <div class="demo-buttons">
      <SuButton aria-label="Fermer la fenêtre">×</SuButton>
      <SuButton aria-describedby="help-text">Aide</SuButton>
      <SuButton :aria-pressed="true" variant="secondary">Activé</SuButton>
    </div>
    <p id="help-text" class="help-text">Ce bouton ouvre l'aide contextuelle</p>
  </div>
</div>

```vue
<template>
  <SuButton aria-label="Fermer la fenêtre">×</SuButton>
  <SuButton aria-describedby="help-text">Aide</SuButton>
  <SuButton :aria-pressed="true" variant="secondary">Activé</SuButton>
  <p id="help-text">Ce bouton ouvre l'aide contextuelle</p>
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'default'` | `'default'` | Variante visuelle du bouton |
| `size` | `'sm' \| 'md' \| 'lg' \| 'default'` | `'default'` | Taille du bouton |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'default'` | `'default'` | Rayon de bordure du bouton |
| `disabled` | `boolean` | `false` | Désactive le bouton |
| `loading` | `boolean` | `false` | Affiche un spinner de chargement |
| `block` | `boolean` | `false` | Prend toute la largeur disponible |
| `icon` | `Component` | `undefined` | Icône à afficher |
| `iconDisplay` | `'left' \| 'right' \| 'only'` | `'left'` | Position de l'icône |
| `ariaLabel` | `string` | `undefined` | Label accessible pour les lecteurs d'écran |
| `ariaDescribedBy` | `string` | `undefined` | ID de l'élément qui décrit le bouton |
| `ariaExpanded` | `boolean` | `undefined` | Indique si un élément contrôlé est étendu |
| `ariaPressed` | `boolean` | `undefined` | Indique l'état pressé d'un bouton toggle |
| `role` | `string` | `undefined` | Rôle ARIA personnalisé |
| `tabIndex` | `number` | `0` | Ordre de tabulation |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `@click` | `(event: MouseEvent) => void` | Émis lors du clic sur le bouton |
| `@focus` | `(event: FocusEvent) => void` | Émis lors du focus sur le bouton |
| `@blur` | `(event: FocusEvent) => void` | Émis lors de la perte de focus |
| `@keydown` | `(event: KeyboardEvent) => void` | Émis lors de l'appui sur une touche |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu du bouton |

## Accessibilité

Le composant Button respecte les normes WCAG 2.1 AA :

### ✅ Fonctionnalités d'accessibilité

- **Navigation au clavier** : Support des touches Entrée et Espace
- **Focus visible** : Indicateur de focus clair et contrasté
- **Tailles minimales** : Respecte les tailles minimales de cible tactile (44px)
- **Contraste** : Ratios de contraste conformes WCAG AA (4.5:1 minimum)
- **États ARIA** : Support complet des attributs ARIA
- **Lecteurs d'écran** : Labels et descriptions accessibles
- **Réduction d'animation** : Respect de `prefers-reduced-motion`
- **Mode sombre** : Contraste adapté en mode sombre
- **Contraste élevé** : Support de `prefers-contrast: high`
- **Icônes accessibles** : Icônes marquées avec `aria-hidden="true"`

### 🎯 Bonnes pratiques

```vue
<!-- Bouton avec icône seule (OBLIGATOIRE: aria-label) -->
<SuButton :icon="TrashIcon" iconDisplay="only" aria-label="Supprimer l'élément" />

<!-- Bouton avec icône et texte -->
<SuButton :icon="PlusIcon" iconDisplay="left">Ajouter un élément</SuButton>

<!-- Bouton avec label accessible -->
<SuButton aria-label="Supprimer l'élément">
  <TrashIcon />
</SuButton>

<!-- Bouton avec description -->
<SuButton aria-describedby="save-help">
  Sauvegarder
</SuButton>
<div id="save-help">Sauvegarde automatique toutes les 30 secondes</div>

<!-- Bouton toggle -->
<SuButton 
  :aria-pressed="isActive"
  @click="toggle"
>
  {{ isActive ? 'Activé' : 'Désactivé' }}
</SuButton>
```

## Exemples d'usage

### Utilisation avec Heroicons

Les icônes Heroicons les plus courantes sont disponibles globalement :

```vue
<template>
  <!-- Icône avant le texte -->
  <SuButton 
    variant="primary" 
    :icon="PlusIcon"
    iconDisplay="left"
  >
    Ajouter
  </SuButton>
  
  <!-- Icône après le texte -->
  <SuButton 
    variant="secondary" 
    :icon="ArrowRightIcon"
    iconDisplay="right"
  >
    Continuer
  </SuButton>
  
  <!-- Icônes seules avec labels accessibles -->
  <SuButton 
    variant="ghost" 
    :icon="HeartIcon"
    iconDisplay="only"
    aria-label="Aimer cette publication"
  />
  
  <SuButton 
    variant="outline" 
    :icon="ShareIcon"
    iconDisplay="only"
    aria-label="Partager"
  />
  
  <SuButton 
    variant="primary" 
    :icon="ArrowDownTrayIcon"
    iconDisplay="only"
    aria-label="Télécharger le fichier"
  />
</template>
```

### Import personnalisé d'icônes

Pour utiliser d'autres icônes Heroicons :

```vue
<script setup>
import { CogIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <SuButton :icon="CogIcon" iconDisplay="left">
    Paramètres
  </SuButton>
</template>
```

### Bouton avec gestionnaire de clic

```vue
<script setup>
const handleClick = () => {
  console.log('Bouton cliqué!')
}
</script>

<template>
  <SuButton @click="handleClick">
    Cliquez-moi
  </SuButton>
</template>
```

### Bouton de soumission de formulaire

```vue
<script setup>
import { ref } from 'vue'

const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  try {
    // Logique de soumission
    await submitForm()
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <!-- Champs du formulaire -->
    <SuButton 
      type="submit" 
      :loading="isSubmitting"
      :disabled="isSubmitting"
      :aria-label="isSubmitting ? 'Envoi en cours...' : 'Envoyer le formulaire'"
    >
      {{ isSubmitting ? 'Envoi...' : 'Envoyer' }}
    </SuButton>
  </form>
</template>
```

## Configuration globale

Vous pouvez configurer les valeurs par défaut des boutons lors de l'installation du design system :

```js
// main.js
import { createApp } from 'vue'
import SurgeUpDS from '@surgeui/ds-vue'
import '@surgeui/ds-vue/style.css'

const app = createApp(App)

// Configuration des valeurs par défaut
app.use(SurgeUpDS, {
  buttonRadius: 'lg',     // Tous les boutons auront un rayon large par défaut
  buttonVariant: 'outline', // Tous les boutons seront outline par défaut
  buttonSize: 'lg'        // Tous les boutons seront grands par défaut
})
```

### Utilisation avec configuration globale

```vue
<template>
  <!-- Ces boutons utiliseront les valeurs configurées globalement -->
  <SuButton>Bouton avec config globale</SuButton>
  <SuButton variant="default" size="default" radius="default">Même chose explicitement</SuButton>
  
  <!-- Ces boutons surchargent la configuration globale -->
  <SuButton variant="primary">Variante spécifique</SuButton>
  <SuButton size="sm">Taille spécifique</SuButton>
  <SuButton radius="none">Radius spécifique</SuButton>
</template>
```

### Options de configuration disponibles

| Option | Type | Description |
|--------|------|-------------|
| `buttonRadius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | Rayon de bordure par défaut |
| `buttonVariant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | Variante par défaut |
| `buttonSize` | `'sm' \| 'md' \| 'lg'` | Taille par défaut |