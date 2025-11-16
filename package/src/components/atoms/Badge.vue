<script setup lang="ts">
import { computed } from 'vue'
import type { BadgeProps } from '@/types'

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'default',
  size: 'md',
  radius: 'md',
  iconDisplay: 'left'
})

const slots = defineSlots<{
  default?(): any
}>()

// Détermine si le badge contient du texte
const hasText = computed(() => {
  return !(props.icon && props.iconDisplay === 'only') && slots.default
})

// Classes CSS
const badgeClasses = computed(() => [
  'su-badge',
  `su-badge--${props.variant}`,
  `su-badge--${props.size}`,
  `su-badge--radius-${props.radius}`,
  {
    'su-badge--icon-only': props.icon && props.iconDisplay === 'only',
    'su-badge--icon-right': props.icon && props.iconDisplay === 'right',
    'su-badge--has-custom-color': props.color || props.backgroundColor
  }
])

// Styles personnalisés
const customStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  if (props.color) {
    styles.color = props.color
  }
  
  if (props.backgroundColor) {
    styles.backgroundColor = props.backgroundColor
    styles.borderColor = props.backgroundColor
    if (!props.color) {
      // Calculer une couleur de texte contrastée
      styles.color = getContrastColor(props.backgroundColor)
    }
  }
  
  return styles
})

// Attributs ARIA
const ariaAttributes = computed(() => {
  const attrs: Record<string, any> = {}
  
  if (props.ariaLabel) attrs['aria-label'] = props.ariaLabel
  if (props.ariaDescribedBy) attrs['aria-describedby'] = props.ariaDescribedBy
  if (props.ariaHidden !== undefined) attrs['aria-hidden'] = props.ariaHidden
  if (props.role) attrs['role'] = props.role
  
  return attrs
})

// Fonction utilitaire pour calculer la couleur de contraste
const getContrastColor = (backgroundColor: string): string => {
  // Fonction simplifiée - dans un vrai projet, utiliser une librairie comme chroma-js
  const hex = backgroundColor.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 128 ? '#000000' : '#ffffff'
}

// Validation pour les badges avec icône seule
if (props.icon && props.iconDisplay === 'only' && !props.ariaLabel && !slots.default) {
  console.warn('Badge with icon and iconDisplay="only" should have an ariaLabel for accessibility')
}
</script>

<template>
  <span
    :class="badgeClasses"
    :style="customStyles"
    v-bind="ariaAttributes"
  >
    <!-- Icône -->
    <component 
      :is="icon" 
      v-if="icon" 
      class="su-badge__icon"
      aria-hidden="true"
    />
    
    <!-- Contenu textuel -->
    <span
      v-if="hasText"
      class="su-badge__content"
    >
      <slot />
    </span>
  </span>
</template>

<style lang="scss">
@use '../../styles/main' as *;

.su-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  font-family: inherit;
  font-weight: 500;
  white-space: nowrap;
  user-select: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  .su-badge__icon {
    flex-shrink: 0;
  }

  .su-badge__content {
    min-width: 0;
  }
  
  // Tailles
  &--sm {
    padding: 0.125rem 0.375rem;
    font-size: 0.75rem;
    line-height: 0.75rem;
    min-height: 0.75rem;
    
    .su-badge__icon {
      width: 0.75rem;
      height: 0.75rem;
    }
  }
  
  &--md {
    padding: 0.125rem 0.5rem;
    font-size: 0.875rem;
    line-height: 1rem;
    min-height: 1rem;
    
    .su-badge__icon {
      width: 1rem;
      height: 1rem;
    }
  }
  
  &--lg {
    padding: 0.25rem 0.75rem;
    font-size: 1rem;
    line-height: 1.25rem;
    min-height: 1.25rem;
    
    .su-badge__icon {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
  
  // Radius
  @include use-border-radius;
  
  // Variantes
  &--default {
    background-color: $gray-100;
    color: $gray-800;
    border: 1px solid $gray-200;
  }
  
  &--primary {
    background-color: $primary-100;
    color: $primary-800;
    border: 1px solid $primary-200;
  }
  
  &--secondary {
    background-color: $gray-100;
    color: $gray-700;
    border: 1px solid $gray-300;
  }
  
  &--success {
    background-color: $success-100;
    color: $success-800;
    border: 1px solid $success-200;
  }
  
  &--warning {
    background-color: $warning-100;
    color: $warning-800;
    border: 1px solid $warning-200;
  }
  
  &--error {
    background-color: $error-100;
    color: $error-800;
    border: 1px solid $error-200;
  }
  
  // Direction de l'icône
  &--icon-right {
    flex-direction: row-reverse;
  }
  
  // Icône seule
  &--icon-only {
    gap: 0;
    
    .su-badge__icon {
      width: 1em;
      height: 1em;
    }
  }
}

// Mode sombre
@media (prefers-color-scheme: dark) {
  .su-badge {
    &--default {
      background-color: $gray-700;
      color: $gray-200;
      border-color: $gray-600;
    }
    
    &--primary {
      background-color: rgba($primary-400, 0.2);
      color: $primary-300;
      border-color: $primary-400;
    }
    
    &--secondary {
      background-color: $gray-700;
      color: $gray-300;
      border-color: $gray-600;
    }
    
    &--success {
      background-color: rgba($success-400, 0.2);
      color: $success-300;
      border-color: $success-400;
    }
    
    &--warning {
      background-color: rgba($warning-400, 0.2);
      color: $warning-300;
      border-color: $warning-400;
    }
    
    &--error {
      background-color: rgba($error-400, 0.2);
      color: $error-300;
      border-color: $error-400;
    }
  }
}

// Mode de contraste élevé
@media (prefers-contrast: high) {
  .su-badge {
    border-width: 2px;
    font-weight: 600;
  }
}

// Support de la réduction des animations
@media (prefers-reduced-motion: reduce) {
  .su-badge {
    transition: none;
  }
}
</style>