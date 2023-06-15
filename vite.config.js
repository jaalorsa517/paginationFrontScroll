import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({ template: { compilerOptions: { isCustomElement: (tag) => tag.startsWith("j5-") } } }),
    VitePWA({
      manifest: {
        name: "Pokemons",
        id: "com.jaalorsa.pokemons",
        start_url: "/",
        short_name: "Pokemons",
        description: "Lista de pokemons",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        orientation: "portrait",
        lang: "es",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          }
        ],
      },
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        sourcemap: true,
        runtimeCaching: [
          {
            urlPattern:
              /^https:\/\/raw\.githubusercontent\.com\/PokeAPI\/sprites\/master\/sprites\/pokemon\/other\/official-artwork\/*/,
            handler: "CacheFirst",
            options: {
              cacheName: "img-pokemon-cache",
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 7, // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/pokeapi\.co\/api\/v2\/*/,
            handler: "CacheFirst",
            options: {
              cacheName: "request-pokemon-cache",
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 7, // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
