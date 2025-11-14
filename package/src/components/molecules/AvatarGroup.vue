<script setup lang="ts">
import { computed } from 'vue'
import Avatar from '../atoms/Avatar.vue'
import type { AvatarGroupProps } from '@/types'

const props = withDefaults(defineProps<AvatarGroupProps>(), {
  avatars: () => [],
  size: 'md',
  variant: 'circle',
  max: 5,
  spacing: 'md',
  clickable: false
})

const emit = defineEmits<{
  'avatar-click': [avatar: any, index: number, event: MouseEvent]
}>()

const slots = defineSlots<{
  before?(): any
  after?(): any
}>()

// Avatars visibles et surplus
const visibleAvatars = computed(() => {
  return props.avatars.slice(0, props.max)
})

const remainingCount = computed(() => {
  return Math.max(0, props.avatars.length - props.max)
})

// Classes CSS
const groupClasses = computed(() => [
  'su-avatars-group',
  `su-avatars-group--${props.size}`,
  `su-avatars-group--spacing-${props.spacing}`,
  {
    'su-avatars-group--clickable': props.clickable
  }
])

const moreAvatarClasses = computed(() => [
  'su-avatar',
  'su-avatars-group-more',
  `su-avatar--${props.size}`,
  `su-avatar--${props.variant}`,
  {
    'su-avatar--clickable': props.clickable
  }
])

// Attributs ARIA
const ariaAttributes = computed(() => {
  const attrs: Record<string, any> = {
    role: 'group'
  }
  
  if (props.ariaLabel) attrs['aria-label'] = props.ariaLabel
  if (props.ariaDescribedBy) attrs['aria-describedby'] = props.ariaDescribedBy
  if (props.role) attrs['role'] = props.role
  
  return attrs
})

// Gestionnaires d'événements
const handleAvatarClick = (avatar: any, index: number, event: MouseEvent) => {
  if (props.clickable) {
    emit('avatar-click', avatar, index, event)
  }
}

const handleMoreClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit('avatar-click', { type: 'more', count: remainingCount.value }, -1, event)
  }
}
</script>

<template>
  <div 
    :class="groupClasses"
    v-bind="ariaAttributes"
  >
    <!-- Slot before -->
    <div
      v-if="$slots.before"
      class="su-avatars-group-before"
    >
      <slot name="before" />
    </div>

    <!-- Liste des avatars -->
    <div class="su-avatars-group-list">
      <!-- Avatars visibles -->
      <Avatar
        v-for="(avatar, index) in visibleAvatars"
        :key="`avatar-${index}`"
        :src="avatar.src"
        :alt="avatar.alt"
        :fallback="avatar.fallback"
        :name="avatar.name"
        :size="size"
        :variant="variant"
        :status="avatar.status"
        :badge="avatar.badge"
        :badge-color="avatar.badgeColor"
        :loading="avatar.loading"
        :clickable="clickable"
        :aria-label="avatar.ariaLabel"
        class="su-avatars-group-avatar"
        @click="handleAvatarClick(avatar, index, $event)"
      />

      <!-- Avatar "plus" pour les avatars restants -->
      <div
        v-if="remainingCount > 0"
        :class="moreAvatarClasses"
        :aria-label="`${remainingCount} autre(s) utilisateur(s)`"
        @click="handleMoreClick"
      >
        <span class="su-avatars-group-more-text">
          +{{ remainingCount }}
        </span>
      </div>
    </div>

    <!-- Slot after -->
    <div
      v-if="$slots.after"
      class="su-avatars-group-after"
    >
      <slot name="after" />
    </div>
  </div>
</template>

<style lang="scss">
@use '../../styles/main' as *;

.su-avatars-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &-list {
    display: flex;
    align-items: center;
  }
  
  // Espacement entre les avatars
  &--spacing-none {
    .su-avatars-group-list {
      gap: 0;
      
      .su-avatars-group-avatar {
        margin-left: -0.25rem;
        border: 2px solid white;
        
        &:first-child {
          margin-left: 0;
        }
        
        &:hover {
          z-index: 1;
        }
      }
      
      .su-avatars-group-more {
        margin-left: -0.25rem;
        border: 2px solid white;
        z-index: 0;
        
        &:hover {
          z-index: 1;
        }
      }
    }
  }
  
  &--spacing-sm {
    .su-avatars-group-list {
      gap: 0.25rem;
    }
  }
  
  &--spacing-md {
    .su-avatars-group-list {
      gap: 0.5rem;
    }
  }
  
  &--spacing-lg {
    .su-avatars-group-list {
      gap: 0.75rem;
    }
  }
}

.su-avatars-group-avatar {
  position: relative;
  z-index: 0;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.su-avatars-group-more {
  background-color: $gray-300;
  color: $text-secondary;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 0;
  
  &-text {
    font-size: 0.75em;
  }
  
  &:hover {
    background-color: $gray-400;
    color: $text-primary;
  }
}

.su-avatars-group-before,
.su-avatars-group-after {
  display: flex;
  align-items: center;
}

// Mode sombre
@media (prefers-color-scheme: dark) {
  .su-avatars-group--spacing-none {
    .su-avatars-group-avatar,
    .su-avatars-group-more {
      border-color: $gray-800;
    }
  }
  
  .su-avatars-group-more {
    background-color: $gray-600;
    color: $text-secondary-dark;
    
    &:hover {
      background-color: $gray-500;
      color: $text-primary-dark;
    }
  }
}

// Support de la réduction des animations
@media (prefers-reduced-motion: reduce) {
  .su-avatars-group-avatar {
    transition: none;
  }
  
  .su-avatars-group-more {
    transition: none;
  }
}
</style>