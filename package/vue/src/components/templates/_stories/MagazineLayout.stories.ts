import type { Meta, StoryObj } from '@storybook/vue3'
import MagazineLayout from '../MagazineLayout.vue'
import { DemoBox } from './layoutDemo'

const meta: Meta<typeof MagazineLayout> = {
  title: 'Templates/MagazineLayout',
  component: MagazineLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Hiérarchie éditoriale (sites d\'actualité, blogs) : un article à la une, une colonne de titres secondaires, puis une grille d\'articles. Slots `header`, `featured`, `aside` et `default` (chaque enfant direct est une cellule). Mobile first : empilé ; à la une 2/3 + colonne 1/3 dès un conteneur de 768px ; grille 1 → 2 (640px) → `columns` (1024px).'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: { type: 'select' },
      options: [2, 3, 4],
      description: 'Colonnes de la grille dès un conteneur de 1024px',
      table: { defaultValue: { summary: '3' } }
    },
    gap: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Écart entre les zones et les articles',
      table: { defaultValue: { summary: 'lg' } }
    }
  },
  args: {
    columns: 3,
    gap: 'lg'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Une, secondaires et grille',
  render: (args) => ({
    components: { MagazineLayout, DemoBox },
    setup: () => ({ args, stories: Array.from({ length: 6 }, (_, i) => i + 1) }),
    template: `
      <MagazineLayout v-bind="args" style="padding: 1.5rem;">
        <template #header>
          <h1 style="margin: 0; font-size: var(--su-font-size-2xl);">Actualités</h1>
        </template>
        <template #featured>
          <DemoBox label="Article à la une" height="320px" tone="accent" />
        </template>
        <template #aside>
          <DemoBox label="Titre secondaire 1" height="96px" />
          <DemoBox label="Titre secondaire 2" height="96px" />
          <DemoBox label="Titre secondaire 3" height="96px" />
        </template>

        <DemoBox v-for="n in stories" :key="n" :label="'Article ' + n" height="160px" />
      </MagazineLayout>
    `
  })
}
