import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import Accordion from '../Accordion.vue'
import AccordionItem from '../../molecules/AccordionItem.vue'

const meta: Meta<typeof Accordion> = {
  title: 'Organisms/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A fully accessible accordion component with single or multiple expandable sections and complete keyboard navigation.'
      }
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'aria-required-attributes',
            enabled: false,
          }
        ]
      }
    }
  },
  argTypes: {
    multiple: {
      description: 'Allow multiple sections to be open simultaneously',
      control: { type: 'boolean' }
    },
    level: {
      description: 'Base heading level for semantic structure',
      control: { type: 'number', min: 1, max: 6 }
    },
    gap: {
      description: 'Spacing between accordion items',
      control: { type: 'select', options: ['sm', 'md', 'lg', 'none'] }
    },
    items: {
      description: 'Array of accordion items to render',
      control: { type: 'object' }
    },
    modelValue: {
      description: 'Array of open item IDs (v-model support)',
      control: { type: 'object' }
    },
    'update:modelValue': {
      description: 'Emitted when open items change',
      action: 'update:modelValue'
    },
    'item-toggle': {
      description: 'Emitted when an item is toggled',
      action: 'item-toggle'
    }
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

// Données de démonstration
const sampleItems = [
  {
    id: 'section-1',
    title: 'Première section',
    content: 'Contenu de la première section de l\'accordéon.',
    gap: 'lg',
    open: false
  },
  {
    id: 'section-2',
    title: 'Deuxième section',
    content: 'Contenu de la deuxième section avec plus de détails.',
    open: true
  },
  {
    id: 'section-3',
    title: 'Troisième section désactivée',
    content: 'Ce contenu ne peut pas être affiché car la section est désactivée.',
    disabled: true
  },
  {
    id: 'section-4',
    title: 'Quatrième section',
    content: 'Dernière section de l\'accordéon de démonstration.',
    open: false
  }
]

export const SingleOpen: Story = {
  args: {
    multiple: false,
    items: sampleItems,
    level: 2
  },
  render: (args) => ({
    components: { Accordion },
    setup() {
      const modelValue = ref(['section-2']) // Section 2 ouverte par défaut
      return { args, modelValue }
    },
    template: `
      <div style="width: 600px; max-width: 90vw;">
        <h1>Accordéon simple (une seule section ouverte)</h1>
        <Accordion
          v-bind="args"
          v-model="modelValue"
          @update:modelValue="args['update:modelValue']"
          @item-toggle="args['item-toggle']"
        />
        <div style="margin-top: 16px; font-size: 0.875rem; color: #666;">
          Sections ouvertes: {{ modelValue.join(', ') }}
        </div>
      </div>
    `
  })
}

export const MultipleOpen: Story = {
  args: {
    multiple: true,
    items: sampleItems,
    level: 2
  },
  render: (args) => ({
    components: { Accordion },
    setup() {
      const modelValue = ref(['section-2'])
      return { args, modelValue }
    },
    template: `
      <div style="width: 600px; max-width: 90vw;">
        <h1>Accordéon multiple (plusieurs sections ouvertes)</h1>
        <Accordion
          v-bind="args"
          v-model="modelValue"
          @update:modelValue="args['update:modelValue']"
          @item-toggle="args['item-toggle']"
        />
        <div style="margin-top: 16px; font-size: 0.875rem; color: #666;">
          Sections ouvertes: {{ modelValue.join(', ') }}
        </div>
      </div>
    `
  })
}

export const WithSlots: Story = {
  render: (args) => ({
    components: { Accordion, AccordionItem },
    setup() {
      const modelValue = ref(['custom-1'])
      return { args, modelValue }
    },
    template: `
      <div style="width: 600px; max-width: 90vw;">
        <h1>Accordéon avec slots personnalisés</h1>
        <Accordion
          v-bind="args"
          v-model="modelValue"
          @update:modelValue="args['update:modelValue']"
          @item-toggle="args['item-toggle']"
        >
          <AccordionItem
            id="custom-1"
            title="Section avec emoji"
            :open="modelValue.includes('custom-1')"
            @update:open="(value) => {
              if (value && !modelValue.includes('custom-1')) {
                modelValue.push('custom-1')
              } else if (!value) {
                modelValue = modelValue.filter(id => id !== 'custom-1')
              }
            }"
          >
            <template #header="{ item }">
              <div style="display: flex; align-items: center; gap: 12px;">
                <span>🎨</span>
                <strong>{{ item.title }}</strong>
                <span style="font-size: 0.75rem; color: #10b981; background: #ecfdf5; padding: 2px 6px; border-radius: 4px;">
                  Nouveau
                </span>
              </div>
            </template>

            <template #panel>
              <div style="padding: 8px 0;">
                <h4>Contenu riche personnalisé</h4>
                <p>Cette section utilise des slots pour un contenu personnalisé.</p>
                <ul>
                  <li>Élément de liste 1</li>
                  <li>Élément de liste 2</li>
                  <li>Élément de liste 3</li>
                </ul>
              </div>
            </template>
          </AccordionItem>

          <AccordionItem
            id="custom-2"
            title="Section avec formulaire"
          >
            <template #panel>
              <div style="padding: 8px 0;">
                <h4>Formulaire exemple</h4>
                <form @submit.prevent="" style="display: flex; flex-direction: column; gap: 12px;">
                  <div>
                    <label for="name" style="display: block; margin-bottom: 4px; font-weight: 500;">Nom:</label>
                    <input id="name" type="text" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;">
                  </div>
                  <div>
                    <label for="email" style="display: block; margin-bottom: 4px; font-weight: 500;">Email:</label>
                    <input id="email" type="email" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;">
                  </div>
                  <button type="submit" style="padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 4px; align-self: flex-start;">
                    Soumettre
                  </button>
                </form>
              </div>
            </template>
          </AccordionItem>

          <AccordionItem
            id="custom-3"
            title="Section désactivée"
            disabled
          >
            <template #header="{ item }">
              <div style="display: flex; align-items: center; gap: 12px; opacity: 0.6;">
                <span>🔒</span>
                <span>{{ item.title }}</span>
              </div>
            </template>
          </AccordionItem>
        </Accordion>

        <div style="margin-top: 16px; font-size: 0.875rem; color: #666;">
          Sections ouvertes: {{ modelValue.join(', ') }}
        </div>
      </div>


      
    `
  })
}

export const KeyboardNavigationDemo: Story = {
  render: () => ({
    components: { Accordion },
    setup() {
      const items = ref([
        { id: 'nav-1', title: 'Navigation 1', content: 'Premier élément de navigation' },
        { id: 'nav-2', title: 'Navigation 2', content: 'Deuxième élément de navigation' },
        { id: 'nav-3', title: 'Navigation 3', content: 'Troisième élément de navigation' },
        { id: 'nav-4', title: 'Navigation 4', content: 'Quatrième élément de navigation' },
        { id: 'nav-5', title: 'Navigation 5', content: 'Cinquième élément de navigation' },
      ])
      const modelValue = ref(['nav-1'])
      
      return { items, modelValue }
    },
    template: `
      <div style="width: 600px; max-width: 90vw;">
        <h1>Démo de navigation clavier</h1>
        <p style="margin-bottom: 16px; color: #666;">
          Testez la navigation avec le clavier uniquement (pas de souris!)
        </p>
        
        <Accordion
          :items="items"
          :multiple="true"
          v-model="modelValue"
          level="2"
        />

        <div style="margin-top: 24px; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
          <h3 style="margin-top: 0;">Instructions de navigation :</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div>
              <h4 style="margin-bottom: 8px;">Navigation :</h4>
              <ul style="margin: 0;">
                <li><strong>Tab</strong> : Naviguer entre sections</li>
                <li><strong>Flèches</strong> : Haut/Bas entre sections</li>
                <li><strong>Home/End</strong> : Première/dernière section</li>
                <li><strong>Page Up/Down</strong> : ±3 sections</li>
              </ul>
            </div>
            <div>
              <h4 style="margin-bottom: 8px;">Actions :</h4>
              <ul style="margin: 0;">
                <li><strong>Espace/Entrée</strong> : Ouvrir/fermer</li>
                <li><strong>Alt + Flèches</strong> : Ouvrir/fermer section</li>
                <li><strong>Alt + Home</strong> : Tout ouvrir</li>
                <li><strong>Alt + End</strong> : Tout fermer</li>
              </ul>
            </div>
          </div>
        </div>

        <div style="margin-top: 16px; font-size: 0.875rem; color: #666;">
          Sections ouvertes: {{ modelValue.join(', ') }}
        </div>
      </div>
    `
  })
}

export const EmptyState: Story = {
  args: {
    multiple: true,
    items: [],
    level: 2
  },
  render: (args) => ({
    components: { Accordion },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 600px; max-width: 90vw;">
        <h1>Accordéon vide</h1>
        <p style="margin-bottom: 16px; color: #666;">
          Cet accordéon ne contient aucune section.
        </p>
        <Accordion v-bind="args" />
      </div>
    `
  })
}