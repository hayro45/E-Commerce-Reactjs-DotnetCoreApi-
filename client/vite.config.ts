import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/api/form-data-demo': 'http://127.0.0.1:5037',
    },
  },
  plugins: [react()],
})
