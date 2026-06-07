# Card

Carte universelle flexible et responsive. Supporte images, titres, contenu, actions, liens, et plusieurs variantes visuelles. Adapte a de nombreux cas d'usage : produit, article de blog, profil, statistiques, etc.

## Exemples d'utilisation

### Basique

<div class="component-demo">
  <div class="demo-section">
    <h4>Carte simple</h4>
    <div class="demo-buttons">
      <SuCard title="Titre de la carte" subtitle="Description courte" maxWidth="320px">
        <p>Contenu principal de la carte.</p>
      </SuCard>
    </div>
  </div>
</div>

```vue
<SuCard title="Titre de la carte" subtitle="Description courte">
  <p>Contenu principal de la carte.</p>
</SuCard>
```

### Variantes

<div class="component-demo">
  <div class="demo-section">
    <h4>default / outlined / elevated / filled</h4>
    <div class="demo-buttons" style="flex-wrap: wrap; align-items: flex-start;">
      <SuCard variant="default" title="Default" subtitle="Bordure standard" maxWidth="220px">
        <p>Contenu.</p>
      </SuCard>
      <SuCard variant="outlined" title="Outlined" subtitle="Bordure prononcee" maxWidth="220px">
        <p>Contenu.</p>
      </SuCard>
      <SuCard variant="elevated" title="Elevated" subtitle="Ombre portee" maxWidth="220px">
        <p>Contenu.</p>
      </SuCard>
      <SuCard variant="filled" title="Filled" subtitle="Fond colore" maxWidth="220px">
        <p>Contenu.</p>
      </SuCard>
    </div>
  </div>
</div>

```vue
<SuCard variant="default" title="Default" />
<SuCard variant="outlined" title="Outlined" />
<SuCard variant="elevated" title="Elevated" />
<SuCard variant="filled" title="Filled" />
```

### Tailles

<div class="component-demo">
  <div class="demo-section">
    <h4>sm / md / lg</h4>
    <div class="demo-buttons" style="align-items: flex-start;">
      <SuCard size="sm" title="Small" subtitle="Compact" maxWidth="200px">
        <p>Contenu sm.</p>
      </SuCard>
      <SuCard size="md" title="Medium" subtitle="Standard" maxWidth="260px">
        <p>Contenu md.</p>
      </SuCard>
      <SuCard size="lg" title="Large" subtitle="Spacieux" maxWidth="320px">
        <p>Contenu lg.</p>
      </SuCard>
    </div>
  </div>
</div>

```vue
<SuCard size="sm" title="Small" />
<SuCard size="md" title="Medium" />
<SuCard size="lg" title="Large" />
```

### Avec image

<div class="component-demo">
  <div class="demo-section">
    <h4>Image en en-tete</h4>
    <div class="demo-buttons">
      <SuCard
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
        imageAlt="Paysage de montagne"
        title="Paysage alpin"
        subtitle="Decouvrez les montagnes"
        maxWidth="320px"
      >
        <p>Une vue imprenable sur les sommets.</p>
      </SuCard>
    </div>
  </div>
</div>

```vue
<SuCard
  image="https://example.com/photo.jpg"
  imageAlt="Description"
  title="Paysage alpin"
  subtitle="Decouvrez les montagnes"
>
  <p>Contenu de la carte.</p>
</SuCard>
```

### Direction horizontale

<div class="component-demo">
  <div class="demo-section">
    <h4>Image a gauche, contenu a droite</h4>
    <div class="demo-buttons">
      <SuCard
        direction="horizontal"
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
        imageAlt="Montagne"
        title="Carte horizontale"
        subtitle="Layout ideal pour les listes"
        maxWidth="600px"
      >
        <p>Ce layout est adapte aux listes d'articles ou resultats de recherche.</p>
      </SuCard>
    </div>
  </div>
</div>

```vue
<SuCard
  direction="horizontal"
  image="/photo.jpg"
  title="Carte horizontale"
>
  <p>Contenu a droite de l'image.</p>
</SuCard>
```

### Carte cliquable

<div class="component-demo">
  <div class="demo-section">
    <h4>Cliquable et lien</h4>
    <div class="demo-buttons" style="align-items: flex-start;">
      <SuCard
        :clickable="true"
        title="Carte cliquable"
        subtitle="Avec hover et focus"
        maxWidth="280px"
      >
        <p>Cliquez sur cette carte.</p>
      </SuCard>
      <SuCard
        href="https://example.com"
        target="_blank"
        title="Carte lien"
        subtitle="Rendue en <a>"
        maxWidth="280px"
      >
        <p>Navigue vers un lien.</p>
      </SuCard>
    </div>
  </div>
