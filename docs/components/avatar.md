# Avatar

Composant Avatar basé sur le composant Image pour afficher une photo de profil ou les initiales d'un utilisateur. Supporte les badges de notification, indicateurs de statut et accessibilité complète selon les normes W3C.

## Exemples d'utilisation

### Avatar de base

<div class="component-demo">
  <div class="demo-section">
    <h4>Avatar avec image</h4>
    <div class="demo-inputs">
      <SuAvatar 
        src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100"
        alt="Photo de profil"
        name="John Doe"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuAvatar 
    src="https://example.com/photo.jpg"
    alt="Photo de profil"
    name="John Doe"
  />
</template>
```

### Avatar avec initiales

<div class="component-demo">
  <div class="demo-section">
    <h4>Avatar sans image (initiales)</h4>
    <div class="demo-inputs">
      <SuAvatar 
        name="Marie Dupont"
        alt="Avatar de Marie Dupont"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuAvatar 
    name="Marie Dupont"
    alt="Avatar de Marie Dupont"
  />
</template>
```

### Tailles

<div class="component-demo">
  <div class="demo-section">
    <h4>Tailles disponibles</h4>
    <div class="demo-inputs">
      <div style="display: flex; gap: 1rem; align-items: center;">
        <div style="text-align: center;">
          <SuAvatar size="xs" name="XS" alt="Avatar extra small" />
          <p style="margin-top: 0.5rem; font-size: 0.75rem;">XS</p>
        </div>
        <div style="text-align: center;">
          <SuAvatar size="sm" name="SM" alt="Avatar small" />
          <p style="margin-top: 0.5rem; font-size: 0.75rem;">SM</p>
        </div>
        <div style="text-align: center;">
          <SuAvatar size="md" name="MD" alt="Avatar medium" />
          <p style="margin-top: 0.5rem; font-size: 0.75rem;">MD</p>
        </div>
        <div style="text-align: center;">
          <SuAvatar size="lg" name="LG" alt="Avatar large" />
          <p style="margin-top: 0.5rem; font-size: 0.75rem;">LG</p>
        </div>
        <div style="text-align: center;">
          <SuAvatar size="xl" name="XL" alt="Avatar extra large" />
          <p style="margin-top: 0.5rem; font-size: 0.75rem;">XL</p>
        </div>
        <div style="text-align: center;">
          <SuAvatar size="2xl" name="2XL" alt="Avatar 2x large" />
          <p style="margin-top: 0.5rem; font-size: 0.75rem;">2XL</p>
        </div>
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <SuAvatar size="xs" name="User" />
  <SuAvatar size="sm" name="User" />
  <SuAvatar size="md" name="User" />
  <SuAvatar size="lg" name="User" />
  <SuAvatar size="xl" name="User" />
  <SuAvatar size="2xl" name="User" />
</template>
```

### Variantes de forme

<div class="component-demo">
  <div class="demo-section">
    <h4>Formes disponibles</h4>
    <div class="demo-inputs">
      <div style="display: flex; gap: 2rem; align-items: center;">
        <div style="text-align: center;">
          <SuAvatar 
            variant="circle"
            name="Circle"
            alt="Avatar circulaire"
            size="lg"
          />
          <p style="margin-top: 0.5rem; font-size: 0.875rem;">Circle</p>
        </div>
        <div style="text-align: center;">
          <SuAvatar 
            variant="rounded"
            name="Rounded"
            alt="Avatar arrondi"
            size="lg"
          />
          <p style="margin-top: 0.5rem; font-size: 0.875rem;">Rounded</p>
        </div>
        <div style="text-align: center;">
          <SuAvatar 
            variant="square"
            name="Square"
            alt="Avatar carré"
            size="lg"
          />
          <p style="margin-top: 0.5rem; font-size: 0.875rem;">Square</p>
        </div>
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <SuAvatar variant="circle" name="User" />
  <SuAvatar variant="rounded" name="User" />
  <SuAvatar variant="square" name="User" />
</template>
```

### Avec indicateur de statut

