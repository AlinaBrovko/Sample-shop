import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import CategoryModule from "./modules/category/CategoryModule";
import CartModule from "./modules/cart/CartModule";
import ProductsModule from "./modules/product/ProductsModule";
import Header from "./modules/common/header/Header";

class App extends React.Component {
  render() {
    const CategoryWrapper = (props) => {
      const params = useParams();
      return <CategoryModule key={params.category} {...{...props, match: {params}} } />
    }
    const ProductWrapper = (props) => {
      const params = useParams();
      return <ProductsModule key={params.product} {...{...props, match: {params}} } />
    }
    return (
      <div className="App">
        <Router>
          <Header />  
          <Routes>
            <Route path="" element={<CategoryWrapper />} />
            <Route exact path="categories/:category" element={<CategoryWrapper />} />
            <Route exact path="products/:product" element={<ProductWrapper />} />
            <Route path="cart" element={<CartModule />} />
            <Route path="*" element={<h3>NotFound</h3>} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
