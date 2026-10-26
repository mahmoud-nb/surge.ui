# Link

Composant Link flexible pour les liens internes et externes avec support des icônes, variantes et accessibilité complète. Compatible avec Vue Router et les liens HTML natifs.

## Exemples d'utilisation

### Link de base

<div class="component-demo">
  <div class="demo-section">
    <h4>Liens simples</h4>
    <div class="demo-buttons">
      <SuLink href="/home">Lien interne</SuLink>
      <SuLink href="https://vuejs.org" external>Lien externe</SuLink>
      <SuLink to="/dashboard">Lien Vue Router</SuLink>
    </div>
  </div>
</div>

```vue
<template>
  <!-- Lien HTML natif -->
  <SuLink href="/home">Lien interne</SuLink>
  
  <!-- Lien externe (ajoute automatiquement target="_blank" et rel="noopener") -->
  <SuLink href="https://vuejs.org" external>Lien externe</SuLink>
  
  <!-- Lien Vue Router -->
  <SuLink to="/dashboard">Lien Vue Router</SuLink>
</template>
```

### Variantes

<div class="component-demo">
  <div class="demo-section">
    <h4>Variantes disponibles</h4>
    <div class="demo-buttons">
      <SuLink variant="default" href="#">Lien par défaut</SuLink>
      <SuLink variant="primary" href="#">Lien primaire</SuLink>
      <SuLink variant="secondary" href="#">Lien secondaire</SuLink>
      <SuLink variant="muted" href="#">Lien discret</SuLink>
    </div>
  </div>
</div>

```vue
<template>
  <SuLink variant="default" href="#">Lien par défaut</SuLink>
  <SuLink variant="primary" href="#">Lien primaire</SuLink>
  <SuLink variant="secondary" href="#">Lien secondaire</SuLink>
  <SuLink variant="muted" href="#">Lien discret</SuLink>
</template>
```

### Tailles

<div class="component-demo">
  <div class="demo-section">
    <h4>Tailles disponibles</h4>
    <div class="demo-buttons">
      <SuLink size="sm" href="#">Small</SuLink>
      <SuLink size="md" href="#">Medium</SuLink>
      <SuLink size="lg" href="#">Large</SuLink>
    </div>
  </div>
</div>

```vue
<template>
  <SuLink size="sm" href="#">Small</SuLink>
  <SuLink size="md" href="#">Medium</SuLink>
  <SuLink size="lg" href="#">Large</SuLink>
</template>
```

### Soulignement

<div class="component-demo">
  <div class="demo-section">
    <h4>Options de soulignement</h4>
    <div class="demo-buttons">
      <SuLink underline="always" href="#">Toujours souligné</SuLink>
      <SuLink underline="hover" href="#">Souligné au survol</SuLink>
      <SuLink underline="never" href="#">Jamais souligné</SuLink>
    </div>
  </div>
</div>

```vue
<template>
  <SuLink underline="always" href="#">Toujours souligné</SuLink>
  <SuLink underline="hover" href="#">Souligné au survol</SuLink>
  <SuLink underline="never" href="#">Jamais souligné</SuLink>
</template>
```

### Avec icônes

<div class="component-demo">
  <div class="demo-section">
    <h4>Liens avec icônes</h4>
    <div class="demo-buttons">
      <SuLink href="/home" :icon="HomeIcon" iconDisplay="left">Accueil</SuLink>
      <SuLink href="/next" :icon="ArrowRightIcon" iconDisplay="right">Suivant</SuLink>
      <SuLink href="/profile" :icon="UserIcon" iconDisplay="only" aria-label="Profil utilisateur" />
      <SuLink href="https://github.com" external :icon="ArrowTopRightOnSquareIcon" iconDisplay="left">GitHub</SuLink>
    </div>
  </div>
</div>

```vue
<script setup>
import { HomeIcon, ArrowRightIcon, UserIcon, ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <!-- Icône avant le texte -->
  <SuLink href="/home" :icon="HomeIcon" iconDisplay="left">
    Accueil
  </SuLink>
  
  <!-- Icône après le texte -->
  <SuLink href="/next" :icon="ArrowRightIcon" iconDisplay="right">
    Suivant
  </SuLink>
  
  <!-- Icône seule (nécessite aria-label) -->
  <SuLink href="/profile" :icon="UserIcon" iconDisplay="only" aria-label="Profil utilisateur" />
  
  <!-- Lien externe avec icône -->
  <SuLink href="https://github.com" external :icon="ArrowTopRightOnSquareIcon" iconDisplay="left">
    GitHub
  </SuLink>
</template>
```

### États

<div class="component-demo">
  <div class="demo-section">
    <h4>États du lien</h4>
    <div class="demo-buttons">
      <SuLink href="#">Lien normal</SuLink>
      <SuLink href="#" :disabled="true">Lien désactivé</SuLink>
    </div>
  </div>
