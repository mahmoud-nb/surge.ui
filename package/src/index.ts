import type { App } from 'vue'
// ## Display Components ................................................
import Heading from './components/atoms/Heading.vue'
import Panel from './components/atoms/Panel.vue'
import Image from './components/atoms/Image.vue'
import Avatar from './components/atoms/Avatar.vue'
import AvatarGroup from './components/molecules/AvatarGroup.vue'
import Badge from './components/atoms/Badge.vue'
import Dialog from './components/organisms/Dialog.vue'
import Tabs from './components/organisms/Tabs.vue' 
import Accordion from './components/organisms/Accordion.vue'
import AccordionItem from './components/molecules/AccordionItem.vue'
import Progress from './components/atoms/Progress.vue' 
import Spinner from './components/atoms/Spinner.vue'
import Alert from './components/organisms/Alert.vue'

// ## Action Components .................................................
import Link from './components/atoms/Link.vue'
import Button from './components/atoms/Button.vue'
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
import FileUpload from './components/atoms/FileUpload.vue'
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
import { SurgeuiTheme, ThemeSymbol } from './plugin/theme'

// Export des composants et de la fonction d'installation
export { Heading, Panel, Image, Avatar, AvatarGroup, Badge, Dialog, Progress, Spinner }
export { Tabs, Accordion, AccordionItem, Alert }
export { Link, LinkGroup, Button, ButtonGroup, FloatButton, Dropdown }
export { Input, Textarea, SelectBox, RadioGroup, CheckboxGroup, FileUpload, Switch, Slider, Password }
export { InputField, SelectBoxField, RadioGroupField, CheckboxGroupField, RangeField, SwitchField, FileUploadField, TextareaField, SliderField }
export { FormField, FormFields }
export { accessibility }

export interface SurgeUpDSOptions {
  prefix?: string
  theme?: SurgeuiTheme
}

const defaultTheme: SurgeuiTheme = {}

export default {
  install(app: App, options: SurgeUpDSOptions = {}) {
    const { prefix = 'Su', theme = {} } = options
    const mergedTheme = { ...defaultTheme, ...theme }
    const root = document.documentElement
    const { button, link } = mergedTheme

    // injection globale
    app.provide(ThemeSymbol, mergedTheme)
    
    // Configuration globale des valeurs par défaut des boutons
    if (typeof document !== 'undefined') {

      if (mergedTheme?.textPrimaryColor) {
        root.style.setProperty('--su-text-primary-color', `${mergedTheme?.textPrimaryColor}`)
      }
      if (mergedTheme?.textSecondaryColor) {
        root.style.setProperty('--su-text-secondary-color', `${mergedTheme?.textSecondaryColor}`)
      }
      if (mergedTheme?.textTeriaryColor) {
        root.style.setProperty('--su-text-tertiary-color', `${mergedTheme?.textTeriaryColor}`)
      }

      // button
      if (button) {
        root.style.setProperty('--su-custom-button-bg', button.bg)
        root.style.setProperty('--su-custom-button-color', button.color)
        root.style.setProperty('--su-custom-button-border', button.border)
        root.style.setProperty('--su-custom-button-hover-bg', button.hoverBackground)
        root.style.setProperty('--su-custom-button-hover-shadow', button.hoverShadow)
      }

      if (link) {
        root.style.setProperty('--su-custom-link-color', link.color)
        //root.style.setProperty('--su-custom-link-underline', link.underline)
        root.style.setProperty('--su-custom-link-hover-color', link.hoverColor)
        root.style.setProperty('--su-custom-link-hover-bg-color', link.hoverBackground)
        root.style.setProperty('--su-custom-link-active-color', link.activeColor)
      }
    }
    
    // Configuration de la variante par défaut des liens
    if (mergedTheme?.linkVariant) {
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
      
      const variant = variantMap[mergedTheme?.linkVariant]
      if (variant) {
        root.style.setProperty('--su-link-variant-default-color', variant.color)
        root.style.setProperty('--su-link-variant-default-hover-color', variant.hoverColor)
        root.style.setProperty('--su-link-variant-default-active-color', variant.activeColor)
      }
    }
    
    // Configuration de la taille par défaut des liens
    if (mergedTheme?.linkSize) {
      const sizeMap = {
        sm: 'sm',
        md: 'md',
        lg: 'lg'
      }
      
      const size = sizeMap[mergedTheme?.linkSize]
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
    if (mergedTheme?.linkUnderline) {
      root.style.setProperty('--su-link-default-underline', mergedTheme?.linkUnderline)
    }
    
    // Configuration de l'affichage par défaut des dialogues
    if (mergedTheme?.dialogDisplay) {
      root.style.setProperty('--su-dialog-default-display', mergedTheme?.dialogDisplay)
    }

    // ## Display Components
    app.component(`${prefix}Heading`, Heading)
    app.component(`${prefix}Panel`, Panel)
    app.component(`${prefix}Badge`, Badge)
    app.component(`${prefix}Dialog`, Dialog)
    app.component(`${prefix}Image`, Image)
    app.component(`${prefix}Avatar`, Avatar)
    app.component(`${prefix}AvatarGroup`, AvatarGroup)
    app.component(`${prefix}Tabs`, Tabs)
    app.component(`${prefix}Accordion`, Accordion)
    app.component(`${prefix}AccordionItem`, AccordionItem)
    app.component(`${prefix}Progress`, Progress)
    app.component(`${prefix}Spinner`, Spinner)
    app.component(`${prefix}Spinner`, Alert)

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
    app.component(`${prefix}FileUpload`, FileUpload)
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