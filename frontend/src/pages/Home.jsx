import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import { useProductStore } from "../store/product";
import { useNavigate } from "react-router-dom";

const Home = () => {
  return (
    <div className=" bg-dark d-flex justify-content-center  container w-100">
      <ProductList />
    </div>
  );
};

export default Home;
