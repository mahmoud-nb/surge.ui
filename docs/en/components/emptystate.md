<script setup>
import { FolderPlusIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
</script>

# EmptyState

An empty area: a list with no results, the first use of a feature, a loading error. It explains the situation and offers the next action.

## Usage

### First use

<div class="component-demo">
  <div class="demo-section">
    <SuEmptyState :icon="FolderPlusIcon" title="No projects" description="Create your first project to start collaborating with your team." bordered>
      <SuButton>New project</SuButton>
      <SuButton variant="outline">Import</SuButton>
    </SuEmptyState>
  </div>
</div>

```vue
<script setup>
import { FolderPlusIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <SuEmptyState :icon="FolderPlusIcon" title="No projects" description="Create your first project…" bordered>
    <SuButton>New project</SuButton>
    <SuButton variant="outline">Import</SuButton>
  </SuEmptyState>
</template>
```

### No results

<div class="component-demo">
  <div class="demo-section">
    <SuEmptyState :icon="MagnifyingGlassIcon" title="No results for “table”" description="Check the spelling or try a broader term." size="sm">
      <SuButton variant="ghost">Clear search</SuButton>
    </SuEmptyState>
  </div>
</div>

```vue
<SuEmptyState :icon="MagnifyingGlassIcon" title="No results for “table”" size="sm">
  <SuButton variant="ghost">Clear search</SuButton>
</SuEmptyState>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Title (or `title` slot) |
| `description` | `string` | - | Explanation (or `description` slot) |
| `icon` | `Component` | - | Icon (or `media` slot for an illustration) |
| `headingLevel` | `2 \| 3 \| 4 \| 5 \| 6` | `3` | Heading level in the page |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `bordered` | `boolean` | `false` | Dashed frame |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Actions (buttons, links) |
| `media` | Illustration instead of the icon |
| `title` / `description` | Rich title and explanation content |

## Accessibility

- The title is a real heading (`h2` to `h6`): pick `headingLevel` to match the page hierarchy.
- The icon and illustration are decorative (`aria-hidden`).
- When the empty state appears after a search, announce the result (`useAnnouncer`): the change is not read on its own.
