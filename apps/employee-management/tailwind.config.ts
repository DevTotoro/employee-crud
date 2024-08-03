import type { Config } from 'tailwindcss';
import baseConfig from '@repo/tailwind-config';

const config: Pick<Config, 'presets' | 'content'> = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  presets: [baseConfig]
};

export default config;
