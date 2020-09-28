import { BOMB_CLICK, BOMB_RESET } from "../actions/types";

const INITIAL_STATE = false;

// reducer to store information about whether we have clicked on a bomb or not
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BOMB_CLICK:
      return true;
    case BOMB_RESET:
      return false;
    default:
      return state;
  }
};