</div>

```vue
<template>
  <SuLink href="#">Lien normal</SuLink>
  <SuLink href="#" :disabled="true">Lien désactivé</SuLink>
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | `undefined` | URL de destination (liens HTML natifs) |
| `to` | `string \| object` | `undefined` | Route de destination (Vue Router) |
| `target` | `'_blank' \| '_self' \| '_parent' \| '_top'` | `undefined` | Cible du lien |
| `rel` | `string` | `undefined` | Relation du lien |
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'muted'` | `'default'` | Variante visuelle du lien |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du lien |
| `underline` | `'always' \| 'hover' \| 'never'` | `'hover'` | Comportement du soulignement |
| `disabled` | `boolean` | `false` | Désactive le lien |
| `external` | `boolean` | `false` | Marque le lien comme externe |
| `externalLabel` | `string` | `"(s'ouvre dans un nouvel onglet)"` | Texte lu par les lecteurs d'écran quand le lien s'ouvre dans un nouvel onglet |
| `icon` | `Component` | `undefined` | Icône à afficher |
| `iconDisplay` | `'top' \| 'left' \| 'right' \| 'only'` | `'left'` | Position de l'icône |

### Attributs d'accessibilité

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ariaLabel` | `string` | `undefined` | Label accessible |
| `ariaDescribedBy` | `string` | `undefined` | ID de l'élément de description |
| `role` | `string` | `undefined` | Rôle ARIA personnalisé |
| `tabIndex` | `number` | `0` | Ordre de tabulation |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `@click` | `(event: MouseEvent) => void` | Émis lors du clic sur le lien |
| `@focus` | `(event: FocusEvent) => void` | Émis lors du focus sur le lien |
| `@blur` | `(event: FocusEvent) => void` | Émis lors de la perte de focus |
| `@keydown` | `(event: KeyboardEvent) => void` | Émis lors de l'appui sur une touche |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu du lien |

## Détection automatique des liens externes

Le composant détecte automatiquement les liens externes et applique les bonnes pratiques de sécurité :

### 🔍 Critères de détection

- Prop `external` définie à `true`
- URL commençant par `http://` ou `https://`
- URL commençant par `//`
- Prop `target` définie à `_blank`

### 🛡️ Sécurité automatique

