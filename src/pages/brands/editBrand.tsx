import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { fetchBrandById, updateBrandById } from "@/redux/slice/brandSlice";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";


export default function EditBrand() {

  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { selected, loading } = useAppSelector((state) => state.brands);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  useEffect(() => {
    if (id) dispatch(fetchBrandById(id));
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
    toast.success("Updated brand succes.")
    await dispatch(updateBrandById({ id, payload: { name, slug } }));
    navigate("/brands");
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-md font-bold mb-4">Edit Brand</h1>

      <form onSubmit={handleSubmit} className="space-y-4 p-4 flex flex-row gap-4">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Brand Name"
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
