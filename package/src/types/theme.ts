export type ThemeMode = 'light' | 'dark' | 'auto'
export type ContrastMode = 'normal' | 'high'
export type MotionMode = 'normal' | 'reduce'
export type TextDirection = 'ltr' | 'rtl'

export interface ThemeConfig {
  theme: ThemeMode
  contrast: ContrastMode
  motion: MotionMode
  direction: TextDirection
}