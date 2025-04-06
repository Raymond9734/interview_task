import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'

export default defineConfig({
  plugins: [
    react(),
    RubyPlugin(),
  ],
  build: {
    sourcemap: false,
    manifest: true
  },
  server: {
    hmr: false
  }
})
