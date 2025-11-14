<script setup lang="ts">
import { computed, h, Fragment, Comment, Text } from 'vue'
import Link from '../atoms/Link.vue'
import type { LinkGroupProps } from '@/types'

const props = withDefaults(defineProps<LinkGroupProps>(), {
  gap: 'md',
  separator: 'none',
  direction: 'horizontal'
})

const slots = defineSlots<{
  default(): any
}>()

// Classes CSS pour le container
const containerClasses = computed(() => [
  'su-links-group',
  `su-links-group--gap-${props.gap}`,
  `su-links-group--${props.direction}`,
  {
    'su-links-group--connected': props.gap === 'none',
    'su-links-group--with-separator': props.separator !== 'none'
  }
])

// Fonction pour obtenir le caractère de séparation
const getSeparatorChar = (separator: string): string => {
  switch (separator) {
    case 'dot': return '•'
    case 'slash': return '/'
    case 'pipe': return '|'
    case 'arrow': return '→'
    default: return ''
  }
}
// Traitement des liens du slot avec propagation des props
const processedLinks = computed(() => {
  if (!slots?.default) return []

  const children = (slots?.['default']?.() ?? [])
  const processedChildren = []

  for (const vnode of children) {
    // Vérifie si le VNode est une instance du composant Link
    if (vnode.type === Link) {
      // Crée un nouvel objet de props en fusionnant les props existantes
      // avec les props du LinkGroup (qui ont la priorité)
      const newProps = { ...vnode.props }

      // Force les props size, variant et underline si définies sur le LinkGroup
      if (props.size) {
        newProps.size = props.size
      }
      if (props.variant) {
        newProps.variant = props.variant
      }
      if (props.underline) {
        newProps.underline = props.underline
      }

      // Ajoute des classes CSS spécifiques pour le gap='none'
      if (props.gap === 'none') {
        const existingClass = newProps.class || ''
        newProps.class = `${existingClass} su-links-group__link`.trim()
      }

      // Recrée le VNode du lien avec les nouvelles props
      processedChildren.push(h(vnode.type, newProps, vnode?.children))
    } else if (vnode.type === Comment || vnode.type === Text || vnode.type === Fragment) {
      // Ignore les commentaires, nœuds de texte et fragments
      continue
    } else {
      // Avertit si un élément non-Link est trouvé
      console.warn('LinkGroup expects only Link components as children. Found:', vnode.type)
      // On peut choisir de rendre l'élément tel quel ou de l'ignorer
      // Pour la cohérence, on l'ignore ici
    }
  }

  return processedChildren
})

// Création des éléments avec séparateurs
const elementsWithSeparators = computed(() => {
  if (props.separator === 'none' || props.direction === 'vertical') {
    return processedLinks.value
  }
  
  const elements: Array<ReturnType<typeof h>> = []
  const separatorChar = getSeparatorChar(props.separator)
  
  processedLinks.value.forEach((link, index) => {
    elements.push(link)
    
    // Ajouter un séparateur sauf après le dernier élément
    if (index < processedLinks.value.length - 1) {
      elements.push(h('span', {
        key: `separator-${index}`,
        class: 'su-links-group-separator',
        'aria-hidden': 'true'
      }, separatorChar))
    }
  })
  
  return elements
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
      :is="element" 
      v-for="(element, index) in elementsWithSeparators"
      :key="index"
    />
  </div>
</template>

<style lang="scss">
@use '../../styles/main' as *;

.su-links-group {
  @include component-group(md); // Gap par défaut
  
  &--gap-sm { @include component-group(sm); }
  &--gap-md { @include component-group(md); }
  &--gap-lg { @include component-group(lg); }
  &--gap-none { @include component-group(none); }
  
  // Direction
  &--vertical {
    flex-direction: column;
    align-items: flex-start;
  }
  
  &--horizontal {
    flex-direction: row;
  }
  
  // Avec séparateurs
  &--with-separator {
    align-items: center;
    
    &.su-links-group--vertical {
      .su-links-group-separator {
        display: none; // Masquer les séparateurs en mode vertical
      }
    }
  }
  
  // Style connecté pour gap='none'
  &--connected {
    .su-links-group__link {
      @include connected-elements();
      border: 1px solid transparent;
      
      // Bordures pour l'effet connecté
      &:not(.su-link--disabled) {
        border-color: $gray-200;
        background-color: white;
        
        &:hover {
          border-color: $primary-300;
          background-color: $primary-50;
        }
        
        &:focus-visible {
          border-color: $primary-500;
        }
        
        &:active {
          background-color: $primary-100;
        }
      }
    }
    
    // Direction verticale pour les liens connectés
    &.su-links-group--vertical {
      .su-links-group__link {
        // Override pour la direction verticale
        margin-left: 0;
        margin-top: -1px;
        
        &:first-child {
          margin-top: 0;
          border-top-left-radius: $border-radius-sm;
          border-top-right-radius: $border-radius-sm;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }
        
        &:last-child {
          border-top-left-radius: 0;
          border-top-right-radius: 0;
          border-bottom-left-radius: $border-radius-sm;
          border-bottom-right-radius: $border-radius-sm;
        }
        
        &:only-child {
          border-radius: $border-radius-sm;
        }
      }
    }
  }
}

.su-links-group-separator {
  color: $text-tertiary;
  font-weight: 500;
  user-select: none;
  font-size: 0.875em;
  
  .su-links-group--vertical & {
    display: none; // Masquer les séparateurs en mode vertical
  }
  
  .su-links-group--vertical & {
    display: none; // Masquer les séparateurs en mode vertical
  }
}

// Mode sombre
@media (prefers-color-scheme: dark) {
  .su-links-group--connected {
    .su-links-group__link:not(.su-link--disabled) {
      border-color: $gray-600;
      background-color: $gray-800;
      
      &:hover {
        border-color: $primary-400;
        background-color: rgba($primary-400, 0.1);
      }
      
      &:focus-visible {
        border-color: $primary-400;
      }
      
      &:active {
        background-color: rgba($primary-400, 0.2);
      }
    }
  }
  
  .su-links-group-separator {
    color: $text-tertiary-dark;
  }
}
</style>