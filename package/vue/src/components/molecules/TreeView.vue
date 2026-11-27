<script setup lang="ts">
import { computed, nextTick, provide, ref, useId } from 'vue'
import TreeViewNode from './TreeViewNode.vue'
import type { TreeItem, TreeViewProps } from '@/types'
import { useListNavigation } from '@/composables/useListNavigation'
import { TreeContextKey } from './treeContext'

// ============================================================
// TREE VIEW — arborescence (motif APG « tree view »).
// - role="tree" / "treeitem" / "group", niveau, position et état
//   déplié annoncés ; un seul arrêt de tabulation (roving).
// - ↑ / ↓ : élément visible précédent / suivant ; → : déplier, puis
//   premier enfant ; ← : replier, puis parent (inversé en RTL) ;
//   Début / Fin ; saisie rapide ; * : déplier les frères ;
//   Entrée / Espace : choisir (ou déplier dans un arbre de navigation).
// ============================================================

type ItemId = TreeItem['id']

const props = withDefaults(defineProps<TreeViewProps>(), {
  items: () => [],
  selectable: true,
  size: 'md'
})

const expanded = defineModel<ItemId[]>('expanded', { default: () => [] })
const selected = defineModel<ItemId | null>('selected', { default: null })

const emit = defineEmits<{
  select: [item: TreeItem]
}>()

const uid = useId()
const rootRef = ref<HTMLUListElement>()

interface VisibleNode {
  item: TreeItem
  parentId: ItemId | null
}

const expandedSet = computed(() => new Set(expanded.value))

// Éléments visibles dans l'ordre d'affichage (enfants des éléments dépliés)
const visible = computed<VisibleNode[]>(() => {
  const nodes: VisibleNode[] = []
  const walk = (items: TreeItem[], parentId: ItemId | null) => {
    for (const item of items) {
      nodes.push({ item, parentId })
      if (item.children?.length && expandedSet.value.has(item.id)) walk(item.children, item.id)
    }
  }
  walk(props.items, null)
  return nodes
})

const focusedId = ref<ItemId | null>(null)

// Arrêt de tabulation : l'élément focalisé, sinon l'élément choisi, sinon le premier
const tabStop = computed<ItemId | null>(() => {
  const ids = visible.value.map((node) => node.item.id)
  if (focusedId.value !== null && ids.includes(focusedId.value)) return focusedId.value
  if (selected.value !== null && ids.includes(selected.value)) return selected.value
  return ids[0] ?? null
})

const elementOf = (id: ItemId) =>
  Array.from(rootRef.value?.querySelectorAll<HTMLElement>('[data-tree-id]') ?? []).find((element) => element.dataset.treeId === String(id))

const focusItem = async (id: ItemId) => {
  focusedId.value = id
  await nextTick()
  elementOf(id)?.focus()
}

const nav = useListNavigation({
  items: visible,
  mode: 'roving',
  typeahead: { getLabel: (node) => node.item.label },
  onActiveChange: (index) => {
    const node = visible.value[index]
    if (node) focusItem(node.item.id)
  }
})

// ### Actions

const setExpanded = (item: TreeItem, value: boolean) => {
  if (!item.children?.length || item.disabled) return
  const isOpen = expandedSet.value.has(item.id)
  if (value === isOpen) return
  expanded.value = value ? [...expanded.value, item.id] : expanded.value.filter((id) => id !== item.id)
}

const toggle = (item: TreeItem) => setExpanded(item, !expandedSet.value.has(item.id))

const activate = (item: TreeItem) => {
  focusItem(item.id)
  if (item.disabled) return
  if (props.selectable) {
    selected.value = item.id
    emit('select', item)
  } else {
    if (item.children?.length) toggle(item)
    emit('select', item)
  }
}

provide(TreeContextKey, {
  expanded: expandedSet,
  selected: computed(() => selected.value),
  tabStop,
  selectable: computed(() => props.selectable),
  labelId: (id) => `tree-${uid}-${String(id).replace(/\s+/g, '-')}`,
  toggle,
  activate,
  setFocused: (id) => (focusedId.value = id)
})

// ### Clavier

