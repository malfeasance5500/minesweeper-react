import {
  SET_EASY,
  SET_INTERMEDIATE,
  SET_DIFFICULT,
  SET_BOARD,
  SET_EMPTY,
  SET_CHECK,
  REMOVE_EMPTY,
  BOMB_CLICK,
  BOMB_RESET,
  BOMB_SPACE_SET,
  SET_FLAG,
} from "./types";

export const setEasy = () => {
  return { type: SET_EASY, payload: "EASY" };
};

export const setIntermediate = () => {
  return { type: SET_INTERMEDIATE, payload: "INTERMEDIATE" };
};

export const setDifficult = () => {
  return { type: SET_DIFFICULT, payload: "DIFFICULT" };
};

export const setBoard = (newBoard) => {
  return { type: SET_BOARD, payload: newBoard };
};

export const setCheck = (coord) => {
  return { type: SET_CHECK, payload: coord };
};

export const setEmpty = (emptySpaces) => {
  return { type: SET_EMPTY, payload: emptySpaces };
};

export const removeEmpty = (coord) => {
  return { type: REMOVE_EMPTY, payload: coord };
};

export const bombClick = () => {
  return { type: BOMB_CLICK, payload: true };
};

export const bombReset = () => {
  return { type: BOMB_RESET, payload: false };
};

export const bombSpaceSet = (bombList) => {
  return { type: BOMB_SPACE_SET, payload: bombList };
};

export const setFlag = (coord)=>{
  return {type:SET_FLAG, payload:coord}
}