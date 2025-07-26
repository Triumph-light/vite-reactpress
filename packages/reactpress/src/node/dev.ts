import { createServer as createViteDevServer } from "vite";
import type { CLIDevOptions } from "../shared/types/cli";

/**
 * 清除 server配置以外的选项
 * @param root
 * @param cliOptions
 * @returns
 */
function cleanCliOptions(options: CLIDevOptions) {
  options = { ...options };
  return options;
}

export function createDevServer(
  root = process.cwd(),
  cliOptions: CLIDevOptions,
  restartServer: () => Promise<void>,
) {
  return createViteDevServer({
    root,
    base: "/",
    server: cleanCliOptions(cliOptions),
  });
}
