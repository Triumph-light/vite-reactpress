import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { routes } from "virtual:routes";

export const Content = () => {
  const routesElement = useRoutes(routes);
  return <Suspense fallback={null}>{routesElement}</Suspense>;
};
