# Collapse

Le composant Collapse affiche du contenu en sections repliables. Chaque section peut être ouverte ou fermée indépendamment. Il supporte la navigation clavier complète, les slots personnalisés pour les en-têtes et panneaux, ainsi qu'une configuration multi-ouverture.

## Exemples d'utilisation

### Utilisation de base

<div class="component-demo">
  <div class="demo-section">
    <h4>Sections repliables simples</h4>
    <SuCollapse :items="[
      { id: 'a', title: 'Section 1', content: 'Contenu de la première section.' },
      { id: 'b', title: 'Section 2', content: 'Contenu de la deuxième section.' },
      { id: 'c', title: 'Section 3', content: 'Contenu de la troisième section.' }
    ]" />
  </div>
</div>

```vue
<template>
  <SuCollapse :items="items" />
</template>

<script setup lang="ts">
const items = [
  { id: 'a', title: 'Section 1', content: 'Contenu de la première section.' },
  { id: 'b', title: 'Section 2', content: 'Contenu de la deuxième section.' },
  { id: 'c', title: 'Section 3', content: 'Contenu de la troisième section.' },
]
</script>
```

### Ouverture multiple

Par défaut, l'ouverture d'une section ferme la précédente. Activez `multiple` pour permettre d'ouvrir plusieurs sections simultanément.

```vue
<template>
  <SuCollapse :items="items" multiple />
</template>

<script setup lang="ts">
const items = [
  { id: 'a', title: 'Item 1', content: 'Contenu de l\'item 1.' },
  { id: 'b', title: 'Item 2', content: 'Contenu de l\'item 2.' },
  { id: 'c', title: 'Item 3', content: 'Contenu de l\'item 3.' },
]
</script>
```

### Section désactivée

Ajoutez `disabled: true` à un item pour le rendre non interactif.

```vue
<template>
  <SuCollapse :items="items" />
</template>

<script setup lang="ts">
const items = [
  { id: 'a', title: 'Section active', content: 'Contenu accessible.' },
  { id: 'b', title: 'Section désactivée', content: 'Non accessible.', disabled: true },
  { id: 'c', title: 'Autre section active', content: 'Contenu accessible.' },
]
</script>
```

### En-tête personnalisé avec slot

Le slot `#header` permet de personnaliser le contenu de chaque en-tête — icônes, badges, mise en forme avancée.

```vue
<template>
  <SuCollapse :items="items">
    <template #header="{ item }">
      <div style="display: flex; align-items: center; gap: 8px; flex-grow: 1;">
        <component v-if="item.icon" :is="item.icon" style="width: 16px; height: 16px;" />
        <span>{{ item.title }}</span>
        <SuBadge v-if="item.badge" type="info">{{ item.badge }}</SuBadge>
      </div>
    </template>
  </SuCollapse>
</template>

<script setup lang="ts">
import { AtSymbolIcon, UserIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

const items = [
  { id: 'a', title: 'Email', content: 'Contenu email.', icon: AtSymbolIcon },
  { id: 'b', title: 'Profil', content: 'Contenu profil.', icon: UserIcon, badge: 5 },
  { id: 'c', title: 'Recherche', content: 'Contenu recherche.', icon: MagnifyingGlassIcon },
]
</script>
```

### Panneau personnalisé avec slot

Le slot `#panel` permet de remplacer le rendu par défaut du contenu de chaque section.

```vue
<template>
  <SuCollapse :items="items" multiple>
    <template #panel="{ item }">
      <article style="padding: 1rem;">
        <h3>{{ item.title }}</h3>
        <p>{{ item.content }}</p>
        <SuButton size="sm">En savoir plus</SuButton>
      </article>
    </template>
  </SuCollapse>
</template>

<script setup lang="ts">
const items = [
  { id: 'a', title: 'Vue 3', content: 'Framework JavaScript progressif.' },
  { id: 'b', title: 'TypeScript', content: 'Surcouche typée de JavaScript.' },
]
</script>
```

### Support RTL

```vue
<template>
  <div dir="rtl">
    <SuCollapse :items="items" />
  </div>
</template>

<script setup lang="ts">
const items = [
  { id: 'a', title: 'القسم 1', content: 'محتوى القسم الأول' },
  { id: 'b', title: 'القسم 2', content: 'محتوى القسم الثاني' },
]
</script>
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `items` | `CollapseItem[]` | `[]` | Liste des sections à afficher |
| `multiple` | `boolean` | `false` | Si `true`, plusieurs sections peuvent être ouvertes simultanément |

### Interface CollapseItem

```typescript
interface CollapseItem {
  id?: string       // Identifiant unique (généré automatiquement si absent)
  title: string     // Titre affiché dans l'en-tête
  content: string   // Contenu textuel par défaut (utilisé sans slot #panel)
  icon?: Component  // Composant icône (ex. HeroIcon) — à utiliser via le slot #header
  badge?: number    // Valeur de badge — à utiliser via le slot #header
  disabled?: boolean // Si true, la section est non interactive
}
```

### Slots

| Slot | Props exposées | Description |
|------|---------------|-------------|
| `#header` | `{ item: CollapseItem, index: number }` | Remplace le contenu de l'en-tête de chaque section |
| `#panel` | `{ item: CollapseItem, index: number }` | Remplace le contenu du panneau de chaque section |
| `default` | — | Affiché si `items` est vide ou non fourni |

### Navigation clavier

| Touche | Action |
|--------|--------|
| `Enter` / `Espace` | Ouvre ou ferme la section focalisée |
| `ArrowDown` | Déplace le focus vers l'en-tête suivant |
| `ArrowUp` | Déplace le focus vers l'en-tête précédent |
| `Home` | Déplace le focus vers le premier en-tête |
| `End` | Déplace le focus vers le dernier en-tête |

## Accessibilité

Le composant Collapse est conforme aux normes WCAG 2.1 niveau AA et suit le pattern WAI-ARIA *Accordion*.

- **Structure sémantique** : chaque section est encapsulée dans un `<h3>` + `<button>` pour une hiérarchie correcte et une navigation efficace au lecteur d'écran.
- **`aria-expanded`** : indique l'état ouvert/fermé de chaque section au lecteur d'écran.
- **`aria-controls`** : lie le bouton d'en-tête à son panneau de contenu.
- **`aria-labelledby`** : lie le panneau à son bouton d'en-tête.
- **Section désactivée** : l'attribut `disabled` sur le bouton est reconnu nativement par les technologies d'assistance.
- **Navigation clavier complète** : toutes les touches du pattern ARIA Accordion sont implémentées (voir tableau ci-dessus).
- **Focus visible** : les éléments focusables affichent un contour conforme aux standards d'accessibilité.
- **Mode contraste élevé** : le composant s'adapte automatiquement en mode contraste élevé.
- **Support RTL** : le chevron s'inverse automatiquement en mode écriture droite à gauche.
