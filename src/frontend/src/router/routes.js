import { auth, isLoggedIn } from "@/middlewares";

export default [
  {
    path: "/",
    name: "IndexHome",
    component: () => import("@/views/Index"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login"),
    meta: {
      layout: "AppLayoutDefault",
      middlewares: [isLoggedIn],
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("@/views/Cart"),
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("@/views/Orders"),
    meta: {
      layout: "AppLayoutProfile",
      middlewares: [auth],
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile"),
    meta: {
      layout: "AppLayoutProfile",
      middlewares: [auth],
    },
  },
  {
    path: "/order-complete",
    name: "OrderComplete",
    component: () => import("@/views/OrderComplete"),
  },
];
