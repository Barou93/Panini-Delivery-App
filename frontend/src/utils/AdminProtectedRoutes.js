import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UidContext } from "../Components/AppContext";
import SideBar from "../Components/SideBar";

const AdminProtectedRoutes = () => {
  const uid = useContext(UidContext);
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log(uid);

  return <>{isAuthenticated ? <SideBar /> : <Navigate to="/login" />}</>;
};

export default AdminProtectedRoutes;
