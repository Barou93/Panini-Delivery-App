/** @format */

import { combineReducers } from "redux";
import adminReducer from "./admin.reducers";
import categoriesReducer from "./categories.reducer";
import categoryReducer from "./category.reducer";
import productsReducer from "./products.reducer";
import productReducer from "./product.reducer";
import cartsReducer from "./carts.reducer";
import cartReducer from "./cart.reducer";
import ordersReducer from "./orders.reducer";
import orderReducer from "./order.reducer";
export default combineReducers({
  adminReducer,
  categoriesReducer,
  categoryReducer,
  productsReducer,
  productReducer,
  cartsReducer,
  cartReducer,
  ordersReducer,
  orderReducer,
});
