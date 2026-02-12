<script setup lang="ts">
import { computed } from 'vue'
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'
import type { LinkProps } from '@/types'

const props = withDefaults(defineProps<LinkProps>(), {
  variant: 'default',
  size: 'md',
  underline: 'hover',
  disabled: false,
  iconDisplay: 'left',
  external: false,
  tabIndex: 0
})

const emit = defineEmits<{
  click: [event: MouseEvent]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
}>()

// Détermination du type de lien (interne Vue Router vs externe)
const isRouterLink = computed(() => {
  return props.to !== undefined
})

const isExternalLink = computed(() => {
  console.log('isExternalLink:', props.external, props.href, props.target)
  return props.external || (props.href && (props.href.startsWith('http') || props.href.startsWith('//') || props.target === '_blank'))
})

const linkAttributes = computed(() => {
  const attrs: Record<string, any> = {}
  
  if (!isRouterLink.value) {
    attrs.href = props.href
    
    if (isExternalLink.value) {
      attrs.target = props.target || '_blank'
      attrs.rel = props.rel || 'noopener noreferrer'
    } else {
      if (props.target) attrs.target = props.target
      if (props.rel) attrs.rel = props.rel
    }
  }
  
  if (props.ariaLabel) attrs['aria-label'] = props.ariaLabel
  if (props.ariaDescribedBy) attrs['aria-describedby'] = props.ariaDescribedBy
  if (props.role) attrs['role'] = props.role
  if (props.disabled) {
    attrs['aria-disabled'] = 'true'
    attrs.tabindex = -1
  } else {
    attrs.tabindex = props.tabIndex
  }
  
  return attrs
})

// Classes CSS
const linkClasses = computed(() => [
  'su-link',
  `su-link--${props.variant}`,
  `su-link--${props.size}`,
  `su-link--underline-${props.underline}`,
  {
    'su-link--disabled': props.disabled,
    'su-link--external': isExternalLink.value,
    'su-link--block': props.block,
    'su-link--icon-only': props.icon && props.iconDisplay === 'only',
    'su-link--icon-top': props.icon && props.iconDisplay === 'top',
    'su-link--icon-right': props.icon && props.iconDisplay === 'right'
  }
])

// Détermine si le lien contient du texte
const hasText = computed(() => {
  return !(props.icon && props.iconDisplay === 'only')
})

