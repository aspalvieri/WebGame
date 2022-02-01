import { RESET_ALL_STATES, UPDATE_AFTER_BATTLE, UPDATE_BATTLE, CLEAR_BATTLE } from "../actions/types";

const initialState = {};

export default function battleReducers(state = initialState, action) {
  switch (action.type) {
    case UPDATE_BATTLE:
      return action.payload;
    case UPDATE_AFTER_BATTLE:
      return {
        ...state,
        info: action.payload
      };
    case CLEAR_BATTLE:
      return { ...initialState };
    case RESET_ALL_STATES:
      return { ...initialState };
    default:
      return state;
  }
}