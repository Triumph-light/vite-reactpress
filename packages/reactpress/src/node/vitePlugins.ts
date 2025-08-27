import { searchForWorkspaceRoot, type Plugin, type UserConfig } from "vite";
import type { SiteConfig } from "../shared/types/siteConfig";
import {
  APP_PATH,
  DIST_CLIENT_PATH,
  resolveAliases,
  SITE_DATA_REQUEST_PATH,
} from "./alias";
import { dynamicRoutePlugin } from "./plugins/daynamicRoute";

function cleanUrl(url: string) {
  return url.replace(/#.*$/s, "").replace(/\?.*$/s, "");
}

export function createVitePlugins(siteConfig: SiteConfig) {
  const { srcDir, site } = siteConfig;

  const siteData = site;

  const reactPressPlugin: Plugin = {
    name: "reactPressPlugin",

    resolveId(id) {
      if (id === SITE_DATA_REQUEST_PATH) return SITE_DATA_REQUEST_PATH;
    },
    load(id) {
      if (id === SITE_DATA_REQUEST_PATH) {
        const data = siteData;
        return `export default ${JSON.stringify(data)}`;
      }
    },

    config() {
      const baseConfig: UserConfig = {
        resolve: {
          alias: resolveAliases(siteConfig),
        },
        optimizeDeps: {
          exclude: ["@theme"],
        },
        server: {
          fs: {
            allow: [
              DIST_CLIENT_PATH,
              searchForWorkspaceRoot(process.cwd()),
              srcDir,
            ],
          },
        },
      };
      return baseConfig;
    },

    configureServer(server) {
      return () =>
        server.middlewares.use(async (req, res, next) => {
          const url = req.url && cleanUrl(req.url);
          if (url?.endsWith(".html")) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            let html = `\
<!DOCTYPE html>
<html>
  <head>
    <title></title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="description" content="">
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/@fs/${APP_PATH}/client-entry.js"></script>
  </body>
</html>`;
            html = await server.transformIndexHtml(url, html, req.originalUrl);
            res.end(html);
            return;
          }
          next();
        });
    },
  };

  return [reactPressPlugin,
    // Conventional Route
    dynamicRoutePlugin({ srcDir })
  ];
}
