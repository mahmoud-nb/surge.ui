# FloatButton

Composant FloatButton pour placer un bouton flottant dans le coin de l'écran avec support des slots, badges, tooltips et accessibilité complète selon les normes W3C.

## Exemples d'utilisation

### FloatButton de base

<div class="component-demo">
  <div class="demo-section">
    <h4>Bouton flottant simple</h4>
    <div class="demo-inputs">
      <div style="position: relative; height: 200px; background-color: #f3f4f6; border-radius: 0.5rem; overflow: hidden;">
        <p style="padding: 1rem; margin: 0;">Aperçu du bouton flottant</p>
        <SuFloatButton 
          :icon="'PlusIcon'"
          label="Ajouter un élément"
          position="right"
          :offset="{ x: 16, y: 16 }"
          style="position: absolute;"
        />
      </div>
    </div>
  </div>
</div>

```vue
<script setup>
import { PlusIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <SuFloatButton 
    :icon="'PlusIcon'"
    label="Ajouter un élément"
    position="right"
  />
</template>
```

### Avec badge

<div class="component-demo">
  <div class="demo-section">
    <h4>Bouton avec badge de notification</h4>
    <div class="demo-inputs">
      <div style="position: relative; height: 200px; background-color: #f3f4f6; border-radius: 0.5rem; overflow: hidden;">
        <p style="padding: 1rem; margin: 0;">Bouton avec badge "3"</p>
        <SuFloatButton 
          :icon="'ChatBubbleLeftIcon'"
          label="Messages"
          badge="3"
          position="right"
          :offset="{ x: 16, y: 16 }"
          style="position: absolute;"
        />
      </div>
    </div>
  </div>
</div>

```vue
<script setup>
import { ChatBubbleLeftIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <SuFloatButton 
    :icon="'ChatBubbleLeftIcon'"
    label="Messages"
    badge="3"
    position="right"
  />
</template>
```

### Comme lien externe

<div class="component-demo">
  <div class="demo-section">
    <h4>Bouton flottant comme lien</h4>
    <div class="demo-inputs">
      <div style="position: relative; height: 200px; background-color: #f3f4f6; border-radius: 0.5rem; overflow: hidden;">
        <p style="padding: 1rem; margin: 0;">Lien vers l'aide externe</p>
        <SuFloatButton 
          :icon="QuestionMarkCircleIcon"
          label="Centre d'aide"
          href="https://help.example.com"
          target="_blank"
          position="left"
          tooltip-position="right"
          :offset="{ x: 16, y: 16 }"
          style="position: absolute;"
        />
      </div>
    </div>
  </div>
</div>

```vue
<script setup>
import { QuestionMarkCircleIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <SuFloatButton 
    :icon="'QuestionMarkCircleIcon'"
    label="Centre d'aide"
    href="https://help.example.com"
    target="_blank"
    position="left"
    tooltip-position="right"
  />
</template>
```

### Avec ButtonGroup

<div class="component-demo">
  <div class="demo-section">
    <h4>Bouton avec groupe d'actions</h4>
    <div class="demo-inputs">
      <div style="position: relative; height: 300px; background-color: #f3f4f6; border-radius: 0.5rem; overflow: hidden;">
        <p style="padding: 1rem; margin: 0;">Bouton principal avec actions secondaires</p>
        <SuFloatButton 
          :icon="'PlusIcon'"
          label="Actions rapides"
          position="right"
          :offset="{ x: 16, y: 16 }"
          style="position: absolute;"
        >
          <SuButtonGroup gap="sm" variant="secondary" size="sm">
            <SuButton :icon="'CogIcon'" iconDisplay="only" aria-label="Paramètres" />
            <SuButton :icon="'HeartIcon'" iconDisplay="only" aria-label="Favoris" />
            <SuButton :icon="'ShareIcon'" iconDisplay="only" aria-label="Partager" />
          </SuButtonGroup>
        </SuFloatButton>
      </div>
    </div>
  </div>
</div>

```vue
<script setup>
import { PlusIcon, CogIcon, HeartIcon, ShareIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <SuFloatButton 
    :icon="'PlusIcon'"
    label="Actions rapides"
    position="right"
  >
    <SuButtonGroup gap="sm" variant="secondary" size="sm">
      <SuButton :icon="'CogIcon'" iconDisplay="only" aria-label="Paramètres" />
      <SuButton :icon="'HeartIcon'" iconDisplay="only" aria-label="Favoris" />
      <SuButton :icon="'ShareIcon'" iconDisplay="only" aria-label="Partager" />
    </SuButtonGroup>
  </SuFloatButton>
</template>
```