<div class="component-demo">
  <div class="demo-section">
    <h4>Indicateurs de statut</h4>
    <div class="demo-inputs">
      <div style="display: flex; gap: 2rem; align-items: center;">
        <div style="text-align: center;">
          <SuAvatar 
            name="Online"
            status="online"
            alt="Utilisateur en ligne"
            size="lg"
          />
          <p style="margin-top: 0.5rem; font-size: 0.875rem;">Online</p>
        </div>
        <div style="text-align: center;">
          <SuAvatar 
            name="Away"
            status="away"
            alt="Utilisateur absent"
            size="lg"
          />
          <p style="margin-top: 0.5rem; font-size: 0.875rem;">Away</p>
        </div>
        <div style="text-align: center;">
          <SuAvatar 
            name="Busy"
            status="busy"
            alt="Utilisateur occupé"
            size="lg"
          />
          <p style="margin-top: 0.5rem; font-size: 0.875rem;">Busy</p>
        </div>
        <div style="text-align: center;">
          <SuAvatar 
            name="Offline"
            status="offline"
            alt="Utilisateur hors ligne"
            size="lg"
          />
          <p style="margin-top: 0.5rem; font-size: 0.875rem;">Offline</p>
        </div>
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <SuAvatar name="User" status="online" />
  <SuAvatar name="User" status="away" />
  <SuAvatar name="User" status="busy" />
  <SuAvatar name="User" status="offline" />
</template>
```

### Avec badge de notification

<div class="component-demo">
  <div class="demo-section">
    <h4>Badges de notification</h4>
    <div class="demo-inputs">
      <div style="display: flex; gap: 2rem; align-items: center;">
        <div style="text-align: center;">
          <SuAvatar 
            src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100"
            alt="Avatar avec badge"
            name="John Doe"
            badge="3"
            size="lg"
          />
          <p style="margin-top: 0.5rem; font-size: 0.875rem;">Badge numérique</p>
        </div>
        <div style="text-align: center;">
          <SuAvatar 
            name="Marie"
            badge="!"
            badgeColor="#f59e0b"
            alt="Avatar avec badge d'alerte"
            size="lg"
          />
          <p style="margin-top: 0.5rem; font-size: 0.875rem;">Badge d'alerte</p>
        </div>
        <div style="text-align: center;">
          <SuAvatar 
            name="Pierre"
            badge="99+"
            alt="Avatar avec nombreuses notifications"
            size="lg"
          />
          <p style="margin-top: 0.5rem; font-size: 0.875rem;">Nombreuses notifications</p>
        </div>
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <!-- Badge numérique -->
  <SuAvatar 
    name="User"
    badge="5"
    alt="5 notifications"
  />
  
  <!-- Badge d'alerte -->
  <SuAvatar 
    name="User"
    badge="!"
    badgeColor="#f59e0b"
    alt="Alerte"
  />
  
  <!-- Badge avec texte -->
  <SuAvatar 
    name="User"
    badge="99+"
    alt="Plus de 99 notifications"
  />
</template>
```

### Avatar cliquable

<div class="component-demo">
  <div class="demo-section">
    <h4>Avatar interactif</h4>
    <div class="demo-inputs">
      <SuAvatar 
        src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100"
        alt="Avatar cliquable"
        name="John Doe"
        :clickable="true"
        size="lg"
      />
    </div>
  </div>
</div>

```vue
<script setup>
const handleAvatarClick = () => {
  console.log('Avatar cliqué!')
}
</script>

<template>
  <SuAvatar 
    src="photo.jpg"
    alt="Photo de profil"
    name="John Doe"
    :clickable="true"
    @click="handleAvatarClick"
  />
</template>
```

### États spéciaux

