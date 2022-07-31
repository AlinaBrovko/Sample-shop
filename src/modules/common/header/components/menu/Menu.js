import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Api from "../../../../../plugins/api";

export default class Menu extends Component {
  constructor() {
    super();
    this.state = { categories: [] };
  }

  componentDidMount() {
    const api = new Api();
    api.getCategories().then((data) => {
      this.setState(data);
    });
  }

  render() {

    return <div className="menu">
        {this.state.categories.map((category,index) => {
            return <NavLink key={index} to={'/categories/' + category.name}>{category.name}</NavLink>
        })}
    </div>;
  }
}
