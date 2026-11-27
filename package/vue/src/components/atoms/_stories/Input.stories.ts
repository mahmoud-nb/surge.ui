import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import { MagnifyingGlassIcon, AtSymbolIcon, LockClosedIcon } from '@heroicons/vue/24/outline'
import Input from '../Input.vue'
import FormField from '../FormField.vue'

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
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
      options: ['default', 'left', 'center', 'right'],
      description: 'Alignement du texte'
    },
    dir: {
      control: { type: 'select' },
      options: ['ltr', 'rtl', 'auto'],
      description: 'Direction du texte'
    },
    // FormField related props
    label: {
      control: 'text',
      description: 'Label de l\'input'
    },
    message: {
      control: 'text',
      description: 'Message additionnel'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const createInteractiveStory = (args: any): Story => ({
  render: (renderArgs) => ({
    components: { Input, FormField },
    setup() {
      const { formFieldArgs = {}, modelValue = null, ...restArgs } = renderArgs;
      const value = ref(modelValue);
      return { args: restArgs, formFieldArgs, value };
    },
    template: `<FormField v-bind="formFieldArgs">
        <template #default="{ fieldId, ...slotProps }">
          <Input :id="fieldId" v-bind="{ ...args, ...slotProps }" v-model="value" />
        </template>
      </FormField>`,
  }),
  args,
});

export const Default: Story = createInteractiveStory({
  placeholder: 'Entrez du texte...',
  formFieldArgs: {
    label: 'Label par défaut'
  }
})

export const WithValue: Story = createInteractiveStory({
  modelValue: 'Valeur pré-remplie',
  placeholder: 'Entrez du texte...',
  formFieldArgs: {
    label: 'Avec valeur',
  }
})

export const Email: Story = createInteractiveStory({
  type: 'email',
  placeholder: 'nom@exemple.com',
  prefixIcon: AtSymbolIcon,
  formFieldArgs: {
    label: 'Email'
  }
})

export const Password: Story = createInteractiveStory({
  type: 'password',
  placeholder: '••••••••',
  prefixIcon: LockClosedIcon,
  formFieldArgs: {
    label: 'Mot de passe' 
  }
})

export const Search: Story = createInteractiveStory({
  type: 'search',
  placeholder: 'Rechercher...',
  prefixIcon: MagnifyingGlassIcon,
  formFieldArgs: {
    label: 'Recherche'
  }
})

export const WithPrefix: Story = createInteractiveStory({
  placeholder: '0.00',
  suffix: '€',
  type: 'number',
  formFieldArgs: {
     label: 'Prix'
  }
})

export const WithSuffix: Story = createInteractiveStory({
  placeholder: 'monsite',
  prefix: 'https://',
  suffix: '.com',
  formFieldArgs: {
    label: 'Site web'
  }
})

export const ClickablePrefix: Story = {
  args: {
    label: 'Recherche avec action',
    placeholder: 'Rechercher...',
    prefixIcon: MagnifyingGlassIcon
  },
  render: (args) => ({
    components: { Input, FormField },
    setup() {
      const handlePrefixIconClick = () => {
        alert('Icône de recherche cliquée!')
      }
      return { args, MagnifyingGlassIcon, handlePrefixIconClick }
    },
    template: `<FormField>
      <template #default="{ fieldId, ...slotProps }">
        <Input 
          :id="fieldId"
          v-bind="{ ...args, ...slotProps }"
          :prefixIcon="MagnifyingGlassIcon"
          @prefix-icon-click="handlePrefixIconClick"
        />
      </template>
    </FormField>`
  })
}

export const ClickableSuffix: Story = {
  args: {
    label: 'Montant',
    placeholder: '0.00',
    suffix: '€'
  },
  render: (args) => ({
    components: { Input, FormField },
    setup() {
      const handleSuffixClick = () => {
        alert('Suffixe € cliqué!')
      }
      return { args, handleSuffixClick }
    },
    template: `<FormField>
      <template #default="{ fieldId, ...slotProps }">
        <Input
          :id="fieldId" 
          v-bind="{ ...args, ...slotProps }" 
          :prefixIcon="MagnifyingGlassIcon" 
          @suffix-click="handleSuffixClick"
        />
      </template>
    </FormField>`
  })
}

export const States: Story = {
  render: () => ({
    components: { Input, FormField },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
        <FormField label="État par défaut">
          <template #default="{ fieldId, ...slotProps }">
          <Input :id="fieldId" v-bind="slotProps" placeholder="Entrez du texte" />
          </template>
        </FormField>
        <FormField label="État d'erreur" message="Ce champ contient une erreur" state="error">
          <template #default="{ fieldId, ...slotProps }">
            <Input :id="fieldId" v-bind="slotProps" state="error" placeholder="Entrez du texte" />
          </template>
        </FormField>
        <FormField label="État de succès" message="Valeur valide !" state="success">
          <template #default="{ fieldId, ...slotProps }">
            <Input :id="fieldId" v-bind="slotProps" state="success" placeholder="Entrez du texte" />
          </template>
        </FormField>
        <FormField label="État d'avertissement" message="Attention à cette valeur" state="warning">
          <template #default="{ fieldId, ...slotProps }">
            <Input :id="fieldId" v-bind="slotProps" placeholder="Entrez du texte" />
          </template>
        </FormField>
      </div>
    `
  })
}

export const Sizes: Story = {
  render: () => ({
    components: { Input, FormField },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
        <FormField label="Small">
          <template #default="{ fieldId, ...slotProps }">
            <Input :id="fieldId" v-bind="slotProps" size="sm" placeholder="Petit input" />
          </template>
        </FormField>
        <FormField label="Medium">
          <template #default="{ fieldId, ...slotProps }">
          <Input :id="fieldId" v-bind="slotProps" size="md" placeholder="Input moyen" />
          </template>
        </FormField>
        <FormField label="Large">
          <template #default="{ fieldId, ...slotProps }">
            <Input :id="fieldId" v-bind="slotProps" size="lg" placeholder="Grand input" />
          </template>
      </div>
    `
  })
}

export const TextAlignment: Story = {
  render: () => ({
    components: { Input, FormField },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
        <FormField label="Alignement à gauche" >
          <template #default="{ fieldId, ...slotProps }">
            <Input :id="fieldId" v-bind="slotProps" textAlign="left" value="Aligné à gauche" />
          </template>
        </FormField>
        <FormField label="Alignement centré">
          <template #default="{ fieldId, ...slotProps }">
            <Input :id="fieldId" v-bind="slotProps" textAlign="center" value="Centré" />
          </template>
        </FormField>
        <FormField label="Alignement à droite"> 
          <template #default="{ fieldId, ...slotProps }">
            <Input :id="fieldId" v-bind="slotProps" textAlign="right" value="Aligné à droite" />
          </template>
        </FormField>
      </div>
    `
  })
}

export const SupportRTL: Story = {
  render: () => ({
    components: { Input, FormField },
    template: `
      <div dir="rtl" style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
        <FormField label="Texte arabe (RTL)">
          <template #default="{ fieldId, ...slotProps }">
            <Input 
              :id="fieldId"
              v-bind="slotProps"
              placeholder="أدخل النص هنا"
              value="النص العربي"
            />
          </template>
        </FormField>
        <FormField label="Texte hébreu (RTL)">
          <template #default="{ fieldId, ...slotProps }">
            <Input 
              :id="fieldId"
              v-bind="slotProps"
              placeholder="הכנס טקסט כאן"
              value="טקסט עברי"
            />
          </template>
        </FormField>
        <FormField label="Prix (RTL avec suffixe)">
          <template #default="{ fieldId, ...slotProps }">
            <Input 
              :id="fieldId"
              v-bind="slotProps"
              placeholder="0.00"
              suffix="$"
              type="number"
            />
          </template>
        </FormField>
      </div>
    `
  })
}

export const Disabled: Story = createInteractiveStory({
  modelValue: 'Valeur désactivée',
  formFieldArgs: {
    label: 'Input désactivé',
    disabled: true,
  }
})

export const Readonly: Story = createInteractiveStory({
  readonly: true,
  modelValue: 'Valeur en lecture seule',
  formFieldArgs: {
    label: 'Input en lecture seule'
  }
})

export const Required: Story = createInteractiveStory({
  modelValue: 'Ce champ est obligatoire',
  formFieldArgs: {
    label: 'Champ requis',
    required: true
  }
})  