# useTheme

Composable pour la gestion des themes, du mode clair/sombre, du contraste et du mouvement. Persiste les preferences utilisateur dans `localStorage`.

## Utilisation basique

```vue
<script setup>
import { useTheme } from '@surgeui/ds-vue'

const {
  themeName,
  isDarkMode,
  effectiveTheme,
  effectiveThemeMode,
  setTheme,
  setThemeMode,
  toggleMode,
  cycleTheme,
  availableThemes,
} = useTheme()
</script>

<template>
  <button @click="toggleMode">
    {{ isDarkMode ? 'Mode clair' : 'Mode sombre' }}
  </button>
</template>
```

## Themes disponibles

5 themes integres : `default`, `ocean`, `forest`, `sunset` (+ mode `light` / `dark` pour chacun).

```vue
<script setup>
import { useTheme } from '@surgeui/ds-vue'

const { setTheme, setThemeMode, availableThemes } = useTheme()

// Changer le theme visuel
setTheme('ocean')

// Changer le mode luminosite
setThemeMode('dark')   // 'light' | 'dark' | 'system'
</script>
```

## Detection systeme

Le composable detecte automatiquement les preferences systeme :

- **Mode sombre** : `prefers-color-scheme: dark`
- **Contraste eleve** : `prefers-contrast: more`
- **Mouvement reduit** : `prefers-reduced-motion: reduce`

```vue
<script setup>
import { useTheme } from '@surgeui/ds-vue'

const { systemTheme, systemContrast, systemMotion } = useTheme()

// systemTheme.value → 'light' | 'dark'
// systemContrast.value → 'normal' | 'high'
// systemMotion.value → 'normal' | 'reduce'
</script>
```

## Options

```typescript
useTheme({
  availableThemes?: string[]     // Themes actives (defaut: tous)
  defaultTheme?: string          // Theme par defaut ('default')
  defaultThemeMode?: ThemeMode   // Mode par defaut ('auto')
  storageKey?: string            // Cle localStorage ('su-theme-config')
  persist?: boolean              // Persister les preferences (true)
})
```

## API

### Etat reactif

| Propriete | Type | Description |
|-----------|------|-------------|
| `themeName` | `Ref<ThemeName>` | Nom du theme actuel |
| `themeMode` | `Ref<ThemeMode>` | Mode luminosite choisi |
| `contrastMode` | `Ref<ContrastMode>` | Mode de contraste choisi |
| `motionMode` | `Ref<MotionMode>` | Mode de mouvement choisi |

### Valeurs resolues

| Propriete | Type | Description |
|-----------|------|-------------|
| `effectiveTheme` | `ComputedRef<ThemeName>` | Theme applique (avec fallback) |
| `effectiveThemeMode` | `ComputedRef<'light' \| 'dark'>` | Mode luminosite effectif |
| `isDarkMode` | `ComputedRef<boolean>` | Mode sombre actif |
| `effectiveContrast` | `ComputedRef<'normal' \| 'high'>` | Contraste effectif |
| `effectiveMotion` | `ComputedRef<'normal' \| 'reduce'>` | Mouvement effectif |
| `currentThemeMetadata` | `ComputedRef<ThemeMetadata>` | Metadonnees du theme actif |

### Detection systeme

| Propriete | Type | Description |
|-----------|------|-------------|
| `systemTheme` | `ComputedRef<'light' \| 'dark'>` | Preference systeme |
| `systemContrast` | `ComputedRef<'normal' \| 'high'>` | Contraste systeme |
| `systemMotion` | `ComputedRef<'normal' \| 'reduce'>` | Mouvement systeme |

### Actions

| Methode | Description |
|---------|-------------|
| `setTheme(name)` | Definir le theme visuel |
| `setThemeMode(mode)` | Definir le mode luminosite |
| `setContrast(contrast)` | Definir le mode de contraste |
| `setMotion(motion)` | Definir le mode de mouvement |
| `toggleMode()` | Basculer entre clair et sombre |
| `cycleTheme()` | Cycler entre les themes disponibles |
| `clearConfig()` | Reinitialiser les preferences |

### Donnees

| Propriete | Type | Description |
|-----------|------|-------------|
| `availableThemes` | `ComputedRef<ThemeMetadata[]>` | Tous les themes disponibles |
| `systemThemes` | `ComputedRef<ThemeMetadata[]>` | Themes systeme |
| `colorThemes` | `ComputedRef<ThemeMetadata[]>` | Themes de couleur |
