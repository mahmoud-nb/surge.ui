# Password

Composant Password qui hérite du composant Input avec validation de complexité, barre de progression de force et toggle de visibilité. Conforme aux normes W3C d'accessibilité avec feedback vocal pour les lecteurs d'écran.

## Exemples d'utilisation

### Password de base

<div class="component-demo">
  <div class="demo-section">
    <h4>Password simple avec barre de progression</h4>
    <div class="demo-inputs">
      <SuPassword 
        label="Mot de passe"
        placeholder="Entrez votre mot de passe"
        showProgress
        message="Choisissez un mot de passe sécurisé"
      />
    </div>
  </div>
</div>

```vue
<script setup>
const password = ref('')
</script>

<template>
  <SuPassword 
    label="Mot de passe"
    placeholder="Entrez votre mot de passe"
    showProgress
    message="Choisissez un mot de passe sécurisé"
    v-model="password"
  />
</template>
```

### Avec icône et règles personnalisées

<div class="component-demo">
  <div class="demo-section">
    <h4>Password avec icône et règles strictes</h4>
    <div class="demo-inputs">
      <SuPassword 
        label="Mot de passe sécurisé"
        placeholder="Entrez un mot de passe très sécurisé"
        :prefixIcon="'LockClosedIcon'"
        showProgress
        :rules="{
          minLength: 12,
          minUppercase: 2,
          minLowercase: 2,
          minDigits: 2,
          minSpecialChars: 2
        }"
        message="Mot de passe haute sécurité requis"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { LockClosedIcon } from '@heroicons/vue/24/outline'

const securePassword = ref('')
const strictRules = {
  minLength: 12,
  minUppercase: 2,
  minLowercase: 2,
  minDigits: 2,
  minSpecialChars: 2
}
</script>

<template>
  <SuPassword 
    label="Mot de passe sécurisé"
    placeholder="Entrez un mot de passe très sécurisé"
    :prefixIcon="'LockClosedIcon'"
    showProgress
    :rules="strictRules"
    message="Mot de passe haute sécurité requis"
    v-model="securePassword"
  />
</template>
```

### Avec message personnalisé et validation

<div class="component-demo">
  <div class="demo-section">
    <h4>Password avec feedback détaillé</h4>
    <div class="demo-inputs">
      <ClientOnly>
        <SuPassword 
          label="Mot de passe avec validation"
          placeholder="Entrez votre mot de passe"
          showProgress
          required
        >
          <template #default="{ validation, details }">
            <div style="margin-top: 0.75rem; padding: 0.75rem; background-color: #f8fafc; border-radius: 0.375rem; border: 1px solid #e2e8f0;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <span style="font-weight: 600; font-size: 0.875rem;" :style="{ color: validation.isValid ? '#059669' : '#dc2626' }">
                  {{ validation.isValid ? '✓ Mot de passe valide' : '⚠ Critères non respectés' }}
                </span>
                <span style="font-size: 0.75rem; color: #6b7280;">
                  Force : {{ validation.score }}%
                </span>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.25rem; font-size: 0.75rem;">
                <div style="display: flex; align-items: center; gap: 0.25rem;">
                  <span :style="{ color: details.length.satisfied ? '#059669' : '#dc2626', fontWeight: '600' }">
                    {{ details.length.satisfied ? '✓' : '✗' }}
                  </span>
                  <span>{{ details.length.current }}/{{ details.length.required }} caractères</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.25rem;">
                  <span :style="{ color: details.uppercase.satisfied ? '#059669' : '#dc2626', fontWeight: '600' }">
                    {{ details.uppercase.satisfied ? '✓' : '✗' }}
                  </span>
                  <span>{{ details.uppercase.current }}/{{ details.uppercase.required }} majuscules</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.25rem;">
                  <span :style="{ color: details.lowercase.satisfied ? '#059669' : '#dc2626', fontWeight: '600' }">
                    {{ details.lowercase.satisfied ? '✓' : '✗' }}
                  </span>
                  <span>{{ details.lowercase.current }}/{{ details.lowercase.required }} minuscules</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.25rem;">
                  <span :style="{ color: details.digits.satisfied ? '#059669' : '#dc2626', fontWeight: '600' }">
                    {{ details.digits.satisfied ? '✓' : '✗' }}
                  </span>
                  <span>{{ details.digits.current }}/{{ details.digits.required }} chiffres</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.25rem;">
                  <span :style="{ color: details.specialChars.satisfied ? '#059669' : '#dc2626', fontWeight: '600' }">
                    {{ details.specialChars.satisfied ? '✓' : '✗' }}
                  </span>
                  <span>{{ details.specialChars.current }}/{{ details.specialChars.required }} spéciaux</span>
                </div>
              </div>
            </div>
          </template>
        </SuPassword>
      </ClientOnly>
    </div>
  </div>                                          
</div>

```vue
<script setup>
const password = ref('')

