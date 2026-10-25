<script setup lang="ts">
import { computed } from 'vue'
import type { MagazineLayoutProps } from '@/types'

// Hiérarchie éditoriale : un article à la une, une colonne de titres
// secondaires, puis une grille d'articles.
// Mobile : tout est empilé. Dès `md` : à la une (2/3) + colonne (1/3).
// Grille : 1 colonne, 2 dès `sm`, `columns` dès `lg`.

const props = withDefaults(defineProps<MagazineLayoutProps>(), {
  columns: 3,
  gap: 'lg'
})

defineSlots<{
  /** Titre de la rubrique, filtres… */
  header?(): any
  /** Article à la une */
  featured?(): any
  /** Titres secondaires, « les plus lus »… */
  aside?(): any
  /** Articles de la grille (chaque enfant direct est une cellule) */
  default?(): any
}>()

const classes = computed(() => [
  'su-magazine-layout',
  `su-magazine-layout--gap-${props.gap}`
])
</script>

<template>
  <div
    :class="classes"
    :style="{ '--su-magazine-layout-columns': columns }"
  >
    <div class="su-magazine-layout__inner">
      <div
        v-if="$slots.header"
        class="su-magazine-layout__header"
      >
        <slot name="header" />
      </div>

      <div
        v-if="$slots.featured || $slots.aside"
        class="su-magazine-layout__top"
        :class="{ 'su-magazine-layout__top--with-aside': $slots.featured && $slots.aside }"
      >
        <div
          v-if="$slots.featured"
          class="su-magazine-layout__featured"
        >
          <slot name="featured" />
        </div>
        <div
          v-if="$slots.aside"
          class="su-magazine-layout__aside"
        >
          <slot name="aside" />
        </div>
      </div>

      <div
        v-if="$slots.default"
        class="su-magazine-layout__grid"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// MAGAZINE — à la une + colonne secondaire, puis grille
// d'articles ; colonnes selon la largeur du conteneur
// ============================================================

.su-magazine-layout {
  @include layout-container(su-magazine-layout);

  &__inner,
  &__top,
  &__grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--su-layout-gap);
  }

  &__header,
  &__featured,
  &__aside,
  &__grid > * {
    @include layout-region;
  }

  &__aside {
    display: flex;
    flex-direction: column;
    gap: var(--su-layout-gap);
  }
}

@include container-up(sm, su-magazine-layout) {
  .su-magazine-layout__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@include container-up(md, su-magazine-layout) {
  .su-magazine-layout__top--with-aside {
    grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  }
}

@include container-up(lg, su-magazine-layout) {
  .su-magazine-layout__grid {
    grid-template-columns: repeat(var(--su-magazine-layout-columns), minmax(0, 1fr));
  }
}
</style>
