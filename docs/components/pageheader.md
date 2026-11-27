<script setup>
import { PlusIcon, ArrowDownTrayIcon } from '@heroicons/vue/24/outline'

const breadcrumb = [
  { label: 'Accueil', href: '#' },
  { label: 'Projets', href: '#' },
  { label: 'Refonte du site' }
]
</script>

# PageHeader

En-tête d'une page d'application : fil d'Ariane ou lien de retour, titre, description, pastilles et actions. Les actions passent sous le titre quand la place manque, selon la largeur disponible et non celle de l'écran.

## Exemples d'utilisation

### Titre, fil d'Ariane et actions

<div class="component-demo">
  <div class="demo-section">
    <SuPageHeader
      title="Refonte du site"
      description="Nouvelle charte, pages produit et tunnel de commande."
      :breadcrumb="breadcrumb"
      :level="2"
    >
      <template #meta>
        <SuBadge variant="success" size="sm">En cours</SuBadge>
      </template>
      <template #actions>
        <SuButton variant="outline" :icon="ArrowDownTrayIcon">Exporter</SuButton>
        <SuButton :icon="PlusIcon">Nouvelle tâche</SuButton>
      </template>
    </SuPageHeader>
  </div>
</div>

```vue
<script setup>
const breadcrumb = [
  { label: 'Accueil', to: '/' },
  { label: 'Projets', to: '/projets' },
  { label: 'Refonte du site' }
]
</script>

<template>
  <SuPageHeader
    title="Refonte du site"
    description="Nouvelle charte, pages produit et tunnel de commande."
    :breadcrumb="breadcrumb"
  >
    <template #meta>
      <SuBadge variant="success" size="sm">En cours</SuBadge>
    </template>
    <template #actions>
      <SuButton variant="outline" :icon="ArrowDownTrayIcon">Exporter</SuButton>
      <SuButton :icon="PlusIcon">Nouvelle tâche</SuButton>
    </template>
  </SuPageHeader>
</template>
```

Le titre est un `h1` par défaut : une page n'en a qu'un. Dans les démos ci-dessus, `level` passe à `2` pour ne pas concurrencer le titre de cette page.

### Lien de retour

<div class="component-demo">
  <div class="demo-section">
    <SuPageHeader title="Réglages du projet" back="#" :level="2" />
  </div>
</div>

```vue
<SuPageHeader title="Réglages du projet" :back="{ name: 'project', params: { id } }" />
```

`back` accepte un chemin ou une route : le lien passe par RouterLink, ou par le `linkComponent` du plugin (NuxtLink).

### Onglets sous l'en-tête

Le slot par défaut accueille ce qui suit l'en-tête : onglets, filtres…

```vue
<SuPageHeader title="Refonte du site">
  <template #actions>
    <SuButton variant="outline">Partager</SuButton>
  </template>
  <SuTabs :tabs="tabs" />
</SuPageHeader>
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `title` | `string` | - | Titre de la page (ou slot `title`) |
| `description` | `string` | - | Texte sous le titre (ou slot `description`) |
| `breadcrumb` | `BreadcrumbItem[]` | - | Fil d'Ariane au-dessus du titre ([Breadcrumb](/components/breadcrumb)) |
| `back` | `string \| RouteLocationRaw` | - | Lien de retour au-dessus du titre |
| `backLabel` | `string` | `'Retour'` | Texte du lien de retour |
| `level` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `1` | Niveau du titre |

### Slots

| Slot | Description |
|------|-------------|
| `breadcrumb` | Remplace le fil d'Ariane et le lien de retour |
| `title` | Contenu du titre |
| `meta` | Pastilles, statut… à côté du titre |
| `description` | Contenu de la description |
| `actions` | Boutons d'action de la page |
| `default` | Sous l'en-tête : onglets, filtres… |

## Accessibilité

- Un seul `h1` par page : réglez `level` quand l'en-tête n'est pas celui de la page.
- Le fil d'Ariane est une navigation nommée (`<nav aria-label="Fil d'Ariane">`), la page courante porte `aria-current="page"`.
- L'ordre du DOM suit l'ordre visuel : fil d'Ariane, titre, description, puis actions.
- L'icône du lien de retour est décorative et se retourne en RTL.
