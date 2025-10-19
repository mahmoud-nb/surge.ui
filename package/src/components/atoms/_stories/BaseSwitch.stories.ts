import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { CheckIcon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/vue/24/outline'
import BaseSwitch from '../BaseSwitch.vue'

const meta: Meta<typeof BaseSwitch> = {
  title: 'Atoms/BaseSwitch',
  component: BaseSwitch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "Composant Switch (interrupteur) pour basculer entre deux états on/off. Conforme aux normes WAI-ARIA et accessible clavier."
      }
    }
  },
  //tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: 'État du switch (true = activé)'
    },
    disabled: {
      control: 'boolean',
      description: 'Désactive le switch'
    },
    readonly: {
      control: 'boolean',
      description: 'Rend le switch non interactif'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Taille du switch'
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'warning'],
      description: 'État visuel du switch'
    },
    leftLabel: {
      control: 'text',
      description: 'Texte affiché à gauche du switch'
    },
    rightLabel: {
      control: 'text',
      description: 'Texte affiché à droite du switch'
    },
    /*
     * TODO : Ajouter la prise en charge de la position des labels
     * labelPosition: { control: { type: 'select' }, options: ['outside', 'inside'], description: 'Position des labels' },
    **/
  }
}

export default meta
type Story = StoryObj<typeof meta>

const Template: Story = {
  render: (args) => ({
    components: { BaseSwitch },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: `
      <BaseSwitch v-model="value" v-bind="args" />
    `
  })
}

export const Default: Story = {
  args: {
    modelValue: false
  }
}

export const WithRightLabel: Story = {
  args: {
    rightLabel: 'Activé',
    checked: true
  }
}

export const WithBothLabels: Story = {
  args: {
    leftLabel: 'Privé',
    rightLabel: 'Public',
  }
}

export const States: Story = {
  render: () => ({
    components: { BaseSwitch },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; width: 400px;">
        <BaseSwitch 
          label="État par défaut"
          rightLabel="Normal"
          message="Fonctionnement normal"
        />
        <BaseSwitch 
          state="error"
          label="État d'erreur"
          rightLabel="Erreur"
          message="Une erreur s'est produite"
          :modelValue="true"
        />
        <BaseSwitch 
          state="success"
          label="État de succès"
          rightLabel="Succès"
          message="Configuration sauvegardée !"
          :modelValue="true"
        />
        <BaseSwitch 
          state="warning"
          label="État d'avertissement"
          rightLabel="Attention"
          message="Cette action nécessite une confirmation"
          :modelValue="true"
        />
      </div>
    `
  })
}

export const Sizes: Story = {
  render: () => ({
    components: { BaseSwitch },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; width: 400px;">
        <BaseSwitch 
          size="sm"
          label="Small"
          rightLabel="Petit"
        />
        <BaseSwitch 
          size="md"
          label="Medium"
          rightLabel="Moyen"
        />
        <BaseSwitch 
          size="lg"
          label="Large"
          rightLabel="Grand"
        />
      </div>
    `
  })
}

export const Disabled: Story = {
  args: {
    label: 'Switch désactivé',
    rightLabel: 'Désactivé',
    disabled: true,
    modelValue: true,
    message: 'Ce switch est désactivé'
  }
}

export const Readonly: Story = {
  args: {
    label: 'Switch en lecture seule',
    rightLabel: 'Lecture seule',
    readonly: true,
    modelValue: false,
    message: 'Cette valeur ne peut pas être modifiée'
  }
}

export const WithCustomIcons: Story = {
  render: () => ({
    components: { BaseSwitch },
    setup() {
      return { SunIcon, MoonIcon, CheckIcon, XMarkIcon}
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; width: 400px;">
        <div>
          <h4 style="margin-bottom: 1rem;">Avec icones personnalisés</h4>
          <BaseSwitch 
            :leftIcon="MoonIcon"
            :rightIcon="SunIcon"
          />
        </div>
        <div>
          <h4 style="margin-bottom: 1rem;">Avec icones personnalisés et labels</h4>
          <BaseSwitch 
            leftLabel="Sombre"
            rightLabel="Clair"
            :leftIcon="MoonIcon"
            :rightIcon="SunIcon"
          />
        </div>
      </div>
    `
  })
}

export const LabelPositions: Story = {
  render: () => ({
    components: { BaseSwitch },
    setup() {
      return { SunIcon, MoonIcon }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; width: 400px;">
        <div>
          <h4 style="margin-bottom: 1rem;">Labels à l'extérieur (défaut)</h4>
          <BaseSwitch 
            label="Mode sombre"
            leftLabel="Clair"
            rightLabel="Sombre"
            labelPosition="outside"
            :leftIcon="SunIcon"
            :rightIcon="MoonIcon"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem;">Labels à l'intérieur</h4>
          <BaseSwitch 
            label="Mode sombre"
            leftLabel="Clair"
            rightLabel="Sombre"
            labelPosition="inside"
            :leftIcon="SunIcon"
            :rightIcon="MoonIcon"
          />
        </div>
      </div>
    `
  })
}