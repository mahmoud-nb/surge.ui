# Badge

Composant Badge moderne et minimaliste pour afficher des informations courtes, des statuts ou des notifications. Support des icônes, variantes dot et accessibilité complète selon les normes W3C.

## Exemples d'utilisation

### Badge de base

<div class="component-demo">
  <div class="demo-section">
    <h4>Badge simple</h4>
    <div class="demo-buttons">
      <SuBadge>Badge par défaut</SuBadge>
      <SuBadge variant="primary">Primary</SuBadge>
      <SuBadge variant="success">Success</SuBadge>
    </div>
  </div>
</div>

```vue
<template>
  <SuBadge>Badge par défaut</SuBadge>
  <SuBadge variant="primary">Primary</SuBadge>
  <SuBadge variant="success">Success</SuBadge>
</template>
```

### Variantes

<div class="component-demo">
  <div class="demo-section">
    <h4>Variantes disponibles</h4>
    <div class="demo-buttons">
      <SuBadge variant="default">Default</SuBadge>
      <SuBadge variant="primary">Primary</SuBadge>
      <SuBadge variant="secondary">Secondary</SuBadge>
      <SuBadge variant="success">Success</SuBadge>
      <SuBadge variant="warning">Warning</SuBadge>
      <SuBadge variant="error">Error</SuBadge>
    </div>
  </div>
</div>

```vue
<template>
  <SuBadge variant="default">Default</SuBadge>
  <SuBadge variant="primary">Primary</SuBadge>
  <SuBadge variant="secondary">Secondary</SuBadge>
  <SuBadge variant="success">Success</SuBadge>
  <SuBadge variant="warning">Warning</SuBadge>
  <SuBadge variant="error">Error</SuBadge>
</template>
```

### Tailles

<div class="component-demo">
  <div class="demo-section">
    <h4>Tailles disponibles</h4>
    <div class="demo-buttons">
      <SuBadge size="sm">Small</SuBadge>
      <SuBadge size="md">Medium</SuBadge>
      <SuBadge size="lg">Large</SuBadge>
    </div>
  </div>
</div>

```vue
<template>
  <SuBadge size="sm">Small</SuBadge>
  <SuBadge size="md">Medium</SuBadge>
  <SuBadge size="lg">Large</SuBadge>
</template>
```

### Rayons de bordure

<div class="component-demo">
  <div class="demo-section">
    <h4>Rayons de bordure disponibles</h4>
    <div class="demo-buttons">
      <SuBadge radius="none">None</SuBadge>
      <SuBadge radius="sm">Small</SuBadge>
      <SuBadge radius="md">Medium</SuBadge>
      <SuBadge radius="lg">Large</SuBadge>
      <SuBadge radius="xl">Extra Large</SuBadge>
      <SuBadge radius="max">Full</SuBadge>
    </div>
  </div>
</div>

```vue
<template>
  <SuBadge radius="none">None</SuBadge>
  <SuBadge radius="sm">Small</SuBadge>
  <SuBadge radius="md">Medium</SuBadge>
  <SuBadge radius="lg">Large</SuBadge>
  <SuBadge radius="xl">Extra Large</SuBadge>
  <SuBadge radius="max">Full</SuBadge>
</template>
```

### Avec icônes

<div class="component-demo">
  <div class="demo-section">
    <h4>Badges avec icônes</h4>
    <div class="demo-buttons">
      <SuBadge variant="success" icon="CheckIcon" iconDisplay="left">Validé</SuBadge>
      <SuBadge variant="error" icon="XMarkIcon" iconDisplay="left">Erreur</SuBadge>
      <SuBadge variant="warning" icon="ExclamationTriangleIcon" iconDisplay="left">Attention</SuBadge>
      <SuBadge variant="primary" icon="StarIcon" iconDisplay="right">Premium</SuBadge>
    </div>
  </div>
</div>

```vue
<script setup>
import { CheckIcon, XMarkIcon, ExclamationTriangleIcon, StarIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <SuBadge variant="success" icon="CheckIcon" iconDisplay="left">Validé</SuBadge>
  <SuBadge variant="error" icon="XMarkIcon" iconDisplay="left">Erreur</SuBadge>
  <SuBadge variant="warning" icon="ExclamationTriangleIcon" iconDisplay="left">Attention</SuBadge>
  <SuBadge variant="primary" icon="StarIcon" iconDisplay="right">Premium</SuBadge>
</template>
```

### Icônes seules

