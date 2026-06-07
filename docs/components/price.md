# Price

Composant d'affichage de prix avec support multi-devises, variantes promotionnelles, et formatage accessible. Utilise le composable `usePrice` basé sur `Intl.NumberFormat`.

## Exemples d'utilisation

### Basique

<div class="component-demo">
  <div class="demo-section">
    <h4>Prix simple</h4>
    <div class="demo-buttons">
      <SuPrice :amount="29.99" />
    </div>
  </div>
</div>

```vue
<SuPrice :amount="29.99" />
```

### Tailles

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

### Variantes

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

### Prix barré (promotion)

<div class="component-demo">
  <div class="demo-section">
    <h4>Ancien prix barré + nouveau prix</h4>
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

### Prix promotionnel complet

<div class="component-demo">
  <div class="demo-section">
    <h4>Préfixe + barré + highlight + badge</h4>
    <div class="demo-buttons" style="align-items: baseline;">
      <SuPrice
        :amount="29.99"
        :originalAmount="49.99"
        :showOriginal="true"
        variant="highlight"
        size="lg"
      >
        <template #prefix>
          <span>Dès</span>
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
    <span>Dès</span>
  </template>
  <template #suffix>
    <SuBadge variant="error" size="sm">-40%</SuBadge>
  </template>
</SuPrice>
```

### Entier uniquement

<div class="component-demo">
  <div class="demo-section">
    <h4>Sans décimales</h4>
    <div class="demo-buttons" style="align-items: baseline;">
      <SuPrice :amount="1299.99" :integerOnly="true" size="lg" />
    </div>
  </div>
</div>

```vue
<SuPrice :amount="1299.99" :integerOnly="true" size="lg" />
```

### Décimales en exposant

<div class="component-demo">
  <div class="demo-section">
    <h4>Style e-commerce</h4>
    <div class="demo-buttons" style="align-items: baseline;">
      <SuPrice :amount="29.99" :superscriptDecimals="true" size="lg" />
      <SuPrice :amount="1299.99" :superscriptDecimals="true" size="lg" variant="highlight" />
    </div>
  </div>
</div>

```vue
<SuPrice :amount="29.99" :superscriptDecimals="true" size="lg" />
```

### Multi-devises

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

### Avec slots

<div class="component-demo">
  <div class="demo-section">
    <h4>Préfixe et suffixe</h4>
    <div class="demo-buttons-vertical" style="align-items: flex-start;">
      <SuPrice :amount="9.99" size="lg">
        <template #prefix><span>À partir de</span></template>
      </SuPrice>
      <SuPrice :amount="9.99" size="lg">
        <template #suffix><span>/mois</span></template>
      </SuPrice>
    </div>
  </div>
</div>

```vue
<SuPrice :amount="9.99" size="lg">
  <template #prefix><span>À partir de</span></template>
</SuPrice>

<SuPrice :amount="9.99" size="lg">
  <template #suffix><span>/mois</span></template>
</SuPrice>
```

### Composable usePrice

Le composable `usePrice` peut être utilisé indépendamment pour formater des prix dans vos composants :

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
  <p>Prix complet : {{ formatted }}</p>
  <p>Entier : {{ integerPart }}{{ currencySymbol }}</p>
</template>
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `amount` | `number` | — (requis) | Montant numérique à afficher |
| `originalAmount` | `number` | — | Montant original pour le prix barré |
| `currency` | `string` | `'EUR'` | Code devise ISO 4217 |
| `locale` | `string` | `'fr-FR'` | Locale BCP 47 |
| `variant` | `'default' \| 'highlight' \| 'muted'` | `'default'` | Variante visuelle |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille |
| `integerOnly` | `boolean` | `false` | Masquer la partie décimale |
| `showOriginal` | `boolean` | `false` | Afficher le prix original barré |
| `currencyDisplay` | `'symbol' \| 'narrowSymbol' \| 'code' \| 'name'` | `'symbol'` | Format du symbole de devise |
| `currencyPosition` | `'auto' \| 'prefix' \| 'suffix'` | `'auto'` | Position du symbole |
| `formatValue` | `(amount: number) => string` | — | Formatter personnalisé |
| `superscriptDecimals` | `boolean` | `false` | Décimales en exposant |
| `ariaLabel` | `string` | — | Label accessible (auto-généré si omis) |

### Slots

| Slot | Props | Description |
|------|-------|-------------|
| `prefix` | — | Contenu avant le prix (ex: "À partir de") |
| `original` | `{ formatted: string, amount: number }` | Rendu personnalisé du prix barré |
| `suffix` | — | Contenu après le prix (ex: "/mois", Badge) |

### usePrice — Options

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `amount` | `number \| Ref<number> \| () => number` | — (requis) | Montant réactif |
| `currency` | `string` | `'EUR'` | Code devise ISO 4217 |
| `locale` | `string` | `'fr-FR'` | Locale BCP 47 |
| `currencyDisplay` | `CurrencyDisplay` | `'symbol'` | Format du symbole |
| `minimumFractionDigits` | `number` | `2` | Chiffres décimaux min |
| `maximumFractionDigits` | `number` | `2` | Chiffres décimaux max |
| `formatValue` | `(amount, currency, locale) => string` | — | Formatter personnalisé |

### usePrice — Retour

| Propriété | Type | Description |
|-----------|------|-------------|
| `formatted` | `Readonly<Ref<string>>` | Prix formaté complet |
| `integerPart` | `Readonly<Ref<string>>` | Partie entière |
| `decimalPart` | `Readonly<Ref<string>>` | Partie décimale |
| `decimalSeparator` | `Readonly<Ref<string>>` | Séparateur décimal |
| `currencySymbol` | `Readonly<Ref<string>>` | Symbole de la devise |
| `isSymbolPrefix` | `Readonly<Ref<boolean>>` | true si symbole avant le montant |
| `ariaLabel` | `Readonly<Ref<string>>` | Texte accessible |
| `rawAmount` | `Readonly<Ref<number>>` | Montant brut |

## Accessibilité

- **`role="text"`** sur l'élément racine pour grouper les morceaux visuels
- **`aria-label`** auto-généré avec le nom complet de la devise (ex: "29,99 euros")
- Tous les sous-éléments visuels marqués **`aria-hidden="true"`** pour éviter la lecture fragmentée
- Support **`prefers-contrast: high`** : épaisseur du trait barré augmentée
- Support **`prefers-reduced-motion: reduce`** : transitions désactivées
- **`font-variant-numeric: tabular-nums`** pour l'alignement en grille
