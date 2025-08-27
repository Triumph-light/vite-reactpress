import { siteData } from "@siteData";
import { useContext } from "react";
import type { DefaultTheme } from "../../shared/types/default-theme";
import type { SiteData } from "../../shared/types/siteData";
import { DataContext } from "./DataContext";
/**
 * 依据不同的route来初始化数据
 */
export function initData(pathname: string) {
  return {
    siteData,
  };
}

export const usePageData = () => {
  return useContext(DataContext).data;
};

export interface PageData {
  siteData: SiteData<DefaultTheme.Config>;
  pagePath: string;
  relativePagePath: string;
  lastUpdatedTime?: string;
  title?: string;
  // frontmatter?: FrontMatterMeta;
  description?: string;
  // pageType: PageType;
  // toc?: Header[];
  routePath: string;
  content?: string;
  // subModules?: PageModule<ComponentType<unknown>>[];
}

export const useFrontmatter = () => {};
