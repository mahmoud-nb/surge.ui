# CheckboxGroup

CheckboxGroup component for multiple selection with two display styles: classic or cards. Complete accessibility support according to W3C standards.

## Description

`CheckboxGroup` is an enhanced multiple-selection component that allows choosing several options simultaneously. It offers different display styles (classic, inline cards, block cards), supports icons and descriptions, selection limit, and complies with all accessibility standards.

## Usage examples

### Simple usage (without SuFormField)

<div class="component-demo">
  <div class="demo-section">
    <h4>Basic CheckboxGroup</h4>
    <div class="demo-inputs">
      <SuCheckboxGroup 
        :options="[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
          { value: 'option4', label: 'Option 4', disabled: true }
        ]"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const selectedValues = ref([])
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4', disabled: true }
]
</script>

<template>
  <SuCheckboxGroup 
    :options="options"
    v-model="selectedValues"
  />
</template>
```

### Block card style

<div class="component-demo">
  <div class="demo-section">
    <h4>Stacked cards</h4>
    <div class="demo-inputs">
      <SuCheckboxGroup 
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
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const selectedTechnologies = ref([])
</script>

<template>
  <SuCheckboxGroup 
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
    v-model="selectedTechnologies"
  />
</template>
```

### Inline cards

<div class="component-demo">
  <div class="demo-section">
    <h4>Horizontal cards</h4>
    <div class="demo-inputs">
      <SuCheckboxGroup 
        :options="[
          { value: 'email', label: 'Email', description: 'Email notifications' },
          { value: 'sms', label: 'SMS', description: 'SMS notifications' },
          { value: 'push', label: 'Push', description: 'Push notifications' }
        ]"
        displayType="inline-card"
        direction="horizontal"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const notifications = ref([])
</script>

<template>
  <SuCheckboxGroup 
    :options="[
      { value: 'email', label: 'Email', description: 'Email notifications' },
      { value: 'sms', label: 'SMS', description: 'SMS notifications' },
      { value: 'push', label: 'Push', description: 'Push notifications' }
    ]"
    displayType="inline-card"
    direction="horizontal"
    v-model="notifications"
  />
</template>
```

### With icons

<div class="component-demo">
  <div class="demo-section">
    <h4>Options with icons</h4>
    <div class="demo-inputs">
      <SuCheckboxGroup 
        :options="[
          { value: 'read', label: 'Read', icon: 'BookOpenIcon' },
          { value: 'write', label: 'Write', icon: 'PencilIcon' },
          { value: 'admin', label: 'Admin', icon: 'ShieldCheckIcon' }
        ]"
        displayType="block-card"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { BookOpenIcon, PencilIcon, ShieldCheckIcon } from '@heroicons/vue/24/outline'

const permissions = ref([])
const permissionOptions = [
  { value: 'read', label: 'Read', icon: BookOpenIcon },
  { value: 'write', label: 'Write', icon: PencilIcon },
  { value: 'admin', label: 'Admin', icon: ShieldCheckIcon }
]
</script>

<template>
  <SuCheckboxGroup 
    :options="permissionOptions"
    displayType="block-card"
    v-model="permissions"
  />
</template>
```

### Selection limit

<div class="component-demo">
  <div class="demo-section">
    <h4>Maximum 2 selections</h4>
    <div class="demo-inputs">
      <SuCheckboxGroup 
        :options="[
          { value: 'skill1', label: 'JavaScript' },
          { value: 'skill2', label: 'Python' },
          { value: 'skill3', label: 'Java' },
          { value: 'skill4', label: 'C#' },
          { value: 'skill5', label: 'PHP' }
        ]"
        :maxSelections="2"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const selectedSkills = ref([])
</script>

<template>
  <SuCheckboxGroup 
    :options="skillOptions"
    :maxSelections="2"
    v-model="selectedSkills"
  />
