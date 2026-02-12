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
      @focus="trigger === 'focus' && handleFocus()"
      @blur="trigger === 'focus' && handleBlur()"
    >
      <slot name="trigger" :isOpen="isOpen" />
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
      >
        <!-- Arrow -->
        <div
          v-if="showArrow"
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
          <slot :close="close" :isOpen="isOpen" />
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
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

export interface PopoverProps {
  modelValue?: boolean;
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';
  trigger?: 'click' | 'hover' | 'focus' | 'manual';
  showArrow?: boolean;
  closable?: boolean;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  modal?: boolean;
  closeOnBackdropClick?: boolean;
  disabled?: boolean;
  openDelay?: number;
  closeDelay?: number;
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  closeAriaLabel?: string;
}

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

// State
const isOpen = ref(false);
const popoverId = `popover-${Math.random().toString(36).substr(2, 9)}`;
const hoverTimeout = ref<number>();

// Computed
const animationEnabled = computed(() => {
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
});

const popoverClasses = computed(() => ({
  'su-popover--disabled': props.disabled,
  'su-popover--open': isOpen.value,
}));

const contentClasses = computed(() => ({
  'su-popover__content--modal': props.modal,
  'su-popover__content--with-arrow': props.showArrow,
  [`su-popover__content--${props.placement}`]: true,
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

const handleBlur = () => {
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

const handleClickOutside = (event: MouseEvent) => {
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
  document.addEventListener('click', handleClickOutside);
  
  if (props.modelValue) {
    isOpen.value = true;
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
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
@use '../../styles/core/mixins' as *;

.su-popover {
  position: relative;
  display: inline-block;
  
  &--disabled {
    pointer-events: none;
    opacity: 0.6;
  }

  &__trigger {
    cursor: pointer;
    display: inline-block;
    
    &:focus-visible {
      outline: 2px solid var(--su-color-primary, #3b82f6);
      outline-offset: 2px;
      border-radius: 4px;
    }
  }

  &__content {
    position: absolute;
    z-index: 9999;
    background-color: var(--su-popover-bg, #fff);
    border: 1px solid var(--su-popover-border, #e5e7eb);
    border-radius: var(--su-popover-radius, 8px);
    box-shadow: var(--su-popover-shadow, 0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%));
    padding: var(--su-popover-padding, 12px);
    min-width: 200px;
    max-width: 320px;

    &:focus-visible {
      outline: 2px solid var(--su-color-primary, #3b82f6);
      outline-offset: 2px;
    }

    // Placements
    &--top {
      bottom: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
    }

    &--top-start {
      bottom: calc(100% + 8px);
      left: 0;
    }

    &--top-end {
      bottom: calc(100% + 8px);
      right: 0;
    }

    &--bottom {
      top: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
    }

    &--bottom-start {
      top: calc(100% + 8px);
      left: 0;
    }

    &--bottom-end {
      top: calc(100% + 8px);
      right: 0;
    }

    &--left {
      right: calc(100% + 8px);
      top: 50%;
      transform: translateY(-50%);
    }

    &--left-start {
      right: calc(100% + 8px);
      top: 0;
    }

    &--left-end {
      right: calc(100% + 8px);
      bottom: 0;
    }

    &--right {
      left: calc(100% + 8px);
      top: 50%;
      transform: translateY(-50%);
    }

    &--right-start {
      left: calc(100% + 8px);
      top: 0;
    }

    &--right-end {
      left: calc(100% + 8px);
      bottom: 0;
    }

    // Dark mode
    @media (prefers-color-scheme: dark) {
      --su-popover-bg: #1f2937;
      --su-popover-border: #374151;
      --su-popover-shadow: 0 10px 15px -3px rgb(0 0 0 / 50%), 0 4px 6px -2px rgb(0 0 0 / 30%);
    }

    [data-theme="dark"] & {
      --su-popover-bg: #1f2937;
      --su-popover-border: #374151;
      --su-popover-shadow: 0 10px 15px -3px rgb(0 0 0 / 50%), 0 4px 6px -2px rgb(0 0 0 / 30%);
    }

    // High contrast mode
    @media (prefers-contrast: high) {
      border-width: 2px;
      border-color: var(--su-popover-border-contrast, #000);
    }

    [data-contrast="high"] & {
      border-width: 2px;
      border-color: var(--su-popover-border-contrast, #000);
    }

    // RTL support
    [dir="rtl"] & {
      direction: rtl;
    }
  }

  &__arrow {
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: var(--su-popover-bg, #fff);
    border: 1px solid var(--su-popover-border, #e5e7eb);
    transform: rotate(45deg);
    
    @media (prefers-color-scheme: dark) {
      background-color: #1f2937;
      border-color: #374151;
    }

    [data-theme="dark"] & {
      background-color: #1f2937;
      border-color: #374151;
    }
  }

  &__close {
    position: absolute;
    top: 8px;
    right: 8px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    color: var(--su-popover-close-color, #6b7280);
    transition: background-color 0.2s, color 0.2s;
    
    &:hover {
      background-color: var(--su-popover-close-hover-bg, #f3f4f6);
      color: var(--su-popover-close-hover-color, #111827);
    }

    &:focus-visible {
      outline: 2px solid var(--su-color-primary, #3b82f6);
      outline-offset: 2px;
    }

    [dir="rtl"] & {
      right: auto;
      left: 8px;
    }

    @media (prefers-color-scheme: dark) {
      --su-popover-close-color: #9ca3af;
      --su-popover-close-hover-bg: #374151;
      --su-popover-close-hover-color: #f9fafb;
    }

    [data-theme="dark"] & {
      --su-popover-close-color: #9ca3af;
      --su-popover-close-hover-bg: #374151;
      --su-popover-close-hover-color: #f9fafb;
    }

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }

  &__close-icon {
    width: 16px;
    height: 16px;
  }

  &__body {
    color: var(--su-popover-text-color, #374151);

    @media (prefers-color-scheme: dark) {
      --su-popover-text-color: #d1d5db;
    }

    [data-theme="dark"] & {
      --su-popover-text-color: #d1d5db;
    }
  }

  &__backdrop {
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 50%);
    z-index: 9998;
  }
}

// Animations
.su-popover-fade-enter-active,
.su-popover-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.su-popover-fade-enter-from,
.su-popover-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.su-popover-backdrop-fade-enter-active,
.su-popover-backdrop-fade-leave-active {
  transition: opacity 0.2s ease;
}

.su-popover-backdrop-fade-enter-from,
.su-popover-backdrop-fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .su-popover-fade-enter-active,
  .su-popover-fade-leave-active,
  .su-popover-backdrop-fade-enter-active,
  .su-popover-backdrop-fade-leave-active {
    transition: none;
  }
}
</style>