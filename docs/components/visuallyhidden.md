# VisuallyHidden

Contenu lu par les lecteurs d'écran mais invisible à l'écran : libellé d'un bouton icône, précision de contexte (« (s'ouvre dans un nouvel onglet) »), lien d'évitement.

## Exemples d'utilisation

### Libellé d'un bouton icône

<div class="component-demo">
  <div class="demo-section">
    <button type="button" style="display: inline-flex; padding: 0.5rem; border: 1px solid var(--su-border-alpha); border-radius: 8px">
      <TrashIcon style="width: 1rem; height: 1rem" aria-hidden="true" />
      <SuVisuallyHidden>Supprimer le fichier</SuVisuallyHidden>
    </button>
  </div>
</div>

```vue
<button type="button">
  <TrashIcon aria-hidden="true" />
  <SuVisuallyHidden>Supprimer le fichier</SuVisuallyHidden>
</button>
```

### Lien d'évitement

Avec `focusable`, le contenu réapparaît quand il reçoit le focus. Appuyez sur `Tab` dans la démo.

<div class="component-demo">
  <div class="demo-section">
    <SuVisuallyHidden as="a" href="#contenu-demo" focusable style="padding: 0.5rem 0.75rem; border-radius: 8px; background: var(--su-bg-surface-elevated); box-shadow: var(--su-shadow-popover)">
      Aller au contenu principal
    </SuVisuallyHidden>
    <p id="contenu-demo">Contenu de la page.</p>
  </div>
</div>

```vue
<SuVisuallyHidden as="a" href="#main" focusable class="skip-link">
  Aller au contenu principal
</SuVisuallyHidden>
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `as` | `string` | `'span'` | Élément rendu |
| `focusable` | `boolean` | `false` | Visible quand le contenu (ou un de ses enfants) a le focus |

## Accessibilité

- Masquage accessible (`clip-path`, taille 1px) : le contenu reste dans l'arbre d'accessibilité, contrairement à `display: none`.
- Pour un bouton icône, `aria-label` sur le bouton fonctionne aussi ; `VisuallyHidden` garde le texte dans le DOM (traduction automatique, recherche).
