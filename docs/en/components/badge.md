# Badge

Modern and minimalist Badge component for displaying short information, statuses or notifications. Support for icons, dot variants and complete accessibility according to W3C standards.

## Usage examples

### Basic Badge

<div class="component-demo">
  <div class="demo-section">
    <h4>Simple badge</h4>
    <div class="demo-buttons">
      <SuBadge>Default badge</SuBadge>
      <SuBadge variant="primary">Primary</SuBadge>
      <SuBadge variant="success">Success</SuBadge>
    </div>
  </div>
</div>

```vue
<template>
  <SuBadge>Default badge</SuBadge>
  <SuBadge variant="primary">Primary</SuBadge>
  <SuBadge variant="success">Success</SuBadge>
</template>
```

### Variants

<div class="component-demo">
  <div class="demo-section">
    <h4>Available variants</h4>
    <div class="demo-buttons">
      <SuBadge variant="default">Default</SuBadge>
      <SuBadge variant="primary">Primary</SuBadge>
      <SuBadge variant="secondary">Secondary</SuBadge>
      <SuBadge variant="success">Success</SuBadge>
      <SuBadge variant="warning">Warning</SuBadge>
      <SuBadge variant="error">Error</SuBadge>
    </div>
  </div>
</div>

```vue
<template>
  <SuBadge variant="default">Default</SuBadge>
  <SuBadge variant="primary">Primary</SuBadge>
  <SuBadge variant="secondary">Secondary</SuBadge>
  <SuBadge variant="success">Success</SuBadge>
  <SuBadge variant="warning">Warning</SuBadge>
  <SuBadge variant="error">Error</SuBadge>
</template>
```

### Sizes

<div class="component-demo">
  <div class="demo-section">
    <h4>Available sizes</h4>
    <div class="demo-buttons">
      <SuBadge size="sm">Small</SuBadge>
      <SuBadge size="md">Medium</SuBadge>
      <SuBadge size="lg">Large</SuBadge>
    </div>
  </div>
</div>

```vue
<template>
  <SuBadge size="sm">Small</SuBadge>
  <SuBadge size="md">Medium</SuBadge>
  <SuBadge size="lg">Large</SuBadge>
</template>
```

### Border radius

<div class="component-demo">
  <div class="demo-section">
    <h4>Available border radius</h4>
    <div class="demo-buttons">
      <SuBadge radius="none">None</SuBadge>
      <SuBadge radius="sm">Small</SuBadge>
      <SuBadge radius="md">Medium</SuBadge>
      <SuBadge radius="lg">Large</SuBadge>
      <SuBadge radius="xl">Extra Large</SuBadge>
      <SuBadge radius="max">Full</SuBadge>
    </div>
  </div>
</div>

```vue
<template>
  <SuBadge radius="none">None</SuBadge>
  <SuBadge radius="sm">Small</SuBadge>
  <SuBadge radius="md">Medium</SuBadge>
  <SuBadge radius="lg">Large</SuBadge>
  <SuBadge radius="xl">Extra Large</SuBadge>
  <SuBadge radius="max">Full</SuBadge>
</template>
```

### With icons

<div class="component-demo">
  <div class="demo-section">
    <h4>Badges with icons</h4>
    <div class="demo-buttons">
      <SuBadge variant="success" icon="CheckIcon" iconDisplay="left">Validated</SuBadge>
      <SuBadge variant="error" icon="XMarkIcon" iconDisplay="left">Error</SuBadge>
      <SuBadge variant="warning" icon="ExclamationTriangleIcon" iconDisplay="left">Warning</SuBadge>
      <SuBadge variant="primary" icon="StarIcon" iconDisplay="right">Premium</SuBadge>
    </div>
  </div>
</div>

```vue
<script setup>
import { CheckIcon, XMarkIcon, ExclamationTriangleIcon, StarIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <SuBadge variant="success" icon="CheckIcon" iconDisplay="left">Validated</SuBadge>
  <SuBadge variant="error" icon="XMarkIcon" iconDisplay="left">Error</SuBadge>
  <SuBadge variant="warning" icon="ExclamationTriangleIcon" iconDisplay="left">Warning</SuBadge>
  <SuBadge variant="primary" icon="StarIcon" iconDisplay="right">Premium</SuBadge>
</template>
```

### Status dot (dot, pulse)

`dot` adds a dot before the label: in the state color for `success`, `warning` and `error`, in the text color otherwise. `pulse` animates it for a live status ("in progress"); the animation stops when the user reduces motion.

<div class="component-demo">
  <div class="demo-section">
    <h4>Statuses</h4>
    <div class="demo-buttons">
      <SuBadge variant="success" dot>Online</SuBadge>
      <SuBadge variant="warning" dot>Away</SuBadge>
      <SuBadge variant="error" dot>Down</SuBadge>
      <SuBadge dot>Draft</SuBadge>
      <SuBadge variant="success" pulse>In progress</SuBadge>
    </div>
  </div>
  <div class="demo-section">
    <h4>Dots alone</h4>
    <div class="demo-buttons">
      <SuBadge variant="success" dot aria-label="Online" />
      <SuBadge variant="warning" dot aria-label="Away" />
      <SuBadge variant="error" pulse aria-label="Recording" />
    </div>
  </div>
</div>

