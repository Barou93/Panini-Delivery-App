import { GET_CATEGORY } from "../actions/category.action";

const initialState = {};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORY:
      return action.payload;
    default:
      return state;
  }
}
