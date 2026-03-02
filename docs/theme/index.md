# Système de Thèmes

Le Design System propose un système de thèmes complet et performant avec support du mode sombre, du contraste élevé et de la réduction des animations.

## Vue d'ensemble

### Thèmes disponibles

Le système propose **5 thèmes** organisés en deux catégories :

#### Thèmes système
- **Light** - Thème clair classique, idéal pour une utilisation en journée
- **Dark** - Thème sombre optimisé pour les environnements à faible luminosité

#### Thèmes colorés
- **Ocean** - Palette maritime avec bleu océan et accents corail
- **Forest** - Inspiration naturelle avec verts forêt et orange automne
- **Sunset** - Ambiance chaleureuse avec rose, violet et orange

::: tip Mode Auto
Le mode `auto` détecte automatiquement les préférences système de l'utilisateur (`prefers-color-scheme`) et applique le thème correspondant.
:::

## Installation et Configuration

### Configuration du build

Pour optimiser la taille du bundle CSS, vous pouvez choisir quels thèmes inclure lors du build.

#### Configuration par défaut (recommandée)

```typescript
// theme.config.ts
export const themeConfig = {
  themes: ['light', 'dark'], // Seulement les thèmes essentiels
  defaultTheme: 'auto',
  prefix: 'su',
  highContrast: true,
  reducedMotion: true,
  storageKey: 'su-theme-config',
};
```

**Taille du bundle** : ~8-10 KB CSS

#### Tous les thèmes

```typescript
// theme.config.ts
export const themeConfig = {
  themes: ['light', 'dark', 'ocean', 'forest', 'sunset'],
  defaultTheme: 'auto',
};
```

**Taille du bundle** : ~25-30 KB CSS

#### Configuration personnalisée

```typescript
// theme.config.ts
export const themeConfig = {
  themes: ['light', 'dark', 'ocean'], // Seulement les thèmes dont vous avez besoin
  defaultTheme: 'light',
  storageKey: 'my-company-theme',
};
```

### Chargement dans le SCSS

```scss
// main.scss
@use './core/theme-loader' as loader;

// Option 1 : Thèmes spécifiques
@include loader.load-themes('light', 'dark');

// Option 2 : Tous les thèmes
@include loader.load-all-themes();

// Option 3 : Sélection personnalisée
@include loader.load-themes('light', 'dark', 'ocean');
```

## Utilisation

### Composable `useTheme`

Le composable `useTheme` est le point d'entrée principal pour gérer les thèmes.

```vue
<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

const { 
  themeName,           // Thème sélectionné ('auto' | 'light' | 'dark' | 'ocean' | 'forest' | 'sunset')
  effectiveTheme,      // Thème effectif appliqué
  setTheme,            // Changer de thème
  toggleTheme,         // Basculer light/dark
  availableThemes,     // Liste des thèmes disponibles
  isDarkMode           // Booléen pour savoir si on est en mode sombre
} = useTheme();
</script>
```

### Options du composable

```typescript
useTheme({
  // Surcharger les thèmes disponibles
  availableThemes: ['light', 'dark', 'ocean'],
  
  // Thème par défaut
  defaultTheme: 'auto',
  
  // Clé localStorage personnalisée
  storageKey: 'my-app-theme',
  
  // Désactiver la persistance
  persist: false
});
```

### Changer de thème

#### Méthode directe

```vue
<template>
  <button @click="setTheme('dark')">Mode sombre</button>
  <button @click="setTheme('ocean')">Thème Océan</button>
  <button @click="setTheme('auto')">Automatique</button>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

const { setTheme } = useTheme();
</script>
```

#### Toggle simple

```vue
<template>
  <button @click="toggleTheme">
    {{ isDarkMode ? '☀️ Clair' : '🌙 Sombre' }}
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

const { toggleTheme, isDarkMode } = useTheme();
</script>
```

#### Cycle entre thèmes

```vue
<template>
  <button @click="cycleTheme">
    Thème suivant : {{ currentThemeMetadata.name }}
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

const { cycleTheme, currentThemeMetadata } = useTheme();
</script>
```

## Composants

### ThemeSelector

Composant complet pour la sélection de thème avec interface visuelle.

```vue
<template>
  <ThemeSelector />
</template>

<script setup lang="ts">
import ThemeSelector from '@/components/ThemeSelector.vue';
</script>
```

