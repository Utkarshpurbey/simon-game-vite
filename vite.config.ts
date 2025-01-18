import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/simon-game-vite/', // Set the base path to the GitHub Pages subdirectory
  plugins: [react()],
})
