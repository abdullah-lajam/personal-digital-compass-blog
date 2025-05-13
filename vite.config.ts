
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { webcrypto } from 'crypto';

// Fix TypeScript error with proper type assertion
if (!globalThis.crypto) {
  globalThis.crypto = webcrypto as any;
}

export default defineConfig({
  base: '/personal-digital-compass-blog/',
  server: {
    host: '::',
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },
});
