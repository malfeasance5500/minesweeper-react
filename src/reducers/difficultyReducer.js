import { SET_EASY, SET_INTERMEDIATE, SET_DIFFICULT } from "../actions/types";
const INITIAL_STATE = { difficulty: "EASY", maxSides: 9, maxBombs: 10 };


// reducer to store information about the difficulty of the selected mode and the max sides and max bombs of the map
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_EASY:
      return { difficulty: "EASY", maxSides: 9, maxBombs: 10 };
    case SET_INTERMEDIATE:
      return { difficulty: "INTERMEDIATE", maxSides: 16, maxBombs: 40 };
    case SET_DIFFICULT:
      return { difficulty: "DIFFICULT", maxSides: 24, maxBombs: 99 };
    default:
      return state;
  }
};
