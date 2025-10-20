# FormFields

Composant FormFields pour organiser et aligner des champs de formulaire avec un espacement contrôlé. Supporte la propagation de la prop `size` aux champs enfants et la gestion des sections avec slots `head` et `footer`.

## Exemples d'utilisation

### FormFields de base

<div class="component-demo">
  <div class="demo-section">
    <h4>Formulaire simple</h4>
    <div class="demo-inputs">
      <SuFormFields style="width: 400px;">
        <SuInputField 
          label="Nom complet"
          placeholder="Entrez votre nom"
          :prefixIcon="UserIcon"
          required
        />
        <SuInputField 
          type="email"
          label="Email"
          placeholder="nom@exemple.com"
          :prefixIcon="AtSymbolIcon"
          required
        />
        <SuSelectBoxField 
          :options="[
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' }
          ]"
          label="Préférence"
          placeholder="Choisissez une option"
        />
        <SuSwitchField 
          label="Notifications"
          rightLabel="Activées"
          message="Recevoir des notifications par email"
        />
      </SuFormFields>
    </div>
  </div>
</div>

```vue
<script setup>
import { UserIcon, AtSymbolIcon } from '@heroicons/vue/24/outline'

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
]
</script>

<template>
  <SuFormFields>
    <SuInputField 
      label="Nom complet"
      placeholder="Entrez votre nom"
      :prefixIcon="UserIcon"
      required
    />
    <SuInputField 
      type="email"
      label="Email"
      placeholder="nom@exemple.com"
      :prefixIcon="AtSymbolIcon"
      required
    />
    <SuSelectBoxField 
      :options="options"
      label="Préférence"
      placeholder="Choisissez une option"
    />
    <SuSwitchField 
      label="Notifications"
      rightLabel="Activées"
      message="Recevoir des notifications par email"
    />
  </SuFormFields>
</template>
```

### Espacement entre les champs (gap)

<div class="component-demo">
  <div class="demo-section">
    <h4>Différents espacements</h4>
    <div class="demo-buttons-vertical">
      <div>
        <p><strong>Gap Small</strong></p>
        <SuFormFields gap="sm" style="width: 300px;">
          <SuInputField label="Nom" placeholder="Votre nom" />
          <SuInputField type="email" label="Email" placeholder="email@exemple.com" />
          <SuSwitchField label="Newsletter" rightLabel="Oui" />
        </SuFormFields>
      </div>
      <div>
        <p><strong>Gap Medium (défaut)</strong></p>
        <SuFormFields gap="md" style="width: 300px;">
          <SuInputField label="Nom" placeholder="Votre nom" />
          <SuInputField type="email" label="Email" placeholder="email@exemple.com" />
          <SuSwitchField label="Newsletter" rightLabel="Oui" />
        </SuFormFields>
      </div>
      <div>
        <p><strong>Gap Large</strong></p>
        <SuFormFields gap="lg" style="width: 300px;">
          <SuInputField label="Nom" placeholder="Votre nom" />
          <SuInputField type="email" label="Email" placeholder="email@exemple.com" />
          <SuSwitchField label="Newsletter" rightLabel="Oui" />
        </SuFormFields>
      </div>
      <div>
        <p><strong>Gap Extra Large</strong></p>
        <SuFormFields gap="xl" style="width: 300px;">
          <SuInputField label="Nom" placeholder="Votre nom" />
          <SuInputField type="email" label="Email" placeholder="email@exemple.com" />
          <SuSwitchField label="Newsletter" rightLabel="Oui" />
        </SuFormFields>
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <!-- Espacement petit -->
  <SuFormFields gap="sm">
    <SuInputField label="Nom" placeholder="Votre nom" />
    <SuInputField type="email" label="Email" placeholder="email@exemple.com" />
    <SuSwitchField label="Newsletter" rightLabel="Oui" />
  </SuFormFields>
  
  <!-- Espacement moyen (défaut) -->
  <SuFormFields gap="md">
    <SuInputField label="Nom" placeholder="Votre nom" />
    <SuInputField type="email" label="Email" placeholder="email@exemple.com" />
    <SuSwitchField label="Newsletter" rightLabel="Oui" />
  </SuFormFields>
  
  <!-- Espacement large -->
  <SuFormFields gap="lg">
    <SuInputField label="Nom" placeholder="Votre nom" />
    <SuInputField type="email" label="Email" placeholder="email@exemple.com" />
    <SuSwitchField label="Newsletter" rightLabel="Oui" />
  </SuFormFields>
  
  <!-- Espacement extra large -->
  <SuFormFields gap="xl">
    <SuInputField label="Nom" placeholder="Votre nom" />
    <SuInputField type="email" label="Email" placeholder="email@exemple.com" />
    <SuSwitchField label="Newsletter" rightLabel="Oui" />
  </SuFormFields>
