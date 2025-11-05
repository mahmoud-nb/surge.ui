<script setup lang="ts">
import { AccessibilityProps } from '@/types'
import { defineProps, computed } from 'vue'
import type { Component } from 'vue'

export interface IconProps extends AccessibilityProps {
  name: Component,
  size?: Number | String
}

const props = defineProps<IconProps>()

const IconAttributes = computed(() => {
  const attrs: Record<string, string | number> = {}
  if (props.size) {
    attrs['width'] = `${String(props.size)}px`
    attrs['height'] = `${String(props.size)}px`
  }
  
  return attrs
})

const ariaAttributes = computed(() => {
  const attrs: Record<string, string | boolean> = {}
  if (props.ariaLabel) {
    attrs['aria-label'] = props.ariaLabel
  }
  if (props.ariaHidden !== undefined) {
    attrs['aria-hidden'] = props.ariaHidden
  }
  return attrs
})

</script>

<template>
  <component :is="name" class="su-icon" v-bind="{ ...IconAttributes, ...ariaAttributes }" />
</template>

<style lang="scss" scoped>
@use '../../styles/main' as *;

.su-icon {
  display: inline-block;
}
</style>