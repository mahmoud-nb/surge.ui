<script setup lang="ts">
import { computed, ref, useAttrs, useId } from 'vue'
import { announceToScreenReader } from '@/utils/accessibility'
import FormField from '@/components/atoms/FormField.vue'
import type { SliderFieldProps } from '@/types'

export interface Props extends Omit<SliderFieldProps, 'value'> {}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  step: 1,
  size: 'md',
  state: 'default',
  disabled: false,
  readonly: false,
  required: false,
  orientation: 'horizontal',
  tooltip: 'none',
  marks: () => [],
  showValue: true,
  showTicks: false,
  showLabels: false
})

// Utilisation de defineModel pour v-model
const modelValue = defineModel<number | [number, number]>()

const emit = defineEmits<{
  change: [value: number | [number, number]]
  input: [value: number | [number, number]]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
}>()

const attrs = useAttrs()

// Refs
const sliderRef = ref<HTMLDivElement>()
const trackRef = ref<HTMLDivElement>()
const thumb1Ref = ref<HTMLDivElement>()
const thumb2Ref = ref<HTMLDivElement>()
const isDragging = ref(false)
const activeThumb = ref<'min' | 'max' | null>(null)
const showTooltip1 = ref(false)
const showTooltip2 = ref(false)

const fieldId = 'slider-' + useId()
const sliderId = computed(() => attrs.id as string || fieldId)

// Détection automatique du mode dual-range
const isDualRange = computed(() => {
  return Array.isArray(modelValue.value)
})

// Valeurs normalisées
const currentValue = computed({
  get() {
    // Si modelValue n'est pas défini, utiliser les valeurs par défaut
    if (modelValue.value === undefined || modelValue.value === null) {
      return props.min
    }
    return modelValue.value
  },
  set(newValue: number | [number, number]) {
    modelValue.value = newValue
    emit('change', newValue)
    emit('input', newValue)
  }
})

const minValue = computed(() => {
  return isDualRange.value ? (currentValue.value as [number, number])[0] : (currentValue.value as number)
})

const maxValue = computed(() => {
  return isDualRange.value ? (currentValue.value as [number, number])[1] : (currentValue.value as number)
})

// Formatage des valeurs
const formatValue = (value: number): string => {
  if (props.formatValue) {
    return props.formatValue(value)
  }
  return value.toString()
}

// Calcul des pourcentages
const minPercent = computed(() => {
  return ((minValue.value - props.min) / (props.max - props.min)) * 100
})

const maxPercent = computed(() => {
  return ((maxValue.value - props.min) / (props.max - props.min)) * 100
})

// Classes CSS
const containerClasses = computed(() => [
  'su-slider-container',
  `su-slider-container--${props.size}`,
  `su-slider-container--${props.state}`,
  `su-slider-container--${props.orientation}`,
  {
    'su-slider-container--disabled': props.disabled,
    'su-slider-container--readonly': props.readonly,
    'su-slider-container--dual': isDualRange.value,
    'su-slider-container--dragging': isDragging.value
  }
])

const trackClasses = computed(() => [
  'su-slider-track',
  `su-slider-track--${props.size}`,
  `su-slider-track--${props.state}`,
  `su-slider-track--${props.orientation}`
])

const getThumbClasses = (thumbType: 'min' | 'max') => [
  'su-slider-thumb',
  `su-slider-thumb--${props.size}`,
  `su-slider-thumb--${props.state}`,
  `su-slider-thumb--${props.orientation}`,
  {
    'su-slider-thumb--disabled': props.disabled,
    'su-slider-thumb--readonly': props.readonly,
    'su-slider-thumb--active': activeThumb.value === thumbType
  }
]