// Gestionnaires d'événements
const handleClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault()
    return
  }
  emit('click', event)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    if (props.disabled) {
      event.preventDefault()
      return
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

// Validation pour les liens avec icône seule
if (props.icon && props.iconDisplay === 'only' && !props.ariaLabel) {
  console.warn('Link with icon and iconDisplay="only" should have an ariaLabel for accessibility')
}
</script>

<template>
  <component
    :is="isRouterLink ? 'router-link' : 'a'"
    :class="linkClasses"
    v-bind="isRouterLink ? { to: to, ...linkAttributes } : linkAttributes"
    @click="handleClick"
    @keydown="handleKeydown"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <!-- Icône -->
    <component 
      :is="icon" 
      v-if="icon" 
      class="su-link__icon"
      aria-hidden="true"
    />
    <!-- Contenu textuel -->
    <span
      v-if="hasText"
      class="su-link__content"
    >
      <slot />
    </span>

    <!-- Icône externe -->
    <ArrowTopRightOnSquareIcon 
      v-if="isExternalLink && hasText"
      class="su-link__icon"
      aria-hidden="true"
    />
  </component>
</template>

<style lang="scss">
@use '../../styles/main' as *;
@use '../../styles/foundations/colors' as *;

.su-link {
  $self: &;

  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-family: inherit;
  text-decoration: none;
  cursor: pointer;
  box-sizing: border-box;
  border-radius: var(--su-radius-sm);
  transition: all var(--su-duration-fast) cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &:focus-visible {
    outline: 2px solid var(--su-link-default);
    outline-offset: 2px;
    box-shadow: 0 0 0 4px rgb(37 99 235 / 20%);
  }

  // Support du mode de contraste élevé
  @media (prefers-contrast: high) {
    &:focus-visible {
      outline-width: 3px;
    }
  }

  // Support de la réduction des animations
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    
    &:hover:not(&--disabled) {
      transform: none;
    }
  }

  &--block {
    display: flex;
    width: 100%;

    #{$self}__content {
      flex: 1;
    }
  }

  &--icon-left {
    flex-direction: row;
  }
  
  &--icon-right {
    flex-direction: row-reverse;
  }

  &--icon-top {
    flex-direction: column;
  }

  &__icon {
    flex-shrink: 0;
  }

  // Tailles
  &--sm {
    font-size: var(--su-font-size-sm);
    line-height: var(--su-line-height-tight);
    padding: 0.125rem 0.25rem;
    
    .su-link__icon {
      width: 1rem;
      height: 1rem;
    }
    
    &.su-link--icon-only {
      padding: 0.25rem;
      width: 1.5rem;
      height: 1.5rem;
      justify-content: center;
    }
  }

  &--md {
    font-size: var(--su-font-size-base);
    line-height: var(--su-line-height-normal);
    padding: 0.25rem 0.375rem;
    
    .su-link__icon {
      width: 1.125rem;
      height: 1.125rem;
    }
    
    &.su-link--icon-only {
      padding: 0.375rem;
      width: 2rem;
      height: 2rem;
      justify-content: center;
    }
  }

  &--lg {
    font-size: var(--su-font-size-lg);
    line-height: var(--su-line-height-normal);
    padding: 0.375rem 0.5rem;
    
    .su-link__icon {
      width: 1.25rem;
      height: 1.25rem;
    }
    
    &.su-link--icon-only {
      padding: 0.5rem;
      width: 2.5rem;
      height: 2.5rem;
      justify-content: center;
    }
  }

  // Variantes
  &--default {
    color: var(--su-link-default);
    
    &:hover:not(&--disabled) {
      color: var(--su-link-hover);
    }

    &:active:not(&--disabled) {
      color: var(--su-link-active);
    }
  }

  &--primary {
    color: var(--su-link-default);
    font-weight: 600;
    
    &:hover:not(&--disabled) {
      color: var(--su-link-hover);
      background-color: var(--su-bg-selected);
    }

    &:active:not(&--disabled) {
      background-color: var(--su-bg-hover);
    }
  }

  &--secondary {
    color: var(--su-text-primary);
    
    &:hover:not(&--disabled) {
      color: var(--su-link-default);
      background-color: var(--su-bg-hover);
    }

    &:active:not(&--disabled) {
      background-color: var(--su-bg-active);
    }
  }

  &--muted {
    color: var(--su-text-secondary);
    
    &:hover:not(&--disabled) {
      color: var(--su-text-primary);
    }

    &:active:not(&--disabled) {
      color: var(--su-link-default);
    }
  }

  &--custom {
    color: var(--su-custom-link-color, var(--su-link-default));
    font-weight: 600;
    
    &:hover:not(&--disabled) {
      color: var(--su-custom-link-hover-color, var(--su-link-hover));
      background-color: var(--su-bg-selected);
    }

    &:active:not(&--disabled) {
      color: var(--su-custom-link-active-color, var(--su-link-default));
      background-color: var(--su-bg-hover);
    }
  }

  // Soulignement
  &--default-underline {
    text-decoration: none;
    
    &:hover:not(&--disabled) {
      text-decoration: underline;
    }
  }
  
  &--underline-always {
    text-decoration: underline;
  }

  &--underline-hover {
    text-decoration: none;
    
    &:hover:not(&--disabled) {
      text-decoration: underline;
    }
  }

  &--underline-never {
    text-decoration: none;
    
    &:hover:not(&--disabled) {
      text-decoration: none;
    }
  }

  // États
  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
    
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }

  &--external {
    .su-link__icon {
      opacity: 0.7;
      flex-shrink: 0;
      transition: opacity var(--su-duration-fast);
    }
  }
  
  // Ajustements pour les liens avec icônes seules
  &--icon-only {
    gap: 0;
    
    .su-link__icon {
      width: 1.25em;
      height: 1.25em;
    }
  }

  &__content {
    min-width: 0;
  }
}

// Mode sombre
@media (prefers-color-scheme: dark) {
  .su-link {
    &--default {
      color: var(--su-link-default);
      
      &:hover:not(&--disabled) {
        color: var(--su-link-hover);
      }
    }

    &--primary {
      color: var(--su-link-default);
      
      &:hover:not(&--disabled) {
        color: var(--su-link-hover);
        background-color: var(--su-bg-selected);
      }
    }

    &--secondary {
      color: var(--su-text-primary);
      
      &:hover:not(&--disabled) {
        color: var(--su-link-default);
        background-color: var(--su-bg-hover);
      }
    }

    &--muted {
      color: var(--su-text-secondary);
      
      &:hover:not(&--disabled) {
        color: var(--su-text-primary);
      }
    }
  }
}
</style>