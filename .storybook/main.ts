import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-docs",
    "@storybook/addon-essentials"
  ],
  "framework": {
    "name": "@storybook/web-components-vite",
    "options": {}
  },
  async viteFinal(config) {
    config.server = config.server ?? {};
    config.server.watch = {
      ...(config.server.watch ?? {}),
      ignored: [
        '**/.git/**',
        '**/dist/**',
        '**/storybook-static/**',
        '**/node_modules/**',
        '**/public/fonts/**'
      ]
    };

    return config;
  }
};
export default config;
