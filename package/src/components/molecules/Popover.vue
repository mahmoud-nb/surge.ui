<template>
  <div 
    ref="popoverContainer"
    class="su-popover"
    :class="popoverClasses"
  >
    <!-- Trigger Element -->
    <div
      ref="triggerRef"
      class="su-popover__trigger"
      :aria-expanded="isOpen"
      :aria-haspopup="true"
      :aria-controls="popoverId"
      @click="handleTriggerClick"
      @keydown="handleTriggerKeydown"
      @mouseenter="trigger === 'hover' && handleMouseEnter()"
      @mouseleave="trigger === 'hover' && handleMouseLeave()"
      @focusin="trigger === 'focus' && handleFocus()"
      @focusout="trigger === 'focus' && handleBlur($event)"
    >
      <slot
        name="trigger"
        :is-open="isOpen"
      />
    </div>

    <!-- Popover Content (Positioned with CSS) -->
    <Transition
      :name="animationEnabled ? 'su-popover-fade' : ''"
      @after-leave="handleAfterLeave"
    >
      <div
        v-show="isOpen"
        :id="popoverId"
        ref="popoverRef"
        class="su-popover__content"
        :class="contentClasses"
        role="dialog"
        :aria-modal="modal"
        :aria-labelledby="ariaLabelledby"
        :aria-describedby="ariaDescribedby"
        :aria-label="ariaLabel"
        @mouseenter="trigger === 'hover' && handleContentMouseEnter()"
        @mouseleave="trigger === 'hover' && handleContentMouseLeave()"
        @keydown="handleContentKeydown"
        @focusout="trigger === 'focus' && handleBlur($event)"
      >
        <!-- Arrow -->
        <div
          v-if="showArrow"
          ref="arrowRef"
          class="su-popover__arrow"
        />

        <!-- Close Button -->
        <button
          v-if="closable"
          type="button"
          class="su-popover__close"
          :aria-label="closeAriaLabel"
          @click="close"
        >
          <XMarkIcon class="su-popover__close-icon" />
        </button>

        <!-- Content Slot -->
        <div class="su-popover__body">
          <slot
            :close="close"
            :is-open="isOpen"
          />
        </div>
      </div>
    </Transition>

    <!-- Backdrop for modal mode -->
    <Teleport to="body">
      <Transition :name="animationEnabled ? 'su-popover-backdrop-fade' : ''">
        <div
          v-if="isOpen && modal"
          class="su-popover__backdrop"
          @click="closeOnBackdropClick && close()"
        />
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick, useId } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import type { PopoverProps } from '@/types'
import { useFloatingPosition } from '@/composables/useFloatingPosition'