</template>
```

### Sizes

<div class="component-demo">
  <div class="demo-section">
    <h4>Available sizes</h4>
    <div class="demo-inputs">
      <SuCheckboxGroup 
        :options="[
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' }
        ]"
        size="sm"
      />
      <SuCheckboxGroup 
        :options="[
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' }
        ]"
        size="md"
      />
      <SuCheckboxGroup 
        :options="[
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' }
        ]"
        size="lg"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuCheckboxGroup 
    :options="options"
    size="sm" 
  />
  
  <SuCheckboxGroup 
    :options="options"
    size="md" 
  />
  
  <SuCheckboxGroup 
    :options="options"
    size="lg" 
  />
</template>
```

### States

<div class="component-demo">
  <div class="demo-section">
    <h4>Visual states</h4>
    <div class="demo-inputs">
      <SuCheckboxGroup 
        :options="options"
      />
      <SuCheckboxGroup 
        :options="options"
        state="error"
      />
      <SuCheckboxGroup 
        :options="options"
        state="success"
        :value="['option1']"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuCheckboxGroup 
    :options="options"
  />
  
  <SuCheckboxGroup 
    :options="options"
    state="error"
  />
  
  <SuCheckboxGroup 
    :options="options"
    state="success"
    :value="['option1']"
  />
</template>
```

### Horizontal direction

<div class="component-demo">
  <div class="demo-section">
    <h4>Horizontal layout</h4>
    <div class="demo-inputs">
      <SuCheckboxGroup 
        :options="[
          { value: 'monday', label: 'Mon' },
          { value: 'tuesday', label: 'Tue' },
          { value: 'wednesday', label: 'Wed' },
          { value: 'thursday', label: 'Thu' },
          { value: 'friday', label: 'Fri' }
        ]"
        direction="horizontal"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuCheckboxGroup 
    :options="[
      { value: 'monday', label: 'Mon' },
      { value: 'tuesday', label: 'Tue' },
      { value: 'wednesday', label: 'Wed' },
      { value: 'thursday', label: 'Thu' },
      { value: 'friday', label: 'Fri' }
    ]"
    direction="horizontal"
    v-model="workDays"
  />
</template>
```

## Usage with SuFormField

The `SuCheckboxGroup` component can be used with `SuFormField` to benefit from a complete form structure with label, message and state management.

### Basic usage with SuFormField

```vue
<template>
  <SuFormField 
    label="Notifications" 
    message="Select your notification preferences"
  >
    <template #default="slotProps">
      <SuCheckboxGroup 
        :options="notificationOptions"
        v-bind="slotProps"
        v-model="notifications"
      />
    </template>
  </SuFormField>
</template>
```

### With slot props destructuring

```vue
<template>
  <SuFormField 
    label="Skills"
    :required="true"
    message="Select your skills"
  >
    <template #default="{ fieldId, messageId, state, disabled }">
      <SuCheckboxGroup 
        :options="skills"
        :id="fieldId"
        :aria-describedby="messageId"
        :state="state"
        :disabled="disabled"
        v-model="selectedSkills"
      />
    </template>
  </SuFormField>
</template>
```

### Validation with states

<div class="component-demo">
  <div class="demo-section">
    <h4>CheckboxGroup with validation</h4>
    <div class="demo-inputs">
      <SuFormField 
        label="Terms of use"
        :required="true"
        state="error"
        message="Please accept at least one term"
      >
        <template #default="slotProps">
          <SuCheckboxGroup 
            :options="[
              { value: 'terms', label: 'I accept the terms' },
              { value: 'privacy', label: 'I accept the privacy policy' }
            ]"
            v-bind="slotProps"
          />
        </template>
      </SuFormField>
    </div>
  </div>
</div>

```vue
<script setup>
import { ref, computed } from 'vue'

const acceptedTerms = ref([])
const termsError = ref('')

const validateTerms = () => {
  if (acceptedTerms.value.length === 0) {
    termsError.value = 'Please accept at least one term'
  } else {
    termsError.value = ''
  }
}

const termsState = computed(() => {
  if (acceptedTerms.value.length === 0) return 'default'
  return termsError.value ? 'error' : 'success'
})
</script>

<template>
  <SuFormField 
    label="Terms of use"
    :required="true"
    :state="termsState"
    :message="termsError || 'Please accept the terms'"
  >
    <template #default="slotProps">
      <SuCheckboxGroup 
        :options="termsOptions"
        v-bind="slotProps"
        v-model="acceptedTerms"
        @change="validateTerms"
      />
    </template>
  </SuFormField>
</template>
```

