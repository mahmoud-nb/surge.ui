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