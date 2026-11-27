import type { App, Component, Plugin } from 'vue'
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
import Popover from './components/molecules/Popover.vue'
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
import SkipLink from './components/atoms/SkipLink.vue'
import ThemeToggle from './components/molecules/ThemeToggle.vue'
import PageHeader from './components/molecules/PageHeader.vue'
import NavMenu from './components/organisms/NavMenu.vue'
import AppShell from './components/templates/AppShell.vue'
import CopyButton from './components/atoms/CopyButton.vue'
import Rating from './components/atoms/Rating.vue'
import Prose from './components/atoms/Prose.vue'
import CodeBlock from './components/molecules/CodeBlock.vue'
import Stat from './components/molecules/Stat.vue'
import Timeline from './components/organisms/Timeline.vue'

import * as accessibility from './utils/accessibility'
import { SurgeuiTheme, ThemeSymbol, flattenThemeToCSS } from './plugin/theme'
import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import { LocaleKey, createDocumentLocale, defineLocale } from './composables/useLocale'
import { LinkComponentKey } from './composables/useLinkComponent'
import { ToasterKey, createToaster } from './composables/useToast'
import { ConfirmerKey, createConfirmer } from './composables/useConfirm'
import { fr } from './locales/fr'
import type { SurgeLocale, SurgeLocaleInput } from './locales/types'

// Export des composants et de la fonction d'installation
export { Icon, Heading, Panel, Image, Avatar, AvatarGroup, Badge, Dialog, Progress, Spinner, Price }
export { Tabs, Accordion, AccordionItem, Alert, Card, Skeleton, Tooltip, Popover, Toast, Toaster }
export { Divider, Kbd, VisuallyHidden, Tag, EmptyState, Stepper, ConfirmDialog, DataTable, TreeView, CommandPalette }
export { Link, LinkGroup, Button, ButtonGroup, Toggle, ToggleGroup, FloatButton, Dropdown, Breadcrumb, Pagination }
export { Input, Textarea, SelectBox, RadioGroup, Checkbox, CheckboxGroup, NumberInput, Autocomplete, Calendar, DatePicker, FileUpload, Switch, Slider, Password, OtpInput }
export { InputField, SelectBoxField, RadioGroupField, CheckboxGroupField, PasswordField, SwitchField, FileUploadField, TextareaField, SliderField, OtpInputField, NumberInputField }
export { FormField, FormFieldGroup }
export { SingleColumnLayout, SidebarLayout, SplitLayout, HolyGrailLayout, MagazineLayout, GridLayout, MasonryLayout, HeroLayout, FullScreenLayout }
export { SkipLink, ThemeToggle, PageHeader, NavMenu, AppShell }
export { CopyButton, CodeBlock, Stat, Timeline, Rating, Prose }
export { accessibility }
export { getPaginationItems } from './utils/pagination'
export type { PaginationItem, PaginationRangeOptions } from './utils/pagination'
export { parseDateInput, getFirstDayOfWeek } from './utils/date'

/**
 * Composants enregistrés par le plugin, par nom sans préfixe. Les types
 * globaux (`@surgeui/vue/global`) en découlent ; l'objet `components`
 * ci-dessous doit avoir exactement ces clés (sinon erreur de compilation).
 */
