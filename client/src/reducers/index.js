import { combineReducers } from "redux";
import authReducer from "./authReducer";
import battleReducers from "./battleReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  battle: battleReducers
});