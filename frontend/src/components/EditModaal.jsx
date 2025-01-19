import React, { useEffect, useRef } from "react";
import { useProductStore } from "../store/product";
import { toast } from "sonner";

const EditModaal = ({ update, modal, setUpData, setIsOpen }) => {
  const nameInputRef = useRef(null);
  const { zusUpdateProduct } = useProductStore();
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
    const { success, message } = await zusUpdateProduct(update._id, update);
    if (success) {
      setIsOpen(false);
      toast.success(message);
    } else {
      toast.warning(message);
    }
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
              className="form-control"
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
              className="form-control"
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
              className="form-control"
              id="productDescription"
              name="image"
              placeholder="Enter product description"
              value={update.image}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModaal;
