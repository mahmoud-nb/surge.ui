# Semantic Tokens

Semantic tokens are the heart of the design system. They transform raw colors into meaningful concepts, enabling perfect cohesion and simplified maintenance.

## What is a Semantic Token?

A semantic token assigns **contextual meaning** to a technical value.

### Example

```scss
// ❌ Technical value (raw color)
color: #111827;

// ✅ Semantic token (clear intention)
color: var(--su-text-primary);
```

**Benefits**:
- 🎯 **Clear intention**: "primary text" vs "gray 900"
- 🔄 **Adaptability**: Changes automatically with theme
- 🛠️ **Maintenance**: One place to modify
- ♿ **Accessibility**: Built-in contrast guarantees

## Token Architecture

```
Foundations (Raw Palettes)
    ↓
Semantic Tokens (Meaning)
    ↓
CSS Variables (Application)
    ↓
Components (Usage)
```

## Token Categories

### 1. Text

Tokens for all text content, with WCAG contrast guaranteed.

#### `--su-text-primary`

Primary text, maximum contrast (16.8:1 in light mode).

```vue
<style scoped lang="scss">
.heading {
  color: var(--su-text-primary);
}
</style>
```

**Usage**: Headings, main text, important content.

#### `--su-text-secondary`

Secondary text, good contrast (9.3:1 in light mode).

```vue
<style scoped lang="scss">
.description {
  color: var(--su-text-secondary);
}
</style>
```

**Usage**: Descriptions, subtitles, metadata.

#### `--su-text-tertiary`

Tertiary text, minimum AA contrast (4.7:1 in light mode).

```vue
<style scoped lang="scss">
.caption {
  color: var(--su-text-tertiary);
}
</style>
```

**Usage**: Labels, timestamps, auxiliary information.

#### `--su-text-disabled`

Disabled text, visual indication of unavailability.

```vue
<style scoped lang="scss">
.input:disabled {
  color: var(--su-text-disabled);
}
</style>
```

**Usage**: Disabled fields, unavailable actions.

#### `--su-text-inverse`

Text on dark background (or inverted according to theme).

```vue
<style scoped lang="scss">
.dark-banner {
  background-color: var(--su-primary-default);
  color: var(--su-text-inverse);
}
</style>
```

**Usage**: Text on primary buttons, colored banners.

### 2. Links

Specific tokens for hyperlinks.

#### `--su-link-default`

Default link color.

```vue
<style scoped lang="scss">
a {
  color: var(--su-link-default);
  text-decoration: underline;
}
</style>
```

#### `--su-link-hover`

Hover color.

```vue
<style scoped lang="scss">
a:hover {
  color: var(--su-link-hover);
}
</style>
```

#### `--su-link-visited`

Visited links (improves navigation).

```vue
<style scoped lang="scss">
a:visited {
  color: var(--su-link-visited);
}
</style>
```

#### `--su-link-muted`

Secondary, less prominent links.

```vue
<style scoped lang="scss">
.footer-link {
  color: var(--su-link-muted);
}
</style>
```

### 3. Backgrounds

Tokens for all backgrounds.

#### `--su-bg-canvas`

Global app background.

```vue
<style scoped lang="scss">
body {
  background-color: var(--su-bg-canvas);
}
</style>
```

**Usage**: Main page background.

#### `--su-bg-surface`

Surface for cards, modals, panels.

```vue
<style scoped lang="scss">
.card {
  background-color: var(--su-bg-surface);
}
</style>
```

**Usage**: Cards, modals, dropdown menus.

#### `--su-bg-surface-elevated`

Elevated surface (with shadow).

```vue
<style scoped lang="scss">
.modal {
  background-color: var(--su-bg-surface-elevated);
  box-shadow: var(--su-shadow-lg);
}
</style>
```

**Usage**: Modals, tooltips, floating elements.

#### `--su-bg-overlay`

Semi-transparent overlay for backdrops.

