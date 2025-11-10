import type { Component } from "vue";
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
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'default';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'default';
export type ButtonRadius = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'default';
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
export type FileUploadVariant = 'default' | 'dashed' | 'solid' | 'minimal';
export interface BaseFileUploadProps extends AccessibilityProps {
  value?: UploadedFile[];
  variant?: FileUploadVariant;
  multiple?: boolean;
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  size?: Size;
  state?: State;
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