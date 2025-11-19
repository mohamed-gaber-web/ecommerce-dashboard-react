import type { RouteObject } from "react-router-dom";
import Layout from "@/components/layout/layout";
import Dashboard from "@/pages/dashboard/dashboard";
import CategoryList from "@/pages/categories/categories";
import CreateCategory from "@/pages/categories/createCategory";
import EditCategory from "@/pages/categories/editCategory";
import BrandList from "@/pages/brands/brands";
import CreateBrand from "@/pages/brands/createBrand";
import EditBrand from "@/pages/brands/editBrand";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Dashboard /> },
      // categories
      { path: "/categories", element: <CategoryList /> },
      { path: "/categories/create", element: <CreateCategory /> },
      { path: "/categories/edit/:id", element: <EditCategory /> },
      // brands
      { path: "/brands", element: <BrandList /> },
      { path: "/brands/create", element: <CreateBrand /> },
      { path: "/brands/edit/:id", element: <EditBrand /> },
      // Products
      { path: "/products", element: <BrandList /> },
      { path: "/products/create", element: <CreateBrand /> },
      { path: "/products/edit/:id", element: <EditBrand /> },
    ],
  },
];
