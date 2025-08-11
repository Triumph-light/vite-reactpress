import { createContext } from "react";

export const DataContext = createContext({
  data: null,
  setData: () => { },
});
