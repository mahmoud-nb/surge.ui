import { ref, computed, watch, onMounted } from 'vue';
import type { 
  ThemeName, 
  ContrastMode, 
  MotionMode, 
  UserThemeConfig, 
  ThemeMetadata,
  UseThemeOptions 
} from '@/types/theme';
import themeConfig from '@/theme.config';

// ============================================================
// MÉTADONNÉES DES THÈMES
// ============================================================

const ALL_THEMES: ThemeMetadata[] = [
  {
    id: 'light',
    name: 'Clair',
    description: 'Thème clair classique',
    category: 'system',
    preview: { primary: '#2563eb', background: '#f9fafb', surface: '#ffffff' },
    available: true // Toujours disponible
  },
  {
    id: 'dark',
    name: 'Sombre',
    description: 'Thème sombre pour faible luminosité',
    category: 'system',
    preview: { primary: '#3b82f6', background: '#030712', surface: '#111827' },
    available: true // Toujours disponible
  },
  {
    id: 'ocean',
    name: 'Océan',
    description: 'Ambiance maritime apaisante',
    category: 'color',
    preview: { primary: '#f97316', background: '#e0f2fe', surface: '#ffffff' },
    available: themeConfig.themes.includes('ocean')
  },
  {
    id: 'forest',
    name: 'Forêt',
    description: 'Inspiration naturelle et fraîche',
    category: 'color',
    preview: { primary: '#f97316', background: '#f7fee7', surface: '#ffffff' },
    available: themeConfig.themes.includes('forest')
  },
  {
    id: 'sunset',
    name: 'Coucher de soleil',
    description: 'Chaleur et couleurs vibrantes',
    category: 'color',
    preview: { primary: '#db2777', background: '#fff7ed', surface: '#ffffff' },
    available: themeConfig.themes.includes('sunset')
  }
];

// ============================================================
// STATE
// ============================================================
let isInitialized = false;
const themeName = ref<ThemeName>(themeConfig.defaultTheme);
const contrastMode = ref<ContrastMode>('auto');
const motionMode = ref<MotionMode>('auto');

// ============================================================
// COMPOSABLE
// ============================================================

