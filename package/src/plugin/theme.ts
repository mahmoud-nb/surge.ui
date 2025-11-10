import type { InjectionKey } from 'vue'
import type { ButtonRadius, ButtonSize, ButtonVariant, DialogDisplay, LinkSize, LinkUnderline, LinkVariant } from '@/types'

export interface SurgeuiTheme {
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

export const ThemeSymbol: InjectionKey<SurgeuiTheme> = Symbol('SurgeuiTheme')

// const theme = inject<SurgeuiTheme>('theme', { suDefaultSize: 'md' })  --> theme.suDefaultSize