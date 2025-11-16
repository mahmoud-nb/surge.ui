import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vuePlugin from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import globals from 'globals';

// Définition des globals navigateur (réutilisable)
const browserGlobals = {
  window: 'readonly',
  document: 'readonly',
  navigator: 'readonly',
  console: 'readonly',
  setTimeout: 'readonly',
  setInterval: 'readonly',
  clearTimeout: 'readonly',
  clearInterval: 'readonly',
  requestAnimationFrame: 'readonly',
  cancelAnimationFrame: 'readonly',
  // Types DOM
  HTMLElement: 'readonly',
  HTMLDivElement: 'readonly',
  HTMLSpanElement: 'readonly',
  HTMLInputElement: 'readonly',
  HTMLButtonElement: 'readonly',
  HTMLFormElement: 'readonly',
  HTMLAnchorElement: 'readonly',
  HTMLImageElement: 'readonly',
  HTMLSelectElement: 'readonly',
  HTMLTextAreaElement: 'readonly',
  Element: 'readonly',
  Node: 'readonly',
  NodeList: 'readonly',
  NodeListOf: 'readonly',
  // Événements
  Event: 'readonly',
  MouseEvent: 'readonly',
  KeyboardEvent: 'readonly',
  FocusEvent: 'readonly',
  InputEvent: 'readonly',
  PointerEvent: 'readonly',
  TouchEvent: 'readonly',
  WheelEvent: 'readonly',
  CustomEvent: 'readonly',
  EventTarget: 'readonly',
  // Autres APIs
  MutationObserver: 'readonly',
  IntersectionObserver: 'readonly',
  ResizeObserver: 'readonly',
  FormData: 'readonly',
  URLSearchParams: 'readonly',
};

const nodeGlobals = {
  process: 'readonly',
  __dirname: 'readonly',
  __filename: 'readonly',
  module: 'readonly',
  require: 'readonly',
  exports: 'writable',
  global: 'readonly',
  Buffer: 'readonly',
  console: 'readonly',
  setTimeout: 'readonly',
  setInterval: 'readonly',
  clearTimeout: 'readonly',
  clearInterval: 'readonly',
}

export default [
  // Règles recommandées JavaScript
  js.configs.recommended,
  
  // Configuration pour les fichiers JavaScript/TypeScript
  {
    files: [
      '**/*.{js,mjs,cjs,ts,mts,cts}',
      '**/*.config.{js,ts,mjs,mts}',  // Tous les fichiers *.config.js/ts
      '**/vite.config.{js,ts}',       // Configuration Vite
      '**/.storybook/**/*.{js,ts}',   // Tous les fichiers Storybook
      '**/vitest.config.{js,ts}',     // Configuration Vitest
      '**/eslint.config.{js,mjs}',    // Configuration ESLint
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,  // ✅ Tous les globals du navigateur
        // Environnement navigateur
        ...browserGlobals
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // Règles TypeScript recommandées
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      // Désactive la règle JS de base pour éviter les conflits avec TypeScript
      'no-unused-vars': 'off',
    },
  },
  
  // Configuration pour les fichiers Vue
  ...vuePlugin.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,  // ✅ Tous les globals du navigateur
        // Environnement navigateur
        ...browserGlobals,
        ...nodeGlobals
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // Règles Vue personnalisées
      'vue/multi-word-component-names': 'off', // 'warn'
      'vue/no-unused-vars': 'warn',
      'vue/require-default-prop': 'off',
      // Règles TypeScript pour les fichiers Vue
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      '@typescript-eslint/no-explicit-any': 'off',
      // Désactive la règle JS de base
      'no-unused-vars': 'off',
    },
  },
  
  // Fichiers à ignorer
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.vitepress/cache/**',
      '**/.vitepress/dist/**',
      "**/storybook-static/**"
    ],
  },
];