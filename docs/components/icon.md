# Icon

Le composant Icon affiche des icônes vectorielles issues de la bibliothèque [HeroIcons](https://heroicons.com/) (24px). Il prend en charge les variantes `outline` et `solid`, le dimensionnement, la colorisation et un comportement d'accessibilité adaptatif selon que l'icône est décorative ou sémantique.

## Exemples d'utilisation

### Utilisation de base

<div class="component-demo">
  <div class="demo-section">
    <h4>Icône simple</h4>
    <SuIcon name="Home" />
    <SuIcon name="Bell" />
    <SuIcon name="User" />
  </div>
</div>

```vue
<template>
  <SuIcon name="Home" />
  <SuIcon name="Bell" />
  <SuIcon name="User" />
</template>
```

### Variantes outline et solid

<div class="component-demo">
  <div class="demo-section">
    <h4>Outline (défaut)</h4>
    <SuIcon name="Heart" variant="outline" />
    <SuIcon name="Star" variant="outline" />
  </div>
  <div class="demo-section">
    <h4>Solid</h4>
    <SuIcon name="Heart" variant="solid" />
    <SuIcon name="Star" variant="solid" />
  </div>
</div>

```vue
<template>
  <!-- Outline (défaut) -->
  <SuIcon name="Heart" variant="outline" />
  <SuIcon name="Star" variant="outline" />

  <!-- Solid -->
  <SuIcon name="Heart" variant="solid" />
  <SuIcon name="Star" variant="solid" />
</template>
```

### Tailles

<div class="component-demo">
  <div class="demo-section">
    <h4>Différentes tailles</h4>
    <SuIcon name="Cog6Tooth" :size="16" />
    <SuIcon name="Cog6Tooth" :size="24" />
    <SuIcon name="Cog6Tooth" :size="32" />
    <SuIcon name="Cog6Tooth" :size="48" />
    <SuIcon name="Cog6Tooth" size="4rem" />
  </div>
</div>

```vue
<template>
  <SuIcon name="Cog6Tooth" :size="16" />
  <SuIcon name="Cog6Tooth" :size="24" />
  <SuIcon name="Cog6Tooth" :size="32" />
  <SuIcon name="Cog6Tooth" :size="48" />
  <SuIcon name="Cog6Tooth" size="4rem" />
</template>
```

### Couleurs

<div class="component-demo">
  <div class="demo-section">
    <h4>Couleur CSS</h4>
    <SuIcon name="CheckCircle" color="#22c55e" />
    <SuIcon name="ExclamationCircle" color="#f59e0b" />
    <SuIcon name="XCircle" color="#ef4444" />
  </div>
  <div class="demo-section">
    <h4>Classe Tailwind text-*</h4>
    <SuIcon name="CheckCircle" color="text-green-500" />
    <SuIcon name="ExclamationCircle" color="text-amber-500" />
    <SuIcon name="XCircle" color="text-red-500" />
  </div>
</div>

```vue
<template>
  <!-- Couleur CSS directe -->
  <SuIcon name="CheckCircle" color="#22c55e" />
  <SuIcon name="ExclamationCircle" color="#f59e0b" />
  <SuIcon name="XCircle" color="#ef4444" />

  <!-- Classe Tailwind -->
  <SuIcon name="CheckCircle" color="text-green-500" />
  <SuIcon name="ExclamationCircle" color="text-amber-500" />
  <SuIcon name="XCircle" color="text-red-500" />
</template>
```

### Icône décorative

Utilisez `decorative` pour les icônes purement visuelles qui n'apportent pas d'information : le composant injecte automatiquement `aria-hidden="true"` et `role="presentation"`.

```vue
<template>
  <!-- Icône à côté d'un texte lisible -  la masquer pour les lecteurs d'écran -->
  <button>
    <SuIcon name="Download" decorative />
    Télécharger
  </button>
</template>
```

### Icône sémantique

Pour les icônes qui véhiculent une information (bouton icon-only, statut visuel), fournissez un `ariaLabel` : le composant injecte `role="img"` et `aria-label`.

```vue
<template>
  <!-- Bouton icon-only -  l'icône doit avoir un label ARIA -->
  <button aria-label="Supprimer l'élément">
    <SuIcon name="Trash" aria-label="Supprimer" />
  </button>

  <!-- Icône de statut -->
  <SuIcon name="CheckCircle" :size="20" color="#22c55e" aria-label="Succès" />
</template>
```

### Utilisation du suffixe Icon

HeroIcons exporte ses composants avec le suffixe `Icon`. Les deux formes sont acceptées :

```vue
<template>
  <!-- Équivalent : les deux formes fonctionnent -->
  <SuIcon name="Home" />
  <SuIcon name="HomeIcon" />
</template>
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `name` | `string` | -  **(requis)** | Nom de l'icône HeroIcons (ex. `'Home'`, `'ArrowRight'`, `'Cog6Tooth'`) |
| `variant` | `'outline' \| 'solid'` | `'outline'` | Style de l'icône -  `outline` pour des traits fins, `solid` pour des formes pleines |
| `size` | `number \| string` | `24` | Taille de l'icône. Un nombre est interprété en pixels ; une chaîne est utilisée comme valeur CSS brute |
| `color` | `string` | -  | Couleur de l'icône. Accepte une couleur CSS (`#hex`, `rgb(...)`) ou une classe Tailwind `text-*` |
| `ariaLabel` | `string` | -  | Label ARIA pour les icônes sémantiques. Injecte `role="img"` automatiquement |
| `decorative` | `boolean` | `false` | Si `true`, l'icône est masquée aux technologies d'assistance (`aria-hidden="true"`, `role="presentation"`) |
| `class` | `string` | -  | Classes CSS supplémentaires appliquées à l'élément SVG |

### Comportement d'accessibilité automatique

| Contexte | Props utilisées | Attributs générés |
|----------|-----------------|-------------------|
| Icône décorative | `decorative: true` | `aria-hidden="true"` + `role="presentation"` |
| Icône sémantique | `ariaLabel: "..."` | `aria-label="..."` + `role="img"` |
| Aucune des deux | -  | Aucun attribut ARIA -  à éviter |

## Accessibilité

- **Icônes décoratives** : utilisez toujours `decorative` lorsque l'icône accompagne un texte lisible. Cela évite la répétition d'information pour les utilisateurs de lecteurs d'écran.
- **Icônes sémantiques** : fournissez toujours un `ariaLabel` clair et descriptif pour les icônes porteuses de sens (boutons icon-only, indicateurs de statut sans texte).
- **Contraste** : assurez-vous que la couleur choisie offre un contraste suffisant (minimum 3:1 pour les éléments graphiques non textuels selon WCAG 2.1).
- **Taille minimale** : les icônes interactives doivent avoir une zone cliquable d'au moins 44×44 px (standard WCAG 2.5.5) -  gérez cela via le composant parent (bouton, lien).

## Remarques techniques

- Le chargement de l'icône est **asynchrone** via `defineAsyncComponent` -  un bref instant peut s'écouler avant l'affichage lors du premier rendu.
- Si le nom de l'icône est incorrect ou n'existe pas dans HeroIcons, un avertissement est émis en console et rien n'est rendu.
- La prop `color` supporte deux formes :
  - **Valeur CSS** (`#3b82f6`, `rgb(59,130,246)`) : injectée en `style.color`
  - **Classe Tailwind** (`text-blue-500`) : ajoutée à la liste de classes -  dans ce cas, `style.color` n'est **pas** injecté
