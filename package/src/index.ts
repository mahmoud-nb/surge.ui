import type { App } from 'vue'
// Styles globaux (tokens, thèmes, contraste, utilitaires) — émis une seule fois
import './styles/index.scss'

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
import Skeleton from './components/atoms/Skeleton.vue'
import Tooltip from './components/molecules/Tooltip.vue'
import Toast from './components/molecules/Toast.vue'
import Toaster from './components/organisms/Toaster.vue'
import Divider from './components/atoms/Divider.vue'
import Kbd from './components/atoms/Kbd.vue'
import VisuallyHidden from './components/atoms/VisuallyHidden.vue'
import Tag from './components/atoms/Tag.vue'
import EmptyState from './components/molecules/EmptyState.vue'
import Stepper from './components/molecules/Stepper.vue'
import ConfirmDialog from './components/organisms/ConfirmDialog.vue'
import DataTable from './components/organisms/DataTable.vue'
import TreeView from './components/molecules/TreeView.vue'
import CommandPalette from './components/organisms/CommandPalette.vue'

// ## Action Components .................................................
import Link from './components/atoms/Link.vue'
import Button from './components/atoms/Button.vue'
import Dropdown from './components/molecules/Dropdown.vue'
import LinkGroup from './components/molecules/LinkGroup.vue'
import ButtonGroup from './components/molecules/ButtonGroup.vue'
import Toggle from './components/atoms/Toggle.vue'
import FloatButton from './components/molecules/FloatButton.vue'
import ToggleGroup from './components/molecules/ToggleGroup.vue'
import Breadcrumb from './components/molecules/Breadcrumb.vue'
import Pagination from './components/molecules/Pagination.vue'

// ## Form Components ..................................................
import Input from './components/atoms/Input.vue'
import Textarea from './components/atoms/Textarea.vue'
import SelectBox from './components/atoms/SelectBox.vue'
import RadioGroup from './components/atoms/RadioGroup.vue'
import CheckboxGroup from './components/atoms/CheckboxGroup.vue'
import Checkbox from './components/atoms/Checkbox.vue'
import NumberInput from './components/atoms/NumberInput.vue'
import Autocomplete from './components/molecules/Autocomplete.vue'
import Calendar from './components/molecules/Calendar.vue'
import DatePicker from './components/molecules/DatePicker.vue'
import FileUpload from './components/atoms/FileUpload.vue'
import Switch from './components/atoms/Switch.vue'
import Slider from './components/atoms/Slider.vue'
import Password from './components/molecules/Password.vue'
import OtpInput from './components/molecules/OtpInput.vue'

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
import OtpInputField from './components/molecules/OtpInputField.vue'
import NumberInputField from './components/molecules/NumberInputField.vue'

import FormFieldGroup from './components/molecules/FormFieldGroup.vue'

// Templates (layouts)
import SingleColumnLayout from './components/templates/SingleColumnLayout.vue'
import SidebarLayout from './components/templates/SidebarLayout.vue'
import SplitLayout from './components/templates/SplitLayout.vue'
import HolyGrailLayout from './components/templates/HolyGrailLayout.vue'
import MagazineLayout from './components/templates/MagazineLayout.vue'
import GridLayout from './components/templates/GridLayout.vue'
import MasonryLayout from './components/templates/MasonryLayout.vue'
import HeroLayout from './components/templates/HeroLayout.vue'
import FullScreenLayout from './components/templates/FullScreenLayout.vue'

import * as accessibility from './utils/accessibility'
import { SurgeuiTheme, ThemeSymbol, flattenThemeToCSS } from './plugin/theme'
import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import { LocaleKey, defineLocale } from './composables/useLocale'
import { ToasterKey, createToaster } from './composables/useToast'
import { ConfirmerKey, createConfirmer } from './composables/useConfirm'
import { fr } from './locales/fr'
import type { SurgeLocale, SurgeLocaleInput } from './locales/types'

// Export des composants et de la fonction d'installation
export { Icon, Heading, Panel, Image, Avatar, AvatarGroup, Badge, Dialog, Progress, Spinner, Price }
export { Tabs, Accordion, AccordionItem, Alert, Card, Skeleton, Tooltip, Toast, Toaster }
export { Divider, Kbd, VisuallyHidden, Tag, EmptyState, Stepper, ConfirmDialog, DataTable, TreeView, CommandPalette }
export { Link, LinkGroup, Button, ButtonGroup, Toggle, ToggleGroup, FloatButton, Dropdown, Breadcrumb, Pagination }
export { Input, Textarea, SelectBox, RadioGroup, Checkbox, CheckboxGroup, NumberInput, Autocomplete, Calendar, DatePicker, FileUpload, Switch, Slider, Password, OtpInput }
export { InputField, SelectBoxField, RadioGroupField, CheckboxGroupField, PasswordField, SwitchField, FileUploadField, TextareaField, SliderField, OtpInputField, NumberInputField }
export { FormField, FormFieldGroup }
export { SingleColumnLayout, SidebarLayout, SplitLayout, HolyGrailLayout, MagazineLayout, GridLayout, MasonryLayout, HeroLayout, FullScreenLayout }
export { accessibility }
export { getPaginationItems } from './utils/pagination'
export type { PaginationItem, PaginationRangeOptions } from './utils/pagination'
export { parseDateInput, getFirstDayOfWeek } from './utils/date'

