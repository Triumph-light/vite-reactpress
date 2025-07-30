import { useData } from "reactpress";
export function Layout() {
  // https://vitepress.dev/reference/runtime-api#usedata
  const { site, frontmatter } = useData();
  if (frontmatter.home) {
    return (
      <div>
        <h1>{site.title}</h1>
        <p>{site.description}</p>
        <ul>
          <li>
            <a href="/markdown-examples.html">Markdown Examples</a>
          </li>
          <li>
            <a href="/api-examples.html">API Examples</a>
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <a href="/">Home</a>
        <Content />
      </div>
    );
  }
}
