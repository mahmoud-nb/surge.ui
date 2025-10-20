import type { Meta, StoryObj } from '@storybook/vue3'
import TextareaField from '../TextareaField.vue'

const meta: Meta<typeof TextareaField> = {
  title: 'Molecules/TextareaField',
  component: TextareaField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant TextareaField flexible avec compteur de caractères, ajustement automatique de hauteur et conformité aux normes W3C d\'accessibilité.'
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
    },
    label: {
      control: 'text',
      description: 'Label du textarea field'
    },
    message: {
      control: 'text',
      description: 'Message affiché'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Description',
    placeholder: 'Entrez votre description...',
    message: 'Décrivez votre projet en quelques phrases'
  }
}

export const WithValue: Story = {
  args: {
    label: 'Commentaire',
    modelValue: 'Ceci est un commentaire pré-rempli dans le textarea.',
    placeholder: 'Votre commentaire...'
  }
}

export const WithCounter: Story = {
  args: {
    label: 'Commentaire',
    placeholder: 'Votre commentaire...',
    maxLength: 200,
    showCounter: true,
    message: 'Partagez votre avis sur ce produit'
  }
}

export const AutoResize: Story = {
  args: {
    label: 'Message',
    placeholder: 'Tapez votre message...',
    autoResize: true,
    minRows: 2,
    maxRows: 8,
    message: 'La hauteur s\'ajuste automatiquement au contenu'
  }
}

export const Tweet: Story = {
  args: {
    label: 'Tweet',
    placeholder: 'Que se passe-t-il ?',
    maxLength: 280,
    showCounter: true,
    autoResize: true,
    minRows: 2,
    maxRows: 6,
    message: 'Partagez vos pensées'
  }
}

export const States: Story = {
  render: () => ({
    components: { TextareaField },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; width: 400px;">
        <TextareaField
          label="État par défaut"
          placeholder="Entrez du texte"
          message="Texte d'aide pour guider l'utilisateur"
        />
        <TextareaField
          state="error"
          label="État d'erreur"
          placeholder="Entrez du texte"
          message="Ce champ contient une erreur"
          modelValue="Texte avec erreur"
        />
        <TextareaField
          state="success"
          label="État de succès"
          placeholder="Entrez du texte"
          message="Contenu valide !"
          modelValue="Texte validé avec succès"
        />
        <TextareaField
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
    components: { TextareaField },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; width: 400px;">
        <TextareaField
          size="sm"
          label="Small"
          placeholder="Petit textarea"
          :rows="2"
        />
        <TextareaField
          size="md"
          label="Medium"
          placeholder="Textarea moyen"
          :rows="3"
        />
        <TextareaField
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
    label: 'Textarea field désactivé',
    disabled: true,
    modelValue: 'Ce contenu est désactivé',
    message: 'Ce champ est temporairement indisponible'
  }
}

export const Readonly: Story = {
  args: {
    label: 'Textarea field en lecture seule',
    readonly: true,
    modelValue: 'Ce contenu ne peut pas être modifié',
    message: 'Consultation uniquement'
  }
}

export const Required: Story = {
  args: {
    label: 'Champ requis',
    required: true,
    placeholder: 'Ce champ est obligatoire',
    message: 'Veuillez remplir ce champ'
  }
}

export const ContactForm: Story = {
  render: () => ({
    components: { TextareaField },
    template: `
      <form style="width: 360px; max-width: 100%; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem;">
        <h2>Nous contacter</h2>
        
        <TextareaField 
          label="Message"
          :required="true"
          :maxLength="2000"
          :showCounter="true"
          :autoResize="true"
          :minRows="4"
          :maxRows="12"
          placeholder="Décrivez votre demande..."
          message="Décrivez votre demande en détail"
        />
        
        <button 
          type="submit" 
          style="padding: 0.75rem 1.5rem; background-color: #3b82f6; color: white; border: none; border-radius: 0.5rem; font-weight: 500; cursor: pointer;"
        >
          Envoyer le message
        </button>
      </form>
    `
  })
}

export const Editor: Story = {
  render: () => ({
    components: { TextareaField },
    template: `
      <div style="max-width: 800px; margin: 0 auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; gap:24px; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #e5e7eb;">
          <h3>Éditeur de texte</h3>
          <div style="display: flex; gap: 1rem; font-size: 0.875rem; color: #6b7280;">
            <span>0 mots</span>
            <span>0 caractères</span>
            <span>~0 min de lecture</span>
          </div>
        </div>

        <TextareaField
          label="Contenu"
          :autoResize="true"
          :minRows="8"
          :maxRows="20"
          :maxLength="5000"
          :showCounter="true"
          placeholder="Commencez à écrire votre article..."
          message="Rédigez votre contenu. L'éditeur s'adapte automatiquement."
          :spellcheck="true"
        />
      </div>
    `
  })
}