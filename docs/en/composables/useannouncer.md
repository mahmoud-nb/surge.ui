# useAnnouncer

Announces a message to screen readers without displaying it: the outcome of an action, a result count, an error. SurgeUI components use it for their announcements (multiple selection, files added, limit reached…).

## Usage

```vue
<script setup>
import { useAnnouncer } from '@surgeui/ds-vue'

const { announce } = useAnnouncer()

const save = async () => {
  await api.save()
  announce('Changes saved')
}

const upload = (file) => {
  if (file.size > MAX) {
    announce('The file exceeds 5 MB', { priority: 'assertive' })
  }
}
</script>
```

Outside a component (store, service), call the `announce` function directly:

```ts
import { announce } from '@surgeui/ds-vue'

announce('3 results')
```

## Why a composable?

A live region (`aria-live`) is only read if it **already exists** when its content changes: a region inserted along with its text is often ignored. `useAnnouncer`:

- creates two persistent regions (polite and assertive) when the first component mounts, before any announcement;
- clears the region then writes the message after a short delay: a message identical to the previous one is read again;
- clears the message after a few seconds, so the virtual cursor does not read it again;
- announces inside the open modal `<dialog>` if there is one: the rest of the page is inert there and its regions stay silent.

## Priorities

| Priority | Use |
|----------|-----|
| `polite` (default) | Information: successful action, result count, item added |
| `assertive` | Interrupts current speech: keep it for errors that block the user |

## API

### useAnnouncer()

| Return | Type | Description |
|--------|------|-------------|
| `announce` | `(message: string, options?) => void` | Announces a message |
| `clear` | `() => void` | Clears pending or displayed messages |

### announce options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `priority` | `'polite' \| 'assertive'` | `'polite'` | Announcement priority |
| `clearAfter` | `number` | `5000` | Delay before clearing the message (ms); `0` to keep it |

### Functions

| Function | Description |
|----------|-------------|
| `announce(message, options?)` | Announces outside a component (no effect on the server) |
| `clearAnnouncements()` | Clears every announcement |

::: info Migration
`accessibility.announceToScreenReader()` is deprecated: it now goes through `announce` and will be removed in a future major version.
:::
