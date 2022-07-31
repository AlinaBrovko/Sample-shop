import React, { Component } from "react";
import Api from "../../../../../plugins/api";
import { connect } from "react-redux";
import { change } from "../../../../../actions/currencyActions";
import "./Currency.css";

class Currency extends Component {
  constructor() {
    super();
    this.state = { currencies: [], isOptionsOpen: false };
    this.wrapperRef = React.createRef();
  }
  componentDidMount() {
    const api = new Api();
    api.getCurrencies().then((data) => {
      this.setState({ currencies: data.currencies });
      !this.props.currency.symbol && this.setSelectedOption(data.currencies[0]);
    });

    document.addEventListener("mousedown", (e) => {
      if (
        this.wrapperRef &&
        this.wrapperRef.current &&
        !this.wrapperRef.current.contains(e.target)
      ) {
        this.setState({ isOptionsOpen: false });
      }
    });
  }

  setSelectedOption(option) {
    this.props.change(option);
  }

  toggleOptions() {
    this.setState({ isOptionsOpen: !this.state.isOptionsOpen });
  }

  setSelectedThenCloseDropdown(option) {
    this.setSelectedOption(option);
    this.setState({ isOptionsOpen: false });
  }
  render() {
    return (
      <div className="currency" ref={this.wrapperRef}>
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={this.state.isOptionsOpen}
          className={this.state.isOptionsOpen ? "expanded" : ""}
          onClick={() => {
            this.toggleOptions();
          }}
        >
          {this.props.currency.symbol}
        </button>
        <ul
          className={`options ${this.state.isOptionsOpen ? "show" : ""}`}
          role="listbox"
          tabIndex={-1}
        >
          {this.state.currencies.map((option, index) => (
            <li
              id={option.symbol}
              key={index}
              tabIndex={0}
              onClick={() => {
                this.setSelectedThenCloseDropdown(option);
              }}
            >
              {option.symbol} {option.label}
            </li>
          ))}
        </ul>
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
    change: (currency) => {
      dispatch(change(currency));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Currency);
