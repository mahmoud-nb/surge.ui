# Popover

Le composant Popover affiche du contenu contextuel dans une fenêtre flottante qui apparaît au-dessus du contenu de la page. Il est idéal pour afficher des informations complémentaires, des menus d'actions, des formulaires ou toute autre interaction contextuelle sans quitter le contexte actuel.

## Exemples d'utilisation

### Utilisation de base

```vue
<template>
  <SuPopover>
    <template #trigger>
      <button>Cliquer ici</button>
    </template>
    <template #default>
      <div>
        <h3>Titre du popover</h3>
        <p>Contenu du popover.</p>
      </div>
    </template>
  </SuPopover>
</template>
```

### Avec bouton de fermeture

```vue
<template>
  <SuPopover closable>
    <template #trigger>
      <button>Ouvrir</button>
    </template>
    <template #default>
      <div>
        <h3>Information</h3>
        <p>Ce popover peut être fermé avec le bouton X.</p>
      </div>
    </template>
  </SuPopover>
</template>
```

### Déclenchement au survol

```vue
<template>
  <SuPopover 
    trigger="hover" 
    placement="top"
    :open-delay="200"
    :close-delay="100"
  >
    <template #trigger>
      <span>Survoler ici</span>
    </template>
    <template #default>
      <p>Ce popover s'ouvre au survol.</p>
    </template>
  </SuPopover>
</template>
```

### Mode contrôlé avec v-model

```vue
<template>
  <div>
    <button @click="isOpen = !isOpen">
      {{ isOpen ? 'Fermer' : 'Ouvrir' }}
    </button>
    
    <SuPopover v-model="isOpen" trigger="manual">
      <template #trigger>
        <button>Élément cible</button>
      </template>
      <template #default="{ close }">
        <div>
          <h3>Mode contrôlé</h3>
          <p>Contrôlé par v-model.</p>
          <button @click="close">Fermer</button>
        </div>
      </template>
    </SuPopover>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);
</script>
```

### Mode modal

```vue
<template>
  <SuPopover 
    modal
    closable
    :close-on-backdrop-click="true"
  >
    <template #trigger>
      <button>Ouvrir en modal</button>
    </template>
    <template #default="{ close }">
      <div>
        <h3>Confirmation</h3>
        <p>Êtes-vous sûr de vouloir continuer ?</p>
        <div class="actions">
          <button @click="close">Annuler</button>
          <button @click="close">Confirmer</button>
        </div>
      </div>
    </template>
  </SuPopover>
</template>
```

### Avec formulaire

```vue
<template>
  <SuPopover 
    closable
    :close-on-click-outside="false"
    placement="bottom"
  >
    <template #trigger>
      <button>Ajouter un commentaire</button>
    </template>
    <template #default="{ close }">
      <div>
        <h3>Nouveau commentaire</h3>
        <form @submit.prevent="handleSubmit(close)">
          <div>
            <label>Nom</label>
            <input type="text" v-model="name" />
          </div>
          <div>
            <label>Commentaire</label>
            <textarea v-model="comment" rows="3"></textarea>
          </div>
          <div class="actions">
            <button type="button" @click="close">Annuler</button>
            <button type="submit">Envoyer</button>
          </div>
        </form>
      </div>
    </template>
  </SuPopover>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const name = ref('');
const comment = ref('');

const handleSubmit = (close: () => void) => {
  // Logique d'envoi
  close();
};
</script>
```

### Différents positionnements

```vue
<template>
  <div>
    <SuPopover placement="top">
      <template #trigger>
        <button>Haut</button>
      </template>
      <template #default>
        <p>Positionnement : haut</p>
      </template>
    </SuPopover>

    <SuPopover placement="bottom-start">
      <template #trigger>
        <button>Bas gauche</button>
      </template>
      <template #default>
        <p>Positionnement : bas gauche</p>
      </template>
    </SuPopover>

    <SuPopover placement="right-end">
      <template #trigger>
        <button>Droite bas</button>
      </template>
      <template #default>
        <p>Positionnement : droite bas</p>
      </template>
    </SuPopover>
  </div>
</template>
```

