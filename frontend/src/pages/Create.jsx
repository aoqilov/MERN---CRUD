import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/product";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    image: "",
  });

  // other function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };
  // zustand kevotgan funksiya create
  const { createProduct, isProductsLoading } = useProductStore();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {}; // Track errors
    const inputs = Object.entries(productData);

    // Validate each input
    for (const [key, value] of inputs) {
      if (!value.trim()) {
        newErrors[key] = true; // Mark field as invalid
        toast.warning(`PLEASE FILL ALL INPUT (${key.toUpperCase()} IS EMPTY)`);
      }
      // Clean spaces for valid fields
      productData[key] = value.trim();
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set errors if validation fails
      return;
    }

    setErrors({}); // Clear errors if validation passes

    // Call API to create product
    const { success, message } = await createProduct(productData);
    toast.success("Created!");

    // Reset form
    setProductData({
      name: "",
      price: "",
      image: "",
    });
    navigate("/");
  };

  return (
    <div className="modalka container">
      <div
        className="card p-4 mt-5"
        style={{
          width: "100%",
          maxWidth: "600px",
          backgroundColor: "#212529",
          color: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          border: "1px solid #0dcaf0",
        }}
      >
        <h2 className="text-center mb-4">Create Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="productName" className="form-label">
              Product Name
            </label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              id="productName"
              placeholder="Enter product name"
              name="name"
              value={productData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productPrice" className="form-label">
              Price
            </label>
            <input
              type="number"
              className={`form-control ${errors.price ? "is-invalid" : ""}`}
              id="productPrice"
              name="price"
              placeholder="Enter product price"
              value={productData.price}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productDescription" className="form-label">
              Image URL
            </label>
            <input
              type="text"
              className={`form-control ${errors.image ? "is-invalid" : ""}`}
              id="productDescription"
              name="image"
              placeholder="Enter product description"
              value={productData.image}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isProductsLoading}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