```vue
<style scoped lang="scss">
.modal-backdrop {
  background-color: var(--su-bg-overlay);
}
</style>
```

**Usage**: Modal backgrounds, full-screen menus.

#### `--su-bg-hover`

Background on hover of interactive elements.

```vue
<style scoped lang="scss">
.list-item:hover {
  background-color: var(--su-bg-hover);
}
</style>
```

**Usage**: List items, secondary buttons.

#### `--su-bg-active`

Background in active/pressed state.

```vue
<style scoped lang="scss">
.list-item:active {
  background-color: var(--su-bg-active);
}
</style>
```

**Usage**: Clicked state, pressed buttons.

#### `--su-bg-selected`

Background for selected elements.

```vue
<style scoped lang="scss">
.tab--active {
  background-color: var(--su-bg-selected);
}
</style>
```

**Usage**: Active tabs, selected items.

#### `--su-bg-disabled`

Disabled background.

```vue
<style scoped lang="scss">
.button:disabled {
  background-color: var(--su-bg-disabled);
}
</style>
```

**Usage**: Disabled buttons, disabled fields.

### 4. Borders

Tokens for all borders.

#### `--su-border-default`

Standard border.

```vue
<style scoped lang="scss">
.card {
  border: 1px solid var(--su-border-default);
}
</style>
```

**Usage**: Cards, separators, outlines.

#### `--su-border-subtle`

Very subtle border.

```vue
<style scoped lang="scss">
.divider {
  border-bottom: 1px solid var(--su-border-subtle);
}
</style>
```

**Usage**: Light separators, grid lines.

#### `--su-border-strong`

Reinforced border.

```vue
<style scoped lang="scss">
.card:hover {
  border-color: var(--su-border-strong);
}
</style>
```

**Usage**: Hover states, highlighted elements.

#### `--su-border-focus`

Focus border (accessibility).

```vue
<style scoped lang="scss">
.input:focus {
  border-color: var(--su-border-focus);
  outline: 2px solid var(--su-border-focus);
}
</style>
```

**Usage**: Focus visible, keyboard navigation.

#### `--su-border-disabled`

Disabled border.

```vue
<style scoped lang="scss">
.input:disabled {
  border-color: var(--su-border-disabled);
}
</style>
```

**Usage**: Disabled fields.

### 5. States

Tokens for state messages and feedbacks.

#### Success

```vue
<style scoped lang="scss">
.alert-success {
  color: var(--su-state-success);
  background-color: var(--su-state-success-bg);
}
</style>
```

**Usage**: Validation, successful operation, active badges.

#### Warning

```vue
<style scoped lang="scss">
.alert-warning {
  color: var(--su-state-warning);
  background-color: var(--su-state-warning-bg);
}
</style>
```

**Usage**: Warnings, actions requiring attention.

#### Error

```vue
<style scoped lang="scss">
.alert-error {
  color: var(--su-state-error);
  background-color: var(--su-state-error-bg);
}
</style>
```

**Usage**: Errors, failures, destructive actions.

#### Info

```vue
<style scoped lang="scss">
.alert-info {
  color: var(--su-state-info);
  background-color: var(--su-state-info-bg);
}
</style>
```

**Usage**: Neutral information, contextual help.

### 6. Primary Actions

Tokens for primary buttons and main actions.

#### `--su-primary-default`

Default state of primary button.

```vue
<style scoped lang="scss">
.button-primary {
  background-color: var(--su-primary-default);
  color: var(--su-primary-text);
}
</style>
```

#### `--su-primary-hover`

Hover state.

```vue
<style scoped lang="scss">
.button-primary:hover {
  background-color: var(--su-primary-hover);
}
</style>
```

#### `--su-primary-active`

Active/pressed state.

```vue
<style scoped lang="scss">
.button-primary:active {
  background-color: var(--su-primary-active);
}
</style>
```

#### `--su-primary-disabled`

Disabled state.

```vue
<style scoped lang="scss">
.button-primary:disabled {
  background-color: var(--su-primary-disabled);
}
</style>
```