const handleValidation = (validation) => {
  console.log('Validation:', validation)
}
</script>

<template>
  <SuPassword 
    label="Mot de passe avec validation"
    placeholder="Entrez votre mot de passe"
    showProgress
    required
    v-model="password"
    @validation="handleValidation"
  >
    <template #default="{ validation, details }">
      <div class="password-feedback">
        <div class="validation-header">
          <span :class="validation.isValid ? 'valid' : 'invalid'">
            {{ validation.isValid ? '✓ Valide' : '⚠ Invalide' }}
          </span>
          <span class="score">Force : {{ validation.score }}%</span>
        </div>
        
        <div class="criteria-grid">
          <div class="criterion">
            <span :class="details.length.satisfied ? 'satisfied' : 'unsatisfied'">
              {{ details.length.satisfied ? '✓' : '✗' }}
            </span>
            <span>{{ details.length.current }}/{{ details.length.required }} caractères</span>
          </div>
          <!-- Autres critères... -->
        </div>
      </div>
    </template>
  </SuPassword>
</template>
```

### Règles de validation personnalisées

<div class="component-demo">
  <div class="demo-section">
    <h4>Différents niveaux de sécurité</h4>
    <div class="demo-inputs">
      <SuPassword 
        label="Mot de passe simple"
        placeholder="6 caractères minimum"
        showProgress
        :rules="{
          minLength: 6,
          minUppercase: 0,
          minLowercase: 1,
          minDigits: 1,
          minSpecialChars: 0
        }"
        message="Règles basiques pour un mot de passe simple"
      />
      <SuPassword 
        label="Mot de passe standard"
        placeholder="8 caractères avec variété"
        showProgress
        :rules="{
          minLength: 8,
          minUppercase: 1,
          minLowercase: 1,
          minDigits: 1,
          minSpecialChars: 1
        }"
        message="Règles standard recommandées"
      />
      <SuPassword 
        label="Mot de passe strict"
        placeholder="12 caractères très sécurisé"
        showProgress
        :rules="{
          minLength: 12,
          minUppercase: 2,
          minLowercase: 2,
          minDigits: 2,
          minSpecialChars: 2
        }"
        message="Règles strictes pour haute sécurité"
      />
    </div>
  </div>
</div>

```vue
<template>
  <!-- Règles basiques -->
  <SuPassword 
    label="Mot de passe simple"
    :rules="{
      minLength: 6,
      minUppercase: 0,
      minLowercase: 1,
      minDigits: 1,
      minSpecialChars: 0
    }"
    showProgress
  />
  
  <!-- Règles standard -->
  <SuPassword 
    label="Mot de passe standard"
    :rules="{
      minLength: 8,
      minUppercase: 1,
      minLowercase: 1,
      minDigits: 1,
      minSpecialChars: 1
    }"
    showProgress
  />
  
  <!-- Règles strictes -->
  <SuPassword 
    label="Mot de passe strict"
    :rules="{
      minLength: 12,
      minUppercase: 2,
      minLowercase: 2,
      minDigits: 2,
      minSpecialChars: 2
    }"
    showProgress
  />