// Attributs ARIA
const getAriaAttributes = (thumbType: 'min' | 'max') => {
  const value = thumbType === 'min' ? minValue.value : maxValue.value
  const attrs: Record<string, any> = {
    role: 'slider',
    'aria-valuemin': props.min,
    'aria-valuemax': props.max,
    'aria-valuenow': value,
    'aria-valuetext': props.ariaValueText || formatValue(value),
    'aria-orientation': props.orientation
  }
  
  if (props.ariaLabel) {
    attrs['aria-label'] = isDualRange.value 
      ? `${props.ariaLabel} ${thumbType === 'min' ? 'minimum' : 'maximum'}` 
      : props.ariaLabel
  }
  if (props.ariaInvalid !== undefined) attrs['aria-invalid'] = props.ariaInvalid
  if (props.ariaRequired !== undefined) attrs['aria-required'] = props.ariaRequired
  if (props.required) attrs['aria-required'] = 'true'
  if (props.state === 'error') attrs['aria-invalid'] = 'true'
  
  return attrs
}

// Utilitaires de calcul
const clampValue = (value: number): number => {
  return Math.max(props.min, Math.min(props.max, value))
}

const snapToStep = (value: number): number => {
  const steps = Math.round((value - props.min) / props.step)
  return props.min + (steps * props.step)
}

const getValueFromPosition = (clientX: number, clientY: number): number => {
  if (!trackRef.value) return props.min
  
  const rect = trackRef.value.getBoundingClientRect()
  let percent: number
  
  if (props.orientation === 'horizontal') {
    percent = (clientX - rect.left) / rect.width
  } else {
    percent = 1 - (clientY - rect.top) / rect.height
  }
  
  percent = Math.max(0, Math.min(1, percent))
  const rawValue = props.min + (percent * (props.max - props.min))
  return snapToStep(clampValue(rawValue))
}

// Gestionnaires d'événements
const updateValue = (newValue: number, thumbType: 'min' | 'max' = 'min') => {
  if (props.disabled || props.readonly) return
  
  const clampedValue = clampValue(snapToStep(newValue))
  
  if (isDualRange.value) {
    const [currentMin, currentMax] = currentValue.value as [number, number]
    
    if (thumbType === 'min') {
      currentValue.value = [Math.min(clampedValue, currentMax), currentMax]
    } else {
      currentValue.value = [currentMin, Math.max(clampedValue, currentMin)]
    }
  } else {
    currentValue.value = clampedValue
  }
  
  // Annonce pour les lecteurs d'écran
  const announcement = isDualRange.value 
    ? `${thumbType === 'min' ? 'Minimum' : 'Maximum'} : ${formatValue(clampedValue)}`
    : formatValue(clampedValue)
  announceToScreenReader(announcement)
}

const handleMouseDown = (event: MouseEvent, thumbType: 'min' | 'max' = 'min') => {
  if (props.disabled || props.readonly) return
  
  event.preventDefault()
  isDragging.value = true
  activeThumb.value = thumbType
  
  const handleMouseMove = (e: MouseEvent) => {
    const newValue = getValueFromPosition(e.clientX, e.clientY)
    updateValue(newValue, thumbType)
  }
  
  const handleMouseUp = () => {
    isDragging.value = false
    activeThumb.value = null
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }
  
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const handleTrackClick = (event: MouseEvent) => {
  if (props.disabled || props.readonly) return
  
  const newValue = getValueFromPosition(event.clientX, event.clientY)
  
  if (isDualRange.value) {
    const [currentMin, currentMax] = currentValue.value as [number, number]
    const distanceToMin = Math.abs(newValue - currentMin)
    const distanceToMax = Math.abs(newValue - currentMax)
    const thumbType = distanceToMin <= distanceToMax ? 'min' : 'max'
    updateValue(newValue, thumbType)
  } else {
    updateValue(newValue)
  }
}

const handleKeyDown = (event: KeyboardEvent, thumbType: 'min' | 'max' = 'min') => {
  if (props.disabled || props.readonly) return
  
  const currentVal = thumbType === 'min' ? minValue.value : maxValue.value
  let newValue = currentVal
  const largeStep = (props.max - props.min) / 10
  
  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowUp':
      event.preventDefault()
      newValue = currentVal + props.step
      break
    case 'ArrowLeft':
    case 'ArrowDown':
      event.preventDefault()
      newValue = currentVal - props.step
      break
    case 'PageUp':
      event.preventDefault()
      newValue = currentVal + largeStep
      break
    case 'PageDown':
      event.preventDefault()
      newValue = currentVal - largeStep
      break
    case 'Home':
      event.preventDefault()
      newValue = props.min
      break
    case 'End':
      event.preventDefault()
      newValue = props.max
      break
    default:
      return
  }
  
  updateValue(newValue, thumbType)
  emit('keydown', event)
}