**Fonctionnalités** :
- Prévisualisation visuelle de chaque thème
- Sélection du contraste (normal / élevé)
- Configuration des animations (normales / réduites)
- Affichage des préférences système détectées
- Bouton de réinitialisation

### ThemeToggle

Bouton compact pour basculer rapidement entre les thèmes.

```vue
<template>
  <ThemeToggle />
</template>

<script setup lang="ts">
import ThemeToggle from '@/components/ThemeToggle.vue';
</script>
```

**Fonctionnalités** :
- Icône dynamique selon le thème actif
- Label du thème (masqué sur mobile)
- Animation de transition
- Cycle entre tous les thèmes disponibles

## Accessibilité

### Contraste élevé

Le système supporte automatiquement le mode contraste élevé, essentiel pour l'accessibilité.

#### Détection automatique

```vue
<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

const { effectiveContrast, systemContrast } = useTheme();
// effectiveContrast: 'normal' | 'high'
// systemContrast: préférence système détectée
</script>
```

#### Configuration manuelle

```vue
<template>
  <select :value="contrastMode" @change="setContrast($event.target.value)">
    <option value="auto">Automatique</option>
    <option value="normal">Normal</option>
    <option value="high">Élevé</option>
  </select>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

const { contrastMode, setContrast } = useTheme();
</script>
```

#### Comportement en mode contraste élevé

- Couleurs pures (noir pur / blanc pur)
- Bordures renforcées
- Suppression des effets de transparence
- Contraste minimum de 7:1 (WCAG AAA)

### Réduction des animations

Respect de `prefers-reduced-motion` pour les utilisateurs sensibles aux mouvements.

```vue
<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

const { motionMode, setMotion } = useTheme();
</script>

<template>
  <select :value="motionMode" @change="setMotion($event.target.value)">
    <option value="auto">Automatique</option>
    <option value="normal">Activées</option>
    <option value="reduce">Réduites</option>
  </select>
</template>
```

**Effet** :
- Toutes les transitions deviennent instantanées (`0ms`)
- Les animations sont désactivées
- Les transformations scale sont neutralisées

## Utilisation dans les composants

### Accéder aux tokens de couleur

Utilisez les CSS variables générées automatiquement :

```vue
<style scoped lang="scss">
.my-component {
  // Texte
  color: var(--su-text-primary);
  
  // Background
  background-color: var(--su-bg-surface);
  
  // Bordure
  border: 1px solid var(--su-border-default);
  
  // Couleur primaire
  background-color: var(--su-primary-default);
  
  // États
  &--success {
    color: var(--su-state-success);
    background-color: var(--su-state-success-bg);
  }
  
  &:hover {
    background-color: var(--su-bg-hover);
  }
  
  &:focus-visible {
    border-color: var(--su-border-focus);
  }
}
</style>
```

### Mixins utilitaires

```vue
<style scoped lang="scss">
@use '@/styles/core/mixins' as *;

.my-button {
  // Transitions automatiques avec support reduced-motion
  @include transition(background-color, transform);
  
  // Focus ring accessible
  &:focus-visible {
    @include focus-ring;
  }
  
  // États interactifs complets
  @include interactive-states;
  
  // Surface surélevée
  @include surface($elevated: true);
}
</style>
```

## Tokens disponibles

### Texte

| Token | Description |
|-------|-------------|
| `--su-text-primary` | Texte principal (contraste maximal) |
| `--su-text-secondary` | Texte secondaire |
| `--su-text-tertiary` | Texte tertiaire (moins important) |
| `--su-text-disabled` | Texte désactivé |
| `--su-text-inverse` | Texte sur fond sombre |

### Liens

| Token | Description |
|-------|-------------|
| `--su-link-default` | Couleur par défaut des liens |
| `--su-link-hover` | Couleur au survol |
| `--su-link-visited` | Liens visités |
| `--su-link-muted` | Liens secondaires |

### Backgrounds

| Token | Description |
|-------|-------------|
| `--su-bg-canvas` | Fond global de l'application |
| `--su-bg-surface` | Fond des cartes, modales |
| `--su-bg-surface-elevated` | Surface surélevée (ombres) |
| `--su-bg-hover` | Fond au survol |
| `--su-bg-active` | Fond en état actif |
| `--su-bg-selected` | Fond sélectionné |
| `--su-bg-disabled` | Fond désactivé |

