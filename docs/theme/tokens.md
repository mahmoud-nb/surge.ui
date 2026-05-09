# Tokens sémantiques

Les tokens sémantiques sont le cœur du système de design. Ils transforment des couleurs brutes en concepts significatifs, permettant une cohérence parfaite et une maintenance simplifiée.

## Qu'est-ce qu'un token sémantique ?

Un token sémantique attribue un **sens contextuel** à une valeur technique.

### Exemple

```scss
// ❌ Valeur technique (couleur brute)
color: #111827;

// ✅ Token sémantique (intention claire)
color: var(--su-text-primary);
```

**Avantages** :
- 🎯 **Intention claire** : "texte principal" vs "gris 900"
- 🔄 **Adaptabilité** : Change automatiquement selon le thème **et** le mode
- 🛠️ **Maintenance** : Un seul endroit à modifier
- ♿ **Accessibilité** : Garanties de contraste intégrées

## Architecture des tokens

```
Foundations (Palettes brutes)
    ↓
Tokens sémantiques (Signification)
    ↓
Variables CSS (Application via data-theme + data-theme-mode)
    ↓
Composants (Utilisation)
```

## Catégories de tokens

### 1. Texte

Tokens pour tous les contenus textuels, avec contraste WCAG garanti.

#### `--su-text-primary`

Texte principal, contraste maximum (16.8:1 en mode light).

```vue
<style scoped lang="scss">
.heading {
  color: var(--su-text-primary);
}
</style>
```

**Usage** : Titres, texte principal, contenu important.

#### `--su-text-secondary`

Texte secondaire, bon contraste (9.3:1 en mode light).

```vue
<style scoped lang="scss">
.description {
  color: var(--su-text-secondary);
}
</style>
```

**Usage** : Descriptions, sous-titres, métadonnées.

#### `--su-text-tertiary`

Texte tertiaire, contraste minimum AA (4.7:1 en mode light).

```vue
<style scoped lang="scss">
.caption {
  color: var(--su-text-tertiary);
}
</style>
```

**Usage** : Labels, timestamps, informations auxiliaires.

#### `--su-text-disabled`

Texte désactivé, indication visuelle d'indisponibilité.

```vue
<style scoped lang="scss">
.input:disabled {
  color: var(--su-text-disabled);
}
</style>
```

**Usage** : Champs désactivés, actions indisponibles.

#### `--su-text-inverse`

Texte sur fond sombre (ou inversé selon le thème).

```vue
<style scoped lang="scss">
.dark-banner {
  background-color: var(--su-primary-default);
  color: var(--su-text-inverse);
}
</style>
```

**Usage** : Texte sur boutons primaires, bannières colorées.

#### `--su-text-on-inverse`

Texte sur un fond inversé (`--su-bg-inverse`).

```vue
<style scoped lang="scss">
.inverted-section {
  background-color: var(--su-bg-inverse);
  color: var(--su-text-on-inverse);
}
</style>
```

**Usage** : Texte dans les sections qui contrastent avec le fond principal (ex. hero sombre sur page claire).

### 2. Liens

Tokens spécifiques pour les liens hypertexte.

#### `--su-link-default`

Couleur par défaut des liens.

```vue
<style scoped lang="scss">
a {
  color: var(--su-link-default);
  text-decoration: underline;
}
</style>
```

#### `--su-link-hover`

Couleur au survol.

```vue
<style scoped lang="scss">
a:hover {
  color: var(--su-link-hover);
}
</style>
```

#### `--su-link-visited`

Liens déjà visités (améliore la navigation).

```vue
<style scoped lang="scss">
a:visited {
  color: var(--su-link-visited);
}
</style>
```

#### `--su-link-muted`

Liens secondaires, moins proéminents.

```vue
<style scoped lang="scss">
.footer-link {
  color: var(--su-link-muted);
}
</style>
```

#### `--su-link-default-rgb`

Valeur RGB espace-séparée du lien par défaut, pour les transparences.

```vue
<style scoped lang="scss">
.link-overlay {
  // Utilisation avec la syntaxe rgb() moderne
  background-color: rgb(var(--su-link-default-rgb) / 15%);
  border-color: rgb(var(--su-link-default-rgb) / 50%);
}
</style>
```

**Usage** : Fonds semi-transparents basés sur la couleur du lien, badges, indicateurs.

### 3. Backgrounds

