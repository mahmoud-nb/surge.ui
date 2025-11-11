import type { InjectionKey } from 'vue'
import type { ButtonRadius, ButtonSize, ButtonVariant, DialogDisplay, LinkSize, LinkUnderline, LinkVariant } from '@/types'

export interface SurgeuiTheme {
  textPrimaryColor?: string
  textSecondaryColor?: string
  textTeriaryColor?: string
  // Configuration globale des boutons
  button?: {
    bg: string
    color: string
    border: string
    hoverBg: string
    hoverShadow: string
  }
  buttonRadius?: Exclude<ButtonRadius, 'md'>
  buttonVariant?: Exclude<ButtonVariant, 'primary'>
  buttonSize?: Exclude<ButtonSize, 'md'>
  // Configuration globale des liens
  linkVariant?: Exclude<LinkVariant, 'default'>
  linkSize?: Exclude<LinkSize, 'default'>
  linkUnderline?: Exclude<LinkUnderline, 'default'>
  dialogDisplay?: Exclude<DialogDisplay, 'center'>
}

export const ThemeSymbol: InjectionKey<SurgeuiTheme> = Symbol('SurgeuiTheme')

// const theme = inject<SurgeuiTheme>('theme', { suDefaultSize: 'md' })  --> theme.suDefaultSize