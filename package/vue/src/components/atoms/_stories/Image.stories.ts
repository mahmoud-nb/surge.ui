import type { Meta, StoryObj } from '@storybook/vue3'
import Image from '../Image.vue'

const meta: Meta<typeof Image> = {
  title: 'Atoms/Image',
  component: Image,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant Image avec support des ratios d\'aspect, sources multiples, lazy loading, fallback et accessibilité complète.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'URL de l\'image principale'
    },
    alt: {
      control: 'text',
      description: 'Texte alternatif (obligatoire pour l\'accessibilité)'
    },
    fallback: {
      control: 'text',
      description: 'Image de fallback en cas d\'erreur'
    },
    sources: {
      control: 'object',
      description: 'Sources multiples pour le tag picture'
    },
    ratio: {
      control: { type: 'select' },
      options: ['auto', '16/9', '4/3', '1/1'],
      description: 'Ratio d\'aspect de l\'image'
    },
    fit: {
      control: { type: 'select' },
      options: ['cover', 'contain', 'fill', 'none', 'scale-down'],
      description: 'Mode d\'ajustement de l\'image'
    },
    position: {
      control: { type: 'select' },
      options: ['center', 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'],
      description: 'Position de l\'image'
    },
    lazy: {
      control: 'boolean',
      description: 'Activer le lazy loading'
    },
    loading: {
      control: { type: 'select' },
      options: ['eager', 'lazy'],
      description: 'Stratégie de chargement'
    },
    placeholder: {
      control: 'boolean',
      description: 'Afficher un placeholder pendant le chargement'
    },
    placeholderColor: {
      control: 'color',
      description: 'Couleur du placeholder'
    },
    width: {
      control: 'text',
      description: 'Largeur de l\'image'
    },
    height: {
      control: 'text',
      description: 'Hauteur de l\'image'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400',
    alt: 'Image par défaut',
    width: 400,
    height: 300
  }
}

export const WithRatio: Story = {
  render: () => ({
    components: { Image },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; width: 100%; max-width: 800px;">
        <div>
          <h4 style="margin-bottom: 0.5rem;">Auto (original)</h4>
          <Image 
            src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt="Ratio auto"
            ratio="auto"
            width="200"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">16:9 (cinéma)</h4>
          <Image 
            src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt="Ratio 16:9"
            ratio="16/9"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">4:3 (classique)</h4>
          <Image 
            src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt="Ratio 4:3"
            ratio="4/3"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">1:1 (carré)</h4>
          <Image 
            src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt="Ratio 1:1"
            ratio="1/1"
          />
        </div>
      </div>
    `
  })
}

export const ObjectFit: Story = {
  render: () => ({
    components: { Image },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; width: 100%; max-width: 800px;">
        <div>
          <h4 style="margin-bottom: 0.5rem;">Cover</h4>
          <Image 
            src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt="Object-fit cover"
            ratio="1/1"
            fit="cover"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Contain</h4>
          <Image 
            src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt="Object-fit contain"
            ratio="1/1"
            fit="contain"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Fill</h4>
          <Image 
            src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt="Object-fit fill"
            ratio="1/1"
            fit="fill"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Scale-down</h4>
          <Image 
            src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt="Object-fit scale-down"
            ratio="1/1"
            fit="scale-down"
          />
        </div>
      </div>
    `
  })
}

export const ObjectPosition: Story = {
  render: () => ({
    components: { Image },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1rem; width: 100%; max-width: 600px;">
        <div>
          <h4 style="margin-bottom: 0.5rem;">Center</h4>
          <Image 
            src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt="Position center"
            ratio="1/1"
            fit="cover"
            position="center"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Top</h4>
          <Image 
            src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt="Position top"
            ratio="1/1"
            fit="cover"
            position="top"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Left</h4>
          <Image 
            src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt="Position left"
            ratio="1/1"
            fit="cover"
            position="left"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Right</h4>
          <Image 
            src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt="Position right"
            ratio="1/1"
            fit="cover"
            position="right"
          />
        </div>
      </div>
    `
  })
}

export const WithFallback: Story = {
  args: {
    src: 'https://invalid-url-that-will-fail.jpg',
    fallback: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400',
    alt: 'Image avec fallback',
    ratio: '16/9',
    width: 400
  }
}

export const LazyLoading: Story = {
  render: () => ({
    components: { Image },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; width: 400px;">
        <div>
          <h4>Images avec lazy loading</h4>
          <p style="font-size: 0.875rem; color: #6b7280; margin-bottom: 1rem;">
            Faites défiler pour voir les images se charger progressivement
          </p>
        </div>
        
        <Image 
          v-for="i in 10"
          :key="i"
          :src="\`https://images.pexels.com/photos/\${417074 + i}/pexels-photo-\${417074 + i}.jpeg?auto=compress&cs=tinysrgb&w=400\`"
          :alt="\`Image lazy \${i}\`"
          ratio="16/9"
          lazy
          placeholder
        />
      </div>
    `
  })
}

