import { inject } from 'vue'
import { ThemeSymbol } from '@/plugin/theme'
import type { SurgeuiTheme } from '@/plugin/theme'

export function useTheme() {
  const theme = inject(ThemeSymbol, {} as SurgeuiTheme)
  return theme
}