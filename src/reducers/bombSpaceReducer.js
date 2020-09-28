import { BOMB_SPACE_SET } from "../actions/types";

const INITIAL_STATE = [];

// reducer to store information about which squares are the bomb
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BOMB_SPACE_SET:
      return action.payload;
    default:
      return state;
  }
};
