import FastGlob from "fast-glob";
import { RouteOptions } from "../../shared/types/siteData";
import { normalizePath } from "vite";
import path from "path";

interface RouteMeta {
  routePath: string
  basePath: string
  absolutePath: string
}

function normalizeRoutePath(routePath: string) {
  
}

const CONVENTIONAL_ROUTE_ID = 'virtual:routes';
const DEFAULT_PAGE_EXTENSIONS = ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'];

class RouteService {
  #routeData: RouteMeta[] = []
  #base = ''
  #extensions: string[] = [];
  #include: string[] = [];
  #exclude: string[] = [];

  constructor(private scanDir: string, options: RouteOptions) {
    this.#extensions = options.extensions || DEFAULT_PAGE_EXTENSIONS;
    this.#include = options.include || [];
    this.#exclude = options.exclude || [];
    this.#base = options.prefix || '';
  }

  async init() {
    const files = FastGlob.sync(
      [
        `**/*.{${this.#extensions.join(',')}}`,
        ...this.#include,
      ],
      {
        cwd: this.scanDir,
        ignore: [
          '**/node_modules/**',
          '**/.*',
          ...this.#exclude,
        ],
        absolute: true,
      }
    );
    files.forEach((file) => this.addRoute(file));
  }

  addRoute(filePath: string) {
    const fileRelativePath = normalizePath(path.relative(this.scanDir, filePath))
    const routePath = normalizeRoutePath(fileRelativePath)
    const absolutePath = path.join(this.scanDir, fileRelativePath)
    this.#routeData.push({
      routePath: filePath,
      basePath: this.#base,
      absolutePath: absolutePath,
    });
  }
}

export function dynamicRoutePlugin(options: RouteOptions = {}) {
  return {
    name: 'rcpress:vite-plugin-routes',
    
  }
}