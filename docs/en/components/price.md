# Price

Price display component with multi-currency support, promotional variants, and accessible formatting. Uses the `usePrice` composable based on `Intl.NumberFormat`.

## Usage

### Basic

<div class="component-demo">
  <div class="demo-section">
    <h4>Simple price</h4>
    <div class="demo-buttons">
      <SuPrice :amount="29.99" />
    </div>
  </div>
</div>

```vue
<SuPrice :amount="29.99" />
```

### Sizes

<div class="component-demo">
  <div class="demo-section">
    <h4>sm / md / lg</h4>
    <div class="demo-buttons" style="align-items: baseline;">
      <SuPrice :amount="29.99" size="sm" />
      <SuPrice :amount="29.99" size="md" />
      <SuPrice :amount="29.99" size="lg" />
    </div>
  </div>
</div>

```vue
<SuPrice :amount="29.99" size="sm" />
<SuPrice :amount="29.99" size="md" />
<SuPrice :amount="29.99" size="lg" />
```

### Variants

<div class="component-demo">
  <div class="demo-section">
    <h4>default / highlight / muted</h4>
    <div class="demo-buttons" style="align-items: baseline;">
      <SuPrice :amount="29.99" variant="default" />
      <SuPrice :amount="29.99" variant="highlight" />
      <SuPrice :amount="29.99" variant="muted" />
    </div>
  </div>
</div>

```vue
<SuPrice :amount="29.99" variant="default" />
<SuPrice :amount="29.99" variant="highlight" />
<SuPrice :amount="29.99" variant="muted" />
```

### Strikethrough price (promotion)

<div class="component-demo">
  <div class="demo-section">
    <h4>Original price crossed out + new price</h4>
    <div class="demo-buttons" style="align-items: baseline;">
      <SuPrice :amount="29.99" :originalAmount="49.99" :showOriginal="true" size="lg" />
    </div>
  </div>
</div>

```vue
<SuPrice
  :amount="29.99"
  :originalAmount="49.99"
  :showOriginal="true"
  size="lg"
/>
```

### Full promotional pricing

<div class="component-demo">
  <div class="demo-section">
    <h4>Prefix + strikethrough + highlight + badge</h4>
    <div class="demo-buttons" style="align-items: baseline;">
      <SuPrice
        :amount="29.99"
        :originalAmount="49.99"
        :showOriginal="true"
        variant="highlight"
        size="lg"
      >
        <template #prefix>
          <span>From</span>
        </template>
        <template #suffix>
          <SuBadge variant="error" size="sm">-40%</SuBadge>
        </template>
      </SuPrice>
    </div>
  </div>
</div>

```vue
<SuPrice
  :amount="29.99"
  :originalAmount="49.99"
  :showOriginal="true"
  variant="highlight"
  size="lg"
>
  <template #prefix>
    <span>From</span>
  </template>
  <template #suffix>
    <SuBadge variant="error" size="sm">-40%</SuBadge>
  </template>
</SuPrice>
```

### Integer only

<div class="component-demo">
  <div class="demo-section">
    <h4>Without decimals</h4>
    <div class="demo-buttons" style="align-items: baseline;">
      <SuPrice :amount="1299.99" :integerOnly="true" size="lg" />
    </div>
  </div>
</div>

```vue
<SuPrice :amount="1299.99" :integerOnly="true" size="lg" />
```

### Superscript decimals

<div class="component-demo">
  <div class="demo-section">
    <h4>E-commerce style</h4>
    <div class="demo-buttons" style="align-items: baseline;">
      <SuPrice :amount="29.99" :superscriptDecimals="true" size="lg" />
      <SuPrice :amount="1299.99" :superscriptDecimals="true" size="lg" variant="highlight" />
    </div>
  </div>
</div>

```vue
<SuPrice :amount="29.99" :superscriptDecimals="true" size="lg" />
```

### Multiple currencies

<div class="component-demo">
  <div class="demo-section">
    <h4>EUR, USD, GBP, JPY</h4>
    <div class="demo-buttons-vertical" style="align-items: flex-start;">
      <SuPrice :amount="1299.99" currency="EUR" locale="fr-FR" />
      <SuPrice :amount="1299.99" currency="USD" locale="en-US" />
      <SuPrice :amount="1299.99" currency="GBP" locale="en-GB" />
      <SuPrice :amount="1299" currency="JPY" locale="ja-JP" />
    </div>
  </div>
</div>

