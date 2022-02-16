import axios from "axios";

export const GET_COMMENT = "GET_COMMENT";
export const POST_COMMENT = "POST_COMMENT";
export const PUT_COMMENT = "PUT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

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

export const putComment = (dataComment) => {
  return (dispatch) => {
    return axios
      .put(`http://localhost:3000/comments/${dataComment.id}`, {
        ...dataComment
      })
      .then(() => {
        dispatch({ type: PUT_COMMENT, payload: { ...dataComment } })
      })
      .catch((err) => console.log(err));
  }
}

export const deleteComment = (dataCommentId) => {
  return (dispatch) => {
    return axios
      .delete(`http://localhost:3000/comments/${dataCommentId}`)
      .then(() => {
        dispatch({ type: DELETE_COMMENT, payload: { dataCommentId } })
      })
      .catch((err) => console.log(err));
  }
}