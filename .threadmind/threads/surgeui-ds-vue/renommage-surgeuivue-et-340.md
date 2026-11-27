---
id: renommage-surgeuivue-et-340
title: Renommage @surgeui/vue et 3.4.0
parentId: main
author: mahmoud-a1f1
createdAt: 2026-11-27T07:03:53.194Z
updatedAt: 2026-11-27T14:14:49.050Z
branch: refactor/package-vue
commit: 7fba6ef48404aac5938503fd848d5081b8387202
paths: ["package/vue","package/ds-vue","package.json",".versionrc.json",".github/workflows","docs/guide/migration.md","docs/en/guide/migration.md"]
---

## Decisions
- Pas de 3.4.0 ni de 3.5.0 : tout le travail (renommage, composants des deux lots, retrait des API dépréciées) sort directement en **4.0.0**.
- Paquet renommé `@surgeui/vue`. Relais `@surgeui/ds-vue` publié **une seule fois, en 4.0.0** (dépendance exacte sur `@surgeui/vue@4.0.0`, réexport du module pour partager les clés d'injection, feuilles de style copiées) ; ensuite `npm deprecate "@surgeui/ds-vue@*" "Renommé : installez @surgeui/vue"` (par l'utilisateur) et suppression de package/ds-vue du dépôt.
- Release : publication de `@surgeui/vue` puis du relais, ce dernier gardé par `env.VERSION == '4.0.0'` ; chacun ignoré s'il est déjà sur npm. Updater standard-version `package/ds-vue/scripts/version-updater.cjs` (version + dépendance).
- Intégration sur une branche **next** (créée depuis main 17a56d7) : les PR du travail 4.0 visent next ; deploy.yml construit next et ses PR sans déployer ; main et surgeui.com restent en 3.3.0 jusqu'à la fusion de next dans main pour la release.
- Les 6 API `@deprecated` sont retirées en 4.0.0 (BREAKING CHANGES + guide de migration avec remplaçants) : trapFocus et announceToScreenReader (utils/accessibility.ts), ancien type de thème (types/theme.ts), méthode de useTheme remplacée par toggleMode, prop sans effet du Dialog (types/index.ts ~1264), option séparateur (types/index.ts ~666).
- Lots de composants pour la 4.0.0 : NavMenu, AppShell, PageHeader, SkipLink, ThemeToggle, tests axe ; puis Stat, Timeline, Rating, Prose, CopyButton/CodeBlock, useClipboard.

## Constraints
- Commits au nom de l'utilisateur, sans trailer Co-Authored-By ; noms de paquets scopés entre accents graves dans les sujets de commit.
- Push, PR, fusion et release seulement avec l'accord de l'utilisateur.
- NPM_TOKEN (environnement `npm`) doit pouvoir créer le nouveau paquet `@surgeui/vue`.
- Fichiers `.claude/` et CLAUDE.md non modifiés sans accord explicite de l'utilisateur.
- standard-version propose 3.4.0 tant qu'aucun commit ne porte de BREAKING CHANGE : le retrait des API dépréciées doit en porter un (ou release avec `npm run release:major`).

## State
- **4.0.0 publiée le 2026-11-27.** PR #13 (next → main) fusionnée (5e421fe) ; commit de release `chore(release): 4.0.0` (33d15fb, CHANGELOG, trois package.json, lockfile mis à jour dans le même commit car le relais dépend exactement de @surgeui/vue 4.0.0 et `npm ci` l'exige) ; tag annoté v4.0.0.
- Workflow Release 46009432851 réussi à toutes les étapes ; `@surgeui/vue@4.0.0` puis `@surgeui/ds-vue@4.0.0` publiés (latest, provenance Sigstore). L'API de lecture npm a mis quelques minutes à refléter le nouveau paquet.
- Vérifié de l'extérieur : installation depuis npm dans un dossier temporaire, require (133 exports, plugin) et import ESM, relais = même module, signatures et attestations vérifiées ; release GitHub v4.0.0 « Latest » (liens github.com, pas de fausses références) ; surgeui.com (pastille v4.0.0, guide de migration, nouvelles pages) et Storybook (4.0.0) déployés.
- Note pour les prochaines releases : si une dépendance exacte entre workspaces change de version, mettre à jour package-lock.json dans le commit de release (npm run release -- --skip.commit --skip.tag, npm install --package-lock-only, commit + tag -a manuels).

## Next steps
- @surgeui/ds-vue déprécié sur npm par l'utilisateur (toutes versions). Étiquette beta → 1.0.3 encore présente (l'utilisateur peut la retirer : npm dist-tag rm @surgeui/ds-vue beta).
- PR mahmoud-nb/surge.ui#17 vers main (chore/retire-relais-ds-vue, 7fba6ef) : retrait de package/ds-vue, workspace, build/publish, .versionrc, étapes relais de release.yml, tests/relay.spec.ts, ligne README. Vérifié : 328 tests, typecheck, lint, build, CommonJS, release:dry (4.0.1 sur deux package.json). Le travail se fait désormais depuis main.
- Options : branches fusionnées à supprimer (next…), notes des releases v3.2.0/v3.3.0, lint/tests/typecheck en CI des PR, fichiers `.claude/` et CLAUDE.md.