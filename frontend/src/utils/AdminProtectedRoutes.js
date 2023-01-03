import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import SideBar from "../Components/SideBar";

const AdminProtectedRoutes = () => {
  const auth = { adminToken: false };
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminProtectedRoutes;
