<script setup lang="ts">
import Button from '../atoms/Button.vue'
import Link from '../atoms/Link.vue'
import ButtonGroup from '../molecules/ButtonGroup.vue'
import LinkGroup from '../molecules/LinkGroup.vue'
import FloatButton from '../molecules/FloatButton.vue'
import Dropdown from '../molecules/Dropdown.vue'
import Panel from '../atoms/Panel.vue'
import Heading from '../atoms/Heading.vue'
import { 
  PlusIcon, 
  ArrowRightIcon, 
  HeartIcon,
  HomeIcon,
  UserIcon,
  CogIcon,
  TrashIcon,
  DocumentIcon,
  ChatBubbleLeftIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  EllipsisHorizontalIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  PrinterIcon,
  EnvelopeIcon,
  BellIcon
} from '@heroicons/vue/24/outline'
import Grid from '../templates/Grid.vue'
import GridCell from '../templates/GridCell.vue'
import Preview from './Preview.vue'
import GlobalPreview from './GlobalPreview.vue'
import { ref } from 'vue'

// État pour les dropdowns et interactions
const userMenuOptions = ref([
  { value: 'profile', label: 'Mon profil', icon: UserIcon },
  { value: 'settings', label: 'Paramètres', icon: CogIcon },
  { value: 'separator1', separator: true },
  { value: 'logout', label: 'Déconnexion', icon: ArrowRightIcon }
])

const documentMenuOptions = ref([
  { value: 'new', label: 'Nouveau', icon: PlusIcon },
  { value: 'open', label: 'Ouvrir', icon: DocumentIcon },
  { value: 'save', label: 'Enregistrer', icon: ArrowDownTrayIcon },
  { value: 'separator1', separator: true },
  { value: 'delete', label: 'Supprimer', icon: TrashIcon }
])

const moreActionsOptions = ref([
  { value: 'edit', label: 'Éditer', icon: PencilIcon },
  { value: 'share', label: 'Partager', icon: ShareIcon },
  { value: 'print', label: 'Imprimer', icon: PrinterIcon },
  { value: 'separator1', separator: true },
  { value: 'duplicate', label: 'Dupliquer' },
  { value: 'archive', label: 'Archiver' }
])

const handleSelectAction = (option: any) => {
  console.log('Action sélectionnée:', option.label || option.value)
}
</script>

