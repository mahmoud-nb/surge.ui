<script setup lang="ts">
import { computed } from 'vue'
import type { ProgressProps } from '@/types'

/**
 * SuProgress
 * Props:
 *  - modelValue: current value (determinate mode)
 *  - indeterminate: if true, show indeterminate animated bar (value unknown)
 *  - indeterminateLabel: accessible/visual label when indeterminate
 *  - formatValue: (value) => string formatter for label and aria-valuetext
 *  - color / backgroundColor : surcharges ponctuelles ; par défaut, les
 *    couleurs viennent du thème (primaire et fond doux)
 */

const props = withDefaults(defineProps<ProgressProps>(), {
  modelValue: 0,
  min: 0,
  max: 100,
  size: 'md',
  state: 'default',
  showLabel: false,
  formatValue: (value: number) => `${value}%`,
  indeterminate: false,
  indeterminateLabel: 'En cours…',
})

/* clamp determinate value between min and max */
const clampedValue = computed(() =>
  Math.min(Math.max(props.modelValue ?? 0, props.min!), props.max!)
)

const percentage = computed(() =>
  props.max! > props.min!
    ? ((clampedValue.value - props.min!) / (props.max! - props.min!)) * 100
    : 0
)

const formattedValue = computed(() => props.formatValue!(clampedValue.value))

// Une couleur personnalisée ne s'applique qu'à l'état par défaut :
// les états (erreur, succès…) gardent leur couleur sémantique
const barStyle = computed(() => ({
  width: props.indeterminate ? undefined : `${percentage.value}%`,
  backgroundColor: props.state === 'default' ? props.color : undefined,
}))

const trackStyle = computed(() => ({
  backgroundColor: props.backgroundColor,
}))
</script>

<template>
  <div
    class="su-progress"
    :class="[
      `su-progress--${size}`,
      `su-progress--${state}`,
      { 'su-progress--indeterminate': indeterminate },
    ]"
    role="progressbar"
    :aria-valuemin="!indeterminate ? min : undefined"
    :aria-valuemax="!indeterminate ? max : undefined"
    :aria-valuenow="!indeterminate ? clampedValue : undefined"
    :aria-valuetext="!indeterminate ? formattedValue : indeterminateLabel"
    :aria-busy="indeterminate ? 'true' : undefined"
  >
    <div
      class="su-progress__track"
      :style="trackStyle"
    >
      <div
        class="su-progress__bar"
        :style="barStyle"
        :class="{ 'su-progress__bar--indeterminate': indeterminate }"
      />
      <!-- Optional slot to overlay custom content -->
      <div
        v-if="$slots.default"
        class="su-progress__overlay"
      >
        <slot />
      </div>
    </div>

    <span
      v-if="showLabel && !indeterminate"
      class="su-progress__label"
    >
      {{ formattedValue }}
    </span>

    <span
      v-else-if="showLabel && indeterminate"
      class="su-progress__label"
    >
      {{ indeterminateLabel }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
@use '../../styles/abstracts' as *;

// ============================================================
// PROGRESS — piste douce, barre primaire arrondie, libellé en
// chiffres tabulaires ; mode indéterminé animé
// ============================================================

.su-progress {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;

  &--sm { --_su-progress-h: 0.25rem; }
  &--md { --_su-progress-h: 0.375rem; }
  &--lg { --_su-progress-h: 0.625rem; }

  &__track {
    position: relative;
    flex: 1;
    height: var(--_su-progress-h);
    overflow: hidden;
    border-radius: var(--su-radius-full);
    background-color: var(--su-bg-muted);
    // Liseré pour garder la piste visible sur fond clair
    box-shadow: inset 0 0 0 1px var(--su-border-alpha);
  }

  &__bar {
    height: 100%;
    border-radius: inherit;
    background-color: var(--su-primary-default);
    @include transition(width, background-color);
  }

  &--error .su-progress__bar { background-color: var(--su-state-error); }
  &--success .su-progress__bar { background-color: var(--su-state-success); }
  &--warning .su-progress__bar { background-color: var(--su-state-warning); }

  &__overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  &__label {
    min-width: 2.5rem;
    font-size: var(--su-font-size-sm);
    font-weight: var(--su-font-weight-medium);
    font-variant-numeric: tabular-nums;
    text-align: end;
    color: var(--su-text-secondary);
  }

  // ### Indéterminé : un segment glisse d'un bord à l'autre

  &--indeterminate .su-progress__bar {
    position: absolute;
    inset-block: 0;
    left: 0;
    width: 40%;
    animation: su-progress-slide 1.4s var(--su-ease-in-out) infinite;

    @include motion-reduce {
      width: 100%;
      opacity: 0.6;
      animation: none;
    }
  }
}

@keyframes su-progress-slide {
  from {
    translate: -100% 0;
  }

  to {
    translate: 250% 0;
  }
}
</style>