const handleKeydown = (event: KeyboardEvent) => {
  const index = visible.value.findIndex((node) => node.item.id === tabStop.value)
  const node = visible.value[index]
  if (!node) return
  nav.activeIndex.value = index

  const rtl = !!rootRef.value && getComputedStyle(rootRef.value).direction === 'rtl'
  const forward = rtl ? 'ArrowLeft' : 'ArrowRight'
  const backward = rtl ? 'ArrowRight' : 'ArrowLeft'
  const hasChildren = !!node.item.children?.length
  const isOpen = expandedSet.value.has(node.item.id)

  switch (event.key) {
    case forward:
      event.preventDefault()
      if (hasChildren && !isOpen) setExpanded(node.item, true)
      else if (hasChildren) focusItem(node.item.children![0].id)
      return
    case backward:
      event.preventDefault()
      if (hasChildren && isOpen) setExpanded(node.item, false)
      else if (node.parentId !== null) focusItem(node.parentId)
      return
    case 'Enter':
      event.preventDefault()
      activate(node.item)
      return
    case ' ':
      // Espace complète une saisie rapide en cours
      if (nav.handleKeydown(event)) return
      event.preventDefault()
      activate(node.item)
      return
    case '*': {
      event.preventDefault()
      const siblings = visible.value.filter((other) => other.parentId === node.parentId).map((other) => other.item)
      const toOpen = siblings.filter((item) => item.children?.length && !item.disabled).map((item) => item.id)
      expanded.value = [...new Set([...expanded.value, ...toOpen])]
      return
    }
    default:
      nav.handleKeydown(event)
  }
}

defineExpose({
  /** Donne le focus à l'élément actif */
  focus: () => (tabStop.value !== null ? focusItem(tabStop.value) : undefined)
})
</script>

<template>
  <ul
    ref="rootRef"
    role="tree"
    :class="['su-tree', `su-tree--${size}`]"
    :aria-label="ariaLabel"
    :aria-labelledby="ariaLabelledBy"
    @keydown="handleKeydown"
  >
    <TreeViewNode
      v-for="(item, index) in items"
      :key="item.id"
      :item="item"
      :level="1"
      :setsize="items.length"
      :posinset="index + 1"
    />
  </ul>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// TREE VIEW — lignes de 32px (28px dès `sm`), indentation par
// niveau, chevron qui pivote. Listes préfixées : la page hôte
// stylise souvent ul et li.
// ============================================================

.su-tree {
  --_su-tree-row: 2rem;
  --_su-tree-indent: 1.25rem;

  margin: 0;
  padding: 0;
  list-style: none;
  color: var(--su-text-primary);
  font-size: var(--su-font-size-base);

  @include up('sm') {
    --_su-tree-row: 1.75rem;

    font-size: var(--su-font-size-sm);
  }

  &--sm {
    --_su-tree-row: 1.75rem;
    --_su-tree-indent: 1rem;

    font-size: var(--su-font-size-sm);

    @include up('sm') {
      --_su-tree-row: 1.5rem;

      font-size: var(--su-font-size-xs);
    }
  }

  &--lg {
    --_su-tree-row: 2.25rem;
    --_su-tree-indent: 1.5rem;

    font-size: var(--su-font-size-base);
  }

  .su-tree__group {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .su-tree__item {
    margin: 0;
    outline: none;
  }

  // Focus clavier : anneau sur la ligne de l'élément (pas sur ses enfants)
  .su-tree__item:focus-visible > .su-tree__row {
    @include focus-ring($offset: -2px);
  }
}

.su-tree__row {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  min-height: var(--_su-tree-row);
  padding-inline: calc(var(--_su-tree-level, 0) * var(--_su-tree-indent) + 0.25rem) 0.5rem;
  border-radius: var(--su-radius-md);
  cursor: pointer;
  user-select: none;

  @include transition(background-color, color);

  &:hover {
    background-color: var(--su-bg-accent);
  }

  &--selected,
  &--selected:hover {
    background-color: with-alpha(primary-default, 8%);
    color: var(--su-primary-default);
    font-weight: var(--su-font-weight-medium);
  }

  &--disabled {
    @include disabled-state;
  }
}

.su-tree__toggle,
.su-tree__spacer {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 1rem;
  height: 1rem;
}

.su-tree__toggle {
  border-radius: var(--su-radius-sm);
  color: var(--su-text-tertiary);

  &:hover {
    color: var(--su-text-primary);
  }
}

.su-tree__chevron {
  width: 0.875rem;
  height: 0.875rem;
  stroke-width: 2;

  @include transition(rotate);

  .su-tree__toggle--expanded & {
    rotate: 90deg;
  }

  [dir='rtl'] .su-tree__toggle:not(.su-tree__toggle--expanded) & {
    rotate: 180deg;
  }
}

.su-tree__icon {
  flex-shrink: 0;
  width: 1rem;
  height: 1rem;
  color: var(--su-text-tertiary);

  .su-tree__row--selected & {
    color: currentcolor;
  }
}

.su-tree__label {
  @include truncate;
}
</style>
