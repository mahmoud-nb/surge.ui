import type { Meta, StoryObj } from '@storybook/vue3'
import Form from '../Form.vue'

const meta: Meta<typeof Form> = {
  title: 'Global/Form',
  component: Form,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Composant Form showcasing divers cas d\'utilisation des composants de formulaire comme Input, SelectBox, Password, Textarea, Switch, Slider, FileUpload, CheckboxGroup, RadioGroup avec exemples pratiques et un formulaire complet fonctionnel.'
      }
    }
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Affiche le composant Form complet avec tous les exemples de composants de formulaire
 */
export const Default: Story = {
  render: () => ({
    components: { Form },
    template: '<Form />'
  })
}

/**
 * Exemple avec focus sur les inputs simples
 */
export const InputExamples: Story = {
  render: () => ({
    components: { Form },
    template: `
      <div style="padding: 2rem;">
        <h2>Exemples d'Inputs</h2>
        <p>Explore différentes variantes, tailles et états des champs input.</p>
        <Form />
      </div>
    `
  })
}

/**
 * Exemple avec focus sur les contrôles avancés
 */
export const AdvancedControls: Story = {
  render: () => ({
    components: { Form },
    template: `
      <div style="padding: 2rem;">
        <h2>Contrôles Avancés</h2>
        <p>Découvrez les composants SelectBox, Switch, Slider et FileUpload pour créer des formulaires riches.</p>
        <Form />
      </div>
    `
  })
}

/**
 * Exemple d'un formulaire de contact complet
 */
export const ContactForm: Story = {
  render: () => ({
    components: { Form },
    template: `
      <div style="padding: 2rem;">
        <h2>Formulaire de Contact</h2>
        <p>Exemple d'un formulaire complet intégrant tous les types de champs disponibles.</p>
        <Form />
      </div>
    `
  })
}

/**
 * Démonstration des états de validation
 */
export const ValidationStates: Story = {
  render: () => ({
    components: { Form },
    template: `
      <div style="padding: 2rem;">
        <h2>États de Validation</h2>
        <p>Visualisez les différents états: normal, succès, erreur pour guider les utilisateurs.</p>
        <Form />
      </div>
    `
  })
}

/**
 * Tous les composants de champ disponibles avec tailles variées
 */
export const AllFieldTypes: Story = {
  render: () => ({
    components: { Form },
    template: `
      <div style="padding: 2rem;">
        <h2>Tous les Types de Champs</h2>
        <p>Référence complète de tous les composants de formulaire avec d'exemples d'utilisation.</p>
        <Form />
      </div>
    `
  })
}

/**
 * Exemple responsive avec différentes résolutions
 */
export const ResponsiveForm: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'iphone12'
    }
  },
  render: () => ({
    components: { Form },
    template: '<Form />'
  })
}

/**
 * Formulaire en lecture seule (affichage des données)
 */
export const ReadonlyForm: Story = {
  render: () => ({
    components: { Form },
    template: `
      <div style="padding: 2rem;">
        <h2>Formulaire en Lecture Seule</h2>
        <p>Exemple d'affichage des données utilisateur.</p>
        <Form />
      </div>
    `
  })
}
