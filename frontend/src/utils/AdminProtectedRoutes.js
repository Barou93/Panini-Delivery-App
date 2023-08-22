import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Login from "../Admin/Login";
import { UidContext } from "../Components/AppContext";
import SideBar from "../Components/SideBar";

const AdminProtectedRoutes = () => {
  const uid = useContext(UidContext);

  return uid ? <SideBar /> : <Login />;
};

export default AdminProtectedRoutes;
