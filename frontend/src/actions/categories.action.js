import axios from "axios";

export const GET_CATEGORIES = "GET_CATEGORIES";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";

export const getCategories = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/categories`)
      .then((res) => {
        dispatch({ type: GET_CATEGORIES, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const addCategory = (data) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/categories`,
      data,
      withCredentials: true,
    });
  };
};

export const updateCategory = (id, name) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/categories/${id}`,
      data: { name },
    })
      .then((res) => {
        dispatch({ type: UPDATE_CATEGORY, payload: { name } });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteCategory = (id) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/categories/${id}`,
      withCredentials: true,
    }).then((res) => {
      dispatch({ type: DELETE_CATEGORY, payload: { id } });
    });
  };
};
//api/admin/categories