#### `--su-primary-text`

Text on primary button.

```vue
<style scoped lang="scss">
.button-primary {
  color: var(--su-primary-text);
}
</style>
```

### 7. Secondary Actions

Tokens for secondary buttons.

```vue
<style scoped lang="scss">
.button-secondary {
  background-color: var(--su-secondary-default);
  color: var(--su-secondary-text);
  
  &:hover {
    background-color: var(--su-secondary-hover);
  }
  
  &:active {
    background-color: var(--su-secondary-active);
  }
  
  &:disabled {
    background-color: var(--su-secondary-disabled);
  }
}
</style>
```

All secondary tokens follow the same pattern as primary tokens.

### 8. Shadows

Token for shadow color (adapts to theme).

```vue
<style scoped lang="scss">
.card {
  box-shadow: 0 4px 6px var(--su-shadow-color);
}
</style>
```

## Static Tokens

These tokens don't change based on theme.

### Typography

```scss
.text {
  font-family: var(--su-font-family-base);
  font-size: var(--su-font-size-base);
  line-height: var(--su-line-height-normal);
}
```

**Available**:
- `--su-font-family-base`: Main font
- `--su-font-family-mono`: Monospace font
- `--su-font-size-xs` to `--su-font-size-3xl`: Size scale
- `--su-line-height-tight|normal|relaxed`: Line heights

### Spacing

```scss
.component {
  padding: var(--su-spacing-4);
  margin-bottom: var(--su-spacing-6);
  gap: var(--su-spacing-2);
}
```

**Available**:
- `--su-spacing-1`: 0.25rem (4px)
- `--su-spacing-2`: 0.5rem (8px)
- `--su-spacing-3`: 0.75rem (12px)
- `--su-spacing-4`: 1rem (16px)
- `--su-spacing-6`: 1.5rem (24px)
- `--su-spacing-8`: 2rem (32px)
- `--su-spacing-12`: 3rem (48px)

### Border Radius

```scss
.card {
  border-radius: var(--su-radius-lg);
}

.button {
  border-radius: var(--su-radius-md);
}

.avatar {
  border-radius: var(--su-radius-full);
}
```

**Available**:
- `--su-radius-sm`: 0.25rem (4px)
- `--su-radius-md`: 0.375rem (6px)
- `--su-radius-lg`: 0.5rem (8px)
- `--su-radius-xl`: 0.75rem (12px)
- `--su-radius-full`: 9999px (circle)

### Shadows

```scss
.card {
  box-shadow: var(--su-shadow-sm);
}

.modal {
  box-shadow: var(--su-shadow-lg);
}
```

**Available**:
- `--su-shadow-xs`: Very light shadow
- `--su-shadow-sm`: Light shadow
- `--su-shadow-md`: Medium shadow
- `--su-shadow-lg`: Strong shadow

### Animations

```scss
.button {
  transition-duration: var(--su-duration-normal);
  transition-timing-function: var(--su-ease-in-out);
}
```

**Available**:
- `--su-duration-fast`: 150ms (or 0ms if reduced-motion)
- `--su-duration-normal`: 200ms (or 0ms if reduced-motion)
- `--su-duration-slow`: 300ms (or 0ms if reduced-motion)
- `--su-ease-in-out`: cubic-bezier(0.4, 0, 0.2, 1)
- `--su-animation-scale`: 1 (or 0 if reduced-motion)

### Focus

```scss
.input:focus {
  outline: var(--su-focus-ring-width) solid var(--su-border-focus);
  outline-offset: var(--su-focus-ring-offset);
}
```

**Available**:
- `--su-focus-ring-width`: 2px
- `--su-focus-ring-offset`: 2px

## Usage Examples

### Complete Card