Pour les liens externes, le composant ajoute automatiquement :
- `target="_blank"` (si non défini)
- `rel="noopener noreferrer"` (si non défini)
- Icône externe automatique (si pas d'icône personnalisée)

```vue
<!-- Ces liens sont équivalents -->
<SuLink href="https://vuejs.org" external>Vue.js</SuLink>
<SuLink href="https://vuejs.org" target="_blank" rel="noopener noreferrer">Vue.js</SuLink>
```

## Configuration globale

Vous pouvez configurer les valeurs par défaut des liens lors de l'installation du design system :

```js
// main.js
import { createApp } from 'vue'
import SurgeUI from '@surgeui/ds-vue'
import '@surgeui/ds-vue/style.css'

const app = createApp(App)

// Configuration des valeurs par défaut
app.use(SurgeUI, {
  linkVariant: 'primary',  // Tous les liens seront primary par défaut
  linkSize: 'lg',         // Tous les liens seront grands par défaut
  linkUnderline: 'never'  // Tous les liens ne seront jamais soulignés par défaut
})
```

### Utilisation avec configuration globale

```vue
<template>
  <!-- Ces liens utiliseront les valeurs configurées globalement -->
  <SuLink href="/page">Lien avec config globale</SuLink>
  <SuLink variant="default" size="default" underline="default" href="/page">Même chose explicitement</SuLink>
  
  <!-- Ces liens surchargent la configuration globale -->
  <SuLink variant="secondary" href="/page">Variante spécifique</SuLink>
  <SuLink size="sm" href="/page">Taille spécifique</SuLink>
  <SuLink underline="always" href="/page">Soulignement spécifique</SuLink>
</template>
```

### Options de configuration disponibles

| Option | Type | Description |
|--------|------|-------------|
| `linkVariant` | `'default' \| 'primary' \| 'secondary' \| 'muted'` | Variante par défaut |
| `linkSize` | `'sm' \| 'md' \| 'lg'` | Taille par défaut |
| `linkUnderline` | `'always' \| 'hover' \| 'never'` | Soulignement par défaut |

## Accessibilité

Le composant Link respecte les normes WCAG 2.1 AA :

### ✅ Fonctionnalités d'accessibilité

- **Navigation au clavier** : Support des touches Entrée et Espace
- **Focus visible** : Indicateur de focus clair et contrasté
- **Contraste** : Ratios de contraste conformes WCAG AA (4.5:1 minimum)
- **États ARIA** : Support complet des attributs ARIA
- **Lecteurs d'écran** : Labels et descriptions accessibles
- **Liens externes** : Indication claire avec icône et attributs de sécurité
- **Mode sombre** : Contraste adapté automatiquement
- **Contraste élevé** : Support de `prefers-contrast: high`
- **Réduction d'animation** : Respect de `prefers-reduced-motion`

### 🎯 Bonnes pratiques

```vue
<!-- Lien avec icône seule (OBLIGATOIRE: aria-label) -->
<SuLink href="/profile" :icon="UserIcon" iconDisplay="only" aria-label="Profil utilisateur" />

<!-- Lien avec icône et texte -->
<SuLink href="/home" :icon="HomeIcon" iconDisplay="left">Accueil</SuLink>

<!-- Lien externe sécurisé -->
<SuLink href="https://example.com" external>Site externe</SuLink>

<!-- Lien avec description -->
<SuLink href="/help" aria-describedby="help-description">
  Aide
</SuLink>
<div id="help-description">Accéder à la documentation d'aide</div>

<!-- Navigation accessible -->
<nav role="navigation" aria-label="Navigation principale">
  <SuLink href="/">Accueil</SuLink>
  <SuLink href="/about">À propos</SuLink>
  <SuLink href="/contact">Contact</SuLink>
</nav>
```

## Exemples d'usage

### Navigation principale

```vue
<script setup>
import { HomeIcon, UserIcon, CogIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <nav role="navigation" aria-label="Navigation principale">
    <SuLink href="/" :icon="HomeIcon" iconDisplay="left" variant="primary">
      Accueil
    </SuLink>
    <SuLink href="/profile" :icon="UserIcon" iconDisplay="left">
      Profil
    </SuLink>
    <SuLink href="/settings" :icon="CogIcon" iconDisplay="left">
      Paramètres
    </SuLink>
  </nav>
</template>
```

### Breadcrumb

```vue
<template>
  <nav role="navigation" aria-label="Fil d'ariane">
    <SuLink href="/" variant="muted" size="sm">Accueil</SuLink>
    <span>/</span>
    <SuLink href="/products" variant="muted" size="sm">Produits</SuLink>
    <span>/</span>
    <SuLink href="/products/laptops" variant="muted" size="sm">Ordinateurs portables</SuLink>
    <span>/</span>
    <span>MacBook Pro</span>
  </nav>
</template>
```

### Footer avec liens externes

```vue
<template>
  <footer>
    <div class="footer-links">
      <SuLink href="/privacy" variant="muted" underline="never">
        Confidentialité
      </SuLink>
      <SuLink href="/terms" variant="muted" underline="never">
        Conditions d'utilisation
      </SuLink>
      <SuLink href="https://github.com/company" external variant="muted">
        GitHub
      </SuLink>
      <SuLink href="https://twitter.com/company" external variant="muted">
        Twitter
      </SuLink>
    </div>
  </footer>
</template>

<style scoped>
.footer-links {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  padding: 2rem 0;
}
</style>
```

### Liens avec gestionnaires d'événements

```vue
<script setup>
const handleLinkClick = (event) => {
  console.log('Lien cliqué:', event)
}

const handleExternalClick = (event) => {
  // Analytics ou confirmation avant redirection
  console.log('Lien externe cliqué')
}
</script>

<template>
  <div>
    <SuLink href="/page" @click="handleLinkClick">
      Lien avec gestionnaire
    </SuLink>
    
    <SuLink href="https://example.com" external @click="handleExternalClick">
      Lien externe avec analytics
    </SuLink>
  </div>
</template>
```

## Navigation au clavier

| Touche | Action |
|--------|--------|
| `Tab` | Naviguer vers/depuis le lien |
| `Entrée` | Activer le lien |
| `Espace` | Activer le lien |

## Compatibilité Vue Router

Le composant détecte automatiquement si la prop `to` est fournie et utilise `<router-link>` au lieu de `<a>` :

```vue
<!-- Utilise <router-link> -->
<SuLink to="/dashboard">Tableau de bord</SuLink>
<SuLink :to="{ name: 'user', params: { id: 123 } }">Profil utilisateur</SuLink>

<!-- Utilise <a> -->
<SuLink href="/static-page">Page statique</SuLink>
<SuLink href="https://external.com" external>Site externe</SuLink>
```

## Sécurité des liens externes

Pour tous les liens externes, le composant applique automatiquement les bonnes pratiques de sécurité :

### 🛡️ Attributs de sécurité

- `target="_blank"` : Ouvre dans un nouvel onglet
- `rel="noopener noreferrer"` : Prévient les attaques de type "tabnabbing"
- Icône externe automatique pour indiquer visuellement la redirection

### 🎯 Exemples de sécurité

```vue
<!-- Sécurisé automatiquement -->
<SuLink href="https://external.com" external>
  Site externe
</SuLink>

<!-- Équivalent à -->
<a href="https://external.com" target="_blank" rel="noopener noreferrer">
  Site externe
  <ArrowTopRightOnSquareIcon />
</a>
```