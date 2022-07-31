import React, { Component } from "react";
import CartAttribute from "./CartAttribute";

export default class CartProduct extends Component {
  render() {
    const price = this.props.currency.label
      ? this.props.product.prices.find(
          (price) => price.currency.label === this.props.currency.label
        )
      : this.props.product.prices[0];
    return (
      <div className="cart-product">
        <div className="brand-cart">{this.props.product.brand}</div>
        <div className="name-cart">{this.props.product.name}</div>
        <div>
          <p className="price-amount">{price.currency.symbol + price.amount}</p>{" "}
        </div>
        {this.props.product.attributes.map((attribute, index) => {
          return (
            <CartAttribute
              attribute={attribute}
              selected={this.props.product.selectedAttributes[attribute.id]}
              key={index}
            />
          );
        })}
      </div>
    );
  }
}
