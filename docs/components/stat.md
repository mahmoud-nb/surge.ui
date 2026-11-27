<script setup>
import { BanknotesIcon, UsersIcon, ClockIcon } from '@heroicons/vue/24/outline'

const euros = { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }
</script>

# Stat

Carte d'indicateur : libellé, valeur, variation colorée, contexte, mini-graphique et lien facultatif. Les nombres sont formatés dans la langue courante.

## Exemples d'utilisation

### Valeur et variation

<div class="component-demo">
  <div class="demo-section">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)); gap: 1rem;">
      <SuStat label="Chiffre d'affaires" :value="48250" :format="euros" :delta="0.124" delta-label="vs mois dernier" :icon="BanknotesIcon" />
      <SuStat label="Clients actifs" :value="1284" :delta="-0.032" delta-label="vs mois dernier" :icon="UsersIcon" />
    </div>
  </div>
</div>

```vue
<SuStat
  label="Chiffre d'affaires"
  :value="48250"
  :format="{ style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }"
  :delta="0.124"
  delta-label="vs mois dernier"
  :icon="BanknotesIcon"
/>
```

`delta` numérique est un **ratio** formaté en pourcentage : `0.124` donne « +12,4 % ». Passez un texte pour une autre unité (`delta="−18 min"`) : son signe donne le sens.

### Une baisse favorable

<div class="component-demo">
  <div class="demo-section">
    <div style="max-inline-size: 18rem;">
      <SuStat label="Délai de réponse" value="2 h 14" delta="−18 min" invert-trend delta-label="vs semaine dernière" :icon="ClockIcon" />
    </div>
  </div>
</div>

```vue
<SuStat label="Délai de réponse" value="2 h 14" delta="−18 min" invert-trend />
```

`invert-trend` colore une baisse en vert et une hausse en rouge : coûts, délais, taux d'erreur.

### Mini-graphique, lien, chargement

```vue
<SuStat label="Visites" :value="18430" :delta="0.08" to="/statistiques/visites" :loading="pending">
  <template #chart>
    <MySparkline :data="series" />
  </template>
</SuStat>
```

Avec `to` ou `href`, la carte entière devient un lien : n'y placez pas d'autre élément interactif.

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `label` | `string` | - | Libellé |
| `value` | `string \| number` | - | Valeur ; un nombre est formaté (`format`) |
| `format` | `Intl.NumberFormatOptions` | - | Format de la valeur |
| `delta` | `number \| string` | - | Variation : ratio (0.124 → +12,4 %) ou texte affiché tel quel |
| `deltaFormat` | `Intl.NumberFormatOptions` | pourcentage signé | Format de la variation |
| `trend` | `'up' \| 'down' \| 'neutral'` | signe de `delta` | Sens de la variation |
| `invertTrend` | `boolean` | `false` | Une baisse est une bonne nouvelle |
| `deltaLabel` | `string` | - | Contexte (« vs mois dernier ») |
| `icon` | `Component` | - | Icône décorative |
| `to` | `string \| RouteLocationRaw` | - | Lien du routeur (carte entière) |
| `href` | `string` | - | Lien (carte entière) |
| `loading` | `boolean` | `false` | Squelette à la place de la valeur, `aria-busy` |

### Slots

| Slot | Description |
|------|-------------|
| `value` | Contenu de la valeur |
| `chart` | Mini-graphique |
| `footer` | Bas de la carte |

## Accessibilité

- Le sens de la variation est lu (« En hausse », « En baisse », « Stable ») : la couleur et la flèche ne portent pas seules l'information.
- Chiffres tabulaires (`font-variant-numeric`) : les valeurs restent alignées d'une carte à l'autre.
- Un mini-graphique décoratif doit porter `aria-hidden="true"` ; s'il apporte une information, donnez-lui une alternative textuelle.
