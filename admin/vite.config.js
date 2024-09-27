import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://coop-server.onrender.com/',
        changeOrigin: true, // <--- Add this line
        secure: true,
      },
    },
  },
  plugins: [react()],
})