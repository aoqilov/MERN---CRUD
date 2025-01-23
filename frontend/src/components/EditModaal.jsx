import React, { useEffect, useRef, useState } from "react";
import { useProductStore } from "../store/product";
import { toast } from "sonner";
import Loader from "./Loader";

const EditModaal = ({ update, modal, setUpData, setIsOpen }) => {
  const nameInputRef = useRef(null);
  const [errors, setErrors] = useState({});

  const { zusUpdateProduct, getFetchProducts, isProductsLoading } =
    useProductStore();
  useEffect(() => {
    if (modal && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [modal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpData({ ...update, [name]: value });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    //
    const newErrors = {};
    const inputs = Object.entries(update);
    for (const [key, value] of inputs) {
      if (typeof value === "string" && !value.trim()) {
        newErrors[key] = true;
        toast.warning(`PLEASE FILL ALL INPUT (${key.toUpperCase()} IS EMPTY)`);
      } else if (!value) {
        newErrors[key] = true;
        toast.warning(`PLEASE FILL ALL INPUT (${key.toUpperCase()} IS EMPTY)`);
      }
      if (typeof value === "string") {
        update[key] = value.trim();
      }
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    //
    const { success, message } = await zusUpdateProduct(update._id, update);
    if (success) {
      toast.success(message);
      if (isProductsLoading) {
        return <Loader />;
      }
      await getFetchProducts();
      setIsOpen(false);
    } else {
      toast.error(message || "Failed to update the product.");
    }

    // Reset form or close modal if necessary
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
        <h2 className="text-center mb-4">Edit Product</h2>
        <form onSubmit={handleEdit}>
          <div className="mb-3">
            <label htmlFor="productName" className="form-label">
              Product Name
            </label>
            <input
              ref={nameInputRef}
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              id="productName"
              name="name"
              placeholder="Enter product name"
              value={update.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productPrice" className="form-label">
              Price
            </label>
            <input
              type="text"
              className={`form-control ${errors.price ? "is-invalid" : ""}`}
              id="productPrice"
              name="price"
              placeholder="Enter product price"
              value={update.price}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productDescription" className="form-label">
              Image Url
            </label>
            <input
              type="text"
              className={`form-control ${errors.image ? "is-invalid" : ""}`}
              id="productDescription"
              name="image"
              placeholder="Enter product description"
              value={update.image}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                setIsOpen(false);
                setUpData({}); // Ma'lumotlarni tozalash
              }}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModaal;
