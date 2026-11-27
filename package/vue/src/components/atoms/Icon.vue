<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import type { IconProps } from '@/types/index'

const props = withDefaults(defineProps<IconProps>(), {
  variant: 'outline',
  size: 24,
  decorative: false,
})

const iconComponent = computed(() => {
  const iconName = props.name.endsWith('Icon') ? props.name : `${props.name}Icon`
  
  return defineAsyncComponent({
    loader: async () => {
      try {
        let module
        
        if (props.variant === 'solid') {
          module = await import('@heroicons/vue/24/solid')
        } else {
          module = await import('@heroicons/vue/24/outline')
        }
        
        const IconComponent = module[iconName]
        
        if (!IconComponent) {
          console.error(`Icône non trouvée: ${iconName} (variant: ${props.variant})`)
          return null
        }
        
        return IconComponent
      } catch (err) {
        console.error(`Erreur de chargement de l'icône: ${iconName}`, err)
        return null
      }
    },
    delay: 0,
    timeout: 3000,
  })
})

const iconSize = computed(() => {
  if (typeof props.size === 'number') {
    return `${props.size}px`
  }
  return props.size
})

const iconClasses = computed(() => {
  const classes = [props.class]
  if (props.color) {
    classes.push(props.color)
  }
  return classes.filter(Boolean).join(' ')
})

const accessibilityProps = computed(() => {
  if (props.decorative) {
    return {
      'aria-hidden': 'true',
      role: 'presentation',
    }
  }
  
  return {
    'aria-label': props.ariaLabel,
    role: props.ariaLabel ? 'img' : undefined,
  }
})

const iconStyle = computed(() => {
  const style: Record<string, string> = {
    width: iconSize.value,
    height: iconSize.value,
  }
  
  if (props.color && !props.color.includes('text-')) {
    style.color = props.color
  }
  
  return style
})
</script>

<template>
  <component
    :is="iconComponent"
    v-if="iconComponent"
    :class="iconClasses"
    :style="iconStyle"
    v-bind="accessibilityProps"
  />
</template>