</template>
```

### Tailles

<div class="component-demo">
  <div class="demo-section">
    <h4>Tailles disponibles</h4>
    <div class="demo-inputs">
      <SuPassword 
        size="sm"
        label="Small"
        placeholder="Petit champ password"
        showProgress
      />
      <SuPassword 
        size="md"
        label="Medium"
        placeholder="Champ password moyen"
        showProgress
      />
      <SuPassword 
        size="lg"
        label="Large"
        placeholder="Grand champ password"
        showProgress
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuPassword size="sm" label="Small" showProgress />
  <SuPassword size="md" label="Medium" showProgress />
  <SuPassword size="lg" label="Large" showProgress />
</template>
```

### États et validation

<div class="component-demo">
  <div class="demo-section">
    <h4>États de validation</h4>
    <div class="demo-inputs">
      <SuPassword 
        label="État par défaut"
        placeholder="Entrez votre mot de passe"
        showProgress
        message="Le state s'adapte automatiquement à la validation"
      />
      <SuPassword 
        state="error"
        label="État d'erreur forcé"
        placeholder="État d'erreur"
        showProgress
        message="État d'erreur forcé indépendamment de la validation"
      />
      <SuPassword 
        state="success"
        label="État de succès forcé"
        placeholder="État de succès"
        showProgress
        message="État de succès forcé"
      />
    </div>
  </div>
</div>

```vue
<template>
  <!-- État automatique basé sur la validation -->
  <SuPassword 
    label="État automatique"
    showProgress
    message="Le state s'adapte à la validation"
  />
  
  <!-- État forcé -->
  <SuPassword 
    state="error"
    label="État d'erreur forcé"
    showProgress
    message="État forcé indépendamment de la validation"
  />
</template>
```

### Options d'affichage

<div class="component-demo">
  <div class="demo-section">
    <h4>Contrôle de l'affichage</h4>
    <div class="demo-inputs">
      <SuPassword 
        label="Avec barre de progression"
        placeholder="Barre de progression visible"
        showProgress
        :showToggle="true"
      />
      <SuPassword 
        label="Sans toggle de visibilité"
        placeholder="Pas de bouton œil"
        showProgress
        :showToggle="false"
      />
      <SuPassword 
        label="Sans barre de progression"
        placeholder="Pas de barre de progression"
        :showProgress="false"
        :showToggle="true"
      />
      <SuPassword 
        label="Minimal"
        placeholder="Juste un champ password"
        :showProgress="false"
        :showToggle="false"
      />
    </div>
  </div>
</div>

