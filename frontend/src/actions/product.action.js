import axios from "axios";

export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const GET_PRODUCT = "GET_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const createProduct = (data) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/products/new`,
      data,
      withCredentials: true,
    });
  };
};

export const getProduct = (id) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/products/${id}`)
      .then((res) => {
        dispatch({ type: GET_PRODUCT, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const updateProduct = (id, data) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/products/${id}`,
      data,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: UPDATE_PRODUCT, payload: { id, data } });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteProduct = (id) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/products/${id}`,
      withCredentials: true,
    }).then((res) => {
      dispatch({ type: DELETE_PRODUCT, payload: { id } });
    });
  };
};
