<script setup lang="ts">
import { computed } from 'vue'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
import type { PageHeaderProps } from '@/types'
import { useLocale } from '@/composables/useLocale'
import { useLinkComponent } from '@/composables/useLinkComponent'
import Breadcrumb from './Breadcrumb.vue'

// ============================================================
// PAGE HEADER — en-tête d'une page d'application : fil d'Ariane ou
// lien de retour, titre (h1 par défaut), description, actions.
// Les actions passent sous le titre quand la place manque (largeur
// du conteneur), sans dépendre de la taille de l'écran.
// ============================================================

const props = withDefaults(defineProps<PageHeaderProps>(), {
  level: 1
})

defineSlots<{
  /** Remplace le fil d'Ariane (et le lien de retour) */
  breadcrumb?(): any
  /** Contenu du titre (texte enrichi) */
  title?(): any
  /** Pastilles, statut… à côté du titre */
  meta?(): any
  description?(): any
  /** Boutons d'action de la page */
  actions?(): any
  /** Sous le bloc principal : onglets, filtres… */
  default?(): any
}>()

const { t } = useLocale()
const { linkFor } = useLinkComponent()

const backText = computed(() => props.backLabel ?? t('pageHeader.back'))
const backLink = computed(() => (props.back === undefined ? undefined : linkFor(props.back)))
const headingTag = computed(() => `h${props.level}`)
</script>

<template>
  <header class="su-page-header">
    <div
      v-if="$slots.breadcrumb || breadcrumb?.length || backLink"
      class="su-page-header__top"
    >
      <slot name="breadcrumb">
        <component
          :is="backLink.is"
          v-if="backLink"
          v-bind="backLink.attrs"
          class="su-page-header__back"
        >
          <ArrowLeftIcon
            class="su-page-header__back-icon su-flip-rtl"
            aria-hidden="true"
          />
          {{ backText }}
        </component>
        <Breadcrumb
          v-if="breadcrumb?.length"
          :items="breadcrumb"
          size="sm"
        />
      </slot>
    </div>

    <div class="su-page-header__main">
      <div class="su-page-header__heading">
        <div class="su-page-header__title-row">
          <component
            :is="headingTag"
            class="su-page-header__title"
          >
            <slot name="title">
              {{ title }}
            </slot>
          </component>
          <div
            v-if="$slots.meta"
            class="su-page-header__meta"
          >
            <slot name="meta" />
          </div>
        </div>

        <p
          v-if="$slots.description || description"
          class="su-page-header__description"
        >
          <slot name="description">
            {{ description }}
          </slot>
        </p>
      </div>

      <div
        v-if="$slots.actions"
        class="su-page-header__actions"
      >
        <slot name="actions" />
      </div>
    </div>

    <div
      v-if="$slots.default"
      class="su-page-header__extra"
    >
      <slot />
    </div>
  </header>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// PAGE HEADER — titre et actions sur une ligne ; les actions
// passent dessous quand la largeur manque (flex-wrap)
// ============================================================

.su-page-header {
  display: flex;
  flex-direction: column;
  gap: $spacing-3;
  min-inline-size: 0;

  .su-page-header__top {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: $spacing-2 $spacing-4;
  }

  .su-page-header__back {
    display: inline-flex;
    align-items: center;
    gap: $spacing-1;
    border-radius: var(--su-radius-sm);
    color: var(--su-text-secondary);
    font-size: var(--su-font-size-sm);
    font-weight: var(--su-font-weight-medium);
    text-decoration: none;

    @include transition(color);

    &:hover {
      color: var(--su-text-primary);
    }

    &:focus-visible {
      @include focus-ring;
    }
  }

  .su-page-header__back-icon {
    inline-size: 1rem;
    block-size: 1rem;
  }

  .su-page-header__main {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    gap: $spacing-4;
  }

  .su-page-header__heading {
    display: flex;
    flex: 1 1 18rem;
    flex-direction: column;
    gap: $spacing-1;
    min-inline-size: 0;
  }

  .su-page-header__title-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: $spacing-2 $spacing-3;
  }

  // Sélecteurs imbriqués : résistent aux styles de contenu de la page (h1, h2, p, a)
  .su-page-header__title {
    margin: 0;
    padding: 0;
    border: 0;
    color: var(--su-text-primary);
    font-size: var(--su-font-size-2xl);
    font-weight: var(--su-font-weight-semibold);
    line-height: 1.25;
    letter-spacing: -0.01em;
    overflow-wrap: anywhere;
  }

  .su-page-header__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: $spacing-2;
  }

  .su-page-header__description {
    margin: 0;
    max-inline-size: 65ch;
    color: var(--su-text-secondary);
    font-size: var(--su-font-size-sm);
    line-height: 1.6;
  }

  .su-page-header__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: $spacing-2;
  }
}
</style>
