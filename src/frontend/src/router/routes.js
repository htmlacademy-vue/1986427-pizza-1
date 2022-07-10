export default [
  {
    path: "/",
    name: "IndexHome",
    component: () => import("@/views/Index"),
    meta: { layout: "AppLayoutDefault" },
    children: [
      {
        path: "/login",
        name: "Login",
        component: () => import("@/views/Login"),
        meta: { layout: "AppLayoutDefault" },
      },
    ],
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("@/views/Cart"),
    meta: { layout: "AppLayoutDefault" },
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("@/views/Orders"),
    meta: { layout: "AppLayoutDefault" },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile"),
    meta: { layout: "AppLayoutDefault" },
  },
];
