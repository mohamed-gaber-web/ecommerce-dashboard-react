import { useEffect } from 'react';
import { deleteCategoryById, fetchCategories } from '@/redux/slice/categorySlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { useNavigate } from 'react-router-dom';
import CategoryTable from './components/CategoryTable';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { showDeleteConfirmation } from '@/redux/hooks/useConfirmAlert';
import './categories.css';


// useDispatch => It lets you send actions (events) from your React components to the Redux store.

export default function CategoryList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { list, loading } = useAppSelector((state) => state.categories);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

//   const handleDelete = async (id: string) => {
//     try {
//       await dispatch(deleteCategoryById(id))
//       toast.success("Category deleted 🗑️");
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         toast.error("Error deleting category: " + error.message);
//       } else {
//         toast.error("An unknown error occurred");
//     }
// }
//   };

const handleDelete = async (id: string) => {
    const isConfirmed = await showDeleteConfirmation({
        title: "<p>Delete category?</p>",
        text: `You are want to remove category !`,
    });

    if (isConfirmed) {
        try {
            await dispatch(deleteCategoryById(id));
            // Show a success message using SweetAlert2's design
            await MySwal.fire(
                'Deleted!',
                'The category has been successfully deleted.',
                'success'
            );
            
        } catch (error: unknown) {
            // Handle error logic
            if (error instanceof Error) {
                toast.error("Error deleting category: " + error.message);
            } else {
                toast.error("An unknown error occurred");
            }
        }
    } else {
        // Optional: User clicked "No, keep it"
        toast.info("Deletion cancelled.");
    }
};

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-md font-bold mb-4">Categories</h1>
        <Button className="bg-blue-500 text-white hover:bg-blue-600 font-semibold text-xs" onClick={() => navigate('/categories/create')}>+ Add Category</Button>
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
