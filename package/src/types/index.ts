import type { Component, Ref } from "vue";
// Types globaux utilisés dans plusieurs composants
export type Variant = 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'ghost' | 'link'
export type Size = 'sm' | 'md' | 'lg'
export type State = 'default' | 'error' | 'success' | 'warning'
export type Radius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
export type Gap = 'none' | 'sm' | 'md' | 'lg'
export type Orientation = 'horizontal' | 'vertical'
export type TextAlign = 'default' | 'left' | 'center' | 'right'
export type LinkTarget = '_blank' | '_self' | '_parent' | '_top'

// HTML natifs attributes
export type HTMLNativeProps = {
  autocomplete?: string
  min?: number | string
  max?: number | string
  step?: number | string
  minLength?: number
  maxLength?: number
  pattern?: string
}

// Types pour l'accessibilité
export interface AccessibilityProps {
  ariaLabel?: string
  ariaLabelledBy?: string
  ariaDescribedBy?: string
  ariaHidden?: boolean
  ariaInvalid?: boolean
  ariaRequired?: boolean
  ariaValueText?: string
  role?: string
  tabIndex?: number
}

// --- ATOMS ---

// Avatar.vue
export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type AvatarVariant = 'circle' | 'rounded' | 'square';
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away' | 'none';
export interface AvatarProps extends AccessibilityProps {
  src?: string;
  alt?: string;
  fallback?: string;
  name?: string;
  size?: AvatarSize;
  variant?: AvatarVariant;
  status?: AvatarStatus;
  badge?: string | number;
  badgeProps?: BadgeProps;
  badgeColor?: string;
  loading?: boolean;
  loadingLabel?: string;
  clickable?: boolean;
}

// Badge.vue
export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
export interface BadgeProps extends AccessibilityProps {
  variant?: BadgeVariant;
  size?: Size;
  radius?: Radius;
  icon?: Component;
  iconDisplay?: 'left' | 'right' | 'only';
  color?: string;
  backgroundColor?: string;
}

// Button.vue
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'custom';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonRadius = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ButtonType = 'button' | 'submit' | 'reset';
export interface ButtonProps extends AccessibilityProps {
  /** Type natif du bouton. Par défaut 'button' pour ne pas soumettre un formulaire involontairement */
  type?: ButtonType;
  variant?: ButtonVariant;
  size?: ButtonSize;
  radius?: ButtonRadius;
  disabled?: boolean;
  loading?: boolean;
  loadingLabel?: string;
  block?: boolean;
  icon?: Component;
  iconDisplay?: 'left' | 'right' | 'only';
  ariaExpanded?: boolean;
  ariaPressed?: boolean;
}

// CheckboxGroup.vue
export type CheckboxDisplayType = 'default' | 'inline-card' | 'block-card';
export interface CheckboxOption {
  value: string | number;
  label: string;
  description?: string;
  disabled?: boolean;
  icon?: Component;
}
export interface CheckboxGroupProps extends AccessibilityProps {
  /** Nom des cases, pour la soumission native du formulaire */
  name?: string;
  options: CheckboxOption[];
  value?: (string | number)[];
  size?: Size;
  state?: State;
  disabled?: boolean;
  required?: boolean;
  displayType?: CheckboxDisplayType;
  label?: string;
  message?: string;
  direction?: 'horizontal' | 'vertical';
  maxSelections?: number;
  maxHeight?: string | null;
}

// FileUpload.vue
export interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress?: number;
  error?: string;
  preview?: string;
}
export type FileUploadSize = 'sm' | 'md' | 'lg';
export type FileUploadState = 'default' | 'error' | 'success' | 'warning';
export type FileUploadVariant = 'default' | 'dashed' | 'solid' | 'minimal';
export interface BaseFileUploadProps extends AccessibilityProps {
  value?: UploadedFile[];
  variant?: FileUploadVariant;
  multiple?: boolean;
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  size?: FileUploadSize;
  state?: FileUploadState;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  label?: string;
  message?: string;
  placeholder?: string;
  dragText?: string;
  browseText?: string;
  loadingText?: string;
  loadingSubText?: string;
  allowPreview?: boolean;
  showFileList?: boolean;
  ariaInvalid?: boolean;
  ariaRequired?: boolean;
  showProgress?: boolean;
  loading?: boolean;
}

// FormField.vue
export interface FormFieldProps {
  fieldId?: string;
  label?: string;
  message?: string;
  size?: Size;
  state?: State;
  required?: boolean;
  disabled?: boolean;
  requiredText?: string;
}

// Heading.vue
export interface HeadingProps {
  level?: number | string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  truncate?: boolean;
}

// Icon.vue
export interface IconProps {
  name: string
  variant?: 'solid' | 'outline'
  size?: number | string
  color?: string
  ariaLabel?: string
  decorative?: boolean
  class?: string
}

// Image.vue
export interface ImageSource {
  srcset: string;
  type?: string;
  media?: string;
}
export type ImageRatio = 'auto' | '16/9' | '4/3' | '1/1' | number;
export type ImageFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
export type ImagePosition = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export interface ImageProps extends AccessibilityProps {
  src: string;
  alt: string;
  fallback?: string;
  sources?: ImageSource[];
  ratio?: ImageRatio;
  fit?: ImageFit;
  position?: ImagePosition;
  lazy?: boolean;
  loading?: 'eager' | 'lazy';
  width?: string | number;
  height?: string | number;
  placeholder?: boolean;
  placeholderColor?: string;
  loadingAriaLabel?: string;
  errorAriaLabel?: string;
  errorText?: string;
}

