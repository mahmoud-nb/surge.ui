import type { Meta, StoryObj } from '@storybook/vue3'
import { StarIcon, BuildingOfficeIcon, GlobeAltIcon } from '@heroicons/vue/24/outline'
import SelectBox from '../SelectBox.vue'
import { ref } from 'vue'

const meta: Meta<typeof SelectBox> = {
  title: 'Atoms/SelectBox',
  component: SelectBox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant SelectBox personnalisé avec support de la sélection multiple, recherche intégrée, groupes d\'options et accessibilité complète selon les normes W3C.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: 'Liste des options disponibles'
    },
    groups: {
      control: 'object',
      description: 'Options organisées en groupes'
    },
    modelValue: {
      control: 'text',
      description: 'Valeur sélectionnée'
    },
    multiple: {
      control: 'boolean',
      description: 'Sélection multiple'
    },
    searchable: {
      control: 'boolean',
      description: 'Recherche intégrée'
    },
    clearable: {
      control: 'boolean',
      description: 'Bouton d\'effacement'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Taille du SelectBox'
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'warning'],
      description: 'État visuel'
    },
    disabled: {
      control: 'boolean',
      description: 'Désactive le SelectBox'
    },
    readonly: {
      control: 'boolean',
      description: 'SelectBox en lecture seule'
    },
    required: {
      control: 'boolean',
      description: 'Champ requis'
    },
    placeholder: {
      control: 'text',
      description: 'Texte de placeholder'
    },
    label: {
      control: 'text',
      description: 'Label du SelectBox'
    },
    message: {
      control: 'text',
      description: 'Message affiché'
    },
    'onUpdate:value': { action: 'update:value' }
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

