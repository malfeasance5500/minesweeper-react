import { combineReducers } from "redux";
import boardReducer from "./boardReducer";
import difficultyReducer from "./difficultyReducer";
import emptySpaceReducer from "./emptySpaceReducer";
import bombReducer from "./bombReducer"
import bombSpaceReducer from "./bombSpaceReducer"

// export all the reducers that are part of the state
export default combineReducers({
  board: boardReducer,
  difficulty: difficultyReducer,
  emptySpace: emptySpaceReducer,
  bombClick:bombReducer,
  bombSpace:bombSpaceReducer
});
