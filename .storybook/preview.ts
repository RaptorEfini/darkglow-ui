import type { Preview } from '@storybook/web-components-vite';
import { registerComponents } from '../src/components';
import '../public/style.css';

registerComponents();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;