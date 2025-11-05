<script setup lang="ts">
import { computed, useAttrs, ref } from 'vue'
import type { Component } from 'vue'
import { CheckIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { AccessibilityProps, Size, State } from '@/types'

defineOptions({ inheritAttrs: false })

export interface SwitchProps extends AccessibilityProps {
  //modelValue?: boolean
  leftLabel?: string
  rightLabel?: string
  leftIcon?: Component
  rightIcon?: Component
  size?: Size
  state?: State
  disabled?: boolean
  readonly?: boolean
  required?: boolean
}

const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: false,
  size: 'md',
  state: 'default',
  disabled: false,
  readonly: false,
  required: false
})

const modelValue = defineModel<boolean>({ default: false })

const emit = defineEmits<{
  //'update:modelValue': [boolean] 
  change: [value: boolean]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
}>()

const attrs = useAttrs()
const switchId = computed(() => attrs.id as string || undefined)
const switchRef = ref<HTMLInputElement>()

// Classes CSS - reste identique
const containerClasses = computed(() => [
  'su-switch-container',
  `su-switch-container--${props.size}`,
  `su-switch-container--${props.state}`,
  {
    'su-switch-container--disabled': props.disabled,
    'su-switch-container--readonly': props.readonly,
    'su-switch-container--has-labels': props.leftLabel || props.rightLabel,
    'su-switch-container--centered': props.leftLabel && props.rightLabel
  }
])

const switchClasses = computed(() => [
  'su-switch',
  `su-switch--${props.size}`,
  `su-switch--${props.state}`,
  {
    'su-switch--checked': modelValue.value,
    'su-switch--disabled': props.disabled,
    'su-switch--readonly': props.readonly
  }
])

// Attributs ARIA - reste identique
const ariaAttributes = computed(() => {
  const attrs: Record<string, any> = {
    role: 'switch',
    'aria-checked': modelValue.value
  }
  
  if (props.ariaLabel) attrs['aria-label'] = props.ariaLabel
  if (props.ariaInvalid !== undefined) attrs['aria-invalid'] = props.ariaInvalid
  if (props.ariaRequired !== undefined) attrs['aria-required'] = props.ariaRequired
  if (props.required) attrs['aria-required'] = 'true'
  if (props.state === 'error') attrs['aria-invalid'] = 'true'
  
  return attrs
})

// Gestionnaires d'événements - reste identique
const handleToggle = () => {
  if (props.disabled || props.readonly) return
  
  const newValue = !modelValue.value
  modelValue.value = newValue
  emit('change', newValue)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (['Enter', ' '].includes(event.key)) {
    event.preventDefault()
    handleToggle()
  }
  emit('keydown', event)
}

const handleFocus = (event: FocusEvent) => emit('focus', event)
const handleBlur = (event: FocusEvent) => emit('blur', event)

defineExpose({
  switchRef,
  handleToggle
})
</script>
<template>
  <div :class="containerClasses">
    <!-- Label gauche -->
    <span 
      v-if="leftLabel" 
      class="su-switch-side-label su-switch-side-label--left"
      :class="{
        'su-switch-side-label--active': !modelValue,
        'su-switch-side-label--disabled': disabled
      }"
    >
      {{ leftLabel }}
    </span>
    <!-- Switch -->
    <div
      :id="switchId"
      ref="switchRef"
      :class="switchClasses"
      :tabindex="disabled ? -1 : 0"
      v-bind="ariaAttributes"
      @click="handleToggle"
      @keydown="handleKeydown"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <!-- Track -->
      <div class="su-switch-track">
        <!-- Thumb -->
        <div class="su-switch-thumb">
          <!-- Indicateur visuel optionnel -->
          <div class="su-switch-indicator">
            <component 
              :is="modelValue ? (rightIcon || CheckIcon) : (leftIcon || XMarkIcon)"
              :class="['su-switch-icon', `su-switch-icon--${modelValue ? 'check' : 'cross'}`]"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Label droite -->
    <span 
      v-if="rightLabel" 
      class="su-switch-side-label su-switch-side-label--right"
      :class="{
        'su-switch-side-label--active': modelValue,
        'su-switch-side-label--disabled': disabled
      }"
    >
      {{ rightLabel }}
    </span>
  </div>
</template>

<style lang="scss">
@use '../../styles/main' as *;

.su-switch-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  &--centered {
    justify-content: center;
  }
  
  &--has-labels:not(&--centered) {
    justify-content: flex-start;
  }
}

.su-switch-side-label {
  font-size: $font-size-sm;
  font-weight: 500;
  color: $text-secondary;
  transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  
  &--active {
    color: $text-primary;
  }
  
  &--disabled {
    color: $text-tertiary;
    cursor: not-allowed;
  }
}

.su-switch {
  position: relative;
  cursor: pointer;
  outline: none;
  border-radius: 9999px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:focus-visible {
    box-shadow: 0 0 0 3px rgba($primary-500, 0.2);
  }
  
  // Tailles
  &--sm {
    width: 2.75rem;
    height: 1.5rem;
    
    .su-switch-thumb {
      width: 1.25rem;
      height: 1.25rem;
      margin: 0.125rem;
    }
    
    .su-switch-icon {
      width: 0.75rem;
      height: 0.75rem;
    }
    
    &.su-switch--checked .su-switch-thumb {
      transform: translateX(1.25rem);
    }
  }
  
  &--md {
    width: 3.5rem;
    height: 2rem;
    
    .su-switch-thumb {
      width: 1.75rem;
      height: 1.75rem;
      margin: 0.125rem;
    }
    
    .su-switch-icon {
      width: 1rem;
      height: 1rem;
    }
    
    &.su-switch--checked .su-switch-thumb {
      transform: translateX(1.5rem);
    }
  }
  
  &--lg {
    width: 4rem;
    height: 2.25rem;
    
    .su-switch-thumb {
      width: 2rem;
      height: 2rem;
      margin: 0.125rem;
    }
    
    .su-switch-icon {
      width: 1.25rem;
      height: 1.25rem;
    }
    
    &.su-switch--checked .su-switch-thumb {
      transform: translateX(1.75rem);
    }
  }
  
  // États
  &--checked {
    .su-switch-track {
      background-color: $primary-600;
    }
    
    .su-switch-thumb {
      background-color: white;
    }
  }
  
  &--error {
    &.su-switch--checked .su-switch-track {
      background-color: $error-500;
    }
  }
  
  &--success {
    &.su-switch--checked .su-switch-track {
      background-color: $success-500;
    }
  }
  
  &--warning {
    &.su-switch--checked .su-switch-track {
      background-color: $warning-500;
    }
  }
  
  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    
    &:focus-visible {
      box-shadow: none;
    }
  }
  
  &--readonly {
    cursor: default;
  }
}

.su-switch-track {
  width: 100%;
  height: 100%;
  background-color: $gray-300;
  border-radius: 9999px;
  transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.su-switch-thumb {
  background-color: white;
  border-radius: 9999px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
}

.su-switch-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
}

.su-switch-icon {
  color: $gray-600;
  
  &--check {
    color: $primary-600;
  }
  
  &--cross {
    color: $gray-400;
  }
  
  &--custom {
    color: currentColor;
  }
}
</style>
