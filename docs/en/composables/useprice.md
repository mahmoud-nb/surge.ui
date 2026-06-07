# usePrice

Composable for reactive price and currency formatting. Based on `Intl.NumberFormat` for locale-aware formatting. Exposes individual price parts for flexible rendering.

## Basic usage

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
  <p>{{ formatted }}</p>
  <!-- "1 299,99 €" -->
</template>
```

## Examples

### Price parts

```vue
<script setup>
import { usePrice } from '@surgeui/ds-vue'

const price = usePrice({ amount: 1299.99 })
</script>

<template>
  <span class="price">
    <span class="integer">{{ price.integerPart.value }}</span>
    <span class="decimal">{{ price.decimalSeparator.value }}{{ price.decimalPart.value }}</span>
    <span class="currency">{{ price.currencySymbol.value }}</span>
  </span>
</template>
```

### Reactive amount

```vue
<script setup>
import { ref } from 'vue'
import { usePrice } from '@surgeui/ds-vue'

const amount = ref(49.99)
const { formatted } = usePrice({ amount })

// When amount.value changes, formatted updates automatically
function applyDiscount() {
  amount.value *= 0.8
}
</script>
```

### Multiple currencies

```vue
<script setup>
import { usePrice } from '@surgeui/ds-vue'

const eur = usePrice({ amount: 29.99, currency: 'EUR', locale: 'fr-FR' })
const usd = usePrice({ amount: 29.99, currency: 'USD', locale: 'en-US' })
const gbp = usePrice({ amount: 29.99, currency: 'GBP', locale: 'en-GB' })
const jpy = usePrice({ amount: 3000, currency: 'JPY', locale: 'ja-JP' })
</script>

<template>
  <ul>
    <li>{{ eur.formatted.value }}</li>  <!-- "29,99 €" -->
    <li>{{ usd.formatted.value }}</li>  <!-- "$29.99" -->
    <li>{{ gbp.formatted.value }}</li>  <!-- "£29.99" -->
    <li>{{ jpy.formatted.value }}</li>  <!-- "¥3,000" -->
  </ul>
</template>
```

### Custom formatter

```vue
<script setup>
import { usePrice } from '@surgeui/ds-vue'

const { formatted } = usePrice({
  amount: 0,
  formatValue: (amount, currency, locale) => {
    if (amount === 0) return 'Free'
    return `${amount} ${currency}`
  },
})
</script>
```

### Symbol position

```vue
<script setup>
import { usePrice } from '@surgeui/ds-vue'

const price = usePrice({ amount: 29.99, currency: 'EUR', locale: 'fr-FR' })

// price.isSymbolPrefix.value → false (EUR in fr-FR is a suffix)
// price.currencySymbol.value → "€"
</script>
```

### Accessibility

```vue
<script setup>
import { usePrice } from '@surgeui/ds-vue'

const price = usePrice({ amount: 1299.99 })

// price.ariaLabel.value → "1 299,99 euros"
// Uses Intl.NumberFormat with currencyDisplay: 'name'
</script>

<template>
  <span :aria-label="price.ariaLabel.value" role="text">
    {{ price.formatted.value }}
  </span>
</template>
```

## Price component

For a complete price display with visual variants, slots, and built-in accessibility, use the [`Price`](/en/components/price) component.

## API

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `amount` | `number \| Ref<number> \| () => number` | — (required) | Reactive amount |
| `currency` | `string` | `'EUR'` | ISO 4217 currency code |
| `locale` | `string` | `'fr-FR'` | BCP 47 locale |
| `currencyDisplay` | `'symbol' \| 'narrowSymbol' \| 'code' \| 'name'` | `'symbol'` | Symbol format |
| `minimumFractionDigits` | `number` | `2` | Minimum fraction digits |
| `maximumFractionDigits` | `number` | `2` | Maximum fraction digits |
| `formatValue` | `(amount, currency, locale) => string` | — | Custom formatter |

### Return

| Property | Type | Description |
|----------|------|-------------|
| `formatted` | `Readonly<Ref<string>>` | Full formatted price (e.g. "1,299.99 EUR") |
| `integerPart` | `Readonly<Ref<string>>` | Integer part (e.g. "1,299") |
| `decimalPart` | `Readonly<Ref<string>>` | Decimal part (e.g. "99") |
| `decimalSeparator` | `Readonly<Ref<string>>` | Decimal separator (e.g. ".") |
| `currencySymbol` | `Readonly<Ref<string>>` | Currency symbol (e.g. "$") |
| `isSymbolPrefix` | `Readonly<Ref<boolean>>` | true if symbol is before amount |
| `ariaLabel` | `Readonly<Ref<string>>` | Accessible text |
| `rawAmount` | `Readonly<Ref<number>>` | Raw numeric amount |

## Performance

- **Memoization**: `Intl.NumberFormat` instances are cached by key `(locale, currency, options)` to avoid costly recreations
- **SSR-safe**: `Intl.NumberFormat` is natively available in Node.js
- **Reactive**: amount can be a `Ref`, a getter, or a static number
