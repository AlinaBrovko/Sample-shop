import React, { Component } from "react";

export default class CartGallery extends Component {
  constructor(props) {
    super(props);
    this.state = { index: 0 };
  }
  increase() {
    this.setState({ index: this.state.index + 1 });
  }
  decrease() {
    this.setState({ index: this.state.index - 1 });
  }
  render() {
    return (
      <div>
        <img src={this.props.images[this.state.index]} alt="cart" />
        {this.state.index > 0 ? (
          <div
            key="prev"
            className="action prev"
            onClick={() => {
              this.decrease();
            }}
          >
            &lt;
          </div>
        ) : (
          ""
        )}
        {this.state.index + 1 < this.props.images.length ? (
          <div
            key="next"
            className="action next"
            onClick={() => {
              this.increase();
            }}
          >
            &gt;
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
