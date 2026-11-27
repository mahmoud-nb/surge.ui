# AppShell

Shell of an application: sidebar, top bar, main content, footer and skip link. On large screens, the sidebar is fixed and can collapse to icons; below the breakpoint, it opens in a drawer from the menu button.

`SuAppShell` takes the whole page: its breakpoints follow the screen width, not a container width.

## Usage

### Basic usage

```vue
<script setup>
import { ref } from 'vue'
import { HomeIcon, InboxIcon, FolderIcon } from '@heroicons/vue/24/outline'

const collapsed = ref(false)
const items = [
  { label: 'Dashboard', to: '/', icon: HomeIcon },
  { label: 'Messages', to: '/messages', icon: InboxIcon, badge: 4, badgeLabel: '4 unread messages' },
  { label: 'Projects', to: '/projects', icon: FolderIcon }
]
</script>

<template>
  <SuAppShell v-model:collapsed="collapsed" collapsible>
    <template #brand="{ collapsed }">
      <img src="/logo.svg" alt="Surge" :width="collapsed ? 24 : 96" />
    </template>

    <template #header>
      <SuThemeToggle />
      <SuAvatar name="Camille Martin" size="sm" />
    </template>

    <template #sidebar="{ collapsed }">
      <SuNavMenu :items="items" match="prefix" :collapsed="collapsed" @update:collapsed="collapsed = $event" />
    </template>

    <SuPageHeader title="Dashboard" />
    <RouterView />

    <template #footer>© 2026 Surge</template>
  </SuAppShell>
</template>
```

The full demo, with a drawer on small screens, is in [Storybook](https://surgeui.com/storybook/?path=/story/templates-appshell--default).

### Drawer on small screens

Below the breakpoint (`breakpoint`, `lg` by default), the sidebar goes away and the top bar shows a menu button. It opens the navigation in a modal drawer (`SuDialog`): focus trapped, <kbd>Escape</kbd> to close, focus returned to the button. Following a link in the drawer closes it.

```vue
<SuAppShell v-model:open="menuOpen" breakpoint="md">…</SuAppShell>
```

### Collapsed sidebar

With `collapsible`, a button at the bottom of the sidebar collapses it to icons (`v-model:collapsed`). Pass `collapsed` to the `sidebar` slot to collapse `SuNavMenu` at the same time, and to the `brand` slot for a compact logo.

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model:collapsed` | `boolean` | `false` | Sidebar collapsed to icons (large screens) |
| `v-model:open` | `boolean` | `false` | Drawer open (small screens) |
| `breakpoint` | `'md' \| 'lg' \| 'xl'` | `'lg'` | Below it, the sidebar becomes a drawer |
| `sidebarWidth` | `string` | `'16rem'` | Sidebar width |
| `collapsedWidth` | `string` | `'4.5rem'` | Collapsed width |
| `collapsible` | `boolean` | `false` | Button that collapses the sidebar |
| `stickyHeader` | `boolean` | `true` | Sticky top bar |
| `skipLink` | `boolean` | `true` | Skip link to the main content |
| `skipLinkLabel` | `string` | `'Skip to main content'` | Skip link text |
| `menuLabel` | `string` | `'Open menu'` | Menu button name |
| `drawerLabel` | `string` | `'Menu'` | Drawer name |
| `collapseLabel` | `string` | `'Collapse menu'` | Collapse button name |

### Slots

| Slot | Props | Description |
|------|-------|-------------|
| `brand` | `{ collapsed }` | Logo, application name (sidebar, top bar on small screens, drawer) |
| `header` | `{ openMenu }` | Top bar: search, actions, account |
| `sidebar` | `{ collapsed, close }` | Navigation (`SuNavMenu`) |
| `sidebar-footer` | `{ collapsed }` | Bottom of the sidebar: account, settings |
| `default` | - | Main content |
| `footer` | - | Footer |

## Accessibility

- Landmarks: `<header>` (banner), `<main>`, `<footer>` (contentinfo); the navigation (`<nav>`) comes from `SuNavMenu`.
- Built-in skip link ([SkipLink](/en/components/skiplink)): it moves focus to `<main>`.
- Named menu button with `aria-expanded` and `aria-haspopup="dialog"`; the drawer is a modal dialog named "Menu".
- Collapse button: toggle button "Collapse menu" (`aria-pressed`), its arrow flips in RTL.
- The sidebar sits at the start of the line: on the right in RTL.
