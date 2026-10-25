# useFormField

Relie un contrôle au [SuFormField](/components/formfield) qui l'entoure : id (cible du label), label, message d'aide et états du champ. Les contrôles SurgeUI l'utilisent déjà ; ce composable sert à vos propres contrôles.

## Sans rien à faire

Un contrôle SurgeUI placé dans le slot d'un SuFormField est relié automatiquement, sans `slotProps` :

```vue
<SuFormField label="E-mail" message="Adresse professionnelle" state="error" required>
  <SuInput v-model="email" type="email" />
</SuFormField>
```

Rendu : `<label for>` cible l'input, `aria-describedby` pointe vers le message, `aria-invalid` et `aria-required` sont posés, l'état d'erreur et la taille sont hérités.

## Dans un contrôle maison

```vue
<!-- ColorField.vue -->
<script setup lang="ts">
import { useFormField } from '@surgeui/ds-vue'

const props = withDefaults(defineProps<{
  state?: 'default' | 'error' | 'success' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  required?: boolean
}>(), { state: 'default', size: 'md' })

const model = defineModel<string>()

const { id, state, disabled, required, describedBy } = useFormField(props, {
  idPrefix: 'color'
})
</script>

<template>
  <input
    :id="id"
    v-model="model"
    type="color"
    :disabled="disabled"
    :aria-required="required || undefined"
    :aria-invalid="state === 'error' || undefined"
    :aria-describedby="describedBy"
  >
</template>
```

```vue
<SuFormField label="Couleur principale" message="Utilisée pour les boutons">
  <ColorField v-model="color" />
</SuFormField>
```

### Contrôle non ciblable par un label

Un `<label for>` ne cible que les éléments natifs (input, select, textarea, button). Pour un contrôle construit avec un `div` (combobox, groupe, curseur), déclarez-le non ciblable : il reçoit alors `aria-labelledby` vers le label, et le clic sur le label lui donne le focus.

```ts
const rootRef = ref<HTMLElement>()

const { labelledBy } = useFormField(props, {
  labelable: false,
  focus: () => rootRef.value?.focus()
})
```

## Priorités

| Valeur | Règle |
|--------|-------|
| `id` | attribut `id` du contrôle, sinon celui du champ, sinon généré (`idPrefix`) |
| `state`, `size` | valeur du contrôle si elle diffère du défaut (`default`, `md`), sinon celle du champ |
| `disabled`, `required` | vrai si le contrôle **ou** le champ l'est |
| `describedBy` | `aria-describedby` du contrôle + message du champ, sans doublon |
| `labelledBy` | `aria-labelledby` du contrôle, sinon le label du champ (contrôle non ciblable) |

Un champ relie un seul contrôle : pour plusieurs contrôles, utilisez [FormFieldGroup](/components/formfieldgroup).

## API

```ts
useFormField(props, options?)
```

### Options

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `labelable` | `boolean` | `true` | Le contrôle est ciblable par `<label for>` |
| `focus` | `() => void` | — | Donne le focus au contrôle (clic sur le label d'un contrôle non ciblable) |
| `idPrefix` | `string` | — | Préfixe de l'id généré hors champ ; sans préfixe, aucun id n'est généré |

### Retour

| Propriété | Type | Description |
|-----------|------|-------------|
| `field` | `FormFieldContext \| null` | Contexte du champ, ou `null` hors SuFormField |
| `id` | `ComputedRef<string \| undefined>` | Id du contrôle |
| `state` | `ComputedRef<State>` | État effectif |
| `size` | `ComputedRef<Size>` | Taille effective |
| `disabled` | `ComputedRef<boolean>` | Désactivé |
| `required` | `ComputedRef<boolean>` | Requis |
| `describedBy` | `ComputedRef<string \| undefined>` | Valeur d'`aria-describedby` |
| `labelledBy` | `ComputedRef<string \| undefined>` | Valeur d'`aria-labelledby` |

### Autres exports

| Export | Description |
|--------|-------------|
| `mergeIds(...ids)` | Joint des listes d'ids sans doublons ni vides |
| `provideFormField(context)` / `FormFieldKey` | Fournir le contexte depuis votre propre composant de champ |
