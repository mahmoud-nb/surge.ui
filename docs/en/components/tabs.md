<script setup>
import { ref } from 'vue'

const account = ref('profile')
const accountTabs = [
  { label: 'Profile', value: 'profile' },
  { label: 'Security', value: 'security' },
  { label: 'Billing', value: 'billing' }
]
const contents = {
  profile: 'Name, email address and profile picture.',
  security: 'Password and two-factor authentication.',
  billing: 'Payment history.'
}
</script>

# Tabs

The **Tabs** component organizes content into sections shown one at a time. It covers three uses:

- **one panel per tab**: the content comes from the tabs (`content`, `panel` slot);
- **a single panel**: the page shows the active tab's content in the default slot;
- **navigation**: tabs with `to` change pages (Vue Router, Nuxt).

Without content (no `content`, `panel` slot or default slot), no panel is rendered: the tab list acts as a filter or a switcher, and the content shown elsewhere follows the `v-model`.

## Usage

### One panel per tab

<div class="component-demo">
  <div class="demo-section">
    <h4>Tab content</h4>
    <SuTabs :tabs="[
      { label: 'Home', content: 'Welcome to the home page.' },
      { label: 'Profile', content: 'Your personal space.' },
      { label: 'Settings', content: 'Adjust your preferences.' }
    ]" />
  </div>
</div>

```vue
<SuTabs
  :tabs="[
    { label: 'Home', content: 'Welcome to the home page.' },
    { label: 'Profile', content: 'Your personal space.' },
    { label: 'Settings', content: 'Adjust your preferences.' }
  ]"
/>
```

### Tabs by identifier and a single panel

Give each tab a `value`: the `v-model` holds that value (a string you can sync with `?tab=` in the URL) instead of the index. The default slot then becomes a **single panel** (`role="tabpanel"`) for the active tab's content, managed by the page.

<div class="component-demo">
  <div class="demo-section">
    <h4>v-model: {{ account }}</h4>
    <SuTabs v-model="account" :tabs="accountTabs" variant="pills">
      <p>{{ contents[account] }}</p>
    </SuTabs>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const tab = ref('profile')
const tabs = [
  { label: 'Profile', value: 'profile' },
  { label: 'Security', value: 'security' },
  { label: 'Billing', value: 'billing' }
]
</script>

<template>
  <SuTabs v-model="tab" :tabs="tabs">
    <ProfileForm v-if="tab === 'profile'" />
    <SecurityForm v-else-if="tab === 'security'" />
    <BillingTable v-else />
  </SuTabs>
</template>
```

The default slot receives `{ tab, index, value }` of the active tab.

### Navigation between pages

Tabs with `to` form a **navigation**: a `<nav>` of links rendered by RouterLink (or the plugin's [`linkComponent`](/en/guide/installation#router-links)). The active tab follows the route, without `v-model`: it gets `aria-current="page"`. The default slot holds the page content, for instance `<RouterView />`.

<div class="component-demo">
  <div class="demo-section">
    <h4>Links to documentation pages</h4>
    <SuTabs label="Action components" :tabs="[
      { label: 'Tabs', to: '/en/components/tabs' },
      { label: 'Button', to: '/en/components/button' },
      { label: 'Link', to: '/en/components/link' }
    ]" />
  </div>
</div>

```vue
<SuTabs
  label="My account"
  :tabs="[
    { label: 'Profile', to: '/account/profile' },
    { label: 'Security', to: '/account/security' },
    { label: 'Billing', to: { name: 'billing' } }
  ]"
>
  <RouterView />
</SuTabs>
```

A parent route counts too: on `/account/security/2fa`, the "Security" tab stays active (`router-link-active` class). Without a router, the active tab is the one whose link matches the page path.

### Custom tabs

The `tab` slot replaces a tab's rendering; the `panel` slot a panel's (one panel per tab).

```vue
<SuTabs :tabs="tabs">
  <template #tab="{ tab }">
    <span>{{ tab.label }}</span>
    <SuBadge v-if="tab.badge" size="sm">{{ tab.badge }}</SuBadge>
  </template>
  <template #panel="{ tab }">
    <article>
      <h2>{{ tab.title }}</h2>
      <p>{{ tab.description }}</p>
    </article>
  </template>
</SuTabs>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabs` | `TabItem[]` | `[]` | Tabs to display |
| `modelValue` | `string \| number` | — | Active tab: its `value`, or its index when tabs have none (bound to `v-model`). In navigation, sets the active tab instead of following the route |
| `variant` | `'underline' \| 'pills' \| 'contained'` | `'underline'` | `underline`: rule and animated indicator; `pills`: segmented control; `contained`: tabs attached to the panel |
| `label` | `string` | — | Accessible name of the tab list or navigation |

### TabItem

| Property | Type | Description |
|----------|------|-------------|
| `label` | `string` | Label |
| `value` | `string \| number` | Identifier for `v-model` |
| `to` | `string \| RouteLocationRaw` | Router link: the tabs become a navigation |
| `content` | `string` | Panel content (one panel per tab) |
| `icon`, `badge`, `title`, `description`, `component` | — | Free fields for slots |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string \| number` | Chosen tab: its `value`, or its index |

### Slots

| Slot | Props | Description |
|------|-------|-------------|
| `default` | `{ tab, index, value }` | Single panel of the active tab; in navigation, content under the links |
| `tab` | `{ tab, index }` | Rendering of a tab |
| `panel` | `{ tab, index }` | Rendering of a panel (one panel per tab) |

## Accessibility

- **Tabs**: `tablist`, `tab` and `tabpanel` roles, linked by `aria-controls` and `aria-labelledby`; `aria-selected` on the active tab.
- **Keyboard navigation**: left / right arrows, looping (reversed in right-to-left reading), Home / End; the reached tab is activated at once ([useListNavigation](/en/composables/uselistnavigation)).
- **Navigation between pages**: a `<nav>` of links, named by `label`, not ARIA tabs: each link is reached with Tab, the current page gets `aria-current="page"`.
- The indicator moves when a label changes width or when the reading direction changes.
