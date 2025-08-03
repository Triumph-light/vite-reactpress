import type { BabelOptions } from "@vitejs/plugin-react";
import type { UserConfig as ViteConfiguration } from "vite";

export interface UserConfig {
  /**
   * base path of the site
   */
  base?: string;
  /**
   * source directory of the site
   */
  srcDir?: string;
  /**
   * output directory of the site
   */
  outDir?: string;

  /**
   * the meta information of the site
   */
  icon?: string;
  title?: string;
  description?: string;

  vite?: ViteConfiguration;
  /**
   * BabelOptions which will be applied to @vitejs/plugin-react
   */
  babel?: BabelOptions;
}
