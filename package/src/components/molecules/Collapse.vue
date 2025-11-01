<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'

interface AccordionItem {
  id?: string
  title: string
  content: string
  icon?: string
  badge?: number
  disabled?: boolean
}

const props = defineProps<{
  items?: AccordionItem[]
  multiple?: boolean
}>()

const openItems = ref<string[]>([])
const headers = ref<HTMLButtonElement[]>([])

const toggleItem = (id: string) => {
  if (props.multiple) {
    openItems.value = openItems.value.includes(id)
      ? openItems.value.filter((i) => i !== id)
      : [...openItems.value, id]
  } else {
    openItems.value = openItems.value.includes(id) ? [] : [id]
  }
}

const isOpen = (id: string) => openItems.value.includes(id)

const handleKeydown = (event: KeyboardEvent, index: number) => {
  const key = event.key
  const max = headers.value.length - 1

  if (['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(key)) {
    event.preventDefault()
  }

  switch (key) {
    case 'ArrowDown':
      headers.value[(index + 1) > max ? 0 : index + 1]?.focus()
      break
    case 'ArrowUp':
      headers.value[(index - 1) < 0 ? max : index - 1]?.focus()
      break
    case 'Home':
      headers.value[0]?.focus()
      break
    case 'End':
      headers.value[max]?.focus()
      break
    case 'Enter':
    case ' ':
      toggleItem(props.items?.[index]?.id || index.toString())
      break
  }
}

onMounted(() => nextTick(() => (headers.value = Array.from(document.querySelectorAll('.su-accordion__header')))))
</script>

<template>
  <div class="su-accordion" role="region" aria-label="Accordion">
    <template v-if="items?.length">
      <div
        v-for="(item, index) in items"
        :key="item.id || index"
        class="su-accordion__item"
      >
        <h3 class="su-accordion__heading">
          <button
            ref="headers"
            class="su-accordion__header"
            type="button"
            :aria-expanded="isOpen(item.id || index.toString())"
            :aria-controls="`panel-${index}`"
            :id="`accordion-header-${index}`"
            :disabled="item.disabled"
            @click="toggleItem(item.id || index.toString())"
            @keydown="handleKeydown($event, index)"
          >
            <slot name="header" :item="item" :index="index">
              <span class="su-accordion__label">{{ item.title }}</span>
            </slot>
            <ChevronDownIcon 
              class="su-accordion__icon"
              :class="{ 'is-open': isOpen(item.id || index.toString()) }"
              aria-hidden="true"
            />
          </button>
        </h3>

        <div
          v-show="isOpen(item.id || index.toString())"
          class="su-accordion__panel"
          role="region"
          :id="`panel-${index}`"
          :aria-labelledby="`accordion-header-${index}`"
        >
          <slot name="panel" :item="item" :index="index">
            <p>{{ item.content }}</p>
          </slot>
        </div>
      </div>
    </template>

    <slot v-else></slot>
  </div>
</template>

<style lang="scss" scoped>
@use '../../styles/variables' as *;

.su-accordion {
  border: 1px solid $gray-200;
  border-radius: $border-radius-md;
  background: $gray-50;
  overflow: hidden;
  color: $text-primary;

  &__item + &__item {
    border-top: 1px solid $gray-200;
  }

  &__header {
    width: 100%;
    min-height: $min-touch-target;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $spacing-4 $spacing-6;
    background: white;
    color: $text-primary;
    font-size: $font-size-base;
    text-align: left;
    cursor: pointer;
    border: none;
    outline: none;
    transition: background 0.2s ease, color 0.2s ease;

    &:hover:not(:disabled) {
      background: $primary-50;
    }

    &:focus-visible {
      outline: $focus-ring-width solid $focus-ring-color;
      outline-offset: $focus-ring-offset;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  &__label {
    flex: 1;
  }

  &__icon {
    width: 1rem;
    height: 1rem;
    color: $gray-600;
    transition: transform 0.2s ease, color 0.2s ease;

    &.is-open {
      transform: rotate(180deg);
      color: $primary-600;
    }
  }

  &__panel {
    padding: $spacing-4 $spacing-6;
    background: $gray-50;
    color: $text-secondary;
    font-size: $font-size-base;
    line-height: $line-height-normal;
  }

  &__heading {
    margin: 0;
  }
}

/* 🌙 Mode sombre */
@media (prefers-color-scheme: dark) {
  .su-accordion {
    background: $gray-800;
    border-color: $gray-700;
    color: $text-primary-dark;

    &__item + &__item {
      border-top-color: $gray-700;
    }

    &__header {
      background: $gray-800;
      color: $text-primary-dark;

      &:hover:not(:disabled) {
        background: $gray-700;
      }

      &:focus-visible {
        outline-color: $primary-400;
      }
    }

    &__icon {
      color: $gray-400;

      &.is-open {
        color: $primary-400;
      }
    }

    &__panel {
      background: $gray-900;
      color: $text-secondary-dark;
    }
  }
}
</style>
