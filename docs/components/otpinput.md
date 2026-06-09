# OtpInput

Composant de saisie OTP (One-Time Password) pour les codes de verification. Supporte plusieurs variantes visuelles, groupement configurable, validation flexible et soumission automatique. Conforme aux normes WCAG avec support complet clavier et lecteurs d'ecran.

## Exemples d'utilisation

### Basique

<div class="component-demo">
  <div class="demo-section">
    <h4>Code a 6 chiffres</h4>
    <div class="demo-buttons">
      <SuOtpInput :length="6" />
    </div>
  </div>
</div>

```vue
<SuOtpInput :length="6" />
```

### Variantes visuelles

<div class="component-demo">
  <div class="demo-section">
    <h4>boxes / underline / seamless</h4>
    <div class="demo-buttons-vertical" style="gap: 1.5rem;">
      <div>
        <p style="margin: 0 0 0.5rem; font-size: 0.875rem;">Boxes (defaut)</p>
        <SuOtpInput variant="boxes" :length="6" />
      </div>
      <div>
        <p style="margin: 0 0 0.5rem; font-size: 0.875rem;">Underline</p>
        <SuOtpInput variant="underline" :length="6" />
      </div>
      <div>
        <p style="margin: 0 0 0.5rem; font-size: 0.875rem;">Seamless</p>
        <SuOtpInput variant="seamless" :length="6" />
      </div>
    </div>
  </div>
</div>

```vue
<SuOtpInput variant="boxes" :length="6" />
<SuOtpInput variant="underline" :length="6" />
<SuOtpInput variant="seamless" :length="6" />
```

### Tailles

<div class="component-demo">
  <div class="demo-section">
    <h4>sm / md / lg</h4>
    <div class="demo-buttons-vertical" style="gap: 1.5rem;">
      <SuOtpInput size="sm" :length="6" />
      <SuOtpInput size="md" :length="6" />
      <SuOtpInput size="lg" :length="6" />
    </div>
  </div>
</div>

```vue
<SuOtpInput size="sm" :length="6" />
<SuOtpInput size="md" :length="6" />
<SuOtpInput size="lg" :length="6" />
```

### Groupement

<div class="component-demo">
  <div class="demo-section">
    <h4>Groupement configurable</h4>
    <div class="demo-buttons-vertical" style="gap: 1.5rem;">
      <div>
        <p style="margin: 0 0 0.5rem; font-size: 0.875rem;">6 digits en [3, 3]</p>
        <SuOtpInput :length="6" :grouping="[3, 3]" separator="-" />
      </div>
      <div>
        <p style="margin: 0 0 0.5rem; font-size: 0.875rem;">6 digits en [2, 2, 2]</p>
        <SuOtpInput :length="6" :grouping="[2, 2, 2]" separator="·" />
      </div>
      <div>
        <p style="margin: 0 0 0.5rem; font-size: 0.875rem;">8 digits en [4, 4]</p>
        <SuOtpInput :length="8" :grouping="[4, 4]" separator="-" />
      </div>
    </div>
  </div>
</div>

```vue
<SuOtpInput :length="6" :grouping="[3, 3]" separator="-" />
<SuOtpInput :length="6" :grouping="[2, 2, 2]" separator="·" />
<SuOtpInput :length="8" :grouping="[4, 4]" separator="-" />
```

### Types de saisie

<div class="component-demo">
  <div class="demo-section">
    <h4>Numerique / Alphanumerique / Alphabetique</h4>
    <div class="demo-buttons-vertical" style="gap: 1.5rem;">
      <div>
        <p style="margin: 0 0 0.5rem; font-size: 0.875rem;">Numerique (defaut)</p>
        <SuOtpInput inputType="numeric" :length="6" />
      </div>
      <div>
        <p style="margin: 0 0 0.5rem; font-size: 0.875rem;">Alphanumerique</p>
        <SuOtpInput inputType="alphanumeric" :length="6" />
      </div>
      <div>
        <p style="margin: 0 0 0.5rem; font-size: 0.875rem;">Alphabetique</p>
        <SuOtpInput inputType="alphabetic" :length="6" />
      </div>
    </div>
  </div>
</div>

```vue
<SuOtpInput inputType="numeric" :length="6" />
<SuOtpInput inputType="alphanumeric" :length="6" />
<SuOtpInput inputType="alphabetic" :length="6" />
```

### Validation personnalisee

<div class="component-demo">
  <div class="demo-section">
    <h4>Hexadecimal uniquement</h4>
    <div class="demo-buttons">
      <SuOtpInput :length="6" pattern="^[0-9a-fA-F]$" inputType="alphanumeric" />
    </div>
  </div>
</div>

```vue
<!-- Via pattern regex -->
<SuOtpInput :length="6" pattern="^[0-9a-fA-F]$" inputType="alphanumeric" />

<!-- Via fonction validate -->
<SuOtpInput :length="6" :validate="(char) => /^[0-9a-fA-F]$/.test(char)" />
```

### Masquage

<div class="component-demo">
  <div class="demo-section">
    <h4>Caracteres masques</h4>
    <div class="demo-buttons">
      <SuOtpInput :length="6" :masked="true" />
    </div>
  </div>
