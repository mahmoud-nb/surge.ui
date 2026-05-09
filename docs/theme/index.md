# Système de Thèmes

Le Design System propose un système de thèmes complet et performant avec support du mode sombre, du contraste élevé et de la réduction des animations.

## Vue d'ensemble

### Architecture thèmes × modes

Le système repose sur deux dimensions orthogonales :

| Dimension | Valeurs | Rôle |
|-----------|---------|------|
| **Thème** (`data-theme`) | `default` \| `ocean` \| `forest` \| `sunset` | Identité visuelle / palette de couleurs |
| **Mode** (`data-theme-mode`) | `light` \| `dark` \| `system` | Luminosité / contraste |

Chaque thème est disponible en mode clair **et** en mode sombre.

#### Thèmes disponibles

- **Default** - Palette neutre classique, adapté à tout contexte
- **Ocean** - Palette maritime avec bleu océan et accents corail
- **Forest** - Inspiration naturelle avec verts forêt et orange automne
- **Sunset** - Ambiance chaleureuse avec rose, violet et orange

#### Modes disponibles

- **light** - Mode clair (par défaut)
- **dark** - Mode sombre optimisé pour les environnements à faible luminosité
- **system** - Suit automatiquement la préférence système (`prefers-color-scheme`)

::: tip Comportement par défaut
Sans aucun attribut HTML, le thème `default` en mode `light` est appliqué via un fallback CSS sur `html:not([data-theme])`. Le mode `system` n'est **pas** activé par défaut — l'utilisateur doit le choisir explicitement.
:::

::: warning Noms dépréciés
Les noms de thème `light` et `dark` (anciens thèmes autonomes) sont **dépréciés**. Ils continuent de fonctionner en CSS et JS pour la rétrocompatibilité, mais émettent un avertissement console. Utilisez `default` + `themeMode` à la place.
:::

### Stratégie CSS — double attribut HTML

Le thème et le mode sont deux attributs HTML séparés sur `<html>` :

```html
<!-- Thème default en mode clair -->
<html data-theme="default" data-theme-mode="light">

<!-- Thème Ocean en mode sombre -->
<html data-theme="ocean" data-theme-mode="dark">

<!-- Thème Forest qui suit la préférence système -->
<html data-theme="forest" data-theme-mode="system">
```

La rétrocompatibilité est assurée : `[data-theme='light']` et `[data-theme='dark']` fonctionnent toujours en CSS (alias définis dans `default/index.scss`).

## Installation et Configuration

### Configuration du build

Pour optimiser la taille du bundle CSS, vous pouvez choisir quels thèmes inclure lors du build.

#### Configuration par défaut (recommandée)

```typescript
// theme.config.ts
export const themeConfig = {
  themes: ['default', 'ocean', 'forest', 'sunset'],
  defaultTheme: 'default',
  defaultThemeMode: 'light',
  prefix: 'su',
  highContrast: true,
  reducedMotion: true,
  storageKey: 'su-theme-config',
};
```

**Taille du bundle** : ~425 KB total (lib + styles)

#### Configuration minimale

```typescript
// theme.config.ts
export const themeConfig = {
  themes: ['default'],           // Seulement le thème par défaut
  defaultTheme: 'default',
  defaultThemeMode: 'light',
  storageKey: 'my-company-theme',
};
```

#### Configuration personnalisée

```typescript
// theme.config.ts
export const themeConfig = {
  themes: ['default', 'ocean'], // Seulement les thèmes dont vous avez besoin
  defaultTheme: 'default',
  defaultThemeMode: 'light',
  storageKey: 'my-company-theme',
};
```

### Chargement dans le SCSS

```scss
// main.scss
@use './core/theme-loader' as loader;

// Option 1 : Thèmes spécifiques
@include loader.load-themes('default', 'ocean');

// Option 2 : Tous les thèmes
@include loader.load-all-themes();
```

## Types TypeScript

