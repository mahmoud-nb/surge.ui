<script setup lang="ts">
import { ref } from 'vue'
import Input from '../atoms/Input.vue'
import FormField from '../atoms/FormField.vue'
import SelectBoxField from '../molecules/SelectBoxField.vue'
import PasswordField from '../molecules/PasswordField.vue'
import TextareaField from '../molecules/TextareaField.vue'
import CheckboxGroupField from '../molecules/CheckboxGroupField.vue'
import RadioGroupField from '../molecules/RadioGroupField.vue'
import SwitchField from '../molecules/SwitchField.vue'
import FileUploadField from '../molecules/FileUploadField.vue'
import Button from '../atoms/Button.vue'
import {
  AtSymbolIcon,
  PhoneIcon,
  LockClosedIcon,
  EnvelopeIcon
} from '@heroicons/vue/24/outline'
import Grid from '../templates/Grid.vue'
import GridCell from '../templates/GridCell.vue'
import GlobalPreview from './GlobalPreview.vue'

// État pour le formulaire de contact
const contactForm = ref({
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

// État pour le formulaire d'inscription
const signupForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  country: '',
  acceptTerms: false,
  newsletter: true
})

// État pour le formulaire de connexion
const loginForm = ref({
  email: '',
  password: '',
  rememberMe: false
})

// État pour le formulaire de profil
const profileForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: '',
  bio: '',
  notifications: true,
  twoFactor: false
})

// État pour le formulaire de sondage
const surveyForm = ref({
  satisfaction: 'good',
  categories: [],
  recommend: false,
  improvements: ''
})

// Options communes
const countryOptions = ref([
  { value: 'france', label: 'France' },
  { value: 'usa', label: 'États-Unis' },
  { value: 'canada', label: 'Canada' },
  { value: 'spain', label: 'Espagne' },
  { value: 'germany', label: 'Allemagne' },
  { value: 'italy', label: 'Italie' }
])

const categoryOptions = ref([
  { value: 'quality', label: 'Qualité du produit' },
  { value: 'service', label: 'Service client' },
  { value: 'price', label: 'Prix' },
  { value: 'delivery', label: 'Livraison' },
  { value: 'packaging', label: 'Emballage' }
])

const satisfactionOptions = ref([
  { value: 'poor', label: 'Très insatisfait' },
  { value: 'fair', label: 'Peu satisfait' },
  { value: 'good', label: 'Satisfait' },
  { value: 'excellent', label: 'Très satisfait' }
])

// Handlers
const handleContactSubmit = () => {
  console.log('Formulaire de contact:', contactForm.value)
  alert('Message envoyé! Nous vous répondrons bientôt.')
  contactForm.value = { fullName: '', email: '', phone: '', subject: '', message: '' }
}

const handleSignupSubmit = () => {
  console.log('Formulaire d\'inscription:', signupForm.value)
  alert('Inscription réussie! Vérifiez votre email.')
  signupForm.value = { firstName: '', lastName: '', email: '', password: '', country: '', acceptTerms: false, newsletter: true }
}

const handleLoginSubmit = () => {
  console.log('Formulaire de connexion:', loginForm.value)
  alert('Connexion réussie!')
  loginForm.value = { email: '', password: '', rememberMe: false }
}

const handleProfileSubmit = () => {
  console.log('Profil mis à jour:', profileForm.value)
  alert('Votre profil a été mis à jour avec succès.')
}

const handleSurveySubmit = () => {
  console.log('Sondage soumis:', surveyForm.value)
  alert('Merci pour votre avis! Votre feedback est important.')
  surveyForm.value = { satisfaction: 'good', categories: [], recommend: false, improvements: '' }
}
</script>

