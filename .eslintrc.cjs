module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:astro/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {
        // Add any Astro-specific rules here
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // Add any TypeScript-specific rules here
      },
    },
  ],
  rules: {
    // Add any global rules here
    'no-unused-vars': 'warn',
    'no-console': 'warn',
  },
}; 