<template>
  <GlobalPreview>
    <template #head>
      <h2>Actions</h2>
    </template>
    <div class="su-actions">
      <!-- BARRE D'ACTIONS / TOOLBAR -->
      <div class="section">
        <h3>Barre d'actions (Toolbar)</h3>
        <Grid view-mode="list">
          <GridCell
            radius="md"
            background-color="#F9F9F9"
            padding="md"
          >
            <Preview title="Barre d'outils document">
              <Panel>
                <template #head>
                  <Heading level="4">
                    Éditeur de document
                  </Heading>
                </template>
                <div class="toolbar">
                  <ButtonGroup
                    gap="none"
                    variant="outline"
                  >
                    <Button
                      :icon="PlusIcon"
                      icon-display="only"
                      aria-label="Nouveau"
                    />
                    <Button
                      :icon="DocumentIcon"
                      icon-display="only"
                      aria-label="Ouvrir"
                    />
                    <Button
                      :icon="ArrowDownTrayIcon"
                      icon-display="only"
                      aria-label="Télécharger"
                    />
                  </ButtonGroup>
                  <div style="flex: 1;" />
                  <ButtonGroup
                    gap="none"
                    variant="outline"
                  >
                    <Button
                      :icon="PencilIcon"
                      icon-display="only"
                      aria-label="Éditer"
                    />
                    <Button
                      :icon="PrinterIcon"
                      icon-display="only"
                      aria-label="Imprimer"
                    />
                    <Button
                      :icon="ShareIcon"
                      icon-display="only"
                      aria-label="Partager"
                    />
                  </ButtonGroup>
                </div>
                <p style="margin-top: 1rem; font-size: 0.875rem; color: #666;">
                  Ceci est une barre d'outils typique avec des actions groupées et espacées.
                </p>
              </Panel>
            </Preview>
          </GridCell>
        </Grid>
      </div>

      <!-- ACTIONS DE FORMULAIRE -->
      <div class="section">
        <h3>Actions de formulaire</h3>
        <Grid view-mode="list">
          <GridCell
            radius="md"
            background-color="#F9F9F9"
            padding="md"
          >
            <Preview title="Boutons de confirmation">
              <Panel>
                <Heading level="4">
                  Formulaire de contact
                </Heading>
                <p style="color: #666; font-size: 0.875rem; margin: 1rem 0;">
                  Remplissez le formulaire et cliquez sur Envoyer pour soumettre votre demande.
                </p>
                <div class="form-actions">
                  <Button variant="primary">
                    Envoyer
                  </Button>
                  <Button variant="outline">
                    Annuler
                  </Button>
                </div>
              </Panel>
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
            padding="md"
          >
            <Preview title="Actions avec destructive">
              <Panel>
                <Heading level="4">
                  Suppression d'élément
                </Heading>
                <p style="color: #666; font-size: 0.875rem; margin: 1rem 0;">
                  Êtes-vous sûr de vouloir supprimer cet élément?
                </p>
                <div class="form-actions">
                  <Button variant="primary">
                    Confirmer la suppression
                  </Button>
                  <Button variant="ghost">
                    Annuler
                  </Button>
                </div>
              </Panel>
            </Preview>
          </GridCell>
        </Grid>
      </div>

      <!-- MENU UTILISATEUR / PROFIL -->
      <div class="section">
        <h3>Menu utilisateur (User Menu)</h3>
        <Grid view-mode="list">
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Menu utilisateur avec icônes">
              <div class="menu-demo">
                <Dropdown
                  :options="userMenuOptions"
                  label="John Doe"
                  :icon="UserIcon"
                  @select="handleSelectAction"
                />
              </div>
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Menu paramètres">
              <div class="menu-demo">
                <Dropdown
                  :options="moreActionsOptions"
                  :icon="EllipsisHorizontalIcon"
                  icon-display="only"
                  aria-label="Plus d'options"
                  @select="handleSelectAction"
                />
              </div>
            </Preview>
          </GridCell>
        </Grid>
      </div>

      <!-- MENU DE DOCUMENT -->
      <div class="section">
        <h3>Menu de document (Document Menu)</h3>
        <Grid view-mode="list">
          <GridCell
            radius="md"
            background-color="#F9F9F9"
            padding="md"
          >
            <Preview title="Menu Fichier simple">
              <Dropdown
                :options="documentMenuOptions"
                label="Fichier"
                variant="primary"
                @select="handleSelectAction"
              />
            </Preview>
          </GridCell>
        </Grid>
      </div>

      <!-- NAVIGATION PAR LIENS -->
      <div class="section">
        <h3>Navigation par liens (Navigation Links)</h3>
        <Grid view-mode="list">
          <GridCell
            radius="md"
            background-color="#F9F9F9"
            padding="md"
          >
            <Preview title="Navigation horizontale">
              <LinkGroup
                gap="md"
                variant="primary"
              >
                <Link href="#">
                  Accueil
                </Link>
                <Link href="#">
                  À propos
                </Link>
                <Link href="#">
                  Services
                </Link>
                <Link href="#">
                  Blog
                </Link>
                <Link href="#">
                  Contact
                </Link>
              </LinkGroup>
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
            padding="md"
          >
            <Preview title="Navigation avec séparateurs">
              <LinkGroup
                gap="md"
                separator="dot"
                variant="secondary"
              >
                <Link href="#">
                  Accueil
                </Link>
                <Link href="#">
                  Documentation
                </Link>
                <Link href="#">
                  GitHub
                </Link>
                <Link href="#">
                  Support
                </Link>
              </LinkGroup>
            </Preview>
          </GridCell>
        </Grid>
      </div>

      <!-- ACTIONS DE LIGNE (ROW ACTIONS) -->
      <div class="section">
        <h3>Actions de ligne (Row Actions)</h3>
        <Grid view-mode="list">
          <GridCell
            radius="md"
            background-color="#F9F9F9"
            padding="md"
          >
            <Preview title="Actions de tableau">
              <div class="row-actions-demo">
                <div class="table-row">
                  <div class="row-info">
                    <strong>Document: Proposition.pdf</strong>
                    <small style="color: #999;">Modifié le 15 Mars 2025</small>
                  </div>
                  <div class="row-actions">
                    <Button
                      variant="ghost"
                      size="sm"
                      :icon="PencilIcon"
                      icon-display="only"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      :icon="ShareIcon"
                      icon-display="only"
                    />
                    <Dropdown
                      :options="moreActionsOptions"
                      :icon="EllipsisHorizontalIcon"
                      icon-display="only"
                      variant="ghost"
                      @select="handleSelectAction"
                    />
                  </div>
                </div>
              </div>
            </Preview>
          </GridCell>
        </Grid>
      </div>

      <!-- GROUPE D'ACTIONS PAR CATÉGORIE -->
      <div class="section">
        <h3>Actions groupées par contexte</h3>
        <Grid view-mode="list">
          <GridCell
            radius="md"
            background-color="#F9F9F9"
            padding="md"
          >
            <Preview title="Actions de création">
              <div>
                <Heading level="5">
                  Créer un nouveau
                </Heading>
                <ButtonGroup
                  gap="md"
                  style="margin-top: 1rem;"
                >
                  <Button
                    variant="primary"
                    :icon="PlusIcon"
                    icon-display="left"
                  >
                    Nouveau projet
                  </Button>
                  <Button
                    variant="secondary"
                    :icon="DocumentIcon"
                    icon-display="left"
                  >
                    Nouveau document
                  </Button>
                  <Button
                    variant="outline"
                    :icon="UserIcon"
                    icon-display="left"
                  >
                    Nouvel utilisateur
                  </Button>
                </ButtonGroup>
              </div>
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
            padding="md"
          >
            <Preview title="Actions de gestion">
              <div>
                <Heading level="5">
                  Gérer les éléments
                </Heading>
                <ButtonGroup
                  gap="sm"
                  style="margin-top: 1rem;"
                  variant="outline"
                >
                  <Button
                    :icon="PencilIcon"
                    icon-display="left"
                    size="sm"
                  >
                    Éditer
                  </Button>
                  <Button
                    :icon="TrashIcon"
                    icon-display="left"
                    size="sm"
                  >
                    Supprimer
                  </Button>
                  <Button
                    :icon="ArrowDownTrayIcon"
                    icon-display="left"
                    size="sm"
                  >
                    Télécharger
                  </Button>
                </ButtonGroup>
              </div>
            </Preview>
          </GridCell>
        </Grid>
      </div>

      <!-- ACTIONS FLOTTANTES -->
      <div class="section">
        <h3>Boutons flottants (Floating Actions)</h3>
        <Grid view-mode="list">
          <GridCell
            radius="md"
            background-color="#F9F9F9"
            padding="md"
          >
            <Preview title="FAB positif">
              <div style="height: 200px; position: relative; background: #f5f5f5; border-radius: 0.5rem;">
                <p style="padding: 1rem; color: #999; font-size: 0.875rem;">
                  Zone interactive avec FAB en bas à droite
                </p>
                <FloatButton
                  :icon="PlusIcon"
                  label="Ajouter"
                  position="right"
                  variant="primary"
                />
              </div>
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
            padding="md"
          >
            <Preview title="FAB avec notification">
              <div style="height: 200px; position: relative; background: #f5f5f5; border-radius: 0.5rem;">
                <p style="padding: 1rem; color: #999; font-size: 0.875rem;">
                  FAB avec badge de notification
                </p>
                <FloatButton
                  :icon="BellIcon"
                  label="Notifications"
                  badge="5"
                  position="right"
                  variant="primary"
                />
              </div>
            </Preview>
          </GridCell>
        </Grid>
      </div>

      <!-- ACTIONS CONTEXTUELLES -->
      <div class="section">
        <h3>Barre d'actions contextuelle</h3>
        <Grid view-mode="list">
          <GridCell
            radius="md"
            background-color="#F9F9F9"
            padding="md"
          >
            <Preview title="Actions de sélection">
              <Panel class="selection-bar">
                <div style="display: flex; align-items: center; gap: 1rem; justify-content: space-between;">
                  <div style="font-weight: 500;">
                    3 éléments sélectionnés
                  </div>
                  <ButtonGroup gap="sm">
                    <Button
                      variant="secondary"
                      size="sm"
                    >
                      Partager
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      :icon="TrashIcon"
                      icon-display="left"
                    >
                      Supprimer
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                    >
                      Annuler
                    </Button>
                  </ButtonGroup>
                </div>
              </Panel>
            </Preview>
          </GridCell>
        </Grid>
      </div>
    </div>
  </GlobalPreview>
</template>

<style scoped>
.su-actions {
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

/* Toolbar styles */
.toolbar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: #f5f5f5;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

/* Menu demo */
.menu-demo {
  padding: 1rem;
  text-align: center;
}

/* Form actions */
.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

/* Row actions demo */
.row-actions-demo {
  width: 100%;
}

.table-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background-color: #fafafa;
}

.row-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.row-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

/* Selection bar */
.selection-bar {
  background-color: #eff6ff;
  border: 1px solid #bfdbfe;
}

@media (width <= 768px) {
  .su-actions {
    padding: 1rem;
  }

  .toolbar {
    flex-wrap: wrap;
  }

  .form-actions {
    flex-direction: column;
  }

  .table-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .row-actions {
    width: 100%;
  }
}
</style>