import { SET_VENUES } from "../actions";
import { combineReducers } from "redux";

function venues(state = [], action) {
  switch (action.type) {
    case SET_VENUES:
      return action.venues;
    default:
      return state;
  }
}

const rootReducer = combineReducers({ venues });

export default rootReducer;
