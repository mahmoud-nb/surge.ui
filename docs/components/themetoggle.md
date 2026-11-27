# ThemeToggle

Bascule entre les modes clair et sombre, ou choix entre clair, sombre et système. Le composant pilote [useTheme](/composables/usetheme) : l'état est partagé par toute l'application et enregistré dans le navigateur si `persist` est actif.

## Exemples d'utilisation

### Bouton bascule

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons">
      <SuThemeToggle />
    </div>
  </div>
</div>

```vue
<SuThemeToggle />
```

Le bouton s'appelle « Mode sombre » et indique son état par `aria-pressed` : enfoncé en mode sombre. Depuis le mode système, il passe au mode opposé à celui appliqué.

### Clair, sombre ou système

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons">
      <SuThemeToggle variant="segmented" />
    </div>
  </div>
</div>

```vue
<SuThemeToggle variant="segmented" />
```

### Tailles

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons-vertical">
      <SuThemeToggle variant="segmented" size="sm" />
      <SuThemeToggle variant="segmented" size="lg" />
    </div>
  </div>
</div>

```vue
<SuThemeToggle variant="segmented" size="sm" />
<SuThemeToggle variant="segmented" size="lg" />
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `variant` | `'button' \| 'segmented'` | `'button'` | Bouton bascule, ou trois options |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille |
| `label` | `string` | `'Mode sombre'` / `'Apparence'` | Nom du bouton, ou du groupe (variante `segmented`) |
| `lightLabel` | `string` | `'Clair'` | Option claire |
| `darkLabel` | `string` | `'Sombre'` | Option sombre |
| `systemLabel` | `string` | `'Système'` | Option système (suit `prefers-color-scheme`) |

### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `change` | `ThemeMode` | Mode choisi : `'light'`, `'dark'` ou `'system'` |

## Accessibilité

- Variante `button` : bouton bascule nommé « Mode sombre », état annoncé par `aria-pressed` ; l'icône (soleil ou lune) est décorative.
- Variante `segmented` : groupe nommé « Apparence » (`role="group"`) de trois boutons à `aria-pressed`, libellés visibles.
- Rendu serveur : la préférence enregistrée n'est lue qu'après le montage, sans écart d'hydratation.
