# Guide des Couleurs

Le système de couleurs est organisé en trois niveaux hiérarchiques : palettes brutes, tokens sémantiques et variables CSS. Cette architecture garantit cohérence, accessibilité et facilité de maintenance.

## Architecture des couleurs

### Niveaux hiérarchiques

```
Palettes brutes (foundations)
    ↓
Tokens sémantiques (themes)
    ↓
Variables CSS (runtime)
```

1. **Palettes brutes** : Couleurs pures définies une seule fois
2. **Tokens sémantiques** : Attribution de sens contextuel aux couleurs
3. **Variables CSS** : Application dynamique selon le thème actif

## Palettes de base

### Primary (Bleu)

Couleur principale de la marque, utilisée pour les actions primaires et éléments clés.

| Nuance | Hex | Usage |
|--------|-----|-------|
| 50 | `#eff6ff` | Backgrounds très légers |
| 100 | `#dbeafe` | Backgrounds légers |
| 200 | `#bfdbfe` | Borders subtiles |
| 300 | `#93c5fd` | Hover states légers |
| 400 | `#60a5fa` | Liens mode sombre |
| 500 | `#3b82f6` | **Couleur principale** |
| 600 | `#2563eb` | Actions primaires |
| 700 | `#1d4ed8` | Hover primaire |
| 800 | `#1e40af` | Active states |
| 900 | `#1e3a8a` | Liens visités |
| 950 | `#172554` | Texte sur fond clair bleu |

**Contraste minimum** : 600 sur blanc (4.5:1 - AA), 700 recommandé (7:1 - AAA)

### Gray (Neutres)

Base pour textes, backgrounds et bordures. Contraste WCAG vérifié.

| Nuance | Hex | Contraste sur blanc | Usage |
|--------|-----|---------------------|-------|
| 50 | `#f9fafb` | - | Canvas light |
| 100 | `#f3f4f6` | - | Backgrounds désactivés |
| 200 | `#e5e7eb` | - | Borders subtiles |
| 300 | `#d1d5db` | - | Borders par défaut |
| 400 | `#9ca3af` | 4.6:1 | Texte désactivé (AA) |
| 500 | `#6b7280` | 4.7:1 | **Texte tertiaire** (AA) |
| 600 | `#4b5563` | 7.3:1 | Borders fortes (AAA) |
| 700 | `#374151` | 9.3:1 | **Texte secondaire** (AAA) |
| 800 | `#1f2937` | 13.1:1 | Surface dark |
| 900 | `#111827` | 16.8:1 | **Texte principal** (AAA) |
| 950 | `#030712` | 19.4:1 | Canvas dark |

::: tip Contraste WCAG
- **AA** : 4.5:1 minimum (texte normal)
- **AAA** : 7:1 recommandé (meilleure lisibilité)
:::

### Success (Vert)

Retours positifs, validation, succès d'opérations.

| Nuance | Hex | Usage |
|--------|-----|-------|
| 50 | `#ecfdf5` | Background success léger |
| 100 | `#d1fae5` | Background success |
| 500 | `#10b981` | **Icônes success dark** |
| 600 | `#059669` | Texte success light |
| 700 | `#047857` | Hover success |

**Exemple** : Notifications de succès, indicateurs de validation, badges actifs.

### Warning (Ambre)

Avertissements, actions nécessitant attention.

| Nuance | Hex | Usage |
|--------|-----|-------|
| 50 | `#fffbeb` | Background warning léger |
| 100 | `#fef3c7` | Background warning |
| 500 | `#f59e0b` | **Icônes warning dark** |
| 600 | `#d97706` | Texte warning light |
| 700 | `#b45309` | Hover warning |

**Exemple** : Alertes non bloquantes, sections nécessitant attention, badges de mise à jour.

### Error (Rouge)

Erreurs, actions destructives, états critiques.

| Nuance | Hex | Usage |
|--------|-----|-------|
| 50 | `#fef2f2` | Background error léger |
| 100 | `#fee2e2` | Background error |
| 500 | `#ef4444` | **Icônes error dark** |
| 600 | `#dc2626` | Texte error light |
| 700 | `#b91c1c` | Hover error |

**Exemple** : Messages d'erreur, boutons de suppression, indicateurs d'échec.

### Info (Cyan)

Information neutre, aide contextuelle.