const handleFocus = (event: FocusEvent, thumbType: 'min' | 'max' = 'min') => {
  if (props.tooltip !== 'none') {
    if (thumbType === 'min') {
      showTooltip1.value = true
    } else {
      showTooltip2.value = true
    }
  }
  emit('focus', event)
}

const handleBlur = (event: FocusEvent, thumbType: 'min' | 'max' = 'min') => {
  if (props.tooltip !== 'none') {
    if (thumbType === 'min') {
      showTooltip1.value = false
    } else {
      showTooltip2.value = false
    }
  }
  emit('blur', event)
}

const handleMouseEnter = (thumbType: 'min' | 'max' = 'min') => {
  if (props.tooltip !== 'none' && !props.disabled) {
    if (thumbType === 'min') {
      showTooltip1.value = true
    } else {
      showTooltip2.value = true
    }
  }
}

const handleMouseLeave = (thumbType: 'min' | 'max' = 'min') => {
  if (props.tooltip !== 'none') {
    if (thumbType === 'min') {
      showTooltip1.value = false
    } else {
      showTooltip2.value = false
    }
  }
}

// Génération des ticks
const ticks = computed(() => {
  if (!props.showTicks) return []
  
  const tickCount = Math.min(21, (props.max - props.min) / props.step + 1)
  const tickStep = (props.max - props.min) / (tickCount - 1)
  
  return Array.from({ length: tickCount }, (_, i) => {
    const value = props.min + (i * tickStep)
    const percent = ((value - props.min) / (props.max - props.min)) * 100
    return { value: snapToStep(value), percent }
  })
})

// Génération des marques
const processedMarks = computed(() => {
  if (!props.marks || props.marks.length === 0) return []
  
  return props.marks
    .filter(mark => mark >= props.min && mark <= props.max)
    .map(mark => {
      const percent = ((mark - props.min) / (props.max - props.min)) * 100
      return { value: mark, percent }
    })
})

// Méthodes exposées
const focus = () => {
  thumb1Ref.value?.focus()
}

defineExpose({
  focus,
  sliderRef,
  thumb1Ref,
  thumb2Ref
})
</script>

