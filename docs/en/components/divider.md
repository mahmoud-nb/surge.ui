# Divider

A horizontal or vertical separator line, with an optional text in the middle ("or", a date).

## Usage

### Horizontal and vertical

<div class="component-demo">
  <div class="demo-section">
    <div style="max-width: 22rem">
      <p style="margin: 0">Above</p>
      <SuDivider />
      <p style="margin: 0">Below</p>
    </div>
    <div style="display: flex; align-items: center; height: 1.5rem; margin-top: 1.5rem">
      <span>Profile</span>
      <SuDivider orientation="vertical" spacing="sm" />
      <span>Settings</span>
      <SuDivider orientation="vertical" spacing="sm" />
      <span>Sign out</span>
    </div>
  </div>
</div>

```vue
<SuDivider />
<SuDivider orientation="vertical" spacing="sm" />
```

### With text

<div class="component-demo">
  <div class="demo-section">
    <div style="max-width: 22rem">
      <SuDivider label="or" />
      <SuDivider label="Today" label-align="start" />
      <SuDivider label="End of list" variant="dashed" label-align="end" />
    </div>
  </div>
</div>

```vue
<SuDivider label="or" />
<SuDivider label="Today" label-align="start" />
<SuDivider label="End of list" variant="dashed" label-align="end" />
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientation |
| `variant` | `'solid' \| 'dashed'` | `'solid'` | Line style |
| `label` | `string` | - | Middle text (or default slot), horizontal only |
| `labelAlign` | `'start' \| 'center' \| 'end'` | `'center'` | Text position |
| `spacing` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Space around the line |
| `decorative` | `boolean` | `false` | Purely visual line, hidden from screen readers |

## Accessibility

- Without text: `role="separator"`, with `aria-orientation="vertical"` when vertical.
- With text: the text is read normally, the lines are decorative.
- `decorative`: `aria-hidden="true"`, for a line that does not separate real sections (e.g. in a toolbar).
