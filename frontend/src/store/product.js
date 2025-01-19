import axios from "axios";
import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (
      !newProduct.name.trim() ||
      !newProduct.price.trim() ||
      !newProduct.image.trim()
    ) {
      return { success: false, message: "PLEASE FILL ALL INPUT" };
    }
    try {
      const res = await axios.post("/api/products", newProduct);
      const data = await res.data;
      set((state) => ({ products: [...state.products, data] }));
      return { success: true, message: "product created success" };
    } catch (error) {
      return { success: false, message: "Failed to create product" };
    }
  },
  getFetchProducts: async () => {
    const res = await axios.get("/api/products");
    const data = await res.data;
    set({ products: data });
    if (!data.success) {
      return { success: false, message: "xatolik bor" };
    } else {
      return { success: true, message: "deleted " };
    }
  },
  deleteProduct: async (id) => {
    const res = await axios.delete(`/api/products/${id}`);
    const data = await res.data;
    set({ products: data });
    if (!data.success) {
      return { success: false, message: "xatolik bor" };
    } else {
      return { success: true, message: "deleted " };
    }
  },
  zusUpdateProduct: async (pid, updatedProduct) => {
    // API orqali mahsulotni yangilash
    const res = await axios.put(`/api/products/${pid}`, updatedProduct);
    const data = await res.data;

    if (!data.success) return { success: false, message: data.message };
    else if (data.success) {
      return { success: true, message: "edip page" };
    }
    // UI ni darhol yangilash
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.data : product
      ),
    }));
  },
}));
