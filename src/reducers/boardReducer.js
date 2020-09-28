import { SET_BOARD, SET_CHECK, SET_FLAG } from "../actions/types";

const INITIAL_STATE = [];

// reducer to store information about the board and the squares
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    // we set the state of the board on rendering the game
    case SET_BOARD:
      return action.payload;

    // set whether we have clicked on the square or not
    case SET_CHECK:
      var newState = state.map((row) => {
        var newRow = row.map((col) => {
          // console.log(col);
          if (col.coord === action.payload) {
            return { ...col, checked: true };
          }
          return { ...col };
        });
        return newRow;
      });
      return newState;

    // set whether we have right clicked on the square or not
    case SET_FLAG:
      var newState = state.map((row) => {
        var newRow = row.map((col) => {
          // console.log(col);
          if (col.coord === action.payload) {
            return { ...col, flagged: !col.flagged };
          }
          return { ...col };
        });
        return newRow;
      });
      return newState;
    default:
      return state;
  }
};
