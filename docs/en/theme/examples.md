# Complete Examples

Practical and reusable examples to get started quickly with the Design System.

## Complete Dashboard

A modern dashboard with theme switcher and navigation.

```vue
<template>
  <div class="dashboard">
    <!-- Header -->
    <header class="dashboard-header">
      <div class="dashboard-header__brand">
        <IconLogo />
        <h1>MyApp</h1>
      </div>
      
      <nav class="dashboard-header__nav" aria-label="Main Navigation">
        <a href="/dashboard" class="nav-link nav-link--active">
          <IconHome />
          <span>Home</span>
        </a>
        <a href="/analytics" class="nav-link">
          <IconChart />
          <span>Analytics</span>
        </a>
        <a href="/settings" class="nav-link">
          <IconSettings />
          <span>Settings</span>
        </a>
      </nav>
      
      <div class="dashboard-header__actions">
        <ThemeToggle />
        <button class="icon-button" aria-label="Notifications">
          <IconBell />
          <span class="badge">3</span>
        </button>
        <button class="avatar" aria-label="User menu">
          <img src="/avatar.jpg" alt="Avatar" />
        </button>
      </div>
    </header>
    
    <!-- Sidebar -->
    <aside class="dashboard-sidebar">
      <nav aria-label="Sidebar menu">
        <div class="sidebar-section">
          <h2 class="sidebar-section__title">Projects</h2>
          <a href="/project/1" class="sidebar-link">
            <IconFolder />
            <span>Alpha Project</span>
          </a>
          <a href="/project/2" class="sidebar-link sidebar-link--active">
            <IconFolder />
            <span>Beta Project</span>
          </a>
        </div>
        
        <div class="sidebar-section">
          <h2 class="sidebar-section__title">Team</h2>
          <a href="/team" class="sidebar-link">
            <IconUsers />
            <span>Members</span>
          </a>
        </div>
      </nav>
    </aside>
    
    <!-- Main Content -->
    <main class="dashboard-main">
      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-card__icon stat-card__icon--primary">
            <IconTrendingUp />
          </div>
          <div class="stat-card__content">
            <p class="stat-card__label">Sales</p>
            <p class="stat-card__value">2,456</p>
            <p class="stat-card__change stat-card__change--positive">
              +12.5%
            </p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-card__icon stat-card__icon--success">
            <IconUsers />
          </div>
          <div class="stat-card__content">
            <p class="stat-card__label">Users</p>
            <p class="stat-card__value">8,234</p>
            <p class="stat-card__change stat-card__change--positive">
              +8.2%
            </p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-card__icon stat-card__icon--warning">
            <IconClock />
          </div>
          <div class="stat-card__content">
            <p class="stat-card__label">Pending</p>
            <p class="stat-card__value">12</p>
            <p class="stat-card__change stat-card__change--neutral">
              0%
            </p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-card__icon stat-card__icon--error">
            <IconAlertCircle />
          </div>
          <div class="stat-card__content">
            <p class="stat-card__label">Errors</p>
            <p class="stat-card__value">3</p>
            <p class="stat-card__change stat-card__change--negative">
              +2
            </p>
          </div>
        </div>
      </div>
      
      <!-- Content -->
      <div class="dashboard-content">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';
import ThemeToggle from '@/components/ThemeToggle.vue';

useTheme();
</script>

<style scoped lang="scss">
@use '@/styles/core/mixins' as *;

.dashboard {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main";
  grid-template-columns: 240px 1fr;
  grid-template-rows: 64px 1fr;
  min-height: 100vh;
  background-color: var(--su-bg-canvas);
}

.dashboard-header {
  grid-area: header;
  display: flex;
  align-items: center;
  gap: var(--su-spacing-6);
  padding: 0 var(--su-spacing-6);
  background-color: var(--su-bg-surface);
  border-bottom: 1px solid var(--su-border-default);
}

.dashboard-header__brand {
  display: flex;
  align-items: center;
  gap: var(--su-spacing-3);
  
  h1 {
    margin: 0;
    font-size: var(--su-font-size-lg);
    color: var(--su-text-primary);
  }
}

.dashboard-header__nav {
  display: flex;
  gap: var(--su-spacing-2);
  flex: 1;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--su-spacing-2);
  padding: var(--su-spacing-2) var(--su-spacing-3);
  color: var(--su-text-secondary);
  text-decoration: none;
  border-radius: var(--su-radius-md);
  @include transition(background-color, color);
  
  &:hover {
    background-color: var(--su-bg-hover);
    color: var(--su-text-primary);
  }
  
  &--active {
    background-color: var(--su-bg-selected);
    color: var(--su-primary-default);
  }
  
  &:focus-visible {
    @include focus-ring;
  }
}

.dashboard-header__actions {
  display: flex;
  align-items: center;
  gap: var(--su-spacing-3);
}

.icon-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  @include touch-target;
  padding: var(--su-spacing-2);
  background: transparent;
  border: none;
  border-radius: var(--su-radius-md);
  color: var(--su-text-secondary);
  cursor: pointer;
  @include transition(background-color, color);
  
  &:hover {
    background-color: var(--su-bg-hover);
    color: var(--su-text-primary);
  }
  
  &:focus-visible {
    @include focus-ring;
  }
}

.badge {
  position: absolute;
  top: 4px;
  right: 4px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  background-color: var(--su-state-error);
  color: white;
  font-size: 11px;
  font-weight: 600;
  border-radius: var(--su-radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar {
  @include touch-target;
  padding: 0;
  border: 2px solid var(--su-border-default);
  border-radius: var(--su-radius-full);
  overflow: hidden;
  background: transparent;
  cursor: pointer;
  @include transition(border-color);
  
  &:hover {
    border-color: var(--su-border-strong);
  }
  
  &:focus-visible {
    @include focus-ring;
  }
  
  img {
    width: 36px;
    height: 36px;
    display: block;
  }
}

.dashboard-sidebar {
  grid-area: sidebar;
  padding: var(--su-spacing-4);
  background-color: var(--su-bg-surface);
  border-right: 1px solid var(--su-border-default);
  overflow-y: auto;
}

.sidebar-section {
  margin-bottom: var(--su-spacing-6);
  
  &:last-child {
    margin-bottom: 0;
  }
}

.sidebar-section__title {
  margin: 0 0 var(--su-spacing-2);
  font-size: var(--su-font-size-xs);
  font-weight: 600;
  color: var(--su-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: var(--su-spacing-2);
  padding: var(--su-spacing-2) var(--su-spacing-3);
  margin-bottom: var(--su-spacing-1);
  color: var(--su-text-secondary);
  text-decoration: none;
  border-radius: var(--su-radius-md);
  @include transition(background-color, color);
  
  &:hover {
    background-color: var(--su-bg-hover);
    color: var(--su-text-primary);
  }
  
  &--active {
    background-color: var(--su-bg-selected);
    color: var(--su-primary-default);
    font-weight: 500;
  }
  
  &:focus-visible {
    @include focus-ring;
  }
}

.dashboard-main {
  grid-area: main;
  padding: var(--su-spacing-6);
  overflow-y: auto;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--su-spacing-4);
  margin-bottom: var(--su-spacing-6);
}

.stat-card {
  display: flex;
  gap: var(--su-spacing-4);
  padding: var(--su-spacing-4);
  background-color: var(--su-bg-surface);
  border: 1px solid var(--su-border-default);
  border-radius: var(--su-radius-lg);
}

.stat-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--su-radius-md);
  
  &--primary {
    background-color: color-mix(in srgb, var(--su-primary-default) 15%, transparent);
    color: var(--su-primary-default);
  }
  
  &--success {
    background-color: var(--su-state-success-bg);
    color: var(--su-state-success);
  }
  
  &--warning {
    background-color: var(--su-state-warning-bg);
    color: var(--su-state-warning);
  }
  
  &--error {
    background-color: var(--su-state-error-bg);
    color: var(--su-state-error);
  }
}

.stat-card__content {
  flex: 1;
}

.stat-card__label {
  margin: 0 0 var(--su-spacing-1);
  font-size: var(--su-font-size-sm);
  color: var(--su-text-secondary);
}

.stat-card__value {
  margin: 0 0 var(--su-spacing-1);
  font-size: var(--su-font-size-2xl);
  font-weight: 700;
  color: var(--su-text-primary);
}

.stat-card__change {
  margin: 0;
  font-size: var(--su-font-size-sm);
  font-weight: 500;
  
  &--positive {
    color: var(--su-state-success);
  }
  
  &--negative {
    color: var(--su-state-error);
  }
  
  &--neutral {
    color: var(--su-text-tertiary);
  }
}

.dashboard-content {
  // Votre contenu ici
}

@media (max-width: 768px) {
  .dashboard {
    grid-template-areas:
      "header"
      "main";
    grid-template-columns: 1fr;
  }
  
  .dashboard-sidebar {
    display: none;
  }
}
</style>
```

