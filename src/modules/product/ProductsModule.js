import React, { Component } from "react";
import Api from "../../plugins/api";
import Product from "./components/Product";
import "./Product.css"

export default class ProductsModule extends Component {
  constructor(props) {
    super(props);
    this.state = { product: {} };
  }
  componentDidMount() {
    const api = new Api();
    api.getProductData(this.props.match.params.product).then((product) => {
      this.setState(product);
    });
  }

  render() {
    return (
      <div>
        {this.state.product.id ? (
          <Product product={this.state.product} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}