Tokens pour tous les arrière-plans.

#### `--su-bg-canvas`

Fond global de l'application.

```vue
<style scoped lang="scss">
body {
  background-color: var(--su-bg-canvas);
}
</style>
```

**Usage** : Background de la page principale.

#### `--su-bg-surface`

Surface pour cartes, modales, panels.

```vue
<style scoped lang="scss">
.card {
  background-color: var(--su-bg-surface);
}
</style>
```

**Usage** : Cartes, modales, menus déroulants.

#### `--su-bg-surface-elevated`

Surface surélevée (avec ombre).

```vue
<style scoped lang="scss">
.modal {
  background-color: var(--su-bg-surface-elevated);
  box-shadow: var(--su-shadow-lg);
}
</style>
```

**Usage** : Modales, tooltips, éléments flottants.

#### `--su-bg-overlay`

Overlay semi-transparent pour backdrops.

```vue
<style scoped lang="scss">
.modal-backdrop {
  background-color: var(--su-bg-overlay);
}
</style>
```

**Usage** : Fonds de modales, menus plein écran.

#### `--su-bg-hover`

Background au survol d'éléments interactifs.

```vue
<style scoped lang="scss">
.list-item:hover {
  background-color: var(--su-bg-hover);
}
</style>
```

**Usage** : Items de liste, boutons secondaires.

#### `--su-bg-active`

Background en état actif/pressé.

```vue
<style scoped lang="scss">
.list-item:active {
  background-color: var(--su-bg-active);
}
</style>
```

**Usage** : État cliqué, boutons pressés.

#### `--su-bg-selected`

Background pour éléments sélectionnés.

```vue
<style scoped lang="scss">
.tab--active {
  background-color: var(--su-bg-selected);
}
</style>
```

**Usage** : Tabs actifs, items sélectionnés.

#### `--su-bg-disabled`

Background désactivé.

```vue
<style scoped lang="scss">
.button:disabled {
  background-color: var(--su-bg-disabled);
}
</style>
```

**Usage** : Boutons, champs désactivés.

#### `--su-bg-inverse`

Fond inversé — contraste avec le fond principal du thème.

```vue
<style scoped lang="scss">
.hero-banner {
  background-color: var(--su-bg-inverse);
  color: var(--su-text-on-inverse);
}
</style>
```

**Usage** : Sections promotionnelles, bannières hero, zones de mise en avant qui doivent contraster avec le contexte sans forcer un thème entier.

#### `--su-bg-inverse-subtle`

Fond inversé secondaire, moins prononcé que `--su-bg-inverse`.

```vue
<style scoped lang="scss">
.callout {
  background-color: var(--su-bg-inverse-subtle);
  color: var(--su-text-on-inverse);
}
</style>
```

**Usage** : Encadrés, callouts, zones d'information légèrement contrastées.

#### `--su-surface-inverse`

Surface posée sur un fond inversé (équivalent de `--su-bg-surface` dans un contexte inversé).

```vue
<style scoped lang="scss">
.hero-card {
  background-color: var(--su-bg-inverse);

  .hero-card__panel {
    background-color: var(--su-surface-inverse);
  }
}
</style>
```

### 4. Bordures

Tokens pour toutes les bordures.

#### `--su-border-default`

Bordure standard.

```vue
<style scoped lang="scss">
.card {
  border: 1px solid var(--su-border-default);
}
</style>
```

**Usage** : Cartes, séparateurs, outlines.

#### `--su-border-subtle`

Bordure très subtile.

```vue
<style scoped lang="scss">
.divider {
  border-bottom: 1px solid var(--su-border-subtle);
}
</style>
```

**Usage** : Séparateurs légers, lignes de grille.

#### `--su-border-strong`

Bordure renforcée.

```vue
<style scoped lang="scss">
.card:hover {
  border-color: var(--su-border-strong);
}
</style>
```

**Usage** : Hover states, éléments mis en avant.

#### `--su-border-focus`

Bordure de focus (accessibilité).

```vue
<style scoped lang="scss">
.input:focus {
  border-color: var(--su-border-focus);
  outline: 2px solid var(--su-border-focus);
}
</style>
```

**Usage** : Focus visible, navigation au clavier.

#### `--su-border-disabled`

Bordure désactivée.

```vue
<style scoped lang="scss">
.input:disabled {
  border-color: var(--su-border-disabled);
}
</style>
```

