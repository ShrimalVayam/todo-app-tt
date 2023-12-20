import react from "@vitejs/plugin-react";
import { defineConfig, UserConfig } from "vite";
import checker from "vite-plugin-checker";
import tsconfigPaths from "vite-tsconfig-paths";
import type { InlineConfig } from "vitest";

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    react(),
    tsconfigPaths(),
    checker({
      typescript: true,
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.js",
  },
} as VitestConfigExport );
