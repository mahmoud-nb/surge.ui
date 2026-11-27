<script setup lang="ts">
import { computed } from 'vue'
import type { SingleColumnLayoutProps } from '@/types'

// Une seule colonne centrée, à la longueur de ligne confortable :
// articles, blogs, formulaires, pages mobiles.

const props = withDefaults(defineProps<SingleColumnLayoutProps>(), {
  width: 'prose',
  gap: 'lg',
  padded: true,
  as: 'div'
})

defineSlots<{
  /** Titre, chapeau, fil d'Ariane… */
  header?(): any
  /** Contenu principal */
  default?(): any
  /** Auteur, partage, navigation entre articles… */
  footer?(): any
}>()

const classes = computed(() => [
  'su-single-column-layout',
  `su-single-column-layout--${props.width}`,
  `su-single-column-layout--gap-${props.gap}`,
  { 'su-single-column-layout--padded': props.padded }
])
</script>

<template>
  <component
    :is="as"
    :class="classes"
  >
    <div class="su-single-column-layout__column">
      <div
        v-if="$slots.header"
        class="su-single-column-layout__header"
      >
        <slot name="header" />
      </div>

      <div class="su-single-column-layout__content">
        <slot />
      </div>

      <div
        v-if="$slots.footer"
        class="su-single-column-layout__footer"
      >
        <slot name="footer" />
      </div>
    </div>
  </component>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// SINGLE COLUMN — colonne centrée de largeur maximale, marges
// latérales qui s'élargissent avec le conteneur
// ============================================================

.su-single-column-layout {
  @include layout-container(su-single-column-layout);

  --_su-scl-width: 65ch;
  --_su-scl-pad: 0px;

  &--narrow {
    --_su-scl-width: 36rem;
  }

  &--medium {
    --_su-scl-width: 48rem;
  }

  &--wide {
    --_su-scl-width: 72rem;
  }

  &--full {
    --_su-scl-width: 100%;
  }

  &--padded {
    --_su-scl-pad: #{$spacing-4};
  }

  &__column {
    display: flex;
    flex-direction: column;
    gap: var(--su-layout-gap);
    box-sizing: border-box;
    inline-size: 100%;

    // La largeur de lecture ne compte pas les marges latérales
    max-inline-size: calc(var(--_su-scl-width) + 2 * var(--_su-scl-pad));
    margin-inline: auto;
    padding-inline: var(--_su-scl-pad);
  }

  &__header,
  &__content,
  &__footer {
    @include layout-region;
  }
}

.su-single-column-layout--padded .su-single-column-layout__column {
  @include container-up(md, su-single-column-layout) {
    --_su-scl-pad: #{$spacing-6};
  }
}
</style>
