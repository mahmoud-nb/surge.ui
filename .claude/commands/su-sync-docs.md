---
description: Synchronise la structure des docs FR ↔ EN et détecte les sections désynchronisées
---

Tu es un expert de la documentation VitePress bilingue. Analyse et synchronise les fichiers de documentation du Design System SurgeUI.

## Arguments

L'utilisateur passe : `<composant>` ou `all`
Exemples : `badge`, `button`, `all`

Arguments reçus : $ARGUMENTS

## Structure docs

```
docs/
├── components/<nom>.md          — Documentation FR (référence)
└── en/components/<nom>.md       — Documentation EN (à synchroniser)
```

## Mode : composant unique (`sync-docs badge`)

1. Lis `docs/components/<nom>.md` (FR — source de vérité)
2. Lis `docs/en/components/<nom>.md` (EN — cible)
3. Compare les **sections H2 et H3** entre les deux fichiers
4. Compare le **tableau API Props** : vérifie que chaque prop FR est présente en EN
5. Produis un rapport :

```
## Rapport sync: badge

### Sections manquantes en EN
- `## Tailles` → absent de en/components/badge.md

### Props manquantes en EN
- `backgroundColor` → présente en FR, absente du tableau EN

### Sections supplémentaires en EN (pas en FR)
- Aucune

### Statut : ⚠️ 2 différences détectées
```

6. Si l'utilisateur confirme, **met à jour `docs/en/components/<nom>.md`** :
   - Ajoute les sections manquantes avec le même HTML/code mais le texte EN en placeholder : `<!-- TODO: translate -->`
   - Ajoute les props manquantes dans le tableau API EN
   - Ne modifie JAMAIS le texte EN déjà rédigé

## Mode : scan global (`sync-docs all`)

1. Liste tous les fichiers dans `docs/components/*.md`
2. Pour chaque fichier, vérifie si le correspondant EN existe dans `docs/en/components/`
3. Pour les fichiers existants des deux côtés, compte les sections H2/H3 et compare
4. Produis un tableau récapitulatif :

```
## Rapport global sync docs

| Composant | FR sections | EN sections | Manquant EN | Statut |
|-----------|------------|------------|-------------|--------|
| badge     | 8          | 8          | 0           | ✅ |
| button    | 10         | 7          | 3           | ⚠️ |
| accordion | 6          | —          | fichier absent | ❌ |
...

Résumé : 24 ✅ — 8 ⚠️ — 2 ❌
```

5. Demande confirmation avant de faire des modifications

## Règles

- La version **FR est toujours la source de vérité**
- Ne jamais supprimer de contenu EN déjà rédigé
- Ne jamais traduire automatiquement — seulement ajouter des placeholders `<!-- TODO: translate -->`
- Les blocs `<div class="component-demo">` et `\`\`\`vue` sont copiés tels quels (le code Vue est identique FR/EN)
- Seul le **texte prose** (titres, descriptions, contenu tableau) nécessite traduction
