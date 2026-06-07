# Card

Universal, flexible, and responsive card component. Supports images, titles, content, actions, links, and multiple visual variants. Suitable for many use cases: product, blog post, profile, stats, etc.

## Usage

### Basic

<div class="component-demo">
  <div class="demo-section">
    <h4>Simple card</h4>
    <div class="demo-buttons">
      <SuCard title="Card title" subtitle="A short description" maxWidth="320px">
        <p>Main content of the card.</p>
      </SuCard>
    </div>
  </div>
</div>

```vue
<SuCard title="Card title" subtitle="A short description">
  <p>Main content of the card.</p>
</SuCard>
```

### Variants

<div class="component-demo">
  <div class="demo-section">
    <h4>default / outlined / elevated / filled</h4>
    <div class="demo-buttons" style="flex-wrap: wrap; align-items: flex-start;">
      <SuCard variant="default" title="Default" subtitle="Standard border" maxWidth="220px">
        <p>Content.</p>
      </SuCard>
      <SuCard variant="outlined" title="Outlined" subtitle="Strong border" maxWidth="220px">
        <p>Content.</p>
      </SuCard>
      <SuCard variant="elevated" title="Elevated" subtitle="Box shadow" maxWidth="220px">
        <p>Content.</p>
      </SuCard>
      <SuCard variant="filled" title="Filled" subtitle="Colored background" maxWidth="220px">
        <p>Content.</p>
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

### Sizes

<div class="component-demo">
  <div class="demo-section">
    <h4>sm / md / lg</h4>
    <div class="demo-buttons" style="align-items: flex-start;">
      <SuCard size="sm" title="Small" subtitle="Compact" maxWidth="200px">
        <p>Content sm.</p>
      </SuCard>
      <SuCard size="md" title="Medium" subtitle="Standard" maxWidth="260px">
        <p>Content md.</p>
      </SuCard>
      <SuCard size="lg" title="Large" subtitle="Spacious" maxWidth="320px">
        <p>Content lg.</p>
      </SuCard>
    </div>
  </div>
</div>

```vue
<SuCard size="sm" title="Small" />
<SuCard size="md" title="Medium" />
<SuCard size="lg" title="Large" />
```

### With image

<div class="component-demo">
  <div class="demo-section">
    <h4>Header image</h4>
    <div class="demo-buttons">
      <SuCard
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
        imageAlt="Mountain landscape"
        title="Alpine landscape"
        subtitle="Discover the mountains"
        maxWidth="320px"
      >
        <p>A breathtaking view of the peaks.</p>
      </SuCard>
    </div>
  </div>
</div>

```vue
<SuCard
  image="/photo.jpg"
  imageAlt="Description"
  title="Alpine landscape"
  subtitle="Discover the mountains"
>
  <p>Card content.</p>
</SuCard>
```

### Horizontal direction

<div class="component-demo">
  <div class="demo-section">
    <h4>Image left, content right</h4>
    <div class="demo-buttons">
      <SuCard
        direction="horizontal"
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
        imageAlt="Mountain"
        title="Horizontal card"
        subtitle="Ideal for lists"
        maxWidth="600px"
      >
        <p>This layout is suited for article lists or search results.</p>
      </SuCard>
    </div>
  </div>
</div>

```vue
<SuCard direction="horizontal" image="/photo.jpg" title="Horizontal card">
  <p>Content to the right of the image.</p>
</SuCard>
```

### Clickable card

<div class="component-demo">
  <div class="demo-section">
    <h4>Clickable and link</h4>
    <div class="demo-buttons" style="align-items: flex-start;">
      <SuCard
        :clickable="true"
        title="Clickable card"
        subtitle="With hover and focus"
        maxWidth="280px"
      >
        <p>Click this card.</p>
      </SuCard>
      <SuCard
        href="https://example.com"
        target="_blank"
        title="Link card"
        subtitle="Rendered as <a>"
        maxWidth="280px"
      >
        <p>Navigates to a link.</p>
      </SuCard>
    </div>
  </div>
</div>

```vue
<!-- Clickable -->
<SuCard :clickable="true" title="Click me" @click="handleClick" />

<!-- Link -->
<SuCard href="/page" title="Navigate" />
```

### With footer (actions)

<div class="component-demo">
  <div class="demo-section">
    <h4>Action area at the bottom</h4>
    <div class="demo-buttons">
      <SuCard
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
        imageAlt="Mountain"
        title="Dream destination"
        subtitle="From 299 EUR"
        maxWidth="340px"
      >
        <p>Discover this exceptional destination.</p>
        <template #footer>
          <SuButton variant="primary" size="sm">Book</SuButton>
          <SuButton variant="ghost" size="sm">Details</SuButton>
        </template>
      </SuCard>
    </div>
  </div>
</div>

```vue
<SuCard title="Destination" subtitle="299 EUR">
  <template #footer>
    <SuButton variant="primary" size="sm">Book</SuButton>
    <SuButton variant="ghost" size="sm">Details</SuButton>
  </template>
</SuCard>
```

### Image overlay

<div class="component-demo">
  <div class="demo-section">
    <h4>Badge on image</h4>
    <div class="demo-buttons">
      <SuCard
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
        imageAlt="Mountain"
        title="Popular article"
        maxWidth="340px"
      >
        <template #image-overlay>
          <SuBadge variant="primary" size="sm">Popular</SuBadge>
        </template>
        <p>Content with badge overlay.</p>
      </SuCard>
    </div>
  </div>
</div>

```vue
<SuCard image="/photo.jpg" title="Article">
  <template #image-overlay>
    <SuBadge variant="primary" size="sm">Popular</SuBadge>
  </template>
</SuCard>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'outlined' \| 'elevated' \| 'filled'` | `'default'` | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `direction` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout direction |
| `radius` | `Radius` | `'md'` | Border radius |
| `clickable` | `boolean` | `false` | Makes the card clickable |
| `href` | `string` | — | Link href (renders card as `<a>`) |
| `target` | `LinkTarget` | — | Target attribute for links |
| `image` | `string` | — | Image URL |
| `imageAlt` | `string` | — | Image alt text |
| `imageRatio` | `'16/9' \| '4/3' \| '1/1' \| '21/9' \| 'auto'` | `'16/9'` | Image aspect ratio |
| `imageFit` | `'cover' \| 'contain' \| 'fill'` | `'cover'` | Image object-fit |
| `imagePosition` | `'top' \| 'bottom'` | `'top'` | Image position |
| `title` | `string` | — | Title |
| `subtitle` | `string` | — | Subtitle |
| `titleLevel` | `1-6` | `3` | Heading level |
| `disabled` | `boolean` | `false` | Disabled state |
| `fullWidth` | `boolean` | `false` | Full width |
| `maxWidth` | `string` | — | Custom max width |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Main content |
| `image` | Custom image area (replaces `image` prop) |
| `image-overlay` | Overlay on image (badges, tags) |
| `header` | Header above content (after image) |
| `title` | Custom title |
| `subtitle` | Custom subtitle |
| `footer` | Action area at the bottom |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent` | Emitted on click (if `clickable` or `href`) |

## Accessibility

- Rendered as `<article>` by default, `<a>` if `href` is provided
- `role="button"` + `tabindex="0"` when clickable without href
- Keyboard navigation: `Enter` and `Space` trigger click
- `aria-disabled="true"` when disabled
- `rel="noopener noreferrer"` automatic with `target="_blank"`
- `loading="lazy"` on images
- Supports `prefers-contrast: high` and `prefers-reduced-motion: reduce`
- Horizontal direction switches to vertical on mobile (< 640px)
