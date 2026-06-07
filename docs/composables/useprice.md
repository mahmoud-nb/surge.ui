# usePrice

Composable pour le formatage reactif des prix et devises. Base sur `Intl.NumberFormat` pour un formatage correct selon la locale. Expose les differentes parties du prix pour un rendu flexible.

## Utilisation basique

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

## Exemples

### Parties du prix

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

### Montant reactif

```vue
<script setup>
import { ref } from 'vue'
import { usePrice } from '@surgeui/ds-vue'

const amount = ref(49.99)
const { formatted } = usePrice({ amount })

// Quand amount.value change, formatted se met a jour automatiquement
function applyDiscount() {
  amount.value *= 0.8
}
</script>
```

### Multi-devises

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
    <li>{{ jpy.formatted.value }}</li>  <!-- "￥3,000" -->
  </ul>
</template>
```

### Format personnalise

```vue
<script setup>
import { usePrice } from '@surgeui/ds-vue'

const { formatted } = usePrice({
  amount: 0,
  formatValue: (amount, currency, locale) => {
    if (amount === 0) return 'Gratuit'
    return `${amount} ${currency}`
  },
})
</script>
```

### Position du symbole

```vue
<script setup>
import { usePrice } from '@surgeui/ds-vue'

const price = usePrice({ amount: 29.99, currency: 'EUR', locale: 'fr-FR' })

// price.isSymbolPrefix.value → false (EUR en fr-FR est en suffixe)
// price.currencySymbol.value → "€"
</script>
```

### Accessibilite

```vue
<script setup>
import { usePrice } from '@surgeui/ds-vue'

const price = usePrice({ amount: 1299.99 })

// price.ariaLabel.value → "1 299,99 euros"
// Utilise Intl.NumberFormat avec currencyDisplay: 'name'
</script>

<template>
  <span :aria-label="price.ariaLabel.value" role="text">
    {{ price.formatted.value }}
  </span>
</template>
```

## Composant Price

Pour un affichage de prix complet avec variantes visuelles, slots et accessibilite integree, utilisez le composant [`Price`](/components/price).

## API

### Options

| Option | Type | Defaut | Description |
|--------|------|--------|-------------|
| `amount` | `number \| Ref<number> \| () => number` | — (requis) | Montant reactif |
| `currency` | `string` | `'EUR'` | Code devise ISO 4217 |
| `locale` | `string` | `'fr-FR'` | Locale BCP 47 |
| `currencyDisplay` | `'symbol' \| 'narrowSymbol' \| 'code' \| 'name'` | `'symbol'` | Format du symbole |
| `minimumFractionDigits` | `number` | `2` | Chiffres decimaux min |
| `maximumFractionDigits` | `number` | `2` | Chiffres decimaux max |
| `formatValue` | `(amount, currency, locale) => string` | — | Formatter personnalise |

### Retour

| Propriete | Type | Description |
|-----------|------|-------------|
| `formatted` | `Readonly<Ref<string>>` | Prix formate complet (ex: "1 299,99 EUR") |
| `integerPart` | `Readonly<Ref<string>>` | Partie entiere (ex: "1 299") |
| `decimalPart` | `Readonly<Ref<string>>` | Partie decimale (ex: "99") |
| `decimalSeparator` | `Readonly<Ref<string>>` | Separateur decimal (ex: ",") |
| `currencySymbol` | `Readonly<Ref<string>>` | Symbole de la devise (ex: "EUR") |
| `isSymbolPrefix` | `Readonly<Ref<boolean>>` | true si symbole avant le montant |
| `ariaLabel` | `Readonly<Ref<string>>` | Texte accessible |
| `rawAmount` | `Readonly<Ref<number>>` | Montant brut |

## Performance

- **Memoisation** : les instances `Intl.NumberFormat` sont mises en cache par cle `(locale, currency, options)` pour eviter les recreations couteuses
- **SSR-safe** : `Intl.NumberFormat` est disponible nativement dans Node.js
- **Reactif** : le montant peut etre un `Ref`, un getter, ou un nombre statique
