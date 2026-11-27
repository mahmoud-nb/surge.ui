<script setup lang="ts">
import { computed } from 'vue'
import { ArrowTrendingDownIcon, ArrowTrendingUpIcon, MinusIcon } from '@heroicons/vue/24/outline'
import type { StatProps, StatTrend } from '@/types'
import { useLocale } from '@/composables/useLocale'
import { useLinkComponent } from '@/composables/useLinkComponent'
import Skeleton from '../atoms/Skeleton.vue'

// ============================================================
// STAT — carte d'indicateur : libellé, valeur, variation colorée,
// contexte, mini-graphique (slot), lien facultatif (carte entière).
// - Nombres formatés dans la langue courante (Intl.NumberFormat)
// - Sens de la variation lu (« En hausse ») : la couleur et la
//   flèche ne portent pas seules l'information (WCAG 1.4.1)
// - `invertTrend` : une baisse est une bonne nouvelle (coûts, délais)
// ============================================================

const props = withDefaults(defineProps<StatProps>(), {
  invertTrend: false,
  loading: false
})

defineSlots<{
  /** Contenu de la valeur (remplace la prop value) */
  value?(): any
  /** Mini-graphique (courbe, barres) */
  chart?(): any
  /** Bas de la carte (sans élément interactif si la carte est un lien) */
  footer?(): any
}>()

const { t, locale } = useLocale()

const formatNumber = (value: number, options?: Intl.NumberFormatOptions) => {
  try {
    return new Intl.NumberFormat(locale.value.code, options).format(value)
  } catch {
    return String(value)
  }
}

const formattedValue = computed(() =>
  typeof props.value === 'number' ? formatNumber(props.value, props.format) : props.value
)

const formattedDelta = computed(() => {
  if (props.delta === undefined || props.delta === '') return undefined
  if (typeof props.delta === 'string') return props.delta
  return formatNumber(props.delta, {
    style: 'percent',
    maximumFractionDigits: 1,
    signDisplay: 'exceptZero',
    ...props.deltaFormat
  })
})

const trendValue = computed<StatTrend>(() => {
  if (props.trend) return props.trend
  if (typeof props.delta === 'number') return props.delta > 0 ? 'up' : props.delta < 0 ? 'down' : 'neutral'
  if (typeof props.delta === 'string') {
    const text = props.delta.trim()
    if (text.startsWith('+')) return 'up'
    if (/^[-−]/.test(text)) return 'down'
  }
  return 'neutral'
})

// Couleur : bonne nouvelle (succès) ou mauvaise (erreur), selon le sens et invertTrend
const tone = computed(() => {
  if (trendValue.value === 'neutral') return 'neutral'
  return (trendValue.value === 'up') !== props.invertTrend ? 'positive' : 'negative'
})

const trendIcon = computed(() => ({ up: ArrowTrendingUpIcon, down: ArrowTrendingDownIcon, neutral: MinusIcon })[trendValue.value])
const trendText = computed(() => t(`stat.${trendValue.value}`))

// Carte entière en lien (RouterLink, linkComponent ou <a>)
const { linkFor } = useLinkComponent()
const root = computed<{ is: unknown; attrs: Record<string, unknown> }>(() => {
  if (props.to !== undefined) return linkFor(props.to)
  if (props.href) return { is: 'a', attrs: { href: props.href } }
  return { is: 'div', attrs: {} }
})
const isLink = computed(() => root.value.is !== 'div')
</script>

