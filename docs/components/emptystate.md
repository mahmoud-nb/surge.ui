<script setup>
import { FolderPlusIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
</script>

# EmptyState

Zone vide : liste sans résultat, premier usage d'une fonctionnalité, erreur de chargement. Elle explique la situation et propose l'action suivante.

## Exemples d'utilisation

### Premier usage

<div class="component-demo">
  <div class="demo-section">
    <SuEmptyState :icon="FolderPlusIcon" title="Aucun projet" description="Créez votre premier projet pour commencer à collaborer avec votre équipe." bordered>
      <SuButton>Nouveau projet</SuButton>
      <SuButton variant="outline">Importer</SuButton>
    </SuEmptyState>
  </div>
</div>

```vue
<script setup>
import { FolderPlusIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <SuEmptyState :icon="FolderPlusIcon" title="Aucun projet" description="Créez votre premier projet…" bordered>
    <SuButton>Nouveau projet</SuButton>
    <SuButton variant="outline">Importer</SuButton>
  </SuEmptyState>
</template>
```

### Aucun résultat

<div class="component-demo">
  <div class="demo-section">
    <SuEmptyState :icon="MagnifyingGlassIcon" title="Aucun résultat pour « tableau »" description="Vérifiez l'orthographe ou essayez un terme plus général." size="sm">
      <SuButton variant="ghost">Effacer la recherche</SuButton>
    </SuEmptyState>
  </div>
</div>

```vue
<SuEmptyState :icon="MagnifyingGlassIcon" title="Aucun résultat pour « tableau »" size="sm">
  <SuButton variant="ghost">Effacer la recherche</SuButton>
</SuEmptyState>
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `title` | `string` | - | Titre (ou slot `title`) |
| `description` | `string` | - | Explication (ou slot `description`) |
| `icon` | `Component` | - | Icône (ou slot `media` pour une illustration) |
| `headingLevel` | `2 \| 3 \| 4 \| 5 \| 6` | `3` | Niveau du titre dans la page |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille |
| `bordered` | `boolean` | `false` | Cadre en pointillés |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Actions (boutons, liens) |
| `media` | Illustration à la place de l'icône |
| `title` / `description` | Contenu riche du titre et de l'explication |

## Accessibilité

- Le titre est un vrai titre (`h2` à `h6`) : choisissez `headingLevel` selon la hiérarchie de la page.
- L'icône et l'illustration sont décoratives (`aria-hidden`).
- Si la zone vide apparaît après une recherche, annoncez le résultat (`useAnnouncer`) : le changement n'est pas lu de lui-même.
