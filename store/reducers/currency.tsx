import * as CURRENCY from "../types/currency";

const initialState = {
  currency: null
};

const currencyReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CURRENCY.SET_CURRENCY:
      return {
        ...state,
        value: action.payload.currency.value,
        timestamp: action.payload.currency.timestamp,
      };
    default:
      return state;
  }
};

export default currencyReducer;
