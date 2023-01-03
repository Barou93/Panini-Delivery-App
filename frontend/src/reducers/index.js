import { combineReducers } from "redux";
import adminReducer from "./admin.reducers";
import categoryReducer from "./category.reducer";
import productReducer from "./product.reducer";
export default combineReducers({
  adminReducer,
  categoryReducer,
  productReducer,
});
