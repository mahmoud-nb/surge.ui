# Kbd

A keyboard key or shortcut, to display in text, a tooltip or a menu.

## Usage

### Shortcut and single key

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons" style="align-items: center">
      <SuKbd :keys="['Ctrl', 'K']" />
      <SuKbd :keys="['⌘', '⇧', 'P']" separator="" />
      <SuKbd>Esc</SuKbd>
    </div>
    <p>Press <SuKbd :keys="['Ctrl', 'K']" /> to open search.</p>
  </div>
</div>

```vue
<SuKbd :keys="['Ctrl', 'K']" />
<SuKbd :keys="['⌘', '⇧', 'P']" separator="" />
<SuKbd>Esc</SuKbd>
```

### Sizes

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons" style="align-items: center">
      <SuKbd size="sm" :keys="['Ctrl', 'S']" />
      <SuKbd size="md" :keys="['Ctrl', 'S']" />
      <SuKbd size="lg" :keys="['Ctrl', 'S']" />
    </div>
  </div>
</div>

```vue
<SuKbd size="sm" :keys="['Ctrl', 'S']" />
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `keys` | `string[]` | - | Shortcut keys; otherwise the default slot |
| `separator` | `string` | `'+'` | Separator shown between keys |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |

## Accessibility

- Recommended HTML structure for a shortcut: `<kbd><kbd>Ctrl</kbd>+<kbd>K</kbd></kbd>`.
- The separator is read ("plus"): it is part of the shortcut.
- Symbols (⌘, ⇧) are poorly read by some screen readers: add text with [VisuallyHidden](/en/components/visuallyhidden) when needed.
