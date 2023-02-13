import {
  DELETE_CATEGORY,
  GET_CATEGORIES,
  UPDATE_CATEGORY,
} from "../actions/categories.action";

const initialState = {};

export default function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.payload;
    case UPDATE_CATEGORY:
      return state.map((category) => {
        if (category.id === action.payload.id) {
          return {
            ...category,
            name: action.payload.name,
          };
        } else return category;
      });
    case DELETE_CATEGORY:
      return state.filter((category) => category.id !== action.payload.id);
    default:
      return state;
  }
}
