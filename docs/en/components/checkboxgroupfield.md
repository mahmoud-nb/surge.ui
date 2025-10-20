# CheckboxGroup

CheckboxGroup component for multiple selection with two display styles: classic or cards. Complete accessibility support according to W3C standards.

## Usage examples

### Basic CheckboxGroup

<div class="component-demo">
  <div class="demo-section">
    <h4>Default style</h4>
    <div class="demo-inputs">
      <SuCheckboxGroupField 
        :options="[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
          { value: 'option4', label: 'Option 4', disabled: true }
        ]"
        label="Multiple selection"
      />
    </div>
  </div>
</div>

```vue
<script setup>
const selectedValues = ref([])
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4', disabled: true }
]
</script>

<template>
  <SuCheckboxGroupField 
    :options="options"
    label="Multiple selection"
    v-model="selectedValues"
  />
</template>
```

### Card style

<div class="component-demo">
  <div class="demo-section">
    <h4>Block cards</h4>
    <div class="demo-inputs">
      <SuCheckboxGroupField 
        :options="[
          { 
            value: 'js', 
            label: 'JavaScript', 
            description: 'Web programming language'
          },
          { 
            value: 'ts', 
            label: 'TypeScript', 
            description: 'JavaScript with static typing'
          },
          { 
            value: 'vue', 
            label: 'Vue.js', 
            description: 'Progressive JavaScript framework'
          }
        ]"
        displayType="block-card"
        label="Technologies"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuCheckboxGroupField 
    :options="[
      { 
        value: 'js', 
        label: 'JavaScript', 
        description: 'Web programming language'
      },
      { 
        value: 'ts', 
        label: 'TypeScript', 
        description: 'JavaScript with static typing'
      },
      { 
        value: 'vue', 
        label: 'Vue.js', 
        description: 'Progressive JavaScript framework'
      }
    ]"
    displayType="block-card"
    label="Technologies"
    v-model="selectedTechnologies"
  />
</template>
```

### Inline cards

<div class="component-demo">
  <div class="demo-section">
    <h4>Inline cards</h4>
    <div class="demo-inputs">
      <SuCheckboxGroupField 
        :options="[
          { value: 'email', label: 'Email', description: 'Email notifications' },
          { value: 'sms', label: 'SMS', description: 'SMS notifications' },
          { value: 'push', label: 'Push', description: 'Push notifications' }
        ]"
        displayType="inline-card"
        direction="horizontal"
        label="Notifications"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuCheckboxGroupField 
    :options="[
      { value: 'email', label: 'Email', description: 'Email notifications' },
      { value: 'sms', label: 'SMS', description: 'SMS notifications' },
      { value: 'push', label: 'Push', description: 'Push notifications' }
    ]"
    displayType="inline-card"
    direction="horizontal"
    label="Notifications"
    v-model="notifications"
  />
</template>
```

### With icons

<div class="component-demo">
  <div class="demo-section">
    <h4>Options with icons</h4>
    <div class="demo-inputs">
      <SuCheckboxGroupField 
        :options="[
          { value: 'read', label: 'Read', icon: 'StarIcon' },
          { value: 'write', label: 'Write', icon: 'BuildingOfficeIcon' },
          { value: 'admin', label: 'Administration', icon: 'GlobeAltIcon' }
        ]"
        displayType="block-card"
        label="Permissions"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { StarIcon, BuildingOfficeIcon, GlobeAltIcon } from '@heroicons/vue/24/outline'

const permissions = ref([])
const permissionOptions = [
  { value: 'read', label: 'Read', icon: StarIcon },
  { value: 'write', label: 'Write', icon: BuildingOfficeIcon },
  { value: 'admin', label: 'Administration', icon: GlobeAltIcon }
]
</script>

<template>
  <SuCheckboxGroupField 
    :options="permissionOptions"
    displayType="block-card"
    label="Permissions"
    v-model="permissions"
  />
