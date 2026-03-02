// ============================================================
// TYPES POUR LE SYSTÈME DE THÈMES
// ============================================================

export type ThemeName = 'light' | 'dark' | 'ocean' | 'forest' | 'sunset' | 'auto';
export type ContrastMode = 'normal' | 'high' | 'auto';
export type MotionMode = 'normal' | 'reduce' | 'auto';

/**
 * Configuration du Design System
 */
export interface ThemeConfig {
  /**
   * Liste des thèmes à inclure dans le build
   * Plus de thèmes = bundle CSS plus volumineux
   */
  themes: Exclude<ThemeName, 'auto'>[];
  
  /**
   * Thème par défaut
   */
  defaultTheme: ThemeName;
  
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
  id: Exclude<ThemeName, 'auto'>;
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
 * Configuration personnalisée du thème
 */
export interface UserThemeConfig {
  theme: ThemeName;
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
  availableThemes?: Exclude<ThemeName, 'auto'>[];
  
  /**
   * Thème par défaut
   */
  defaultTheme?: ThemeName;
  
  /**
   * Clé de stockage localStorage
   */
  storageKey?: string;
  
  /**
   * Activer la persistance
   */
  persist?: boolean;
}