<script setup lang="ts">
import { ref, computed, inject, onMounted, onUnmounted } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'



// Interface du contexte Accordion
interface AccordionContext {
  multiple: boolean
  level: number
  isItemOpen: (id: string | number) => boolean
  toggleItem: (id: string | number, item: any) => void
  registerItem: (id: string | number, ref: any) => void
  unregisterItem: (id: string | number) => void
}

export interface AccordionItemProps {
  id?: string
  title?: string
  content?: string
  open?: boolean
  disabled?: boolean
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

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
        ref="headerRef"
        class="su-accordion-item__header"
        type="button"
        role="button"
        :aria-expanded="isOpen"
        :aria-controls="panelId"
        :aria-disabled="disabled"
        :id="headerId"
        :disabled="disabled"
        @click="toggleItem"
        @keydown="handleKeydown"
      >
        <slot name="header" :item="{ id: uniqueId, title, content, open: isOpen, disabled }">
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
      class="su-accordion-item__panel"
      role="region"
      :aria-labelledby="headerId"
      :id="panelId"
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
@use '../../styles/variables' as *;

.su-accordion-item {
  border: 1px solid $gray-200;
  border-radius: $border-radius-md;
  background: $gray-50;
  overflow: hidden;
  color: $text-primary;
  transition: border-color 0.2s ease;

  &:focus-within {
    border-color: $primary-500;
    box-shadow: 0 0 0 3px rgba($primary-500, 0.1);
  }

  &.is-open {
    border-color: $primary-300;
  }

  &.is-disabled {
    opacity: 0.6;
    background: $gray-100;
  }

  &__heading {
    margin: 0;
  }

  &__header {
    width: 100%;
    min-height: $min-touch-target;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $spacing-4 $spacing-6;
    background: white;
    color: $text-primary;
    font-size: $font-size-base;
    font-weight: 600;
    text-align: left;
    cursor: pointer;
    border: none;
    outline: none;
    transition: all 0.2s ease;
    position: relative;

    // Amélioration du focus visible
    &:focus-visible {
      outline: 3px solid $focus-ring-color;
      outline-offset: -2px;
      background: $primary-50;
      z-index: 1;
    }

    &:hover:not(:disabled) {
      background: $primary-50;
      color: $primary-700;
    }

    &:active:not(:disabled) {
      background: $primary-100;
      transform: translateY(1px);
    }

    &:disabled {
      cursor: not-allowed;
      background: $gray-100;
      color: $gray-500;
      
      .su-accordion-item__icon {
        color: $gray-400;
      }
    }

    // Indicateur pour les utilisateurs de clavier
    &.keyboard-nav {
      outline: 2px solid $primary-500;
    }
  }

  &__label {
    flex: 1;
    padding-right: $spacing-4;
  }

  &__icon {
    width: 1.25rem;
    height: 1.25rem;
    color: $gray-600;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    flex-shrink: 0;

    &.is-open {
      transform: rotate(180deg);
      color: $primary-600;
    }

    .su-accordion-item__header:hover & {
      color: $primary-600;
    }

    .su-accordion-item__header:disabled & {
      color: $gray-400;
    }
  }

  &__panel {
    background: $gray-50;
    overflow: hidden;
    
    &[hidden] {
      display: none;
    }
  }

  &__panel-content {
    padding: $spacing-4 $spacing-6;
    color: $text-secondary;
    font-size: $font-size-base;
    line-height: $line-height-relaxed;
    
    // Animation d'ouverture smooth
    animation: slideDown 0.3s ease-out;
    
    > *:first-child {
      margin-top: 0;
    }
    
    > *:last-child {
      margin-bottom: 0;
    }
  }
}

/* Animation */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 🌙 Mode sombre */
@media (prefers-color-scheme: dark) {
  .su-accordion-item {
    background: $gray-800;
    border-color: $gray-700;
    color: $text-primary-dark;

    &:focus-within {
      border-color: $primary-400;
      box-shadow: 0 0 0 3px rgba($primary-400, 0.2);
    }

    &.is-open {
      border-color: $primary-500;
    }

    &.is-disabled {
      background: $gray-700;
    }

    &__header {
      background: $gray-800;
      color: $text-primary-dark;

      &:focus-visible {
        background: $gray-700;
        outline-color: $primary-400;
      }

      &:hover:not(:disabled) {
        background: $gray-700;
        color: $primary-300;
      }

      &:active:not(:disabled) {
        background: $gray-600;
      }

      &:disabled {
        background: $gray-700;
        color: $gray-500;
      }
    }

    &__icon {
      color: $gray-400;

      &.is-open {
        color: $primary-400;
      }

      .su-accordion-item__header:hover & {
        color: $primary-400;
      }
    }

    &__panel {
      background: $gray-900;
    }

    &__panel-content {
      color: $text-secondary-dark;
    }
  }
}

/* Support pour les préférences de réduction de mouvement */
@media (prefers-reduced-motion: reduce) {
  .su-accordion-item {
    &__header,
    &__icon,
    &__panel-content {
      transition: none;
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