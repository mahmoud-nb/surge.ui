# Checkbox

Case à cocher seule, construite sur un `<input type="checkbox">` natif. Elle peut avoir un libellé, une description et un état mixte pour une case « tout sélectionner ». Elle se relie seule à un `SuFormField` parent.

Pour une liste d'options, utilisez [CheckboxGroup](/components/checkbox-group).

## Exemples d'utilisation

### Case simple

<div class="component-demo">
  <div class="demo-section">
    <h4>Avec libellé</h4>
    <div class="demo-buttons-vertical">
      <SuCheckbox label="Recevoir la newsletter" />
      <SuCheckbox label="Se souvenir de moi" :model-value="true" />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const newsletter = ref(false)
</script>

<template>
  <SuCheckbox v-model="newsletter" label="Recevoir la newsletter" />
</template>
```

### Avec description

La description est reliée à la case par `aria-describedby`.

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons-vertical">
      <SuCheckbox label="Notifications par e-mail" description="Un résumé hebdomadaire de l'activité de vos projets." />
    </div>
  </div>
</div>

```vue
<SuCheckbox
  v-model="notifications"
  label="Notifications par e-mail"
  description="Un résumé hebdomadaire de l'activité de vos projets."
/>
```

### État mixte (tout sélectionner)

`v-model:indeterminate` affiche un tiret et annonce « partiellement coché ». Le premier clic lève cet état.

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons-vertical">
      <SuCheckbox label="Toutes les langues" :model-value="false" :indeterminate="true" />
      <SuCheckbox label="Français" :model-value="true" style="margin-inline-start: 1.625rem" />
      <SuCheckbox label="Anglais" style="margin-inline-start: 1.625rem" />
    </div>
  </div>
</div>

```vue
<script setup>
import { computed, ref } from 'vue'

const languages = ref([
  { id: 'fr', label: 'Français', checked: true },
  { id: 'en', label: 'Anglais', checked: false }
])
const count = computed(() => languages.value.filter((l) => l.checked).length)
const all = computed({
  get: () => count.value === languages.value.length,
  set: (value) => languages.value.forEach((l) => (l.checked = value))
})
const partial = computed(() => count.value > 0 && count.value < languages.value.length)
</script>

<template>
  <SuCheckbox v-model="all" :indeterminate="partial" label="Toutes les langues" />
  <SuCheckbox v-for="l in languages" :key="l.id" v-model="l.checked" :label="l.label" />
</template>
```

### Cartes

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons-vertical" style="max-width: 22rem">
      <SuCheckbox display-type="block-card" label="Sauvegarde quotidienne" description="Conservée 30 jours." :model-value="true" />
      <SuCheckbox display-type="block-card" label="Support prioritaire" description="Réponse sous 4 heures ouvrées." />
    </div>
  </div>
</div>

```vue
<SuCheckbox v-model="backup" display-type="block-card" label="Sauvegarde quotidienne" description="Conservée 30 jours." />
```

### Tailles et états

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons" style="align-items: center">
      <SuCheckbox size="sm" label="Petite" :model-value="true" />
      <SuCheckbox size="md" label="Moyenne" :model-value="true" />
      <SuCheckbox size="lg" label="Grande" :model-value="true" />
      <SuCheckbox state="error" label="Erreur" />
      <SuCheckbox disabled label="Désactivée" />
    </div>
  </div>
</div>

```vue
<SuCheckbox size="sm" label="Petite" />
<SuCheckbox state="error" label="Erreur" />
<SuCheckbox disabled label="Désactivée" />
```

### Dans un FormField

La case reprend l'id, le message, l'état et le caractère obligatoire du champ.

<div class="component-demo">
  <div class="demo-section">
    <SuFormField label="Conditions" message="Vous devez accepter les conditions." state="error" required>
      <SuCheckbox label="J'accepte les conditions d'utilisation" />
    </SuFormField>
  </div>
</div>

```vue
<SuFormField label="Conditions" message="Vous devez accepter les conditions." state="error" required>
  <SuCheckbox v-model="accepted" label="J'accepte les conditions d'utilisation" />
</SuFormField>
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `modelValue` | `boolean` | `false` | Case cochée (v-model) |
| `indeterminate` | `boolean` | `false` | État mixte (`v-model:indeterminate`), levé au premier clic |
| `label` | `string` | - | Libellé (ou slot par défaut) |
| `description` | `string` | - | Texte d'aide relié par `aria-describedby` (ou slot `description`) |
| `value` | `string \| number` | - | Valeur envoyée avec le formulaire quand la case est cochée |
| `name` | `string` | - | Nom du champ de formulaire |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | État de validation |
| `displayType` | `'default' \| 'inline-card' \| 'block-card'` | `'default'` | Affichage simple ou en carte |
| `disabled` | `boolean` | `false` | Désactive la case |
| `required` | `boolean` | `false` | Case obligatoire |
| `ariaLabel` | `string` | - | Nom accessible d'une case sans libellé |

### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `update:modelValue` | `boolean` | Nouvelle valeur (v-model) |
| `update:indeterminate` | `boolean` | Fin de l'état mixte |
| `change` | `boolean` | Changement par l'utilisateur |
| `focus` / `blur` | `FocusEvent` | Focus de la case |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Libellé |
| `description` | Texte d'aide |

### Méthodes exposées

| Méthode | Description |
|---------|-------------|
| `focus()` | Donne le focus à la case |

## Accessibilité

- Input natif masqué visuellement mais focusable : `Tab` pour le focus, `Espace` pour cocher.
- L'état mixte passe par la propriété native `indeterminate`, lue « partiellement coché » par les lecteurs d'écran.
- La description est reliée par `aria-describedby`, comme le message du `SuFormField` parent.
- Une case sans libellé visible doit recevoir un `aria-label`.
- État `error` : `aria-invalid="true"`.
