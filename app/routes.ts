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
  ]),
] satisfies RouteConfig;
