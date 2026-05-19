# Icon

The Icon component renders vector icons from the [HeroIcons](https://heroicons.com/) library (24px). It supports `outline` and `solid` variants, sizing, colorisation, and adaptive accessibility behaviour depending on whether the icon is decorative or semantic.

## Usage Examples

### Basic Usage

<div class="component-demo">
  <div class="demo-section">
    <h4>Simple icon</h4>
    <SuIcon name="Home" />
    <SuIcon name="Bell" />
    <SuIcon name="User" />
  </div>
</div>

```vue
<template>
  <SuIcon name="Home" />
  <SuIcon name="Bell" />
  <SuIcon name="User" />
</template>
```

### Outline and Solid Variants

<div class="component-demo">
  <div class="demo-section">
    <h4>Outline (default)</h4>
    <SuIcon name="Heart" variant="outline" />
    <SuIcon name="Star" variant="outline" />
  </div>
  <div class="demo-section">
    <h4>Solid</h4>
    <SuIcon name="Heart" variant="solid" />
    <SuIcon name="Star" variant="solid" />
  </div>
</div>

```vue
<template>
  <!-- Outline (default) -->
  <SuIcon name="Heart" variant="outline" />
  <SuIcon name="Star" variant="outline" />

  <!-- Solid -->
  <SuIcon name="Heart" variant="solid" />
  <SuIcon name="Star" variant="solid" />
</template>
```

### Sizes

<div class="component-demo">
  <div class="demo-section">
    <h4>Different sizes</h4>
    <SuIcon name="Cog6Tooth" :size="16" />
    <SuIcon name="Cog6Tooth" :size="24" />
    <SuIcon name="Cog6Tooth" :size="32" />
    <SuIcon name="Cog6Tooth" :size="48" />
    <SuIcon name="Cog6Tooth" size="4rem" />
  </div>
</div>

```vue
<template>
  <SuIcon name="Cog6Tooth" :size="16" />
  <SuIcon name="Cog6Tooth" :size="24" />
  <SuIcon name="Cog6Tooth" :size="32" />
  <SuIcon name="Cog6Tooth" :size="48" />
  <SuIcon name="Cog6Tooth" size="4rem" />
</template>
```

### Colors

<div class="component-demo">
  <div class="demo-section">
    <h4>CSS color</h4>
    <SuIcon name="CheckCircle" color="#22c55e" />
    <SuIcon name="ExclamationCircle" color="#f59e0b" />
    <SuIcon name="XCircle" color="#ef4444" />
  </div>
  <div class="demo-section">
    <h4>Tailwind text-* class</h4>
    <SuIcon name="CheckCircle" color="text-green-500" />
    <SuIcon name="ExclamationCircle" color="text-amber-500" />
    <SuIcon name="XCircle" color="text-red-500" />
  </div>
</div>

```vue
<template>
  <!-- Direct CSS color -->
  <SuIcon name="CheckCircle" color="#22c55e" />
  <SuIcon name="ExclamationCircle" color="#f59e0b" />
  <SuIcon name="XCircle" color="#ef4444" />

  <!-- Tailwind class -->
  <SuIcon name="CheckCircle" color="text-green-500" />
  <SuIcon name="ExclamationCircle" color="text-amber-500" />
  <SuIcon name="XCircle" color="text-red-500" />
</template>
```

### Decorative Icon

Use `decorative` for purely visual icons that carry no information -  the component automatically injects `aria-hidden="true"` and `role="presentation"`.

```vue
<template>
  <!-- Icon next to readable text -  hide it from screen readers -->
  <button>
    <SuIcon name="Download" decorative />
    Download
  </button>
</template>
```

### Semantic Icon

For icons that convey information (icon-only buttons, visual status indicators), provide an `ariaLabel` -  the component injects `role="img"` and `aria-label` automatically.

```vue
<template>
  <!-- Icon-only button -  the icon must have an ARIA label -->
  <button aria-label="Delete item">
    <SuIcon name="Trash" aria-label="Delete" />
  </button>

  <!-- Status icon -->
  <SuIcon name="CheckCircle" :size="20" color="#22c55e" aria-label="Success" />
</template>
```

### Icon Suffix

HeroIcons exports its components with the `Icon` suffix. Both forms are accepted:

```vue
<template>
  <!-- Equivalent -  both forms work -->
  <SuIcon name="Home" />
  <SuIcon name="HomeIcon" />
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | -  **(required)** | HeroIcons icon name (e.g. `'Home'`, `'ArrowRight'`, `'Cog6Tooth'`) |
| `variant` | `'outline' \| 'solid'` | `'outline'` | Icon style -  `outline` for thin strokes, `solid` for filled shapes |
| `size` | `number \| string` | `24` | Icon size. A number is interpreted as pixels; a string is used as a raw CSS value |
| `color` | `string` | -  | Icon color. Accepts a CSS color value (`#hex`, `rgb(...)`) or a Tailwind `text-*` class |
| `ariaLabel` | `string` | -  | ARIA label for semantic icons. Automatically injects `role="img"` |
| `decorative` | `boolean` | `false` | If `true`, the icon is hidden from assistive technologies (`aria-hidden="true"`, `role="presentation"`) |
| `class` | `string` | -  | Additional CSS classes applied to the SVG element |

### Automatic Accessibility Behaviour

| Context | Props used | Generated attributes |
|---------|------------|----------------------|
| Decorative icon | `decorative: true` | `aria-hidden="true"` + `role="presentation"` |
| Semantic icon | `ariaLabel: "..."` | `aria-label="..."` + `role="img"` |
| Neither | -  | No ARIA attributes -  avoid this |

## Accessibility

- **Decorative icons**: always use `decorative` when the icon accompanies readable text. This prevents information duplication for screen reader users.
- **Semantic icons**: always provide a clear, descriptive `ariaLabel` for icons that carry meaning (icon-only buttons, status indicators without text).
- **Contrast**: ensure the chosen colour provides sufficient contrast (minimum 3:1 for non-text graphical elements per WCAG 2.1).
- **Minimum size**: interactive icons must have a clickable area of at least 44×44 px (WCAG 2.5.5) -  manage this through the parent component (button, link).

## Technical Notes

- Icon loading is **asynchronous** via `defineAsyncComponent` -  a brief delay may occur before display on first render.
- If the icon name is incorrect or does not exist in HeroIcons, a warning is emitted in the console and nothing is rendered.
- The `color` prop supports two forms:
  - **CSS value** (`#3b82f6`, `rgb(59,130,246)`): injected as `style.color`
  - **Tailwind class** (`text-blue-500`): added to the class list -  in this case, `style.color` is **not** injected
