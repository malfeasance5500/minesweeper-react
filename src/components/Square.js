import React, { Component } from "react";
import { connect } from "react-redux";
import { setCheck, removeEmpty, bombClick, setFlag } from "../actions";

// component for each square on the map
class Square extends Component {
  // check the space when we click on it
  spaceCheck = async () => {

    // if we have clicked a bomb already, or there are no more spaces to be clicked, ignore the click
    if (this.props.bombClicked || this.props.spacesLeft === 0) {
      return;
    }
    const row = this.props.coord.split(",")[0];
    const col = this.props.coord.split(",")[1];

    // if the square not a bomb
    if (this.isNotBomb(row, col)) {
      // we will check for empty spaces around the square to be shown and set them to be clicked as well
      await this.emptySpaceCheck([[row], [col]], {});
      if (this.props.spacesLeft === 0) {
        // if there are no more squraes to be clicked after we click, we will show the bombs to the user
        for (var bomb = 0; bomb !== this.props.bombCoords.length; bomb++) {
          this.props.setCheck(this.props.bombCoords[bomb]);
        }
      }
    } else {
      if (
        // if we click on bomb on the very first turn we will rerender the board with new mines 
        this.props.maxSides ** 2 - this.props.bombCoords.length ===
        this.props.spacesLeft
      ) {
        await this.props.renderBoard(this.props.board[row][col].squareNum);
        this.spaceCheck();
      } else {
        // if click bomb on not first turn we will render the game over and show all the bombs
        for (var bomb = 0; bomb !== this.props.bombCoords.length; bomb++) {
          this.props.setCheck(this.props.bombCoords[bomb]);
        }
      }
    }
  };

  // checks if a space is a bomb or not
  isNotBomb = (row, col) => {
    if (
      // if hit bomb on first turn return false
      this.props.board[row][col].mine &&
      this.props.maxSides ** 2 - this.props.bombCoords.length ===
        this.props.spacesLeft
    ) {
      return false;
    }
    if (this.props.board[row][col].mine) {
      // if hit bomb on not first turn we will set the state of the bomb click to be true
      this.props.bombClick();
      return false;
    }
    // return true if not bomb clicked
    return true;
  };

  // check which empty squares around the space clicked can be shown 
  emptySpaceCheck = (coordList, checkedList) => {
    // input will be in the form of [ [rows], [cols]]
    const squares = coordList[0].length;
    const rows = coordList[0];
    const cols = coordList[1];
    var rowToAdd = [];
    var colToAdd = [];
    var board = this.props.board;
    const maxSide = this.props.maxSides - 1;
    for (var iter = 0; iter !== squares; iter++) {
      var row = parseInt(rows[iter]);
      var col = parseInt(cols[iter]);

      // skip this square if it is already checked or in the exlucsion list
      if (board[row][col].checked || checkedList[`${row},${col}`]) {
      } else {

        // if the square is not a mine and there are no mines around it
        if (board[row][col].mine === false && board[row][col].mineValue === 0) {
          // set the space as touched
          this.props.setCheck(`${row},${col}`);
          // remove the square from the list of empty squares
          this.props.removeEmpty(`${row},${col}`);
          // add the square to the checked list so that it will no longer be added to the checks
          checkedList[`${row},${col}`] = true;

          // top check
          if (!(row - 1 < 0) && !checkedList[`${row - 1},${col}`]) {
            if (!board[row - 1][col].checked) {
              rowToAdd.push(row - 1);
              colToAdd.push(col);
            }
          }
          // bottom check
          if (!(row + 1 > maxSide) && !checkedList[`${row + 1},${col}`]) {

            if (!board[row + 1][col].checked) {
              rowToAdd.push(row + 1);
              colToAdd.push(col);
            }
          }

          // right check
          if (!(col + 1 > maxSide) && !checkedList[`${row},${col + 1}`]) {
            if (!board[row][col + 1].checked) {
              rowToAdd.push(row);
              colToAdd.push(col + 1);
            }
          }
          // left check
          if (!(col - 1 < 0) && !checkedList[`${row},${col - 1}`]) {

            if (!board[row][col - 1].checked) {
              rowToAdd.push(row);
              colToAdd.push(col - 1);
            }
          }
          // top right check
          if (
            !(row - 1 < 0) &&
            !(col + 1 > maxSide) &&
            !checkedList[`${row - 1},${col + 1}`]
          ) {

            if (!board[row - 1][col + 1].checked) {
              rowToAdd.push(row - 1);
              colToAdd.push(col + 1);
            }
          }
          // top left check
          if (
            !(row - 1 < 0) &&
            !(col - 1 < 0) &&
            !checkedList[`${row - 1},${col - 1}`]
          ) {

            if (!board[row - 1][col - 1].checked) {
              rowToAdd.push(row - 1);
              colToAdd.push(col - 1);
            }
          }
          // bottom right check
          if (
            !(row + 1 > maxSide) &&
            !(col + 1 > maxSide) &&
            !checkedList[`${row + 1},${col + 1}`]
          ) {

            if (!board[row + 1][col + 1].checked) {
              rowToAdd.push(row + 1);
              colToAdd.push(col + 1);
            }
          }
          // bottom left check
          if (
            !(row + 1 > maxSide) &&
            !(col - 1 < 0) &&
            !checkedList[`${row + 1},${col - 1}`]
          ) {

            if (!board[row + 1][col - 1].checked) {
              rowToAdd.push(row + 1);
              colToAdd.push(col - 1);
            }
          }
        }

        // if the square has mines around it we will only show that square 
        if (board[row][col].mine === false && board[row][col].mineValue !== 0) {
          this.props.setCheck(`${row},${col}`);
          this.props.removeEmpty(`${row},${col}`);
          checkedList[`${row},${col}`] = true;
        }
      }
    }
    // if there are no rows to be added we just end 
    if (rowToAdd.length === 0) {
      return;
    } else {
      // if ther are rows to be added we call this fundtion again 
      this.emptySpaceCheck([rowToAdd, colToAdd], checkedList);
    }
  };

