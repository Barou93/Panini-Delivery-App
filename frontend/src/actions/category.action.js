import axios from "axios";

export const GET_CATEGORY = "GET_CATEGORY";

export const getCategory = (id) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/categories/${id}`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: GET_CATEGORY, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