</template>
```

### Selection limit

<div class="component-demo">
  <div class="demo-section">
    <h4>Maximum 2 selections</h4>
    <div class="demo-inputs">
      <SuCheckboxGroupField 
        :options="[
          { value: 'skill1', label: 'JavaScript' },
          { value: 'skill2', label: 'Python' },
          { value: 'skill3', label: 'Java' },
          { value: 'skill4', label: 'C#' },
          { value: 'skill5', label: 'PHP' }
        ]"
        :maxSelections="2"
        label="Main skills"
        message="Select up to 2 skills"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuCheckboxGroupField 
    :options="skillOptions"
    :maxSelections="2"
    label="Main skills"
    message="Select up to 2 skills"
    v-model="selectedSkills"
  />
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `CheckboxOption[]` | `[]` | List of checkbox options |
| `value` | `(string \| number)[]` | `[]` | Selected values |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Element size |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | Visual state |
| `disabled` | `boolean` | `false` | Disable the entire group |
| `required` | `boolean` | `false` | At least one selection required |
| `displayType` | `'default' \| 'inline-card' \| 'block-card'` | `'default'` | Display type |
| `direction` | `'horizontal' \| 'vertical'` | `'vertical'` | Group direction |
| `maxSelections` | `number` | `undefined` | Maximum number of selections |
| `maxHeight` | `string` | `null` | Maximum height with automatic scroll |
| `label` | `string` | `undefined` | Group label |
| `message` | `string` | `undefined` | Displayed message |

### Option types

#### CheckboxOption
```typescript
interface CheckboxOption {
  value: string | number
  label: string
  description?: string
  disabled?: boolean
  icon?: Component
}
```

### Events

| Event | Type | Description |
|-------|------|-------------|
| `@update:value` | `(value: (string \| number)[]) => void` | Emitted when value changes |
| `@change` | `(value: (string \| number)[]) => void` | Emitted on change |
| `@focus` | `(event: FocusEvent) => void` | Emitted on focus |
| `@blur` | `(event: FocusEvent) => void` | Emitted on blur |

### Slots

| Slot | Description |
|------|-------------|
| `before` | Content displayed between label and options list |
| `after` | Content displayed between options list and message |

## Accessibility

The CheckboxGroup component follows WCAG 2.1 AA standards:

### ✅ Accessibility features

- **Fieldset and Legend**: Correct semantic structure with `<fieldset>` and `<legend>`
- **ARIA attributes**: `role="group"`, `aria-required`, `aria-invalid`
- **Keyboard navigation**: Support for Tab and Space
- **Associated labels**: Each checkbox has a properly associated label
- **State messages**: Messages with `aria-live` for screen readers
- **Voice announcements**: Voice feedback during selections/deselections
- **Visible focus**: Clear and contrasted focus indicators
- **Color contrast**: WCAG AA compliant ratios
- **Logical grouping**: Options semantically grouped

### 🎯 Best practices

```vue
<!-- CheckboxGroup with validation -->
<SuCheckboxGroupField 
  :options="options"
  :required="true"
  label="Terms of use"
  :state="hasError ? 'error' : 'default'"
  :message="hasError ? 'Please accept at least one term' : undefined"
  v-model="acceptedTerms"
/>

<!-- CheckboxGroup with limitation -->
<SuCheckboxGroupField 
  :options="skillOptions"
  :maxSelections="3"
  label="Skills"
  message="Select up to 3 skills"
  v-model="selectedSkills"
/>
```

## Keyboard navigation

| Key | Action |
|-----|--------|
| `Tab` | Navigate between checkboxes |
| `Space` | Check/uncheck focused checkbox |

## Advanced usage examples

### Preferences form

```vue
<script setup>
import { ref } from 'vue'
import { BellIcon, MailIcon, DevicePhoneMobileIcon } from '@heroicons/vue/24/outline'

const notifications = ref(['email'])
const features = ref([])

const notificationOptions = [
  { value: 'email', label: 'Email', icon: MailIcon, description: 'Receive emails' },
  { value: 'push', label: 'Push', icon: BellIcon, description: 'Push notifications' },
  { value: 'sms', label: 'SMS', icon: DevicePhoneMobileIcon, description: 'SMS messages' }
]

const featureOptions = [
  { value: 'dark-mode', label: 'Dark mode' },
  { value: 'auto-save', label: 'Auto save' },
  { value: 'shortcuts', label: 'Keyboard shortcuts' }
]
</script>

<template>
  <form class="space-y-6">
    <SuCheckboxGroupField 
      :options="notificationOptions"
      displayType="block-card"
      label="Notifications"
      message="Choose your notification preferences"
      v-model="notifications"
    />
    
    <SuCheckboxGroupField 
      :options="featureOptions"
      direction="horizontal"
      label="Features"
      v-model="features"
    />
  </form>
</template>
```

### Selection with limit

```vue
<script setup>
import { ref, computed } from 'vue'

const selectedSkills = ref([])
const maxSkills = 3

const skillOptions = [
  { value: 'js', label: 'JavaScript' },
  { value: 'ts', label: 'TypeScript' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'react', label: 'React' },
  { value: 'node', label: 'Node.js' }
]

const remainingSelections = computed(() => {
  return Math.max(0, maxSkills - selectedSkills.value.length)
})

const message = computed(() => {
  if (remainingSelections.value === 0) {
    return 'Limit reached'
  }
  return `You can select ${remainingSelections.value} more skill(s)`
})
</script>

<template>
  <SuCheckboxGroupField 
    :options="skillOptions"
    :maxSelections="maxSkills"
    :state="remainingSelections === 0 ? 'warning' : 'default'"
    label="Technical skills"
    :message="message"
    v-model="selectedSkills"
  />
</template>
```