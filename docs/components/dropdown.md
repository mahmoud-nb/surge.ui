# Dropdown

Composant Dropdown qui ressemble à un bouton mais affiche une liste d'options au clic. Chaque option peut être un lien (si elle contient un href) ou déclencher une action. Conforme aux normes W3C d'accessibilité avec support complet du clavier et des lecteurs d'écran.

## Exemples d'utilisation

### Dropdown de base

<div class="component-demo">
  <div class="demo-section">
    <h4>Menu utilisateur simple</h4>
    <div class="demo-buttons">
      <SuDropdown 
        :options="[
          { value: 'profile', label: 'Mon profil', icon: 'UserIcon' },
          { value: 'settings', label: 'Paramètres', icon: 'CogIcon' },
          { value: 'separator1', separator: true },
          { value: 'logout', label: 'Déconnexion', icon: 'ArrowUturnLeftIcon' }
        ]"
        label="Menu utilisateur"
        :icon="'UserIcon'"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { UserIcon, CogIcon, ArrowUturnLeftIcon } from '@heroicons/vue/24/outline'

const userOptions = [
  { value: 'profile', label: 'Mon profil', icon: UserIcon },
  { value: 'settings', label: 'Paramètres', icon: CogIcon },
  { value: 'separator1', separator: true },
  { value: 'logout', label: 'Déconnexion', icon: ArrowUturnLeftIcon }
]

const handleSelect = (option) => {
  console.log('Option sélectionnée:', option)
  // Gérer l'action selon l'option
}
</script>

<template>
  <SuDropdown 
    :options="userOptions"
    label="Menu utilisateur"
    :icon="UserIcon"
    @select="handleSelect"
  />
</template>
```

### Avec liens et actions mixtes

<div class="component-demo">
  <div class="demo-section">
    <h4>Options mixtes (liens + actions)</h4>
    <div class="demo-buttons">
      <SuDropdown 
        :options="[
          { value: 'profile', label: 'Mon profil', icon: 'UserIcon' },
          { value: 'docs', label: 'Documentation', href: '/docs', icon: 'DocumentIcon' },
          { value: 'separator1', separator: true },
          { value: 'settings', label: 'Paramètres', icon: 'CogIcon' },
          { value: 'help', label: 'Aide', href: 'https://help.example.com', target: '_blank', icon: 'QuestionMarkCircleIcon' }
        ]"
        label="Menu mixte"
        :icon="'CogIcon'"
        variant="secondary"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { UserIcon, DocumentIcon, CogIcon, QuestionMarkCircleIcon } from '@heroicons/vue/24/outline'

const mixedOptions = [
  { value: 'profile', label: 'Mon profil', icon: UserIcon },
  { value: 'docs', label: 'Documentation', href: '/docs', icon: DocumentIcon },
  { value: 'separator1', separator: true },
  { value: 'settings', label: 'Paramètres', icon: CogIcon },
  { value: 'help', label: 'Aide', href: 'https://help.example.com', target: '_blank', icon: QuestionMarkCircleIcon }
]

const handleSelect = (option) => {
  // Les options avec href naviguent automatiquement
  // Les options sans href déclenchent cette fonction
  if (!option.href) {
    console.log('Action:', option.value)
  }
}
</script>

<template>
  <SuDropdown 
    :options="mixedOptions"
    label="Menu mixte"
    :icon="CogIcon"
    variant="secondary"
    @select="handleSelect"
  />
</template>
```

### Icône seule

<div class="component-demo">
  <div class="demo-section">
    <h4>Dropdown avec icône uniquement</h4>
    <div class="demo-buttons">
      <SuDropdown 
        :options="[
          { value: 'edit', label: 'Modifier', icon: 'PencilIcon' },
          { value: 'duplicate', label: 'Dupliquer', icon: 'DocumentDuplicateIcon' },
          { value: 'separator1', separator: true },
          { value: 'delete', label: 'Supprimer', icon: 'TrashIcon' }
        ]"
        :icon="'EllipsisVerticalIcon'"
        iconDisplay="only"
        aria-label="Menu des actions"
        variant="ghost"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { EllipsisVerticalIcon, PencilIcon, DocumentDuplicateIcon, TrashIcon } from '@heroicons/vue/24/outline'