</template>
```

### Propagation de la taille

<div class="component-demo">
  <div class="demo-section">
    <h4>Taille forcée sur tous les champs</h4>
    <div class="demo-buttons-vertical">
      <div>
        <p><strong>Taille Small forcée</strong></p>
        <SuFormFields size="sm" style="width: 300px;">
          <SuInputField label="Nom" placeholder="Petit champ" />
          <SuSelectBoxField 
            :options="[
              { value: 'sm', label: 'Small' },
              { value: 'md', label: 'Medium' }
            ]"
            label="Sélection" 
            placeholder="Petit select" 
          />
          <SuTextareaField label="Message" placeholder="Petit textarea" />
        </SuFormFields>
      </div>
      <div>
        <p><strong>Taille Medium forcée</strong></p>
        <SuFormFields size="md" style="width: 300px;">
          <SuInputField label="Nom" placeholder="Champ moyen" />
          <SuSelectBoxField 
            :options="[
              { value: 'sm', label: 'Small' },
              { value: 'md', label: 'Medium' }
            ]"
            label="Sélection" 
            placeholder="Select moyen" 
          />
          <SuTextareaField label="Message" placeholder="Textarea moyen" />
        </SuFormFields>
      </div>
      <div>
        <p><strong>Taille Large forcée</strong></p>
        <SuFormFields size="lg" style="width: 300px;">
          <SuInputField label="Nom" placeholder="Grand champ" />
          <SuSelectBoxField 
            :options="[
              { value: 'sm', label: 'Small' },
              { value: 'md', label: 'Medium' }
            ]"
            label="Sélection" 
            placeholder="Grand select" 
          />
          <SuTextareaField label="Message" placeholder="Grand textarea" />
        </SuFormFields>
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <!-- Tous les champs seront en taille small -->
  <SuFormFields size="sm">
    <SuInputField label="Nom" placeholder="Petit champ" />
    <SuSelectBoxField :options="options" label="Sélection" placeholder="Petit select" />
    <SuTextareaField label="Message" placeholder="Petit textarea" />
  </SuFormFields>
  
  <!-- Tous les champs seront en taille large -->
  <SuFormFields size="lg">
    <SuInputField label="Nom" placeholder="Grand champ" />
    <SuSelectBoxField :options="options" label="Sélection" placeholder="Grand select" />
    <SuTextareaField label="Message" placeholder="Grand textarea" />
  </SuFormFields>
</template>
```

### Direction horizontale

<div class="component-demo">
  <div class="demo-section">
    <h4>Champs alignés horizontalement</h4>
    <div class="demo-inputs">
      <SuFormFields direction="horizontal" gap="md" style="width: 100%; max-width: 800px;">
        <SuInputField 
          label="Prénom"
          placeholder="Votre prénom"
          required
        />
        <SuInputField 
          label="Nom"
          placeholder="Votre nom"
          required
        />
        <SuSelectBoxField 
          :options="[
            { value: 'fr', label: 'France' },
            { value: 'us', label: 'États-Unis' },
            { value: 'de', label: 'Allemagne' }
          ]"
          label="Pays"
          placeholder="Sélectionnez votre pays"
        />
      </SuFormFields>
    </div>
  </div>
</div>

```vue
<template>
  <SuFormFields direction="horizontal" gap="md">
    <SuInputField 
      label="Prénom"
      placeholder="Votre prénom"
      required
    />
    <SuInputField 
      label="Nom"
      placeholder="Votre nom"
      required
    />
    <SuSelectBoxField 
      :options="countryOptions"
      label="Pays"
      placeholder="Sélectionnez votre pays"
    />
  </SuFormFields>
</template>
```

### Avec sections (head et footer)