<template>
  <FormField
    :field-id="sliderId"
    :label="label"
    :message="message"
    :state="state"
    :required="required"
    :disabled="disabled"
  >
    <template #default="{ fieldId: id, messageId }">
      <div 
        class="su-slider" 
        :class="containerClasses"
      >
        <!-- Slot before -->
        <div
          v-if="$slots.before"
          class="su-slider-before"
        >
          <slot name="before" />
        </div>

        <!-- Labels min/max (si activés) -->
        <div
          v-if="showLabels"
          class="su-slider-labels"
        >
          <span class="su-slider-label su-slider-label--min">{{ formatValue(min) }}</span>
          <span class="su-slider-label su-slider-label--max">{{ formatValue(max) }}</span>
        </div>

        <!-- Container du slider -->
        <div class="su-slider-wrapper">
          <!-- Valeur affichée (si activée et pas de tooltip) -->
          <div
            v-if="showValue && tooltip === 'none'"
            class="su-slider-value"
          >
            <span
              v-if="!isDualRange"
              class="su-slider-value-display"
            >
              {{ formatValue(minValue) }}
            </span>
            <div
              v-else
              class="su-slider-value-dual"
            >
              <span class="su-slider-value-min">{{ formatValue(minValue) }}</span>
              <span class="su-slider-value-separator">-</span>
              <span class="su-slider-value-max">{{ formatValue(maxValue) }}</span>
            </div>
          </div>

          <!-- Slider -->
          <div 
            ref="sliderRef"
            class="su-slider-slider"
            :aria-describedby="messageId"
            @click="handleTrackClick"
          >
            <!-- Track de fond -->
            <div
              ref="trackRef"
              :class="trackClasses"
            >
              <!-- Track actif -->
              <div 
                class="su-slider-track-active"
                :style="{
                  [orientation === 'horizontal' ? 'left' : 'bottom']: `${isDualRange ? Math.min(minPercent, maxPercent) : 0}%`,
                  [orientation === 'horizontal' ? 'width' : 'height']: `${isDualRange ? Math.abs(maxPercent - minPercent) : Math.abs(minPercent)}%`
                }"
              />

              <!-- Ticks (si activés) -->
              <div
                v-if="showTicks"
                class="su-slider-ticks"
              >
                <div
                  v-for="tick in ticks"
                  :key="tick.value"
                  class="su-slider-tick"
                  :style="{
                    [orientation === 'horizontal' ? 'left' : 'bottom']: `${tick.percent}%`
                  }"
                />
              </div>

              <!-- Marques personnalisées -->
              <div
                v-if="processedMarks.length > 0"
                class="su-slider-marks"
              >
                <div
                  v-for="mark in processedMarks"
                  :key="mark.value"
                  class="su-slider-mark"
                  :style="{
                    [orientation === 'horizontal' ? 'left' : 'bottom']: `${mark.percent}%`
                  }"
                >
                  <div class="su-slider-mark-dot" />
                  <div class="su-slider-mark-label">
                    {{ formatValue(mark.value) }}
                  </div>
                </div>
              </div>

              <!-- Thumb principal (ou minimum pour dual) -->
              <div
                :id="isDualRange ? `${id}-min` : id"
                ref="thumb1Ref"
                :class="getThumbClasses('min')"
                :style="{
                  [orientation === 'horizontal' ? 'left' : 'bottom']: `${minPercent}%`
                }"
                :tabindex="disabled ? -1 : 0"
                v-bind="getAriaAttributes('min')"
                @mousedown="handleMouseDown($event, 'min')"
                @keydown="handleKeyDown($event, 'min')"
                @focus="handleFocus($event, 'min')"
                @blur="handleBlur($event, 'min')"
                @mouseenter="handleMouseEnter('min')"
                @mouseleave="handleMouseLeave('min')"
              >
                <div class="su-slider-thumb-handle" />
                
                <!-- Tooltip pour le thumb principal -->
                <div 
                  v-if="tooltip !== 'none' && (showTooltip1 || isDragging && activeThumb === 'min')"
                  class="su-slider-tooltip"
                  :class="`su-slider-tooltip--${tooltip}`"
                >
                  {{ formatValue(minValue) }}
                </div>
              </div>

              <!-- Thumb maximum (dual seulement) -->
              <div
                v-if="isDualRange"
                :id="`${id}-max`"
                ref="thumb2Ref"
                :class="getThumbClasses('max')"
                :style="{
                  [orientation === 'horizontal' ? 'left' : 'bottom']: `${maxPercent}%`
                }"
                :tabindex="disabled ? -1 : 0"
                v-bind="getAriaAttributes('max')"
                @mousedown="handleMouseDown($event, 'max')"
                @keydown="handleKeyDown($event, 'max')"
                @focus="handleFocus($event, 'max')"
                @blur="handleBlur($event, 'max')"
                @mouseenter="handleMouseEnter('max')"
                @mouseleave="handleMouseLeave('max')"
              >
                <div class="su-slider-thumb-handle" />
                
                <!-- Tooltip pour le thumb maximum -->
                <div 
                  v-if="tooltip !== 'none' && (showTooltip2 || isDragging && activeThumb === 'max')"
                  class="su-slider-tooltip"
                  :class="`su-slider-tooltip--${tooltip}`"
                >
                  {{ formatValue(maxValue) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Slot after -->
        <div
          v-if="$slots.after"
          class="su-slider-after"
        >
          <slot name="after" />
        </div>
      </div>
    </template>
  </FormField>
</template>

<!-- Pas de styles propres : mêmes classes que SuSlider (atoms/Slider.vue), dont les styles globaux s'appliquent -->