```vue
<template>
  <div class="card">
    <h3 class="card__title">Card Title</h3>
    <p class="card__description">Secondary description</p>
    <button class="card__action">Action</button>
  </div>
</template>

<style scoped lang="scss">
.card {
  background-color: var(--su-bg-surface);
  border: 1px solid var(--su-border-default);
  border-radius: var(--su-radius-lg);
  padding: var(--su-spacing-6);
  box-shadow: var(--su-shadow-sm);
  
  &:hover {
    border-color: var(--su-border-strong);
  }
}

.card__title {
  color: var(--su-text-primary);
  font-size: var(--su-font-size-xl);
  margin: 0 0 var(--su-spacing-2);
}

.card__description {
  color: var(--su-text-secondary);
  font-size: var(--su-font-size-base);
  margin: 0 0 var(--su-spacing-4);
}

.card__action {
  background-color: var(--su-primary-default);
  color: var(--su-primary-text);
  padding: var(--su-spacing-3) var(--su-spacing-4);
  border: none;
  border-radius: var(--su-radius-md);
  cursor: pointer;
  transition: background-color var(--su-duration-normal);
  
  &:hover {
    background-color: var(--su-primary-hover);
  }
  
  &:focus-visible {
    outline: var(--su-focus-ring-width) solid var(--su-border-focus);
    outline-offset: var(--su-focus-ring-offset);
  }
}
</style>
```

### Alerte avec état

```vue
<template>
  <div :class="['alert', `alert--${type}`]">
    <IconComponent :type="type" />
    <div class="alert__content">
      <strong class="alert__title">{{ title }}</strong>
      <p class="alert__message">{{ message }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.alert {
  display: flex;
  gap: var(--su-spacing-3);
  padding: var(--su-spacing-4);
  border-radius: var(--su-radius-md);
  border-left: 3px solid;
  
  &--success {
    color: var(--su-state-success);
    background-color: var(--su-state-success-bg);
    border-left-color: var(--su-state-success);
  }
  
  &--warning {
    color: var(--su-state-warning);
    background-color: var(--su-state-warning-bg);
    border-left-color: var(--su-state-warning);
  }
  
  &--error {
    color: var(--su-state-error);
    background-color: var(--su-state-error-bg);
    border-left-color: var(--su-state-error);
  }
  
  &--info {
    color: var(--su-state-info);
    background-color: var(--su-state-info-bg);
    border-left-color: var(--su-state-info);
  }
}

.alert__title {
  display: block;
  margin-bottom: var(--su-spacing-1);
  font-weight: 600;
}

.alert__message {
  margin: 0;
  opacity: 0.9;
}
</style>
```

### Formulaire

```vue
<template>
  <div class="form-field">
    <label class="form-field__label" :for="id">{{ label }}</label>
    <input 
      :id="id"
      class="form-field__input"
      :disabled="disabled"
      :class="{ 'form-field__input--error': hasError }"
    />
    <span v-if="hasError" class="form-field__error">{{ errorMessage }}</span>
  </div>
</template>

<style scoped lang="scss">
.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--su-spacing-2);
}

.form-field__label {
  color: var(--su-text-primary);
  font-size: var(--su-font-size-sm);
  font-weight: 500;
}

.form-field__input {
  padding: var(--su-spacing-3) var(--su-spacing-4);
  font-size: var(--su-font-size-base);
  color: var(--su-text-primary);
  background-color: var(--su-bg-surface);
  border: 2px solid var(--su-border-default);
  border-radius: var(--su-radius-md);
  transition: border-color var(--su-duration-normal);
  
  &:hover:not(:disabled) {
    border-color: var(--su-border-strong);
  }
  
  &:focus {
    border-color: var(--su-border-focus);
    outline: none;
  }
  
  &:disabled {
    background-color: var(--su-bg-disabled);
    color: var(--su-text-disabled);
    border-color: var(--su-border-disabled);
    cursor: not-allowed;
  }
  
  &--error {
    border-color: var(--su-state-error);
  }
}

.form-field__error {
  color: var(--su-state-error);
  font-size: var(--su-font-size-sm);
}
</style>
```

## Best Practices

