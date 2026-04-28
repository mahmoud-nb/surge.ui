<script setup lang="ts">
import { computed } from 'vue'
import type { ButtonProps } from '@/types'
import Spinner from './Spinner.vue'

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  radius: 'md',
  disabled: false,
  loading: false,
  loadingLabel: 'Chargement en cours...',
  block: false,
  iconDisplay: 'left',
  tabIndex: 0
})

const emit = defineEmits<{
  click: [event: MouseEvent]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
}>()

const classes = computed(() => {
  return [
    'su-button',
    props.size && `su-button--${props.size}`,
    props.variant && `su-button--${props.variant}`,
    props.radius && `su-button--radius-${props.radius}`,
    {
      'su-button--disabled': props.disabled,
      'su-button--loading': props.loading,
      'su-button--block': props.block,
      'su-button--icon-only': props.icon && props.iconDisplay === 'only',
      'su-button--icon-right': props.icon && props.iconDisplay === 'right'
    }
  ]
})

// Détermine si le bouton contient du texte
const hasText = computed(() => {
  return !(props.icon && props.iconDisplay === 'only')
})

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) return
  emit('click', event)
}

const handleKeydown = (event: KeyboardEvent) => {
  // Support des touches Entrée et Espace pour l'accessibilité
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    if (!props.disabled && !props.loading) {
      emit('click', event as any)
    }
  }
  emit('keydown', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

// Calcul des attributs ARIA
const ariaAttributes = computed(() => {
  const attrs: Record<string, any> = {}
  
  if (props.ariaLabel) attrs['aria-label'] = props.ariaLabel
  if (props.ariaDescribedBy) attrs['aria-describedby'] = props.ariaDescribedBy
  if (props.ariaExpanded !== undefined) attrs['aria-expanded'] = props.ariaExpanded
  if (props.ariaPressed !== undefined) attrs['aria-pressed'] = props.ariaPressed
  if (props.role) attrs['role'] = props.role
  
  // États automatiques
  if (props.loading) {
    attrs['aria-busy'] = 'true'
    attrs['aria-live'] = 'polite'
  }
  
  if (props.disabled) {
    attrs['aria-disabled'] = 'true'
  }
  
  // Pour les boutons avec icône seule, s'assurer qu'il y a un label
  if (props.icon && props.iconDisplay === 'only' && !props.ariaLabel) {
    console.warn('Button with icon and iconDisplay="only" should have an ariaLabel for accessibility')
  }
  
  return attrs
})
</script>

<template>
  <button
    :class="classes"
    :disabled="disabled || loading"
    :tabindex="disabled ? -1 : tabIndex"
    v-bind="ariaAttributes"
    @click="handleClick"
    @keydown="handleKeydown"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <Spinner
      v-if="loading"
      :label="loadingLabel"
    />
    
    <template v-if="!loading">
      <!-- Icône -->
      <component 
        :is="icon" 
        v-if="icon" 
        class="su-button__icon"
        aria-hidden="true"
      />
      
      <!-- Contenu textuel -->
      <span
        v-if="hasText && $slots.default"
        class="su-button__content"
      >
        <slot />
      </span>
    </template>
  </button>
</template>

<style lang="scss">
@use '../../styles/main' as *;

.su-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: inherit;
  font-weight: 500;
  border: 1px solid transparent;
  border-radius: var(--su-radius-md);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  white-space: nowrap;
  user-select: none;
  position: relative;

  // Focus visible amélioré pour l'accessibilité
  &:focus-visible {
    outline: 2px solid var(--su-border-focus);
    outline-offset: 2px;
    box-shadow: 0 0 0 4px rgb(37 99 235 / 15%);
  }

  &:hover:not(&--disabled, &--loading) {
    transform: translateY(-1px);
  }

  &:active:not(&--disabled, &--loading) {
    transform: translateY(0);
  }

  // Radius
  @include use-border-radius;

  // Sizes
  &--sm {
    padding: 0.125rem 0.625rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    min-height: 2rem; // 32px minimum pour l'accessibilité
    
    &.su-button--icon-only {
      padding: 0.125rem;
      width: 2rem;
    }
  }

  &--md {
    padding: 0.625rem 1rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    min-height: 2.5rem; // 40px minimum pour l'accessibilité
    
    &.su-button--icon-only {
      padding: 0.625rem;
      width: 2.5rem;
    }
  }

  &--lg {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    line-height: 1.5rem;
    min-height: 3rem; // 48px minimum pour l'accessibilité
    
    &.su-button--icon-only {
      padding: 0.75rem;
      width: 3rem;
    }
  }

  // Variants
  &--primary {
    background-color: var(--su-primary-default);
    color: var(--su-primary-text);
    
    &:hover:not(&--disabled, &--loading) {
      background-color: var(--su-primary-hover);
      transform: translateY(-1px);
      box-shadow: var(--su-shadow-md);
    }

    &:active:not(&--disabled, &--loading) {
      transform: translateY(0);
      box-shadow: var(--su-shadow-sm);
    }
  }

  &--secondary {
    background-color: var(--su-secondary-default);
    color: var(--su-secondary-text);
    border-color: var(--su-border-default);

    &:hover:not(&--disabled, &--loading) {
      background-color: var(--su-secondary-hover);
      border-color: var(--su-border-hover);
      transform: translateY(-1px);
      box-shadow: var(--su-shadow-sm);
    }
  }

  &--outline {
    background-color: transparent;
    color: var(--su-primary-600);
    border-color: var(--su-primary-200);

    &:hover:not(&--disabled, &--loading) {
      background-color: var(--su-primary-50);
      border-color: var(--su-primary-300);
      transform: translateY(-1px);
    }
  }

  &--ghost {
    background-color: transparent;
    color: var(--su-primary-600);

    &:hover:not(&--disabled, &--loading) {
      background-color: var(--su-primary-50);
      transform: translateY(-1px);
    }
  }
  
  &--custom {
    background-color: var(--su-custom-button-bg, var(--su-primary-default));
    color: var(--su-custom-button-color, var(--su-primary-text));
    border: var(--su-custom-button-border, 1px solid transparent);
    
    &:hover:not(&--disabled, &--loading) {
      background-color: var(--su-custom-button-hover-bg, var(--su-primary-hover));
      transform: translateY(-1px);
      box-shadow: var(--su-custom-button-hover-shadow, var(--su-shadow-md));
    }

    &:active:not(&--disabled, &--loading) {
      transform: translateY(0);
      box-shadow: var(--su-shadow-sm);
    }
  }

  // States
  &--disabled {
    opacity: 0.6; // Amélioration du contraste
    cursor: not-allowed;
    
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }

  &--loading {
    cursor: wait;
    
    .su-button__content {
      opacity: 0.7;
    }
  }

  &--block {
    width: 100%;
  }
  
  // Direction de l'icône
  &--icon-right {
    flex-direction: row-reverse;
  }

  // Icon styles
  &__icon {
    width: 1em;
    height: 1em;
    flex-shrink: 0;
  }
  
  // Ajustements pour les boutons avec icônes seules
  &--icon-only {
    gap: 0;
    
    .su-button__icon {
      width: 1.25em;
      height: 1.25em;
    }
  }

    // Support du mode de contraste élevé
  @media (prefers-contrast: high) {
    border-width: 2px;
    
    &:focus-visible {
      outline-width: 3px;
    }
  }

  // Support de la réduction des animations
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    
    &:hover:not(&--disabled, &--loading) {
      transform: none;
    }
  }
}

// CSS custom properties now handle dark mode automatically
// No dark mode overrides needed - colors update automatically based on data-theme attribute
</style>