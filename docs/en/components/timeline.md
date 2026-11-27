<script setup>
import { ChatBubbleLeftIcon, CheckIcon, ExclamationTriangleIcon, PlusIcon } from '@heroicons/vue/24/outline'

const now = new Date()
const at = (daysAgo, hours, minutes = 0) => {
  const date = new Date(now)
  date.setDate(date.getDate() - daysAgo)
  date.setHours(hours, minutes, 0, 0)
  return date
}

const items = [
  { id: 1, title: 'Comment on "Mockups v2"', author: 'Camille Martin', date: at(0, 10, 42), icon: ChatBubbleLeftIcon, description: 'Footer margins need another look on mobile.' },
  { id: 2, title: 'Task completed: payment integration', author: 'Leo Dubois', date: at(0, 9, 5), icon: CheckIcon, variant: 'success' },
  { id: 3, title: 'Staging deployment failed', date: at(1, 18, 20), icon: ExclamationTriangleIcon, variant: 'error' },
  { id: 4, title: 'Project created', author: 'Camille Martin', date: at(5, 8, 30), icon: PlusIcon }
]
</script>

# Timeline

Activity feed: dated events with title, author, time, description and icon, grouped by day ("Today", "Yesterday", then the full date).

## Usage

### Grouped by day

<div class="component-demo">
  <div class="demo-section">
    <ClientOnly>
      <SuTimeline :items="items" :heading-level="4" />
    </ClientOnly>
  </div>
</div>

```vue
<script setup>
import { ChatBubbleLeftIcon, CheckIcon } from '@heroicons/vue/24/outline'

const items = [
  { id: 1, title: 'Comment on "Mockups v2"', author: 'Camille Martin', date: '2026-11-27T10:42:00', icon: ChatBubbleLeftIcon },
  { id: 2, title: 'Task completed', author: 'Leo Dubois', date: '2026-11-27T09:05:00', icon: CheckIcon, variant: 'success' }
]
</script>

<template>
  <SuTimeline :items="items" />
</template>
```

Events show in the order of `items`: sort them first (usually newest first). Day titles are `h3` by default (`heading-level`).

### Without grouping

<div class="component-demo">
  <div class="demo-section">
    <ClientOnly>
      <SuTimeline :items="items.slice(0, 3)" :group-by-day="false" />
    </ClientOnly>
  </div>
</div>

```vue
<SuTimeline :items="items" :group-by-day="false" />
```

Each event then shows its date and time.

### Custom content

```vue
<SuTimeline :items="items">
  <template #item="{ item, time, datetime }">
    <p><strong>{{ item.author }}</strong> {{ item.title }}</p>
    <time :datetime="datetime">{{ time }}</time>
  </template>
</SuTimeline>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `TimelineItem[]` | - | Events |
| `groupByDay` | `boolean` | `true` | Groups by day, under a title |
| `headingLevel` | `2 \| 3 \| 4 \| 5 \| 6` | `3` | Day title level |
| `now` | `Date \| string \| number` | now | Reference date for "today" and "yesterday" |

### TimelineItem

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string \| number` | Render key |
| `title` | `string` | Title |
| `date` | `Date \| string \| number` | Date and time |
| `author` | `string` | Author |
| `description` | `string` | Text below the title |
| `icon` | `Component` | Marker icon |
| `variant` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'error'` | Marker color |

### Slots

| Slot | Props | Description |
|------|-------|-------------|
| `item` | `{ item, time, datetime }` | Event content |

## Accessibility

- Each day is a title followed by an ordered list it names (`aria-labelledby`).
- Dates are `<time datetime>` in ISO format; days and times are formatted in the current language (`Intl`).
- Markers and icons are decorative: a variant color does not replace the event text.
- Server rendering: pass `now` so that "today" is the same on the server and in the browser.
