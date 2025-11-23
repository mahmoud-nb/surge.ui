/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Ajoutez ici toutes les variables d'environnement VITE_ que vous utilisez
  readonly VITE_APP_BASE_URL: string
  // VITE_APP_AUTRE_VARIABLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}