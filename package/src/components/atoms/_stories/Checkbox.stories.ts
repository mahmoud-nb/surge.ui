import type { Meta, StoryObj } from '@storybook/vue3'
import { computed, ref } from 'vue'
import Checkbox from '../Checkbox.vue'
import FormField from '../FormField.vue'

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Case à cocher seule, sur un input natif. Libellé et description optionnels, état mixte (`v-model:indeterminate`) pour une case « tout sélectionner », affichage en carte. Se relie seule à un `SuFormField` parent.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'boolean', description: 'Case cochée (v-model)' },
    indeterminate: { control: 'boolean', description: 'État mixte (v-model:indeterminate), levé au premier clic' },
    label: { control: 'text', description: 'Libellé (ou slot par défaut)' },
    description: { control: 'text', description: 'Texte d’aide relié par aria-describedby (ou slot `description`)' },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'], description: 'Taille' },
    state: { control: { type: 'select' }, options: ['default', 'error', 'success', 'warning'], description: 'État de validation' },
    displayType: { control: { type: 'select' }, options: ['default', 'inline-card', 'block-card'], description: 'Affichage simple ou en carte' },
    disabled: { control: 'boolean', description: 'Désactive la case' },
    required: { control: 'boolean', description: 'Case obligatoire' },
    name: { control: 'text', description: 'Nom envoyé avec le formulaire' },
    value: { control: 'text', description: 'Valeur envoyée quand la case est cochée' },
    ariaLabel: { control: 'text', description: 'Nom accessible d’une case sans libellé' }
  },
  args: {
    label: 'Recevoir la newsletter',
    modelValue: false
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(args.modelValue)
      return { args, checked }
    },
    template: '<Checkbox v-bind="args" v-model="checked" />'
  })
}

export const WithDescription: Story = {
  args: {
    label: 'Notifications par e-mail',
    description: 'Un résumé hebdomadaire de l’activité de vos projets.'
  }
}

export const Sizes: Story = {
  render: () => ({
    components: { Checkbox },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Checkbox size="sm" label="Petite" :model-value="true" />
        <Checkbox size="md" label="Moyenne" :model-value="true" />
        <Checkbox size="lg" label="Grande" :model-value="true" />
      </div>
    `
  })
}

export const States: Story = {
  render: () => ({
    components: { Checkbox },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Checkbox label="Par défaut" />
        <Checkbox label="Erreur" state="error" />
        <Checkbox label="Désactivée" disabled />
        <Checkbox label="Désactivée cochée" disabled :model-value="true" />
      </div>
    `
  })
}

export const Cards: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const backup = ref(true)
      const support = ref(false)
      return { backup, support }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.5rem; width: 22rem;">
        <Checkbox v-model="backup" display-type="block-card" label="Sauvegarde quotidienne" description="Conservée 30 jours." />
        <Checkbox v-model="support" display-type="block-card" label="Support prioritaire" description="Réponse sous 4 heures ouvrées." />
      </div>
    `
  })
}

export const SelectAll: Story = {
  name: 'Tout sélectionner (indeterminate)',
  render: () => ({
    components: { Checkbox },
    setup() {
      const items = ref([
        { id: 'fr', label: 'Français', checked: true },
        { id: 'en', label: 'Anglais', checked: false },
        { id: 'de', label: 'Allemand', checked: false }
      ])
      const count = computed(() => items.value.filter((item) => item.checked).length)
      const all = computed({
        get: () => count.value === items.value.length,
        set: (value: boolean) => items.value.forEach((item) => (item.checked = value))
      })
      const partial = computed({
        get: () => count.value > 0 && count.value < items.value.length,
        set: () => {}
      })
      return { items, all, partial }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <Checkbox v-model="all" v-model:indeterminate="partial" label="Toutes les langues" />
        <div style="display: flex; flex-direction: column; gap: 0.5rem; padding-inline-start: 1.625rem;">
          <Checkbox v-for="item in items" :key="item.id" v-model="item.checked" :label="item.label" />
        </div>
      </div>
    `
  })
}

export const InFormField: Story = {
  render: () => ({
    components: { Checkbox, FormField },
    template: `
      <FormField label="Conditions" message="Vous devez accepter les conditions." state="error" required>
        <Checkbox label="J’accepte les conditions d’utilisation" />
      </FormField>
    `
  })
}
