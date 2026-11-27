---
id: couche-assistants-ia-llmstxt-agentsmd
title: Couche assistants IA (llms.txt, AGENTS.md)
parentId: main
author: mahmoud-a1f1
createdAt: 2026-11-27T16:20:18.962Z
updatedAt: 2026-11-27T17:09:19.272Z
branch: feat/llm-docs
commit: f1798649ce0b7ffe7670e680e0eb13560fdd7b86
---

## State
- Niveau 1 fusionné (PR #18).
- Niveau 2 : PR mahmoud-nb/surge.ui#19 vers main (feat/api-manifest).
  - package/vue/scripts/api-manifest.mjs (vue-component-meta 2.2.12, même version que vue-tsc), lancé par `npm run build` de package/vue (`vite build && npm run api`) : dist/api.json, 89 composants, 1394 props (type : unions développées, boolean, Component), 219 événements, 125 slots, méthodes exposées. Export `./api.json`. release.yml vérifie présence, taille et version.
  - docs/scripts/llms.mjs copie api.json en /api.json et le cite dans llms.txt ; AGENTS.md et page guide/ai le mentionnent.
  - docs/scripts/api-drift.mjs (`npm run api:check -w docs`, `--strict`, `--verbose`) : compare les tableaux Props FR/EN au manifeste ; reconnaît les tableaux de sous-composants ; ignore la casse et les attributs class/style/id ; props d'accessibilité communes non exigées. Ajouté à deploy.yml (job build) en --strict.
  - 38 props inconnues corrigées sur 26 pages (value → v-model sur les champs, dir attribut, Heading variant/truncate/level 2, Panel tag/bordered/variant/radius, Popover sans offset/width…, Switch sans labelPosition). Reste : 259 props non documentées, 5 composants sans page (AccordionItem, Toaster, PasswordField, OtpInputField, NumberInputField).
  - Attention : `sed -i` sous Git Bash convertit les fins de ligne CRLF en LF (fichiers i/crlf) ; restaurer en CRLF.

## Next steps
- **4.1.0 publiée le 2026-11-27** (commit f179864, tag v4.1.0, lockfile inclus) : workflow Release réussi (une seule publication, @surgeui/vue), provenance Sigstore, release GitHub « Latest ». Vérifié par installation depuis npm : AGENTS.md et dist/api.json (4.1.0, 89 composants) présents, require OK, signatures et attestations vérifiées.
- Utilisateur : inscrire le dépôt sur context7.com.
- Plus tard : compléter les 259 props non documentées et les 5 pages manquantes (AccordionItem, Toaster, PasswordField, OtpInputField, NumberInputField) ; niveau 3 (serveur MCP) seulement s'il y a une demande ; banc d'essai assistants ; lint/tests/typecheck en CI des PR ; fichiers .claude/ et CLAUDE.md.