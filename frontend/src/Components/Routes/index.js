/** @format */

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
import Products from "../../Admin/Products";
import UpdateProduct from "../../Admin/UpdateProduct";

import Orders from "../../Admin/Orders";
import Settings from "../../Admin/Settings";
import AdminProtectedRoutes from "../../utils/AdminProtectedRoutes";
import SideBar from "../SideBar";
import UpdateCategory from "../../Admin/UpdateCategory";
import OrderDetails from "../../Admin/OrderDetails";

import CategoryProduct from "../../Admin/CategoryProduct";

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
            <Route
              path="/admin/categories/:id/products"
              element={<CategoryProduct />}
            />
            <Route
              path="/admin/category/:id/update-category"
              element={<UpdateCategory />}
            />

            <Route path="/admin/products/" element={<Products />} />
            <Route
              path="/admin/products/update-product/:id"
              element={<UpdateProduct />}
            />

            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/orders/:id" element={<OrderDetails />} />
            <Route path="/admin/settings/:id" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default index;