<div class="component-demo">
  <div class="demo-section">
    <h4>Formulaire avec en-tête et pied de page</h4>
    <div class="demo-inputs">
      <SuFormFields style="width: 500px;" sectionGap="lg" role="form" aria-label="Formulaire d'inscription">
        <template #head>
          <div style="text-align: center; padding: 1.5rem; background-color: #f8fafc; border-radius: 0.5rem;">
            <h2 style="margin: 0 0 0.5rem 0; color: #1e293b; font-size: 1.5rem; font-weight: 600;">
              Créer un compte
            </h2>
            <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
              Remplissez les informations ci-dessous pour créer votre compte
            </p>
          </div>
        </template>
        <SuInputField 
          label="Nom complet"
          placeholder="Entrez votre nom complet"
          :prefixIcon="UserIcon"
          required
        />
        <SuInputField 
          type="email"
          label="Adresse email"
          placeholder="nom@exemple.com"
          :prefixIcon="AtSymbolIcon"
          required
        />
        <SuInputField 
          type="password"
          label="Mot de passe"
          placeholder="••••••••"
          :prefixIcon="LockClosedIcon"
          required
        />
        <SuSwitchField 
          label="Conditions d'utilisation"
          rightLabel="J'accepte"
          message="Vous devez accepter les conditions d'utilisation"
          required
        />
        <template #footer>
          <div style="display: flex; gap: 1rem; justify-content: space-between; align-items: center; padding: 1.5rem; background-color: #f8fafc; border-radius: 0.5rem; border: 1px solid #e2e8f0;">
            <p style="margin: 0; font-size: 0.875rem; color: #64748b;">
              Déjà un compte ? <a href="#" style="color: #3b82f6; text-decoration: underline;">Se connecter</a>
            </p>
            <div style="display: flex; gap: 0.75rem;">
              <SuButton variant="outline">Annuler</SuButton>
              <SuButton variant="primary">Créer le compte</SuButton>
            </div>
          </div>
        </template>
      </SuFormFields>
    </div>
  </div>
</div>

```vue
<script setup>
import { UserIcon, AtSymbolIcon, LockClosedIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <SuFormFields role="form" aria-label="Formulaire d'inscription">
    <template #head>
      <div class="form-header">
        <h2>Créer un compte</h2>
        <p>Remplissez les informations ci-dessous</p>
      </div>
    </template>

    <SuInputField 
      label="Nom complet"
      placeholder="Entrez votre nom complet"
      :prefixIcon="UserIcon"
      required
    />
    
    <SuInputField 
      type="email"
      label="Adresse email"
      placeholder="nom@exemple.com"
      :prefixIcon="AtSymbolIcon"
      required
    />
    
    <SuInputField 
      type="password"
      label="Mot de passe"
      placeholder="••••••••"
      :prefixIcon="LockClosedIcon"
      required
    />
    
    <SuSwitchField 
      label="Conditions d'utilisation"
      rightLabel="J'accepte"
      required
    />

    <template #footer>
      <div class="form-actions">
        <SuButton variant="outline">Annuler</SuButton>
        <SuButton variant="primary">Créer le compte</SuButton>
      </div>
    </template>
  </SuFormFields>
</template>
```

### Espacement des sections (sectionGap)

