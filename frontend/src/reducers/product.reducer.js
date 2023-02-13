import {
  GET_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../actions/product.action";

const initialState = {};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.payload;
    case UPDATE_PRODUCT:
      return state.map((product) => {
        if (product.id === action.payload.id) {
          return {
            ...product,
            data: action.payload.data,
          };
        } else return product;
      });
    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.payload.id);
    default:
      return state;
  }
}
