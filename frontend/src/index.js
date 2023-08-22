import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
//DevTools
import { composeWithDevTools } from "redux-devtools-extension";
import { getProducts } from "./actions/products.action";
import { getCategories } from "./actions/categories.action";
import { getProduct } from "./actions/product.action";

import { getOrders } from "./actions/orders.action";

import { getCarts } from "./actions/carts.action";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
store.dispatch(getProducts());
store.dispatch(getProduct());
store.dispatch(getOrders());
store.dispatch(getCarts());
store.dispatch(getCategories());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
