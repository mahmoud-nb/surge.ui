<script setup lang="ts">
import { computed, ref, useAttrs, useId, onBeforeUnmount } from 'vue'
import { announceToScreenReader } from '@/utils/accessibility'
import type { SliderProps } from '@/types'

const props = withDefaults(defineProps<SliderProps>(), {
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
const messageId = computed(() => props.message ? `${sliderId.value}-message` : undefined)

// Détection automatique du mode dual-range
const isDualRange = computed(() => Array.isArray(modelValue.value))

// Valeurs normalisées avec valeur par défaut
const currentValue = computed({
  get(): number | [number, number] {
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
  return isDualRange.value 
    ? (currentValue.value as [number, number])[0] 
    : (currentValue.value as number)
})

const maxValue = computed(() => {
  return isDualRange.value 
    ? (currentValue.value as [number, number])[1] 
    : (currentValue.value as number)
})

// Formatage
const formatValue = (value: number): string => {
  return props.formatValue ? props.formatValue(value) : value.toString()
}

// Calcul des pourcentages (mémoïsés)
const minPercent = computed(() => 
  ((minValue.value - props.min) / (props.max - props.min)) * 100
)

const maxPercent = computed(() => 
  ((maxValue.value - props.min) / (props.max - props.min)) * 100
)

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
const getAriaAttributes = (thumbType: 'min' | 'max'): Record<string, string | number | boolean> => {
  const value = thumbType === 'min' ? minValue.value : maxValue.value
  const baseAttrs: Record<string, string | number | boolean> = {
    role: 'slider',
    'aria-valuemin': props.min,
    'aria-valuemax': props.max,
    'aria-valuenow': value,
    'aria-valuetext': props.ariaValueText || formatValue(value),
    'aria-orientation': props.orientation
  }
  
  if (props.ariaLabel) {
    baseAttrs['aria-label'] = isDualRange.value 
      ? `${props.ariaLabel} ${thumbType === 'min' ? 'minimum' : 'maximum'}` 
      : props.ariaLabel
  }
  if (props.ariaLabelledBy) baseAttrs['aria-labelledby'] = props.ariaLabelledBy
  if (messageId.value) baseAttrs['aria-describedby'] = messageId.value
  if (props.ariaDescribedBy) baseAttrs['aria-describedby'] = props.ariaDescribedBy
  if (props.ariaInvalid !== undefined) baseAttrs['aria-invalid'] = props.ariaInvalid
  if (props.ariaRequired !== undefined || props.required) baseAttrs['aria-required'] = true
  if (props.state === 'error') baseAttrs['aria-invalid'] = true
  
  return baseAttrs
}

// Utilitaires
const clampValue = (value: number): number => 
  Math.max(props.min, Math.min(props.max, value))

const snapToStep = (value: number): number => {
  const steps = Math.round((value - props.min) / props.step)
  return props.min + (steps * props.step)
}

const getValueFromPosition = (clientX: number, clientY: number): number => {
  if (!trackRef.value) return props.min
  
  const rect = trackRef.value.getBoundingClientRect()
  const percent = props.orientation === 'horizontal'
    ? (clientX - rect.left) / rect.width
    : 1 - (clientY - rect.top) / rect.height
  
  const clampedPercent = Math.max(0, Math.min(1, percent))
  const rawValue = props.min + (clampedPercent * (props.max - props.min))
  return snapToStep(clampValue(rawValue))
}

// Gestion des événements - avec nettoyage
let cleanupDrag: (() => void) | null = null

const updateValue = (newValue: number, thumbType: 'min' | 'max' = 'min') => {
  if (props.disabled || props.readonly) return
  
  const clampedValue = clampValue(snapToStep(newValue))
  
  if (isDualRange.value) {
    const [currentMin, currentMax] = currentValue.value as [number, number]
    currentValue.value = thumbType === 'min'
      ? [Math.min(clampedValue, currentMax), currentMax]
      : [currentMin, Math.max(clampedValue, currentMin)]
  } else {
    currentValue.value = clampedValue
  }
  
  // Annonce pour les lecteurs d'écran
  const announcement = isDualRange.value 
    ? `${thumbType === 'min' ? 'Minimum' : 'Maximum'} : ${formatValue(clampedValue)}`
    : formatValue(clampedValue)
  announceToScreenReader(announcement)
}

// Support souris ET tactile
const handlePointerDown = (event: PointerEvent, thumbType: 'min' | 'max' = 'min') => {
  if (props.disabled || props.readonly) return
  
  event.preventDefault()
  isDragging.value = true
  activeThumb.value = thumbType
  
  // Capture du pointer pour gérer les mouvements en dehors de l'élément
  const target = event.currentTarget as HTMLElement
  target.setPointerCapture(event.pointerId)
  
  const handlePointerMove = (e: PointerEvent) => {
    const newValue = getValueFromPosition(e.clientX, e.clientY)
    updateValue(newValue, thumbType)
  }
  
  const handlePointerUp = (e: PointerEvent) => {
    isDragging.value = false
    activeThumb.value = null
    target.releasePointerCapture(e.pointerId)
    document.removeEventListener('pointermove', handlePointerMove)
    document.removeEventListener('pointerup', handlePointerUp)
    cleanupDrag = null
  }
  
  document.addEventListener('pointermove', handlePointerMove)
  document.addEventListener('pointerup', handlePointerUp)
  
  // Fonction de nettoyage
  cleanupDrag = () => {
    isDragging.value = false
    activeThumb.value = null
    document.removeEventListener('pointermove', handlePointerMove)
    document.removeEventListener('pointerup', handlePointerUp)
  }
}

const handleTrackClick = (event: MouseEvent) => {
  if (props.disabled || props.readonly || isDragging.value) return
  
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
    thumbType === 'min' ? showTooltip1.value = true : showTooltip2.value = true
  }
  emit('focus', event)
}

const handleBlur = (event: FocusEvent, thumbType: 'min' | 'max' = 'min') => {
  if (props.tooltip !== 'none') {
    thumbType === 'min' ? showTooltip1.value = false : showTooltip2.value = false
  }
  emit('blur', event)
}

const handlePointerEnter = (thumbType: 'min' | 'max' = 'min') => {
  if (props.tooltip !== 'none' && !props.disabled) {
    thumbType === 'min' ? showTooltip1.value = true : showTooltip2.value = true
  }
}

const handlePointerLeave = (thumbType: 'min' | 'max' = 'min') => {
  if (props.tooltip !== 'none') {
    thumbType === 'min' ? showTooltip1.value = false : showTooltip2.value = false
  }
}

// Nettoyage au démontage
onBeforeUnmount(() => {
  if (cleanupDrag) {
    cleanupDrag()
  }
})

// Génération des ticks
const ticks = computed(() => {
  if (!props.showTicks) return []
  
  const tickCount = Math.min(21, Math.floor((props.max - props.min) / props.step) + 1)
  const tickStep = (props.max - props.min) / (tickCount - 1)
  
  return Array.from({ length: tickCount }, (_, i) => {
    const value = props.min + (i * tickStep)
    const percent = ((value - props.min) / (props.max - props.min)) * 100
    return { value: snapToStep(value), percent }
  })
})

// Génération des marques
const processedMarks = computed(() => {
  if (!props.marks?.length) return []
  
  return props.marks
    .filter(mark => mark >= props.min && mark <= props.max)
    .map(mark => ({
      value: mark,
      percent: ((mark - props.min) / (props.max - props.min)) * 100
    }))
})

// Méthodes exposées
const focus = () => thumb1Ref.value?.focus()

defineExpose({
  focus,
  sliderRef,
  thumb1Ref,
  thumb2Ref
})
</script>

<template>
  <div :class="containerClasses">
    <!-- Slot before -->
    <div
      v-if="$slots.before"
      class="su-slider-before"
    >
      <slot name="before" />
    </div>

    <!-- Labels min/max -->
    <div
      v-if="showLabels"
      class="su-slider-labels"
    >
      <span class="su-slider-label su-slider-label--min">{{ formatValue(min) }}</span>
      <span class="su-slider-label su-slider-label--max">{{ formatValue(max) }}</span>
    </div>

    <!-- Container du slider -->
    <div class="su-slider-wrapper">
      <!-- Valeur affichée -->
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

          <!-- Ticks -->
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

          <!-- Thumb principal -->
          <div
            :id="isDualRange ? `${sliderId}-min` : sliderId"
            ref="thumb1Ref"
            :class="getThumbClasses('min')"
            :style="{
              [orientation === 'horizontal' ? 'left' : 'bottom']: `${minPercent}%`
            }"
            :tabindex="disabled ? -1 : 0"
            v-bind="getAriaAttributes('min')"
            @pointerdown="handlePointerDown($event, 'min')"
            @keydown="handleKeyDown($event, 'min')"
            @focus="handleFocus($event, 'min')"
            @blur="handleBlur($event, 'min')"
            @pointerenter="handlePointerEnter('min')"
            @pointerleave="handlePointerLeave('min')"
          >
            <div class="su-slider-thumb-handle" />
            
            <!-- Tooltip -->
            <div 
              v-if="tooltip !== 'none' && (showTooltip1 || (isDragging && activeThumb === 'min'))"
              class="su-slider-tooltip"
              :class="`su-slider-tooltip--${tooltip}`"
            >
              {{ formatValue(minValue) }}
            </div>
          </div>

          <!-- Thumb maximum (dual) -->
          <div
            v-if="isDualRange"
            :id="`${sliderId}-max`"
            ref="thumb2Ref"
            :class="getThumbClasses('max')"
            :style="{
              [orientation === 'horizontal' ? 'left' : 'bottom']: `${maxPercent}%`
            }"
            :tabindex="disabled ? -1 : 0"
            v-bind="getAriaAttributes('max')"
            @pointerdown="handlePointerDown($event, 'max')"
            @keydown="handleKeyDown($event, 'max')"
            @focus="handleFocus($event, 'max')"
            @blur="handleBlur($event, 'max')"
            @pointerenter="handlePointerEnter('max')"
            @pointerleave="handlePointerLeave('max')"
          >
            <div class="su-slider-thumb-handle" />
            
            <!-- Tooltip -->
            <div 
              v-if="tooltip !== 'none' && (showTooltip2 || (isDragging && activeThumb === 'max'))"
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

    <!-- Message -->
    <div
      v-if="message"
      :id="messageId"
      class="su-slider-message"
      :class="`su-slider-message--${state}`"
    >
      {{ message }}
    </div>
  </div>
