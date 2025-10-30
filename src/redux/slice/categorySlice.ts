import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { ICategory } from '@/types/category';
import * as categoryApi from '@/services/category.service';

// createAsyncThunk => بتخليك تنشئ Action تلقائيًا لأي عملية غير متزامنة،


interface CategoryState {
  list: ICategory[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk('categories/fetchAll', async () => {
  return await categoryApi.getCategories();
});

export const addCategory = createAsyncThunk('categories/add', async (payload: ICategory) => {
  return await categoryApi.createCategory(payload);
});

export const updateCategoryById = createAsyncThunk('categories/update', async ({ id, payload }: { id: string; payload: ICategory }) => {
  return await categoryApi.updateCategory(id, payload);
});

export const deleteCategoryById = createAsyncThunk('categories/delete', async (id: string) => {
  await categoryApi.deleteCategory(id);
  return id;
});

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateCategoryById.fulfilled, (state, action) => {
        const index = state.list.findIndex((cat) => cat._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteCategoryById.fulfilled, (state, action) => {
        state.list = state.list.filter((cat) => cat._id !== action.payload);
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addMatcher((action) => action.type.endsWith('rejected'), (state, action: any) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
