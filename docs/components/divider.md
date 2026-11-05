# Divider

Trait de séparation horizontal ou vertical, avec un texte optionnel au milieu (« ou », une date).

## Exemples d'utilisation

### Horizontal et vertical

<div class="component-demo">
  <div class="demo-section">
    <div style="max-width: 22rem">
      <p style="margin: 0">Au-dessus</p>
      <SuDivider />
      <p style="margin: 0">En dessous</p>
    </div>
    <div style="display: flex; align-items: center; height: 1.5rem; margin-top: 1.5rem">
      <span>Profil</span>
      <SuDivider orientation="vertical" spacing="sm" />
      <span>Paramètres</span>
      <SuDivider orientation="vertical" spacing="sm" />
      <span>Déconnexion</span>
    </div>
  </div>
</div>

```vue
<SuDivider />
<SuDivider orientation="vertical" spacing="sm" />
```

### Avec texte

<div class="component-demo">
  <div class="demo-section">
    <div style="max-width: 22rem">
      <SuDivider label="ou" />
      <SuDivider label="Aujourd'hui" label-align="start" />
      <SuDivider label="Fin de la liste" variant="dashed" label-align="end" />
    </div>
  </div>
</div>

```vue
<SuDivider label="ou" />
<SuDivider label="Aujourd'hui" label-align="start" />
<SuDivider label="Fin de la liste" variant="dashed" label-align="end" />
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientation |
| `variant` | `'solid' \| 'dashed'` | `'solid'` | Style du trait |
| `label` | `string` | - | Texte au milieu (ou slot par défaut), horizontal seulement |
| `labelAlign` | `'start' \| 'center' \| 'end'` | `'center'` | Position du texte |
| `spacing` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Espace autour du trait |
| `decorative` | `boolean` | `false` | Trait purement visuel, masqué aux lecteurs d'écran |

## Accessibilité

- Sans texte : `role="separator"`, avec `aria-orientation="vertical"` en vertical.
- Avec texte : le texte est lu normalement, les traits sont décoratifs.
- `decorative` : `aria-hidden="true"`, pour un trait qui ne sépare pas de vraies sections (ex. dans une barre d'outils).