### ✅ Do's

1. **Always use tokens** rather than raw values
2. **Choose the most semantic token** for the context
3. **Respect hierarchy**: primary > secondary > tertiary
4. **Test all themes** to verify consistency
5. **Use mixins** for repetitive patterns

### ❌ Don'ts

1. **Hard-coded colors**: `color: #111827` ❌
2. **Non-semantic tokens**: use `primary-600` instead of `primary-default` ❌
3. **Mix levels**: using raw colors with tokens ❌
4. **Ignore states**: not managing hover, focus, disabled ❌
5. **Forget accessibility**: insufficient contrast ❌

## Extending Tokens

### Add Custom Tokens

If you need application-specific tokens:

```scss
// In your custom theme
$theme-custom: (
  // Standard tokens
  'text-primary': #1a202c,
  'bg-surface': #ffffff,
  
  // Custom tokens
  'brand-highlight': #ff6b6b,
  'accent-secondary': #4ecdc4,
  'sidebar-bg': #f8f9fa,
);
```

Then use them:

```scss
.custom-component {
  background-color: var(--su-brand-highlight);
  border-left: 3px solid var(--su-accent-secondary);
}
```

## Inspection des tokens

### Via DevTools

```javascript
// Console navigateur
const root = document.documentElement;
const styles = getComputedStyle(root);

// Voir tous les tokens
for (let i = 0; i < styles.length; i++) {
  const prop = styles[i];
  if (prop.startsWith('--su-')) {
    console.log(prop, ':', styles.getPropertyValue(prop));
  }
}

// Voir un token spécifique
console.log('Primary:', styles.getPropertyValue('--su-primary-default'));
```

### Via Vue DevTools

```vue
<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const primary = getComputedStyle(document.documentElement)
    .getPropertyValue('--su-primary-default');
  console.log('Couleur primaire:', primary);
});
</script>
```

## Tableau récapitulatif complet

### Tokens de couleur

| Token | Mode Light | Mode Dark | Usage |
|-------|------------|-----------|-------|
| `--su-text-primary` | #111827 (16.8:1) | #f9fafb (17.1:1) | Texte principal |
| `--su-text-secondary` | #374151 (9.3:1) | #e5e7eb (12.6:1) | Texte secondaire |
| `--su-text-tertiary` | #6b7280 (4.7:1) | #9ca3af (4.5:1) | Texte tertiaire |
| `--su-text-disabled` | #9ca3af | #6b7280 | Texte désactivé |
| `--su-text-inverse` | #f9fafb | #111827 | Texte inversé |
| `--su-link-default` | #2563eb | #60a5fa | Lien par défaut |
| `--su-link-hover` | #1d4ed8 | #93c5fd | Lien survol |
| `--su-link-visited` | #1e40af | #a855f7 | Lien visité |
| `--su-link-muted` | #6b7280 | #6b7280 | Lien secondaire |
| `--su-bg-canvas` | #f9fafb | #030712 | Fond global |
| `--su-bg-surface` | #ffffff | #111827 | Surface/carte |
| `--su-bg-surface-elevated` | #ffffff | #1f2937 | Surface surélevée |
| `--su-bg-overlay` | rgba(0,0,0,0.5) | rgba(0,0,0,0.7) | Overlay modal |
| `--su-bg-hover` | #f3f4f6 | #1f2937 | Fond survol |
| `--su-bg-active` | #e5e7eb | #374151 | Fond actif |
| `--su-bg-selected` | #eff6ff | rgba(59,130,246,0.2) | Fond sélectionné |
| `--su-bg-disabled` | #f3f4f6 | #1f2937 | Fond désactivé |
| `--su-border-default` | #d1d5db | #4b5563 | Bordure standard |
| `--su-border-subtle` | #e5e7eb | #374151 | Bordure subtile |
| `--su-border-strong` | #9ca3af | #6b7280 | Bordure forte |
| `--su-border-focus` | #3b82f6 | #60a5fa | Bordure focus |
| `--su-border-disabled` | #e5e7eb | #374151 | Bordure désactivée |
| `--su-state-success` | #059669 | #4ade80 | État succès |
| `--su-state-success-bg` | #ecfdf5 | rgba(74,222,128,0.15) | Fond succès |
| `--su-state-warning` | #d97706 | #facc15 | État warning |
| `--su-state-warning-bg` | #fffbeb | rgba(250,204,21,0.15) | Fond warning |
| `--su-state-error` | #dc2626 | #f87171 | État erreur |
| `--su-state-error-bg` | #fef2f2 | rgba(248,113,113,0.15) | Fond erreur |
| `--su-state-info` | #0891b2 | #38bdf8 | État info |
| `--su-state-info-bg` | #ecfeff | rgba(56,189,248,0.15) | Fond info |
| `--su-primary-default` | #2563eb | #3b82f6 | Action primaire |
| `--su-primary-hover` | #1d4ed8 | #60a5fa | Primaire survol |
| `--su-primary-active` | #1e40af | #1e40af | Primaire actif |
| `--su-primary-disabled` | #93c5fd | #374151 | Primaire désactivé |
| `--su-primary-text` | #ffffff | #ffffff | Texte sur primaire |
| `--su-secondary-default` | #f3f4f6 | #1f2937 | Action secondaire |
| `--su-secondary-hover` | #e5e7eb | #374151 | Secondaire survol |
| `--su-secondary-active` | #d1d5db | #4b5563 | Secondaire actif |
| `--su-secondary-disabled` | #f9fafb | #111827 | Secondaire désactivé |
| `--su-secondary-text` | #111827 | #f9fafb | Texte sur secondaire |
| `--su-shadow-color` | rgba(0,0,0,0.1) | rgba(0,0,0,0.5) | Couleur ombres |

