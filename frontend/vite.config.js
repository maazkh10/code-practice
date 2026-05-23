import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Import the plugin

export default defineConfig({
  plugins: [
    tailwindcss(), // Add it here as a function
    react(),
    // Note: Removed the curly brace object and kept the valid plugins
  ],
})