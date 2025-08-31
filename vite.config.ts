import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isLocal = process.env.NODE_ENV === 'development'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: isLocal ? '/' : '/noize/',
})