<div class="component-demo">
  <div class="demo-section">
    <h4>Différents espacements entre sections</h4>
    <div class="demo-buttons-vertical">
      <div>
        <p><strong>Section Gap Small</strong></p>
        <SuFormFields sectionGap="sm" style="width: 300px;">
          <template #head>
            <h3 style="margin: 0; color: #374151;">Informations personnelles</h3>
          </template>
          <SuInputField label="Nom" placeholder="Votre nom" />
          <SuInputField label="Email" placeholder="votre@email.com" />
          <template #footer>
            <SuButton variant="primary" block>Sauvegarder</SuButton>
          </template>
        </SuFormFields>
      </div>
      <div>
        <p><strong>Section Gap Large (défaut)</strong></p>
        <SuFormFields sectionGap="lg" style="width: 300px;">
          <template #head>
            <h3 style="margin: 0; color: #374151;">Informations personnelles</h3>
          </template>
          <SuInputField label="Nom" placeholder="Votre nom" />
          <SuInputField label="Email" placeholder="votre@email.com" />
          <template #footer>
            <SuButton variant="primary" block>Sauvegarder</SuButton>
          </template>
        </SuFormFields>
      </div>
      <div>
        <p><strong>Section Gap Extra Large</strong></p>
        <SuFormFields sectionGap="xl" style="width: 300px;">
          <template #head>
            <h3 style="margin: 0; color: #374151;">Informations personnelles</h3>
          </template>
          <SuInputField label="Nom" placeholder="Votre nom" />
          <SuInputField label="Email" placeholder="votre@email.com" />
          <template #footer>
            <SuButton variant="primary" block>Sauvegarder</SuButton>
          </template>
        </SuFormFields>
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <!-- Espacement petit entre sections -->
  <SuFormFields sectionGap="sm">
    <template #head>
      <h3>Informations personnelles</h3>
    </template>
    <SuInputField label="Nom" placeholder="Votre nom" />
    <SuInputField label="Email" placeholder="votre@email.com" />
    <template #footer>
      <SuButton variant="primary" block>Sauvegarder</SuButton>
    </template>
  </SuFormFields>
  
  <!-- Espacement extra large entre sections -->
  <SuFormFields sectionGap="xl">
    <template #head>
      <h3>Informations personnelles</h3>
    </template>
    <SuInputField label="Nom" placeholder="Votre nom" />
    <SuInputField label="Email" placeholder="votre@email.com" />
    <template #footer>
      <SuButton variant="primary" block>Sauvegarder</SuButton>
    </template>
  </SuFormFields>
</template>
```

### Tous les types de champs

<div class="component-demo">
  <div class="demo-section">
    <h4>Formulaire complet avec tous les types de champs</h4>
    <div class="demo-inputs">
      <SuFormFields style="width: 500px;" gap="lg" size="md">
        <template #head>
          <div style="text-align: center; padding: 1.5rem; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); border-radius: 0.75rem; color: white;">
            <h2 style="margin: 0 0 0.5rem 0; font-size: 1.5rem; font-weight: 700;">
              Profil complet
            </h2>
            <p style="margin: 0; opacity: 0.9;">
              Remplissez toutes les informations
            </p>
          </div>
        </template>
        <SuInputField 
          label="Nom d'utilisateur"
          placeholder="Choisissez un nom d'utilisateur"
          :prefixIcon="UserIcon"
          required
        />
        <SuSelectBoxField 
          :options="[
            { value: 'fr', label: 'France' },
            { value: 'us', label: 'États-Unis' },
            { value: 'de', label: 'Allemagne' }
          ]"
          label="Pays"
          placeholder="Sélectionnez votre pays"
          searchable
        />
        <SuRadioGroup 
          :options="[
            { value: 'personal', label: 'Personnel', icon: 'UserIcon' },
            { value: 'business', label: 'Entreprise', icon: 'BuildingOfficeIcon' }
          ]"
          label="Type de compte"
          displayType="inline-card"
          direction="horizontal"
        />
        <SuCheckboxGroup 
          :options="[
            { value: 'js', label: 'JavaScript' },
            { value: 'ts', label: 'TypeScript' },
            { value: 'vue', label: 'Vue.js' }
          ]"
          label="Compétences"
          direction="horizontal"
          maxSelections="2"
        />
        <SuSlider 
          label="Niveau d'expérience"
          :min="1"
          :max="10"
          :modelValue="5"
          showValue
          showTicks
          :formatValue="(value) => value + '/10'"
        />
        <SuFileUpload 
          label="Photo de profil"
          accept="image/*"
          :maxSize="2 * 1024 * 1024"
          placeholder="Téléchargez votre photo"
        />
        <SuTextareaField 
          label="Bio"
          placeholder="Parlez-nous de vous..."
          :maxLength="500"
          showCounter
          autoResize
        />
        <SuSwitchField 
          label="Profil public"
          leftLabel="Privé"
          rightLabel="Public"
        />
        <template #footer>
          <div style="display: flex; gap: 1rem; justify-content: flex-end; padding: 1.5rem; background-color: #f8fafc; border-radius: 0.5rem;">
            <SuButton variant="outline">Réinitialiser</SuButton>
            <SuButton variant="primary">Sauvegarder le profil</SuButton>
          </div>
        </template>
      </SuFormFields>
    </div>
  </div>
</div>

```vue
<template>
  <SuFormFields gap="lg" size="md">
    <template #head>
      <div class="form-header">
        <h2>Profil complet</h2>
        <p>Remplissez toutes les informations</p>
      </div>
    </template>

    <SuInputField label="Nom d'utilisateur" placeholder="Nom d'utilisateur" required />
    <SuSelectBoxField :options="countryOptions" label="Pays" searchable />
    <SuRadioGroup :options="accountTypes" label="Type de compte" />
    <SuCheckboxGroup :options="skills" label="Compétences" />
    <SuSlider label="Niveau d'expérience" :min="1" :max="10" />
    <SuFileUpload label="Photo de profil" accept="image/*" />
    <SuTextareaField label="Bio" placeholder="Parlez-nous de vous..." />
    <SuSwitchField label="Profil public" leftLabel="Privé" rightLabel="Public" />

    <template #footer>
      <div class="form-actions">
        <SuButton variant="outline">Réinitialiser</SuButton>
        <SuButton variant="primary">Sauvegarder</SuButton>
      </div>
    </template>
  </SuFormFields>
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `gap` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Espacement entre les champs de formulaire |
| `sectionGap` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'lg'` | Espacement entre les sections (head, content, footer) |
| `size` | `'sm' \| 'md' \| 'lg'` | `undefined` | Taille forcée pour tous les champs |
| `direction` | `'horizontal' \| 'vertical'` | `'vertical'` | Direction d'affichage des champs |

### Attributs d'accessibilité

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ariaLabel` | `string` | `undefined` | Label accessible pour le groupe |
| `ariaDescribedBy` | `string` | `undefined` | ID de l'élément de description |
| `role` | `string` | `undefined` | Rôle ARIA personnalisé (ex: 'form', 'group') |

