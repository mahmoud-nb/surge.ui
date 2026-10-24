# FloatButton

FloatButton component for placing a floating button in the screen corner with support for slots, badges, tooltips and complete accessibility according to W3C standards.

## Usage examples

### Basic FloatButton

<div class="component-demo">
  <div class="demo-section">
    <h4>Simple floating button</h4>
    <div class="demo-inputs">
      <div style="position: relative; height: 200px; background-color: #f3f4f6; border-radius: 0.5rem; overflow: hidden;">
        <p style="padding: 1rem; margin: 0;">Floating button preview</p>
        <SuFloatButton 
          :icon="'PlusIcon'"
          label="Add an element"
          position="right"
          :offset="{ x: 16, y: 16 }"
          style="position: absolute;"
        />
      </div>
    </div>
  </div>
</div>

```vue
<script setup>
import { PlusIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <SuFloatButton 
    :icon="'PlusIcon'"
    label="Add an element"
    position="right"
  />
</template>
```

### With badge

<div class="component-demo">
  <div class="demo-section">
    <h4>Button with notification badge</h4>
    <div class="demo-inputs">
      <div style="position: relative; height: 200px; background-color: #f3f4f6; border-radius: 0.5rem; overflow: hidden;">
        <p style="padding: 1rem; margin: 0;">Button with badge "3"</p>
        <SuFloatButton 
          :icon="'ChatBubbleLeftIcon'"
          label="Messages"
          badge="3"
          position="right"
          :offset="{ x: 16, y: 16 }"
          style="position: absolute;"
        />
      </div>
    </div>
  </div>
</div>

```vue
<script setup>
import { ChatBubbleLeftIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <SuFloatButton 
    :icon="'ChatBubbleLeftIcon'"
    label="Messages"
    badge="3"
    position="right"
  />
</template>
```

### As external link

<div class="component-demo">
  <div class="demo-section">
    <h4>Floating button as link</h4>
    <div class="demo-inputs">
      <div style="position: relative; height: 200px; background-color: #f3f4f6; border-radius: 0.5rem; overflow: hidden;">
        <p style="padding: 1rem; margin: 0;">Link to external help</p>
        <SuFloatButton 
          :icon="'QuestionMarkCircleIcon'"
          label="Help center"
          href="https://help.example.com"
          target="_blank"
          position="left"
          :offset="{ x: 16, y: 16 }"
          style="position: absolute;"
        />
      </div>
    </div>
  </div>
</div>

```vue
<script setup>
import { QuestionMarkCircleIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <SuFloatButton 
    :icon="'QuestionMarkCircleIcon'"
    label="Help center"
    href="https://help.example.com"
    target="_blank"
    position="left"
  />
</template>
```

### With ButtonGroup

<div class="component-demo">
  <div class="demo-section">
    <h4>Button with action group</h4>
    <div class="demo-inputs">
      <div style="position: relative; height: 300px; background-color: #f3f4f6; border-radius: 0.5rem; overflow: hidden;">
        <p style="padding: 1rem; margin: 0;">Main button with secondary actions</p>
        <SuFloatButton 
          :icon="'PlusIcon'"
          label="Quick actions"
          position="right"
          :offset="{ x: 16, y: 16 }"
          style="position: absolute;"
        >
          <SuButtonGroup gap="sm" variant="secondary" size="sm">
            <SuButton :icon="'CogIcon'" iconDisplay="only" aria-label="Settings" />
            <SuButton :icon="'HeartIcon'" iconDisplay="only" aria-label="Favorites" />
            <SuButton :icon="'ShareIcon'" iconDisplay="only" aria-label="Share" />
          </SuButtonGroup>
        </SuFloatButton>
      </div>
    </div>
  </div>
</div>

```vue
<script setup>
import { PlusIcon, CogIcon, HeartIcon, ShareIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <SuFloatButton 
    :icon="'PlusIcon'"
    label="Quick actions"
    position="right"
  >
    <SuButtonGroup gap="sm" variant="secondary" size="sm">
      <SuButton :icon="'CogIcon'" iconDisplay="only" aria-label="Settings" />
      <SuButton :icon="'HeartIcon'" iconDisplay="only" aria-label="Favorites" />
      <SuButton :icon="'ShareIcon'" iconDisplay="only" aria-label="Share" />
    </SuButtonGroup>
  </SuFloatButton>
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `'left' \| 'right'` | `'right'` | Floating button position |
| `offset` | `{ x?: number, y?: number }` | `{ x: 24, y: 24 }` | Custom offset in pixels |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Floating button size |
| `icon` | `Component` | `undefined` | Button icon |
| `label` | `string` | `undefined` | Button label (displayed in tooltip) |
| `href` | `string` | `undefined` | Destination URL (transforms to link) |
| `target` | `'_blank' \| '_self' \| '_parent' \| '_top'` | `undefined` | Link target |
| `rel` | `string` | `undefined` | Link relation |
| `badge` | `string` | `undefined` | Badge text displayed in top right |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | Button variant |
| `disabled` | `boolean` | `false` | Disable the button |
| `loading` | `boolean` | `false` | Loading state |
| `zIndex` | `number` | `1000` | Button z-index |
| `hideOnScroll` | `boolean` | `false` | Hide when scrolling down |
| `showTooltip` | `boolean` | `true` | Show tooltip on hover |
| `tooltipPosition` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'left'` | Tooltip position |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `@click` | `(event: MouseEvent) => void` | Emitted when button is clicked |
| `@focus` | `(event: FocusEvent) => void` | Emitted when button receives focus |
| `@blur` | `(event: FocusEvent) => void` | Emitted when button loses focus |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Content displayed above the button (LinkGroup or ButtonGroup) |