### Avec LinkGroup

<div class="component-demo">
  <div class="demo-section">
    <h4>Bouton avec groupe de liens</h4>
    <div class="demo-inputs">
      <div style="position: relative; height: 350px; background-color: #f3f4f6; border-radius: 0.5rem; overflow: hidden;">
        <p style="padding: 1rem; margin: 0;">Bouton d'aide avec liens de support</p>
        <SuFloatButton 
          :icon="'QuestionMarkCircleIcon'"
          label="Besoin d'aide ?"
          position="left"
          tooltip-position="right"
          :offset="{ x: 16, y: 16 }"
          style="position: absolute;"
        >
          <SuLinkGroup gap="sm" variant="secondary" size="sm">
            <SuLink href="/help" :icon="'QuestionMarkCircleIcon'" iconDisplay="left">Centre d'aide</SuLink>
            <SuLink href="tel:+33123456789" :icon="'PhoneIcon'" iconDisplay="left">Téléphone</SuLink>
            <SuLink href="mailto:support@example.com" :icon="'EnvelopeIcon'" iconDisplay="left">Email</SuLink>
            <SuLink href="/chat" :icon="'ChatBubbleLeftIcon'" iconDisplay="left">Chat</SuLink>
          </SuLinkGroup>
        </SuFloatButton>
      </div>
    </div>
  </div>
</div>

```vue
<script setup>
import { QuestionMarkCircleIcon, PhoneIcon, EnvelopeIcon, ChatBubbleLeftIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <SuFloatButton 
    :icon="'QuestionMarkCircleIcon'"
    label="Besoin d'aide ?"
    position="left"
    tooltip-position="right"
  >
    <SuLinkGroup gap="sm" variant="secondary" size="sm">
      <SuLink href="/help" :icon="'QuestionMarkCircleIcon'" iconDisplay="left">Centre d'aide</SuLink>
      <SuLink href="tel:+33123456789" :icon="'PhoneIcon'" iconDisplay="left">Téléphone</SuLink>
      <SuLink href="mailto:support@example.com" :icon="'EnvelopeIcon'" iconDisplay="left">Email</SuLink>
      <SuLink href="/chat" :icon="'ChatBubbleLeftIcon'" iconDisplay="left">Chat</SuLink>
    </SuLinkGroup>
  </SuFloatButton>
</template>
```

### Positions

<div class="component-demo">
  <div class="demo-section">
    <h4>Positions disponibles</h4>
    <div class="demo-inputs">
      <div style="position: relative; height: 200px; background-color: #f3f4f6; border-radius: 0.5rem; overflow: hidden;">
        <p style="padding: 1rem; margin: 0;">Boutons dans les deux coins</p>
        <SuFloatButton 
          :icon="'PlusIcon'"
          label="Droite"
          position="right"
          :offset="{ x: 16, y: 16 }"
          style="position: absolute;"
        />
        <SuFloatButton 
          :icon="'CogIcon'"
          label="Gauche"
          position="left"
          tooltip-position="right"
          variant="secondary"
          :offset="{ x: 16, y: 16 }"
          style="position: absolute;"
        />
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <!-- Bouton à droite -->
  <SuFloatButton 
    :icon="'PlusIcon'"
    label="Ajouter"
    position="right"
  />
  
  <!-- Bouton à gauche -->
  <SuFloatButton 
    :icon="'CogIcon'"
    label="Paramètres"
    position="left"
    tooltip-position="right"
    variant="secondary"
  />
</template>
```

### Tailles

<div class="component-demo">
  <div class="demo-section">
    <h4>Tailles disponibles</h4>
    <div class="demo-inputs">
      <div style="position: relative; height: 200px; background-color: #f3f4f6; border-radius: 0.5rem; overflow: hidden;">
        <p style="padding: 1rem; margin: 0;">Différentes tailles</p>
        <SuFloatButton 
          :icon="'PlusIcon'"
          label="Small"
          size="sm"
          position="right"
          :offset="{ x: 16, y: 120 }"
          style="position: absolute;"
        />
        <SuFloatButton 
          :icon="'CogIcon'"
          label="Medium"
          size="md"
          position="right"
          :offset="{ x: 16, y: 70 }"
          style="position: absolute;"
        />
        <SuFloatButton 
          :icon="'HeartIcon'"
          label="Large"
          size="lg"
          position="right"
          :offset="{ x: 16, y: 16 }"
          style="position: absolute;"
        />
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <SuFloatButton size="sm" :icon="'PlusIcon'" label="Small" />
  <SuFloatButton size="md" :icon="'CogIcon'" label="Medium" />
  <SuFloatButton size="lg" :icon="'HeartIcon'" label="Large" />
</template>
```

