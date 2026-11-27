import {
  ref,
  computed,
  watch,
  effectScope,
  getCurrentInstance,
  getCurrentScope,
  onMounted,
  onScopeDispose,
  shallowReactive,
  type EffectScope,
} from 'vue';
import type {
  ThemeName,
  ThemeMode,
  ContrastMode,
  MotionMode,
  UserThemeConfig,
  ThemeMetadata,
  UseThemeOptions,
} from '@/types/theme';
import themeConfig from '@/theme.config';

// Mode 'system' en localStorage peut être stocké comme 'auto' dans les configs
// sauvegardées avant la migration — on gère les deux cas dans loadConfig.
const LEGACY_AUTO = 'auto';

/** 'auto' (ancien nom) → 'system' ; valeur inconnue → undefined */
const normalizeMode = (mode: string | undefined): ThemeMode | undefined => {
  if (mode === LEGACY_AUTO) return 'system';
  return mode === 'light' || mode === 'dark' || mode === 'system' ? mode : undefined;
};

// ============================================================
// MÉTADONNÉES DES THÈMES
// ============================================================

const themeMetadata = (): ThemeMetadata[] => [
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
// ÉTAT PARTAGÉ — créé au premier appel de useTheme, dans une portée
// détachée (indépendante du composant qui l'appelle en premier) : une
// application qui n'utilise pas useTheme n'embarque rien de ce module.
// ============================================================
function createThemeState() {
  const ALL_THEMES = themeMetadata();

  // Réglages : chaque option vient du premier appel qui la donne. Les setup
  // s'exécutent du parent vers les enfants : les options passées dans App.vue
  // l'emportent sur les appels sans option des composants (ThemeToggle…).
  const settings = shallowReactive({
    availableThemes: themeConfig.themes,
    defaultTheme: themeConfig.defaultTheme,
    defaultThemeMode: normalizeMode(themeConfig.defaultThemeMode) ?? 'system',
    storageKey: themeConfig.storageKey || 'su-theme-config',
    persist: true,
  });
  const explicit = new Set<keyof typeof settings>();

  const themeName = ref<ThemeName>(settings.defaultTheme);
  const themeMode = ref<ThemeMode>(settings.defaultThemeMode);
  const contrastMode = ref<ContrastMode>('auto');
  const motionMode = ref<MotionMode>('auto');

  // Préférences système : de vraies sources réactives, mises à jour par les
  // écouteurs matchMedia (un computed sur matchMedia ne serait jamais recalculé)
  const systemTheme = ref<'light' | 'dark'>('light');
  const systemContrast = ref<'normal' | 'high'>('normal');
  const systemMotion = ref<'normal' | 'reduce'>('normal');

  // Préférences enregistrées : lues une fois, au premier démarrage
  let configLoaded = false;

  // ============================================================
  // RÉSOLUTION (partagée par tous les appels)
  // ============================================================

  const availableThemes = computed(() =>
    ALL_THEMES.filter((t) => t.available && settings.availableThemes.includes(t.id))
  );

  const effectiveTheme = computed<ThemeName>(() => {
    const isAvailable = availableThemes.value.some((t) => t.id === themeName.value);
    if (!isAvailable) {
      console.warn(`[SurgeUI] Theme '${themeName.value}' is not available. Falling back to 'default'.`);
      return 'default';
    }
    return themeName.value;
  });

  const effectiveThemeMode = computed<'light' | 'dark'>(() =>
    themeMode.value === 'system' ? systemTheme.value : themeMode.value
  );

  const isDarkMode = computed(() => effectiveThemeMode.value === 'dark');

  const effectiveContrast = computed<'normal' | 'high'>(() =>
    contrastMode.value === 'auto' ? systemContrast.value : contrastMode.value
  );

  const effectiveMotion = computed<'normal' | 'reduce'>(() =>
    motionMode.value === 'auto' ? systemMotion.value : motionMode.value
  );

  // ============================================================
  // DOM ET PERSISTANCE
  // ============================================================

  const applyTheme = () => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    root.setAttribute('data-theme', effectiveTheme.value);
    root.setAttribute('data-theme-mode', effectiveThemeMode.value);
    root.setAttribute('data-contrast', effectiveContrast.value);
    root.setAttribute('data-motion', effectiveMotion.value);
    root.classList.toggle('theme-dark', isDarkMode.value);
  };

  const saveConfig = () => {
    if (!settings.persist || typeof localStorage === 'undefined') return;

    try {
      const config: UserThemeConfig = {
        theme: themeName.value,
        themeMode: themeMode.value,
        contrast: contrastMode.value,
        motion: motionMode.value,
      };
      localStorage.setItem(settings.storageKey, JSON.stringify(config));
    } catch (error) {
      console.error('[SurgeUI] Erreur sauvegarde thème:', error);
    }
  };

  const loadConfig = () => {
    if (!settings.persist || typeof localStorage === 'undefined') return;

    try {
      const stored = localStorage.getItem(settings.storageKey);
      if (!stored) return;
      const config = JSON.parse(stored) as Record<string, string>;

      // Rétrocompatibilité : anciens thèmes 'light' / 'dark' en localStorage
      if (config.theme === 'light' || config.theme === 'dark') {
        themeName.value = 'default';
        themeMode.value = config.theme;
      } else {
        if (availableThemes.value.some((t) => t.id === config.theme)) {
          themeName.value = config.theme as ThemeName;
        }
        // Migration 'auto' → 'system' pour les configs sauvegardées avant la v2
        const storedMode = normalizeMode(config.themeMode);
        if (storedMode) themeMode.value = storedMode;
      }

      const storedContrast = config.contrast;
      if (storedContrast === 'normal' || storedContrast === 'high' || storedContrast === 'auto') {
        contrastMode.value = storedContrast;
      }
      const storedMotion = config.motion;
      if (storedMotion === 'normal' || storedMotion === 'reduce' || storedMotion === 'auto') {
        motionMode.value = storedMotion;
      }
    } catch (error) {
      console.error('[SurgeUI] Erreur chargement thème:', error);
    }
  };

  /** Options d'un appel : retenues si aucun appel précédent ne les a données */
  const configure = (options: UseThemeOptions) => {
    const given: Partial<typeof settings> = {
      availableThemes: options.availableThemes,
      defaultTheme: options.defaultTheme,
      defaultThemeMode: normalizeMode(options.defaultThemeMode),
      storageKey: options.storageKey,
      persist: options.persist,
    };
    let defaultsChanged = false;
    for (const [key, value] of Object.entries(given) as [keyof typeof settings, unknown][]) {
      if (value === undefined || value === '' || explicit.has(key)) continue;
      explicit.add(key);
      Object.assign(settings, { [key]: value });
      if (key === 'defaultTheme' || key === 'defaultThemeMode') defaultsChanged = true;
    }
    if (!defaultsChanged) return;

    themeName.value = settings.defaultTheme;
    themeMode.value = settings.defaultThemeMode;
    // Préférences déjà lues : elles restent prioritaires sur les défauts
    if (configLoaded) loadConfig();
  };

  // ============================================================
  // ÉCOUTE DU SYSTÈME — active tant qu'un appel en a besoin
  // ============================================================

  let consumers = 0;
  let scope: EffectScope | undefined;
  let stopListening: (() => void) | undefined;

  const start = () => {
    if (typeof window === 'undefined') return;

    if (!configLoaded) {
      configLoaded = true;
      loadConfig();
    }

    if (typeof window.matchMedia === 'function') {
      const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const contrastQuery = window.matchMedia('(prefers-contrast: more)');
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

      const read = () => {
        systemTheme.value = darkQuery.matches ? 'dark' : 'light';
        systemContrast.value = contrastQuery.matches ? 'high' : 'normal';
        systemMotion.value = motionQuery.matches ? 'reduce' : 'normal';
      };
      read();

      const queries = [darkQuery, contrastQuery, motionQuery];
      queries.forEach((query) => query.addEventListener('change', read));
      stopListening = () => queries.forEach((query) => query.removeEventListener('change', read));
    }

    // Portée détachée : l'application au DOM ne dépend d'aucun composant
    scope = effectScope(true);
    scope.run(() => {
      watch([effectiveTheme, effectiveThemeMode, effectiveContrast, effectiveMotion], applyTheme, {
        immediate: true,
      });
    });
  };

  const stop = () => {
    stopListening?.();
    stopListening = undefined;
    scope?.stop();
    scope = undefined;
  };

  const acquire = () => {
    consumers += 1;
    if (consumers === 1) start();
  };

  const release = () => {
    consumers = Math.max(0, consumers - 1);
    if (consumers === 0) stop();
  };

  return {
    settings,
    themeName,
    themeMode,
    contrastMode,
    motionMode,
    systemTheme,
    systemContrast,
    systemMotion,
    availableThemes,
    effectiveTheme,
    effectiveThemeMode,
    isDarkMode,
    effectiveContrast,
    effectiveMotion,
    applyTheme,
    saveConfig,
    configure,
    acquire,
    release,
  };
}

