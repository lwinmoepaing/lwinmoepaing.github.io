import solid from "solid-start/vite";
import solidStatic from "solid-start-static";
import eslint from "vite-plugin-eslint";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
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
  ],
});
