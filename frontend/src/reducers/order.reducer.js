/** @format */
import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_SUCCESS,
} from "../actions/order.action";

const initialState = {
  order: null,
  error: null,
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload, // Stockez les détails de la commande ici
        error: null,
      };
    case CREATE_ORDER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
