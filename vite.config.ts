import solid from "solid-start/vite";
import solidStatic from "solid-start-static";
import eslint from "vite-plugin-eslint";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    eslint({
      exclude: ["**/dev-sw.js", "**/workbox-{*}.js"],
    }),
    {
      ...(await import("@mdx-js/rollup")).default({
        jsx: true,
        jsxImportSource: "solid-js",
        providerImportSource: "solid-mdx",
      }),
      enforce: "pre",
    },
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "inline",
      // add this to cache all the
      // static assets in the public folder
      includeAssets: [
        "robots.txt",
        "*.svg",
        "*.jpg",
        "*.jpeg",
        "*.png",
        "*.html",
      ],
      // add this to cache all the imports
      workbox: {
        globPatterns: ["**/*"],
      },
      manifest: {
        theme_color: "#6366f1",
        background_color: "#6366f1",
        scope: "./",
        start_url: ".",
        display: "standalone",
        short_name: "lwinmoepaing",
        description: "Pwa for Lwin Moe Paing",
        name: "Lwin Moe Paing Dev",
        icons: [
          {
            src: "./images/logo/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "./images/logo/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "./images/logo/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "./images/logo/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
    solid({ ssr: true, extensions: [".mdx", ".md"], adapter: solidStatic() }),
  ],
});
