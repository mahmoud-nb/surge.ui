<script setup lang="ts">
import { computed, ref, onBeforeUnmount } from 'vue'
import type { SliderProps } from '@/types'
import { useLocale } from '@/composables/useLocale'
import { mergeIds } from '@/composables/useFormField'
import { useFormField } from '@/composables/useFormField'

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

// Contexte du SuFormField parent : id, label, message et états du champ
const { id: controlId, state: fieldState, size: fieldSize, disabled: fieldDisabled, required: fieldRequired, describedBy: fieldDescribedBy, labelledBy: fieldLabelledBy } = useFormField(props, { labelable: false, idPrefix: 'slider', focus: () => thumb1Ref.value?.focus() })

// Textes par défaut : locale courante
const { t } = useLocale()

const modelValue = defineModel<number | [number, number]>()

const emit = defineEmits<{
  change: [value: number | [number, number]]
  input: [value: number | [number, number]]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
}>()


// Refs
const sliderRef = ref<HTMLDivElement>()
const trackRef = ref<HTMLDivElement>()
const thumb1Ref = ref<HTMLDivElement>()
const thumb2Ref = ref<HTMLDivElement>()
const isDragging = ref(false)
const activeThumb = ref<'min' | 'max' | null>(null)
const showTooltip1 = ref(false)
const showTooltip2 = ref(false)

const sliderId = computed(() => controlId.value as string)
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
  `su-slider-container--${fieldSize.value}`,
  `su-slider-container--${fieldState.value}`,
  `su-slider-container--${props.orientation}`,
  {
    'su-slider-container--disabled': fieldDisabled.value,
    'su-slider-container--readonly': props.readonly,
    'su-slider-container--dual': isDualRange.value,
    'su-slider-container--dragging': isDragging.value
  }
])

const trackClasses = computed(() => [
  'su-slider-track',
  `su-slider-track--${fieldSize.value}`,
  `su-slider-track--${fieldState.value}`,
  `su-slider-track--${props.orientation}`
])

const getThumbClasses = (thumbType: 'min' | 'max') => [
  'su-slider-thumb',
  `su-slider-thumb--${fieldSize.value}`,
  `su-slider-thumb--${fieldState.value}`,
  `su-slider-thumb--${props.orientation}`,
  {
    'su-slider-thumb--disabled': fieldDisabled.value,
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
      ? `${props.ariaLabel} ${t(thumbType === 'min' ? 'slider.min' : 'slider.max')}` 
      : props.ariaLabel
  }
  if (fieldLabelledBy.value) baseAttrs['aria-labelledby'] = fieldLabelledBy.value
  const describedBy = mergeIds(messageId.value, fieldDescribedBy.value)
  if (describedBy) baseAttrs['aria-describedby'] = describedBy
  if (props.ariaInvalid !== undefined) baseAttrs['aria-invalid'] = props.ariaInvalid
  if (props.ariaRequired || fieldRequired.value) baseAttrs['aria-required'] = true
  if (fieldState.value === 'error') baseAttrs['aria-invalid'] = true
  
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
  if (fieldDisabled.value || props.readonly) return
  
  const clampedValue = clampValue(snapToStep(newValue))
  
  if (isDualRange.value) {
    const [currentMin, currentMax] = currentValue.value as [number, number]
    currentValue.value = thumbType === 'min'
      ? [Math.min(clampedValue, currentMax), currentMax]
      : [currentMin, Math.max(clampedValue, currentMin)]
  } else {
    currentValue.value = clampedValue
  }

}

