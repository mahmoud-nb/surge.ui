<script setup>
import { ref } from 'vue'
import { useConfirm } from '@surgeui/ds-vue'

const { confirm } = useConfirm()
const result = ref('—')

const publish = async () => {
  const ok = await confirm({ title: 'Publish the article?', description: 'It will be visible to all readers.', confirmLabel: 'Publish' })
  result.value = ok ? 'published' : 'cancelled'
}

const remove = async () => {
  const ok = await confirm({
    title: 'Delete the project?',
    description: 'The project and its 24 files will be permanently deleted.',
    confirmLabel: 'Delete',
    tone: 'danger'
  })
  result.value = ok ? 'deleted' : 'cancelled'
}
</script>

# ConfirmDialog

Confirms an action before running it, with a promise: `await confirm({...})` returns `true` or `false`. Requests are shown by `SuConfirmDialog`, placed once in the application.

<SuConfirmDialog />

## Usage

### Setup

```vue
<!-- App.vue -->
<template>
  <RouterView />
  <SuConfirmDialog />
</template>
```

### Confirming an action

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons">
      <SuButton variant="outline" @click="publish">Publish</SuButton>
      <SuButton variant="outline" @click="remove">Delete project</SuButton>
    </div>
    <p>Result: {{ result }}</p>
  </div>
</div>

```vue
<script setup>
import { useConfirm } from '@surgeui/ds-vue'

const { confirm } = useConfirm()

const removeProject = async () => {
  const ok = await confirm({
    title: 'Delete the project?',
    description: 'The project and its 24 files will be permanently deleted.',
    confirmLabel: 'Delete',
    tone: 'danger'
  })
  if (ok) await api.deleteProject()
}
</script>
```

A plain string becomes the title: `await confirm('Leave without saving?')`.

## API

### useConfirm()

| Property | Type | Description |
|----------|------|-------------|
| `confirm` | `(options?: ConfirmOptions \| string) => Promise<boolean>` | Opens a confirmation; simultaneous requests wait their turn |
| `current` | `ComputedRef<ConfirmRequest \| null>` | Request being shown |
| `settle` | `(value: boolean) => void` | Answers the current request (custom dialog) |

### ConfirmOptions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | `string` | `'Confirm this action?'` (locale) | Title |
| `description` | `string` | - | Consequences of the action |
| `confirmLabel` | `string` | `'Confirm'` (locale) | Confirm button (a precise verb: "Delete") |
| `cancelLabel` | `string` | `'Cancel'` (locale) | Cancel button |
| `tone` | `'default' \| 'danger'` | `'default'` | `danger`: red button, focus on Cancel, backdrop click ignored |

Without a mounted `SuConfirmDialog`, `confirm()` falls back to `window.confirm()`.

## Accessibility

- Native `SuDialog` (`showModal()`) with `role="alertdialog"`, named by the title and described by the description.
- Initial focus: "Cancel" for a dangerous action (the least destructive option), "Confirm" otherwise.
- `Escape`, a backdrop click (except `danger`) and "Cancel" answer `false`; focus returns to the triggering element.
