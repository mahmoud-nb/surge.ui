import type { Meta, StoryObj } from '@storybook/vue3'
import Form from '../Form.vue'

// Vitrine « Formulaires » : une seule story (même nom que la page, elle
// apparaît comme une entrée simple dans la barre latérale)
const meta: Meta<typeof Form> = {
  title: 'Global/Formulaires',
  component: Form,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Vitrine des composants de formulaire : Input, SelectBox, Password, Textarea, Switch, Slider, FileUpload, CheckboxGroup et RadioGroup, avec un formulaire complet relié à SuFormField.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Formulaires: Story = {
  render: () => ({
    components: { Form },
    template: '<Form />'
  })
}
