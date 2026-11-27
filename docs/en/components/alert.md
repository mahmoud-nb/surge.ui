# Alert

The Alert component shows important, contextual messages to the user: confirmations, warnings, errors or general information.

## Usage

### Basic alert
<SuAlert title="Alert title" description="This is the alert description." />

```vue
<template>
  <SuAlert
    title="Alert title"
    description="This is the alert description."
  />
</template>
```

### Alert types

<div class="component-demo">
  <SuAlert type="success" title="Success" description="The operation completed successfully." />
  <SuAlert type="warning" title="Warning" description="This action cannot be undone." />
  <SuAlert type="error" title="Error" description="Something went wrong." />
  <SuAlert type="info" title="Information" description="A new feature is available." />
</div>

```vue
<template>
  <SuAlert type="success" title="Success" description="The operation completed successfully." />
  <SuAlert type="warning" title="Warning" description="This action cannot be undone." />
  <SuAlert type="error" title="Error" description="Something went wrong." />
  <SuAlert type="info" title="Information" description="A new feature is available." />
</template>
```

### Custom slots

<div class="component-demo">
  <SuAlert type="success">
    <template #title>
      <strong>Custom title</strong>
    </template>
    <template #description>
      <p>Description with <em>rich content</em> and <a href="#">links</a>.</p>
    </template>
  </SuAlert>
</div>

```vue
<template>
  <SuAlert type="success">
    <template #title>
      <strong>Custom title</strong>
    </template>
    <template #description>
      <p>Description with <em>rich content</em> and <a href="#">links</a>.</p>
    </template>
  </SuAlert>
</template>
```

### Dismissible alert

<div class="component-demo">
  <SuAlert
    type="info"
    title="Notification"
    description="This alert can be dismissed."
    dismissible
  />
</div>

```vue
<script setup>
const handleDismiss = () => {
  console.log('Alert dismissed')
}
</script>

<template>
  <SuAlert
    type="info"
    title="Notification"
    description="This alert can be dismissed."
    dismissible
    @dismiss="handleDismiss"
  />
</template>
```

The alert does not hide itself: remove it in the `dismiss` handler.

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'success' \| 'warning' \| 'error' \| 'info' \| 'neutral'` | `'info'` | Type (color and icon) |
| `title` | `string` | - | Title (`title` slot otherwise) |
| `description` | `string` | - | Text (`description` slot otherwise) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `dismissible` | `boolean` | `false` | Close button |
| `dismissLabel` | `string` | - | Accessible name of the close button (translated otherwise) |
| `ariaLive` | `'polite' \| 'assertive' \| 'off'` | `'polite'` | Politeness of the screen reader announcement |
| `ariaAtomic` | `boolean` | `true` | Reads the whole alert again when it changes |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `dismiss` | - | Click on the close button; the page removes the alert |

### Slots

| Slot | Description |
|------|-------------|
| `title` | Replaces the title |
| `description` | Replaces the text |
| `default` | Extra content under the description (actions, links) |

## Accessibility

The Alert component follows WCAG 2.1 AA and W3C best practices.

### Accessibility features

- ARIA role: `role="alert"` identifies the element as an alert
- Screen reader announcements: `aria-live` with several politeness levels (`assertive` for critical alerts, `polite` for information)
- Keyboard: the close button can be reached and activated with the keyboard
- Color contrast: colors meet the WCAG AA contrast ratios
- RTL support: the layout follows right-to-left languages
- Dark mode: theme adapted to the system preference
- High contrast: adapted to high contrast settings
- Reduced motion: respects the reduced motion preference

## Advanced usage

### Managing a list of alerts

```vue
<script setup>
import { ref } from 'vue'

const alerts = ref([
  { id: 1, type: 'success', title: 'Success', description: 'Operation succeeded' },
  { id: 2, type: 'error', title: 'Error', description: 'Operation failed' }
])

const removeAlert = (id) => {
  alerts.value = alerts.value.filter((alert) => alert.id !== id)
}
</script>

<template>
  <div class="alert-container">
    <SuAlert
      v-for="alert in alerts"
      :key="alert.id"
      :type="alert.type"
      :title="alert.title"
      :description="alert.description"
      dismissible
      @dismiss="removeAlert(alert.id)"
    />
  </div>
</template>
```
