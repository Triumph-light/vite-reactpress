import cac from "cac";
import { version } from "../../package.json";
import type { CLIDevOptions } from "../shared/types/cli";

const cli = cac("reactpress").help().version(version);

cli
  .command("[root]", "Start the ReactPress server")
  .alias("dev")
  .option("--host <host>", "[string] specify hostname")
  .option("--port <port>", "[number] specify port")
  .action(async (root: string, devOptions: CLIDevOptions) => {
    try {
      async function createServer() {
        const { createDevServer } = await import("./dev");
        const server = await createDevServer(root, devOptions, async () => {
          await server.close();
          await createServer();
        });
        await server.listen();
        await server.printUrls();
      }
      // root = resolve(root);
      await createServer();
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  });

cli
  .command("init", "Initialize a new ReactPress project")
  .alias("init")
  .action(() => {
    console.log("Initializing a new ReactPress project...");
  });

cli.parse();
