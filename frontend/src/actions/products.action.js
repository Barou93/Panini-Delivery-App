import axios from "axios";

export const GET_PRODUCTS = "GET_PRODUCTS";

export const getProducts = () => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/products`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({
          type: GET_PRODUCTS,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};
