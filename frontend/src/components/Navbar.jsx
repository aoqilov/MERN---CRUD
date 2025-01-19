import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="container navbar navbar-dark bg-dark px-4 border border-info">
      <div className="container-fluid">
        <a
          className="crsp navbar-brand text-info fw-bold"
          onClick={() => navigate("/")}
        >
          PRODUCT STORE
        </a>
        <div className="d-flex">
          <button
            onClick={() => navigate("/create")}
            className="btn btn-outline-light me-2"
          >
            create
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
