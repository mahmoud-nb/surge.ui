# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install (root — npm workspaces handles both package/ and docs/)
npm install

# Build the component library
npm run build:lib

# Build everything (lib + docs)
npm run build

# Development
npm run storybook          # Storybook on port 6006
npm run dev:docs           # VitePress dev server
npm run dev                # Build lib then start docs dev server

# Linting
npm run lint               # ESLint + Stylelint (read-only check)
npm run lint:fix           # ESLint + Stylelint with auto-fix

# Releases (conventional commits via commitizen)
npm run commit             # Interactive conventional commit prompt
npm run release            # standard-version (auto semver bump)
```

No test runner is configured yet (`vitest.setup.ts` exists but no tests). Validate changes with `npm run build:lib` and `npm run lint`.

## Architecture

**Monorepo** with two npm workspaces:

- `package/` → `@surgeui/ds-vue` — the Vue 3 component library published to npm
- `docs/` → `@surgeui/ds-docs` — VitePress bilingual documentation (FR root + `/en` locale)

### Component Library (`package/src/`)

**Atomic Design** hierarchy under `components/`:

| Layer | Path | Role |
|-------|------|------|
| atoms | `components/atoms/` | Primitive components (Button, Input, Badge, FormField…) |
| molecules | `components/molecules/` | Compositions (InputField = FormField + Input, Dropdown, Popover…) |
| organisms | `components/organisms/` | Complex (Accordion, Dialog, Tabs, Alert) |
| templates | `components/templates/` | Layout grids (Grid, GridCell) |

**Key pattern — FormField wrapping:** Each form "Field" molecule wraps an atom inside `FormField.vue` to add label, message, and validation state. Example: `InputField.vue` = `FormField` + `Input`. The `*FieldProps` types are intersection types: `InputFieldProps = FormFieldProps & InputProps`.

**Type system:** All component prop interfaces live in `types/index.ts` (~700 lines). Shared base types: `Variant`, `Size`, `State`, `Radius`, `AccessibilityProps`. Components import from `@/types`.

**Entry point:** `src/index.ts` exports all components individually and as a Vue plugin (`app.use(SurgeUI, { prefix: 'Su' })`). Components are registered globally with the configurable prefix (default `Su`).

**Composables** (`composables/`):
- `useTheme` — theme switching (light/dark/ocean/forest/sunset), localStorage persistence, system preference detection
- `useCustomTheme` — runtime CSS variable injection
- `useUniqueId` — deterministic unique IDs for accessibility

**Styles** (`styles/`):
- SCSS with `api: 'modern-compiler'`
- CSS Custom Properties with `--su-` prefix (defined in `styles/tokens/`)
- 5 built-in themes (light, dark, ocean, forest, sunset) in `styles/themes/`
- BEM naming: `.su-button`, `.su-button--primary`, `.su-button__icon`
- Theme config in `src/theme.config.ts`
- Build produces a single CSS bundle (`cssCodeSplit: false`)

**Accessibility utilities** (`utils/accessibility.ts`): `trapFocus()`, `announceToScreenReader()`, `getContrastRatio()` (WCAG 2.1), `generateId()`.

### Storybook (`package/.storybook/`)

Storybook 8 with `@storybook/vue3-vite`. Stories live in `components/<layer>/_stories/<Component>.stories.ts` using CSF3 format. All stories should have `tags: ['autodocs']`. The `@storybook/addon-a11y` is enabled for accessibility auditing.

Note: `reactDocgen: false` in Storybook config means argTypes must be defined manually in stories (not auto-generated from TypeScript types).

### Documentation (`docs/`)

VitePress with bilingual structure:
- French (root): `docs/components/<name>.md`, `docs/guide/`, `docs/theme/`
- English: `docs/en/components/<name>.md`, `docs/en/guide/`, `docs/en/theme/`

Sidebar navigation is configured via `getNavItems()` in `docs/.vitepress/config.ts` — components are grouped into display, actions, and forms. Both languages share the same function (parametrized by `lang`).

The docs site imports components from `@surgeui/ds-vue` (symlinked via `file:../package`). Live demos use the `Su` prefix directly in markdown: `<SuButton variant="primary">`.

## Conventions

- **Language:** Code comments, commit messages, and French documentation use French. English documentation in `/en`. Prop interfaces and code identifiers are in English.
- **Commits:** Conventional commits format — `feat(Button): add loading state`, `fix(a11y): correct contrast ratio`.
- **Components:** `<script setup lang="ts">` exclusively. Props via `withDefaults(defineProps<T>(), {...})`. Emits via `defineEmits<{...}>()`. Models via `defineModel<T>()`.
- **IDs:** Use Vue's `useId()` or `useUniqueId()` for accessible DOM IDs. Never `Math.random()`.
- **i18n:** User-facing strings in components should be props with French defaults (e.g., `loadingLabel: 'Chargement en cours...'`), overridable by consumers.
- **Path alias:** `@/` maps to `package/src/` in both Vite and TypeScript configs.
- **CSS:** Scoped SCSS in components. Use existing design tokens (`--su-*`), spacing (`space.$spacing-*`), and typography (`typo.$font-size-*`) from `styles/`. Use mixins from `styles/core/_mixins.scss` (`@include transition(...)`, `@include focus-ring`).

<!-- threadmind:start -->
## ThreadMind — Context Management

This project uses **ThreadMind MCP** to organize conversations into a thread tree.
Project: "SurgeUI DS Vue"

### Mandatory Workflow

1. **At the start of every session**, call `context_get` to load the structured context for the active thread. Use this context as the foundation for your responses — it contains the decisions, architecture, and state from prior discussions.

2. **After every significant discussion** (architecture decisions, implementation choices, bug resolutions), call `summary_update` with a concise summary (5-15 lines) focused on:
   - Decisions made and their rationale
   - Technical choices and trade-offs
   - Current implementation state
   - Open questions or next steps

3. **When the topic shifts** to a different area (e.g., from backend to frontend, from auth to payments), call `thread_create` to branch into a new sub-thread. This keeps each thread focused.

4. **Before creating new threads**, call `thread_list` to see the current tree and avoid duplicating existing threads.

5. **When switching focus** to a different part of the codebase, call `thread_switch` to change the active thread before continuing the discussion.

### Key Principle

The assembled context from `context_get` REPLACES the need for conversation history. Write summaries as if a new developer will read them with no prior context — they should be self-contained and actionable.

### Claude Code Specifics

- ThreadMind tools are available via MCP — call them directly
- Use `context_get` output as your working context, not the chat history
- When the user starts a new session, proactively call `context_get` before answering
- After completing a task, proactively suggest updating the thread summary
- MCP Prompts are available as slash commands: `/mcp__thread-mind__tm-help`, `/mcp__thread-mind__tm-create`, etc.

### Quick Shortcuts

The user can type these shortcuts in chat. When you see one, **immediately call the corresponding tool** without asking for confirmation:

| User types | Action |
|------------|--------|
| `tm:help` | Show all available ThreadMind commands (list the table below) |
| `tm:context` | Call `context_get` and display the result |
| `tm:tree` | Call `thread_list` and display the tree |
| `tm:create <title>` | Call `thread_create` with the given title |
| `tm:switch <id>` | Call `thread_switch` with the given thread ID |
| `tm:summary` | Generate a summary of the current discussion, then call `summary_update` |
| `tm:summary <content>` | Call `summary_update` with the given content |
| `tm:delete <id>` | Call `thread_delete` with the given thread ID |
| `tm:stats` | Call `stats_show` and display token savings |
| `tm:init` | Call `threadmind_init` to generate instruction files |
| `tm:project <title>` | Call `project_create` with the given title |
| `tm:projects` | Call `project_list` |

**Important**: When you see `tm:<command>`, execute the tool call immediately. Do not ask "would you like me to..." — just do it.

<!-- threadmind:end -->
