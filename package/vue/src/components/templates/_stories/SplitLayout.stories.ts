import type { Meta, StoryObj } from '@storybook/vue3'
import SplitLayout from '../SplitLayout.vue'
import Button from '../../atoms/Button.vue'
import { DemoBox } from './layoutDemo'

const meta: Meta<typeof SplitLayout> = {
  title: 'Templates/SplitLayout',
  component: SplitLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Deux zones côte à côte : écran partagé (visuel + argumentaire, comparaison A / B) ou composition **asymétrique** (`ratio` 2:1, 3:2…). Slots `start` et `end`. Mobile first : zones empilées, côte à côte dès que le conteneur atteint `breakpoint`. Des SplitLayout successifs alternant `reverse` forment un **parcours en Z**.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    ratio: {
      control: { type: 'select' },
      options: ['1:1', '2:1', '1:2', '3:2', '2:3'],
      description: 'Proportions des zones en colonnes',
      table: { defaultValue: { summary: '1:1' } }
    },
    breakpoint: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Largeur de conteneur à partir de laquelle les zones sont côte à côte',
      table: { defaultValue: { summary: 'md' } }
    },
    reverse: {
      control: 'boolean',
      description: 'En colonnes, affiche la zone `end` à gauche (sur mobile, `start` reste en premier)',
      table: { defaultValue: { summary: 'false' } }
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'stretch'],
      description: 'Alignement vertical des zones en colonnes',
      table: { defaultValue: { summary: 'stretch' } }
    },
    fullHeight: {
      control: 'boolean',
      description: 'Hauteur minimale de l\'écran en colonnes',
      table: { defaultValue: { summary: 'false' } }
    },
    gap: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Écart entre les zones',
      table: { defaultValue: { summary: 'none' } }
    }
  },
  args: {
    ratio: '1:1',
    breakpoint: 'md',
    reverse: false,
    align: 'stretch',
    fullHeight: false,
    gap: 'none'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const SplitScreen: Story = {
  name: 'Écran partagé',
  args: { fullHeight: true, align: 'stretch' },
  render: (args) => ({
    components: { SplitLayout, DemoBox, Button },
    setup: () => ({ args }),
    template: `
      <SplitLayout v-bind="args">
        <template #start>
          <DemoBox label="Visuel" height="280px" tone="accent" style="flex: 1; border-radius: 0;" />
        </template>
        <template #end>
          <div style="display: flex; flex-direction: column; justify-content: center; gap: 1rem; flex: 1; padding: 2rem;">
            <h1 style="margin: 0; font-size: var(--su-font-size-3xl);">Connectez-vous</h1>
            <p style="margin: 0; color: var(--su-text-secondary);">L'argumentaire ou le formulaire occupe la seconde moitié.</p>
            <div><Button variant="primary">Continuer</Button></div>
          </div>
        </template>
      </SplitLayout>
    `
  })
}

export const Asymmetrical: Story = {
  name: 'Asymétrique',
  args: { ratio: '3:2', gap: 'md' },
  render: (args) => ({
    components: { SplitLayout, DemoBox },
    setup: () => ({ args }),
    template: `
      <SplitLayout v-bind="args" style="padding: 1.5rem;">
        <template #start>
          <DemoBox label="Projet phare" height="360px" tone="accent" style="flex: 1;" />
        </template>
        <template #end>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--su-layout-gap); flex: 1;">
            <DemoBox label="Projet 2" height="160px" style="grid-column: span 2;" />
            <DemoBox label="Projet 3" height="160px" />
            <DemoBox label="Projet 4" height="160px" />
          </div>
        </template>
      </SplitLayout>
    `
  })
}

export const ZPattern: Story = {
  name: 'Parcours en Z (zigzag)',
  args: { gap: 'xl', align: 'center' },
  render: (args) => ({
    components: { SplitLayout, DemoBox },
    setup: () => ({ args, rows: [1, 2, 3] }),
    template: `
      <div style="display: flex; flex-direction: column; gap: 3rem; padding: 2rem 1.5rem;">
        <SplitLayout v-for="row in rows" :key="row" v-bind="args" :reverse="row % 2 === 0">
          <template #start>
            <DemoBox :label="'Visuel ' + row" height="200px" tone="accent" />
          </template>
          <template #end>
            <div>
              <h2 style="margin: 0 0 0.5rem;">Fonctionnalité {{ row }}</h2>
              <p style="margin: 0; color: var(--su-text-secondary);">Le regard passe d'un côté à l'autre : les visuels alternent à gauche et à droite.</p>
            </div>
          </template>
        </SplitLayout>
      </div>
    `
  })
}

export const Comparison: Story = {
  name: 'Comparaison A / B',
  args: { gap: 'md' },
  render: (args) => ({
    components: { SplitLayout, DemoBox },
    setup: () => ({ args }),
    template: `
      <SplitLayout v-bind="args" style="padding: 1.5rem;">
        <template #start><DemoBox label="Offre A" height="220px" /></template>
        <template #end><DemoBox label="Offre B" height="220px" tone="accent" /></template>
      </SplitLayout>
    `
  })
}
