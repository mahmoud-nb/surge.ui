# Image

Image component with aspect ratio support, multiple sources, lazy loading, fallback and complete accessibility. Optimized for performance and responsive compatibility.

## Usage examples

### Basic Image

<div class="component-demo">
  <div class="demo-section">
    <h4>Simple image</h4>
    <div class="demo-inputs">
      <SuImage 
        src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400"
        alt="Natural landscape"
        width="400"
        height="300"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuImage 
    src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg"
    alt="Natural landscape"
    width="400"
    height="300"
  />
</template>
```

### Aspect Ratios

<div class="component-demo">
  <div class="demo-section">
    <h4>Different ratios</h4>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
      <div>
        <p><strong>16:9 (cinema)</strong></p>
        <SuImage 
          src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400"
          alt="16:9 ratio"
          ratio="16/9"
        />
      </div>
      <div>
        <p><strong>4:3 (classic)</strong></p>
        <SuImage 
          src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400"
          alt="4:3 ratio"
          ratio="4/3"
        />
      </div>
      <div>
        <p><strong>1:1 (square)</strong></p>
        <SuImage 
          src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400"
          alt="1:1 ratio"
          ratio="1/1"
        />
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <!-- Cinema ratio -->
  <SuImage 
    src="image.jpg"
    alt="Cinema image"
    ratio="16/9"
  />
  
  <!-- Classic ratio -->
  <SuImage 
    src="image.jpg"
    alt="Classic image"
    ratio="4/3"
  />
  
  <!-- Square ratio -->
  <SuImage 
    src="image.jpg"
    alt="Square image"
    ratio="1/1"
  />
  
  <!-- Custom ratio -->
  <SuImage 
    src="image.jpg"
    alt="Custom image"
    :ratio="2.5"
  />
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | **required** | Main image URL |
| `alt` | `string` | **required** | Alternative text for accessibility |
| `fallback` | `string` | `undefined` | Fallback image on error |
| `sources` | `ImageSource[]` | `[]` | Multiple sources for picture tag |
| `ratio` | `'auto' \| '16/9' \| '4/3' \| '1/1' \| number` | `'auto'` | Image aspect ratio |
| `fit` | `'cover' \| 'contain' \| 'fill' \| 'none' \| 'scale-down'` | `'cover'` | Image fit mode |
| `position` | `'center' \| 'top' \| 'bottom' \| 'left' \| 'right' \| 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'center'` | Image position |
| `lazy` | `boolean` | `false` | Enable lazy loading |
| `loading` | `'eager' \| 'lazy'` | `'lazy'` | Loading strategy |
| `width` | `string \| number` | `undefined` | Image width |
| `height` | `string \| number` | `undefined` | Image height |
| `placeholder` | `boolean` | `true` | Show placeholder during loading |
| `placeholderColor` | `string` | `'#f3f4f6'` | Placeholder color |
| `loadingAriaLabel` | `string` | - | Text added to the accessible name while loading (translated otherwise) |
| `errorAriaLabel` | `string` | - | Text added to the accessible name on error (translated otherwise) |
| `errorText` | `string` | - | Message shown when the image fails to load (translated otherwise) |

### Types

#### ImageSource
```typescript
interface ImageSource {
  srcset: string
  type?: string
  media?: string
}
```

### Events

| Event | Type | Description |
|-------|------|-------------|
| `@load` | `(event: Event) => void` | Emitted when image is loaded |
| `@error` | `(event: Event) => void` | Emitted if image fails to load |

### Exposed methods

| Method | Type | Description |
|--------|------|-------------|
| `reload()` | `() => void` | Reload the image |
| `imageRef` | `Ref<HTMLImageElement>` | Reference to image element |

## Accessibility

The Image component follows WCAG 2.1 AA standards:

### ✅ Accessibility features

- **Required alt text**: The `alt` prop is required for accessibility
- **ARIA attributes**: Complete support for ARIA attributes
- **Loading states**: Accessible feedback during loading
- **Error handling**: Accessible error messages
- **Lazy loading**: Compatible with screen readers
- **Placeholder**: Appropriate descriptions during loading

### 🎯 Best practices

```vue
<!-- Decorative image -->
<SuImage 
  src="decoration.jpg"
  alt=""
  aria-hidden="true"
/>

<!-- Informative image -->
<SuImage 
  src="chart.jpg"
  alt="Chart showing sales evolution from 2020 to 2024"
  aria-describedby="chart-description"
/>
<div id="chart-description">
  The chart shows consistent growth...
</div>

<!-- Image with specific role -->
<SuImage 
  src="logo.jpg"
  alt="Company logo"
  role="img"
/>
```