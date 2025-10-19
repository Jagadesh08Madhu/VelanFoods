import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem("accessToken");
  console.log("Token in PrivateRoute:", token);

  if (!token) {
    return <Navigate to="/dashboard-login" replace />;
  }

  return children;
};

export default PrivateRoute;
