import type { Meta, StoryObj } from '@storybook/vue3'
import Display from '../Display.vue'

// Vitrine « Affichage » : une seule story (même nom que la page, elle
// apparaît comme une entrée simple dans la barre latérale)
const meta: Meta<typeof Display> = {
  title: 'Global/Affichage',
  component: Display,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Vitrine des composants d’affichage : Heading, Panel, Image, Avatar, AvatarGroup, Badge, Dialog, Alert, Tabs, Accordion, Progress et Spinner, dans tous leurs états.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Affichage: Story = {
  render: () => ({
    components: { Display },
    template: '<Display />'
  })
}
