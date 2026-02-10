<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'

export interface CollapseItem {
  id?: string
  title: string
  content: string
  icon?: string
  badge?: number
  disabled?: boolean
}

const props = defineProps<{
  items?: CollapseItem[]
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
  <div
    class="su-accordion"
    role="region"
    aria-label="Accordion"
  >
    <template v-if="items?.length">
      <div
        v-for="(item, index) in items"
        :key="item.id || index"
        class="su-accordion__item"
      >
        <h3 class="su-accordion__heading">
          <button
            :id="`accordion-header-${index}`"
            ref="headers"
            class="su-accordion__header"
            type="button"
            :aria-expanded="isOpen(item.id || index.toString())"
            :aria-controls="`panel-${index}`"
            :disabled="item.disabled"
            @click="toggleItem(item.id || index.toString())"
            @keydown="handleKeydown($event, index)"
          >
            <slot
              name="header"
              :item="item"
              :index="index"
            >
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
          :id="`panel-${index}`"
          class="su-accordion__panel"
          role="region"
          :aria-labelledby="`accordion-header-${index}`"
        >
          <slot
            name="panel"
            :item="item"
            :index="index"
          >
            <p>{{ item.content }}</p>
          </slot>
        </div>
      </div>
    </template>

    <slot v-else />
  </div>
</template>

<style lang="scss" scoped>
@use '../../styles2/core/mixins' as *;
@use '../../styles2/foundations/spacing' as space;
@use '../../styles2/foundations/typography' as typo;

.su-accordion {
  border: 1px solid var(--su-gray-200);
  border-radius: var(--su-radius-md);
  background: var(--su-gray-50);
  overflow: hidden;
  color: var(--su-text-primary);

  &__item + &__item {
    border-top: 1px solid var(--su-gray-200);
  }

  &__header {
    width: 100%;
    min-height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: space.$spacing-4 space.$spacing-6;
    background: white;
    color: var(--su-text-primary);
    font-size: typo.$font-size-base;
    text-align: left;
    cursor: pointer;
    border: none;
    outline: none;

    @include transition(background, color);

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &:focus-visible {
      @include focus-ring;
    }

    &:hover:not(:disabled) {
      background: var(--su-primary-50);
    }
  }

  &__label {
    flex: 1;
  }

  &__icon {
    width: 1rem;
    height: 1rem;
    color: var(--su-gray-600);

    @include transition(transform, color);

    &.is-open {
      transform: rotate(180deg);
      color: var(--su-primary-600);
    }
  }

  &__panel {
    padding: space.$spacing-4 space.$spacing-6;
    background: var(--su-gray-50);
    color: var(--su-text-secondary);
    font-size: typo.$font-size-base;
    line-height: var(--su-line-height-normal);
  }

  &__heading {
    margin: 0;
  }
}

@media (prefers-color-scheme: dark) {
  .su-accordion {
    background: var(--su-gray-800);
    border-color: var(--su-gray-700);
    color: var(--su-text-primary);

    &__item + &__item {
      border-top-color: var(--su-gray-700);
    }

    &__header {
      background: var(--su-gray-800);
      color: var(--su-text-primary);

      &:focus-visible {
        outline-color: var(--su-primary-400);
      }

      &:hover:not(:disabled) {
        background: var(--su-gray-700);
      }
    }

    &__icon {
      color: var(--su-gray-400);

      &.is-open {
        color: var(--su-primary-400);
      }
    }

    &__panel {
      background: var(--su-gray-900);
      color: var(--su-text-secondary);
    }
  }
}
</style>