### Offset personnalisé

<div class="component-demo">
  <div class="demo-section">
    <h4>Position personnalisée avec offset</h4>
    <div class="demo-inputs">
      <div style="position: relative; height: 200px; background-color: #f3f4f6; border-radius: 0.5rem; overflow: hidden;">
        <p style="padding: 1rem; margin: 0;">Bouton avec offset personnalisé</p>
        <SuFloatButton 
          :icon="'PlusIcon'"
          label="Position personnalisée"
          position="right"
          :offset="{ x: 60, y: 60 }"
          style="position: absolute;"
        />
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <SuFloatButton 
    :icon="'PlusIcon'"
    label="Position personnalisée"
    position="right"
    :offset="{ x: 60, y: 60 }"
  />
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `'left' \| 'right'` | `'right'` | Position du bouton flottant |
| `offset` | `{ x?: number, y?: number }` | `{ x: 24, y: 24 }` | Décalage personnalisé en pixels |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du bouton flottant |
| `icon` | `Component` | `undefined` | Icône du bouton |
| `label` | `string` | `undefined` | Label du bouton (affiché dans le tooltip) |
| `href` | `string` | `undefined` | URL de destination (transforme en lien) |
| `target` | `'_blank' \| '_self' \| '_parent' \| '_top'` | `undefined` | Cible du lien |
| `rel` | `string` | `undefined` | Relation du lien |
| `badge` | `string` | `undefined` | Texte du badge affiché en haut à droite |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | Variante du bouton |
| `disabled` | `boolean` | `false` | Désactive le bouton |
| `loading` | `boolean` | `false` | État de chargement |
| `zIndex` | `number` | `1000` | Z-index du bouton |
| `hideOnScroll` | `boolean` | `false` | Masquer lors du scroll vers le bas |
| `showTooltip` | `boolean` | `true` | Afficher le tooltip au survol |
| `tooltipPosition` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'left'` | Position du tooltip |

### Attributs d'accessibilité

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ariaLabel` | `string` | `undefined` | Label accessible (utilise `label` par défaut) |
| `ariaDescribedBy` | `string` | `undefined` | ID de l'élément de description |
| `role` | `string` | `undefined` | Rôle ARIA personnalisé |
| `tabIndex` | `number` | `0` | Ordre de tabulation |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `@click` | `(event: MouseEvent) => void` | Émis lors du clic sur le bouton |
| `@focus` | `(event: FocusEvent) => void` | Émis lors du focus sur le bouton |
| `@blur` | `(event: FocusEvent) => void` | Émis lors de la perte de focus |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu affiché au-dessus du bouton (LinkGroup ou ButtonGroup) |

## Fonctionnalités avancées

### 🎯 Positionnement intelligent

Le composant gère automatiquement :
- **Position fixe** : Reste visible lors du scroll
- **Offset personnalisé** : Ajustement précis de la position
- **Zones sûres** : Support des encoches iPhone (safe-area-inset)
- **Responsive** : Ajustement automatique sur mobile

### 🏷️ Badge de notification

Le badge offre un feedback visuel pour :
- **Notifications** : Nombre de messages non lus
- **Alertes** : Indicateurs d'état
- **Compteurs** : Éléments en attente
- **Animation** : Pulsation pour attirer l'attention

### 💬 Tooltip intelligent

Le tooltip s'adapte automatiquement :
- **Position** : S'ajuste selon la position du bouton
- **Contenu** : Utilise le `label` comme texte
- **Accessibilité** : Le `label` nomme déjà le bouton, l'infobulle est donc masquée des lecteurs d'écran
- **Clavier** : Affichée au focus, masquée avec Échap

### 📱 Comportement responsive

- **Mobile** : Offsets réduits automatiquement (16px au lieu de 24px)
- **Zones sûres** : Support des encoches et barres de navigation
- **Slot** : Largeur maximale adaptée à l'écran

## Accessibilité

Le composant FloatButton respecte les normes WCAG 2.1 AA :

### ✅ Fonctionnalités d'accessibilité