### Tokens statiques

| Token | Valeur | Description |
|-------|--------|-------------|
| **Typographie** |
| `--su-font-family-base` | System fonts | Police principale |
| `--su-font-family-mono` | Monospace | Police code |
| `--su-font-size-xs` | 0.75rem (12px) | Taille XS |
| `--su-font-size-sm` | 0.875rem (14px) | Taille Small |
| `--su-font-size-base` | 1rem (16px) | Taille base |
| `--su-font-size-lg` | 1.125rem (18px) | Taille Large |
| `--su-font-size-xl` | 1.25rem (20px) | Taille XL |
| `--su-font-size-2xl` | 1.5rem (24px) | Taille 2XL |
| `--su-font-size-3xl` | 1.875rem (30px) | Taille 3XL |
| `--su-line-height-tight` | 1.25 | Interligne serré |
| `--su-line-height-normal` | 1.5 | Interligne normal |
| `--su-line-height-relaxed` | 1.75 | Interligne aéré |
| **Espacement** |
| `--su-spacing-1` | 0.25rem (4px) | Espacement XS |
| `--su-spacing-2` | 0.5rem (8px) | Espacement S |
| `--su-spacing-3` | 0.75rem (12px) | Espacement M |
| `--su-spacing-4` | 1rem (16px) | Espacement base |
| `--su-spacing-6` | 1.5rem (24px) | Espacement L |
| `--su-spacing-8` | 2rem (32px) | Espacement XL |
| `--su-spacing-12` | 3rem (48px) | Espacement 2XL |
| **Border Radius** |
| `--su-radius-sm` | 0.25rem (4px) | Rayon small |
| `--su-radius-md` | 0.375rem (6px) | Rayon medium |
| `--su-radius-lg` | 0.5rem (8px) | Rayon large |
| `--su-radius-xl` | 0.75rem (12px) | Rayon XL |
| `--su-radius-full` | 9999px | Rayon complet (cercle) |
| **Ombres** |
| `--su-shadow-xs` | 0 1px 2px rgba(...) | Ombre très légère |
| `--su-shadow-sm` | 0 1px 3px rgba(...) | Ombre légère |
| `--su-shadow-md` | 0 4px 6px rgba(...) | Ombre moyenne |
| `--su-shadow-lg` | 0 10px 15px rgba(...) | Ombre forte |
| **Animations** |
| `--su-duration-fast` | 150ms (ou 0ms) | Durée rapide |
| `--su-duration-normal` | 200ms (ou 0ms) | Durée normale |
| `--su-duration-slow` | 300ms (ou 0ms) | Durée lente |
| `--su-ease-in-out` | cubic-bezier(...) | Easing par défaut |
| `--su-animation-scale` | 1 (ou 0) | Multiplicateur animation |
| **Focus** |
| `--su-focus-ring-width` | 2px | Épaisseur focus ring |
| `--su-focus-ring-offset` | 2px | Décalage focus ring |

