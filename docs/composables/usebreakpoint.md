# useBreakpoint

Composable pour la detection reactive des breakpoints. Utilise `window.matchMedia` pour une detection performante sans ecouter l'evenement `resize`. Compatible SSR.

## Utilisation basique

```vue
<script setup>
import { useBreakpoint } from '@surgeui/ds-vue'

const { current, isUp, isDown, isBetween, matches } = useBreakpoint()
</script>

<template>
  <div>
    <p>Breakpoint actif : {{ current }}</p>
    <p>Desktop : {{ isUp('lg') }}</p>
    <p>Mobile : {{ isDown('md') }}</p>
  </div>
</template>
```

## Breakpoints par defaut

| Breakpoint | Largeur min | Description |
|------------|-------------|-------------|
| `xs` | < 640px | Mobile portrait |
| `sm` | 640px | Mobile paysage |
| `md` | 768px | Tablette |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Grand ecran |
| `2xl` | 1536px | Tres grand ecran |

## Exemples

### Affichage conditionnel

```vue
<script setup>
import { useBreakpoint } from '@surgeui/ds-vue'

const { isUp, isDown } = useBreakpoint()
</script>

<template>
  <!-- Menu desktop -->
  <nav v-if="isUp('lg')">
    <a href="/">Accueil</a>
    <a href="/docs">Docs</a>
  </nav>

  <!-- Menu hamburger mobile -->
  <button v-if="isDown('lg')">
    Menu
  </button>
</template>
```

### Grille responsive

```vue
<script setup>
import { computed } from 'vue'
import { useBreakpoint } from '@surgeui/ds-vue'

const { current } = useBreakpoint()

const columns = computed(() => {
  switch (current.value) {
    case '2xl':
    case 'xl': return 4
    case 'lg': return 3
    case 'md': return 2
    default: return 1
  }
})
</script>
```

### Plage de breakpoints

```vue
<script setup>
import { useBreakpoint } from '@surgeui/ds-vue'

const { isBetween } = useBreakpoint()

// true si >= 640px et < 1024px (tablette)
const isTablet = isBetween('sm', 'lg')
</script>
```

### Breakpoints personnalises

```vue
<script setup>
import { useBreakpoint } from '@surgeui/ds-vue'

const { current, matches } = useBreakpoint({
  breakpoints: {
    sm: 480,
    md: 768,
    lg: 1200,
    xl: 1440,
    '2xl': 1920,
  }
})
</script>
```

## API

### Options

| Option | Type | Defaut | Description |
|--------|------|--------|-------------|
| `breakpoints` | `BreakpointConfig` | Voir ci-dessus | Surcharge des seuils |

### Retour

| Propriete | Type | Description |
|-----------|------|-------------|
| `current` | `ComputedRef<BreakpointKey \| 'xs'>` | Breakpoint actif le plus large |
| `width` | `Readonly<Ref<number>>` | Largeur du viewport en pixels |
| `matches` | `Readonly<Ref<BreakpointMatches>>` | Objet reactif `{ sm: bool, md: bool, ... }` |
| `isUp(bp)` | `(bp: BreakpointKey) => boolean` | true si largeur >= breakpoint |
| `isDown(bp)` | `(bp: BreakpointKey) => boolean` | true si largeur < breakpoint |
| `isBetween(min, max)` | `(min, max) => boolean` | true si >= min et < max |
| `breakpoints` | `Readonly<Ref<BreakpointConfig>>` | Configuration utilisee |

### Types

```typescript
type BreakpointKey = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

interface BreakpointConfig {
  sm?: number
  md?: number
  lg?: number
  xl?: number
  '2xl'?: number
}

interface BreakpointMatches {
  sm: boolean
  md: boolean
  lg: boolean
  xl: boolean
  '2xl': boolean
}
```

## Performance

- Utilise `matchMedia` au lieu d'ecouter `resize` — pas de debounce necessaire
- Chaque breakpoint a son propre `MediaQueryList` listener
- `ResizeObserver` sur `documentElement` pour la largeur exacte
- Nettoyage automatique via `onUnmounted`
