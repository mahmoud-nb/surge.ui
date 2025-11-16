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

<style lang="scss">
@use '../../styles/main' as *;

.su-buttons-group {
  @include component-group(md); // Gap par défaut
  
  &--gap-sm { @include component-group(sm); }
  &--gap-md { @include component-group(md); }
  &--gap-lg { @include component-group(lg); }
  &--gap-none { @include component-group(none); }
  
  // Style connecté pour gap='none'
  &--connected {
    .su-buttons-group__button {
      @include connected-elements;
    }
  }
}
</style>