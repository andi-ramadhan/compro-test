import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://compro-test-wu1q.vercel.app' /* for my prod, use only localhost for development needs */,
        changeOrigin: true,
      },
    },
  },
})
