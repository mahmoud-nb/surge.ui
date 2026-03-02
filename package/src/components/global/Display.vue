<script setup lang="ts">
import { ref, computed } from 'vue'
import Heading from '../atoms/Heading.vue'
import Panel from '../atoms/Panel.vue'
import Image from '../atoms/Image.vue'
import Avatar from '../atoms/Avatar.vue'
import Badge from '../atoms/Badge.vue'
import Progress from '../atoms/Progress.vue'
import Spinner from '../atoms/Spinner.vue'
import AvatarGroup from '../molecules/AvatarGroup.vue'
import Dialog from '../organisms/Dialog.vue'
import Alert from '../organisms/Alert.vue'
import Tabs from '../organisms/Tabs.vue'
import Accordion from '../organisms/Accordion.vue'
import AccordionItem from '../molecules/AccordionItem.vue'
import Button from '../atoms/Button.vue'
import Grid from '../templates/Grid.vue'
import GridCell from '../templates/GridCell.vue'
import Preview from './Preview.vue'
import GlobalPreview from './GlobalPreview.vue'
import {
  CheckIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
  StarIcon
} from '@heroicons/vue/24/outline'

// État pour les dialogs et interactions
const dialogOpen = ref(false)
const tabsData = ref([
  {
    label: 'Aperçu',
    content: 'Bienvenue dans la section aperçu. Vous trouverez ici une vue d\'ensemble des contenus.'
  },
  {
    label: 'Détails',
    content: 'Cette section contient les détails supplémentaires des éléments affichés.'
  },
  {
    label: 'Paramètres',
    content: 'Configurez vos préférences et paramètres dans cette section.'
  }
])

const accordionItems = ref([
  {
    id: 'acc-1',
    title: 'Qu\'est-ce qu\'un composant Display?',
    content: 'Les composants Display sont conçus pour présenter des informations à l\'utilisateur de manière visuelle et organisée.'
  },
  {
    id: 'acc-2',
    title: 'Comment utiliser les Heading?',
    content: 'Les Heading rendus une balise de titre (h1–h6) stylisée selon le niveau et la couleur.'
  },
  {
    id: 'acc-3',
    title: 'Quand utiliser les Dialogs?',
    content: 'Utilisez les Dialogs pour afficher le contenu important ou pour demander une action de l\'utilisateur qui nécessite sa confirmation.'
  },
  {
    id: 'acc-4',
    title: 'Comment styliser les Panels?',
    content: 'Les Panels supportent plusieurs variantes visuelles et peuvent être bordés ou surélevés avec une ombre portée.'
  }
])

const teamAvatars = ref([
  {
    id: '1',
    name: 'Alice Johnson',
    alt: 'Alice Johnson',
    status: 'online',
    src: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '2',
    name: 'Bob Smith',
    alt: 'Bob Smith',
    status: 'away',
    badge: '2'
  },
  {
    id: '3',
    name: 'Claire Davis',
    alt: 'Claire Davis',
    status: 'online',
    src: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '4',
    name: 'David Wilson',
    alt: 'David Wilson',
    status: 'offline',
    badge: '1'
  }
])

const progressValue = ref(65)
const spinnerTypes = ['classic', 'modern', 'dots', 'pulse', 'bars'] as const
</script>

