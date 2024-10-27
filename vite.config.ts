import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://gas159.ru',  // Внешний IP
        changeOrigin: true,
      },
    },
  },
  base: './',
  build: {
    outDir: './docs',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      app: '/src/app',
      components: '/src/components',
      consts: '/src/consts',
      hooks: '/src/hooks',
      pages: '/src/pages',
      store: '/src/store',
      types: '/src/types',
      utils: '/src/utils',
      main: '/src/main',
    },
  },
});
