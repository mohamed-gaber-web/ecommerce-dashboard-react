import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { fetchCategoryById, updateCategoryById } from "@/redux/slice/categorySlice";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";


export default function EditCategory() {

  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { selected, loading } = useAppSelector((state) => state.categories);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  useEffect(() => {
    if (id) dispatch(fetchCategoryById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (selected) {
        setName(selected.name);
        setSlug(selected.slug);
    }
  }, [selected]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    toast.success("Updated category succes.")
    await dispatch(updateCategoryById({ id, payload: { name, slug } }));
    navigate("/categories");
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-md font-bold mb-4">Edit Category</h1>

      <form onSubmit={handleSubmit} className="space-y-4 p-4 flex flex-row gap-4">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category Name"
            required
          />

          <Input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Slug"
            required
          />

      <Button type="submit" className="w-xss bg-blue-500 text-white hover:bg-blue-600 font-semibold text-xs">Update</Button>

      </form>
    </div>
  );
}
