import {
  GET_CATEGORY_PRODUCTS,
  GET_PRODUCTS,
} from "../actions/products.action";

const initialState = {};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.payload;

    default:
      return state;
  }
}
