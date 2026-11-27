# @surgeui/ds-vue (renamed)

**This package was renamed to [`@surgeui/vue`](https://www.npmjs.com/package/@surgeui/vue).** `@surgeui/ds-vue@4.0.0` is the last version published under this name: a relay that depends on `@surgeui/vue@4.0.0` and re-exports it, so existing imports keep working. Later versions are only published as `@surgeui/vue`.

Ce paquet s'appelle désormais **`@surgeui/vue`**. `@surgeui/ds-vue@4.0.0`, dernière version sous l'ancien nom, n'est qu'un relais vers `@surgeui/vue@4.0.0`.

## Migrate

```bash
npm uninstall @surgeui/ds-vue
npm install @surgeui/vue
```

Then replace `@surgeui/ds-vue` with `@surgeui/vue` in your imports. The subpaths are the same:

| Before | After |
|--------|-------|
| `@surgeui/ds-vue` | `@surgeui/vue` |
| `@surgeui/ds-vue/style.css` | `@surgeui/vue/style.css` |
| `@surgeui/ds-vue/style.layer.css` | `@surgeui/vue/style.layer.css` |
| `@surgeui/ds-vue/tailwind.css` | `@surgeui/vue/tailwind.css` |
| `@surgeui/ds-vue/global` | `@surgeui/vue/global` |
| `@surgeui/ds-vue/types` | `@surgeui/vue/types` |

Full guide: [surgeui.com/guide/migration](https://surgeui.com/guide/migration) ([English](https://surgeui.com/en/guide/migration)).

## License

MIT