### Selection limit with FormField

```vue
<script setup>
import { ref, computed } from 'vue'

const selectedSkills = ref([])
const maxSkills = 3

const remainingSelections = computed(() => {
  return Math.max(0, maxSkills - selectedSkills.value.length)
})

const message = computed(() => {
  if (remainingSelections.value === 0) {
    return 'Limit reached'
  }
  return `You can still select ${remainingSelections.value} skill(s)`
})
</script>

<template>
  <SuFormField 
    label="Technical skills"
    :state="remainingSelections.value === 0 ? 'warning' : 'default'"
    :message="message"
    :required="true"
  >
    <template #default="slotProps">
      <SuCheckboxGroup 
        :options="skillOptions"
        :maxSelections="maxSkills"
        v-bind="slotProps"
        v-model="selectedSkills"
      />
    </template>
  </SuFormField>
</template>
```

### Cards with FormField

```vue
<template>
  <SuFormField 
    label="Technologies"
    message="Select the technologies you master"
  >
    <template #default="slotProps">
      <SuCheckboxGroup 
        :options="[
          { value: 'js', label: 'JavaScript', description: 'Web language' },
          { value: 'ts', label: 'TypeScript', description: 'JS with typing' },
          { value: 'vue', label: 'Vue.js', description: 'Progressive framework' }
        ]"
        displayType="block-card"
        v-bind="slotProps"
        v-model="technologies"
      />
    </template>
  </SuFormField>
</template>
```

### Custom label and message

```vue
<script setup>
import { BellIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <SuFormField 
    label="Notifications" 
    :required="true"
    message="Select your preferences"
  >
    <template #label="{ label, required, htmlFor }">
      <label 
        :for="htmlFor" 
        class="flex items-center gap-2 font-bold text-gray-900"
      >
        <BellIcon class="w-4 h-4" />
        {{ label }}
        <span v-if="required" class="text-red-500">*</span>
      </label>
    </template>
    
    <template #default="slotProps">
      <SuCheckboxGroup 
        :options="notificationOptions"
        displayType="inline-card"
        direction="horizontal"
        v-bind="slotProps"
        v-model="notifications"
      />
    </template>
    
    <template #message="{ state }">
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <InformationCircleIcon class="w-4 h-4" />
        <span v-if="state === 'error'">⚠️ Please select at least one option</span>
        <span v-else>Choose how you want to be notified</span>
      </div>
    </template>
  </SuFormField>
</template>
```

### With icons and descriptions

```vue
<script setup>
import { BookOpenIcon, PencilIcon, ShieldCheckIcon } from '@heroicons/vue/24/outline'

const permissions = [
  { 
    value: 'read', 
    label: 'Read', 
    description: 'View documents',
    icon: BookOpenIcon 
  },
  { 
    value: 'write', 
    label: 'Write', 
    description: 'Create and edit',
    icon: PencilIcon 
  },
  { 
    value: 'admin', 
    label: 'Admin', 
    description: 'Full access',
    icon: ShieldCheckIcon 
  }
]
</script>

<template>
  <SuFormField 
    label="Permissions"
    message="Select permissions to grant"
  >
    <template #default="slotProps">
      <SuCheckboxGroup 
        :options="permissions"
        displayType="block-card"
        v-bind="slotProps"
        v-model="selectedPermissions"
      />
    </template>
  </SuFormField>
</template>
```

### Scroll with limited height

```vue
<template>
  <SuFormField 
    label="Skills"
    message="List with limited height and automatic scroll"
  >
    <template #default="slotProps">
      <SuCheckboxGroup 
        :options="longSkillsList"
        maxHeight="180px"
        v-bind="slotProps"
        v-model="selectedSkills"
      />
    </template>
  </SuFormField>
</template>
```

