import type { ThemeConfig } from './types/theme';

/**
 * Configuration globale du Design System
 * 
 * Permet de spécifier quels thèmes inclure lors du build
 * pour optimiser la taille du bundle CSS
 */
export const themeConfig: ThemeConfig = {
  /**
   * Thèmes à inclure dans le build
   * Par défaut, seuls light et dark sont inclus
   * 
   * Pour inclure tous les thèmes :
   * themes: ['light', 'dark', 'ocean', 'forest', 'sunset']
   */
  themes: ['light', 'dark', 'ocean', 'forest', 'sunset'],
  
  /**
   * Thème par défaut au chargement
   */
  defaultTheme: 'auto',
  
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