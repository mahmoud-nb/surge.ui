import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import { StarIcon, BuildingOfficeIcon, GlobeAltIcon } from '@heroicons/vue/24/outline'
import CheckboxGroup from '../CheckboxGroup.vue'

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Atoms/CheckboxGroup',
  component: CheckboxGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant CheckboxGroup pour la sélection multiple avec deux styles d\'affichage : classique ou en cartes. Support complet de l\'accessibilité selon les normes W3C.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: 'Liste des options checkbox'
    },
    value: {
      control: 'object',
      description: 'Valeurs sélectionnées'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Taille des éléments'
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'warning'],
      description: 'État visuel'
    },
    disabled: {
      control: 'boolean',
      description: 'Désactive tout le groupe'
    },
    required: {
      control: 'boolean',
      description: 'Au moins une sélection requise'
    },
    displayType: {
      control: { type: 'select' },
      options: ['default', 'inline-card', 'block-card'],
      description: 'Type d\'affichage'
    },
    direction: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Direction du groupe'
    },
    maxSelections: {
      control: 'number',
      description: 'Nombre maximum de sélections'
    },
    maxHeight: {
      control: 'text',
      description: 'Hauteur maximale avec scroll automatique'
    },
    'onUpdate:value': { action: 'update:value' },
  }
}

export default meta
type Story = StoryObj<typeof meta>

const basicOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4', disabled: true }
]

const techOptions = [
  { value: 'js', label: 'JavaScript', description: 'Langage de programmation web' },
  { value: 'ts', label: 'TypeScript', description: 'JavaScript avec typage statique' },
  { value: 'vue', label: 'Vue.js', description: 'Framework JavaScript progressif' },
  { value: 'react', label: 'React', description: 'Bibliothèque JavaScript pour les interfaces' }
]

const permissionOptions = [
  { value: 'read', label: 'Lecture', icon: StarIcon },
  { value: 'write', label: 'Écriture', icon: BuildingOfficeIcon },
  { value: 'admin', label: 'Administration', icon: GlobeAltIcon }
]

const longSkillsList = [
  { value: 'skill1', label: 'JavaScript' },
  { value: 'skill2', label: 'TypeScript' },
  { value: 'skill3', label: 'Vue.js' },
  { value: 'skill4', label: 'React' },
  { value: 'skill5', label: 'Angular' },
  { value: 'skill6', label: 'Node.js' },
  { value: 'skill7', label: 'Python' },
  { value: 'skill8', label: 'Java' },
  { value: 'skill9', label: 'C#' },
  { value: 'skill10', label: 'PHP' },
  { value: 'skill11', label: 'Ruby' },
  { value: 'skill12', label: 'Go' },
  { value: 'skill13', label: 'Rust' },
  { value: 'skill14', label: 'Swift' },
  { value: 'skill15', label: 'Kotlin' }
]

/**
 * Fonction helper pour créer une story interactive qui gère son propre état avec v-model.
 * @param {object} args - Les arguments de base de la story.
 * @returns {Story} - L'objet Story configuré avec une fonction render.
 */
const createInteractiveStory = (args: any): Story => ({
  render: (renderArgs) => ({
    components: { CheckboxGroup },
    setup() {
      // On crée une ref locale pour stocker la valeur, initialisée avec la valeur des args
      const modelValue = ref(renderArgs.modelValue);
      return { args: renderArgs, modelValue };
    },
    // On utilise v-model pour lier la ref locale au composant
    template: '<CheckboxGroup v-bind="args" v-model="modelValue" @change="args[\'onUpdate:value\']" />',
  }),
  args,
});

export const Default = createInteractiveStory({
  options: basicOptions,
  modelValue: []
})

export const WithValue = createInteractiveStory({
  options: basicOptions,
  modelValue: ['option1', 'option3']
})

export const BlockCard = createInteractiveStory({
  options: techOptions,
  displayType: 'block-card',
  modelValue: ['vue']
})

export const InlineCard = createInteractiveStory({
  options: [
    { value: 'email', label: 'Email', description: 'Notifications par email' },
    { value: 'sms', label: 'SMS', description: 'Notifications par SMS' },
    { value: 'push', label: 'Push', description: 'Notifications push' }
  ],
  displayType: 'inline-card',
  direction: 'horizontal',
  modelValue: ['email', 'push']
})

export const WithIcons: Story = {
  render: (args) => ({
    components: { CheckboxGroup },
    setup() {
      const modelValue = ref(args.modelValue);
      return { args, permissionOptions, modelValue }
    },
    template: '<CheckboxGroup v-bind="args" :options="permissionOptions" v-model="modelValue" @change="args[\'onUpdate:value\']" />'
  }),
  args: {
    options: permissionOptions, // Nécessaire pour que les controls Storybook fonctionnent
    displayType: 'block-card',
    modelValue: ['read']
  },
}

