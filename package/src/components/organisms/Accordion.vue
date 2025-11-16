<script setup lang="ts">
import { ref, computed, provide, watch, nextTick, onMounted, onUnmounted } from 'vue'
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

// Générer des IDs uniques pour les items sans ID
const itemsWithIds = computed(() => {
  return props.items.map(item => ({
    ...item,
    id: item.id || `accordion-item-${Math.random().toString(36).slice(2, 10)}`
  }))
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

// Gestion des annonces pour lecteurs d'écran
const announceToScreenReader = (message: string) => {
  const announcer = document.getElementById('a11y-announcer') || createAnnouncer()
  announcer.textContent = message
}

const createAnnouncer = (): HTMLElement => {
  const announcer = document.createElement('div')
  announcer.id = 'a11y-announcer'
  announcer.setAttribute('aria-live', 'polite')
  announcer.setAttribute('aria-atomic', 'true')
  announcer.className = 'sr-only'
  document.body.appendChild(announcer)
  return announcer
}

onMounted(() => {
  document.addEventListener('keydown', handleGlobalKeydown)
  // Annoncer le mode de l'accordéon
  nextTick(() => {
    announceToScreenReader(
      `Accordéon ${props.multiple ? 'multiple' : 'simple'} avec ${itemsWithIds.value.length} sections. ` +
      'Utilisez les flèches pour naviguer, Espace ou Entrée pour ouvrir/fermer.'
    )
  })
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
@use '../../styles/main' as *;

.su-accordion {
  width: 100%;
  display: flex;
  flex-direction: column;
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
}

/* Support pour les préférences de réduction de mouvement */
@media (prefers-reduced-motion: reduce) {
  .su-accordion {
    * {
      transition: none;
      animation: none;
    }
  }
}
</style>