const props = withDefaults(defineProps<PopoverProps>(), {
  modelValue: undefined,
  placement: 'bottom',
  trigger: 'click',
  showArrow: true,
  closable: false,
  closeOnClickOutside: true,
  closeOnEscape: true,
  modal: false,
  closeOnBackdropClick: true,
  disabled: false,
  openDelay: 0,
  closeDelay: 0,
  closeAriaLabel: 'Fermer',
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'open': [];
  'close': [];
  'after-leave': [];
}>();

// Refs
const popoverContainer = ref<HTMLElement>();
const triggerRef = ref<HTMLElement>();
const popoverRef = ref<HTMLElement>();
const arrowRef = ref<HTMLElement>();

// State
const isOpen = ref(false);
const popoverId = `popover-${useId()}`;
const hoverTimeout = ref<number>();

// Computed
const animationEnabled = computed(() => {
  return typeof window === 'undefined' || !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
});

const popoverClasses = computed(() => ({
  'su-popover--disabled': props.disabled,
  'su-popover--open': isOpen.value,
}));

// Position fixe calculée contre le déclencheur, retournée s'il manque de place
const { placement: currentPlacement } = useFloatingPosition(triggerRef, popoverRef, {
  placement: () => props.placement,
  open: isOpen,
  offset: props.showArrow ? 10 : 6,
  arrow: arrowRef
});

const contentClasses = computed(() => ({
  'su-popover__content--modal': props.modal,
  'su-popover__content--with-arrow': props.showArrow,
  [`su-popover__content--${currentPlacement.value}`]: true,
}));

// Watch modelValue
watch(() => props.modelValue, (newValue) => {
  if (newValue !== undefined && newValue !== isOpen.value) {
    isOpen.value = newValue;
  }
});

watch(isOpen, (newValue) => {
  if (props.modelValue !== undefined) {
    emit('update:modelValue', newValue);
  }
  
  if (newValue) {
    emit('open');
    nextTick(() => {
      if (props.modal) {
        trapFocus();
      }
    });
  } else {
    emit('close');
  }
});

// Methods
const open = () => {
  if (props.disabled) return;
  
  if (props.openDelay > 0) {
    hoverTimeout.value = window.setTimeout(() => {
      isOpen.value = true;
    }, props.openDelay);
  } else {
    isOpen.value = true;
  }
};

const close = () => {
  if (hoverTimeout.value) {
    clearTimeout(hoverTimeout.value);
  }
  
  if (props.closeDelay > 0) {
    hoverTimeout.value = window.setTimeout(() => {
      isOpen.value = false;
    }, props.closeDelay);
  } else {
    isOpen.value = false;
  }
};

const toggle = () => {
  if (isOpen.value) {
    close();
  } else {
    open();
  }
};

// Event Handlers
const handleTriggerClick = () => {
  if (props.trigger === 'click') {
    toggle();
  }
};

const handleTriggerKeydown = (event: KeyboardEvent) => {
  if (props.trigger === 'click' && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    toggle();
  }
};

const handleMouseEnter = () => {
  if (hoverTimeout.value) {
    clearTimeout(hoverTimeout.value);
  }
  open();
};

const handleMouseLeave = () => {
  close();
};

const handleContentMouseEnter = () => {
  if (hoverTimeout.value) {
    clearTimeout(hoverTimeout.value);
  }
};

const handleContentMouseLeave = () => {
  close();
};

const handleFocus = () => {
  open();
};

// Le popover reste ouvert si le focus passe du déclencheur à son contenu
const handleBlur = (event: FocusEvent) => {
  const next = event.relatedTarget as Node | null;
  if (next && popoverContainer.value?.contains(next)) return;
  close();
};

const handleContentKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.closeOnEscape) {
    event.preventDefault();
    close();
    triggerRef.value?.focus();
  }

  if (event.key === 'Tab' && props.modal) {
    handleTabKey(event);
  }
};

const handleClickOutside = (event: PointerEvent) => {
  if (!props.closeOnClickOutside || !isOpen.value) return;

  const target = event.target as Node;
  if (
    popoverRef.value &&
    !popoverRef.value.contains(target) &&
    triggerRef.value &&
    !triggerRef.value.contains(target)
  ) {
    close();
  }
};

const handleAfterLeave = () => {
  emit('after-leave');
};

// Focus Management
const trapFocus = () => {
  const focusableElements = popoverRef.value?.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  if (focusableElements && focusableElements.length > 0) {
    (focusableElements[0] as HTMLElement).focus();
  }
};

const handleTabKey = (event: KeyboardEvent) => {
  const focusableElements = popoverRef.value?.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  ) as NodeListOf<HTMLElement>;

  if (!focusableElements || focusableElements.length === 0) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey) {
    if (document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    }
  } else {
    if (document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }
};

