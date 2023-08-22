import { combineReducers } from "redux";
import adminReducer from "./admin.reducers";
import categoriesReducer from "./categories.reducer";
import categoryReducer from "./category.reducer";
import productsReducer from "./products.reducer";
import productReducer from "./product.reducer";
import cartsReducer from "./carts.reducer";
import ordersReducer from "./orders.reducer";
export default combineReducers({
  adminReducer,
  categoriesReducer,
  categoryReducer,
  productsReducer,
  productReducer,
  cartsReducer,
  ordersReducer,
});
