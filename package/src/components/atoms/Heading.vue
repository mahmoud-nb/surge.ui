<script setup lang="ts">
import { computed } from 'vue'

export interface HeadingProps {
  level?: number | string
  color?: 'primary' | 'secondary' | 'tertiary'
  truncate?: boolean
}

const props = defineProps({
  level: {
    type: [Number, String],
    default: 2,
    validator: (value: number | string) => {
      const n = Number(value)
      return (n >= 1 && n <= 6) || value === 'div'
    }
  },
  color: {
    type: String,
    default: 'primary',
    validator: (val: string) => ['primary', 'secondary', 'tertiary'].includes(val)
  },
  truncate: {
    type: Boolean,
    default: false
  }
})

const tag = computed(() => (props.level === 'div' ? 'div' : `h${props.level}`))
</script>

<template>
  <component
    :is="tag"
    class="su-heading"
    :class="[
      `su-heading--level-${level}`,
      `su-heading--${color}`,
      { 'su-heading--with-slots': $slots.before || $slots.after, 'su-heading--truncate': truncate }
    ]"
  >
    <slot name="before" />
    <slot />
    <slot name="after" />
  </component>
</template>

<style lang="scss" scoped>
@use '../../styles/variables' as *;

.su-heading {
  color: var(--su-heading-color, $text-primary);
  font-weight: 600;
  margin: 0;

  &--with-slots {
    display: flex;
    align-items: center;
    gap: $spacing-2;

    & > *:first-child {
      margin-left: 0;
    }

    & > *:last-child {
      margin-right: 0;
    }

    & > svg {
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  &--truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &--primary {
    color: $text-primary;
  }

  &--secondary {
    color: $text-secondary;
  }

  &--tertiary {
    color: $text-tertiary;
  }

  // Dark mode
  [data-theme='dark'] & {
    &--primary {
      color: $text-primary-dark;
    }
    &--secondary {
      color: $text-secondary-dark;
    }
    &--tertiary {
      color: $text-tertiary-dark;
    }
  }

  // Levels
  &--level-1 { font-size: $font-size-3xl; line-height: $line-height-tight; }
  &--level-2 { font-size: $font-size-2xl; line-height: $line-height-tight; }
  &--level-3 { font-size: $font-size-xl; line-height: $line-height-normal; }
  &--level-4 { font-size: $font-size-lg; line-height: $line-height-normal; }
  &--level-5 { font-size: $font-size-base; line-height: $line-height-relaxed; }
  &--level-6 { font-size: $font-size-sm; line-height: $line-height-relaxed; }
}
</style>
