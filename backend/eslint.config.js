import js from '@eslint/js';
import react from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  {
    plugins: {

    },
    settings: {

    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      ...prettier.rules, // Disables conflicting rules
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
  },
];
