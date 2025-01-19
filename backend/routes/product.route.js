import express from "express";

import {
  createProduct,
  deleteProduct1,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

// get products
router.get("/", getProducts);
// post products
router.post("/", createProduct);
// delete item products
router.delete("/:id", deleteProduct1);
// put edit products
router.put("/:id", updateProduct);

export default router;
