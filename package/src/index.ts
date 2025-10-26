import type { App } from 'vue'
// ## Display Components ................................................
import Image from './components/atoms/Image.vue'
import Avatar from './components/atoms/Avatar.vue'
import AvatarGroup from './components/molecules/AvatarGroup.vue'
import Badge from './components/atoms/Badge.vue'
import Dialog, { DialogDisplay } from './components/molecules/Dialog.vue'
import Tabs from './components/molecules/Tabs.vue' 
import Progress from './components/atoms/Progress.vue' 

// ## Action Components .................................................
import Link, { LinkSize, LinkUnderline, LinkVariant } from './components/atoms/Link.vue'
import Button, { ButtonRadius, ButtonSize, ButtonVariant } from './components/atoms/Button.vue'
import Dropdown from './components/molecules/Dropdown.vue'
import LinkGroup from './components/molecules/LinkGroup.vue'
import ButtonGroup from './components/molecules/ButtonGroup.vue'
import FloatButton from './components/molecules/FloatButton.vue'

// ## Form Components ..................................................
import Input from './components/atoms/Input.vue'
import Textarea from './components/atoms/Textarea.vue'
import SelectBox from './components/atoms/SelectBox.vue'
import RadioGroup from './components/atoms/RadioGroup.vue'
import CheckboxGroup from './components/atoms/CheckboxGroup.vue'
import Switch from './components/atoms/Switch.vue'
import Slider from './components/atoms/Slider.vue'
import Password from './components/molecules/Password.vue'

import FormField from './components/atoms/FormField.vue'

import InputField from './components/molecules/InputField.vue'
import TextareaField from './components/molecules/TextareaField.vue'
import SelectBoxField from './components/molecules/SelectBoxField.vue'
import RadioGroupField from './components/molecules/RadioGroupField.vue'
import CheckboxGroupField from './components/molecules/CheckboxGroupField.vue'
import SwitchField from './components/molecules/SwitchField.vue'
import SliderField from './components/molecules/SliderField.vue'
import RangeField from './components/molecules/RangeField.vue'
import FileUploadField from './components/molecules/FileUploadField.vue'

import FormFields from './components/molecules/FormFields.vue'

import * as accessibility from './utils/accessibility'

// Export des composants et de la fonction d'installation
export { Image, Avatar, AvatarGroup, Badge, Tabs, Dialog, Progress }
export { Link, LinkGroup, Button, ButtonGroup, FloatButton, Dropdown }
export { Input, Textarea, SelectBox, RadioGroup, CheckboxGroup, Switch, Slider, Password }
export { InputField, SelectBoxField, RadioGroupField, CheckboxGroupField, RangeField, SwitchField, FileUploadField, TextareaField, SliderField }
export { FormField, FormFields }
export { accessibility }

export interface SurgeUpDSOptions {
  prefix?: string
  // Configuration globale des boutons
  buttonRadius?: Exclude<ButtonRadius, 'default'>
  buttonVariant?: Exclude<ButtonVariant, 'default'>
  buttonSize?: Exclude<ButtonSize, 'default'>
  // Configuration globale des liens
  linkVariant?: Exclude<LinkVariant, 'default'>
  linkSize?: Exclude<LinkSize, 'default'>
  linkUnderline?: Exclude<LinkUnderline, 'default'>
  dialogDisplay?: Exclude<DialogDisplay, 'center'>
}

