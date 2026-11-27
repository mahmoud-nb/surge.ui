import type { Meta, StoryObj } from '@storybook/vue3'
import ThemePlayground from '../ThemePlayground.vue'

// Vitrine « Thèmes » : variables CSS --su-custom-* appliquées à la volée ;
// thème, mode, sens et langue se règlent dans la barre d'outils
const meta: Meta<typeof ThemePlayground> = {
  title: 'Global/Thèmes',
  component: ThemePlayground,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Thèmes, mode sombre, RTL et langue via la barre d’outils, et variables CSS personnalisées (useCustomTheme).'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Themes: Story = {
  name: 'Thèmes',
  render: () => ({
    components: { ThemePlayground },
    template: '<ThemePlayground />'
  })
}
