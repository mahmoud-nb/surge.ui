# Mise en page

Les layouts (couche *templates* de l'Atomic Design) structurent une page ou une section : ils placent des zones, exposées sous forme de **slots**, et ne dessinent rien d'autre. Couleurs, cartes et typographie restent du ressort des composants que vous y placez.

## Choisir un layout

| Type de page | Usage | Composant |
|--------------|-------|-----------|
| Une colonne | Articles, blogs, formulaires, mobile | [SingleColumnLayout](/components/singlecolumnlayout) |
| Deux colonnes | Documentation, tableaux de bord, administration | [SidebarLayout](/components/sidebarlayout) |
| Écran partagé | Visuel + argumentaire, comparaison A / B | [SplitLayout](/components/splitlayout) |
| Asymétrique | Portfolios, campagnes | [SplitLayout](/components/splitlayout#asymetrique) avec `ratio="3:2"` ou `"2:1"` |
| Holy Grail | Applications : navigation, contenu, compléments | [HolyGrailLayout](/components/holygraillayout) |
| Magazine | Sites d'actualité, hiérarchie d'articles | [MagazineLayout](/components/magazinelayout) |
| Grille | Listes de produits, galeries, tableaux de bord | [GridLayout](/components/gridlayout) |
| Masonry | Fils de médias de hauteurs variables | [MasonryLayout](/components/masonrylayout) |
| Hero | Lancements de produit, inscriptions | [HeroLayout](/components/herolayout) |
| Plein écran | Récits, une idée par écran | [FullScreenLayout](/components/fullscreenlayout) |

### Et les parcours en F et en Z ?

Ce sont des **modèles de lecture**, pas des structures : ils se construisent avec les layouts ci-dessus.

- **Parcours en F** (pages que l'on survole) : un [SingleColumnLayout](/components/singlecolumnlayout) dont les titres, intertitres et listes placent l'information importante en début de ligne.
- **Parcours en Z** (page d'atterrissage avec un seul appel à l'action) : un [HeroLayout](/components/herolayout), puis des [SplitLayout](/components/splitlayout#parcours-en-z) qui alternent `reverse` pour faire passer le regard d'un côté à l'autre.

## Principes communs

### Mobile first

Chaque layout commence empilé, en une colonne, puis ajoute des colonnes quand la place le permet. Aucune règle n'est nécessaire pour le mobile.

### Selon la largeur du conteneur

Les colonnes apparaissent selon la largeur **du layout lui-même** (*container queries*), pas celle de l'écran. Un layout placé dans un panneau étroit ou une colonne de tableau de bord reste donc empilé, même sur un grand écran.

| Seuil | Largeur du conteneur |
|-------|----------------------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

Les démos de ces pages sont dans un cadre qui simule un conteneur de 375px (Mobile), 768px (Tablette) ou 1024px (Bureau). Le cadre est réduit à l'affichage pour tenir dans la page, sans changer la largeur vue par les layouts.

### Ordre de lecture

L'ordre du DOM suit l'ordre visuel : la lecture par un lecteur d'écran et la navigation au clavier restent cohérentes. Seule exception documentée : `reverse` du SplitLayout, qui n'inverse que l'affichage en colonnes.

### Écarts

Tous les layouts acceptent `gap` : `none`, `sm` (8px), `md` (16px), `lg` (24px) ou `xl` (32px). La valeur est aussi exposée en CSS par `--su-layout-gap`, réutilisable dans vos propres grilles.

### Imbrication

Les layouts se combinent : un `SidebarLayout` dans le contenu d'un `HolyGrailLayout`, un `MasonryLayout` dans une zone de `SplitLayout`… Chacun s'adapte à la place qu'on lui donne.

```vue
<SuHolyGrailLayout>
  <template #header>…</template>
  <template #nav>…</template>

  <SuSidebarLayout sidebar-position="end" sidebar-tag="nav" sidebar-label="Sur cette page">
    <template #sidebar>Sommaire</template>
    Article
  </SuSidebarLayout>
</SuHolyGrailLayout>
```
