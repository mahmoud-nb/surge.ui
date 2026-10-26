# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Docs workspace-spécifiques :** voir `package/CLAUDE.md` (bibliothèque de composants) et `docs/CLAUDE.md` (site de documentation).

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

# Tests (Vitest + @vue/test-utils + happy-dom)
npm test                   # Run once (from root or package/)
npm run test:watch -w package

# Linting
npm run lint               # ESLint + Stylelint (read-only check)
npm run lint:fix           # ESLint + Stylelint with auto-fix

# Releases (conventional commits via commitizen)
npm run commit             # Interactive conventional commit prompt
npm run release            # standard-version (auto semver bump)
npm run release:publish    # build lib + npm publish -w package (manual fallback)
```

Tests live in `package/tests/*.spec.ts` (Vitest, `happy-dom` environment, configured in `package/vite.config.ts`, CSS disabled). Validate changes with `npm test`, `npm run build:lib` and `npm run lint`. `no-descending-specificity` is disabled in `.stylelintrc.json`: it flags every BEM parent modifier (`.su-x--mod .su-x__el`) declared before the element's base rule. When a lower-specificity rule must override (disabled state, superscript…), check the cascade yourself (`:where()` keeps specificity low, local custom properties avoid the conflict). Put `@include motion-reduce` / `high-contrast` inside the original rule, never in a second block with the same selector.

Release flow: `npm run release:dry` → `npm run release` (bumps package.json + package/package.json, CHANGELOG, tag `vX.Y.Z`) → `npm install --package-lock-only` → `git push --follow-tags origin main`. Pushing the tag triggers `.github/workflows/release.yml`: checks tag = package version, lint, tests, build, `npm publish -w package --provenance` (secret `NPM_TOKEN`, skipped if the version is already on npm) and a GitHub release from the CHANGELOG section. Always push tags: `standard-version` computes the next changelog from the latest tag.

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
- `useFloatingPosition` — positions popovers, menus and lists against their trigger (`@floating-ui/dom`: `position: fixed`, flip, shift, arrow, `data-placement`); used by Popover, Dropdown and SelectBox
- `useLocale` — default component texts (labels, placeholders, announcements) from `src/locales/` (`fr` default, `en`); plugin option `locale`, `provideLocale()`, `defineLocale()`, typed `t('namespace.key', params)` with `Intl.PluralRules` plurals
- `useFormField` — links a control to the surrounding `FormField` (provide/inject): id, `aria-describedby` (message), `aria-labelledby` (non-labelable controls), inherited state/size/disabled/required; used by every form atom
- `useAnnouncer` / `announce()` — screen reader announcements through persistent live regions (inside the open modal `<dialog>` when there is one)
- `useFocusTrap` / `createFocusTrap()` — stacked focus traps (Tab cycling, focus brought back, focus returned on deactivate); used by Popover modal. Not needed for `Dialog` (native `showModal()`)
- `useDismiss` — layered dismissal: Escape closes only the top layer (and cancels a parent `<dialog>` close), `pointerdown` outside closes each layer it is outside of (layers opened above count as inside), optional focus-outside; used by Popover, Dropdown, SelectBox
- `useListNavigation` / `useTypeahead` — arrows, Home/End, typeahead, disabled items skipped, RTL-aware horizontal arrows; `virtual` mode (aria-activedescendant: SelectBox) or `roving` mode (DOM focus: Dropdown menu, Tabs, Accordion)

**Styles** (`styles/`):
- SCSS with `api: 'modern-compiler'`
- CSS Custom Properties with `--su-` prefix (defined in `styles/tokens/` and `styles/core/_variables.scss`)
- 4 built-in themes × light/dark (default, ocean, forest, sunset) in `styles/themes/`
- `styles/index.scss` is the only file that emits global CSS (imported once by `src/index.ts`); components import `styles/abstracts` (functions/mixins only, no CSS output)
- BEM naming: `.su-button`, `.su-button--primary`, `.su-button__icon`
- Theme config in `src/theme.config.ts`
- Build produces a single CSS bundle (`cssCodeSplit: false`)

**Accessibility utilities** (`utils/accessibility.ts`): `trapFocus()` (deprecated, delegates to `createFocusTrap()`), `announceToScreenReader()` (deprecated, delegates to `announce()`), `getContrastRatio()` (WCAG 2.1), `generateId()`.

### Storybook (`package/.storybook/`)

Storybook 8 with `@storybook/vue3-vite`. Stories live in `components/<layer>/_stories/<Component>.stories.ts` using CSF3 format. All stories should have `tags: ['autodocs']`. `@storybook/addon-a11y` is installed (Accessibility panel). Keep it on the same version as the other Storybook packages (8.6.14) to avoid loading two Storybook cores.

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
- **i18n:** User-facing strings are optional props **without** a default, resolved as `props.x ?? t('namespace.key')` via `useLocale()`. Add every new message to `SurgeMessages` (`src/locales/types.ts`) and to both `fr.ts` and `en.ts`. Never hardcode French text in templates or announcements.
- **Form controls:** call `useFormField(props, { labelable, focus, idPrefix })` and use its effective `id`, `state`, `size`, `disabled`, `required`, `describedBy`, `labelledBy` instead of the raw props, so the control links itself to `SuFormField`.
- **Overlays & lists:** close floating elements with `useDismiss` (never ad-hoc document listeners), trap focus with `useFocusTrap` (menus must not trap), navigate lists with `useListNavigation` (never re-implement arrow/typeahead handling).
- **Announcements:** use `useAnnouncer()` (never create ad-hoc `aria-live` nodes); do not announce what assistive tech already reads (native checked state, `aria-valuetext`).
- **Path alias:** `@/` maps to `package/src/` in both Vite and TypeScript configs.
- **CSS:** SCSS in components with a single import: `@use '../../styles/abstracts' as *;`. Use design tokens (`--su-*`), spacing (`$spacing-*`) and the functions/mixins from `styles/abstracts/` (`token()`, `with-alpha()`, `@include transition(...)`, `@include focus-ring`, `@include control-surface`). See `package/CLAUDE.md`.

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