- **Navigation au clavier** : Support des touches Entrée et Espace
- **Focus visible** : Indicateur de focus clair et contrasté
- **Labels accessibles** : `aria-label` automatique ou personnalisé
- **Infobulle** : Affichée au survol et au focus, masquée avec Échap (WCAG 1.4.13)
- **Badges accessibles** : La valeur du badge est ajoutée au nom du bouton (ex. « Messages (3) »)
- **Contraste** : Ratios conformes WCAG AA (4.5:1 minimum)
- **Tailles minimales** : Respecte les tailles minimales de cible tactile (44px)
- **Mode sombre** : Contraste adapté automatiquement
- **Contraste élevé** : Support de `prefers-contrast: more`
- **Réduction d'animation** : Respect de `prefers-reduced-motion`

### 🎯 Bonnes pratiques

```vue
<template>
  <!-- Bouton flottant avec label accessible -->
  <SuFloatButton 
    :icon="'PlusIcon'"
    label="Ajouter un nouvel élément"
    position="right"
  />

  <!-- Lien externe avec sécurité -->
  <SuFloatButton 
    :icon="'QuestionMarkCircleIcon'"
    label="Ouvrir le centre d'aide"
    href="https://help.example.com"
    target="_blank"
    position="left"
    tooltip-position="right"
  />

  <!-- Avec badge et description -->
  <SuFloatButton 
    :icon="'ChatBubbleLeftIcon'"
    label="Messages non lus"
    badge="5"
    aria-describedby="messages-help"
  />
  <div id="messages-help" class="sr-only">
    Vous avez 5 messages non lus
  </div>

  <!-- Avec slot et rôle approprié -->
  <SuFloatButton 
    :icon="'CogIcon'"
    label="Menu d'actions"
    role="button"
    aria-haspopup="true"
  >
    <ButtonGroup role="menu" aria-label="Actions rapides">
	    <Button role="menuitem">Action 1</Button>
	    <Button role="menuitem">Action 2</Button>
    </ButtonGroup>
  </SuFloatButton>
</template>
```

## Navigation au clavier

| Touche | Action |
|--------|--------|
| `Tab` | Naviguer vers/depuis le bouton flottant |
| `Entrée` | Activer le bouton ou suivre le lien |
| `Espace` | Activer le bouton |
| `Échap` | Fermer le slot (si ouvert) |

## Exemples d'usage avancés

### Chat flottant avec actions

```vue
<script setup>
import { ref } from 'vue'
import { ChatBubbleLeftIcon, PhoneIcon, EnvelopeIcon, QuestionMarkCircleIcon } from '@heroicons/vue/24/outline'

const unreadMessages = ref(3)

const handleChatClick = () => {
  // Ouvrir la fenêtre de chat
  console.log('Ouvrir le chat')
}
</script>

<template>
  <SuFloatButton 
    :icon="'ChatBubbleLeftIcon'"
    label="Support client"
    :badge="unreadMessages.toString()"
    position="right"
    @click="handleChatClick"
  >
    <LinkGroup gap="sm" variant="muted" size="sm">
      <Link href="/help" :icon="'QuestionMarkCircleIcon'" iconDisplay="left">
        Centre d'aide
      </Link>
      <Link href="tel:+33123456789" :icon="'PhoneIcon'" iconDisplay="left">
        Téléphone
      </Link>
      <Link href="mailto:support@example.com" :icon="'EnvelopeIcon'" iconDisplay="left">
        Email
      </Link>
    </LinkGroup>
  </SuFloatButton>
</template>
```

### Actions rapides avec toolbar

```vue
<script setup>
import { ref } from 'vue'
import { PlusIcon, CogIcon, HeartIcon, ShareIcon, BookmarkIcon } from '@heroicons/vue/24/outline'

const showActions = ref(false)

const toggleActions = () => {
  showActions.value = !showActions.value
}

const handleAction = (action: string) => {
  console.log(`Action: ${action}`)
  showActions.value = false
}
</script>

<template>
  <SuFloatButton 
    :icon="'PlusIcon'"
    label="Actions rapides"
    position="right"
    :aria-expanded="showActions"
    @click="toggleActions"
  >
    <ButtonGroup 
      v-if="showActions"
      gap="sm" 
      variant="secondary" 
      size="sm"
      role="toolbar"
      aria-label="Actions rapides"
    >
      <Button 
        :icon="'CogIcon'" 
        iconDisplay="only" 
        aria-label="Paramètres"
        @click="handleAction('settings')"
      />
      <Button 
        :icon="'HeartIcon'" 
        iconDisplay="only" 
        aria-label="Ajouter aux favoris"
        @click="handleAction('favorite')"
      />
      <Button 
        :icon="'ShareIcon'" 
        iconDisplay="only" 
        aria-label="Partager"
        @click="handleAction('share')"
      />
      <Button 
        :icon="BookmarkIcon" 
        iconDisplay="only" 
        aria-label="Marquer"
        @click="handleAction('bookmark')"
      />
    </ButtonGroup>
  </SuFloatButton>
</template>
```

