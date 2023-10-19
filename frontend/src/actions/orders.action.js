/** @format */

import axios from "axios";

export const GET_ORDERS = "GET_ORDERS";
export const UPDATE_ORDER = "UPDATE_ORDER";
export const DELETE_ORDER = "DELETE_ORDER";

export const getOrders = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/cart/orders`)
      .then((res) => {
        dispatch({ type: GET_ORDERS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const updateOrder = (id) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/cart/orders/${id}`,
      withCredentials: true,
    }).then((res) => {
      dispatch({ type: UPDATE_ORDER, payload: res.data });
    });
  };
};

export const removeOrder = (id) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/cart/orders/${id}`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: DELETE_ORDER, payload: { id } });
      })
      .catch((err) => console.log(err));
  };
};
