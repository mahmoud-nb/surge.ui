<script setup>
import { ClipboardDocumentIcon } from '@heroicons/vue/24/outline'
</script>

# Tooltip

Infobulle : courte description d'un élément, affichée au survol et au focus clavier. Elle est reliée au déclencheur par `aria-describedby`, on peut la survoler et Échap la ferme.

Une infobulle ne contient que du texte. Pour du contenu interactif (liens, boutons, formulaire), utilisez [Popover](/components/popover).

## Exemples d'utilisation

### Utilisation de base

Le déclencheur est le premier élément du slot ; il doit être focusable (bouton, lien, champ).

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons">
      <SuTooltip content="Copier le lien">
        <SuButton variant="outline" :icon="ClipboardDocumentIcon" icon-display="only" aria-label="Copier" />
      </SuTooltip>
      <SuTooltip content="Enregistre le brouillon sans le publier">
        <SuButton variant="outline">Enregistrer</SuButton>
      </SuTooltip>
    </div>
  </div>
</div>

```vue
<script setup>
import { ClipboardDocumentIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <SuTooltip content="Copier le lien">
    <SuButton variant="outline" :icon="ClipboardDocumentIcon" icon-display="only" aria-label="Copier" />
  </SuTooltip>
</template>
```

### Placements et flèche

Le placement est retourné automatiquement s'il manque de place.

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons">
      <SuTooltip content="En haut" placement="top" show-arrow><SuButton variant="outline">top</SuButton></SuTooltip>
      <SuTooltip content="En bas" placement="bottom" show-arrow><SuButton variant="outline">bottom</SuButton></SuTooltip>
      <SuTooltip content="À gauche" placement="left" show-arrow><SuButton variant="outline">left</SuButton></SuTooltip>
      <SuTooltip content="À droite" placement="right" show-arrow><SuButton variant="outline">right</SuButton></SuTooltip>
    </div>
  </div>
</div>

```vue
<SuTooltip content="En bas" placement="bottom" show-arrow>
  <SuButton variant="outline">bottom</SuButton>
</SuTooltip>
```

### Contenu par slot et délais

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons">
      <SuTooltip :open-delay="0">
        <SuButton variant="outline">Sans délai</SuButton>
        <template #content>Enregistrer <kbd>Ctrl S</kbd></template>
      </SuTooltip>
    </div>
  </div>
</div>

```vue
<SuTooltip :open-delay="0">
  <SuButton variant="outline">Sans délai</SuButton>
  <template #content>Enregistrer <kbd>Ctrl S</kbd></template>
</SuTooltip>
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `content` | `string` | - | Texte de l'infobulle (ou slot `content`) |
| `placement` | `PopoverPlacement` | `'top'` | `top`, `bottom`, `left`, `right`, avec `-start` / `-end` |
| `openDelay` | `number` | `300` | Délai avant l'ouverture au survol (ms) ; immédiate au focus clavier |
| `closeDelay` | `number` | `100` | Délai avant la fermeture (ms), le temps d'amener le pointeur sur l'infobulle |
| `showArrow` | `boolean` | `false` | Affiche une flèche |
| `disabled` | `boolean` | `false` | Désactive l'infobulle |
| `modelValue` | `boolean` | `false` | Ouverture contrôlée (v-model, facultatif) |

### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `update:modelValue` | `boolean` | Ouverture ou fermeture |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Déclencheur (élément focusable) |
| `content` | Contenu de l'infobulle (texte, sans élément interactif) |

### Méthodes exposées

| Méthode | Description |
|---------|-------------|
| `open()` / `close()` | Ouvre ou ferme l'infobulle |

## Accessibilité

- `role="tooltip"`, relié au déclencheur par `aria-describedby` (les ids déjà présents sont conservés). La description est lue même quand l'infobulle est masquée.
- Ouverture au survol (après `openDelay`) et au focus clavier (`:focus-visible`), pas au clic ni au toucher : sur mobile, prévoyez un libellé visible.
- WCAG 1.4.13 : l'infobulle reste ouverte quand on y amène le pointeur et tant que le focus est sur le déclencheur ; `Échap` la ferme.
- Un bouton icône garde son propre `aria-label` : l'infobulle le complète, elle ne le remplace pas.
