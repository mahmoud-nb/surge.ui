import type { App } from 'vue'
// ## Display Components ................................................
import Icon from './components/atoms/Icon.vue'
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
import Price from './components/atoms/Price.vue'
import Alert from './components/organisms/Alert.vue'
import Card from './components/organisms/Card.vue'

// ## Action Components .................................................
import Link from './components/atoms/Link.vue'
import Button from './components/atoms/Button.vue'
import Dropdown from './components/molecules/Dropdown.vue'
import LinkGroup from './components/molecules/LinkGroup.vue'
import ButtonGroup from './components/molecules/ButtonGroup.vue'
import Toggle from './components/atoms/Toggle.vue'
import FloatButton from './components/molecules/FloatButton.vue'
import ToggleGroup from './components/molecules/ToggleGroup.vue'

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
import PasswordField from './components/molecules/PasswordField.vue'
import SwitchField from './components/molecules/SwitchField.vue'
import SliderField from './components/molecules/SliderField.vue'
import FileUploadField from './components/molecules/FileUploadField.vue'

import FormFieldGroup from './components/molecules/FormFieldGroup.vue'

import * as accessibility from './utils/accessibility'
import { SurgeuiTheme, ThemeSymbol, flattenThemeToCSS } from './plugin/theme'

// Export des composants et de la fonction d'installation
export { Icon, Heading, Panel, Image, Avatar, AvatarGroup, Badge, Dialog, Progress, Spinner, Price }
export { Tabs, Accordion, AccordionItem, Alert, Card }
export { Link, LinkGroup, Button, ButtonGroup, Toggle, ToggleGroup, FloatButton, Dropdown }
export { Input, Textarea, SelectBox, RadioGroup, CheckboxGroup, FileUpload, Switch, Slider, Password }
export { InputField, SelectBoxField, RadioGroupField, CheckboxGroupField, PasswordField, SwitchField, FileUploadField, TextareaField, SliderField }
export { FormField, FormFieldGroup }
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

    // Injection globale du thème pour accès reactif dans les composants
    app.provide(ThemeSymbol, mergedTheme)

    // Génération et application des variables CSS personnalisées
    if (typeof document !== 'undefined') {
      const cssVariables = flattenThemeToCSS(mergedTheme)
      for (const [varName, value] of Object.entries(cssVariables)) {
        root.style.setProperty(varName, value)
      }
    }

    // ## Display Components
    app.component(`${prefix}Icon`, Icon)
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
    app.component(`${prefix}Price`, Price)
    app.component(`${prefix}Alert`, Alert)
    app.component(`${prefix}Card`, Card)

    // ## Action Components
    app.component(`${prefix}Button`, Button)
    app.component(`${prefix}ButtonGroup`, ButtonGroup)
    app.component(`${prefix}Link`, Link)
    app.component(`${prefix}LinkGroup`, LinkGroup)
    app.component(`${prefix}FloatButton`, FloatButton)
    app.component(`${prefix}Toggle`, Toggle)
    app.component(`${prefix}ToggleGroup`, ToggleGroup)
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
    app.component(`${prefix}PasswordField`, PasswordField)
    app.component(`${prefix}SwitchField`, SwitchField)
    app.component(`${prefix}SliderField`, SliderField)
    app.component(`${prefix}FileUploadField`, FileUploadField)
    
    // ...... FormFieldGroup container
    app.component(`${prefix}FormFieldGroup`, FormFieldGroup)
  }
}
export * from './composables'
export * from './types'