const actionOptions = [
  { value: 'edit', label: 'Modifier', icon: PencilIcon },
  { value: 'duplicate', label: 'Dupliquer', icon: DocumentDuplicateIcon },
  { value: 'separator1', separator: true },
  { value: 'delete', label: 'Supprimer', icon: TrashIcon }
]
</script>

<template>
  <SuDropdown 
    :options="actionOptions"
    :icon="EllipsisVerticalIcon"
    iconDisplay="only"
    aria-label="Menu des actions"
    variant="ghost"
    @select="handleSelect"
  />
</template>
```

### Déclenchement au survol

<div class="component-demo">
  <div class="demo-section">
    <h4>Ouverture au survol</h4>
    <div class="demo-buttons">
      <SuDropdown 
        :options="[
          { value: 'all', label: 'Tous les produits', href: '/products' },
          { value: 'laptops', label: 'Ordinateurs portables', href: '/products/laptops' },
          { value: 'phones', label: 'Téléphones', href: '/products/phones' },
          { value: 'separator1', separator: true },
          { value: 'accessories', label: 'Accessoires', href: '/products/accessories' }
        ]"
        label="Produits"
        trigger="hover"
        variant="ghost"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuDropdown 
    :options="productOptions"
    label="Produits"
    trigger="hover"
    variant="ghost"
    @select="handleSelect"
  />
</template>
```

### Tailles

<div class="component-demo">
  <div class="demo-section">
    <h4>Tailles disponibles</h4>
    <div class="demo-buttons">
      <SuDropdown 
        :options="[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' }
        ]"
        label="Small"
        size="sm"
      />
      <SuDropdown 
        :options="[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' }
        ]"
        label="Medium"
        size="md"
      />
      <SuDropdown 
        :options="[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' }
        ]"
        label="Large"
        size="lg"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuDropdown size="sm" label="Small" :options="options" />
  <SuDropdown size="md" label="Medium" :options="options" />
  <SuDropdown size="lg" label="Large" :options="options" />
</template>
```

### Variantes

<div class="component-demo">
  <div class="demo-section">
    <h4>Variantes disponibles</h4>
    <div class="demo-buttons">
      <SuDropdown 
        :options="[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' }
        ]"
        label="Primary"
        variant="primary"
      />
      <SuDropdown 
        :options="[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' }
        ]"
        label="Secondary"
        variant="secondary"
      />
      <SuDropdown 
        :options="[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' }
        ]"
        label="Outline"
        variant="outline"
      />
      <SuDropdown 
        :options="[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' }
        ]"
        label="Ghost"
        variant="ghost"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuDropdown variant="primary" label="Primary" :options="options" />
  <SuDropdown variant="secondary" label="Secondary" :options="options" />
  <SuDropdown variant="outline" label="Outline" :options="options" />
  <SuDropdown variant="ghost" label="Ghost" :options="options" />
</template>
```

### Avec descriptions

<div class="component-demo">
  <div class="demo-section">
    <h4>Options avec descriptions</h4>
    <div class="demo-buttons">
      <SuDropdown 
        :options="[
          { 
            value: 'create', 
            label: 'Créer un document', 
            description: 'Nouveau document vierge',
            icon: 'PlusIcon'
          },
          { 
            value: 'template', 
            label: 'Utiliser un modèle', 
            description: 'Partir d\'un modèle existant',
            icon: 'DocumentIcon'
          },
          { value: 'separator1', separator: true },
          { 
            value: 'import', 
            label: 'Importer', 
            description: 'Importer depuis un fichier',
            icon: 'ArrowUpTrayIcon'
          }
        ]"
        label="Nouveau"
        :icon="'PlusIcon'"
        variant="primary"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { PlusIcon, DocumentIcon, ArrowUpTrayIcon } from '@heroicons/vue/24/outline'

