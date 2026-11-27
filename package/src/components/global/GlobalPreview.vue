<script setup lang="ts">
// ============================================================
// Gabarit des vitrines « Global » de Storybook : en-tête, puis les
// sections de la page.
//
// Thème, mode, sens de lecture et langue viennent de la barre d'outils
// de Storybook (décorateur de .storybook/preview.ts) : la page n'impose
// rien, sinon le bouton RTL ou le mode sombre seraient sans effet.
// ============================================================

withDefaults(defineProps<{
  /** Sur-titre (ex. « Global · 01 ») */
  eyebrow?: string
  /** Présentation de la page, sous le titre */
  description?: string
}>(), {
  eyebrow: 'SurgeUI · Global',
  description: undefined
})
</script>

<template>
  <div class="su-global-preview">
    <header class="su-global-preview__hero">
      <p class="su-global-preview__eyebrow">
        {{ eyebrow }}
      </p>
      <div class="su-global-preview__title">
        <slot name="head" />
      </div>
      <p
        v-if="description"
        class="su-global-preview__lead"
      >
        {{ description }}
      </p>
      <ul
        class="su-global-preview__controls"
        aria-label="Réglages de la barre d'outils"
      >
        <li>Theme</li>
        <li>Theme Mode</li>
        <li>Direction</li>
        <li>Langue</li>
      </ul>
    </header>

    <div class="su-global-preview__body">
      <slot />
    </div>

    <footer
      v-if="$slots.footer"
      class="su-global-preview__footer"
    >
      <slot name="footer" />
    </footer>
  </div>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// Non scopé : les règles de section s'appliquent au contenu des pages
// (fourni par Display, Actions et Form)
.su-global-preview {
  max-width: 1200px;
  margin-inline: auto;

  &__hero {
    position: relative;
    isolation: isolate;
    margin-bottom: $spacing-8;
    padding: $spacing-8 $spacing-6;
    overflow: hidden;
    border: 1px solid var(--su-border-alpha);
    border-radius: var(--su-radius-container);
    background: var(--su-bg-surface);
    box-shadow: var(--su-shadow-control);

    // Lueur d'accent discrète en haut à gauche (décorative)
    &::before {
      position: absolute;
      inset: 0;
      z-index: -1;
      background: radial-gradient(60% 80% at 0% 0%, with-alpha(primary-default, 12%), transparent 70%);
      content: '';
      pointer-events: none;
    }
  }

  &__eyebrow {
    margin: 0 0 $spacing-2;
    color: var(--su-primary-default);
    font-family: var(--su-font-family-mono, ui-monospace, monospace);
    font-size: var(--su-font-size-xs);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  &__title h2 {
    margin: 0;
    color: var(--su-text-primary);
    font-size: var(--su-font-size-3xl);
    font-weight: var(--su-font-weight-semibold);
    letter-spacing: -0.02em;
    line-height: 1.15;
  }

  &__lead {
    max-width: 62ch;
    margin: $spacing-3 0 0;
    color: var(--su-text-secondary);
    font-size: var(--su-font-size-base);
    line-height: 1.6;
  }

  // Rappel des réglages disponibles dans la barre d'outils
  &__controls {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-2;
    margin: $spacing-5 0 0;
    padding: 0;
    list-style: none;

    li {
      padding: 0.125rem 0.5rem;
      border: 1px solid var(--su-border-alpha);
      border-radius: var(--su-radius-full);
      background: var(--su-bg-canvas);
      color: var(--su-text-secondary);
      font-size: var(--su-font-size-xs);
    }
  }

  // Sections des pages : titre en sur-titre, séparées par un filet
  &__body .section {
    margin-bottom: $spacing-10;
    padding-top: $spacing-6;
    border-top: 1px solid var(--su-border-alpha);

    &:first-child {
      padding-top: 0;
      border-top: 0;
    }

    > h3 {
      margin: 0 0 $spacing-5;
      color: var(--su-text-primary);
      font-size: var(--su-font-size-lg);
      font-weight: var(--su-font-weight-semibold);
      letter-spacing: -0.01em;
    }
  }

  &__footer {
    margin-top: $spacing-8;
    color: var(--su-text-secondary);
    font-size: var(--su-font-size-sm);
  }
}
</style>
