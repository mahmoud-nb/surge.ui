import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import Collapse from '../Collapse.vue'
import Badge from '../../atoms/Badge.vue'
import Button from '../../atoms/Button.vue'
import { UserIcon, MagnifyingGlassIcon, AtSymbolIcon } from '@heroicons/vue/24/outline'

const meta: Meta<typeof Collapse> = {
  title: 'Molecules/Collapse',
  component: Collapse,
  parameters: {
    layout: 'lefted',
    docs: {
      description: {
        component: 'A simple Collapse component for displaying collapsible content sections.'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof Collapse>

const items = [
  { id: 'item-1', title: 'Section 1', content: 'Contenu du premier bloc', icon: AtSymbolIcon },
  { id: 'item-2', title: 'Section 2', content: 'Contenu du deuxième bloc', badge: 5, icon: UserIcon },
  { id: 'item-3', title: 'Section 3', content: 'Contenu du troisième bloc', icon: MagnifyingGlassIcon }
]

export const Default: Story = {
  args: {
    items
  },
}

export const MultipleOpen: Story = {
  args: {
    items: [
      {
        id: 'item-1',
        title: 'Item 1',
        content: 'Content for item 1',
      },
      {
        id: 'item-2',
        title: 'Item 2',
        content: 'Content for item 2',
      },
    ],
    multiple: true,
  },
}

export const Controlled: Story = {
  render: () => ({
    components: { Collapse, Button, Badge },
    setup() {
      const openItems = ref<string[]>(['item-1'])
      return { openItems }
    },
    template: `
      <Collapse :items="items" multiple>
        <template #header="{ item }">
          <div style="display: flex; align-items: center; gap: 8px; flex-grow: 1;">
            <component v-if="item.icon" :is="item.icon" style="width: 16px; height: 16px;" />
            <span>{{ item.title }}</span>
            <Badge v-if="item.badge" type="info">{{ item.badge }}</Badge>
          </div>
        </template>

        <template #panel="{ item }">
          <article>
            <h3>{{ item.title }}</h3>
            <p>{{ item.content }}</p>
          </article>
        </template>
      </Collapse>
    `,
    data() {
      return {
        items,
      }
    },
  }),
}

export const RTLSupport: Story = {
   render: () => ({
    components: { Collapse },
    setup() {
      return {}
    },
    template: `
      <div dir="rtl">
        <Collapse :items="items" />
      </div>
    `,
    data() {
      return {
        items: [
          { id: 'item-1', title: 'القسم 1', content: 'محتوى القسم الأول' },
          { id: 'item-2', title: 'القسم 2', content: 'محتوى القسم الثاني' },
          { id: 'item-3', title: 'القسم 3', content: 'محتوى القسم الثالث' }
        ]
      }
    },
   })
}