```typescript
// Thème (identité visuelle)
type ThemeName = 'default' | 'ocean' | 'forest' | 'sunset'

// Mode (luminosité)
type ThemeMode = 'light' | 'dark' | 'system'

// Contraste et mouvement (inchangés)
type ContrastMode = 'normal' | 'high' | 'auto'
type MotionMode   = 'normal' | 'reduce' | 'auto'

// Dépréciés — rétrocompatibilité uniquement
type DeprecatedThemeName = 'light' | 'dark'
```

## Utilisation

### Composable `useTheme`

Le composable `useTheme` est le point d'entrée principal pour gérer les thèmes.

```vue
<script setup lang="ts">
import { useTheme } from '@surgeui/ds-vue';

const {
  // État réactif
  themeName,            // Ref<ThemeName> — identité visuelle active
  themeMode,            // Ref<ThemeMode> — 'light' | 'dark' | 'system'
  contrastMode,         // Ref<ContrastMode>
  motionMode,           // Ref<MotionMode>

  // Computed
  effectiveTheme,       // ComputedRef<ThemeName> — thème résolu (jamais 'system')
  effectiveThemeMode,   // ComputedRef<'light' | 'dark'> — mode résolu
  isDarkMode,           // ComputedRef<boolean>

  // Actions
  setTheme,             // (theme: ThemeName) => void
  setThemeMode,         // (mode: ThemeMode) => void
  toggleMode,           // () => void — bascule light ↔ dark
  cycleTheme,           // () => void — cycle entre les thèmes disponibles
  clearConfig,          // () => void — reset vers defaultTheme + defaultThemeMode
} = useTheme();
</script>
```

### Options du composable

```typescript
useTheme({
  // Surcharger les thèmes disponibles
  availableThemes: ['default', 'ocean'],

  // Thème par défaut
  defaultTheme: 'default',

  // Mode par défaut (NOUVEAU)
  defaultThemeMode: 'light',

  // Clé localStorage personnalisée
  storageKey: 'my-app-theme',

  // Désactiver la persistance
  persist: false
});
```

### Changer de thème

#### Changer l'identité visuelle

```vue
<template>
  <button @click="setTheme('ocean')">Thème Océan</button>
  <button @click="setTheme('forest')">Thème Forêt</button>
  <button @click="setTheme('default')">Thème par défaut</button>
</template>

<script setup lang="ts">
import { useTheme } from '@surgeui/ds-vue';

const { setTheme } = useTheme();
</script>
```

#### Changer le mode de luminosité

```vue
<template>
  <button @click="setThemeMode('dark')">Mode sombre</button>
  <button @click="setThemeMode('light')">Mode clair</button>
  <button @click="setThemeMode('system')">Suivre le système</button>
</template>

<script setup lang="ts">
import { useTheme } from '@surgeui/ds-vue';

const { setThemeMode } = useTheme();
</script>
```

#### Toggle mode clair/sombre

```vue
<template>
  <button @click="toggleMode">
    {{ isDarkMode ? '☀️ Clair' : '🌙 Sombre' }}
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '@surgeui/ds-vue';

const { toggleMode, isDarkMode } = useTheme();
</script>
```

#### Cycle entre thèmes

```vue
<template>
  <button @click="cycleTheme">
    Thème suivant : {{ effectiveTheme }}
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '@surgeui/ds-vue';

const { cycleTheme, effectiveTheme } = useTheme();
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
- Sélection du mode (clair / sombre / système)
- Sélection du contraste (normal / élevé)
- Configuration des animations (normales / réduites)
- Affichage des préférences système détectées
- Bouton de réinitialisation

### ThemeToggle

Bouton compact pour basculer rapidement entre les modes.

```vue
<template>
  <ThemeToggle />
</template>

