import { DELETE_COMMENT, GET_COMMENT, POST_COMMENT, PUT_COMMENT } from "../actions/comment.action";

const initialState = {}

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENT:
      return action.payload;
    case POST_COMMENT:
      return [action.payload, ...state]
    case PUT_COMMENT:
      return state.map((comment) => {
        if (comment.id === action.payload.id) {
          return {
            ...comment,
            content: action.payload.content
          }
        } else return comment
      })
    case DELETE_COMMENT:
      return state.filter((comment) => comment.id !== action.payload.dataCommentId)
    default:
      return state;
  }
}