<script setup lang="ts">
import { computed, h, Fragment, Comment, Text, type VNode } from 'vue'
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
  const processedChildren: VNode[] = []

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
@use '../../styles/abstracts' as *;

// ============================================================
// LINK GROUP — liens alignés, séparés ou « connectés » (gap none)
// en barre segmentée sur surface de contrôle
// ============================================================

.su-links-group {
  display: inline-flex;
  align-items: center;
  gap: $spacing-2;

  &--gap-sm { gap: $spacing-1; }
  &--gap-md { gap: $spacing-2; }
  &--gap-lg { gap: $spacing-3; }
  &--gap-none { gap: 0; }

  &--horizontal {
    flex-direction: row;
  }

  &--vertical {
    flex-direction: column;
    align-items: flex-start;
  }

  // ### Barre connectée

  &--connected {
    gap: 0;

    .su-links-group__link {
      justify-content: center;
      box-sizing: border-box;
      min-height: var(--su-control-height-md);
      margin: 0;
      padding: 0 0.75rem;
      border: 1px solid var(--su-border-input);
      border-radius: 0;
      background-color: var(--su-bg-control);
      background-clip: padding-box;
      text-decoration: none;

      @include up('sm') {
        min-height: var(--su-control-height-md-compact);
      }

      &:hover:not(.su-link--disabled) {
        z-index: 1;
        background-image: linear-gradient(var(--su-bg-accent), var(--su-bg-accent));
      }

      &:focus-visible {
        z-index: 2;
      }
    }

    &.su-links-group--horizontal {
      box-shadow: var(--su-shadow-control);
      border-radius: var(--su-radius-control);

      .su-links-group__link {
        &:not(:first-child) {
          margin-inline-start: -1px;
        }

        &:first-child {
          border-start-start-radius: var(--su-radius-control);
          border-end-start-radius: var(--su-radius-control);
        }

        &:last-child {
          border-start-end-radius: var(--su-radius-control);
          border-end-end-radius: var(--su-radius-control);
        }
      }
    }

    &.su-links-group--vertical {
      align-items: stretch;

      .su-links-group__link {
        justify-content: flex-start;

        &:not(:first-child) {
          margin-top: -1px;
        }

        &:first-child {
          border-start-start-radius: var(--su-radius-control);
          border-start-end-radius: var(--su-radius-control);
        }

        &:last-child {
          border-end-start-radius: var(--su-radius-control);
          border-end-end-radius: var(--su-radius-control);
        }
      }
    }
  }
}

.su-links-group-separator {
  color: var(--su-text-tertiary);
  font-size: 0.875em;
  user-select: none;

  .su-links-group--vertical & {
    display: none;
  }
}
</style>