// Input.vue
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week';
export interface InputProps extends AccessibilityProps {
  name?: string;
  type?: InputType;
  size?: Size;
  state?: State;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  prefixIcon?: Component;
  suffixIcon?: Component;
  prefixLabel?: string;
  prefixIconLabel?: string;
  suffixLabel?: string;
  suffixIconLabel?: string;
  textAlign?: TextAlign;
  // HTML native attributes
  autocomplete?: string;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

// Link.vue
export type LinkVariant = 'default' | 'primary' | 'secondary' | 'muted' | 'custom';
export type LinkSize = 'sm' | 'md' | 'lg';
export type LinkUnderline = 'default' | 'always' | 'hover' | 'never';
export interface LinkProps extends AccessibilityProps {
  href?: string;
  to?: string | object;
  target?: LinkTarget;
  rel?: string;
  variant?: LinkVariant;
  size?: LinkSize;
  block?: boolean;
  underline?: LinkUnderline;
  disabled?: boolean;
  icon?: Component;
  iconDisplay?: 'top' | 'left' | 'right' | 'only';
  external?: boolean;
  /** Texte lu par les lecteurs d'écran quand le lien s'ouvre dans un nouvel onglet */
  externalLabel?: string;
}

// Panel.vue
export interface PanelProps {
  tag?: 'div' | 'section' | 'article' | 'aside' | 'header' | 'footer';
  radius?: Radius;
  bordered?: boolean;
  elevated?: boolean;
  variant?: 'default' | 'subtle' | 'highlight';
}

// Progress.vue
// --- interface Props supprimée, voir types spécifiques ci-dessus ---

// RadioGroup.vue
export type RadioDisplayType = 'default' | 'inline-card' | 'block-card';
export interface RadioOption {
  value: string | number;
  label: string;
  description?: string;
  disabled?: boolean;
  icon?: Component;
}
export interface RadioGroupProps extends AccessibilityProps {
  options: RadioOption[];
  value?: string | number;
  name?: string;
  size?: Size;
  state?: State;
  disabled?: boolean;
  required?: boolean;
  displayType?: RadioDisplayType;
  label?: string;
  message?: string;
  direction?: 'horizontal' | 'vertical';
  maxHeight?: string | null;
}

// SelectBox.vue
export interface SelectGroup {
  label: string;
  options: SelectOption[];
}
export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  group?: string;
  icon?: Component;
  description?: string;
}
export interface SelectBoxProps extends AccessibilityProps {
  options?: SelectOption[];
  groups?: SelectGroup[];
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  size?: Size;
  state?: State;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  noOptionsText?: string;
  noResultsText?: string;
  maxHeight?: string;
  textAlign?: TextAlign;
  ariaInvalid?: boolean;
  ariaRequired?: boolean;
  maxSelectedItems?: number;
  closeOnSelect?: boolean;
  loading?: boolean;
}

// Slider.vue
export interface SliderProps extends AccessibilityProps {
  min?: number;
  max?: number;
  step?: number;
  size?: Size;
  state?: State;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  orientation?: Orientation;
  tooltip?: 'none' | 'top' | 'bottom';
  marks?: number[];
  showValue?: boolean;
  showTicks?: boolean;
  showLabels?: boolean;
  formatValue?: (value: number) => string;
  label?: string;
  message?: string;
  ariaInvalid?: boolean;
  ariaRequired?: boolean;
  ariaValueText?: string;
}

// Spinner.vue
export interface SpinnerProps {
  size?: number | string;
  fill?: string;
  label?: string;
  showLabel?: boolean;
  type?: 'classic' | 'dots' | 'pulse' | 'bars' | 'modern';
  color?: string;
  thickness?: number;
  speed?: number;
}

// Price.vue
export type PriceVariant = 'default' | 'highlight' | 'muted'
export type PriceSize = 'sm' | 'md' | 'lg'
export type CurrencyDisplay = 'symbol' | 'narrowSymbol' | 'code' | 'name'
export type CurrencyPosition = 'prefix' | 'suffix' | 'auto'

export interface PriceProps extends AccessibilityProps {
  /** Montant numérique à afficher */
  amount: number
  /** Montant original pour affichage barré (promotion) */
  originalAmount?: number
  /** Code devise ISO 4217 (ex: 'EUR', 'USD', 'GBP') */
  currency?: string
  /** Locale BCP 47 (ex: 'fr-FR', 'en-US') */
  locale?: string
  /** Variante visuelle */
  variant?: PriceVariant
  /** Taille */
  size?: PriceSize
  /** Afficher uniquement la partie entière */
  integerOnly?: boolean
  /** Afficher le prix original barré (nécessite originalAmount) */
  showOriginal?: boolean
  /** Format d'affichage de la devise */
  currencyDisplay?: CurrencyDisplay
  /** Position du symbole de devise */
  currencyPosition?: CurrencyPosition
  /** Formatter personnalisé (pattern Progress/Slider) */
  formatValue?: (amount: number) => string
  /** Décimales en exposant (style e-commerce) */
  superscriptDecimals?: boolean
}

