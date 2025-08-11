import path from "path";
import { fileURLToPath } from "url";
import type { SiteConfig } from "../shared/types/siteConfig";
import type { Alias } from "vite";

const PKG_ROOT = path.resolve(fileURLToPath(import.meta.url), "../..");
export const DIST_CLIENT_PATH = path.resolve(PKG_ROOT, "client");
export const APP_PATH = path.resolve(DIST_CLIENT_PATH, "app");
export const DEFAULT_THEME_PATH = path.resolve(
  DIST_CLIENT_PATH,
  "theme-default",
);

export function resolveAliases({ root, themeDir }: SiteConfig) {
  const path: Record<string, string> = {
    "@theme": themeDir,
  };

  const aliases: Alias[] = [
    ...Object.keys(path).map((p) => ({
      find: p,
      replacement: path[p],
    })),
  ];

  return aliases;
}