<template>
  <GlobalPreview>
    <template #head>
      <h2>Formulaires Complets</h2>
    </template>
    <div class="su-form">
      <!-- FORMULAIRE DE CONTACT -->
      <div class="section">
        <h3>Formulaire de Contact</h3>
        <Grid view-mode="list">
          <GridCell
            radius="md"
            background-color="#F9F9F9"
            :padding="2"
          >
            <form
              class="form-container"
              @submit.prevent="handleContactSubmit"
            >
              <h4 class="form-title">
                Contactez-nous
              </h4>
              <p class="form-description">
                Remplissez ce formulaire pour nous envoyer un message
              </p>
              
              <FormField
                label="Nom complet"
                required
              >
                <template #default="{ fieldId }">
                  <Input 
                    :id="fieldId"
                    v-model="contactForm.fullName"
                    placeholder="Jean Dupont"
                    required
                  />
                </template>
              </FormField>

              <FormField
                label="Adresse email"
                required
              >
                <template #default="{ fieldId }">
                  <Input 
                    :id="fieldId"
                    v-model="contactForm.email"
                    type="email"
                    placeholder="email@exemple.com"
                    :prefix-icon="AtSymbolIcon"
                    required
                  />
                </template>
              </FormField>

              <FormField label="Téléphone">
                <template #default="{ fieldId }">
                  <Input 
                    :id="fieldId"
                    v-model="contactForm.phone"
                    type="tel"
                    placeholder="+33 1 23 45 67 89"
                    :prefix-icon="PhoneIcon"
                  />
                </template>
              </FormField>

              <FormField
                label="Sujet"
                required
              >
                <template #default="{ fieldId }">
                  <Input 
                    :id="fieldId"
                    v-model="contactForm.subject"
                    placeholder="Sujet de votre message"
                    required
                  />
                </template>
              </FormField>

              <TextareaField 
                v-model="contactForm.message"
                label="Message"
                placeholder="Décrivez votre demande..."
                :rows="5"
                :max-length="500"
                :show-counter="true"
                required
              />

              <div class="form-actions">
                <Button
                  variant="primary"
                  type="submit"
                >
                  Envoyer le message
                </Button>
                <Button
                  variant="outline"
                  type="reset"
                >
                  Effacer
                </Button>
              </div>
            </form>
          </GridCell>
        </Grid>
      </div>

      <!-- FORMULAIRE D'INSCRIPTION -->
      <div class="section">
        <h3>Formulaire d'Inscription</h3>
        <Grid view-mode="list">
          <GridCell
            radius="md"
            background-color="#F9F9F9"
            :padding="2"
          >
            <form
              class="form-container"
              @submit.prevent="handleSignupSubmit"
            >
              <h4 class="form-title">
                Créer un compte
              </h4>
              <p class="form-description">
                Rejoignez notre communauté en créant un compte
              </p>
              
              <div class="form-row">
                <div class="form-col">
                  <FormField
                    label="Prénom"
                    required
                  >
                    <template #default="{ fieldId }">
                      <Input 
                        :id="fieldId"
                        v-model="signupForm.firstName"
                        placeholder="Jean"
                        required
                      />
                    </template>
                  </FormField>
                </div>
                <div class="form-col">
                  <FormField
                    label="Nom"
                    required
                  >
                    <template #default="{ fieldId }">
                      <Input 
                        :id="fieldId"
                        v-model="signupForm.lastName"
                        placeholder="Dupont"
                        required
                      />
                    </template>
                  </FormField>
                </div>
              </div>

              <FormField
                label="Adresse email"
                required
              >
                <template #default="{ fieldId }">
                  <Input 
                    :id="fieldId"
                    v-model="signupForm.email"
                    type="email"
                    placeholder="email@exemple.com"
                    :prefix-icon="AtSymbolIcon"
                    required
                  />
                </template>
              </FormField>

              <PasswordField 
                v-model="signupForm.password"
                label="Mot de passe"
                placeholder="Au moins 8 caractères"
                :show-progress="true"
                :show-toggle="true"
                required
              />

              <SelectBoxField 
                v-model="signupForm.country"
                label="Pays"
                placeholder="Sélectionnez votre pays"
                :options="countryOptions"
                required
              />

              <SwitchField 
                v-model="signupForm.acceptTerms"
                label="J'accepte les conditions d'utilisation"
                required
              />

              <SwitchField 
                v-model="signupForm.newsletter"
                label="M'inscrire à la newsletter"
                right-label="Activé"
              />

              <div class="form-actions">
                <Button
                  variant="primary"
                  type="submit"
                >
                  S'inscrire
                </Button>
                <Button
                  variant="outline"
                  type="reset"
                >
                  Réinitialiser
                </Button>
              </div>
            </form>
          </GridCell>
        </Grid>
      </div>

      <!-- FORMULAIRE DE CONNEXION -->
      <div class="section">
        <h3>Formulaire de Connexion</h3>
        <Grid view-mode="list">
          <GridCell
            radius="md"
            background-color="#F9F9F9"
            :padding="2"
          >
            <form
              class="form-container login-form"
              @submit.prevent="handleLoginSubmit"
            >
              <h4 class="form-title">
                Connexion
              </h4>
              <p class="form-description">
                Connectez-vous à votre compte
              </p>
              
              <FormField
                label="Email"
                required
              >
                <template #default="{ fieldId }">
                  <Input 
                    :id="fieldId"
                    v-model="loginForm.email"
                    type="email"
                    placeholder="email@exemple.com"
                    :prefix-icon="AtSymbolIcon"
                    required
                  />
                </template>
              </FormField>

              <PasswordField 
                v-model="loginForm.password"
                label="Mot de passe"
                placeholder="Entrez votre mot de passe"
                :show-progress="false"
                :show-toggle="true"
                required
              />

              <SwitchField 
                v-model="loginForm.rememberMe"
                label="Se souvenir de moi"
              />

              <div class="form-actions">
                <Button
                  variant="primary"
                  type="submit"
                  block
                >
                  Se connecter
                </Button>
              </div>

              <p class="login-footer">
                Pas encore de compte? <a
                  href="#"
                  class="link"
                >S'inscrire</a>
              </p>
            </form>
          </GridCell>
        </Grid>
      </div>

      <!-- FORMULAIRE DE PROFIL -->
      <div class="section">
        <h3>Formulaire de Profil Utilisateur</h3>
        <Grid view-mode="list">
          <GridCell
            radius="md"
            background-color="#F9F9F9"
            :padding="2"
          >
            <form
              class="form-container"
              @submit.prevent="handleProfileSubmit"
            >
              <h4 class="form-title">
                Gérer votre profil
              </h4>
              <p class="form-description">
                Mettez à jour vos informations personnelles
              </p>
              
              <div class="form-row">
                <div class="form-col">
                  <FormField label="Prénom">
                    <template #default="{ fieldId }">
                      <Input 
                        :id="fieldId"
                        v-model="profileForm.firstName"
                        placeholder="Prénom"
                      />
                    </template>
                  </FormField>
                </div>
                <div class="form-col">
                  <FormField label="Nom">
                    <template #default="{ fieldId }">
                      <Input 
                        :id="fieldId"
                        v-model="profileForm.lastName"
                        placeholder="Nom"
                      />
                    </template>
                  </FormField>
                </div>
              </div>

              <FormField label="Email">
                <template #default="{ fieldId }">
                  <Input 
                    :id="fieldId"
                    v-model="profileForm.email"
                    type="email"
                    placeholder="email@exemple.com"
                    :prefix-icon="AtSymbolIcon"
                  />
                </template>
              </FormField>

              <FormField label="Téléphone">
                <template #default="{ fieldId }">
                  <Input 
                    :id="fieldId"
                    v-model="profileForm.phone"
                    type="tel"
                    placeholder="+33..."
                    :prefix-icon="PhoneIcon"
                  />
                </template>
              </FormField>

              <SelectBoxField 
                v-model="profileForm.country"
                label="Pays"
                placeholder="Sélectionnez votre pays"
                :options="countryOptions"
              />

              <TextareaField 
                v-model="profileForm.bio"
                label="Biographie"
                placeholder="Parlez-nous de vous..."
                :rows="3"
                :max-length="300"
                :show-counter="true"
              />

              <div class="settings-group">
                <h5 class="settings-title">
                  Paramètres de notification
                </h5>
                <SwitchField 
                  v-model="profileForm.notifications"
                  label="Activer les notifications"
                  right-label="Activées"
                />
                <SwitchField 
                  v-model="profileForm.twoFactor"
                  label="Authentification à deux facteurs"
                  right-label="Activée"
                />
              </div>

              <div class="form-actions">
                <Button
                  variant="primary"
                  type="submit"
                >
                  Enregistrer les modifications
                </Button>
              </div>
            </form>
          </GridCell>
        </Grid>
      </div>

      <!-- FORMULAIRE DE SONDAGE -->
      <div class="section">
        <h3>Formulaire de Sondage de Satisfaction</h3>
        <Grid view-mode="list">
          <GridCell
            radius="md"
            background-color="#F9F9F9"
            :padding="2"
          >
            <form
              class="form-container"
              @submit.prevent="handleSurveySubmit"
            >
              <h4 class="form-title">
                Votre avis nous intéresse
              </h4>
              <p class="form-description">
                Aidez-nous à améliorer nos services en répondant à quelques questions
              </p>
              
              <RadioGroupField 
                v-model="surveyForm.satisfaction"
                label="Quel est votre niveau de satisfaction?"
                :options="satisfactionOptions"
              />

              <CheckboxGroupField 
                v-model="surveyForm.categories"
                label="Quels aspects aimerriez-vous améliorer?"
                :options="categoryOptions"
              />

              <SwitchField 
                v-model="surveyForm.recommend"
                label="Recommanderiez-vous nos services?"
                left-label="Non"
                right-label="Oui"
              />

              <TextareaField 
                v-model="surveyForm.improvements"
                label="Suggestions d'amélioration"
                placeholder="Partagez vos idées pour nous améliorer..."
                :rows="4"
                :max-length="1000"
                :show-counter="true"
              />

              <div class="form-actions">
                <Button
                  variant="primary"
                  type="submit"
                >
                  Soumettre le sondage
                </Button>
                <Button
                  variant="outline"
                  type="reset"
                >
                  Réinitialiser
                </Button>
              </div>
            </form>
          </GridCell>
        </Grid>
      </div>

      <!-- FORMULAIRE D'UPLOAD MULTI-FICHIERS -->
      <div class="section">
        <h3>Formulaire avec Upload de Fichiers</h3>
        <Grid view-mode="list">
          <GridCell
            radius="md"
            background-color="#F9F9F9"
            :padding="2"
          >
            <form class="form-container">
              <h4 class="form-title">
                Soumettre une candidature
              </h4>
              <p class="form-description">
                Partagez vos documents professionnels
              </p>
              
              <FormField
                label="Nom complet"
                required
              >
                <template #default="{ fieldId }">
                  <Input 
                    :id="fieldId"
                    placeholder="Votre nom"
                    required
                  />
                </template>
              </FormField>

              <FormField
                label="Email"
                required
              >
                <template #default="{ fieldId }">
                  <Input 
                    :id="fieldId"
                    type="email"
                    placeholder="email@exemple.com"
                    :prefix-icon="AtSymbolIcon"
                    required
                  />
                </template>
              </FormField>

              <SelectBoxField 
                label="Poste demandé"
                placeholder="Sélectionnez un poste"
                :options="[
                  { value: 'dev', label: 'Développeur' },
                  { value: 'designer', label: 'Designer' },
                  { value: 'pm', label: 'Chef de projet' },
                  { value: 'qa', label: 'QA Engineer' }
                ]"
                required
              />

              <FileUploadField 
                label="CV (PDF ou DOC)"
                placeholder="Glissez votre CV ici ou cliquez pour sélectionner"
                accept=".pdf,.doc,.docx"
                required
              />

              <FileUploadField 
                label="Lettres de recommandation"
                placeholder="Joindre les lettres de recommandation (optionnel)"
                :multiple="true"
                accept=".pdf,.doc,.docx"
              />

              <FileUploadField 
                label="Portfolio (images/PDF)"
                placeholder="Montrez votre travail!"
                :multiple="true"
                accept="image/*,.pdf"
              />

              <TextareaField 
                label="Lettre de motivation"
                placeholder="Dites-nous pourquoi vous souhaitez rejoindre notre équipe..."
                :rows="4"
                :max-length="500"
                :show-counter="true"
                required
              />

              <SwitchField 
                label="J'accepte les conditions de confidentialité"
                required
              />

              <div class="form-actions">
                <Button variant="primary">
                  Soumettre la candidature
                </Button>
                <Button
                  variant="outline"
                  type="reset"
                >
                  Effacer
                </Button>
              </div>
            </form>
          </GridCell>
        </Grid>
      </div>
    </div>
  </GlobalPreview>
</template>

<style scoped>
.su-form {
  padding: 2rem;
  background-color: #fff;
}

.section {
  margin-bottom: 3rem;
}

.section h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1f2937;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.25rem;
  color: #1f2937;
}

.form-description {
  margin: 0 0 1rem;
  color: #6b7280;
  font-size: 0.95rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-col {
  display: flex;
  flex-direction: column;
}

.settings-group {
  padding: 1.5rem;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  border-left: 3px solid #3b82f6;
}

.settings-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 1rem;
  color: #1f2937;
  padding-bottom: 1rem;
  border-bottom: 1px solid #d1d5db;
}

.settings-group > div {
  margin-bottom: 1rem;
}

.settings-group > div:last-child {
  margin-bottom: 0;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.login-form {
  max-width: 400px;
}

.login-footer {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #6b7280;
}

.link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.link:hover {
  color: #2563eb;
}

@media (width <= 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .login-form {
    max-width: 100%;
  }
}
</style>
