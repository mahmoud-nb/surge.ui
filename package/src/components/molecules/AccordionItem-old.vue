<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import Heading from '@/components/atoms/Heading.vue'
import Panel from '@/components/atoms/Panel.vue'

interface Props {
  title?: string
  open?: boolean
  id?: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update:open'])

const accordionContext = inject<{
  registerItem: (id: string) => void
  toggleItem: (id: string) => void
  isItemOpen: (id: string) => boolean
} | null>('accordionContext', null)

const localId = props.id || `accordion-item-${Math.random().toString(36).slice(2, 8)}`
const headingId = `${localId}-heading`
const panelId = `${localId}-panel`

const isOpen = ref(props.open || false)

if (accordionContext) {
  accordionContext.registerItem(localId)
}

const computedOpen = computed(() =>
  accordionContext ? accordionContext.isItemOpen(localId) : isOpen.value
)

function toggle() {
  if (accordionContext) accordionContext.toggleItem(localId)
  else isOpen.value = !isOpen.value
  emit('update:open', computedOpen.value)
}

watch(
  () => props.open,
  val => {
    if (!accordionContext) isOpen.value = !!val
  }
)
</script>

<template>
  <div class="accordion-item">
    <Heading :id="headingId" :tag="'h3'" class="accordion-header">
      <button
        class="accordion-trigger"
        type="button"
        :aria-expanded="computedOpen"
        :aria-controls="panelId"
        @click="toggle"
      >
        <slot name="title">{{ title }}</slot>
      </button>
    </Heading>

    <transition name="accordion">
      <Panel
        v-show="computedOpen"
        :id="panelId"
        class="accordion-panel"
        role="region"
        :aria-labelledby="headingId"
      >
        <slot />
      </Panel>
    </transition>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/main' as *;

.accordion-item {
  border-bottom: 1px solid var(--accordion-border, #ddd);
}

.accordion-header {
  margin: 0;
}

.accordion-trigger {
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1rem;
  color: var(--accordion-text, #222);
  background-color: var(--accordion-bg, #fff);
  font-size: 1rem;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid var(--accordion-focus, #0078d4);
  }
}

.accordion-panel {
  padding: 1rem;
  background-color: var(--accordion-panel-bg, var(--accordion-bg));
  color: var(--accordion-text);
}
</style>
