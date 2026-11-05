# Skeleton

A placeholder for content that is loading: text lines, a circle (avatar) or a rectangle (image, card). It reserves the content's space and prevents layout shifts.

## Usage

### Variants

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

### Multiple lines

The last line is shorter. A line's height follows the parent font size.

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

### Loading card

Flag the loading state on the container with `aria-busy="true"`.

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

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'text' \| 'circle' \| 'rect'` | `'text'` | Shape |
| `width` | `string` | `100%` (circle: `2.5rem`) | CSS width; diameter for `circle` |
| `height` | `string` | one line (`1em`), `8rem` for `rect` | CSS height |
| `lines` | `number` | `1` | Number of lines (`text` variant) |
| `animated` | `boolean` | `true` | Slow pulse |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | - | Border radius |

## Accessibility

- The skeleton is decorative (`aria-hidden="true"`): it is not read.
- Flag the loading state on the container (`aria-busy="true"`), with a named `SuSpinner` or an announcement (`useAnnouncer`) for long waits.
- The pulse is removed with `prefers-reduced-motion`. In high contrast mode, the tint is stronger.
