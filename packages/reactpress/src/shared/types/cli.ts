import type { UserConfig } from "vite";

export interface CLIDevOptions extends UserConfig {
  force?: boolean;
  config?: string;
  "--"?: string[];
}