### Menu utilisateur personnalisé

```vue
<template>
  <SuPopover placement="bottom-end">
    <template #trigger>
      <button>Profil</button>
    </template>
    <template #default>
      <div class="user-menu">
        <div class="user-info">
          <div class="avatar"></div>
          <div>
            <div class="name">Jean Dupont</div>
            <div class="email">jean.dupont@exemple.fr</div>
          </div>
        </div>
        <div class="menu-items">
          <button>📊 Tableau de bord</button>
          <button>⚙️ Paramètres</button>
          <button class="danger">🚪 Déconnexion</button>
        </div>
      </div>
    </template>
  </SuPopover>
</template>
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `modelValue` | `boolean` | `undefined` | Contrôle l'état ouvert du popover (v-model) |
| `placement` | `'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | `'bottom'` | Position du popover par rapport au déclencheur |
| `trigger` | `'click' \| 'hover' \| 'focus' \| 'manual'` | `'click'` | Mode de déclenchement du popover |
| `offset` | `number` | `8` | Distance en pixels entre le déclencheur et le popover |
| `showArrow` | `boolean` | `true` | Affiche ou masque la flèche pointant vers le déclencheur |
| `closable` | `boolean` | `false` | Affiche un bouton de fermeture dans le popover |
| `closeOnClickOutside` | `boolean` | `true` | Ferme le popover lors d'un clic en dehors |
| `closeOnEscape` | `boolean` | `true` | Ferme le popover lors de l'appui sur la touche Échap |
| `modal` | `boolean` | `false` | Active le mode modal avec un fond sombre |
| `closeOnBackdropClick` | `boolean` | `true` | Ferme le popover lors d'un clic sur le fond (mode modal) |
| `disabled` | `boolean` | `false` | Désactive le popover |
| `openDelay` | `number` | `0` | Délai en millisecondes avant l'ouverture (utile avec trigger="hover") |
| `closeDelay` | `number` | `0` | Délai en millisecondes avant la fermeture (utile avec trigger="hover") |
| `ariaLabel` | `string` | `undefined` | Label ARIA du contenu du popover |
| `ariaLabelledby` | `string` | `undefined` | ID de l'élément qui labélise le popover |
| `ariaDescribedby` | `string` | `undefined` | ID de l'élément qui décrit le popover |
| `closeAriaLabel` | `string` | `'Fermer'` | Label ARIA du bouton de fermeture |
| `width` | `string \| number` | `'auto'` | Largeur du popover |
| `maxWidth` | `string \| number` | `'320px'` | Largeur maximale du popover |
| `maxHeight` | `string \| number` | `'none'` | Hauteur maximale du popover |

### Attributs d'accessibilité

| Attribut | Élément | Description |
|----------|---------|-------------|
| `aria-expanded` | Déclencheur | Indique si le popover est ouvert ou fermé |
| `aria-haspopup` | Déclencheur | Indique que l'élément déclenche un popover |
| `aria-controls` | Déclencheur | Référence l'ID du contenu du popover |
| `role="dialog"` | Contenu | Identifie le popover comme une boîte de dialogue |
| `aria-modal` | Contenu | Indique si le popover est modal |
| `aria-label` | Contenu | Fournit un label accessible au popover |
| `aria-labelledby` | Contenu | Référence l'élément qui labélise le popover |
| `aria-describedby` | Contenu | Référence l'élément qui décrit le popover |
| `aria-label` | Bouton fermeture | Fournit un label accessible au bouton de fermeture |

### Attributs HTML

| Attribut | Élément | Description |
|----------|---------|-------------|
| `type="button"` | Bouton fermeture | Précise le type du bouton |
| `tabindex` | Éléments focusables | Gère l'ordre de navigation clavier |

### Événements

