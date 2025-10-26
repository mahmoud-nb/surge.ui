import type { Meta, StoryObj } from '@storybook/vue3'
import Progress from '../Progress.vue'

const meta: Meta<typeof Progress> = {
  title: 'Atoms/Progress',
  component: Progress,
  argTypes: {
    modelValue: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    state: { control: 'select', options: ['default', 'error', 'success', 'warning'] },
    color: { control: 'color' },
    backgroundColor: { control: 'color' },
    showLabel: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    indeterminateLabel: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Progress>

export const Default: Story = {
  args: {
    modelValue: 50,
    size: 'md',
    state: 'default',
    color: '#000000',
    backgroundColor: '#e0e0e0',
    showLabel: true,
  },
}

export const Sizes: Story = {
  render: (args) => ({
    components: { Progress },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
        <Progress v-bind="args" size="sm" :model-value="30" />
        <Progress v-bind="args" size="md" :model-value="50" />
        <Progress v-bind="args" size="lg" :model-value="70" />
      </div>
    `,
  }),
}

export const States: Story = {
  render: (args) => ({
    components: { Progress },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
        <Progress v-bind="args" state="default" :model-value="40" />
        <Progress v-bind="args" state="success" :model-value="60" />
        <Progress v-bind="args" state="warning" :model-value="80" />
        <Progress v-bind="args" state="error" :model-value="90" />
      </div>
    `,
  }),
}

export const Indeterminate: Story = {
  args: {
    modelValue: 50,
    size: 'md',
    state: 'default',
    color: '#000000',
    backgroundColor: '#e0e0e0',
    showLabel: true,
    indeterminate: true,
    indeterminateLabel: 'Loading...',
  },
}

export const CustomFormat: Story = {
  render: (args) => ({
    components: { Progress },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
        <Progress
          v-bind="args"
          :model-value="25"
          :format-value="(v) => \`Étape \${v}/100\`"
          show-label
        />
        <Progress
          v-bind="args"
          :model-value="75"
          :format-value="(v) => \`\${v} sur 100 points\`"
          state="success"
          show-label
        />
        <Progress
          v-bind="args"
          :model-value="90"
          :format-value="(v) => \`Complété à \${v}% 🎯\`"
          state="warning"
          show-label
        />
      </div>
    `,
  }),
  args: {
    size: 'md',
    backgroundColor: '#eee',
    color: '#000',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Démontre l’utilisation de la prop **formatValue** pour personnaliser la manière dont la valeur est affichée et lue par les lecteurs d’écran.',
      },
    },
  },
}

export const SupportRTL: Story = {
  render: (args) => ({
    components: { Progress },
    setup() {
      return { args }
    },
    template: `
      <div dir="rtl" style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
        <Progress v-bind="args" state="default" showLabel :model-value="args.modelValue" />
      </div>
    `,
  }),
}