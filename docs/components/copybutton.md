# CopyButton

Copie un texte dans le presse-papiers. Le libellé passe à « Copié » quelques secondes et le résultat est annoncé aux lecteurs d'écran.

## Exemples d'utilisation

### Utilisation de base

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons">
      <SuCopyButton value="npm install @surgeui/vue" variant="outline" />
    </div>
  </div>
</div>

```vue
<SuCopyButton value="npm install @surgeui/vue" variant="outline" />
```

### Icône seule

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons">
      <SuCopyButton value="sk_live_51Hx4f2a" icon-only label="Copier la clé" />
    </div>
  </div>
</div>

```vue
<SuCopyButton value="sk_live_51Hx4f2a" icon-only label="Copier la clé" />
```

Avec `icon-only`, le libellé reste le nom du bouton : nommez-le d'après ce qu'il copie (« Copier la clé », « Copier le lien »).

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `string` | - | Texte copié |
| `label` | `string` | `'Copier'` | Nom du bouton |
| `copiedLabel` | `string` | `'Copié'` | Libellé affiché après la copie |
| `iconOnly` | `boolean` | `false` | Icône seule (le nom reste lu) |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'ghost'` | Variante du bouton |
| `size` | `'sm' \| 'md' \| 'lg'` | `'sm'` | Taille |
| `timeout` | `number` | `2000` | Durée de l'état « copié » (ms) |

### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `copy` | `string` | Copie réussie |
| `error` | `unknown` | Copie impossible (permission refusée, navigateur) |

## Accessibilité

- Le nom du bouton ne change pas : un changement de nom pendant le focus n'est pas lu de façon fiable.
- Le résultat est annoncé par une région live ([useAnnouncer](/composables/useannouncer)) : « Copié dans le presse-papiers », ou « Impossible de copier » (annonce prioritaire).
- La coche de confirmation est décorative ; le libellé visible passe à « Copié ».
