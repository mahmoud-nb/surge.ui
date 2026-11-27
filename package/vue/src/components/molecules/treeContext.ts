import type { ComputedRef, InjectionKey } from 'vue'
import type { TreeItem } from '@/types'

// Contexte partagé entre SuTreeView et ses nœuds (usage interne)
export interface TreeContext {
  expanded: ComputedRef<Set<TreeItem['id']>>
  selected: ComputedRef<TreeItem['id'] | null>
  tabStop: ComputedRef<TreeItem['id'] | null>
  selectable: ComputedRef<boolean>
  labelId: (id: TreeItem['id']) => string
  toggle: (item: TreeItem) => void
  activate: (item: TreeItem) => void
  setFocused: (id: TreeItem['id']) => void
}

export const TreeContextKey: InjectionKey<TreeContext> = Symbol('SurgeTree')