## Contact Form

Accessible form with complete validation.

```vue
<template>
  <form class="contact-form" @submit.prevent="handleSubmit">
    <h2 class="contact-form__title">Contact Us</h2>
    <p class="contact-form__description">
      Fill out the form below and we'll get back to you quickly.
    </p>
    
    <!-- Name -->
    <div class="form-field">
      <label for="name" class="form-field__label">
        Full Name
        <span class="required" aria-label="required">*</span>
      </label>
      <input 
        id="name"
        v-model="form.name"
        type="text"
        class="form-field__input"
        :class="{ 'form-field__input--error': errors.name }"
        required
        :aria-invalid="!!errors.name"
        :aria-describedby="errors.name ? 'name-error' : undefined"
        @blur="validateField('name')"
      />
      <span v-if="errors.name" id="name-error" class="form-field__error" role="alert">
        {{ errors.name }}
      </span>
    </div>
    
    <!-- Email -->
    <div class="form-field">
      <label for="email" class="form-field__label">
        Email
        <span class="required" aria-label="required">*</span>
      </label>
      <input 
        id="email"
        v-model="form.email"
        type="email"
        class="form-field__input"
        :class="{ 'form-field__input--error': errors.email }"
        required
        :aria-invalid="!!errors.email"
        :aria-describedby="errors.email ? 'email-error' : undefined"
        @blur="validateField('email')"
      />
      <span v-if="errors.email" id="email-error" class="form-field__error" role="alert">
        {{ errors.email }}
      </span>
    </div>
    
    <!-- Subject -->
    <div class="form-field">
      <label for="subject" class="form-field__label">
        Subject
        <span class="required" aria-label="required">*</span>
      </label>
      <select 
        id="subject"
        v-model="form.subject"
        class="form-field__select"
        :class="{ 'form-field__select--error': errors.subject }"
        required
        :aria-invalid="!!errors.subject"
        :aria-describedby="errors.subject ? 'subject-error' : undefined"
        @blur="validateField('subject')"
      >
        <option value="">Choisir un sujet</option>
        <option value="support">Support technique</option>
        <option value="sales">Questions commerciales</option>
        <option value="feedback">Feedback</option>
        <option value="other">Autre</option>
      </select>
      <span v-if="errors.subject" id="subject-error" class="form-field__error" role="alert">
        {{ errors.subject }}
      </span>
    </div>
    
    <!-- Message -->
    <div class="form-field">
      <label for="message" class="form-field__label">
        Message
        <span class="required" aria-label="obligatoire">*</span>
      </label>
      <textarea 
        id="message"
        v-model="form.message"
        class="form-field__textarea"
        :class="{ 'form-field__textarea--error': errors.message }"
        rows="5"
        required
        :aria-invalid="!!errors.message"
        :aria-describedby="errors.message ? 'message-error' : 'message-hint'"
        @blur="validateField('message')"
      />
      <span id="message-hint" class="form-field__hint">
        Minimum 10 caractères
      </span>
      <span v-if="errors.message" id="message-error" class="form-field__error" role="alert">
        {{ errors.message }}
      </span>
    </div>
    
    <!-- Consentement -->
    <label class="checkbox">
      <input 
        v-model="form.consent"
        type="checkbox"
        class="checkbox__input"
        required
        aria-describedby="consent-desc"
      />
      <span class="checkbox__label">
        J'accepte la politique de confidentialité
        <span class="required" aria-label="obligatoire">*</span>
      </span>
    </label>
    <span id="consent-desc" class="form-field__hint">
      Vos données ne seront pas partagées avec des tiers
    </span>
    
    <!-- Notification de succès -->
    <div 
      v-if="successMessage" 
      class="alert alert--success"
      role="status"
      aria-live="polite"
    >
      <IconCheck />
      <span>{{ successMessage }}</span>
    </div>
    
    <!-- Actions -->
    <div class="form-actions">
      <button 
        type="submit" 
        class="button button--primary"
        :disabled="loading"
        :aria-busy="loading"
      >
        <span v-if="loading">Envoi en cours...</span>
        <span v-else>Envoyer</span>
      </button>
      <button 
        type="button" 
        class="button button--secondary"
        @click="resetForm"
        :disabled="loading"
      >
        Réinitialiser
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
  consent: false
});

const errors = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const loading = ref(false);
const successMessage = ref('');

const validateField = (field: keyof typeof form) => {
  switch (field) {
    case 'name':
      errors.name = form.name.length < 2 
        ? 'Le nom doit contenir au moins 2 caractères' 
        : '';
      break;
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      errors.email = !emailRegex.test(form.email) 
        ? 'Format d\'email invalide' 
        : '';
      break;
    case 'subject':
      errors.subject = !form.subject 
        ? 'Veuillez choisir un sujet' 
        : '';
      break;
    case 'message':
      errors.message = form.message.length < 10 
        ? 'Le message doit contenir au moins 10 caractères' 
        : '';
      break;
  }
};

const isFormValid = () => {
  Object.keys(form).forEach(key => {
    if (key !== 'consent') {
      validateField(key as keyof typeof form);
    }
  });
  
  return Object.values(errors).every(error => !error) && form.consent;
};

const handleSubmit = async () => {
  if (!isFormValid()) return;
  
  loading.value = true;
  successMessage.value = '';
  
  try {
    // Simuler un appel API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    successMessage.value = 'Message envoyé avec succès ! Nous vous répondrons bientôt.';
    resetForm();
  } catch (error) {
    console.error('Erreur:', error);
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  form.name = '';
  form.email = '';
  form.subject = '';
  form.message = '';
  form.consent = false;
  
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
};
</script>

<style scoped lang="scss">
@use '@/styles/core/mixins' as *;

.contact-form {
  max-width: 600px;
  margin: 0 auto;
  padding: var(--su-spacing-8);
  background-color: var(--su-bg-surface);
  border-radius: var(--su-radius-xl);
  border: 1px solid var(--su-border-default);
}

.contact-form__title {
  margin: 0 0 var(--su-spacing-2);
  font-size: var(--su-font-size-3xl);
  color: var(--su-text-primary);
}

.contact-form__description {
  margin: 0 0 var(--su-spacing-6);
  color: var(--su-text-secondary);
}

.form-field {
  margin-bottom: var(--su-spacing-4);
}

.form-field__label {
  display: block;
  margin-bottom: var(--su-spacing-2);
  font-size: var(--su-font-size-sm);
  font-weight: 500;
  color: var(--su-text-primary);
}

.required {
  color: var(--su-state-error);
  margin-left: 2px;
}

.form-field__input,
.form-field__select,
.form-field__textarea {
  width: 100%;
  padding: var(--su-spacing-3) var(--su-spacing-4);
  font-size: var(--su-font-size-base);
  font-family: var(--su-font-family-base);
  color: var(--su-text-primary);
  background-color: var(--su-bg-surface);
  border: 2px solid var(--su-border-default);
  border-radius: var(--su-radius-md);
  @include transition(border-color, box-shadow);
  
  &:hover:not(:disabled) {
    border-color: var(--su-border-strong);
  }
  
  &:focus {
    border-color: var(--su-border-focus);
    outline: none;
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--su-border-focus) 20%, transparent);
  }
  
  &:disabled {
    background-color: var(--su-bg-disabled);
    color: var(--su-text-disabled);
    border-color: var(--su-border-disabled);
    cursor: not-allowed;
  }
  
  &--error {
    border-color: var(--su-state-error);
    
    &:focus {
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--su-state-error) 20%, transparent);
    }
  }
}

.form-field__textarea {
  resize: vertical;
  min-height: 120px;
}

.form-field__hint {
  display: block;
  margin-top: var(--su-spacing-1);
  font-size: var(--su-font-size-sm);
  color: var(--su-text-tertiary);
}

.form-field__error {
  display: block;
  margin-top: var(--su-spacing-1);
  font-size: var(--su-font-size-sm);
  color: var(--su-state-error);
  font-weight: 500;
}

.checkbox {
  display: flex;
  align-items: flex-start;
  gap: var(--su-spacing-2);
  margin-bottom: var(--su-spacing-4);
  cursor: pointer;
}

.checkbox__input {
  @include touch-target(20px);
  margin: 0;
  cursor: pointer;
  accent-color: var(--su-primary-default);
  
  &:focus-visible {
    @include focus-ring;
  }
}

.checkbox__label {
  flex: 1;
  font-size: var(--su-font-size-sm);
  color: var(--su-text-primary);
}

.alert {
  display: flex;
  align-items: center;
  gap: var(--su-spacing-3);
  padding: var(--su-spacing-4);
  margin-bottom: var(--su-spacing-4);
  border-radius: var(--su-radius-md);
  font-size: var(--su-font-size-sm);
  
  &--success {
    color: var(--su-state-success);
    background-color: var(--su-state-success-bg);
    border-left: 3px solid var(--su-state-success);
  }
}

.form-actions {
  display: flex;
  gap: var(--su-spacing-3);
  margin-top: var(--su-spacing-6);
}

.button {
  flex: 1;
  @include touch-target;
  padding: var(--su-spacing-3) var(--su-spacing-6);
  font-size: var(--su-font-size-base);
  font-weight: 600;
  border: 2px solid transparent;
  border-radius: var(--su-radius-md);
  cursor: pointer;
  @include transition(background-color, border-color, transform);
  
  &:hover:not(:disabled) {
    transform: translateY(calc(-2px * var(--su-animation-scale)));
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:focus-visible {
    @include focus-ring;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &--primary {
    background-color: var(--su-primary-default);
    color: var(--su-primary-text);
    
    &:hover:not(:disabled) {
      background-color: var(--su-primary-hover);
    }
  }
  
  &--secondary {
    background-color: var(--su-secondary-default);
    color: var(--su-secondary-text);
    border-color: var(--su-border-default);
    
    &:hover:not(:disabled) {
      background-color: var(--su-secondary-hover);
      border-color: var(--su-border-strong);
    }
  }
}

@media (max-width: 640px) {
  .contact-form {
    padding: var(--su-spacing-4);
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style>
```

