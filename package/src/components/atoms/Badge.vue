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
@use '../../styles/abstracts' as *;

// ============================================================
// BADGE — étiquette compacte
//   default   : contour neutre
//   primary   : plein primaire
//   secondary : fond doux neutre
//   success / warning / error : fond teinté à 8 %, texte foncé
// ============================================================

.su-badge {
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  box-sizing: border-box;
  height: var(--_su-badge-h);
  min-width: var(--_su-badge-h);
  padding-inline: var(--_su-badge-px);
  border: 1px solid transparent;
  border-radius: var(--su-radius-sm);
  font-family: inherit;
  font-size: var(--_su-badge-fs);
  font-weight: var(--su-font-weight-medium);
  line-height: 1;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  user-select: none;

  // ### Tailles (plus hautes sur mobile, compactes dès `sm`)

  &--sm {
    --_su-badge-h: 1.25rem;
    --_su-badge-px: 0.25rem;
    --_su-badge-fs: var(--su-font-size-xs);
    --_su-badge-icon: 0.75rem;

    @include up('sm') {
      --_su-badge-h: 1rem;
      --_su-badge-fs: 0.625rem;
    }
  }

  &--md {
    --_su-badge-h: 1.375rem;
    --_su-badge-px: 0.3125rem;
    --_su-badge-fs: var(--su-font-size-sm);
    --_su-badge-icon: 0.875rem;

    @include up('sm') {
      --_su-badge-h: 1.125rem;
      --_su-badge-fs: var(--su-font-size-xs);
      --_su-badge-icon: 0.75rem;
    }
  }

  &--lg {
    --_su-badge-h: 1.625rem;
    --_su-badge-px: 0.4375rem;
    --_su-badge-fs: var(--su-font-size-base);
    --_su-badge-icon: 1rem;

    @include up('sm') {
      --_su-badge-h: 1.375rem;
      --_su-badge-fs: var(--su-font-size-sm);
      --_su-badge-icon: 0.875rem;
    }
  }

  // Radius explicites (prop `radius`)
  @include use-border-radius;

  // ### Variantes

  &--default {
    border-color: var(--su-border-input);
    background-color: var(--su-bg-control);
    color: var(--su-text-primary);
  }

  &--primary {
    background-color: var(--su-primary-default);
    color: var(--su-primary-text);
  }

  &--secondary {
    background-color: var(--su-secondary-default);
    color: var(--su-secondary-text);
  }

  @each $state in ('success', 'warning', 'error') {
    &--#{$state} {
      background-color: with-alpha(state-#{$state}, 8%);
      color: var(--su-state-#{$state}-fg);

      @include dark-mode {
        background-color: with-alpha(state-#{$state}, 16%);
      }
    }
  }

  // Couleurs personnalisées (props color / backgroundColor)
  &--has-custom-color {
    border-color: transparent;
  }

  // ### Icône

  &__icon {
    width: var(--_su-badge-icon);
    height: var(--_su-badge-icon);
    flex-shrink: 0;
    opacity: 0.8;
  }

  &__content {
    min-width: 0;
  }

  &--icon-right {
    flex-direction: row-reverse;
  }

  &--icon-only {
    gap: 0;
    padding-inline: 0;

    .su-badge__icon {
      opacity: 1;
    }
  }

  @include high-contrast {
    border-color: currentcolor;
  }
}
</style>
