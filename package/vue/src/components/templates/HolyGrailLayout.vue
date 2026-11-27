<script setup lang="ts">
import { computed, useId } from 'vue'
import type { HolyGrailLayoutProps } from '@/types'
import { useLocale } from '@/composables/useLocale'
import SkipLink from '../atoms/SkipLink.vue'

// Mise en page d'application : en-tête, navigation, contenu principal,
// colonne complémentaire et pied de page.
// Mobile : tout est empilé. Dès `md` : navigation | contenu (la colonne
// complémentaire passe sous le contenu). Dès `lg` : trois colonnes.

const props = withDefaults(defineProps<HolyGrailLayoutProps>(), {
  navWidth: '15rem',
  asideWidth: '16rem',
  stickyHeader: false,
  stickySidebars: false,
  stickyOffset: '0px',
  fullHeight: true,
  landmarks: true,
  skipLink: true,
  gap: 'lg'
})

// Textes par défaut : prop explicite, sinon locale courante
const { t } = useLocale()
const skipLinkText = computed(() => props.skipLinkLabel ?? t('holyGrailLayout.skipLink'))
const navLabelText = computed(() => props.navLabel ?? t('holyGrailLayout.nav'))
const asideLabelText = computed(() => props.asideLabel ?? t('holyGrailLayout.aside'))

const slots = defineSlots<{
  /** Logo, recherche, menu utilisateur… */
  header?(): any
  /** Navigation principale */
  nav?(): any
  /** Contenu principal */
  default?(): any
  /** Filtres, sommaire, contenu associé… */
  aside?(): any
  footer?(): any
}>()

// Cible du lien d'évitement (SkipLink lui donne le focus par programme)
const mainId = `holy-grail-main-${useId()}`

const tags = computed(() => props.landmarks
  ? { header: 'header', nav: 'nav', main: 'main', aside: 'aside', footer: 'footer' }
  : { header: 'div', nav: 'div', main: 'div', aside: 'div', footer: 'div' })

// Les slots ne sont pas réactifs : présence évaluée à chaque rendu
const classes = () => [
  'su-holy-grail-layout',
  `su-holy-grail-layout--gap-${props.gap}`,
  {
    'su-holy-grail-layout--has-nav': !!slots.nav,
    'su-holy-grail-layout--has-aside': !!slots.aside,
    'su-holy-grail-layout--sticky-header': props.stickyHeader,
    'su-holy-grail-layout--sticky-sidebars': props.stickySidebars,
    'su-holy-grail-layout--full-height': props.fullHeight
  }
]

const styles = computed(() => ({
  '--su-holy-grail-nav-width': props.navWidth,
  '--su-holy-grail-aside-width': props.asideWidth,
  '--su-holy-grail-sticky-offset': props.stickyOffset
}))
</script>

<template>
  <div
    :class="classes()"
    :style="styles"
  >
    <SkipLink
      v-if="landmarks && skipLink"
      class="su-holy-grail-layout__skip-link"
      :target="mainId"
      :label="skipLinkText"
    />

    <component
      :is="tags.header"
      v-if="$slots.header"
      class="su-holy-grail-layout__header"
    >
      <slot name="header" />
    </component>

    <div class="su-holy-grail-layout__body">
      <component
        :is="tags.nav"
        v-if="$slots.nav"
        class="su-holy-grail-layout__nav"
        :aria-label="landmarks ? navLabelText : undefined"
      >
        <slot name="nav" />
      </component>

      <component
        :is="tags.main"
        :id="mainId"
        class="su-holy-grail-layout__main"
        :tabindex="landmarks && skipLink ? -1 : undefined"
      >
        <slot />
      </component>

      <component
        :is="tags.aside"
        v-if="$slots.aside"
        class="su-holy-grail-layout__aside"
        :aria-label="landmarks ? asideLabelText : undefined"
      >
        <slot name="aside" />
      </component>
    </div>

    <component
      :is="tags.footer"
      v-if="$slots.footer"
      class="su-holy-grail-layout__footer"
    >
      <slot name="footer" />
    </component>
  </div>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// HOLY GRAIL — en-tête et pied pleine largeur ; navigation,
// contenu et colonne complémentaire qui passent en colonnes
// avec la largeur du conteneur (md : 2 colonnes, lg : 3)
// ============================================================

.su-holy-grail-layout {
  @include layout-container(su-holy-grail-layout);

  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--su-layout-gap);

  &--full-height {
    min-block-size: 100svh;
  }

  &--sticky-header &__header {
    position: sticky;
    inset-block-start: 0;
    z-index: var(--su-z-sticky);
    background-color: var(--su-bg-canvas);
  }

  &__body {
    display: grid;
    flex: 1 0 auto;
    grid-template-columns: minmax(0, 1fr);
    align-content: start;
    gap: var(--su-layout-gap);
  }

  &__header,
  &__nav,
  &__main,
  &__aside,
  &__footer {
    @include layout-region;
  }

  // Cible du lien d'évitement : pas d'anneau au focus programmatique
  &__main:focus {
    outline: none;
  }
}

@include container-up(md, su-holy-grail-layout) {
  .su-holy-grail-layout--sticky-sidebars {
    .su-holy-grail-layout__nav,
    .su-holy-grail-layout__aside {
      position: sticky;
      inset-block-start: var(--su-holy-grail-sticky-offset);
      align-self: start;
      max-block-size: calc(100svh - var(--su-holy-grail-sticky-offset));
      overflow-y: auto;
      overscroll-behavior: contain;
      scrollbar-width: thin;
    }
  }

  .su-holy-grail-layout--has-nav .su-holy-grail-layout__body {
    grid-template-columns: var(--su-holy-grail-nav-width) minmax(0, 1fr);
  }

  .su-holy-grail-layout--has-aside:not(.su-holy-grail-layout--has-nav) .su-holy-grail-layout__body {
    grid-template-columns: minmax(0, 1fr) var(--su-holy-grail-aside-width);
  }

  // Navigation + complément : le complément passe sous le contenu
  .su-holy-grail-layout--has-nav.su-holy-grail-layout--has-aside {
    .su-holy-grail-layout__nav {
      grid-row: span 2;
    }

    .su-holy-grail-layout__aside {
      grid-column: 2;
    }
  }
}

@include container-up(lg, su-holy-grail-layout) {
  .su-holy-grail-layout--has-nav.su-holy-grail-layout--has-aside {
    .su-holy-grail-layout__body {
      grid-template-columns:
        var(--su-holy-grail-nav-width)
        minmax(0, 1fr)
        var(--su-holy-grail-aside-width);
    }

    .su-holy-grail-layout__nav {
      grid-row: auto;
    }

    .su-holy-grail-layout__aside {
      grid-column: 3;
      grid-row: 1;
    }
  }
}
</style>