export const MultipleSources: Story = {
  args: {
    src: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400',
    alt: 'Image avec sources multiples',
    ratio: '16/9',
    sources: [
      {
        srcset: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
        media: '(min-width: 768px)'
      },
      {
        srcset: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400',
        media: '(max-width: 767px)'
      }
    ]
  }
}

export const Gallery: Story = {
  render: () => ({
    components: { Image },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; width: 100%; max-width: 800px;">
        <Image 
          src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400"
          alt="Nature 1"
          ratio="1/1"
          fit="cover"
          lazy
        />
        <Image 
          src="https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=400"
          alt="Nature 2"
          ratio="1/1"
          fit="cover"
          lazy
        />
        <Image 
          src="https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400"
          alt="Nature 3"
          ratio="1/1"
          fit="cover"
          lazy
        />
        <Image 
          src="https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400"
          alt="Nature 4"
          ratio="1/1"
          fit="cover"
          lazy
        />
      </div>
    `
  })
}

export const ErrorHandling: Story = {
  render: () => ({
    components: { Image },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; width: 400px;">
        <div>
          <h4>Image qui échoue (sans fallback)</h4>
          <Image 
            src="https://invalid-url.jpg"
            alt="Image qui échoue"
            ratio="16/9"
            placeholder
          />
        </div>
        
        <div>
          <h4>Image qui échoue (avec fallback)</h4>
          <Image 
            src="https://invalid-url.jpg"
            fallback="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt="Image avec fallback"
            ratio="16/9"
            placeholder
          />
        </div>
      </div>
    `
  })
}

export const CustomPlaceholder: Story = {
  render: () => ({
    components: { Image },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; width: 100%; max-width: 600px;">
        <div>
          <h4 style="margin-bottom: 0.5rem;">Placeholder gris</h4>
          <Image 
            src="https://httpstat.us/200?sleep=3000"
            alt="Placeholder gris"
            ratio="1/1"
            placeholder
            placeholderColor="#e5e7eb"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Placeholder bleu</h4>
          <Image 
            src="https://httpstat.us/200?sleep=3000"
            alt="Placeholder bleu"
            ratio="1/1"
            placeholder
            placeholderColor="#dbeafe"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Sans placeholder</h4>
          <Image 
            src="https://httpstat.us/200?sleep=3000"
            alt="Sans placeholder"
            ratio="1/1"
            :placeholder="false"
          />
        </div>
      </div>
    `
  })
}

export const ResponsiveImage: Story = {
  args: {
    src: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400',
    alt: 'Image responsive',
    ratio: '16/9',
    sources: [
      {
        srcset: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200',
        media: '(min-width: 1024px)'
      },
      {
        srcset: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
        media: '(min-width: 768px)'
      },
      {
        srcset: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400',
        media: '(max-width: 767px)'
      }
    ],
    lazy: true
  }
}

export const ProfilePictures: Story = {
  render: () => ({
    components: { Image },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <div>
          <h4 style="margin-bottom: 0.5rem;">Petit (32px)</h4>
          <Image 
            src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100"
            alt="Photo de profil petite"
            ratio="1/1"
            fit="cover"
            width="32"
            height="32"
            style="border-radius: 50%;"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Moyen (64px)</h4>
          <Image 
            src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100"
            alt="Photo de profil moyenne"
            ratio="1/1"
            fit="cover"
            width="64"
            height="64"
            style="border-radius: 50%;"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Grand (128px)</h4>
          <Image 
            src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200"
            alt="Photo de profil grande"
            ratio="1/1"
            fit="cover"
            width="128"
            height="128"
            style="border-radius: 50%;"
          />
        </div>
      </div>
    `
  })
}

export const Interactive: Story = {
  render: () => ({
    components: { Image },
    setup() {
      const handleLoad = (event) => {
        console.log('Image chargée:', event)
      }
      
      const handleError = (event) => {
        console.log('Erreur de chargement:', event)
      }
      
      return { handleLoad, handleError }
    },
    template: `
      <div style="width: 400px;">
        <h4 style="margin-bottom: 1rem;">Image avec événements</h4>
        <Image 
          src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400"
          alt="Image interactive"
          ratio="16/9"
          placeholder
          @load="handleLoad"
          @error="handleError"
        />
        <p style="font-size: 0.875rem; color: #6b7280; margin-top: 0.5rem;">
          Ouvrez la console pour voir les événements
        </p>
      </div>
    `
  })
}