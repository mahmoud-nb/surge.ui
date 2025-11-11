import type { Component } from "vue";
// Types globaux utilisés dans plusieurs composants
export type Variant = 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'ghost' | 'link'
export type Size = 'sm' | 'md' | 'lg'
export type State = 'default' | 'error' | 'success' | 'warning'
export type Radius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'max'
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
  clickable?: boolean;
}

// Badge.vue
export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'dot';
export interface BadgeProps extends AccessibilityProps {
  variant?: BadgeVariant;
  size?: Size;
  radius?: Radius;
  icon?: Component;
  iconDisplay?: 'left' | 'right' | 'only';
  dotText?: string;
  color?: string;
  backgroundColor?: string;
}

// Button.vue
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonRadius = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'max';
export interface ButtonProps extends AccessibilityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  radius?: ButtonRadius;
  disabled?: boolean;
  loading?: boolean;
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
  state?: State;
  required?: boolean;
  disabled?: boolean;
}

// Heading.vue
export interface HeadingProps {
  level?: number | string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  truncate?: boolean;
}

// Icon.vue
export interface IconProps extends AccessibilityProps {
  name: Component;
  size?: Number | String;
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
}

// Input.vue
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week';
export interface InputProps extends AccessibilityProps {
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
  textAlign?: TextAlign;
  autocomplete?: string;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

// Link.vue
export type LinkVariant = 'default' | 'primary' | 'secondary' | 'muted';
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
  icon?: any;
  iconDisplay?: 'left' | 'right' | 'only';
  external?: boolean;
}

// Panel.vue
export interface PanelProps {
  tag?: 'div' | 'section' | 'article';
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
  dir?: 'ltr' | 'rtl' | 'auto';
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

// Switch.vue
export interface SwitchProps extends AccessibilityProps {
  leftLabel?: string;
  rightLabel?: string;
  leftIcon?: Component;
  rightIcon?: Component;
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
  isItemOpen: (id: string | number) => boolean;
  toggleItem: (id: string | number, item: any) => void;
  registerItem: (id: string | number, ref: any) => void;
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

// FileUploadField.vue
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
  allowPreview?: boolean;
  showFileList?: boolean;
  ariaInvalid?: boolean;
  ariaRequired?: boolean;
  showProgress?: boolean;
  loading?: boolean;
}

// FormFields.vue
export interface FormFieldsProps extends AccessibilityProps {
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
  zIndex?: number;
  disableScroll?: boolean;
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

// --- TEMPLATES ---

interface GridBreakpoints {
  mobile?: number
  tablet?: number
  miniDesktop?: number
  desktop?: number
}

export interface GridProps {
  columns?: GridBreakpoints
  gap?: string | number
  viewMode?: 'grid' | 'list'
  responsive?: boolean
}

export interface GridCellProps {
  bordered?: boolean
  radius?: Radius
  backgroundColor?: string
  borderColor?: string
}