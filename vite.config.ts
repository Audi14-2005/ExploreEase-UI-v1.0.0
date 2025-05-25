import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    VitePWA({
      registerType: 'autoUpdate', // Automatically update the service worker when new content is available
      injectRegister: 'auto', // Tries to automatically register the service worker.
                                // We might need to adjust this or add manual registration later if 'auto' doesn't work for this project structure.
      devOptions: {
        enabled: true // Enable PWA features in development for testing (optional, good for testing)
      },
      manifest: true, // This will try to pick up `public/manifest.json`.
                       // If it doesn't, we can provide the manifest object directly.
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'], // Basic caching for common assets
        runtimeCaching: [ // Example runtime caching for API calls or other dynamic content (optional for now)
          {
            urlPattern: /^https:\/\/api\.example\.com\/.*/, // Replace with your actual API endpoint if any
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 // 1 day
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
