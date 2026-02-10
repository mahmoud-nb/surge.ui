<script setup lang="ts">
import { computed, ref, useAttrs, useId } from 'vue'
import Image from './Image.vue'
import Spinner from './Spinner.vue'
import type { AvatarProps } from '@/types'
import Badge from './Badge.vue'

const props = withDefaults(defineProps<AvatarProps>(), {
  size: 'md',
  variant: 'circle',
  loading: false,
  clickable: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
  load: [event: Event]
  error: [event: Event]
}>()

const attrs = useAttrs()

// Refs
const avatarRef = ref<HTMLElement>()
const imageLoaded = ref(false)
const imageError = ref(false)

const fieldId = 'avatar-' + useId()
const avatarId = computed(() => attrs.id as string || fieldId)

// Calcul des initiales
const initials = computed(() => {
  if (!props.name) return ''
  
  const names = props.name.trim().split(/\s+/)
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase()
  }
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
})

// Détermine si on affiche l'image ou les initiales
const showImage = computed(() => {
  return (props.src || props.fallback) && !imageError.value
})

const showInitials = computed(() => {
  return !showImage.value && props.name
})

// Classes CSS
const avatarClasses = computed(() => [
  'su-avatar',
  `su-avatar--${props.size}`,
  `su-avatar--${props.variant}`,
  {
    'su-avatar--clickable': props.clickable,
    'su-avatar--loading': props.loading,
    'su-avatar--has-status': props.status,
    'su-avatar--has-badge': props.badge,
    'su-avatar--image': showImage.value,
    'su-avatar--initials': showInitials.value
  }
])

const statusClasses = computed(() => [
  'su-avatar-status',
  `su-avatar-status--${props.size}`,
  `su-avatar-status--${props.status}`
])

// Attributs ARIA
const ariaAttributes = computed(() => {
  const attrs: Record<string, any> = {}
  
  if (props.ariaLabel) attrs['aria-label'] = props.ariaLabel
  if (props.ariaDescribedBy) attrs['aria-describedby'] = props.ariaDescribedBy
  if (props.role) attrs['role'] = props.role
  if (props.clickable) {
    attrs['role'] = attrs['role'] || 'button'
    attrs['tabindex'] = props.tabIndex || 0
  }
  
  return attrs
})

// Gestionnaires d'événements
const handleClick = (event: MouseEvent) => {
  if (props.clickable && !props.loading) {
    emit('click', event)
  }
}

const handleImageLoad = (event: Event) => {
  imageLoaded.value = true
  imageError.value = false
  emit('load', event)
}

const handleImageError = (event: Event) => {
  imageError.value = true
  emit('error', event)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (props.clickable && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault()
    handleClick(event as any)
  }
}

// Méthodes exposées
const focus = () => {
  avatarRef.value?.focus()
}

defineExpose({
  focus,
  avatarRef
})
</script>

<template>
  <div
    :id="avatarId"
    ref="avatarRef"
    :class="avatarClasses"
    v-bind="ariaAttributes"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <!-- Spinner de chargement -->
    <Spinner
      v-if="loading"
      class="su-avatar__loading"
      :label="'Chargement en cours...'"
      color="#3b82f6"
      size="16"
    />

    <!-- Image -->
    <Image
      v-else-if="showImage"
      :src="src || fallback || ''"
      :fallback="fallback"
      :alt="alt || `Avatar de ${name || 'utilisateur'}`"
      ratio="1/1"
      fit="cover"
      position="center"
      :placeholder="false"
      class="su-avatar__image"
      @load="handleImageLoad"
      @error="handleImageError"
    />

    <!-- Initiales -->
    <div 
      v-else-if="showInitials"
      class="su-avatar__initials"
      :aria-label="`Avatar avec initiales de ${name}`"
    >
      {{ initials }}
    </div>

    <!-- Placeholder par défaut -->
    <div 
      v-else
      class="su-avatar__placeholder"
      aria-label="Avatar par défaut"
    >
      <svg
        class="su-avatar__placeholder-icon"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </div>

    <!-- Indicateur de statut -->
    <div 
      v-if="status"
      :class="statusClasses"
      :aria-label="`Statut: ${status}`"
    />

    <!-- Badge de notification -->
    <Badge 
      v-if="badge"
      class="su-avatar__badge" 
      size="sm" 
      radius="full" 
      variant="error"
      :aria-label="`${badge} notification(s)`"
      v-bind="badgeProps"
    >
      {{ badge }}
    </Badge>
  </div>
