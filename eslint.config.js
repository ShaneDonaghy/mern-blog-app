import js from '@eslint/js';
import react from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  {
    plugins: {
      react,
      'jsx-a11y': jsxA11y,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...jsxA11y.configs.recommended.rules,
      ...prettier.rules, // Disables conflicting rules
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    // Add TypeScript-specific config if using @typescript-eslint/parser and plugin
    // languageOptions: { parser: tsParser },
    // rules: { ... }
  },
];
