import { lazy } from "react";

const Login = lazy(() => import("../Pages/Login/Login"));
const Stock = lazy(() => import("../Pages/Stock/StockList"));

const routes = [
  {
    path: "/",
    component: Login,
    exact: true,
  },
  {
    path: "/login",
    component: Login,
    exact: true,
  },
  {
    path: "/stock",
    component: Stock,
    exact: true,
  },
];

export default routes;
