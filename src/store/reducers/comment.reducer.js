import {DELETE_COMMENT, 
        GET_COMMENT,
        LIKE_COMMENT, 
        POST_COMMENT, 
        EDIT_COMMENT,
        EDIT_REPLIES } from "../actions/comment.action";

const initialState = {}

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENT:
      return action.payload;
    case POST_COMMENT:
      return [action.payload, ...state];
    case EDIT_COMMENT:
      return state.map((comment) => {
        if (comment.id === action.payload.id) {
          return {
            ...comment,
            content: action.payload.content
          }
        } else return comment
      });
    case EDIT_REPLIES:
      return state.map((comment) => {
        if (comment.id === action.payload.id) {
          return {
            ...comment,
            replies: action.payload.replies
          }
        } else return comment
      });
    case LIKE_COMMENT:
      return state.map((comment) => {
        if (comment.id === action.payload.id) {
          return {
            ...comment,
            score: action.payload.score
          }
        } else return comment
      });
    case DELETE_COMMENT:
      return state.filter((comment) => comment.id !== action.payload);
    default:
      return state;
  }
}