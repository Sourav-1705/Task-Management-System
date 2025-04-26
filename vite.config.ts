import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3001
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});