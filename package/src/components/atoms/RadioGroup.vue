<script setup lang="ts">
import { computed, useAttrs, useId } from 'vue'
import type { RadioGroupProps } from '@/types'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<RadioGroupProps>(), {
  options: () => [],
  size: 'md',
  state: 'default',
  disabled: false,
  required: false,
  displayType: 'default',
  direction: 'vertical',
  maxHeight: null,
})

// Définition du modèle en premier
const modelValue = defineModel<string | number>('modelValue')

const emit = defineEmits<{
  change: [value: string | number]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const attrs = useAttrs()

// Génération d'IDs uniques
const fieldId = 'radio-group-' + useId()
const radioGroupId = computed(() => attrs.id as string || fieldId)
const radioName = computed(() => props.name || fieldId)

// Classes CSS
const groupClasses = computed(() => [
  'su-radio-group',
  `su-radio-group--${props.size}`,
  `su-radio-group--${props.state}`,
  `su-radio-group--${props.displayType}`,
  `su-radio-group--${props.direction}`,
  {
    'su-radio-group--disabled': props.disabled,
    'su-radio-group--scrollable': props.maxHeight
  }
])

const getOptionClasses = (option: any) => [
  'su-radio-option',
  `su-radio-option--${props.size}`,
  `su-radio-option--${props.state}`,
  `su-radio-option--${props.displayType}`,
  {
    'su-radio-option--selected': modelValue.value === option.value,
    'su-radio-option--disabled': option.disabled || props.disabled
  }
]

// Attributs ARIA
const ariaAttributes = computed(() => {
  const attrs: Record<string, any> = {
    role: 'radiogroup'
  }
  
  if (props.ariaLabel) attrs['aria-label'] = props.ariaLabel
  if (props.ariaDescribedBy) {
    const describedBy = [props.ariaDescribedBy].filter(Boolean).join(' ')
    attrs['aria-describedby'] = describedBy
  }
  if (props.required) attrs['aria-required'] = 'true'
  if (props.state === 'error') attrs['aria-invalid'] = 'true'
  
  return attrs
})

// Gestionnaires d'événements
const handleChange = (value: string | number) => {
  if (props.disabled) return
  
  modelValue.value = value
  emit('change', value)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}
</script>

<template>
  <fieldset 
    :class="groupClasses"
    v-bind="ariaAttributes"
  >
    <!-- Options -->
    <div 
      class="su-radio-group-options"
      :style="{ maxHeight: maxHeight || undefined, overflowY: maxHeight ? 'auto' : undefined }"
    >
      <!-- Slot before: contenu entre le label et les options -->
      <div
        v-if="$slots.before"
        class="su-radio-group-before"
      >
        <slot name="before" />
      </div>

      <label
        v-for="option in options"
        :key="option.value"
        :class="getOptionClasses(option)"
        :for="`${radioGroupId}-${option.value}`"
      >
        <!-- Input radio caché -->
        <input
          :id="`${radioGroupId}-${option.value}`"
          type="radio"
          :name="radioName"
          :value="option.value"
          :checked="modelValue === option.value"
          :disabled="option.disabled || disabled"
          :required="required"
          class="su-radio-input"
          @change="handleChange(option.value)"
          @focus="handleFocus"
          @blur="handleBlur"
        >

        <!-- Indicateur radio personnalisé -->
        <div class="su-radio-indicator">
          <div class="su-radio-dot" />
        </div>

        <!-- Contenu de l'option -->
        <div class="su-radio-content">
          <!-- Icône -->
          <component 
            :is="option.icon" 
            v-if="option.icon" 
            class="su-radio-icon"
            aria-hidden="true"
          />
          
          <!-- Texte -->
          <div class="su-radio-text">
            <div class="su-radio-label">{{ option.label }}</div>
            <div 
              v-if="option.description" 
              class="su-radio-description"
            >
              {{ option.description }}
            </div>
          </div>
        </div>
      </label>
    </div>

    <!-- Slot after: contenu entre les options et le message -->
    <div
      v-if="$slots.after"
      class="su-radio-group-after"
    >
      <slot name="after" />
    </div>
  </fieldset>
</template>

<style lang="scss">
@use '../../styles/main' as *;
@use '../../styles/foundations/colors' as *;

.su-radio-group-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.su-radio-group {
  border: none;
  padding: 0;
  margin: 0;
  
  &-label {
    display: block;
    font-size: var(--su-font-size-sm);
    font-weight: 500;
    color: var(--su-text-primary);
    line-height: var(--su-line-height-tight);
    margin-bottom: 0.75rem;
    
    &--required {
      .su-radio-group-required {
        color: var(--su-state-error);
        margin-left: 0.125rem;
      }
    }
    
    &--disabled {
      color: var(--su-text-tertiary);
      cursor: not-allowed;
    }
  }
  
  &-options {
    display: flex;
    gap: 0.75rem;
  }
  
  // Direction
  &--vertical {
    .su-radio-group-options {
      flex-direction: column;
    }
  }
  
  &--horizontal {
    .su-radio-group-options {
      flex-flow: row wrap;
    }
  }
  
  // Style carte
  &--inline-card,
  &--block-card {
    .su-radio-group-options {
      gap: 0.75rem;
    }
  }
  
  &--inline-card {
    .su-radio-group-options {
      gap: 0.5rem;
    }
  }
  
  // Scroll
  &--scrollable {
    .su-radio-group-options {
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: var(--su-border-default) var(--su-bg-hover);
      
      &::-webkit-scrollbar {
        width: 6px;
      }
      
      &::-webkit-scrollbar-track {
        background: var(--su-bg-hover);
        border-radius: 3px;
      }
      
      &::-webkit-scrollbar-thumb {
        background: var(--su-border-default);
        border-radius: 3px;
        
        &:hover {
          background: var(--su-border-strong);
        }
      }
    }
  }
}

.su-radio-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all var(--su-duration-fast) cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  
  // Style par défaut
  &--default {
    padding: 0.25rem 0;
    
    &:hover:not(&--disabled) {
      .su-radio-indicator {
        border-color: var(--su-link-hover);
      }
    }
  }
  
  // Style carte
  &--inline-card,
  &--block-card {
    padding: 1rem;
    border: 1px solid var(--su-border-default);
    border-radius: var(--su-radius-md);
    background-color: var(--su-bg-surface);
    
    &:hover:not(&--disabled) {
      border-color: var(--su-link-hover);
      box-shadow: 0 2px 4px rgb(0 0 0 / 5%);
    }
    
    &--selected {
      border-color: var(--su-link-default);
      background-color: var(--su-bg-selected);
      box-shadow: 0 0 0 1px var(--su-link-default);
    }
  }
  
  &--inline-card {
    .su-radio-content {
      text-align: center;
    }
    
    .su-radio-indicator {
      align-self: center;
    }
  }
  
  &--block-card {
    width: 100%;
  }
  
  // Tailles
  &--sm {
    .su-radio-indicator {
      width: 1rem;
      height: 1rem;
      
      .su-radio-dot {
        width: 0.375rem;
        height: 0.375rem;
      }
    }
    
    .su-radio-label {
      font-size: var(--su-font-size-sm);
    }
    
    .su-radio-description {
      font-size: 0.75rem;
    }
    
    &.su-radio-option--inline-card,
    &.su-radio-option--block-card {
      padding: 0.75rem;
    }
  }
  
  &--md {
    .su-radio-indicator {
      width: 1.25rem;
      height: 1.25rem;
      
      .su-radio-dot {
        width: 0.5rem;
        height: 0.5rem;
      }
    }
    
    .su-radio-label {
      font-size: var(--su-font-size-base);
    }
    
    .su-radio-description {
      font-size: var(--su-font-size-sm);
    }
  }
  
  &--lg {
    .su-radio-indicator {
      width: 1.5rem;
      height: 1.5rem;
      
      .su-radio-dot {
        width: 0.625rem;
        height: 0.625rem;
      }
    }
    
    .su-radio-label {
      font-size: var(--su-font-size-lg);
    }
    
    .su-radio-description {
      font-size: var(--su-font-size-base);
    }
    
    &.su-radio-option--inline-card,
    &.su-radio-option--block-card {
      padding: 1.25rem;
    }
  }
  
  // États
  &--error {
    &.su-radio-option--inline-card,
    &.su-radio-option--block-card {
      border-color: var(--su-state-error-bg);
      
      &--selected {
        border-color: var(--su-state-error);
        background-color: var(--su-state-error-bg);
      }
    }
    
    .su-radio-indicator {
      border-color: var(--su-state-error);
      
      &.su-radio-indicator--checked {
        background-color: var(--su-state-error);
      }
    }
  }
  
  &--success {
    &.su-radio-option--inline-card,
    &.su-radio-option--block-card {
      border-color: var(--su-state-success-bg);
      
      &--selected {
        border-color: var(--su-state-success);
        background-color: var(--su-state-success-bg);
      }
    }
    
    .su-radio-indicator {
      border-color: var(--su-state-success);
      
      &.su-radio-indicator--checked {
        background-color: var(--su-state-success);
      }
    }
  }
  
  &--warning {
    &.su-radio-option--inline-card,
    &.su-radio-option--block-card {
      border-color: var(--su-state-warning-bg);
      
      &--selected {
        border-color: var(--su-state-warning);
        background-color: var(--su-state-warning-bg);
      }
    }
    
    .su-radio-indicator {
      border-color: var(--su-state-warning);
      
      &.su-radio-indicator--checked {
        background-color: var(--su-state-warning);
      }
    }
  }
  
  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    
    &.su-radio-option--inline-card,
    &.su-radio-option--block-card {
      background-color: var(--su-bg-hover);
      border-color: var(--su-border-default);
    }
  }
}

