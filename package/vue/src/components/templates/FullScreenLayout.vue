<script setup lang="ts">
import { computed } from 'vue'
import type { FullScreenLayoutProps } from '@/types'

// Récit en plein écran : une idée par écran. Chaque enfant direct
// occupe la hauteur de la zone et le défilement s'aimante sur chacun.
// La zone défile au clavier (flèches, Page suivante) une fois focalisée.

const props = withDefaults(defineProps<FullScreenLayoutProps>(), {
  snap: 'proximity',
  height: '100svh',
  label: undefined
})

defineSlots<{
  /** Écrans successifs (chaque enfant direct, par ex. un <section>, est un écran) */
  default?(): any
}>()

const classes = computed(() => [
  'su-full-screen-layout',
  `su-full-screen-layout--snap-${props.snap}`
])
</script>

<template>
  <div
    :class="classes"
    :style="{ '--su-full-screen-height': height }"
    tabindex="0"
    :role="label ? 'region' : undefined"
    :aria-label="label"
  >
    <!-- Zone défilante focalisable : utilisable au clavier (WCAG 2.1.1) -->
    <slot />
  </div>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// FULL SCREEN — zone de défilement d'un écran de haut ; chaque
// enfant direct remplit la zone et sert de point d'aimantation
// ============================================================

.su-full-screen-layout {
  box-sizing: border-box;
  inline-size: 100%;
  block-size: var(--su-full-screen-height);
  overflow-y: auto;
  overscroll-behavior-y: contain;
  outline: none;

  &:focus-visible {
    @include focus-ring($offset: -2px);
  }

  @include motion-safe {
    scroll-behavior: smooth;
  }

  &--snap-mandatory {
    scroll-snap-type: y mandatory;
  }

  &--snap-proximity {
    scroll-snap-type: y proximity;
  }

  > * {
    box-sizing: border-box;

    // Au moins un écran ; un contenu plus long reste lisible en entier
    min-block-size: 100%;
    scroll-snap-align: start;

    // Un écran plus long que la zone se lit jusqu'au bout avant l'écran suivant
    scroll-snap-stop: normal;
  }
}
</style>
