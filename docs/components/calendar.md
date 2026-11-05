<script setup>
import { ref } from 'vue'

const date = ref(new Date())
const booking = ref(null)
const today = new Date()
const min = new Date(today.getFullYear(), today.getMonth(), today.getDate())
const max = new Date(today.getFullYear(), today.getMonth() + 2, 0)
const isWeekend = (d) => d.getDay() === 0 || d.getDay() === 6
</script>

# Calendar

Grille d'un mois pour choisir un jour, utilisable seule ou dans un [DatePicker](/components/datepicker). Le premier jour de la semaine et les noms suivent la langue.

## Exemples d'utilisation

### Utilisation de base

<div class="component-demo">
  <div class="demo-section">
    <SuCalendar v-model="date" />
    <p>{{ date ? date.toLocaleDateString('fr-FR', { dateStyle: 'full' }) : '—' }}</p>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const date = ref(new Date())
</script>

<template>
  <SuCalendar v-model="date" />
</template>
```

### Bornes et jours exclus

`min` et `max` bornent la sélection et la navigation ; `isDateDisabled` exclut des jours (week-ends, jours fériés).

<div class="component-demo">
  <div class="demo-section">
    <SuCalendar v-model="booking" :min="min" :max="max" :is-date-disabled="isWeekend" />
  </div>
</div>

```vue
<SuCalendar
  v-model="booking"
  :min="new Date()"
  :max="endOfNextMonth"
  :is-date-disabled="(date) => date.getDay() === 0 || date.getDay() === 6"
/>
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `modelValue` | `Date \| null` | `null` | Jour choisi (v-model) |
| `min` / `max` | `Date` | - | Premier et dernier jours sélectionnables |
| `isDateDisabled` | `(date: Date) => boolean` | - | Jours non sélectionnables |
| `locale` | `string` | locale des composants | Langue des noms de mois et de jours |
| `weekStartsOn` | `number` | selon la langue | Premier jour de la semaine (0 = dimanche) |
| `previousMonthLabel` / `nextMonthLabel` | `string` | `'Mois précédent'` / `'Mois suivant'` | Noms des boutons |

### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `update:modelValue` | `Date` | Jour choisi (v-model) |
| `select` | `Date` | Jour choisi par l'utilisateur |

### Méthodes exposées

| Méthode | Description |
|---------|-------------|
| `focus()` | Donne le focus au jour actif |

## Accessibilité

- `role="grid"` nommé par le mois ; en-têtes des jours de la semaine lus en entier (« lundi »).
- Un seul arrêt de tabulation : le jour choisi, sinon aujourd'hui. Chaque jour est nommé par la date complète (« jeudi 5 novembre 2026 »), avec `aria-selected` et `aria-current="date"` pour aujourd'hui.
- Clavier : flèches ±1 jour / ±1 semaine (inversées en RTL), `Début` / `Fin` début / fin de semaine, `Page préc.` / `Page suiv.` ±1 mois, `Maj` + `Page` ±1 an, `Entrée` / `Espace` pour choisir.
- Les jours exclus restent focusables (`aria-disabled`) mais ne peuvent pas être choisis.
- Les boutons de mois gardent le focus et annoncent le nouveau mois.
