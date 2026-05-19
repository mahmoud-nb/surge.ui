# Accordion

Le composant `Accordion` permet d’afficher plusieurs sections de contenu repliables.  
Chaque section est gérée par un sous-composant `AccordionItem`, qui contient un `Heading` et un `Panel`.  
Il est idéal pour présenter des informations hiérarchisées sans surcharger la page.

## ✨ Fonctionnalités

- Ouvre ou ferme un ou plusieurs panneaux (`single` ou `multiple`)
- Gestion automatique des états `expanded`, `aria-controls`, `aria-labelledby`
- Navigation clavier accessible (WAI-ARIA)
- Compatible avec les thèmes **clair** et **sombre**
- Prend en charge les mises en page **RTL (Right-To-Left)**


## 🚀 Utilisation

### Exemple de base

<div class="component-demo">
  <div class="demo-section">
    <SuAccordion>
      <SuAccordionItem title="Section 1">
        <p>Contenu de la première section</p>
      </SuAccordionItem>
      <SuAccordionItem title="Section 2">
        <p>Contenu de la deuxième section</p>
      </SuAccordionItem>
    </SuAccordion>
  </div>
</div>

```vue
<template>
  <SuAccordion>
    <SuAccordionItem title="Section 1">
      <p>Contenu de la première section</p>
    </SuAccordionItem>

    <SuAccordionItem title="Section 2">
      <p>Contenu de la deuxième section</p>
    </SuAccordionItem>
  </SuAccordion>
</template>
```

### Mode multiple

<div class="component-demo">
  <div class="demo-section">
    <SuAccordion multiple>
      <SuAccordionItem title="Section 1">
        <p>Plusieurs sections peuvent être ouvertes en même temps.</p>
      </SuAccordionItem>
      <SuAccordionItem title="Section 2">
        <p>Chaque panneau conserve son état d’ouverture.</p>
      </SuAccordionItem>
    </SuAccordion>
  </div>
</div>

```vue
<template>
  <SuAccordion multiple>
    <SuAccordionItem title="Section 1">
      <p>Plusieurs sections peuvent être ouvertes en même temps.</p>
    </SuAccordionItem>
    <SuAccordionItem title="Section 2">
      <p>Chaque panneau conserve son état d’ouverture.</p>
    </SuAccordionItem>
  </SuAccordion>
</template>
```

### Contenu personnalisé

<div class="component-demo">
  <div class="demo-section">
    <SuAccordion multiple>
      <SuAccordionItem>
        <template #header>
          <Heading level="3">Titre personnalisé</Heading>
        </template>
        <p>Vous pouvez insérer ici n’importe quel contenu Vue.</p>
      </SuAccordionItem>
    </SuAccordion>
  </div>
</div>

```vue
<SuAccordion multiple>
  <SuAccordionItem>
    <template #header>
      <Heading level="3">Titre personnalisé</Heading>
    </template>
    <p>Vous pouvez insérer ici n’importe quel contenu Vue.</p>
  </SuAccordionItem>
</SuAccordion>
```

## API

### Props

**Accordion**

| Prop       | Type      | Par défaut | Description                                                       |
| ---------- | --------- | ---------- | ----------------------------------------------------------------- |
| `multiple` | `boolean` | `false`    | Si `true`, plusieurs panneaux peuvent être ouverts simultanément. |

**AccordionItem**

| Prop    | Type      | Par défaut | Description                                                           |
| ------- | --------- | ---------- | --------------------------------------------------------------------- |
| `title` | `string`  | -           | Titre affiché dans le bouton. Peut être remplacé via le slot `title`. |
| `open`  | `boolean` | `false`    | Définit l’état initial (ouvert/fermé).                                |
| `id`    | `string`  | -           | Identifiant unique facultatif pour l’item.                            |

### Slots

**AccordionItem**

| Nom du slot | Description                             |
| ----------- | --------------------------------------- |
| `title`     | Remplace le contenu du titre du bouton. |
| `default`   | Contenu principal du panneau.           |


## Accessibilité (WAI-ARIA)

Chaque AccordionItem respecte les recommandations W3C :

- Le bouton a aria-expanded et aria-controls
- Le panneau a role="region" et aria-labelledby
- Navigation clavier :
  - Entrée / Espace → ouvrir ou fermer
  - ↑ / ↓ → naviguer entre les en-têtes
  - Home / End → aller au premier ou dernier panneau
- Focus visible mis en évidence


## Bonnes pratiques

Utiliser multiple si le contexte ne nécessite pas une exclusivité d’ouverture.
Fournir des titres clairs et courts pour chaque section.
Ne pas insérer d’éléments interactifs directement dans les titres (préférer les contenus dans les panels).
Préserver une hiérarchie logique de titres (h2, h3, etc.) via le composant Heading.

## Accessibilité vérifiée

- ✔ Gestion complète des rôles et attributs WAI-ARIA
- ✔ Focus visible
- ✔ Navigation clavier fonctionnelle
- ✔ Composants autonomes ou groupés