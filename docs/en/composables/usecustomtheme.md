# useCustomTheme

Composable for injecting custom CSS variables at runtime. Override design system tokens for a specific component or section.

## Basic usage

```vue
<script setup>
import { useCustomTheme } from '@surgeui/ds-vue'

const { setVariable, setVariables, removeVariable, clearAll } = useCustomTheme()

// Override a token
setVariable('--su-primary-default', '#e11d48')

// Override multiple tokens
setVariables({
  '--su-primary-default': '#e11d48',
  '--su-primary-hover': '#be123c',
  '--su-primary-text': '#ffffff',
})
</script>
```

## Use cases

### Dynamic branding

```vue
<script setup>
import { useCustomTheme } from '@surgeui/ds-vue'

const { setVariables } = useCustomTheme()

// Apply client brand colors
function applyBranding(brand) {
  setVariables({
    '--su-primary-default': brand.primaryColor,
    '--su-primary-hover': brand.primaryHover,
    '--su-bg-canvas': brand.backgroundColor,
  })
}
</script>
```

### Reset

```vue
<script setup>
import { useCustomTheme } from '@surgeui/ds-vue'

const { removeVariable, clearAll } = useCustomTheme()

// Remove a single override
removeVariable('--su-primary-default')

// Remove all overrides
clearAll()
</script>
```

## API

| Method | Description |
|--------|-------------|
| `setVariable(name, value)` | Set a CSS variable on `:root` |
| `setVariables(vars)` | Set multiple CSS variables |
| `removeVariable(name)` | Remove an override |
| `clearAll()` | Remove all overrides |
