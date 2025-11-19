import { configureStore } from '@reduxjs/toolkit';
import brandReducer from '@/redux/slice/brandSlice';
import  categoryReducer  from '@/redux/slice/categorySlice';


export const store = configureStore({
    reducer: {
        categories: categoryReducer,
        brands: brandReducer
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;