| Événement | Type | Description |
|-----------|------|-------------|
| `update:modelValue` | `(value: boolean) => void` | Émis quand l'état ouvert change |
| `open` | `() => void` | Émis quand le popover s'ouvre |
| `close` | `() => void` | Émis quand le popover se ferme |
| `after-leave` | `() => void` | Émis après la fin de l'animation de fermeture |

### Slots

| Slot | Props | Description |
|------|-------|-------------|
| `trigger` | `{ isOpen: boolean }` | Contenu du déclencheur du popover |
| `default` | `{ close: () => void, isOpen: boolean }` | Contenu principal du popover |

### Méthodes exposées

| Méthode | Type | Description |
|---------|------|-------------|
| `open` | `() => void` | Ouvre le popover |
| `close` | `() => void` | Ferme le popover |
| `toggle` | `() => void` | Bascule l'état ouvert/fermé du popover |
| `updatePosition` | `() => void` | Recalcule la position du popover |

## Accessibilité

Le composant Popover est conforme aux normes WCAG 2.1 niveau AA et suit les bonnes pratiques W3C pour les composants de type dialog et popover. Il garantit une expérience accessible à tous les utilisateurs, y compris ceux utilisant des technologies d'assistance.

### Fonctionnalités d'accessibilité

- **Navigation clavier complète** : le popover peut être ouvert avec les touches Entrée ou Espace et fermé avec la touche Échap. La navigation à l'intérieur du popover se fait avec la touche Tab.

- **Piégeage du focus en mode modal** : lorsque le mode modal est activé, le focus est piégé à l'intérieur du popover, empêchant l'utilisateur de naviguer vers les éléments extérieurs jusqu'à sa fermeture.

- **Attributs ARIA appropriés** : le composant utilise `aria-expanded` sur le déclencheur pour indiquer l'état d'ouverture, `aria-haspopup` pour signaler la présence d'un popover, `aria-controls` pour lier le déclencheur au contenu, et `role="dialog"` sur le contenu pour une identification correcte par les lecteurs d'écran.

- **Labels accessibles** : les props `ariaLabel`, `ariaLabelledby` et `ariaDescribedby` permettent de fournir des informations contextuelles aux lecteurs d'écran. Le bouton de fermeture dispose d'un label ARIA configurable.

- **Indicateurs de focus visibles** : les éléments focusables affichent un contour visible conforme aux normes d'accessibilité, avec support du mode contraste élevé.

- **Gestion des délais** : les props `openDelay` et `closeDelay` permettent d'éviter les ouvertures/fermetures accidentelles, particulièrement utile pour les utilisateurs ayant des difficultés motrices.

- **Support du mode contraste élevé** : le composant adapte automatiquement ses bordures et contrastes dans les environnements à contraste élevé.

- **Respect de la préférence de mouvement réduit** : les animations sont automatiquement désactivées pour les utilisateurs ayant activé la préférence `prefers-reduced-motion`.

- **Support RTL** : le composant s'adapte automatiquement aux langues qui se lisent de droite à gauche, en inversant les positionnements et les placements des éléments.

## Exemples avancés

### Popover avec contenu dynamique

```vue
<template>
  <SuPopover 
    v-model="isOpen"
    @open="fetchUserData"
  >
    <template #trigger>
      <button>Voir les détails</button>
    </template>
    <template #default>
      <div v-if="loading">
        <p>Chargement...</p>
      </div>
      <div v-else-if="userData">
        <h3>{{ userData.name }}</h3>
        <p>{{ userData.email }}</p>
        <p>Membre depuis {{ userData.memberSince }}</p>
      </div>
    </template>
  </SuPopover>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);
const loading = ref(false);
const userData = ref(null);

const fetchUserData = async () => {
  loading.value = true;
  try {
    const response = await fetch('/api/user');
    userData.value = await response.json();
  } finally {
    loading.value = false;
  }
};
</script>
```

### Popover avec positionnement dynamique

