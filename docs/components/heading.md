# Heading

Le composant `Heading` fournit une manière cohérente et flexible d’afficher les titres typographiques dans tout le design system.  
Il prend en charge différents niveaux de titres (`h1` à `h6`) ou des balises personnalisées, tout en conservant un style visuel uniforme.

---

## ✨ Fonctionnalités

- Supporte les niveaux de titres HTML : `h1` à `h6`
- Peut rendre n’importe quelle balise HTML via la prop `as` (`div`, `span`, etc.)
- Applique automatiquement le style typographique correspondant au niveau
- Compatible avec les thèmes clair et sombre
- Entièrement compatible avec les mises en page RTL (Right-To-Left)

---

## 🚀 Utilisation

### Exemple de base

```vue
<template>
  <Heading level="1">Titre principal</Heading>
  <Heading level="2">Titre de section</Heading>
  <Heading level="3">Sous-section</Heading>
</template>
```

Ce code produira :

```html
<h1 class="heading heading--h1">Titre principal</h1>
<h2 class="heading heading--h2">Titre de section</h2>
<h3 class="heading heading--h3">Sous-section</h3>
```

### Props

| Prop    | Type                         | Par défaut | Description                                                                                                         |
| ------- | ---------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------- |
| `level` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `1`        | Définit le niveau visuel et sémantique du titre.                                                                    |
| `as`    | `string`                     | —          | Balise HTML optionnelle à utiliser à la place du niveau (`h1`–`h6`). Utile pour le style sans casser la sémantique. |
| `class` | `string`                     | —          | Classes CSS personnalisées additionnelles.                                                                          |


🎨 Styles

Chaque niveau de titre dispose de tailles et graisses de police prédéfinies selon les tokens de design.

| Niveau | Classe CSS     | Taille de police | Graisse |
| ------ | -------------- | ---------------- | ------- |
| h1     | `.heading--h1` | `2.25rem`        | `700`   |
| h2     | `.heading--h2` | `1.875rem`       | `600`   |
| h3     | `.heading--h3` | `1.5rem`         | `600`   |
| h4     | `.heading--h4` | `1.25rem`        | `500`   |
| h5     | `.heading--h5` | `1.125rem`       | `500`   |
| h6     | `.heading--h6` | `1rem`           | `500`   |


### Bonnes pratiques

- Utilisez les bons niveaux de titres pour maintenir une hiérarchie sémantique correcte.
- Évitez de sauter des niveaux (par exemple ne pas passer de h1 à h4 directement).
- Utilisez la prop as uniquement pour des besoins de structure ou de style

### Accessibilité

Les titres jouent un rôle essentiel pour les lecteurs d’écran et le référencement (SEO).
Assurez-vous que la hiérarchie des titres reflète la structure logique du contenu de la page.