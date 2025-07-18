import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  },
  build: {
    outDir: 'dist'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  root: '.',
  publicDir: 'public'
}) 