</div>

```vue
<!-- Cliquable -->
<SuCard :clickable="true" title="Cliquez" @click="handleClick" />

<!-- Lien -->
<SuCard href="/page" title="Naviguer" />
```

### Avec footer (actions)

<div class="component-demo">
  <div class="demo-section">
    <h4>Zone d'actions en bas</h4>
    <div class="demo-buttons">
      <SuCard
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
        imageAlt="Montagne"
        title="Destination de reve"
        subtitle="A partir de 299 EUR"
        maxWidth="340px"
      >
        <p>Decouvrez cette destination.</p>
        <template #footer>
          <SuButton variant="primary" size="sm">Reserver</SuButton>
          <SuButton variant="ghost" size="sm">Details</SuButton>
        </template>
      </SuCard>
    </div>
  </div>
</div>

```vue
<SuCard title="Destination" subtitle="299 EUR">
  <p>Description.</p>
  <template #footer>
    <SuButton variant="primary" size="sm">Reserver</SuButton>
    <SuButton variant="ghost" size="sm">Details</SuButton>
  </template>
</SuCard>
```

### Overlay sur image

<div class="component-demo">
  <div class="demo-section">
    <h4>Badge sur l'image</h4>
    <div class="demo-buttons">
      <SuCard
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
        imageAlt="Montagne"
        title="Article populaire"
        maxWidth="340px"
      >
        <template #image-overlay>
          <SuBadge variant="primary" size="sm">Populaire</SuBadge>
        </template>
        <p>Contenu avec badge overlay.</p>
      </SuCard>
    </div>
  </div>
</div>

```vue
<SuCard image="/photo.jpg" title="Article">
  <template #image-overlay>
    <SuBadge variant="primary" size="sm">Populaire</SuBadge>
  </template>
</SuCard>
```

## API

### Props

| Prop | Type | Defaut | Description |
|------|------|--------|-------------|
| `variant` | `'default' \| 'outlined' \| 'elevated' \| 'filled'` | `'default'` | Variante visuelle |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille |
| `direction` | `'vertical' \| 'horizontal'` | `'vertical'` | Direction du layout |
| `radius` | `Radius` | `'md'` | Rayon des coins |
| `clickable` | `boolean` | `false` | Rend la carte cliquable |
| `href` | `string` | — | Lien href (rend la carte en `<a>`) |
| `target` | `LinkTarget` | — | Attribut target pour les liens |
| `image` | `string` | — | URL de l'image |
| `imageAlt` | `string` | — | Alt text de l'image |
| `imageRatio` | `'16/9' \| '4/3' \| '1/1' \| '21/9' \| 'auto'` | `'16/9'` | Ratio de l'image |
| `imageFit` | `'cover' \| 'contain' \| 'fill'` | `'cover'` | Ajustement de l'image |
| `imagePosition` | `'top' \| 'bottom'` | `'top'` | Position de l'image |
| `title` | `string` | — | Titre |
| `subtitle` | `string` | — | Sous-titre |
| `titleLevel` | `1-6` | `3` | Niveau de heading |
| `disabled` | `boolean` | `false` | Etat desactive |
| `fullWidth` | `boolean` | `false` | Pleine largeur |
| `maxWidth` | `string` | — | Largeur max personnalisee |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu principal |
| `image` | Zone image personnalisee (remplace la prop `image`) |
| `image-overlay` | Overlay sur l'image (badges, tags) |
| `header` | En-tete au-dessus du contenu (apres l'image) |
| `title` | Titre personnalise |
| `subtitle` | Sous-titre personnalise |
| `footer` | Zone d'actions en bas |

### Evenements

| Evenement | Payload | Description |
|-----------|---------|-------------|
| `click` | `MouseEvent` | Emis au clic (si `clickable` ou `href`) |

## Accessibilite

- Rendu en `<article>` par defaut, `<a>` si `href` est fourni
- `role="button"` + `tabindex="0"` si cliquable sans href
- Navigation clavier : `Enter` et `Space` declenchent le clic
- `aria-disabled="true"` quand desactive
- `rel="noopener noreferrer"` automatique si `target="_blank"`
- `loading="lazy"` sur les images
- Support `prefers-contrast: high` et `prefers-reduced-motion: reduce`
- Direction horizontale repasse en vertical sur mobile (< 640px)