## Patterns de composition

### Pattern 1 : Composant interactif complet

```vue
<style scoped lang="scss">
@use '@/styles/core/mixins' as *;

.interactive-component {
  // Base
  display: flex;
  align-items: center;
  gap: var(--su-spacing-3);
  padding: var(--su-spacing-4);
  
  // Apparence
  background-color: var(--su-bg-surface);
  border: 2px solid var(--su-border-default);
  border-radius: var(--su-radius-lg);
  color: var(--su-text-primary);
  
  // Typographie
  font-family: var(--su-font-family-base);
  font-size: var(--su-font-size-base);
  line-height: var(--su-line-height-normal);
  
  // Comportement
  cursor: pointer;
  @include transition(background-color, border-color, transform, box-shadow);
  
  // États
  &:hover:not(:disabled) {
    background-color: var(--su-bg-hover);
    border-color: var(--su-border-strong);
    box-shadow: var(--su-shadow-md);
    transform: translateY(calc(-2px * var(--su-animation-scale)));
  }
  
  &:active:not(:disabled) {
    background-color: var(--su-bg-active);
    transform: translateY(0);
  }
  
  &:focus-visible {
    @include focus-ring;
  }
  
  &:disabled {
    background-color: var(--su-bg-disabled);
    border-color: var(--su-border-disabled);
    color: var(--su-text-disabled);
    cursor: not-allowed;
    opacity: 0.6;
  }
}
</style>
```

### Pattern 2 : Système de notification

```vue
<style scoped lang="scss">
.notification {
  display: flex;
  align-items: flex-start;
  gap: var(--su-spacing-3);
  padding: var(--su-spacing-4);
  border-radius: var(--su-radius-md);
  border-left: 4px solid;
  box-shadow: var(--su-shadow-sm);
  
  // Variants basés sur les tokens d'état
  &--success {
    background-color: var(--su-state-success-bg);
    border-left-color: var(--su-state-success);
    
    .notification__icon {
      color: var(--su-state-success);
    }
    
    .notification__title {
      color: var(--su-state-success);
    }
  }
  
  &--warning {
    background-color: var(--su-state-warning-bg);
    border-left-color: var(--su-state-warning);
    
    .notification__icon {
      color: var(--su-state-warning);
    }
    
    .notification__title {
      color: var(--su-state-warning);
    }
  }
  
  &--error {
    background-color: var(--su-state-error-bg);
    border-left-color: var(--su-state-error);
    
    .notification__icon {
      color: var(--su-state-error);
    }
    
    .notification__title {
      color: var(--su-state-error);
    }
  }
  
  &--info {
    background-color: var(--su-state-info-bg);
    border-left-color: var(--su-state-info);
    
    .notification__icon {
      color: var(--su-state-info);
    }
    
    .notification__title {
      color: var(--su-state-info);
    }
  }
}

.notification__icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
}

.notification__content {
  flex: 1;
}

.notification__title {
  margin: 0 0 var(--su-spacing-1);
  font-size: var(--su-font-size-base);
  font-weight: 600;
}

.notification__message {
  margin: 0;
  font-size: var(--su-font-size-sm);
  color: var(--su-text-secondary);
}
</style>
```

