import { ADD_PRODUCT, INCREMENT_PRODUCT, DECREMENT_PRODUCT } from "../actions/cartActions";

const STORAGE_KEY = "shop-cart";
const storageData = localStorage.getItem(STORAGE_KEY);
const defaultState = storageData ? JSON.parse(storageData) : [];
const total = defaultState.reduce((sum, product) => product.qty + sum, 0);

const cart = (state = { products: defaultState, total: total }, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      let isNew = true;
      state.products.map((product) => {
        if (
          product.id === action.payload.id &&
          isAttributesEquil(
            product.selectedAttributes,
            action.payload.selectedAttributes
          )
        ) {
          product.qty++;
          isNew = false;
        }

        return product;
      });

      isNew && state.products.push({ ...action.payload, qty: 1 });

      state.total++;
      save(state.products);

      return { ...state };
    case INCREMENT_PRODUCT:
      state.products[action.payload].qty++;
      state.total++;
      save(state.products);

      return { ...state };
    case DECREMENT_PRODUCT:
      state.products[action.payload].qty--;
      if (state.products[action.payload].qty === 0) {
        state.products.splice(action.payload, 1);
      }
      state.total--;
      save(state.products);

      return { ...state };
    default:
      return state;
  }
};

const save = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const isAttributesEquil = (attr1, attr2) => {
  const keys1 = Object.keys(attr1);
  const keys2 = Object.keys(attr2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (attr1[key] !== attr2[key]) {
      return false;
    }
  }
  return true;
};

export default cart;
