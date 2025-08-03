import { APP_PATH } from "./alias";
import type { Plugin } from "vite";

function cleanUrl(url: string) {
  return url.replace(/#.*$/s, "").replace(/\?.*$/s, "");
}

export function createVitePlugins(config) {
  const reactPressPlugin: Plugin = {
    name: "reactPressPlugin",

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

  return [reactPressPlugin];
}
