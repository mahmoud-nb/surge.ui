<script setup>
import { useToast } from '@surgeui/ds-vue'

const toast = useToast()

const showProgress = () => {
  const id = toast.show({ title: 'Exporting…', duration: 0, dismissible: false })
  setTimeout(() => toast.update(id, { title: 'Export complete', type: 'success', duration: 4000, dismissible: true }), 1500)
}
</script>

# Toast

Short-lived notifications: a brief message that confirms an action or reports a problem without interrupting the user. Toasts are created with the `useToast()` composable and rendered by `SuToaster`, placed once in the application.

For a message that must stay in the page, use [Alert](/en/components/alert).

<SuToaster />

## Usage

### Setup

Place `SuToaster` once, at the root of the application. The plugin provides the toast queue to the whole application.

```vue
<!-- App.vue -->
<template>
  <RouterView />
  <SuToaster position="bottom-right" />
</template>
```

### Types

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons">
      <SuButton variant="outline" @click="toast.success('Project saved', { description: 'Your changes are live.' })">Success</SuButton>
      <SuButton variant="outline" @click="toast.error('Upload failed', { description: 'Check your connection.' })">Error</SuButton>
      <SuButton variant="outline" @click="toast.warning('Storage almost full')">Warning</SuButton>
      <SuButton variant="outline" @click="toast.info('New version available')">Info</SuButton>
      <SuButton variant="outline" @click="toast.show('Link copied')">Neutral</SuButton>
    </div>
  </div>
</div>

```vue
<script setup>
import { useToast } from '@surgeui/ds-vue'

const toast = useToast()
</script>

<template>
  <SuButton @click="toast.success('Project saved', { description: 'Your changes are live.' })">
    Save
  </SuButton>
</template>
```

### Action and persistent toast

The action button closes the toast after the call. With `duration: 0`, the toast stays until it is closed.

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons">
      <SuButton variant="outline" @click="toast.show({ title: 'Message archived', action: { label: 'Undo', onClick: () => toast.info('Archive undone') } })">With action</SuButton>
      <SuButton variant="outline" @click="toast.error('Connection lost', { duration: 0 })">Persistent</SuButton>
      <SuButton variant="ghost" @click="toast.dismiss()">Dismiss all</SuButton>
    </div>
  </div>
</div>

```js
toast.show({
  title: 'Message archived',
  action: { label: 'Undo', onClick: () => restore(message) }
})

toast.error('Connection lost', { duration: 0 })
toast.dismiss() // closes every toast
```

### Updating a toast

`update(id, options)` changes a visible toast and restarts its timer. `show()` with an existing `id` replaces it entirely.

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons">
      <SuButton variant="outline" @click="showProgress">Start export</SuButton>
    </div>
  </div>
</div>

```js
const id = toast.show({ title: 'Exporting…', duration: 0, dismissible: false })
await exportData()
toast.update(id, { title: 'Export complete', type: 'success', duration: 4000, dismissible: true })
```

## API

### useToast()

| Method | Signature | Description |
|--------|-----------|-------------|
| `show` | `(options \| string) => string` | Shows a toast (a plain string becomes the title); returns its id |
| `success` / `error` / `warning` / `info` | `(title, options?) => string` | Typed shortcuts |
| `update` | `(id, options) => void` | Changes a visible toast |
| `dismiss` | `(id?) => void` | Closes a toast, or all of them without an argument |
| `toasts` | `Readonly<Ref<ToastItem[]>>` | Current toasts, oldest first |

### Toast options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `id` | `string` | generated | A toast with the same id is replaced |
| `type` | `'success' \| 'warning' \| 'error' \| 'info' \| 'neutral'` | `'neutral'` | Type (icon, announcement priority) |
| `title` | `string` | - | Title |
| `description` | `string` | - | Supporting text |
| `duration` | `number` | the `SuToaster` one | Display time (ms); `0` = until closed |
| `dismissible` | `boolean` | `true` | Close button |
| `action` | `{ label: string, onClick: () => void }` | - | Action button |
| `announce` | `boolean` | `true` | Announces to screen readers |
| `onDismiss` | `(toast) => void` | - | Called when the toast is removed |

### SuToaster props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'bottom-right'` | Screen corner (full width on mobile) |
| `max` | `number` | `3` | Visible toasts; the next ones wait their turn |
| `duration` | `number` | `5000` | Default duration (ms) |
| `ariaLabel` | `string` | `'Notifications'` | Region name |

### SuToaster slot

| Slot | Props | Description |
|------|-------|-------------|
| `default` | `{ toast, dismiss }` | Custom toast rendering (`SuToast` by default) |

`SuToast` (the stack item) accepts `type`, `title`, `description`, `dismissible`, `duration`, `paused`, `action` and `dismissLabel`, and emits `dismiss` with the reason (`'timeout'`, `'close'`, `'action'`).

## Accessibility

- Each toast is announced through `useAnnouncer`: politely, or assertively for an error. The `SuToaster` region is named ("Notifications") but is not a live region, to avoid double readings.
- WCAG 2.2.1: timers pause on hover, on focus inside the region and while the tab is hidden. An important message, or one with an action, should be persistent (`duration: 0`).
- The stack is shown in the top layer (`popover`), so it stays visible above a modal `SuDialog`. While the dialog is open its buttons cannot be used (the rest of the page is inert), but the announcement goes through the dialog.
- The close button is named ("Dismiss notification", customizable with the `toast.dismiss` locale message).