// Lifecycle
onMounted(() => {
  document.addEventListener('pointerdown', handleClickOutside);
  
  if (props.modelValue) {
    isOpen.value = true;
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', handleClickOutside);
  if (hoverTimeout.value) {
    clearTimeout(hoverTimeout.value);
  }
});

// Expose methods
defineExpose({
  open,
  close,
  toggle,
});
</script>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// POPOVER — surface flottante partagée (popover-surface), flèche
// optionnelle ; la position (fixed) est calculée par
// useFloatingPosition, l'animation ne joue que sur `scale`
// ============================================================

.su-popover {
  position: relative;
  display: inline-block;

  &--disabled {
    pointer-events: none;
    opacity: var(--su-opacity-disabled);
  }

  &__trigger {
    display: inline-block;
    cursor: pointer;
    border-radius: var(--su-radius-sm);

    &:focus-visible {
      @include focus-ring;
    }
  }

  &__content {
    // Position fixe : left/top calculés par useFloatingPosition
    position: fixed;
    top: 0;
    left: 0;
    min-width: 12.5rem;
    max-width: 20rem;

    @include popover-surface;

    z-index: var(--su-z-popover);
    padding: 0.75rem 1rem;
    font-size: var(--su-font-size-base);
    line-height: var(--su-line-height-normal);

    @include up('sm') {
      font-size: var(--su-font-size-sm);
    }

    &:focus-visible {
      @include focus-ring;
    }

    // ### Placements
    // Position calculée en JS (useFloatingPosition) ; le placement réel
    // (éventuellement retourné) oriente l'animation et la flèche.

    &--top,
    &--top-start,
    &--top-end {
      transform-origin: bottom center;
    }

    &--bottom,
    &--bottom-start,
    &--bottom-end {
      transform-origin: top center;
    }

    &--left,
    &--left-start,
    &--left-end {
      transform-origin: center right;
    }

    &--right,
    &--right-start,
    &--right-end {
      transform-origin: center left;
    }
  }

  // ### Flèche : carré pivoté qui reprend fond et bordure du popover.
  // Sa position le long du bord est calculée en JS.

  &__arrow {
    position: absolute;
    width: 0.625rem;
    height: 0.625rem;
    border: 1px solid var(--su-border-alpha);
    background-color: var(--su-bg-surface-elevated);
    background-clip: padding-box;
    rotate: 45deg;

    // Seuls les deux côtés tournés vers l'extérieur portent la bordure
    [class*='su-popover__content--top'] > & {
      bottom: -0.3125rem;
      border-width: 0 1px 1px 0;
    }

    [class*='su-popover__content--bottom'] > & {
      top: -0.3125rem;
      border-width: 1px 0 0 1px;
    }

    [class*='su-popover__content--left'] > & {
      right: -0.3125rem;
      border-width: 1px 1px 0 0;
    }

    [class*='su-popover__content--right'] > & {
      left: -0.3125rem;
      border-width: 0 0 1px 1px;
    }
  }

  // ### Fermeture

  &__close {
    position: absolute;
    top: 0.5rem;
    inset-inline-end: 0.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    padding: 0;
    border: 0;
    border-radius: var(--su-radius-sm);
    background: transparent;
    color: var(--su-text-tertiary);
    cursor: pointer;

    @include transition(background-color, color);

    &:hover {
      background-color: var(--su-bg-accent);
      color: var(--su-text-primary);
    }

    &:focus-visible {
      @include focus-ring($offset: 0);
    }
  }

  &__content:has(> .su-popover__close) > .su-popover__body {
    padding-inline-end: 1.5rem;
  }

  &__close-icon {
    width: 1rem;
    height: 1rem;
  }

  &__body {
    color: var(--su-text-secondary);
  }

  &__backdrop {
    position: fixed;
    inset: 0;
    z-index: calc(var(--su-z-popover) - 1);
    background-color: var(--su-overlay-backdrop);
  }
}

// ### Animations

@include popover-transition('su-popover-fade');

.su-popover-backdrop-fade-enter-active,
.su-popover-backdrop-fade-leave-active {
  transition: opacity var(--su-duration-fast) var(--su-ease-out);
}

.su-popover-backdrop-fade-enter-from,
.su-popover-backdrop-fade-leave-to {
  opacity: 0;
}
</style>
