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
  loadingLabel: 'Chargement en cours...',
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
      :label="loadingLabel"
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
@use 'sass:list';
@use '../../styles/abstracts' as *;

// ============================================================
// AVATAR — fond doux neutre pour les initiales, liseré interne
// discret, pastille de statut détachée par la couleur du fond
// ============================================================

$su-avatar-shapes: (
  'circle': 'full',
  'rounded': 'lg',
  'square': 'sm'
);

$su-avatar-sizes: (
  'xs': (1.5rem, 0.625rem, 0.375rem),
  'sm': (2rem, 0.75rem, 0.5rem),
  'md': (2.5rem, 0.875rem, 0.625rem),
  'lg': (3rem, 1rem, 0.75rem),
  'xl': (4rem, 1.25rem, 0.875rem),
  '2xl': (5rem, 1.5rem, 1rem)
);

.su-avatar {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-sizing: border-box;
  width: var(--_su-avatar-size);
  height: var(--_su-avatar-size);
  background-color: var(--su-bg-muted);
  color: var(--su-text-secondary);
  font-size: var(--_su-avatar-font);
  font-weight: var(--su-font-weight-medium);
  @include transition(box-shadow, opacity);

  // Liseré interne au-dessus de l'image (détache l'avatar du fond)
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px var(--su-border-alpha);
    pointer-events: none;
  }

  // ### Formes

  @each $shape, $radius in $su-avatar-shapes {
    &--#{$shape} {
      border-radius: var(--su-radius-#{$radius});

      .su-image-container,
      .su-avatar__image,
      .su-avatar__placeholder {
        border-radius: var(--su-radius-#{$radius});
      }
    }
  }

  // ### Tailles (taille, police, pastille de statut)

  @each $name, $values in $su-avatar-sizes {
    &--#{$name} {
      --_su-avatar-size: #{list.nth($values, 1)};
      --_su-avatar-font: #{list.nth($values, 2)};
      --_su-avatar-status: #{list.nth($values, 3)};
    }
  }

  // ### États

  &--clickable {
    cursor: pointer;
    outline: none;

    &:hover {
      opacity: 0.9;
    }

    &:focus-visible {
      @include focus-ring;
    }
  }

  &--loading {
    background-color: var(--su-bg-muted);
  }
}

.su-avatar__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.su-avatar__initials {
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.su-avatar__placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: var(--su-text-tertiary);

  &-icon {
    width: 60%;
    height: 60%;
  }
}

.su-avatar__loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--su-text-tertiary);
}

// ### Pastille de statut

.su-avatar-status {
  position: absolute;
  right: 0;
  bottom: 0;
  box-sizing: content-box;
  width: var(--_su-avatar-status);
  height: var(--_su-avatar-status);
  border-radius: var(--su-radius-full);
  // Anneau de la couleur du fond pour détacher la pastille
  box-shadow: 0 0 0 2px var(--su-bg-canvas);

  @each $name, $values in $su-avatar-sizes {
    &--#{$name} {
      --_su-avatar-status: #{list.nth($values, 3)};
    }
  }

  &--online {
    background-color: var(--su-state-success);
  }

  &--offline {
    background-color: var(--su-border-strong);
  }

  &--away {
    background-color: var(--su-state-warning);
  }

  &--busy {
    background-color: var(--su-state-error);
  }
}

.su-avatar__badge {
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  z-index: 1;
}
</style>
