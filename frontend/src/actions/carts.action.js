import axios from "axios";

export const GET_CARTS = "GET_CARTS";

export const getCarts = () => {
  return (dispatch) => {
    return axios.get(`${process.env.REACT_APP_API_URL}api/cart`).then((res) => {
      dispatch({ type: GET_CARTS, payload: res.data });
    });
  };
};
