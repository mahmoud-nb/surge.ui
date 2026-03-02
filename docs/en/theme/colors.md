# Color Guide

The color system is organized in three hierarchical levels: raw palettes, semantic tokens, and CSS variables. This architecture ensures cohesion, accessibility, and easy maintenance.

## Color Architecture

### Hierarchical Levels

```
Raw Palettes (foundations)
    ↓
Semantic Tokens (themes)
    ↓
CSS Variables (runtime)
```

1. **Raw Palettes**: Pure colors defined once
2. **Semantic Tokens**: Attribution of contextual meaning to colors
3. **CSS Variables**: Dynamic application based on active theme

## Base Palettes

### Primary (Blue)

The main brand color, used for primary actions and key elements.

| Shade | Hex | Usage |
|-------|-----|-------|
| 50 | `#eff6ff` | Very light backgrounds |
| 100 | `#dbeafe` | Light backgrounds |
| 200 | `#bfdbfe` | Subtle borders |
| 300 | `#93c5fd` | Light hover states |
| 400 | `#60a5fa` | Dark mode links |
| 500 | `#3b82f6` | **Primary color** |
| 600 | `#2563eb` | Primary actions |
| 700 | `#1d4ed8` | Primary hover |
| 800 | `#1e40af` | Active states |
| 900 | `#1e3a8a` | Visited links |
| 950 | `#172554` | Text on light blue background |

**Minimum Contrast**: 600 on white (4.5:1 - AA), 700 recommended (7:1 - AAA)

### Gray (Neutral)

Base for texts, backgrounds, and borders. WCAG contrast verified.

| Shade | Hex | Contrast on white | Usage |
|-------|-----|-------------------|-------|
| 50 | `#f9fafb` | - | Light canvas |
| 100 | `#f3f4f6` | - | Disabled backgrounds |
| 200 | `#e5e7eb` | - | Subtle borders |
| 300 | `#d1d5db` | - | Default borders |
| 400 | `#9ca3af` | 4.6:1 | Disabled text (AA) |
| 500 | `#6b7280` | 4.7:1 | **Tertiary text** (AA) |
| 600 | `#4b5563` | 7.3:1 | Strong borders (AAA) |
| 700 | `#374151` | 9.3:1 | **Secondary text** (AAA) |
| 800 | `#1f2937` | 13.1:1 | Dark surface |
| 900 | `#111827` | 16.8:1 | **Primary text** (AAA) |
| 950 | `#030712` | 19.4:1 | Dark canvas |

::: tip WCAG Contrast
- **AA**: 4.5:1 minimum (normal text)
- **AAA**: 7:1 recommended (better readability)
:::

### Success (Green)

Positive feedback, validation, operation success.

| Shade | Hex | Usage |
|-------|-----|-------|
| 50 | `#ecfdf5` | Light success background |
| 100 | `#d1fae5` | Success background |
| 500 | `#10b981` | **Dark success icons** |
| 600 | `#059669` | Light success text |
| 700 | `#047857` | Success hover |

**Example**: Success notifications, validation indicators, active badges.

### Warning (Amber)

Warnings, actions requiring attention.

| Shade | Hex | Usage |
|-------|-----|-------|
| 50 | `#fffbeb` | Light warning background |
| 100 | `#fef3c7` | Warning background |
| 500 | `#f59e0b` | **Dark warning icons** |
| 600 | `#d97706` | Light warning text |
| 700 | `#b45309` | Warning hover |

**Example**: Non-blocking alerts, attention-required sections, update badges.

### Error (Red)

Errors, destructive actions, critical states.

| Shade | Hex | Usage |
|-------|-----|-------|
| 50 | `#fef2f2` | Light error background |
| 100 | `#fee2e2` | Error background |
| 500 | `#ef4444` | **Dark error icons** |
| 600 | `#dc2626` | Light error text |
| 700 | `#b91c1c` | Error hover |

**Example**: Error messages, delete buttons, failure indicators.

### Info (Cyan)

Neutral information, contextual help.

