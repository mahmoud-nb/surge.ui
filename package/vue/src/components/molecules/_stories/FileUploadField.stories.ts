import type { Meta, StoryObj } from '@storybook/vue3'
import FileUploadField from '../FileUploadField.vue'

const meta: Meta<typeof FileUploadField> = {
  title: 'Molecules/FileUploadField',
  component: FileUploadField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant FileUploadField pour le téléchargement de fichiers avec support du drag & drop, validation des formats et tailles, et accessibilité complète selon les normes W3C.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'object',
      description: 'Liste des fichiers téléchargés'
    },
    multiple: {
      control: 'boolean',
      description: 'Autoriser la sélection multiple'
    },
    accept: {
      control: 'text',
      description: 'Types de fichiers acceptés'
    },
    maxSize: {
      control: 'number',
      description: 'Taille maximale par fichier en octets'
    },
    maxFiles: {
      control: 'number',
      description: 'Nombre maximum de fichiers'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Taille du composant'
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'warning'],
      description: 'État visuel'
    },
    disabled: {
      control: 'boolean',
      description: 'Désactive le composant'
    },
    readonly: {
      control: 'boolean',
      description: 'Mode lecture seule'
    },
    required: {
      control: 'boolean',
      description: 'Champ requis'
    },
    label: {
      control: 'text',
      description: 'Label du composant'
    },
    message: {
      control: 'text',
      description: 'Message affiché'
    },
    placeholder: {
      control: 'text',
      description: 'Texte affiché dans la zone de drop'
    },
    allowPreview: {
      control: 'boolean',
      description: 'Afficher les aperçus d\'images'
    },
    showFileList: {
      control: 'boolean',
      description: 'Afficher la liste des fichiers'
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'dashed', 'solid', 'minimal'],
      description: 'Variante visuelle'
    },
    loading: {
      control: 'boolean',
      description: 'État de chargement'
    },
    showProgress: {
      control: 'boolean',
      description: 'Afficher la barre de progression'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Documents',
    placeholder: 'Sélectionnez vos documents ou glissez-les ici',
    message: 'Formats acceptés : PDF, DOC, DOCX'
  }
}

export const Multiple: Story = {
  args: {
    multiple: true,
    maxFiles: 3,
    maxSize: 5 * 1024 * 1024, // 5MB
    accept: 'image/*',
    label: 'Images',
    placeholder: 'Sélectionnez jusqu\'à 3 images (max 5MB chacune)',
    message: 'Glissez-déposez vos images ou cliquez pour parcourir'
  }
}

export const ImagesOnly: Story = {
  args: {
    accept: 'image/jpeg,image/png,image/gif',
    label: 'Images uniquement',
    placeholder: 'JPG, PNG, GIF seulement',
    message: 'Formats acceptés : JPEG, PNG, GIF',
    allowPreview: true
  }
}

export const Documents: Story = {
  args: {
    accept: '.pdf,.doc,.docx',
    label: 'Documents',
    placeholder: 'PDF et documents Word',
    message: 'Formats acceptés : PDF, DOC, DOCX'
  }
}

export const Videos: Story = {
  args: {
    accept: 'video/*',
    maxSize: 50 * 1024 * 1024, // 50MB
    label: 'Vidéos',
    placeholder: 'Tous formats vidéo (max 50MB)',
    message: 'Tous les formats vidéo sont acceptés'
  }
}

export const States: Story = {
  render: () => ({
    components: { FileUploadField },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; width: 400px;">
        <FileUploadField 
          label="État par défaut"
          placeholder="Sélectionnez des fichiers"
          message="Glissez-déposez ou cliquez pour parcourir"
        />
        <FileUploadField 
          state="error"
          label="État d'erreur"
          placeholder="Fichiers non valides"
          message="Erreur : format de fichier non supporté"
        />
        <FileUploadField 
          state="success"
          label="État de succès"
          placeholder="Fichiers téléchargés"
          message="Tous les fichiers ont été téléchargés avec succès"
        />
        <FileUploadField 
          state="warning"
          label="État d'avertissement"
          placeholder="Attention aux fichiers"
          message="Certains fichiers dépassent la taille recommandée"
        />
      </div>
    `
  })
}

export const Sizes: Story = {
  render: () => ({
    components: { FileUploadField },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; width: 400px;">
        <FileUploadField 
          size="sm"
          label="Small"
          placeholder="Petit upload"
        />
        <FileUploadField 
          size="md"
          label="Medium"
          placeholder="Upload moyen"
        />
        <FileUploadField 
          size="lg"
          label="Large"
          placeholder="Grand upload"
        />
      </div>
    `
  })
}

