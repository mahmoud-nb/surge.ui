# Switch

Switch (toggle) component for on/off actions. W3C compliant with complete accessibility support and intelligent label positioning.

## Description

`Switch` is an enhanced toggle component that allows switching between two states (on/off). It offers different label positioning options (left, right, inside), supports custom icons, and complies with all accessibility standards.

## Usage examples

### Simple usage (without SuFormField)

```vue
<script setup>
import { ref } from 'vue'

const isEnabled = ref(false)
</script>

<template>
  <SuSwitch v-model="isEnabled" />
</template>
```

### With right label

```vue
<template>
  <SuSwitch 
    rightLabel="Enabled"
    v-model="darkMode"
  />
</template>
```

### With labels on both sides

```vue
<template>
  <SuSwitch 
    leftLabel="Private"
    rightLabel="Public"
    v-model="isPublic"
  />
</template>
```

### With icons

```vue
<script setup>
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <SuSwitch 
    leftLabel="Light"
    rightLabel="Dark"
    :leftIcon="SunIcon"
    :rightIcon="MoonIcon"
    v-model="theme"
  />
</template>
```

### Sizes

```vue
<template>
  <SuSwitch size="sm" rightLabel="Small" />
  <SuSwitch size="md" rightLabel="Medium" />
  <SuSwitch size="lg" rightLabel="Large" />
</template>
```

### States

```vue
<template>
  <SuSwitch rightLabel="Default" />
  <SuSwitch state="error" rightLabel="Error" :value="true" />
  <SuSwitch state="success" rightLabel="Success" :value="true" />
  <SuSwitch state="warning" rightLabel="Warning" :value="true" />
</template>
```

### Label positions

```vue
<template>
  <!-- Outside labels (default) -->
  <SuSwitch 
    leftLabel="OFF"
    rightLabel="ON"
    labelPosition="outside"
  />
  
  <!-- Inside labels -->
  <SuSwitch 
    leftLabel="OFF"
    rightLabel="ON"
    labelPosition="inside"
  />
</template>
```

## Usage with SuFormField

### Basic usage

```vue
<template>
  <SuFormField 
    label="Notifications" 
    message="Enable push notifications"
  >
    <template #default="slotProps">
      <SuSwitch 
        rightLabel="Enabled"
        v-bind="slotProps"
        v-model="notifications"
      />
    </template>
  </SuFormField>
</template>
```

### With validation

```vue
<script setup>
import { ref, computed } from 'vue'

const termsAccepted = ref(false)

const termsState = computed(() => {
  return termsAccepted.value ? 'success' : 'error'
})

const termsMessage = computed(() => {
  return termsAccepted.value 
    ? 'Terms accepted' 
    : 'You must accept the terms'
})
</script>

<template>
  <SuFormField 
    label="Accept terms"
    :required="true"
    :state="termsState"
    :message="termsMessage"
  >
    <template #default="slotProps">
      <SuSwitch 
        rightLabel="I accept"
        v-bind="slotProps"
        v-model="termsAccepted"
      />
    </template>
  </SuFormField>
</template>
```

### Settings panel

