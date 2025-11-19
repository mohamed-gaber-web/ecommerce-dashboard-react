import { useEffect } from 'react';
import './brands.css';
import { deleteBrandById, fetchBrands } from '@/redux/slice/brandSlice';
import BrrandTable from './components/BrandTable';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { showDeleteConfirmation } from '@/redux/hooks/useConfirmAlert';


// useDispatch => It lets you send actions (events) from your React components to the Redux store.

export default function BrandList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { list, loading } = useAppSelector((state) => state.brands);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

const handleDelete = async (id: string) => {
    const isConfirmed = await showDeleteConfirmation({
        title: "<p>Delete brand?</p>",
        text: `You are want to remove brand !`,
    });

    if (isConfirmed) {
        try {
            await dispatch(deleteBrandById(id));
            // Show a success message using SweetAlert2's design
            await MySwal.fire(
                'Deleted!',
                'The brand has been successfully deleted.',
                'success'
            );
            
        } catch (error: unknown) {
            // Handle error logic
            if (error instanceof Error) {
                toast.error("Error deleting brand: " + error.message);
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
        <h1 className="text-md font-bold mb-4">Brands</h1>
        <Button className="bg-blue-500 text-white hover:bg-blue-600 font-semibold text-xs" onClick={() => navigate('/brands/create')}>+ Add Brand</Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <BrrandTable
          brands={list}
          onEdit={(id) => navigate(`/brands/edit/${id}`)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
