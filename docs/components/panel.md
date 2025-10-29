# Panel

Le composant `Panel` fournit un conteneur structuré et accessible pour regrouper du contenu sémantiquement cohérent.  
Il peut être rendu sous forme de `<section>` ou de `<div>` selon le contexte, et inclut des slots dédiés pour la tête, le contenu principal et le pied.

---

## ✨ Fonctionnalités

- Rendu sous `<section>` ou `<div>`
- Fournit des slots `head`, `default` et `footer`
- Compatible avec le thème clair/sombre
- Compatible avec les langues RTL
- Respecte les recommandations WCAG 2.1 AA
- Prend en charge les rôles ARIA et les titres accessibles

---

## 🚀 Exemples d’utilisation

### Exemple de base

```vue
<template>
  <Panel>
    <template #head>
      <Heading level="2">Informations principales</Heading>
    </template>

    <p>Voici le contenu principal du panneau.</p>

    <template #footer>
      <button>En savoir plus</button>
    </template>
  </Panel>
</template>
```

Ce code produit une structure claire et accessible :

```html
<section class="su-panel">
  <header class="su-panel__head">
    <h2>Informations principales</h2>
  </header>
  <div class="su-panel__body">
    <p>Voici le contenu principal du panneau.</p>
  </div>
  <footer class="su-panel__footer">
    <button>En savoir plus</button>
  </footer>
</section>
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

```vue
<Panel outlined elevated>
  <template #head>
    <Heading level="3">Résumé de la commande</Heading>
  </template>

  <p>Montant total : 85,90 €</p>

  <template #footer>
    <button>Valider</button>
  </template>
</Panel>
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

```vue
<Panel outlined>
  <template #head>
    <Heading level="2">Section principale</Heading>
  </template>
  <Panel as="div" outlined>
    <template #head>
      <Heading level="3">Sous-section</Heading>
    </template>
    <p>Contenu secondaire.</p>
  </Panel>
</Panel>
```

**Panneau dynamique**

```vue
<Panel v-if="showPanel" elevated>
  <template #head>
    <Heading level="3">Notifications</Heading>
  </template>
  <ul>
    <li v-for="notif in notifications" :key="notif.id">
      {{ notif.message }}
    </li>
  </ul>
</Panel>
```