<div class="component-demo">
  <div class="demo-section">
    <h4>États de chargement et d'erreur</h4>
    <div class="demo-inputs">
      <div style="display: flex; gap: 2rem; align-items: center;">
        <div style="text-align: center;">
          <SuAvatar 
            name="Loading"
            :loading="true"
            alt="Avatar en chargement"
            size="lg"
          />
          <p style="margin-top: 0.5rem; font-size: 0.875rem;">Chargement</p>
        </div>
        <div style="text-align: center;">
          <SuAvatar 
            src="https://invalid-url.jpg"
            fallback="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100"
            alt="Avatar avec fallback"
            name="Fallback"
            size="lg"
          />
          <p style="margin-top: 0.5rem; font-size: 0.875rem;">Avec fallback</p>
        </div>
        <div style="text-align: center;">
          <SuAvatar 
            alt="Avatar par défaut"
            size="lg"
          />
          <p style="margin-top: 0.5rem; font-size: 0.875rem;">Placeholder</p>
        </div>
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <!-- Avatar en chargement -->
  <SuAvatar 
    name="User"
    :loading="true"
  />
  
  <!-- Avatar avec fallback -->
  <SuAvatar 
    src="invalid-url.jpg"
    fallback="default-avatar.jpg"
    name="User"
  />
  
  <!-- Avatar placeholder -->
  <SuAvatar alt="Avatar par défaut" />
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | `undefined` | URL de l'image de profil |
| `alt` | `string` | `undefined` | Texte alternatif pour l'image |
| `fallback` | `string` | `undefined` | Image de fallback en cas d'erreur |
| `name` | `string` | `undefined` | Nom pour générer les initiales |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Taille de l'avatar |
| `variant` | `'circle' \| 'rounded' \| 'square'` | `'circle'` | Forme de l'avatar |
| `status` | `'online' \| 'offline' \| 'away' \| 'busy'` | `undefined` | Statut de l'utilisateur |
| `badge` | `string \| number` | `undefined` | Badge de notification |
| `badgeColor` | `string` | `undefined` | Couleur personnalisée du badge |
| `loading` | `boolean` | `false` | État de chargement |
| `clickable` | `boolean` | `false` | Avatar cliquable |
| `badgeProps` | `BadgeProps` | - | Props transmises au Badge de l’avatar (variante, taille…) |
| `loadingLabel` | `string` | - | Texte lu pendant le chargement de l’image (sinon traduit) |

### Attributs d'accessibilité

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ariaLabel` | `string` | `undefined` | Label accessible |
| `ariaDescribedBy` | `string` | `undefined` | ID de l'élément de description |
| `role` | `string` | `undefined` | Rôle ARIA personnalisé |
| `tabIndex` | `number` | `0` | Ordre de tabulation (si cliquable) |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `@click` | `(event: MouseEvent) => void` | Émis lors du clic (si clickable) |
| `@load` | `(event: Event) => void` | Émis quand l'image est chargée |
| `@error` | `(event: Event) => void` | Émis si l'image échoue à se charger |

### Méthodes exposées

| Méthode | Type | Description |
|---------|------|-------------|
| `focus()` | `() => void` | Donne le focus à l'avatar |
| `avatarRef` | `Ref<HTMLElement>` | Référence à l'élément avatar |

## Génération des initiales

Le composant génère automatiquement les initiales à partir du nom :

### 🔤 Logique de génération

- **Un mot** : Première lettre (ex: "John" → "J")
- **Plusieurs mots** : Première lettre du premier et dernier mot (ex: "John Doe" → "JD")
- **Normalisation** : Conversion en majuscules automatique

```vue
<!-- Exemples d'initiales -->
<SuAvatar name="John" />          <!-- J -->
<SuAvatar name="John Doe" />      <!-- JD -->
<SuAvatar name="Marie Claire Dubois" />  <!-- MD -->
```

## Indicateurs de statut

### 🟢 Statuts disponibles

- **`online`** : Vert - Utilisateur en ligne
- **`away`** : Orange - Utilisateur absent
- **`busy`** : Rouge - Utilisateur occupé
- **`offline`** : Gris - Utilisateur hors ligne

```vue
<template>
  <SuAvatar name="User" status="online" />
  <SuAvatar name="User" status="away" />
  <SuAvatar name="User" status="busy" />
  <SuAvatar name="User" status="offline" />
</template>
```

## Badges de notification

### 🏷️ Types de badges

- **Numérique** : Nombre de notifications
- **Texte** : Indicateurs spéciaux (!, NEW, etc.)
- **Couleur personnalisée** : Via la prop `badgeColor`

```vue
<template>
  <!-- Badge numérique -->
  <SuAvatar name="User" badge="5" />
  
  <!-- Badge texte -->
  <SuAvatar name="User" badge="NEW" />
  
  <!-- Badge avec couleur personnalisée -->
  <SuAvatar name="User" badge="!" badgeColor="#f59e0b" />
