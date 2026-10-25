<script setup lang="ts">
import { computed } from 'vue'
import type { GridLayoutProps, GridLayoutView } from '@/types'
import { columnVars } from '@/utils/layout'

// Grille de cellules de même importance (produits, galeries, tableaux de
// bord), lues ligne par ligne. Colonnes par largeur de conteneur, ou
// nombre automatique selon une largeur minimale de cellule (auto-fill).
// En liste, les cellules sont empilées sur une colonne.

const props = withDefaults(defineProps<GridLayoutProps>(), {
  columns: () => ({ base: 1, sm: 2, lg: 3 }),
  minItemWidth: undefined,
  align: 'stretch',
  itemsTag: 'div',
  viewToggle: false,
  viewToggleLabel: 'Affichage',
  gridLabel: 'Grille',
  listLabel: 'Liste',
  gap: 'md'
})

/** Affichage : en grille, ou en liste */
const view = defineModel<GridLayoutView>('view', { default: 'grid' })

defineSlots<{
  /** Titre, nombre de résultats, filtres… (à côté du sélecteur grille / liste) */
  header?(): any
  /** Cellules (chaque enfant direct est une cellule) */
  default?(props: { view: GridLayoutView }): any
}>()

const viewOptions = computed<{ value: GridLayoutView, label: string }[]>(() => [
  { value: 'grid', label: props.gridLabel },
  { value: 'list', label: props.listLabel }
])

const classes = computed(() => [
  'su-grid-layout',
  `su-grid-layout--${view.value}`,
  `su-grid-layout--gap-${props.gap}`,
  `su-grid-layout--align-${props.align}`,
  { 'su-grid-layout--fluid': !!props.minItemWidth }
])

const styles = computed(() => props.minItemWidth
  ? { '--su-grid-layout-min-item-width': props.minItemWidth }
  : columnVars(props.columns, '--su-grid-layout-columns'))
</script>

<template>
  <div
    :class="classes"
    :style="styles"
  >
    <div
      v-if="$slots.header || viewToggle"
      class="su-grid-layout__header"
    >
      <div
        v-if="$slots.header"
        class="su-grid-layout__header-content"
      >
        <slot name="header" />
      </div>
      <div
        v-if="viewToggle"
        class="su-grid-layout__view-toggle"
        role="group"
        :aria-label="viewToggleLabel"
      >
        <button
          v-for="option in viewOptions"
          :key="option.value"
          type="button"
          class="su-grid-layout__view-option"
          :aria-pressed="view === option.value"
          @click="view = option.value"
        >
          {{ option.label }}
        </button>
      </div>
    </div>

    <component
      :is="itemsTag"
      class="su-grid-layout__items"
      :role="itemsTag === 'div' ? undefined : 'list'"
    >
      <slot :view="view" />
    </component>
  </div>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// GRILLE — cellules en colonnes selon la largeur du conteneur
// (ou auto-fill), empilées en mode liste
// ============================================================

.su-grid-layout {
  @include layout-container(su-grid-layout);

  display: flex;
  flex-direction: column;

  // Écart fixe : l'en-tête reste détaché des cellules, même avec gap="none"
  gap: $spacing-4;

  &__header {
    @include layout-region;

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: $spacing-3;
  }

  &__header-content {
    @include layout-region;

    flex: 1 1 auto;
  }

  // Sélecteur segmenté : le bouton enfoncé ressort sur un fond atténué
  &__view-toggle {
    display: inline-flex;
    flex-shrink: 0;
    gap: 2px;
    margin-inline-start: auto;
    padding: 2px;
    border: 1px solid var(--su-border-default);
    border-radius: var(--su-radius-control);
    background-color: var(--su-bg-muted);
  }

  &__view-option {
    @include button-base;
    @include control-size('sm');
    @include button-variant('ghost');

    border-radius: inner-radius(var(--su-radius-control), 3px);
    color: var(--su-text-secondary);

    &[aria-pressed='true'] {
      border-color: var(--su-border-input);
      background-color: var(--su-bg-control);
      box-shadow: var(--su-shadow-control);
      color: var(--su-text-primary);
    }
  }

  &__items {
    display: grid;
    grid-template-columns: repeat(var(--su-grid-layout-columns-base, 1), minmax(0, 1fr));
    gap: var(--su-layout-gap);
    margin: 0;
    padding: 0;
    list-style: none;

    > * {
      @include layout-region;
    }
  }

  // Largeur minimale : le navigateur choisit le nombre de colonnes
  &--fluid &__items {
    grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--su-grid-layout-min-item-width)), 1fr));
  }

  &--list &__items {
    grid-template-columns: minmax(0, 1fr);
  }

  @each $align in (start, center, end) {
    &--align-#{$align} &__items {
      align-items: $align;
    }
  }
}

@each $bp in (sm, md, lg, xl) {
  @include container-up($bp, su-grid-layout) {
    .su-grid-layout--grid:not(.su-grid-layout--fluid) .su-grid-layout__items {
      grid-template-columns: repeat(var(--su-grid-layout-columns-#{$bp}), minmax(0, 1fr));
    }
  }
}
</style>
