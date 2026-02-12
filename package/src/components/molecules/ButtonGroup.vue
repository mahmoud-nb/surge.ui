<script setup lang="ts">
import { computed, h, Fragment, Comment, Text } from 'vue'
import Button from '../atoms/Button.vue'
import type { ButtonGroupProps } from '@/types'

const props = withDefaults(defineProps<ButtonGroupProps>(), {
  gap: 'md'
})

const slots = defineSlots<{
  default(): any
}>()

// Classes CSS pour le container
const containerClasses = computed(() => [
  'su-buttons-group',
  `su-buttons-group--gap-${props.gap}`,
  {
    'su-buttons-group--connected': props.gap === 'none'
  }
])

// Traitement des boutons du slot avec propagation des props
const processedButtons = computed(() => {
  if (!slots?.default) return []

  const children = (slots?.default?.() ?? [])
  const processedChildren = []

  for (const vnode of children) {
    // Vérifie si le VNode est une instance du composant Button
    if (vnode.type === Button) {
      // Crée un nouvel objet de props en fusionnant les props existantes
      // avec les props du ButtonGroup (qui ont la priorité)
      const newProps = { ...vnode.props }

      // Force les props size et variant si définies sur le ButtonGroup
      if (props.size) {
        newProps.size = props.size
      }
      if (props.variant) {
        newProps.variant = props.variant
      }

      // Ajoute des classes CSS spécifiques pour le gap='none'
      if (props.gap === 'none') {
        const existingClass = newProps.class || ''
        newProps.class = `${existingClass} su-buttons-group__button`.trim()
      }

      // Recrée le VNode du bouton avec les nouvelles props
      processedChildren.push(h(vnode.type, newProps, vnode?.children))
    } else if (vnode.type === Comment || vnode.type === Text || vnode.type === Fragment) {
      // Ignore les commentaires, nœuds de texte et fragments
      continue
    } else {
      // Avertit si un élément non-Button est trouvé
      console.warn('ButtonGroup expects only Button components as children. Found:', vnode.type)
      // On peut choisir de rendre l'élément tel quel ou de l'ignorer
      // Pour la cohérence, on l'ignore ici
    }
  }

  return processedChildren
})

// Attributs ARIA pour l'accessibilité
const ariaAttributes = computed(() => {
  const attrs: Record<string, any> = {}
  
  if (props.ariaLabel) attrs['aria-label'] = props.ariaLabel
  if (props.ariaDescribedBy) attrs['aria-describedby'] = props.ariaDescribedBy
  if (props.role) attrs['role'] = props.role
  
  return attrs
})
</script>

<template>
  <div 
    :class="containerClasses"
    v-bind="ariaAttributes"
  >
    <component 
      :is="button" 
      v-for="(button, index) in processedButtons"
      :key="index"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '../../styles/core/mixins' as *;
@use '../../styles/foundations/spacing' as space;

.su-buttons-group {
  display: inline-flex;
  align-items: center;
  gap: space.$spacing-2;

  &--gap-sm {
    gap: space.$spacing-1;
  }

  &--gap-md {
    gap: space.$spacing-2;
  }

  &--gap-lg {
    gap: space.$spacing-3;
  }

  &--gap-none {
    gap: 0;
  }

  // Style connecté pour gap='none'
  &--connected {
    .su-buttons-group__button {
      position: relative;

      &:not(:first-child) {
        margin-left: -1px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }

      &:not(:last-child) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }

      &:focus-visible,
      &:hover:not(:disabled),
      &:active:not(:disabled) {
        z-index: 1;
      }
    }
  }
}
</style>