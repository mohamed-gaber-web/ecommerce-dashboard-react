import axios from "axios";
import type { ICategory } from "@/types/category";

// const baseUrl = import.meta.env.REACT_APP_API_BASE_URL;
const API_BASE = import.meta.env.VITE_API_URL_DEV;
console.log(import.meta.env.VITE_API_URL);



export const getCategories = async (): Promise<ICategory[]> => {
  const { data } = await axios.get(`${API_BASE}/categories`, {
      headers: {
        'Cache-Control': 'no-cache',
  },
  });
  return data;
};

export const getCategoryById = async (id: string): Promise<ICategory> => {
  const { data } = await axios.get(`${API_BASE}/categories/${id}`, {
      headers: {
        'Cache-Control': 'no-cache',
    },
  });
  return data;
};

export const createCategory = async (payload: ICategory): Promise<ICategory> => {
  const { data } = await axios.post(`${API_BASE}/categories`, payload, {
      headers: {
        'Cache-Control': 'no-cache',
    },
  });
  return data;
};

export const updateCategory = async (id: string, payload: ICategory): Promise<ICategory> => {
  const { data } = await axios.put(`${API_BASE}/categories/${id}`, payload, {
      headers: {
        'Cache-Control': 'no-cache',
    },
  });
  return data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE}/categories/${id}`, {
      headers: {
        'Cache-Control': 'no-cache',
    },
  });
};
