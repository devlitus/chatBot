/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom', // or 'jsdom', 'node'
    include: ['tests/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    exclude: ['tests/e2e/**/*', 'tests/setup.ts'],
    setupFiles: ['tests/setup.ts'], // <--- Add this line
    // CI-specific settings
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true
      }
    }
  },
  resolve: {
    alias: {
      'astro:env/server': 'tests/mocks/astro-env.js'
    }
  },
  // Optimize for CI - exclude problematic optional dependencies
  optimizeDeps: {
    exclude: ['@rollup/rollup-linux-x64-gnu']
  }
});
