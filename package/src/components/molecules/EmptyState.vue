<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { EmptyStateProps } from '@/types'

// ============================================================
// EMPTY STATE — zone vide (liste sans résultat, premier usage,
// erreur de chargement) : icône, titre, explication et actions.
// Le titre est un vrai titre (h2 à h6) pour la navigation par titres.
// ============================================================

const props = withDefaults(defineProps<EmptyStateProps>(), {
  headingLevel: 3,
  size: 'md',
  bordered: false
})

const slots = useSlots()
const headingTag = computed(() => `h${props.headingLevel}`)
const hasMedia = computed(() => !!(props.icon || slots.media))

const classes = computed(() => [
  'su-empty-state',
  `su-empty-state--${props.size}`,
  { 'su-empty-state--bordered': props.bordered }
])
</script>

<template>
  <div :class="classes">
    <div
      v-if="hasMedia"
      class="su-empty-state__media"
      aria-hidden="true"
    >
      <slot name="media">
        <component
          :is="icon"
          class="su-empty-state__icon"
        />
      </slot>
    </div>

    <component
      :is="headingTag"
      v-if="title || $slots.title"
      class="su-empty-state__title"
    >
      <slot name="title">
        {{ title }}
      </slot>
    </component>

    <div
      v-if="description || $slots.description"
      class="su-empty-state__description"
    >
      <slot name="description">
        {{ description }}
      </slot>
    </div>

    <div
      v-if="$slots.default"
      class="su-empty-state__actions"
    >
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// EMPTY STATE — contenu centré, icône dans une pastille atténuée.
// Sélecteurs préfixés : la page hôte stylise souvent h2-h6.
// ============================================================

.su-empty-state {
  --_su-empty-media: 3rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  box-sizing: border-box;
  width: 100%;
  padding: 2rem 1.5rem;
  color: var(--su-text-primary);
  text-align: center;

  &--sm {
    --_su-empty-media: 2.5rem;

    padding: 1.25rem 1rem;
  }

  &--lg {
    --_su-empty-media: 3.5rem;

    gap: 0.75rem;
    padding: 3rem 2rem;
  }

  &--bordered {
    border: 1px dashed var(--su-border-strong);
    border-radius: var(--su-radius-container);
  }

  .su-empty-state__title {
    margin: 0;
    padding: 0;
    border: 0;
    letter-spacing: normal;
    font-size: var(--su-font-size-base);
    font-weight: var(--su-font-weight-semibold);
    line-height: var(--su-line-height-tight);
    color: var(--su-text-primary);
  }

  &--lg .su-empty-state__title {
    font-size: var(--su-font-size-lg);
  }
}

.su-empty-state__media {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--_su-empty-media);
  height: var(--_su-empty-media);
  margin-bottom: 0.25rem;
  border: 1px solid var(--su-border-alpha);
  border-radius: var(--su-radius-container);
  background-color: var(--su-bg-surface);
  box-shadow: var(--su-shadow-control);
  color: var(--su-text-tertiary);
}

.su-empty-state__icon {
  width: 50%;
  height: 50%;
}

.su-empty-state__description {
  max-width: 28rem;
  font-size: var(--su-font-size-sm);
  line-height: var(--su-line-height-normal);
  color: var(--su-text-tertiary);
}

.su-empty-state__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
}
</style>