### With before and after slots

```vue
<script setup>
const selectAll = () => {
  selectedFeatures.value = featureOptions.map(opt => opt.value)
}

const selectNone = () => {
  selectedFeatures.value = []
}
</script>

<template>
  <SuFormField 
    label="Features"
    message="Configure your features"
  >
    <template #default="slotProps">
      <SuCheckboxGroup 
        :options="featureOptions"
        v-bind="slotProps"
        v-model="selectedFeatures"
      >
        <template #before>
          <div class="info-banner">
            💡 Select the features you want to enable.
          </div>
        </template>
        <template #after>
          <div class="actions">
            <button type="button" @click="selectAll">Select all</button>
            <button type="button" @click="selectNone">Select none</button>
          </div>
        </template>
      </SuCheckboxGroup>
    </template>
  </SuFormField>
</template>
```

### Disabled field

```vue
<template>
  <SuFormField 
    label="Disabled options"
    :disabled="true"
    message="This field is not editable currently"
  >
    <template #default="slotProps">
      <SuCheckboxGroup 
        :options="options"
        :value="['option1', 'option2']"
        v-bind="slotProps"
      />
    </template>
  </SuFormField>
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `CheckboxOption[]` | `[]` | List of checkbox options |
| `modelValue` | `(string \| number)[]` | `[]` | Selected values (v-model) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Element size |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | Visual state |
| `disabled` | `boolean` | `false` | Disable entire group |
| `required` | `boolean` | `false` | At least one selection required |
| `displayType` | `'default' \| 'inline-card' \| 'block-card'` | `'default'` | Display type |
| `direction` | `'horizontal' \| 'vertical'` | `'vertical'` | Group direction |
| `maxSelections` | `number` | `undefined` | Maximum number of selections |
| `maxHeight` | `string` | `null` | Maximum height with scroll |

### Accessibility props (inherited from SuFormField)

When used with `SuFormField`, the component automatically receives:

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique field ID (fieldId) |
| `aria-describedby` | `string` | Associated message ID (messageId) |
| `state` | `string` | Validation state |
| `disabled` | `boolean` | Disabled state |

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
| `@update:modelValue` | `(value: (string \| number)[]) => void` | Emitted when value changes (v-model) |
| `@change` | `(value: (string \| number)[]) => void` | Emitted on change |
| `@focus` | `(event: FocusEvent) => void` | Emitted on focus |
| `@blur` | `(event: FocusEvent) => void` | Emitted on blur |

### Slots

| Slot | Description |
|------|-------------|
| `before` | Content displayed before options |
| `after` | Content displayed after options |

## Accessibility

The CheckboxGroup component follows WCAG 2.1 AA standards and W3C best practices:

### ✅ Accessibility features

- **Fieldset and Legend**: Semantic structure with `<fieldset>` and `<legend>`
- **ARIA attributes**: `role="group"`, `aria-required`, `aria-invalid`
- **Keyboard navigation**: Tab and Space
- **Associated labels**: Each checkbox has a properly associated label
- **State messages**: Via aria-describedby (messageId) with `aria-live`
- **Voice announcements**: Feedback on selections/deselections
- **Visible focus**: Clear and contrasted indicators
- **Color contrast**: WCAG AA compliant ratios (4.5:1)
- **Logical grouping**: Options semantically grouped

### 🎯 Usage best practices

```vue
<!-- ✅ GOOD: Usage with SuFormField for complete accessibility -->
<SuFormField 
  label="Terms of use"
  :required="true"
  :state="termsError ? 'error' : 'default'"
  :message="termsError || 'Please accept the terms'"
>
  <template #default="slotProps">
    <SuCheckboxGroup 
      :options="termsOptions"
      v-bind="slotProps"
      v-model="acceptedTerms"
    />
  </template>
</SuFormField>

<!-- ✅ GOOD: Standalone usage with fieldset and legend -->
<fieldset>
  <legend>Notifications</legend>
  <SuCheckboxGroup 
    :options="notificationOptions"
    aria-required="true"
    v-model="notifications"
  />
