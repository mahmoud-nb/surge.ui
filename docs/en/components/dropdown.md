# Dropdown

Dropdown component that looks like a button but displays a list of options when clicked. Each option can be a link (if it contains an href) or trigger an action. Compliant with W3C accessibility standards with complete keyboard and screen reader support.

## Usage examples

### Basic Dropdown

<div class="component-demo">
  <div class="demo-section">
    <h4>Simple user menu</h4>
    <div class="demo-buttons">
      <SuDropdown 
        :options="[
          { value: 'profile', label: 'My profile', icon: 'UserIcon' },
          { value: 'settings', label: 'Settings', icon: 'CogIcon' },
          { value: 'separator1', separator: true },
          { value: 'logout', label: 'Logout', icon: 'ArrowUturnLeftIcon' }
        ]"
        label="User menu"
        :icon="'UserIcon'"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { UserIcon, CogIcon, ArrowUturnLeftIcon } from '@heroicons/vue/24/outline'

const userOptions = [
  { value: 'profile', label: 'My profile', icon: UserIcon },
  { value: 'settings', label: 'Settings', icon: CogIcon },
  { value: 'separator1', separator: true },
  { value: 'logout', label: 'Logout', icon: ArrowUturnLeftIcon }
]

const handleSelect = (option) => {
  console.log('Selected option:', option)
  // Handle action based on option
}
</script>

<template>
  <SuDropdown 
    :options="userOptions"
    label="User menu"
    :icon="UserIcon"
    @select="handleSelect"
  />
</template>
```

### With mixed links and actions

<div class="component-demo">
  <div class="demo-section">
    <h4>Mixed options (links + actions)</h4>
    <div class="demo-buttons">
      <SuDropdown 
        :options="[
          { value: 'profile', label: 'My profile', icon: 'UserIcon' },
          { value: 'docs', label: 'Documentation', href: '/docs', icon: 'DocumentIcon' },
          { value: 'separator1', separator: true },
          { value: 'settings', label: 'Settings', icon: 'CogIcon' },
          { value: 'help', label: 'Help', href: 'https://help.example.com', target: '_blank', icon: 'QuestionMarkCircleIcon' }
        ]"
        label="Mixed menu"
        :icon="'CogIcon'"
        variant="secondary"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { UserIcon, DocumentIcon, CogIcon, QuestionMarkCircleIcon } from '@heroicons/vue/24/outline'

const mixedOptions = [
  { value: 'profile', label: 'My profile', icon: UserIcon },
  { value: 'docs', label: 'Documentation', href: '/docs', icon: DocumentIcon },
  { value: 'separator1', separator: true },
  { value: 'settings', label: 'Settings', icon: CogIcon },
  { value: 'help', label: 'Help', href: 'https://help.example.com', target: '_blank', icon: QuestionMarkCircleIcon }
]

const handleSelect = (option) => {
  // Options with href navigate automatically
  // Options without href trigger this function
  if (!option.href) {
    console.log('Action:', option.value)
  }
}
</script>

<template>
  <SuDropdown 
    :options="mixedOptions"
    label="Mixed menu"
    :icon="CogIcon"
    variant="secondary"
    @select="handleSelect"
  />
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `DropdownOption[]` | `[]` | List of dropdown options |
| `trigger` | `'click' \| 'hover'` | `'click'` | Opening trigger |
| `placement` | `'bottom-start' \| 'bottom-end' \| 'top-start' \| 'top-end' \| 'left-start' \| 'left-end' \| 'right-start' \| 'right-end'` | `'bottom-start'` | Menu position |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'outline'` | Button variant |
| `disabled` | `boolean` | `false` | Disable the dropdown |
| `loading` | `boolean` | `false` | Loading state |
| `icon` | `Component` | `undefined` | Button icon |
| `iconDisplay` | `'left' \| 'right' \| 'only'` | `'left'` | Icon position |
| `label` | `string` | `undefined` | Button label |
| `closeOnSelect` | `boolean` | `true` | Close after selection |
| `maxHeight` | `string` | `'300px'` | Maximum menu height |

### Option types

