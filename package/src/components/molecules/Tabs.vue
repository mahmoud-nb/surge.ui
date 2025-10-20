<script setup lang="ts">
import { ref, watch, useSlots } from 'vue'
import type { Component } from 'vue'

export interface TabItem {
  label: string
  content?: string
  icon?: Component | string
  badge?: number | string
  title?: string
  description?: string
  component?: Component
}

export interface TabsProps {
  tabs?: TabItem[]
  modelValue?: number
  variant?: 'underline' | 'contained' | 'pills'
}

const props = withDefaults(defineProps<TabsProps>(), {
  variant: 'underline',
  modelValue: 0
})

const emit = defineEmits<{ (e: 'update:modelValue', value: number): void }>()

const activeIndex = ref(props.modelValue)
const slots = useSlots()

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
        :key="index"
        role="tab"
        :id="`tab-${index}`"
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
      :key="index"
      v-show="index === activeIndex"
      role="tabpanel"
      :id="`panel-${index}`"
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
.su-tabs {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.su-tabs-list {
  display: flex;
  gap: 1rem;
  border-bottom: 2px solid #ddd;
}

.su-tab {
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 500;
  color: #666;
  transition: all 0.2s;

  &--active {
    color: #000;
    border-bottom: 2px solid #007bff;
  }

  &--contained.su-tab--active {
    background-color: #007bff;
    color: white;
    border-radius: 6px 6px 0 0;
  }

  &:focus-visible {
    outline: 2px solid #007bff;
    outline-offset: 2px;
  }
}

.su-tab-panel {
  padding: 1rem;
}
</style>
