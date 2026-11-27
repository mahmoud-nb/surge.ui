<script setup lang="ts">
import { computed } from 'vue'
import type { SkeletonProps } from '@/types'

// ============================================================
// SKELETON — silhouette d'un contenu en cours de chargement.
// Purement décoratif (aria-hidden) : signaler le chargement sur le
// conteneur (aria-busy="true") ou avec un SuSpinner.
// ============================================================

const props = withDefaults(defineProps<SkeletonProps>(), {
  variant: 'text',
  lines: 1,
  animated: true
})

const lineCount = computed(() => (props.variant === 'text' ? Math.max(1, Math.floor(props.lines)) : 1))

const classes = computed(() => [
  'su-skeleton',
  `su-skeleton--${props.variant}`,
  {
    'su-skeleton--animated': props.animated,
    [`su-skeleton--radius-${props.radius}`]: !!props.radius,
    'su-skeleton--multiline': lineCount.value > 1
  }
])

// Cercle : la largeur donne aussi la hauteur
const style = computed(() => ({
  width: props.width,
  height: props.height ?? (props.variant === 'circle' ? props.width : undefined)
}))
</script>

<template>
  <span
    v-if="lineCount > 1"
    :class="classes"
    :style="{ width }"
    aria-hidden="true"
  >
    <span
      v-for="line in lineCount"
      :key="line"
      class="su-skeleton__line"
      :style="{ height }"
    />
  </span>
  <span
    v-else
    :class="classes"
    :style="style"
    aria-hidden="true"
  />
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// SKELETON — teinte du texte à 8 % (suit le thème et le mode),
// pulsation lente supprimée avec prefers-reduced-motion
// ============================================================

@keyframes su-skeleton-pulse {
  50% {
    opacity: 0.5;
  }
}

.su-skeleton {
  --_su-skeleton-bg: #{with-alpha(text-primary, 8%)};

  display: block;
  box-sizing: border-box;
  border-radius: var(--su-radius-md);
  background-color: var(--_su-skeleton-bg);

  // Une ligne de texte : hauteur de la police courante
  &--text {
    width: 100%;
    height: 1em;
    border-radius: var(--su-radius-sm);
  }

  &--circle {
    flex-shrink: 0;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: var(--su-radius-full);
  }

  &--rect {
    width: 100%;
    height: 8rem;
  }

  &--multiline {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    height: auto;
    background: none;
  }

  @each $radius in ('none', 'sm', 'md', 'lg', 'xl', 'full') {
    &--radius-#{$radius},
    &--radius-#{$radius} .su-skeleton__line {
      border-radius: var(--su-radius-#{$radius});
    }
  }

  &--animated,
  &--animated .su-skeleton__line {
    animation: su-skeleton-pulse 2s var(--su-ease-in-out) infinite;

    @include motion-reduce {
      animation: none;
    }
  }

  // Bloc multiligne sans fond : ce sont ses lignes qui pulsent (en phase)
  &--multiline.su-skeleton--animated {
    animation: none;
  }

  @include high-contrast {
    --_su-skeleton-bg: #{with-alpha(text-primary, 20%)};
  }
}

.su-skeleton__line {
  display: block;
  height: 1em;
  border-radius: var(--su-radius-sm);
  background-color: var(--_su-skeleton-bg);

  &:last-child:not(:first-child) {
    width: 60%;
  }
}
</style>