.su-radio-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  
  &:focus + .su-radio-indicator {
    box-shadow: 0 0 0 3px rgb(var(--su-link-default-rgb) / 20%);
  }
  
  &:checked + .su-radio-indicator {
    border-color: var(--su-link-default);
    background-color: var(--su-bg-surface);
    
    .su-radio-dot {
      background-color: var(--su-link-default);
      transform: scale(1);
    }
  }
}

.su-radio-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--su-border-default);
  border-radius: 50%;
  background-color: var(--su-bg-surface);
  transition: all var(--su-duration-fast) cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  
  &-dot {
    border-radius: 50%;
    background-color: transparent;
    transform: scale(0);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }
}

.su-radio-content {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.su-radio-icon {
  width: 1.25em;
  height: 1.25em;
  flex-shrink: 0;
  color: var(--su-text-secondary);
  margin-top: 0.125rem;
}

.su-radio-text {
  flex: 1;
  min-width: 0;
}

.su-radio-label {
  font-weight: 500;
  color: var(--su-text-primary);
  line-height: var(--su-line-height-tight);
}

.su-radio-description {
  color: var(--su-text-secondary);
  line-height: var(--su-line-height-normal);
  margin-top: 0.25rem;
}

.su-radio-group-toggle {
  margin-top: 0.75rem;
  padding: 0.5rem 1rem;
  background-color: transparent;
  border: 1px solid var(--su-border-default);
  border-radius: var(--su-radius-md);
  color: var(--su-link-default);
  font-size: var(--su-font-size-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--su-duration-fast) cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    background-color: var(--su-bg-hover);
    border-color: var(--su-link-hover);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgb(var(--su-link-default-rgb) / 20%);
  }
}

