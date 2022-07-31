import React, { Component } from "react";
import { Link } from "react-router-dom";
import CartPopup from "./components/cartPopup/CartPopup";
import Currency from "./components/currency/Currency";
import Menu from "./components/menu/Menu";
import "./Header.css";

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <Menu />
        <Link to="/">
          <img src="/images/logo.svg" alt="logo" />{" "}
        </Link>
        <div className="actions">
          <Currency />
          <CartPopup />
        </div>
      </div>
    );
  }
}
