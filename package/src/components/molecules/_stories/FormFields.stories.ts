import type { Meta, StoryObj } from '@storybook/vue3'
import { UserIcon, AtSymbolIcon, LockClosedIcon, BuildingOfficeIcon } from '@heroicons/vue/24/outline'
import FormFields from '../FormFields.vue'
import InputField from '../InputField.vue'
import SelectBox from '@/components/molecules/SelectBox.vue'
import RadioGroup from '@/components/molecules/RadioGroup.vue'
import CheckboxGroup from '@/components/molecules/CheckboxGroup.vue'
import SwitchField from '@/components/molecules/SwitchField.vue'
import FileUpload from '@/components/molecules/FileUpload.vue'
import TextareaField from '@/components/molecules/TextareaField.vue'
import Slider from '@/components/molecules/Slider.vue'
import Button from '@/components/atoms/Button.vue'

const meta: Meta<typeof FormFields> = {
  title: 'Molecules/FormFields',
  component: FormFields,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant FormFields pour organiser et aligner des champs de formulaire avec un espacement contrôlé. Supporte la propagation de la prop size aux champs enfants et la gestion des sections avec slots head et footer.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    gap: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Espacement entre les champs de formulaire'
    },
    sectionGap: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Espacement entre les sections (head, content, footer)'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Taille forcée pour tous les champs'
    },
    direction: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Direction d\'affichage des champs'
    },
    ariaLabel: {
      control: 'text',
      description: 'Label accessible pour le groupe'
    },
    role: {
      control: 'text',
      description: 'Rôle ARIA personnalisé'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const basicOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
]

const countryOptions = [
  { value: 'fr', label: 'France' },
  { value: 'us', label: 'États-Unis' },
  { value: 'de', label: 'Allemagne' },
  { value: 'es', label: 'Espagne' }
]

const accountTypes = [
  { value: 'personal', label: 'Personnel', icon: UserIcon },
  { value: 'business', label: 'Entreprise', icon: BuildingOfficeIcon }
]

export const Default: Story = {
  render: () => ({
    components: { FormFields, InputField, SelectBox, SwitchField },
    setup() {
      return { basicOptions, AtSymbolIcon, LockClosedIcon }
    },
    template: `
      <FormFields style="width: 400px;">
        <InputField 
          label="Nom complet"
          placeholder="Entrez votre nom"
          required
        />
        <InputField 
          type="email"
          label="Email"
          placeholder="nom@exemple.com"
          :prefixIcon="AtSymbolIcon"
          required
        />
        <SelectBox 
          :options="basicOptions"
          label="Préférence"
          placeholder="Choisissez une option"
        />
        <SwitchField 
          label="Notifications"
          rightLabel="Activées"
          message="Recevoir des notifications par email"
        />
      </FormFields>
    `
  })
}