| Nuance | Hex | Usage |
|--------|-----|-------|
| 50 | `#ecfeff` | Background info léger |
| 100 | `#cffafe` | Background info |
| 500 | `#06b6d4` | **Icônes info dark** |
| 600 | `#0891b2` | Texte info light |
| 700 | `#0e7490` | Hover info |

**Exemple** : Tooltips, messages informatifs, badges de documentation.

## Palettes thématiques

### Ocean

Ambiance maritime professionnelle avec dominante cyan et accents corail.

**Couleurs clés** :
- Primary : `#f97316` (Corail) - Contraste sur fond océan
- Background : `#e0f2fe` (Bleu ciel)
- Accent : `#0891b2` (Cyan)

**Cas d'usage** : Applications de voyage, dashboards d'analyse, interfaces financières.

### Forest

Inspiration naturelle avec verts et orange automne.

**Couleurs clés** :
- Primary : `#f97316` (Orange automne)
- Background : `#f7fee7` (Vert pâle)
- Accent : `#16a34a` (Vert forêt)

**Cas d'usage** : Applications écologiques, santé/bien-être, éducation.

### Sunset

Palette chaleureuse avec rose, violet et orange.

**Couleurs clés** :
- Primary : `#db2777` (Rose)
- Background : `#fff7ed` (Pêche)
- Accent : `#a855f7` (Violet)

**Cas d'usage** : Applications créatives, réseaux sociaux, divertissement.

## Utilisation des couleurs

### Dans les composants

```vue
<style scoped lang="scss">
.component {
  /* ❌ Éviter : Couleurs en dur */
  color: #111827;
  background: #ffffff;
  
  /* ✅ Recommandé : Variables CSS */
  color: var(--su-text-primary);
  background-color: var(--su-bg-surface);
}
</style>
```

### Couleurs sémantiques

Utilisez toujours les tokens sémantiques plutôt que les couleurs brutes :

```scss
// ❌ Mauvais
.button {
  background: #3b82f6;
}

// ✅ Bon
.button {
  background-color: var(--su-primary-default);
  
  &:hover {
    background-color: var(--su-primary-hover);
  }
}
```

### États interactifs

Les couleurs d'états sont automatiquement gérées :

```vue
<style scoped lang="scss">
.interactive-element {
  background-color: var(--su-bg-surface);
  
  &:hover {
    background-color: var(--su-bg-hover);
  }
  
  &:active {
    background-color: var(--su-bg-active);
  }
  
  &:disabled {
    background-color: var(--su-bg-disabled);
    color: var(--su-text-disabled);
  }
}
</style>
```

## Accessibilité des couleurs

### Contraste de texte

Le système garantit un contraste minimum selon WCAG 2.1 :

| Niveau | Ratio | Usage |
|--------|-------|-------|
| AA (minimum) | 4.5:1 | Texte normal (16px+) |
| AA Large | 3:1 | Texte large (18px+ ou 14px bold) |
| AAA (recommandé) | 7:1 | Texte normal pour meilleure lisibilité |
| AAA Large | 4.5:1 | Texte large |

### Vérification du contraste

```scss
// Texte principal : TOUJOURS AAA (7:1+)
.text-primary {
  color: var(--su-text-primary); // gray-900 sur blanc = 16.8:1 ✓
}

// Texte secondaire : AAA recommandé
.text-secondary {
  color: var(--su-text-secondary); // gray-700 sur blanc = 9.3:1 ✓
}

// Texte tertiaire : AA minimum
.text-tertiary {
  color: var(--su-text-tertiary); // gray-500 sur blanc = 4.7:1 ✓
}
```

### Mode contraste élevé

En mode contraste élevé, les couleurs sont automatiquement renforcées :

```scss
// Mode normal
[data-contrast="normal"] {
  --su-text-primary: #111827;
  --su-border-default: #d1d5db;
}

// Mode contraste élevé
[data-contrast="high"] {
  --su-text-primary: #000000; // Noir pur
  --su-border-default: #000000; // Bordures visibles partout
}
```

### Ne jamais utiliser la couleur seule

Combinez toujours la couleur avec d'autres indicateurs visuels :

```vue
<template>
  <!-- ❌ Mauvais : Couleur seule -->
  <span class="status-success">Actif</span>
  
  <!-- ✅ Bon : Couleur + icône + texte -->
  <span class="status-success">
    <IconCheck />
    <span>Actif</span>
  </span>
</template>
```

## Transparence et overlays

### Overlays recommandés

