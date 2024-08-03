import type { Config } from 'tailwindcss';

const config: Omit<Config, 'content'> = {
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    }
  },
  plugins: []
};

export default config;