### Bordures

| Token | Description |
|-------|-------------|
| `--su-border-default` | Bordure par défaut |
| `--su-border-subtle` | Bordure subtile |
| `--su-border-strong` | Bordure renforcée |
| `--su-border-focus` | Bordure de focus (accessibilité) |
| `--su-border-disabled` | Bordure désactivée |

### États

| Token | Description |
|-------|-------------|
| `--su-state-success` | Couleur de succès |
| `--su-state-success-bg` | Fond de succès |
| `--su-state-warning` | Couleur d'avertissement |
| `--su-state-warning-bg` | Fond d'avertissement |
| `--su-state-error` | Couleur d'erreur |
| `--su-state-error-bg` | Fond d'erreur |
| `--su-state-info` | Couleur d'information |
| `--su-state-info-bg` | Fond d'information |

### Actions primaires

| Token | Description |
|-------|-------------|
| `--su-primary-default` | Couleur primaire |
| `--su-primary-hover` | Primaire au survol |
| `--su-primary-active` | Primaire en état actif |
| `--su-primary-disabled` | Primaire désactivé |
| `--su-primary-text` | Texte sur primaire |

### Actions secondaires

| Token | Description |
|-------|-------------|
| `--su-secondary-default` | Couleur secondaire |
| `--su-secondary-hover` | Secondaire au survol |
| `--su-secondary-active` | Secondaire en état actif |
| `--su-secondary-disabled` | Secondaire désactivé |
| `--su-secondary-text` | Texte sur secondaire |

## Créer un thème personnalisé

### 1. Créer la structure

```
styles/
└── themes/
    └── custom/
        ├── _tokens.scss
        └── index.scss
```

### 2. Définir les tokens

```scss
// themes/custom/_tokens.scss
@use '../../foundations/colors' as *;

$theme-custom: (
  'text-primary': #1a202c,
  'text-secondary': #2d3748,
  'text-tertiary': #4a5568,
  
  'bg-canvas': #f7fafc,
  'bg-surface': #ffffff,
  
  'border-default': #cbd5e0,
  'border-focus': #4299e1,
  
  'primary-default': #4299e1,
  'primary-hover': #3182ce,
  'primary-text': #ffffff,
  
  // ... autres tokens
);
```

### 3. Enregistrer le thème

```scss
// themes/custom/index.scss
@use '../_registry' as registry;
@use './_tokens' as *;

@include registry.register-theme('custom', $theme-custom);

[data-theme='custom'] {
  @include registry.generate-theme-vars($theme-custom);
}
```

### 4. Charger le thème

```scss
// main.scss
@include loader.load-themes('light', 'dark', 'custom');
```

### 5. Ajouter les métadonnées

```typescript
// composables/useTheme.ts
const ALL_THEMES: ThemeMetadata[] = [
  // ... autres thèmes
  {
    id: 'custom',
    name: 'Personnalisé',
    description: 'Mon thème custom',
    category: 'color',
    preview: { 
      primary: '#4299e1', 
      background: '#f7fafc', 
      surface: '#ffffff' 
    },
    available: themeConfig.themes.includes('custom')
  }
];
```

## API Reference

### `useTheme(options?)`

#### Options

```typescript
interface UseThemeOptions {
  availableThemes?: ThemeName[];
  defaultTheme?: ThemeName;
  storageKey?: string;
  persist?: boolean;
}
```

#### Retour

```typescript
{
  // État réactif
  themeName: Ref<ThemeName>;
  contrastMode: Ref<ContrastMode>;
  motionMode: Ref<MotionMode>;
  
  // Computed
  effectiveTheme: ComputedRef<Exclude<ThemeName, 'auto'>>;
  effectiveContrast: ComputedRef<'normal' | 'high'>;
  effectiveMotion: ComputedRef<'normal' | 'reduce'>;
  systemTheme: ComputedRef<'light' | 'dark'>;
  systemContrast: ComputedRef<'normal' | 'high'>;
  systemMotion: ComputedRef<'normal' | 'reduce'>;
  currentThemeMetadata: ComputedRef<ThemeMetadata>;
  isDarkMode: ComputedRef<boolean>;
  
  // Données
  availableThemes: ComputedRef<ThemeMetadata[]>;
  systemThemes: ComputedRef<ThemeMetadata[]>;
  colorThemes: ComputedRef<ThemeMetadata[]>;
  
  // Actions
  setTheme: (theme: ThemeName) => void;
  setContrast: (contrast: ContrastMode) => void;
  setMotion: (motion: MotionMode) => void;
  toggleTheme: () => void;
  cycleTheme: () => void;
  clearConfig: () => void;
}
```

