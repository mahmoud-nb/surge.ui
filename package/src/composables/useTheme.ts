import { ref, computed, inject, watch, onMounted } from 'vue'
import { ThemeSymbol } from '@/plugin/theme'
import type { SurgeuiTheme } from '@/plugin/theme'
import type { ThemeMode, ContrastMode, MotionMode, ThemeConfig, TextDirection } from '@/types/theme'

const STORAGE_KEY = 'app-su-theme-config'

const themeMode = ref<ThemeMode>('auto')
const contrastMode = ref<ContrastMode>('normal')
const motionMode = ref<MotionMode>('normal')
const textDirection = ref<TextDirection>('ltr')

export function useTheme() {

  const theme = inject(ThemeSymbol, {} as SurgeuiTheme)

  // Détection du thème système
  const systemTheme = computed(() => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  })

  // Thème effectif (résout 'auto')
  const effectiveTheme = computed(() => {
    return themeMode.value === 'auto' ? systemTheme.value : themeMode.value;
  })

  // Détection du contraste système
  const systemContrast = computed(() => {
    if (typeof window === 'undefined') return 'normal';
    return window.matchMedia('(prefers-contrast: more)').matches ? 'high' : 'normal';
  })

  // Détection de la préférence d'animation système
  const systemMotion = computed(() => {
    if (typeof window === 'undefined') return 'normal';
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'reduce' : 'normal';
  })

  // Application du thème au DOM
  const applyTheme = () => {
    const root = document.documentElement
    
    // Thème
    root.setAttribute('data-theme', effectiveTheme.value)
    
    // Contraste
    const contrast = contrastMode.value === 'normal' ? systemContrast.value : contrastMode.value
    if (contrast === 'normal' || contrast === 'high') root.setAttribute('data-contrast', contrast)
    
    // Animations
    const motion = motionMode.value === 'normal' ? systemMotion.value : motionMode.value
    if (motion === 'normal' || motion === 'reduce') root.setAttribute('data-motion', motion)

    // Direction du texte
    if (textDirection.value === 'rtl' || textDirection.value === 'ltr') root.setAttribute('dir', textDirection.value)
  }

  // Sauvegarde dans localStorage
  const saveConfig = () => {
    const config: ThemeConfig = {
      theme: themeMode.value,
      contrast: contrastMode.value,
      motion: motionMode.value,
      direction: textDirection.value
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
  }

  // Chargement depuis localStorage
  const loadConfig = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const config: ThemeConfig = JSON.parse(stored)
        themeMode.value = config.theme
        contrastMode.value = config.contrast
        motionMode.value = config.motion
        textDirection.value = config.direction
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la configuration du thème:', error);
    }
  }

  // Setters
  const setTheme = (mode: ThemeMode) => {
    themeMode.value = mode
    saveConfig()
  }

  const setContrast = (mode: ContrastMode) => {
    contrastMode.value = mode
    saveConfig()
  }

  const setMotion = (mode: MotionMode) => {
    motionMode.value = mode
    saveConfig()
  }

  const setDirection = (direction: TextDirection) => {
    textDirection.value = direction
    saveConfig()
  }

  const toggleTheme = () => {
    const current = effectiveTheme.value;
    setTheme(current === 'light' ? 'dark' : 'light')
  }

  const reset = () => {
    themeMode.value = 'auto'
    contrastMode.value = 'normal'
    motionMode.value = 'normal'
    textDirection.value = 'ltr'
    saveConfig()
  }

  // Watchers
  watch([effectiveTheme, contrastMode, motionMode, systemContrast, systemMotion, textDirection], applyTheme);

  // Écoute des changements système
  onMounted(() => {
    loadConfig()
    applyTheme()

    // Media queries listeners
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const contrastQuery = window.matchMedia('(prefers-contrast: more)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const directionQuery = window.matchMedia('(direction: rtl)')

    darkModeQuery.addEventListener('change', applyTheme)
    contrastQuery.addEventListener('change', applyTheme)
    motionQuery.addEventListener('change', applyTheme)
    directionQuery.addEventListener('change', applyTheme)
    return () => {
      darkModeQuery.removeEventListener('change', applyTheme)
      contrastQuery.removeEventListener('change', applyTheme)
      motionQuery.removeEventListener('change', applyTheme)
      directionQuery.removeEventListener('change', applyTheme)
    }
  })

  return {
    theme,

    // État
    themeMode,
    contrastMode,
    motionMode,
    textDirection,

    // Computed
    systemTheme,
    effectiveTheme,
    systemContrast,
    systemMotion,
    
    // Actions
    setTheme,
    setContrast,
    setMotion,
    setDirection,
    toggleTheme,
    reset
  }
}