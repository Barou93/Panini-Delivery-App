/** @format */

import { GET_CARTS } from "../actions/carts.action";

const initialState = {};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CARTS:
      return action.payload;
    default:
      return state;
  }
}
