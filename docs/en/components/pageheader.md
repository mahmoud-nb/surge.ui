<script setup>
import { PlusIcon, ArrowDownTrayIcon } from '@heroicons/vue/24/outline'

const breadcrumb = [
  { label: 'Home', href: '#' },
  { label: 'Projects', href: '#' },
  { label: 'Website redesign' }
]
</script>

# PageHeader

Header of an application page: breadcrumb or back link, title, description, badges and actions. The actions move below the title when space runs out, based on the available width rather than the screen width.

## Usage

### Title, breadcrumb and actions

<div class="component-demo">
  <div class="demo-section">
    <SuPageHeader
      title="Website redesign"
      description="New brand, product pages and checkout flow."
      :breadcrumb="breadcrumb"
      :level="2"
    >
      <template #meta>
        <SuBadge variant="success" size="sm">In progress</SuBadge>
      </template>
      <template #actions>
        <SuButton variant="outline" :icon="ArrowDownTrayIcon">Export</SuButton>
        <SuButton :icon="PlusIcon">New task</SuButton>
      </template>
    </SuPageHeader>
  </div>
</div>

```vue
<script setup>
const breadcrumb = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Website redesign' }
]
</script>

<template>
  <SuPageHeader
    title="Website redesign"
    description="New brand, product pages and checkout flow."
    :breadcrumb="breadcrumb"
  >
    <template #meta>
      <SuBadge variant="success" size="sm">In progress</SuBadge>
    </template>
    <template #actions>
      <SuButton variant="outline" :icon="ArrowDownTrayIcon">Export</SuButton>
      <SuButton :icon="PlusIcon">New task</SuButton>
    </template>
  </SuPageHeader>
</template>
```

The title is an `h1` by default: a page has only one. In the demos above, `level` is set to `2` so they don't compete with this page's title.

### Back link

<div class="component-demo">
  <div class="demo-section">
    <SuPageHeader title="Project settings" back="#" :level="2" />
  </div>
</div>

```vue
<SuPageHeader title="Project settings" :back="{ name: 'project', params: { id } }" />
```

`back` takes a path or a route: the link goes through RouterLink, or through the plugin `linkComponent` (NuxtLink).

### Tabs below the header

The default slot holds what follows the header: tabs, filters…

```vue
<SuPageHeader title="Website redesign">
  <template #actions>
    <SuButton variant="outline">Share</SuButton>
  </template>
  <SuTabs :tabs="tabs" />
</SuPageHeader>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Page title (or `title` slot) |
| `description` | `string` | - | Text below the title (or `description` slot) |
| `breadcrumb` | `BreadcrumbItem[]` | - | Breadcrumb above the title ([Breadcrumb](/en/components/breadcrumb)) |
| `back` | `string \| RouteLocationRaw` | - | Back link above the title |
| `backLabel` | `string` | `'Back'` | Back link text |
| `level` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `1` | Title level |

### Slots

| Slot | Description |
|------|-------------|
| `breadcrumb` | Replaces the breadcrumb and the back link |
| `title` | Title content |
| `meta` | Badges, status… next to the title |
| `description` | Description content |
| `actions` | Page action buttons |
| `default` | Below the header: tabs, filters… |

## Accessibility

- One `h1` per page: set `level` when the header is not the page's own.
- The breadcrumb is a named navigation (`<nav aria-label="Breadcrumb">`), the current page has `aria-current="page"`.
- DOM order follows visual order: breadcrumb, title, description, then actions.
- The back link icon is decorative and flips in RTL.
