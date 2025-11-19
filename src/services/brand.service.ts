import axios from "axios";
import type { IBrand } from "@/types/brand";

const API_BASE = import.meta.env.VITE_API_URL_DEV;
console.log(import.meta.env.VITE_API_URL);

export const getBrands = async (): Promise<IBrand[]> => {
  const { data } = await axios.get(`${API_BASE}/brands`, {
      headers: {
        'Cache-Control': 'no-cache',
  },
  });
  return data;
};

export const getBrandById = async (id: string): Promise<IBrand> => {
  const { data } = await axios.get(`${API_BASE}/brands/${id}`, {
      headers: {
        'Cache-Control': 'no-cache',
    },
  });
  return data;
};

export const createBrand = async (payload: IBrand): Promise<IBrand> => {
  const { data } = await axios.post(`${API_BASE}/brands`, payload, {
      headers: {
        'Cache-Control': 'no-cache',
    },
  });
  return data;
};

export const updateBrand = async (id: string, payload: IBrand): Promise<IBrand> => {
  const { data } = await axios.put(`${API_BASE}/brands/${id}`, payload, {
      headers: {
        'Cache-Control': 'no-cache',
    },
  });
  return data;
};

export const deleteBrand = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE}/brands/${id}`, {
      headers: {
        'Cache-Control': 'no-cache',
    },
  });
};
