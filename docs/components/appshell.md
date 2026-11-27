# AppShell

Coquille d'une application : barre latérale, barre du haut, contenu principal, pied de page et lien d'évitement. Sur grand écran, la barre latérale est fixe et peut se réduire en icônes ; en dessous du point de rupture, elle s'ouvre dans un tiroir depuis le bouton menu.

`SuAppShell` occupe toute la page : ses points de rupture suivent la largeur de l'écran, pas celle d'un conteneur.

## Exemples d'utilisation

### Utilisation de base

```vue
<script setup>
import { ref } from 'vue'
import { HomeIcon, InboxIcon, FolderIcon } from '@heroicons/vue/24/outline'

const collapsed = ref(false)
const items = [
  { label: 'Tableau de bord', to: '/', icon: HomeIcon },
  { label: 'Messages', to: '/messages', icon: InboxIcon, badge: 4, badgeLabel: '4 messages non lus' },
  { label: 'Projets', to: '/projets', icon: FolderIcon }
]
</script>

<template>
  <SuAppShell v-model:collapsed="collapsed" collapsible>
    <template #brand="{ collapsed }">
      <img src="/logo.svg" alt="Surge" :width="collapsed ? 24 : 96" />
    </template>

    <template #header>
      <SuThemeToggle />
      <SuAvatar name="Camille Martin" size="sm" />
    </template>

    <template #sidebar="{ collapsed }">
      <SuNavMenu :items="items" match="prefix" :collapsed="collapsed" @update:collapsed="collapsed = $event" />
    </template>

    <SuPageHeader title="Tableau de bord" />
    <RouterView />

    <template #footer>© 2026 Surge</template>
  </SuAppShell>
</template>
```

La démonstration complète, avec un tiroir sur petit écran, est dans [Storybook](https://surgeui.com/storybook/?path=/story/templates-appshell--default).

### Tiroir sur petit écran

Sous le point de rupture (`breakpoint`, `lg` par défaut), la barre latérale disparaît et la barre du haut affiche un bouton menu. Il ouvre la navigation dans un tiroir modal (`SuDialog`) : focus piégé, <kbd>Échap</kbd> pour fermer, focus rendu au bouton. Un lien suivi dans le tiroir le ferme.

```vue
<SuAppShell v-model:open="menuOpen" breakpoint="md">…</SuAppShell>
```

### Barre latérale réduite

Avec `collapsible`, un bouton en bas de la barre latérale la réduit en icônes (`v-model:collapsed`). Passez `collapsed` au slot `sidebar` pour réduire `SuNavMenu` en même temps, et au slot `brand` pour un logo compact.

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `v-model:collapsed` | `boolean` | `false` | Barre latérale réduite en icônes (grand écran) |
| `v-model:open` | `boolean` | `false` | Tiroir ouvert (petit écran) |
| `breakpoint` | `'md' \| 'lg' \| 'xl'` | `'lg'` | En dessous, la barre latérale devient un tiroir |
| `sidebarWidth` | `string` | `'16rem'` | Largeur de la barre latérale |
| `collapsedWidth` | `string` | `'4.5rem'` | Largeur réduite |
| `collapsible` | `boolean` | `false` | Bouton qui réduit la barre latérale |
| `stickyHeader` | `boolean` | `true` | Barre du haut collante |
| `skipLink` | `boolean` | `true` | Lien d'évitement vers le contenu principal |
| `skipLinkLabel` | `string` | `'Aller au contenu principal'` | Texte du lien d'évitement |
| `menuLabel` | `string` | `'Ouvrir le menu'` | Nom du bouton menu |
| `drawerLabel` | `string` | `'Menu'` | Nom du tiroir |
| `collapseLabel` | `string` | `'Réduire le menu'` | Nom du bouton de réduction |

### Slots

| Slot | Props | Description |
|------|-------|-------------|
| `brand` | `{ collapsed }` | Logo, nom de l'application (barre latérale, barre du haut sur petit écran, tiroir) |
| `header` | `{ openMenu }` | Barre du haut : recherche, actions, compte |
| `sidebar` | `{ collapsed, close }` | Navigation (`SuNavMenu`) |
| `sidebar-footer` | `{ collapsed }` | Bas de la barre latérale : compte, réglages |
| `default` | - | Contenu principal |
| `footer` | - | Pied de page |

## Accessibilité

- Repères : `<header>` (bannière), `<main>`, `<footer>` (informations) ; la navigation (`<nav>`) vient de `SuNavMenu`.
- Lien d'évitement intégré ([SkipLink](/components/skiplink)) : il donne le focus au `<main>`.
- Bouton menu nommé, `aria-expanded` et `aria-haspopup="dialog"` ; le tiroir est un dialog modal nommé « Menu ».
- Bouton de réduction : bouton bascule « Réduire le menu » (`aria-pressed`), sa flèche se retourne en RTL.
- La barre latérale est en début de ligne : à droite en RTL.