**Usage** : Champs désactivés.

#### `--su-border-inverse`

Bordure dans un contexte de fond inversé.

```vue
<style scoped lang="scss">
.inverted-card {
  background-color: var(--su-bg-inverse);
  border: 1px solid var(--su-border-inverse);
}
</style>
```

**Usage** : Séparateurs et contours sur fonds inversés.

### 5. États

Tokens pour les messages d'état et feedbacks.

#### Success (Succès)

```vue
<style scoped lang="scss">
.alert-success {
  color: var(--su-state-success);
  background-color: var(--su-state-success-bg);
}
</style>
```

**Usage** : Validation, opération réussie, badges actifs.

#### Warning (Avertissement)

```vue
<style scoped lang="scss">
.alert-warning {
  color: var(--su-state-warning);
  background-color: var(--su-state-warning-bg);
}
</style>
```

**Usage** : Avertissements, actions requérant attention.

#### Error (Erreur)

```vue
<style scoped lang="scss">
.alert-error {
  color: var(--su-state-error);
  background-color: var(--su-state-error-bg);
}
</style>
```

**Usage** : Erreurs, échecs, actions destructives.

#### Info (Information)

```vue
<style scoped lang="scss">
.alert-info {
  color: var(--su-state-info);
  background-color: var(--su-state-info-bg);
}
</style>
```

**Usage** : Informations neutres, aide contextuelle.

### 6. Actions primaires

Tokens pour les boutons et actions principales.

#### `--su-primary-default`

État par défaut du bouton primaire.

```vue
<style scoped lang="scss">
.button-primary {
  background-color: var(--su-primary-default);
  color: var(--su-primary-text);
}
</style>
```

#### `--su-primary-hover`

État survol.

```vue
<style scoped lang="scss">
.button-primary:hover {
  background-color: var(--su-primary-hover);
}
</style>
```

#### `--su-primary-active`

État actif/pressé.

```vue
<style scoped lang="scss">
.button-primary:active {
  background-color: var(--su-primary-active);
}
</style>
```

#### `--su-primary-disabled`

État désactivé.

```vue
<style scoped lang="scss">
.button-primary:disabled {
  background-color: var(--su-primary-disabled);
}
</style>
```

#### `--su-primary-text`

Texte sur bouton primaire.

```vue
<style scoped lang="scss">
.button-primary {
  color: var(--su-primary-text);
}
</style>
```

### 7. Actions secondaires

Tokens pour les boutons secondaires.

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

### 8. Ombres

