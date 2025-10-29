import type { Meta, StoryFn } from '@storybook/vue3'
import Heading from '@/components/atoms/Heading.vue'
import { MagnifyingGlassIcon, AtSymbolIcon, LockClosedIcon, UserIcon } from '@heroicons/vue/24/outline'

export default {
  title: 'Atoms/Heading',
  component: Heading,
  argTypes: {
    level: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 'div'],
      description: 'Niveau du titre (h1–h6) ou "div"',
      table: { defaultValue: { summary: 2 } },
    },
    color: {
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
  },
  parameters: {
    docs: {
      description: {
        component:
          'Composant `Heading` rend une balise de titre (`h1`–`h6`) stylisée selon le niveau et la couleur. Il gère aussi les textes tronqués et le RTL.',
      },
    },
  },
} as Meta<typeof Heading>

const Template: StoryFn<typeof Heading> = (args) => ({
  components: { Heading, UserIcon },
  setup() {
    return { args }
  },
  template: `
    <Heading v-bind="args">
      <template #before><UserIcon style="width: 1.5rem; height: 1.5rem;" /></template>
      Exemple de titre
      <template #after><span>🚀</span></template>
    </Heading>
  `,
})

export const Default = Template.bind({})
Default.args = {
  level: 2,
  color: 'primary',
  truncate: false,
}

export const AllLevels: StoryFn<typeof Heading> = () => ({
  components: { Heading },
  template: `
    <div>
      <Heading level="1">Titre niveau 1</Heading>
      <Heading level="2">Titre niveau 2</Heading>
      <Heading level="3">Titre niveau 3</Heading>
      <Heading level="4">Titre niveau 4</Heading>
      <Heading level="5">Titre niveau 5</Heading>
      <Heading level="6">Titre niveau 6</Heading>
    </div>
  `,
})

export const Truncated: StoryFn<typeof Heading> = () => ({
  components: { Heading },
  template: `
    <Heading truncate level="3" style="max-width: 200px;">
      Ce titre est très long et sera tronqué s'il dépasse la largeur
    </Heading>
  `,
})

export const RTL: StoryFn<typeof Heading> = () => ({
  components: { Heading },
  template: `
    <div dir="rtl">
      <Heading level="2">مرحبا بكم في نظام التصميم</Heading>
    </div>
  `,
})
