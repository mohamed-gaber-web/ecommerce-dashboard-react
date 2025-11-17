// src/components/layout/Layout.tsx
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import { Card } from "../ui/card";
import { Toaster } from "@/components/ui/sonner"


export default function Layout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Card className="bg-white w-full mx-auto rounded-md">
            <Outlet />
            <Toaster position="top-right" />
          </Card>
        </main>
      </div>
    </div>
  );
}
