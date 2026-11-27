import type { Meta, StoryObj } from '@storybook/vue3'
import ActionsPage from '../Actions.vue'

// Vitrine « Actions » : une seule story (même nom que la page, elle
// apparaît comme une entrée simple dans la barre latérale)
const meta: Meta<typeof ActionsPage> = {
  title: 'Global/Actions',
  component: ActionsPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Vitrine des composants d’action : Button, Link, groupes, Toggle, Dropdown et FloatButton, composés dans des cas d’usage réels (barres d’outils, menus, éditeurs, actions de ligne).'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Actions: Story = {
  render: () => ({
    components: { ActionsPage },
    template: '<ActionsPage />'
  })
}