<div class="component-demo">
  <div class="demo-section">
    <h4>Badges avec icônes uniquement</h4>
    <div class="demo-buttons">
      <SuBadge variant="success" icon="CheckIcon" iconDisplay="only" aria-label="Validé" />
      <SuBadge variant="error" icon="XMarkIcon" iconDisplay="only" aria-label="Erreur" />
      <SuBadge variant="warning" icon="ExclamationTriangleIcon" iconDisplay="only" aria-label="Attention" />
      <SuBadge variant="primary" icon="StarIcon" iconDisplay="only" aria-label="Premium" />
    </div>
  </div>
</div>

```vue
<script setup>
import { CheckIcon, XMarkIcon, ExclamationTriangleIcon, StarIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <!-- Icônes seules (OBLIGATOIRE: aria-label) -->
  <SuBadge variant="success" icon="CheckIcon" iconDisplay="only" aria-label="Validé" />
  <SuBadge variant="error" icon="XMarkIcon" iconDisplay="only" aria-label="Erreur" />
  <SuBadge variant="warning" icon="ExclamationTriangleIcon" iconDisplay="only" aria-label="Attention" />
  <SuBadge variant="primary" icon="StarIcon" iconDisplay="only" aria-label="Premium" />
</template>
```

### Pastille de statut (dot, pulse)

`dot` ajoute une pastille avant le libellé : de la couleur de l'état pour `success`, `warning` et `error`, de la couleur du texte sinon. `pulse` l'anime pour un statut en direct (« en cours ») ; l'animation s'arrête quand l'utilisateur réduit les animations.

<div class="component-demo">
  <div class="demo-section">
    <h4>Statuts</h4>
    <div class="demo-buttons">
      <SuBadge variant="success" dot>En ligne</SuBadge>
      <SuBadge variant="warning" dot>Absent</SuBadge>
      <SuBadge variant="error" dot>Hors service</SuBadge>
      <SuBadge dot>Brouillon</SuBadge>
      <SuBadge variant="success" pulse>En cours</SuBadge>
    </div>
  </div>
  <div class="demo-section">
    <h4>Pastilles seules</h4>
    <div class="demo-buttons">
      <SuBadge variant="success" dot aria-label="En ligne" />
      <SuBadge variant="warning" dot aria-label="Absent" />
      <SuBadge variant="error" pulse aria-label="Enregistrement en cours" />
    </div>
  </div>
</div>

```vue
<template>
  <SuBadge variant="success" dot>En ligne</SuBadge>
  <SuBadge variant="success" pulse>En cours</SuBadge>

  <!-- Pastille seule : ariaLabel obligatoire -->
  <SuBadge variant="error" pulse aria-label="Enregistrement en cours" />
</template>
```

### Couleurs personnalisées

<div class="component-demo">
  <div class="demo-section">
    <h4>Couleurs personnalisées</h4>
    <div class="demo-buttons">
      <SuBadge backgroundColor="#8b5cf6" color="white">Violet</SuBadge>
      <SuBadge backgroundColor="#ec4899" color="white">Rose</SuBadge>
      <SuBadge backgroundColor="#06b6d4" color="white">Cyan</SuBadge>
      <SuBadge backgroundColor="#84cc16" color="white">Lime</SuBadge>
    </div>
  </div>
</div>

```vue
<template>
  <SuBadge backgroundColor="#8b5cf6" color="white">Violet</SuBadge>
  <SuBadge backgroundColor="#ec4899" color="white">Rose</SuBadge>
  <SuBadge backgroundColor="#06b6d4" color="white">Cyan</SuBadge>
  <SuBadge backgroundColor="#84cc16" color="white">Lime</SuBadge>
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error'` | `'default'` | Variante visuelle du badge |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du badge |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Rayon de bordure du badge |
| `icon` | `Component` | `undefined` | Icône à afficher |
| `iconDisplay` | `'left' \| 'right' \| 'only'` | `'left'` | Position de l'icône |
| `dot` | `boolean` | `false` | Pastille de statut avant le libellé ; seule sans libellé (`ariaLabel` requis) |
| `pulse` | `boolean` | `false` | Pastille pulsée pour un statut en direct ; implique `dot` |
| `color` | `string` | `undefined` | Couleur personnalisée du texte |
| `backgroundColor` | `string` | `undefined` | Couleur personnalisée de l'arrière-plan |