</fieldset>

<!-- ❌ BAD: Without label or context -->
<SuCheckboxGroup 
  :options="options"
  v-model="values"
/>
```

## Keyboard navigation

| Key | Action |
|--------|--------|
| `Tab` | Navigate between checkboxes |
| `Shift + Tab` | Reverse navigation |
| `Space` | Check/uncheck focused checkbox |

## Advanced usage examples

### Complete preferences form

```vue
<script setup>
import { ref } from 'vue'
import { BellIcon, EnvelopeIcon, DevicePhoneMobileIcon } from '@heroicons/vue/24/outline'

const formData = ref({
  notifications: ['email'],
  features: [],
  permissions: []
})

const notificationOptions = [
  { value: 'email', label: 'Email', icon: EnvelopeIcon, description: 'Receive emails' },
  { value: 'push', label: 'Push', icon: BellIcon, description: 'Push notifications' },
  { value: 'sms', label: 'SMS', icon: DevicePhoneMobileIcon, description: 'SMS messages' }
]

const featureOptions = [
  { value: 'dark-mode', label: 'Dark mode' },
  { value: 'auto-save', label: 'Auto-save' },
  { value: 'shortcuts', label: 'Keyboard shortcuts' }
]
</script>

<template>
  <form>
    <h2>Preferences</h2>
    
    <SuFormField 
      label="Notifications"
      message="Choose your notification preferences"
    >
      <template #default="slotProps">
        <SuCheckboxGroup 
          :options="notificationOptions"
          displayType="block-card"
          v-bind="slotProps"
          v-model="formData.notifications"
        />
      </template>
    </SuFormField>
    
    <SuFormField 
      label="Features"
      message="Enable desired features"
    >
      <template #default="slotProps">
        <SuCheckboxGroup 
          :options="featureOptions"
          direction="horizontal"
          v-bind="slotProps"
          v-model="formData.features"
        />
      </template>
    </SuFormField>
    
    <button type="submit">Save</button>
  </form>
</template>
```

### Selection with limit and counter

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
  { value: 'node', label: 'Node.js' },
  { value: 'python', label: 'Python' }
]

const remainingSelections = computed(() => {
  return Math.max(0, maxSkills - selectedSkills.value.length)
})

const state = computed(() => {
  if (selectedSkills.value.length === 0) return 'default'
  if (remainingSelections.value === 0) return 'warning'
  return 'success'
})

const message = computed(() => {
  if (selectedSkills.value.length === 0) {
    return 'Select up to 3 skills'
  }
  if (remainingSelections.value === 0) {
    return 'Limit reached - Deselect a skill to choose another'
  }
  return `You can still select ${remainingSelections.value} skill(s)`
})
</script>

<template>
  <SuFormField 
    label="Technical skills"
    :required="true"
    :state="state"
    :message="message"
  >
    <template #default="slotProps">
      <SuCheckboxGroup 
        :options="skillOptions"
        :maxSelections="maxSkills"
        v-bind="slotProps"
        v-model="selectedSkills"
      />
    </template>
  </SuFormField>
</template>
```

## SuCheckboxGroupField Component

For even simpler usage, you can use the `SuCheckboxGroupField` component which automatically combines `SuFormField` and `SuCheckboxGroup`:

```vue
<template>
  <!-- Instead of -->
  <SuFormField label="Notifications" message="Select your preferences">
    <template #default="slotProps">
      <SuCheckboxGroup 
        :options="options"
        v-bind="slotProps"
        v-model="notifications"
      />
    </template>
  </SuFormField>
  
  <!-- You can simply write -->
  <SuCheckboxGroupField 
    :options="options"
    label="Notifications"
    message="Select your preferences"
    v-model="notifications"
  />
</template>
```

The `SuCheckboxGroupField` component accepts all props from both `SuFormField` and `SuCheckboxGroup` combined, offering a more concise syntax while retaining all features.

See the [complete SuCheckboxGroupField documentation](./SuCheckboxGroupField.md) for more details.