### Slots

| Slot | Description |
|------|-------------|
| `head` | Contenu affiché avant les champs (en-tête) |
| `default` | Champs de formulaire à afficher |
| `footer` | Contenu affiché après les champs (pied de page) |

## Comportement des props

### 🔄 Propagation automatique

Quand `size` est définie sur le `FormFields`, elle **surcharge** automatiquement les props des champs enfants :

```vue
<!-- Les champs auront TOUS la taille 'lg' -->
<SuFormFields size="lg">
  <SuInputField size="sm" label="Champ 1" />  <!-- Devient lg -->
  <SuInputField label="Champ 2" />            <!-- Devient lg -->
  <SuSelectBoxField size="md" label="Select" /> <!-- Devient lg -->
</SuFormFields>
```

### 🎯 Validation du contenu

Le composant vérifie automatiquement que seuls des composants de formulaire sont passés dans le slot :

- ✅ **Composants de formulaire** : `InputField`, `SelectBoxField`, `RadioGroupField`, `CheckboxGroupField`, `SwitchField`, `FileUploadField`, `TextareaField`, `SliderField`
- ⚠️ **Autres composants** : Avertissement dans la console et élément ignoré
- ✅ **Commentaires/texte** : Ignorés silencieusement (comportement normal de Vue)

## Espacement et structure

### 📏 Valeurs de gap (entre les champs)

- `gap="sm"` : 0.75rem (12px)
- `gap="md"` : 1rem (16px) - **défaut**
- `gap="lg"` : 1.5rem (24px)
- `gap="xl"` : 2rem (32px)

### 📐 Valeurs de sectionGap (entre head, content, footer)

- `sectionGap="sm"` : 1rem (16px)
- `sectionGap="md"` : 1.5rem (24px)
- `sectionGap="lg"` : 2rem (32px) - **défaut**
- `sectionGap="xl"` : 2.5rem (40px)

### 📱 Responsive

En mode horizontal, le composant passe automatiquement en vertical sur mobile (≤768px) pour une meilleure expérience utilisateur.

## Direction

### 📐 Vertical vs Horizontal

- **Vertical** (défaut) : Champs empilés en colonne
- **Horizontal** : Champs alignés en ligne avec largeur égale

```vue
<!-- Vertical -->
<SuFormFields direction="vertical">
  <SuInputField label="Champ 1" />
  <SuInputField label="Champ 2" />
</SuFormFields>

<!-- Horizontal -->
<SuFormFields direction="horizontal">
  <SuInputField label="Prénom" />
  <SuInputField label="Nom" />
</SuFormFields>
```

## Accessibilité

Le composant FormFields respecte les normes WCAG 2.1 AA :

