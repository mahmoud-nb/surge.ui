import { ref, computed, watch, onMounted } from 'vue';
import type {
  ThemeName,
  ThemeMode,
  ContrastMode,
  MotionMode,
  UserThemeConfig,
  ThemeMetadata,
  UseThemeOptions,
  DeprecatedThemeName,
} from '@/types/theme';
import themeConfig from '@/theme.config';

// ============================================================
// MÉTADONNÉES DES THÈMES
// ============================================================

const ALL_THEMES: ThemeMetadata[] = [
  {
    id: 'default',
    name: 'Défaut',
    description: 'Thème classique (clair ou sombre selon le mode)',
    category: 'system',
    preview: { primary: '#2563eb', background: '#f9fafb', surface: '#ffffff' },
    available: true, // toujours disponible
  },
  {
    id: 'ocean',
    name: 'Océan',
    description: 'Ambiance maritime apaisante',
    category: 'color',
    preview: { primary: '#f97316', background: '#e0f2fe', surface: '#ffffff' },
    available: themeConfig.themes.includes('ocean'),
  },
  {
    id: 'forest',
    name: 'Forêt',
    description: 'Inspiration naturelle et fraîche',
    category: 'color',
    preview: { primary: '#f97316', background: '#f7fee7', surface: '#ffffff' },
    available: themeConfig.themes.includes('forest'),
  },
  {
    id: 'sunset',
    name: 'Coucher de soleil',
    description: 'Chaleur et couleurs vibrantes',
    category: 'color',
    preview: { primary: '#db2777', background: '#fff7ed', surface: '#ffffff' },
    available: themeConfig.themes.includes('sunset'),
  },
];

// ============================================================
// STATE (module-level singleton)
// ============================================================
let isInitialized = false;
const themeName = ref<ThemeName>(themeConfig.defaultTheme);
const themeMode = ref<ThemeMode>(themeConfig.defaultThemeMode ?? 'auto');
const contrastMode = ref<ContrastMode>('auto');
const motionMode = ref<MotionMode>('auto');

// ============================================================
// COMPOSABLE
// ============================================================

