<script setup>
import { ref } from 'vue'

// État des démos de la page
const showCenterModal = ref(false)
const showLeftDrawer = ref(false)
const showRightDrawer = ref(false)
const showTopDrawer = ref(false)
const showBottomDrawer = ref(false)
const showFullScreen = ref(false)
</script>

# Dialog

Composant Dialog polyvalent pour afficher des modales (centrées) ou des tiroirs (latéraux, haut/bas, plein écran). Il repose sur l'élément natif `<dialog>` ouvert avec `showModal()` : le navigateur gère la couche supérieure, le fond (`::backdrop`), l'inertie du reste de la page et le maintien du focus. Il offre des options de personnalisation pour s'adapter à divers cas d'usage.

## Exemples d'utilisation

### Modale centrée (display="center")

<div class="component-demo">
  <div class="demo-section">
    <h4>Modale de confirmation</h4>
    <div class="demo-buttons">
      <SuButton @click="showCenterModal = true">Ouvrir Modale</SuButton>
      <SuDialog v-model:modelValue="showCenterModal" display="center" title="Confirmation" description="Voulez-vous vraiment supprimer cet élément ?" width="400px">
        <template #default>
          <p>Cette action est irréversible. Veuillez confirmer votre choix.</p>
        </template>
        <template #footer>
          <SuButton variant="secondary" @click="showCenterModal = false">Annuler</SuButton>
          <SuButton variant="primary" @click="showCenterModal = false">Confirmer</SuButton>
        </template>
      </SuDialog>
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { Dialog, Button } from '@surgeui/ds-vue'

const showCenterModal = ref(false)
</script>

<template>
  <SuButton @click="showCenterModal = true">Ouvrir Modale</SuButton>
  <SuDialog v-model:modelValue="showCenterModal" display="center" title="Confirmation" description="Voulez-vous vraiment supprimer cet élément ?" width="400px">
    <template #default>
      <p>Cette action est irréversible. Veuillez confirmer votre choix.</p>
    </template>
    <template #footer>
      <SuButton variant="secondary" @click="showCenterModal = false">Annuler</SuButton>
      <SuButton variant="primary" @click="showCenterModal = false">Confirmer</SuButton>
    </template>
  </SuDialog>
</template>
```

### Tiroir latéral gauche (display="left")

<div class="component-demo">
  <div class="demo-section">
    <h4>Menu latéral</h4>
    <div class="demo-buttons">
      <SuButton @click="showLeftDrawer = true">Ouvrir Tiroir Gauche</SuButton>
      <SuDialog v-model:modelValue="showLeftDrawer" display="left" title="Menu de Navigation" width="300px">
        <template #default>
          <SuLinkGroup direction="vertical" gap="md">
            <SuLink href="/dashboard">Tableau de bord</SuLink>
            <SuLink href="/profile">Mon Profil</SuLink>
            <SuLink href="/settings">Paramètres</SuLink>
            <SuLink href="/logout">Déconnexion</SuLink>
          </SuLinkGroup>
        </template>
        <template #footer>
          <SuButton variant="outline" @click="showLeftDrawer = false">Fermer</SuButton>
        </template>
      </SuDialog>
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const showLeftDrawer = ref(false)
</script>

<template>
  <SuButton @click="showLeftDrawer = true">Ouvrir Tiroir Gauche</SuButton>
  <SuDialog v-model:modelValue="showLeftDrawer" display="left" title="Menu de Navigation" width="300px">
    <template #default>
      <SuLinkGroup direction="vertical" gap="md">
        <SuLink href="/dashboard">Tableau de bord</SuLink>
        <SuLink href="/profile">Mon Profil</SuLink>
        <SuLink href="/settings">Paramètres</SuLink>
        <SuLink href="/logout">Déconnexion</SuLink>
      </SuLinkGroup>
    </template>
    <template #footer>
      <SuButton variant="outline" @click="showLeftDrawer = false">Fermer</SuButton>
    </template>
  </SuDialog>
</template>
```

