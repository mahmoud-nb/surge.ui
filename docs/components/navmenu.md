<script setup>
import { ref } from 'vue'
import { HomeIcon, InboxIcon, FolderIcon, UsersIcon, CreditCardIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline'

const items = [
  { label: 'Tableau de bord', value: 'dashboard', icon: HomeIcon },
  { label: 'Messages', value: 'inbox', icon: InboxIcon, badge: 4, badgeVariant: 'primary', badgeLabel: '4 messages non lus' },
  {
    type: 'group',
    label: 'Espace de travail',
    items: [
      {
        label: 'Projets',
        icon: FolderIcon,
        items: [
          { label: 'En cours', value: 'projects-active' },
          { label: 'Archivés', value: 'projects-archived' }
        ]
      },
      { label: 'Équipe', value: 'team', icon: UsersIcon }
    ]
  },
  {
    type: 'group',
    label: 'Compte',
    items: [
      { label: 'Facturation', value: 'billing', icon: CreditCardIcon, disabled: true },
      { label: 'Réglages', value: 'settings', icon: Cog6ToothIcon }
    ]
  }
]

const active = ref('dashboard')
const collapsed = ref(true)
</script>

# NavMenu

Navigation latérale d'une application : groupes titrés, icônes, compteurs, un niveau de sous-éléments dépliables, élément actif selon la route, mode réduit en icônes. À placer dans la barre latérale de [AppShell](/components/appshell).

## Exemples d'utilisation

### Utilisation de base

<div class="component-demo">
  <div class="demo-section">
    <div style="inline-size: 16rem;">
      <SuNavMenu v-model="active" :items="items" />
    </div>
  </div>
</div>

```vue
<script setup>
import { HomeIcon, InboxIcon, FolderIcon } from '@heroicons/vue/24/outline'

const items = [
  { label: 'Tableau de bord', to: '/', icon: HomeIcon },
  { label: 'Messages', to: '/messages', icon: InboxIcon, badge: 4, badgeLabel: '4 messages non lus' },
  {
    type: 'group',
    label: 'Espace de travail',
    items: [
      {
        label: 'Projets',
        icon: FolderIcon,
        items: [
          { label: 'En cours', to: '/projets' },
          { label: 'Archivés', to: '/projets/archives' }
        ]
      }
    ]
  }
]
</script>

<template>
  <SuNavMenu :items="items" />
</template>
```

### Élément actif

L'élément actif porte `aria-current="page"`. Il est déterminé, dans cet ordre :

1. par la propriété `active` de l'élément ;
2. par le `v-model`, comparé à la `value` des éléments (navigation gérée par l'application) ;
3. par la route courante de Vue Router (ou de Nuxt), comparée au `to` des éléments.

`match="prefix"` rend un élément actif sur toutes les pages de sa section : `/projets` reste actif sur `/projets/42`. Le parent de l'élément actif s'ouvre tout seul.

```vue
<SuNavMenu :items="items" match="prefix" />
```

### Réduit en icônes

<div class="component-demo">
  <div class="demo-section">
    <div :style="{ inlineSize: collapsed ? '4rem' : '16rem' }">
      <SuNavMenu v-model="active" v-model:collapsed="collapsed" :items="items" />
    </div>
  </div>
</div>

```vue
<SuNavMenu v-model:collapsed="collapsed" :items="items" />
```

Les libellés restent lus par les lecteurs d'écran et s'affichent dans une infobulle au survol et au focus. Un élément sans icône montre son initiale. Un parent déplie le menu (`update:collapsed`) et s'ouvre.

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `items` | `NavMenuEntry[]` | - | Éléments et groupes |
| `v-model` | `string \| number` | - | Élément actif (`value`) |
| `v-model:collapsed` | `boolean` | `false` | Icônes seules |
| `match` | `'exact' \| 'prefix'` | `'exact'` | Comparaison avec la route courante |
| `label` | `string` | `'Navigation principale'` | Nom de la navigation |

### NavMenuItem

| Propriété | Type | Description |
|-----------|------|-------------|
| `label` | `string` | Libellé |
| `value` | `string \| number` | Identifiant (`v-model`) |
| `to` | `string \| RouteLocationRaw` | Lien du routeur (RouterLink ou `linkComponent` du plugin) |
| `href` | `string` | Lien |
| `target`, `rel` | `string` | Cible et relation du lien |
| `icon` | `Component` | Icône |
| `badge` | `string \| number` | Compteur ou courte étiquette |
| `badgeVariant` | `BadgeVariant` | Variante du compteur |
| `badgeLabel` | `string` | Texte lu à la place du compteur (« 4 messages non lus ») |
| `active` | `boolean` | Force l'état actif |
| `disabled` | `boolean` | Désactivé : ni lien ni sélection |
| `items` | `NavMenuItem[]` | Sous-éléments : l'élément devient un bouton qui les déplie |
| `defaultOpen` | `boolean` | Sous-éléments dépliés au premier rendu |

Un groupe s'écrit `{ type: 'group', label, items }`. Sans lien (`to`, `href`), un élément est un bouton : la navigation passe alors par le `v-model` ou l'événement `select`.

### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `select` | `(item: NavMenuItem, event: MouseEvent)` | Élément choisi |
| `update:modelValue` | `string \| number` | Élément actif |
| `update:collapsed` | `boolean` | Un parent a été choisi en mode réduit |

## Accessibilité

- Motif « disclosure navigation » : un repère `<nav>` nommé, des listes de liens. Pas de `role="menu"` : ce sont des liens de navigation, pas des actions.
- Chaque groupe est une liste nommée par son titre (`aria-labelledby`).
- Un parent est un bouton `aria-expanded` relié à sa sous-liste (`aria-controls`) ; <kbd>Entrée</kbd> ou <kbd>Espace</kbd> le déplie, <kbd>Tab</kbd> parcourt les liens.
- `badgeLabel` remplace le compteur pour les lecteurs d'écran : « 4 messages non lus » plutôt que « 4 ».
- Mode réduit : le libellé reste dans le lien (masqué visuellement) ; l'infobulle est visuelle et ne répète pas le nom.
