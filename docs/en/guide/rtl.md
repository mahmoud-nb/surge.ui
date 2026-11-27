# RTL (right to left)

SurgeUI supports right-to-left languages: Arabic, Hebrew, Persian, Urdu. Components follow the reading direction with no configuration.

## Enabling RTL

Set `dir="rtl"` on `<html>` for the whole page, or on a container for a single area. Also set the language with `lang`:

```html
<html lang="ar" dir="rtl">
```

The direction can change without a page reload (language switcher): components adjust, including the tabs indicator and sliders.

For the components' default texts in Arabic, use the provided locale, or `'auto'` which follows `<html lang>`:

```ts
import SurgeUI from '@surgeui/vue'

app.use(SurgeUI, { locale: 'auto' })
```

See [useLocale](/en/composables/uselocale) for the Arabic locale and its digits.

## What flips

- **Layout**: components use logical properties (`margin-inline`, `padding-inline`, `inset-inline`, `text-align: start`). Margins, borders, start and end icons follow the direction.
- **Keyboard**: left and right arrows are reversed in horizontal lists (Tabs, menus), the Calendar and the Slider. In a Slider, the value grows from right to left: the right arrow decreases it.
- **`start` and `end` positions**: the Toaster (`bottom-end` by default), the FloatButton (`end`), the Dialog drawers (`display="start"` or `"end"`), the Avatar status dot and badges placed on an element move to the opposite side. The former `left` and `right` values are aliases of `start` and `end`.
- **Directional icons** of components (Calendar and Pagination arrows, Breadcrumb chevrons): flipped.
- **Dialogs**: rendered in `<body>`, they keep the `dir` and `lang` of their original location.

## What stays left to right

- **Keyboard shortcuts** (Kbd): isolated and written left to right, "Ctrl+K" does not become "K+Ctrl".

## Your directional icons

A "next" arrow must point left in RTL. Add the `su-flip-rtl` class to icons that show a direction:

```vue
<SuButton :icon="ArrowRightIcon" icon-display="right">
  Next
</SuButton>

<ArrowRightIcon class="su-flip-rtl" />
```

Do not flip icons with no direction (check mark, clock, logo, video play).

## Dates and numbers

- The `ar` locale gives Latin digits (123); `ar-EG` or `ar-SA` Arabic-Indic digits (١٢٣). The DatePicker reads both.
- The first day of the week follows the region: Saturday for `ar` and `ar-EG`, Sunday for `ar-SA`.

## Your own styles

Prefer logical properties over physical ones:

| Physical | Logical |
|----------|---------|
| `margin-left` | `margin-inline-start` |
| `padding-right` | `padding-inline-end` |
| `left: 0` | `inset-inline-start: 0` |
| `text-align: left` | `text-align: start` |
| `border-left` | `border-inline-start` |

With Tailwind CSS: `ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`, and the `rtl:` variant for remaining cases.

## Limits

- Explicit `left` and `right` placements of Popover and Tooltip stay physical: they are screen sides, chosen by Floating UI.
- `textAlign: 'right'` on a field always aligns right. To follow the direction, keep the default value.