<template>
  <GlobalPreview>
    <template #head>
      <h2>Display</h2>
    </template>
    <div class="su-display">
      <!-- HEADING -->
      <div class="section">
        <h3>Titres - Niveaux et variantes</h3>
        <Grid view-mode="list">
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Niveau 1 (h1)">
              <Heading
                level="1"
                variant="primary"
              >
                Ceci est un titre h1
              </Heading>
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Niveau 2 (h2)">
              <Heading
                level="2"
                variant="primary"
              >
                Ceci est un titre h2
              </Heading>
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Niveau 3 (h3)">
              <Heading
                level="3"
                variant="secondary"
              >
                Ceci est un titre h3
              </Heading>
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Niveau 4 (h4)">
              <Heading
                level="4"
                variant="tertiary"
              >
                Ceci est un titre h4
              </Heading>
            </Preview>
          </GridCell>
        </Grid>
      </div>

      <!-- IMAGE -->
      <div class="section">
        <h3>Images - Ratios et comportements</h3>
        <Grid view-mode="list">
          <GridCell
            radius="md"
            background-color="#F9F9F9"
            padding="md"
          >
            <Preview title="Ratio 16/9">
              <Image
                src="https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Mountain landscape"
                ratio="16/9"
              />
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
            padding="md"
          >
            <Preview title="Ratio 1/1">
              <Image
                src="https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=300"
                alt="Mountain landscape"
                ratio="1/1"
              />
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
            padding="md"
          >
            <Preview title="Ratio 4/3">
              <Image
                src="https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Mountain landscape"
                ratio="4/3"
              />
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
            padding="md"
          >
            <Preview title="Fit: cover">
              <Image
                src="https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Mountain landscape"
                ratio="16/9"
                fit="cover"
              />
            </Preview>
          </GridCell>
        </Grid>
      </div>

      <!-- PANEL -->
      <div class="section">
        <h3>Panels - Variantes et styles</h3>
        <Grid view-mode="list">
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Panel standard">
              <Panel variant="default">
                <template #head>
                  <Heading level="4">
                    Titre du panel
                  </Heading>
                </template>
                <p>Contenu principal du panel. Vous pouvez placer n'importe quel contenu ici.</p>
                <template #footer>
                  <small>Pied du panel</small>
                </template>
              </Panel>
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Panel bordé">
              <Panel
                variant="default"
                bordered
              >
                <template #head>
                  <Heading level="4">
                    Panel avec bordure
                  </Heading>
                </template>
                <p>Ce panel a une bordure visible autour de lui.</p>
                <template #footer>
                  <small>Informations supplémentaires</small>
                </template>
              </Panel>
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Panel surélevé">
              <Panel
                variant="default"
                elevated
              >
                <template #head>
                  <Heading level="4">
                    Panel avec ombre
                  </Heading>
                </template>
                <p>Ce panel a une ombre portée pour créer un effet de profondeur.</p>
                <template #footer>
                  <small>Détails du panel</small>
                </template>
              </Panel>
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Panel surélevé et bordé">
              <Panel
                variant="highlight"
                bordered
                elevated
              >
                <template #head>
                  <Heading level="4">
                    Panel complet
                  </Heading>
                </template>
                <p>Ce panel combine le style surélevé et bordé pour plus de visibilité.</p>
                <template #footer>
                  <small>Variang: highlight</small>
                </template>
              </Panel>
            </Preview>
          </GridCell>
        </Grid>
      </div>

      <!-- AVATAR -->
      <div class="section">
        <h3>Avatars - Tailles et variantes</h3>
        <Grid>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Extra petite">
              <Avatar
                name="Alice"
                size="xs"
                variant="circle"
                status="online"
              />
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Petite">
              <Avatar
                name="Bob"
                size="sm"
                variant="rounded"
                status="away"
              />
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Moyen avec image">
              <Avatar
                src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100"
                name="Claire"
                alt="Claire"
                size="md"
                variant="circle"
                status="online"
              />
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Large avec badge">
              <Avatar
                name="David"
                size="lg"
                variant="rounded"
                badge="3"
                status="offline"
              />
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Extra large carré">
              <Avatar
                name="Emma"
                size="xl"
                variant="square"
                status="busy"
              />
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="2XL">
              <Avatar
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
                name="Frank"
                alt="Frank"
                size="2xl"
                variant="circle"
              />
            </Preview>
          </GridCell>
        </Grid>
      </div>

      <!-- AVATAR GROUP -->
      <div class="section">
        <h3>Groupes d'avatars</h3>
        <Grid view-mode="list">
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Groupe complet">
              <AvatarGroup
                :avatars="teamAvatars"
                size="md"
                variant="circle"
                spacing="md"
              />
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Maximum 3 avatars">
              <AvatarGroup
                :avatars="teamAvatars"
                size="md"
                variant="circle"
                spacing="md"
                :max="3"
              />
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Taille petite, espacés">
              <AvatarGroup
                :avatars="teamAvatars"
                size="sm"
                variant="rounded"
                spacing="lg"
              />
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Taille large">
              <AvatarGroup
                :avatars="teamAvatars"
                size="lg"
                variant="rounded"
                spacing="sm"
                :max="2"
              />
            </Preview>
          </GridCell>
        </Grid>
      </div>

      <!-- BADGE -->
      <div class="section">
        <h3>Badges - Variantes et tailles</h3>
        <Grid>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Défaut">
              <Badge variant="default">
                Badge
              </Badge>
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Primary">
              <Badge variant="primary">
                Primary
              </Badge>
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Secondary">
              <Badge variant="secondary">
                Secondary
              </Badge>
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Success">
              <Badge variant="success">
                Success
              </Badge>
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Warning">
              <Badge variant="warning">
                Warning
              </Badge>
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Error">
              <Badge variant="error">
                Error
              </Badge>
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Petit">
              <Badge size="sm">
                Petit
              </Badge>
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Moyen">
              <Badge size="md">
                Moyen
              </Badge>
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Grand">
              <Badge size="lg">
                Grand
              </Badge>
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Avec icône">
              <Badge
                variant="success"
                :icon="CheckIcon"
                icon-display="left"
              >
                Complété
              </Badge>
            </Preview>
          </GridCell>
        </Grid>
      </div>

      <!-- ALERT -->
      <div class="section">
        <h3>Alertes - Types et états</h3>
        <Grid view-mode="list">
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Info">
              <Alert
                type="info"
                title="Information"
                description="Ceci est un message d'information pour l'utilisateur."
                dismissible
              />
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Success">
              <Alert
                type="success"
                title="Succès"
                description="L'opération a été réalisée avec succès."
                dismissible
              />
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Warning">
              <Alert
                type="warning"
                title="Attention"
                description="Veuillez prêter attention à ce message important."
                dismissible
              />
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Error">
              <Alert
                type="error"
                title="Erreur"
                description="Une erreur s'est produite lors du traitement de votre demande."
                dismissible
              />
            </Preview>
          </GridCell>
        </Grid>
      </div>

      <!-- PROGRESS -->
      <div class="section">
        <h3>Barre de progression - États et tailles</h3>
        <Grid view-mode="list">
          <GridCell
            radius="md"
            background-color="#F9F9F9"
            padding="md"
          >
            <Preview title="Petit">
              <Progress
                :model-value="40"
                size="sm"
                state="default"
                show-label
              />
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
            padding="md"
          >
            <Preview title="Moyen">
              <Progress
                :model-value="65"
                size="md"
                state="default"
                show-label
              />
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
            padding="md"
          >
            <Preview title="Grand">
              <Progress
                :model-value="90"
                size="lg"
                state="default"
                show-label
              />
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
            padding="md"
          >
            <Preview title="Succès">
              <Progress
                :model-value="100"
                size="md"
                state="success"
                show-label
              />
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
            padding="md"
          >
            <Preview title="Avertissement">
              <Progress
                :model-value="75"
                size="md"
                state="warning"
                show-label
              />
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
            padding="md"
          >
            <Preview title="Erreur">
              <Progress
                :model-value="25"
                size="md"
                state="error"
                show-label
              />
            </Preview>
          </GridCell>
        </Grid>
      </div>

      <!-- SPINNER -->
      <div class="section">
        <h3>Spinners - Types d'animations</h3>
        <Grid>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Classic">
              <Spinner
                type="classic"
                size="48"
                label="Chargement..."
                show-label
              />
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Modern">
              <Spinner
                type="modern"
                size="48"
                label="Chargement..."
                show-label
              />
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Dots">
              <Spinner
                type="dots"
                size="48"
                label="Chargement..."
                show-label
              />
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Pulse">
              <Spinner
                type="pulse"
                size="48"
                label="Chargement..."
                show-label
              />
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Bars">
              <Spinner
                type="bars"
                size="48"
                label="Chargement..."
                show-label
              />
            </Preview>
          </GridCell>
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Custom color">
              <Spinner
                type="classic"
                size="48"
                color="#3b82f6"
                label="Chargement..."
                show-label
              />
            </Preview>
          </GridCell>
        </Grid>
      </div>

      <!-- TABS -->
      <div class="section">
        <h3>Onglets - Navigation par tabulation</h3>
        <Grid view-mode="list">
          <GridCell
            radius="md"
            background-color="#F9F9F9"
            padding="md"
          >
            <Preview title="Onglets basiques">
              <Tabs :tabs="tabsData" />
            </Preview>
          </GridCell>
        </Grid>
      </div>

      <!-- ACCORDION -->
      <div class="section">
        <h3>Accordéon - Sections dépliables</h3>
        <Grid view-mode="list">
          <GridCell
            radius="md"
            background-color="#F9F9F9"
            padding="md"
          >
            <Preview title="Accordéon simple">
              <Accordion
                :items="accordionItems"
                :multiple="true"
                gap="md"
                level="3"
              />
            </Preview>
          </GridCell>
        </Grid>
      </div>

      <!-- DIALOG -->
      <div class="section">
        <h3>Dialogs - Modales et tiroirs</h3>
        <Grid view-mode="list">
          <GridCell
            radius="md"
            background-color="#F9F9F9"
          >
            <Preview title="Dialog centré">
              <Button
                variant="primary"
                @click="dialogOpen = true"
              >
                Ouvrir le Dialog
              </Button>
              <Dialog
                v-model="dialogOpen"
                display="center"
                title="Titre du Dialog"
                description="Ceci est le contenu principal du Dialog."
              >
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <template #footer>
                  <Button
                    variant="primary"
                    @click="dialogOpen = false"
                  >
                    Fermer
                  </Button>
                </template>
              </Dialog>
            </Preview>
          </GridCell>
        </Grid>
      </div>
    </div>
  </GlobalPreview>
</template>

<style scoped>
.su-display {
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
</style>
