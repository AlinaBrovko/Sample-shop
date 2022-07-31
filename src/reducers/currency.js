import { CHANGE_CURRENCY } from "../actions/currencyActions";

const STORAGE_KEY = "scandiweb-currency";
const storageData = localStorage.getItem(STORAGE_KEY);
const defaultState = storageData ? JSON.parse(storageData) : {label: "", symbol: ""};

const currency = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_CURRENCY:
      save(action.payload);
      return action.payload;
    default:
      return state;
  }
};

const save = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export default currency;
