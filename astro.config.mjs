// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
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
  adapter: vercel()
});