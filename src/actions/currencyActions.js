export const CHANGE_CURRENCY = "change_currency";
export const change = (currency) => {
  return {
    type: CHANGE_CURRENCY,
    payload: currency,
  };
};
