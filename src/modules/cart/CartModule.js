import React, { Component } from "react";
import { connect } from "react-redux";
import CartProduct from "./components/CartProduct";
import "./CartModule.css";
import Counter from "./components/Counter";
import CartGallery from "./components/CartGallery";

class CartModule extends Component {
  calculatePrice() {
    return this.props.cart.products.reduce((sum, product) => {
      const price = this.props.currency.label
        ? product.prices.find(
            (price) => price.currency.label === this.props.currency.label
          )
        : product.prices[0];
      return sum + price.amount * product.qty;
    }, 0);
  }
  render() {
    const totalPrice = this.calculatePrice().toFixed(2);
    return (
      <div className="cart">
        <h1>Cart</h1>
        {this.props.cart.products.map((product, index) => {
          return (
            <div className="cart-item" key={index}>
              <div className="cart-product-wrapper" key="product">
                <CartProduct
                  key={index}
                  product={product}
                  currency={this.props.currency}
                />
              </div>
              <div className="cart-count-wrapper" key="counter">
                <Counter qty={product.qty} index={index} />
              </div>
              <div className="cart-gallery-wrapper" key="gallery">
                <CartGallery images={product.gallery} />
              </div>
            </div>
          );
        })}
        <p key="tax">
          Tax 21%:{" "}
          <span className="price">
            {this.props.currency.symbol}
            {(totalPrice * 0.21).toFixed(2)}
          </span>
        </p>
        <p key="qty">
          Quantity: <span className="price">{this.props.cart.total}</span>
        </p>
        <div className="total-cart" key="total">
          Total:{" "}
          <span className="price">
            {this.props.currency.symbol}
            {totalPrice}
          </span>
        </div>
        <div className="order-button" key="order">
          Order
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const cart = state.cart;
  const currency = state.currency;
  return {
    cart,
    currency,
  };
};

export default connect(mapStateToProps)(CartModule);
