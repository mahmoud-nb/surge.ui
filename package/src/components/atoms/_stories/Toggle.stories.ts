import type { Meta, StoryObj } from '@storybook/vue3'
import { h, ref } from 'vue'
import { BoldIcon, ItalicIcon, UnderlineIcon, HeartIcon, BookmarkIcon, StarIcon } from '@heroicons/vue/24/outline'
import { HeartIcon as HeartIconSolid, BookmarkIcon as BookmarkIconSolid, StarIcon as StarIconSolid } from '@heroicons/vue/24/solid'
import Toggle from '../Toggle.vue'

const meta: Meta<typeof Toggle> = {
  title: 'Atoms/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "Bouton basculable entre deux états (on/off). Accepte un label textuel ou une icône. Utilise role=\"switch\" et aria-checked pour l'accessibilité."
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: 'État du toggle (true = actif)'
    },
    label: {
      control: 'text',
      description: 'Texte affiché dans le toggle'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Taille du toggle'
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline', 'ghost'],
      description: 'Variante visuelle'
    },
    radius: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
      description: 'Rayon de bordure'
    },
    disabled: {
      control: 'boolean',
      description: 'Désactive le toggle'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Gras',
    modelValue: false
  }
}

export const Active: Story = {
  args: {
    label: 'Gras',
    modelValue: true
  }
}

export const WithIcon: Story = {
  args: {
    icon: BoldIcon,
    ariaLabel: 'Gras',
    modelValue: false
  }
}

export const WithIconAndLabel: Story = {
  args: {
    icon: StarIcon,
    label: 'Favori',
    modelValue: false
  }
}

export const ActiveIcon: Story = {
  args: {
    icon: HeartIcon,
    activeIcon: HeartIconSolid,
    ariaLabel: 'Aimer',
    modelValue: false
  }
}

export const Variants: Story = {
  render: () => ({
    components: { Toggle },
    setup() {
      const v1 = ref(true)
      const v2 = ref(true)
      const v3 = ref(true)
      return { v1, v2, v3 }
    },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <Toggle v-model="v1" label="Default" variant="default" />
        <Toggle v-model="v2" label="Outline" variant="outline" />
        <Toggle v-model="v3" label="Ghost" variant="ghost" />
      </div>
    `
  })
}

export const Sizes: Story = {
  render: () => ({
    components: { Toggle },
    setup() {
      const s1 = ref(true)
      const s2 = ref(true)
      const s3 = ref(true)
      return { s1, s2, s3 }
    },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <Toggle v-model="s1" label="Small" size="sm" />
        <Toggle v-model="s2" label="Medium" size="md" />
        <Toggle v-model="s3" label="Large" size="lg" />
      </div>
    `
  })
}

export const RadiusVariants: Story = {
  render: () => ({
    components: { Toggle },
    setup() {
      const values = ref({ none: true, sm: true, md: true, lg: true, xl: true, full: true })
      return { values }
    },
    template: `
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
        <Toggle v-model="values.none" label="none" radius="none" />
        <Toggle v-model="values.sm" label="sm" radius="sm" />
        <Toggle v-model="values.md" label="md" radius="md" />
        <Toggle v-model="values.lg" label="lg" radius="lg" />
        <Toggle v-model="values.xl" label="xl" radius="xl" />
        <Toggle v-model="values.full" label="full" radius="full" />
      </div>
    `
  })
}

export const Disabled: Story = {
  render: () => ({
    components: { Toggle },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <Toggle label="Off disabled" :model-value="false" disabled />
        <Toggle label="On disabled" :model-value="true" disabled />
      </div>
    `
  })
}

export const IconToggleSet: Story = {
  render: () => ({
    components: { Toggle },
    setup() {
      const bold = ref(false)
      const italic = ref(false)
      const underline = ref(false)
      return { bold, italic, underline, BoldIcon, ItalicIcon, UnderlineIcon }
    },
    template: `
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <Toggle v-model="bold" :icon="BoldIcon" aria-label="Gras" />
        <Toggle v-model="italic" :icon="ItalicIcon" aria-label="Italique" />
        <Toggle v-model="underline" :icon="UnderlineIcon" aria-label="Souligné" />
      </div>
    `
  })
}

export const FavoriteToggle: Story = {
  render: () => ({
    components: { Toggle },
    setup() {
      const heart = ref(false)
      const bookmark = ref(false)
      const star = ref(false)
      return {
        heart, bookmark, star,
        HeartIcon, HeartIconSolid,
        BookmarkIcon, BookmarkIconSolid,
        StarIcon, StarIconSolid
      }
    },
    template: `
      <div style="display: flex; gap: 0.75rem; align-items: center;">
        <Toggle v-model="heart" :icon="HeartIcon" :active-icon="HeartIconSolid" aria-label="Aimer" variant="ghost" />
        <Toggle v-model="bookmark" :icon="BookmarkIcon" :active-icon="BookmarkIconSolid" aria-label="Sauvegarder" variant="ghost" />
        <Toggle v-model="star" :icon="StarIcon" :active-icon="StarIconSolid" aria-label="Favori" variant="ghost" />
      </div>
    `
  })
}
