# Prose

Typographie d'un contenu rédigé : article, page d'aide, rendu Markdown ou contenu d'un CMS. Titres, paragraphes, listes, citations, code, tableaux et images prennent les couleurs et l'espacement du thème.

## Exemples d'utilisation

### Composant

```vue
<SuProse as="article">
  <h2>Installer SurgeUI</h2>
  <p>Le paquet <code>@surgeui/vue</code> fournit les composants, les styles et les types.</p>
  <ul>
    <li>Vue 3.5 ou plus récent</li>
    <li>Un outil de build qui importe le CSS</li>
  </ul>
</SuProse>
```

### Classe seule (HTML rendu)

```vue
<script setup>
import { marked } from 'marked'

const html = marked.parse(markdown)
</script>

<template>
  <article class="su-prose" v-html="html" />
</template>
```

`v-html` insère du HTML tel quel : réservez-le à un contenu de confiance, ou nettoyez-le avant (DOMPurify).

### Tailles

```vue
<SuProse size="sm">…</SuProse>
<SuProse size="lg">…</SuProse>
```

Les tailles des titres, du code et des tableaux suivent celle du texte (unités `em`).

## Éléments mis en forme

| Élément | Rendu |
|---------|-------|
| `h1` à `h6` | Graisse semi-grasse, interligne serré, marge haute plus grande que la marge basse |
| `p`, listes, citations, tableaux | Rythme vertical régulier ; ni marge en tête ni en fin de contenu |
| `a` | Couleur des liens du thème, soulignés, anneau de focus |
| `ul`, `ol`, `li` | Puces et numéros en couleur tertiaire, listes imbriquées |
| `blockquote` | Trait en début de ligne (`border-inline-start`), texte secondaire |
| `code`, `kbd`, `pre` | Police à chasse fixe ; `pre` défile horizontalement et reste de gauche à droite |
| `table` | Pleine largeur, lignes séparées, en-tête appuyé |
| `img`, `video`, `figure` | Largeur maximale du conteneur, coins arrondis, légende secondaire |
| `hr`, `mark`, `small` | Séparateur fin, surlignage doux, texte secondaire |

## Personnalisation

Les règles utilisent `:where()` : leur spécificité est celle de la seule classe `.su-prose`, une règle de votre feuille de style les remplace sans `!important`.

```css
.su-prose h2 {
  color: var(--su-primary-default);
}
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `as` | `string` | `'div'` | Élément rendu (`article`, `section`…) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du texte |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu rédigé |

## Accessibilité

- Les éléments gardent leur sens : la hiérarchie des titres reste celle du contenu.
- Longueur de ligne : limitez la largeur du conteneur (60 à 75 caractères, par exemple `max-inline-size: 70ch`).
- Propriétés logiques : citations, listes et retraits se placent du bon côté en RTL.
- Les liens restent soulignés : ils ne se distinguent pas que par la couleur.