  // compute what to show on the screen
  renderInfo = () => {
    try {

      // if the square is clicked and is not a bomb
      if (
        this.props.board[this.props.coord.split(",")[0]][
          this.props.coord.split(",")[1]
        ].checked &&
        !this.props.board[this.props.coord.split(",")[0]][
          this.props.coord.split(",")[1]
        ].mine
      ) {
        return (
          <div
            className="clear"
            onContextMenu={(e) => {
              e.preventDefault();
            }}
          >
            <img src="./tilepng.png"></img>
            <span>
              {
                this.props.board[this.props.coord.split(",")[0]][
                  this.props.coord.split(",")[1]
                ].mineValue
              }
            </span>
          </div>
        );
      }


      // if the square is clicked and is bomb
      if (
        this.props.board[this.props.coord.split(",")[0]][
          this.props.coord.split(",")[1]
        ].checked &&
        this.props.board[this.props.coord.split(",")[0]][
          this.props.coord.split(",")[1]
        ].mine
      ) {
        return (
          <div
            className="bomb"
            onContextMenu={(e) => {
              e.preventDefault();
            }}
          >
            <img src="./mine.png"></img>
          </div>
        );
      }

      // if squrae not clicked
      return (
        <div
          className={
            this.props.board[this.props.coord.split(",")[0]][
              this.props.coord.split(",")[1]
            ].flagged
              ? "flag"
              : "tile"
          }
          onContextMenu={(e) => {
            e.preventDefault();
            this.props.setFlag(this.props.coord);
          }}
          onClick={
            this.props.board[this.props.coord.split(",")[0]][
              this.props.coord.split(",")[1]
            ].flagged
              ? null
              : this.spaceCheck
          }
        >
          <img
            src={
              this.props.board[this.props.coord.split(",")[0]][
                this.props.coord.split(",")[1]
              ].flagged
                ? "./flag.png"
                : "./tilepng.png"
            }
          ></img>
        </div>
      );
    } catch {
      return "nop";
    }
  };

  render() {
    return this.renderInfo();
  }
}

const mapStateToProps = (state) => {
  return {
    board: state.board,
    maxSides: state.difficulty.maxSides,
    bombClicked: state.bombClick,
    spacesLeft: Object.keys(state.emptySpace).length,
    bombCoords: state.bombSpace,
  };
};

export default connect(mapStateToProps, {
  setCheck,
  removeEmpty,
  bombClick,
  setFlag,
})(Square);