<script setup lang="ts">
import ThemeToggle from '@/components/ThemeToggle.vue';
</script>
```

**Fonctionnalités** :
- Icône dynamique selon le mode actif
- Label du mode (masqué sur mobile)
- Animation de transition
- Cycle entre tous les thèmes disponibles

## Accessibilité

### Contraste élevé

Le système supporte automatiquement le mode contraste élevé, essentiel pour l'accessibilité.

#### Détection automatique

```vue
<script setup lang="ts">
import { useTheme } from '@surgeui/ds-vue';

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
import { useTheme } from '@surgeui/ds-vue';

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
import { useTheme } from '@surgeui/ds-vue';

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

  // Section inversée (fond sombre sur page claire, ou inverse)
  &--inverted {
    background-color: var(--su-bg-inverse);
    color: var(--su-text-on-inverse);
    border-color: var(--su-border-inverse);
  }

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

## Personnalisation avancée avec variables CSS Custom

Le système de thèmes supporte la personnalisation dynamique des couleurs via des **variables CSS custom**. Cela vous permet de surcharger les couleurs du thème actif sans créer un thème complet.

### Comment ça fonctionne

Le système de variables custom utilise un mécanisme de **fallback CSS** :

```scss
// Généré automatiquement pour chaque token
--su-primary-default: var(--su-custom-primary-default, #3b82f6);
```

**Flux** :
1. L'utilisateur définit `--su-custom-primary-default: #dc2626`
2. CSS résout `var(--su-custom-primary-default, ...)` → `#dc2626`
3. Tous les composants utilisant `--su-primary-default` reçoivent la nouvelle valeur
4. Si pas de custom défini, fallback sur la valeur du thème

### Composable `useCustomTheme`

Le composable `useCustomTheme` permet de gérer les variables CSS custom de manière réactive.

```vue
<script setup lang="ts">
import { useCustomTheme } from '@surgeui/ds-vue'

const {
  applyCustomTheme,    // Applique un thème custom entier
  setCustomVariable,   // Définit une variable individuelle
  getCustomTheme,      // Récupère le thème custom actuel
  resetCustomTheme,    // Réinitialise tous les customs
  mergeWithTheme,      // Fusionne avec un thème existant
  customTheme          // État réactif du thème custom
} = useCustomTheme()
</script>
```

### Exemples d'utilisation

#### 1. Appliquer un thème custom complet

```vue
<script setup lang="ts">
import { useCustomTheme } from '@surgeui/ds-vue'

const { applyCustomTheme } = useCustomTheme()

const applyBrandTheme = () => {
  applyCustomTheme({
    textPrimary: '#1f2937',
    bgSurface: '#ffffff',
    bgCanvas: '#f9fafb',
    primaryDefault: '#dc2626',
    primaryHover: '#b91c1c',
    primaryActive: '#991b1b',
    primaryText: '#ffffff',
    stateSuccess: '#059669',
    stateError: '#dc2626'
  })
}
</script>

<template>
  <button @click="applyBrandTheme">
    Appliquer thème marque
  </button>
</template>
```

#### 2. Modifier une couleur individuellement

```vue
<script setup lang="ts">
import { useCustomTheme } from '@surgeui/ds-vue'

const { setCustomVariable } = useCustomTheme()

// Simple changement de couleur
setCustomVariable('primaryDefault', '#3b82f6')

// Réactif avec input
const handleColorChange = (color: string) => {
  setCustomVariable('primaryDefault', color)
}
</script>

<template>
  <input
    type="color"
    @input="(e) => handleColorChange((e.target as HTMLInputElement).value)"
    placeholder="Sélectionner couleur primaire"
  >
</template>
```

#### 3. Combiner thème et mode avec couleurs de marque

```vue
<script setup lang="ts">
import { useTheme } from '@surgeui/ds-vue'
import { useCustomTheme } from '@surgeui/ds-vue'

const { setTheme, setThemeMode } = useTheme()
const { setCustomVariable } = useCustomTheme()

const applyDarkWithBrand = () => {
  // Changer vers thème default en mode sombre
  setTheme('default')
  setThemeMode('dark')

  // Surcharger avec couleurs de marque
  setCustomVariable('primaryDefault', '#db2777')
  setCustomVariable('primaryHover', '#be185d')
}
</script>

<template>
  <button @click="applyDarkWithBrand">
    Mode sombre + Marque
  </button>
</template>
```

### Variables CSS disponibles pour personnalisation

