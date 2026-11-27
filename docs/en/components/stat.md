<script setup>
import { BanknotesIcon, UsersIcon, ClockIcon } from '@heroicons/vue/24/outline'

const dollars = { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }
</script>

# Stat

Metric card: label, value, colored change, context, small chart and optional link. Numbers are formatted in the current language.

## Usage

### Value and change

<div class="component-demo">
  <div class="demo-section">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)); gap: 1rem;">
      <SuStat label="Revenue" :value="48250" :format="dollars" :delta="0.124" delta-label="vs last month" :icon="BanknotesIcon" />
      <SuStat label="Active customers" :value="1284" :delta="-0.032" delta-label="vs last month" :icon="UsersIcon" />
    </div>
  </div>
</div>

```vue
<SuStat
  label="Revenue"
  :value="48250"
  :format="{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }"
  :delta="0.124"
  delta-label="vs last month"
  :icon="BanknotesIcon"
/>
```

A numeric `delta` is a **ratio** formatted as a percentage: `0.124` gives "+12.4%". Pass text for another unit (`delta="−18 min"`): its sign gives the direction.

### A favorable decrease

<div class="component-demo">
  <div class="demo-section">
    <div style="max-inline-size: 18rem;">
      <SuStat label="Response time" value="2 h 14" delta="−18 min" invert-trend delta-label="vs last week" :icon="ClockIcon" />
    </div>
  </div>
</div>

```vue
<SuStat label="Response time" value="2 h 14" delta="−18 min" invert-trend />
```

`invert-trend` colors a decrease green and an increase red: costs, delays, error rates.

### Small chart, link, loading

```vue
<SuStat label="Visits" :value="18430" :delta="0.08" to="/stats/visits" :loading="pending">
  <template #chart>
    <MySparkline :data="series" />
  </template>
</SuStat>
```

With `to` or `href`, the whole card becomes a link: don't put other interactive elements inside it.

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label |
| `value` | `string \| number` | - | Value; a number is formatted (`format`) |
| `format` | `Intl.NumberFormatOptions` | - | Value format |
| `delta` | `number \| string` | - | Change: ratio (0.124 → +12.4%) or text shown as is |
| `deltaFormat` | `Intl.NumberFormatOptions` | signed percentage | Change format |
| `trend` | `'up' \| 'down' \| 'neutral'` | sign of `delta` | Change direction |
| `invertTrend` | `boolean` | `false` | A decrease is good news |
| `deltaLabel` | `string` | - | Context ("vs last month") |
| `icon` | `Component` | - | Decorative icon |
| `to` | `string \| RouteLocationRaw` | - | Router link (whole card) |
| `href` | `string` | - | Link (whole card) |
| `loading` | `boolean` | `false` | Skeleton instead of the value, `aria-busy` |

### Slots

| Slot | Description |
|------|-------------|
| `value` | Value content |
| `chart` | Small chart |
| `footer` | Bottom of the card |

## Accessibility

- The change direction is read ("Up", "Down", "Unchanged"): color and arrow do not carry the information alone.
- Tabular figures (`font-variant-numeric`): values stay aligned from one card to the next.
- A decorative small chart should have `aria-hidden="true"`; if it conveys information, give it a text alternative.
