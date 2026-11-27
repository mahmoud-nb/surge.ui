<script setup lang="ts">
import type { ProseProps } from '@/types'

// ============================================================
// PROSE — typographie d'un contenu rédigé (Markdown, CMS) : titres,
// paragraphes, listes, citations, code, tableaux, images.
// La classe `.su-prose` s'utilise aussi seule, sur un élément qui
// reçoit du HTML (v-html d'un contenu de confiance).
// Sélecteurs :where() : spécificité d'une seule classe, faciles à
// surcharger. Propriétés logiques : RTL sans réglage.
// ============================================================

withDefaults(defineProps<ProseProps>(), {
  as: 'div',
  size: 'md'
})
</script>

<template>
  <component
    :is="as"
    :class="['su-prose', `su-prose--${size}`]"
  >
    <slot />
  </component>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

.su-prose {
  --su-prose-mono: var(--su-font-family-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);

  color: var(--su-text-primary);
  font-size: var(--su-font-size-base);
  line-height: 1.75;
  overflow-wrap: break-word;

  &--sm {
    font-size: var(--su-font-size-sm);
    line-height: 1.7;
  }

  &--lg {
    font-size: var(--su-font-size-lg);
    line-height: 1.8;
  }

  // ### Rythme vertical

  :where(p, ul, ol, dl, blockquote, pre, table, figure, details) {
    margin-block: 0 1.25em;
  }

  > :where(:first-child) {
    margin-block-start: 0;
  }

  > :where(:last-child) {
    margin-block-end: 0;
  }

  // ### Titres

  :where(h1, h2, h3, h4, h5, h6) {
    margin-block: 2em 0.75em;
    color: var(--su-text-primary);
    font-weight: var(--su-font-weight-semibold);
    line-height: 1.3;
    letter-spacing: -0.01em;
  }

  :where(h1) {
    margin-block-start: 0;
    font-size: 2.25em;
    line-height: 1.15;
  }

  :where(h2) {
    font-size: 1.5em;
  }

  :where(h3) {
    font-size: 1.25em;
  }

  :where(h4) {
    font-size: 1.0625em;
  }

  :where(h5, h6) {
    font-size: 1em;
  }

  :where(h1, h2, h3, h4) + :where(*) {
    margin-block-start: 0;
  }

  // ### Texte

  :where(a) {
    color: var(--su-link-default);
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.2em;

    &:hover {
      color: var(--su-link-hover);
    }

    &:focus-visible {
      border-radius: 2px;

      @include focus-ring;
    }
  }

  :where(strong, b) {
    font-weight: var(--su-font-weight-semibold);
  }

  :where(mark) {
    padding-inline: 0.15em;
    border-radius: 2px;
    background-color: with-alpha(state-warning, 28%);
    color: inherit;
  }

  :where(small) {
    color: var(--su-text-secondary);
    font-size: 0.875em;
  }

  // ### Listes

  :where(ul, ol) {
    padding-inline-start: 1.5em;
  }

  :where(ul) {
    list-style-type: disc;
  }

  :where(ol) {
    list-style-type: decimal;
  }

  :where(li) {
    margin-block: 0.375em;
    padding-inline-start: 0.25em;
  }

  :where(li)::marker {
    color: var(--su-text-tertiary);
  }

  :where(li > ul, li > ol) {
    margin-block: 0.375em;
  }

  :where(dt) {
    margin-block-start: 1em;
    font-weight: var(--su-font-weight-semibold);
  }

  :where(dd) {
    margin-inline-start: 1.5em;
  }

  // ### Citations

  :where(blockquote) {
    margin-inline: 0;
    padding-inline-start: 1em;
    border-inline-start: 3px solid var(--su-border-default);
    color: var(--su-text-secondary);
  }

  // ### Code

  :where(code, kbd, samp) {
    font-family: var(--su-prose-mono);
    font-size: 0.875em;
  }

  :where(:not(pre) > code) {
    padding: 0.15em 0.35em;
    border: 1px solid var(--su-border-subtle);
    border-radius: var(--su-radius-sm);
    background-color: var(--su-bg-muted);
  }

  :where(kbd) {
    padding: 0.1em 0.4em;
    border: 1px solid var(--su-border-default);
    border-radius: var(--su-radius-sm);
    box-shadow: inset 0 -1px 0 var(--su-border-default);
  }

  :where(pre) {
    padding: 1em 1.25em;
    overflow-x: auto;
    border: 1px solid var(--su-border-subtle);
    border-radius: var(--su-radius-container);
    background-color: var(--su-bg-muted);
    font-size: 0.875em;
    line-height: 1.6;
    direction: ltr;
    text-align: start;
    scrollbar-width: thin;
  }

  :where(pre code) {
    padding: 0;
    border: 0;
    background: none;
    font-size: inherit;
  }

  // ### Tableaux

  :where(table) {
    inline-size: 100%;
    border-collapse: collapse;
    font-size: 0.875em;
    line-height: 1.5;
  }

  :where(th, td) {
    padding: 0.5em 0.75em;
    border-block-end: 1px solid var(--su-border-subtle);
    text-align: start;
    vertical-align: top;
  }

  :where(thead th) {
    border-block-end-color: var(--su-border-default);
    color: var(--su-text-primary);
    font-weight: var(--su-font-weight-semibold);
  }

  // ### Médias, séparateurs

  :where(img, video, svg) {
    max-inline-size: 100%;
    block-size: auto;
  }

  :where(img, video) {
    border-radius: var(--su-radius-control);
  }

  :where(figcaption) {
    margin-block-start: 0.5em;
    color: var(--su-text-secondary);
    font-size: 0.875em;
  }

  :where(hr) {
    margin-block: 2.5em;
    border: 0;
    border-block-start: 1px solid var(--su-border-subtle);
  }
}
</style>
