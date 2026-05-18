---
description: Génère le fichier stories complet d'un composant SurgeUI existant
---

Tu es un expert Storybook 8 + Vue 3. Génère un fichier stories complet pour un composant SurgeUI existant.

## Arguments

L'utilisateur passe : `<NomComposant>`
Exemple : `Badge`, `Button`, `InputField`

Arguments reçus : $ARGUMENTS

## Étapes

1. **Localise le composant** dans `package/src/components/` (atoms / molecules / organisms)
2. **Lis le fichier `.vue`** pour comprendre les slots, emits et comportements
3. **Lis les props dans `package/src/types/index.ts`** — cherche `<Nom>Props` et les types associés (`<Nom>Variant`, etc.)
4. **Vérifie si un fichier stories existe déjà** dans `_stories/` — si oui, propose de le compléter plutôt que de remplacer
5. **Génère le fichier stories** à `package/src/components/<layer>/_stories/<NomComposant>.stories.ts`

## Règles Storybook obligatoires

- **`reactDocgen: false`** dans ce projet → les `argTypes` DOIVENT être définis manuellement pour chaque prop
- Format **CSF3** avec `render` functions (pas de `args.default` template string)
- `tags: ['autodocs']` obligatoire
- `parameters.layout: 'centered'` par défaut
- `parameters.docs.description.component` : description courte du composant

## Stories à générer

| Story | Contenu |
|-------|---------|
| `Default` | Story de base avec les props par défaut |
| `Variants` | Si le composant a une prop `variant` — affiche toutes les valeurs |
| `Sizes` | Si le composant a une prop `size` — affiche sm/md/lg |
| `States` | Si le composant a une prop `state` ou `disabled` — affiche les états |
| Une story par prop notable | Ex: `WithIcon`, `Loading`, `Radius`, `CustomColor` |
| `AllVariants` | Grille complète : toutes les variantes × tailles |
| `Accessibility` | Si composant interactif — montre l'usage avec `ariaLabel`, focus |

## Format argTypes

```typescript
argTypes: {
  variant: {
    control: { type: 'select' },
    options: ['default', 'primary', 'secondary', ...],
    description: 'Variante visuelle du composant',
    table: { defaultValue: { summary: 'default' } }
  },
  size: {
    control: { type: 'select' },
    options: ['sm', 'md', 'lg'],
    description: 'Taille du composant'
  },
  disabled: {
    control: 'boolean',
    description: 'Désactive le composant'
  },
  // Pour les props Component/Function — pas de control
  icon: {
    control: false,
    description: 'Icône à afficher (composant Vue)'
  },
  // Pour les événements
  onClick: {
    action: 'clicked',
    description: 'Émis au clic'
  }
}
```

## Imports d'icônes disponibles

```typescript
import { CheckIcon, XMarkIcon, StarIcon, ExclamationTriangleIcon, InformationCircleIcon, PlusIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
```

## Exemple story complète

```typescript
export const Variants: Story = {
  name: 'Variantes',
  render: () => ({
    components: { Badge },
    template: `
      <div style="display:flex;gap:0.5rem;flex-wrap:wrap;align-items:center">
        <Badge variant="default">Default</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
      </div>
    `
  })
}
```

Génère le fichier complet et résume les stories créées.
