import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: {
      cli: "src/node/cli.ts",
      dev: "src/node/dev.ts",
    },
    target: "node16",
    exports: {
      devExports: true,
    },
    watch: true,
    outDir: "dist/node",
  },
  {
    entry: {
      "client-entry": "src/client/app/client-entry.tsx",
    },
    exports: {
      devExports: true,
    },
    /**
     * 这里有bug，当写两个的时候，执行tsdown --watch会生成两个监听。
     * 会发生死循环
     */
    watch: false,
    outDir: "dist/client/app",
  },
]);
