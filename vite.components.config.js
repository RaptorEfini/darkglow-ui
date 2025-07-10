import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist/darkglow',
    lib: {
      entry: resolve(__dirname, 'src/components/index.ts'),
      name: 'darkglow',
      fileName: 'darkglow',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      // Make sure to externalize dependencies that shouldn't be bundled
      external: [],
      output: {
        // Provide global variables to use in the UMD build
        globals: {}
      }
    },
    // Ensure CSS is included in the bundle
    cssCodeSplit: false,
    // Generate source maps for easier debugging
    sourcemap: true
  }
});