const createOptions = [
  { 
    value: 'create', 
    label: 'Créer un document', 
    description: 'Nouveau document vierge',
    icon: PlusIcon
  },
  { 
    value: 'template', 
    label: 'Utiliser un modèle', 
    description: 'Partir d\'un modèle existant',
    icon: DocumentIcon
  },
  { value: 'separator1', separator: true },
  { 
    value: 'import', 
    label: 'Importer', 
    description: 'Importer depuis un fichier',
    icon: ArrowUpTrayIcon
  }
]
</script>

<template>
  <SuDropdown 
    :options="createOptions"
    label="Nouveau"
    :icon="PlusIcon"
    variant="primary"
    @select="handleSelect"
  />
</template>
```

### États

<div class="component-demo">
  <div class="demo-section">
    <h4>États du dropdown</h4>
    <div class="demo-buttons">
      <SuDropdown 
        :options="[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' }
        ]"
        label="Normal"
        :icon="'CogIcon'"
      />
      <SuDropdown 
        :options="[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' }
        ]"
        label="Chargement..."
        :icon="'CogIcon'"
        :loading="true"
      />
      <SuDropdown 
        :options="[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' }
        ]"
        label="Désactivé"
        :icon="'CogIcon'"
        :disabled="true"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuDropdown label="Normal" :options="options" />
  <SuDropdown label="Chargement..." :options="options" :loading="true" />
  <SuDropdown label="Désactivé" :options="options" :disabled="true" />
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `DropdownOption[]` | `[]` | Liste des options du dropdown |
| `trigger` | `'click' \| 'hover'` | `'click'` | Déclencheur d'ouverture |
| `placement` | `'bottom-start' \| 'bottom-end' \| 'top-start' \| 'top-end' \| 'left-start' \| 'left-end' \| 'right-start' \| 'right-end'` | `'bottom-start'` | Position du menu |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du bouton |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'outline'` | Variante du bouton |
| `disabled` | `boolean` | `false` | Désactive le dropdown |
| `loading` | `boolean` | `false` | État de chargement |
| `icon` | `Component` | `undefined` | Icône du bouton |
| `iconDisplay` | `'left' \| 'right' \| 'only'` | `'left'` | Position de l'icône |
| `label` | `string` | `undefined` | Label du bouton |
| `closeOnSelect` | `boolean` | `true` | Fermer après sélection |
| `maxHeight` | `string` | `'300px'` | Hauteur maximale du menu |

### Types d'options

#### DropdownOption
```typescript
interface DropdownOption {
  value: string | number
  label: string
  href?: string                    // Si présent, l'option devient un lien
  target?: '_blank' | '_self' | '_parent' | '_top'
  rel?: string
  disabled?: boolean
  icon?: Component
  description?: string
  separator?: boolean              // Si true, affiche un séparateur
}
```

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
| `@select` | `(option: DropdownOption) => void` | Émis lors de la sélection d'une option |
| `@open` | `() => void` | Émis à l'ouverture du menu |
| `@close` | `() => void` | Émis à la fermeture du menu |
| `@focus` | `(event: FocusEvent) => void` | Émis lors du focus sur le bouton |
| `@blur` | `(event: FocusEvent) => void` | Émis lors de la perte de focus |

### Méthodes exposées

| Méthode | Type | Description |
|---------|------|-------------|
| `focus()` | `() => void` | Donne le focus au bouton |
| `open()` | `() => void` | Ouvre le menu |
| `close()` | `() => void` | Ferme le menu |
| `dropdownRef` | `Ref<HTMLDivElement>` | Référence au conteneur |
| `triggerRef` | `Ref<HTMLButtonElement>` | Référence au bouton |

## Différence entre liens et actions