| Shade | Hex | Usage |
|-------|-----|-------|
| 50 | `#ecfeff` | Light info background |
| 100 | `#cffafe` | Info background |
| 500 | `#06b6d4` | **Dark info icons** |
| 600 | `#0891b2` | Light info text |
| 700 | `#0e7490` | Info hover |

**Example**: Tooltips, informational messages, documentation badges.

## Themed Palettes

### Ocean

Professional maritime ambiance with cyan dominance and coral accents.

**Key Colors**:
- Primary: `#f97316` (Coral) - Contrast on ocean background
- Background: `#e0f2fe` (Sky Blue)
- Accent: `#0891b2` (Cyan)

**Use Cases**: Travel applications, analytics dashboards, financial interfaces.

### Forest

Natural inspiration with greens and autumn orange.

**Key Colors**:
- Primary: `#f97316` (Autumn Orange)
- Background: `#f7fee7` (Pale Green)
- Accent: `#16a34a` (Forest Green)

**Use Cases**: Ecological applications, health/wellness, education.

### Sunset

Warm palette with pink, violet, and orange.

**Key Colors**:
- Primary: `#db2777` (Pink)
- Background: `#fff7ed` (Peach)
- Accent: `#a855f7` (Violet)

**Use Cases**: Creative applications, social networks, entertainment.

## Using Colors

### In Components

```vue
<style scoped lang="scss">
.component {
  /* ❌ Avoid: Hard-coded colors */
  color: #111827;
  background: #ffffff;
  
  /* ✅ Recommended: CSS variables */
  color: var(--su-text-primary);
  background-color: var(--su-bg-surface);
}
</style>
```

### Semantic Colors

Always use semantic tokens rather than raw colors:

```scss
// ❌ Wrong
.button {
  background: #3b82f6;
}

// ✅ Correct
.button {
  background-color: var(--su-primary-default);
  
  &:hover {
    background-color: var(--su-primary-hover);
  }
}
```

### Interactive States

State colors are automatically managed:

```vue
<style scoped lang="scss">
.interactive-element {
  background-color: var(--su-bg-surface);
  
  &:hover {
    background-color: var(--su-bg-hover);
  }
  
  &:active {
    background-color: var(--su-bg-active);
  }
  
  &:disabled {
    background-color: var(--su-bg-disabled);
    color: var(--su-text-disabled);
  }
}
</style>
```

## Color Accessibility

### Text Contrast

The system guarantees minimum contrast according to WCAG 2.1:

| Level | Ratio | Usage |
|-------|-------|-------|
| AA (minimum) | 4.5:1 | Normal text (16px+) |
| AA Large | 3:1 | Large text (18px+ or 14px bold) |
| AAA (recommended) | 7:1 | Normal text for better readability |
| AAA Large | 4.5:1 | Large text |

### Contrast Verification

```scss
// Primary text: ALWAYS AAA (7:1+)
.text-primary {
  color: var(--su-text-primary); // gray-900 on white = 16.8:1 ✓
}

// Secondary text: AAA recommended
.text-secondary {
  color: var(--su-text-secondary); // gray-700 on white = 9.3:1 ✓
}

// Tertiary text: AA minimum
.text-tertiary {
  color: var(--su-text-tertiary); // gray-500 on white = 4.7:1 ✓
}
```

### High Contrast Mode

In high contrast mode, colors are automatically reinforced:

```scss
// Normal mode
[data-contrast="normal"] {
  --su-text-primary: #111827;
  --su-border-default: #d1d5db;
}

// High contrast mode
[data-contrast="high"] {
  --su-text-primary: #000000; // Pure black
  --su-border-default: #000000; // Visible borders everywhere
}
```

### Never Use Color Alone

Always combine color with other visual indicators:

```vue
<template>
  <!-- ❌ Bad: Color alone -->
  <span class="status-success">Active</span>
  
  <!-- ✅ Good: Color + icon + text -->
  <span class="status-success">
    <IconCheck />
    <span>Active</span>
  </span>
</template>
```

## Transparency and Overlays

### Recommended Overlays

