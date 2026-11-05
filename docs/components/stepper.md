<script setup>
import { ref } from 'vue'

const steps = [
  { label: 'Panier', description: '3 articles' },
  { label: 'Livraison', description: 'Adresse et mode' },
  { label: 'Paiement', description: 'Carte ou virement' },
  { label: 'Confirmation' }
]
const current = ref(1)
const currentVertical = ref(1)
</script>

# Stepper

Progression d'un parcours en plusieurs étapes (commande, inscription, assistant de configuration).

## Exemples d'utilisation

### Horizontal

Avec `clickable`, les étapes franchies deviennent des boutons pour revenir en arrière.

<div class="component-demo">
  <div class="demo-section">
    <SuStepper v-model="current" :steps="steps" clickable />
    <div class="demo-buttons" style="margin-top: 1.5rem">
      <SuButton variant="outline" :disabled="current === 0" @click="current--">Précédent</SuButton>
      <SuButton :disabled="current === steps.length - 1" @click="current++">Suivant</SuButton>
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const steps = [
  { label: 'Panier', description: '3 articles' },
  { label: 'Livraison', description: 'Adresse et mode' },
  { label: 'Paiement', description: 'Carte ou virement' },
  { label: 'Confirmation' }
]
const current = ref(1)
</script>

<template>
  <SuStepper v-model="current" :steps="steps" clickable />
</template>
```

### Vertical avec contenu

Le slot `content` s'affiche sous l'étape courante.

<div class="component-demo">
  <div class="demo-section">
    <div style="max-width: 24rem">
      <SuStepper v-model="currentVertical" :steps="steps" orientation="vertical">
        <template #content="{ step }">
          <p style="margin: 0 0 0.75rem">Contenu de l'étape « {{ step.label }} ».</p>
          <SuButton size="sm" :disabled="currentVertical === steps.length - 1" @click="currentVertical++">Continuer</SuButton>
        </template>
      </SuStepper>
    </div>
  </div>
</div>

```vue
<SuStepper v-model="current" :steps="steps" orientation="vertical">
  <template #content="{ step }">
    <p>Contenu de l'étape « {{ step.label }} ».</p>
    <SuButton size="sm" @click="current++">Continuer</SuButton>
  </template>
</SuStepper>
```

### Étape en erreur

<div class="component-demo">
  <div class="demo-section">
    <SuStepper :model-value="2" :steps="[steps[0], { ...steps[1], error: true, description: 'Code postal invalide' }, steps[2], steps[3]]" />
  </div>
</div>

```vue
<SuStepper v-model="current" :steps="[
  { label: 'Panier' },
  { label: 'Livraison', error: true, description: 'Code postal invalide' },
  { label: 'Paiement' }
]" />
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `modelValue` | `number` | `0` | Étape courante, à partir de 0 (v-model) |
| `steps` | `StepItem[]` | `[]` | Étapes |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientation |
| `clickable` | `boolean` | `false` | Étapes franchies cliquables |
| `linear` | `boolean` | `true` | `false` : avec `clickable`, les étapes suivantes sont aussi cliquables |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille |
| `ariaLabel` | `string` | `'Étapes'` | Nom de la liste |

### StepItem

| Propriété | Type | Description |
|-----------|------|-------------|
| `label` | `string` | Libellé |
| `description` | `string` | Texte secondaire |
| `error` | `boolean` | Étape à corriger |
| `disabled` | `boolean` | Étape non cliquable |
| `icon` | `Component` | Icône à la place du numéro |

### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `update:modelValue` | `number` | Nouvelle étape (v-model) |
| `change` | `number` | Étape choisie par un clic |

### Slots

| Slot | Props | Description |
|------|-------|-------------|
| `content` | `{ step, index }` | Contenu sous l'étape courante (vertical) |

## Accessibilité

- Liste ordonnée nommée (« Étapes ») : la position (« 2 sur 4 ») est donnée par la liste.
- L'étape courante porte `aria-current="step"`.
- Le statut est lu après le libellé : « Panier, terminée », « Livraison, à corriger ».
- Les étapes cliquables sont de vrais boutons ; les autres ne sont pas focusables.
- Sur mobile (horizontal), seul le libellé de l'étape courante reste affiché ; les autres restent lus.