```vue
<template>
  <SuPopover 
    ref="popoverRef"
    :placement="currentPlacement"
    :offset="20"
  >
    <template #trigger>
      <button>Ouvrir</button>
    </template>
    <template #default>
      <div>
        <p>Contenu avec positionnement dynamique</p>
        <select v-model="currentPlacement" @change="updatePosition">
          <option value="top">Haut</option>
          <option value="bottom">Bas</option>
          <option value="left">Gauche</option>
          <option value="right">Droite</option>
        </select>
      </div>
    </template>
  </SuPopover>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const popoverRef = ref(null);
const currentPlacement = ref('bottom');

const updatePosition = () => {
  popoverRef.value?.updatePosition();
};
</script>
```

### Popovers imbriqués

```vue
<template>
  <SuPopover placement="bottom">
    <template #trigger>
      <button>Menu principal</button>
    </template>
    <template #default>
      <div class="menu">
        <button>Option 1</button>
        <button>Option 2</button>
        
        <SuPopover placement="right-start" trigger="hover">
          <template #trigger>
            <button>Plus d'options →</button>
          </template>
          <template #default>
            <div class="submenu">
              <button>Sous-option 1</button>
              <button>Sous-option 2</button>
              <button>Sous-option 3</button>
            </div>
          </template>
        </SuPopover>
      </div>
    </template>
  </SuPopover>
</template>
```

### Popover avec validation de formulaire

```vue
<template>
  <SuPopover 
    :close-on-click-outside="false"
    @close="resetForm"
  >
    <template #trigger>
      <button>Créer un compte</button>
    </template>
    <template #default="{ close }">
      <form @submit.prevent="handleSubmit(close)">
        <h3>Inscription</h3>
        
        <div>
          <label>Email</label>
          <input 
            type="email" 
            v-model="form.email"
            :aria-invalid="errors.email ? 'true' : 'false'"
            aria-describedby="email-error"
          />
          <span 
            v-if="errors.email" 
            id="email-error"
            role="alert"
          >
            {{ errors.email }}
          </span>
        </div>
        
        <div>
          <label>Mot de passe</label>
          <input 
            type="password" 
            v-model="form.password"
            :aria-invalid="errors.password ? 'true' : 'false'"
            aria-describedby="password-error"
          />
          <span 
            v-if="errors.password" 
            id="password-error"
            role="alert"
          >
            {{ errors.password }}
          </span>
        </div>
        
        <div class="actions">
          <button type="button" @click="close">Annuler</button>
          <button type="submit">S'inscrire</button>
        </div>
      </form>
    </template>
  </SuPopover>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const form = reactive({
  email: '',
  password: '',
});

const errors = reactive({
  email: '',
  password: '',
});

const validateForm = () => {
  errors.email = '';
  errors.password = '';
  
  if (!form.email) {
    errors.email = 'L\'email est requis';
    return false;
  }
  
  if (form.password.length < 8) {
    errors.password = 'Le mot de passe doit comporter au moins 8 caractères';
    return false;
  }
  
  return true;
};

const handleSubmit = async (close: () => void) => {
  if (!validateForm()) return;
  
  // Logique d'inscription
  await registerUser(form);
  close();
};

const resetForm = () => {
  form.email = '';
  form.password = '';
  errors.email = '';
  errors.password = '';
};
</script>
```

### Popover avec gestion d'état global

```vue
<template>
  <div>
    <SuPopover 
      v-for="notification in notifications"
      :key="notification.id"
      trigger="hover"
      placement="bottom-start"
    >
      <template #trigger>
        <div class="notification-badge">
          {{ notification.count }}
        </div>
      </template>
      <template #default>
        <div class="notification-list">
          <h4>{{ notification.title }}</h4>
          <div 
            v-for="item in notification.items"
            :key="item.id"
            class="notification-item"
          >
            <p>{{ item.message }}</p>
            <span>{{ formatDate(item.date) }}</span>
          </div>
        </div>
      </template>
    </SuPopover>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useNotificationStore } from '@/stores/notifications';

const notificationStore = useNotificationStore();
const notifications = computed(() => notificationStore.notifications);

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);
};
</script>
```
