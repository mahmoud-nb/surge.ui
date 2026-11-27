<script setup lang="ts">
import { computed } from 'vue'
import type { MasonryLayoutProps } from '@/types'
import { columnVars } from '@/utils/layout'

// Mur d'éléments de hauteurs variables (médias, cartes, citations)
// empilés en colonnes sans trous. Les éléments se lisent colonne par
// colonne : pour un ordre chronologique strict, préférer une grille.

const props = withDefaults(defineProps<MasonryLayoutProps>(), {
  columns: () => ({ base: 1, sm: 2, lg: 3 }),
  columnWidth: undefined,
  gap: 'md'
})

defineSlots<{
  /** Éléments du mur (chaque enfant direct est une tuile) */
  default?(): any
}>()

const classes = computed(() => [
  'su-masonry-layout',
  `su-masonry-layout--gap-${props.gap}`,
  { 'su-masonry-layout--fluid': !!props.columnWidth }
])

const styles = computed(() => props.columnWidth
  ? { '--su-masonry-column-width': props.columnWidth }
  : columnVars(props.columns, '--su-masonry-columns'))
</script>

<template>
  <div
    :class="classes"
    :style="styles"
  >
    <div class="su-masonry-layout__columns">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// MASONRY — colonnes CSS : chaque tuile garde sa hauteur et
// n'est jamais coupée entre deux colonnes
// ============================================================

.su-masonry-layout {
  @include layout-container(su-masonry-layout);

  &__columns {
    column-count: var(--su-masonry-columns-base, 1);
    column-gap: var(--su-layout-gap);

    > * {
      @include layout-region;

      display: block;
      inline-size: 100%;
      margin-block: 0 var(--su-layout-gap);
      break-inside: avoid;
    }
  }

  // Largeur idéale : le navigateur choisit le nombre de colonnes
  &--fluid &__columns {
    columns: var(--su-masonry-column-width) auto;
  }
}

@each $bp in (sm, md, lg, xl) {
  @include container-up($bp, su-masonry-layout) {
    .su-masonry-layout:not(.su-masonry-layout--fluid) .su-masonry-layout__columns {
      column-count: var(--su-masonry-columns-#{$bp});
    }
  }
}
</style>