#### DropdownOption
```typescript
interface DropdownOption {
  value: string | number
  label: string
  href?: string                    // If present, option becomes a link
  target?: '_blank' | '_self' | '_parent' | '_top'
  rel?: string
  disabled?: boolean
  icon?: Component
  description?: string
  separator?: boolean              // If true, displays a separator
}
```

### Events

| Event | Type | Description |
|-------|------|-------------|
| `@select` | `(option: DropdownOption) => void` | Emitted when an option is selected |
| `@open` | `() => void` | Emitted when menu opens |
| `@close` | `() => void` | Emitted when menu closes |
| `@focus` | `(event: FocusEvent) => void` | Emitted when button receives focus |
| `@blur` | `(event: FocusEvent) => void` | Emitted when button loses focus |

## Difference between links and actions

The Dropdown component automatically handles two types of options:

### 🔗 Options with links (href)

Options with an `href` property become links:
- Automatic navigation to URL
- External link support with `target="_blank"`
- Automatic security attributes (`rel="noopener noreferrer"`)
- Automatic external icon for external links

```vue
<!-- Internal link option -->
{ value: 'docs', label: 'Documentation', href: '/docs' }

<!-- External link option -->
{ value: 'github', label: 'GitHub', href: 'https://github.com', target: '_blank' }
```

### ⚡ Options with actions

Options without `href` trigger the `@select` event:
- Event emission with complete option
- Automatic menu closure (if `closeOnSelect` is true)
- Custom handling in parent component

```vue
<!-- Action option -->
{ value: 'delete', label: 'Delete', icon: TrashIcon }

<SuDropdown @select="handleAction" />

<script setup>
const handleAction = (option) => {
  if (option.value === 'delete') {
    // Deletion logic
  }
}
</script>
```

## Accessibility

The Dropdown component follows WCAG 2.1 AA standards:

### ✅ Accessibility features

- **Menu button pattern (WAI-ARIA)**: button with `aria-haspopup="menu"`, `role="menu"` menu named by the button, `role="menuitem"` items
- **Roving focus**: one item at a time receives focus; arrows move it in a loop, disabled items are skipped
- **Typeahead**: typing a letter moves focus to the next item starting with it
- **Closing**: Escape (focus returns to the button), pointer down outside or focus leaving the menu; Tab leaves the menu to the next element on the page
- **ARIA states**: `aria-expanded`, `aria-haspopup`, `aria-controls`
- **Accessible labels**: Support for `aria-label` and `aria-describedby`
- **Visible focus**: Clear and contrasted focus indicators
- **Color contrast**: WCAG AA compliant ratios
- **Minimum sizes**: Respects minimum touch target sizes
- **Dark mode**: Automatically adapted contrast
- **High contrast**: Support for `prefers-contrast: high`
- **Reduced motion**: Respects `prefers-reduced-motion`

### 🎯 Best practices

```vue
<!-- Dropdown with accessible label -->
<SuDropdown 
  :options="options"
  label="Actions menu"
  aria-label="Available actions menu"
  @select="handleSelect"
/>

<!-- Dropdown with icon only (REQUIRED: aria-label) -->
<SuDropdown 
  :options="options"
  :icon="EllipsisVerticalIcon"
  iconDisplay="only"
  aria-label="Options menu"
  @select="handleSelect"
/>

<!-- Dropdown with description -->
<SuDropdown 
  :options="options"
  label="Actions"
  aria-describedby="actions-help"
  @select="handleSelect"
/>
<div id="actions-help">Menu of available actions for this item</div>
```

## Keyboard navigation

| Key | Action |
|-----|--------|
| `Enter` / `Space` | On the button: open the menu on the first item. On an item: activate it |
| `Arrow Down` | On the button: open the menu on the first item. In the menu: next item (looping) |
| `Arrow Up` | On the button: open the menu on the last item. In the menu: previous item (looping) |
| `Home` / `End` | First / last item |
| `A-Z` | Typeahead: next item starting with these letters |
| `Escape` | Close the menu, focus returns to the button |
| `Tab` | Close the menu and move to the next element on the page |