Token pour la couleur des ombres (s'adapte au thème).

```vue
<style scoped lang="scss">
.card {
  box-shadow: 0 4px 6px var(--su-shadow-color);
}
</style>
```

## Tokens statiques

Ces tokens ne changent pas selon le thème.

### Typographie

```scss
.text {
  font-family: var(--su-font-family-base);
  font-size: var(--su-font-size-base);
  line-height: var(--su-line-height-normal);
}
```

**Disponibles** :
- `--su-font-family-base` : Police principale
- `--su-font-family-mono` : Police monospace
- `--su-font-size-xs` à `--su-font-size-3xl` : Échelle de tailles
- `--su-line-height-tight|normal|relaxed` : Interlignages

### Espacement

```scss
.component {
  padding: var(--su-spacing-4);
  margin-bottom: var(--su-spacing-6);
  gap: var(--su-spacing-2);
}
```

**Disponibles** :
- `--su-spacing-1` : 0.25rem (4px)
- `--su-spacing-2` : 0.5rem (8px)
- `--su-spacing-3` : 0.75rem (12px)
- `--su-spacing-4` : 1rem (16px)
- `--su-spacing-6` : 1.5rem (24px)
- `--su-spacing-8` : 2rem (32px)
- `--su-spacing-12` : 3rem (48px)

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

**Disponibles** :
- `--su-radius-sm` : 0.25rem (4px)
- `--su-radius-md` : 0.375rem (6px)
- `--su-radius-lg` : 0.5rem (8px)
- `--su-radius-xl` : 0.75rem (12px)
- `--su-radius-full` : 9999px (cercle)

### Ombres

```scss
.card {
  box-shadow: var(--su-shadow-sm);
}

.modal {
  box-shadow: var(--su-shadow-lg);
}
```

**Disponibles** :
- `--su-shadow-xs` : Ombre très légère
- `--su-shadow-sm` : Ombre légère
- `--su-shadow-md` : Ombre moyenne
- `--su-shadow-lg` : Ombre forte

### Animations

```scss
.button {
  transition-duration: var(--su-duration-normal);
  transition-timing-function: var(--su-ease-in-out);
}
```

**Disponibles** :
- `--su-duration-fast` : 150ms (ou 0ms si reduced-motion)
- `--su-duration-normal` : 200ms (ou 0ms si reduced-motion)
- `--su-duration-slow` : 300ms (ou 0ms si reduced-motion)
- `--su-ease-in-out` : cubic-bezier(0.4, 0, 0.2, 1)
- `--su-animation-scale` : 1 (ou 0 si reduced-motion)

### Focus

```scss
.input:focus {
  outline: var(--su-focus-ring-width) solid var(--su-border-focus);
  outline-offset: var(--su-focus-ring-offset);
}
```

**Disponibles** :
- `--su-focus-ring-width` : 2px
- `--su-focus-ring-offset` : 2px

## Exemples d'utilisation

### Carte complète

```vue
<template>
  <div class="card">
    <h3 class="card__title">Titre de la carte</h3>
    <p class="card__description">Description secondaire</p>
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

## Bonnes pratiques

### ✅ À faire

1. **Toujours utiliser les tokens** plutôt que les valeurs brutes
2. **Choisir le token le plus sémantique** pour le contexte
3. **Respecter la hiérarchie** : primary > secondary > tertiary
4. **Tester tous les thèmes et les deux modes** pour vérifier la cohérence
5. **Utiliser les mixins** pour les patterns répétitifs
6. **Utiliser `--su-bg-inverse` + `--su-text-on-inverse`** pour les sections inversées (plutôt que de forcer un thème avec `data-theme-mode`)

### ❌ À éviter

1. **Couleurs en dur** : `color: #111827` ❌
2. **Tokens non sémantiques** : utiliser `primary-600` au lieu de `primary-default` ❌
3. **Mélanger les niveaux** : utiliser des couleurs brutes avec des tokens ❌
4. **Ignorer les états** : ne pas gérer hover, focus, disabled ❌
5. **Oublier l'accessibilité** : contraste insuffisant ❌

## Extension des tokens

### Ajouter des tokens personnalisés

Si vous avez besoin de tokens spécifiques à votre application :

```scss
// Dans votre thème personnalisé — tokens/light.scss
$theme-custom-light: (
  // Tokens standard
  'text-primary': #1a202c,
  'bg-surface': #ffffff,

  // Tokens personnalisés
  'brand-highlight': #ff6b6b,
  'accent-secondary': #4ecdc4,
  'sidebar-bg': #f8f9fa,
);
```

Puis utilisez-les :

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
| `--su-text-on-inverse` | #f9fafb | #111827 | Texte sur fond inversé |
| `--su-link-default` | #2563eb | #60a5fa | Lien par défaut |
| `--su-link-hover` | #1d4ed8 | #93c5fd | Lien survol |
| `--su-link-visited` | #1e40af | #a855f7 | Lien visité |
| `--su-link-muted` | #6b7280 | #6b7280 | Lien secondaire |
| `--su-link-default-rgb` | 37 99 235 | 96 165 250 | RGB lien pour transparences |
| `--su-bg-canvas` | #f9fafb | #030712 | Fond global |
| `--su-bg-surface` | #ffffff | #111827 | Surface/carte |
| `--su-bg-surface-elevated` | #ffffff | #1f2937 | Surface surélevée |
| `--su-bg-overlay` | rgba(0,0,0,0.5) | rgba(0,0,0,0.7) | Overlay modal |
| `--su-bg-hover` | #f3f4f6 | #1f2937 | Fond survol |
| `--su-bg-active` | #e5e7eb | #374151 | Fond actif |
| `--su-bg-selected` | #eff6ff | rgba(59,130,246,0.2) | Fond sélectionné |
| `--su-bg-disabled` | #f3f4f6 | #1f2937 | Fond désactivé |
| `--su-bg-inverse` | #111827 | #f9fafb | Fond inversé |
| `--su-bg-inverse-subtle` | #1f2937 | #f3f4f6 | Fond inversé secondaire |
| `--su-surface-inverse` | #374151 | #e5e7eb | Surface sur fond inversé |
| `--su-border-default` | #d1d5db | #4b5563 | Bordure standard |
| `--su-border-subtle` | #e5e7eb | #374151 | Bordure subtile |
| `--su-border-strong` | #9ca3af | #6b7280 | Bordure forte |
| `--su-border-focus` | #3b82f6 | #60a5fa | Bordure focus |
| `--su-border-disabled` | #e5e7eb | #374151 | Bordure désactivée |
| `--su-border-inverse` | #4b5563 | #d1d5db | Bordure sur fond inversé |
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
| **Typographie** | | |
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
| **Espacement** | | |
| `--su-spacing-1` | 0.25rem (4px) | Espacement XS |
| `--su-spacing-2` | 0.5rem (8px) | Espacement S |
| `--su-spacing-3` | 0.75rem (12px) | Espacement M |
| `--su-spacing-4` | 1rem (16px) | Espacement base |
| `--su-spacing-6` | 1.5rem (24px) | Espacement L |
| `--su-spacing-8` | 2rem (32px) | Espacement XL |
| `--su-spacing-12` | 3rem (48px) | Espacement 2XL |
| **Border Radius** | | |
| `--su-radius-sm` | 0.25rem (4px) | Rayon small |
| `--su-radius-md` | 0.375rem (6px) | Rayon medium |
| `--su-radius-lg` | 0.5rem (8px) | Rayon large |
| `--su-radius-xl` | 0.75rem (12px) | Rayon XL |
| `--su-radius-full` | 9999px | Rayon complet (cercle) |
| **Ombres** | | |
| `--su-shadow-xs` | 0 1px 2px rgba(...) | Ombre très légère |
| `--su-shadow-sm` | 0 1px 3px rgba(...) | Ombre légère |
| `--su-shadow-md` | 0 4px 6px rgba(...) | Ombre moyenne |
| `--su-shadow-lg` | 0 10px 15px rgba(...) | Ombre forte |
| **Animations** | | |
| `--su-duration-fast` | 150ms (ou 0ms) | Durée rapide |
| `--su-duration-normal` | 200ms (ou 0ms) | Durée normale |
| `--su-duration-slow` | 300ms (ou 0ms) | Durée lente |
| `--su-ease-in-out` | cubic-bezier(...) | Easing par défaut |
| `--su-animation-scale` | 1 (ou 0) | Multiplicateur animation |
| **Focus** | | |
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

### Pattern 2 : Section inversée

```vue
<style scoped lang="scss">
.hero {
  background-color: var(--su-bg-inverse);
  color: var(--su-text-on-inverse);
  border-bottom: 1px solid var(--su-border-inverse);
  padding: var(--su-spacing-12) var(--su-spacing-8);

  &__card {
    background-color: var(--su-surface-inverse);
    border: 1px solid var(--su-border-inverse);
    border-radius: var(--su-radius-lg);
    padding: var(--su-spacing-6);
  }

  // Lien avec transparence via --su-link-default-rgb
  a {
    color: var(--su-link-default);
    background-color: rgb(var(--su-link-default-rgb) / 10%);
    padding: 2px 6px;
    border-radius: var(--su-radius-sm);

    &:hover {
      background-color: rgb(var(--su-link-default-rgb) / 20%);
    }
  }
}
</style>
```

### Pattern 3 : Système de notification

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

  &--success {
    background-color: var(--su-state-success-bg);
    border-left-color: var(--su-state-success);

    .notification__icon,
    .notification__title {
      color: var(--su-state-success);
    }
  }

  &--warning {
    background-color: var(--su-state-warning-bg);
    border-left-color: var(--su-state-warning);

    .notification__icon,
    .notification__title {
      color: var(--su-state-warning);
    }
  }

  &--error {
    background-color: var(--su-state-error-bg);
    border-left-color: var(--su-state-error);

    .notification__icon,
    .notification__title {
      color: var(--su-state-error);
    }
  }

  &--info {
    background-color: var(--su-state-info-bg);
    border-left-color: var(--su-state-info);

    .notification__icon,
    .notification__title {
      color: var(--su-state-info);
    }
  }
}

.notification__message {
  margin: 0;
  font-size: var(--su-font-size-sm);
  color: var(--su-text-secondary);
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
- [Système de thèmes](./index.md)
- [Accessibilité](./accessibility.md)
- [Exemples complets](./examples.md)
- [CSS Custom Properties (MDN)](https://developer.mozilla.org/fr/docs/Web/CSS/--)
