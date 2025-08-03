import path from "path";
import fs from "fs-extra";
import { normalizePath } from "vite";
import type { UserConfig } from "../shared/types/siteConfig";

function resolve(root: string, file: string) {
  return normalizePath(path.resolve(root, ".reactpress", file));
}
/**
 * 解析config 配置文件
 */
export function resolveConfig(
  root: string = process.cwd(),
  command: "serve" | "build" = "serve",
  mode: "development" | "production" = "development",
) {
  root = normalizePath(path.resolve(root));
  resolveUserConfig(root, command, mode);
}

const supportedConfigExtensions = ["js", "ts", "mjs", "mts"];
/**
 * 查找用户配置文件
 */
function resolveUserConfig(
  root: string,
  command: "serve" | "build",
  mode: "development" | "production",
) {
  const configPath = supportedConfigExtensions
    .flatMap((ext) => [
      resolve(root, `config/index.${ext}`),
      resolve(root, `config.${ext}`),
    ])
    .find(fs.existsSync);
}

/**
 * 提供用户自定义的配置config
 */
export function defineConfig(config: UserConfig) {
  return config;
}
