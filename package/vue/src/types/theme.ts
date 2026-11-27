// ============================================================
// TYPES POUR LE SYSTÈME DE THÈMES
// ============================================================

export type ThemeName = 'default' | 'ocean' | 'forest' | 'sunset';
export type ThemeMode = 'light' | 'dark' | 'system';
export type ContrastMode = 'normal' | 'high' | 'auto';
export type MotionMode = 'normal' | 'reduce' | 'auto';

/**
 * Types dépréciés — rétrocompatibilité
 * @deprecated Utiliser ThemeName + ThemeMode à la place
 */
export type DeprecatedThemeName = 'light' | 'dark';

/**
 * Configuration du Design System
 */
export interface ThemeConfig {
  /**
   * Liste des thèmes à inclure dans le build
   * Plus de thèmes = bundle CSS plus volumineux
   */
  themes: ThemeName[];

  /**
   * Thème par défaut
   */
  defaultTheme: ThemeName;

  /**
   * Mode par défaut (light / dark / auto)
   * @default 'auto'
   */
  defaultThemeMode?: ThemeMode;

  /**
   * Préfixe des CSS variables
   */
  prefix?: string;

  /**
   * Support du contraste élevé
   */
  highContrast?: boolean;

  /**
   * Support de reduced-motion
   */
  reducedMotion?: boolean;

  /**
   * Clé localStorage
   */
  storageKey?: string;
}

/**
 * Métadonnées d'un thème
 */
export interface ThemeMetadata {
  id: ThemeName;
  name: string;
  description: string;
  category: 'system' | 'color';
  preview: {
    primary: string;
    background: string;
    surface: string;
  };
  /**
   * Indique si le thème est inclus dans le build
   */
  available: boolean;
}

/**
 * Configuration personnalisée du thème (persistée en localStorage)
 */
export interface UserThemeConfig {
  theme: ThemeName;
  themeMode: ThemeMode;
  contrast: ContrastMode;
  motion: MotionMode;
}

/**
 * Options pour le composable useTheme
 */
export interface UseThemeOptions {
  /**
   * Thèmes disponibles (overrides la config globale)
   */
  availableThemes?: ThemeName[];

  /**
   * Thème par défaut
   */
  defaultTheme?: ThemeName;

  /**
   * Mode par défaut
   */
  defaultThemeMode?: ThemeMode;

  /**
   * Clé de stockage localStorage
   */
  storageKey?: string;

  /**
   * Activer la persistance
   */
  persist?: boolean;
}
