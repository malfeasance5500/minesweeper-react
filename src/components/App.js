import React, { Component } from "react";

import Difficulty from "./Difficulty";
import Gameboard from "./Gameboard";

class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <Difficulty />
        <Gameboard />
      </div>
    );
  }
}

export default App;
