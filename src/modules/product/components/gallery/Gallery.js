import { Component } from "react";
import "./Gallery.css";

export default class Gallery extends Component {
  render() {
    return (
      <div className="gallery">
        {this.props.images.map((image, index) => {
          return (
            <div className="gallery-item" key={index}>
              <input
                type="radio"
                defaultChecked={index === 0}
                name="gallery"
                id={"img" + index}
                className="gallery-selector"
              />
              <img
                className="img-large"
                src={image}
                alt={"product large " + index}
              />
              <label htmlFor={"img" + index} className="img-thumb">
                <img src={image} alt={"product thumb " + index} />
              </label>
            </div>
          );
        })}
      </div>
    );
  }
}