Le composant Dropdown gère automatiquement deux types d'options :

### 🔗 Options avec liens (href)

Les options avec une propriété `href` deviennent des liens :
- Navigation automatique vers l'URL
- Support des liens externes avec `target="_blank"`
- Attributs de sécurité automatiques (`rel="noopener noreferrer"`)
- Icône externe automatique pour les liens externes

```vue
<!-- Option lien interne -->
{ value: 'docs', label: 'Documentation', href: '/docs' }

<!-- Option lien externe -->
{ value: 'github', label: 'GitHub', href: 'https://github.com', target: '_blank' }
```

### ⚡ Options avec actions

Les options sans `href` déclenchent l'événement `@select` :
- Émission de l'événement avec l'option complète
- Fermeture automatique du menu (si `closeOnSelect` est true)
- Gestion personnalisée dans le composant parent

```vue
<!-- Option action -->
{ value: 'delete', label: 'Supprimer', icon: TrashIcon }

<SuDropdown @select="handleAction" />

<script setup>
const handleAction = (option) => {
  if (option.value === 'delete') {
    // Logique de suppression
  }
}
</script>
```

## Séparateurs

Les séparateurs permettent de grouper visuellement les options :

```vue
const options = [
  { value: 'edit', label: 'Modifier' },
  { value: 'duplicate', label: 'Dupliquer' },
  { value: 'separator1', separator: true }, // Séparateur
  { value: 'delete', label: 'Supprimer' }
]
```

## Positionnement

Le dropdown supporte 8 positions différentes :

### 📍 Positions disponibles

- **Bottom** : `bottom-start`, `bottom-end`
- **Top** : `top-start`, `top-end`
- **Left** : `left-start`, `left-end`
- **Right** : `right-start`, `right-end`

```vue
<!-- Menu qui s'ouvre en bas à gauche -->
<SuDropdown placement="bottom-start" />

<!-- Menu qui s'ouvre en haut à droite -->
<SuDropdown placement="top-end" />
```

## Accessibilité

Le composant Dropdown respecte les normes WCAG 2.1 AA :

### ✅ Fonctionnalités d'accessibilité

- **Motif « bouton de menu » (WAI-ARIA)** : bouton avec `aria-haspopup="menu"`, menu `role="menu"` nommé par le bouton, items `role="menuitem"`
- **Focus mobile (roving)** : un seul item à la fois reçoit le focus ; les flèches le déplacent en boucle, les items désactivés sont sautés
- **Saisie rapide** : taper une lettre amène le focus sur l'item suivant qui commence par elle
- **Fermeture** : Échap (focus rendu au bouton), appui à l'extérieur ou focus qui quitte le menu ; Tab sort du menu vers l'élément suivant de la page
- **États ARIA** : `aria-expanded`, `aria-haspopup`, `aria-controls`
- **Labels accessibles** : Support d'`aria-label` et `aria-describedby`
- **Focus visible** : Indicateurs de focus clairs et contrastés
- **Contraste des couleurs** : Ratios conformes WCAG AA
- **Tailles minimales** : Respecte les tailles minimales de cible tactile
- **Mode sombre** : Contraste adapté automatiquement
- **Contraste élevé** : Support de `prefers-contrast: high`
- **Réduction d'animation** : Respect de `prefers-reduced-motion`

### 🎯 Bonnes pratiques

```vue
<!-- Dropdown avec label accessible -->
<SuDropdown 
  :options="options"
  label="Menu des actions"
  aria-label="Menu des actions disponibles"
  @select="handleSelect"
/>

<!-- Dropdown avec icône seule (OBLIGATOIRE: aria-label) -->
<SuDropdown 
  :options="options"
  :icon="EllipsisVerticalIcon"
  iconDisplay="only"
  aria-label="Menu des options"
  @select="handleSelect"
/>

<!-- Dropdown avec description -->
<SuDropdown 
  :options="options"
  label="Actions"
  aria-describedby="actions-help"
  @select="handleSelect"
/>
<div id="actions-help">Menu des actions disponibles pour cet élément</div>
```

