import type { RouteObject } from "react-router-dom";
import Layout from "@/components/layout/layout";
import Brands from "@/pages/brands/brands";
import Dashboard from "@/pages/dashboard/dashboard";
import Products from "@/pages/products/products";
import CategoryList from "@/pages/categories/categories";
import CreateCategory from "@/pages/categories/createCategory";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/products", element: <Products /> },
      { path: "/categories", element: <CategoryList /> },
      { path: "/categories/create", element: <CreateCategory /> },
      { path: "/brands", element: <Brands /> },
    ],
  },
];
