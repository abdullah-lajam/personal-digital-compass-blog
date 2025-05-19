import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { webcrypto } from 'crypto';

// إصلاح لـ TypeScript: إضافة دعم crypto في Node
if (!globalThis.crypto) {
  globalThis.crypto = webcrypto as any;
}

export default defineConfig({
  // ضروري عند النشر على GitHub Pages في مجلد فرعي
  base: '/personal-digital-compass-blog/',

  server: {
    host: '::',
    port: 8080,
  },

  plugins: [
    react(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,

    // هذا يضمن أن GitHub Pages يعيد التوجيه لـ index.html
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: (id) => {
          // تجميع مكتبات TipTap في حزمة واحدة
          if (id.includes('@tiptap')) {
            return 'tiptap';
          }
          // تجميع مكتبات lowlight/highlight التي قد تكون مستخدمة مع TipTap
          if (id.includes('lowlight') || id.includes('highlight')) {
            return 'syntax-highlight';
          }
          // تجميع مكونات Radix UI في حزمة واحدة
          if (id.includes('@radix-ui')) {
            return 'radix';
          }
          // مكتبات المساعدة
          if (id.includes('tailwind-merge') || 
              id.includes('class-variance-authority') || 
              id.includes('clsx') || 
              id.includes('lucide-react')) {
            return 'ui-utils';
          }
        }
      }
    },
  },
});