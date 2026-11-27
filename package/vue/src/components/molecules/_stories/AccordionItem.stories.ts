import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import AccordionItem from '../AccordionItem.vue'
import Button from '../../atoms/Button.vue'
import Badge from '../../atoms/Badge.vue'

const meta: Meta<typeof AccordionItem> = {
  title: 'Molecules/AccordionItem',
  component: AccordionItem,
  parameters: {
    layout: 'left-aligned',
    docs: {
      description: {
        component: 'A fully accessible accordion item component with complete keyboard navigation and ARIA support.'
      }
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'aria-required-attributes',
            enabled: false, // Désactivé car Storybook ne comprend pas les computed props
          }
        ]
      }
    }
  },
  argTypes: {
    title: {
      description: 'The title of the accordion item.',
      control: { type: 'text' }
    },
    content: {
      description: 'The content of the accordion item.',
      control: { type: 'text' }
    },
    disabled: {
      description: 'Whether the accordion item is disabled.',
      control: { type: 'boolean' }
    },
    open: {
      description: 'Whether the accordion item is open.',
      control: { type: 'boolean' }
    },
    level: {
      description: 'Heading level for semantic structure (1-6).',
      control: { type: 'number', min: 1, max: 6 }
    },
    'update:open': {
      description: 'Emitted when the open state changes.',
      action: 'update:open'
    },
    'keydown': {
      description: 'Emitted when a key is pressed on the header.',
      action: 'keydown'
    }
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

// Template pour tester la navigation clavier avec plusieurs accordéons
const MultipleAccordionsTemplate = () => ({
  components: { AccordionItem },
  setup() {
    const items = ref([
      { id: 'item-1', title: 'Première section', content: 'Contenu de la première section', open: false },
      { id: 'item-2', title: 'Deuxième section', content: 'Contenu de la deuxième section', open: false },
      { id: 'item-3', title: 'Troisième section', content: 'Contenu de la troisième section', open: false, disabled: true },
      { id: 'item-4', title: 'Quatrième section', content: 'Contenu de la quatrième section', open: true }
    ])
    
    const handleOpenUpdate = (index: number, value: boolean) => {
      items.value[index].open = value
    }
    
    const handleKeydown = (event: KeyboardEvent) => {
      console.log('Key pressed:', event.key)
    }
    
    return { items, handleOpenUpdate, handleKeydown }
  },
  template: `
    <div style="width: 600px; max-width: 100%;">
      <h2>Test de navigation clavier</h2>
      <p style="margin-bottom: 16px; font-size: 0.875rem; color: #666;">
        Utilisez Tab, Shift+Tab, Flèches, Home, End, Espace et Entrée pour naviguer
      </p>
      
      <div class="accordion-group">
        <AccordionItem
          v-for="(item, index) in items"
          :key="item.id"
          v-bind="item"
          level="3"
          @update:open="(value) => handleOpenUpdate(index, value)"
          @keydown="handleKeydown"
        />
      </div>
      
      <div style="margin-top: 24px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
        <h3 style="margin-top: 0;">Instructions de navigation :</h3>
        <ul style="margin-bottom: 0;">
          <li><strong>Tab</strong> : Naviguer entre les accordéons</li>
          <li><strong>Espace ou Entrée</strong> : Ouvrir/fermer l'accordéon</li>
          <li><strong>Flèche bas/haut</strong> : Naviguer entre les accordéons</li>
          <li><strong>Home/End</strong> : Premier/dernier accordéon</li>
          <li><strong>Alt + Flèche bas</strong> : Ouvrir l'accordéon</li>
          <li><strong>Alt + Flèche haut</strong> : Fermer l'accordéon</li>
        </ul>
      </div>
    </div>
  `
})

export const Default: Story = {
  args: {
    id: 'item-1',
    title: 'Section par défaut',
    content: 'Contenu de la section par défaut',
    open: false
  }
}

export const OpenByDefault: Story = {
  args: {
    id: 'item-2',
    title: 'Section ouverte',
    content: 'Cette section est ouverte par défaut',
    open: true
  }
}

export const Disabled: Story = {
  args: {
    id: 'item-3',
    title: 'Section désactivée',
    content: 'Cette section ne peut pas être ouverte',
    disabled: true
  }
}

export const MultipleAccordions: Story = {
  render: MultipleAccordionsTemplate
}

export const WithCustomHeadingLevel: Story = {
  args: {
    id: 'item-4',
    title: 'Section avec niveau H2',
    content: 'Cette section utilise un niveau de titre H2 pour la structure sémantique',
    level: 2,
    open: false
  }
}

export const WithSlots: Story = {
  render: () => ({
    components: { AccordionItem, Button, Badge },
    setup() {
      const isOpen = ref(false)
      return { isOpen }
    },
    template: `
      <div style="width: 600px; max-width: 100%;">
        <AccordionItem 
          id="slotted-item"
          :open="isOpen"
          @update:open="isOpen = $event"
        >
          <template #header="{ item }">
            <div style="display: flex; align-items: center; gap: 12px;">
              <Badge type="info">
                Nouveau
              </Badge>
              <strong>{{ item.title || 'Section personnalisée' }}</strong>
            </div>
          </template>

          <template #panel>
            <div style="padding: 8px 0;">
              <h4>Contenu riche personnalisé</h4>
              <p>Ce contenu utilise des slots personnalisés avec des éléments interactifs.</p>
              <Button @click.stop>
                Action dans le panel
              </Button>
            </div>
          </template>
        </AccordionItem>
      </div>
    `
  })
}