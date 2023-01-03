import React from "react";
import Dashboard from "../Admin/Dashboard";
import AddCategory from "../Admin/AddCategory";
import AddProduct from "../Admin/AddProduct";
import Categories from "../Admin/Categories";
import Category from "../Admin/Category";
import Products from "../Admin/Products";
import ProductOne from "../Admin/ProductOne";
import Orders from "../Admin/Orders";
import Settings from "../Admin/Settings";
import SideBar from "./SideBar";
const AdminPanel = () => {
  return (
    <div>
      <SideBar />
      <Dashboard />
      <AddCategory />
      <AddProduct />
      <Categories />
      <Category />
      <Products />
      <ProductOne />
      <Orders />
      <Settings />
    </div>
  );
};

export default AdminPanel;