export interface SurgeComponents {
  Icon: typeof Icon
  Heading: typeof Heading
  Panel: typeof Panel
  Badge: typeof Badge
  Dialog: typeof Dialog
  Image: typeof Image
  Avatar: typeof Avatar
  AvatarGroup: typeof AvatarGroup
  Tabs: typeof Tabs
  Accordion: typeof Accordion
  AccordionItem: typeof AccordionItem
  Progress: typeof Progress
  Spinner: typeof Spinner
  Price: typeof Price
  Alert: typeof Alert
  Card: typeof Card
  Skeleton: typeof Skeleton
  Tooltip: typeof Tooltip
  Popover: typeof Popover
  Toast: typeof Toast
  Toaster: typeof Toaster
  Divider: typeof Divider
  Kbd: typeof Kbd
  VisuallyHidden: typeof VisuallyHidden
  Tag: typeof Tag
  EmptyState: typeof EmptyState
  Stepper: typeof Stepper
  ConfirmDialog: typeof ConfirmDialog
  DataTable: typeof DataTable
  TreeView: typeof TreeView
  CommandPalette: typeof CommandPalette
  Button: typeof Button
  ButtonGroup: typeof ButtonGroup
  Link: typeof Link
  LinkGroup: typeof LinkGroup
  FloatButton: typeof FloatButton
  Toggle: typeof Toggle
  ToggleGroup: typeof ToggleGroup
  Dropdown: typeof Dropdown
  Breadcrumb: typeof Breadcrumb
  Pagination: typeof Pagination
  Input: typeof Input
  Textarea: typeof Textarea
  SelectBox: typeof SelectBox
  RadioGroup: typeof RadioGroup
  Checkbox: typeof Checkbox
  CheckboxGroup: typeof CheckboxGroup
  NumberInput: typeof NumberInput
  Autocomplete: typeof Autocomplete
  Calendar: typeof Calendar
  DatePicker: typeof DatePicker
  FileUpload: typeof FileUpload
  Switch: typeof Switch
  Slider: typeof Slider
  Password: typeof Password
  OtpInput: typeof OtpInput
  FormField: typeof FormField
  InputField: typeof InputField
  TextareaField: typeof TextareaField
  SelectBoxField: typeof SelectBoxField
  RadioGroupField: typeof RadioGroupField
  CheckboxGroupField: typeof CheckboxGroupField
  PasswordField: typeof PasswordField
  SwitchField: typeof SwitchField
  SliderField: typeof SliderField
  FileUploadField: typeof FileUploadField
  OtpInputField: typeof OtpInputField
  NumberInputField: typeof NumberInputField
  FormFieldGroup: typeof FormFieldGroup
  SingleColumnLayout: typeof SingleColumnLayout
  SidebarLayout: typeof SidebarLayout
  SplitLayout: typeof SplitLayout
  HolyGrailLayout: typeof HolyGrailLayout
  MagazineLayout: typeof MagazineLayout
  GridLayout: typeof GridLayout
  MasonryLayout: typeof MasonryLayout
  HeroLayout: typeof HeroLayout
  FullScreenLayout: typeof FullScreenLayout
  // Structure d'application (4.0)
  SkipLink: typeof SkipLink
  ThemeToggle: typeof ThemeToggle
  PageHeader: typeof PageHeader
  NavMenu: typeof NavMenu
  AppShell: typeof AppShell
  // Données et contenu (4.0)
  CopyButton: typeof CopyButton
  CodeBlock: typeof CodeBlock
  Stat: typeof Stat
  Timeline: typeof Timeline
  Rating: typeof Rating
  Prose: typeof Prose
}

// Enregistrés sous le préfixe choisi (`Su` par défaut)
const components: SurgeComponents = {
  // ## Display Components
  Icon, Heading, Panel, Badge, Dialog, Image, Avatar, AvatarGroup, Tabs, Accordion, AccordionItem,
  Progress, Spinner, Price, Alert, Card, Skeleton, Tooltip, Popover, Toast, Toaster, Divider, Kbd,
  VisuallyHidden, Tag, EmptyState, Stepper, ConfirmDialog, DataTable, TreeView, CommandPalette,
  // ## Action Components
  Button, ButtonGroup, Link, LinkGroup, FloatButton, Toggle, ToggleGroup, Dropdown, Breadcrumb, Pagination,
  // ## Form Components : champs de base, champs avancés
  Input, Textarea, SelectBox, RadioGroup, Checkbox, CheckboxGroup, NumberInput, Autocomplete, Calendar,
  DatePicker, FileUpload, Switch, Slider, Password, OtpInput,
  // ...... avec FormField, et leur conteneur
  FormField, InputField, TextareaField, SelectBoxField, RadioGroupField, CheckboxGroupField, PasswordField,
  SwitchField, SliderField, FileUploadField, OtpInputField, NumberInputField, FormFieldGroup,
  // ## Templates (layouts)
  SingleColumnLayout, SidebarLayout, SplitLayout, HolyGrailLayout, MagazineLayout, GridLayout,
  MasonryLayout, HeroLayout, FullScreenLayout,
  // ## Structure d'application
  SkipLink, ThemeToggle, PageHeader, NavMenu, AppShell,
  // ## Données et contenu
  CopyButton, CodeBlock, Stat, Timeline, Rating, Prose
}

