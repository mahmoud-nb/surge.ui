<script setup lang="ts">
import { computed } from 'vue';

export interface SpinnerProps {
  size?: number | string
  fill?: string
  label?: string
  hideLabel?: boolean
  type?: 'classic' | 'dots' | 'pulse' | 'bars' | 'modern'
  color?: string
  thickness?: number
  speed?: number
}

const props = withDefaults(defineProps<SpinnerProps>(), {
  size: 12,
  fill: 'none',
  label: 'Loading...',
  hideLabel: true,
  type: 'modern',
  color: 'currentColor',
  thickness: 2,
  speed: 1
})

const spinnerSize = computed(() => {
  if (typeof props.size === 'number') {
    return `${props.size}px`
  }
  return props.size
})

const animationDuration = computed(() => `${props.speed}s`)

// Styles conditionnels selon le type
const spinnerStyles = computed(() => {
  const baseStyles = {
    width: spinnerSize.value,
    height: spinnerSize.value,
    color: props.color,
    animationDuration: animationDuration.value
  }
  
  return baseStyles
})
</script>

<template>
  <span 
    class="su-spinner" 
    :class="`su-spinner--${type}`"
    role="status"
    aria-live="polite"
  >
    <svg 
      v-if="type === 'classic' || type === 'modern'"
      class="su-spinner__icon" 
      :style="spinnerStyles"
      viewBox="0 0 50 50"
      focusable="false"
    >
      <circle
        v-if="type === 'classic'"
        class="su-spinner__circle"
        cx="25"
        cy="25"
        r="20"
        :stroke="color"
        :stroke-width="thickness"
        :fill="fill"
        stroke-linecap="round"
      />
      
      <circle
        v-if="type === 'modern'"
        class="su-spinner__modern"
        cx="25"
        cy="25"
        r="20"
        :stroke="color"
        :stroke-width="thickness"
        :fill="fill"
        stroke-linecap="round"
        stroke-dasharray="30 100"
      />
    </svg>

    <!-- Spinner à points -->
    <div 
      v-if="type === 'dots'"
      class="su-spinner__dots"
      :style="spinnerStyles"
    >
      <span class="su-spinner__dot"></span>
      <span class="su-spinner__dot"></span>
      <span class="su-spinner__dot"></span>
    </div>

    <!-- Spinner pulse -->
    <div 
      v-if="type === 'pulse'"
      class="su-spinner__pulse"
      :style="{...spinnerStyles, backgroundColor: color}"
    ></div>

    <!-- Spinner bars -->
    <div 
      v-if="type === 'bars'"
      class="su-spinner__bars"
      :style="spinnerStyles"
    >
      <span 
        v-for="n in 3" 
        :key="n"
        class="su-spinner__bar"
        :style="{ backgroundColor: color }"
      ></span>
    </div>

    <span class="su-spinner__label" :class="{ 'sr-only': hideLabel }">{{ label }}</span>
  </span>
</template>

<style lang="scss" scoped>
.su-spinner {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5em;

  &__icon {
    flex-shrink: 0;
  }

  &__label {
    font-size: 0.875em;
    color: inherit;
    opacity: 0.8;
  }

  // Classic spinner (cercle simple)
  &--classic &__circle {
    animation: spin 1s linear infinite;
    stroke-dasharray: 150;
    stroke-dashoffset: 0;
    transform-origin: center;
  }

  // Modern spinner (avec effet de dash)
  &--modern &__modern {
    animation: modern-spin 1.5s ease-in-out infinite;
    transform-origin: center;
  }

  // Dots spinner
  &__dots {
    display: flex;
    gap: 0.25em;
    align-items: center;
    justify-content: center;
  }

  &__dot {
    width: 0.33em;
    height: 0.33em;
    border-radius: 50%;
    background-color: currentColor;
    animation: dots-bounce 1.4s ease-in-out infinite both;

    &:nth-child(1) { animation-delay: -0.32s; }
    &:nth-child(2) { animation-delay: -0.16s; }
  }

  // Pulse spinner
  &__pulse {
    border-radius: 50%;
    animation: pulse 1.2s ease-in-out infinite both;
    opacity: 0.7;
  }

  // Bars spinner
  &__bars {
    display: flex;
    gap: 0.15em;
    align-items: center;
    justify-content: center;
    width: 2em;
    height: 1em;
  }

  &__bar {
    width: 0.25em;
    height: 100%;
    animation: bars-wave 1.2s ease-in-out infinite both;
    border-radius: 1px;

    &:nth-child(1) { animation-delay: -0.4s; }
    &:nth-child(2) { animation-delay: -0.2s; }
  }

  // Animations
  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dashoffset: 150;
    }
    50% {
      stroke-dashoffset: 50;
    }
    100% {
      transform: rotate(360deg);
      stroke-dashoffset: 150;
    }
  }

  @keyframes modern-spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 10 150;
    }
    50% {
      stroke-dasharray: 80 150;
    }
    100% {
      transform: rotate(360deg);
      stroke-dasharray: 10 150;
    }
  }

  @keyframes dots-bounce {
    0%, 80%, 100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    50% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes bars-wave {
    0%, 40%, 100% {
      transform: scaleY(0.4);
    }
    20% {
      transform: scaleY(1);
    }
  }

  // Support de la réduction des animations
  @media (prefers-reduced-motion: reduce) {
    &__icon,
    &__dot,
    &__pulse,
    &__bar {
      animation-duration: 2s;
      animation-iteration-count: infinite;
    }
    
    &--classic &__circle,
    &--modern &__modern {
      animation: spin 3s linear infinite;
    }
  }

  // Variantes de taille responsive
  @container (max-width: 480px) {
    .su-spinner {
      gap: 0.25em;
      
      &__label {
        font-size: 0.75em;
      }
    }
  }
}
</style>