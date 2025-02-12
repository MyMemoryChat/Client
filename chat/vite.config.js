import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4173,
    proxy: {
      '/api': {
        target: 'http://192.168.2.34:5124',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
