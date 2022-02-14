import axios from "axios";

export const GET_COMMENT = "GET_COMMENT";
export const POST_COMMENT = "POST_COMMENT";

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

export const postComment = (dataComment) => {
  return (dispatch) => {
    return axios
      .post('http://localhost:3000/comments', dataComment)
      .then(() => {
        dispatch({ type: POST_COMMENT, payload: dataComment })
      })
      .catch((err) => console.log(err));
  }
}