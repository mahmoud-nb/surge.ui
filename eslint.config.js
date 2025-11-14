import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vuePlugin from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';

export default [
  // Règles recommandées JavaScript
  js.configs.recommended,
  
  // Configuration pour les fichiers JavaScript/TypeScript
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // Règles TypeScript recommandées
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-inferrable-types': 'off',
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
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // Règles Vue personnalisées
      'vue/multi-word-component-names': 'warn',
      'vue/no-unused-vars': 'warn',
      'vue/require-default-prop': 'off',
      // Règles TypeScript pour les fichiers Vue
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  
  // Fichiers à ignorer
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.vitepress/cache/**',
      '**/.vitepress/dist/**',
    ],
  },
];