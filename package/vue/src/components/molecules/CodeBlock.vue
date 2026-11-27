<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { CodeBlockProps } from '@/types'
import { useLocale } from '@/composables/useLocale'
import CopyButton from '../atoms/CopyButton.vue'

// ============================================================
// CODE BLOCK — bloc de code avec légende (titre, langage) et bouton
// de copie. Pas de coloration intégrée : le slot par défaut accepte
// un rendu déjà coloré (Shiki, Prism) ; `data-language` est posé
// pour un colorateur côté client.
// - <figure> légendée par <figcaption> (premier enfant)
// - <pre> focalisable seulement quand il défile (clavier, WCAG 2.1.1)
// - numéros de ligne en CSS : ni lus ni copiés
// ============================================================

const props = withDefaults(defineProps<CodeBlockProps>(), {
  copyable: true,
  lineNumbers: false
})

defineSlots<{
  /** Code déjà coloré (remplace l'affichage de `code` ; la copie reste celle de `code`) */
  default?(): any
}>()

const { t } = useLocale()
const copyText = computed(() => props.copyLabel ?? t('codeBlock.copy'))
const lines = computed(() => props.code.replace(/\n$/, '').split('\n'))
const hasCaption = computed(() => !!props.title || !!props.language)

// Le bloc ne devient focalisable (tabindex=0) que s'il déborde
const preRef = ref<HTMLElement>()
const scrollable = ref(false)
const measure = () => {
  const element = preRef.value
  if (!element) return
  scrollable.value = element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight
}

let observer: ResizeObserver | undefined
onMounted(() => {
  measure()
  if (typeof ResizeObserver !== 'undefined' && preRef.value) {
    observer = new ResizeObserver(measure)
    observer.observe(preRef.value)
  }
})
watch(() => props.code, () => requestAnimationFrame(measure))
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <figure
    :class="[
      'su-code-block',
      {
        'su-code-block--captioned': hasCaption,
        'su-code-block--copyable': copyable,
        'su-code-block--line-numbers': lineNumbers
      }
    ]"
    :data-language="language"
  >
    <figcaption
      v-if="hasCaption"
      class="su-code-block__caption"
    >
      <span
        v-if="title"
        class="su-code-block__title"
      >{{ title }}</span>
      <span
        v-if="language"
        class="su-code-block__language"
      >{{ language }}</span>
    </figcaption>

    <pre
      ref="preRef"
      class="su-code-block__pre"
      :style="maxHeight ? { maxBlockSize: maxHeight } : undefined"
      :tabindex="scrollable ? 0 : undefined"
    ><code
      :class="['su-code-block__code', language ? `language-${language}` : undefined]"
    ><slot><template v-if="lineNumbers"><span
      v-for="(line, index) in lines"
      :key="index"
      class="su-code-block__line"
    >{{ line }}{{ index < lines.length - 1 ? '\n' : '' }}</span></template><template v-else>{{ code }}</template></slot></code></pre>

    <CopyButton
      v-if="copyable"
      class="su-code-block__copy"
      :value="code"
      :label="copyText"
      icon-only
    />
  </figure>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// CODE BLOCK — surface en retrait, police à chasse fixe, défilement
// horizontal ; bouton de copie dans le coin de fin de ligne ; le
// code reste de gauche à droite en RTL
// ============================================================

.su-code-block {
  position: relative;
  margin: 0;
  overflow: hidden;
  border: 1px solid var(--su-border-subtle);
  border-radius: var(--su-radius-container);
  background-color: var(--su-bg-muted);
  font-size: var(--su-font-size-sm);

  // Sélecteurs imbriqués : résistent aux styles de contenu de la page (pre, code)
  .su-code-block__caption {
    display: flex;
    align-items: center;
    gap: $spacing-3;
    min-block-size: 2.5rem;
    padding-inline: $spacing-4;
    border-block-end: 1px solid var(--su-border-subtle);
  }

  &--copyable .su-code-block__caption {
    padding-inline-end: 3rem;
  }

  .su-code-block__title {
    min-inline-size: 0;
    overflow: hidden;
    color: var(--su-text-primary);
    font-family: var(--su-font-family-mono, ui-monospace, monospace);
    font-size: var(--su-font-size-xs);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .su-code-block__language {
    color: var(--su-text-tertiary);
    font-size: var(--su-font-size-xs);
    font-weight: var(--su-font-weight-medium);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .su-code-block__copy {
    position: absolute;
    inset-block-start: 0.25rem;
    inset-inline-end: 0.25rem;
  }

  .su-code-block__pre {
    margin: 0;
    padding: $spacing-4;
    overflow: auto;
    border: 0;
    border-radius: 0;
    background: transparent;
    color: var(--su-text-primary);
    font-family: var(--su-font-family-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
    font-size: inherit;
    line-height: 1.6;
    tab-size: 2;
    direction: ltr;
    text-align: start;
    scrollbar-width: thin;

    &:focus-visible {
      @include focus-ring;

      outline-offset: -2px;
    }
  }

  // Sans légende, le bouton est posé sur le code : la première ligne lui laisse la place
  &--copyable:not(.su-code-block--captioned) .su-code-block__pre {
    padding-inline-end: 3rem;
  }

  .su-code-block__code {
    padding: 0;
    border: 0;
    background: none;
    color: inherit;
    font: inherit;
    white-space: pre;
  }

  // Numéros en ::before : non sélectionnés, et texte alternatif vide
  // (`/ ""`) pour que les lecteurs d'écran ne les lisent pas
  &--line-numbers .su-code-block__code {
    counter-reset: su-code-line;
  }

  .su-code-block__line::before {
    display: inline-block;
    inline-size: 2.5ch;
    margin-inline-end: $spacing-4;
    color: var(--su-text-tertiary);
    text-align: end;
    content: counter(su-code-line);
    content: counter(su-code-line) / '';
    counter-increment: su-code-line;
    user-select: none;
  }
}
</style>
