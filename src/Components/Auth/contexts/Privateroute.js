import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Assuming you have an AuthContext to provide authentication status

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
