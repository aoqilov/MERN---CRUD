import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/product";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
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
  const { createProduct } = useProductStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await createProduct(productData);
    toast.success("created !"); // Muvaffaqiyatli xabar
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
              className="form-control"
              id="productName"
              placeholder="Enter product name"
              name="name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productPrice" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="productPrice"
              name="price"
              placeholder="Enter product price"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productDescription" className="form-label">
              image Url
            </label>
            <input
              type="text"
              className="form-control"
              id="productDescription"
              name="image"
              placeholder="Enter product description"
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              Add Product
            </button>
            <button
              onClick={() => navigate("/")}
              type="button"
              className="btn btn-danger"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