### Pattern 3 : Hierarchie typographique

```vue
<style scoped lang="scss">
.content {
  color: var(--su-text-primary);
  font-family: var(--su-font-family-base);
  line-height: var(--su-line-height-normal);
  
  h1 {
    margin: 0 0 var(--su-spacing-4);
    font-size: var(--su-font-size-3xl);
    line-height: var(--su-line-height-tight);
    font-weight: 700;
  }
  
  h2 {
    margin: var(--su-spacing-8) 0 var(--su-spacing-3);
    font-size: var(--su-font-size-2xl);
    line-height: var(--su-line-height-tight);
    font-weight: 700;
  }
  
  h3 {
    margin: var(--su-spacing-6) 0 var(--su-spacing-2);
    font-size: var(--su-font-size-xl);
    line-height: var(--su-line-height-tight);
    font-weight: 600;
  }
  
  p {
    margin: 0 0 var(--su-spacing-4);
    font-size: var(--su-font-size-base);
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .lead {
    font-size: var(--su-font-size-lg);
    color: var(--su-text-secondary);
    line-height: var(--su-line-height-relaxed);
  }
  
  .caption {
    font-size: var(--su-font-size-sm);
    color: var(--su-text-tertiary);
  }
  
  a {
    color: var(--su-link-default);
    text-decoration: underline;
    @include transition(color);
    
    &:hover {
      color: var(--su-link-hover);
    }
    
    &:visited {
      color: var(--su-link-visited);
    }
  }
  
  code {
    padding: 2px 6px;
    font-family: var(--su-font-family-mono);
    font-size: var(--su-font-size-sm);
    background-color: var(--su-bg-canvas);
    border: 1px solid var(--su-border-default);
    border-radius: var(--su-radius-sm);
  }
}
</style>
```

## Migration depuis d'autres systèmes

### Depuis Tailwind CSS

```scss
// Tailwind → Design System

// Colors
.text-gray-900 → color: var(--su-text-primary)
.text-gray-600 → color: var(--su-text-secondary)
.text-gray-400 → color: var(--su-text-tertiary)
.bg-white → background-color: var(--su-bg-surface)
.bg-gray-50 → background-color: var(--su-bg-canvas)
.border-gray-300 → border-color: var(--su-border-default)

// Spacing
.p-4 → padding: var(--su-spacing-4)
.m-6 → margin: var(--su-spacing-6)
.gap-2 → gap: var(--su-spacing-2)

// Radius
.rounded → border-radius: var(--su-radius-sm)
.rounded-md → border-radius: var(--su-radius-md)
.rounded-lg → border-radius: var(--su-radius-lg)
.rounded-full → border-radius: var(--su-radius-full)

// Typography
.text-sm → font-size: var(--su-font-size-sm)
.text-base → font-size: var(--su-font-size-base)
.text-xl → font-size: var(--su-font-size-xl)
```

### Depuis Bootstrap

```scss
// Bootstrap → Design System

// Colors
.text-primary → color: var(--su-primary-default)
.text-secondary → color: var(--su-text-secondary)
.text-muted → color: var(--su-text-tertiary)
.bg-light → background-color: var(--su-bg-canvas)
.bg-white → background-color: var(--su-bg-surface)

// Components
.btn-primary → background-color: var(--su-primary-default)
.btn-secondary → background-color: var(--su-secondary-default)
.alert-success → utiliser tokens --su-state-success
.alert-danger → utiliser tokens --su-state-error

// Spacing
.p-3 → padding: var(--su-spacing-3)
.mb-4 → margin-bottom: var(--su-spacing-4)
```

## Ressources

- [Guide des couleurs](./colors.md)
- [Système de thèmes](./themes.md)
- [Accessibilité](./accessibility.md)
- [Exemples complets](./examples.md)
- [CSS Custom Properties (MDN)](https://developer.mozilla.org/fr/docs/Web/CSS/--*)