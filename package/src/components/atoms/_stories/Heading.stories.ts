import type { Meta, StoryFn } from '@storybook/vue3'
import Heading from '@/components/atoms/Heading.vue'
import Icon from '@/components/atoms/Icon.vue'
import { AtSymbolIcon, UserIcon } from '@heroicons/vue/24/outline'



const meta: Meta<typeof Heading> = {
  title: 'Atoms/Heading',
  component: Heading,
  parameters: {
    docs: {
      description: {
        component:
          'Composant `Heading` rend une balise de titre (`h1`–`h6`) stylisée selon le niveau et la couleur. Il gère aussi les textes tronqués et le RTL.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 'div'],
      description: 'Niveau du titre (h1–h6) ou "div"',
      table: { defaultValue: { summary: 2 } },
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Couleur du texte selon le thème',
      table: { defaultValue: { summary: 'primary' } },
    },
    truncate: {
      control: 'boolean',
      description: 'Tronque le texte sur une seule ligne',
      table: { defaultValue: { summary: false } },
    },
  }
}

export default meta
type Story = StoryObj<typeof meta>


export const Default: Story = {
  args: {
    level: 2,
    color: 'primary',
    truncate: false
  },
  render: (args) => ({
    components: { Heading },
    setup() { return { args } },
    template: '<Heading v-bind="args">Exemple de titre</Heading>'
  })
}

export const WithSlots: Story = {
  args: {
    level: 2,
    color: 'primary',
    truncate: false
  },
  render: (args) => ({
    components: { Heading, Icon, UserIcon, AtSymbolIcon },
    setup() {
      return { args, UserIcon, AtSymbolIcon }
    },
    template: `<Heading v-bind="args">
      <template #before>
        <UserIcon style="width: 1.5rem; height: 1.5rem;" />
      </template>
      Exemple de titre
      <template #after>
        <AtSymbolIcon style="width: 1.5rem; height: 1.5rem;" />
      </template>
    </Heading>`
  })
}

export const Levels: Story = {
  render: () => ({
    components: { Heading },
    template: `<div style="display: flex; flex-direction: column; gap: 1rem;">
      <Heading level="1" variant="primary">Titre niveau 1</Heading>
      <Heading level="2" variant="primary">Titre niveau 2</Heading>
      <Heading level="3" variant="primary">Titre niveau 3</Heading>
      <Heading level="4" variant="primary">Titre niveau 4</Heading>
      <Heading level="5" variant="primary">Titre niveau 5</Heading>
      <Heading level="6" variant="primary">Titre niveau 6</Heading>
    </div>`
  })
}

export const Variants: Story = {
  render: () => ({
    components: { Heading },
    template: `<div style="display: flex; flex-direction: column; gap: 1rem;">
      <Heading level="1" variant="primary">Titre niveau 1</Heading>
      <Heading level="2" variant="secondary">Titre niveau 2</Heading>
      <Heading level="3" variant="tertiary">Titre niveau 3</Heading>
    </div>`
  })
}

export const Truncated: Story = {
  args: {
    level: 2,
    color: 'primary',
    truncate: true
  },
  render: (args) => ({
    components: { Heading },
    setup() { return { args } },
    template: `<div style="max-width: 200px;">
      <Heading v-bind="args">Exemple de titre très long qui devrait être tronqué</Heading>
    </div>`
  })
}

export const RTL: Story = {
  args: {
    level: 2,
    variant: 'primary',
    truncate: false
  },
  render: (args) => ({
    components: { Heading },
    setup() { return { args } },
    template: `<div dir="rtl">
      <Heading v-bind="args">عنوان مثال</Heading>
    </div>`
  })
}