// Checkbox.vue
// La valeur cochée passe par v-model (defineModel), l'état mixte par v-model:indeterminate
export interface CheckboxProps extends AccessibilityProps {
  /** Libellé affiché à côté de la case (ou slot par défaut) */
  label?: string;
  /** Texte d'aide sous le libellé (ou slot `description`) */
  description?: string;
  /** Valeur envoyée avec le formulaire quand la case est cochée */
  value?: string | number;
  name?: string;
  size?: Size;
  state?: State;
  displayType?: CheckboxDisplayType;
  disabled?: boolean;
  required?: boolean;
}

// Skeleton.vue
export type SkeletonVariant = 'text' | 'circle' | 'rect';
export interface SkeletonProps {
  variant?: SkeletonVariant;
  /** Largeur CSS (ex. '12rem', '60%') ; diamètre pour `circle` */
  width?: string;
  /** Hauteur CSS ; par défaut une ligne de texte, ou la largeur pour `circle` */
  height?: string;
  /** Nombre de lignes (variante `text`) : la dernière est plus courte */
  lines?: number;
  /** Pulsation (désactivée avec prefers-reduced-motion) */
  animated?: boolean;
  radius?: Radius;
}

// Divider.vue
export type DividerVariant = 'solid' | 'dashed';
export interface DividerProps {
  orientation?: Orientation;
  variant?: DividerVariant;
  /** Texte au milieu du trait (ou slot par défaut), horizontal seulement */
  label?: string;
  labelAlign?: 'start' | 'center' | 'end';
  /** Espace autour du trait */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  /** Trait purement visuel : pas de role="separator" */
  decorative?: boolean;
}

// Kbd.vue
export interface KbdProps {
  /** Touches d'un raccourci (ex. ['Ctrl', 'K']) ; sinon slot par défaut */
  keys?: string[];
  /** Séparateur affiché entre les touches */
  separator?: string;
  size?: Size;
}

// VisuallyHidden.vue
export interface VisuallyHiddenProps {
  /** Élément rendu (défaut : span) */
  as?: string;
  /** Redevient visible quand il reçoit le focus (lien d'évitement) */
  focusable?: boolean;
}

// Tag.vue
export type TagVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
export interface TagProps {
  label?: string;
  variant?: TagVariant;
  size?: Size;
  icon?: Component;
  /** Bouton de retrait (événement `remove`) */
  removable?: boolean;
  /** Nom du bouton de retrait (défaut : « Retirer {label} ») */
  removeLabel?: string;
  disabled?: boolean;
}

// NumberInput.vue
// La valeur (number | null) passe par v-model (defineModel)
export interface NumberInputProps extends AccessibilityProps {
  min?: number;
  max?: number;
  step?: number;
  /** Pas de Page précédente / suivante (défaut : 10 × step) */
  largeStep?: number;
  /** Décimales conservées (défaut : celles de `step`) */
  precision?: number;
  /** Format d'affichage Intl.NumberFormat (devise, unité, pourcentage…) */
  formatOptions?: Intl.NumberFormatOptions;
  /** Langue du format (défaut : locale des composants) */
  locale?: string;
  /** Boutons − / + (défaut : true) */
  controls?: boolean;
  name?: string;
  placeholder?: string;
  size?: Size;
  state?: State;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  incrementLabel?: string;
  decrementLabel?: string;
}

// Toggle.vue
export type ToggleVariant = 'default' | 'outline' | 'ghost'
export interface ToggleProps extends AccessibilityProps {
  label?: string
  icon?: Component
  activeIcon?: Component
  size?: Size
  variant?: ToggleVariant
  radius?: Radius
  disabled?: boolean
}

// Switch.vue
export interface SwitchProps extends AccessibilityProps {
  leftLabel?: string;
  rightLabel?: string;
  leftIcon?: Component;
  rightIcon?: Component;
  /** Marge entre la pastille et le bord de la piste (true par défaut). `false` : pastille au ras de la piste */
  padded?: boolean;
  size?: Size;
  state?: State;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
}

// Textarea.vue
export interface TextareaProps extends AccessibilityProps {
  size?: Size;
  state?: State;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  placeholder?: string;
  value?: string;
  rows?: number;
  minRows?: number;
  maxRows?: number;
  maxLength?: number;
  showCounter?: boolean;
  autoResize?: boolean;
  autocomplete?: string;
  spellcheck?: boolean;
  wrap?: 'soft' | 'hard' | 'off';
}

// Progress.vue

export interface ProgressProps {
  modelValue?: number
  min?: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  color?: string
  backgroundColor?: string
  state?: 'default' | 'error' | 'success' | 'warning'
  showLabel?: boolean
  formatValue?: (value: number) => string
  indeterminate?: boolean
  indeterminateLabel?: string
}

// --- MOLECULES ---

