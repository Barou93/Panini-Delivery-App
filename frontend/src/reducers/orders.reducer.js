import {
  DELETE_ORDER,
  GET_ORDERS,
  UPDATE_ORDER,
} from "../actions/orders.action";

const initialState = {};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.payload;
    case UPDATE_ORDER:
      return action.payload;
    case DELETE_ORDER:
      return state.filter((order) => order.id !== action.paylaod.id);
    default:
      return state;
  }
}
