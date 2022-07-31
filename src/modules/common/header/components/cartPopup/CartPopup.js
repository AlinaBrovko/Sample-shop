import React, { Component } from "react";
import { connect } from "react-redux";
import CartGallery from "../../../../cart/components/CartGallery";
import CartProduct from "../../../../cart/components/CartProduct";
import Counter from "../../../../cart/components/Counter";
import { Link } from "react-router-dom";

import "./CartPopup.css";

class CartPopup extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.wrapperRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("mousedown", (e) => {
      if (
        this.wrapperRef &&
        this.wrapperRef.current &&
        !this.wrapperRef.current.contains(e.target)
      ) {
        this.setState({ show: false });
      }
    });
  }

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
    return (
      <div className="cart-popup">
        <div
          className="cart-icon"
          onClick={() => {
            this.setState({ show: !this.state.show });
          }}
        >
          <img src="/images/cart.svg" alt="cart" />
          {this.props.cart.total ? <span>{this.props.cart.total}</span> : ""}
        </div>
        {this.state.show ? (
          <div className="cart-popup-wrapper">
            <div className="cart-popup-body" ref={this.wrapperRef}>
              <div>My Bag, {this.props.cart.total} items</div>
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
              <div className="cart-price">
                <p>Total:</p>
                <p>{this.props.currency.symbol}{this.calculatePrice().toFixed(2)}</p>
              </div>
              <Link
                to="/cart"
                onClick={() => {
                  this.setState({ show: false });
                }}
              >
                <div className="viev-bag">Viev bag</div>
              </Link>
              <div className="check-out">Check Out</div>
            </div>
          </div>
        ) : (
          ""
        )}
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

export default connect(mapStateToProps)(CartPopup);
