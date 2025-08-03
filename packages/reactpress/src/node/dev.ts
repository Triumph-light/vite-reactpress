import { createServer as createViteDevServer, type ServerOptions } from "vite";
import { resolveConfig } from "./config";
import { createVitePlugins } from "./vitePlugins";

export function createDevServer(
  root = process.cwd(),
  serverOptions: ServerOptions = {},
  restartServer: () => Promise<void>,
) {
  const config = resolveConfig(root);
  return createViteDevServer({
    root,
    base: "/",
    server: serverOptions,
    plugins: createVitePlugins(config),
  });
}