export function useTheme(options: UseThemeOptions = {}) {
  const opts = {
    availableThemes: options.availableThemes || themeConfig.themes,
    defaultTheme: options.defaultTheme || themeConfig.defaultTheme,
    storageKey: options.storageKey || themeConfig.storageKey || 'su-theme-config',
    persist: options.persist !== false
  };
  
  // ========================================
  // Détection système
  // ========================================
  
  const systemTheme = computed<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  
  const systemContrast = computed<'normal' | 'high'>(() => {
    if (typeof window === 'undefined') return 'normal';
    return window.matchMedia('(prefers-contrast: more)').matches ? 'high' : 'normal';
  });
  
  const systemMotion = computed<'normal' | 'reduce'>(() => {
    if (typeof window === 'undefined') return 'normal';
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'reduce' : 'normal';
  });
  
  // ========================================
  // Thèmes disponibles
  // ========================================
  
  const availableThemes = computed(() => 
    ALL_THEMES.filter(t => t.available)
  );
  
  const systemThemes = computed(() => 
    availableThemes.value.filter(t => t.category === 'system')
  );
  
  const colorThemes = computed(() => 
    availableThemes.value.filter(t => t.category === 'color')
  );
  
  // ========================================
  // Résolution
  // ========================================
  
  const effectiveTheme = computed<Exclude<ThemeName, 'auto'>>(() => {
    if (themeName.value === 'auto') {
      return systemTheme.value;
    }
    
    // Vérifier si le thème est disponible
    const isAvailable = availableThemes.value.some(t => t.id === themeName.value);
    if (!isAvailable) {
      console.warn(`Theme '${themeName.value}' is not available. Falling back to system theme.`);
      return systemTheme.value;
    }
    
    return themeName.value;
  });
  
  const effectiveContrast = computed<'normal' | 'high'>(() => {
    return contrastMode.value === 'auto' ? systemContrast.value : contrastMode.value;
  });
  
  const effectiveMotion = computed<'normal' | 'reduce'>(() => {
    return motionMode.value === 'auto' ? systemMotion.value : motionMode.value;
  });
  
  const currentThemeMetadata = computed(() => {
    return availableThemes.value.find(t => t.id === effectiveTheme.value) || availableThemes.value[0];
  });
  
  const isDarkMode = computed(() => effectiveTheme.value === 'dark');
  
  // ========================================
  // Application au DOM
  // ========================================
  
  const applyTheme = () => {
    if (typeof document === 'undefined') return;
    
    const root = document.documentElement;
    root.setAttribute('data-theme', effectiveTheme.value);
    root.setAttribute('data-contrast', effectiveContrast.value);
    root.setAttribute('data-motion', effectiveMotion.value);
    root.classList.toggle('theme-dark', isDarkMode.value);
  };
  
  // ========================================
  // Persistance
  // ========================================
  
  const saveConfig = () => {
    if (!opts.persist || typeof localStorage === 'undefined') return;
    
    try {
      const config: UserThemeConfig = {
        theme: themeName.value,
        contrast: contrastMode.value,
        motion: motionMode.value,
      };
      localStorage.setItem(opts.storageKey, JSON.stringify(config));
    } catch (error) {
      console.error('Erreur sauvegarde thème:', error);
    }
  };
  
  const loadConfig = () => {
    if (!opts.persist || typeof localStorage === 'undefined') return;
    
    try {
      const stored = localStorage.getItem(opts.storageKey);
      if (stored) {
        const config: UserThemeConfig = JSON.parse(stored);
        
        // Valider que le thème est disponible
        if (config.theme === 'auto' || 
            config.theme === 'light' || 
            config.theme === 'dark' ||
            availableThemes.value.some(t => t.id === config.theme)) {
          themeName.value = config.theme;
        }
        
        if (config.contrast) contrastMode.value = config.contrast;
        if (config.motion) motionMode.value = config.motion;
      }
    } catch (error) {
      console.error('Erreur chargement thème:', error);
    }
  };
  
  const clearConfig = () => {
    if (!opts.persist || typeof localStorage === 'undefined') return;
    
    try {
      localStorage.removeItem(opts.storageKey);
      themeName.value = opts.defaultTheme;
      contrastMode.value = 'auto';
      motionMode.value = 'auto';
    } catch (error) {
      console.error('Erreur suppression config thème:', error);
    }
  };
  
  // ========================================
  // Actions
  // ========================================
  
  const setTheme = (theme: ThemeName) => {
    // Vérifier la disponibilité
    if (theme !== 'auto' && theme !== 'light' && theme !== 'dark') {
      const isAvailable = availableThemes.value.some(t => t.id === theme);
      if (!isAvailable) {
        console.warn(`Theme '${theme}' is not available in current build.`);
        return;
      }
    }
    
    themeName.value = theme;
    saveConfig();
  };
  
  const setContrast = (contrast: ContrastMode) => {
    contrastMode.value = contrast;
    saveConfig();
  };

  const setMotion = (motion: MotionMode) => {
    motionMode.value = motion;
    saveConfig();
  };
  const toggleTheme = () => {
  if (themeName.value === 'auto') {
  setTheme(systemTheme.value === 'light' ? 'dark' : 'light');
  } else if (themeName.value === 'light' || themeName.value === 'dark') {
  setTheme(themeName.value === 'light' ? 'dark' : 'light');
  } else {
  setTheme('auto');
  }
  };
  const cycleTheme = () => {
  const current = availableThemes.value.findIndex(t => t.id === themeName.value);
  const next = (current + 1) % availableThemes.value.length;
  setTheme(availableThemes.value[next].id);
  };
  // ========================================
  // Initialisation
  // ========================================
  onMounted(() => {
  if (isInitialized) return;
  isInitialized = true;

  loadConfig();
  applyTheme();

  watch([effectiveTheme, effectiveContrast, effectiveMotion], applyTheme, { immediate: false });

  if (typeof window !== 'undefined') {
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const contrastQuery = window.matchMedia('(prefers-contrast: more)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handler = () => applyTheme();
    
    darkQuery.addEventListener('change', handler);
    contrastQuery.addEventListener('change', handler);
    motionQuery.addEventListener('change', handler);
    
    return () => {
      darkQuery.removeEventListener('change', handler);
      contrastQuery.removeEventListener('change', handler);
      motionQuery.removeEventListener('change', handler);
    };
  }

  });
  // ========================================
  // API
  // ========================================
  return {
  // État
  themeName,
  contrastMode,
  motionMode,

  // Computed
  effectiveTheme,
  effectiveContrast,
  effectiveMotion,
  systemTheme,
  systemContrast,
  systemMotion,
  currentThemeMetadata,
  isDarkMode,

  // Données
  availableThemes,
  systemThemes,
  colorThemes,

  // Actions
  setTheme,
  setContrast,
  setMotion,
  toggleTheme,
  cycleTheme,
  clearConfig,
  }
}
