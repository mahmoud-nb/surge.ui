# ThemeToggle

Switches between light and dark modes, or picks light, dark or system. The component drives [useTheme](/en/composables/usetheme): the state is shared by the whole application and saved in the browser when `persist` is on.

## Usage

### Toggle button

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons">
      <SuThemeToggle />
    </div>
  </div>
</div>

```vue
<SuThemeToggle />
```

The button is named "Dark mode" and reports its state with `aria-pressed`: pressed in dark mode. From system mode, it switches to the opposite of the applied mode.

### Light, dark or system

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons">
      <SuThemeToggle variant="segmented" />
    </div>
  </div>
</div>

```vue
<SuThemeToggle variant="segmented" />
```

### Sizes

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons-vertical">
      <SuThemeToggle variant="segmented" size="sm" />
      <SuThemeToggle variant="segmented" size="lg" />
    </div>
  </div>
</div>

```vue
<SuThemeToggle variant="segmented" size="sm" />
<SuThemeToggle variant="segmented" size="lg" />
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'button' \| 'segmented'` | `'button'` | Toggle button, or three options |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `label` | `string` | `'Dark mode'` / `'Appearance'` | Name of the button, or of the group (`segmented` variant) |
| `lightLabel` | `string` | `'Light'` | Light option |
| `darkLabel` | `string` | `'Dark'` | Dark option |
| `systemLabel` | `string` | `'System'` | System option (follows `prefers-color-scheme`) |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `change` | `ThemeMode` | Chosen mode: `'light'`, `'dark'` or `'system'` |

## Accessibility

- `button` variant: toggle button named "Dark mode", state reported by `aria-pressed`; the icon (sun or moon) is decorative.
- `segmented` variant: group named "Appearance" (`role="group"`) of three `aria-pressed` buttons with visible labels.
- Server rendering: the saved preference is only read after mount, with no hydration mismatch.
