# CLAUDE.md — docs/

Contexte spécifique au workspace `@surgeui/ds-docs` (site de documentation VitePress bilingue).
Le fichier racine `../CLAUDE.md` fournit l'architecture globale, les commandes et les conventions.

## Structure VitePress

- **FR (racine)** : `components/`, `guide/`, `theme/`
- **EN (locale)** : `en/components/`, `en/guide/`, `en/theme/`
- **Config** : `.vitepress/config.ts`
- **Theme custom** : `.vitepress/theme/index.ts` — enregistre le plugin SurgeUI + 22 icones Heroicons globales
- **Styles custom** : `.vitepress/theme/custom.css` — classes `.component-demo`, `.demo-section`, `.demo-buttons`
- Les composants SurgeUI sont importes via `@surgeui/ds-vue` (symlink `file:../package`)

## Navigation et sidebar

Configuree dans `.vitepress/config.ts` via `getNavItems(section, lang)`.

- 3 groupes de composants : **display**, **actions**, **forms**
- `lang` controle le prefixe : FR = `''`, EN = `'/en'`
- Pour ajouter un composant : ajouter l'entree dans le bon groupe de `getNavItems()`

## Nommage des fichiers

Minuscules, sans PascalCase ni tiret (sauf exceptions existantes) :

```
button.md, togglegroup.md, inputfield.md, formfieldgroup.md
```

Le nom correspond au composant sans le prefixe `Su`.

## Structure d'une page composant

```markdown
# ComponentName

Description courte du composant.

## Exemples d'utilisation

### Sous-section (Variantes, Tailles, etc.)

<div class="component-demo">
  <div class="demo-section">
    <h4>Titre</h4>
    <div class="demo-buttons">
      <SuButton variant="primary">Texte</SuButton>
    </div>
  </div>
</div>

\```vue
<SuButton variant="primary">Texte</SuButton>
\```

## API

### Props

| Prop | Type | Defaut | Description |
|------|------|--------|-------------|

### Evenements

| Evenement | Payload | Description |
|-----------|---------|-------------|

## Accessibilite
```

### Points cles

- Demos avec prefixe `Su` : `<SuButton>`, `<SuToggle>`, `<SuInput>`
- Wrapper obligatoire : `<div class="component-demo"><div class="demo-section">`
- Classes layout : `.demo-buttons` (flex row), `.demo-buttons-vertical` (flex column)
- Bloc code apres chaque demo pour montrer l'usage

## Regles bilingues

- **FR = source de verite** (racine du site)
- EN reprend la meme structure (sections, headings, ordre) mais est redige independamment
- Titres de sections EN : `## Usage` (pas `## Exemples d'utilisation`), `## API`, `## Accessibility`
- Descriptions des props : francais dans les pages FR, anglais dans les pages EN

## Icones globales disponibles

Les 22 icones Heroicons enregistrees dans `.vitepress/theme/index.ts`, utilisables directement dans le markdown sans `<script setup>` :

`PlusIcon`, `TrashIcon`, `ArrowRightIcon`, `HeartIcon`, `ShareIcon`, `ArrowDownTrayIcon`, `ArrowTopRightOnSquareIcon`, `XMarkIcon`, `CheckIcon`, `ExclamationTriangleIcon`, `InformationCircleIcon`, `MagnifyingGlassIcon`, `AtSymbolIcon`, `LockClosedIcon`, `UserIcon`, `StarIcon`, `BuildingOfficeIcon`, `GlobeAltIcon`, `FlagIcon`, `HomeIcon`, `CogIcon`, `ArrowUturnLeftIcon`

Pour d'autres icones, utiliser `<script setup>` avec import depuis `@heroicons/vue/24/outline`.

## Checklist nouvelle page composant

1. Creer `components/<name>.md` (FR)
2. Creer `en/components/<name>.md` (EN)
3. Ajouter dans `getNavItems()` de `.vitepress/config.ts` dans le groupe adequat
4. Verifier la navigation FR + EN avec `npm run dev:docs`
