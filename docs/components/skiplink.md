# SkipLink

Lien d'évitement : premier élément atteint au clavier, il mène directement au contenu principal sans repasser par l'en-tête et la navigation (critère WCAG 2.4.1). Il reste masqué jusqu'au focus clavier.

`SuAppShell` et `SuHolyGrailLayout` l'intègrent déjà : utilisez `SuSkipLink` seul dans une mise en page personnalisée.

## Exemples d'utilisation

### Utilisation de base

Cliquez dans le cadre, puis appuyez sur <kbd>Tab</kbd> : le lien apparaît en haut à gauche de la fenêtre.

<div class="component-demo">
  <div class="demo-section">
    <SuSkipLink target="demo-skip-main" label="Aller à la démo" />
    <p id="demo-skip-main" style="margin: 0;">Contenu principal de la démo : il reçoit le focus quand on suit le lien.</p>
  </div>
</div>

```vue
<template>
  <SuSkipLink target="contenu" />
  <header>…</header>
  <nav aria-label="Navigation principale">…</nav>
  <main id="contenu">…</main>
</template>
```

Le lien donne le focus à la cible par programme (avec `tabindex="-1"` si elle n'est pas focalisable) : il fonctionne même quand le routeur de l'application intercepte les ancres `#`.

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `target` | `string` | `'main-content'` | `id` de l'élément atteint |
| `label` | `string` | `'Aller au contenu principal'` | Texte du lien |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Texte du lien |

## Accessibilité

- Placez le lien en tout premier dans la page, avant l'en-tête.
- Masqué visuellement (pas `display: none`) : il reste atteint au clavier et apparaît au focus, au-dessus des barres collantes.
- La cible reçoit le focus : la lecture et la tabulation reprennent au début du contenu principal.
