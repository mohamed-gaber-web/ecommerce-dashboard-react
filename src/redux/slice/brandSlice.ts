import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as brandApi from '@/services/brand.service';
import type { IBrand } from '@/types/brand';

// createAsyncThunk => بتخليك تنشئ Action تلقائيًا لأي عملية غير متزامنة،


interface BrandState {
  list: IBrand[];
  loading: boolean;
  selected: IBrand | null;
  error: string | null;
}

const initialState: BrandState = {
  list: [],
  loading: false,
  selected: null,
  error: null,
};

export const fetchBrands = createAsyncThunk('brands/fetchAll', async () => {
  return await brandApi.getBrands();
});

// 🧠 Fetch category by ID (for edit page)
export const fetchBrandById = createAsyncThunk("brands/fetchById", async (id: string) => {
  return await brandApi.getBrandById(id);
});

export const addBrand = createAsyncThunk('brands/add', async (payload: IBrand) => {
  return await brandApi.createBrand(payload);
});

export const updateBrandById = createAsyncThunk('brands/update', async ({ id, payload }: { id: string; payload: IBrand }) => {
  return await brandApi.updateBrand(id, payload);
});

export const deleteBrandById = createAsyncThunk('brands/delete', async (id: string) => {
  await brandApi.deleteBrand(id);
  return id;
});

const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    clearSelected: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })

      .addCase(fetchBrandById.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(addBrand.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateBrandById.fulfilled, (state, action) => {
        const index = state.list.findIndex((brand) => brand._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteBrandById.fulfilled, (state, action) => {
        state.list = state.list.filter((brand) => brand._id !== action.payload);
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addMatcher((action) => action.type.endsWith('rejected'), (state, action: any) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSelected } = brandSlice.actions;
export default brandSlice.reducer;