export default {
  install(app: App, options: SurgeUpDSOptions = {}) {
    const prefix = options.prefix || 'Su'
    const root = document.documentElement
    
    // Configuration globale des valeurs par défaut des boutons
    if (typeof document !== 'undefined') {
      
      // Configuration du radius par défaut
      if (options.buttonRadius) {
        root.style.setProperty('--su-button-default-radius', `var(--su-border-radius-${options.buttonRadius})`)
      }
      
      // Configuration de la variante par défaut
      if (options.buttonVariant) {
        const variantMap = {
          primary: {
            bg: 'var(--su-button-variant-primary-bg)',
            color: 'var(--su-button-variant-primary-color)',
            border: 'var(--su-button-variant-primary-border)',
            hoverBg: 'var(--su-button-variant-primary-hover-bg)',
            hoverShadow: 'var(--su-button-variant-primary-hover-shadow)'
          },
          secondary: {
            bg: 'var(--su-button-variant-secondary-bg)',
            color: 'var(--su-button-variant-secondary-color)',
            border: 'var(--su-button-variant-secondary-border)',
            hoverBg: 'var(--su-button-variant-secondary-hover-bg)',
            hoverShadow: 'var(--su-button-variant-secondary-hover-shadow)'
          },
          outline: {
            bg: 'var(--su-button-variant-outline-bg)',
            color: 'var(--su-button-variant-outline-color)',
            border: 'var(--su-button-variant-outline-border)',
            hoverBg: 'var(--su-button-variant-outline-hover-bg)',
            hoverShadow: 'none'
          },
          ghost: {
            bg: 'var(--su-button-variant-ghost-bg)',
            color: 'var(--su-button-variant-ghost-color)',
            border: 'var(--su-button-variant-ghost-border)',
            hoverBg: 'var(--su-button-variant-ghost-hover-bg)',
            hoverShadow: 'none'
          }
        }
        
        const variant = variantMap[options.buttonVariant]
        if (variant) {
          // Mise à jour des variables CSS pour la variante par défaut
          root.style.setProperty('--su-button-variant-primary-bg', variant.bg)
          root.style.setProperty('--su-button-variant-primary-color', variant.color)
          root.style.setProperty('--su-button-variant-primary-border', variant.border)
          root.style.setProperty('--su-button-variant-primary-hover-bg', variant.hoverBg)
          root.style.setProperty('--su-button-variant-primary-hover-shadow', variant.hoverShadow)
        }
      }
      
      // Configuration de la taille par défaut
      if (options.buttonSize) {
        const sizeMap = {
          sm: 'sm',
          md: 'md',
          lg: 'lg'
        }
        
        const size = sizeMap[options.buttonSize]
        if (size) {
          // Mise à jour des variables CSS pour la taille par défaut
          root.style.setProperty('--su-button-size-md-padding', `var(--su-button-size-${size}-padding)`)
          root.style.setProperty('--su-button-size-md-font-size', `var(--su-button-size-${size}-font-size)`)
          root.style.setProperty('--su-button-size-md-line-height', `var(--su-button-size-${size}-line-height)`)
          root.style.setProperty('--su-button-size-md-min-height', `var(--su-button-size-${size}-min-height)`)
          root.style.setProperty('--su-button-size-md-icon-only-padding', `var(--su-button-size-${size}-icon-only-padding)`)
          root.style.setProperty('--su-button-size-md-icon-only-width', `var(--su-button-size-${size}-icon-only-width)`)
        }
      }
    }
    
    // Configuration de la variante par défaut des liens
    if (options.linkVariant) {
      const variantMap = {
        default: {
          color: 'var(--su-link-variant-default-color)',
          hoverColor: 'var(--su-link-variant-default-hover-color)',
          activeColor: 'var(--su-link-variant-default-active-color)'
        },
        primary: {
          color: 'var(--su-link-variant-primary-color)',
          hoverColor: 'var(--su-link-variant-primary-hover-color)',
          activeColor: 'var(--su-link-variant-primary-hover-color)'
        },
        secondary: {
          color: 'var(--su-link-variant-secondary-color)',
          hoverColor: 'var(--su-link-variant-secondary-hover-color)',
          activeColor: 'var(--su-link-variant-secondary-hover-color)'
        },
        muted: {
          color: 'var(--su-link-variant-muted-color)',
          hoverColor: 'var(--su-link-variant-muted-hover-color)',
          activeColor: 'var(--su-link-variant-muted-active-color)'
        }
      }
      
      const variant = variantMap[options.linkVariant]
      if (variant) {
        root.style.setProperty('--su-link-variant-default-color', variant.color)
        root.style.setProperty('--su-link-variant-default-hover-color', variant.hoverColor)
        root.style.setProperty('--su-link-variant-default-active-color', variant.activeColor)
      }
    }
    
    // Configuration de la taille par défaut des liens
    if (options.linkSize) {
      const sizeMap = {
        sm: 'sm',
        md: 'md',
        lg: 'lg'
      }
      
      const size = sizeMap[options.linkSize]
      if (size) {
        root.style.setProperty('--su-link-size-md-font-size', `var(--su-link-size-${size}-font-size)`)
        root.style.setProperty('--su-link-size-md-line-height', `var(--su-link-size-${size}-line-height)`)
        root.style.setProperty('--su-link-size-md-padding', `var(--su-link-size-${size}-padding)`)
        root.style.setProperty('--su-link-size-md-icon-size', `var(--su-link-size-${size}-icon-size)`)
        root.style.setProperty('--su-link-size-md-icon-only-padding', `var(--su-link-size-${size}-icon-only-padding)`)
        root.style.setProperty('--su-link-size-md-icon-only-size', `var(--su-link-size-${size}-icon-only-size)`)
      }
    }
    
    // Configuration du soulignement par défaut des liens
    if (options.linkUnderline) {
      root.style.setProperty('--su-link-default-underline', options.linkUnderline)
    }
    
    // Configuration de l'affichage par défaut des dialogues
    if (options.dialogDisplay) {
      root.style.setProperty('--su-dialog-default-display', options.dialogDisplay)
    }

    // ## Display Components
    app.component(`${prefix}Badge`, Badge)
    app.component(`${prefix}Dialog`, Dialog)
    app.component(`${prefix}Image`, Image)
    app.component(`${prefix}Avatar`, Avatar)
    app.component(`${prefix}AvatarGroup`, AvatarGroup)
    app.component(`${prefix}Tabs`, Tabs)
    app.component(`${prefix}Progress`, Progress)

    // ## Action Components
    app.component(`${prefix}Button`, Button)
    app.component(`${prefix}ButtonGroup`, ButtonGroup)
    app.component(`${prefix}Link`, Link)
    app.component(`${prefix}LinkGroup`, LinkGroup)
    app.component(`${prefix}FloatButton`, FloatButton)
    app.component(`${prefix}Dropdown`, Dropdown)

    // ## Form Components ...... Base fields
    app.component(`${prefix}Input`, Input)
    app.component(`${prefix}Textarea`, Textarea)
    app.component(`${prefix}SelectBox`, SelectBox)
    app.component(`${prefix}RadioGroup`, RadioGroup)
    app.component(`${prefix}CheckboxGroup`, CheckboxGroup)
    app.component(`${prefix}Switch`, Switch)
    app.component(`${prefix}Slider`, Slider)
    
    // ...... Advanced fields
    app.component(`${prefix}Password`, Password)

    // ...... With FormField wrapper
    app.component(`${prefix}FormField`, FormField)
    app.component(`${prefix}InputField`, InputField)
    app.component(`${prefix}TextareaField`, TextareaField)
    app.component(`${prefix}SelectBoxField`, SelectBoxField)
    app.component(`${prefix}RadioGroupField`, RadioGroupField)
    app.component(`${prefix}CheckboxGroupField`, CheckboxGroupField)
    app.component(`${prefix}SwitchField`, SwitchField)
    app.component(`${prefix}SliderField`, SliderField)
    app.component(`${prefix}FileUploadField`, FileUploadField)
    app.component(`${prefix}RangeField`, RangeField)
    
    // ...... FormFields container
    app.component(`${prefix}FormFields`, FormFields)
  }
}
export * from './types'