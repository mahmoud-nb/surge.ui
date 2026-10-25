# Layouts

Layouts (the *templates* layer of Atomic Design) structure a page or a section: they place areas, exposed as **slots**, and draw nothing else. Colors, cards and typography belong to the components you put inside them.

## Choosing a layout

| Page type | Use case | Component |
|-----------|----------|-----------|
| Single column | Articles, blogs, forms, mobile | [SingleColumnLayout](/en/components/singlecolumnlayout) |
| Two column | Docs, dashboards, admin | [SidebarLayout](/en/components/sidebarlayout) |
| Split screen | Image + pitch, A vs B | [SplitLayout](/en/components/splitlayout) |
| Asymmetrical | Portfolios, bold campaigns | [SplitLayout](/en/components/splitlayout#asymmetrical) with `ratio="3:2"` or `"2:1"` |
| Holy Grail | Apps: nav, content, extras | [HolyGrailLayout](/en/components/holygraillayout) |
| Magazine | News sites ranking stories | [MagazineLayout](/en/components/magazinelayout) |
| Grid | Product lists, galleries, dashboards | [GridLayout](/en/components/gridlayout) |
| Masonry | Mixed-height media feeds | [MasonryLayout](/en/components/masonrylayout) |
| Hero | Product launches, signups | [HeroLayout](/en/components/herolayout) |
| Full screen | Stories, one idea per screen | [FullScreenLayout](/en/components/fullscreenlayout) |

### What about F and Z patterns?

They are **reading patterns**, not structures: you build them with the layouts above.

- **F-pattern** (pages people scan): a [SingleColumnLayout](/en/components/singlecolumnlayout) whose headings, subheadings and lists put key information at the start of lines.
- **Z-pattern** (landing page with one CTA): a [HeroLayout](/en/components/herolayout), then [SplitLayout](/en/components/splitlayout#z-pattern) rows alternating `reverse` so the eye moves from side to side.

## Shared principles

### Mobile first

Every layout starts stacked in a single column, then adds columns when there is room. Nothing is needed for mobile.

### Driven by container width

Columns appear based on the width of **the layout itself** (*container queries*), not the screen. A layout placed in a narrow panel or a dashboard column stays stacked, even on a large screen.

| Threshold | Container width |
|-----------|-----------------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

Demos on these pages sit in a frame that simulates a 375px (Mobile), 768px (Tablet) or 1024px (Desktop) container. The frame is scaled down on screen to fit the page, without changing the width the layouts see.

### Reading order

DOM order follows visual order: screen reader reading and keyboard navigation stay consistent. The one documented exception is SplitLayout's `reverse`, which only flips the column display.

### Gaps

Every layout accepts `gap`: `none`, `sm` (8px), `md` (16px), `lg` (24px) or `xl` (32px). The value is also exposed in CSS as `--su-layout-gap`, reusable in your own grids.

### Nesting

Layouts combine: a `SidebarLayout` inside a `HolyGrailLayout` content area, a `MasonryLayout` inside a `SplitLayout` pane… Each one adapts to the space it gets.

```vue
<SuHolyGrailLayout>
  <template #header>…</template>
  <template #nav>…</template>

  <SuSidebarLayout sidebar-position="end" sidebar-tag="nav" sidebar-label="On this page">
    <template #sidebar>Table of contents</template>
    Article
  </SuSidebarLayout>
</SuHolyGrailLayout>
```
