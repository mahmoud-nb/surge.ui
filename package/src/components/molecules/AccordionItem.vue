<script setup lang="ts">
import { ref, computed, inject, onMounted, onUnmounted } from 'vue'
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

const accordionContext = inject<AccordionContext>('accordion')

// Génération d'un ID unique stable
const uniqueId = computed(() => {
  return props.id || `su-accordion-item-${Math.random().toString(36).slice(2, 10)}`
})

const headerId = computed(() => `accordion-header-${uniqueId.value}`)
const panelId = computed(() => `panel-${uniqueId.value}`)

// Déterminer si on utilise le contexte Accordion ou le mode autonome
const isInAccordion = computed(() => !!accordionContext)

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

const headerRef = ref<HTMLButtonElement>()

// Gestion du focus pour la navigation
const focus = () => {
  headerRef.value?.focus()
}

// Gestion complète du clavier
const handleKeydown = (event: KeyboardEvent) => {
  if (props.disabled) return

  const keys = {
    Space: () => {
      event.preventDefault()
      toggleItem()
    },
    Enter: () => {
      event.preventDefault()
      toggleItem()
    }
  }

  const action = keys[event.key as keyof typeof keys]
  if (action) {
    action()
  }
}

const toggleItem = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
  }
}

// Enregistrement dans l'accordéon parent
onMounted(() => {
  if (isInAccordion.value) {
    accordionContext!.registerItem(uniqueId.value, { focus })
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
        ref="headerRef"
        class="su-accordion-item__header"
        type="button"
        role="button"
        :aria-expanded="isOpen"
        :aria-controls="panelId"
        :aria-disabled="disabled"
        :disabled="disabled"
        @click="toggleItem"
        @keydown="handleKeydown"
      >
        <slot
          name="header"
          :item="{ id: uniqueId, title, content, open: isOpen, disabled }"
        >
          <span class="su-accordion-item__label">{{ title }}</span>
        </slot>
        <ChevronDownIcon 
          class="su-accordion-item__icon"
          :class="{ 'is-open': isOpen }"
          aria-hidden="true"
        />
      </button>
    </component>

    <div
      v-show="isOpen"
      :id="panelId"
      class="su-accordion-item__panel"
      role="region"
      :aria-labelledby="headerId"
      :hidden="!isOpen"
    >
      <div class="su-accordion-item__panel-content">
        <slot :item="{ id: uniqueId, title, content, open: isOpen, disabled }">
          <p>{{ content }}</p>
        </slot>
      </div>
    </div>
  </div>
</template>

<!-- Le style reste identique à la version précédente -->

<style lang="scss" scoped>
@use '../../styles2/core/mixins' as *;
@use '../../styles2/foundations/colors' as colors;
@use '../../styles2/foundations/spacing' as space;
@use '../../styles2/foundations/typography' as typo;

.su-accordion-item {
  border: 1px solid var(--su-gray-200);
  border-radius: space.$radius-md;
  background: var(--su-bg-surface);
  overflow: hidden;
  color: var(--su-text-primary);

  @include transition(border-color);

  &:focus-within {
    border-color: var(--su-primary-500);
    box-shadow: 0 0 0 3px rgb(var(--su-primary-500-rgb), 0.1);
  }

  &.is-open {
    border-color: var(--su-primary-300);
  }

  &.is-disabled {
    opacity: 0.6;
    background: var(--su-gray-100);
  }

  &__heading {
    margin: 0;
  }

  &__header {
    width: 100%;
    min-height: 2.75rem; // 44px WCAG minimum
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: space.$spacing-4 space.$spacing-6;
    background: var(--su-bg-surface);
    color: var(--su-text-primary);
    font-size: typo.$font-size-base;
    font-weight: typo.$font-weight-semibold;
    text-align: left;
    cursor: pointer;
    border: none;
    outline: none;

    @include transition(all);

    position: relative;

    &:focus-visible {
      @include focus-ring(var(--su-border-focus));

      background: var(--su-primary-50);
      z-index: 1;
    }

    &:disabled {
      cursor: not-allowed;
      background: var(--su-gray-100);
      color: var(--su-gray-500);
    }

    &:hover:not(:disabled) {
      background: var(--su-primary-50);
      color: var(--su-primary-700);
    }

    &:active:not(:disabled) {
      background: var(--su-primary-100);
      transform: translateY(1px);
    }

    &.keyboard-nav {
      outline: 2px solid var(--su-primary-500);
    }
  }

  &__label {
    flex: 1;
    padding-right: space.$spacing-4;
  }

  &__icon {
    width: 1.25rem;
    height: 1.25rem;
    color: var(--su-gray-600);

    @include transition(all);

    flex-shrink: 0;

    &.is-open {
      transform: rotate(180deg);
      color: var(--su-primary-600);
    }

    .su-accordion-item__header:hover & {
      color: var(--su-primary-600);
    }

    .su-accordion-item__header:disabled & {
      color: var(--su-gray-400);
    }
  }

  &__panel {
    background: var(--su-bg-surface);
    overflow: hidden;
    
    &[hidden] {
      display: none;
    }
  }

  &__panel-content {
    padding: space.$spacing-4 space.$spacing-6;
    color: var(--su-text-secondary);
    font-size: typo.$font-size-base;
    line-height: typo.$line-height-relaxed;
    animation: slide-down 0.3s ease-out;
    
    > *:first-child {
      margin-top: 0;
    }
    
    > *:last-child {
      margin-bottom: 0;
    }
  }
}

/* Animation */
@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 🌙 Mode sombre - Custom properties s'ajustent automatiquement */
@media (prefers-color-scheme: dark) {
  .su-accordion-item {
    background: var(--su-gray-800);
    border-color: var(--su-gray-700);
    color: var(--su-text-primary);

    &:focus-within {
      border-color: var(--su-primary-400);
      box-shadow: 0 0 0 3px rgb(var(--su-primary-400-rgb), 0.2);
    }

    &.is-open {
      border-color: var(--su-primary-500);
    }

    &.is-disabled {
      background: var(--su-gray-700);
    }

    &__header {
      background: var(--su-gray-800);
      color: var(--su-text-primary);

      &:focus-visible {
        background: var(--su-gray-700);
        outline-color: var(--su-border-focus);
      }

      &:disabled {
        background: var(--su-gray-700);
        color: var(--su-gray-500);
      }

      &:hover:not(:disabled) {
        background: var(--su-gray-700);
        color: var(--su-primary-300);
      }

      &:active:not(:disabled) {
        background: var(--su-gray-600);
      }
    }

    &__icon {
      color: var(--su-gray-400);

      &.is-open {
        color: var(--su-primary-400);
      }

      .su-accordion-item__header:hover & {
        color: var(--su-primary-400);
      }

      .su-accordion-item__header:disabled & {
        color: var(--su-gray-400);
      }
    }

    &__panel {
      background: var(--su-gray-900);
    }

    &__panel-content {
      color: var(--su-text-secondary);
    }
  }
}

/* Support pour les préférences de réduction de mouvement */
@media (prefers-reduced-motion: reduce) {
  .su-accordion-item {
    &__header,
    &__icon,
    &__panel-content {
      @include transition(none);

      animation: none;
    }
  }
}

/* Amélioration de la visibilité du focus pour le contraste élevé */
@media (prefers-contrast: high) {
  .su-accordion-item {
    &__header:focus-visible {
      outline: 3px solid CanvasText;
      outline-offset: -3px;
    }
  }
}
</style>