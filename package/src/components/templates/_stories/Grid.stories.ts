import type { Meta, StoryObj } from '@storybook/vue3'
import Grid from '../Grid.vue'
import GridCell from '../GridCell.vue'

const meta: Meta<typeof Grid> = {
  title: 'Templates/Grid',
  component: Grid,
  subcomponents: { GridCell },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `Le composant **Grid** permet d'afficher du contenu sous forme de grille responsive ou de liste. Il gère automatiquement le nombre de colonnes selon les breakpoints et permet de basculer entre les modes **grille** et **liste**.`
      }
    }
  },
  argTypes: {
    columns: {
      control: 'object',
      description: 'Définit le nombre de colonnes pour chaque breakpoint.',
      table: {
        type: { summary: '{ mobile?: number, tablet?: number, miniDesktop?: number, desktop?: number }' },
        defaultValue: { summary: '{ mobile: 1, tablet: 2, miniDesktop: 3, desktop: 4 }' }
      }
    },
    gap: {
      control: 'text',
      description: 'Définit l’espace (gap) entre les cellules.',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: '"1rem"' }
      }
    },
    viewMode: {
      control: { type: 'radio' },
      options: ['grid', 'list'],
      description: 'Détermine le mode d’affichage initial.',
      table: {
        type: { summary: '"grid" | "list"' },
        defaultValue: { summary: '"grid"' }
      }
    },
  },
}
export default meta

type Story = StoryObj<typeof Grid>

const sampleCells = (count = 6) =>
  Array.from({ length: count }).map((_, i) => ({
    title: `Titre ${i + 1}`,
    content: `Ceci est le contenu de la cellule ${i + 1}`,
    footer: 'Voir plus'
  }))

// 🧩 Story 1 – Affichage de base
export const Default: Story = {
  name: 'Affichage par défaut',
  args: {
    columns: { mobile: 1, tablet: 2, miniDesktop: 3, desktop: 4 },
    gap: '1rem',
    viewMode: 'grid'
  },
  render: (args) => ({
    components: { Grid, GridCell },
    setup() {
      return { args, items: sampleCells(6) }
    },
    template: `
      <Grid v-bind="args">
        <GridCell
          v-for="(item, i) in items"
          :key="i"
          :title="item.title"
          :footer="item.footer"
        >
          {{ item.content }}
        </GridCell>
      </Grid>
    `
  })
}

// 🧩 Story 2 – Mode liste
export const ListView: Story = {
  name: 'Mode liste',
  args: {
    columns: { mobile: 1, tablet: 2, miniDesktop: 3, desktop: 4 },
    gap: '1.5rem',
    viewMode: 'list'
  },
  render: (args) => ({
    components: { Grid, GridCell },
    setup() {
      return { args, items: sampleCells(4) }
    },
    template: `
      <Grid v-bind="args">
        <GridCell
          v-for="(item, i) in items"
          :key="i"
          :title="item.title"
          :footer="item.footer"
        >
          <p>{{ item.content }}</p>
        </GridCell>
      </Grid>
    `
  })
}

// 🧩 Story 3 – Grille dense avec beaucoup d’éléments
export const DenseGrid: Story = {
  name: 'Grille dense',
  args: {
    columns: { mobile: 2, tablet: 3, miniDesktop: 4, desktop: 6 },
    gap: '0.5rem',
    viewMode: 'grid'
  },
  render: (args) => ({
    components: { Grid, GridCell },
    setup() {
      return { args, items: sampleCells(12) }
    },
    template: `
      <Grid v-bind="args">
        <GridCell
          v-for="(item, i) in items"
          :key="i"
          :title="item.title"
          :footer="item.footer"
        >
          <div style="height:80px;display:flex;align-items:center;justify-content:center;background:#f9fafb;">
            {{ item.content }}
          </div>
        </GridCell>
      </Grid>
    `
  })
}

// 🧩 Story 4 – Slot personnalisé
export const CustomSlots: Story = {
  name: 'Slots personnalisés',
  args: {
    columns: { mobile: 1, tablet: 2, miniDesktop: 3, desktop: 3 },
    gap: '1rem',
    viewMode: 'grid'
  },
  render: (args) => ({
    components: { Grid, GridCell },
    setup() {
      return { args }
    },
    template: `
      <Grid v-bind="args">
        <GridCell>
          <template #title>
            <strong>📦 Produit A</strong>
          </template>
          <div>Contenu personnalisé dans le slot principal</div>
          <template #footer>
            <button class="su-grid-footer-btn">Action</button>
          </template>
        </GridCell>

        <GridCell>
          <template #title>🔥 Produit B</template>
          <div>Autre contenu</div>
          <template #footer><em>Détails</em></template>
        </GridCell>
      </Grid>
    `
  })
}
