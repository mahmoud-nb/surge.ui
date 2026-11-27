<script setup>
import { ref } from 'vue'

const note = ref(3)
const avis = ref(0)
</script>

# Rating

Note en étoiles : saisie au clavier et à la souris, ou affichage en lecture seule (note décimale possible).

## Exemples d'utilisation

### Saisie

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons">
      <SuRating v-model="note" />
      <span>{{ note }} / 5</span>
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const note = ref(3)
</script>

<template>
  <SuRating v-model="note" />
</template>
```

Au clavier : <kbd>Tab</kbd> entre dans le groupe, les flèches changent la note. Avec `clearable`, choisir de nouveau la note courante la remet à zéro.

### Lecture seule

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons-vertical">
      <SuRating :model-value="4.5" readonly />
      <SuRating :model-value="3.2" readonly size="sm" />
    </div>
  </div>
</div>

```vue
<SuRating :model-value="4.5" readonly />
```

### Dans un formulaire

<div class="component-demo">
  <div class="demo-section">
    <SuFormField label="Votre avis sur la livraison" message="Facultatif">
      <SuRating v-model="avis" clearable name="avis" />
    </SuFormField>
  </div>
</div>

```vue
<SuFormField label="Votre avis sur la livraison" message="Facultatif">
  <SuRating v-model="avis" clearable name="avis" />
</SuFormField>
```

Les étoiles sont de vrais boutons radio : avec `name`, la note est envoyée avec le formulaire.

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `v-model` | `number` | `0` | Note (0 : aucune) |
| `max` | `number` | `5` | Nombre d'étoiles |
| `readonly` | `boolean` | `false` | Lecture seule (note décimale possible) |
| `clearable` | `boolean` | `false` | Choisir de nouveau la note la remet à zéro |
| `name` | `string` | id généré | Nom des boutons radio |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille |
| `state` | `'default' \| 'success' \| 'warning' \| 'error'` | `'default'` | État (`error` : `aria-invalid`) |
| `disabled` | `boolean` | `false` | Désactivé |
| `required` | `boolean` | `false` | Obligatoire |
| `ariaLabel` | `string` | `'Note'` | Nom du groupe hors `SuFormField` |

### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `update:modelValue` | `number` | Note choisie |
| `change` | `number` | Note choisie |

## Accessibilité

- Saisie : groupe de boutons radio natifs (`role="radiogroup"`), chaque étoile nommée (« 3 étoiles sur 5 ») ; la note est annoncée comme une option cochée.
- Nommé par le label de `SuFormField` (`aria-labelledby`), sinon « Note » ; message relié par `aria-describedby`.
- Lecture seule : une image nommée (« Note : 4,5 sur 5 ») ; les étoiles sont décoratives.
- L'aperçu au survol ne change pas la note ; il disparaît quand le pointeur quitte les étoiles.
