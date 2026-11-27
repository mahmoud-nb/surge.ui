<script setup>
import { ChatBubbleLeftIcon, CheckIcon, ExclamationTriangleIcon, PlusIcon } from '@heroicons/vue/24/outline'

const now = new Date()
const at = (daysAgo, hours, minutes = 0) => {
  const date = new Date(now)
  date.setDate(date.getDate() - daysAgo)
  date.setHours(hours, minutes, 0, 0)
  return date
}

const items = [
  { id: 1, title: 'Commentaire sur « Maquettes v2 »', author: 'Camille Martin', date: at(0, 10, 42), icon: ChatBubbleLeftIcon, description: 'Les marges du pied de page sont à revoir sur mobile.' },
  { id: 2, title: 'Tâche terminée : intégration du paiement', author: 'Léo Dubois', date: at(0, 9, 5), icon: CheckIcon, variant: 'success' },
  { id: 3, title: 'Échec du déploiement de préproduction', date: at(1, 18, 20), icon: ExclamationTriangleIcon, variant: 'error' },
  { id: 4, title: 'Projet créé', author: 'Camille Martin', date: at(5, 8, 30), icon: PlusIcon }
]
</script>

# Timeline

Fil d'activité : événements datés avec titre, auteur, heure, description et icône, regroupés par jour (« Aujourd'hui », « Hier », puis la date complète).

## Exemples d'utilisation

### Regroupé par jour

<div class="component-demo">
  <div class="demo-section">
    <ClientOnly>
      <SuTimeline :items="items" :heading-level="4" />
    </ClientOnly>
  </div>
</div>

```vue
<script setup>
import { ChatBubbleLeftIcon, CheckIcon } from '@heroicons/vue/24/outline'

const items = [
  { id: 1, title: 'Commentaire sur « Maquettes v2 »', author: 'Camille Martin', date: '2026-11-27T10:42:00', icon: ChatBubbleLeftIcon },
  { id: 2, title: 'Tâche terminée', author: 'Léo Dubois', date: '2026-11-27T09:05:00', icon: CheckIcon, variant: 'success' }
]
</script>

<template>
  <SuTimeline :items="items" />
</template>
```

Les événements s'affichent dans l'ordre de `items` : triez-les avant (du plus récent au plus ancien, en général). Les titres de jour sont des `h3` par défaut (`heading-level`).

### Sans regroupement

<div class="component-demo">
  <div class="demo-section">
    <ClientOnly>
      <SuTimeline :items="items.slice(0, 3)" :group-by-day="false" />
    </ClientOnly>
  </div>
</div>

```vue
<SuTimeline :items="items" :group-by-day="false" />
```

Chaque événement affiche alors sa date et son heure.

### Contenu personnalisé

```vue
<SuTimeline :items="items">
  <template #item="{ item, time, datetime }">
    <p><strong>{{ item.author }}</strong> {{ item.title }}</p>
    <time :datetime="datetime">{{ time }}</time>
  </template>
</SuTimeline>
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `items` | `TimelineItem[]` | - | Événements |
| `groupByDay` | `boolean` | `true` | Regroupe par jour, sous un titre |
| `headingLevel` | `2 \| 3 \| 4 \| 5 \| 6` | `3` | Niveau des titres de jour |
| `now` | `Date \| string \| number` | maintenant | Date de référence pour « aujourd'hui » et « hier » |

### TimelineItem

| Propriété | Type | Description |
|-----------|------|-------------|
| `id` | `string \| number` | Clé de rendu |
| `title` | `string` | Titre |
| `date` | `Date \| string \| number` | Date et heure |
| `author` | `string` | Auteur |
| `description` | `string` | Texte sous le titre |
| `icon` | `Component` | Icône de la pastille |
| `variant` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'error'` | Couleur de la pastille |

### Slots

| Slot | Props | Description |
|------|-------|-------------|
| `item` | `{ item, time, datetime }` | Contenu d'un événement |

## Accessibilité

- Chaque jour est un titre suivi d'une liste ordonnée qu'il nomme (`aria-labelledby`).
- Les dates sont des `<time datetime>` au format ISO ; jours et heures sont formatés dans la langue courante (`Intl`).
- Pastilles et icônes sont décoratives : la couleur d'une variante ne remplace pas le texte de l'événement.
- Rendu serveur : passez `now` pour que « aujourd'hui » soit le même côté serveur et navigateur.