<template>
  <component
    :is="root.is"
    v-bind="root.attrs"
    :class="['su-stat', { 'su-stat--link': isLink }]"
    :aria-busy="loading ? 'true' : undefined"
  >
    <div class="su-stat__header">
      <span class="su-stat__label">{{ label }}</span>
      <component
        :is="icon"
        v-if="icon"
        class="su-stat__icon"
        aria-hidden="true"
      />
    </div>

    <div class="su-stat__body">
      <div class="su-stat__figures">
        <Skeleton
          v-if="loading"
          class="su-stat__skeleton"
          width="8rem"
          height="2rem"
        />
        <span
          v-else
          class="su-stat__value"
        >
          <slot name="value">{{ formattedValue }}</slot>
        </span>

        <span
          v-if="formattedDelta !== undefined && !loading"
          :class="['su-stat__delta', `su-stat__delta--${tone}`]"
        >
          <component
            :is="trendIcon"
            class="su-stat__trend-icon"
            aria-hidden="true"
          />
          <!-- Espace dans l'expression : le compilateur retire celle du texte -->
          <span class="sr-only">{{ `${trendText} ` }}</span>
          <bdi>{{ formattedDelta }}</bdi>
        </span>
        <span
          v-if="deltaLabel && !loading"
          class="su-stat__context"
        >{{ deltaLabel }}</span>
      </div>

      <div
        v-if="$slots.chart"
        class="su-stat__chart"
      >
        <slot name="chart" />
      </div>
    </div>

    <div
      v-if="$slots.footer"
      class="su-stat__footer"
    >
      <slot name="footer" />
    </div>
  </component>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// STAT — carte en surface ; valeur en chiffres tabulaires, variation
// en pastille douce (succès / erreur / neutre)
// ============================================================

.su-stat {
  display: flex;
  flex-direction: column;
  gap: $spacing-3;
  min-inline-size: 0;
  padding: $spacing-5;
  border: 1px solid var(--su-border-subtle);
  border-radius: var(--su-radius-container);
  background-color: var(--su-bg-surface);
  color: var(--su-text-primary);

  // Sélecteurs imbriqués : résistent aux styles de contenu de la page (a)
  .su-stat__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $spacing-2;
  }

  .su-stat__label {
    color: var(--su-text-secondary);
    font-size: var(--su-font-size-sm);
    font-weight: var(--su-font-weight-medium);
  }

  .su-stat__icon {
    flex-shrink: 0;
    inline-size: 1.25rem;
    block-size: 1.25rem;
    color: var(--su-text-tertiary);
  }

  .su-stat__body {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
    gap: $spacing-3;
  }

  .su-stat__figures {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: $spacing-1 $spacing-2;
    min-inline-size: 0;
  }

  .su-stat__value {
    font-size: var(--su-font-size-2xl);
    font-weight: var(--su-font-weight-semibold);
    font-variant-numeric: tabular-nums;
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  .su-stat__delta {
    display: inline-flex;
    align-items: center;
    gap: $spacing-1;
    padding: 0.125rem $spacing-2;
    border: 1px solid transparent;
    border-radius: var(--su-radius-full, 9999px);
    font-size: var(--su-font-size-xs);
    font-weight: var(--su-font-weight-semibold);
    font-variant-numeric: tabular-nums;

    &--positive {
      @include soft-variant(success);
    }

    &--negative {
      @include soft-variant(error);
    }

    &--neutral {
      border-color: var(--su-border-subtle);
      background-color: var(--su-bg-muted);
      color: var(--su-text-secondary);
    }
  }

  .su-stat__trend-icon {
    inline-size: 0.875rem;
    block-size: 0.875rem;
  }

  .su-stat__context {
    color: var(--su-text-tertiary);
    font-size: var(--su-font-size-xs);
  }

  .su-stat__chart {
    flex: 0 1 8rem;
    min-inline-size: 5rem;
    color: var(--su-primary-default);
  }

  .su-stat__footer {
    padding-block-start: $spacing-3;
    border-block-start: 1px solid var(--su-border-subtle);
    color: var(--su-text-secondary);
    font-size: var(--su-font-size-sm);
  }

  // ### Carte en lien

  &--link {
    text-decoration: none;
    cursor: pointer;

    @include transition(border-color, box-shadow);

    &:hover {
      border-color: var(--su-border-hover);
      box-shadow: var(--su-shadow-sm);
    }

    &:focus-visible {
      @include focus-ring;
    }
  }
}
</style>
