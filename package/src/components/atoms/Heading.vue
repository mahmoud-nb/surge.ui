<script setup lang="ts">
import { computed } from 'vue'
// TODO : to use > import type { HeadingProps } from '@/types'

const props = defineProps({
  level: {
    type: [Number, String],
    default: 2,
    validator: (value: number | string) => {
      const n = Number(value)
      return (n >= 1 && n <= 6) || value === 'div'
    }
  },
  variant: {
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
      `su-heading--${variant}`,
      { 'su-heading--with-slots': $slots.before || $slots.after, 'su-heading--truncate': truncate }
    ]"
  >
    <div
      v-if="$slots.before"
      class="su-heading__slot"
    >
      <slot name="before" />
    </div>

    <slot />
    
    <div
      v-if="$slots.after"
      class="su-heading__slot"
    >
      <slot name="after" />
    </div>
  </component>
</template>

<style lang="scss" scoped>
@use '../../styles/main' as *;

.su-heading {
  $self: &;
  @include reset-style();
  font-family: var(--su-font-family-base);
  font-weight: 600;
  color: var(--su-text-primary-color);
  margin: 0;

  &__slot {
    display: inline-flex;
  }

  &--with-slots {
    display: flex;
    align-items: center;
    gap: $spacing-2;

    svg {
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  @include use-text-variants();

  &--truncate {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  &--level-1 { font-size: $font-size-3xl; line-height: $line-height-relaxed; }
  &--level-2 { font-size: $font-size-2xl; line-height: $line-height-relaxed; }
  &--level-3 { font-size: $font-size-xl; line-height: $line-height-normal; }
  &--level-4 { font-size: $font-size-lg; line-height: $line-height-normal; }
  &--level-5 { font-size: $font-size-base; line-height: $line-height-tight; }
  &--level-6 { font-size: $font-size-sm; line-height: $line-height-tight; }
}
</style>
