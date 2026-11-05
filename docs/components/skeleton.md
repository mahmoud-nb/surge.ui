# Skeleton

Silhouette d'un contenu en cours de chargement : lignes de texte, cercle (avatar) ou rectangle (image, carte). Elle réserve la place du contenu et évite les sauts de mise en page.

## Exemples d'utilisation

### Variantes

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons-vertical" style="max-width: 20rem">
      <SuSkeleton />
      <SuSkeleton variant="circle" width="3rem" />
      <SuSkeleton variant="rect" height="6rem" radius="lg" />
    </div>
  </div>
</div>

```vue
<SuSkeleton />
<SuSkeleton variant="circle" width="3rem" />
<SuSkeleton variant="rect" height="6rem" radius="lg" />
```

### Plusieurs lignes

La dernière ligne est plus courte. La hauteur d'une ligne suit la taille de police du parent.

<div class="component-demo">
  <div class="demo-section">
    <div style="max-width: 20rem">
      <SuSkeleton :lines="3" />
    </div>
  </div>
</div>

```vue
<SuSkeleton :lines="3" />
```

### Carte en chargement

Signalez le chargement sur le conteneur avec `aria-busy="true"`.

<div class="component-demo">
  <div class="demo-section">
    <div aria-busy="true" style="display: flex; gap: 0.75rem; max-width: 22rem; padding: 1rem; border: 1px solid var(--su-border-alpha); border-radius: var(--su-radius-container);">
      <SuSkeleton variant="circle" width="2.5rem" />
      <div style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem;">
        <SuSkeleton width="40%" />
        <SuSkeleton :lines="2" />
      </div>
    </div>
  </div>
</div>

```vue
<div :aria-busy="loading">
  <template v-if="loading">
    <SuSkeleton variant="circle" width="2.5rem" />
    <SuSkeleton width="40%" />
    <SuSkeleton :lines="2" />
  </template>
  <UserCard v-else :user="user" />
</div>
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `variant` | `'text' \| 'circle' \| 'rect'` | `'text'` | Forme |
| `width` | `string` | `100%` (cercle : `2.5rem`) | Largeur CSS ; diamètre pour `circle` |
| `height` | `string` | une ligne (`1em`), `8rem` pour `rect` | Hauteur CSS |
| `lines` | `number` | `1` | Nombre de lignes (variante `text`) |
| `animated` | `boolean` | `true` | Pulsation lente |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | - | Rayon de bordure |

## Accessibilité

- Le squelette est décoratif (`aria-hidden="true"`) : il n'est pas lu.
- Signalez le chargement sur le conteneur (`aria-busy="true"`), avec un `SuSpinner` nommé ou une annonce (`useAnnouncer`) si l'attente est longue.
- La pulsation est supprimée avec `prefers-reduced-motion`. En contraste élevé, la teinte est renforcée.