### Attributs d'accessibilité

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ariaLabel` | `string` | `undefined` | Label accessible |
| `ariaDescribedBy` | `string` | `undefined` | ID de l'élément de description |
| `ariaHidden` | `boolean` | `undefined` | Masquer aux lecteurs d'écran |
| `role` | `string` | `undefined` | Rôle ARIA personnalisé |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu du badge |

## Pastille de statut

- Avec un libellé, la pastille est décorative (`aria-hidden`) : le texte porte le statut.
- Sans libellé, le badge devient une image (`role="img"`) nommée par `ariaLabel`. Sans `ariaLabel`, un avertissement s'affiche dans la console, sauf si le badge lui-même est décoratif (`aria-hidden="true"`).
- La couleur seule ne suffit pas à transmettre un statut (WCAG 1.4.1) : gardez un libellé visible ou une infobulle.

## Accessibilité

Le composant Badge respecte les normes WCAG 2.1 AA :

### ✅ Fonctionnalités d'accessibilité

- **Contraste des couleurs** : Ratios de contraste conformes WCAG AA (4.5:1 minimum)
- **Attributs ARIA** : Support complet des attributs ARIA
- **Icônes accessibles** : Icônes marquées avec `aria-hidden="true"`
- **Labels appropriés** : Support d'`aria-label` pour les badges informatifs
- **Mode sombre** : Contraste adapté automatiquement
- **Contraste élevé** : Support de `prefers-contrast: high`
- **Couleurs personnalisées** : Calcul automatique du contraste pour les couleurs custom

### 🎯 Bonnes pratiques

```vue
<!-- Badge avec icône seule (OBLIGATOIRE: aria-label) -->
<SuBadge variant="success" icon="CheckIcon" iconDisplay="only" aria-label="Statut validé" />

<!-- Badge informatif -->
<SuBadge variant="primary" aria-label="Utilisateur premium">Premium</SuBadge>

<!-- Badge décoratif (masqué aux lecteurs d'écran) -->
<SuBadge variant="success" dot aria-hidden="true" />

<!-- Badge avec description -->
<SuBadge variant="warning" aria-describedby="warning-description">
  Attention
</SuBadge>
<div id="warning-description">Cette action nécessite une confirmation</div>
```

## Exemples d'usage

### États de commande

```vue
<script setup>
import { CheckIcon, ClockIcon, XMarkIcon, TruckIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <div class="order-status">
    <SuBadge variant="success" icon="CheckIcon" iconDisplay="left" radius="max">
      Livré
    </SuBadge>
    <SuBadge variant="warning" icon="TruckIcon" iconDisplay="left" radius="max">
      En transit
    </SuBadge>
    <SuBadge variant="default" icon="ClockIcon" iconDisplay="left" radius="max">
      En préparation
    </SuBadge>
    <SuBadge variant="error" icon="XMarkIcon" iconDisplay="left" radius="max">
      Annulé
    </SuBadge>
  </div>
</template>
```

### Notifications

```vue
<template>
  <div class="notifications">
    <!-- Compteurs de notifications -->
    <div class="notification-item">
      <span>Messages</span>
      <SuBadge variant="error" radius="max" size="sm">3</SuBadge>
    </div>
    
    <div class="notification-item">
      <span>Notifications</span>
      <SuBadge variant="warning" radius="max" size="sm">12</SuBadge>
    </div>
    
    <div class="notification-item">
      <span>Mises à jour</span>
      <SuBadge variant="success" radius="max" size="sm">99+</SuBadge>
    </div>
  </div>
</template>

<style scoped>
.notification-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
```

### Statuts utilisateur

```vue
<template>
  <div class="user-list">
    <div class="user-item">
      <div class="user-info">
        <div class="user-avatar">JD</div>
        <span>John Doe</span>
      </div>
      <div class="user-status">
        <SuBadge variant="success" dot>En ligne</SuBadge>
        <SuBadge variant="primary" size="sm" icon="StarIcon" iconDisplay="only" aria-label="Utilisateur premium" />
      </div>
    </div>
    
    <div class="user-item">
      <div class="user-info">
        <div class="user-avatar">MD</div>
        <span>Marie Dupont</span>
      </div>
      <div class="user-status">
        <SuBadge variant="warning" dot>Absent</SuBadge>
        <SuBadge variant="secondary" size="sm">Admin</SuBadge>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 0.75rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 2.5rem;
  height: 2.5rem;
  background-color: #3b82f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
}

.user-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
```

### Étiquettes de produit

```vue
<template>
  <div class="product-card">
    <div class="product-header">
      <h3>MacBook Pro</h3>
      <SuBadge variant="success" size="sm" radius="max">En stock</SuBadge>
    </div>
    
    <p class="product-description">
      Ordinateur portable haute performance
    </p>
    
    <div class="product-tags">
      <SuBadge variant="primary" size="sm" radius="max">Nouveau</SuBadge>
      <SuBadge variant="warning" size="sm" radius="max">Promo -20%</SuBadge>
      <SuBadge variant="default" size="sm" radius="max">13"</SuBadge>
      <SuBadge variant="secondary" size="sm" radius="max">M3</SuBadge>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  padding: 1.5rem;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 300px;
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.product-header h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
}

