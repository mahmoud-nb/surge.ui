---
description: Vérifie les contrastes WCAG AA pour les tokens d'un thème SurgeUI
---

Tu es un expert en accessibilité WCAG 2.1. Analyse les tokens de couleur des thèmes SurgeUI et calcule les ratios de contraste.

## Arguments

L'utilisateur passe : `<theme> <mode>` ou `all`
Exemples : `ocean dark`, `forest light`, `all`

Arguments reçus : $ARGUMENTS

## Fichiers sources

Les tokens sont dans `package/src/styles/themes/<theme>/tokens/<mode>.scss`.
Thèmes disponibles : `default`, `ocean`, `forest`, `sunset`
Modes : `light`, `dark`

## Algorithme de contraste WCAG 2.1

Pour calculer le ratio entre deux couleurs hex :
1. Convertir chaque composante RGB de 0–255 en linéaire : `c_lin = c/255 <= 0.03928 ? c/255/12.92 : ((c/255+0.055)/1.055)^2.4`
2. Luminance relative : `L = 0.2126*R + 0.7152*G + 0.0722*B`
3. Ratio : `(L_plus_clair + 0.05) / (L_plus_sombre + 0.05)`

Seuils WCAG :
- **✅ AA** : ratio ≥ 4.5:1 (texte normal)
- **⚠️ AA Large** : ratio ≥ 3:1 (texte ≥ 18px ou 14px gras)
- **❌ FAIL** : ratio < 3:1

## Paires à vérifier pour chaque thème/mode

| Paire | Tokens | Exigence |
|-------|--------|----------|
| Texte principal sur canvas | `text-primary` / `bg-canvas` | AA |
| Texte principal sur surface | `text-primary` / `bg-surface` | AA |
| Texte secondaire sur canvas | `text-secondary` / `bg-canvas` | AA |
| Texte tertiaire sur canvas | `text-tertiary` / `bg-canvas` | AA Large |
| Texte bouton primaire | `primary-text` / `primary-default` | AA |
| Texte bouton secondaire | `secondary-text` / `secondary-default` | AA |
| Texte sur fond inversé | `text-on-inverse` / `bg-inverse` | AA |
| Lien par défaut sur canvas | `link-default` / `bg-canvas` | AA |
| Succès sur fond succès | `state-success` / `state-success-bg` | AA Large |
| Erreur sur fond erreur | `state-error` / `state-error-bg` | AA Large |
| Avertissement sur fond | `state-warning` / `state-warning-bg` | AA Large |
| Info sur fond info | `state-info` / `state-info-bg` | AA Large |

## Format de sortie attendu

Produis un rapport structuré par thème/mode :

```
## Thème: ocean / Mode: dark

| Paire | Couleur avant | Couleur fond | Ratio | Résultat |
|-------|--------------|--------------|-------|----------|
| text-primary / bg-canvas | #e0f7fa | #071828 | 14.2:1 | ✅ AA |
| primary-text / primary-default | #fff | #f97316 | 2.8:1 | ❌ FAIL |
...

Résumé : 10 ✅ AA — 1 ⚠️ AA Large — 1 ❌ FAIL
```

Si un token a une valeur `rgba(...)`, utilise la couleur opaque équivalente sur le fond concerné.
Si un token est une variable SCSS (`$ocean-coral-500`), résous-le depuis le fichier `_color.scss` du thème.

Commence par lire le(s) fichier(s) de tokens indiqués, puis calcule chaque ratio et produis le rapport complet.
