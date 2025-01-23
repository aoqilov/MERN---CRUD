import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/product";
import { toast } from "sonner";
import EditModaal from "./EditModaal";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const { getFetchProducts, deleteProduct, products, isProductsLoading } =
    useProductStore();
  const [upData, setUpData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getFetchProducts();
  }, [getFetchProducts]);

  if (isProductsLoading) {
    return <Loader />;
  }

  const handleDelete = async (id) => {
    const { success, message } = await deleteProduct(id);
    await getFetchProducts();
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleEdit = async (product) => {
    setUpData(product);
    setIsOpen(!isOpen);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-info mb-4">Current Products 🚀</h2>
      <div className="d-flex flex-wrap justify-content-center gap-5">
        {products?.data?.length ? (
          products?.data.map((product) => (
            <div key={product._id} className=" ">
              <div
                className="card text-white bg-dark mb-3 border border-info"
                style={{ width: "18rem" }}
              >
                <img
                  src={product.image}
                  style={{ minHeight: "330px" }}
                  className="card-img-top"
                  alt={product.name}
                />
                <div
                  className="card-body "
                  style={{
                    minHeight: "150px",
                  }}
                >
                  <h5 className="card-title">{product.name.slice(0, 22)}</h5>
                  <p className="card-text">${product.price}</p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h3 className="bg-dark text-white m-3 p-5">
            no data{" "}
            <span
              onClick={() => navigate("/create")}
              className="crsp text-info text-decoration-underline"
            >
              if you can create
            </span>
          </h3>
        )}

        {isOpen ? (
          <EditModaal
            update={upData}
            modal={isOpen}
            setUpData={setUpData}
            setIsOpen={setIsOpen}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProductList;
