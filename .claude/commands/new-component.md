---
description: Scaffolde un nouveau composant SurgeUI complet (vue + types + story + docs FR/EN + exports)
---

Tu es un expert du Design System SurgeUI DS Vue. Crée tous les fichiers nécessaires pour un nouveau composant.

## Arguments

L'utilisateur passe : `<NomComposant> <layer>`
- `<NomComposant>` en PascalCase (ex: `Tag`, `Tooltip`, `Breadcrumb`)
- `<layer>` : `atoms`, `molecules`, ou `organisms`

Arguments reçus : $ARGUMENTS

## Contexte du projet

- **Monorepo** : `package/` (bibliothèque) + `docs/` (VitePress FR + EN)
- **Alias** : `@/` → `package/src/`
- **Préfixe CSS** : `su-` (BEM : `.su-<nom>`, `.su-<nom>--variant`, `.su-<nom>__element`)
- **Préfixe composant** : `Su` (enregistrement global : `SuTag`, `SuTooltip`…)
- **Styles** : SCSS scopé inline dans le `.vue`, `@use '../../styles/main' as *`
- **Stories** : `argTypes` explicites obligatoires (Storybook config : `reactDocgen: false`)

## Patterns de référence

### Badge.vue (atom de référence)
```vue
<script setup lang="ts">
import { computed } from 'vue'
import type { BadgeProps } from '@/types'

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'default',
  size: 'md',
})

const classes = computed(() => [
  'su-badge',
  `su-badge--${props.variant}`,
  `su-badge--${props.size}`,
])

const ariaAttributes = computed(() => {
  const attrs: Record<string, any> = {}
  if (props.ariaLabel) attrs['aria-label'] = props.ariaLabel
  if (props.ariaHidden !== undefined) attrs['aria-hidden'] = props.ariaHidden
  return attrs
})
</script>

<template>
  <span :class="classes" v-bind="ariaAttributes">
    <slot />
  </span>
</template>

<style scoped lang="scss">
@use '../../styles/main' as *;

.su-badge {
  display: inline-flex;
  align-items: center;
  @include transition(background-color, border-color);

  &--primary { background-color: var(--su-primary-100); color: var(--su-primary-700); }

  @media (prefers-color-scheme: dark) { /* dark overrides */ }
  @media (prefers-contrast: high) { /* high-contrast overrides */ }
  @media (prefers-reduced-motion: reduce) { /* reduced-motion overrides */ }
}
</style>
```

### Pattern types (types/index.ts)
```typescript
// NomComposant.vue
export type NomComposantVariant = 'default' | 'primary';
export interface NomComposantProps extends AccessibilityProps {
  variant?: NomComposantVariant;
  size?: Size;
  disabled?: boolean;
}
```

### Pattern story (CSF3)
```typescript
import type { Meta, StoryObj } from '@storybook/vue3'
import NomComposant from '../NomComposant.vue'

const meta: Meta<typeof NomComposant> = {
  title: 'Atoms/NomComposant',
  component: NomComposant,
  parameters: { layout: 'centered', docs: { description: { component: '...' } } },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: { type: 'select' }, options: ['default', 'primary'], description: '...' },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'], description: 'Taille' },
  }
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({ components: { NomComposant }, setup() { return { args } }, template: '<NomComposant v-bind="args">Contenu</NomComposant>' })
}
```

### Pattern doc VitePress
```markdown
# NomComposant

Description courte du composant.

## Exemples d'utilisation

### Utilisation de base

<div class="component-demo">
  <div class="demo-section">
    <h4>Titre démo</h4>
    <div class="demo-buttons">
      <SuNomComposant>Exemple</SuNomComposant>
    </div>
  </div>
</div>

```vue
<template>
  <SuNomComposant>Exemple</SuNomComposant>
</template>
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `variant` | `'default' \| 'primary'` | `'default'` | Variante visuelle |
```

## Fichiers à créer

Avant de créer, lis d'abord `package/src/index.ts` et `package/src/types/index.ts` pour comprendre les patterns d'export existants.

Crée ces fichiers dans l'ordre :

1. **`package/src/types/index.ts`** — Ajouter après la dernière interface du layer correspondant :
   - Export type `<Nom>Variant` si nécessaire
   - Interface `<Nom>Props extends AccessibilityProps`

2. **`package/src/components/<layer>/<NomComposant>.vue`** — Composant complet avec :
   - `<script setup lang="ts">` + import types + `withDefaults`
   - Classes BEM calculées avec `computed`
   - Attributs ARIA avec `computed`
   - Template sémantique
   - `<style scoped lang="scss">` avec BEM + dark mode + high-contrast + reduced-motion

3. **`package/src/components/<layer>/_stories/<NomComposant>.stories.ts`** — Stories complètes :
   - `Default`, `Variants`, `Sizes` au minimum
   - `argTypes` explicites pour chaque prop

4. **`docs/components/<nomcomposant>.md`** — Documentation FR :
   - Description
   - Exemples avec `<div class="component-demo">` + code vue
   - Tableau API Props

5. **`docs/en/components/<nomcomposant>.md`** — Documentation EN (même structure, texte en anglais)

6. **`package/src/index.ts`** — Ajouter :
   - Import du composant dans la bonne section (Display / Action / Form)
   - Export nommé
   - Enregistrement dans `install()` avec le préfixe

Confirme chaque fichier créé et termine par un résumé des 6 fichiers.