## Data Table

Table de données responsive avec tri et pagination.

```vue
<template>
  <div class="data-table-container">
    <!-- Header avec actions -->
    <div class="data-table-header">
      <h2 class="data-table-header__title">Utilisateurs</h2>
      <div class="data-table-header__actions">
        <input 
          type="search"
          placeholder="Rechercher..."
          class="search-input"
          v-model="searchQuery"
          aria-label="Rechercher dans la table"
        />
        <button class="button button--primary">
          <IconPlus />
          <span>Ajouter</span>
        </button>
      </div>
    </div>
    
    <!-- Table -->
    <div class="table-wrapper">
      <table class="data-table" role="table" aria-label="Table des utilisateurs">
        <thead>
          <tr>
            <th 
              v-for="column in columns" 
              :key="column.key"
              :aria-sort="getSortDirection(column.key)"
            >
              <button 
                v-if="column.sortable"
                class="th-button"
                @click="handleSort(column.key)"
              >
                {{ column.label }}
                <IconArrowUp v-if="sortKey === column.key && sortDirection === 'asc'" />
                <IconArrowDown v-if="sortKey === column.key && sortDirection === 'desc'" />
              </button>
              <span v-else>{{ column.label }}</span>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginatedData" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>
              <span :class="['badge', `badge--${item.status}`]">
                {{ item.status }}
              </span>
            </td>
            <td>{{ formatDate(item.createdAt) }}</td>
            <td>
              <div class="action-buttons">
                <button 
                  class="icon-button"
                  aria-label="Éditer"
                  @click="handleEdit(item)"
                >
                  <IconEdit />
                </button>
                <button 
                  class="icon-button"
                  aria-label="Supprimer"
                  @click="handleDelete(item)"
                >
                  <IconTrash />
                </button>
              </div>
            </td>
          </tr>
          
          <tr v-if="paginatedData.length === 0">
            <td :colspan="columns.length + 1" class="empty-state">
              Aucune donnée à afficher
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Pagination -->
    <div class="pagination">
      <span class="pagination__info">
        {{ paginationInfo }}
      </span>
      <nav class="pagination__nav" aria-label="Pagination">
        <button 
          class="pagination__button"
          :disabled="currentPage === 1"
          @click="currentPage--"
          aria-label="Page précédente"
        >
          <IconChevronLeft />
        </button>
        
        <button
          v-for="page in visiblePages"
          :key="page"
          class="pagination__button"
          :class="{ 'pagination__button--active': page === currentPage }"
          @click="currentPage = page"
          :aria-label="`Page ${page}`"
          :aria-current="page === currentPage ? 'page' : undefined"
        >
          {{ page }}
        </button>
        
        <button 
          class="pagination__button"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
          aria-label="Page suivante"
        >
          <IconChevronRight />
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
}

const columns = [
  { key: 'name', label: 'Nom', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'status', label: 'Statut', sortable: true },
  { key: 'createdAt', label: 'Date création', sortable: true },
];

const data = ref<User[]>([
  {
    id: 1,
    name: 'Alice Martin',
    email: 'alice@example.com',
    status: 'active',
    createdAt: '2024-01-15'
  },
  // ... plus de données
]);

const searchQuery = ref('');
const sortKey = ref<string>('name');
const sortDirection = ref<'asc' | 'desc'>('asc');
const currentPage = ref(1);
const itemsPerPage = 10;

const filteredData = computed(() => {
  if (!searchQuery.value) return data.value;
  
  const query = searchQuery.value.toLowerCase();
  return data.value.filter(item =>
    item.name.toLowerCase().includes(query) ||
    item.email.toLowerCase().includes(query)
  );
});

const sortedData = computed(() => {
  const sorted = [...filteredData.value];
  
  sorted.sort((a, b) => {
    const aVal = a[sortKey.value as keyof User];
    const bVal = b[sortKey.value as keyof User];
    
    if (aVal < bVal) return sortDirection.value === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection.value === 'asc' ? 1 : -1;
    return 0;
  });
  
  return sorted;
});

const totalPages = computed(() => 
  Math.ceil(sortedData.value.length / itemsPerPage)
);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return sortedData.value.slice(start, end);
});

const paginationInfo = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage + 1;
  const end = Math.min(start + itemsPerPage - 1, sortedData.value.length);
  return `${start}-${end} sur ${sortedData.value.length}`;
});

const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages.value, start + maxVisible - 1);
  
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  
  return pages;
});

const handleSort = (key: string) => {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortDirection.value = 'asc';
  }
};

const getSortDirection = (key: string) => {
  if (sortKey.value !== key) return 'none';
  return sortDirection.value === 'asc' ? 'ascending' : 'descending';
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const handleEdit = (item: User) => {
  console.log('Edit:', item);
};

const handleDelete = (item: User) => {
  if (confirm(`Supprimer ${item.name} ?`)) {
    const index = data.value.findIndex(d => d.id === item.id);
    if (index > -1) data.value.splice(index, 1);
  }
};
</script>

<style scoped lang="scss">
@use '@/styles/core/mixins' as *;

.data-table-container {
  background-color: var(--su-bg-surface);
  border: 1px solid var(--su-border-default);
  border-radius: var(--su-radius-lg);
  overflow: hidden;
}

.data-table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--su-spacing-4) var(--su-spacing-6);
  border-bottom: 1px solid var(--su-border-default);
  gap: var(--su-spacing-4);
  flex-wrap: wrap;
}

.data-table-header__title {
  margin: 0;
  font-size: var(--su-font-size-xl);
  color: var(--su-text-primary);
}

.data-table-header__actions {
  display: flex;
  gap: var(--su-spacing-3);
}

.search-input {
  padding: var(--su-spacing-2) var(--su-spacing-3);
  border: 2px solid var(--su-border-default);
  border-radius: var(--su-radius-md);
  font-size: var(--su-font-size-sm);
  color: var(--su-text-primary);
  background-color: var(--su-bg-canvas);
  min-width: 200px;
  
  &:focus {
    border-color: var(--su-border-focus);
    outline: none;
  }
}

.table-wrapper {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: var(--su-spacing-3) var(--su-spacing-4);
    text-align: left;
  }
  
  thead {
    background-color: var(--su-bg-canvas);
    border-bottom: 2px solid var(--su-border-default);
    
    th {
      font-size: var(--su-font-size-sm);
      font-weight: 600;
      color: var(--su-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }
  
  tbody {
    tr {
      border-bottom: 1px solid var(--su-border-subtle);
      @include transition(background-color);
      
      &:hover {
        background-color: var(--su-bg-hover);
      }
      
      &:last-child {
        border-bottom: none;
      }
    }
    
    td {
      color: var(--su-text-primary);
      font-size: var(--su-font-size-base);
    }
  }
}

.th-button {
  display: flex;
  align-items: center;
  gap: var(--su-spacing-2);
  padding: 0;
  background: transparent;
  border: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
  @include transition(color);
  
  &:hover {
    color: var(--su-text-primary);
  }
  
  &:focus-visible {
    @include focus-ring;
  }
}

.badge {
  display: inline-block;
  padding: 4px 8px;
  font-size: var(--su-font-size-xs);
  font-weight: 600;
  border-radius: var(--su-radius-sm);
  
  &--active {
    background-color: var(--su-state-success-bg);
    color: var(--su-state-success);
  }
  
  &--inactive {
    background-color: var(--su-bg-disabled);
    color: var(--su-text-disabled);
  }
  
  &--pending {
    background-color: var(--su-state-warning-bg);
    color: var(--su-state-warning);
  }
}

.action-buttons {
  display: flex;
  gap: var(--su-spacing-2);
}

.icon-button {
  display: flex;
  align-items: center;
  justify-content: center;
  @include touch-target(32px);
  padding: var(--su-spacing-1);
  background: transparent;
  border: none;
  border-radius: var(--su-radius-md);
  color: var(--su-text-secondary);
  cursor: pointer;
  @include transition(background-color, color);
  
  &:hover {
    background-color: var(--su-bg-hover);
    color: var(--su-text-primary);
  }
  
  &:focus-visible {
    @include focus-ring;
  }
}

.empty-state {
  text-align: center;
  padding: var(--su-spacing-8) !important;
  color: var(--su-text-tertiary);
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--su-spacing-4) var(--su-spacing-6);
  border-top: 1px solid var(--su-border-default);
  flex-wrap: wrap;
  gap: var(--su-spacing-3);
}

.pagination__info {
  font-size: var(--su-font-size-sm);
  color: var(--su-text-secondary);
}

.pagination__nav {
  display: flex;
  gap: var(--su-spacing-1);
}

.pagination__button {
  @include touch-target(36px);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  padding: var(--su-spacing-2);
  background: transparent;
  border: 1px solid var(--su-border-default);
  border-radius: var(--su-radius-md);
  color: var(--su-text-primary);
  font-size: var(--su-font-size-sm);
  cursor: pointer;
  @include transition(background-color, border-color);
  
  &:hover:not(:disabled) {
    background-color: var(--su-bg-hover);
    border-color: var(--su-border-strong);
  }
  
  &:focus-visible {
    @include focus-ring;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &--active {
    background-color: var(--su-primary-default);
    color: var(--su-primary-text);
    border-color: var(--su-primary-default);
    
    &:hover {
      background-color: var(--su-primary-hover);
      border-color: var(--su-primary-hover);
    }
  }
}

@media (max-width: 768px) {
  .data-table-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-input {
    width: 100%;
  }
  
  .table-wrapper {
    overflow-x: scroll;
  }
  
  .pagination {
    flex-direction: column;
  }
}
</style>
```