const technologies = [
  { value: 'js', label: 'JavaScript' },
  { value: 'ts', label: 'TypeScript' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular' }
]

const countries = [
  { value: 'fr', label: 'France' },
  { value: 'us', label: 'États-Unis' },
  { value: 'de', label: 'Allemagne' },
  { value: 'es', label: 'Espagne' },
  { value: 'it', label: 'Italie' },
  { value: 'uk', label: 'Royaume-Uni' },
  { value: 'ca', label: 'Canada' },
  { value: 'jp', label: 'Japon' }
]

const plans = [
  { 
    value: 'basic', 
    label: 'Plan Basic', 
    description: 'Fonctionnalités de base pour débuter',
    icon: StarIcon
  },
  { 
    value: 'pro', 
    label: 'Plan Pro', 
    description: 'Fonctionnalités avancées pour les professionnels',
    icon: BuildingOfficeIcon
  },
  { 
    value: 'enterprise', 
    label: 'Plan Enterprise', 
    description: 'Solution complète pour les grandes entreprises',
    icon: GlobeAltIcon
  }
]

const groupedOptions = [
  {
    label: 'Fruits',
    options: [
      { value: 'apple', label: 'Pomme' },
      { value: 'banana', label: 'Banane' },
      { value: 'orange', label: 'Orange' }
    ]
  },
  {
    label: 'Légumes',
    options: [
      { value: 'carrot', label: 'Carotte' },
      { value: 'broccoli', label: 'Brocoli' },
      { value: 'spinach', label: 'Épinard' }
    ]
  }
]

const createInteractiveStory = (args: any): Story => ({
  render: (args) => ({
    components: { SelectBox },
    setup() {
      const modelValue = ref(args.modelValue);
      return { args, modelValue };
    },
    // On utilise v-model pour lier la ref locale au composant
    template: `<div style="width: 300px; min-height: 250px;">
      <SelectBox v-bind="args" v-model="modelValue" @change="args[\'onUpdate:modelValue\']" />
    </div>`,
  }),
  args,
});

export const Default = createInteractiveStory({
  options: basicOptions,
  label: 'Sélection simple',
  placeholder: 'Choisissez une option...'
})

export const WithValue: Story = createInteractiveStory({
  options: basicOptions,
  label: 'Avec valeur pré-sélectionnée',
  placeholder: 'Choisissez une option...',
  modelValue: 'option2'
})

export const Multiple: Story = createInteractiveStory({
  options: technologies,
  multiple: true,
  clearable: true,
  label: 'Technologies',
  placeholder: 'Sélectionnez vos technologies...',
  message: 'Vous pouvez sélectionner plusieurs options'
})

export const Searchable: Story = createInteractiveStory({
  options: countries,
  searchable: true,
  clearable: true,
  label: 'Pays',
  placeholder: 'Rechercher un pays...',
  searchPlaceholder: 'Tapez pour rechercher...'
})

export const WithIcons: Story = createInteractiveStory({
  options: plans,
  searchable: true,
  label: 'Plan d\'abonnement',
  placeholder: 'Choisissez votre plan...'
})

export const Grouped: Story = createInteractiveStory({
  groups: groupedOptions,
  searchable: true,
  multiple: true,
  label: 'Produits alimentaires',
  placeholder: 'Sélectionnez des produits...'
})

export const States: Story = {
  render: (args) => ({
    components: { SelectBox },
    setup() {
      const value = ref(args.value)
      return { basicOptions, value }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; width: 300px;">
        <SelectBox 
          :options="basicOptions"
          label="État par défaut"
          placeholder="Sélectionnez une option"
          message="Texte d'aide pour guider l'utilisateur"
          v-model:value="value"
        />
        <SelectBox 
          :options="basicOptions"
          state="error"
          label="État d'erreur"
          placeholder="Sélectionnez une option"
          message="Cette sélection contient une erreur"
        />
        <SelectBox 
          :options="basicOptions"
          state="success"
          label="État de succès"
          placeholder="Sélectionnez une option"
          message="Sélection valide !"
          value="option1"
        />
      </div>
    `
  })
}

export const Sizes: Story = {
  render: () => ({
    components: { SelectBox },
    setup() {
      return { basicOptions }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; width: 300px;">
        <SelectBox size="sm" :options="basicOptions" label="Small" placeholder="Petit SelectBox" />
        <SelectBox size="md" :options="basicOptions" label="Medium" placeholder="SelectBox moyen" />
        <SelectBox size="lg" :options="basicOptions" label="Large" placeholder="Grand SelectBox" />
      </div>
    `
  })
}

export const Loading: Story = {
  args: {
    options: [],
    loading: true,
    label: 'Chargement des données',
    placeholder: 'Chargement...'
  }
}

export const Disabled: Story = {
  args: {
    options: basicOptions,
    disabled: true,
    label: 'SelectBox désactivé',
    modelValue: 'option1'
  }
}

export const Readonly: Story = {
  args: {
    options: basicOptions,
    readonly: true,
    label: 'SelectBox en lecture seule',
    modelValue: 'option2'
  }
}

export const Required: Story = {
  render: (args) => ({
    components: { SelectBox },
    setup() {
      const modelValue = ref(args.modelValue)
      const options = [
        { value: undefined, label: 'Option with undefined value' },
        ...basicOptions
      ]
      return { modelValue, options }
    },
    template: `
      <div style="width: 300px;">
        <SelectBox 
          label="Champ requis"
          required
          placeholder="Sélection obligatoire" 
          :options="options" 
          :state="modelValue ? 'default' : 'error'" 
          :message="modelValue ? 'Sélection valide !' : 'Ce champ est requis'"
          v-model="modelValue"
        />
      </div>
    `
  })
}

export const MaxSelectedItems: Story = createInteractiveStory({
  options: technologies,
  multiple: true,
  maxSelectedItems: 3,
  label: 'Technologies (max 3)',
  placeholder: 'Sélectionnez jusqu\'à 3 technologies...',
  message: 'Maximum 3 sélections autorisées'
})

export const RTL: Story = createInteractiveStory({
  options: [
    { value: 'ar', label: 'العربية' },
    { value: 'he', label: 'עברית' },
    { value: 'fa', label: 'فارسی' }
  ],
  dir: 'rtl',
  label: 'اللغة (RTL)',
  placeholder: 'اختر لغة...'
})