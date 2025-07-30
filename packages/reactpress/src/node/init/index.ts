import path from "path";
import { fileURLToPath } from "url";
import { confirm, group, intro, outro, select, text } from "@clack/prompts";
import fs from "fs-extra";
import template from "lodash.template";
import c from "picocolors";
import { slash } from "../../shared/utils/common";

function getPackageManager() {
  const name = process.env?.npm_config_user_agent || "npm";
  return name.split("/")[0];
}

export async function init(root?: string) {
  intro(c.bold(c.cyan("Welcome to ReactPress!")));

  /**
   * 交互配置输入
   */
  const options = await group(
    {
      root: async () => {
        if (root) return root;

        return await text({
          message: "Where should ReactPress initialize the config?",
          initialValue: "./",
          defaultValue: "./",
          validate() {
            return undefined;
          },
        });
      },

      srcDir: async ({ results }: any) => {
        return await text({
          message: "Where should VitePress look for your markdown files?",
          initialValue: results.root,
          defaultValue: results.root,
        });
      },

      title: async () => {
        return await text({
          message: "Site Title",
          defaultValue: "My ReactPress Site",
          placeholder: "My ReactPress Site",
        });
      },

      description: async () => {
        return await text({
          message: "Site Description",
          defaultValue: "A ReactPress site",
          placeholder: "A ReactPress site",
        });
      },

      theme: async () => {
        return await select({
          message: "Theme:",
          options: [
            {
              value: ScaffoldThemeType.Default,
              label: "Default Theme",
              hint: "Out of the box, good-looking docs",
            },
            {
              value: ScaffoldThemeType.DefaultCustom,
              label: "Default Theme + Customization",
              hint: "Add custom CSS and layout slots",
            },
            {
              value: ScaffoldThemeType.Custom,
              label: "Custom Theme",
              hint: "Build your own or use external",
            },
          ],
        });
      },

      useTs: async () =>
        await confirm({
          message: "Use TypeScript for config and theme files?",
        }),

      injectNpmScripts: async () => {
        return await confirm({
          message: "Add VitePress npm scripts to package.json?",
        });
      },
    },
    {
      onCancel() {
        outro("Initialization cancelled.");
        process.exit(0);
      },
    },
  );

  outro(scaffold(options));
}

export enum ScaffoldThemeType {
  Default = "default theme",
  DefaultCustom = "default theme + customization",
  Custom = "custom theme",
}

interface ScaffoldOptions {
  root?: string;
  srcDir?: string;
  title?: string;
  description?: string;
  theme?: string;
  useTs?: boolean;
  injectNpmScripts?: boolean;
}

/**
 * 脚手架核心执行，拷贝文件，生成packgae.json等
 * @returns string
 */
function scaffold({
  root: root_ = "./",
  srcDir: srcDir_ = root_,
  title = "",
  description = "",
  theme = ScaffoldThemeType.Default,
  useTs = true,
  injectNpmScripts = true,
}: ScaffoldOptions): string {
  const resolvedRoot = path.resolve(root_);
  const root = path.relative(process.cwd(), resolvedRoot);
  const resolvedSrcDir = path.resolve(srcDir_);
  const srcDir = path.relative(resolvedRoot, resolvedSrcDir);

  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    "../../../template",
  );

  /**
   * 查看用户当前是否支持 esm
   */
  const pkgPath = path.resolve("package.json");
  const userPkg = fs.existsSync(pkgPath)
    ? JSON.parse(fs.readFileSync(pkgPath, "utf-8"))
    : {};
  const useMjs = userPkg.type === "module" ? true : false;

  const data = {
    srcDir: srcDir ? JSON.stringify(srcDir) : undefined,
    title: JSON.stringify(title),
    description: JSON.stringify(description),
    useTs,
    defaultTheme:
      theme === ScaffoldThemeType.Default ||
      theme === ScaffoldThemeType.DefaultCustom,
  };
  /**
   * 拷贝生成文件
   */
  function renderFile(file: string) {
    const filePath = path.resolve(templateDir, file);
    let targetPath = path.resolve(resolvedRoot, file);

    if (useMjs) {
      targetPath = targetPath.replace(/\.js$/, ".mjs");
    }
    if (useTs) {
      // 增强Ts转化
      targetPath = targetPath.replace(/\.(m?)js(x?)$/, ".$1ts$2");
    }
    if (targetPath.endsWith(".md")) {
      targetPath = path.resolve(resolvedSrcDir, file);
    }

    const content = fs.readFileSync(filePath, "utf-8");
    const compiled = template(content)(data);
    fs.outputFileSync(targetPath, compiled);
  }
  const filesToScaffold = [
    "index.md",
    "api-examples.md",
    "markdown-examples.md",
    ".reactpress/config.js",
  ];
  if (theme === ScaffoldThemeType.DefaultCustom) {
    filesToScaffold.push(
      ".reactpress/theme/index.js",
      ".reactpress/theme/style.css",
    );
  } else if (theme === ScaffoldThemeType.Custom) {
    filesToScaffold.push(
      ".reactpress/theme/index.js",
      ".reactpress/theme/style.css",
      ".reactpress/theme/Layout.jsx",
    );
  }
  for (const file of filesToScaffold) {
    renderFile(file);
  }

  const tips = [];
  /**
   * 提示添加gitignore要忽略的文件
   */
  const gitignorePrefix = root ? `${slash(root)}/.reactpress` : ".reactpress";
  if (fs.existsSync(".git")) {
    tips.push(
      `Make sure to add ${c.cyan(`${gitignorePrefix}/dist`)} and ${c.cyan(`${gitignorePrefix}/cache`)} to your ${c.cyan(`.gitignore`)} file.`,
    );
  }

  /**
   * 提示自定义主题需要下载 react
   */
  if (
    theme !== ScaffoldThemeType.Default &&
    !userPkg.dependencies?.react &&
    !userPkg.devDependencies?.react
  ) {
    tips.push(
      `Since you are using a custom theme, please install ${c.cyan("react")} and ${c.cyan("react-dom")} in your project.`,
    );
  }
  const tip = tips.length ? c.yellow([`\n\nTips:\n`, ...tips].join("\n-")) : "";
  const pm = getPackageManager();

  /**
   * 注入 scripts 脚本至package.json
   */
  if (injectNpmScripts) {
    const scripts: Record<string, string> = {};

    scripts.dev = "reactpress dev";
    scripts.build = "reactpress build";
    scripts.preview = "reactpress preview";

    Object.assign(userPkg.scripts || (userPkg.scripts = {}), scripts);
    fs.writeFileSync(pkgPath, JSON.stringify(userPkg, null, 2));

    return `Done! Now run ${c.cyan(`${pm} run dev`)} and start writing.${tip}`;
  } else {
    return c.green(`
  ┌─────────────────────────────┐
  │                             │
  │   ReactPress Initialized!   │
  │                             │
  └─────────────────────────────┘
  
  Your ReactPress site is ready to go!
  
  To start the development server, run:
  
    ${c.blue(`${root !== "./" ? `cd ${slash(root)}\n` : ""}
    ${pm === "npm" ? "npx" : pm} reactpress dev`)}
  
  Happy writing! 🎉${tip}
  `);
  }
}
