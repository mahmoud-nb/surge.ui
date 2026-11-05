<script setup>
import { ref } from 'vue'

const filters = ref(['Paris', 'Moins de 500 €', 'Livraison gratuite'])
</script>

# Tag

Étiquette : filtre actif, mot-clé, valeur choisie. Elle peut avoir une icône et un bouton de retrait.

Pour un simple indicateur (statut, compteur), utilisez [Badge](/components/badge).

## Exemples d'utilisation

### Variantes

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons">
      <SuTag label="Neutre" />
      <SuTag label="Primaire" variant="primary" />
      <SuTag label="Validé" variant="success" />
      <SuTag label="En attente" variant="warning" />
      <SuTag label="Rejeté" variant="error" />
      <SuTag label="Brouillon" variant="info" />
    </div>
  </div>
</div>

```vue
<SuTag label="Validé" variant="success" />
```

### Retirable

Le bouton de retrait est nommé « Retirer {libellé} » et émet `remove`.

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons">
      <SuTag v-for="filter in filters" :key="filter" :label="filter" removable @remove="filters = filters.filter((f) => f !== filter)" />
      <span v-if="!filters.length">Aucun filtre</span>
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const filters = ref(['Paris', 'Moins de 500 €', 'Livraison gratuite'])
const remove = (filter) => (filters.value = filters.value.filter((f) => f !== filter))
</script>

<template>
  <SuTag v-for="filter in filters" :key="filter" :label="filter" removable @remove="remove(filter)" />
</template>
```

### Tailles

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons" style="align-items: center">
      <SuTag size="sm" label="Petit" removable />
      <SuTag size="md" label="Moyen" removable />
      <SuTag size="lg" label="Grand" removable />
    </div>
  </div>
</div>

```vue
<SuTag size="sm" label="Petit" removable />
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `label` | `string` | - | Libellé (ou slot par défaut) |
| `variant` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | Variante |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille |
| `icon` | `Component` | - | Icône avant le libellé |
| `removable` | `boolean` | `false` | Bouton de retrait |
| `removeLabel` | `string` | `'Retirer {label}'` | Nom du bouton de retrait |
| `disabled` | `boolean` | `false` | Désactive l'étiquette |

### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `remove` | `MouseEvent` | Clic sur le bouton de retrait |

## Accessibilité

- Le bouton de retrait est un vrai `<button>`, nommé avec le libellé de l'étiquette (lu dans le slot si la prop `label` est absente).
- Après un retrait, pensez à déplacer le focus (étiquette suivante, champ de filtre) : le bouton supprimé emporte le focus avec lui.
- Les teintes d'état utilisent les tokens `--su-state-*-fg`, lisibles sur leur fond atténué.
