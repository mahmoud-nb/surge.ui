# Link

Flexible Link component for internal and external links with icon support, variants, and full accessibility. Compatible with Vue Router and native HTML links.

## Usage Examples

### Basic Link

```vue
<template>
  <!-- Native HTML link -->
  <SuLink href="/home">Internal link</SuLink>
  
  <!-- External link (automatically adds target="_blank" and rel="noopener") -->
  <SuLink href="https://vuejs.org" external>External link</SuLink>
  
  <!-- Vue Router link -->
  <SuLink to="/dashboard">Vue Router link</SuLink>
</template>
```

### Variants

```vue
<template>
  <SuLink variant="default" href="#">Default link</SuLink>
  <SuLink variant="primary" href="#">Primary link</SuLink>
  <SuLink variant="secondary" href="#">Secondary link</SuLink>
  <SuLink variant="muted" href="#">Muted link</SuLink>
</template>
```

### Sizes

```vue
<template>
  <SuLink size="sm" href="#">Small</SuLink>
  <SuLink size="md" href="#">Medium</SuLink>
  <SuLink size="lg" href="#">Large</SuLink>
</template>
```

### Underline

```vue
<template>
  <SuLink underline="always" href="#">Always underlined</SuLink>
  <SuLink underline="hover" href="#">Underlined on hover</SuLink>
  <SuLink underline="never" href="#">Never underlined</SuLink>
</template>
```

### With Icons

```vue
<script setup>
import { HomeIcon, ArrowRightIcon, UserIcon, ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <!-- Icon before text -->
  <SuLink href="/home" :icon="HomeIcon" iconDisplay="left">
    Home
  </SuLink>
  
  <!-- Icon after text -->
  <SuLink href="/next" :icon="ArrowRightIcon" iconDisplay="right">
    Next
  </SuLink>
  
  <!-- Icon only (requires aria-label) -->
  <SuLink href="/profile" :icon="UserIcon" iconDisplay="only" aria-label="User profile" />
  
  <!-- External link with icon -->
  <SuLink href="https://github.com" external :icon="ArrowTopRightOnSquareIcon" iconDisplay="left">
    GitHub
  </SuLink>
</template>
```

### States

```vue
<template>
  <SuLink href="#">Normal link</SuLink>
  <SuLink href="#" :disabled="true">Disabled link</SuLink>
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | `undefined` | Destination URL (native HTML links) |
| `to` | `string \\| object` | `undefined` | Destination route (Vue Router) |
| `target` | `'_blank' \\| '_self' \\| '_parent' \\| '_top'` | `undefined` | Link target |
| `rel` | `string` | `undefined` | Link relationship |
| `variant` | `'default' \\| 'primary' \\| 'secondary' \\| 'muted'` | `'default'` | Visual variant of the link |
| `size` | `'sm' \\| 'md' \\| 'lg'` | `'md'` | Link size |
| `underline` | `'always' \\| 'hover' \\| 'never'` | `'hover'` | Underline behavior |
| `disabled` | `boolean` | `false` | Disables the link |
| `external` | `boolean` | `false` | Marks the link as external |
| `icon` | `Component` | `undefined` | Icon to display |
| `iconDisplay` | `'top' \\| 'left' \\| 'right' \\| 'only'` | `'left'` | Icon position |

### Accessibility Attributes

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ariaLabel` | `string` | `undefined` | Accessible label |
| `ariaDescribedBy` | `string` | `undefined` | ID of the description element |
| `role` | `string` | `undefined` | Custom ARIA role |
| `tabIndex` | `number` | `0` | Tab order |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `@click` | `(event: MouseEvent) => void` | Emitted when the link is clicked |
| `@focus` | `(event: FocusEvent) => void` | Emitted when the link receives focus |
| `@blur` | `(event: FocusEvent) => void` | Emitted when the link loses focus |
| `@keydown` | `(event: KeyboardEvent) => void` | Emitted when a key is pressed |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Link content |

## Automatic External Link Detection

The component automatically detects external links and applies security best practices:

### 🔍 Detection Criteria

- `external` prop set to `true`
- URL starting with `http://` or `https://`
- URL starting with `//`
- `target` prop set to `_blank`

### 🛡️ Automatic Security

For external links, the component automatically adds:
- `target="_blank"` (if not defined)
- `rel="noopener noreferrer"` (if not defined)
- Automatic external icon (if no custom icon)

```vue
<!-- These links are equivalent -->
<SuLink href="https://vuejs.org" external>Vue.js</SuLink>
<SuLink href="https://vuejs.org" target="_blank" rel="noopener noreferrer">Vue.js</SuLink>
```

## Global Configuration

You can configure default link values when installing the design system:

```js
// main.js
import { createApp } from 'vue'
import SurgeUpDS from '@surgeui/ds-vue'
import '@surgeui/ds-vue/style.css'

const app = createApp(App)

// Configure default values
app.use(SurgeUpDS, {
  linkVariant: 'primary',  // All links will be primary by default
  linkSize: 'lg',         // All links will be large by default
  linkUnderline: 'never'  // All links will never be underlined by default
})
```

### Usage with Global Configuration

```vue
<template>
  <!-- These links will use globally configured values -->
  <SuLink href="/page">Link with global config</SuLink>
  <SuLink variant="default" size="default" underline="default" href="/page">Same thing explicitly</SuLink>
  
  <!-- These links override global configuration -->
  <SuLink variant="secondary" href="/page">Specific variant</SuLink>
  <SuLink size="sm" href="/page">Specific size</SuLink>
  <SuLink underline="always" href="/page">Specific underline</SuLink>
</template>
```

