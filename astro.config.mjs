// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  output: "server",
  vite: {
    plugins: [tailwindcss()]
  },
  env:{
    schema:{
      GEMINI_API_KEY: envField.string({
        access: "secret",
        context: "server",
      })
    }
  },
  adapter: vercel({
    includeFiles: ['./src/pages/api/**']
  })
});