import react from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return user ? children : <Navigate to="/login" />;
};
