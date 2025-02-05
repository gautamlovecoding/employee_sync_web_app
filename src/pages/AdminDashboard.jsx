import React from "react";
import { useAuth } from "../context/authContext";
import AdminSidebar from "../components/dashboard/AdminSidebar";
import Navbar from "../components/dashboard/Navbar";
import AdminSummary from "../components/dashboard/AdminSummary";
import { Outlet } from "react-router-dom";

//when user is not authenticated that should not be access the admin dashboard
export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-hidden bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