### ✅ Fonctionnalités d'accessibilité

- **Rôles ARIA** : Support des rôles `form`, `group`, etc.
- **Labels de groupe** : `aria-label` pour décrire le formulaire
- **Navigation au clavier** : Préserve la navigation Tab entre les champs
- **Structure sémantique** : Organisation logique des sections
- **Descriptions** : Support d'`aria-describedby` pour les descriptions
- **Responsive** : Adaptation automatique sur mobile

### 🎯 Bonnes pratiques

```vue
<!-- Formulaire principal -->
<SuFormFields 
  gap="lg" 
  role="form" 
  aria-label="Formulaire d'inscription"
>
  <SuInputField label="Email" type="email" required />
  <SuInputField label="Mot de passe" type="password" required />
</SuFormFields>

<!-- Section de paramètres -->
<SuFormFields 
  gap="md" 
  role="group" 
  aria-label="Paramètres de notification"
  aria-describedby="notification-help"
>
  <SuSwitchField label="Notifications email" />
  <SuSwitchField label="Notifications push" />
</SuFormFields>
<div id="notification-help">Configurez vos préférences de notification</div>

<!-- Formulaire horizontal responsive -->
<SuFormFields 
  direction="horizontal" 
  gap="md"
  role="form"
  aria-label="Adresse de livraison"
>
  <SuInputField label="Prénom" required />
  <SuInputField label="Nom" required />
  <SuInputField label="Code postal" required />
</SuFormFields>
```

## Exemples d'usage avancés

### Formulaire de contact

```vue
<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
  preferences: []
})

const subjects = [
  { value: 'support', label: 'Support technique' },
  { value: 'sales', label: 'Ventes' },
  { value: 'billing', label: 'Facturation' }
]

const preferences = [
  { value: 'email', label: 'Réponse par email' },
  { value: 'phone', label: 'Rappel téléphonique' }
]
</script>

<template>
  <SuFormFields 
    gap="lg" 
    sectionGap="xl"
    role="form" 
    aria-label="Formulaire de contact"
  >
    <template #head>
      <div class="contact-header">
        <h1>Nous contacter</h1>
        <p>Notre équipe vous répondra dans les plus brefs délais</p>
      </div>
    </template>

    <SuInputField 
      label="Nom complet"
      v-model="form.name"
      required
    />
    
    <SuInputField 
      type="email"
      label="Email"
      v-model="form.email"
      required
    />
    
    <SuSelectBoxField 
      :options="subjects"
      label="Sujet"
      v-model="form.subject"
      required
    />
    
    <SuTextareaField 
      label="Message"
      v-model="form.message"
      :maxLength="1000"
      :showCounter="true"
      required
    />
    
    <SuCheckboxGroup 
      :options="preferences"
      label="Préférences de contact"
      v-model="form.preferences"
    />

    <template #footer>
      <div class="form-footer">
        <SuButton variant="outline">Annuler</SuButton>
        <SuButton variant="primary">Envoyer</SuButton>
      </div>
    </template>
  </SuFormFields>
</template>
```

### Formulaire de profil utilisateur

```vue
<script setup>
import { ref } from 'vue'

const profile = ref({
  username: '',
  email: '',
  country: '',
  accountType: '',
  theme: '',
  notifications: false,
  publicProfile: false
})

const countries = [
  { value: 'fr', label: 'France' },
  { value: 'us', label: 'États-Unis' },
  { value: 'de', label: 'Allemagne' }
]

const accountTypes = [
  { value: 'personal', label: 'Personnel' },
  { value: 'business', label: 'Entreprise' }
]

const themes = [
  { value: 'light', label: 'Clair' },
  { value: 'dark', label: 'Sombre' },
  { value: 'auto', label: 'Automatique' }
]
</script>

<template>
  <SuFormFields 
    gap="lg" 
    sectionGap="xl"
    size="md"
    role="form" 
    aria-label="Profil utilisateur"
  >
    <template #head>
      <div class="profile-header">
        <h2>👤 Profil utilisateur</h2>
        <p>Personnalisez votre profil et vos préférences</p>
      </div>
    </template>

    <SuInputField 
      label="Nom d'utilisateur"
      v-model="profile.username"
      required
    />
    
    <SuInputField 
      type="email"
      label="Email"
      v-model="profile.email"
      required
    />
    
    <SuSelectBoxField 
      :options="countries"
      label="Localisation"
      v-model="profile.country"
      searchable
    />
    
    <SuRadioGroup 
      :options="accountTypes"
      label="Type de compte"
      v-model="profile.accountType"
      direction="horizontal"
    />
    
    <SuRadioGroup 
      :options="themes"
      label="Thème"
      v-model="profile.theme"
      displayType="inline-card"
      direction="horizontal"
    />
    
    <SuSwitchField 
      label="Notifications"
      rightLabel="Activées"
      v-model="profile.notifications"
    />
    
    <SuSwitchField 
      label="Profil public"
      leftLabel="Privé"
      rightLabel="Public"
      v-model="profile.publicProfile"
    />

    <template #footer>
      <div class="profile-footer">
        <p>Les modifications sont sauvegardées automatiquement</p>
        <div class="actions">
          <SuButton variant="outline">Réinitialiser</SuButton>
          <SuButton variant="primary">Sauvegarder</SuButton>
        </div>
      </div>
    </template>
  </SuFormFields>
</template>
```

