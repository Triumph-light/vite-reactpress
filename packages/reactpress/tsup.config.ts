import { defineConfig } from "tsup";
export default defineConfig([
  {
    entry: {
      cli: "src/node/cli.ts",
      dev: "src/node/dev.ts",
    },
    target: "node16",
    outDir: "dist/node",
    sourcemap: true,
    format: "esm",
  },
  {
    entry: ["src/client"],
    outDir: "dist/client",
    external: ["@theme"],
    format: "esm",
    bundle: false,
  },
]);
