import { combineReducers } from "redux";
import commentReducer from "./comment.reducer";
import userReducer from "./user.reducer";

export default combineReducers({
  commentReducer,
  userReducer
})