```vue
<template>
  <!-- Avec barre et toggle -->
  <SuPassword showProgress :showToggle="true" />
  
  <!-- Sans toggle -->
  <SuPassword showProgress :showToggle="false" />
  
  <!-- Sans barre -->
  <SuPassword :showProgress="false" />
  
  <!-- Minimal -->
  <SuPassword :showProgress="false" :showToggle="false" />
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rules` | `PasswordRules` | `{ minLength: 8, minUppercase: 1, minLowercase: 1, minDigits: 1, minSpecialChars: 1 }` | Règles de validation du mot de passe |
| `showProgress` | `boolean` | `false` | Afficher la barre de progression de force |
| `showToggle` | `boolean` | `true` | Afficher le bouton toggle de visibilité |
| `name` | `string` | - | Nom du champ, pour la soumission native du formulaire |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du champ |
| `required` | `boolean` | `false` | Champ requis |
| `placeholder` | `string` | - | Texte indicatif |
| `max` | `string \| number` | - | Valeur maximale (types `number`, `date`…) |
| `disabled` | `boolean` | `false` | Champ désactivé |
| `min` | `string \| number` | - | Valeur minimale (types `number`, `date`…) |
| `state` | `'default' \| 'success' \| 'warning' \| 'error'` | `'default'` | État de validation |
| `prefix` | `string` | - | Texte avant la saisie |
| `suffix` | `string` | - | Texte après la saisie |
| `autocomplete` | `string` | - | Attribut `autocomplete` natif (`email`, `current-password`, `off`…) |
| `readonly` | `boolean` | `false` | Lecture seule |
| `prefixIcon` | `Component` | - | Icône avant la saisie |
| `prefixLabel` | `string` | - | Nom accessible du préfixe texte quand il est cliquable (`@prefix-click`) |
| `prefixIconLabel` | `string` | - | Nom accessible de l’icône de préfixe quand elle est cliquable (`@prefix-icon-click`) |
| `suffixLabel` | `string` | - | Nom accessible du suffixe texte quand il est cliquable (`@suffix-click`) |
| `suffixIconLabel` | `string` | - | Nom accessible de l’icône de suffixe quand elle est cliquable (`@suffix-icon-click`) |
| `textAlign` | `'default' \| 'left' \| 'right' \| 'center'` | - | Alignement du texte saisi |
| `step` | `string \| number` | - | Pas entre deux valeurs (types `number`, `date`…) |
| `minLength` | `number` | - | Nombre minimal de caractères (validation native) |
| `maxLength` | `number` | - | Nombre maximal de caractères |
| `pattern` | `string` | - | Expression régulière de validation native |
| `v-model` | `string` | `''` | Mot de passe saisi |

**Hérite de toutes les props du composant Input** : `size`, `state`, `disabled`, `readonly`, `required`, `placeholder`, `label`, `message`, etc.

### Types

#### PasswordRules
```typescript
interface PasswordRules {
  minLength?: number        // Longueur minimale
  minUppercase?: number     // Nombre minimum de majuscules
  minLowercase?: number     // Nombre minimum de minuscules
  minDigits?: number        // Nombre minimum de chiffres
  minSpecialChars?: number  // Nombre minimum de caractères spéciaux
}
```

#### PasswordValidation
```typescript
interface PasswordValidation {
  isValid: boolean          // Toutes les règles sont respectées
  score: number            // Score de 0 à 100
  satisfied: string[]      // Règles respectées
  unsatisfied: string[]    // Règles non respectées
  details: {               // Détails pour chaque règle
    length: { required: number; current: number; satisfied: boolean }
    uppercase: { required: number; current: number; satisfied: boolean }
    lowercase: { required: number; current: number; satisfied: boolean }
    digits: { required: number; current: number; satisfied: boolean }
    specialChars: { required: number; current: number; satisfied: boolean }
  }
}
```

### Props (PasswordField)

`SuPasswordField` accepte les props ci-dessus, et celles du champ :

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `label` | `string` | - | Label du champ |
| `message` | `string` | - | Message d'aide ou d'erreur, relié par `aria-describedby` |
| `requiredText` | `string` | - | Texte de l'astérisque « requis » pour les lecteurs d'écran (sinon traduit) |
| `fieldId` | `string` | - | Id du contrôle, relié au label (sinon généré) |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `@validation` | `(validation: PasswordValidation) => void` | Émis à chaque changement avec l'état de validation |
| `@toggle-visibility` | `(visible: boolean) => void` | Émis lors du toggle de visibilité |

**Hérite de tous les events du composant Input** : `@input`, `@change`, `@focus`, `@blur`, `@keydown`, `@keyup`

### Slots

| Slot | Props | Description |
|------|-------|-------------|
| `default` | `{ validation, isValid, score, satisfied, unsatisfied, details }` | Message personnalisé basé sur la validation |

## Validation automatique

Le composant effectue une validation en temps réel du mot de passe :

### 🔍 Critères de validation