</template>
```

## Accessibilité

Le composant Avatar respecte les normes WCAG 2.1 AA :

### ✅ Fonctionnalités d'accessibilité

- **Alt text approprié** : Génération automatique ou personnalisé
- **Navigation au clavier** : Support complet si `clickable`
- **Attributs ARIA** : Labels et descriptions pour les lecteurs d'écran
- **Annonces de statut** : Statut et badges annoncés aux lecteurs d'écran
- **Focus visible** : Indicateur de focus clair si cliquable
- **Contraste** : Couleurs conformes WCAG AA
- **Tailles minimales** : Respecte les tailles de cible tactile

### 🎯 Bonnes pratiques

```vue
<!-- Avatar avec accessibilité complète -->
<SuAvatar 
  src="photo.jpg"
  alt="Photo de profil de John Doe"
  name="John Doe"
  status="online"
  badge="3"
  :clickable="true"
  aria-label="Profil de John Doe, en ligne, 3 notifications"
/>

<!-- Avatar décoratif -->
<SuAvatar 
  src="photo.jpg"
  alt=""
  aria-hidden="true"
/>

<!-- Avatar avec description -->
<SuAvatar 
  name="Marie Dupont"
  alt="Marie Dupont"
  aria-describedby="user-description"
/>
<div id="user-description">
  Développeuse frontend, membre de l'équipe depuis 2 ans
</div>
```

## Navigation au clavier

| Touche | Action |
|--------|--------|
| `Tab` | Naviguer vers/depuis l'avatar (si cliquable) |
| `Entrée` | Activer l'avatar (si cliquable) |
| `Espace` | Activer l'avatar (si cliquable) |

## Exemples d'usage avancés

### Profil utilisateur

```vue
<script setup>
const user = {
  name: 'John Doe',
  avatar: 'https://example.com/avatar.jpg',
  status: 'online',
  notifications: 5
}

const handleProfileClick = () => {
  // Ouvrir le profil utilisateur
  console.log('Ouvrir le profil')
}
</script>

<template>
  <div class="user-profile">
    <SuAvatar 
      :src="user.avatar"
      :alt="`Photo de profil de ${user.name}`"
      :name="user.name"
      :status="user.status"
      :badge="user.notifications.toString()"
      size="xl"
      :clickable="true"
      @click="handleProfileClick"
    />
    
    <div class="user-info">
      <h3>{{ user.name }}</h3>
      <p>Développeur Frontend</p>
      <span class="status">{{ user.status }}</span>
    </div>
  </div>
</template>

<style scoped>
.user-profile {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-info h3 {
  margin: 0 0 0.25rem 0;
  color: #1f2937;
}

.user-info p {
  margin: 0 0 0.5rem 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.status {
  font-size: 0.75rem;
  font-weight: 500;
  color: #10b981;
}
</style>
```

### Liste de contacts

```vue
<script setup>
const contacts = [
  { name: 'Alice Martin', status: 'online', badge: '2' },
  { name: 'Bob Johnson', status: 'away' },
  { name: 'Carol Smith', status: 'busy', badge: '!' },
  { name: 'David Wilson', status: 'offline' }
]
</script>

<template>
  <div class="contacts-list">
    <h3>Contacts</h3>
    
    <div 
      v-for="contact in contacts"
      :key="contact.name"
      class="contact-item"
    >
      <SuAvatar 
        :name="contact.name"
        :alt="`Avatar de ${contact.name}`"
        :status="contact.status"
        :badge="contact.badge"
        :clickable="true"
      />
      
      <div class="contact-info">
        <h4>{{ contact.name }}</h4>
        <p>{{ contact.status }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contacts-list {
  max-width: 300px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
}

.contact-item:hover {
  background-color: #f9fafb;
}

.contact-info h4 {
  margin: 0 0 0.125rem 0;
  font-size: 0.875rem;
  color: #1f2937;
}

.contact-info p {
  margin: 0;
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: capitalize;
}
</style>
```