import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { BoldIcon, ItalicIcon, UnderlineIcon, StrikethroughIcon, Bars3BottomLeftIcon, Bars3Icon, Bars3BottomRightIcon } from '@heroicons/vue/24/outline'
import ToggleGroup from '../ToggleGroup.vue'

const meta: Meta<typeof ToggleGroup> = {
  title: 'Molecules/ToggleGroup',
  component: ToggleGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "Groupe de toggles avec sélection exclusive (radio) ou multiple. Supporte le mode connecté (gap=none), l'orientation et l'accessibilité ARIA (role=\"radiogroup\" ou role=\"group\")."
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['exclusive', 'multi'],
      description: 'Mode de sélection : exclusive (un seul actif) ou multi'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Taille des toggles'
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline', 'ghost'],
      description: 'Variante visuelle des toggles'
    },
    radius: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
      description: 'Rayon de bordure'
    },
    gap: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Espacement entre les toggles (none = connecté)'
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Orientation du groupe'
    },
    disabled: {
      control: 'boolean',
      description: 'Désactive tout le groupe'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const textFormatItems = [
  { value: 'bold', label: 'Gras' },
  { value: 'italic', label: 'Italique' },
  { value: 'underline', label: 'Souligné' }
]

const iconFormatItems = [
  { value: 'bold', icon: BoldIcon, label: 'Gras' },
  { value: 'italic', icon: ItalicIcon, label: 'Italique' },
  { value: 'underline', icon: UnderlineIcon, label: 'Souligné' },
  { value: 'strikethrough', icon: StrikethroughIcon, label: 'Barré' }
]

const alignItems = [
  { value: 'left', icon: Bars3BottomLeftIcon },
  { value: 'center', icon: Bars3Icon },
  { value: 'right', icon: Bars3BottomRightIcon }
]

export const Default: Story = {
  args: {
    items: textFormatItems,
    modelValue: ['bold']
  }
}

export const ExclusiveMode: Story = {
  render: () => ({
    components: { ToggleGroup },
    setup() {
      const selected = ref<(string | number)[]>(['center'])
      return { selected, alignItems }
    },
    template: `
      <div>
        <ToggleGroup
          v-model="selected"
          :items="alignItems"
          mode="exclusive"
          aria-label="Alignement du texte"
        />
        <p style="margin-top: 1rem; font-size: 0.875rem; color: var(--su-text-secondary);">
          Sélection : {{ selected }}
        </p>
      </div>
    `
  })
}

export const MultiSelect: Story = {
  render: () => ({
    components: { ToggleGroup },
    setup() {
      const selected = ref<(string | number)[]>(['bold'])
      return { selected, iconFormatItems }
    },
    template: `
      <div>
        <ToggleGroup
          v-model="selected"
          :items="iconFormatItems"
          mode="multi"
          aria-label="Format du texte"
        />
        <p style="margin-top: 1rem; font-size: 0.875rem; color: var(--su-text-secondary);">
          Sélection : {{ selected }}
        </p>
      </div>
    `
  })
}

export const Connected: Story = {
  render: () => ({
    components: { ToggleGroup },
    setup() {
      const selected = ref<(string | number)[]>(['center'])
      return { selected, alignItems }
    },
    template: `
      <ToggleGroup
        v-model="selected"
        :items="alignItems"
        mode="exclusive"
        gap="none"
        radius="md"
        aria-label="Alignement du texte"
      />
    `
  })
}

export const ConnectedWithLabels: Story = {
  render: () => ({
    components: { ToggleGroup },
    setup() {
      const selected = ref<(string | number)[]>(['bold'])
      return { selected, textFormatItems }
    },
    template: `
      <ToggleGroup
        v-model="selected"
        :items="textFormatItems"
        mode="multi"
        gap="none"
        aria-label="Format du texte"
      />
    `
  })
}

export const Variants: Story = {
  render: () => ({
    components: { ToggleGroup },
    setup() {
      const v1 = ref<(string | number)[]>(['bold'])
      const v2 = ref<(string | number)[]>(['bold'])
      const v3 = ref<(string | number)[]>(['bold'])
      return { v1, v2, v3, textFormatItems }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div>
          <p style="margin-bottom: 0.5rem; font-size: 0.75rem; color: var(--su-text-secondary);">Default</p>
          <ToggleGroup v-model="v1" :items="textFormatItems" variant="default" />
        </div>
        <div>
          <p style="margin-bottom: 0.5rem; font-size: 0.75rem; color: var(--su-text-secondary);">Outline</p>
          <ToggleGroup v-model="v2" :items="textFormatItems" variant="outline" />
        </div>
        <div>
          <p style="margin-bottom: 0.5rem; font-size: 0.75rem; color: var(--su-text-secondary);">Ghost</p>
          <ToggleGroup v-model="v3" :items="textFormatItems" variant="ghost" />
        </div>
      </div>
    `
  })
}

export const Sizes: Story = {
  render: () => ({
    components: { ToggleGroup },
    setup() {
      const s1 = ref<(string | number)[]>(['bold'])
      const s2 = ref<(string | number)[]>(['bold'])
      const s3 = ref<(string | number)[]>(['bold'])
      return { s1, s2, s3, textFormatItems }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div>
          <p style="margin-bottom: 0.5rem; font-size: 0.75rem; color: var(--su-text-secondary);">Small</p>
          <ToggleGroup v-model="s1" :items="textFormatItems" size="sm" />
        </div>
        <div>
          <p style="margin-bottom: 0.5rem; font-size: 0.75rem; color: var(--su-text-secondary);">Medium</p>
          <ToggleGroup v-model="s2" :items="textFormatItems" size="md" />
        </div>
        <div>
          <p style="margin-bottom: 0.5rem; font-size: 0.75rem; color: var(--su-text-secondary);">Large</p>
          <ToggleGroup v-model="s3" :items="textFormatItems" size="lg" />
        </div>
      </div>
    `
  })
}

export const Vertical: Story = {
  render: () => ({
    components: { ToggleGroup },
    setup() {
      const selected = ref<(string | number)[]>(['bold'])
      return { selected, iconFormatItems }
    },
    template: `
      <ToggleGroup
        v-model="selected"
        :items="iconFormatItems"
        orientation="vertical"
        gap="none"
        aria-label="Format du texte"
      />
    `
  })
}

export const Disabled: Story = {
  args: {
    items: textFormatItems,
    modelValue: ['bold'],
    disabled: true
  }
}

export const MixedDisabled: Story = {
  render: () => ({
    components: { ToggleGroup },
    setup() {
      const selected = ref<(string | number)[]>(['bold'])
      const items = [
        { value: 'bold', label: 'Gras' },
        { value: 'italic', label: 'Italique', disabled: true },
        { value: 'underline', label: 'Souligné' }
      ]
      return { selected, items }
    },
    template: `
      <ToggleGroup
        v-model="selected"
        :items="items"
        aria-label="Format du texte"
      />
    `
  })
}
