<script setup lang="ts">
import { ref, computed, provide, watch, useId } from 'vue'

import AccordionItem from '../molecules/AccordionItem.vue'
import type { AccordionContext, AccordionItemData, AccordionProps } from '@/types'

const props = withDefaults(defineProps<AccordionProps>(), {
  multiple: false,
  attached: false,
  level: 2,
  gap: 'md',
  items: () => [],
  modelValue: () => []
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: (string | number)[]): void
  (e: 'item-toggle', item: AccordionItemData): void
}>()

// État local des items ouverts
const openItems = ref<Set<string | number>>(new Set(props.modelValue))

// Mettre à jour l'état local quand modelValue change
watch(() => props.modelValue, (newValue) => {
  openItems.value = new Set(newValue)
})

// IDs stables (identiques côté serveur et client) pour les items sans ID fourni
const baseId = useId()

const itemsWithIds = computed(() => {
  return props.items.map((item, index) => {
    if (item.id) return { ...item }
    return { ...item, id: `accordion-item-${baseId}-${index}` }
  })
})

const classes = computed(() => [
  'su-accordion',
  props.attached ? 'su-accordion--attached' : `su-accordion--gap-${props.gap}`
])

// Vérifier si un item est ouvert
const isItemOpen = (itemId: string | number) => {
  return openItems.value.has(itemId)
}

const commit = (next: Set<string | number>) => {
  openItems.value = next
  emit('update:modelValue', Array.from(next))
}

// Basculer l'état d'un item
const toggleItem = (itemId: string | number, item: AccordionItemData) => {
  if (item.disabled) return

  const newOpenItems = new Set(openItems.value)

  if (newOpenItems.has(itemId)) {
    newOpenItems.delete(itemId)
  } else {
    // Mode simple : un seul item ouvert à la fois
    if (!props.multiple) newOpenItems.clear()
    newOpenItems.add(itemId)
  }

  commit(newOpenItems)
  emit('item-toggle', item)
}

// Les items s'enregistrent pour les raccourcis « tout ouvrir / tout fermer »
const registeredItems = new Map<string | number, () => boolean>()

const registerItem = (itemId: string | number, isDisabled: () => boolean = () => false) => {
  registeredItems.set(itemId, isDisabled)
}

const unregisterItem = (itemId: string | number) => {
  registeredItems.delete(itemId)
}

const enabledItemIds = () => [...registeredItems].filter(([, isDisabled]) => !isDisabled()).map(([id]) => id)

// Fournir le contexte aux enfants
provide<AccordionContext>('accordion', {
  multiple: props.multiple,
  level: Math.min(6, props.level + 1),
  attached: computed(() => props.attached),
  isItemOpen,
  toggleItem,
  registerItem,
  unregisterItem
})

// ============================================================
// Navigation clavier (pattern WAI-ARIA Accordion)
// Flèches, Début/Fin entre les en-têtes ; Alt+Début ouvre tout
// (mode multiple), Alt+Fin ferme tout.
// ============================================================

const accordionRef = ref<HTMLElement>()

const getHeaders = () => Array.from(
  accordionRef.value?.querySelectorAll<HTMLButtonElement>('.su-accordion-item__header:not(:disabled)') ?? []
).filter((header) => header.closest('.su-accordion') === accordionRef.value)

const handleKeydown = (event: KeyboardEvent) => {
  const headers = getHeaders()
  const current = headers.indexOf(event.target as HTMLButtonElement)
  // Les touches ne concernent que les en-têtes (pas le contenu des panneaux)
  if (current === -1) return

  if (event.altKey) {
    if (event.key === 'Home' && props.multiple) {
      event.preventDefault()
      commit(new Set(enabledItemIds()))
    } else if (event.key === 'End') {
      event.preventDefault()
      commit(new Set())
    }
    return
  }

  const targets: Record<string, number> = {
    ArrowDown: (current + 1) % headers.length,
    ArrowUp: (current - 1 + headers.length) % headers.length,
    Home: 0,
    End: headers.length - 1
  }
  if (!(event.key in targets)) return

  event.preventDefault()
  headers[targets[event.key]]?.focus()
}
</script>

<template>
  <div
    ref="accordionRef"
    :class="classes"
    :role="ariaLabel ? 'region' : undefined"
    :aria-label="ariaLabel"
    @keydown="handleKeydown"
  >
    <!-- Rendu via prop items -->
    <AccordionItem
      v-for="item in itemsWithIds"
      :id="item.id"
      :key="item.id"
      :title="item.title"
      :content="item.content"
      :disabled="item.disabled"
      :open="isItemOpen(item.id!)"
      :level="level"
      @update:open="(value) => {
        if (value !== isItemOpen(item.id!)) {
          toggleItem(item.id!, item)
        }
      }"
    />

    <!-- Rendu via slot -->
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use '../../styles/abstracts' as *;

.su-accordion {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: $spacing-2;

  &--gap-sm {
    gap: $spacing-1;
  }

  &--gap-md {
    gap: $spacing-2;
  }

  &--gap-lg {
    gap: $spacing-3;
  }

  &--gap-none {
    gap: 0;
  }

  // Éléments attachés : un seul cadre, séparateurs entre les items
  // (les items retirent leur propre cadre, voir AccordionItem)
  &--attached {
    gap: 0;
    overflow: hidden;
    box-sizing: border-box;
    border: 1px solid var(--su-border-alpha);
    border-radius: var(--su-radius-control);
    background-color: var(--su-bg-surface);
    background-clip: padding-box;
    box-shadow: var(--su-shadow-control);

    @include high-contrast {
      border-width: 2px;
    }
  }
}
</style>
