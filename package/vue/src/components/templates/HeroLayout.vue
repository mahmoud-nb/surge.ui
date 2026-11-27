<script setup lang="ts">
import { computed, useId } from 'vue'
import type { HeroLayoutProps } from '@/types'

// Page d'atterrissage : une accroche (surtitre, titre, description,
// appels à l'action, visuel) suivie des sections de la page.
// Le titre suit la largeur du conteneur (taille fluide).

const props = withDefaults(defineProps<HeroLayoutProps>(), {
  align: 'center',
  mediaPosition: 'bottom',
  fullHeight: false,
  titleTag: 'h1',
  gap: 'xl'
})

defineSlots<{
  /** Petit texte au-dessus du titre (badge, catégorie, annonce) */
  eyebrow?(): any
  /** Titre de l'accroche (rendu dans `titleTag`) */
  title?(): any
  /** Sous-titre ou argumentaire */
  description?(): any
  /** Boutons d'appel à l'action */
  actions?(): any
  /** Visuel : image, capture produit, vidéo */
  media?(): any
  /** Sections suivant l'accroche (fonctionnalités, preuves, tarifs…) */
  default?(): any
}>()

const titleId = `hero-title-${useId()}`

const classes = computed(() => [
  'su-hero-layout',
  `su-hero-layout--align-${props.align}`,
  `su-hero-layout--media-${props.mediaPosition}`,
  `su-hero-layout--gap-${props.gap}`,
  { 'su-hero-layout--full-height': props.fullHeight }
])
</script>

<template>
  <div :class="classes">
    <!-- L'accroche est une région nommée par son titre -->
    <section
      class="su-hero-layout__hero"
      :aria-labelledby="$slots.title ? titleId : undefined"
    >
      <div class="su-hero-layout__intro">
        <div
          v-if="$slots.eyebrow"
          class="su-hero-layout__eyebrow"
        >
          <slot name="eyebrow" />
        </div>

        <component
          :is="titleTag"
          v-if="$slots.title"
          :id="titleId"
          class="su-hero-layout__title"
        >
          <slot name="title" />
        </component>

        <div
          v-if="$slots.description"
          class="su-hero-layout__description"
        >
          <slot name="description" />
        </div>

        <div
          v-if="$slots.actions"
          class="su-hero-layout__actions"
        >
          <slot name="actions" />
        </div>
      </div>

      <div
        v-if="$slots.media"
        class="su-hero-layout__media"
      >
        <slot name="media" />
      </div>
    </section>

    <div
      v-if="$slots.default"
      class="su-hero-layout__sections"
    >
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// HERO — accroche (texte + visuel) puis sections ; titre fluide
// en unités de conteneur, visuel à côté du texte dès `lg`
// ============================================================

.su-hero-layout {
  @include layout-container(su-hero-layout);

  display: flex;
  flex-direction: column;
  gap: var(--su-layout-gap);

  &__hero {
    @include layout-region;

    display: grid;
    grid-template-columns: minmax(0, 1fr);
    align-items: center;
    gap: $spacing-8;
    padding-block: $spacing-12;
  }

  &--full-height &__hero {
    min-block-size: 100svh;
    align-content: center;
  }

  &__intro {
    @include layout-region;

    display: flex;
    flex-direction: column;
    gap: $spacing-4;
    max-inline-size: 48rem;
  }

  &--align-center &__intro {
    align-items: center;
    margin-inline: auto;
    text-align: center;
  }

  &--align-start &__intro {
    align-items: flex-start;
    text-align: start;
  }

  &__eyebrow {
    color: var(--su-text-secondary);
    font-size: var(--su-font-size-sm);
    font-weight: var(--su-font-weight-medium);
  }

  &__title {
    margin: 0;
    color: var(--su-text-primary);

    // 32px sur mobile → 60px en grand, selon la largeur du conteneur
    font-size: clamp(2rem, 1.5rem + 3cqi, 3.75rem);
    font-weight: var(--su-font-weight-bold);
    line-height: 1.1;
    letter-spacing: -0.02em;
    text-wrap: balance;
  }

  &__description {
    color: var(--su-text-secondary);
    font-size: var(--su-font-size-lg);
    line-height: 1.6;
    text-wrap: pretty;

    > :first-child {
      margin-block-start: 0;
    }

    > :last-child {
      margin-block-end: 0;
    }
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-3;
    margin-block-start: $spacing-2;
  }

  &--align-center &__actions {
    justify-content: center;
  }

  &__media {
    @include layout-region;

    // Médias fluides : ils ne débordent jamais de leur zone
    :where(img, video, picture, svg, iframe) {
      display: block;
      max-inline-size: 100%;
      block-size: auto;
    }
  }

  &__sections {
    @include layout-region;

    display: flex;
    flex-direction: column;
    gap: var(--su-layout-gap);
  }
}

// Visuel à côté du texte : le texte s'aligne à gauche
@include container-up(lg, su-hero-layout) {
  .su-hero-layout--media-end .su-hero-layout__hero {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: $spacing-12;
  }

  .su-hero-layout--media-end .su-hero-layout__intro {
    align-items: flex-start;
    margin-inline: 0;
    text-align: start;
  }

  .su-hero-layout--media-end .su-hero-layout__actions {
    justify-content: flex-start;
  }
}
</style>