.su-radio-group-message {
  font-size: var(--su-font-size-sm);
  line-height: var(--su-line-height-tight);
  
  &--default {
    color: var(--su-text-secondary);
  }
  
  &--error {
    color: var(--su-state-error);
  }
  
  &--success {
    color: var(--su-state-success);
  }
  
  &--warning {
    color: var(--su-state-warning);
  }
}

.su-radio-group-before,
.su-radio-group-after {
  margin: 0.75rem 0;
  
  &:first-child {
    margin-top: 0;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
}

// Mode sombre
@media (prefers-color-scheme: dark) {
  .su-radio-group-label {
    color: var(--su-text-primary);
    
    &--disabled {
      color: var(--su-text-tertiary);
    }
  }
  
  .su-radio-option {
    &--inline-card,
    &--block-card {
      background-color: var(--su-bg-surface);
      border-color: var(--su-border-default);
      
      &:hover:not(&--disabled) {
        border-color: var(--su-link-hover);
      }
      
      &--selected {
        border-color: var(--su-link-default);
        background-color: var(--su-bg-selected);
      }
      
      &--disabled {
        background-color: var(--su-bg-hover);
        border-color: var(--su-border-default);
      }
    }
  }
  
  .su-radio-indicator {
    border-color: var(--su-border-default);
    background-color: var(--su-bg-surface);
  }
  
  .su-radio-label {
    color: var(--su-text-primary);
  }
  
  .su-radio-description {
    color: var(--su-text-secondary);
  }
  
  .su-radio-group-toggle {
    background-color: var(--su-bg-surface);
    border-color: var(--su-border-default);
    color: var(--su-link-default);
    
    &:hover {
      background-color: var(--su-bg-hover);
      border-color: var(--su-link-default);
    }
  }
  
  .su-radio-group-message {
    &--default {
      color: var(--su-text-secondary);
    }
  }
}

// Mode de contraste élevé
@media (prefers-contrast: high) {
  .su-radio-indicator {
    border-width: 3px;
  }
  
  .su-radio-option--inline-card,
  .su-radio-option--block-card {
    border-width: 2px;
  }
}

// Support de la réduction des animations
@media (prefers-reduced-motion: reduce) {
  .su-radio-option,
  .su-radio-indicator,
  .su-radio-dot {
    transition: none;
  }
}
</style>