// AccordionItem.vue
export interface AccordionContext {
  multiple: boolean;
  level: number;
  /** Items regroupés dans un seul cadre (prop `attached` de l'Accordion) */
  attached: Readonly<Ref<boolean>>;
  isItemOpen: (id: string | number) => boolean;
  toggleItem: (id: string | number, item: any) => void;
  registerItem: (id: string | number, isDisabled?: () => boolean) => void;
  unregisterItem: (id: string | number) => void;
}
export interface AccordionItemProps {
  id?: string;
  title?: string;
  content?: string;
  open?: boolean;
  disabled?: boolean;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

// ButtonGroup.vue
export interface ButtonGroupProps extends AccessibilityProps {
  gap?: 'sm' | 'md' | 'lg' | 'none';
  size?: ButtonSize;
  variant?: ButtonVariant;
}

// ToggleGroup.vue
export type ToggleGroupMode = 'exclusive' | 'multi'
export interface ToggleGroupItem {
  value: string | number
  label?: string
  icon?: Component
  activeIcon?: Component
  disabled?: boolean
}
export interface ToggleGroupProps extends AccessibilityProps {
  items: ToggleGroupItem[]
  mode?: ToggleGroupMode
  size?: Size
  variant?: ToggleVariant
  radius?: Radius
  gap?: Gap
  orientation?: Orientation
  disabled?: boolean
}

// AvatarGroup.vue
export interface AvatarGroupProps extends AccessibilityProps {
  avatars: AvatarProps[];
  size?: AvatarSize;
  variant?: AvatarVariant;
  max?: number;
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  clickable?: boolean;
}

// Dropdown.vue
export interface DropdownOption {
  value: string | number;
  label: string;
  href?: string;
  target?: LinkTarget;
  rel?: string;
  disabled?: boolean;
  icon?: Component;
  description?: string;
  separator?: boolean;
}
export type DropdownTrigger = 'click' | 'hover';
export type DropdownPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';
export interface DropdownProps extends AccessibilityProps {
  options: DropdownOption[];
  trigger?: DropdownTrigger;
  placement?: DropdownPlacement;
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  loadingLabel?: string;
  icon?: Component;
  iconDisplay?: 'left' | 'right' | 'only';
  label?: string;
  closeOnSelect?: boolean;
  maxHeight?: string;
}

// FloatButton.vue
export interface FloatButtonOffset {
  x?: number;
  y?: number;
}
export type FloatButtonPosition = 'left' | 'right';
export type FloatButtonSize = 'sm' | 'md' | 'lg';
export interface FloatButtonProps extends AccessibilityProps {
  position?: FloatButtonPosition;
  offset?: FloatButtonOffset;
  size?: FloatButtonSize;
  icon?: Component;
  label?: string;
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
  badge?: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  zIndex?: number;
  hideOnScroll?: boolean;
  showTooltip?: boolean;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
}

// Popover.vue
export type PopoverPlacement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';
export type PopoverTrigger = 'click' | 'hover' | 'focus' | 'manual';
export interface PopoverProps {
  modelValue?: boolean;
  placement?: PopoverPlacement;
  trigger?: PopoverTrigger;
  showArrow?: boolean;
  closable?: boolean;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  modal?: boolean;
  closeOnBackdropClick?: boolean;
  disabled?: boolean;
  openDelay?: number;
  closeDelay?: number;
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  closeAriaLabel?: string;
}

// Tooltip.vue
// L'ouverture passe par v-model (defineModel), facultatif
export interface TooltipProps {
  /** Texte de l'infobulle (ou slot `content`) */
  content?: string;
  placement?: PopoverPlacement;
  /** Délai avant l'ouverture au survol (ms) ; immédiate au focus clavier */
  openDelay?: number;
  /** Délai avant la fermeture (ms) : laisse le temps d'amener le pointeur sur l'infobulle */
  closeDelay?: number;
  showArrow?: boolean;
  disabled?: boolean;
}

// Breadcrumb.vue
export interface BreadcrumbItem {
  label: string;
  href?: string;
  target?: LinkTarget;
  icon?: Component;
  /** Icône seule : le libellé reste lu par les lecteurs d'écran */
  iconOnly?: boolean;
}
export type BreadcrumbSeparator = 'chevron' | 'slash' | 'dot';
export interface BreadcrumbProps extends AccessibilityProps {
  items?: BreadcrumbItem[];
  separator?: BreadcrumbSeparator;
  /** Au-delà, les éléments du milieu sont repliés derrière un bouton « … » */
  maxItems?: number;
  size?: Size;
  /** Nom du bouton qui déplie le chemin */
  expandLabel?: string;
}

// Pagination.vue
// La page courante (1 à n) passe par v-model (defineModel)
export interface PaginationProps extends AccessibilityProps {
  /** Nombre total d'éléments (avec pageSize) */
  total?: number;
  pageSize?: number;
  /** Nombre de pages, prioritaire sur total / pageSize */
  pageCount?: number;
  /** Pages affichées de part et d'autre de la page courante */
  siblings?: number;
  /** Pages toujours affichées au début et à la fin */
  boundaries?: number;
  /** Boutons première / dernière page */
  showEdges?: boolean;
  size?: Size;
  disabled?: boolean;
  previousLabel?: string;
  nextLabel?: string;
  firstLabel?: string;
  lastLabel?: string;
  /** Nom accessible d'un bouton de page (défaut : « Page {page} ») */
  pageLabel?: (page: number) => string;
}

// Toast.vue
export type ToastType = 'success' | 'warning' | 'error' | 'info' | 'neutral';
export interface ToastAction {
  label: string;
  onClick: () => void;
}
export interface ToastProps {
  type?: ToastType;
  title?: string;
  description?: string;
  dismissible?: boolean;
  /** Durée d'affichage (ms) ; 0 = jusqu'à fermeture */
  duration?: number;
  /** Suspend le compte à rebours (survol, focus, onglet masqué) */
  paused?: boolean;
  action?: ToastAction;
  dismissLabel?: string;
}

// EmptyState.vue
export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: Component;
  /** Niveau du titre dans la page (défaut : 3) */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  size?: Size;
  /** Cadre en pointillés (zone vide à remplir) */
  bordered?: boolean;
}

