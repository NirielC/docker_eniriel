import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // escucha en todas las interfaces (necesario dentro de Docker)
    port: 5173,
    watch: {
      usePolling: true, // detecta cambios de archivos a través del volumen de Docker en Windows
    },
  },
})
