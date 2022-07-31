import { combineReducers } from "redux";
import currency from "./currency";
import cart from "./cart";

const rootReducer = combineReducers({
  cart,
  currency
});

export default rootReducer;