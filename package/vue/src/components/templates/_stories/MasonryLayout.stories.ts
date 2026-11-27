import type { Meta, StoryObj } from '@storybook/vue3'
import MasonryLayout from '../MasonryLayout.vue'
import { DemoBox, tileHeights } from './layoutDemo'

const meta: Meta<typeof MasonryLayout> = {
  title: 'Templates/MasonryLayout',
  component: MasonryLayout,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Mur d\'éléments de hauteurs variables (galeries, fils de médias, témoignages) en colonnes, sans trous. Chaque enfant direct du slot `default` est une tuile, jamais coupée entre deux colonnes. Les tuiles se lisent **colonne par colonne** : pour un ordre chronologique strict, préférer une grille.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'object',
      description: 'Colonnes : un nombre, ou un objet par largeur de conteneur `{ base, sm, md, lg, xl }` (mobile first, chaque valeur s\'applique jusqu\'à la suivante)',
      table: {
        type: { summary: 'number | { base?, sm?, md?, lg?, xl? }' },
        defaultValue: { summary: '{ base: 1, sm: 2, lg: 3 }' }
      }
    },
    columnWidth: {
      control: 'text',
      description: 'Largeur idéale d\'une colonne (ex. `14rem`) : le nombre de colonnes s\'adapte seul et remplace `columns`'
    },
    gap: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Écart entre les tuiles',
      table: { defaultValue: { summary: 'md' } }
    }
  },
  args: {
    columns: { base: 1, sm: 2, lg: 3 },
    gap: 'md'
  }
}

export default meta
type Story = StoryObj<typeof meta>

const render: Story['render'] = (args) => ({
  components: { MasonryLayout, DemoBox },
  setup: () => ({ args, tiles: tileHeights }),
  template: `
    <MasonryLayout v-bind="args">
      <DemoBox
        v-for="(height, i) in tiles"
        :key="i"
        :label="'Tuile ' + (i + 1)"
        :height="height"
        :tone="i === 4 ? 'accent' : 'muted'"
      />
    </MasonryLayout>
  `
})

export const Default: Story = {
  name: 'Colonnes par largeur',
  render
}

export const FixedColumns: Story = {
  name: 'Nombre fixe de colonnes',
  args: { columns: 4 },
  render
}

export const FluidColumns: Story = {
  name: 'Colonnes fluides (columnWidth)',
  args: { columnWidth: '12rem' },
  render
}
