# Collapse

The Collapse component displays content in collapsible sections. Each section can be independently opened or closed. It supports full keyboard navigation, custom slots for headers and panels, and a multi-open configuration.

## Usage Examples

### Basic Usage

<div class="component-demo">
  <div class="demo-section">
    <h4>Simple collapsible sections</h4>
    <SuCollapse :items="[
      { id: 'a', title: 'Section 1', content: 'Content of the first section.' },
      { id: 'b', title: 'Section 2', content: 'Content of the second section.' },
      { id: 'c', title: 'Section 3', content: 'Content of the third section.' }
    ]" />
  </div>
</div>

```vue
<template>
  <SuCollapse :items="items" />
</template>

<script setup lang="ts">
const items = [
  { id: 'a', title: 'Section 1', content: 'Content of the first section.' },
  { id: 'b', title: 'Section 2', content: 'Content of the second section.' },
  { id: 'c', title: 'Section 3', content: 'Content of the third section.' },
]
</script>
```

### Multiple Open

By default, opening a section closes the previous one. Enable `multiple` to allow several sections to be open at the same time.

```vue
<template>
  <SuCollapse :items="items" multiple />
</template>

<script setup lang="ts">
const items = [
  { id: 'a', title: 'Item 1', content: 'Content for item 1.' },
  { id: 'b', title: 'Item 2', content: 'Content for item 2.' },
  { id: 'c', title: 'Item 3', content: 'Content for item 3.' },
]
</script>
```

### Disabled Section

Add `disabled: true` to an item to make it non-interactive.

```vue
<template>
  <SuCollapse :items="items" />
</template>

<script setup lang="ts">
const items = [
  { id: 'a', title: 'Active section', content: 'Accessible content.' },
  { id: 'b', title: 'Disabled section', content: 'Not accessible.', disabled: true },
  { id: 'c', title: 'Another active section', content: 'Accessible content.' },
]
</script>
```

### Custom Header with Slot

The `#header` slot allows you to customise the content of each header -  icons, badges, advanced formatting.

```vue
<template>
  <SuCollapse :items="items">
    <template #header="{ item }">
      <div style="display: flex; align-items: center; gap: 8px; flex-grow: 1;">
        <component v-if="item.icon" :is="item.icon" style="width: 16px; height: 16px;" />
        <span>{{ item.title }}</span>
        <SuBadge v-if="item.badge" type="info">{{ item.badge }}</SuBadge>
      </div>
    </template>
  </SuCollapse>
</template>

<script setup lang="ts">
import { AtSymbolIcon, UserIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

const items = [
  { id: 'a', title: 'Email', content: 'Email content.', icon: AtSymbolIcon },
  { id: 'b', title: 'Profile', content: 'Profile content.', icon: UserIcon, badge: 5 },
  { id: 'c', title: 'Search', content: 'Search content.', icon: MagnifyingGlassIcon },
]
</script>
```

### Custom Panel with Slot

The `#panel` slot replaces the default rendering of each section's content.

```vue
<template>
  <SuCollapse :items="items" multiple>
    <template #panel="{ item }">
      <article style="padding: 1rem;">
        <h3>{{ item.title }}</h3>
        <p>{{ item.content }}</p>
        <SuButton size="sm">Learn more</SuButton>
      </article>
    </template>
  </SuCollapse>
</template>

<script setup lang="ts">
const items = [
  { id: 'a', title: 'Vue 3', content: 'Progressive JavaScript framework.' },
  { id: 'b', title: 'TypeScript', content: 'Typed superset of JavaScript.' },
]
</script>
```

### RTL Support

```vue
<template>
  <div dir="rtl">
    <SuCollapse :items="items" />
  </div>
</template>

<script setup lang="ts">
const items = [
  { id: 'a', title: 'القسم 1', content: 'محتوى القسم الأول' },
  { id: 'b', title: 'القسم 2', content: 'محتوى القسم الثاني' },
]
</script>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `CollapseItem[]` | `[]` | List of sections to display |
| `multiple` | `boolean` | `false` | If `true`, multiple sections can be open at the same time |

### CollapseItem Interface

```typescript
interface CollapseItem {
  id?: string       // Unique identifier (auto-generated if absent)
  title: string     // Title displayed in the header
  content: string   // Default text content (used without #panel slot)
  icon?: Component  // Icon component (e.g. HeroIcon) -  use via the #header slot
  badge?: number    // Badge value -  use via the #header slot
  disabled?: boolean // If true, the section is non-interactive
}
```

### Slots

| Slot | Exposed props | Description |
|------|---------------|-------------|
| `#header` | `{ item: CollapseItem, index: number }` | Replaces the header content of each section |
| `#panel` | `{ item: CollapseItem, index: number }` | Replaces the panel content of each section |
| `default` | -  | Displayed when `items` is empty or not provided |

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Opens or closes the focused section |
| `ArrowDown` | Moves focus to the next header |
| `ArrowUp` | Moves focus to the previous header |
| `Home` | Moves focus to the first header |
| `End` | Moves focus to the last header |

## Accessibility

The Collapse component complies with WCAG 2.1 Level AA standards and follows the WAI-ARIA *Accordion* pattern.

- **Semantic structure**: each section is wrapped in an `<h3>` + `<button>` for a correct heading hierarchy and efficient screen reader navigation.
- **`aria-expanded`**: indicates the open/closed state of each section to screen readers.
- **`aria-controls`**: links the header button to its content panel.
- **`aria-labelledby`**: links the panel back to its header button.
- **Disabled section**: the native `disabled` attribute on the button is recognised by assistive technologies.
- **Full keyboard navigation**: all keys from the ARIA Accordion pattern are implemented (see table above).
- **Visible focus**: focusable elements display an outline that meets accessibility standards.
- **High contrast mode**: the component automatically adapts in high contrast environments.
- **RTL support**: the chevron automatically mirrors in right-to-left writing mode.
