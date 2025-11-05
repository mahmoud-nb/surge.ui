import type { Meta, StoryObj } from '@storybook/vue3'
import Actions from '../Actions.vue'

const meta: Meta<typeof Actions> = {
  title: 'Design System/Actions',
  component: Actions,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Actions>

export const Default: Story = {
  render: (args) => ({
    components: { Actions },
    setup: () => ({ args }),
    template: '<Actions v-bind="args" />',
  }),
}

export const WithDescription: Story = {
  render: (args) => ({
    components: { Actions },
    setup: () => ({ args }),
    template: '<Actions v-bind="args" />',
  }),
}