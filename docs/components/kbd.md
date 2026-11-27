# Kbd

Touche ou raccourci clavier, à afficher dans un texte, une infobulle ou un menu.

## Exemples d'utilisation

### Raccourci et touche seule

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons" style="align-items: center">
      <SuKbd :keys="['Ctrl', 'K']" />
      <SuKbd :keys="['⌘', '⇧', 'P']" separator="" />
      <SuKbd>Échap</SuKbd>
    </div>
    <p>Appuyez sur <SuKbd :keys="['Ctrl', 'K']" /> pour ouvrir la recherche.</p>
  </div>
</div>

```vue
<SuKbd :keys="['Ctrl', 'K']" />
<SuKbd :keys="['⌘', '⇧', 'P']" separator="" />
<SuKbd>Échap</SuKbd>
```

### Tailles

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons" style="align-items: center">
      <SuKbd size="sm" :keys="['Ctrl', 'S']" />
      <SuKbd size="md" :keys="['Ctrl', 'S']" />
      <SuKbd size="lg" :keys="['Ctrl', 'S']" />
    </div>
  </div>
</div>

```vue
<SuKbd size="sm" :keys="['Ctrl', 'S']" />
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `keys` | `string[]` | - | Touches d'un raccourci ; sinon slot par défaut |
| `separator` | `string` | `'+'` | Séparateur affiché entre les touches |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille |

## Accessibilité

- Structure HTML recommandée pour un raccourci : `<kbd><kbd>Ctrl</kbd>+<kbd>K</kbd></kbd>`.
- Le séparateur est lu (« plus ») : il fait partie du raccourci.
- Le raccourci est isolé du texte et toujours écrit de gauche à droite (`dir="ltr"`) : dans une page en arabe ou en hébreu, on lit « Ctrl+K », pas « K+Ctrl ». Un attribut `dir` passé au composant l'emporte.
- Les symboles (⌘, ⇧) sont mal lus par certains lecteurs d'écran : ajoutez si besoin un texte avec [VisuallyHidden](/components/visuallyhidden).
