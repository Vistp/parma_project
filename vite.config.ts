import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  
    port: 5173,       
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
    }
  }
})