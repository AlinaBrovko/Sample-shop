import React, { Component } from "react";
import Attribute from "./attribute/Attribute";
import Gallery from "./gallery/Gallery";
import { connect } from "react-redux";
import { addProduct } from "../../../actions/cartActions";

class Product extends Component {
  constructor(props) {
    super(props);
    this.selectedAttributes = {};
    this.changeProductAttribute = this.changeProductAttribute.bind(this);
  }
  addProduct() {
    if (
      !this.props.product.inStock ||
      this.props.product.attributes.length !==
        Object.keys(this.selectedAttributes).length
    ) {
      return;
    }

    this.props.addProduct({
      ...this.props.product,
      selectedAttributes: {...this.selectedAttributes},
    });
  }
  changeProductAttribute(name, value) {
    this.selectedAttributes[name] = value;
  }
  render() {
    const price = this.props.currency.label
      ? this.props.product.prices.find(
          (price) => price.currency.label === this.props.currency.label
        )
      : this.props.product.prices[0];

    return (
      <div className="product-page">
        <div className="gallery-wrapper">
          <Gallery images={this.props.product.gallery} />
        </div>
        <div className="product-wrapper">
          <div className="product-brand">{this.props.product.brand}</div>
          <div className="product-name">{this.props.product.name}</div>
          {this.props.product.attributes.map((attribute, index) => {
            return (
              <Attribute
                attribute={attribute}
                key={index}
                change={this.changeProductAttribute}
              />
            );
          })}
          <div>
            <h3>Price:</h3>{" "}
            <p className="price-amount">
              {price.currency.symbol + price.amount}
            </p>{" "}
          </div>
          <div
            className="add-button"
            onClick={() => {
              this.addProduct();
            }}
          >
            Add to cart
          </div>
          <div
            className="description"
            dangerouslySetInnerHTML={{
              __html: this.props.product.description,
            }}
          ></div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Product);