</div>

```vue
<SuOtpInput :length="6" :masked="true" />
```

### Etats de validation

<div class="component-demo">
  <div class="demo-section">
    <h4>error / success / warning</h4>
    <div class="demo-buttons-vertical" style="gap: 1.5rem;">
      <SuOtpInput state="error" :length="6" />
      <SuOtpInput state="success" :length="6" />
      <SuOtpInput state="warning" :length="6" />
    </div>
  </div>
</div>

```vue
<SuOtpInput state="error" :length="6" />
<SuOtpInput state="success" :length="6" />
<SuOtpInput state="warning" :length="6" />
```

### Soumission automatique

```vue
<SuOtpInput :length="6" :autoSubmit="true" @complete="handleComplete" />
```

```vue
<script setup>
const handleComplete = (code) => {
  console.log('Code complet :', code)
  // Verifier le code...
}
</script>
```

### Avec FormField (OtpInputField)

<div class="component-demo">
  <div class="demo-section">
    <h4>Label, message et etat</h4>
    <div class="demo-buttons-vertical" style="gap: 1.5rem; max-width: 400px;">
      <SuOtpInputField
        label="Code de verification"
        message="Entrez le code recu par SMS"
        :length="6"
        :grouping="[3, 3]"
      />
      <SuOtpInputField
        label="Code invalide"
        message="Le code saisi est incorrect."
        state="error"
        :length="6"
      />
    </div>
  </div>
</div>

```vue
<SuOtpInputField
  label="Code de verification"
  message="Entrez le code recu par SMS"
  :length="6"
  :grouping="[3, 3]"
/>
```

### 4 digits (code SMS)

<div class="component-demo">
  <div class="demo-section">
    <h4>Code court</h4>
    <div class="demo-buttons">
      <SuOtpInput :length="4" placeholder="0" />
    </div>
  </div>
</div>

```vue
<SuOtpInput :length="4" placeholder="0" />
```

## API

### Props (OtpInput)

| Prop | Type | Defaut | Description |
|------|------|--------|-------------|
| `modelValue` | `string` | `''` | Valeur du code OTP (v-model) |
| `length` | `number` | `6` | Nombre de caracteres |
| `variant` | `'boxes' \| 'underline' \| 'seamless'` | `'boxes'` | Variante visuelle |
| `inputType` | `'numeric' \| 'alphanumeric' \| 'alphabetic'` | `'numeric'` | Type de caracteres acceptes |
| `pattern` | `string` | — | Regex personnalisee (surcharge inputType) |
| `validate` | `(char: string, index: number) => boolean` | — | Fonction de validation par caractere |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille |
| `state` | `State` | `'default'` | Etat de validation |
| `disabled` | `boolean` | `false` | Desactive |
| `readonly` | `boolean` | `false` | Lecture seule |
| `required` | `boolean` | `false` | Requis |
| `masked` | `boolean` | `false` | Masquer les caracteres |
| `grouping` | `number[]` | — | Schema de groupement (ex: [3, 3]) |
| `separator` | `string` | `'-'` | Caractere separateur entre groupes |
| `autoSubmit` | `boolean` | `false` | Emettre `complete` quand tous les champs sont remplis |
| `placeholder` | `string` | `''` | Placeholder par champ |
| `autoFocus` | `boolean` | `false` | Auto-focus au montage |

### Props (OtpInputField)

Herite de `FormFieldProps` + `OtpInputProps`. Props supplementaires :

| Prop | Type | Defaut | Description |
|------|------|--------|-------------|
| `label` | `string` | — | Label du champ |
| `message` | `string` | — | Message d'aide ou d'erreur |
| `fieldId` | `string` | — | ID personnalise |
| `requiredText` | `string` | `'requis'` | Texte indicateur requis |

### Evenements

| Evenement | Payload | Description |
|-----------|---------|-------------|
| `update:modelValue` | `string` | Mise a jour du v-model |
| `complete` | `string` | Tous les champs sont remplis (si `autoSubmit`) |
| `change` | `string` | Valeur modifiee |
| `focus` | `FocusEvent, number` | Focus sur un champ (avec index) |
| `blur` | `FocusEvent, number` | Perte de focus (avec index) |

### Slots

| Slot | Description |
|------|-------------|
| `separator` | Contenu personnalise du separateur entre groupes |

### Methodes exposees

| Methode | Description |
|---------|-------------|
| `focus()` | Focus le premier champ |
| `clear()` | Efface tous les champs et focus le premier |

## Accessibilite

- `role="group"` avec `aria-label` descriptif sur le conteneur
- Chaque champ a un `aria-label` individuel ("Caractere X sur Y")
- Zone `aria-live="polite"` pour annoncer la progression
- Navigation clavier : fleches gauche/droite, Home, End, Backspace, Delete
- `autocomplete="one-time-code"` pour le remplissage automatique mobile
- `inputmode="numeric"` pour afficher le clavier numerique sur mobile
- Support collage (paste) avec distribution automatique des caracteres
- Support `prefers-contrast: high` et `prefers-reduced-motion: reduce`
