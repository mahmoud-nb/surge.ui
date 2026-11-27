<script setup>
import { ref } from 'vue'
import { HomeIcon, InboxIcon, FolderIcon, UsersIcon, CreditCardIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline'

const items = [
  { label: 'Dashboard', value: 'dashboard', icon: HomeIcon },
  { label: 'Messages', value: 'inbox', icon: InboxIcon, badge: 4, badgeVariant: 'primary', badgeLabel: '4 unread messages' },
  {
    type: 'group',
    label: 'Workspace',
    items: [
      {
        label: 'Projects',
        icon: FolderIcon,
        items: [
          { label: 'Active', value: 'projects-active' },
          { label: 'Archived', value: 'projects-archived' }
        ]
      },
      { label: 'Team', value: 'team', icon: UsersIcon }
    ]
  },
  {
    type: 'group',
    label: 'Account',
    items: [
      { label: 'Billing', value: 'billing', icon: CreditCardIcon, disabled: true },
      { label: 'Settings', value: 'settings', icon: Cog6ToothIcon }
    ]
  }
]

const active = ref('dashboard')
const collapsed = ref(true)
</script>

# NavMenu

Side navigation of an application: titled groups, icons, counters, one level of expandable sub-items, active item from the route, icons-only collapsed mode. Put it in the sidebar of [AppShell](/en/components/appshell).

## Usage

### Basic usage

<div class="component-demo">
  <div class="demo-section">
    <div style="inline-size: 16rem;">
      <SuNavMenu v-model="active" :items="items" />
    </div>
  </div>
</div>

```vue
<script setup>
import { HomeIcon, InboxIcon, FolderIcon } from '@heroicons/vue/24/outline'

const items = [
  { label: 'Dashboard', to: '/', icon: HomeIcon },
  { label: 'Messages', to: '/messages', icon: InboxIcon, badge: 4, badgeLabel: '4 unread messages' },
  {
    type: 'group',
    label: 'Workspace',
    items: [
      {
        label: 'Projects',
        icon: FolderIcon,
        items: [
          { label: 'Active', to: '/projects' },
          { label: 'Archived', to: '/projects/archived' }
        ]
      }
    ]
  }
]
</script>

<template>
  <SuNavMenu :items="items" />
</template>
```

### Active item

The active item has `aria-current="page"`. It comes, in this order:

1. from the item's `active` property;
2. from `v-model`, compared with the items' `value` (navigation handled by the application);
3. from the current Vue Router (or Nuxt) route, compared with the items' `to`.

`match="prefix"` keeps an item active on every page of its section: `/projects` stays active on `/projects/42`. The parent of the active item opens by itself.

```vue
<SuNavMenu :items="items" match="prefix" />
```

### Collapsed to icons

<div class="component-demo">
  <div class="demo-section">
    <div :style="{ inlineSize: collapsed ? '4rem' : '16rem' }">
      <SuNavMenu v-model="active" v-model:collapsed="collapsed" :items="items" />
    </div>
  </div>
</div>

```vue
<SuNavMenu v-model:collapsed="collapsed" :items="items" />
```

Labels are still read by screen readers and show in a tooltip on hover and focus. An item without an icon shows its initial. A parent expands the menu (`update:collapsed`) and opens.

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `NavMenuEntry[]` | - | Items and groups |
| `v-model` | `string \| number` | - | Active item (`value`) |
| `v-model:collapsed` | `boolean` | `false` | Icons only |
| `match` | `'exact' \| 'prefix'` | `'exact'` | Comparison with the current route |
| `label` | `string` | `'Main navigation'` | Navigation name |

### NavMenuItem

| Property | Type | Description |
|----------|------|-------------|
| `label` | `string` | Label |
| `value` | `string \| number` | Identifier (`v-model`) |
| `to` | `string \| RouteLocationRaw` | Router link (RouterLink or the plugin `linkComponent`) |
| `href` | `string` | Link |
| `target`, `rel` | `string` | Link target and relationship |
| `icon` | `Component` | Icon |
| `badge` | `string \| number` | Counter or short label |
| `badgeVariant` | `BadgeVariant` | Counter variant |
| `badgeLabel` | `string` | Text read instead of the counter ("4 unread messages") |
| `active` | `boolean` | Forces the active state |
| `disabled` | `boolean` | Disabled: no link, no selection |
| `items` | `NavMenuItem[]` | Sub-items: the item becomes a button that expands them |
| `defaultOpen` | `boolean` | Sub-items expanded on first render |

A group is written `{ type: 'group', label, items }`. Without a link (`to`, `href`), an item is a button: navigation then goes through `v-model` or the `select` event.

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `select` | `(item: NavMenuItem, event: MouseEvent)` | Chosen item |
| `update:modelValue` | `string \| number` | Active item |
| `update:collapsed` | `boolean` | A parent was chosen in collapsed mode |

## Accessibility

- "Disclosure navigation" pattern: a named `<nav>` landmark with lists of links. No `role="menu"`: these are navigation links, not actions.
- Each group is a list named by its title (`aria-labelledby`).
- A parent is an `aria-expanded` button tied to its sub-list (`aria-controls`); <kbd>Enter</kbd> or <kbd>Space</kbd> expands it, <kbd>Tab</kbd> moves through the links.
- `badgeLabel` replaces the counter for screen readers: "4 unread messages" rather than "4".
- Collapsed mode: the label stays in the link (visually hidden); the tooltip is visual only and does not repeat the name.
