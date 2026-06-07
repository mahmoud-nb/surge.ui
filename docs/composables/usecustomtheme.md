# useCustomTheme

Composable pour injecter des variables CSS personnalisees au runtime. Permet de surcharger les tokens du design system pour un composant ou une section specifique.

## Utilisation basique

```vue
<script setup>
import { useCustomTheme } from '@surgeui/ds-vue'

const { setVariable, setVariables, removeVariable, clearAll } = useCustomTheme()

// Surcharger un token
setVariable('--su-primary-default', '#e11d48')

// Surcharger plusieurs tokens
setVariables({
  '--su-primary-default': '#e11d48',
  '--su-primary-hover': '#be123c',
  '--su-primary-text': '#ffffff',
})
</script>
```

## Cas d'usage

### Branding dynamique

```vue
<script setup>
import { useCustomTheme } from '@surgeui/ds-vue'

const { setVariables } = useCustomTheme()

// Appliquer les couleurs de marque du client
function applyBranding(brand) {
  setVariables({
    '--su-primary-default': brand.primaryColor,
    '--su-primary-hover': brand.primaryHover,
    '--su-bg-canvas': brand.backgroundColor,
  })
}
</script>
```

### Reinitialisation

```vue
<script setup>
import { useCustomTheme } from '@surgeui/ds-vue'

const { removeVariable, clearAll } = useCustomTheme()

// Retirer une surcharge
removeVariable('--su-primary-default')

// Retirer toutes les surcharges
clearAll()
</script>
```

## API

| Methode | Description |
|---------|-------------|
| `setVariable(name, value)` | Definir une variable CSS sur `:root` |
| `setVariables(vars)` | Definir plusieurs variables CSS |
| `removeVariable(name)` | Retirer une surcharge |
| `clearAll()` | Retirer toutes les surcharges |