### Available Configuration Options

| Option | Type | Description |
|--------|------|-------------|
| `linkVariant` | `'default' \\| 'primary' \\| 'secondary' \\| 'muted'` | Default variant |
| `linkSize` | `'sm' \\| 'md' \\| 'lg'` | Default size |
| `linkUnderline` | `'always' \\| 'hover' \\| 'never'` | Default underline |

## Accessibility

The Link component complies with WCAG 2.1 AA standards:

### ✅ Accessibility Features

- **Keyboard navigation**: Support for Enter and Space keys
- **Visible focus**: Clear and contrasted focus indicator
- **Contrast**: WCAG AA compliant contrast ratios (4.5:1 minimum)
- **ARIA states**: Full support for ARIA attributes
- **Screen readers**: Accessible labels and descriptions
- **External links**: Clear indication with icon and security attributes
- **Dark mode**: Automatically adapted contrast
- **High contrast**: Support for `prefers-contrast: high`
- **Reduced motion**: Respects `prefers-reduced-motion`

### 🎯 Best Practices

```vue
<!-- Link with icon only (REQUIRED: aria-label) -->
<SuLink href="/profile" :icon="UserIcon" iconDisplay="only" aria-label="User profile" />

<!-- Link with icon and text -->
<SuLink href="/home" :icon="HomeIcon" iconDisplay="left">Home</SuLink>

<!-- Secure external link -->
<SuLink href="https://example.com" external>External site</SuLink>

<!-- Link with description -->
<SuLink href="/help" aria-describedby="help-description">
  Help
</SuLink>
<div id="help-description">Access help documentation</div>

<!-- Accessible navigation -->
<nav role="navigation" aria-label="Main navigation">
  <SuLink href="/">Home</SuLink>
  <SuLink href="/about">About</SuLink>
  <SuLink href="/contact">Contact</SuLink>
</nav>
```

## Usage Examples

### Main Navigation

```vue
<script setup>
import { HomeIcon, UserIcon, CogIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <nav role="navigation" aria-label="Main navigation">
    <SuLink href="/" :icon="HomeIcon" iconDisplay="left" variant="primary">
      Home
    </SuLink>
    <SuLink href="/profile" :icon="UserIcon" iconDisplay="left">
      Profile
    </SuLink>
    <SuLink href="/settings" :icon="CogIcon" iconDisplay="left">
      Settings
    </SuLink>
  </nav>
</template>
```

### Breadcrumb

```vue
<template>
  <nav role="navigation" aria-label="Breadcrumb">
    <SuLink href="/" variant="muted" size="sm">Home</SuLink>
    <span>/</span>
    <SuLink href="/products" variant="muted" size="sm">Products</SuLink>
    <span>/</span>
    <SuLink href="/products/laptops" variant="muted" size="sm">Laptops</SuLink>
    <span>/</span>
    <span>MacBook Pro</span>
  </nav>
</template>
```

### Footer with External Links

```vue
<template>
  <footer>
    <div class="footer-links">
      <SuLink href="/privacy" variant="muted" underline="never">
        Privacy
      </SuLink>
      <SuLink href="/terms" variant="muted" underline="never">
        Terms of Service
      </SuLink>
      <SuLink href="https://github.com/company" external variant="muted">
        GitHub
      </SuLink>
      <SuLink href="https://twitter.com/company" external variant="muted">
        Twitter
      </SuLink>
    </div>
  </footer>
</template>

<style scoped>
.footer-links {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  padding: 2rem 0;
}
</style>
```

### Links with Event Handlers

```vue
<script setup>
const handleLinkClick = (event) => {
  console.log('Link clicked:', event)
}

const handleExternalClick = (event) => {
  // Analytics or confirmation before redirect
  console.log('External link clicked')
}
</script>

<template>
  <div>
    <SuLink href="/page" @click="handleLinkClick">
      Link with handler
    </SuLink>
    
    <SuLink href="https://example.com" external @click="handleExternalClick">
      External link with analytics
    </SuLink>
  </div>
</template>
```

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Navigate to/from the link |
| `Enter` | Activate the link |
| `Space` | Activate the link |

## Vue Router Compatibility

The component automatically detects if the `to` prop is provided and uses `<router-link>` instead of `<a>`:

```vue
<!-- Uses <router-link> -->
<SuLink to="/dashboard">Dashboard</SuLink>
<SuLink :to="{ name: 'user', params: { id: 123 } }">User profile</SuLink>

<!-- Uses <a> -->
<SuLink href="/static-page">Static page</SuLink>
<SuLink href="https://external.com" external>External site</SuLink>
```

## External Link Security

For all external links, the component automatically applies security best practices:

### 🛡️ Security Attributes

- `target="_blank"`: Opens in a new tab
- `rel="noopener noreferrer"`: Prevents "tabnabbing" attacks
- Automatic external icon to visually indicate redirection

### 🎯 Security Examples

```vue
<!-- Automatically secured -->
<SuLink href="https://external.com" external>
  External site
</SuLink>

<!-- Equivalent to -->
<a href="https://external.com" target="_blank" rel="noopener noreferrer">
  External site
  <ArrowTopRightOnSquareIcon />
</a>
```

  