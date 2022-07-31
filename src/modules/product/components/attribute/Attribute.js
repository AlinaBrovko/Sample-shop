import React, { Component } from "react";
import "./Attribute.css";

export default class Attribute extends Component {
  render() {
    const { attribute } = this.props;
    return (
      <>
        <h3>{attribute.name}:</h3>
        <div>
          {attribute.items.map((item, index) => {
            return (
              <div className="attribute" key={index}>
                <label>
                  <input
                    id={item.id}
                    key={index}
                    type="radio"
                    className="attribute-radio"
                    name={attribute.id}
                    value={item.id}
                    onChange={(e) => {
                      this.props.change(attribute.id, e.target.value);
                    }}
                  />
                  {attribute.type === "swatch" ? (
                    <div
                      className="swatch"
                      style={{
                        backgroundColor: item.value,
                      }}
                    ></div>
                  ) : (
                    <div className="tile"><p>{item.displayValue}</p></div>
                  )}
                </label>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
