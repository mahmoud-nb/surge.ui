<script setup lang="ts">
import { ref, watch } from 'vue'
import type { TabsProps } from '@/types'

const props = withDefaults(defineProps<TabsProps>(), {
  variant: 'underline',
  modelValue: 0
})

const emit = defineEmits<{ (e: 'update:modelValue', value: number): void }>()

const activeIndex = ref(props.modelValue)

watch(() => props.modelValue, v => (activeIndex.value = v))
watch(activeIndex, v => emit('update:modelValue', v))

// Gestion du clavier
const handleKeydown = (event: KeyboardEvent) => {
  const total = props.tabs?.length ?? 0
  if (!total) return

  if (event.key === 'ArrowRight') {
    activeIndex.value = (activeIndex.value + 1) % total
  } else if (event.key === 'ArrowLeft') {
    activeIndex.value = (activeIndex.value - 1 + total) % total
  } else if (event.key === 'Home') {
    activeIndex.value = 0
  } else if (event.key === 'End') {
    activeIndex.value = total - 1
  }
}

// Classes
const tabClasses = (index: number) => [
  'su-tab',
  props.variant && `su-tab--${props.variant}`,
  { 'su-tab--active': index === activeIndex.value }
]
</script>

<template>
  <div class="su-tabs">
    <!-- Liste des onglets -->
    <div
      role="tablist"
      class="su-tabs-list"
      @keydown="handleKeydown"
    >
      <button
        v-for="(tab, index) in tabs"
        :id="`tab-${index}`"
        :key="index"
        role="tab"
        :aria-controls="`panel-${index}`"
        :aria-selected="index === activeIndex"
        :tabindex="index === activeIndex ? 0 : -1"
        :class="tabClasses(index)"
        @click="activeIndex = index"
      >
        <!-- Slot custom ou rendu par défaut -->
        <slot
          name="tab"
          :tab="tab"
          :index="index"
        >
          <span>{{ tab.label }}</span>
        </slot>
      </button>
    </div>

    <!-- Contenu -->
    <div
      v-for="(tab, index) in tabs"
      v-show="index === activeIndex"
      :id="`panel-${index}`"
      :key="index"
      role="tabpanel"
      :aria-labelledby="`tab-${index}`"
      class="su-tab-panel"
    >
      <slot
        name="panel"
        :tab="tab"
        :index="index"
      >
        <p>{{ tab.content }}</p>
      </slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/main' as *;

.su-tabs {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.su-tabs-list {
  display: flex;
  gap: 1rem;
  border-bottom: 2px solid var(--su-border-default);
}

.su-tab {
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: var(--su-font-weight-medium);
  font-size: var(--su-font-size-base);
  color: var(--su-text-secondary);
  transition: all var(--su-duration-normal) var(--su-ease-in-out);
  position: relative;

  &--active {
    color: var(--su-text-primary);
    border-bottom: 2px solid var(--su-primary-default);
  }

  &--contained.su-tab--active {
    background-color: var(--su-primary-default);
    color: var(--su-text-inverse);
    border-radius: var(--su-radius-lg) var(--su-radius-lg) 0 0;
    border-bottom: none;
  }

  &:hover:not(&--active) {
    color: var(--su-text-primary);
    background-color: var(--su-bg-hover);
  }

  &:focus-visible {
    outline: var(--su-focus-ring-width) solid var(--su-border-focus);
    outline-offset: var(--su-focus-ring-offset);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}

.su-tab-panel {
  padding: 1rem;
  animation: fadeIn var(--su-duration-normal) var(--su-ease-in-out);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .su-tab-panel {
    animation: none;
  }
}
</style>
