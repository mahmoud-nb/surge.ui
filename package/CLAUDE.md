# CLAUDE.md — package/

Contexte spécifique au workspace `@surgeui/ds-vue` (bibliothèque de composants Vue 3).
Le fichier racine `../CLAUDE.md` fournit l'architecture globale, les commandes et les conventions.

## Styles SCSS

### Imports dans les composants

Deux patterns coexistent — ne pas les mélanger :

**Pattern 1 — Majorité des composants** (Button, Input, Switch, Toggle, Badge, Avatar, Link, Image, etc.) :

```scss
@use '../../styles/main' as *;

.su-button {
  gap: 0.5rem;                        // rem direct, PAS space.$spacing-2
  @include transition(background-color, color);
  &:focus-visible { @include focus-ring; }
}
```

`main` forward les mixins uniquement. Les espacements utilisent des **valeurs rem directes** : `0.25rem`, `0.5rem`, `0.75rem`, `1rem`, etc.

**Pattern 2 — Composants avec spacing SCSS** (Accordion, ButtonGroup, Dropdown, LinkGroup, FormFieldGroup, FloatButton) :

```scss
@use '../../styles/core/mixins' as *;
@use '../../styles/foundations/spacing' as space;

.su-accordion {
  gap: space.$spacing-2;             // variable SCSS
}
```

> **Piège connu :** `space.$spacing-*` provoque `There is no module with the namespace "space"` si on utilise `@use '../../styles/main' as *` seul.

### BEM et classes CSS

- Base : `.su-<component>` — ex: `.su-button`, `.su-toggle`
- Modifier : `.su-<component>--<modifier>` — ex: `.su-button--primary`, `.su-toggle--active`
- Element : `.su-<component>__<element>` — ex: `.su-button__icon`, `.su-toggle__label`
- Tokens CSS : `var(--su-*)` pour toutes les couleurs, tailles, ombres

### Mixins disponibles

Source : `styles/core/_mixins.scss`

| Mixin | Usage |
|-------|-------|
| `transition($props...)` | Transition avec support `prefers-reduced-motion` |
| `focus-ring($color?)` | Outline accessible (`--su-border-focus`) |
| `interactive-states` | hover/active/focus-visible/disabled combinés |
| `surface($elevated?)` | Container surface + bordure + ombre optionnelle |
| `truncate($lines?)` | Texte tronqué (1 ligne ou multi-lignes) |
| `scrollable-container` | Scroll avec scrollbar stylée |
| `touch-target($size?)` | Taille min tactile WCAG (44px) |
| `use-border-radius($base, $keys)` | Toutes les classes `--radius-*` |
| `su-border-radius($size, $shape)` | Radius unitaire avec shape optionnel |
| `squareSize($size)` | Width = height |
| `su-text($size, $color?, $weight?, $line-height?)` | Texte avec tokens typographiques |
| `su-text-ellipsis` | Overflow ellipsis (1 ligne) |
| `su-form-field-container` | Container d'input avec états (error/success/warning/disabled/readonly) |
| `su-formfield-box($self)` | Reset d'input dans un FormField wrapper |

## Tokens de design

### Tokens sémantiques (--su-*)

Définis dans `styles/themes/_schema.scss`. Chaque thème DOIT implémenter tous ces tokens.

- **Texte :** `text-primary`, `text-secondary`, `text-tertiary`, `text-placeholder`, `text-disabled`, `text-inverse`, `text-on-inverse`
- **Liens :** `link-default`, `link-hover`, `link-visited`, `link-muted`, `link-default-rgb` (RGB espace-séparé pour transparences)
- **Fonds :** `bg-canvas`, `bg-surface`, `bg-surface-elevated`, `bg-overlay`, `bg-disabled`
- **Fonds interactifs :** `bg-hover`, `bg-active`, `bg-selected`
- **Fonds inversés :** `bg-inverse`, `bg-inverse-subtle`, `surface-inverse`
- **Bordures :** `border-default`, `border-subtle`, `border-strong`, `border-focus`, `border-disabled`, `border-hover`, `border-selected`, `border-inverse`
- **Actions primaires :** `primary-default`, `primary-hover`, `primary-active`, `primary-focus`, `primary-disabled`, `primary-text`
- **Actions secondaires :** `secondary-default`, `secondary-hover`, `secondary-active`, `secondary-focus`, `secondary-disabled`, `secondary-text`
- **États :** `state-{success|warning|error|info}` + `-bg`, `-border-color`, `-border-hover`, `-border-focus`
- **Palette primaire :** `primary-50` ... `primary-950` (11 niveaux)
- **Ombre :** `shadow-color`

### Système de thèmes

- 5 thèmes : `light`, `dark`, `ocean`, `forest`, `sunset`
- Structure : `styles/themes/<name>/` avec `tokens/light.scss`, `tokens/dark.scss`, `_meta.scss`
- Schéma de référence : `styles/themes/_schema.scss` (liste normative + mixin `validate-theme`)
- Runtime : attributs `data-theme` + `data-theme-mode` sur l'élément parent

## Types

- Toutes les interfaces props dans `src/types/index.ts` (~750 lignes)
- Types partagés : `Variant`, `Size`, `State`, `Radius`, `Gap`, `Orientation`, `TextAlign`
- Tout composant interactif étend `AccessibilityProps` (ariaLabel, ariaLabelledBy, ariaDescribedBy, ariaHidden, ariaInvalid, ariaRequired, role, tabIndex)
- Pattern FormField : `InputFieldProps = FormFieldProps & InputProps` (intersection)
- Import : `import type { ButtonProps } from '@/types'`

## Stories

- Emplacement : `components/<layer>/_stories/<Name>.stories.ts`
- Format CSF3 avec `tags: ['autodocs']`
- argTypes **manuels obligatoires** (car `reactDocgen: false` dans `.storybook/main.ts`)
- Titre : `'Atoms/Button'`, `'Molecules/InputField'`, `'Organisms/Dialog'`
- Descriptions en **francais**

Squelette minimal :

```ts
import type { Meta, StoryObj } from '@storybook/vue3'
import MyComponent from '../MyComponent.vue'

const meta: Meta<typeof MyComponent> = {
  title: 'Atoms/MyComponent',
  component: MyComponent,
  parameters: { layout: 'centered', docs: { description: { component: 'Description en francais.' } } },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: { type: 'select' }, options: ['primary', 'secondary'], description: 'Variante visuelle' }
  }
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { variant: 'primary' } }
```

## Checklist nouveau composant

1. `src/components/<layer>/<Name>.vue` — `<script setup lang="ts">` + props + BEM SCSS
2. `src/types/index.ts` — ajouter `<Name>Props extends AccessibilityProps`
3. `src/components/<layer>/_stories/<Name>.stories.ts` — CSF3 + autodocs + argTypes manuels
4. `docs/components/<name>.md` — documentation francaise
5. `docs/en/components/<name>.md` — documentation anglaise
6. `src/index.ts` — import + export nommé + enregistrement plugin (`app.component`)
7. `docs/.vitepress/config.ts` — ajouter dans `getNavItems()` au bon groupe (display/actions/forms)