```scss
// Dark overlay (modals, dropdowns)
.overlay-dark {
  background-color: rgba(0, 0, 0, 0.5); // 50% black
}

// Light overlay (on dark background)
.overlay-light {
  background-color: rgba(255, 255, 255, 0.1); // 10% white
}

// Using variables
.modal-backdrop {
  background-color: var(--su-bg-overlay); // Adapts to theme
}
```

### Hover and Focus States

```scss
.button {
  background-color: var(--su-primary-default);
  
  // Hover: darken by 10%
  &:hover {
    background-color: color-mix(
      in srgb, 
      var(--su-primary-default) 90%, 
      black
    );
  }
  
  // Or use dedicated token
  &:hover {
    background-color: var(--su-primary-hover);
  }
}
```

## Color-mix and Manipulations

### Lighten / Darken

```scss
// Lighten by 20%
.lighter {
  background-color: color-mix(
    in srgb,
    var(--su-primary-default) 80%,
    white
  );
}

// Darken by 20%
.darker {
  background-color: color-mix(
    in srgb,
    var(--su-primary-default) 80%,
    black
  );
}
```

### Opacity

```scss
// Via rgba (if hex color)
.semi-transparent {
  background-color: rgba(59, 130, 246, 0.5); // 50% opacity
}

// Via color-mix
.semi-transparent-dynamic {
  background-color: color-mix(
    in srgb,
    var(--su-primary-default) 50%,
    transparent
  );
}
```

## Best Practices

### ✅ Do's

- Use CSS variables for all colors
- Respect semantic tokens
- Verify contrast (minimum AA, recommended AAA)
- Test in high contrast mode
- Combine color + shape + text for information

### ❌ Don'ts

- Hard-coded colors in components
- Raw palette colors directly
- Insufficient contrast (< 4.5:1)
- Information only by color
- Too many different colors (visual confusion)

## Development Tools

### Browser Extension

- **Stark**: Real-time contrast verification
- **Colorblindly**: Simulate visual deficiencies
- **WAVE**: Complete accessibility audit

### Online

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Coolors](https://coolors.co/contrast-checker)
- [Color Review](https://color.review/)

### DevTools

```javascript
// In browser console
const styles = getComputedStyle(document.documentElement);
const primary = styles.getPropertyValue('--su-primary-default');
console.log('Primary color:', primary);
```

## Examples of Custom Palettes

### Corporate Palette

```scss
// themes/corporate/_tokens.scss
$theme-corporate: (
  'primary-default': #003d82,    // Corporate blue
  'primary-hover': #002a5c,
  'primary-text': #ffffff,
  
  'secondary-default': #f5f5f5,
  'secondary-text': #003d82,
  
  'text-primary': #1a1a1a,
  'text-secondary': #4a4a4a,
  
  'bg-canvas': #fafafa,
  'bg-surface': #ffffff,
);
```

### Gaming Palette

```scss
// themes/gaming/_tokens.scss
$theme-gaming: (
  'primary-default': #ff0080,    // Neon pink
  'primary-hover': #cc0066,
  'primary-text': #000000,
  
  'secondary-default': #00ff9f,  // Neon green
  'secondary-text': #000000,
  
  'text-primary': #ffffff,
  'text-secondary': #b3b3b3,
  
  'bg-canvas': #0a0a0f,         // Almost black
  'bg-surface': #16161f,
);
```

## FAQ

### Can I add my own colors?

Yes! Create a custom theme with your colors. See [Create a Custom Theme](./index.md#create-a-custom-theme).

### How to test color accessibility?

Use the DevTools and browser extensions mentioned above. Also test in high contrast mode.

### Do colors change automatically with the theme?

Yes, if you use CSS variables (`var(--su-*)`). Hard-coded colors won't adapt.

### What's the difference between primary-600 and primary-default?

`primary-600` is a raw palette color. `primary-default` is a semantic token that can point to any color depending on the active theme.

## Resources

- [Theme System](./index.md)
- [Semantic Tokens](./tokens.md)
- [Accessibility](./accessibility.md)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)