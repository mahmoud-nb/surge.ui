# Password

Password component that inherits from the Input component with complexity validation, strength progress bar and visibility toggle. Compliant with W3C accessibility standards with voice feedback for screen readers.

## Usage examples

### Basic Password

<div class="component-demo">
  <div class="demo-section">
    <h4>Simple password with progress bar</h4>
    <div class="demo-inputs">
      <SuPassword 
        label="Password"
        placeholder="Enter your password"
        showProgress
        message="Choose a secure password"
      />
    </div>
  </div>
</div>

```vue
<script setup>
const password = ref('')
</script>

<template>
  <SuPassword 
    label="Password"
    placeholder="Enter your password"
    showProgress
    message="Choose a secure password"
    v-model="password"
  />
</template>
```

### With icon and custom rules

<div class="component-demo">
  <div class="demo-section">
    <h4>Password with icon and strict rules</h4>
    <div class="demo-inputs">
      <SuPassword 
        label="Secure password"
        placeholder="Enter a very secure password"
        :prefixIcon="LockClosedIcon"
        showProgress
        :rules="{
          minLength: 12,
          minUppercase: 2,
          minLowercase: 2,
          minDigits: 2,
          minSpecialChars: 2
        }"
        message="High security password required"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { LockClosedIcon } from '@heroicons/vue/24/outline'

const securePassword = ref('')
const strictRules = {
  minLength: 12,
  minUppercase: 2,
  minLowercase: 2,
  minDigits: 2,
  minSpecialChars: 2
}
</script>