.product-description {
  margin: 0 0 1rem 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.product-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
</style>
```

### Indicateurs de statut de service

```vue
<template>
  <div class="service-status">
    <h3>État des services</h3>
    
    <div class="status-list">
      <div class="status-item">
        <span>API Principal</span>
        <SuBadge variant="success" dot>Opérationnel</SuBadge>
      </div>
      
      <div class="status-item">
        <span>Base de données</span>
        <SuBadge variant="warning" dot>Dégradé</SuBadge>
      </div>
      
      <div class="status-item">
        <span>CDN</span>
        <SuBadge variant="error" dot>Panne</SuBadge>
      </div>
      
      <div class="status-item">
        <span>Authentification</span>
        <SuBadge dot>Maintenance</SuBadge>
      </div>
    </div>
  </div>
</template>

<style scoped>
.service-status {
  max-width: 400px;
  padding: 1.5rem;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.service-status h3 {
  margin: 0 0 1.5rem 0;
  color: #1f2937;
}

.status-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
}
</style>
```

### Badges cliquables

```vue
<script setup>
import { StarIcon, CheckIcon } from '@heroicons/vue/24/outline'

const handleBadgeClick = (type) => {
  console.log(`Badge ${type} cliqué!`)
}
</script>

<template>
  <div class="clickable-badges">
    <h4>Badges interactifs</h4>
    
    <div class="badge-buttons">
      <button 
        @click="handleBadgeClick('premium')"
        class="badge-button"
      >
        <SuBadge variant="primary" icon="StarIcon" iconDisplay="left" radius="max">
          Premium
        </SuBadge>
      </button>
      
      <button 
        @click="handleBadgeClick('verified')"
        class="badge-button"
      >
        <SuBadge variant="success" icon="CheckIcon" iconDisplay="left" radius="max">
          Vérifié
        </SuBadge>
      </button>
    </div>
  </div>
</template>

<style scoped>
.badge-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.badge-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: transform 0.2s;
}

.badge-button:hover {
  transform: scale(1.05);
}

.badge-button:active {
  transform: scale(0.95);
}
</style>
```

## Cas d'usage courants

### 🏷️ Étiquettes et catégories
- **Produits** : Nouveau, Promo, En stock, Rupture
- **Articles** : Publié, Brouillon, Archivé
- **Projets** : Actif, Terminé, En pause

### 📊 Statuts et états
- **Utilisateurs** : En ligne, Absent, Occupé, Hors ligne
- **Services** : Opérationnel, Dégradé, Panne, Maintenance
- **Commandes** : Confirmé, Expédié, Livré, Annulé

### 🔔 Notifications et compteurs
- **Messages** : Nombre de messages non lus
- **Alertes** : Nombre d'alertes actives
- **Mises à jour** : Nouvelles fonctionnalités disponibles

### ⭐ Niveaux et récompenses
- **Utilisateurs** : Débutant, Intermédiaire, Expert
- **Abonnements** : Gratuit, Premium, Enterprise
- **Réalisations** : Badges de progression, certifications

## Bonnes pratiques

### ✅ À faire
- Utiliser des couleurs cohérentes pour les mêmes types de statut
- Fournir un `aria-label` pour les badges avec icône seule
- Utiliser `dot` (ou `pulse` pour un statut en direct) pour les indicateurs de statut discrets
- Limiter le texte à quelques mots maximum
- Utiliser `radius="max"` pour les compteurs de notifications

### ❌ À éviter
- Utiliser trop de badges dans une même interface
- Mettre des textes longs dans les badges
- Oublier l'accessibilité pour les badges informatifs
- Utiliser des couleurs sans signification cohérente
- Surcharger visuellement avec trop de variantes différentes

## Performance

### 🚀 Optimisations intégrées
- **CSS minimal** : Styles optimisés et légers
- **Pas de JavaScript** : Composant purement CSS (sauf calcul de contraste)
- **Transitions fluides** : Animations hardware-accelerated
- **Mode sombre** : Support natif sans JavaScript

### 📊 Impact minimal
- **CSS généré** : ~2KB gzippé
- **Rendu** : Aucun impact sur les performances
- **Accessibilité** : Aucun compromis sur les performances
- **Responsive** : Adaptation automatique