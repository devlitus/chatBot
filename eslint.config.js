import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import astro from 'eslint-plugin-astro';

export default [
  js.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      'no-unused-vars': 'warn',
      'no-console': 'warn',
    },
  },
  {
    ignores: [
      'dist/',
      '.astro/',
      '.output/',
      'node_modules/',
      'test-results/',
      'playwright-report/',
      '.env',
      '.env.local',
      '.env.production',
      'package-lock.json',
      'yarn.lock',
      'pnpm-lock.yaml',
      '.vscode/',
      '.idea/',
      '.DS_Store',
      'Thumbs.db',
    ],
  },
]; 