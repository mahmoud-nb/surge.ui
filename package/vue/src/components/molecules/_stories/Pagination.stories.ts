import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Pagination from '../Pagination.vue'

const meta: Meta<typeof Pagination> = {
  title: 'Molecules/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Pagination : `<nav>` nommée, page courante en `aria-current="page"`, nombre d’éléments constant (ellipses). Aux extrémités, précédent et suivant restent focusables (`aria-disabled`) pour ne pas perdre le focus.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: { type: 'number', min: 1 }, description: 'Page courante (v-model)' },
    total: { control: { type: 'number', min: 0 }, description: 'Nombre total d’éléments' },
    pageSize: { control: { type: 'number', min: 1 }, description: 'Éléments par page' },
    pageCount: { control: { type: 'number', min: 1 }, description: 'Nombre de pages (prioritaire sur total / pageSize)' },
    siblings: { control: { type: 'number', min: 0, max: 3 }, description: 'Pages de part et d’autre de la page courante' },
    boundaries: { control: { type: 'number', min: 0, max: 3 }, description: 'Pages toujours affichées aux extrémités' },
    showEdges: { control: 'boolean', description: 'Boutons première / dernière page' },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'], description: 'Taille' },
    disabled: { control: 'boolean', description: 'Désactive la pagination' },
    ariaLabel: { control: 'text', description: 'Nom de la navigation (défaut : « Pagination »)' }
  },
  args: {
    total: 200,
    pageSize: 10,
    modelValue: 1
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Pagination },
    setup() {
      const page = ref(args.modelValue ?? 1)
      return { args, page }
    },
    template: `
      <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
        <Pagination v-bind="args" v-model="page" />
        <p style="margin: 0; color: var(--su-text-tertiary); font-size: var(--su-font-size-sm);">Page {{ page }}</p>
      </div>
    `
  })
}

export const WithEdges: Story = {
  name: 'Première / dernière page',
  args: { showEdges: true, modelValue: 8 },
  render: Default.render
}

export const FewPages: Story = {
  name: 'Peu de pages',
  args: { pageCount: 5, total: undefined },
  render: Default.render
}

export const Sizes: Story = {
  render: () => ({
    components: { Pagination },
    template: `
      <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
        <Pagination :page-count="12" :model-value="6" size="sm" />
        <Pagination :page-count="12" :model-value="6" size="md" />
        <Pagination :page-count="12" :model-value="6" size="lg" />
      </div>
    `
  })
}

export const Disabled: Story = {
  args: { disabled: true, modelValue: 4 },
  render: Default.render
}
