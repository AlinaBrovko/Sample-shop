import { connect } from "react-redux";
import React, { Component } from "react";
import { increment, decrement } from "../../../actions/cartActions";

class Counter extends Component {
  render() {
    return (
      <>
        <div className="cart-item-action" onClick={() => {this.props.increment(this.props.index)}}>+</div>
        <div>{this.props.qty}</div>
        <div className="cart-item-action" onClick={() => {this.props.decrement(this.props.index)}}>-</div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    increment: (index) => {
      dispatch(increment(index));
    },
    decrement: (index) => {
      dispatch(decrement(index));
    }
  };
};

export default connect(null, mapDispatchToProps)(Counter);