Vous pouvez personnaliser n'importe quel token de thème en utilisant le format `--su-custom-<token-name>` :

**Texte** :
- `--su-custom-text-primary`
- `--su-custom-text-secondary`
- `--su-custom-text-tertiary`
- `--su-custom-text-disabled`
- `--su-custom-text-inverse`

**Backgrounds** :
- `--su-custom-bg-canvas`
- `--su-custom-bg-surface`
- `--su-custom-bg-surface-elevated`
- `--su-custom-bg-hover`
- `--su-custom-bg-active`
- `--su-custom-bg-selected`
- `--su-custom-bg-disabled`
- `--su-custom-bg-inverse`
- `--su-custom-bg-inverse-subtle`

**Bordures** :
- `--su-custom-border-default`
- `--su-custom-border-subtle`
- `--su-custom-border-strong`
- `--su-custom-border-focus`
- `--su-custom-border-disabled`
- `--su-custom-border-inverse`

**Actions** :
- `--su-custom-primary-default`
- `--su-custom-primary-hover`
- `--su-custom-primary-active`
- `--su-custom-primary-disabled`
- `--su-custom-primary-text`
- `--su-custom-secondary-default`
- `--su-custom-secondary-hover`
- `--su-custom-secondary-active`
- `--su-custom-secondary-disabled`
- `--su-custom-secondary-text`

**États** :
- `--su-custom-state-success`
- `--su-custom-state-success-bg`
- `--su-custom-state-warning`
- `--su-custom-state-warning-bg`
- `--su-custom-state-error`
- `--su-custom-state-error-bg`
- `--su-custom-state-info`
- `--su-custom-state-info-bg`

### Avantages de cette approche

✅ **Dynamique** - Changement instantané sans rechargement
✅ **Flexible** - Personnaliser partiellement ou entièrement le thème
✅ **Performant** - Pas de SCSS recompilation, uniquement du CSS
✅ **Compatible** - Fonctionne avec tous les thèmes et tous les modes
✅ **Persistable** - Compatible avec localStorage pour la sauvegarde utilisateur

## Créer un thème personnalisé

### 1. Nouvelle structure de fichiers (light + dark séparés)

```
styles/themes/
├── _registry.scss
├── _schema.scss          ← Validation des tokens requis
├── default/
│   ├── _color.scss
│   ├── index.scss
│   └── tokens/
│       ├── light.scss
│       └── dark.scss
├── ocean/    (même structure)
├── forest/   (même structure)
├── sunset/   (même structure)
└── custom/   ← Votre thème
    ├── index.scss
    └── tokens/
        ├── light.scss
        └── dark.scss
```

### 2. Définir les tokens light

```scss
// themes/custom/tokens/light.scss
$theme-custom-light: (
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

### 3. Définir les tokens dark

```scss
// themes/custom/tokens/dark.scss
$theme-custom-dark: (
  'text-primary': #f7fafc,
  'text-secondary': #e2e8f0,
  'text-tertiary': #a0aec0,

  'bg-canvas': #1a202c,
  'bg-surface': #2d3748,

  'border-default': #4a5568,
  'border-focus': #63b3ed,

  'primary-default': #63b3ed,
  'primary-hover': #4299e1,
  'primary-text': #1a202c,

  // ... autres tokens
);
```

### 4. Enregistrer le thème avec les deux modes

```scss
// themes/custom/index.scss
@use '../_registry' as registry;
@use './tokens/light' as *;
@use './tokens/dark' as *;

[data-theme='custom'][data-theme-mode='light'] {
  @include registry.generate-theme-vars($theme-custom-light);
}

[data-theme='custom'][data-theme-mode='dark'] {
  @include registry.generate-theme-vars($theme-custom-dark);
}
```

### 5. Ajouter les métadonnées TypeScript

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
  defaultThemeMode?: ThemeMode;  // NOUVEAU
  storageKey?: string;
  persist?: boolean;
}
```

#### Retour

