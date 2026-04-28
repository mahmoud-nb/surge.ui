<script setup lang="ts">
import { ref, computed, provide, watch, onMounted, onUnmounted } from 'vue'
import { useUniqueId } from '@/composables'
import AccordionItem from '../molecules/AccordionItem.vue'
import type { AccordionItemData, AccordionProps } from '@/types'

const props = withDefaults(defineProps<AccordionProps>(), {
  multiple: false,
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

// Cache stable des IDs générés pour les items sans ID fourni
const itemIdCache = new Map<number, string>()

const itemsWithIds = computed(() => {
  return props.items.map((item, index) => {
    if (item.id) return { ...item }
    if (!itemIdCache.has(index)) {
      itemIdCache.set(index, useUniqueId('accordion-item'))
    }
    return { ...item, id: itemIdCache.get(index) }
  })
})

// Vérifier si un item est ouvert
const isItemOpen = (itemId: string | number) => {
  return openItems.value.has(itemId)
}

// Basculer l'état d'un item
const toggleItem = (itemId: string | number, item: AccordionItemData) => {
  if (item.disabled) return

  const newOpenItems = new Set(openItems.value)

  if (props.multiple) {
    // Mode multiple : ajouter/supprimer sans affecter les autres
    if (newOpenItems.has(itemId)) {
      newOpenItems.delete(itemId)
    } else {
      newOpenItems.add(itemId)
    }
  } else {
    // Mode simple : fermer tous les autres et ouvrir celui-ci
    if (newOpenItems.has(itemId)) {
      newOpenItems.delete(itemId)
    } else {
      newOpenItems.clear()
      newOpenItems.add(itemId)
    }
  }

  openItems.value = newOpenItems
  emit('update:modelValue', Array.from(newOpenItems))
  emit('item-toggle', item)
}

// Navigation clavier avancée pour tout l'accordéon
const accordionRef = ref<HTMLElement>()
const itemRefs = ref<Map<string | number, { focus: () => void }>>(new Map())

// Enregistrer un item pour la navigation
const registerItem = (itemId: string | number, itemRef: { focus: () => void }) => {
  itemRefs.value.set(itemId, itemRef)
}

// Désenregistrer un item
const unregisterItem = (itemId: string | number) => {
  itemRefs.value.delete(itemId)
}

// Fournir le contexte aux enfants
provide('accordion', {
  multiple: props.multiple,
  level: computed(() => Math.min(6, props.level + 1) as 1 | 2 | 3 | 4 | 5 | 6),
  isItemOpen,
  toggleItem,
  registerItem,
  unregisterItem
})

// Navigation clavier globale
const handleKeydown = (event: KeyboardEvent) => {
  if (!accordionRef.value) return

  const focusableItems = Array.from(itemRefs.value.values()).filter((_, index) => {
    const item = itemsWithIds.value[index]
    return item && !item.disabled
  })

  if (focusableItems.length === 0) return

  const currentIndex = focusableItems.findIndex(ref => 
    document.activeElement === document.querySelector(`[data-accordion-item="${ref}"]`)
  )

  const keys = {
    Home: () => {
      event.preventDefault()
      focusableItems[0]?.focus()
    },
    End: () => {
      event.preventDefault()
      focusableItems[focusableItems.length - 1]?.focus()
    },
    ArrowDown: () => {
      event.preventDefault()
      const nextIndex = (currentIndex + 1) % focusableItems.length
      focusableItems[nextIndex]?.focus()
    },
    ArrowUp: () => {
      event.preventDefault()
      const prevIndex = (currentIndex - 1 + focusableItems.length) % focusableItems.length
      focusableItems[prevIndex]?.focus()
    },
    PageDown: () => {
      event.preventDefault()
      const nextIndex = Math.min(currentIndex + 3, focusableItems.length - 1)
      focusableItems[nextIndex]?.focus()
    },
    PageUp: () => {
      event.preventDefault()
      const prevIndex = Math.max(currentIndex - 3, 0)
      focusableItems[prevIndex]?.focus()
    }
  }

  const action = keys[event.key as keyof typeof keys]
  if (action) {
    action()
  }
}

// Gestionnaire global pour les raccourcis clavier
const handleGlobalKeydown = (event: KeyboardEvent) => {
  if (event.altKey) {
    const itemsArray = Array.from(itemRefs.value.entries())
    const currentItemIndex = itemsArray.findIndex(([_, ref]) => 
      document.activeElement === document.querySelector(`[data-accordion-item="${ref}"]`)
    )

    if (event.key === 'Home' && event.altKey) {
      event.preventDefault()
      // Ouvrir tous les items (mode multiple seulement)
      if (props.multiple) {
        const allIds = itemsWithIds.value.map(item => item.id).filter(Boolean) as (string | number)[]
        openItems.value = new Set(allIds)
        emit('update:modelValue', Array.from(openItems.value))
      }
    } else if (event.key === 'End' && event.altKey) {
      event.preventDefault()
      // Fermer tous les items
      openItems.value.clear()
      emit('update:modelValue', [])
    } else if (event.key === 'ArrowDown' && event.altKey && currentItemIndex !== -1) {
      event.preventDefault()
      // Ouvrir l'item courant
      const currentItemId = itemsArray[currentItemIndex][0]
      const currentItem = itemsWithIds.value.find(item => item.id === currentItemId)
      if (currentItem && !currentItem.disabled) {
        toggleItem(currentItemId, currentItem)
      }
    } else if (event.key === 'ArrowUp' && event.altKey && currentItemIndex !== -1) {
      event.preventDefault()
      // Fermer l'item courant
      const currentItemId = itemsArray[currentItemIndex][0]
      const currentItem = itemsWithIds.value.find(item => item.id === currentItemId)
      if (currentItem && !currentItem.disabled && openItems.value.has(currentItemId)) {
        toggleItem(currentItemId, currentItem)
      }
    }
  }
}


onMounted(() => {
  document.addEventListener('keydown', handleGlobalKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleGlobalKeydown)
})
</script>

<template>
  <div
    ref="accordionRef"
    class="su-accordion"
    :class="`su-accordion--gap-${gap}`"
    role="region"
    :aria-multiselectable="multiple"
    :aria-label="ariaLabel || 'Accordion'"
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
@use '../../styles/core/mixins' as *;
@use '../../styles/foundations/spacing' as space;

.su-accordion {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: space.$spacing-2;

  &--gap-sm {
    gap: space.$spacing-1;
  }

  &--gap-md {
    gap: space.$spacing-2;
  }

  &--gap-lg {
    gap: space.$spacing-3;
  }

  &--gap-none {
    gap: 0;
  }
}

/* Support pour les préférences de réduction de mouvement */
@media (prefers-reduced-motion: reduce) {
  .su-accordion {
    * {
      @include transition(none);

      animation: none;
    }
  }
}
</style>