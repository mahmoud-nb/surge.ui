<script setup lang="ts">
import { computed } from 'vue'
import type { ProgressProps } from '@/types'

/**
 * SuProgress
 * Props:
 *  - modelValue: current value (determinate mode)
 *  - indeterminate: if true, show indeterminate animated bar (value unknown)
 *  - indeterminateLabel: accessible/visual label when indeterminate (defaults to 'In progress…')
 *  - formatValue: (value) => string formatter for label and aria-valuetext
 */

const props = withDefaults(defineProps<ProgressProps>(), {
  modelValue: 0,
  min: 0,
  max: 100,
  size: 'md',
  color: '#000',
  backgroundColor: '#e0e0e0',
  state: 'default',
  showLabel: false,
  formatValue: (value: number) => `${value}%`,
  indeterminate: false,
  indeterminateLabel: 'In progress…',
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

const stateColors: Record<string, string> = {
  error: '#e53935',
  success: '#43a047',
  warning: '#fdd835',
}

const barStyle = computed(() => {
  if (props.indeterminate) {
    // In indeterminate mode we keep the bar color only (width handled by CSS animation)
    return {
      backgroundColor:
        props.state === 'default'
          ? props.color
          : stateColors[props.state] ?? props.color,
    }
  }

  return {
    width: `${percentage.value}%`,
    backgroundColor:
      props.state === 'default'
        ? props.color
        : stateColors[props.state] ?? props.color,
  }
})

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
    :aria-valuetext="!indeterminate ? formattedValue : undefined"
    :aria-busy="indeterminate ? 'true' : undefined"
    tabindex="0"
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
@use '../../styles/main' as *;

/* Sizes */
$su-progress-size-sm: 0.25rem;
$su-progress-size-md: 0.5rem;
$su-progress-size-lg: 1rem;

/* Base */
.su-progress {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  outline: none;

  &__track {
    flex: 1;
    border-radius: 999px;
    overflow: hidden;
    position: relative;
    min-height: $su-progress-size-sm;
    background-clip: padding-box;
  }

  &__bar {
    height: 100%;
    transition: width 0.3s ease;
    will-change: width, transform, left;
    position: relative;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none; /* overlay should not block focus */
  }

  &__label {
    font-size: 0.875rem;
    color: $gray-700;
    min-width: 2.5rem;
    text-align: right;
  }

  /* Sizes */
  &--sm .su-progress__track { height: $su-progress-size-sm; }
  &--md .su-progress__track { height: $su-progress-size-md; }
  &--lg .su-progress__track { height: $su-progress-size-lg; }

  /* States (fallback — inline styles take precedence) */
  &--error .su-progress__bar { background-color: $error-500; }
  &--success .su-progress__bar { background-color: $success-500; }
  &--warning .su-progress__bar { background-color: $warning-500; }

  &:focus-visible {
    outline: 2px solid $primary-600;
    outline-offset: 2px;
  }

  /* Indeterminate variations */
  &--indeterminate {
    .su-progress__bar {
      width: 30%; /* visual width of the animated block */
      position: absolute;
      left: -40%;
    }

    .su-progress__bar--indeterminate {
      /* sliding animation */
      animation: su-progress-slide 1.6s infinite linear;
    }

    /* reduce motion respect */
    @media (prefers-reduced-motion: reduce) {
      .su-progress__bar--indeterminate {
        animation: none;
        left: 0;
      }
    }
  }

  // Mode sombre
  @media (prefers-color-scheme: dark) {
    .su-progress__label {
      color: $gray-300;
    }

    .su-progress__bar {
      /* adjust default background for dark mode */
      // background-color: lighten($gray-700, 20%);
    }
  }
}

/* Keyframes: slide the block from left to right in the track */
@keyframes su-progress-slide {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(300%);
  }
}
</style>
