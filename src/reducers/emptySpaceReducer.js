import { SET_EMPTY, REMOVE_EMPTY } from "../actions/types";
import _ from "lodash"

const INITIAL_STATE = {a:'a'};

// reducer to store information about the empty spaces left
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_EMPTY:
      return action.payload;
    case REMOVE_EMPTY:
      return _.omit(state, [action.payload])
    default:
      return state;
  }
};
 