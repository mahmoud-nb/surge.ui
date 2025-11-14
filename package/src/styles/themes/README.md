```css
:root {
  /* --- 1. Variables STATIQUES --- */
  --su-radius-global: 0.5rem;
  --su-radius-box: 0.75rem;
  --su-radius-field: 0.375rem;
  --su-radius-button: 0.375rem;
  --su-shadow-default: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  --su-shadow-focus: 0 0 0 3px rgba(59, 130, 246, 0.5);
  --su-font-family-base: "Inter", sans-serif;
  --su-font-family-mono: monospace;
  --su-font-size-base: 1rem;

  /* --- 2. Variables Thème LIGHT (Défaut) --- */
  /* Texte */
  --su-text-primary-color: #111827;
  --su-text-secondary-color: #374151;
  --su-text-tertiary-color: #6b7280;
  /* Liens */
  --su-link-default-color: #2563eb;
  --su-link-primary-color: #1d4ed8;
  --su-link-secondary-color: #374151;
  --su-link-muted-color: #9ca3af;
  /* Backgrounds */
  --su-bg-global-color: #f9fafb;
  --su-bg-box-color: #ffffff;
  --su-bg-field-color: #ffffff;
  /* Bordures */
  --su-border-default-color: #d1d5db;
  --su-border-focus-color: #3b82f6;
  /* États */
  --su-state-success-color: #16a34a;
  --su-state-error-color: #dc2626;
  --su-state-warning-color: #f59e0b;
  --su-state-info-color: #0284c7;


  @media (prefers-color-scheme: dark) {
    :root {
      /* --- 3. Variables Thème DARK (Auto) --- */
      /* Texte */
      --su-text-primary-color: #f9fafb;
      --su-text-secondary-color: #e5e7eb;
      --su-text-tertiary-color: #9ca3af;
      /* Liens */
      --su-link-default-color: #60a5fa;
      --su-link-primary-color: #93c5fd;
      --su-link-secondary-color: #e5e7eb;
      --su-link-muted-color: #6b7280;
      /* Backgrounds */
      --su-bg-global-color: #111827;
      --su-bg-box-color: #1f2937;
      --su-bg-field-color: #374151;
      /* Bordures */
      --su-border-default-color: #4b5563;
      --su-border-focus-color: #60a5fa;
      /* États */
      --su-state-success-color: #4ade80;
      --su-state-error-color: #f87171;
      --su-state-warning-color: #facc15;
      --su-state-info-color: #38bdf8;
    }
  }
}
```



```scss
/**
 * Mixin pour générer les propriétés CSS personnalisées (--variable)
 * en fonction du thème (light ou dark).
 * @param {string} $theme - Le thème à appliquer ('light' ou 'dark').
 */
@mixin generate-text-variables($theme: 'light') {
  // Déterminer quelles maps utiliser pour les couleurs de base et inversées
  $base-map: if($theme == 'dark', $su-text-variants-dark, $su-text-variants);
  $invert-map: if($theme == 'dark', $su-text-variants, $su-text-variants-dark);

  // Itérer sur les paires clé-valeur de la map de base choisie
  @each $key, $color in $base-map {
    // 1. Couleur de texte principale pour le thème actuel
    --su-text-#{$key}-color: #{$color};

    // 2. Couleur inversée pour le thème actuel
    $inverted-color: map.get($invert-map, $key);
    
    // S'assurer que la couleur inversée existe
    @if $inverted-color {
      --su-invert-text-#{$key}-color: #{$inverted-color};
    }
  }
}
```