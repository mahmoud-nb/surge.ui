import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import GridLayout from '../GridLayout.vue'
import { DemoBox } from './layoutDemo'

const meta: Meta<typeof GridLayout> = {
  title: 'Templates/GridLayout',
  component: GridLayout,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Grille de cellules de même importance (listes de produits, galeries, tableaux de bord), lues ligne par ligne. Chaque enfant direct du slot `default` est une cellule. Colonnes par largeur de conteneur `{ base, sm, md, lg, xl }`, ou nombre automatique avec `minItemWidth` (auto-fill). `v-model:view` passe en liste (cellules empilées) ; `view-toggle` affiche un sélecteur grille / liste dans l\'en-tête, dont les libellés sont des props.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    view: {
      control: { type: 'radio' },
      options: ['grid', 'list'],
      description: 'Affichage (`v-model:view`) : en liste, les cellules sont empilées sur une colonne',
      table: { type: { summary: '\'grid\' | \'list\'' }, defaultValue: { summary: 'grid' } }
    },
    columns: {
      control: 'object',
      description: 'Colonnes : un nombre, ou un objet par largeur de conteneur `{ base, sm, md, lg, xl }` (mobile first, chaque valeur s\'applique jusqu\'à la suivante)',
      table: {
        type: { summary: 'number | { base?, sm?, md?, lg?, xl? }' },
        defaultValue: { summary: '{ base: 1, sm: 2, lg: 3 }' }
      }
    },
    minItemWidth: {
      control: 'text',
      description: 'Largeur minimale d\'une cellule (ex. `14rem`) : grille auto-fill, le nombre de colonnes s\'adapte seul et remplace `columns`'
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'stretch'],
      description: 'Alignement vertical des cellules d\'une rangée (`stretch` : même hauteur)',
      table: { defaultValue: { summary: 'stretch' } }
    },
    itemsTag: {
      control: { type: 'select' },
      options: ['div', 'ul', 'ol'],
      description: 'Élément qui contient les cellules : `ul` ou `ol` pour une liste (cellules `li`)',
      table: { defaultValue: { summary: 'div' } }
    },
    viewToggle: {
      control: 'boolean',
      description: 'Affiche le sélecteur grille / liste dans l\'en-tête',
      table: { defaultValue: { summary: 'false' } }
    },
    viewToggleLabel: {
      control: 'text',
      description: 'Nom accessible du sélecteur',
      table: { defaultValue: { summary: 'Affichage' } }
    },
    gridLabel: {
      control: 'text',
      description: 'Libellé du bouton « grille »',
      table: { defaultValue: { summary: 'Grille' } }
    },
    listLabel: {
      control: 'text',
      description: 'Libellé du bouton « liste »',
      table: { defaultValue: { summary: 'Liste' } }
    },
    gap: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Écart entre les cellules',
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
  components: { GridLayout, DemoBox },
  setup: () => ({ args, cells: Array.from({ length: 8 }, (_, i) => i + 1) }),
  template: `
    <GridLayout v-bind="args">
      <DemoBox v-for="n in cells" :key="n" :label="'Cellule ' + n" height="120px" />
    </GridLayout>
  `
})

export const Default: Story = {
  name: 'Colonnes par largeur',
  render
}

export const FixedColumns: Story = {
  name: 'Nombre fixe de colonnes',
  args: { columns: 4, gap: 'sm' },
  render
}

export const AutoFill: Story = {
  name: 'Colonnes automatiques (minItemWidth)',
  args: { minItemWidth: '12rem' },
  render
}

export const ViewToggle: Story = {
  name: 'Sélecteur grille / liste',
  args: { viewToggle: true, itemsTag: 'ul' },
  render: (args) => ({
    components: { GridLayout, DemoBox },
    setup: () => ({ args, view: ref<'grid' | 'list'>('grid'), products: Array.from({ length: 6 }, (_, i) => i + 1) }),
    template: `
      <GridLayout v-bind="args" v-model:view="view">
        <template #header>
          <h2 style="margin: 0; font-size: var(--su-font-size-lg);">Produits</h2>
          <p style="margin: 0; color: var(--su-text-secondary); font-size: var(--su-font-size-sm);">{{ products.length }} résultats</p>
        </template>

        <li v-for="n in products" :key="n">
          <DemoBox :height="view === 'grid' ? '160px' : '72px'">
            Produit {{ n }} · {{ view === 'grid' ? 'carte' : 'ligne' }}
          </DemoBox>
        </li>
      </GridLayout>
    `
  })
}

export const ListView: Story = {
  name: 'En liste',
  args: { view: 'list' },
  render
}
