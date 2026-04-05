import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@atoms': resolve(__dirname, 'src/components/atoms'),
      '@molecules': resolve(__dirname, 'src/components/molecules'),
      '@templates': resolve(__dirname, 'src/components/templates'),
      '@base': resolve(__dirname, 'src/components/base'),
      '@types': resolve(__dirname, 'src/types')
    }
  }
});