- **Longueur** : Nombre de caractères total
- **Majuscules** : Lettres A-Z
- **Minuscules** : Lettres a-z  
- **Chiffres** : Nombres 0-9
- **Caractères spéciaux** : Tous les autres caractères (!@#$%^&*, etc.)

### 📊 Calcul du score

Le score (0-100%) est calculé selon le pourcentage de règles respectées :
- **0-24%** : Faible (rouge)
- **25-49%** : Moyen (orange)
- **50-74%** : Bon (jaune)
- **75-100%** : Fort (vert)

### 🎯 État automatique

Si aucun `state` n'est forcé, le composant adapte automatiquement son état :
- **default** : Pas de mot de passe ou score indéterminé
- **error** : Score < 25%
- **warning** : Score 25-74%
- **success** : Score ≥ 75% et toutes les règles respectées

## Toggle de visibilité

### 👁️ Fonctionnalités

- **Icône adaptative** : Œil ouvert/fermé selon l'état
- **Accessibilité** : Label vocal "Afficher/Masquer le mot de passe"
- **Navigation clavier** : Support Entrée et Espace
- **États** : Désactivé si le champ est disabled/readonly

### 🔒 Sécurité

- **Pas de copie** : Le texte visible n'est pas plus facilement copiable
- **Feedback visuel** : L'utilisateur contrôle la visibilité
- **Réversible** : Peut être masqué à nouveau immédiatement

## Barre de progression

### 📈 Affichage visuel

- **Couleur adaptative** : Rouge → Orange → Jaune → Vert
- **Animation fluide** : Transition douce lors des changements
- **Label de force** : "Faible", "Moyen", "Bon", "Fort"
- **Responsive** : S'adapte à la largeur du conteneur

### ♿ Accessibilité

- **Role progressbar** : `role="progressbar"` avec valeurs ARIA
- **Annonces vocales** : Changements annoncés aux lecteurs d'écran
- **Contraste** : Couleurs conformes WCAG AA
- **Réduction d'animation** : Respect de `prefers-reduced-motion`

## Accessibilité

Le composant Password respecte les normes WCAG 2.1 AA :

### ✅ Fonctionnalités d'accessibilité

- **Héritage Input** : Toutes les fonctionnalités d'accessibilité du composant Input
- **Toggle accessible** : Bouton avec label vocal approprié
- **Validation vocale** : Annonces des changements d'état pour les lecteurs d'écran
- **Barre de progression** : Attributs ARIA complets (`aria-valuenow`, `aria-valuemin`, `aria-valuemax`)
- **Messages d'état** : Feedback vocal en temps réel avec `aria-live`
- **Contraste des couleurs** : Ratios conformes WCAG AA pour tous les états
- **Navigation clavier** : Support complet du clavier pour toutes les interactions

### 🎯 Bonnes pratiques

```vue
<!-- Password avec validation complète -->
<SuPassword 
  label="Nouveau mot de passe"
  :required="true"
  showProgress
  :rules="{
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minDigits: 1,
    minSpecialChars: 1
  }"
  autocomplete="new-password"
  v-model="password"
  @validation="handlePasswordValidation"
>
  <template #default="{ validation, details }">
    <div class="password-requirements">
      <h4>Critères requis :</h4>
      <ul>
        <li :class="details.length.satisfied ? 'satisfied' : 'unsatisfied'">
          Au moins {{ details.length.required }} caractères
        </li>
        <li :class="details.uppercase.satisfied ? 'satisfied' : 'unsatisfied'">
          Au moins {{ details.uppercase.required }} majuscule
        </li>
        <!-- Autres critères... -->
      </ul>
    </div>
  </template>
</SuPassword>

<!-- Confirmation de mot de passe -->
<SuPassword 
  label="Confirmer le mot de passe"
  :showProgress="false"
  autocomplete="new-password"
  v-model="confirmPassword"
/>
```

## Exemples d'usage avancés

### Formulaire d'inscription

```vue
<script setup>
import { ref, computed } from 'vue'

const password = ref('')
const confirmPassword = ref('')
const passwordValidation = ref(null)

const isPasswordValid = computed(() => {
  return passwordValidation.value?.isValid || false
})

const passwordsMatch = computed(() => {
  return password.value === confirmPassword.value && password.value.length > 0
})

const canSubmit = computed(() => {
  return isPasswordValid.value && passwordsMatch.value
})

const handlePasswordValidation = (validation) => {
  passwordValidation.value = validation
}
</script>

<template>
  <form class="registration-form">
    <h2>Créer un compte</h2>
    
    <SuPassword 
      label="Mot de passe"
      placeholder="Choisissez un mot de passe sécurisé"
      required
      showProgress
      autocomplete="new-password"
      v-model="password"
      @validation="handlePasswordValidation"
    >
      <template #default="{ validation, details }">
        <div v-if="password" class="password-criteria">
          <h4>Critères de sécurité :</h4>
          <div class="criteria-list">
            <div class="criterion" :class="details.length.satisfied ? 'satisfied' : 'unsatisfied'">
              <span class="criterion-icon">{{ details.length.satisfied ? '✓' : '✗' }}</span>
              <span>{{ details.length.required }} caractères minimum</span>
            </div>
            <div class="criterion" :class="details.uppercase.satisfied ? 'satisfied' : 'unsatisfied'">
              <span class="criterion-icon">{{ details.uppercase.satisfied ? '✓' : '✗' }}</span>
              <span>{{ details.uppercase.required }} majuscule minimum</span>
            </div>
            <div class="criterion" :class="details.digits.satisfied ? 'satisfied' : 'unsatisfied'">
              <span class="criterion-icon">{{ details.digits.satisfied ? '✓' : '✗' }}</span>
              <span>{{ details.digits.required }} chiffre minimum</span>
            </div>
            <div class="criterion" :class="details.specialChars.satisfied ? 'satisfied' : 'unsatisfied'">
              <span class="criterion-icon">{{ details.specialChars.satisfied ? '✓' : '✗' }}</span>
              <span>{{ details.specialChars.required }} caractère spécial minimum</span>
            </div>
          </div>
        </div>
      </template>
    </SuPassword>
    
    <SuPassword 
      label="Confirmer le mot de passe"
      placeholder="Confirmez votre mot de passe"
      required
      :showProgress="false"
      :state="confirmPassword && !passwordsMatch ? 'error' : 'default'"
      :message="confirmPassword && !passwordsMatch ? 'Les mots de passe ne correspondent pas' : undefined"
      autocomplete="new-password"
      v-model="confirmPassword"
    />
    
    <button 
      type="submit" 
      :disabled="!canSubmit"
      class="submit-button"
    >
      Créer le compte
    </button>
  </form>
</template>

<style scoped>
.registration-form {
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.password-criteria {
  margin-top: 0.75rem;
  padding: 0.75rem;
  background-color: #f8fafc;
  border-radius: 0.375rem;
  border: 1px solid #e2e8f0;
}

.password-criteria h4 {
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.criteria-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.criterion {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
}

.criterion-icon {
  font-weight: 600;
  width: 1rem;
  text-align: center;
}

.criterion.satisfied {
  color: #059669;
}

.criterion.unsatisfied {
  color: #dc2626;
}

.submit-button {
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.submit-button:not(:disabled):hover {
  background-color: #2563eb;
}
</style>
```

### Changement de mot de passe

```vue
<script setup>
import { ref } from 'vue'

const currentPassword = ref('')
const newPassword = ref('')
const confirmNewPassword = ref('')
const newPasswordValidation = ref(null)

const handleNewPasswordValidation = (validation) => {
  newPasswordValidation.value = validation
}
</script>

<template>
  <form class="change-password-form">
    <h2>Changer le mot de passe</h2>
    
    <SuPassword 
      label="Mot de passe actuel"
      placeholder="Entrez votre mot de passe actuel"
      required
      :showProgress="false"
      autocomplete="current-password"
      v-model="currentPassword"
    />
    
    <SuPassword 
      label="Nouveau mot de passe"
      placeholder="Choisissez un nouveau mot de passe"
      required
      showProgress
      autocomplete="new-password"
      v-model="newPassword"
      @validation="handleNewPasswordValidation"
    >
      <template #default="{ validation }">
        <div v-if="newPassword" class="password-feedback">
          <div class="feedback-header">
            <span :class="validation.isValid ? 'valid' : 'invalid'">
              {{ validation.isValid ? '✓ Mot de passe sécurisé' : '⚠ Améliorations nécessaires' }}
            </span>
            <span class="score">{{ validation.score }}% de force</span>
          </div>
          
          <div v-if="!validation.isValid" class="improvements">
            <p>Pour améliorer la sécurité :</p>
            <ul>
              <li v-if="validation.unsatisfied.includes('length')">
                Ajoutez plus de caractères
              </li>
              <li v-if="validation.unsatisfied.includes('uppercase')">
                Ajoutez des lettres majuscules
              </li>
              <li v-if="validation.unsatisfied.includes('lowercase')">
                Ajoutez des lettres minuscules
              </li>
              <li v-if="validation.unsatisfied.includes('digits')">
                Ajoutez des chiffres
              </li>
              <li v-if="validation.unsatisfied.includes('specialChars')">
                Ajoutez des caractères spéciaux (!@#$%^&*)
              </li>
            </ul>
          </div>
        </div>
      </template>
    </SuPassword>
    
    <SuPassword 
      label="Confirmer le nouveau mot de passe"
      placeholder="Confirmez votre nouveau mot de passe"
      required
      :showProgress="false"
      autocomplete="new-password"
      v-model="confirmNewPassword"
    />
    
    <button type="submit" class="submit-button">
      Changer le mot de passe
    </button>
  </form>
</template>
```

## Règles de validation par défaut

```javascript
const defaultRules = {
  minLength: 8,        // 8 caractères minimum
  minUppercase: 1,     // 1 majuscule minimum
  minLowercase: 1,     // 1 minuscule minimum
  minDigits: 1,        // 1 chiffre minimum
  minSpecialChars: 1   // 1 caractère spécial minimum
}
```

## Personnalisation des règles

### 🔧 Exemples de configurations

```vue
<!-- Mot de passe simple -->
<SuPassword 
  :rules="{
    minLength: 6,
    minUppercase: 0,
    minLowercase: 1,
    minDigits: 1,
    minSpecialChars: 0
  }"
/>

<!-- Mot de passe d'entreprise -->
<SuPassword 
  :rules="{
    minLength: 12,
    minUppercase: 2,
    minLowercase: 2,
    minDigits: 2,
    minSpecialChars: 2
  }"
/>

<!-- Mot de passe PIN numérique -->
<SuPassword 
  :rules="{
    minLength: 4,
    minUppercase: 0,
    minLowercase: 0,
    minDigits: 4,
    minSpecialChars: 0
  }"
/>
```

## Navigation au clavier

| Touche | Action |
|--------|--------|
| `Tab` | Naviguer vers/depuis le champ |
| `Entrée` / `Espace` | Activer le toggle de visibilité (sur l'icône) |
| `Ctrl/Cmd + A` | Sélectionner tout le texte |

## Bonnes pratiques de sécurité

### ✅ Recommandations

- **Autocomplete** : Utilisez `autocomplete="new-password"` pour les nouveaux mots de passe
- **Validation côté serveur** : Toujours valider côté serveur également
- **Règles adaptées** : Ajustez les règles selon le contexte (personnel vs entreprise)
- **Feedback positif** : Encouragez les bons mots de passe avec des messages positifs
- **Pas de stockage** : Ne stockez jamais les mots de passe en clair

### 🔒 Sécurité

- **Pas de logging** : Le composant ne log jamais les mots de passe
- **Validation locale** : La validation se fait côté client uniquement
- **Pas de transmission** : Les règles et validations restent locales
- **Nettoyage mémoire** : Les valeurs sont nettoyées automatiquement