export const MaxSelections = createInteractiveStory({
  options: [
    { value: 'skill1', label: 'JavaScript' },
    { value: 'skill2', label: 'Python' },
    { value: 'skill3', label: 'Java' },
    { value: 'skill4', label: 'C#' },
    { value: 'skill5', label: 'PHP' }
  ],
  maxSelections: 2,
  label: 'Compétences principales (2 max)',
  message: 'Sélectionnez maximum 2 compétences',
  modelValue: ['skill1']
})

export const ScrollableList = createInteractiveStory({
  options: longSkillsList,
  maxHeight: '150px',
  modelValue: ['skill3', 'skill7']
})

export const Horizontal = createInteractiveStory({
  options: [
    { value: 'monday', label: 'Lundi' },
    { value: 'tuesday', label: 'Mardi' },
    { value: 'wednesday', label: 'Mercredi' },
    { value: 'thursday', label: 'Jeudi' },
    { value: 'friday', label: 'Vendredi' }
  ],
  direction: 'horizontal',
  modelValue: ['monday', 'tuesday', 'friday']
})

export const States: Story = {
  render: () => ({
    components: { CheckboxGroup },
    setup() {
      return { basicOptions }
    },
    template: `
      <div style="display: flex; flex-direction: row; gap: 4rem; width: 500px;">
        <CheckboxGroup 
          :options="basicOptions"
          label="État par défaut"
          message="Sélectionnez vos options"
        />
        <CheckboxGroup 
          :options="basicOptions"
          state="error"
          label="État d'erreur"
          message="Veuillez sélectionner au moins une option"
          :required="true"
        />
        <CheckboxGroup 
          :options="basicOptions"
          state="success"
          label="État de succès"
          message="Sélection valide !"
          :modelValue="['option1']"
        />
      </div>
    `
  })
}

export const Sizes: Story = {
  render: () => ({
    components: { CheckboxGroup },
    setup() {
      return { basicOptions }
    },
    template: `
      <div style="display: flex; flex-direction: row; gap: 4rem; width: 500px;">
        <CheckboxGroup size="sm" :options="basicOptions" label="Small" />
        <CheckboxGroup size="md" :options="basicOptions" label="Medium" />
        <CheckboxGroup size="lg" :options="basicOptions" label="Large" />
      </div>
    `
  })
}

export const Disabled: Story = {
  args: {
    options: basicOptions,
    disabled: true,
    label: 'Groupe désactivé',
    modelValue: ['option1']
  }
}

export const Required = createInteractiveStory({
  options: [
    { value: 'terms', label: 'J\'accepte les conditions d\'utilisation' },
    { value: 'privacy', label: 'J\'accepte la politique de confidentialité' }
  ],
  required: true,
  label: 'Acceptation',
  message: 'Veuillez accepter les conditions',
  modelValue: []
})

export const WithSlots: Story = {
  render: () => ({
    components: { CheckboxGroup },
    setup() {
      const features = [
        { value: 'notifications', label: 'Notifications push' },
        { value: 'analytics', label: 'Analytics avancées' },
        { value: 'api', label: 'Accès API' },
        { value: 'support', label: 'Support prioritaire' }
      ]
      const modelValue = ref([])
      
      const selectAll = () => {
        modelValue.value = features.map(f => f.value)
      }
      
      const selectNone = () => {
        modelValue.value = []
      }
      
      return { features, modelValue, selectAll, selectNone }
    },
    template: `
      <div style="width: 400px;">
        <CheckboxGroup 
          :options="features"
          label="Fonctionnalités"
          v-model="modelValue"
        >
          <template #before>
            <div style="padding: 0.75rem; background-color: #f3f4f6; border-radius: 0.375rem; margin-bottom: 0.75rem;">
              <p style="margin: 0; font-size: 0.875rem; color: #6b7280;">
                💡 Sélectionnez les fonctionnalités que vous souhaitez activer pour votre compte.
              </p>
            </div>
          </template>
          <template #after>
            <div style="display: flex; gap: 0.5rem; margin-top: 0.75rem;">
              <button 
                @click="selectAll"
                type="button" 
                style="padding: 0.25rem 0.5rem; font-size: 0.75rem; background: #e5e7eb; border: none; border-radius: 0.25rem; cursor: pointer;"
              >
                Tout sélectionner
              </button>
              <button 
                @click="selectNone"
                type="button" 
                style="padding: 0.25rem 0.5rem; font-size: 0.75rem; background: #e5e7eb; border: none; border-radius: 0.25rem; cursor: pointer;"
              >
                Tout désélectionner
              </button>
            </div>
          </template>
        </CheckboxGroup>
      </div>
    `
  })
}