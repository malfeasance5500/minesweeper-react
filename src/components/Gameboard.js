import React, { Component } from "react";
import { setBoard, setEmpty, bombReset, bombSpaceSet } from "../actions";
import { connect } from "react-redux";

import Square from "./Square";
import FinalScreen from "./FinalScreen";

class Gameboard extends Component {
  componentDidMount() {
    // on component mount we will render the board
    this.renderBoard();
  }

  componentDidUpdate() {
    //   on component update we will reset the board and generate a new board
    this.renderBoard();
    // reset the bombs spaces
    this.props.bombReset();
  }

  // create the squares and render the board
  // exclusion is a optional parameter, only to be used when we need a space to not be included in the bombs list
  renderBoard = (exclusion = false) => {
    const maxSpaces = this.props.difficulty.maxSides ** 2;
    const maxBombs = this.props.difficulty.maxBombs;
    var bombsList = {};
    // if esclusion is passed in , we will not have that coordinate as a bomb
    if (exclusion) {
      while (Object.keys(bombsList).length !== maxBombs) {
        var bomb = Math.floor(Math.random() * maxSpaces + 1);
        if (!(bomb === exclusion)) {
          bombsList[bomb] = bomb;
        }
      }
    } else {
      while (Object.keys(bombsList).length !== maxBombs) {
        bomb = Math.floor(Math.random() * maxSpaces + 1);
        bombsList[bomb] = bomb;
      }
    }
    // call set board function 
    this.setBoard(bombsList);
  };

  // used to set the state for the board
  setBoard = (bombList) => {
    const maxSides = this.props.difficulty.maxSides;
    var board = [];
    var emptySpaces = {};
    var count = 1;
    var bombSpaceList = [];
    for (var row = 0; row !== maxSides; row++) {
      var rowToAdd = [];
      for (var col = 0; col !== maxSides; col++) {
        if (bombList[count]) {
          bombSpaceList.push(`${row},${col}`);
          rowToAdd.push({
            mine: true,
            checked: false,
            coord: `${row},${col}`,
            squareNum: count,
            flagged: false,
          });
        } else {
          emptySpaces[`${row},${col}`] = true;
          rowToAdd.push({
            mine: false,
            checked: false,
            coord: `${row},${col}`,
            squareNum: count,
            flagged: false,
          });
        }
        count++;
      }
      board.push(rowToAdd);
    }
    // set the bomb spaces
    this.props.bombSpaceSet(bombSpaceList);
    // calculates the mines around each square of the board
    this.calcMines(board);
    // set the empty spaces in the board
    this.props.setEmpty(emptySpaces);
  };

  // calculate bombs around the squares
  calcMines = (board) => {
    const maxSide = this.props.difficulty.maxSides - 1;
    for (var row = 0; row !== maxSide + 1; row++) {
      for (var col = 0; col !== maxSide + 1; col++) {
        var bombCount = 0;
        // top check
        if (!(row - 1 < 0)) {
          if (board[row - 1][col].mine) {
            bombCount++;
          }
        }
        // bottom check
        if (!(row + 1 > maxSide)) {
          if (board[row + 1][col].mine) {
            bombCount++;
          }
        }
        // right check
        if (!(col + 1 > maxSide)) {
          if (board[row][col + 1].mine) {
            bombCount++;
          }
        }
        // left check
        if (!(col - 1 < 0)) {
          if (board[row][col - 1].mine) {
            bombCount++;
          }
        }
        // top right check
        if (!(row - 1 < 0) && !(col + 1 > maxSide)) {
          if (board[row - 1][col + 1].mine) {
            bombCount++;
          }
        }
        // top left check
        if (!(row - 1 < 0) && !(col - 1 < 0)) {
          if (board[row - 1][col - 1].mine) {
            bombCount++;
          }
        }
        // bottom right check
        if (!(row + 1 > maxSide) && !(col + 1 > maxSide)) {
          if (board[row + 1][col + 1].mine) {
            bombCount++;
          }
        }
        // bottom left check
        if (!(row + 1 > maxSide) && !(col - 1 < 0)) {
          if (board[row + 1][col - 1].mine) {
            bombCount++;
          }
        }

        board[row][col].mineValue = bombCount;
      }
    }
    this.props.setBoard(board);
  };

  // function to render as many squares as there are spaces
  renderSquares = () => {
    var count = 1;
    var squares = [];
    for (var row = 0; row !== this.props.difficulty.maxSides; row++) {
      for (var col = 0; col !== this.props.difficulty.maxSides; col++) {
        squares.push(
          <Square
            renderBoard={this.renderBoard}
            key={count}
            coord={`${row},${col}`}
            num={count}
          />
        );
        count++;
      }
    }
    return squares;
  };

  render() {
    // return <div>{this.props.difficulty}</div>;
    return (
      <div id="gameBoard">
        {/* {this.props.difficulty.difficulty}
        <br />
        {this.props.difficulty.maxSides} <br />
        {this.props.difficulty.maxBombs} <br />
        <br /> */}
        <div
          className={`box ${this.props.difficulty}`}
          style={{
            minWidth: "20vw",
            maxWidth: "800px",
            display: "grid",
            gridTemplateColumns: `repeat(${this.props.difficulty.maxSides},1fr)`,
          }}
        >
          {this.renderSquares()}
        </div>
        <FinalScreen />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { difficulty: state.difficulty };
};

export default connect(mapStateToProps, {
  setBoard,
  setEmpty,
  bombReset,
  bombSpaceSet,
})(Gameboard);
