import type { Meta, StoryObj } from '@storybook/vue3'
import { MagnifyingGlassIcon, AtSymbolIcon, LockClosedIcon, UserIcon } from '@heroicons/vue/24/outline'
import BaseInput from '../BaseInput.vue'

const meta: Meta<typeof BaseInput> = {
  title: 'Atoms/BaseInput',
  component: BaseInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant Input flexible avec support complet des types HTML, préfixes/suffixes, alignement de texte, direction RTL/LTR et accessibilité selon les normes W3C.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 'time'],
      description: 'Type d\'input HTML'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Taille de l\'input'
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'warning'],
      description: 'État visuel de l\'input'
    },
    disabled: {
      control: 'boolean',
      description: 'Désactive l\'input'
    },
    readonly: {
      control: 'boolean',
      description: 'Input en lecture seule'
    },
    required: {
      control: 'boolean',
      description: 'Champ requis'
    },
    placeholder: {
      control: 'text',
      description: 'Texte de placeholder'
    },
    value: {
      control: 'text',
      description: 'Valeur de l\'input'
    },
    prefix: {
      control: 'text',
      description: 'Préfixe texte'
    },
    suffix: {
      control: 'text',
      description: 'Suffixe texte'
    },
    textAlign: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      description: 'Alignement du texte'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Entrez du texte...'
  }
}

export const WithValue: Story = {
  args: {
    modelValue: 'Valeur pré-remplie',
    placeholder: 'Entrez du texte...'
  }
}

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'nom@exemple.com',
    prefixIcon: AtSymbolIcon
  }
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: '••••••••',
    prefixIcon: LockClosedIcon
  }
}

export const Search: Story = {
  args: {
    placeholder: 'Rechercher...',
    prefixIcon: MagnifyingGlassIcon
  }
}

export const WithPrefix: Story = {
  args: {
    placeholder: '0.00',
    suffix: '€',
    type: 'number'
  }
}

export const WithSuffix: Story = {
  args: {
    placeholder: 'monsite',
    prefix: 'https://',
    suffix: '.com'
  }
}

export const ClickablePrefix: Story = {
  args: {
    placeholder: 'Rechercher...',
    prefixIcon: MagnifyingGlassIcon
  },
  render: (args) => ({
    components: { BaseInput },
    setup() {
      const handlePrefixIconClick = () => {
        alert('Icône de recherche cliquée!')
      }
      return { args, MagnifyingGlassIcon, handlePrefixIconClick }
    },
    template: '<BaseInput v-bind="args" :prefixIcon="MagnifyingGlassIcon" @prefix-icon-click="handlePrefixIconClick" />'
  })
}

export const ClickableSuffix: Story = {
  args: {
    label: 'Montant',
    placeholder: '0.00',
    suffix: '€'
  },
  render: (args) => ({
    components: { BaseInput },
    setup() {
      const handleSuffixClick = () => {
        alert('Suffixe € cliqué!')
      }
      return { args, handleSuffixClick }
    },
    template: '<BaseInput v-bind="args" @suffix-click="handleSuffixClick" />'
  })
}
export const States: Story = {
  render: () => ({
    components: { BaseInput },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
        <BaseInput placeholder="État par défaut" />
        <BaseInput state="error" placeholder="État d'erreur" />
        <BaseInput state="success" placeholder="État de succès" />
        <BaseInput state="warning" placeholder="État d'avertissement" />
      </div>
    `
  })
}

export const Sizes: Story = {
  render: () => ({
    components: { BaseInput },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
        <BaseInput size="sm" placeholder="Petit input" />
        <BaseInput size="md" placeholder="Input moyen" />
        <BaseInput size="lg" placeholder="Grand input" />
      </div>
    `
  })
}

export const TextAlignment: Story = {
  render: () => ({
    components: { BaseInput },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
        <BaseInput placeholder="Alignement à gauche" textAlign="left" value="Aligné à gauche" />
        <BaseInput placeholder="Alignement centré" textAlign="center" value="Centré" />
        <BaseInput placeholder="Alignement à droite" textAlign="right" value="Aligné à droite" />
      </div>
    `
  })
}

export const Disabled: Story = {
  args: {
    label: 'Input désactivé',
    disabled: true,
    modelValue: 'Valeur désactivée'
  }
}

export const Readonly: Story = {
  args: {
    label: 'Input en lecture seule',
    readonly: true,
    modelValue: 'Valeur en lecture seule'
  }
}