/// <reference types="vite/client" />
/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'
import { sentryVitePlugin } from "@sentry/vite-plugin"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), // Añadimos el plugin de Sentry
  tailwindcss(), sentryVitePlugin({
    org: "tu-organizacion", // Reemplaza con tu organización en Sentry
    project: "consulting", // Reemplaza con el nombre de tu proyecto en Sentry
    // No enviar la configuración a Sentry en entorno de desarrollo
    disable: process.env.NODE_ENV !== 'production',
  }), sentryVitePlugin({
    org: "devlitus",
    project: "javascript-react"
  }), sentryVitePlugin({
    org: "devlitus",
    project: "consulting"
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    // Habilitar la generación de sourcemaps para Sentry
    sourcemap: true
  }
})