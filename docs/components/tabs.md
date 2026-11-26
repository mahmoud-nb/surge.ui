<script setup>
import { ref } from 'vue'

const compte = ref('profil')
const ongletsCompte = [
  { label: 'Profil', value: 'profil' },
  { label: 'Sécurité', value: 'securite' },
  { label: 'Factures', value: 'factures' }
]
const contenus = {
  profil: 'Nom, adresse e-mail et photo de profil.',
  securite: 'Mot de passe et double authentification.',
  factures: 'Historique des paiements.'
}
</script>

# Tabs

Le composant **Tabs** (onglets) organise un contenu en sections affichées une à une. Il couvre trois usages :

- **un panneau par onglet** : le contenu vient des onglets (`content`, slot `panel`) ;
- **un panneau unique** : la page affiche le contenu de l'onglet actif dans le slot par défaut ;
- **une navigation** : des onglets avec `to` changent de page (Vue Router, Nuxt).

## Exemples d'utilisation

### Un panneau par onglet

<div class="component-demo">
  <div class="demo-section">
    <h4>Contenu des onglets</h4>
    <SuTabs :tabs="[
      { label: 'Accueil', content: 'Bienvenue sur la page d’accueil.' },
      { label: 'Profil', content: 'Votre espace personnel.' },
      { label: 'Paramètres', content: 'Réglez vos préférences.' }
    ]" />
  </div>
</div>

```vue
<SuTabs
  :tabs="[
    { label: 'Accueil', content: 'Bienvenue sur la page d’accueil.' },
    { label: 'Profil', content: 'Votre espace personnel.' },
    { label: 'Paramètres', content: 'Réglez vos préférences.' }
  ]"
/>
```

### Onglets par identifiant et panneau unique

Donnez une `value` à chaque onglet : le `v-model` porte cette valeur (une chaîne, synchronisable avec `?tab=` dans l'URL) au lieu de l'indice. Le slot par défaut devient alors un **panneau unique** (`role="tabpanel"`) pour le contenu de l'onglet actif, géré par la page.

<div class="component-demo">
  <div class="demo-section">
    <h4>v-model : {{ compte }}</h4>
    <SuTabs v-model="compte" :tabs="ongletsCompte" variant="pills">
      <p>{{ contenus[compte] }}</p>
    </SuTabs>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const tab = ref('profil')
const tabs = [
  { label: 'Profil', value: 'profil' },
  { label: 'Sécurité', value: 'securite' },
  { label: 'Factures', value: 'factures' }
]
</script>

<template>
  <SuTabs v-model="tab" :tabs="tabs">
    <ProfilForm v-if="tab === 'profil'" />
    <SecuriteForm v-else-if="tab === 'securite'" />
    <FacturesTable v-else />
  </SuTabs>
</template>
```

Le slot par défaut reçoit `{ tab, index, value }` de l'onglet actif.

### Navigation entre pages

Des onglets avec `to` forment une **navigation** : une `<nav>` de liens rendus par RouterLink (ou le [`linkComponent`](/guide/installation#liens-du-routeur) du plugin). L'onglet actif suit la route, sans `v-model` : il porte `aria-current="page"`. Le slot par défaut accueille le contenu des pages, par exemple `<RouterView />`.

<div class="component-demo">
  <div class="demo-section">
    <h4>Liens vers des pages de la documentation</h4>
    <SuTabs label="Composants d'action" :tabs="[
      { label: 'Tabs', to: '/components/tabs' },
      { label: 'Button', to: '/components/button' },
      { label: 'Link', to: '/components/link' }
    ]" />
  </div>
</div>

```vue
<SuTabs
  label="Mon compte"
  :tabs="[
    { label: 'Profil', to: '/compte/profil' },
    { label: 'Sécurité', to: '/compte/securite' },
    { label: 'Factures', to: { name: 'factures' } }
  ]"
>
  <RouterView />
</SuTabs>
```

Une route parente compte aussi : sur `/compte/securite/2fa`, l'onglet « Sécurité » reste actif (classe `router-link-active`). Sans routeur, l'onglet actif est celui dont le lien correspond au chemin de la page.

### Onglets personnalisés

Le slot `tab` remplace le rendu d'un onglet ; le slot `panel` celui d'un panneau (usage « un panneau par onglet »).

```vue
<SuTabs :tabs="tabs">
  <template #tab="{ tab }">
    <span>{{ tab.label }}</span>
    <SuBadge v-if="tab.badge" size="sm">{{ tab.badge }}</SuBadge>
  </template>
  <template #panel="{ tab }">
    <article>
      <h2>{{ tab.title }}</h2>
      <p>{{ tab.description }}</p>
    </article>
  </template>
</SuTabs>
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `tabs` | `TabItem[]` | `[]` | Onglets à afficher |
| `modelValue` | `string \| number` | — | Onglet actif : sa `value`, ou son indice si les onglets n'en ont pas (lié à `v-model`). En navigation, fixe l'onglet actif au lieu de suivre la route |
| `variant` | `'underline' \| 'pills' \| 'contained'` | `'underline'` | `underline` : filet et indicateur animé ; `pills` : contrôle segmenté ; `contained` : onglets attachés au panneau |
| `label` | `string` | — | Nom accessible de la liste d'onglets ou de la navigation |

### TabItem

| Propriété | Type | Description |
|-----------|------|-------------|
| `label` | `string` | Libellé |
| `value` | `string \| number` | Identifiant pour le `v-model` |
| `to` | `string \| RouteLocationRaw` | Lien du routeur : les onglets deviennent une navigation |
| `content` | `string` | Contenu du panneau (usage « un panneau par onglet ») |
| `icon`, `badge`, `title`, `description`, `component` | — | Champs libres pour les slots |

### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `update:modelValue` | `string \| number` | Onglet choisi : sa `value`, ou son indice |

### Slots

| Slot | Props | Description |
|------|-------|-------------|
| `default` | `{ tab, index, value }` | Panneau unique de l'onglet actif ; en navigation, contenu sous les liens |
| `tab` | `{ tab, index }` | Rendu d'un onglet |
| `panel` | `{ tab, index }` | Rendu d'un panneau (un panneau par onglet) |

## Accessibilité

- **Onglets** : rôles `tablist`, `tab` et `tabpanel`, reliés par `aria-controls` et `aria-labelledby` ; `aria-selected` sur l'onglet actif.
- **Navigation clavier** : flèches gauche / droite en boucle (inversées en lecture de droite à gauche), Début / Fin ; l'onglet atteint est activé aussitôt ([useListNavigation](/composables/uselistnavigation)).
- **Navigation entre pages** : une `<nav>` de liens, nommée par `label`, et non des onglets ARIA : chaque lien se prend au clavier avec Tab, la page courante porte `aria-current="page"`.
- L'indicateur se recale quand un libellé change de largeur ou quand le sens de lecture change.