export const Disabled: Story = {
  args: {
    label: 'Upload désactivé',
    disabled: true,
    placeholder: 'Upload non disponible',
    message: 'Cette fonctionnalité est temporairement désactivée'
  }
}

export const Readonly: Story = {
  args: {
    label: 'Upload en lecture seule',
    readonly: true,
    placeholder: 'Consultation uniquement',
    message: 'Vous pouvez voir les fichiers mais pas en ajouter'
  }
}

export const Required: Story = {
  args: {
    label: 'Upload requis',
    required: true,
    placeholder: 'Fichiers obligatoires',
    message: 'Au moins un fichier doit être téléchargé'
  }
}

export const Variants: Story = {
  render: () => ({
    components: { FileUploadField },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; width: 400px;">
        <div>
          <h4 style="margin-bottom: 0.5rem;">Default</h4>
          <FileUploadField 
            variant="default"
            label="Upload default"
            placeholder="Style par défaut"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Dashed</h4>
          <FileUploadField 
            variant="dashed"
            label="Upload dashed"
            placeholder="Style avec bordures pointillées"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Solid</h4>
          <FileUploadField 
            variant="solid"
            label="Upload solid"
            placeholder="Style avec bordures pleines"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Minimal</h4>
          <FileUploadField 
            variant="minimal"
            label="Upload minimal"
            placeholder="Style minimaliste"
          />
        </div>
      </div>
    `
  })
}

export const WithProgress: Story = {
  render: () => ({
    components: { FileUploadField },
    template: `
      <div style="width: 400px;">
        <FileUploadField 
          label="Upload avec progression"
          placeholder="Téléchargez vos fichiers"
          message="La progression sera affichée pour chaque fichier"
          :multiple="true"
          :showProgress="true"
        />
      </div>
    `
  })
}

export const Loading: Story = {
  args: {
    label: 'Upload en chargement',
    placeholder: 'Chargement en cours...',
    loading: true,
    message: 'Préparation de l\'upload'
  }
}

export const ApplicationForm: Story = {
  render: () => ({
    components: { FileUploadField },
    template: `
      <form style="max-width: 500px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem;">
        <h2>Candidature</h2>
        
        <FileUploadField 
          label="CV (obligatoire)"
          accept=".pdf,.doc,.docx"
          :maxSize="5 * 1024 * 1024"
          :maxFiles="1"
          :required="true"
          placeholder="Téléchargez votre CV"
          message="Format PDF ou Word, maximum 5MB"
        />
        
        <FileUploadField 
          label="Lettre de motivation"
          accept=".pdf,.doc,.docx"
          :maxSize="5 * 1024 * 1024"
          :maxFiles="1"
          placeholder="Téléchargez votre lettre de motivation"
          message="Format PDF ou Word, maximum 5MB"
        />
        
        <FileUploadField 
          label="Portfolio (optionnel)"
          accept="image/*,.pdf"
          :maxSize="20 * 1024 * 1024"
          :maxFiles="10"
          :multiple="true"
          placeholder="Images de vos réalisations ou PDF"
          message="Images et PDF acceptés, maximum 10 fichiers de 20MB chacun"
        />
        
        <button 
          type="submit" 
          style="padding: 0.75rem 1.5rem; background-color: #3b82f6; color: white; border: none; border-radius: 0.5rem; font-weight: 500; cursor: pointer;"
        >
          Envoyer la candidature
        </button>
      </form>
    `
  })
}

export const WithoutFileList: Story = {
  args: {
    label: 'Upload simple',
    placeholder: 'Sélectionnez un fichier',
    showFileList: false,
    message: 'La liste des fichiers est masquée'
  }
}

export const WithoutPreview: Story = {
  args: {
    accept: 'image/*',
    label: 'Images sans aperçu',
    placeholder: 'Sélectionnez des images',
    allowPreview: false,
    message: 'Les aperçus d\'images sont désactivés'
  }
}