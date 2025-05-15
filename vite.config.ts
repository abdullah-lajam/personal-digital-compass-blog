
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { webcrypto } from 'crypto';
import { componentTagger } from 'lovable-tagger';

// Fix TypeScript error with proper type assertion
if (!globalThis.crypto) {
  globalThis.crypto = webcrypto as any;
}

export default defineConfig(({ mode }) => ({
  base: '/personal-digital-compass-blog/',
  server: {
    host: '::',
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
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
}));
