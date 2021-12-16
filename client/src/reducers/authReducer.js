import { SET_CURRENT_USER, USER_LOADING, UPDATE_CHARACTER } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

export default function authReducers(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case UPDATE_CHARACTER:
      return {
        ...state,
        user: {
          ...state.user,
          character: action.payload
        }
      }
    default:
      return state;
  }
}