# CLAUDE.md — package/

Contexte spécifique au workspace `@surgeui/ds-vue` (bibliothèque de composants Vue 3).
Le fichier racine `../CLAUDE.md` fournit l'architecture globale, les commandes et les conventions.

## Styles SCSS

### Architecture

```
styles/
├─ abstracts/      ← importé par les composants, n'émet AUCUN CSS
│  ├─ _functions   token(), with-alpha(), mix-colors(), radius(), inner-radius(), rem()
│  ├─ _mixins      transition, focus-ring, control-surface, inner-highlight…
│  └─ _breakpoints up(), down(), pointer-coarse, motion-safe/reduce, high-contrast, dark-mode
├─ foundations/    palette brute, espacements, typo, animations (variables Sass)
├─ tokens/         _static (invariants), _semantic (tokens communs par mode), _contrast
├─ themes/         default, ocean, forest, sunset (light + dark) + _registry, _schema
├─ base/           utilitaires globaux (.sr-only)
└─ index.scss      SEUL point d'émission CSS — importé une fois par src/index.ts
```

### Import dans un composant — un seul pattern

```scss
<style lang="scss">
@use '../../styles/abstracts' as *;

.su-button {
  gap: $spacing-2;                       // variables des fondations, sans namespace
  @include transition(background-color, color);
  &:focus-visible { @include focus-ring; }
  &:hover { background: with-alpha(primary-default, 90%); }
}
</style>
```

> **Interdit :** importer `styles/index.scss` (ou tout fichier qui émet du CSS) dans un composant : le CSS serait recopié dans chaque composant.

### BEM et classes CSS

- Base : `.su-<component>` — ex: `.su-button`, `.su-toggle`
- Modifier : `.su-<component>--<modifier>` — ex: `.su-button--primary`, `.su-toggle--active`
- Element : `.su-<component>__<element>` — ex: `.su-button__icon`, `.su-toggle__label`
- Tokens CSS : `var(--su-*)` pour toutes les couleurs, tailles, ombres. Jamais de palette brute (`$gray-500`) pour une couleur visible : elle ne suit pas le thème.
- Transparence : `with-alpha(state-error, 16%)` (→ `color-mix`). Plus de tokens `-rgb` ni de `rgba(var(--x), a)`.

### Fonctions et mixins

Source : `styles/abstracts/`

| Mixin / fonction | Usage |
|-------|-------|
| `token($name, $fallback?)` | `var(--su-<name>)` |
| `with-alpha($color, $pct)` | Couleur ou token avec transparence (`color-mix`) |
| `transition($props...)` | Transition tokenisée (annulée par reduced-motion) |
| `focus-ring($color?, $offset?)` | Outline accessible (`--su-ring`) |
| `focus-ring-field($color?)` | Bordure + halo 3px des champs |
| `disabled-state` | Opacité `--su-opacity-disabled` (.64) + curseur |
| `control-size($size)` | Hauteur 36/32px, padding, typo base→sm dès `sm` |
| `control-surface($radius?)` | Surface de champ : bordure alpha, ombre, reflet, focus, invalide, disabled |
| `inner-highlight($radius?)` | Reflet interne d'1px (élément en `position: relative`) |
| `soft-variant($state)` | Fond 8 % / bordure 32 % / texte `-fg` (badges, alertes) |
| `touch-target-overlay` | Zone tactile 44px sur `pointer: coarse` sans changer la taille visuelle |
| `sr-only` | Masquage accessible |
| `up($bp)` / `down($bp)` | Media queries (sm 640, md 768, lg 1024, xl 1280, 2xl 1536) |
| `motion-reduce` / `high-contrast` / `dark-mode` | Préférences et mode du thème |
| `interactive-states`, `surface`, `truncate`, `scrollable-container`, `touch-target`, `use-border-radius`, `su-border-radius`, `squareSize`, `su-text`, `su-text-ellipsis`, `su-form-field-container`, `su-formfield-box` | Mixins historiques, conservés |

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
- **Communs** (fournis par `tokens/_semantic.scss`, surchargeables par thème) : `ring`, `border-input`, `border-alpha`, `bg-accent`, `bg-muted`, `bg-control`, `inner-highlight`, `shadow-control`, `shadow-popover`, `overlay-backdrop`, `state-{success|warning|error|info}-fg` (texte d'état ≈ nuance 700 en clair / 400 en sombre)

### Tokens statiques (`:root`)

Typo (`font-size-xs…4xl`), espacements, rayons (`radius-none…2xl`, `radius-control` 10px, `radius-container` 16px), ombres (`shadow-xs…xl`), focus, hauteurs de contrôle (`control-height-{sm|md|lg}` + `-compact`), `opacity-disabled`, `touch-target-min`, `z-*`, durées et easings.

### Système de thèmes

- 4 thèmes × 2 modes : `default`, `ocean`, `forest`, `sunset` (light + dark)
- Structure : `styles/themes/<name>/` avec `tokens/light.scss`, `tokens/dark.scss`, `_meta.scss` ; `index.scss` utilise `registry.generate-mode-vars($map, 'light' | 'dark')` qui fusionne les tokens communs
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
