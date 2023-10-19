/** @format */
import axios from "axios";
export const CREATE_ORDER = "CREATE_ORDER";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAILURE = "CREATE_ORDER_FAILURE";

export const createOrder = (data) => {
  return (dispatch) => {
    try {
      const response = axios.post(
        `${process.env.REACT_APP_API_URL}api/cart/create/orders`,
        data,
        { withCredentials: true }
      );

      dispatch({
        type: CREATE_ORDER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_ORDER_FAILURE,
        payload: error.response.data,
      });
    }
  };
};
