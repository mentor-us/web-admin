import react from "@vitejs/plugin-react";
import jsconfigPaths from "vite-jsconfig-paths";
import checker from "vite-plugin-checker";
import envCompatible from "vite-plugin-env-compatible";
import eslintPlugin from "vite-plugin-eslint";
import svgr from "vite-plugin-svgr";

import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: "REACT_APP_",
  build: {
    outDir: "build"
  },
  optimizeDeps: {
    include: ["@emotion/react", "@emotion/styled"]
  },
  plugins: [
    svgr(),
    react(),
    jsconfigPaths(),
    envCompatible(),
    eslintPlugin({
      cache: false,
      include: ["./src/**/*.js", "./src/**/*.jsx"],
      exclude: []
    }),
    checker()
  ],
  server: {
    port: 3000
  },
  preview: {
    port: 3000
  },
  assetsInclude: ["**/*.xlsx"]
});
