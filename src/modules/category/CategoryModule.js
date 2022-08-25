import React, { Component } from "react";
import Api from "../../plugins/api";
import ProductTile from "./components/ProductTile";
import "./Category.css";

export default class CategoryModule extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [], name: ""};
  }
  componentDidMount() {
    const api = new Api();
    api
      .getCategoryData(this.props.match.params.category ? this.props.match.params.category : 'all')
      .then(({ category }) => {
        this.setState(category);
      });
  }

  render() {
    return (
      <div className="category">
        <h2 className="category-name">{this.state.name}</h2>
        <div className="category-products">
        {this.state.products.map((product, index) => {
          return (
            <ProductTile
              key={index}
              product={product}
            />
          );
        })}
        </div>
      </div>
    );
  }
}
