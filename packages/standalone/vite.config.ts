import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'Texo',
      fileName: 'texo',
      formats: ['iife', 'umd'],
    },
    minify: 'terser',
    sourcemap: true,
    outDir: 'dist',
  },
});
