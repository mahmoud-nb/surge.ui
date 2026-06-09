# OtpInput

OTP (One-Time Password) input component for verification codes. Supports multiple visual variants, configurable grouping, flexible validation, and auto-submit. WCAG compliant with full keyboard and screen reader support.

## Usage

### Basic

<div class="component-demo">
  <div class="demo-section">
    <h4>6-digit code</h4>
    <div class="demo-buttons">
      <SuOtpInput :length="6" />
    </div>
  </div>
</div>

```vue
<SuOtpInput :length="6" />
```

### Visual variants

<div class="component-demo">
  <div class="demo-section">
    <h4>boxes / underline / seamless</h4>
    <div class="demo-buttons-vertical" style="gap: 1.5rem;">
      <div>
        <p style="margin: 0 0 0.5rem; font-size: 0.875rem;">Boxes (default)</p>
        <SuOtpInput variant="boxes" :length="6" />
      </div>
      <div>
        <p style="margin: 0 0 0.5rem; font-size: 0.875rem;">Underline</p>
        <SuOtpInput variant="underline" :length="6" />
      </div>
      <div>
        <p style="margin: 0 0 0.5rem; font-size: 0.875rem;">Seamless</p>
        <SuOtpInput variant="seamless" :length="6" />
      </div>
    </div>
  </div>
</div>

```vue
<SuOtpInput variant="boxes" :length="6" />
<SuOtpInput variant="underline" :length="6" />
<SuOtpInput variant="seamless" :length="6" />
```

### Sizes

<div class="component-demo">
  <div class="demo-section">
    <h4>sm / md / lg</h4>
    <div class="demo-buttons-vertical" style="gap: 1.5rem;">
      <SuOtpInput size="sm" :length="6" />
      <SuOtpInput size="md" :length="6" />
      <SuOtpInput size="lg" :length="6" />
    </div>
  </div>
</div>

```vue
<SuOtpInput size="sm" :length="6" />
<SuOtpInput size="md" :length="6" />
<SuOtpInput size="lg" :length="6" />
```

### Grouping

<div class="component-demo">
  <div class="demo-section">
    <h4>Configurable grouping</h4>
    <div class="demo-buttons-vertical" style="gap: 1.5rem;">
      <div>
        <p style="margin: 0 0 0.5rem; font-size: 0.875rem;">6 digits as [3, 3]</p>
        <SuOtpInput :length="6" :grouping="[3, 3]" separator="-" />
      </div>
      <div>
        <p style="margin: 0 0 0.5rem; font-size: 0.875rem;">6 digits as [2, 2, 2]</p>
        <SuOtpInput :length="6" :grouping="[2, 2, 2]" separator="·" />
      </div>
      <div>
        <p style="margin: 0 0 0.5rem; font-size: 0.875rem;">8 digits as [4, 4]</p>
        <SuOtpInput :length="8" :grouping="[4, 4]" separator="-" />
      </div>
    </div>
  </div>
</div>

```vue
<SuOtpInput :length="6" :grouping="[3, 3]" separator="-" />
<SuOtpInput :length="6" :grouping="[2, 2, 2]" separator="·" />
<SuOtpInput :length="8" :grouping="[4, 4]" separator="-" />
```

### Input types

<div class="component-demo">
  <div class="demo-section">
    <h4>Numeric / Alphanumeric / Alphabetic</h4>
    <div class="demo-buttons-vertical" style="gap: 1.5rem;">
      <div>
        <p style="margin: 0 0 0.5rem; font-size: 0.875rem;">Numeric (default)</p>
        <SuOtpInput inputType="numeric" :length="6" />
      </div>
      <div>
        <p style="margin: 0 0 0.5rem; font-size: 0.875rem;">Alphanumeric</p>
        <SuOtpInput inputType="alphanumeric" :length="6" />
      </div>
      <div>
        <p style="margin: 0 0 0.5rem; font-size: 0.875rem;">Alphabetic</p>
        <SuOtpInput inputType="alphabetic" :length="6" />
      </div>
    </div>
  </div>
</div>

```vue
<SuOtpInput inputType="numeric" :length="6" />
<SuOtpInput inputType="alphanumeric" :length="6" />
<SuOtpInput inputType="alphabetic" :length="6" />
```

### Custom validation

<div class="component-demo">
  <div class="demo-section">
    <h4>Hexadecimal only</h4>
    <div class="demo-buttons">
      <SuOtpInput :length="6" pattern="^[0-9a-fA-F]$" inputType="alphanumeric" />
    </div>
  </div>
</div>

```vue
<!-- Via regex pattern -->
<SuOtpInput :length="6" pattern="^[0-9a-fA-F]$" inputType="alphanumeric" />

<!-- Via validate function -->
<SuOtpInput :length="6" :validate="(char) => /^[0-9a-fA-F]$/.test(char)" />
```