// Support souris ET tactile
const handlePointerDown = (event: PointerEvent, thumbType: 'min' | 'max' = 'min') => {
  if (fieldDisabled.value || props.readonly) return
  
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
  if (fieldDisabled.value || props.readonly || isDragging.value) return
  
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
  if (fieldDisabled.value || props.readonly) return
  
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
  if (props.tooltip !== 'none' && !fieldDisabled.value) {
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
            :tabindex="fieldDisabled ? -1 : 0"
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
            :tabindex="fieldDisabled ? -1 : 0"
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
      :class="`su-slider-message--${fieldState}`"
    >
      {{ message }}
    </div>
  </div>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// SLIDER — piste douce, segment actif primaire, poignée claire
// avec halo au survol et au focus. Styles partagés avec
// SliderField (mêmes classes).
// Tailles pilotées par --_su-slider-track et --_su-slider-thumb.
// ============================================================

.su-slider-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;

  // Largeur utile même dans un conteneur qui s'ajuste au contenu
  min-width: 12rem;

  // ### Tailles (poignée plus grande sur mobile)

  &--sm {
    --_su-slider-track: 0.25rem;
    --_su-slider-thumb: 0.875rem;
  }

  &--md {
    --_su-slider-track: 0.375rem;
    --_su-slider-thumb: 1.125rem;

    @include up('sm') {
      --_su-slider-thumb: 1rem;
    }
  }

  &--lg {
    --_su-slider-track: 0.5rem;
    --_su-slider-thumb: 1.375rem;

    @include up('sm') {
      --_su-slider-thumb: 1.25rem;
    }
  }

  // ### Couleur du segment actif selon l'état

  --_su-slider-color: var(--su-primary-default);

  &--error { --_su-slider-color: var(--su-state-error); }
  &--success { --_su-slider-color: var(--su-state-success); }
  &--warning { --_su-slider-color: var(--su-state-warning); }

  &--vertical {
    flex-direction: row;
    width: auto;
    min-width: 0;

    .su-slider-wrapper {
      flex-direction: column;
    }

    .su-slider-slider {
      width: var(--_su-slider-thumb);
      height: 12.5rem;
    }
  }

  &--disabled {
    @include disabled-state;

    .su-slider-slider,
    .su-slider-thumb {
      cursor: not-allowed;
    }
  }

  &--readonly {
    .su-slider-slider,
    .su-slider-thumb {
      cursor: default;
    }
  }

  &--dragging {
    user-select: none;

    .su-slider-thumb {
      cursor: grabbing;
    }
  }
}

.su-slider-before,
.su-slider-after {
  display: flex;
  align-items: center;
}

.su-slider-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

// Libellés min / max
.su-slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: var(--su-font-size-xs);
  font-variant-numeric: tabular-nums;
  color: var(--su-text-tertiary);
}

