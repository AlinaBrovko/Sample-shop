export const ADD_PRODUCT = "add_product"
export const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    payload: product
  };
};

export const INCREMENT_PRODUCT = "increment_product"
export const increment = (index) => {
  return {
    type: INCREMENT_PRODUCT,
    payload: index
  };
};

export const DECREMENT_PRODUCT = "decrement_product"
export const decrement = (index) => {
  return {
    type: DECREMENT_PRODUCT,
    payload: index
  };
};