## Carte produit e-commerce

Carte interactive pour afficher des produits.

```vue
<template>
  <article class="product-card">
    <!-- Image -->
    <div class="product-card__image-wrapper">
      <img 
        :src="product.image" 
        :alt="product.name"
        class="product-card__image"
      />
      <button 
        class="product-card__favorite"
        :aria-label="isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'"
        :class="{ 'product-card__favorite--active': isFavorite }"
        @click="toggleFavorite"
      >
        <IconHeart :filled="isFavorite" />
      </button>
      <span v-if="product.discount" class="product-card__badge">
        -{{ product.discount }}%
      </span>
    </div>
    
    <!-- Content -->
    <div class="product-card__content">
      <p class="product-card__category">{{ product.category }}</p>
      <h3 class="product-card__title">
        <a :href="`/products/${product.id}`">
          {{ product.name }}
        </a>
      </h3>
      
      <!-- Rating -->
      <div class="product-card__rating">
        <div class="stars" :aria-label="`${product.rating} étoiles sur 5`">
          <IconStar 
            v-for="i in 5" 
            :key="i"
            :filled="i <= product.rating"
          />
        </div>
        <span class="product-card__reviews">
          ({{ product.reviewsCount }})
        </span>
      </div>
      
      <!-- Price -->
      <div class="product-card__price">
        <span v-if="product.discount" class="product-card__price-old">
          {{ formatPrice(product.originalPrice) }}
        </span>
        <span class="product-card__price-current">
          {{ formatPrice(product.price) }}
        </span>
      </div>
      
      <!-- Actions -->
      <button 
        class="product-card__cta"
        @click="addToCart"
        :disabled="!product.inStock"
      >
        <IconShoppingCart />
        <span v-if="product.inStock">Ajouter au panier</span>
        <span v-else>Rupture de stock</span>
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
}

const props = defineProps<{
  product: Product;
}>();

const emit = defineEmits<{
  addToCart: [product: Product];
  toggleFavorite: [productId: number];
}>();

const isFavorite = ref(false);

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price);
};

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
  emit('toggleFavorite', props.product.id);
};

const addToCart = () => {
  emit('addToCart', props.product);
};
</script>

<style scoped lang="scss">
@use '@/styles/core/mixins' as *;

.product-card {
  display: flex;
  flex-direction: column;
  background-color: var(--su-bg-surface);
  border: 1px solid var(--su-border-default);
  border-radius: var(--su-radius-lg);
  overflow: hidden;
  @include transition(border-color, box-shadow, transform);
  
  &:hover {
    border-color: var(--su-border-strong);
    box-shadow: var(--su-shadow-md);
    transform: translateY(calc(-4px * var(--su-animation-scale)));
  }
}

.product-card__image-wrapper {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background-color: var(--su-bg-canvas);
}

.product-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  @include transition(transform);
  
  .product-card:hover & {
    transform: scale(calc(1 + 0.05 * var(--su-animation-scale)));
  }
}

.product-card__favorite {
  position: absolute;
  top: var(--su-spacing-3);
  right: var(--su-spacing-3);
  @include touch-target(40px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--su-bg-surface);
  border: none;
  border-radius: var(--su-radius-full);
  color: var(--su-text-secondary);
  cursor: pointer;
  box-shadow: var(--su-shadow-sm);
  @include transition(color, transform);
  
  &:hover {
    color: var(--su-state-error);
    transform: scale(calc(1 + 0.1 * var(--su-animation-scale)));
  }
  
  &:focus-visible {
    @include focus-ring;
  }
  
  &--active {
    color: var(--su-state-error);
  }
}

.product-card__badge {
  position: absolute;
  top: var(--su-spacing-3);
  left: var(--su-spacing-3);
  padding: 4px 8px;
  background-color: var(--su-state-error);
  color: white;
  font-size: var(--su-font-size-xs);
  font-weight: 700;
  border-radius: var(--su-radius-sm);
}

.product-card__content {
  display: flex;
  flex-direction: column;
  padding: var(--su-spacing-4);
  gap: var(--su-spacing-2);
}

.product-card__category {
  margin: 0;
  font-size: var(--su-font-size-xs);
  font-weight: 600;
  color: var(--su-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.product-card__title {
  margin: 0;
  font-size: var(--su-font-size-lg);
  line-height: var(--su-line-height-tight);
  
  a {
    color: var(--su-text-primary);
    text-decoration: none;
    @include transition(color);
    
    &:hover {
      color: var(--su-primary-default);
    }
    
    &:focus-visible {
      @include focus-ring;
    }
  }
}

.product-card__rating {
  display: flex;
  align-items: center;
  gap: var(--su-spacing-2);
}

.stars {
  display: flex;
  gap: 2px;
  color: #fbbf24; // Gold
}

.product-card__reviews {
  font-size: var(--su-font-size-sm);
  color: var(--su-text-tertiary);
}

.product-card__price {
  display: flex;
  align-items: baseline;
  gap: var(--su-spacing-2);
  margin-top: var(--su-spacing-2);
}

.product-card__price-old {
  font-size: var(--su-font-size-sm);
  color: var(--su-text-tertiary);
  text-decoration: line-through;
}

.product-card__price-current {
  font-size: var(--su-font-size-xl);
  font-weight: 700;
  color: var(--su-primary-default);
}

.product-card__cta {
  @include touch-target;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--su-spacing-2);
  margin-top: var(--su-spacing-3);
  padding: var(--su-spacing-3);
  background-color: var(--su-primary-default);
  color: var(--su-primary-text);
  border: none;
  border-radius: var(--su-radius-md);
  font-size: var(--su-font-size-base);
  font-weight: 600;
  cursor: pointer;
  @include transition(background-color, transform);
  
  &:hover:not(:disabled) {
    background-color: var(--su-primary-hover);
    transform: translateY(calc(-2px * var(--su-animation-scale)));
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:focus-visible {
    @include focus-ring;
  }
  
  &:disabled {
    background-color: var(--su-bg-disabled);
    color: var(--su-text-disabled);
    cursor: not-allowed;
  }
}
</style>
```

## Ressources supplémentaires

- [Composants UI](./components.md)
- [Guide des couleurs](./colors.md)
- [Tokens sémantiques](./tokens.md)
- [Système de thèmes](./themes.md)
- [Accessibilité](./accessibility.md)