### Tiroir latéral droit (display="right")

<div class="component-demo">
  <div class="demo-section">
    <h4>Panneau de détails</h4>
    <div class="demo-buttons">
      <SuButton @click="showRightDrawer = true">Ouvrir Tiroir Droit</SuButton>
      <SuDialog v-model:modelValue="showRightDrawer" display="right" title="Détails du Produit" width="450px">
        <template #default>
          <h3>Produit X</h3>
          <p>Description détaillée du produit X. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <img src="https://via.placeholder.com/300x200" alt="Produit X" style="max-width: 100%; height: auto; margin-top: 1rem;">
        </template>
        <template #footer>
          <SuButton variant="primary" @click="showRightDrawer = false">Ajouter au panier</SuButton>
        </template>
      </SuDialog>
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const showRightDrawer = ref(false)
</script>

<template>
  <SuButton @click="showRightDrawer = true">Ouvrir Tiroir Droit</SuButton>
  <SuDialog v-model:modelValue="showRightDrawer" display="right" title="Détails du Produit" width="450px">
    <template #default>
      <h3>Produit X</h3>
      <p>Description détaillée du produit X. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <img src="https://via.placeholder.com/300x200" alt="Produit X" style="max-width: 100%; height: auto; margin-top: 1rem;">
    </template>
    <template #footer>
      <SuButton variant="primary" @click="showRightDrawer = false">Ajouter au panier</SuButton>
    </template>
  </SuDialog>
</template>
```

### Tiroir supérieur (display="top")

<div class="component-demo">
  <div class="demo-section">
    <h4>Barre de notification</h4>
    <div class="demo-buttons">
      <SuButton @click="showTopDrawer = true">Ouvrir Tiroir Haut</SuButton>
      <SuDialog v-model:modelValue="showTopDrawer" display="top" title="Nouvelle Notification" height="100px">
        <template #default>
          <p>Vous avez 3 nouveaux messages non lus !</p>
        </template>
        <template #footer>
          <SuButton variant="primary" @click="showTopDrawer = false">Voir les messages</SuButton>
        </template>
      </SuDialog>
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const showTopDrawer = ref(false)
</script>

<template>
  <SuButton @click="showTopDrawer = true">Ouvrir Tiroir Haut</SuButton>
  <SuDialog v-model:modelValue="showTopDrawer" display="top" title="Nouvelle Notification" height="100px">
    <template #default>
      <p>Vous avez 3 nouveaux messages non lus !</p>
    </template>
    <template #footer>
      <SuButton variant="primary" @click="showTopDrawer = false">Voir les messages</SuButton>
    </template>
  </SuDialog>
</template>
```

### Tiroir inférieur (display="bottom")

<div class="component-demo">
  <div class="demo-section">
    <h4>Actions rapides</h4>
    <div class="demo-buttons">
      <SuButton @click="showBottomDrawer = true">Ouvrir Tiroir Bas</SuButton>
      <SuDialog v-model:modelValue="showBottomDrawer" display="bottom" title="Actions Rapides" height="250px">
        <template #default>
          <SuButtonGroup direction="vertical" gap="md">
            <SuButton variant="primary">Prendre une photo</SuButton>
            <SuButton variant="secondary">Télécharger un fichier</SuButton>
            <SuButton variant="outline">Partager</SuButton>
          </SuButtonGroup>
        </template>
        <template #footer>
          <SuButton variant="ghost" @click="showBottomDrawer = false">Fermer</SuButton>
        </template>
      </SuDialog>
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const showBottomDrawer = ref(false)
</script>

<template>
  <SuButton @click="showBottomDrawer = true">Ouvrir Tiroir Bas</SuButton>
  <SuDialog v-model:modelValue="showBottomDrawer" display="bottom" title="Actions Rapides" height="250px">
    <template #default>
      <SuButtonGroup direction="vertical" gap="md">
        <SuButton variant="primary">Prendre une photo</SuButton>
        <SuButton variant="secondary">Télécharger un fichier</SuButton>
        <SuButton variant="outline">Partager</SuButton>
      </SuButtonGroup>
    </template>
    <template #footer>
      <SuButton variant="ghost" @click="showBottomDrawer = false">Fermer</SuButton>
    </template>
  </SuDialog>
