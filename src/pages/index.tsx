import { lazy } from "react";
import axios from "axios";

const getPages = async () => {
  const { data } = await axios.get("http://localhost:8080/server/paths");
  const menu = data.Menus || [];
  const pages = menu?.map((page: any) => {
    return {
      path: page.MenuPath,
      element: lazy(() => import(`.${page.MenuElement}`)),
    };
  });
  return pages;
};
export default getPages;
