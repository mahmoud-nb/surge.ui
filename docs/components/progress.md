# Progress

Le composant **SuProgress** affiche une barre de progression personnalisée et accessible, respectant les normes **WCAG 2.1 AA** et les bonnes pratiques du **W3C**.  
Il permet de visualiser l’état d’avancement d’un processus ou d’une tâche, avec des variations de taille, de couleur et d’état (succès, erreur, avertissement…).

Ce composant est entièrement personnalisable, réactif, compatible avec les lecteurs d’écran et accessible au clavier.

## Exemples d'utilisation

### Utilisation de base

Affiche une barre de progression avec une étiquette de pourcentage par défaut (par exemple, 45 %).

<div class="component-demo">
  <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
    <SuProgress :modelValue="45" />
    <SuProgress :modelValue="45" show-label />
  </div>
</div>

```vue
<template>
  <SuProgress :modelValue="45" />
  <SuProgress :modelValue="45" show-label />
</template>
```

### Taille et valeur de progression

<div class="component-demo">
  <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
    <SuProgress size="sm" :model-value="25" show-label />
    <SuProgress size="md" :model-value="50" show-label />
    <SuProgress size="lg" :model-value="75" show-label />
  </div>
</div>

```vue
<template>
  <SuProgress size="sm" :model-value="25" show-label />
  <SuProgress size="md" :model-value="50" show-label />
  <SuProgress size="lg" :model-value="75" show-label />
</template>
```

### Personnalisation du format d’affichage (formatValue)

Vous pouvez personnaliser la manière dont la valeur est affichée en fournissant une fonction formatValue.

<div class="component-demo">
  <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
    <SuProgress
      :model-value="25"
      :format-value="(v) => `Étape ${v}/100`"
      show-label
    />
    <SuProgress
      :model-value="75"
      :format-value="(v) => `${v} sur 100 points`"
      state="success"
      show-label
    />
    <SuProgress
      :model-value="90"
      :format-value="(v) => `Complété à ${v}% 🎯`"
      state="warning"
      show-label
    />
  </div>
</div>

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
    <SuProgress
      :model-value="25"
      :format-value="(v) => `Étape ${v}/100`"
      show-label
    />
    <SuProgress
      :model-value="75"
      :format-value="(v) => `${v} sur 100 points`"
      state="success"
      show-label
    />
    <SuProgress
      :model-value="90"
      :format-value="(v) => `Complété à ${v}% 🎯`"
      state="warning"
      show-label
    />
  </div>
</template>
```

Par défaut, le composant utilise un formateur intégré équivalent à :

```ts
(val: number) => `${val}%`

```

### États visuels

<div class="component-demo">
  <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
    <SuProgress :model-value="40" state="default" show-label />
    <SuProgress :model-value="70" state="success" show-label />
    <SuProgress :model-value="50" state="warning" show-label />
    <SuProgress :model-value="30" state="error" show-label />
  </div>
</div>

```vue
<template>
  <SuProgress :model-value="40" state="default" show-label />
  <SuProgress :model-value="70" state="success" show-label />
  <SuProgress :model-value="50" state="warning" show-label />
  <SuProgress :model-value="30" state="error" show-label />
</template>
```

### État indéterminé

Lorsque la valeur de progression est inconnue, vous pouvez définir le composant en mode indéterminé.

<div class="component-demo">
  <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
    <SuProgress indeterminate size="md" />
    <SuProgress indeterminate size="lg" showLabel indeterminateLabel="Loading..." />
  </div>
</div>

```vue
<template>
  <SuProgress indeterminate size="md" />
  <SuProgress indeterminate size="lg" showLabel indeterminateLabel="Loading..." />
</template>
```

## API

### Props

| Prop              | Type          | Default           | Description                                  |
| ----------------- | ------------- | ----------------- | -------------------------------------------- |
| `modelValue`      | `number`      | `0`               | Valeur actuelle de la progression.           |
| `min`             | `number`      | `0`               | Valeur minimale.                             |
| `max`             | `number`      | `100`             | Valeur maximale.                             |
| `size`            | `'sm' \| 'md' \| 'lg'` | `'md'`   | Définit la hauteur de la barre de progression.   |
| `color`           | `string`      | `undefined`     | Couleur de la barre en état `default` (par défaut : couleur primaire du thème). |
| `backgroundColor` | `string`      | `undefined`     | Couleur de la piste (par défaut : fond doux du thème). |
| `state`           | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'`       | Définit l’état visuel du composant.     |
| `showLabel`       | `boolean`                   | `false`           | Affiche la valeur de progression sous forme de texte.    |
| `formatValue`     | `(value: number) => string` | `(v) => ${v}%` | Fonction permettant de personnaliser le format du texte affiché et de la valeur ARIA. |
| `indeterminate` | `boolean`                 | `false`               | Displays an animated, indeterminate progress bar. |
| `indeterminateLabel` | `string`                 | `'En cours…'`      | Libellé de l'état indéterminé (affiché avec `showLabel` et lu par les lecteurs d'écran). |


### Attributs d'accessibilité

| Attribut         | Valeur dynamique / fixe          | Description                                                               |
| ---------------- | ------------------------------   | ------------------------------------------------------------------------- |
| `role`           | `"progressbar"`                  | Indique aux lecteurs d’écran qu’il s’agit d’une barre de progression.     |
| `aria-valuemin`  | `min`                            | Spécifie la valeur minimale possible.                                     |
| `aria-valuemax`  | `max`                            | Spécifie la valeur maximale possible.                                     |
| `aria-valuenow`  | `modelValue` (clampée entre `min` et `max`) | Représente la valeur actuelle.                                 |
| `aria-valuetext` | `formatValue(modelValue)`        | Fournit une version textuelle lisible de la valeur, utile pour les lecteurs d’écran. |
| `tabindex`       | `0`                              | Permet la navigation clavier sur le composant.                                       |


### Attributs de validation HTML

| Attribut               | Support  | Description                                              |
| ---------------------- | -------- | -------------------------------------------------------- |
| `min`                  | ✅       | Définit la valeur minimale acceptée pour la progression. |
| `max`                  | ✅       | Définit la valeur maximale acceptée pour la progression. |
| `value` / `modelValue` | ✅       | Définit la valeur actuelle de la progression.            |


## Accessibilité

Le composant **SuProgress** respecte les normes **WCAG 2.1 niveau AA** et les bonnes pratiques du **W3C**.
Il est conçu pour être **navigable au clavier**, **lisible par les lecteurs d’écran** et **visuellement contrasté**, garantissant ainsi une expérience inclusive pour tous les utilisateurs.

### Fonctionnalités d'accessibilité

Le composant intègre plusieurs attributs ARIA et comportements garantissant son accessibilité :

- Le rôle progressbar permet aux technologies d’assistance de reconnaître le composant comme une barre de progression.

- Les attributs aria-valuemin, aria-valuemax et aria-valuenow décrivent précisément la plage et la valeur courante de la progression.

- L’attribut aria-valuetext fournit une version textuelle de la valeur, utile pour les utilisateurs de lecteurs d’écran.

- L’ajout de tabindex="0" rend le composant accessible via la navigation clavier.

- Les couleurs de fond et de progression respectent les contrastes recommandés pour une lecture claire.

- Les transitions visuelles sont douces pour éviter toute gêne visuelle (aucune animation agressive ou clignotante).