export function useTheme(options: UseThemeOptions = {}) {
  const opts = {
    availableThemes: options.availableThemes || themeConfig.themes,
    defaultTheme: options.defaultTheme || themeConfig.defaultTheme,
    defaultThemeMode: options.defaultThemeMode || themeConfig.defaultThemeMode || 'auto',
    storageKey: options.storageKey || themeConfig.storageKey || 'su-theme-config',
    persist: options.persist !== false,
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
    ALL_THEMES.filter((t) => t.available)
  );

  const systemThemes = computed(() =>
    availableThemes.value.filter((t) => t.category === 'system')
  );

  const colorThemes = computed(() =>
    availableThemes.value.filter((t) => t.category === 'color')
  );

  // ========================================
  // Résolution — thème effectif
  // ========================================

  const effectiveTheme = computed<Exclude<ThemeName, 'auto'>>(() => {
    if (themeName.value === 'auto') {
      // En mode 'auto', le thème visuel suit l'identité par défaut
      return 'default';
    }

    const isAvailable = availableThemes.value.some((t) => t.id === themeName.value);
    if (!isAvailable) {
      console.warn(`[SurgeUI] Theme '${themeName.value}' is not available. Falling back to 'default'.`);
      return 'default';
    }

    return themeName.value;
  });

  // ========================================
  // Résolution — mode effectif (light | dark)
  // ========================================

  const effectiveThemeMode = computed<'light' | 'dark'>(() => {
    if (themeMode.value === 'auto') {
      return systemTheme.value;
    }
    return themeMode.value;
  });

  const isDarkMode = computed(() => effectiveThemeMode.value === 'dark');

  // ========================================
  // Autres modes effectifs
  // ========================================

  const effectiveContrast = computed<'normal' | 'high'>(() => {
    return contrastMode.value === 'auto' ? systemContrast.value : contrastMode.value;
  });

  const effectiveMotion = computed<'normal' | 'reduce'>(() => {
    return motionMode.value === 'auto' ? systemMotion.value : motionMode.value;
  });

  const currentThemeMetadata = computed(() => {
    return (
      availableThemes.value.find((t) => t.id === effectiveTheme.value) ||
      availableThemes.value[0]
    );
  });

  // ========================================
  // Application au DOM
  // ========================================

  const applyTheme = () => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    root.setAttribute('data-theme', effectiveTheme.value);
    root.setAttribute('data-theme-mode', effectiveThemeMode.value);
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
        themeMode: themeMode.value,
        contrast: contrastMode.value,
        motion: motionMode.value,
      };
      localStorage.setItem(opts.storageKey, JSON.stringify(config));
    } catch (error) {
      console.error('[SurgeUI] Erreur sauvegarde thème:', error);
    }
  };

  const loadConfig = () => {
    if (!opts.persist || typeof localStorage === 'undefined') return;

    try {
      const stored = localStorage.getItem(opts.storageKey);
      if (stored) {
        const config: UserThemeConfig = JSON.parse(stored);

        // Valider le thème stocké
        if (
          config.theme === 'auto' ||
          availableThemes.value.some((t) => t.id === config.theme)
        ) {
          themeName.value = config.theme;
        }

        // Rétrocompatibilité : anciens thèmes 'light' / 'dark' en localStorage
        if ((config.theme as string) === 'light') {
          themeName.value = 'default';
          themeMode.value = 'light';
        } else if ((config.theme as string) === 'dark') {
          themeName.value = 'default';
          themeMode.value = 'dark';
        } else if (config.themeMode) {
          themeMode.value = config.themeMode;
        }

        if (config.contrast) contrastMode.value = config.contrast;
        if (config.motion) motionMode.value = config.motion;
      }
    } catch (error) {
      console.error('[SurgeUI] Erreur chargement thème:', error);
    }
  };

  const clearConfig = () => {
    if (!opts.persist || typeof localStorage === 'undefined') return;

    try {
      localStorage.removeItem(opts.storageKey);
      themeName.value = opts.defaultTheme as ThemeName;
      themeMode.value = opts.defaultThemeMode as ThemeMode;
      contrastMode.value = 'auto';
      motionMode.value = 'auto';
    } catch (error) {
      console.error('[SurgeUI] Erreur suppression config thème:', error);
    }
  };

  // ========================================
  // Actions
  // ========================================

  /**
   * Définit le thème visuel (identité de couleur).
   * Accepte aussi les anciens noms 'light' et 'dark' (avec warning).
   */
  const setTheme = (name: ThemeName | DeprecatedThemeName) => {
    // Rétrocompatibilité : anciens noms dépréciés
    if (name === 'light') {
      console.warn(
        '[SurgeUI] theme="light" est déprécié. Utilisez theme="default" + themeMode="light".'
      );
      themeName.value = 'default';
      themeMode.value = 'light';
      saveConfig();
      applyTheme();
      return;
    }

    if (name === 'dark') {
      console.warn(
        '[SurgeUI] theme="dark" est déprécié. Utilisez theme="default" + themeMode="dark".'
      );
      themeName.value = 'default';
      themeMode.value = 'dark';
      saveConfig();
      applyTheme();
      return;
    }

    // Vérifier la disponibilité
    if (name !== 'auto') {
      const isAvailable = availableThemes.value.some((t) => t.id === name);
      if (!isAvailable) {
        console.warn(`[SurgeUI] Theme '${name}' is not available in the current build.`);
        return;
      }
    }

    themeName.value = name as ThemeName;
    saveConfig();
    applyTheme();
  };

  /**
   * Définit le mode luminosité (light / dark / auto).
   */
  const setThemeMode = (mode: ThemeMode) => {
    themeMode.value = mode;
    saveConfig();
    applyTheme();
  };

  const setContrast = (contrast: ContrastMode) => {
    contrastMode.value = contrast;
    saveConfig();
    applyTheme();
  };

  const setMotion = (motion: MotionMode) => {
    motionMode.value = motion;
    saveConfig();
    applyTheme();
  };

  /**
   * Bascule entre light et dark (ou auto → dark si on ne sait pas).
   */
  const toggleMode = () => {
    if (themeMode.value === 'auto') {
      themeMode.value = systemTheme.value === 'dark' ? 'light' : 'dark';
    } else {
      themeMode.value = isDarkMode.value ? 'light' : 'dark';
    }
    saveConfig();
    applyTheme();
  };

  /**
   * @deprecated Utiliser toggleMode() à la place.
   */
  const toggleTheme = () => {
    console.warn('[SurgeUI] toggleTheme() est déprécié. Utilisez toggleMode().');
    toggleMode();
  };

  /**
   * Cycle à travers les thèmes disponibles (identité visuelle uniquement).
   */
  const cycleTheme = () => {
    const current = availableThemes.value.findIndex((t) => t.id === themeName.value);
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

    watch(
      [effectiveTheme, effectiveThemeMode, effectiveContrast, effectiveMotion],
      applyTheme,
      { immediate: false }
    );

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
  // API publique
  // ========================================
  return {
    // État
    themeName,
    themeMode,
    contrastMode,
    motionMode,

    // Computed
    effectiveTheme,
    effectiveThemeMode,
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
    setThemeMode,
    setContrast,
    setMotion,
    toggleMode,
    toggleTheme, // déprécié
    cycleTheme,
    clearConfig,
  };
}
