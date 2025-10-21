import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to="/dashboard-login" replace />;
  }

  return children;
};

export default PrivateRoute;
