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
@use '../../styles/core/mixins' as *;
@use '../../styles/foundations/spacing' as space;

// Base styles - must come FIRST before modifier-specific styles
.su-links-group-separator {
  color: var(--su-text-tertiary);
  font-weight: 500;
  user-select: none;
  font-size: 0.875em;
}

.su-links-group {
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
  }
  
  // Style connecté pour gap='none'
  &--connected {
    gap: 0;
  }
}

// MUST come before compound selectors using them
.su-links-group--vertical .su-links-group-separator {
  display: none;
}

// Connected element styles - completely flattened
.su-links-group--connected .su-links-group__link {
  position: relative;
  border: 1px solid transparent;
}

.su-links-group--connected .su-links-group__link:not(:first-child) {
  margin-left: -1px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.su-links-group--connected .su-links-group__link:not(:last-child) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

// Generic interactive states - placed FIRST  
.su-links-group--connected .su-links-group__link:focus-visible {
  z-index: 1;
}

.su-links-group--connected .su-links-group__link:hover:not(:disabled) {
  z-index: 1;
}

.su-links-group--connected .su-links-group__link:active:not(:disabled) {
  z-index: 1;
}

// Base state for enabled (non-disabled) links
.su-links-group--connected .su-links-group__link:not(.su-link--disabled) {
  border-color: var(--su-gray-200);
  background-color: white;
}

// More specific multi-class variant
.su-links-group--connected.su-links-group--vertical .su-links-group__link {
  margin-left: 0;
  margin-top: -1px;
}

.su-links-group--connected.su-links-group--vertical .su-links-group__link:first-child {
  margin-top: 0;
  border-radius: var(--su-radius-sm) var(--su-radius-sm) 0 0;
}

.su-links-group--connected.su-links-group--vertical .su-links-group__link:last-child {
  border-radius: 0 0 var(--su-radius-sm) var(--su-radius-sm);
}

.su-links-group--connected.su-links-group--vertical .su-links-group__link:only-child {
  border-radius: var(--su-radius-sm);
}

// Compound states for enabled links
.su-links-group--connected .su-links-group__link:not(.su-link--disabled):hover {
  border-color: var(--su-primary-300);
  background-color: var(--su-primary-50);
}

.su-links-group--connected .su-links-group__link:not(.su-link--disabled):focus-visible {
  border-color: var(--su-primary-500);
}

.su-links-group--connected .su-links-group__link:not(.su-link--disabled):active {
  background-color: var(--su-primary-100);
}

.su-links-group--with-separator.su-links-group--vertical .su-links-group-separator {
  display: none;
}

@media (prefers-color-scheme: dark) {
  .su-links-group--connected .su-links-group__link:not(.su-link--disabled) {
    border-color: var(--su-gray-600);
    background-color: var(--su-gray-800);
    
    &:hover {
      border-color: var(--su-primary-400);
      background-color: rgb(var(--su-primary-400-rgb) / 10%);
    }
    
    &:focus-visible {
      border-color: var(--su-primary-400);
    }
    
    &:active {
      background-color: rgb(var(--su-primary-400-rgb) / 20%);
    }
  }
  
  .su-links-group-separator {
    color: var(--su-text-tertiary);
  }
}
</style>