import axios from "axios";

export const GET_COMMENT = "GET_COMMENT";

export const getComment = () => {
  return (dispatch) => {
    return axios
      .get('http://localhost:3000/comments')
      .then((res) => {
        dispatch({ type: GET_COMMENT, payload: res.data })
      })
      .catch((err) => console.log(err));
  }
}