### Formulaire multi-étapes

```vue
<script setup>
import { ref } from 'vue'

const currentStep = ref(1)
const totalSteps = 3

const nextStep = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}
</script>

<template>
  <SuFormFields 
    gap="lg" 
    sectionGap="xl"
    role="form" 
    aria-label="Inscription multi-étapes"
  >
    <template #head>
      <div class="steps-header">
        <h2>Inscription - Étape {{ currentStep }}/{{ totalSteps }}</h2>
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            :style="{ width: (currentStep / totalSteps) * 100 + '%' }"
          />
        </div>
      </div>
    </template>

    <!-- Étape 1 : Informations personnelles -->
    <template v-if="currentStep === 1">
      <SuInputField label="Prénom" placeholder="Votre prénom" required />
      <SuInputField label="Nom" placeholder="Votre nom" required />
      <SuInputField type="email" label="Email" placeholder="email@exemple.com" required />
    </template>

    <!-- Étape 2 : Préférences -->
    <template v-if="currentStep === 2">
      <SuSelectBoxField :options="countries" label="Pays" required />
      <SuRadioGroup :options="accountTypes" label="Type de compte" required />
      <SuSwitchField label="Newsletter" rightLabel="S'abonner" />
    </template>

    <!-- Étape 3 : Confirmation -->
    <template v-if="currentStep === 3">
      <div class="confirmation">
        <h3>Récapitulatif</h3>
        <p>Vérifiez vos informations avant de finaliser l'inscription</p>
      </div>
    </template>

    <template #footer>
      <div class="steps-footer">
        <SuButton 
          variant="outline" 
          :disabled="currentStep === 1"
          @click="previousStep"
        >
          Précédent
        </SuButton>
        
        <SuButton 
          variant="primary"
          @click="currentStep === totalSteps ? null : nextStep()"
        >
          {{ currentStep === totalSteps ? 'Finaliser' : 'Suivant' }}
        </SuButton>
      </div>
    </template>
  </SuFormFields>
</template>
```

## Contrôle du contenu du slot

Le composant `FormFields` vérifie automatiquement le contenu de son slot :

### ✅ Éléments acceptés
- Composants de formulaire du design system : `InputField`, `SelectBoxField`, `RadioGroupField`, `CheckboxGroupField`, `SwitchField`, `FileUploadField`, `TextareaField`, `SliderField`
- Commentaires Vue (ignorés)
- Nœuds de texte vides (ignorés)

### ⚠️ Éléments rejetés
- Autres composants ou éléments HTML
- Avertissement dans la console de développement
- Élément ignoré dans le rendu

### 🔍 Exemple de validation

```vue
<!-- ✅ Correct -->
<SuFormFields>
  <SuInputField label="Nom" />
  <SuSelectBoxField :options="options" label="Choix" />
  <!-- Commentaire ignoré -->
</SuFormFields>

<!-- ⚠️ Avertissement dans la console -->
<SuFormFields>
  <SuInputField label="Champ valide" />
  <div>Élément non-champ</div> <!-- Ignoré avec avertissement -->
  <SuSwitchField label="Switch valide" />
</SuFormFields>
```

Cette approche garantit la cohérence visuelle et fonctionnelle tout en informant les développeurs des problèmes potentiels.