import solid from "solid-start/vite";
import solidStartStatic from "solid-start-static";
import eslint from "vite-plugin-eslint";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import manifest from './public/manifest.json'

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
      manifest: manifest
    }),
    solid({ ssr: true, extensions: [".mdx", ".md"], adapter: solidStartStatic()}),
  ],
});