// Stepper.vue
// L'étape courante (index à partir de 0) passe par v-model (defineModel)
export type StepStatus = 'complete' | 'current' | 'upcoming' | 'error';
export interface StepItem {
  label: string;
  description?: string;
  /** Étape en erreur (à corriger) */
  error?: boolean;
  disabled?: boolean;
  icon?: Component;
}
export interface StepperProps extends AccessibilityProps {
  steps?: StepItem[];
  orientation?: Orientation;
  /** Étapes franchies cliquables (retour en arrière) */
  clickable?: boolean;
  /** Avec `clickable`, false rend aussi les étapes suivantes cliquables */
  linear?: boolean;
  size?: Size;
}

// Autocomplete.vue
// Le texte saisi passe par v-model (defineModel)
export interface AutocompleteOption {
  label: string;
  value?: string | number;
  description?: string;
  icon?: Component;
  disabled?: boolean;
}
export interface AutocompleteProps extends AccessibilityProps {
  /** Suggestions (un texte seul devient le libellé) */
  options?: (string | AutocompleteOption)[];
  /** Filtre local selon la saisie (défaut) ; false pour des suggestions déjà filtrées (serveur) */
  filter?: boolean | ((option: AutocompleteOption, query: string) => boolean);
  /** Caractères saisis avant d'ouvrir la liste */
  minChars?: number;
  /** Ouvre la liste au focus */
  openOnFocus?: boolean;
  /** Recherche en cours (suggestions asynchrones) */
  loading?: boolean;
  clearable?: boolean;
  name?: string;
  placeholder?: string;
  size?: Size;
  state?: State;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  maxHeight?: string;
  noResultsText?: string;
  loadingText?: string;
  clearLabel?: string;
}

// Calendar.vue
// Le jour choisi (Date | null) passe par v-model (defineModel)
export interface CalendarProps {
  min?: Date;
  max?: Date;
  /** Jours non sélectionnables (week-ends, jours fériés…) */
  isDateDisabled?: (date: Date) => boolean;
  /** Langue des noms de mois et de jours (défaut : locale des composants) */
  locale?: string;
  /** Premier jour de la semaine, 0 = dimanche (défaut : selon la langue) */
  weekStartsOn?: number;
  previousMonthLabel?: string;
  nextMonthLabel?: string;
}

// DatePicker.vue
// La date (Date | null) passe par v-model (defineModel)
export interface DatePickerProps extends AccessibilityProps {
  min?: Date;
  max?: Date;
  isDateDisabled?: (date: Date) => boolean;
  locale?: string;
  weekStartsOn?: number;
  name?: string;
  /** Défaut : format attendu (« jj/mm/aaaa ») */
  placeholder?: string;
  size?: Size;
  state?: State;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  /** Nom du bouton qui ouvre le calendrier */
  openLabel?: string;
}

// TreeView.vue
// Éléments dépliés (v-model:expanded) et élément choisi (v-model:selected)
export interface TreeItem {
  id: string | number;
  label: string;
  children?: TreeItem[];
  icon?: Component;
  disabled?: boolean;
}
export interface TreeViewProps extends AccessibilityProps {
  items?: TreeItem[];
  /** Un élément peut être choisi (aria-selected) ; false : arbre de navigation */
  selectable?: boolean;
  size?: Size;
}

// CommandPalette.vue
// L'ouverture passe par v-model:open (defineModel)
export interface CommandItem {
  id: string;
  label: string;
  /** Groupe d'affichage (« Navigation », « Actions »…) */
  group?: string;
  description?: string;
  icon?: Component;
  /** Raccourci affiché (ex. ['Ctrl', 'N']) */
  shortcut?: string[];
  /** Termes de recherche supplémentaires */
  keywords?: string[];
  disabled?: boolean;
  onSelect?: () => void;
}
export interface CommandPaletteProps {
  commands?: CommandItem[];
  placeholder?: string;
  /** Touche du raccourci global avec Ctrl / ⌘ (défaut : 'k') ; false : aucun */
  hotkey?: string | false;
  emptyText?: string;
  ariaLabel?: string;
}

// FileUploadField.vue — mirrors BaseFileUploadProps for the field wrapper variant
export interface FileUploadFieldProps extends AccessibilityProps {
  value?: UploadedFile[];
  variant?: FileUploadVariant;
  multiple?: boolean;
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  size?: FileUploadSize;
  state?: FileUploadState;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  label?: string;
  message?: string;
  placeholder?: string;
  dragText?: string;
  browseText?: string;
  loadingText?: string;
  loadingSubText?: string;
  allowPreview?: boolean;
  showFileList?: boolean;
  ariaInvalid?: boolean;
  ariaRequired?: boolean;
  showProgress?: boolean;
  loading?: boolean;
}

// FormFieldGroup.vue
export interface FormFieldGroupProps extends AccessibilityProps {
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  sectionGap?: 'sm' | 'md' | 'lg' | 'xl';
  size?: Size;
  direction?: 'horizontal' | 'vertical';
}

// LinkGroup.vue
export type LinkGroupSeparator = 'none' | 'dot' | 'slash' | 'pipe' | 'arrow';
export interface LinkGroupProps extends AccessibilityProps {
  gap?: 'sm' | 'md' | 'lg' | 'none';
  separator?: LinkGroupSeparator;
  size?: LinkSize;
  variant?: LinkVariant;
  underline?: LinkUnderline;
  direction?: 'horizontal' | 'vertical';
}

