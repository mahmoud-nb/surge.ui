<script setup>
import { ref } from 'vue'
import { DocumentIcon, FolderIcon } from '@heroicons/vue/24/outline'

const files = [
  {
    id: 'src', label: 'src', icon: FolderIcon,
    children: [
      { id: 'components', label: 'components', icon: FolderIcon, children: [
        { id: 'button', label: 'Button.vue', icon: DocumentIcon },
        { id: 'dialog', label: 'Dialog.vue', icon: DocumentIcon }
      ] },
      { id: 'index', label: 'index.ts', icon: DocumentIcon }
    ]
  },
  { id: 'docs', label: 'docs', icon: FolderIcon, children: [{ id: 'guide', label: 'guide.md', icon: DocumentIcon }] },
  { id: 'package', label: 'package.json', icon: DocumentIcon }
]
const expanded = ref(['src'])
const selected = ref('index')
</script>

# TreeView

Arborescence : fichiers, catégories, organigramme. Les éléments se déplient, se parcourent au clavier et peuvent être choisis.

## Exemples d'utilisation

### Utilisation de base

<div class="component-demo">
  <div class="demo-section">
    <div style="max-width: 18rem">
      <SuTreeView v-model:expanded="expanded" v-model:selected="selected" :items="files" aria-label="Fichiers du projet" />
    </div>
    <p>Choisi : {{ selected ?? '—' }}</p>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DocumentIcon, FolderIcon } from '@heroicons/vue/24/outline'

const files = [
  { id: 'src', label: 'src', icon: FolderIcon, children: [
    { id: 'index', label: 'index.ts', icon: DocumentIcon }
  ] },
  { id: 'package', label: 'package.json', icon: DocumentIcon }
]
const expanded = ref(['src'])
const selected = ref(null)
</script>

<template>
  <SuTreeView v-model:expanded="expanded" v-model:selected="selected" :items="files" aria-label="Fichiers du projet" />
</template>
```

### Arbre de navigation

Avec `:selectable="false"`, aucun élément n'est marqué choisi : `Entrée` déplie, et l'événement `select` sert à naviguer.

```vue
<SuTreeView :items="sections" :selectable="false" aria-label="Sommaire" @select="(item) => router.push(item.id)" />
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `items` | `TreeItem[]` | `[]` | Éléments |
| `selectable` | `boolean` | `true` | Un élément peut être choisi (`aria-selected`) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille |
| `ariaLabel` / `ariaLabelledBy` | `string` | - | Nom de l'arbre (obligatoire) |

### TreeItem

| Propriété | Type | Description |
|-----------|------|-------------|
| `id` | `string \| number` | Identifiant unique |
| `label` | `string` | Libellé |
| `children` | `TreeItem[]` | Enfants |
| `icon` | `Component` | Icône |
| `disabled` | `boolean` | Élément inactif (focusable, non choisissable) |

### v-model et événements

| Nom | Payload | Description |
|-----|---------|-------------|
| `v-model:expanded` | `(string \| number)[]` | Éléments dépliés |
| `v-model:selected` | `string \| number \| null` | Élément choisi |
| `select` | `TreeItem` | Élément activé (clic, `Entrée`, `Espace`) |

## Accessibilité

- `role="tree"`, `treeitem` et `group` ; niveau (`aria-level`), position (`aria-posinset` / `aria-setsize`) et état déplié (`aria-expanded`) annoncés.
- Chaque élément est nommé par son seul libellé (`aria-labelledby`), sans le texte de ses enfants.
- Un seul arrêt de tabulation : l'élément focalisé, sinon l'élément choisi, sinon le premier.
- Clavier : `↑` / `↓` éléments visibles, `→` déplie puis va au premier enfant, `←` replie puis remonte au parent (inversés en RTL), `Début` / `Fin`, saisie rapide, `*` déplie les frères, `Entrée` / `Espace` choisit.
