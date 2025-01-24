import React from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

//when user is not authenticated that should not be access the admin dashboard
export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    navigate("/login");
  }
  return <div>Admin Dashboard {user.name}</div>;
}
