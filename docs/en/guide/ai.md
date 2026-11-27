# AI assistants

Coding assistants (Claude Code, Cursor, Copilot…) know little about a recent library: they invent props or copy another library's API. SurgeUI gives them its documentation in a form they read directly.

## What is available

| Resource | Content |
|----------|---------|
| [`/llms.txt`](https://surgeui.com/llms.txt) | Documentation index ([llmstxt.org](https://llmstxt.org) format): usage rules, then one line per page |
| [`/llms-full.txt`](https://surgeui.com/llms-full.txt) | The whole English documentation in one file |
| [`/llms-fr.txt`](https://surgeui.com/llms-fr.txt), [`/llms-full-fr.txt`](https://surgeui.com/llms-full-fr.txt) | The same, in French |
| `.md` pages | Every page exists in Markdown: add `.md` to its address, for example [`/en/components/button.md`](https://surgeui.com/en/components/button.md) |
| `AGENTS.md` | Usage guide shipped in the npm package (`node_modules/@surgeui/vue/AGENTS.md`), matching the installed version: setup, rules, component catalog, APIs removed in 4.0 |

The Markdown versions leave out the live demos: only the text, code examples and API tables.

## Usage

**In a project**, point the assistant instructions (`CLAUDE.md`, `AGENTS.md`, Cursor rules) to the package guide:

```md
## UI
Components: @surgeui/vue. Before using one, read
node_modules/@surgeui/vue/AGENTS.md, then the component page
(https://surgeui.com/en/components/<name>.md) for its props.
```

**In a conversation**, give the address of `llms.txt`, or of the page of the component at hand: the assistant reads it before writing code.

**Checking**: with the global types (`"types": ["@surgeui/vue/global"]`), `vue-tsc` reports an invented prop. An assistant that runs the type check fixes this kind of mistake by itself.

## Context7

The repository has a `context7.json` file that guides indexing by [Context7](https://context7.com), used by many assistants through MCP: English documentation, the `AGENTS.md` guide and usage rules.
