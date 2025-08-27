export interface SiteData<ThmeConfig = unknown> {
  base: string;
  lang: string;
  dir: string;
  title: string;
  description: string;
  icon: string;
  themeConfig: ThmeConfig;
  appearance: boolean;
}

export interface RouteOptions {
  /**
   * .md's root
   */
  srcDir?: string;
}
