import { Layout } from "@theme";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initData } from "./data";
import { DataContext } from "./DataContext";

export function App() {
  const { pathname } = useLocation();
  const { setData: setPageData } = useContext(DataContext);

  /**
   * 不同页面加载不同数据
   */
  useEffect(() => {
    function refetchData() {
      try {
        const pageData = initData(pathname);
        setPageData(pageData);
      } catch (error) {
        console.log(error);
      }
    }
    refetchData();
  }, [pathname]);
  return <Layout></Layout>;
}
