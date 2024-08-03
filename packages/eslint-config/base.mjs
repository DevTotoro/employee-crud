// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  { files: ['**/*.{ts,tsx}'] },
  { ignores: ['node_modules', '.turbo', 'dist', 'build', 'eslint.config.mjs'] },
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  {
    files: ['**/*.cjs'],
    languageOptions: {
      globals: globals.node
    }
  },
  eslintConfigPrettier
);
