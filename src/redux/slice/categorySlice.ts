import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { ICategory } from '@/types/category';
import * as categoryApi from '@/services/category.service';

// createAsyncThunk => بتخليك تنشئ Action تلقائيًا لأي عملية غير متزامنة،


interface CategoryState {
  list: ICategory[];
  loading: boolean;
  selected: ICategory | null;
  error: string | null;
}

const initialState: CategoryState = {
  list: [],
  loading: false,
  selected: null,
  error: null,
};

export const fetchCategories = createAsyncThunk('categories/fetchAll', async () => {
  return await categoryApi.getCategories();
});

// 🧠 Fetch category by ID (for edit page)
export const fetchCategoryById = createAsyncThunk("categories/fetchById", async (id: string) => {
  return await categoryApi.getCategoryById(id);
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
  reducers: {
    clearSelected: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })

      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.selected = action.payload;
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

export const { clearSelected } = categorySlice.actions;
export default categorySlice.reducer;