### Masked

<div class="component-demo">
  <div class="demo-section">
    <h4>Hidden characters</h4>
    <div class="demo-buttons">
      <SuOtpInput :length="6" :masked="true" />
    </div>
  </div>
</div>

```vue
<SuOtpInput :length="6" :masked="true" />
```

### Validation states

<div class="component-demo">
  <div class="demo-section">
    <h4>error / success / warning</h4>
    <div class="demo-buttons-vertical" style="gap: 1.5rem;">
      <SuOtpInput state="error" :length="6" />
      <SuOtpInput state="success" :length="6" />
      <SuOtpInput state="warning" :length="6" />
    </div>
  </div>
</div>

```vue
<SuOtpInput state="error" :length="6" />
<SuOtpInput state="success" :length="6" />
<SuOtpInput state="warning" :length="6" />
```

### Auto-submit

```vue
<SuOtpInput :length="6" :autoSubmit="true" @complete="handleComplete" />
```

```vue
<script setup>
const handleComplete = (code) => {
  console.log('Complete code:', code)
  // Verify the code...
}
</script>
```

### With FormField (OtpInputField)

<div class="component-demo">
  <div class="demo-section">
    <h4>Label, message, and state</h4>
    <div class="demo-buttons-vertical" style="gap: 1.5rem; max-width: 400px;">
      <SuOtpInputField
        label="Verification code"
        message="Enter the code sent via SMS"
        :length="6"
        :grouping="[3, 3]"
      />
      <SuOtpInputField
        label="Invalid code"
        message="The entered code is incorrect."
        state="error"
        :length="6"
      />
    </div>
  </div>
</div>

```vue
<SuOtpInputField
  label="Verification code"
  message="Enter the code sent via SMS"
  :length="6"
  :grouping="[3, 3]"
/>
```

### 4 digits (SMS code)

<div class="component-demo">
  <div class="demo-section">
    <h4>Short code</h4>
    <div class="demo-buttons">
      <SuOtpInput :length="4" placeholder="0" />
    </div>
  </div>
</div>

```vue
<SuOtpInput :length="4" placeholder="0" />
```

## API

### Props (OtpInput)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | `''` | OTP code value (v-model) |
| `length` | `number` | `6` | Number of characters |
| `variant` | `'boxes' \| 'underline' \| 'seamless'` | `'boxes'` | Visual variant |
| `inputType` | `'numeric' \| 'alphanumeric' \| 'alphabetic'` | `'numeric'` | Accepted character type |
| `pattern` | `string` | — | Custom regex pattern (overrides inputType) |
| `validate` | `(char: string, index: number) => boolean` | — | Per-character validation function |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `state` | `State` | `'default'` | Validation state |
| `disabled` | `boolean` | `false` | Disabled |
| `readonly` | `boolean` | `false` | Read-only |
| `required` | `boolean` | `false` | Required |
| `masked` | `boolean` | `false` | Mask characters |
| `grouping` | `number[]` | — | Grouping pattern (e.g., [3, 3]) |
| `separator` | `string` | `'-'` | Separator character between groups |
| `autoSubmit` | `boolean` | `false` | Emit `complete` when all fields are filled |
| `placeholder` | `string` | `''` | Placeholder per field |
| `autoFocus` | `boolean` | `false` | Auto-focus on mount |

### Props (OtpInputField)

Inherits from `FormFieldProps` + `OtpInputProps`. Additional props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Field label |
| `message` | `string` | — | Help or error message |
| `fieldId` | `string` | — | Custom ID |
| `requiredText` | `string` | `'requis'` | Required indicator text |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | v-model update |
| `complete` | `string` | All fields are filled (if `autoSubmit`) |
| `change` | `string` | Value changed |
| `focus` | `FocusEvent, number` | Focus on a field (with index) |
| `blur` | `FocusEvent, number` | Blur from a field (with index) |

### Slots

| Slot | Description |
|------|-------------|
| `separator` | Custom separator content between groups |

### Exposed methods

| Method | Description |
|--------|-------------|
| `focus()` | Focus the first field |
| `clear()` | Clear all fields and focus the first one |

## Accessibility

- `role="group"` with descriptive `aria-label` on the container
- Each field has an individual `aria-label` ("Character X of Y")
- `aria-live="polite"` region to announce progress
- Keyboard navigation: left/right arrows, Home, End, Backspace, Delete
- `autocomplete="one-time-code"` for mobile auto-fill
- `inputmode="numeric"` to show numeric keyboard on mobile
- Paste support with automatic character distribution
- Supports `prefers-contrast: high` and `prefers-reduced-motion: reduce`
