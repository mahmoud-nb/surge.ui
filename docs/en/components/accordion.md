# Accordion

The `Accordion` component allows you to display multiple collapsible content sections. Each section is managed by an `AccordionItem` sub-component, which contains a Heading.
## Usage

### Attached items

With `attached`, the items form a single block separated by dividers: a good fit for an FAQ or a settings panel.

<div class="component-demo">
  <div class="demo-section">
    <SuAccordion attached>
      <SuAccordionItem title="Shipping">
        <p>Ships within 2 business days.</p>
      </SuAccordionItem>
      <SuAccordionItem title="Returns">
        <p>Free returns for 30 days.</p>
      </SuAccordionItem>
      <SuAccordionItem title="Warranty">
        <p>Two years, parts and labour.</p>
      </SuAccordionItem>
    </SuAccordion>
  </div>
</div>

```vue
<SuAccordion attached>
  <SuAccordionItem title="Shipping">
    <p>Ships within 2 business days.</p>
  </SuAccordionItem>
  <SuAccordionItem title="Returns">
    <p>Free returns for 30 days.</p>
  </SuAccordionItem>
  <SuAccordionItem title="Warranty">
    <p>Two years, parts and labour.</p>
  </SuAccordionItem>
</SuAccordion>
```

## API

### Props

**Accordion**

| Prop       | Type                              | Default | Description                                                          |
| ---------- | --------------------------------- | ------- | -------------------------------------------------------------------- |
| `multiple` | `boolean`                         | `false` | When `true`, several panels can be open at the same time.            |
| `attached` | `boolean`                         | `false` | Groups the items in a single frame, separated by dividers (ignores `gap`). |
| `gap`      | `'sm' \| 'md' \| 'lg' \| 'none'` | `'md'`  | Spacing between separated items.                                     |

## Accessibility

- Arrow keys, Home and End move the focus between headers; Alt+Home opens every enabled item (`multiple` mode), Alt+End closes them all.
- Closed panels are hidden from the focus order and from screen readers.
