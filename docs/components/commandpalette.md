<script setup>
import { ref } from 'vue'
import { Cog6ToothIcon, DocumentPlusIcon, HomeIcon, MoonIcon } from '@heroicons/vue/24/outline'

const open = ref(false)
const last = ref('—')
const commands = [
  { id: 'home', label: 'Aller à l\'accueil', group: 'Navigation', icon: HomeIcon, onSelect: () => (last.value = 'Accueil') },
  { id: 'settings', label: 'Paramètres', group: 'Navigation', icon: Cog6ToothIcon, keywords: ['préférences', 'compte'], onSelect: () => (last.value = 'Paramètres') },
  { id: 'new', label: 'Nouveau document', group: 'Actions', icon: DocumentPlusIcon, shortcut: ['Ctrl', 'N'], onSelect: () => (last.value = 'Nouveau document') },
  { id: 'theme', label: 'Basculer en thème sombre', group: 'Préférences', icon: MoonIcon, keywords: ['nuit'], onSelect: () => (last.value = 'Thème') }
]
</script>

# CommandPalette

Recherche et exécution de commandes au clavier, ouverte par `Ctrl` + `K` (`⌘` + `K` sur Mac) : navigation, actions, préférences.

## Exemples d'utilisation

### Utilisation de base

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons">
      <SuButton variant="outline" @click="open = true">Ouvrir la palette</SuButton>
      <SuKbd :keys="['Ctrl', 'K']" />
    </div>
    <p>Dernière commande : {{ last }}</p>
    <SuCommandPalette v-model:open="open" :commands="commands" :hotkey="false" />
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Cog6ToothIcon, DocumentPlusIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const open = ref(false)
const commands = [
  { id: 'settings', label: 'Paramètres', group: 'Navigation', icon: Cog6ToothIcon,
    keywords: ['préférences', 'compte'], onSelect: () => router.push('/settings') },
  { id: 'new', label: 'Nouveau document', group: 'Actions', icon: DocumentPlusIcon,
    shortcut: ['Ctrl', 'N'], onSelect: createDocument }
]
</script>

<template>
  <!-- Une fois dans l'application : Ctrl / ⌘ + K l'ouvre -->
  <SuCommandPalette v-model:open="open" :commands="commands" />
</template>
```

La démo de cette page désactive le raccourci (`:hotkey="false"`) pour ne pas gêner la recherche de la documentation.

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `open` | `boolean` | `false` | Ouverture (`v-model:open`) |
| `commands` | `CommandItem[]` | `[]` | Commandes |
| `placeholder` | `string` | `'Rechercher une commande…'` | Texte du champ |
| `hotkey` | `string \| false` | `'k'` | Touche du raccourci avec `Ctrl` / `⌘` ; `false` : aucun |
| `emptyText` | `string` | `'Aucun résultat'` | Texte sans résultat |
| `ariaLabel` | `string` | `'Palette de commandes'` | Nom du dialog et de la liste |

### CommandItem

| Propriété | Type | Description |
|-----------|------|-------------|
| `id` | `string` | Identifiant |
| `label` | `string` | Libellé |
| `group` | `string` | Groupe d'affichage |
| `description` | `string` | Texte secondaire (aussi recherché) |
| `icon` | `Component` | Icône |
| `shortcut` | `string[]` | Raccourci affiché (`SuKbd`) |
| `keywords` | `string[]` | Termes de recherche supplémentaires |
| `disabled` | `boolean` | Commande indisponible |
| `onSelect` | `() => void` | Action, appelée après la fermeture |

### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `update:open` | `boolean` | Ouverture ou fermeture |
| `select` | `CommandItem` | Commande exécutée |

## Accessibilité

- `SuDialog` modal natif nommé « Palette de commandes » ; le focus va dans le champ de recherche et revient au déclencheur à la fermeture.
- Champ `role="combobox"` relié à une liste `role="listbox"` dont les groupes (`role="group"`) sont nommés.
- Le focus reste dans le champ : `↑` / `↓` parcourent les résultats (`aria-activedescendant`, commandes indisponibles sautées), `Entrée` exécute, `Échap` ferme.
- Recherche sans accents ni casse ; résultats triés (début du libellé, libellé, puis description et mots-clés). Le nombre de résultats est annoncé.
