import type { ThemeConfig } from './types/theme';

/**
 * Configuration globale du Design System
 *
 * Permet de spécifier quels thèmes inclure lors du build
 * pour optimiser la taille du bundle CSS
 */
export const themeConfig: ThemeConfig = {
  /**
   * Thèmes à inclure dans le build.
   * 'default' regroupe les anciens thèmes 'light' et 'dark'.
   * Pour inclure tous les thèmes :
   * themes: ['default', 'ocean', 'forest', 'sunset']
   */
  themes: ['default', 'ocean', 'forest', 'sunset'],

  /**
   * Thème par défaut au chargement
   */
  defaultTheme: 'default',

  /**
   * Mode par défaut (light / dark / auto)
   * 'light' : affichage clair garanti si rien n'est configuré
   */
  defaultThemeMode: 'light',

  /**
   * Préfixe pour les CSS variables
   * @default 'su'
   */
  prefix: 'su',

  /**
   * Activer le support du contraste élevé
   * @default true
   */
  highContrast: true,

  /**
   * Activer le support de reduced-motion
   * @default true
   */
  reducedMotion: true,

  /**
   * Clé de stockage localStorage
   * @default 'su-theme-config'
   */
  storageKey: 'su-theme-config',
};

export default themeConfig;