export const WithGaps: Story = {
  render: () => ({
    components: { FormFields, InputField, SwitchField },
    setup() {
      return { AtSymbolIcon }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 3rem; align-items: flex-start;">
        <div>
          <h4 style="margin-bottom: 1rem;">Gap Small</h4>
          <FormFields gap="sm" style="width: 300px;">
            <InputField label="Nom" placeholder="Votre nom" />
            <InputField type="email" label="Email" placeholder="email@exemple.com" :prefixIcon="AtSymbolIcon" />
            <SwitchField label="Newsletter" rightLabel="Oui" />
          </FormFields>
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem;">Gap Medium (défaut)</h4>
          <FormFields gap="md" style="width: 300px;">
            <InputField label="Nom" placeholder="Votre nom" />
            <InputField type="email" label="Email" placeholder="email@exemple.com" :prefixIcon="AtSymbolIcon" />
            <SwitchField label="Newsletter" rightLabel="Oui" />
          </FormFields>
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem;">Gap Large</h4>
          <FormFields gap="lg" style="width: 300px;">
            <InputField label="Nom" placeholder="Votre nom" />
            <InputField type="email" label="Email" placeholder="email@exemple.com" :prefixIcon="AtSymbolIcon" />
            <SwitchField label="Newsletter" rightLabel="Oui" />
          </FormFields>
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem;">Gap Extra Large</h4>
          <FormFields gap="xl" style="width: 300px;">
            <InputField label="Nom" placeholder="Votre nom" />
            <InputField type="email" label="Email" placeholder="email@exemple.com" :prefixIcon="AtSymbolIcon" />
            <SwitchField label="Newsletter" rightLabel="Oui" />
          </FormFields>
        </div>
      </div>
    `
  })
}

export const ForcedSize: Story = {
  render: () => ({
    components: { FormFields, InputField, SelectBox, TextareaField },
    setup() {
      return { basicOptions }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 3rem; align-items: flex-start;">
        <div>
          <h4 style="margin-bottom: 1rem;">Taille Small forcée</h4>
          <FormFields size="sm" style="width: 300px;">
            <InputField label="Nom" placeholder="Petit champ" />
            <SelectBox :options="basicOptions" label="Sélection" placeholder="Petit select" />
            <TextareaField label="Message" placeholder="Petit textarea" />
          </FormFields>
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem;">Taille Medium forcée</h4>
          <FormFields size="md" style="width: 300px;">
            <InputField label="Nom" placeholder="Champ moyen" />
            <SelectBox :options="basicOptions" label="Sélection" placeholder="Select moyen" />
            <TextareaField label="Message" placeholder="Textarea moyen" />
          </FormFields>
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem;">Taille Large forcée</h4>
          <FormFields size="lg" style="width: 300px;">
            <InputField label="Nom" placeholder="Grand champ" />
            <SelectBox :options="basicOptions" label="Sélection" placeholder="Grand select" />
            <TextareaField label="Message" placeholder="Grand textarea" />
          </FormFields>
        </div>
      </div>
    `
  })
}

export const Horizontal: Story = {
  render: () => ({
    components: { FormFields, InputField, SelectBox },
    setup() {
      return { countryOptions }
    },
    template: `
      <div style="width: 100%; max-width: 800px;">
        <h4 style="margin-bottom: 1rem;">Direction horizontale</h4>
        <FormFields direction="horizontal" gap="md">
          <InputField 
            label="Prénom"
            placeholder="Votre prénom"
            required
          />
          <InputField 
            label="Nom"
            placeholder="Votre nom"
            required
          />
          <SelectBox 
            :options="countryOptions"
            label="Pays"
            placeholder="Sélectionnez votre pays"
          />
        </FormFields>
      </div>
    `
  })
}

export const WithSections: Story = {
  render: () => ({
    components: { FormFields, InputField, SelectBox, RadioGroup, SwitchField, Button },
    setup() {
      return { countryOptions, accountTypes, AtSymbolIcon, LockClosedIcon }
    },
    template: `
      <FormFields style="width: 500px;" sectionGap="lg" role="form" aria-label="Formulaire d'inscription">
        <template #head>
          <div style="text-align: center; padding: 1.5rem; background-color: #f8fafc; border-radius: 0.5rem; border: 1px solid #e2e8f0;">
            <h2 style="margin: 0 0 0.5rem 0; color: #1e293b; font-size: 1.5rem; font-weight: 600;">
              Créer un compte
            </h2>
            <p style="margin: 0; color: #64748b; font-size: 0.875rem;">
              Remplissez les informations ci-dessous pour créer votre compte
            </p>
          </div>
        </template>

        <InputField 
          label="Nom complet"
          placeholder="Entrez votre nom complet"
          :prefixIcon="UserIcon"
          required
        />
        
        <InputField 
          type="email"
          label="Adresse email"
          placeholder="nom@exemple.com"
          :prefixIcon="AtSymbolIcon"
          required
        />
        
        <InputField 
          type="password"
          label="Mot de passe"
          placeholder="••••••••"
          :prefixIcon="LockClosedIcon"
          required
        />
        
        <SelectBox 
          :options="countryOptions"
          label="Pays"
          placeholder="Sélectionnez votre pays"
          required
        />
        
        <RadioGroup 
          :options="accountTypes"
          label="Type de compte"
          displayType="inline-card"
          direction="horizontal"
          required
        />
        
        <SwitchField 
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
              <Button variant="outline">Annuler</Button>
              <Button variant="primary">Créer le compte</Button>
            </div>
          </div>
        </template>
      </FormFields>
    `
  })
}

export const SectionGaps: Story = {
  render: () => ({
    components: { FormFields, InputField, Button },
    template: `
      <div style="display: flex; flex-direction: column; gap: 3rem; align-items: flex-start;">
        <div>
          <h4 style="margin-bottom: 1rem;">Section Gap Small</h4>
          <FormFields sectionGap="sm" style="width: 300px;">
            <template #head>
              <h3 style="margin: 0; color: #374151;">Informations personnelles</h3>
            </template>
            <InputField label="Nom" placeholder="Votre nom" />
            <InputField label="Email" placeholder="votre@email.com" />
            <template #footer>
              <Button variant="primary" block>Sauvegarder</Button>
            </template>
          </FormFields>
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem;">Section Gap Large (défaut)</h4>
          <FormFields sectionGap="lg" style="width: 300px;">
            <template #head>
              <h3 style="margin: 0; color: #374151;">Informations personnelles</h3>
            </template>
            <InputField label="Nom" placeholder="Votre nom" />
            <InputField label="Email" placeholder="votre@email.com" />
            <template #footer>
              <Button variant="primary" block>Sauvegarder</Button>
            </template>
          </FormFields>
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem;">Section Gap Extra Large</h4>
          <FormFields sectionGap="xl" style="width: 300px;">
            <template #head>
              <h3 style="margin: 0; color: #374151;">Informations personnelles</h3>
            </template>
            <InputField label="Nom" placeholder="Votre nom" />
            <InputField label="Email" placeholder="votre@email.com" />
            <template #footer>
              <Button variant="primary" block>Sauvegarder</Button>
            </template>
          </FormFields>
        </div>
      </div>
    `
  })
}

export const ContactForm: Story = {
  render: () => ({
    components: { FormFields, InputField, SelectBox, TextareaField, CheckboxGroup, Button },
    setup() {
      const subjects = [
        { value: 'support', label: 'Support technique' },
        { value: 'sales', label: 'Ventes' },
        { value: 'billing', label: 'Facturation' },
        { value: 'other', label: 'Autre' }
      ]
      
      const preferences = [
        { value: 'email', label: 'Réponse par email' },
        { value: 'phone', label: 'Rappel téléphonique' }
      ]
      
      return { subjects, preferences, AtSymbolIcon }
    },
    template: `
      <FormFields 
        style="width: 600px;" 
        gap="lg" 
        sectionGap="xl"
        role="form" 
        aria-label="Formulaire de contact"
      >
        <template #head>
          <div style="text-align: center; padding: 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 0.75rem; color: white;">
            <h1 style="margin: 0 0 0.5rem 0; font-size: 2rem; font-weight: 700;">
              Nous contacter
            </h1>
            <p style="margin: 0; opacity: 0.9; font-size: 1.125rem;">
              Notre équipe vous répondra dans les plus brefs délais
            </p>
          </div>
        </template>

        <InputField 
          label="Nom complet"
          placeholder="Entrez votre nom complet"
          :prefixIcon="UserIcon"
          required
        />
        
        <InputField 
          type="email"
          label="Adresse email"
          placeholder="nom@exemple.com"
          :prefixIcon="AtSymbolIcon"
          required
        />
        
        <SelectBox 
          :options="subjects"
          label="Sujet"
          placeholder="Sélectionnez un sujet"
          required
        />
        
        <TextareaField 
          label="Message"
          placeholder="Décrivez votre demande en détail..."
          :maxLength="1000"
          :showCounter="true"
          :autoResize="true"
          :minRows="4"
          :maxRows="8"
          required
        />
        
        <CheckboxGroup 
          :options="preferences"
          label="Préférences de contact"
          message="Comment souhaitez-vous être contacté ?"
        />

        <template #footer>
          <div style="display: flex; gap: 1rem; justify-content: flex-end; padding: 1.5rem; background-color: #f8fafc; border-radius: 0.5rem; border: 1px solid #e2e8f0;">
            <Button variant="outline">Annuler</Button>
            <Button variant="primary">Envoyer le message</Button>
          </div>
        </template>
      </FormFields>
    `
  })
}

export const UserProfile: Story = {
  render: () => ({
    components: { FormFields, InputField, SelectBox, RadioGroup, SwitchField, Slider, Button },
    setup() {
      const languages = [
        { value: 'fr', label: 'Français' },
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Español' }
      ]
      
      const themes = [
        { value: 'light', label: 'Clair', description: 'Interface claire' },
        { value: 'dark', label: 'Sombre', description: 'Interface sombre' },
        { value: 'auto', label: 'Automatique', description: 'Suit les préférences système' }
      ]
      
      return { languages, themes, accountTypes }
    },
    template: `
      <FormFields 
        style="width: 500px;" 
        gap="lg" 
        sectionGap="xl"
        role="form" 
        aria-label="Profil utilisateur"
      >
        <template #head>
          <div style="padding: 1.5rem; background-color: #f0f9ff; border-radius: 0.5rem; border: 1px solid #0ea5e9;">
            <h2 style="margin: 0 0 0.5rem 0; color: #0c4a6e; font-size: 1.25rem; font-weight: 600;">
              👤 Profil utilisateur
            </h2>
            <p style="margin: 0; color: #0369a1; font-size: 0.875rem;">
              Personnalisez votre profil et vos préférences
            </p>
          </div>
        </template>

        <InputField 
          label="Nom d'utilisateur"
          placeholder="Choisissez un nom d'utilisateur"
          :prefixIcon="UserIcon"
          required
        />
        
        <InputField 
          type="email"
          label="Email"
          placeholder="votre@email.com"
          :prefixIcon="AtSymbolIcon"
          required
        />
        
        <SelectBox 
          :options="languages"
          label="Langue préférée"
          placeholder="Sélectionnez une langue"
        />
        
        <RadioGroup 
          :options="accountTypes"
          label="Type de compte"
          displayType="inline-card"
          direction="horizontal"
        />
        
        <RadioGroup 
          :options="themes"
          label="Thème"
          displayType="block-card"
        />
        
        <Slider 
          label="Volume des notifications"
          :min="0"
          :max="100"
          :modelValue="75"
          :showValue="true"
          :formatValue="(value) => value + '%'"
          message="Contrôlez le volume des notifications sonores"
        />
        
        <SwitchField 
          label="Profil public"
          leftLabel="Privé"
          rightLabel="Public"
          message="Contrôler la visibilité de votre profil"
        />

        <template #footer>
          <div style="display: flex; gap: 1rem; justify-content: space-between; align-items: center; padding: 1.5rem; background-color: #f8fafc; border-radius: 0.5rem; border: 1px solid #e2e8f0;">
            <p style="margin: 0; font-size: 0.875rem; color: #64748b;">
              Les modifications sont sauvegardées automatiquement
            </p>
            <div style="display: flex; gap: 0.75rem;">
              <Button variant="outline">Réinitialiser</Button>
              <Button variant="primary">Sauvegarder</Button>
            </div>
          </div>
        </template>
      </FormFields>
    `
  })
}

export const HorizontalLayout: Story = {
  render: () => ({
    components: { FormFields, InputField, SelectBox },
    setup() {
      return { countryOptions }
    },
    template: `
      <div style="width: 100%; max-width: 900px;">
        <FormFields direction="horizontal" gap="md" sectionGap="lg">
          <template #head>
            <h3 style="margin: 0; color: #374151; text-align: center;">Adresse de livraison</h3>
          </template>

          <InputField 
            label="Prénom"
            placeholder="Votre prénom"
            required
          />
          
          <InputField 
            label="Nom"
            placeholder="Votre nom"
            required
          />
          
          <SelectBox 
            :options="countryOptions"
            label="Pays"
            placeholder="Pays"
            required
          />

          <template #footer>
            <div style="text-align: center; padding: 1rem; background-color: #f0fdf4; border-radius: 0.375rem; border: 1px solid #22c55e;">
              <p style="margin: 0; font-size: 0.875rem; color: #15803d;">
                ✓ Livraison gratuite pour les commandes de plus de 50€
              </p>
            </div>
          </template>
        </FormFields>
      </div>
    `
  })
}

export const ComplexForm: Story = {
  render: () => ({
    components: { FormFields, InputField, SelectBox, RadioGroup, CheckboxGroup, SwitchField, FileUpload, TextareaField, Slider, Button },
    setup() {
      const skills = [
        { value: 'js', label: 'JavaScript' },
        { value: 'ts', label: 'TypeScript' },
        { value: 'vue', label: 'Vue.js' },
        { value: 'react', label: 'React' }
      ]
      
      const experience = [
        { value: 'junior', label: 'Junior (0-2 ans)', description: 'Débutant dans le domaine' },
        { value: 'mid', label: 'Intermédiaire (2-5 ans)', description: 'Expérience solide' },
        { value: 'senior', label: 'Senior (5+ ans)', description: 'Expert confirmé' }
      ]
      
      const benefits = [
        { value: 'remote', label: 'Télétravail' },
        { value: 'health', label: 'Assurance santé' },
        { value: 'training', label: 'Formation continue' }
      ]
      
      return { skills, experience, benefits, countryOptions }
    },
    template: `
      <FormFields 
        style="width: 600px;" 
        gap="lg" 
        sectionGap="xl"
        size="md"
        role="form" 
        aria-label="Candidature développeur"
      >
        <template #head>
          <div style="text-align: center; padding: 2rem; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); border-radius: 0.75rem; color: white;">
            <h1 style="margin: 0 0 0.5rem 0; font-size: 2rem; font-weight: 700;">
              💼 Candidature Développeur
            </h1>
            <p style="margin: 0; opacity: 0.9; font-size: 1.125rem;">
              Rejoignez notre équipe de développement
            </p>
          </div>
        </template>

        <!-- Informations personnelles -->
        <InputField 
          label="Nom complet"
          placeholder="Entrez votre nom complet"
          required
        />
        
        <InputField 
          type="email"
          label="Email professionnel"
          placeholder="nom@exemple.com"
          required
        />
        
        <SelectBox 
          :options="countryOptions"
          label="Localisation"
          placeholder="Sélectionnez votre pays"
          required
        />
        
        <!-- Compétences -->
        <CheckboxGroup 
          :options="skills"
          label="Compétences techniques"
          displayType="inline-card"
          direction="horizontal"
          :maxSelections="3"
          message="Sélectionnez jusqu'à 3 compétences principales"
        />
        
        <!-- Expérience -->
        <RadioGroup 
          :options="experience"
          label="Niveau d'expérience"
          displayType="block-card"
          required
        />
        
        <!-- Niveau de compétence -->
        <Slider 
          label="Auto-évaluation technique"
          :min="1"
          :max="10"
          :modelValue="6"
          :showValue="true"
          :showTicks="true"
          :showLabels="true"
          :formatValue="(value) => value + '/10'"
          message="Évaluez votre niveau technique global"
        />
        
        <!-- Avantages souhaités -->
        <CheckboxGroup 
          :options="benefits"
          label="Avantages souhaités"
          message="Quels avantages vous intéressent le plus ?"
        />
        
        <!-- CV -->
        <FileUpload 
          label="CV (obligatoire)"
          accept=".pdf,.doc,.docx"
          :maxSize="5 * 1024 * 1024"
          :maxFiles="1"
          required
          placeholder="Téléchargez votre CV"
          message="Format PDF ou Word, maximum 5MB"
        />
        
        <!-- Lettre de motivation -->
        <TextareaField 
          label="Lettre de motivation"
          placeholder="Expliquez pourquoi vous souhaitez rejoindre notre équipe..."
          :maxLength="2000"
          :showCounter="true"
          :autoResize="true"
          :minRows="4"
          :maxRows="8"
          message="Partagez votre motivation et vos objectifs"
        />
        
        <!-- Disponibilité -->
        <SwitchField 
          label="Disponibilité immédiate"
          rightLabel="Disponible"
          message="Pouvez-vous commencer dans les 2 semaines ?"
        />

        <template #footer>
          <div style="padding: 2rem; background-color: #f8fafc; border-radius: 0.75rem; border: 1px solid #e2e8f0;">
            <div style="margin-bottom: 1.5rem; padding: 1rem; background-color: #fef3c7; border-radius: 0.5rem; border: 1px solid #f59e0b;">
              <p style="margin: 0; font-size: 0.875rem; color: #92400e;">
                ⚠️ Assurez-vous que toutes les informations sont correctes avant de soumettre votre candidature.
              </p>
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: space-between; align-items: center;">
              <p style="margin: 0; font-size: 0.875rem; color: #64748b;">
                En soumettant ce formulaire, vous acceptez nos 
                <a href="#" style="color: #3b82f6; text-decoration: underline;">conditions d'utilisation</a>
              </p>
              <div style="display: flex; gap: 0.75rem;">
                <Button variant="outline">Sauvegarder le brouillon</Button>
                <Button variant="primary">Soumettre la candidature</Button>
              </div>
            </div>
          </div>
        </template>
      </FormFields>
    `
  })
}

export const WithAccessibility: Story = {
  render: () => ({
    components: { FormFields, InputField, SwitchField, Button },
    template: `
      <div style="display: flex; flex-direction: column; gap: 3rem; align-items: flex-start;">
        <div>
          <h4 style="margin-bottom: 1rem;">Formulaire avec rôle form</h4>
          <FormFields 
            style="width: 400px;"
            role="form" 
            aria-label="Paramètres de compte"
          >
            <InputField label="Nom d'utilisateur" placeholder="Votre nom d'utilisateur" />
            <SwitchField label="Notifications" rightLabel="Activées" />
          </FormFields>
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem;">Section avec description</h4>
          <FormFields 
            style="width: 400px;"
            role="group" 
            aria-label="Informations de sécurité"
            aria-describedby="security-description"
          >
            <template #head>
              <div id="security-description" style="padding: 1rem; background-color: #fef2f2; border-radius: 0.375rem; border: 1px solid #fca5a5;">
                <p style="margin: 0; font-size: 0.875rem; color: #991b1b;">
                  🔒 Ces informations sont utilisées pour sécuriser votre compte
                </p>
              </div>
            </template>
            
            <InputField type="password" label="Mot de passe actuel" placeholder="••••••••" />
            <InputField type="password" label="Nouveau mot de passe" placeholder="••••••••" />
            <SwitchField label="Authentification à deux facteurs" rightLabel="Activée" />
            
            <template #footer>
              <Button variant="primary" block>Mettre à jour la sécurité</Button>
            </template>
          </FormFields>
        </div>
      </div>
    `
  })
}

export const ResponsiveForm: Story = {
  render: () => ({
    components: { FormFields, InputField, SelectBox, Button },
    setup() {
      return { countryOptions }
    },
    template: `
      <div style="width: 100%; max-width: 1000px;">
        <h4 style="margin-bottom: 1rem;">Formulaire responsive (horizontal → vertical sur mobile)</h4>
        <FormFields direction="horizontal" gap="md" sectionGap="lg">
          <template #head>
            <div style="text-align: center; padding: 1rem; background-color: #f0f9ff; border-radius: 0.5rem; border: 1px solid #0ea5e9;">
              <h3 style="margin: 0; color: #0c4a6e;">Informations de facturation</h3>
            </div>
          </template>

          <InputField 
            label="Prénom"
            placeholder="Prénom"
            required
          />
          
          <InputField 
            label="Nom"
            placeholder="Nom"
            required
          />
          
          <InputField 
            label="Code postal"
            placeholder="12345"
            required
          />
          
          <SelectBox 
            :options="countryOptions"
            label="Pays"
            placeholder="Pays"
            required
          />

          <template #footer>
            <div style="text-align: center; padding: 1rem;">
              <Button variant="primary">Valider l'adresse</Button>
            </div>
          </template>
        </FormFields>
      </div>
    `
  })
}