/**
 * Composants globaux sous un préfixe, pour typer les templates :
 * `declare module 'vue' { interface GlobalComponents extends SurgeGlobalComponents<'Ui'> {} }`.
 * Pour le préfixe par défaut, ajouter `@surgeui/vue/global` aux `types` du tsconfig.
 */
export type SurgeGlobalComponents<Prefix extends string = 'Su'> = {
  [Name in keyof SurgeComponents as `${Prefix}${Name}`]: SurgeComponents[Name]
}

export interface SurgeUIOptions {
  prefix?: string
  theme?: SurgeuiTheme
  /**
   * Textes par défaut des composants (français sinon). Locale fournie
   * (`locales.en`), messages partiels, ou ref pour changer de langue.
   * `'auto'` : suit `<html lang>` (fr, en, ar ; anglais pour les autres
   * langues et en rendu serveur).
   */
  locale?: 'auto' | MaybeRefOrGetter<SurgeLocale | SurgeLocaleInput | undefined>
  /**
   * Composant des liens `to` (Button, Link, Breadcrumb, Dropdown, Tabs) :
   * NuxtLink ou un composant maison. Par défaut : RouterLink s'il est
   * enregistré, sinon un simple <a href>.
   */
  linkComponent?: Component | string
  /**
   * Composants à enregistrer globalement, sous le préfixe : `{ Button, Dialog }`.
   * Avec `createSurgeUI`, seuls ceux-ci entrent dans le bundle ; le plugin
   * par défaut (`app.use(SurgeUI)`) les enregistre tous.
   */
  components?: Partial<SurgeComponents>
}

const defaultTheme: SurgeuiTheme = {}

const install = (app: App, options: SurgeUIOptions, registered: Partial<SurgeComponents>) => {
  const { prefix = 'Su', theme = {}, locale, linkComponent } = options
  const mergedTheme = { ...defaultTheme, ...theme }

  // Injection globale du thème pour accès reactif dans les composants
  app.provide(ThemeSymbol, mergedTheme)

  // Locale des textes par défaut (libellés, annonces)
  if (locale === 'auto') {
    const documentLocale = createDocumentLocale()
    app.provide(LocaleKey, documentLocale.locale)
    app.onUnmount(documentLocale.stop)
  } else {
    app.provide(LocaleKey, computed(() => defineLocale(fr, toValue(locale))))
  }

  // Composant des liens `to` (RouterLink par défaut)
  if (linkComponent) app.provide(LinkComponentKey, linkComponent)

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

  // Enregistrement global sous le préfixe (SuButton, SuDialog…)
  for (const [name, component] of Object.entries(registered)) {
    if (component) app.component(`${prefix}${name}`, component as Component)
  }
}

/**
 * Plugin à la carte : locale, liens, toasts, confirmations et thème, sans
 * enregistrer d'office tous les composants. Seuls ceux de `components` sont
 * enregistrés ; les autres s'importent par leur nom (`import { Button }`)
 * ou à l'usage avec `@surgeui/vue/resolver`, et restent hors du bundle
 * s'ils ne servent pas.
 *
 * @example
 * app.use(createSurgeUI({ locale: 'auto', components: { Button, Dialog } }))
 */
export function createSurgeUI(options: SurgeUIOptions = {}): Plugin {
  return {
    install: (app: App) => install(app, options, options.components ?? {})
  }
}

/** Plugin complet : enregistre tous les composants (ou seulement ceux de `components`) */
export default {
  install(app: App, options: SurgeUIOptions = {}) {
    install(app, options, options.components ?? components)
  }
}
export * from './composables'
export * from './locales'
export * from './types'