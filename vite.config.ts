import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dns from 'node:dns'

dns.setDefaultResultOrder('verbatim')
const apiUrl = "aHR0cHM6Ly9zZy1oeXAtYXBpLmhveW92ZXJzZS5jb20vaHlwL2h5cC1jb25uZWN0Lw==";
const target = atob(apiUrl);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: target,
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