// Valeur courante
.su-slider-value {
  flex-shrink: 0;
  min-width: 3rem;
  font-size: var(--su-font-size-sm);
  font-weight: var(--su-font-weight-medium);
  font-variant-numeric: tabular-nums;
  color: var(--su-text-primary);

  &-dual {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  &-separator {
    color: var(--su-text-tertiary);
  }
}

// ### Zone interactive

.su-slider-slider {
  position: relative;
  flex: 1;
  height: var(--_su-slider-thumb);
  cursor: pointer;
  touch-action: none;
}

.su-slider-track {
  position: absolute;
  border-radius: var(--su-radius-full);
  background-color: var(--su-bg-muted);
  box-shadow: inset 0 0 0 1px var(--su-border-alpha);

  &--horizontal {
    top: 50%;
    right: 0;
    left: 0;
    height: var(--_su-slider-track);
    translate: 0 -50%;
  }

  &--vertical {
    top: 0;
    bottom: 0;
    left: 50%;
    width: var(--_su-slider-track);
    translate: -50% 0;
  }
}

.su-slider-track-active {
  position: absolute;
  border-radius: inherit;
  background-color: var(--_su-slider-color);

  .su-slider-track--horizontal > & {
    top: 0;
    height: 100%;
  }

  .su-slider-track--vertical > & {
    left: 0;
    width: 100%;
  }
}

// Graduations
.su-slider-ticks {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.su-slider-tick {
  position: absolute;
  background-color: with-alpha(text-primary, 20%);

  .su-slider-track--horizontal & {
    top: 0;
    width: 1px;
    height: 100%;
    translate: -50% 0;
  }

  .su-slider-track--vertical & {
    left: 0;
    width: 100%;
    height: 1px;
    translate: 0 50%;
  }
}

// Marques personnalisées
.su-slider-marks {
  position: absolute;
  pointer-events: none;

  .su-slider-track--horizontal & {
    top: 100%;
    right: 0;
    left: 0;
    margin-top: 0.625rem;
  }

  .su-slider-track--vertical & {
    top: 0;
    bottom: 0;
    left: 100%;
    margin-left: 0.625rem;
  }
}

.su-slider-mark {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;

  .su-slider-track--horizontal & {
    translate: -50% 0;
  }

  .su-slider-track--vertical & {
    flex-direction: row;
    translate: 0 50%;
  }

  &-dot {
    width: 0.25rem;
    height: 0.25rem;
    border-radius: var(--su-radius-full);
    background-color: var(--su-border-strong);
  }

  &-label {
    font-size: var(--su-font-size-xs);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
    color: var(--su-text-tertiary);
  }
}

// ### Poignée

.su-slider-thumb {
  position: absolute;
  z-index: 1;
  width: var(--_su-slider-thumb);
  height: var(--_su-slider-thumb);
  cursor: grab;
  outline: none;

  @include touch-target-overlay;

  &--horizontal {
    top: 50%;
    translate: -50% -50%;
  }

  &--vertical {
    left: 50%;
    translate: -50% 50%;
  }

  &--active {
    z-index: 2;
  }

  // Halo au survol et pendant le déplacement, sauf poignée désactivée ou en lecture seule
  // (:where garde la spécificité basse : l'anneau de focus, déclaré après, l'emporte)
  &:where(:not(.su-slider-thumb--disabled, .su-slider-thumb--readonly)) {
    &:hover .su-slider-thumb-handle,
    &.su-slider-thumb--active .su-slider-thumb-handle {
      box-shadow:
        0 1px 2px rgb(0 0 0 / 15%),
        0 0 0 4px with-alpha(var(--_su-slider-color), 20%);
    }
  }

  &:focus-visible .su-slider-thumb-handle {
    box-shadow:
      0 1px 2px rgb(0 0 0 / 15%),
      0 0 0 2px var(--su-bg-surface),
      0 0 0 4px var(--su-ring);
  }
}

.su-slider-thumb-handle {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 1px solid var(--_su-slider-color);
  border-radius: var(--su-radius-full);
  background-color: var(--su-bg-surface);
  box-shadow: 0 1px 2px rgb(0 0 0 / 15%);

  @include transition(box-shadow);
}

// ### Infobulle de valeur

.su-slider-tooltip {
  position: absolute;
  left: 50%;
  z-index: var(--su-z-tooltip);
  padding: 0.125rem 0.375rem;
  border: 1px solid var(--su-border-alpha);
  border-radius: var(--su-radius-md);
  background-color: var(--su-bg-surface-elevated);
  background-clip: padding-box;
  color: var(--su-text-primary);
  font-size: var(--su-font-size-xs);
  font-weight: var(--su-font-weight-medium);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  box-shadow: var(--su-shadow-popover);
  pointer-events: none;
  translate: -50% 0;

  &--top {
    bottom: calc(100% + 0.5rem);
  }

  &--bottom {
    top: calc(100% + 0.5rem);
  }
}

// ### Message

.su-slider-message {
  font-size: var(--su-font-size-xs);
  line-height: var(--su-line-height-normal);
  color: var(--su-text-tertiary);

  &--error { color: var(--su-state-error-fg); }
  &--success { color: var(--su-state-success-fg); }
  &--warning { color: var(--su-state-warning-fg); }
}
</style>
