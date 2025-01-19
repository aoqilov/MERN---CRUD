import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Navbar from "./components/Navbar";
import { Toaster } from "sonner";

const App = () => {
  return (
    <div>
      <Toaster richColors />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
};

export default App;