## Exemples pratiques

### Dashboard avec sélecteur de thème

```vue
<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1>Mon Dashboard</h1>
      <ThemeToggle />
    </header>
    
    <aside class="dashboard-sidebar">
      <ThemeSelector />
    </aside>
    
    <main class="dashboard-content">
      <!-- Contenu -->
    </main>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';
import ThemeToggle from '@/components/ThemeToggle.vue';
import ThemeSelector from '@/components/ThemeSelector.vue';

useTheme();
</script>

<style scoped lang="scss">
.dashboard {
  min-height: 100vh;
  background-color: var(--su-bg-canvas);
  color: var(--su-text-primary);
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  padding: var(--su-spacing-4);
  background-color: var(--su-bg-surface);
  border-bottom: 1px solid var(--su-border-default);
}
</style>
```

### Préférence utilisateur persistante

```vue
<script setup lang="ts">
import { watch } from 'vue';
import { useTheme } from '@/composables/useTheme';

const { themeName, effectiveTheme } = useTheme({
  defaultTheme: 'auto',
  storageKey: 'user-preferences-theme',
  persist: true
});

// Tracking analytique du changement de thème
watch(effectiveTheme, (newTheme) => {
  console.log('Theme changed to:', newTheme);
  // analytics.track('theme_changed', { theme: newTheme });
});
</script>
```

### Thème forcé pour une section

```vue
<template>
  <!-- Force le thème dark pour cette section -->
  <div data-theme="dark" class="promo-section">
    <h2>Section avec thème forcé</h2>
    <p>Cette section reste sombre même si l'app est en mode clair</p>
  </div>
</template>

<style scoped lang="scss">
.promo-section {
  padding: var(--su-spacing-8);
  background-color: var(--su-bg-canvas);
  color: var(--su-text-primary);
}
</style>
```

## Performances

### Optimisations intégrées

- **CSS Variables** : Changement de thème instantané sans rechargement
- **Lazy loading** : Seuls les thèmes configurés sont inclus dans le bundle
- **Tree-shaking** : Thèmes non importés = 0 bytes
- **Media queries** : Détection native des préférences système
- **localStorage** : Persistance sans overhead réseau

### Comparaison de taille

| Configuration | Taille CSS | Thèmes inclus |
|--------------|------------|---------------|
| Minimal | ~8 KB | Light + Dark |
| Standard | ~15 KB | Light + Dark + 1 coloré |
| Complet | ~30 KB | Tous les thèmes |

### Recommandations

::: tip Applications corporate
Utilisez uniquement `light` et `dark` pour minimiser la taille du bundle.
:::

::: tip Applications créatives
Incluez tous les thèmes pour offrir une expérience personnalisée riche.
:::

::: tip Sites marketing
Choisissez 1-2 thèmes colorés alignés avec votre identité de marque.
:::

## Dépannage

### Le thème ne s'applique pas

Vérifiez que :
1. Le thème est bien inclus dans `theme.config.ts`
2. Le thème est chargé dans `main.scss`
3. `useTheme()` est appelé dans `App.vue` ou un parent

### Les couleurs ne changent pas

Assurez-vous d'utiliser les CSS variables :
```scss
// ❌ Mauvais
color: #111827;

// ✅ Bon
color: var(--su-text-primary);
```

### Thème non disponible en production

Vérifiez que le thème est bien dans la liste `themes` de `theme.config.ts` et qu'il est importé dans le loader.

### Préférences non sauvegardées

Vérifiez que `persist: true` est configuré et que localStorage est accessible (pas en navigation privée).

## Ressources

- [Guide des couleurs](./colors.md)
- [Tokens sémantiques](./tokens.md)
- [Accessibilité](./accessibility.md)
- [Exemples complets](./examples.md)