// Password.vue
export interface PasswordValidation {
  isValid: boolean;
  score: number; // 0-100
  progressState?: 'empty' | 'weak' | 'fair' | 'good' | 'strong';
  satisfied: string[];
  unsatisfied: string[];
  details: {
    length: { required: number; current: number; satisfied: boolean };
    uppercase: { required: number; current: number; satisfied: boolean };
    lowercase: { required: number; current: number; satisfied: boolean };
    digits: { required: number; current: number; satisfied: boolean };
    specialChars: { required: number; current: number; satisfied: boolean };
  };
}
export interface PasswordRules {
  minLength?: number;
  minUppercase?: number;
  minLowercase?: number;
  minDigits?: number;
  minSpecialChars?: number;
}
export interface PasswordProps extends Omit<InputProps, 'type' | 'suffixIcon'> {
  rules?: PasswordRules;
  showProgress?: boolean;
  showToggle?: boolean;
}

// OtpInput.vue
export type OtpInputType = 'numeric' | 'alphanumeric' | 'alphabetic'
export type OtpVariant = 'boxes' | 'underline' | 'seamless'

export interface OtpInputProps extends AccessibilityProps {
  /** Nombre de caractères du code OTP */
  length?: number
  /** Variante visuelle */
  variant?: OtpVariant
  /** Type de caractères acceptés */
  inputType?: OtpInputType
  /** Pattern regex personnalisé (surcharge inputType) */
  pattern?: string
  /** Fonction de validation par caractère (char, index) => boolean */
  validate?: (char: string, index: number) => boolean
  /** Taille */
  size?: Size
  /** État de validation */
  state?: State
  /** Désactivé */
  disabled?: boolean
  /** Lecture seule */
  readonly?: boolean
  /** Requis */
  required?: boolean
  /** Masquer les caractères (mode password) */
  masked?: boolean
  /** Schéma de groupement [3, 3] pour 6 digits en 2 groupes */
  grouping?: number[]
  /** Caractère séparateur entre groupes */
  separator?: string
  /** Soumettre automatiquement quand tous les champs sont remplis */
  autoSubmit?: boolean
  /** Caractère placeholder par champ */
  placeholder?: string
  /** Auto-focus sur le premier champ au montage */
  autoFocus?: boolean
}

// OtpInputField.vue
export type OtpInputFieldProps = FormFieldProps & OtpInputProps

// RangeField.vue
export interface BaseRangeProps extends AccessibilityProps {
  min?: number;
  max?: number;
  step?: number;
  size?: Size;
  state?: State;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  orientation?: Orientation;
  dual?: boolean;
  showValue?: boolean;
  showTicks?: boolean;
  showLabels?: boolean;
  formatValue?(value: number): string;
}
export type RangeFieldProps = FormFieldProps & BaseRangeProps;

// SliderField.vue
export interface SliderFieldProps extends AccessibilityProps {
  min?: number;
  max?: number;
  step?: number;
  size?: Size;
  state?: State;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  orientation?: Orientation;
  tooltip?: 'none' | 'top' | 'bottom';
  marks?: number[];
  showValue?: boolean;
  showTicks?: boolean;
  showLabels?: boolean;
  formatValue?: (value: number) => string;
  label?: string;
  message?: string;
  ariaInvalid?: boolean;
  ariaRequired?: boolean;
  ariaValueText?: string;
}

// CheckboxGroupField.vue
export type CheckboxGroupFieldProps = FormFieldProps & CheckboxGroupProps

// InputField.vue
export type InputFieldProps = FormFieldProps & InputProps

// PasswordField.vue
export type PasswordFieldProps = FormFieldProps & PasswordProps

// RadioGroupField.vue
export type RadioGroupFieldProps = FormFieldProps & RadioGroupProps

// SelectBoxField.vue
export type SelectBoxFieldProps = FormFieldProps & SelectBoxProps

// SwitchField.vue
export type SwitchFieldProps = FormFieldProps & SwitchProps

// TextareaField.vue
export type TextareaFieldProps = FormFieldProps & TextareaProps

// NumberInputField.vue
export type NumberInputFieldProps = FormFieldProps & NumberInputProps

// --- ORGANISMS ---