```vue
<script setup>
import { ref } from 'vue'

const settings = ref({
  notifications: true,
  darkMode: false,
  autoSave: true,
  publicProfile: false
})
</script>

<template>
  <div class="settings-panel">
    <h2>Settings</h2>
    
    <SuFormField 
      label="Dark mode"
      message="Switch between themes"
    >
      <template #default="slotProps">
        <SuSwitch 
          leftLabel="Light"
          rightLabel="Dark"
          v-bind="slotProps"
          v-model="settings.darkMode"
        />
      </template>
    </SuFormField>
    
    <SuFormField 
      label="Auto-save"
      message="Automatically save your changes"
    >
      <template #default="slotProps">
        <SuSwitch 
          rightLabel="Enabled"
          v-bind="slotProps"
          v-model="settings.autoSave"
        />
      </template>
    </SuFormField>
  </div>
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | `false` | Switch state (v-model) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Switch size |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | Visual state |
| `disabled` | `boolean` | `false` | Disable the switch |
| `readonly` | `boolean` | `false` | Read-only switch |
| `required` | `boolean` | `false` | Required field |
| `leftLabel` | `string` | `undefined` | Left label |
| `rightLabel` | `string` | `undefined` | Right label |
| `leftIcon` | `Component` | `undefined` | Left icon (Heroicons) |
| `rightIcon` | `Component` | `undefined` | Right icon (Heroicons) |
| `labelPosition` | `'outside' \| 'inside'` | `'outside'` | Label position |

### Accessibility props (inherited from SuFormField)

When used with `SuFormField`, automatically receives:

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique field ID (fieldId) |
| `aria-describedby` | `string` | Associated message ID (messageId) |
| `state` | `string` | Validation state |
| `disabled` | `boolean` | Disabled state |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `@update:modelValue` | `(value: boolean) => void` | Emitted on change (v-model) |
| `@change` | `(value: boolean) => void` | Emitted on change |
| `@focus` | `(event: FocusEvent) => void` | Emitted on focus |
| `@blur` | `(event: FocusEvent) => void` | Emitted on blur |

## Label positioning

Automatic positioning based on provided labels:

- **No side labels**: Switch alone
- **One label** (`leftLabel` OR `rightLabel`): Switch aligned next to label
- **Two labels** (`leftLabel` AND `rightLabel`): Switch centered between labels

## Accessibility

WCAG 2.1 AA compliant with W3C best practices:

### ✅ Accessibility features

- **ARIA role**: `role="switch"` with `aria-checked`
- **Keyboard navigation**: Space and Enter keys
- **Associated labels**: Via aria-describedby (messageId)
- **State messages**: With `aria-live`
- **Color contrast**: WCAG AA ratios (4.5:1)
- **Visible focus**: Clear outline indicator
- **Minimum sizes**: 44px touch target minimum
- **Reduced motion**: Respects `prefers-reduced-motion`

### 🎯 Best practices

```vue
<!-- ✅ GOOD: With SuFormField -->
<SuFormField 
  label="Notifications"
  :required="true"
  message="Enable push notifications"
>
  <template #default="slotProps">
    <SuSwitch 
      rightLabel="Enabled"
      v-bind="slotProps"
      v-model="notifications"
    />
  </template>
</SuFormField>

<!-- ✅ GOOD: Standalone with aria-label -->
<SuSwitch 
  aria-label="Enable notifications"
  rightLabel="Enabled"
  v-model="notifications"
/>

<!-- ❌ BAD: Without label or context -->
<SuSwitch v-model="value" />
```

## Keyboard navigation

| Key | Action |
|-----|--------|
| `Tab` | Navigate to/from switch |
| `Space` | Toggle state |
| `Enter` | Toggle state |

## Advanced examples

### Conditional validation

```vue
<script setup>
import { ref, computed } from 'vue'

const termsAccepted = ref(false)
const privacyAccepted = ref(false)

const canProceed = computed(() => {
  return termsAccepted.value && privacyAccepted.value
})

const getState = (value) => value ? 'success' : 'error'
const getMessage = (value, success, error) => value ? success : error
</script>

<template>
  <form>
    <h2>Consents</h2>
    
    <SuFormField 
      label="Terms of use"
      :required="true"
      :state="getState(termsAccepted)"
      :message="getMessage(
        termsAccepted,
        'Terms accepted',
        'You must accept the terms'
      )"
    >
      <template #default="slotProps">
        <SuSwitch 
          rightLabel="I accept"
          v-bind="slotProps"
          v-model="termsAccepted"
        />
      </template>
    </SuFormField>
    
    <button :disabled="!canProceed">Continue</button>
  </form>
</template>
```

## SuSwitchField Component

For simpler usage, use `SuSwitchField` which combines `SuFormField` and `SuSwitch`:

```vue
<template>
  <!-- Instead of -->
  <SuFormField label="Notifications" message="Enable notifications">
    <template #default="slotProps">
      <SuSwitch 
        rightLabel="Enabled"
        v-bind="slotProps"
        v-model="notifications"
      />
    </template>
  </SuFormField>
  
  <!-- Simply write -->
  <SuSwitchField 
    label="Notifications"
    rightLabel="Enabled"
    message="Enable notifications"
    v-model="notifications"
  />
</template>
```

See the [complete SuSwitchField documentation](./SuSwitchField.md) for more details.