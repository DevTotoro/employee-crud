import type { Config } from 'tailwindcss';
import baseConfig from '@repo/tailwind-config';

const config: Pick<Config, 'prefix' | 'presets' | 'content'> = {
  content: ['./src/**/*.tsx'],
  prefix: 'ui-',
  presets: [baseConfig]
};

export default config;