</template>

<style lang="scss">
@use '../../styles2/main' as *;
@use '../../styles2/foundations/colors' as *;

$avatar-forme: (
  circle: 'full',
  rounded: 'lg',
  square: 'sm'
);

@mixin use-avatar-forme {
  @each $key, $value in $avatar-forme {
    &--#{$key} {
      border-radius: var(--su-radius-#{$value});

      .su-image-container {
        border-radius: var(--su-radius-#{$value});
      }
    }
  }
}

.su-avatar {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--su-bg-canvas);
  color: var(--su-text-secondary);
  font-weight: 600;
  flex-shrink: 0;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  // Variantes de forme
  @include use-avatar-forme;
  
  // Sizes
  &--xs {
    font-size: 0.625rem;

    @include squareSize(1.5rem);
  }
  
  &--sm {
    font-size: 0.75rem;

    @include squareSize(2rem);
  }
  
  &--md {
    font-size: 0.875rem;

    @include squareSize(2.5rem);
  }
  
  &--lg {
    font-size: 1rem;

    @include squareSize(3rem);
  }
  
  &--xl {
    font-size: 1.25rem;

    @include squareSize(4rem);
  }
  
  &--2xl {
    font-size: 1.5rem;

    @include squareSize(5rem);
  }
  
  // États
  &--clickable {
    cursor: pointer;
    
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
    }
    
    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgb(var(--su-primary-500-rgb) / 20%);
    }
    
    &:active {
      transform: scale(0.95);
    }
  }
  
  // Couleurs d'arrière-plan pour les initiales
  &--initials {
    background: linear-gradient(135deg, var(--su-primary-500), var(--su-primary-600));
    color: white;
  }

  &--loading {
    background: var(--su-bg-disabled);
  }
}

.su-avatar__image {
  @include squareSize(100%);

  object-fit: cover;
}

.su-avatar__initials {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.su-avatar__placeholder {
 @include squareSize(100%);

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--su-bg-canvas);
  color: var(--su-text-placeholder);
  
  &-icon {
    @include squareSize(60%);
  }
}

.su-avatar__loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--su-bg-disabled);
}

.su-avatar-status {
  position: absolute;
  border: 2px solid white;
  border-radius: 50%;
  
  // Tailles du statut
  &--xs {
    width: 0.375rem;
    height: 0.375rem;
    bottom: 0;
    right: 0;
  }
  
  &--sm {
    width: 0.5rem;
    height: 0.5rem;
    bottom: 0;
    right: 0;
  }
  
  &--md {
    width: 0.625rem;
    height: 0.625rem;
    bottom: 0.125rem;
    right: 0.125rem;
  }
  
  &--lg {
    width: 0.75rem;
    height: 0.75rem;
    bottom: 0.125rem;
    right: 0.125rem;
  }
  
  &--xl {
    width: 1rem;
    height: 1rem;
    bottom: 0.25rem;
    right: 0.25rem;
  }
  
  &--2xl {
    width: 1.25rem;
    height: 1.25rem;
    bottom: 0.25rem;
    right: 0.25rem;
  }
  
  // Couleurs de statut
  &--online {
    background-color: var(--su-success-500);
  }
  
  &--offline {
    background-color: var(--su-gray-400);
  }
  
  &--away {
    background-color: var(--su-warning-500);
  }
  
  &--busy {
    background-color: var(--su-error-500);
  }
}

.su-avatar__badge {
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
}

// Mode sombre
@media (prefers-color-scheme: dark) {
  .su-avatar {
    &--initials {
      background: linear-gradient(135deg, var(--su-primary-400), var(--su-primary-500));
    }
  }

  /*
  .su-avatar__placeholder {
    background-color: $gray-700;
    color: $gray-500;
  }
  
  .su-avatar__loading {
    background-color: $gray-800;
  }
  
  .su-avatar-status {
    border-color: $gray-800;
  }
  
  .su-avatar__badge {
    border-color: $gray-800;
  }
  */
}

// Support de la réduction des animations
@media (prefers-reduced-motion: reduce) {
  .su-avatar {
    transition: none;
    
    &--clickable:hover {
      transform: none;
    }
    
    &--clickable:active {
      transform: none;
    }
  }
}
</style>