<template>
  <SuPassword 
    label="Secure password"
    placeholder="Enter a very secure password"
    :prefixIcon="LockClosedIcon"
    showProgress
    :rules="strictRules"
    message="High security password required"
    v-model="securePassword"
  />
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rules` | `PasswordRules` | `{ minLength: 8, minUppercase: 1, minLowercase: 1, minDigits: 1, minSpecialChars: 1 }` | Password validation rules |
| `showProgress` | `boolean` | `false` | Show strength progress bar |
| `showToggle` | `boolean` | `true` | Show visibility toggle button |
| `name` | `string` | - | Field name, for native form submission |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Field size |
| `required` | `boolean` | `false` | Required field |
| `placeholder` | `string` | - | Placeholder text |
| `max` | `string \| number` | - | Maximum value (`number`, `date`… types) |
| `disabled` | `boolean` | `false` | Disabled field |
| `min` | `string \| number` | - | Minimum value (`number`, `date`… types) |
| `state` | `'default' \| 'success' \| 'warning' \| 'error'` | `'default'` | Validation state |
| `prefix` | `string` | - | Text before the input |
| `suffix` | `string` | - | Text after the input |
| `autocomplete` | `string` | - | Native `autocomplete` attribute (`email`, `current-password`, `off`…) |
| `readonly` | `boolean` | `false` | Read-only |
| `prefixIcon` | `Component` | - | Icon before the input |
| `prefixLabel` | `string` | - | Accessible name of the text prefix when it is clickable (`@prefix-click`) |
| `prefixIconLabel` | `string` | - | Accessible name of the prefix icon when it is clickable (`@prefix-icon-click`) |
| `suffixLabel` | `string` | - | Accessible name of the text suffix when it is clickable (`@suffix-click`) |
| `suffixIconLabel` | `string` | - | Accessible name of the suffix icon when it is clickable (`@suffix-icon-click`) |
| `textAlign` | `'default' \| 'left' \| 'right' \| 'center'` | - | Alignment of the typed text |
| `step` | `string \| number` | - | Step between two values (`number`, `date`… types) |
| `minLength` | `number` | - | Minimum number of characters (native validation) |
| `maxLength` | `number` | - | Maximum number of characters |
| `pattern` | `string` | - | Native validation regular expression |
| `v-model` | `string` | `''` | Typed password |

**Inherits all props from Input component**: `size`, `state`, `disabled`, `readonly`, `required`, `placeholder`, `label`, `message`, etc.

### Types

#### PasswordRules
```typescript
interface PasswordRules {
  minLength?: number        // Minimum length
  minUppercase?: number     // Minimum uppercase letters
  minLowercase?: number     // Minimum lowercase letters
  minDigits?: number        // Minimum digits
  minSpecialChars?: number  // Minimum special characters
}
```

#### PasswordValidation
```typescript
interface PasswordValidation {
  isValid: boolean          // All rules are satisfied
  score: number            // Score from 0 to 100
  satisfied: string[]      // Satisfied rules
  unsatisfied: string[]    // Unsatisfied rules
  details: {               // Details for each rule
    length: { required: number; current: number; satisfied: boolean }
    uppercase: { required: number; current: number; satisfied: boolean }
    lowercase: { required: number; current: number; satisfied: boolean }
    digits: { required: number; current: number; satisfied: boolean }
    specialChars: { required: number; current: number; satisfied: boolean }
  }
}
```

### Props (PasswordField)

`SuPasswordField` takes the props above, plus the field props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Field label |
| `message` | `string` | - | Help or error message, linked through `aria-describedby` |
| `requiredText` | `string` | - | Screen reader text of the "required" asterisk (translated otherwise) |
| `fieldId` | `string` | - | Control id, linked to the label (generated otherwise) |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `@validation` | `(validation: PasswordValidation) => void` | Emitted on every change with validation state |
| `@toggle-visibility` | `(visible: boolean) => void` | Emitted when visibility is toggled |

**Inherits all events from Input component**: `@input`, `@change`, `@focus`, `@blur`, `@keydown`, `@keyup`

### Slots

| Slot | Props | Description |
|------|-------|-------------|
| `default` | `{ validation, isValid, score, satisfied, unsatisfied, details }` | Custom message based on validation |

## Automatic validation

The component performs real-time password validation:

### 🔍 Validation criteria

- **Length**: Total number of characters
- **Uppercase**: Letters A-Z
- **Lowercase**: Letters a-z  
- **Digits**: Numbers 0-9
- **Special characters**: All other characters (!@#$%^&*, etc.)

### 📊 Score calculation

The score (0-100%) is calculated based on the percentage of satisfied rules:
- **0-24%**: Weak (red)
- **25-49%**: Fair (orange)
- **50-74%**: Good (yellow)
- **75-100%**: Strong (green)

### 🎯 Automatic state

If no `state` is forced, the component automatically adapts its state:
- **default**: No password or indeterminate score
- **error**: Score < 25%
- **warning**: Score 25-74%
- **success**: Score ≥ 75% and all rules satisfied

## Visibility toggle

### 👁️ Features

- **Adaptive icon**: Open/closed eye based on state
- **Accessibility**: Voice label "Show/Hide password"
- **Keyboard navigation**: Support for Enter and Space
- **States**: Disabled if field is disabled/readonly

### 🔒 Security

- **No easier copying**: Visible text is not more easily copyable
- **Visual feedback**: User controls visibility
- **Reversible**: Can be hidden again immediately

## Progress bar

### 📈 Visual display

- **Adaptive color**: Red → Orange → Yellow → Green
- **Smooth animation**: Smooth transition during changes
- **Strength label**: "Weak", "Fair", "Good", "Strong"
- **Responsive**: Adapts to container width

### ♿ Accessibility

- **Progressbar role**: `role="progressbar"` with ARIA values
- **Voice announcements**: Changes announced to screen readers
- **Contrast**: WCAG AA compliant colors
- **Reduced motion**: Respects `prefers-reduced-motion`

## Accessibility

The Password component follows WCAG 2.1 AA standards:

### ✅ Accessibility features

- **Input inheritance**: All accessibility features from Input component
- **Accessible toggle**: Button with appropriate voice label
- **Voice validation**: State change announcements for screen readers
- **Progress bar**: Complete ARIA attributes (`aria-valuenow`, `aria-valuemin`, `aria-valuemax`)
- **State messages**: Real-time voice feedback with `aria-live`
- **Color contrast**: WCAG AA compliant ratios for all states
- **Keyboard navigation**: Complete keyboard support for all interactions

### 🎯 Best practices

```vue
<!-- Password with complete validation -->
<SuPassword 
  label="New password"
  :required="true"
  showProgress
  :rules="{
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minDigits: 1,
    minSpecialChars: 1
  }"
  autocomplete="new-password"
  v-model="password"
  @validation="handlePasswordValidation"
>
  <template #default="{ validation, details }">
    <div class="password-requirements">
      <h4>Required criteria:</h4>
      <ul>
        <li :class="details.length.satisfied ? 'satisfied' : 'unsatisfied'">
          At least {{ details.length.required }} characters
        </li>
        <li :class="details.uppercase.satisfied ? 'satisfied' : 'unsatisfied'">
          At least {{ details.uppercase.required }} uppercase letter
        </li>
        <!-- Other criteria... -->
      </ul>
    </div>
  </template>
</SuPassword>

<!-- Password confirmation -->
<SuPassword 
  label="Confirm password"
  :showProgress="false"
  autocomplete="new-password"
  v-model="confirmPassword"
/>
```

## Keyboard navigation

| Key | Action |
|-----|--------|
| `Tab` | Navigate to/from field |
| `Enter` / `Space` | Activate visibility toggle (on icon) |
| `Ctrl/Cmd + A` | Select all text |

## Security best practices

### ✅ Recommendations

- **Autocomplete**: Use `autocomplete="new-password"` for new passwords
- **Server validation**: Always validate server-side as well
- **Adapted rules**: Adjust rules based on context (personal vs enterprise)
- **Positive feedback**: Encourage good passwords with positive messages
- **No storage**: Never store passwords in plain text

### 🔒 Security

- **No logging**: Component never logs passwords
- **Local validation**: Validation happens client-side only
- **No transmission**: Rules and validations remain local
- **Memory cleanup**: Values are automatically cleaned up