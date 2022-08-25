import { Component } from "react";
import "./Gallery.css";

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = { index: 0 };
  }
  render() {
    return (
      <div className="gallery">
        <div className="gallery-items">
          {this.props.images.map((image, index) => {
            return (
              <div
                className="img-thumb"
                key={index}
                onClick={() => {
                  this.setState({ index: index });
                }}
              >
                <img src={image} alt={"product thumb " + index} />
              </div>
            );
          })}
        </div>
        <div className="product-photo">
          {this.props.inStock ? "" : <div className="out-of-stock">out of stock</div>}
          <img
            src={this.props.images[this.state.index]}
            alt="main"
            className="img-large"
          />
        </div>
      </div>
    );
  }
}
