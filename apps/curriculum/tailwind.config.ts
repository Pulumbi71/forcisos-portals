import type { Config } from 'tailwindcss';
import sharedConfig from '@forcisos/ui/tailwind.config';

const config: Config = {
  ...sharedConfig,
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
  ],
};

export default config;
