import { createServer as createViteDevServer, type ServerOptions } from "vite";

export function createDevServer(
  root = process.cwd(),
  serverOptions: ServerOptions,
  restartServer: () => Promise<void>,
) {
  return createViteDevServer({
    root,
    base: "/",
    server: serverOptions,
  });
}
