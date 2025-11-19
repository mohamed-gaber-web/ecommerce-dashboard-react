import type { IProduct } from "@/types/products";
import axios from "axios";

// const baseUrl = import.meta.env.REACT_APP_API_BASE_URL;
const API_BASE = import.meta.env.VITE_API_URL_DEV;

export const getProducts = async (): Promise<IProduct[]> => {
  const { data } = await axios.get(`${API_BASE}/products`, {
      headers: {
        'Cache-Control': 'no-cache',
  },
  });
  return data;
};

export const getProductsById = async (id: string): Promise<IProduct> => {
  const { data } = await axios.get(`${API_BASE}/products/${id}`, {
      headers: {
        'Cache-Control': 'no-cache',
    },
  });
  return data;
};

export const createProduct = async (payload: IProduct): Promise<IProduct> => {
  const { data } = await axios.post(`${API_BASE}/products`, payload, {
      headers: {
        'Cache-Control': 'no-cache',
    },
  });
  return data;
};

export const updateProduct = async (id: string, payload: IProduct): Promise<IProduct> => {
  const { data } = await axios.put(`${API_BASE}/products/${id}`, payload, {
      headers: {
        'Cache-Control': 'no-cache',
    },
  });
  return data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE}/products/${id}`, {
      headers: {
        'Cache-Control': 'no-cache',
    },
  });
};