```vue
<template>
  <SuBadge variant="success" dot>Online</SuBadge>
  <SuBadge variant="success" pulse>In progress</SuBadge>

  <!-- Dot alone: ariaLabel required -->
  <SuBadge variant="error" pulse aria-label="Recording" />
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error'` | `'default'` | Badge visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Badge size |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Badge border radius |
| `icon` | `Component` | `undefined` | Icon to display |
| `iconDisplay` | `'left' \| 'right' \| 'only'` | `'left'` | Icon position |
| `dot` | `boolean` | `false` | Status dot before the label; alone without a label (`ariaLabel` required) |
| `pulse` | `boolean` | `false` | Pulsing dot for a live status; implies `dot` |
| `color` | `string` | `undefined` | Custom text color |
| `backgroundColor` | `string` | `undefined` | Custom background color |

### Accessibility attributes

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ariaLabel` | `string` | `undefined` | Accessible label |
| `ariaDescribedBy` | `string` | `undefined` | ID of description element |
| `ariaHidden` | `boolean` | `undefined` | Hide from screen readers |
| `role` | `string` | `undefined` | Custom ARIA role |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Badge content |

## Status dot

- With a label, the dot is decorative (`aria-hidden`): the text carries the status.
- Without a label, the badge becomes an image (`role="img"`) named by `ariaLabel`. Without `ariaLabel`, a console warning is shown, unless the badge itself is decorative (`aria-hidden="true"`).
- Color alone does not convey a status (WCAG 1.4.1): keep a visible label or a tooltip.

## Accessibility

The Badge component follows WCAG 2.1 AA standards:

### ✅ Accessibility features

- **Color contrast**: WCAG AA compliant contrast ratios (4.5:1 minimum)
- **ARIA attributes**: Complete support for ARIA attributes
- **Accessible icons**: Icons marked with `aria-hidden="true"`
- **Appropriate labels**: Support for `aria-label` for informative badges
- **Dark mode**: Automatically adapted contrast
- **High contrast**: Support for `prefers-contrast: high`
- **Custom colors**: Automatic contrast calculation for custom colors

### 🎯 Best practices

```vue
<!-- Badge with icon only (REQUIRED: aria-label) -->
<SuBadge variant="success" icon="CheckIcon" iconDisplay="only" aria-label="Validated status" />

<!-- Informative badge -->
<SuBadge variant="primary" aria-label="Premium user">Premium</SuBadge>

<!-- Decorative badge (hidden from screen readers) -->
<SuBadge variant="success" dot aria-hidden="true" />

<!-- Badge with description -->
<SuBadge variant="warning" aria-describedby="warning-description">
  Warning
</SuBadge>
<div id="warning-description">This action requires confirmation</div>
```

## Usage examples

### Order status

```vue
<script setup>
import { CheckIcon, ClockIcon, XMarkIcon, TruckIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <div class="order-status">
    <SuBadge variant="success" icon="CheckIcon" iconDisplay="left" radius="max">
      Delivered
    </SuBadge>
    <SuBadge variant="warning" icon="TruckIcon" iconDisplay="left" radius="max">
      In transit
    </SuBadge>
    <SuBadge variant="default" icon="ClockIcon" iconDisplay="left" radius="max">
      Processing
    </SuBadge>
    <SuBadge variant="error" icon="XMarkIcon" iconDisplay="left" radius="max">
      Cancelled
    </SuBadge>
  </div>
</template>
```

### User status

```vue
<template>
  <div class="user-list">
    <div class="user-item">
      <div class="user-info">
        <div class="user-avatar">JD</div>
        <span>John Doe</span>
      </div>
      <div class="user-status">
        <SuBadge variant="success" dot>Online</SuBadge>
        <SuBadge variant="primary" size="sm" icon="StarIcon" iconDisplay="only" aria-label="Premium user" />
      </div>
    </div>
  </div>
</template>
```

## Common use cases

### 🏷️ Labels and categories
- **Products**: New, Sale, In stock, Out of stock
- **Articles**: Published, Draft, Archived
- **Projects**: Active, Completed, Paused

### 📊 Status and states
- **Users**: Online, Away, Busy, Offline
- **Services**: Operational, Degraded, Outage, Maintenance
- **Orders**: Confirmed, Shipped, Delivered, Cancelled

### 🔔 Notifications and counters
- **Messages**: Number of unread messages
- **Alerts**: Number of active alerts
- **Updates**: New features available

### ⭐ Levels and rewards
- **Users**: Beginner, Intermediate, Expert
- **Subscriptions**: Free, Premium, Enterprise
- **Achievements**: Progress badges, certifications

## Best practices

### ✅ Do
- Use consistent colors for the same types of status
- Provide `aria-label` for badges with icon only
- Use `dot` (or `pulse` for a live status) for discreet status indicators
- Limit text to a few words maximum
- Use `radius="max"` for notification counters

### ❌ Don't
- Use too many badges in the same interface
- Put long text in badges
- Forget accessibility for informative badges
- Use colors without consistent meaning
- Visually overload with too many different variants

## Performance

### 🚀 Built-in optimizations
- **Minimal CSS**: Optimized and lightweight styles
- **No JavaScript**: Purely CSS component (except contrast calculation)
- **Smooth transitions**: Hardware-accelerated animations
- **Dark mode**: Native support without JavaScript

### 📊 Minimal impact
- **Generated CSS**: ~2KB gzipped
- **Rendering**: No performance impact
- **Accessibility**: No performance compromises
- **Responsive**: Automatic adaptation