# CopyButton

Copies text to the clipboard. The label switches to "Copied" for a few seconds and the result is announced to screen readers.

## Usage

### Basic usage

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons">
      <SuCopyButton value="npm install @surgeui/vue" variant="outline" />
    </div>
  </div>
</div>

```vue
<SuCopyButton value="npm install @surgeui/vue" variant="outline" />
```

### Icon only

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons">
      <SuCopyButton value="sk_live_51Hx4f2a" icon-only label="Copy the key" />
    </div>
  </div>
</div>

```vue
<SuCopyButton value="sk_live_51Hx4f2a" icon-only label="Copy the key" />
```

With `icon-only`, the label stays the button name: name it after what it copies ("Copy the key", "Copy the link").

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Copied text |
| `label` | `string` | `'Copy'` | Button name |
| `copiedLabel` | `string` | `'Copied'` | Label shown after copying |
| `iconOnly` | `boolean` | `false` | Icon only (the name is still read) |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'ghost'` | Button variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'sm'` | Size |
| `timeout` | `number` | `2000` | How long the "copied" state lasts (ms) |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `copy` | `string` | Successful copy |
| `error` | `unknown` | Copy failed (permission denied, browser) |

## Accessibility

- The button name does not change: a name change while focused is not read reliably.
- The result is announced through a live region ([useAnnouncer](/en/composables/useannouncer)): "Copied to clipboard", or "Could not copy" (assertive).
- The confirmation check mark is decorative; the visible label switches to "Copied".