// Accordion.vue
export interface AccordionItemData {
  id?: string;
  title: string;
  content?: string;
  disabled?: boolean;
  open?: boolean;
}
export interface AccordionProps extends AccessibilityProps {
  items?: AccordionItemData[];
  multiple?: boolean;
  /** Regroupe les items dans un seul cadre, séparés par un filet (ignore `gap`) */
  attached?: boolean;
  gap?: 'sm' | 'md' | 'lg' | 'none';
  modelValue?: (string | number)[];
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

// Alert.vue
export interface AlertProps {
  type?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  title?: string;
  description?: string;
  dismissible?: boolean;
  dismissLabel?: string;
  ariaLive?: 'assertive' | 'polite' | 'off';
  ariaAtomic?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

// DataTable.vue
// Tri (v-model:sort), page (v-model:page) et lignes cochées (v-model:selected)
export type DataTableAlign = 'start' | 'center' | 'end';
export type SortDirection = 'asc' | 'desc';
export interface DataTableSort {
  key: string;
  direction: SortDirection;
}
export interface DataTableColumn {
  /** Propriété de la ligne affichée dans la colonne */
  key: string;
  label: string;
  sortable?: boolean;
  align?: DataTableAlign;
  width?: string;
  /** Texte affiché ; la valeur brute sert au tri */
  format?: (value: any, row: Record<string, any>) => string;
  /** Comparaison personnalisée pour le tri */
  sortFn?: (a: Record<string, any>, b: Record<string, any>) => number;
  /** Libellé masqué visuellement (colonne d'actions) mais lu */
  hideLabel?: boolean;
}
export interface DataTableProps {
  columns?: DataTableColumn[];
  rows?: Record<string, any>[];
  /** Identifiant d'une ligne : nom de propriété ou fonction (défaut : 'id') */
  rowKey?: string | ((row: Record<string, any>) => string | number);
  /** Titre du tableau (nom accessible), ou slot `caption` */
  caption?: string;
  /** Titre lu mais masqué visuellement */
  captionHidden?: boolean;
  /** Cases à cocher de sélection */
  selectable?: boolean;
  /** Nom d'une ligne pour sa case (défaut : valeur de la première colonne) */
  rowLabel?: (row: Record<string, any>) => string;
  /** Pagination : lignes par page */
  pageSize?: number;
  /** Lignes déjà triées et paginées (serveur) : ni tri ni découpage local */
  manual?: boolean;
  /** Nombre total de lignes en mode manual */
  total?: number;
  loading?: boolean;
  emptyText?: string;
  striped?: boolean;
  size?: Size;
  stickyHeader?: boolean;
  /** Hauteur maximale (défilement vertical, en-tête collant conseillé) */
  maxHeight?: string;
  /** Langue du tri alphabétique (défaut : locale des composants) */
  locale?: string;
}

// Toaster.vue
export type ToasterPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
export interface ToasterProps {
  position?: ToasterPosition;
  /** Nombre de toasts visibles ; les suivants attendent leur tour */
  max?: number;
  /** Durée par défaut (ms) des toasts qui n'en précisent pas */
  duration?: number;
  ariaLabel?: string;
}

// Dialog.vue
export type DialogDisplay = 'center' | 'left' | 'right' | 'top' | 'bottom' | 'full';
export interface DialogProps extends AccessibilityProps {
  modelValue?: boolean;
  display?: DialogDisplay;
  title?: string;
  description?: string;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  width?: string;
  height?: string;
  /** @deprecated Sans effet : le dialog s'ouvre dans la couche supérieure du navigateur (showModal) */
  zIndex?: number;
  disableScroll?: boolean;
  /** Nom accessible du bouton de fermeture */
  closeLabel?: string;
}

// Tabs.vue
export interface TabItem {
  label: string;
  content?: string;
  icon?: Component | string;
  badge?: number | string;
  title?: string;
  description?: string;
  component?: Component;
}
export interface TabsProps {
  tabs?: TabItem[];
  modelValue?: number;
  variant?: 'underline' | 'contained' | 'pills';
}

// Card.vue
export type CardVariant = 'default' | 'outlined' | 'elevated' | 'filled'
export type CardSize = 'sm' | 'md' | 'lg'
export type CardDirection = 'vertical' | 'horizontal'

export interface CardProps extends AccessibilityProps {
  /** Variante visuelle */
  variant?: CardVariant
  /** Taille (padding, espacement, typographie) */
  size?: CardSize
  /** Direction du layout (vertical = image en haut, horizontal = image à gauche) */
  direction?: CardDirection
  /** Rayon des coins */
  radius?: Radius
  /** La carte est cliquable (hover/focus states, cursor pointer) */
  clickable?: boolean
  /** Lien href — rend la carte navigable en tant que <a> */
  href?: string
  /** Attribut target pour les liens */
  target?: LinkTarget
  /** URL de l'image d'en-tête */
  image?: string
  /** Alt text de l'image */
  imageAlt?: string
  /** Ratio de l'image ('16/9', '4/3', '1/1', '21/9') */
  imageRatio?: '16/9' | '4/3' | '1/1' | '21/9' | 'auto'
  /** Ajustement de l'image dans son conteneur */
  imageFit?: 'cover' | 'contain' | 'fill'
  /** Position de l'image dans son conteneur */
  imagePosition?: 'top' | 'bottom'
  /** Titre de la carte */
  title?: string
  /** Sous-titre ou description courte */
  subtitle?: string
  /** Niveau de heading pour le titre (1-6) */
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6
  /** Désactivée */
  disabled?: boolean
  /** Pleine largeur */
  fullWidth?: boolean
  /** Largeur max personnalisée */
  maxWidth?: string
}

// --- TEMPLATES ---

// GridCell.vue (vitrines Storybook)
export interface GridCellProps {
  bordered?: boolean
  radius?: Radius
  backgroundColor?: string
  borderColor?: string
}

// Layouts : mobile first. Les colonnes apparaissent selon la largeur du
// conteneur (container queries), pas celle de l'écran.

/** Écart entre les zones d'un layout (sm 8px, md 16px, lg 24px, xl 32px) */
export type LayoutGap = 'none' | 'sm' | 'md' | 'lg' | 'xl'
/** Largeur de conteneur à partir de laquelle un layout passe en colonnes (sm 640, md 768, lg 1024, xl 1280) */
export type LayoutBreakpoint = 'sm' | 'md' | 'lg' | 'xl'

export interface SingleColumnLayoutProps {
  /** Largeur maximale de la colonne : `prose` ≈ 65 caractères par ligne */
  width?: 'prose' | 'narrow' | 'medium' | 'wide' | 'full'
  /** Écart entre en-tête, contenu et pied */
  gap?: LayoutGap
  /** Marges latérales (16px, puis 24px dès `md`) */
  padded?: boolean
  /** Élément racine (`article`, `main`, `section`…) */
  as?: string
}

export interface SidebarLayoutProps {
  /** Côté de la barre latérale (l'ordre du DOM suit l'ordre visuel) */
  sidebarPosition?: 'start' | 'end'
  /** Largeur de la barre latérale en colonnes (longueur CSS) */
  sidebarWidth?: string
  /** Largeur de conteneur à partir de laquelle les deux colonnes apparaissent */
  breakpoint?: LayoutBreakpoint
  /** Barre latérale collante (en colonnes uniquement) */
  stickySidebar?: boolean
  /** Distance au haut de l'écran de la barre collante (hauteur d'un en-tête fixe…) */
  stickyOffset?: string
  /** Élément de la barre latérale */
  sidebarTag?: 'aside' | 'nav' | 'div'
  /** Nom accessible de la barre latérale (aside, nav) */
  sidebarLabel?: string
  gap?: LayoutGap
}

export interface SplitLayoutProps {
  /** Proportions des deux zones en colonnes (`2:1` : la première zone prend 2/3) */
  ratio?: '1:1' | '2:1' | '1:2' | '3:2' | '2:3'
  /** Largeur de conteneur à partir de laquelle les zones sont côte à côte */
  breakpoint?: LayoutBreakpoint
  /** En colonnes, affiche la zone `end` à gauche (l'ordre du DOM ne change pas) */
  reverse?: boolean
  /** Alignement vertical des zones en colonnes */
  align?: 'start' | 'center' | 'end' | 'stretch'
  /** Hauteur minimale de l'écran en colonnes (écran partagé) */
  fullHeight?: boolean
  gap?: LayoutGap
}

export interface HolyGrailLayoutProps {
  /** Largeur de la navigation (dès `md`) */
  navWidth?: string
  /** Largeur de la colonne complémentaire (dès `lg`) */
  asideWidth?: string
  /** En-tête collant en haut de l'écran */
  stickyHeader?: boolean
  /** Navigation et colonne complémentaire collantes (en colonnes) */
  stickySidebars?: boolean
  /** Distance au haut de l'écran des colonnes collantes (hauteur de l'en-tête collant…) */
  stickyOffset?: string
  /** Occupe au moins la hauteur de l'écran (pied de page en bas) */
  fullHeight?: boolean
  /** Régions sémantiques (header, nav, main, aside, footer). `false` : de simples div, pour un layout imbriqué dans une page qui a déjà ses régions */
  landmarks?: boolean
  /** Lien d'évitement vers le contenu principal (avec `landmarks`) */
  skipLink?: boolean
  skipLinkLabel?: string
  navLabel?: string
  asideLabel?: string
  gap?: LayoutGap
}

export interface MagazineLayoutProps {
  /** Colonnes de la grille d'articles en grand format (1, puis 2 dès `sm`) */
  columns?: 2 | 3 | 4
  gap?: LayoutGap
}

/** Nombre de colonnes : fixe, ou par largeur de conteneur (mobile first) */
export type LayoutColumns = number | Partial<Record<'base' | LayoutBreakpoint, number>>

/** Affichage des cellules du GridLayout : en grille, ou empilées en liste */
export type GridLayoutView = 'grid' | 'list'

// L'affichage (GridLayoutView) passe par `v-model:view` (defineModel)
export interface GridLayoutProps {
  /** Colonnes par largeur de conteneur (défaut : 1, 2 dès `sm`, 3 dès `lg`) */
  columns?: LayoutColumns
  /** Largeur minimale d'une cellule (longueur CSS) : grille auto-fill, le nombre de colonnes s'adapte seul et remplace `columns` */
  minItemWidth?: string
  /** Alignement vertical des cellules d'une rangée (`stretch` : même hauteur) */
  align?: 'start' | 'center' | 'end' | 'stretch'
  /** Élément qui contient les cellules : `ul` ou `ol` pour une liste (cellules `li`) */
  itemsTag?: 'div' | 'ul' | 'ol'
  /** Affiche le sélecteur grille / liste dans l'en-tête */
  viewToggle?: boolean
  /** Nom accessible du sélecteur grille / liste */
  viewToggleLabel?: string
  /** Libellé du bouton « grille » */
  gridLabel?: string
  /** Libellé du bouton « liste » */
  listLabel?: string
  gap?: LayoutGap
}

export type MasonryColumns = LayoutColumns

export interface MasonryLayoutProps {
  /** Colonnes par largeur de conteneur (défaut : 1, 2 dès `sm`, 3 dès `lg`) */
  columns?: MasonryColumns
  /** Largeur idéale d'une colonne (longueur CSS) : le nombre de colonnes s'adapte seul et remplace `columns` */
  columnWidth?: string
  gap?: LayoutGap
}

export interface HeroLayoutProps {
  /** Alignement du texte de l'accroche */
  align?: 'center' | 'start'
  /** Visuel sous le texte, ou à côté dès `lg` */
  mediaPosition?: 'bottom' | 'end'
  /** L'accroche occupe au moins la hauteur de l'écran */
  fullHeight?: boolean
  /** Niveau du titre de l'accroche */
  titleTag?: 'h1' | 'h2' | 'h3'
  /** Écart entre l'accroche et les sections suivantes */
  gap?: LayoutGap
}

export interface FullScreenLayoutProps {
  /** Aimantation du défilement sur chaque écran */
  snap?: 'mandatory' | 'proximity' | 'none'
  /** Hauteur de la zone de défilement (un écran = cette hauteur) */
  height?: string
  /** Nom accessible de la zone de défilement */
  label?: string
}