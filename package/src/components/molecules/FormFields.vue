<script setup lang="ts">
import { computed, h, Fragment, Comment, Text } from 'vue'
import Input from './InputField.vue'
import SelectBox from './SelectBoxField.vue'
import RadioGroup from './RadioGroupField.vue'
import CheckboxGroup from './CheckboxGroupField.vue'
import Switch from './SwitchField.vue'
import FileUpload from './FileUploadField.vue'
import Textarea from './TextareaField.vue'
import Slider from './SliderField.vue'
import type { FormFieldsProps } from '@/types'

export interface Props extends FormFieldsProps {}

const props = withDefaults(defineProps<Props>(), {
  gap: 'md',
  sectionGap: 'lg',
  direction: 'vertical'
})

const slots = defineSlots<{
  head?(): any
  default(): any
  footer?(): any
}>()

// Liste des composants de formulaire acceptés
const FORM_FIELD_COMPONENTS = [
  Input,
  SelectBox,
  RadioGroup,
  CheckboxGroup,
  Switch,
  FileUpload,
  Textarea,
  Slider
]

// Classes CSS pour le container
const containerClasses = computed(() => [
  'su-form-fields',
  `su-form-fields--gap-${props.gap}`,
  `su-form-fields--section-gap-${props.sectionGap}`,
  `su-form-fields--${props.direction}`
])

// Traitement des champs du slot avec propagation des props
const processedFields = computed(() => {
  if (!slots?.default) return []

  const children = (slots?.default?.() ?? [])
  const processedChildren = []

  for (const vnode of children) {
    // Vérifie si le VNode est un composant de formulaire accepté
    const isFormFieldComponent = FORM_FIELD_COMPONENTS.some(component => vnode.type === component)
    
    if (isFormFieldComponent) {
      // Crée un nouvel objet de props en fusionnant les props existantes
      // avec les props du FormFields (qui ont la priorité)
      const newProps = { ...vnode.props }

      // Force la prop size si définie sur le FormFields
      if (props.size) {
        newProps.size = props.size
      }

      // Recrée le VNode du champ avec les nouvelles props
      processedChildren.push(h(vnode.type, newProps, vnode?.children))
    } else if (vnode.type === Comment || vnode.type === Text || vnode.type === Fragment) {
      // Ignore les commentaires, nœuds de texte et fragments
      continue
    } else {
      // Avertit si un élément non-champ de formulaire est trouvé
      console.warn('FormFields expects only form field components as children. Found:', vnode.type)
      // Pour la cohérence, on l'ignore ici
    }
  }

  return processedChildren
})

// Traitement du slot head
const processedHead = computed(() => {
  if (!slots?.head) return []
  return slots.head()
})

// Traitement du slot footer
const processedFooter = computed(() => {
  if (!slots?.footer) return []
  return slots.footer()
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
    <!-- Slot head -->
    <div v-if="$slots.head" class="su-form-fields-head">
      <slot name="head" />
    </div>

    <!-- Champs de formulaire -->
    <div class="su-form-fields-content">
      <component 
        v-for="(field, index) in processedFields" 
        :key="index"
        :is="field"
      />
    </div>

    <!-- Slot footer -->
    <div v-if="$slots.footer" class="su-form-fields-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss">
@use '../../styles/main' as *;

.su-form-fields {
  display: flex;
  flex-direction: column;
  
  // Section gaps (espacement entre head, content, footer)
  &--section-gap-sm {
    gap: 1rem;
  }
  
  &--section-gap-md {
    gap: 1.5rem;
  }
  
  &--section-gap-lg {
    gap: 2rem;
  }
  
  &--section-gap-xl {
    gap: 2.5rem;
  }
}

.su-form-fields-head,
.su-form-fields-footer {
  flex-shrink: 0;
}

.su-form-fields-content {
  display: flex;
  flex: 1;
  
  // Direction
  .su-form-fields--vertical & {
    flex-direction: column;
  }
  
  .su-form-fields--horizontal & {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
  }
  
  // Gaps pour les champs (dans le content)
  .su-form-fields--gap-sm & {
    gap: 0.75rem;
  }
  
  .su-form-fields--gap-md & {
    gap: 1rem;
  }
  
  .su-form-fields--gap-lg & {
    gap: 1.5rem;
  }
  
  .su-form-fields--gap-xl & {
    gap: 2rem;
  }
  
  // Ajustements pour la direction horizontale
  .su-form-fields--horizontal & {
    > * {
      flex: 1;
      min-width: 0;
    }
  }
}

// Responsive : passer en vertical sur mobile
@media (max-width: 768px) {
  .su-form-fields--horizontal {
    .su-form-fields-content {
      flex-direction: column;
      
      > * {
        flex: none;
      }
    }
  }
}
</style>