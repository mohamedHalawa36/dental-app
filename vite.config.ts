import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  plugins: [
    reactRouter(),
    tsconfigPaths(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "AlYacout",
        short_name: "Yacout",
        icons: [
          {
            src: "icons/pwa-48x48.webp",
            sizes: "48x48",
            type: "image/webp",
          },
          {
            src: "icons/pwa-72x72.webp",
            sizes: "72x72",
            type: "image/webp",
          },
          {
            src: "icons/pwa-96x96.webp",
            sizes: "96x96",
            type: "image/webp",
          },
          {
            src: "icons/pwa-128x128.webp",
            sizes: "128x128",
            type: "image/webp",
          },
          {
            src: "icons/pwa-144x144.webp",
            sizes: "144x144",
            type: "image/webp",
          },
          {
            src: "icons/pwa-152x152.webp",
            sizes: "152x152",
            type: "image/webp",
          },
          {
            src: "icons/pwa-192x192.webp",
            sizes: "192x192",
            type: "image/webp",
          },
          {
            src: "icons/pwa-256x256.webp",
            sizes: "256x256",
            type: "image/webp",
          },
          {
            src: "icons/pwa-384x384.webp",
            sizes: "384x384",
            type: "image/webp",
          },
          {
            src: "icons/pwa-512x512.webp",
            sizes: "512x512",
            type: "image/webp",
          },
        ],
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
      },
    }),
  ],
});