```typescript
{
  // État réactif
  themeName: Ref<ThemeName>;
  themeMode: Ref<ThemeMode>;             // NOUVEAU
  contrastMode: Ref<ContrastMode>;
  motionMode: Ref<MotionMode>;

  // Computed
  effectiveTheme: ComputedRef<ThemeName>;
  effectiveThemeMode: ComputedRef<'light' | 'dark'>;  // NOUVEAU
  effectiveContrast: ComputedRef<'normal' | 'high'>;
  effectiveMotion: ComputedRef<'normal' | 'reduce'>;
  systemContrast: ComputedRef<'normal' | 'high'>;
  systemMotion: ComputedRef<'normal' | 'reduce'>;
  isDarkMode: ComputedRef<boolean>;

  // Données
  availableThemes: ComputedRef<ThemeMetadata[]>;

  // Actions
  setTheme: (theme: ThemeName) => void;
  setThemeMode: (mode: ThemeMode) => void;   // NOUVEAU
  toggleMode: () => void;                    // NOUVEAU — remplace toggleTheme
  cycleTheme: () => void;
  setContrast: (contrast: ContrastMode) => void;
  setMotion: (motion: MotionMode) => void;
  clearConfig: () => void;
}
```

::: warning toggleTheme déprécié
`toggleTheme()` est conservé pour la rétrocompatibilité mais émet un avertissement console. Utilisez `toggleMode()` à la place.
:::

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
import { useTheme } from '@surgeui/ds-vue';
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
import { useTheme } from '@surgeui/ds-vue';

const { themeName, themeMode, effectiveThemeMode } = useTheme({
  defaultTheme: 'default',
  defaultThemeMode: 'system',
  storageKey: 'user-preferences-theme',
  persist: true
});

// Tracking analytique du changement de thème
watch(effectiveThemeMode, (newMode) => {
  console.log('Mode changed to:', newMode);
  // analytics.track('theme_mode_changed', { mode: newMode });
});
</script>
```

### Thème forcé pour une section

```vue
<template>
  <!-- Force le thème default en mode sombre pour cette section -->
  <div data-theme="default" data-theme-mode="dark" class="promo-section">
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

### Section inversée avec les tokens d'inversion

```vue
<template>
  <!-- Section qui contraste avec le contexte sans forcer un thème entier -->
  <div class="hero-section">
    <h1>Titre accrocheur</h1>
    <p>Description mise en avant</p>
  </div>
</template>

<style scoped lang="scss">
.hero-section {
  background-color: var(--su-bg-inverse);
  color: var(--su-text-on-inverse);
  border: 1px solid var(--su-border-inverse);

  // La surface secondaire sur fond inversé
  .hero-section__card {
    background-color: var(--su-surface-inverse);
  }
}
</style>
```

## Performances

### Optimisations intégrées

- **CSS Variables** : Changement de thème instantané sans rechargement
- **Double attribut** : Sélecteurs CSS ciblés par `[data-theme][data-theme-mode]`
- **Lazy loading** : Seuls les thèmes configurés sont inclus dans le bundle
- **Tree-shaking** : Thèmes non importés = 0 bytes
- **localStorage** : Persistance sans overhead réseau

### Comparaison de taille

| Configuration | Taille bundle total | Thèmes inclus |
|--------------|---------------------|---------------|
| Minimal | ~200 KB | Default uniquement |
| Standard | ~300 KB | Default + 1 thème coloré |
| Complet | ~425 KB | Tous les thèmes |

### Recommandations

::: tip Applications corporate
Utilisez uniquement `default` pour minimiser la taille du bundle.
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
4. Les attributs `data-theme` **et** `data-theme-mode` sont bien présents sur `<html>`

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

### Avertissement console sur `setTheme('dark')`

`setTheme('dark')` et `setTheme('light')` sont dépréciés. Remplacez par :
```typescript
// Avant (déprécié)
setTheme('dark')

// Après
setThemeMode('dark')
```

## Ressources

- [Guide des couleurs](./colors.md)
- [Tokens sémantiques](./tokens.md)
- [Accessibilité](./accessibility.md)
- [Exemples complets](./examples.md)
