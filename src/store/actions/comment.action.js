import axios from "axios";
export const GET_COMMENT = "GET_COMMENT";
export const POST_COMMENT = "POST_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const LIKE_COMMENT = "LIKE_COMMENT";
export const EDIT_REPLIES = "EDIT_REPLIES";

export const getComment = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}/`)
      .then((res) => {
        dispatch({ type: GET_COMMENT, payload: res.data })
      })
      .catch((err) => console.log(err));
  }
}

export const postComment = (dataComment) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}/comment`, dataComment)
      .then(() => {
        dispatch({ type: POST_COMMENT, payload: dataComment })
      })
      .catch((err) => console.log(err));
  }
}

export const editComment = (dataComment) => {
  return (dispatch) => {
    return axios
      .put(`${process.env.REACT_APP_API_URL}/comment/${dataComment.id}`, {
        content: dataComment.content
      })
      .then(() => {
        dispatch({ type: EDIT_COMMENT, payload: dataComment })
      })
      .catch((err) => console.log(err));
  }
}

export const editReplies = (dataReplies) => {
  return (dispatch) => {
    return axios
      .put(`${process.env.REACT_APP_API_URL}/comment/${dataReplies.id}`, {
        replies: dataReplies.replies
      })
      .then(() => {
        dispatch({ type: EDIT_REPLIES, payload: dataReplies })
      })
      .catch((err) => console.log(err));
  }
}

export const likeComment = (dataComment) => {
  return (dispatch) => {
    return axios
      .put(`${process.env.REACT_APP_API_URL}/comment/${dataComment.id}`, {
        score: dataComment.score
      })
      .then(() => {
        dispatch({ type: LIKE_COMMENT, payload: dataComment })
      })
      .catch((err) => console.log(err));
  }
}

export const deleteComment = (dataCommentId) => {
  return (dispatch) => {
    return axios
      .delete(`${process.env.REACT_APP_API_URL}/comment/${dataCommentId}`)
      .then(() => {
        dispatch({ type: DELETE_COMMENT, payload: dataCommentId })
      })
      .catch((err) => console.log(err));
  }
}