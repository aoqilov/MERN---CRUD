import axios from "axios";
import { create } from "zustand";

export const useProductStore = create((set, get) => ({
  products: [],
  isProductsLoading: false, // new
  setProducts: (products) => set({ products }),
  setProductsIsLoading: (isLoading) => set({ isProductsLoading: isLoading }), // new

  createProduct: async (newProduct) => {
    const { setProductsIsLoading } = get();
    try {
      setProductsIsLoading(true);
      console.log(get().isProductsLoading, "isProductsLoading");

      const res = await axios.post("/api/products", newProduct);
      const data = await res.data;
      set((state) => ({ products: [...state.products, data] }));
      return { success: true, message: "product created success" };
    } catch (error) {
      return { success: false, message: "Failed to create product" };
    } finally {
      setProductsIsLoading(false);
      console.log(get().isProductsLoading, "isProductsLoading");
    }
  },

  getFetchProducts: async () => {
    const { setProductsIsLoading } = get();
    try {
      setProductsIsLoading(true);
      // console.log(get().isProductsLoading, "isProductsLoading");
      const { data } = await axios.get("/api/products");
      if (!data.success) {
        return { success: false, message: "xatolik bor" };
      } else {
        set({ products: data });
        return { success: true, message: "malumot kelmadi " };
      }
    } catch (error) {
      console.log(error);
    } finally {
      setProductsIsLoading(false);
      // console.log(get().isProductsLoading, "isProductsLoading");
    }
  },

  deleteProduct: async (id) => {
    const { data } = await axios.delete(`/api/products/${id}`);
    if (!data.success) {
      return { success: false, message: "xatolik bor" };
    } else {
      return { success: true, message: "deleted " };
    }
  },

  zusUpdateProduct: async (pid, updatedProduct) => {
    const { setProductsIsLoading } = get();
    try {
      setProductsIsLoading(true);
      console.log(get().isProductsLoading, "try");
      const res = await axios.put(`/api/products/${pid}`, updatedProduct);
      const data = await res.data;
      //
      if (!data.success) return { success: false, message: data.message };
      else if (data.success) {
        return { success: true, message: "edip page" };
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setProductsIsLoading(false);
      console.log(get().isProductsLoading, "final");
    }
  },
}));
