<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, useId } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import type { AccordionContext, AccordionItemProps } from '@/types';

const props = withDefaults(defineProps<AccordionItemProps>(), {
  open: false,
  disabled: false,
  level: 3
})

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const accordionContext = inject<AccordionContext | null>('accordion', null)

// ID stable généré une seule fois par instance de composant
const _generatedId = `su-accordion-item-${useId()}`
const uniqueId = computed(() => props.id || _generatedId)

const headerId = computed(() => `accordion-header-${uniqueId.value}`)
const panelId = computed(() => `panel-${uniqueId.value}`)

// Déterminer si on utilise le contexte Accordion ou le mode autonome
const isInAccordion = computed(() => !!accordionContext)

// Dans un Accordion « attaché », l'item perd son cadre propre
const isAttached = computed(() => accordionContext?.attached.value ?? false)

// Niveau de titre calculé (dans un accordéon, on incrémente le niveau)
const headingLevel = computed<string>(() => {
  if (isInAccordion.value) {
    return `h${Math.min(accordionContext!.level, 6)}`
  }
  return `h${props.level}`
})

// État ouvert calculé
const isOpen = computed({
  get() {
    if (isInAccordion.value) {
      return accordionContext!.isItemOpen(uniqueId.value)
    }
    return props.open
  },
  set(value: boolean) {
    if (isInAccordion.value) {
      accordionContext!.toggleItem(uniqueId.value, {
        id: uniqueId.value,
        title: props.title,
        content: props.content,
        disabled: props.disabled
      })
    } else {
      emit('update:open', value)
    }
  }
})

// Entrée et Espace déclenchent nativement le clic du <button>
const toggleItem = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
  }
}

// Enregistrement dans l'accordéon parent
onMounted(() => {
  if (isInAccordion.value) {
    accordionContext!.registerItem(uniqueId.value, () => props.disabled)
  }
})

onUnmounted(() => {
  if (isInAccordion.value) {
    accordionContext!.unregisterItem(uniqueId.value)
  }
})
</script>

<template>
  <div
    class="su-accordion-item"
    :class="{
      'su-accordion-item--attached': isAttached,
      'is-open': isOpen,
      'is-disabled': disabled
    }"
    :data-accordion-item="uniqueId"
  >
    <component
      :is="headingLevel"
      class="su-accordion-item__heading"
    >
      <button
        :id="headerId"
        class="su-accordion-item__header"
        type="button"
        :aria-expanded="isOpen"
        :aria-controls="panelId"
        :disabled="disabled"
        @click="toggleItem"
      >
        <slot
          name="header"
          :item="{ id: uniqueId, title, content, open: isOpen, disabled }"
        >
          <span class="su-accordion-item__label">{{ title }}</span>
        </slot>
        <ChevronDownIcon
          class="su-accordion-item__icon"
          aria-hidden="true"
        />
      </button>
    </component>

    <!-- Panneau toujours rendu : la hauteur s'anime (grid 0fr → 1fr) et
         visibility: hidden le retire du focus et des lecteurs d'écran -->
    <div
      :id="panelId"
      class="su-accordion-item__panel"
      role="region"
      :aria-labelledby="headerId"
    >
      <div class="su-accordion-item__panel-inner">
        <div class="su-accordion-item__panel-content">
          <slot :item="{ id: uniqueId, title, content, open: isOpen, disabled }">
            <p>{{ content }}</p>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../../styles/abstracts' as *;

// ============================================================
// ACCORDION ITEM — carte légère (ou ligne d'un groupe attaché),
// en-tête compact, ouverture animée en hauteur
// ============================================================

.su-accordion-item {
  box-sizing: border-box;
  overflow: hidden;
  border: 1px solid var(--su-border-alpha);
  border-radius: var(--su-radius-control);
  background-color: var(--su-bg-surface);
  background-clip: padding-box;
  color: var(--su-text-primary);
  box-shadow: var(--su-shadow-control);

  // Dans un groupe attaché : le cadre est porté par l'Accordion
  &--attached {
    border: 0;
    border-radius: 0;
    background-color: transparent;
    box-shadow: none;

    & + & {
      border-top: 1px solid var(--su-border-alpha);
    }
  }

  &.is-disabled {
    opacity: var(--su-opacity-disabled);
  }

  &__heading {
    margin: 0;
    font: inherit;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    box-sizing: border-box;
    width: 100%;
    min-height: var(--su-touch-target-min);
    padding: 0.75rem 1rem;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    font-size: var(--su-font-size-base);
    font-weight: var(--su-font-weight-medium);
    line-height: 1.25;
    text-align: start;
    cursor: pointer;
    outline: none;

    @include transition(background-color);

    @include up('sm') {
      font-size: var(--su-font-size-sm);
    }

    &:hover:not(:disabled) {
      background-color: var(--su-bg-accent);
    }

    // Anneau intérieur : le cadre de l'item masque ce qui dépasse
    &:focus-visible {
      @include focus-ring($offset: calc(var(--su-focus-ring-width) * -1));

      border-radius: inherit;
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  &__label {
    flex: 1;
    min-width: 0;
  }

  &__icon {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    opacity: 0.8;

    @include transition(rotate);

    // Enfant direct uniquement : un accordéon imbriqué garde ses propres chevrons
    .is-open > .su-accordion-item__heading & {
      rotate: 180deg;
    }
  }

  // Ouverture animée : la grille passe de 0fr à 1fr
  &__panel {
    display: grid;
    grid-template-rows: 0fr;
    visibility: hidden;
    transition:
      grid-template-rows var(--su-duration-normal) var(--su-ease-in-out),
      visibility 0s linear var(--su-duration-normal);

    .is-open > & {
      grid-template-rows: 1fr;
      visibility: visible;
      transition-delay: 0s;
    }
  }

  &__panel-inner {
    min-height: 0;
    overflow: hidden;
  }

  &__panel-content {
    padding: 0 1rem 1rem;
    color: var(--su-text-secondary);
    font-size: var(--su-font-size-base);
    line-height: var(--su-line-height-relaxed);

    @include up('sm') {
      font-size: var(--su-font-size-sm);
    }

    > :first-child {
      margin-top: 0;
    }

    > :last-child {
      margin-bottom: 0;
    }
  }

  @include high-contrast {
    &:not(.su-accordion-item--attached) {
      border-width: 2px;
    }

    .su-accordion-item__header:focus-visible {
      outline-width: 3px;
    }
  }
}
</style>
