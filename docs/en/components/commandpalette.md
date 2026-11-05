<script setup>
import { ref } from 'vue'
import { Cog6ToothIcon, DocumentPlusIcon, HomeIcon, MoonIcon } from '@heroicons/vue/24/outline'

const open = ref(false)
const last = ref('—')
const commands = [
  { id: 'home', label: 'Go to home', group: 'Navigation', icon: HomeIcon, onSelect: () => (last.value = 'Home') },
  { id: 'settings', label: 'Settings', group: 'Navigation', icon: Cog6ToothIcon, keywords: ['preferences', 'account'], onSelect: () => (last.value = 'Settings') },
  { id: 'new', label: 'New document', group: 'Actions', icon: DocumentPlusIcon, shortcut: ['Ctrl', 'N'], onSelect: () => (last.value = 'New document') },
  { id: 'theme', label: 'Switch to dark theme', group: 'Preferences', icon: MoonIcon, keywords: ['night'], onSelect: () => (last.value = 'Theme') }
]
</script>

# CommandPalette

Search and run commands with the keyboard, opened with `Ctrl` + `K` (`⌘` + `K` on Mac): navigation, actions, preferences.

## Usage

### Basic usage

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons">
      <SuButton variant="outline" @click="open = true">Open the palette</SuButton>
      <SuKbd :keys="['Ctrl', 'K']" />
    </div>
    <p>Last command: {{ last }}</p>
    <SuCommandPalette v-model:open="open" :commands="commands" :hotkey="false" />
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Cog6ToothIcon, DocumentPlusIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const open = ref(false)
const commands = [
  { id: 'settings', label: 'Settings', group: 'Navigation', icon: Cog6ToothIcon,
    keywords: ['preferences', 'account'], onSelect: () => router.push('/settings') },
  { id: 'new', label: 'New document', group: 'Actions', icon: DocumentPlusIcon,
    shortcut: ['Ctrl', 'N'], onSelect: createDocument }
]
</script>

<template>
  <!-- Once in the application: Ctrl / ⌘ + K opens it -->
  <SuCommandPalette v-model:open="open" :commands="commands" />
</template>
```

The demo on this page disables the shortcut (`:hotkey="false"`) so it does not interfere with the documentation search.

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Open state (`v-model:open`) |
| `commands` | `CommandItem[]` | `[]` | Commands |
| `placeholder` | `string` | `'Search for a command…'` (locale) | Field placeholder |
| `hotkey` | `string \| false` | `'k'` | Shortcut key with `Ctrl` / `⌘`; `false`: none |
| `emptyText` | `string` | `'No results'` (locale) | Text without results |
| `ariaLabel` | `string` | `'Command palette'` (locale) | Dialog and list name |

### CommandItem

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Identifier |
| `label` | `string` | Label |
| `group` | `string` | Display group |
| `description` | `string` | Secondary text (also searched) |
| `icon` | `Component` | Icon |
| `shortcut` | `string[]` | Displayed shortcut (`SuKbd`) |
| `keywords` | `string[]` | Extra search terms |
| `disabled` | `boolean` | Unavailable command |
| `onSelect` | `() => void` | Action, called after closing |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:open` | `boolean` | Opened or closed |
| `select` | `CommandItem` | Command run |

## Accessibility

- Native modal `SuDialog` named "Command palette"; focus goes to the search field and returns to the trigger when closing.
- `role="combobox"` field linked to a `role="listbox"` list whose groups (`role="group"`) are named.
- Focus stays in the field: `↑` / `↓` browse results (`aria-activedescendant`, unavailable commands skipped), `Enter` runs, `Escape` closes.
- Accent- and case-insensitive search; results ranked (label start, label, then description and keywords). The number of results is announced.
