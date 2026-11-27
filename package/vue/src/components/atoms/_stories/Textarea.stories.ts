import type { Meta, StoryObj } from '@storybook/vue3'
import Textarea from '../Textarea.vue'

const meta: Meta<typeof Textarea> = {
  title: 'Atoms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant Textarea flexible avec compteur de caractères, ajustement automatique de hauteur et conformité aux normes W3C d\'accessibilité.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Taille du textarea'
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'warning'],
      description: 'État visuel du textarea'
    },
    disabled: {
      control: 'boolean',
      description: 'Désactive le textarea field'
    },
    readonly: {
      control: 'boolean',
      description: 'Textarea field en lecture seule'
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
      description: 'Valeur du textarea'
    },
    rows: {
      control: 'number',
      description: 'Nombre de lignes par défaut'
    },
    minRows: {
      control: 'number',
      description: 'Nombre minimum de lignes (auto-resize)'
    },
    maxRows: {
      control: 'number',
      description: 'Nombre maximum de lignes (auto-resize)'
    },
    maxLength: {
      control: 'number',
      description: 'Nombre maximum de caractères'
    },
    showCounter: {
      control: 'boolean',
      description: 'Afficher le compteur de caractères'
    },
    autoResize: {
      control: 'boolean',
      description: 'Ajustement automatique de la hauteur'
    },
    spellcheck: {
      control: 'boolean',
      description: 'Vérification orthographique activée'
    },
    wrap: {
      control: 'select',
      options: ['soft', 'hard', 'off'],
      description: 'Type de retour à la ligne'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Entrez votre description...'
  }
}

export const WithValue: Story = {
  args: {
    modelValue: 'Ceci est un commentaire pré-rempli dans le textarea.'
  }
}

export const WithCounter: Story = {
  args: {
    placeholder: 'Votre commentaire...',
    maxLength: 200,
    showCounter: true
  }
}

export const AutoResize: Story = {
  args: {
    placeholder: 'Tapez votre message...',
    autoResize: true,
    minRows: 2,
    maxRows: 8
  }
}

export const States: Story = {
  render: () => ({
    components: { Textarea },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; width: 400px;">
        <Textarea
          label="État par défaut"
          placeholder="Entrez du texte"
          message="Texte d'aide pour guider l'utilisateur"
        />
        <Textarea
          state="error"
          label="État d'erreur"
          placeholder="Entrez du texte"
          message="Ce champ contient une erreur"
          modelValue="Texte avec erreur"
        />
        <Textarea
          state="success"
          label="État de succès"
          placeholder="Entrez du texte"
          message="Contenu valide !"
          modelValue="Texte validé avec succès"
        />
        <Textarea
          state="warning"
          label="État d'avertissement"
          placeholder="Entrez du texte"
          message="Attention au contenu"
          modelValue="Texte nécessitant attention"
        />
      </div>
    `
  })
}

export const Sizes: Story = {
  render: () => ({
    components: { Textarea },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; width: 400px;">
        <Textarea
          size="sm"
          label="Small"
          placeholder="Petit textarea"
          :rows="2"
        />
        <Textarea
          size="md"
          label="Medium"
          placeholder="Textarea moyen"
          :rows="3"
        />
        <Textarea
          size="lg"
          label="Large"
          placeholder="Grand textarea"
          :rows="4"
        />
      </div>
    `
  })
}

export const Disabled: Story = {
  args: {
    disabled: true,
    modelValue: 'Ce contenu est désactivé'
  }
}

export const Readonly: Story = {
  args: {
    readonly: true,
    modelValue: 'Ce contenu ne peut pas être modifié'
  }
}