## Navigation au clavier

| Touche | Action |
|--------|--------|
| `Entrée` / `Espace` | Sur le bouton : ouvrir le menu sur le premier item. Sur un item : l'activer |
| `Flèche bas` | Sur le bouton : ouvrir le menu sur le premier item. Dans le menu : item suivant (en boucle) |
| `Flèche haut` | Sur le bouton : ouvrir le menu sur le dernier item. Dans le menu : item précédent (en boucle) |
| `Début` / `Fin` | Premier / dernier item |
| `A-Z` | Saisie rapide : item suivant qui commence par ces lettres |
| `Échap` | Fermer le menu, focus rendu au bouton |
| `Tab` | Fermer le menu et passer à l'élément suivant de la page |

## Exemples d'usage avancés

### Menu de navigation

```vue
<script setup>
const navigationOptions = [
  { value: 'all', label: 'Tous les produits', href: '/products' },
  { value: 'laptops', label: 'Ordinateurs portables', href: '/products/laptops' },
  { value: 'phones', label: 'Téléphones', href: '/products/phones' },
  { value: 'tablets', label: 'Tablettes', href: '/products/tablets' },
  { value: 'separator1', separator: true },
  { value: 'accessories', label: 'Accessoires', href: '/products/accessories' },
  { value: 'support', label: 'Support', href: '/support' }
]
</script>

<template>
  <nav>
    <div class="navbar">
      <h1>surgeUI</h1>
      
      <div class="nav-links">
        <a href="/">Accueil</a>
        
        <SuDropdown 
          :options="navigationOptions"
          label="Produits"
          variant="ghost"
          trigger="hover"
        />
        
        <a href="/about">À propos</a>
      </div>
    </div>
  </nav>
</template>
```

### Menu utilisateur complet

```vue
<script setup>
import { ref } from 'vue'
import { UserIcon, CogIcon, DocumentIcon, ArrowUturnLeftIcon } from '@heroicons/vue/24/outline'

const user = ref({
  name: 'John Doe',
  email: 'john@example.com',
  avatar: '/avatar.jpg'
})

const userMenuOptions = [
  { value: 'profile', label: 'Mon profil', href: '/profile', icon: UserIcon },
  { value: 'settings', label: 'Paramètres', href: '/settings', icon: CogIcon },
  { value: 'separator1', separator: true },
  { value: 'docs', label: 'Documentation', href: '/docs', icon: DocumentIcon },
  { value: 'help', label: 'Centre d\'aide', href: 'https://help.example.com', target: '_blank', icon: DocumentIcon },
  { value: 'separator2', separator: true },
  { value: 'logout', label: 'Déconnexion', icon: ArrowUturnLeftIcon }
]

const handleUserAction = (option) => {
  if (option.value === 'logout') {
    // Logique de déconnexion
    console.log('Déconnexion...')
    // Redirection ou nettoyage de session
  }
  // Les autres options avec href naviguent automatiquement
}
</script>

<template>
  <div class="user-menu">
    <div class="user-info">
      <img :src="user.avatar" :alt="user.name" class="user-avatar" />
      <div class="user-details">
        <div class="user-name">{{ user.name }}</div>
        <div class="user-email">{{ user.email }}</div>
      </div>
    </div>
    
    <SuDropdown 
      :options="userMenuOptions"
      :icon="UserIcon"
      iconDisplay="only"
      aria-label="Menu utilisateur"
      variant="ghost"
      placement="bottom-end"
      @select="handleUserAction"
    />
  </div>
</template>
```

### Menu contextuel