## Advanced features

### 🎯 Smart positioning

The component automatically handles:
- **Fixed position**: Stays visible during scroll
- **Custom offset**: Precise position adjustment
- **Safe areas**: iPhone notch support (safe-area-inset)
- **Responsive**: Automatic mobile adjustment

### 🏷️ Notification badge

The badge provides visual feedback for:
- **Notifications**: Number of unread messages
- **Alerts**: Status indicators
- **Counters**: Pending items
- **Animation**: Pulse to attract attention

### 💬 Smart tooltip

The tooltip automatically adapts:
- **Position**: Adjusts based on button position
- **Content**: Uses `label` as text
- **Accessibility**: The `label` already names the button, so the tooltip is hidden from screen readers
- **Keyboard**: Shown on focus, dismissed with Escape

### 📱 Responsive behavior

- **Mobile**: Automatically reduced offsets (16px instead of 24px)
- **Safe areas**: Support for notches and navigation bars
- **Slot**: Maximum width adapted to screen

## Accessibility

The FloatButton component follows WCAG 2.1 AA standards:

### ✅ Accessibility features

- **Keyboard navigation**: Support for Enter and Space keys
- **Visible focus**: Clear and contrasted focus indicator
- **Accessible labels**: Automatic or custom `aria-label`
- **Tooltip**: Shown on hover and focus, dismissed with Escape (WCAG 1.4.13)
- **Accessible badges**: The badge value is appended to the button name (e.g. "Messages (3)")
- **Contrast**: WCAG AA compliant contrast ratios (4.5:1 minimum)
- **Minimum sizes**: Respects minimum touch target sizes (44px)
- **Dark mode**: Automatically adapted contrast
- **High contrast**: Support for `prefers-contrast: more`
- **Reduced motion**: Respects `prefers-reduced-motion`

### 🎯 Best practices

```vue
<template>
  <!-- Floating button with accessible label -->
  <SuFloatButton 
    :icon="'PlusIcon'"
    label="Add a new element"
    position="right"
  />

  <!-- External link with security -->
  <SuFloatButton 
    :icon="'QuestionMarkCircleIcon'"
    label="Open help center"
    href="https://help.example.com"
    target="_blank"
    position="left"
  />

  <!-- With badge and description -->
  <SuFloatButton 
    :icon="'ChatBubbleLeftIcon'"
    label="Unread messages"
    badge="5"
    aria-describedby="messages-help"
  />
  <div id="messages-help" class="sr-only">
    You have 5 unread messages
  </div>

  <!-- With slot and appropriate role -->
  <SuFloatButton 
    :icon="'CogIcon'"
    label="Action menu"
    role="button"
    aria-haspopup="true"
  >
    <ButtonGroup role="menu" aria-label="Quick actions">
      <Button role="menuitem">Action 1</Button>
      <Button role="menuitem">Action 2</Button>
    </ButtonGroup>
  </SuFloatButton>
</template>
```

## Keyboard navigation

| Key | Action |
|-----|--------|
| `Tab` | Navigate to/from floating button |
| `Enter` | Activate button or follow link |
| `Space` | Activate button |
| `Escape` | Close slot (if open) |

## Common use cases

### 💬 Support and help
- **Live chat**: Quick access to customer support
- **Help center**: Link to documentation
- **Contact**: Phone, email, form

### ➕ Primary actions
- **Add**: Create a new element
- **Compose**: Write a message, article
- **Create**: New project, document

### 🔧 Tools and settings
- **Settings**: Quick access to preferences
- **Tools**: Advanced features
- **Shortcuts**: Frequent actions

### 📱 Mobile navigation
- **Menu**: Main navigation on mobile
- **Back to top**: Scroll to top of page
- **Share**: Quick content sharing

## Best practices

### ✅ Do
- Use descriptive `label` for accessibility
- Limit to 1-2 floating buttons per page
- Place primary actions on the right (more accessible)
- Use badges for important notifications
- Test on mobile and with screen readers

### ❌ Don't
- Hide essential features in the slot
- Use too many floating buttons (visual pollution)
- Forget the `label` for accessibility
- Place button over important content
- Use excessive animations

## Performance

### 🚀 Built-in optimizations
- **Passive events**: Optimized scroll listeners
- **CSS transitions**: Hardware-accelerated animations
- **Lazy rendering**: Slot rendered only when needed
- **Automatic cleanup**: Event listener removal

### 📊 Minimal impact
- **Generated CSS**: ~2KB gzipped
- **JavaScript**: Lightweight and optimized logic
- **Rendering**: No impact on page performance
- **Accessibility**: No performance compromises