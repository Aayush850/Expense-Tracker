import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useGlobalContext } from "../context";

const PrivateRoute = () => {
  const { loggedInUser, loading } = useGlobalContext();
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }
  if (loggedInUser) {
    return <Outlet></Outlet>;
  }
  return <Navigate to="/login" />;
};

export default PrivateRoute;
