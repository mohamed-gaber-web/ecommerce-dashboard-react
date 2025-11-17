import type { RouteObject } from "react-router-dom";
import Layout from "@/components/layout/layout";
import Brands from "@/pages/brands/brands";
import Dashboard from "@/pages/dashboard/dashboard";
import Products from "@/pages/products/products";
import CategoryList from "@/pages/categories/categories";
import CreateCategory from "@/pages/categories/createCategory";
import EditCategory from "@/pages/categories/editCategory";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/products", element: <Products /> },
      { path: "/categories", element: <CategoryList /> },
      { path: "/categories/create", element: <CreateCategory /> },
      { path: "/categories/edit/:id", element: <EditCategory /> },
      { path: "/brands", element: <Brands /> },
    ],
  },
];
