# useClipboard

Copies text to the clipboard and exposes a temporary "copied" state. [CopyButton](/en/components/copybutton) and [CodeBlock](/en/components/codeblock) use it.

## Usage

```vue
<script setup>
import { useClipboard, useAnnouncer } from '@surgeui/vue'

const { copy, copied } = useClipboard({ timeout: 2000 })
const { announce } = useAnnouncer()

const share = async () => {
  if (await copy(location.href)) announce('Link copied')
}
</script>

<template>
  <SuButton @click="share">{{ copied ? 'Link copied' : 'Share' }}</SuButton>
</template>
```

`copy()` returns `true` when the copy worked, `false` otherwise (permission denied, browser without clipboard access); the error is then in `error`.

The composable announces nothing: announce the result with [useAnnouncer](/en/composables/useannouncer), as `SuCopyButton` does, because a button label change is not always read.

## How it works

- Clipboard API (`navigator.clipboard.writeText`) in a secure context (HTTPS, `localhost`).
- Otherwise, falls back to `document.execCommand('copy')` through a hidden field, placed inside the open modal dialog if there is one; focus goes back to the element that had it.
- No effect on the server: `copy()` returns `false`.

## API

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `timeout` | `number` | `2000` | How long `copied` stays true after a successful copy (ms); `0` keeps it until the next copy |

### Returns

| Property | Type | Description |
|----------|------|-------------|
| `copy` | `(text: string) => Promise<boolean>` | Copies the text |
| `copied` | `Readonly<Ref<boolean>>` | True for `timeout` ms after a successful copy |
| `error` | `Readonly<Ref<unknown>>` | Error of the last copy, or `null` |
| `isSupported` | `boolean` | Copying is possible in this browser |
| `reset` | `() => void` | Sets `copied` back to false |
