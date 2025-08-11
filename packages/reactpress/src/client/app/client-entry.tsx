import { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { DataContext } from "./DataContext";
/**
 * 对App进行增强，添加路由、数据
 */
async function enhanceApp(): Promise<React.FC> {
  const { App } = await import("./App");

  return function RootApp() {
    const [pageData, setPageData] = useState({});

    return (
      <DataContext value={{ data: pageData, setData: setPageData }}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DataContext>
    );
  };
}

/**
 * 渲染客服端
 */
function renderInBrowser() {
  const appContainer = document.getElementById("app");
  if (!appContainer) {
    throw new Error("#root element not found");
  }

  createRoot(appContainer).render(<App></App>);
}
renderInBrowser();
