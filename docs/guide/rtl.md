# RTL (droite à gauche)

SurgeUI prend en charge les langues qui s'écrivent de droite à gauche : arabe, hébreu, persan, ourdou. Les composants suivent le sens de lecture sans configuration.

## Activer le RTL

Posez `dir="rtl"` sur `<html>` pour toute la page, ou sur un conteneur pour une seule zone. Indiquez aussi la langue avec `lang` :

```html
<html lang="ar" dir="rtl">
```

Le sens peut changer sans recharger la page (sélecteur de langue) : les composants se recalent, y compris l'indicateur des onglets et les curseurs.

Pour les textes par défaut des composants en arabe, utilisez la locale fournie, ou `'auto'` qui suit `<html lang>` :

```ts
import SurgeUI from '@surgeui/vue'

app.use(SurgeUI, { locale: 'auto' })
```

Voir [useLocale](/composables/uselocale) pour la locale arabe et ses chiffres.

## Ce qui se retourne

- **Mise en page** : les composants utilisent des propriétés logiques (`margin-inline`, `padding-inline`, `inset-inline`, `text-align: start`). Marges, bordures, icônes de début et de fin suivent le sens.
- **Clavier** : les flèches gauche et droite s'inversent dans les listes horizontales (Tabs, menus), le Calendar et le Slider. Dans un Slider, la valeur croît de droite à gauche : la flèche droite la diminue.
- **Positions `start` et `end`** : le Toaster (`bottom-end` par défaut), le FloatButton (`end`), la pastille de statut de l'Avatar et les badges posés sur un élément passent du côté opposé. Les anciennes valeurs `left` et `right` sont des alias de `start` et `end`.
- **Icônes directionnelles** des composants (flèches du Calendar, de la Pagination, chevrons du Breadcrumb) : retournées.
- **Dialogs** : rendus dans `<body>`, ils reprennent le `dir` et la `lang` de leur emplacement d'origine.

## Vos icônes directionnelles

Une flèche « suivant » doit pointer vers la gauche en RTL. Ajoutez la classe `su-flip-rtl` aux icônes qui indiquent une direction :

```vue
<SuButton :icon="ArrowRightIcon" icon-display="right">
  Suivant
</SuButton>

<ArrowRightIcon class="su-flip-rtl" />
```

Ne retournez pas les icônes sans direction (coche, horloge, logo, lecture vidéo).

## Dates et nombres

- La locale `ar` donne des chiffres latins (123) ; `ar-EG` ou `ar-SA` des chiffres arabes-indiens (١٢٣). Le DatePicker relit les deux.
- Le premier jour de la semaine suit la région : samedi pour `ar` et `ar-EG`, dimanche pour `ar-SA`.

## Vos propres styles

Préférez les propriétés logiques aux propriétés physiques :

| Physique | Logique |
|----------|---------|
| `margin-left` | `margin-inline-start` |
| `padding-right` | `padding-inline-end` |
| `left: 0` | `inset-inline-start: 0` |
| `text-align: left` | `text-align: start` |
| `border-left` | `border-inline-start` |

Avec Tailwind CSS : `ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`, et la variante `rtl:` pour les cas restants.

## Limites

- Les placements explicites `left` et `right` de Popover et Tooltip restent physiques : ce sont des côtés à l'écran, choisis par Floating UI.
- `textAlign: 'right'` sur un champ aligne toujours à droite. Pour suivre le sens, laissez la valeur par défaut.
