import path from "path";
import { fileURLToPath } from "url";

const PKG_ROOT = path.resolve(fileURLToPath(import.meta.url), "../..");
export const DIST_CLIENT_PATH = path.resolve(PKG_ROOT, "client");
export const APP_PATH = path.resolve(DIST_CLIENT_PATH, "app");
