<script setup>
import { ref } from 'vue'

const quantity = ref(1)
const price = ref(12.5)
const guests = ref(2)
</script>

# NumberInput

Champ numérique : saisie au format de la langue (« 1 234,5 » en français), boutons − / +, bornes, pas et format d'affichage (devise, unité, pourcentage).

## Exemples d'utilisation

### Utilisation de base

<div class="component-demo">
  <div class="demo-section">
    <div style="max-width: 12rem">
      <SuNumberInput v-model="quantity" :min="0" :max="99" aria-label="Quantité" />
    </div>
    <p>Valeur : {{ quantity }}</p>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const quantity = ref(1)
</script>

<template>
  <SuNumberInput v-model="quantity" :min="0" :max="99" aria-label="Quantité" />
</template>
```

### Format d'affichage

`formatOptions` reçoit les options d'`Intl.NumberFormat`. Le format s'applique à la sortie du champ ; pendant la saisie, le nombre est affiché sans symbole.

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons-vertical" style="max-width: 12rem">
      <SuNumberInput v-model="price" :min="0" :step="0.5" :format-options="{ style: 'currency', currency: 'EUR' }" aria-label="Prix" />
      <SuNumberInput :model-value="72.4" :step="0.1" :format-options="{ style: 'unit', unit: 'kilogram' }" aria-label="Poids" />
    </div>
  </div>
</div>

```vue
<SuNumberInput v-model="price" :min="0" :step="0.5" :format-options="{ style: 'currency', currency: 'EUR' }" aria-label="Prix" />
<SuNumberInput v-model="weight" :step="0.1" :format-options="{ style: 'unit', unit: 'kilogram' }" aria-label="Poids" />
```

### Sans boutons

<div class="component-demo">
  <div class="demo-section">
    <div style="max-width: 12rem">
      <SuNumberInput :controls="false" :min="1900" :max="2100" placeholder="Année" aria-label="Année" />
    </div>
  </div>
</div>

```vue
<SuNumberInput v-model="year" :controls="false" :min="1900" :max="2100" placeholder="Année" aria-label="Année" />
```

### Avec label : NumberInputField

`SuNumberInputField` ajoute le label, le message et l'état de validation (motif FormField). Un `SuNumberInput` placé dans un `SuFormField` s'y relie aussi tout seul.

<div class="component-demo">
  <div class="demo-section">
    <div style="max-width: 16rem">
      <SuNumberInputField v-model="guests" label="Voyageurs" message="Entre 1 et 9 personnes" :min="1" :max="9" required />
    </div>
  </div>
</div>

```vue
<SuNumberInputField v-model="guests" label="Voyageurs" message="Entre 1 et 9 personnes" :min="1" :max="9" required />
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `modelValue` | `number \| null` | `null` | Valeur (v-model), `null` si le champ est vide |
| `min` / `max` | `number` | - | Bornes |
| `step` | `number` | `1` | Pas des flèches et des boutons |
| `largeStep` | `number` | `10 × step` | Pas de Page précédente / suivante |
| `precision` | `number` | décimales du pas et du format | Décimales conservées |
| `formatOptions` | `Intl.NumberFormatOptions` | - | Format d'affichage (devise, unité, pourcentage…) |
| `locale` | `string` | locale des composants | Langue du format |
| `controls` | `boolean` | `true` | Boutons − / + |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | État de validation |
| `disabled` / `readonly` / `required` | `boolean` | `false` | États du champ |
| `name` / `placeholder` | `string` | - | Attributs du champ |
| `incrementLabel` / `decrementLabel` | `string` | `'Augmenter'` / `'Diminuer'` | Noms des boutons |

`SuNumberInputField` accepte en plus `label`, `message` et `requiredText`.

### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `update:modelValue` | `number \| null` | Nouvelle valeur (validée) |
| `change` | `number \| null` | Valeur modifiée par l'utilisateur |
| `focus` / `blur` | `FocusEvent` | Focus du champ |

### Méthodes exposées

| Méthode | Description |
|---------|-------------|
| `focus()` | Donne le focus au champ |
| `increment()` / `decrement()` | Ajoute ou retire un pas |

## Accessibilité

- `role="spinbutton"` avec `aria-valuenow`, `aria-valuemin`, `aria-valuemax` et `aria-valuetext` (valeur formatée, ex. « 12,50 € »).
- Clavier : `↑` / `↓` ± pas, `Page préc.` / `Page suiv.` ± grand pas, `Début` / `Fin` = min / max, `Entrée` valide.
- La saisie est validée à la sortie du champ ou avec `Entrée` : bornée, arrondie ; un texte illisible rend la valeur précédente.
- Les boutons − / + sont hors de l'ordre de tabulation (le clavier suffit) mais restent utilisables par les lecteurs d'écran ; ils sont marqués `aria-disabled` aux bornes.
- Sur mobile, le clavier numérique s'ouvre (`inputmode`) quand les valeurs sont positives.
