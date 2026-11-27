import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { DocumentIcon, FolderIcon } from '@heroicons/vue/24/outline'
import TreeView from '../TreeView.vue'
import type { TreeItem } from '@/types'

const files: TreeItem[] = [
  {
    id: 'src',
    label: 'src',
    icon: FolderIcon,
    children: [
      {
        id: 'components',
        label: 'components',
        icon: FolderIcon,
        children: [
          { id: 'button', label: 'Button.vue', icon: DocumentIcon },
          { id: 'dialog', label: 'Dialog.vue', icon: DocumentIcon },
          { id: 'tree', label: 'TreeView.vue', icon: DocumentIcon }
        ]
      },
      { id: 'composables', label: 'composables', icon: FolderIcon, children: [{ id: 'use-toast', label: 'useToast.ts', icon: DocumentIcon }] },
      { id: 'index', label: 'index.ts', icon: DocumentIcon }
    ]
  },
  { id: 'docs', label: 'docs', icon: FolderIcon, children: [{ id: 'guide', label: 'guide.md', icon: DocumentIcon }] },
  { id: 'package', label: 'package.json', icon: DocumentIcon },
  { id: 'lock', label: 'package-lock.json', icon: DocumentIcon, disabled: true }
]

const meta: Meta<typeof TreeView> = {
  title: 'Molecules/TreeView',
  component: TreeView,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Arborescence (`role="tree"`) : un seul arrêt de tabulation, ↑ / ↓ entre éléments visibles, → déplie puis entre, ← replie puis remonte, Début / Fin, saisie rapide, * déplie les frères, Entrée / Espace choisit. `v-model:expanded` et `v-model:selected`.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object', description: 'Éléments : id, label, children, icon, disabled' },
    selectable: { control: 'boolean', description: 'Un élément peut être choisi (aria-selected)' },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'], description: 'Taille' },
    ariaLabel: { control: 'text', description: 'Nom de l’arbre (obligatoire sans ariaLabelledBy)' }
  },
  args: { items: files, ariaLabel: 'Fichiers du projet' },
  decorators: [() => ({ template: '<div style="width: 18rem;"><story /></div>' })]
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { TreeView },
    setup() {
      const expanded = ref<(string | number)[]>(['src', 'components'])
      const selected = ref<string | number | null>('button')
      return { args, expanded, selected }
    },
    template: `
      <TreeView v-bind="args" v-model:expanded="expanded" v-model:selected="selected" />
      <p style="margin: 0.75rem 0 0; font-size: 12px; color: var(--su-text-tertiary);">Choisi : {{ selected ?? '—' }}</p>
    `
  })
}

export const Navigation: Story = {
  name: 'Arbre de navigation (sans sélection)',
  args: { selectable: false },
  render: Default.render
}

export const Sizes: Story = {
  render: () => ({
    components: { TreeView },
    setup: () => ({ files }),
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <TreeView :items="files" size="sm" aria-label="Petit" :expanded="['src']" />
        <TreeView :items="files" size="lg" aria-label="Grand" :expanded="['src']" />
      </div>
    `
  })
}