```vue
<script setup>
import { ref } from 'vue'
import { PencilIcon, DocumentDuplicateIcon, ShareIcon, TrashIcon } from '@heroicons/vue/24/outline'

const selectedItem = ref(null)

const contextMenuOptions = [
  { value: 'edit', label: 'Modifier', icon: PencilIcon },
  { value: 'duplicate', label: 'Dupliquer', icon: DocumentDuplicateIcon },
  { value: 'separator1', separator: true },
  { value: 'share', label: 'Partager', icon: ShareIcon },
  { value: 'separator2', separator: true },
  { value: 'delete', label: 'Supprimer', icon: TrashIcon }
]

const handleContextAction = (option) => {
  switch (option.value) {
    case 'edit':
      console.log('Modifier l\'élément')
      break
    case 'duplicate':
      console.log('Dupliquer l\'élément')
      break
    case 'share':
      console.log('Partager l\'élément')
      break
    case 'delete':
      if (confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
        console.log('Supprimer l\'élément')
      }
      break
  }
}
</script>

<template>
  <div class="item-card">
    <div class="item-content">
      <h3>Document important</h3>
      <p>Description du document...</p>
    </div>
    
    <SuDropdown 
      :options="contextMenuOptions"
      :icon="EllipsisVerticalIcon"
      iconDisplay="only"
      aria-label="Actions pour ce document"
      variant="ghost"
      placement="bottom-end"
      @select="handleContextAction"
    />
  </div>
</template>
```

### Dropdown avec options désactivées

```vue
<script setup>
const fileMenuOptions = [
  { value: 'new', label: 'Nouveau', icon: PlusIcon },
  { value: 'open', label: 'Ouvrir', icon: DocumentIcon },
  { value: 'separator1', separator: true },
  { value: 'save', label: 'Sauvegarder', icon: DocumentIcon, disabled: true },
  { value: 'save-as', label: 'Sauvegarder sous...', icon: DocumentIcon },
  { value: 'separator2', separator: true },
  { value: 'print', label: 'Imprimer', icon: DocumentIcon, disabled: true }
]
</script>

<template>
  <SuDropdown 
    :options="fileMenuOptions"
    label="Fichier"
    variant="outline"
    @select="handleFileAction"
  />
</template>
```

## Cas d'usage courants

### 🎯 Menus d'actions
- **CRUD** : Créer, modifier, supprimer
- **Fichiers** : Nouveau, ouvrir, sauvegarder
- **Partage** : Copier le lien, partager, exporter

### 👤 Menus utilisateur
- **Profil** : Mon profil, paramètres
- **Navigation** : Tableau de bord, projets
- **Système** : Aide, déconnexion

### 📱 Navigation mobile
- **Menu hamburger** : Navigation principale
- **Actions contextuelles** : Actions spécifiques à un élément
- **Filtres** : Options de tri et filtrage

### 🔧 Menus d'outils
- **Éditeur** : Formatage, insertion, outils
- **Tableau de bord** : Vues, exports, paramètres
- **Administration** : Gestion, configuration

## Bonnes pratiques

### ✅ À faire
- Utiliser des icônes cohérentes pour les actions similaires
- Grouper les options logiquement avec des séparateurs
- Fournir un `aria-label` pour les dropdowns avec icône seule
- Utiliser `trigger="hover"` pour la navigation principale
- Limiter le nombre d'options (max 10-12 pour l'UX)

### ❌ À éviter
- Imbriquer des dropdowns (utiliser des sous-menus si nécessaire)
- Mélanger trop d'actions et de liens dans le même menu
- Oublier les séparateurs pour les groupes logiques
- Utiliser des descriptions trop longues
- Placer des actions destructives sans confirmation

## Performance

### 🚀 Optimisations intégrées
- **Lazy rendering** : Le menu n'est rendu que quand ouvert
- **Focus trap** : Gestion efficace du focus
- **Event listeners** : Ajout/suppression automatique
- **Transitions CSS** : Animations hardware-accelerated

### 📊 Impact minimal
- **CSS généré** : ~3KB gzippé
- **JavaScript** : Logique légère et optimisée
- **Accessibilité** : Aucun compromis sur les performances
- **Responsive** : Adaptation automatique sur mobile