<script setup lang="ts">
import { computed, inject } from 'vue'
import { ChevronRightIcon } from '@heroicons/vue/24/outline'
import type { TreeItem } from '@/types'
import { TreeContextKey } from './treeContext'

// Nœud de SuTreeView (usage interne, récursif)

const props = defineProps<{
  item: TreeItem
  level: number
  setsize: number
  posinset: number
}>()

const tree = inject(TreeContextKey)!

const hasChildren = computed(() => !!props.item.children?.length)
const isExpanded = computed(() => tree.expanded.value.has(props.item.id))
const isSelected = computed(() => tree.selected.value === props.item.id)
</script>

<template>
  <li
    role="treeitem"
    class="su-tree__item"
    :data-tree-id="item.id"
    :aria-level="level"
    :aria-setsize="setsize"
    :aria-posinset="posinset"
    :aria-expanded="hasChildren ? (isExpanded ? 'true' : 'false') : undefined"
    :aria-selected="tree.selectable.value ? (isSelected ? 'true' : 'false') : undefined"
    :aria-disabled="item.disabled ? 'true' : undefined"
    :aria-labelledby="tree.labelId(item.id)"
    :tabindex="tree.tabStop.value === item.id ? 0 : -1"
    @focus.self="tree.setFocused(item.id)"
  >
    <div
      :class="['su-tree__row', { 'su-tree__row--selected': isSelected && tree.selectable.value, 'su-tree__row--disabled': item.disabled }]"
      :style="{ '--_su-tree-level': level - 1 }"
      @click="tree.activate(item)"
    >
      <span
        v-if="hasChildren"
        :class="['su-tree__toggle', { 'su-tree__toggle--expanded': isExpanded }]"
        aria-hidden="true"
        @click.stop="tree.toggle(item)"
      >
        <ChevronRightIcon class="su-tree__chevron" />
      </span>
      <span
        v-else
        class="su-tree__spacer"
        aria-hidden="true"
      />
      <component
        :is="item.icon"
        v-if="item.icon"
        class="su-tree__icon"
        aria-hidden="true"
      />
      <span
        :id="tree.labelId(item.id)"
        class="su-tree__label"
      >{{ item.label }}</span>
    </div>

    <ul
      v-if="hasChildren && isExpanded"
      role="group"
      class="su-tree__group"
    >
      <TreeViewNode
        v-for="(child, index) in item.children"
        :key="child.id"
        :item="child"
        :level="level + 1"
        :setsize="item.children!.length"
        :posinset="index + 1"
      />
    </ul>
  </li>
</template>
