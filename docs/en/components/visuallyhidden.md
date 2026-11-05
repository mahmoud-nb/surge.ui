# VisuallyHidden

Content read by screen readers but invisible on screen: an icon button label, extra context ("(opens in a new tab)"), a skip link.

## Usage

### Icon button label

<div class="component-demo">
  <div class="demo-section">
    <button type="button" style="display: inline-flex; padding: 0.5rem; border: 1px solid var(--su-border-alpha); border-radius: 8px">
      <TrashIcon style="width: 1rem; height: 1rem" aria-hidden="true" />
      <SuVisuallyHidden>Delete file</SuVisuallyHidden>
    </button>
  </div>
</div>

```vue
<button type="button">
  <TrashIcon aria-hidden="true" />
  <SuVisuallyHidden>Delete file</SuVisuallyHidden>
</button>
```

### Skip link

With `focusable`, the content shows up when it receives focus. Press `Tab` in the demo.

<div class="component-demo">
  <div class="demo-section">
    <SuVisuallyHidden as="a" href="#content-demo" focusable style="padding: 0.5rem 0.75rem; border-radius: 8px; background: var(--su-bg-surface-elevated); box-shadow: var(--su-shadow-popover)">
      Skip to main content
    </SuVisuallyHidden>
    <p id="content-demo">Page content.</p>
  </div>
</div>

```vue
<SuVisuallyHidden as="a" href="#main" focusable class="skip-link">
  Skip to main content
</SuVisuallyHidden>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `string` | `'span'` | Rendered element |
| `focusable` | `boolean` | `false` | Visible while the content (or one of its children) has focus |

## Accessibility

- Accessible hiding (`clip-path`, 1px size): the content stays in the accessibility tree, unlike `display: none`.
- For an icon button, `aria-label` on the button works too; `VisuallyHidden` keeps the text in the DOM (automatic translation, search).
