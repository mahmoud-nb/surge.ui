import type { Meta, StoryObj } from '@storybook/vue3'
import { ref, watch } from 'vue'
import { MapPinIcon } from '@heroicons/vue/24/outline'
import Autocomplete from '../Autocomplete.vue'
import FormField from '../../atoms/FormField.vue'

const cities = ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Montpellier', 'Strasbourg', 'Bordeaux', 'Lille', 'Rennes', 'Reims', 'Saint-Étienne', 'Le Havre', 'Grenoble', 'Dijon', 'Angers', 'Nîmes', 'Évreux']

const meta: Meta<typeof Autocomplete> = {
  title: 'Molecules/Autocomplete',
  component: Autocomplete,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Champ texte à saisie libre avec suggestions (`role="combobox"`, `aria-autocomplete="list"`). Filtre local sans accents ni casse, ou suggestions serveur (`filter: false` + `loading`). Flèches pour parcourir, Entrée pour choisir, Échap pour fermer puis effacer. Pour une liste fermée, voir SelectBox.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text', description: 'Texte saisi (v-model)' },
    options: { control: 'object', description: 'Suggestions : textes ou { label, value, description, icon, disabled }' },
    filter: { control: 'boolean', description: 'Filtre local (false : suggestions déjà filtrées)' },
    minChars: { control: { type: 'number', min: 0 }, description: 'Caractères avant ouverture' },
    openOnFocus: { control: 'boolean', description: 'Ouvre la liste au focus' },
    loading: { control: 'boolean', description: 'Recherche en cours' },
    clearable: { control: 'boolean', description: 'Bouton et Échap pour effacer' },
    placeholder: { control: 'text', description: 'Texte indicatif' },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'], description: 'Taille' },
    state: { control: { type: 'select' }, options: ['default', 'error', 'success', 'warning'], description: 'État de validation' },
    disabled: { control: 'boolean', description: 'Désactive le champ' },
    maxHeight: { control: 'text', description: 'Hauteur maximale de la liste' },
    ariaLabel: { control: 'text', description: 'Nom accessible (sans label)' }
  },
  args: { options: cities, placeholder: 'Ville…', clearable: true, ariaLabel: 'Ville' },
  decorators: [() => ({ template: '<div style="width: 18rem; min-height: 20rem;"><story /></div>' })]
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Autocomplete },
    setup() {
      const city = ref('')
      const selected = ref('')
      return { args, city, selected }
    },
    template: `
      <Autocomplete v-bind="args" v-model="city" @select="selected = $event.label" />
      <p style="margin: 0.5rem 0 0; font-size: 12px; color: var(--su-text-tertiary);">Saisie : « {{ city }} » · choisie : {{ selected || '—' }}</p>
    `
  })
}

export const RichOptions: Story = {
  name: 'Suggestions détaillées',
  args: {
    options: [
      { label: 'Paris', value: 75, description: 'Île-de-France', icon: MapPinIcon },
      { label: 'Lyon', value: 69, description: 'Auvergne-Rhône-Alpes', icon: MapPinIcon },
      { label: 'Marseille', value: 13, description: 'Provence-Alpes-Côte d’Azur', icon: MapPinIcon },
      { label: 'Lille', value: 59, description: 'Hauts-de-France (indisponible)', icon: MapPinIcon, disabled: true }
    ],
    openOnFocus: true
  },
  render: Default.render
}

export const Async: Story = {
  name: 'Suggestions serveur',
  render: () => ({
    components: { Autocomplete, FormField },
    setup() {
      const query = ref('')
      const results = ref<string[]>([])
      const loading = ref(false)
      let timer: ReturnType<typeof setTimeout> | undefined
      watch(query, (text) => {
        clearTimeout(timer)
        if (text.trim().length < 2) {
          results.value = []
          loading.value = false
          return
        }
        loading.value = true
        timer = setTimeout(() => {
          results.value = cities.filter((city) => city.toLowerCase().startsWith(text.trim().toLowerCase()))
          loading.value = false
        }, 700)
      })
      return { query, results, loading }
    },
    template: `
      <FormField label="Ville de départ" message="Au moins 2 caractères">
        <Autocomplete v-model="query" :options="results" :filter="false" :loading="loading" :min-chars="2" clearable />
      </FormField>
    `
  })
}
