import { useEffect } from 'react';
import { deleteCategoryById, fetchCategories } from '@/redux/slice/categorySlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { useNavigate } from 'react-router-dom';
import CategoryTable from './components/CategoryTable';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";


// useDispatch => It lets you send actions (events) from your React components to the Redux store.

export default function CategoryList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { list, loading } = useAppSelector((state) => state.categories);


  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteCategoryById(id))
      toast.success("Category deleted 🗑️");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("Error deleting category: " + error.message);
      } else {
        toast.error("An unknown error occurred");
    }
}
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Categories</h1>
        <Button onClick={() => navigate('/categories/create')}>+ Add Category</Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <CategoryTable
          categories={list}
          onEdit={(id) => navigate(`/categories/edit/${id}`)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
