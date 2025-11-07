# Panel

Le composant `Panel` fournit un conteneur structuré et accessible pour regrouper du contenu sémantiquement cohérent.  
Il peut être rendu sous forme de `<section>` ou de `<div>` selon le contexte, et inclut des slots dédiés pour la tête, le contenu principal et le pied.

## ✨ Fonctionnalités

- Rendu sous `<section>` ou `<div>`
- Fournit des slots `head`, `default` et `footer`
- Compatible avec le thème clair/sombre
- Compatible avec les langues RTL
- Respecte les recommandations WCAG 2.1 AA
- Prend en charge les rôles ARIA et les titres accessibles

## 🚀 Exemples d’utilisation

### Exemple de base

<div class="component-demo">
  <SuPanel>
    <template #head>
      <SuHeading level="3">Informations principales</SuHeading>
    </template>
    <p>Voici le contenu principal du panneau.</p>
    <template #footer>
      <button>En savoir plus</button>
    </template>
  </SuPanel>
</div>

```vue
<template>
  <SuPanel>
    <template #head>
      <SuHeading level="3">Informations principales</SuHeading>
    </template>

    <p>Voici le contenu principal du panneau.</p>

    <template #footer>
      <button>En savoir plus</button>
    </template>
  </SuPanel>
</template>
```

## API

### Props

| Prop       | Type      | Défaut      | Description                                                                       |
| ---------- | --------- | ----------- | --------------------------------------------------------------------------------- |
| `as`       | `string`  | `'section'` | Définit la balise HTML utilisée pour le conteneur principal (`section` ou `div`). |
| `outlined` | `boolean` | `false`     | Ajoute un contour au panneau.                                                     |
| `elevated` | `boolean` | `false`     | Ajoute une ombre pour un effet de profondeur.                                     |
| `class`    | `string`  | —           | Classes CSS supplémentaires.                                                      |

### Slots

| Slot      | Description                                                        |
| --------- | ------------------------------------------------------------------ |
| `head`    | Contenu de l’en-tête du panneau (souvent un `Heading` ou un titre) |
| `default` | Contenu principal du panneau                                       |
| `footer`  | Zone du bas du panneau (boutons, liens, résumé, etc.)              |


## 🧱 Exemple avec options de style

<div class="component-demo">
  <SuPanel outlined elevated>
    <template #head>
      <SuHeading level="3">Résumé de la commande</SuHeading>
    </template>
    <p>Montant total : 85,90 €</p>
    <template #footer>
      <button>Valider</button>
    </template>
  </SuPanel>
</div>

```vue
<SuPanel outlined elevated>
  <template #head>
    <SuHeading level="3">Résumé de la commande</SuHeading>
  </template>

  <p>Montant total : 85,90 €</p>

  <template #footer>
    <button>Valider</button>
  </template>
</SuPanel>
```

## Bonnes pratiques

- Utilisez la balise `<section>` pour des blocs sémantiquement distincts.
- Utilisez la prop as="div" pour des panneaux purement visuels ou imbriqués.
- Le slot head devrait toujours contenir un titre accessible (Heading ou équivalent).


## Attributs d accessibilité

| Attribut           | Rôle / Utilité                                                   | Exemple                        |
| ------------------ | ---------------------------------------------------------------- | ------------------------------ |
| `role`             | Définit la fonction du panneau si nécessaire (`region`, `group`) | `role="region"`                |
| `aria-labelledby`  | Lie le panneau à un titre visible pour les lecteurs d’écran      | `aria-labelledby="panelTitle"` |
| `aria-describedby` | Fournit un résumé optionnel du contenu du panneau                | `aria-describedby="panelDesc"` |


## Attributs HTML de validation

| Attribut | Description                                              |
| -------- | -------------------------------------------------------- |
| `id`     | Identifiant unique pour la section                       |
| `lang`   | Langue du contenu si différente du document              |
| `dir`    | Contrôle de la direction du texte (`ltr`, `rtl`, `auto`) |


## Accessibilité

Le composant Panel respecte les critères WCAG 2.1 niveau AA et suit les bonnes pratiques W3C ARIA.

**Fonctionnalités d accessibilité**

- Utilisation de rôles sémantiques (section, region) selon le contexte.
- Association optionnelle à un titre via aria-labelledby.
- Espacement et contraste conformes aux normes pour la lisibilité.
- Ciblage tactile conforme à la recommandation de 44×44px minimum.

## Exemples d’usage avancés

**Panneaux imbriqués**

<div class="component-demo">
  <SuPanel outlined>
    <template #head>
      <SuHeading level="3">Section principale</SuHeading>
    </template>
    <SuPanel as="div" outlined>
      <template #head>
        <SuHeading level="3">Sous-section</SuHeading>
      </template>
      <p>Contenu secondaire.</p>
    </SuPanel>
  </SuPanel>
</div>

```vue
<SuPanel outlined>
  <template #head>
    <SuHeading level="3">Section principale</SuHeading>
  </template>
  <SuPanel as="div" outlined>
    <template #head>
      <SuHeading level="3">Sous-section</SuHeading>
    </template>
    <p>Contenu secondaire.</p>
  </SuPanel>
</SuPanel>
```

**Panneau dynamique**

```vue
<SuPanel v-if="showPanel" elevated>
  <template #head>
    <SuHeading level="3">Notifications</SuHeading>
  </template>
  <ul>
    <li v-for="notif in notifications" :key="notif.id">
      {{ notif.message }}
    </li>
  </ul>
</SuPanel>
```