import { GET_COMMENT, POST_COMMENT } from "../actions/comment.action";

const initialState = {}

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENT:
      return action.payload;
    case POST_COMMENT:
      return [action.payload, ...state]
    default:
      return state;
  }
}