let state: ReturnType<typeof createThemeState> | undefined;

const getState = () => (state ??= effectScope(true).run(createThemeState)!);

// ============================================================
// COMPOSABLE
// ============================================================

/**
 * Thème, mode clair / sombre, contraste et mouvement, partagés par toute
 * l'application et posés sur `<html>` (data-theme, data-theme-mode…).
 *
 * - Dans un composant : le système est suivi du montage au démontage du
 *   dernier composant qui l'utilise (appelez-le dans App.vue pour le suivre
 *   en permanence). Les préférences enregistrées sont lues au montage, sans
 *   écart d'hydratation en rendu serveur.
 * - Hors composant (main.ts, store) : suivi aussitôt, jusqu'à la fin de la
 *   portée d'effets courante, ou pour toute la vie de la page.
 */
export function useTheme(options: UseThemeOptions = {}) {
  const {
    settings,
    themeName,
    themeMode,
    contrastMode,
    motionMode,
    systemTheme,
    systemContrast,
    systemMotion,
    availableThemes,
    effectiveTheme,
    effectiveThemeMode,
    isDarkMode,
    effectiveContrast,
    effectiveMotion,
    applyTheme,
    saveConfig,
    configure,
    acquire,
    release,
  } = getState();

  configure(options);

  if (getCurrentInstance()) {
    let acquired = false;
    onMounted(() => {
      acquired = true;
      acquire();
    });
    onScopeDispose(() => {
      if (acquired) release();
    });
  } else if (typeof window !== 'undefined') {
    acquire();
    if (getCurrentScope()) onScopeDispose(release);
  }

  const systemThemes = computed(() => availableThemes.value.filter((t) => t.category === 'system'));
  const colorThemes = computed(() => availableThemes.value.filter((t) => t.category === 'color'));
  const currentThemeMetadata = computed(
    () => availableThemes.value.find((t) => t.id === effectiveTheme.value) || availableThemes.value[0]
  );

  // ========================================
  // Actions
  // ========================================

  /**
   * Définit le thème visuel (identité de couleur). Le mode clair / sombre se
   * règle à part, avec setThemeMode() ou toggleMode().
   */
  const setTheme = (name: ThemeName) => {
    if (!availableThemes.value.some((t) => t.id === name)) {
      console.warn(`[SurgeUI] Theme '${name}' is not available in the current build.`);
      return;
    }
    themeName.value = name;
    saveConfig();
    applyTheme();
  };

  /** Définit le mode luminosité (light / dark / system). */
  const setThemeMode = (mode: ThemeMode) => {
    themeMode.value = normalizeMode(mode) ?? 'system';
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

  /** Bascule entre clair et sombre (depuis 'system' : l'opposé du mode appliqué). */
  const toggleMode = () => {
    themeMode.value = isDarkMode.value ? 'light' : 'dark';
    saveConfig();
    applyTheme();
  };

  /** Cycle à travers les thèmes disponibles (identité visuelle uniquement). */
  const cycleTheme = () => {
    const current = availableThemes.value.findIndex((t) => t.id === themeName.value);
    const next = (current + 1) % availableThemes.value.length;
    setTheme(availableThemes.value[next].id);
  };

  /** Oublie les préférences enregistrées et revient aux défauts. */
  const clearConfig = () => {
    try {
      if (settings.persist && typeof localStorage !== 'undefined') {
        localStorage.removeItem(settings.storageKey);
      }
    } catch (error) {
      console.error('[SurgeUI] Erreur suppression config thème:', error);
    }
    themeName.value = settings.defaultTheme;
    themeMode.value = settings.defaultThemeMode;
    contrastMode.value = 'auto';
    motionMode.value = 'auto';
    applyTheme();
  };

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
    systemTheme: computed(() => systemTheme.value),
    systemContrast: computed(() => systemContrast.value),
    systemMotion: computed(() => systemMotion.value),
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
    cycleTheme,
    clearConfig,
  };
}