export interface SurgeUIOptions {
  prefix?: string
  theme?: SurgeuiTheme
  /**
   * Textes par défaut des composants (français sinon). Locale fournie
   * (`locales.en`), messages partiels, ou ref pour changer de langue.
   */
  locale?: MaybeRefOrGetter<SurgeLocale | SurgeLocaleInput | undefined>
}

const defaultTheme: SurgeuiTheme = {}

export default {
  install(app: App, options: SurgeUIOptions = {}) {
    const { prefix = 'Su', theme = {}, locale } = options
    const mergedTheme = { ...defaultTheme, ...theme }

    // Injection globale du thème pour accès reactif dans les composants
    app.provide(ThemeSymbol, mergedTheme)

    // Locale des textes par défaut (libellés, annonces)
    app.provide(LocaleKey, computed(() => defineLocale(fr, toValue(locale))))

    // File des toasts (useToast) : une par application
    app.provide(ToasterKey, createToaster())

    // Confirmations (useConfirm) : une file par application
    app.provide(ConfirmerKey, createConfirmer())

    // Génération et application des variables CSS personnalisées
    // (côté client uniquement : document n'existe pas en SSR)
    if (typeof document !== 'undefined') {
      const root = document.documentElement
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
    app.component(`${prefix}Skeleton`, Skeleton)
    app.component(`${prefix}Tooltip`, Tooltip)
    app.component(`${prefix}Toast`, Toast)
    app.component(`${prefix}Toaster`, Toaster)
    app.component(`${prefix}Divider`, Divider)
    app.component(`${prefix}Kbd`, Kbd)
    app.component(`${prefix}VisuallyHidden`, VisuallyHidden)
    app.component(`${prefix}Tag`, Tag)
    app.component(`${prefix}EmptyState`, EmptyState)
    app.component(`${prefix}Stepper`, Stepper)
    app.component(`${prefix}ConfirmDialog`, ConfirmDialog)
    app.component(`${prefix}DataTable`, DataTable)
    app.component(`${prefix}TreeView`, TreeView)
    app.component(`${prefix}CommandPalette`, CommandPalette)

    // ## Action Components
    app.component(`${prefix}Button`, Button)
    app.component(`${prefix}ButtonGroup`, ButtonGroup)
    app.component(`${prefix}Link`, Link)
    app.component(`${prefix}LinkGroup`, LinkGroup)
    app.component(`${prefix}FloatButton`, FloatButton)
    app.component(`${prefix}Toggle`, Toggle)
    app.component(`${prefix}ToggleGroup`, ToggleGroup)
    app.component(`${prefix}Dropdown`, Dropdown)
    app.component(`${prefix}Breadcrumb`, Breadcrumb)
    app.component(`${prefix}Pagination`, Pagination)

    // ## Form Components ...... Base fields
    app.component(`${prefix}Input`, Input)
    app.component(`${prefix}Textarea`, Textarea)
    app.component(`${prefix}SelectBox`, SelectBox)
    app.component(`${prefix}RadioGroup`, RadioGroup)
    app.component(`${prefix}Checkbox`, Checkbox)
    app.component(`${prefix}CheckboxGroup`, CheckboxGroup)
    app.component(`${prefix}NumberInput`, NumberInput)
    app.component(`${prefix}Autocomplete`, Autocomplete)
    app.component(`${prefix}Calendar`, Calendar)
    app.component(`${prefix}DatePicker`, DatePicker)
    app.component(`${prefix}FileUpload`, FileUpload)
    app.component(`${prefix}Switch`, Switch)
    app.component(`${prefix}Slider`, Slider)
    
    // ...... Advanced fields
    app.component(`${prefix}Password`, Password)
    app.component(`${prefix}OtpInput`, OtpInput)

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
    app.component(`${prefix}OtpInputField`, OtpInputField)
    app.component(`${prefix}NumberInputField`, NumberInputField)

    // ...... FormFieldGroup container
    app.component(`${prefix}FormFieldGroup`, FormFieldGroup)

    // ## Templates (layouts)
    app.component(`${prefix}SingleColumnLayout`, SingleColumnLayout)
    app.component(`${prefix}SidebarLayout`, SidebarLayout)
    app.component(`${prefix}SplitLayout`, SplitLayout)
    app.component(`${prefix}HolyGrailLayout`, HolyGrailLayout)
    app.component(`${prefix}MagazineLayout`, MagazineLayout)
    app.component(`${prefix}GridLayout`, GridLayout)
    app.component(`${prefix}MasonryLayout`, MasonryLayout)
    app.component(`${prefix}HeroLayout`, HeroLayout)
    app.component(`${prefix}FullScreenLayout`, FullScreenLayout)
  }
}
export * from './composables'
export * from './locales'
export * from './types'