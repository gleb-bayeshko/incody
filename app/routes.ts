import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./components/layouts/BaseLayout/index.tsx", [
    index("pages/home/index.tsx"),

    route("product/:productShortName", "pages/product/index.tsx"),
    route("search", "pages/search/index.tsx"),

    route("pay/success", "pages/success/index.tsx"),
    route("pay/fail", "pages/fail/index.tsx"),
  ]),
] satisfies RouteConfig;
