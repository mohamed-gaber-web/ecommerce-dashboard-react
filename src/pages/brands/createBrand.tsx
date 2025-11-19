// src/pages/categories/CreateCategory.tsx
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks/hooks";
import CategoryForm from "./components/BrandForm";
import { addBrand } from "@/redux/slice/brandSlice";
import type { IBrand } from "@/types/brand";

export default function CreateBrand() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (data: IBrand) => {
    await dispatch(addBrand(data));
    navigate("/brands");
  };

  return (
    <div className="p-6">
      <h1 className="text-md font-bold mb-4">Create Brand</h1>
      <CategoryForm onSubmit={handleSubmit} />
    </div>
  );
}
