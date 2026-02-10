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

defineSlots<{
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

<style lang="scss" scoped>
@use '../../styles2/core/mixins' as *;
@use '../../styles2/foundations/spacing' as *;

.su-avatars-group {
  display: flex;
  align-items: center;
  gap: $spacing-2;
  
  &-list {
    display: flex;
    align-items: center;
  }
  
  &--spacing-sm {
    .su-avatars-group-list {
      gap: $spacing-1;
    }
  }
  
  &--spacing-md {
    .su-avatars-group-list {
      gap: $spacing-2;
    }
  }
  
  &--spacing-lg {
    .su-avatars-group-list {
      gap: $spacing-3;
    }
  }
}

.su-avatars-group-before,
.su-avatars-group-after {
  display: flex;
  align-items: center;
}

.su-avatars-group-avatar {
  position: relative;
  z-index: 0;

  @include transition(all);
  
  &:hover {
    z-index: 1;
  }
}

.su-avatars-group-more {
  background-color: var(--su-gray-300);
  color: var(--su-text-secondary);
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 0;

  @include transition(all);
  
  &:hover {
    background-color: var(--su-gray-400);
    color: var(--su-text-primary);
    z-index: 1;
  }
  
  &-text {
    font-size: 0.75em;
  }
  
  @media (prefers-color-scheme: dark) {
    background-color: var(--su-gray-600);
    color: var(--su-text-secondary);
    
    &:hover {
      background-color: var(--su-gray-500);
      color: var(--su-text-primary);
    }
  }

  [data-theme='dark'] & {
    background-color: var(--su-gray-600);
    color: var(--su-text-secondary);
    
    &:hover {
      background-color: var(--su-gray-500);
      color: var(--su-text-primary);
    }
  }
}

.su-avatars-group--spacing-none .su-avatars-group-avatar {
  margin-left: -$spacing-1;
  border: 2px solid var(--su-bg-surface);
  
  &:first-child {
    margin-left: 0;
  }
}

.su-avatars-group--spacing-none .su-avatars-group-more {
  margin-left: -$spacing-1;
  border: 2px solid var(--su-bg-surface);
  
  @media (prefers-color-scheme: dark) {
    border-color: var(--su-bg-surface);
  }
}

@media (prefers-reduced-motion: reduce) {
  .su-avatars-group-avatar,
  .su-avatars-group-more {
    @include transition(none);
  }
}
</style>