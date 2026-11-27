# Avatar

Avatar component based on the Image component to display a profile picture or user initials. Supports notification badges, status indicators and complete accessibility according to W3C standards.

## Usage examples

### Basic Avatar

<div class="component-demo">
  <div class="demo-section">
    <h4>Avatar with image</h4>
    <div class="demo-inputs">
      <SuAvatar 
        src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100"
        alt="Profile picture"
        name="John Doe"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuAvatar 
    src="https://example.com/photo.jpg"
    alt="Profile picture"
    name="John Doe"
  />
</template>
```

### Avatar with initials

<div class="component-demo">
  <div class="demo-section">
    <h4>Avatar without image (initials)</h4>
    <div class="demo-inputs">
      <SuAvatar 
        name="Marie Dupont"
        alt="Marie Dupont's avatar"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuAvatar 
    name="Marie Dupont"
    alt="Marie Dupont's avatar"
  />
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | `undefined` | Profile image URL |
| `alt` | `string` | `undefined` | Alternative text for image |
| `fallback` | `string` | `undefined` | Fallback image on error |
| `name` | `string` | `undefined` | Name to generate initials |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Avatar size |
| `variant` | `'circle' \| 'rounded' \| 'square'` | `'circle'` | Avatar shape |
| `status` | `'online' \| 'offline' \| 'away' \| 'busy'` | `undefined` | User status |
| `badge` | `string \| number` | `undefined` | Notification badge |
| `badgeColor` | `string` | `undefined` | Custom badge color |
| `loading` | `boolean` | `false` | Loading state |
| `clickable` | `boolean` | `false` | Clickable avatar |
| `badgeProps` | `BadgeProps` | - | Props passed to the avatar Badge (variant, size…) |
| `loadingLabel` | `string` | - | Text read while the image loads (translated otherwise) |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `@click` | `(event: MouseEvent) => void` | Emitted on click (if clickable) |
| `@load` | `(event: Event) => void` | Emitted when image is loaded |
| `@error` | `(event: Event) => void` | Emitted if image fails to load |

## Accessibility

The Avatar component follows WCAG 2.1 AA standards with complete keyboard navigation and screen reader support.