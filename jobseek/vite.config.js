import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: { // Add this 'server' object
    host: true, // This tells Vite to listen on your network IP address
    port: 5173, // Optional: specify the port if you want, though 5173 is Vite's default
  },
})