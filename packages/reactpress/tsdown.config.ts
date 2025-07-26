import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: {
      cli: "src/node/cli.ts",
      dev: "src/node/dev.ts",
    },
    exports: {
      devExports: true,
    },
    outDir: "dist/node",
  },
]);
