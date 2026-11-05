<script setup>
import { ref } from 'vue'

const departure = ref(null)
const birth = ref(new Date(1990, 4, 17))
const today = new Date()
</script>

# DatePicker

Champ date : la date se saisit au clavier au format de la langue (« jj/mm/aaaa ») ou se choisit dans un calendrier.

## Exemples d'utilisation

### Dans un FormField

<div class="component-demo">
  <div class="demo-section">
    <div style="max-width: 16rem">
      <SuFormField label="Date de départ" message="Saisissez jj/mm/aaaa ou ouvrez le calendrier">
        <SuDatePicker v-model="departure" :min="today" />
      </SuFormField>
    </div>
    <p>Valeur : {{ departure ? departure.toLocaleDateString('fr-FR') : 'vide' }}</p>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const departure = ref(null)
</script>

<template>
  <SuFormField label="Date de départ" message="Saisissez jj/mm/aaaa ou ouvrez le calendrier">
    <SuDatePicker v-model="departure" :min="new Date()" />
  </SuFormField>
</template>
```

### Valeur initiale et date maximale

<div class="component-demo">
  <div class="demo-section">
    <div style="max-width: 16rem">
      <SuFormField label="Date de naissance" required>
        <SuDatePicker v-model="birth" :max="today" />
      </SuFormField>
    </div>
  </div>
</div>

```vue
<SuDatePicker v-model="birth" :max="new Date()" />
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `modelValue` | `Date \| null` | `null` | Date (v-model) |
| `min` / `max` | `Date` | - | Dates acceptées |
| `isDateDisabled` | `(date: Date) => boolean` | - | Jours refusés |
| `locale` | `string` | locale des composants | Langue du format et du calendrier |
| `weekStartsOn` | `number` | selon la langue | Premier jour de la semaine |
| `placeholder` | `string` | format attendu (`jj/mm/aaaa`) | Texte indicatif |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | État de validation |
| `disabled` / `readonly` / `required` | `boolean` | `false` | États du champ (`readonly` masque le calendrier) |
| `name` | `string` | - | Nom du champ |
| `openLabel` | `string` | `'Choisir une date'` | Nom du bouton du calendrier |

### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `update:modelValue` | `Date \| null` | Nouvelle date (validée) |
| `change` | `Date \| null` | Date modifiée par l'utilisateur |
| `focus` / `blur` | `FocusEvent` | Focus du champ |

### Méthodes exposées

| Méthode | Description |
|---------|-------------|
| `focus()` | Donne le focus au champ |
| `open()` / `close()` | Ouvre ou ferme le calendrier |

## Accessibilité

- Le champ texte reste la voie principale : la date est validée à la sortie du champ ou avec `Entrée`. Une date illisible, inexistante (31/02) ou hors bornes rend la valeur précédente.
- Le bouton est nommé avec la date choisie (« Changer la date, 5 novembre 2026 ») et annonce une boîte de dialogue (`aria-haspopup="dialog"`, `aria-expanded`).
- Calendrier dans un `role="dialog"` : focus sur le jour actif à l'ouverture, `Tab` piégé, `Échap` ou appui extérieur ferme ; choisir un jour ferme et rend le focus au bouton. `Alt` + `↓` ouvre le calendrier depuis le champ.
- Le mois et l'année du titre du calendrier ouvrent le choix du mois et de l'année (pratique pour une date de naissance) ; `Échap` y revient d'abord aux jours, puis ferme le calendrier.
- Clavier du calendrier : voir [Calendar](/components/calendar).
