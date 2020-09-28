import React, { Component } from "react";
import { connect } from "react-redux";

// component to show if u win or lose
class FinalScreen extends Component {

  renderContent = () => {
    if (this.props.emptySpace === 0 && this.props.bombClick === false) {
      return <div id="win">You win!</div>;
    } else if (this.props.bombClick) {
      return <div id="lose">You Lose! :(</div>;
    }
    return;
  };

  render() {
    return (
      <div id="final">
        <div id="space-left">{this.props.emptySpace} </div>
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    emptySpace: Object.keys(state.emptySpace).length,
    bombClick: state.bombClick,
  };
};

export default connect(mapStateToProps, {})(FinalScreen);
