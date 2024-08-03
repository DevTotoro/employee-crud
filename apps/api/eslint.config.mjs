import config from '@repo/eslint-config/base.mjs';

export default [
  ...config,
  {
    files: ['**/*.module.ts'],
    rules: {
      '@typescript-eslint/no-extraneous-class': 'off'
    }
  }
];
