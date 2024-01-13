import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SharedLayout = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Sidebar />
      <Outlet />
    </>
  );
};

export default SharedLayout;