```vue
<SuPrice :amount="1299.99" currency="EUR" locale="fr-FR" />
<SuPrice :amount="1299.99" currency="USD" locale="en-US" />
<SuPrice :amount="1299.99" currency="GBP" locale="en-GB" />
<SuPrice :amount="1299" currency="JPY" locale="ja-JP" />
```

### With slots

<div class="component-demo">
  <div class="demo-section">
    <h4>Prefix and suffix</h4>
    <div class="demo-buttons-vertical" style="align-items: flex-start;">
      <SuPrice :amount="9.99" size="lg">
        <template #prefix><span>Starting at</span></template>
      </SuPrice>
      <SuPrice :amount="9.99" size="lg">
        <template #suffix><span>/month</span></template>
      </SuPrice>
    </div>
  </div>
</div>

```vue
<SuPrice :amount="9.99" size="lg">
  <template #prefix><span>Starting at</span></template>
</SuPrice>

<SuPrice :amount="9.99" size="lg">
  <template #suffix><span>/month</span></template>
</SuPrice>
```

### usePrice composable

The `usePrice` composable can be used independently to format prices in your components:

```vue
<script setup>
import { usePrice } from '@surgeui/ds-vue'

const { formatted, integerPart, decimalPart, currencySymbol } = usePrice({
  amount: 1299.99,
  currency: 'EUR',
  locale: 'fr-FR',
})
</script>

<template>
  <p>Full price: {{ formatted }}</p>
  <p>Integer: {{ integerPart }}{{ currencySymbol }}</p>
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `amount` | `number` | — (required) | Numeric amount to display |
| `originalAmount` | `number` | — | Original amount for strikethrough |
| `currency` | `string` | `'EUR'` | ISO 4217 currency code |
| `locale` | `string` | `'fr-FR'` | BCP 47 locale |
| `variant` | `'default' \| 'highlight' \| 'muted'` | `'default'` | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `integerOnly` | `boolean` | `false` | Hide decimal part |
| `showOriginal` | `boolean` | `false` | Show strikethrough original price |
| `currencyDisplay` | `'symbol' \| 'narrowSymbol' \| 'code' \| 'name'` | `'symbol'` | Currency symbol format |
| `currencyPosition` | `'auto' \| 'prefix' \| 'suffix'` | `'auto'` | Symbol position |
| `formatValue` | `(amount: number) => string` | — | Custom formatter |
| `superscriptDecimals` | `boolean` | `false` | Superscript decimal display |
| `ariaLabel` | `string` | — | Accessible label (auto-generated if omitted) |

### Slots

| Slot | Props | Description |
|------|-------|-------------|
| `prefix` | — | Content before the price (e.g. "Starting at") |
| `original` | `{ formatted: string, amount: number }` | Custom rendering of strikethrough price |
| `suffix` | — | Content after the price (e.g. "/month", Badge) |

### usePrice — Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `amount` | `number \| Ref<number> \| () => number` | — (required) | Reactive amount |
| `currency` | `string` | `'EUR'` | ISO 4217 currency code |
| `locale` | `string` | `'fr-FR'` | BCP 47 locale |
| `currencyDisplay` | `CurrencyDisplay` | `'symbol'` | Symbol format |
| `minimumFractionDigits` | `number` | `2` | Minimum fraction digits |
| `maximumFractionDigits` | `number` | `2` | Maximum fraction digits |
| `formatValue` | `(amount, currency, locale) => string` | — | Custom formatter |

### usePrice — Return

| Property | Type | Description |
|----------|------|-------------|
| `formatted` | `Readonly<Ref<string>>` | Full formatted price |
| `integerPart` | `Readonly<Ref<string>>` | Integer part |
| `decimalPart` | `Readonly<Ref<string>>` | Decimal part |
| `decimalSeparator` | `Readonly<Ref<string>>` | Decimal separator |
| `currencySymbol` | `Readonly<Ref<string>>` | Currency symbol |
| `isSymbolPrefix` | `Readonly<Ref<boolean>>` | true if symbol is before amount |
| `ariaLabel` | `Readonly<Ref<string>>` | Accessible text |
| `rawAmount` | `Readonly<Ref<number>>` | Raw amount |

## Accessibility

- **`role="text"`** on the root element groups visual fragments for screen readers
- **`aria-label`** auto-generated with full currency name (e.g. "29.99 euros")
- All visual sub-elements marked **`aria-hidden="true"`** to prevent fragmented reading
- **`prefers-contrast: high`** support: thicker strikethrough line
- **`prefers-reduced-motion: reduce`** support: transitions disabled
- **`font-variant-numeric: tabular-nums`** for grid alignment
