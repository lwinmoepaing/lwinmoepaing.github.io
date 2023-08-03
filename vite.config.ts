import solid from "solid-start/vite";
import solidStatic from "solid-start-static";
import eslint from "vite-plugin-eslint";
import manifest from "./src/manifest.json";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    eslint(),
    {
      ...(await import("@mdx-js/rollup")).default({
        jsx: true,
        jsxImportSource: "solid-js",
        providerImportSource: "solid-mdx",
      }),
      enforce: "pre",
    },
    solid({ ssr: true, extensions: [".mdx", ".md"], adapter: solidStatic() }),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "inline",
      // add this to cache all the imports
      workbox: {
        globPatterns: ["*/*.*", "*.*"],
      },
      // add this to cache all the
      // static assets in the public folder
      includeAssets: ["robots.txt", "*.svg", "*.jpg", "*.jpeg", "*.png"],
      manifest: manifest,
    }),
  ],
});