### Bouton de retour en haut

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowUpIcon } from '@heroicons/vue/24/outline'

const showBackToTop = ref(false)

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <SuFloatButton 
    v-if="showBackToTop"
    :icon="ArrowUpIcon"
    label="Retour en haut"
    position="right"
    variant="outline"
    :offset="{ x: 24, y: 100 }"
    @click="scrollToTop"
  />
</template>
```

### Support client complet

```vue
<script setup>
import { ref } from 'vue'
import { 
  ChatBubbleLeftIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  VideoCameraIcon
} from '@heroicons/vue/24/outline'

const supportOptions = [
  { 
    href: '/help', 
    icon: QuestionMarkCircleIcon, 
    label: 'Centre d\'aide',
    description: 'Documentation et FAQ'
  },
  { 
    href: '/docs', 
    icon: DocumentTextIcon, 
    label: 'Documentation',
    description: 'Guides techniques'
  },
  { 
    href: '/video-tutorials', 
    icon: VideoCameraIcon, 
    label: 'Tutoriels vidéo',
    description: 'Apprentissage visuel'
  },
  { 
    href: 'tel:+33123456789', 
    icon: PhoneIcon, 
    label: 'Téléphone',
    description: 'Support direct'
  },
  { 
    href: 'mailto:support@example.com', 
    icon: EnvelopeIcon, 
    label: 'Email',
    description: 'Support par email'
  }
]

const unreadTickets = ref(2)
</script>

<template>
  <SuFloatButton 
    :icon="'ChatBubbleLeftIcon'"
    label="Support client"
    :badge="unreadTickets > 0 ? unreadTickets.toString() : undefined"
    position="left"
    tooltipPosition="right"
  >
    <div class="support-menu">
      <div class="support-header">
        <h4>Comment pouvons-nous vous aider ?</h4>
      </div>
      
      <LinkGroup gap="sm" variant="muted" size="sm">
        <Link 
          v-for="option in supportOptions"
          :key="option.href"
          :href="option.href"
          :icon="option.icon"
          iconDisplay="left"
          :title="option.description"
        >
          {{ option.label }}
        </Link>
      </LinkGroup>
    </div>
  </SuFloatButton>
</template>

<style scoped>
.support-menu {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 200px;
}

.support-header {
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.support-header h4 {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}
</style>
```

## Cas d'usage courants

### 💬 Support et aide
- **Chat en direct** : Accès rapide au support client
- **Centre d'aide** : Lien vers la documentation
- **Contact** : Téléphone, email, formulaire

### ➕ Actions principales
- **Ajouter** : Créer un nouvel élément
- **Composer** : Rédiger un message, article
- **Créer** : Nouveau projet, document

### 🔧 Outils et paramètres
- **Paramètres** : Accès rapide aux réglages
- **Outils** : Fonctionnalités avancées
- **Raccourcis** : Actions fréquentes

### 📱 Navigation mobile
- **Menu** : Navigation principale sur mobile
- **Retour en haut** : Scroll vers le haut de page
- **Partage** : Partage rapide de contenu

## Bonnes pratiques

### ✅ À faire
- Utiliser un `label` descriptif pour l'accessibilité
- Limiter à 1-2 boutons flottants par page
- Placer les actions principales à droite (plus accessible)
- Utiliser des badges pour les notifications importantes
- Tester sur mobile et avec les lecteurs d'écran

### ❌ À éviter
- Masquer des fonctionnalités essentielles dans le slot
- Utiliser trop de boutons flottants (pollution visuelle)
- Oublier le `label` pour l'accessibilité
- Placer le bouton sur du contenu important
- Utiliser des animations excessives

## Performance

### 🚀 Optimisations intégrées
- **Événements passifs** : Scroll listeners optimisés
- **Transitions CSS** : Animations hardware-accelerated
- **Lazy rendering** : Le slot n'est rendu que si nécessaire
- **Cleanup automatique** : Suppression des event listeners

### 📊 Impact minimal
- **CSS généré** : ~2KB gzippé
- **JavaScript** : Logique légère et optimisée
- **Rendu** : Pas d'impact sur les performances de la page
- **Accessibilité** : Aucun compromis sur les performances