import type { Meta, StoryObj } from '@storybook/vue3'
import FormFieldGroup from '../FormFieldGroup.vue'
import InputField from '../InputField.vue'
import SelectBoxField from '../SelectBoxField.vue'
import TextareaField from '../TextareaField.vue'
import SwitchField from '../SwitchField.vue'
import SliderField from '../SliderField.vue'

const meta: Meta<typeof FormFieldGroup> = {
  title: 'Molecules/FormFieldGroup',
  component: FormFieldGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Composant FormFieldGroup — regroupe plusieurs champs de formulaire en propageant automatiquement ' +
          'la prop `size` à tous les enfants. Supporte deux dispositions (vertical / horizontal) ' +
          'et des slots `head` / `footer` pour encadrer le groupe.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    gap: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Espacement entre les champs'
    },
    sectionGap: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Espacement entre les sections (head/content/footer)'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Taille propagée à tous les champs enfants'
    },
    direction: {
      control: { type: 'radio' },
      options: ['vertical', 'horizontal'],
      description: 'Disposition des champs'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { gap: 'md', direction: 'vertical' },
  render: (args) => ({
    components: { FormFieldGroup, InputField, SelectBoxField },
    setup: () => ({ args }),
    template: `
      <div style="width: 380px;">
        <FormFieldGroup v-bind="args">
          <InputField label="Prénom" placeholder="Jean" required />
          <InputField label="Nom" placeholder="Dupont" required />
          <InputField label="Email" type="email" placeholder="jean@exemple.fr" />
        </FormFieldGroup>
      </div>
    `
  })
}

export const Horizontal: Story = {
  args: { direction: 'horizontal', gap: 'md' },
  render: (args) => ({
    components: { FormFieldGroup, InputField },
    setup: () => ({ args }),
    template: `
      <div style="width: 560px;">
        <FormFieldGroup v-bind="args">
          <InputField label="Prénom" placeholder="Jean" />
          <InputField label="Nom" placeholder="Dupont" />
        </FormFieldGroup>
      </div>
    `
  })
}

export const Sizes: Story = {
  render: () => ({
    components: { FormFieldGroup, InputField },
    template: `
      <div style="display:flex; flex-direction:column; gap:2.5rem; width:380px;">
        <div>
          <p style="font-size:0.75rem;color:#6b7280;margin-bottom:0.5rem;">Taille sm</p>
          <FormFieldGroup size="sm" gap="sm">
            <InputField label="Nom" placeholder="Dupont" />
            <InputField label="Email" type="email" placeholder="nom@ex.fr" />
          </FormFieldGroup>
        </div>
        <div>
          <p style="font-size:0.75rem;color:#6b7280;margin-bottom:0.5rem;">Taille md (défaut)</p>
          <FormFieldGroup size="md" gap="md">
            <InputField label="Nom" placeholder="Dupont" />
            <InputField label="Email" type="email" placeholder="nom@ex.fr" />
          </FormFieldGroup>
        </div>
        <div>
          <p style="font-size:0.75rem;color:#6b7280;margin-bottom:0.5rem;">Taille lg</p>
          <FormFieldGroup size="lg" gap="lg">
            <InputField label="Nom" placeholder="Dupont" />
            <InputField label="Email" type="email" placeholder="nom@ex.fr" />
          </FormFieldGroup>
        </div>
      </div>
    `
  })
}

export const WithHeadSlot: Story = {
  name: 'Avec slot head',
  render: () => ({
    components: { FormFieldGroup, InputField },
    template: `
      <div style="width:380px;">
        <FormFieldGroup gap="md">
          <template #head>
            <div style="padding-bottom:0.25rem;">
              <h3 style="font-size:1rem;font-weight:600;margin:0 0 0.25rem;">Informations personnelles</h3>
              <p style="font-size:0.875rem;color:#6b7280;margin:0;">Renseignez vos coordonnées.</p>
            </div>
          </template>
          <InputField label="Prénom" placeholder="Jean" required />
          <InputField label="Nom" placeholder="Dupont" required />
          <InputField label="Email" type="email" placeholder="jean@exemple.fr" />
        </FormFieldGroup>
      </div>
    `
  })
}

export const CompleteForm: Story = {
  name: 'Formulaire complet',
  render: () => ({
    components: { FormFieldGroup, InputField, SelectBoxField, TextareaField, SwitchField, SliderField },
    template: `
      <div style="width:420px;">
        <FormFieldGroup gap="lg">
          <template #head>
            <div>
              <h3 style="font-size:1.125rem;font-weight:600;margin:0 0 0.25rem;">Créer un compte</h3>
              <p style="font-size:0.875rem;color:#6b7280;margin:0;">Tous les champs marqués * sont obligatoires.</p>
            </div>
          </template>

          <InputField label="Nom complet" placeholder="Jean Dupont" required />
          <InputField label="Email" type="email" placeholder="jean@exemple.fr" required />
          <InputField label="Mot de passe" type="password" placeholder="••••••••" required />
          <SelectBoxField
            label="Pays"
            :options="[
              { value: 'fr', label: 'France' },
              { value: 'be', label: 'Belgique' },
              { value: 'ch', label: 'Suisse' },
              { value: 'ca', label: 'Canada' }
            ]"
            placeholder="Sélectionnez un pays..."
          />
          <TextareaField label="Message" placeholder="Écrivez un message..." />
          <SwitchField label="Accepter les conditions d'utilisation" required />
        </FormFieldGroup>
      </div>
    `
  })
}

export const WithStates: Story = {
  name: 'Champs avec états',
  render: () => ({
    components: { FormFieldGroup, InputField },
    template: `
      <div style="width:380px;">
        <FormFieldGroup gap="md">
          <InputField
            label="Email valide"
            state="success"
            modelValue="jean@exemple.fr"
            message="Email confirmé."
          />
          <InputField
            label="Mot de passe trop court"
            state="error"
            type="password"
            modelValue="abc"
            message="Minimum 8 caractères requis."
          />
          <InputField
            label="Nom d'utilisateur"
            state="warning"
            modelValue="jean123"
            message="Ce nom est déjà pris, choisissez-en un autre."
          />
        </FormFieldGroup>
      </div>
    `
  })
}