```scss
// Overlay sombre (modales, dropdowns)
.overlay-dark {
  background-color: rgba(0, 0, 0, 0.5); // 50% noir
}

// Overlay clair (sur fond sombre)
.overlay-light {
  background-color: rgba(255, 255, 255, 0.1); // 10% blanc
}

// Utilisation avec variables
.modal-backdrop {
  background-color: var(--su-bg-overlay); // S'adapte au thème
}
```

### Hover et focus states

```scss
.button {
  background-color: var(--su-primary-default);
  
  // Hover : assombrir de 10%
  &:hover {
    background-color: color-mix(
      in srgb, 
      var(--su-primary-default) 90%, 
      black
    );
  }
  
  // Ou utiliser le token dédié
  &:hover {
    background-color: var(--su-primary-hover);
  }
}
```

## Color-mix et manipulations

### Éclaircir / Assombrir

```scss
// Éclaircir de 20%
.lighter {
  background-color: color-mix(
    in srgb,
    var(--su-primary-default) 80%,
    white
  );
}

// Assombrir de 20%
.darker {
  background-color: color-mix(
    in srgb,
    var(--su-primary-default) 80%,
    black
  );
}
```

### Opacité

```scss
// Via rgba (si couleur hex)
.semi-transparent {
  background-color: rgba(59, 130, 246, 0.5); // 50% opacité
}

// Via color-mix
.semi-transparent-dynamic {
  background-color: color-mix(
    in srgb,
    var(--su-primary-default) 50%,
    transparent
  );
}
```

## Bonnes pratiques

### ✅ À faire

- Utiliser les variables CSS pour toutes les couleurs
- Respecter les tokens sémantiques
- Vérifier le contraste (minimum AA, recommandé AAA)
- Tester en mode contraste élevé
- Combiner couleur + forme + texte pour l'information

### ❌ À éviter

- Couleurs en dur dans les composants
- Couleurs brutes des palettes directement
- Contraste insuffisant (< 4.5:1)
- Information uniquement par la couleur
- Trop de couleurs différentes (confusion visuelle)

## Outils de développement

### Extension navigateur

- **Stark** : Vérification du contraste en temps réel
- **Colorblindly** : Simulation des déficiences visuelles
- **WAVE** : Audit d'accessibilité complet

### En ligne

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Coolors](https://coolors.co/contrast-checker)
- [Color Review](https://color.review/)

### DevTools

```javascript
// Dans la console du navigateur
const styles = getComputedStyle(document.documentElement);
const primary = styles.getPropertyValue('--su-primary-default');
console.log('Couleur primaire:', primary);
```

## Exemples de palettes personnalisées

### Palette corporate

```scss
// themes/corporate/_tokens.scss
$theme-corporate: (
  'primary-default': #003d82,    // Bleu corporate
  'primary-hover': #002a5c,
  'primary-text': #ffffff,
  
  'secondary-default': #f5f5f5,
  'secondary-text': #003d82,
  
  'text-primary': #1a1a1a,
  'text-secondary': #4a4a4a,
  
  'bg-canvas': #fafafa,
  'bg-surface': #ffffff,
);
```

### Palette gaming

```scss
// themes/gaming/_tokens.scss
$theme-gaming: (
  'primary-default': #ff0080,    // Rose néon
  'primary-hover': #cc0066,
  'primary-text': #000000,
  
  'secondary-default': #00ff9f,  // Vert néon
  'secondary-text': #000000,
  
  'text-primary': #ffffff,
  'text-secondary': #b3b3b3,
  
  'bg-canvas': #0a0a0f,         // Presque noir
  'bg-surface': #16161f,
);
```

## FAQ

### Puis-je ajouter mes propres couleurs ?

Oui ! Créez un thème personnalisé avec vos couleurs. Voir [Créer un thème personnalisé](./themes.md#créer-un-thème-personnalisé).

### Comment tester l'accessibilité des couleurs ?

Utilisez les outils DevTools et les extensions navigateur mentionnés ci-dessus. Testez également en mode contraste élevé.

### Les couleurs changent automatiquement avec le thème ?

Oui, si vous utilisez les variables CSS (`var(--su-*)`). Les couleurs en dur ne s'adapteront pas.

### Quelle différence entre primary-600 et primary-default ?

`primary-600` est une couleur brute de la palette. `primary-default` est un token sémantique qui peut pointer vers n'importe quelle couleur selon le thème actif.

## Ressources

- [Système de thèmes](./themes.md)
- [Tokens sémantiques](./tokens.md)
- [Accessibilité](./accessibility.md)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)