</template>

<style lang="scss">
@use '../../styles/main' as *;
@use '../../styles/foundations/colors' as *;

.su-slider-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  
  &--horizontal {
    .su-slider-wrapper {
      flex-direction: column;
    }
  }
  
  &--vertical {
    .su-slider-wrapper {
      flex-direction: row;
      align-items: center;
      gap: 1rem;
    }
    
    .su-slider-slider {
      height: 200px;
      width: auto;
    }
    
    .su-slider-labels {
      flex-direction: column-reverse;
      height: 200px;
      justify-content: space-between;
    }
  }
  
  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.su-slider-wrapper {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.su-slider-before,
.su-slider-after {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.su-slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: var(--su-font-size-sm);
  color: var(--su-text-secondary);
  
  .su-slider-label {
    font-weight: 500;
  }
}

.su-slider-value {
  display: flex;
  justify-content: center;
  min-width: 4rem;
  
  &-display {
    font-weight: 600;
    color: var(--su-text-primary);
    font-size: var(--su-font-size-sm);
    padding: 0.25rem 0.5rem;
    background-color: var(--su-bg-hover);
    border-radius: var(--su-radius-sm);
  }
  
  &-dual {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-weight: 600;
    color: var(--su-text-primary);
    font-size: var(--su-font-size-sm);
  }
  
  &-min,
  &-max {
    padding: 0.25rem 0.5rem;
    background-color: var(--su-bg-hover);
    border-radius: var(--su-radius-sm);
  }
  
  &-separator {
    color: var(--su-text-secondary);
  }
}

.su-slider-slider {
  position: relative;
  flex: 1;
  cursor: pointer;
  width: 100%;
  touch-action: none; /* Améliore le support tactile */
  
  &--sm {
    height: 1.5rem;
  }
  
  &--md {
    height: 2rem;
  }
  
  &--lg {
    height: 2.5rem;
  }
}

.su-slider-track {
  position: absolute;
  background-color: var(--su-border-default);
  border-radius: 9999px;
  transition: all var(--su-duration-fast) cubic-bezier(0.4, 0, 0.2, 1);
  
  &--horizontal {
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
  }
  
  &--vertical {
    left: 50%;
    top: 0;
    bottom: 0;
    transform: translateX(-50%);
  }
  
  &--sm {
    &.su-slider-track--horizontal {
      height: 0.25rem;
    }

    &.su-slider-track--vertical {
      width: 0.25rem;
    }
  }
  
  &--md {
    &.su-slider-track--horizontal {
      height: 0.375rem;
    }

    &.su-slider-track--vertical {
      width: 0.375rem;
    }
  }
  
  &--lg {
    &.su-slider-track--horizontal {
      height: 0.5rem;
    }

    &.su-slider-track--vertical {
      width: 0.5rem;
    }
  }
  
  &--error {
    background-color: var(--su-state-error-light);
  }
  
  &--success {
    background-color: var(--su-state-success-light);
  }
  
  &--warning {
    background-color: var(--su-state-warning-light);
  }
}

.su-slider-track-active {
  position: absolute;
  background-color: var(--su-link-default);
  border-radius: inherit;
  transition: all var(--su-duration-fast) cubic-bezier(0.4, 0, 0.2, 1);
  
  .su-slider-track--horizontal & {
    top: 0;
    height: 100%;
  }
  
  .su-slider-track--vertical & {
    left: 0;
    width: 100%;
  }
  
  .su-slider-track--error & {
    background-color: var(--su-state-error);
  }
  
  .su-slider-track--success & {
    background-color: var(--su-state-success);
  }
  
  .su-slider-track--warning & {
    background-color: var(--su-state-warning);
  }
}

.su-slider-ticks {
  position: absolute;
  
  .su-slider-track--horizontal & {
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
  }
  
  .su-slider-track--vertical & {
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
  }
}

.su-slider-tick {
  position: absolute;
  background-color: var(--su-text-tertiary);
  
  .su-slider-track--horizontal & {
    width: 1px;
    height: 100%;
    transform: translateX(-50%);
  }
  
  .su-slider-track--vertical & {
    height: 1px;
    width: 100%;
    transform: translateY(-50%);
  }
}

.su-slider-marks {
  position: absolute;
  
  .su-slider-track--horizontal & {
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 0.5rem;
  }
  
  .su-slider-track--vertical & {
    left: 100%;
    top: 0;
    bottom: 0;
    margin-left: 0.5rem;
  }
}

.su-slider-mark {
  position: absolute;
  display: flex;
  align-items: center;
  
  .su-slider-track--horizontal & {
    flex-direction: column;
    transform: translateX(-50%);
  }
  
  .su-slider-track--vertical & {
    flex-direction: row;
    transform: translateY(50%);
  }
  
  &-dot {
    width: 0.375rem;
    height: 0.375rem;
    background-color: var(--su-text-tertiary);
    border-radius: 50%;
    margin-bottom: 0.25rem;
    
    .su-slider-track--vertical & {
      margin-bottom: 0;
      margin-right: 0.25rem;
    }
  }
  
  &-label {
    font-size: 0.75rem;
    color: var(--su-text-secondary);
    font-weight: 500;
    white-space: nowrap;
  }
}

.su-slider-thumb {
  position: absolute;
  cursor: grab;
  transition: all var(--su-duration-fast) cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
  
  &:focus {
    outline: none;
    z-index: 2;
    
    .su-slider-thumb-handle {
      box-shadow: 0 0 0 3px rgb(var(--su-link-default-rgb) / 30%);
    }
  }
  
  &:active,
  &--active {
    cursor: grabbing;
    z-index: 3;
    
    .su-slider-thumb-handle {
      transform: scale(1.1);
    }
  }
  
  // Orientation
  &--horizontal {
    top: 50%;
    transform: translate(-50%, -50%);
  }
  
  &--vertical {
    left: 50%;
    transform: translate(-50%, 50%);
  }
  
  // Tailles
  &--sm {
    .su-slider-thumb-handle {
      width: 1rem;
      height: 1rem;
    }
  }
  
  &--md {
    .su-slider-thumb-handle {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
  
  &--lg {
    .su-slider-thumb-handle {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
  
  // États
  &--disabled {
    cursor: not-allowed;
    
    .su-slider-thumb-handle {
      background-color: var(--su-bg-subtle);
      border-color: var(--su-text-tertiary);
    }
  }
  
  &--readonly {
    cursor: default;
  }
  
  &--error {
    .su-slider-thumb-handle {
      border-color: var(--su-state-error);
    }
    
    &:focus .su-slider-thumb-handle {
      box-shadow: 0 0 0 3px rgb(var(--su-state-error-rgb) / 30%);
    }
  }
  
  &--success {
    .su-slider-thumb-handle {
      border-color: var(--su-state-success);
    }
    
    &:focus .su-slider-thumb-handle {
      box-shadow: 0 0 0 3px rgb(var(--su-state-success-rgb) / 30%);
    }
  }
  
  &--warning {
    .su-slider-thumb-handle {
      border-color: var(--su-state-warning);
    }
    
    &:focus .su-slider-thumb-handle {
      box-shadow: 0 0 0 3px rgb(var(--su-state-warning-rgb) / 30%);
    }
  }
}

.su-slider-thumb-handle {
  width: 1.25rem;
  height: 1.25rem;
  background-color: white;
  border: 2px solid var(--su-link-default);
  border-radius: 50%;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
  transition: all var(--su-duration-fast) cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgb(0 0 0 / 15%);
  }
}

.su-slider-tooltip {
  position: absolute;
  padding: 0.25rem 0.5rem;
  background-color: var(--su-text-primary);
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: var(--su-radius-sm);
  white-space: nowrap;
  pointer-events: none;
  z-index: 10;
  
  // Flèche du tooltip
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border: 4px solid transparent;
  }
  
  &--top {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 0.5rem;
    
    &::after {
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-top-color: var(--su-text-primary);
    }
  }
  
  &--bottom {
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 0.5rem;
    
    &::after {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-bottom-color: var(--su-text-primary);
    }
  }
}

// Mode sombre
@media (prefers-color-scheme: dark) {
  .su-slider-track {
    background-color: var(--su-border-default);
  }
  
  .su-slider-track-active {
    background-color: var(--su-link-hover);
    
    .su-slider-track--error & {
      background-color: var(--su-state-error-light);
    }
    
    .su-slider-track--success & {
      background-color: var(--su-state-success-light);
    }
    
    .su-slider-track--warning & {
      background-color: var(--su-state-warning-light);
    }
  }
  
  .su-slider-thumb-handle {
    background-color: var(--su-bg-subtle);
    border-color: var(--su-link-hover);
  }
  
  .su-slider-value-display,
  .su-slider-value-min,
  .su-slider-value-max {
    background-color: var(--su-bg-inverse);
    color: var(--su-text-primary);
  }
  
  .su-slider-labels {
    color: var(--su-text-secondary);
  }
  
  .su-slider-mark-label {
    color: var(--su-text-secondary);
  }
  
  .su-slider-tooltip {
    background-color: var(--su-bg-hover);
    color: var(--su-text-primary);
    
    &--top::after {
      border-top-color: var(--su-bg-hover);
    }
    
    &--bottom::after {
      border-bottom-color: var(--su-bg-hover);
    }
  }
}

// Mode de contraste élevé
@media (prefers-contrast: high) {
  .su-slider-thumb-handle {
    border-width: 3px;
  }
  
  .su-slider-track {
    border: 1px solid var(--su-text-tertiary);
  }
}

// Support de la réduction des animations
@media (prefers-reduced-motion: reduce) {
  .su-slider-track,
  .su-slider-track-active,
  .su-slider-thumb,
  .su-slider-thumb-handle {
    transition: none;
  }
  
  .su-slider-thumb:active .su-slider-thumb-handle,
  .su-slider-thumb--active .su-slider-thumb-handle {
    transform: none;
  }
}
</style>         