import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addProduct } from "../../../actions/cartActions";

class ProductTile extends Component {
  addProduct = (product, e) => {
    e.preventDefault();
    const selectedAttributes = {};
    product.attributes.map((attribute) => 
      selectedAttributes[attribute.id] = attribute.items[0].id
    )

    this.props.addProduct({
      ...product,
      selectedAttributes: selectedAttributes,
    });
  };
  render() {
    const price = this.props.currency.label
      ? this.props.product.prices.find(
          (price) => price.currency.label === this.props.currency.label
        )
      : this.props.product.prices[0];
    const { inStock } = this.props.product;
    return (
      <div className="product-tile">
        <Link className="product" to={"/products/" + this.props.product.id}>
          <div className="product-photo">
            {inStock ? "" : <div className="out-of-stock">out of stock</div>}
            <img src={this.props.product.gallery[0]} alt="123" />
          </div>
          {!inStock ? (
            ""
          ) : (
            <div
              className="cart-icon"
              onClick={(e) => {
                this.addProduct(this.props.product, e);
              }}
            ></div>
          )}
          <div
            className={"description" + (inStock ? "" : " out-of-stock-desc")}
          >
            <div>
              <p>
                {this.props.product.brand} {this.props.product.name}
              </p>
            </div>
            <div className="price">{price.currency.symbol + price.amount}</div>
          </div>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const currency = state.currency;
  return {
    currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (product) => {
      dispatch(addProduct(product));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductTile);
