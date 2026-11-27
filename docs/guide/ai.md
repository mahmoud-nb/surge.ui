# Assistants IA

Les assistants de code (Claude Code, Cursor, Copilot…) connaissent mal une bibliothèque récente : ils inventent des props ou recopient l'API d'une autre bibliothèque. SurgeUI leur fournit sa documentation sous une forme qu'ils lisent directement.

## Ce qui est disponible

| Ressource | Contenu |
|-----------|---------|
| [`/llms.txt`](https://surgeui.com/llms.txt) | Sommaire de la documentation (format [llmstxt.org](https://llmstxt.org)) : règles d'usage, puis une ligne par page |
| [`/llms-full.txt`](https://surgeui.com/llms-full.txt) | Toute la documentation anglaise dans un seul fichier |
| [`/llms-fr.txt`](https://surgeui.com/llms-fr.txt), [`/llms-full-fr.txt`](https://surgeui.com/llms-full-fr.txt) | Les mêmes, en français |
| Pages `.md` | Chaque page existe en Markdown : ajoutez `.md` à son adresse, par exemple [`/components/button.md`](https://surgeui.com/components/button.md) |
| `AGENTS.md` | Guide d'usage livré dans le paquet npm (`node_modules/@surgeui/vue/AGENTS.md`), à la version installée : mise en place, règles, catalogue des composants, API retirées en 4.0 |

Les versions Markdown ne contiennent pas les démos en direct : seulement le texte, les exemples de code et les tableaux d'API.

## Utilisation

**Dans un projet**, signalez le guide du paquet dans les instructions de l'assistant (`CLAUDE.md`, `AGENTS.md`, règles Cursor) :

```md
## Interface
Composants : @surgeui/vue. Avant d'en utiliser un, lire
node_modules/@surgeui/vue/AGENTS.md, puis la page du composant
(https://surgeui.com/en/components/<nom>.md) pour ses props.
```

**Dans une conversation**, donnez l'adresse de `llms.txt`, ou celle de la page du composant concerné : l'assistant la lit avant d'écrire le code.

**Vérification** : avec les types globaux (`"types": ["@surgeui/vue/global"]`), `vue-tsc` signale une prop inventée. Un assistant qui lance la vérification des types corrige lui-même ce type d'erreur.

## Context7

Le dépôt contient un fichier `context7.json` qui oriente l'indexation par [Context7](https://context7.com), utilisé par de nombreux assistants via MCP : documentation anglaise, guide `AGENTS.md` et règles d'usage.
