# Panel

The `Panel` component provides a structured and accessible container to group semantically related content.  
It can be rendered as either a `<section>` or a `<div>`, and includes dedicated slots for the header, main content, and footer.

## ✨ Features

- Rendered as `<section>` or `<div>`
- Provides `head`, `default`, and `footer` slots
- Compatible with light and dark themes
- Supports RTL (Right-to-Left) languages
- Compliant with WCAG 2.1 AA accessibility standards
- Supports ARIA roles and accessible titles

## 🚀 Usage examples

### Basic example

<div class="component-demo">
  <SuPanel>
    <template #head>
      <SuHeading level="2">Main Information</SuHeading>
    </template>
    <p>This is the main content of the panel.</p>
    <template #footer>
      <button>Learn more</button>
    </template>
  </SuPanel>
</div>

```vue
<template>
  <SuPanel>
    <template #head>
      <SuHeading level="2">Main Information</SuHeading>
    </template>

    <p>This is the main content of the panel.</p>

    <template #footer>
      <button>Learn more</button>
    </template>
  </SuPanel>
</template>
```

## API

### Props

| Prop       | Type      | Default     | Description                                                            |
| ---------- | --------- | ----------- | ---------------------------------------------------------------------- |
| `as`       | `string`  | `'section'` | Defines the HTML tag used for the main container (`section` or `div`). |
| `outlined` | `boolean` | `false`     | Adds a border around the panel.                                        |
| `elevated` | `boolean` | `false`     | Adds a shadow for a raised visual effect.                              |
| `class`    | `string`  | —           | Additional CSS classes to apply.                                       |


### Slots

| Slot      | Description                                   |
| --------- | --------------------------------------------- |
| `head`    | Header content (usually a `Heading` or title) |
| `default` | Main content of the panel                     |
| `footer`  | Footer area (buttons, links, summary, etc.)   |

## Example with style options

<div class="component-demo">
<SuPanel outlined elevated>
  <template #head>
    <SuHeading level="3">Order Summary</SuHeading>
  </template>
  <p>Total amount: €85.90</p>
  <template #footer>
    <button>Confirm</button>
  </template>
</SuPanel>
</div>

```vue
<SuPanel outlined elevated>
  <template #head>
    <SuHeading level="3">Order Summary</SuHeading>
  </template>

  <p>Total amount: €85.90</p>

  <template #footer>
    <button>Confirm</button>
  </template>
</SuPanel>
```


## Best practices

- Use the `<section>` tag for semantically distinct blocks.
- Use the as="div" prop for purely visual or nested panels.
- The head slot should always include an accessible heading (Heading or equivalent).


## Accessibility attributes

| Attribute          | Role / Purpose                                           | Example                        |
| ------------------ | -------------------------------------------------------- | ------------------------------ |
| `role`             | Defines the purpose of the panel (`region`, `group`)     | `role="region"`                |
| `aria-labelledby`  | Links the panel to a visible title for screen readers    | `aria-labelledby="panelTitle"` |
| `aria-describedby` | Provides an optional description for the panel’s content | `aria-describedby="panelDesc"` |

## HTML validation attributes

| Attribute | Description                                        |
| --------- | -------------------------------------------------- |
| `id`      | Unique identifier for the section                  |
| `lang`    | Language of the content if different from the page |
| `dir`     | Text direction (`ltr`, `rtl`, or `auto`)           |


## Accessibility

The Panel component complies with WCAG 2.1 Level AA and follows W3C ARIA best practices.

**Accessibility features**

- Semantic roles (section, region) depending on context.
- Optional linkage to a title via aria-labelledby.
- Color contrast and spacing meet accessibility requirements.
- Touch targets respect the minimum 44×44px standard.

## Advanced usage examples

**Nested panels**

```vue
<SuPanel outlined>
  <template #head>
    <SuHeading level="2">Main Section</SuHeading>
  </template>

  <SuPanel as="div" outlined>
    <template #head>
      <SuHeading level="3">Subsection</SuHeading>
    </template>
    <p>Secondary content.</p>
  </SuPanel>
</SuPanel>
```

**Dynamic panel**

```vue
<SuPanel v-if="showPanel" elevated>
  <template #head>
    <SuHeading level="3">Notifications</SuHeading>
  </template>
  <ul>
    <li v-for="notif in notifications" :key="notif.id">
      {{ notif.message }}
    </li>
  </ul>
</SuPanel>
```