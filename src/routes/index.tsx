import type { RouteObject } from "react-router-dom";
import Layout from "@/components/layout/layout";
import Brands from "@/pages/brands/brands";
import Categories from "@/pages/categories/categories";
import Dashboard from "@/pages/dashboard/dashboard";
import Products from "@/pages/products/products";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/products", element: <Products /> },
      { path: "/categories", element: <Categories /> },
      { path: "/brands", element: <Brands /> },
    ],
  },
];
