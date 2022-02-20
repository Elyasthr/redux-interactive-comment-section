import axios from "axios";
export const GET_USER = "GET_USER";

export const getUser = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_CURRENT_USER}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data })
      })
      .catch((err) => console.log(err));
  }
}