</template>
```

### Plein écran (display="full")

<div class="component-demo">
  <div class="demo-section">
    <h4>Formulaire complexe</h4>
    <div class="demo-buttons">
      <SuButton @click="showFullScreen = true">Ouvrir Plein Écran</SuButton>
      <SuDialog v-model:modelValue="showFullScreen" display="full" title="Formulaire d'Inscription Complet">
        <template #default>
          <SuFormFields gap="lg" sectionGap="xl">
            <SuInput label="Nom complet" placeholder="Votre nom" required />
            <SuInput type="email" label="Email" placeholder="votre@email.com" required />
            <SuPassword label="Mot de passe" showProgress required />
            <SuTextarea label="Bio" placeholder="Parlez-nous de vous..." autoResize maxLength="500" showCounter />
            <SuFileUpload label="Photo de profil" accept="image/*" />
          </SuFormFields>
        </template>
        <template #footer>
          <SuButton variant="secondary" @click="showFullScreen = false">Annuler</SuButton>
          <SuButton variant="primary">Soumettre</SuButton>
        </template>
      </SuDialog>
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const showFullScreen = ref(false)
</script>

<template>
  <SuButton @click="showFullScreen = true">Ouvrir Plein Écran</SuButton>
  <SuDialog v-model:modelValue="showFullScreen" display="full" title="Formulaire d'Inscription Complet">
    <template #default>
      <SuFormFields gap="lg" sectionGap="xl">
        <SuInput label="Nom complet" placeholder="Votre nom" required />
        <SuInput type="email" label="Email" placeholder="votre@email.com" required />
        <SuPassword label="Mot de passe" showProgress required />
        <SuTextarea label="Bio" placeholder="Parlez-nous de vous..." autoResize maxLength="500" showCounter />
        <SuFileUpload label="Photo de profil" accept="image/*" />
      </SuFormFields>
    </template>
    <template #footer>
      <SuButton variant="secondary" @click="showFullScreen = false">Annuler</SuButton>
      <SuButton variant="primary">Soumettre</SuButton>
    </template>
  </SuDialog>
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | `false` | Contrôle l'état d'ouverture/fermeture du Dialog (utilisé avec `v-model`) |
| `display` | `'center' \| 'left' \| 'right' \| 'top' \| 'bottom' \| 'full'` | `'center'` | Mode d'affichage du Dialog |
| `title` | `string` | `undefined` | Titre du Dialog (affiché dans le slot `head` par défaut et pour `aria-labelledby`) |
| `description` | `string` | `undefined` | Description affichée sous le titre et reliée au Dialog par `aria-describedby` (non rendue si le slot `head` est utilisé) |
| `closeLabel` | `string` | `'Fermer'` | Nom accessible du bouton de fermeture |
| `closeOnOverlayClick` | `boolean` | `true` | Permet de fermer le Dialog en cliquant sur l'overlay |
| `closeOnEscape` | `boolean` | `true` | Permet de fermer le Dialog avec la touche `Escape` |
| `width` | `string` | `auto` | Largeur personnalisée du Dialog (ex: `'500px'`, `'80%'`) |
| `height` | `string` | `auto` | Hauteur personnalisée du Dialog (ex: `'400px'`, `'90vh'`) |
| `zIndex` | `number` | — | **Obsolète**, sans effet : le Dialog s'affiche dans la couche supérieure du navigateur, au-dessus de tout z-index |
| `disableScroll` | `boolean` | `true` | Désactive le défilement du corps de la page lorsque le Dialog est ouvert |

### Attributs d'accessibilité

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ariaLabel` | `string` | `undefined` | Label accessible pour le Dialog |
| `ariaLabelledBy` | `string` | `undefined` | ID de l'élément qui sert de label au Dialog (prioritaire sur `title`) |
| `ariaDescribedBy` | `string` | `undefined` | ID de l'élément qui décrit le Dialog (prioritaire sur `description`) |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `update:modelValue` | `(value: boolean) => void` | Émis lorsque l'état d'ouverture/fermeture change |
| `open` | `() => void` | Émis lorsque le Dialog est ouvert |
| `close` | `() => void` | Émis lorsque le Dialog est fermé |

