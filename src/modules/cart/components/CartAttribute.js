import React, { Component } from "react";

export default class CartAttribute extends Component {
  render() {
    const { attribute } = this.props;
    return (
      <div>
        <h3>{attribute.name}:</h3>
        <div>
          {attribute.items.map((item, index) => {
            return (
              <div className="attribute" key={index}>
                <div>
                  {attribute.type === "swatch" ? (
                    <div
                      className={
                        "swatch" +
                        (this.props.selected === item.id ? " selected" : "")
                      }
                      style={{
                        backgroundColor: item.value,
                      }}
                    ></div>
                  ) : (
                    <div
                      className={
                        "tile" +
                        (this.props.selected === item.id ? " selected" : "")
                      }
                    >
                      <p>{item.value}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
