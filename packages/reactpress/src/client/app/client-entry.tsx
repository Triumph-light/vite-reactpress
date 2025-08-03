import { createRoot } from "react-dom/client";
import { App } from "./app";
function renderInBrowser() {
  const appContainer = document.getElementById("app");
  if (appContainer) {
    createRoot(appContainer).render(<App></App>);
  }
}
renderInBrowser();
