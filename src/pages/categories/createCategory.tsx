// src/pages/categories/CreateCategory.tsx
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks/hooks";
import CategoryForm from "./components/CategoryForm";
import type { ICategory } from "@/types/category";
import { addCategory } from "@/redux/slice/categorySlice";

export default function CreateCategory() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (data: ICategory) => {
    await dispatch(addCategory(data));
    
    navigate("/categories");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Create Category</h1>
      <CategoryForm onSubmit={handleSubmit} />
    </div>
  );
}
