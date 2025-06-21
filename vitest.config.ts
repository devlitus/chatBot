/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom', // or 'jsdom', 'node'
    includeSource: ['src/**/*.{js,ts,jsx,tsx}'], // enable in-source testing
    setupFiles: ['tests/setup.ts'], // <--- Add this line
  },
  resolve: {
    alias: {
      'astro:env/server': 'tests/mocks/astro-env.js'
    }
  }
});
