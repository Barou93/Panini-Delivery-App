import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../../Pages/Home";
import Product from "../../Pages/Product";
import Order from "../../Pages/Order";
import Contact from "../../Pages/Contact";
import Cart from "../../Pages/Cart";
import Error from "../../Error";
import Register from "../../Admin/Register";
import Login from "../../Admin/Login";
import Dashboard from "../../Admin/Dashboard";
import AddCategory from "../../Admin/AddCategory";
import AddProduct from "../../Admin/AddProduct";
import Categories from "../../Admin/Categories";
import Category from "../../Admin/Category";
import Products from "../../Admin/Products";
import ProductOne from "../../Admin/ProductOne";
import Orders from "../../Admin/Orders";
import Settings from "../../Admin/Settings";
import AdminProtectedRoutes from "../../utils/AdminProtectedRoutes";
import SideBar from "../SideBar";

const index = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/commandes" element={<Order />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/panier" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
        <Route element={<AdminProtectedRoutes />}>
          <Route path="/admin" element={<SideBar />}>
            <Route path="/admin/summary" element={<Dashboard />} />
            <Route path="/admin/add-category" element={<AddCategory />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route path="/admin/categories" element={<Categories />} />
            <Route path="/admin/category/:id" element={<Category />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/product/:id" element={<ProductOne />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default index;
