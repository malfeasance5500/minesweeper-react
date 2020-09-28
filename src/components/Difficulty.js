import React, { Component } from "react";
import { connect } from "react-redux";
import { setEasy, setDifficult, setIntermediate } from "../actions";

class Difficulty extends Component {
  render() {
    return (
      <header id="difficulty">
        <nav>
          <ul>
            <li onClick={() => this.props.setEasy()}>
              <h3>Easy</h3>
            </li>
            <li onClick={() => this.props.setIntermediate()}>
              <h3>Intermediate</h3>
            </li>
            <li onClick={() => this.props.setDifficult()}>
              <h3>Difficult</h3>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default connect(null, { setEasy, setIntermediate, setDifficult })(
  Difficulty
);
