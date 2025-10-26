# Progress

Flexible progress component supporting determinate and indeterminate states, customizable labels, and value formatting through a `formatValue` prop.

## Usage examples

### Basic usage

Displays a progress bar with a default percentage label (e.g., 45%).

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

### Size and progression value

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

### Custom label formatting

You can customize how the value is displayed by providing a formatValue function.

<div class="component-demo">
  <SuProgress :modelValue="60" :formatValue="(val) => `Progress: ${val}/100`" />
</div>

```vue
<template>
  <SuProgress
    :modelValue="60"
    :formatValue="(val) => `Progress: ${val}/100`"
  />
</template>
```

By default, the component uses a built-in formatter equivalent to:

```ts
(val: number) => `${val}%`

```

### Visual states

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

### Indeterminate state

When the progress value is unknown, you can set the component to indeterminate mode.

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

The bar will animate to indicate ongoing activity without a defined completion percentage.

## API

### Props
| Prop            | Type                      | Default               | Description      |
| --------------- | ------------------------- | --------------------- | ---------------- |
| `modelValue`    | `number`                  | `0`                   | The current progress value.                 |
| `max`           | `number`                  | `100`                 | The maximum progress value.                 |
| `indeterminate` | `boolean`                 | `false`               | Displays an animated, indeterminate progress bar. |
| `formatValue`   | `(val: number) => string` | `(val) => \`${val}%`` | Custom function to format the displayed label.|

### Accessibility attributes

| Attribute        | Dynamic / fixed value  | Description                      |
| ---------------- | ---------------------- | -------------------------------- |
| `role`           | `"progressbar"`        | Indique aux lecteurs d’écran qu’il s’agit d’une barre de progression. |
| `aria-valuemin`  | `min`                  | Spécifie la valeur minimale possible.                                 |
| `aria-valuemax`  | `max`                  | Spécifie la valeur maximale possible.                                 |
| `aria-valuenow`  | `modelValue` (clampée entre `min` et `max`) | Représente la valeur actuelle.                   |
| `aria-valuetext` | `formatValue(modelValue)` | Fournit une version textuelle lisible de la valeur, utile pour les lecteurs d’écran. |
| `tabindex`       | `0`                    | Permet la navigation clavier sur le composant.                        |


### HTML Validation Attributes

| Attribut               | Support | Description                                              |
| ---------------------- | ------- | -------------------------------------------------------- |
| `min`                  | ✅       | Définit la valeur minimale acceptée pour la progression. |
| `max`                  | ✅       | Définit la valeur maximale acceptée pour la progression. |
| `value` / `modelValue` | ✅       | Définit la valeur actuelle de la progression.            |


## Accessibility

The SuProgress component complies with WCAG 2.1 Level AA standards and W3C best practices.
It is designed to be keyboard-navigable, screen-readable, and visually contrasting, ensuring an inclusive experience for all users.

Fonctionnalités d'accessibilité

Le composant intègre plusieurs attributs ARIA et comportements garantissant son accessibilité :

Le rôle progressbar permet aux technologies d’assistance de reconnaître le composant comme une barre de progression.

Les attributs aria-valuemin, aria-valuemax et aria-valuenow décrivent précisément la plage et la valeur courante de la progression.

L’attribut aria-valuetext fournit une version textuelle de la valeur, utile pour les utilisateurs de lecteurs d’écran.

L’ajout de tabindex="0" rend le composant accessible via la navigation clavier.

Les couleurs de fond et de progression respectent les contrastes recommandés pour une lecture claire.

Les transitions visuelles sont douces pour éviter toute gêne visuelle (aucune animation agressive ou clignotante).
