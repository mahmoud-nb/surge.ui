import type { Meta, StoryObj } from '@storybook/vue3'
import CodeBlock from '../CodeBlock.vue'

const code = `import { createApp } from 'vue'
import SurgeUI from '@surgeui/vue'
import '@surgeui/vue/style.css'
import App from './App.vue'

createApp(App).use(SurgeUI).mount('#app')
`

const meta: Meta<typeof CodeBlock> = {
  title: 'Molecules/CodeBlock',
  component: CodeBlock,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Bloc de code légendé (`<figure>` et `<figcaption>`) avec bouton de copie. Pas de coloration intégrée : le slot par défaut accepte un rendu déjà coloré (Shiki, Prism) et `data-language` est posé pour un colorateur. Le bloc ne devient focalisable que lorsqu’il défile ; les numéros de ligne ne sont ni copiés ni lus.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    code: { control: 'text', description: 'Code affiché et copié' },
    language: { control: 'text', description: 'Langage (affiché, data-language)' },
    title: { control: 'text', description: 'Titre (nom de fichier), en légende' },
    copyable: { control: 'boolean', description: 'Bouton de copie' },
    lineNumbers: { control: 'boolean', description: 'Numéros de ligne' },
    maxHeight: { control: 'text', description: 'Hauteur maximale (défilement au-delà)' },
    copyLabel: { control: 'text', description: 'Nom du bouton de copie (défaut : « Copier le code »)' }
  },
  args: { code, title: 'main.ts', language: 'ts' }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const LineNumbers: Story = {
  name: 'Numéros de ligne',
  args: { lineNumbers: true }
}

export const Bare: Story = {
  name: 'Sans légende',
  args: { title: undefined, language: undefined, code: 'npm install @surgeui/vue' }
}

export const Scrollable: Story = {
  name: 'Hauteur limitée',
  args: { code: code.repeat(4), maxHeight: '12rem', lineNumbers: true }
}