### Slots

| Slot | Description |
|------|-------------|
| `head` | Contenu de l'en-tête du Dialog (peut contenir un titre, un bouton de fermeture, etc.) |
| `default` | Contenu principal du Dialog |
| `footer` | Contenu du pied de page du Dialog (souvent utilisé pour les boutons d'action) |

## Accessibilité

Le composant Dialog est conçu en respectant les normes WCAG 2.1 AA :

### ✅ Fonctionnalités d'accessibilité

- **Dialog natif** : `<dialog>` ouvert avec `showModal()` porte le rôle `dialog` et est modal pour les technologies d'assistance (le reste de la page devient inerte).
- **Gestion du focus** : le navigateur maintient le focus dans le Dialog tant qu'il est ouvert ; aucun piège à focus en JavaScript.
- **Focus initial** : Le focus est automatiquement déplacé vers le premier élément focusable du Dialog à l'ouverture.
- **Retour du focus** : Le focus est restauré sur l'élément qui a déclenché l'ouverture du Dialog après sa fermeture.
- **Labels et descriptions** : Utilisation de `aria-labelledby` (via la prop `title` ou `ariaLabelledBy`) et `aria-describedby` (via la prop `description` ou `ariaDescribedBy`) pour fournir un contexte sémantique aux lecteurs d'écran.
- **Fermeture accessible** : `Escape` déclenche l'événement natif `cancel`, qui ferme le Dialog si `closeOnEscape` est `true`. Avec plusieurs Dialogs ouverts, seul celui du dessus se ferme.
- **Désactivation du scroll** : le défilement de la page est bloqué en CSS (`:root:has(...)`) tant qu'un Dialog avec `disableScroll` est ouvert, y compris avec des Dialogs imbriqués.
- **Transitions fluides** : Les animations sont conçues pour être douces et respectent `prefers-reduced-motion`.

### 🎯 Bonnes pratiques

- **Toujours fournir un `title` ou `ariaLabel`** : C'est crucial pour l'accessibilité afin que les utilisateurs de lecteurs d'écran comprennent le but du Dialog.
- **Placer les actions principales dans le `footer`** : Cela aide à la cohérence et à la prévisibilité de l'interface.
- **Éviter les Dialogs imbriqués** : Si possible, concevez votre UI pour éviter d'ouvrir un Dialog par-dessus un autre, car cela peut compliquer la gestion du focus et l'expérience utilisateur.

## Navigation au clavier

| Touche | Action |
|--------|--------|
| `Tab` | Naviguer entre les éléments focusables à l'intérieur du Dialog |
| `Shift + Tab` | Naviguer entre les éléments focusables dans l'ordre inverse |
| `Escape` | Fermer le Dialog (si `closeOnEscape` est `true`) |

## Styles et personnalisation

Le composant `Dialog` utilise des transitions CSS pour une ouverture et une fermeture fluides. La prop `display` applique des styles spécifiques pour positionner le Dialog correctement.

- **`display="center"`** : Modale centrée, avec une animation de scale.
- **`display="left"` / `display="right"`** : Tiroirs latéraux, avec une animation de translation horizontale.
- **`display="top"` / `display="bottom"`** : Tiroirs verticaux, avec une animation de translation verticale.
- **`display="full"`** : Plein écran, avec une légère animation de scale.

Vous pouvez personnaliser la largeur (`width`) et la hauteur (`height`) pour les modes `center`, `left`, `right`, `top`, `bottom`. Pour le mode `full`, le Dialog occupe toujours 100% de la largeur et de la hauteur.
