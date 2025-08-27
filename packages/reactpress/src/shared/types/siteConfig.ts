import type { SiteData } from "./siteData";
import type { BabelOptions } from "@vitejs/plugin-react";
import type { Plugin, UserConfig as ViteConfiguration } from "vite";

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
  plugins: Plugin[];
  /**
   * BabelOptions which will be applied to @vitejs/plugin-react
   */
  babel?: BabelOptions;
}

export interface SiteConfig extends UserConfig {
  root: string;
  themeDir: string;
  srcDir: string;

  site: SiteData;
}
