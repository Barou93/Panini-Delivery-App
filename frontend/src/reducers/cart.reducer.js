/** @format */

import { ADD_TO_CART, SET_CART } from "../actions/cart.action";
import Cookies from "js-cookie";

const initialState = {
  cartId: Cookies.get("cart") || null,
  cartItems: [],
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        cartId: action.payload,
      };

    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };

    default:
      return state;
  }
}
