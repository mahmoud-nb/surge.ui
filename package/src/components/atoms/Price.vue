<script setup lang="ts">
import { computed } from 'vue'
import type { PriceProps } from '@/types'
import { usePrice } from '@/composables/usePrice'

const props = withDefaults(defineProps<PriceProps>(), {
  currency: 'EUR',
  locale: 'fr-FR',
  variant: 'default',
  size: 'md',
  integerOnly: false,
  showOriginal: false,
  currencyDisplay: 'symbol',
  currencyPosition: 'auto',
  superscriptDecimals: false,
})

defineSlots<{
  /** Contenu avant le prix (ex: "À partir de", "Dès") */
  prefix?(): any
  /** Rendu personnalisé du prix barré original */
  original?(props: { formatted: string; amount: number }): any
  /** Contenu après le prix (ex: "/mois", "TTC", Badge) */
  suffix?(): any
}>()

// ========================================
// Composable — prix principal
// ========================================

const price = usePrice({
  amount: () => props.amount,
  currency: props.currency,
  locale: props.locale,
  currencyDisplay: props.currencyDisplay,
  formatValue: props.formatValue
    ? (amount: number) => props.formatValue!(amount)
    : undefined,
})

// ========================================
// Composable — prix original (barré)
// ========================================

const originalPrice = computed(() => {
  if (props.originalAmount == null) return null

  return usePrice({
    amount: props.originalAmount,
    currency: props.currency,
    locale: props.locale,
    currencyDisplay: props.currencyDisplay,
  })
})

// ========================================
// Position du symbole de devise
// ========================================

const showSymbolPrefix = computed(() => {
  if (props.currencyPosition === 'prefix') return true
  if (props.currencyPosition === 'suffix') return false
  return price.isSymbolPrefix.value
})

const showSymbolSuffix = computed(() => {
  if (props.currencyPosition === 'suffix') return true
  if (props.currencyPosition === 'prefix') return false
  return !price.isSymbolPrefix.value
})

// ========================================
// Affichage du prix original barré
// ========================================

const hasOriginal = computed(() =>
  props.showOriginal && props.originalAmount != null
)

const originalFormatted = computed(() =>
  originalPrice.value?.formatted.value ?? ''
)

// ========================================
// Aria-label accessible
// ========================================

const computedAriaLabel = computed(() => {
  // Override explicite
  if (props.ariaLabel) return props.ariaLabel

  let label = price.ariaLabel.value

  if (hasOriginal.value && originalPrice.value) {
    const originalLabel = originalPrice.value.ariaLabel.value
    label = `${label}, ancien prix : ${originalLabel}`
  }

  return label
})

// ========================================
// Classes CSS
// ========================================

const priceClasses = computed(() => [
  'su-price',
  `su-price--${props.variant}`,
  `su-price--${props.size}`,
  {
    'su-price--has-original': hasOriginal.value,
    'su-price--integer-only': props.integerOnly,
  },
])
</script>

<template>
  <span
    :class="priceClasses"
    :aria-label="computedAriaLabel"
    role="text"
  >
    <!-- Slot: préfixe (ex: "À partir de", "Dès") -->
    <span
      v-if="$slots.prefix"
      class="su-price__prefix"
    >
      <slot name="prefix" />
    </span>

    <!-- Prix original barré -->
    <span
      v-if="hasOriginal"
      class="su-price__original"
      aria-hidden="true"
    >
      <slot
        name="original"
        :formatted="originalFormatted"
        :amount="originalAmount!"
      >
        {{ originalFormatted }}
      </slot>
    </span>

    <!-- Prix principal -->
    <span
      class="su-price__value"
      aria-hidden="true"
    >
      <!-- Symbole devise (position préfixe) -->
      <span
        v-if="showSymbolPrefix"
        class="su-price__currency"
      >
        {{ price.currencySymbol.value }}
      </span>

      <!-- Partie entière -->
      <span class="su-price__integer">
        {{ price.integerPart.value }}
      </span>

      <!-- Partie décimale -->
      <span
        v-if="!integerOnly"
        class="su-price__decimal"
        :class="{ 'su-price__decimal--sup': superscriptDecimals }"
      >
        {{ price.decimalSeparator.value }}{{ price.decimalPart.value }}
      </span>

      <!-- Symbole devise (position suffixe) -->
      <span
        v-if="showSymbolSuffix"
        class="su-price__currency"
      >
        {{ price.currencySymbol.value }}
      </span>
    </span>

    <!-- Slot: suffixe (ex: "/mois", "TTC", Badge) -->
    <span
      v-if="$slots.suffix"
      class="su-price__suffix"
    >
      <slot name="suffix" />
    </span>
  </span>
</template>

<style lang="scss" scoped>
@use '../../styles/main' as *;

.su-price {
  display: inline-flex;
  align-items: baseline;
  gap: 0.25rem;
  font-family: inherit;
  color: var(--su-text-primary);
  @include transition(color);

  // ========================================
  // Tailles
  // ========================================

  &--sm {
    .su-price__integer {
      font-size: 0.875rem;
      font-weight: 600;
    }

    .su-price__decimal,
    .su-price__currency {
      font-size: 0.75rem;
    }

    .su-price__original {
      font-size: 0.75rem;
    }

    .su-price__prefix,
    .su-price__suffix {
      font-size: 0.75rem;
    }
  }

  &--md {
    .su-price__integer {
      font-size: 1.25rem;
      font-weight: 700;
    }

    .su-price__decimal,
    .su-price__currency {
      font-size: 0.875rem;
    }

    .su-price__original {
      font-size: 0.875rem;
    }

    .su-price__prefix,
    .su-price__suffix {
      font-size: 0.875rem;
    }
  }

  &--lg {
    .su-price__integer {
      font-size: 1.875rem;
      font-weight: 700;
    }

    .su-price__decimal,
    .su-price__currency {
      font-size: 1.125rem;
    }

    .su-price__original {
      font-size: 1rem;
    }

    .su-price__prefix,
    .su-price__suffix {
      font-size: 1rem;
    }
  }

  // ========================================
  // Variantes
  // ========================================

  &--default {
    color: var(--su-text-primary);
  }

  &--highlight {
    color: var(--su-state-error);
  }

  &--muted {
    color: var(--su-text-tertiary);
  }

  // ========================================
  // Mode promotionnel (prix barré + nouveau prix)
  // ========================================

  &--has-original {
    .su-price__value {
      color: var(--su-state-error);
    }
  }

  // ========================================
  // Éléments
  // ========================================

  &__prefix {
    color: var(--su-text-secondary);
    margin-right: 0.125rem;
  }

  &__original {
    text-decoration: line-through;
    color: var(--su-text-tertiary);
    margin-right: 0.25rem;
    font-weight: 400;
  }

  &__value {
    display: inline-flex;
    align-items: baseline;
  }

  &__integer {
    font-variant-numeric: tabular-nums;
  }

  &__decimal {
    font-variant-numeric: tabular-nums;

    &--sup {
      font-size: 0.65em;
      vertical-align: super;
      line-height: 1;
    }
  }

  &__currency {
    font-weight: 400;
    margin: 0 0.125rem;
  }

  &__suffix {
    color: var(--su-text-secondary);
    margin-left: 0.125rem;
  }
}

// ========================================
// Contraste élevé
// ========================================

@media (prefers-contrast: high) {
  .su-price {
    &__original {
      text-decoration-thickness: 2px;
    }
  }
}

// ========================================
// Mouvement réduit
// ========================================

@media (prefers-reduced-motion: reduce) {
  .su-price {
    transition: none;
  }
}
</style>
